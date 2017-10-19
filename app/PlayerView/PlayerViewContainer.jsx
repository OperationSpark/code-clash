import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CodeTester from 'code-tester';
import io from 'socket.io-client';

import quizRandomizer from '../helpers/quizRandomizer.js';
import { calcScore, getRandomLine, getPublicCodeQuiz } from '../helpers';

class PlayerViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { testSpec: '', starterCode: '', loading: true, boilerplate: '', instructions: '', editMode: false };
    this.renderTester = this.renderTester.bind(this);
    this.getQuiz = this.getQuiz.bind(this);
  }

  componentDidMount() {
    this.connectToGame();
  }

  connectToGame() {
    const { server } = window.config;
    const url = `${server}/code-quiz-prep/final/`;

    this.gameIO = io('/game');

    this.gameIO.on('player join', (data) => console.log('player joined', data));
    this.gameIO.on('quiz url', this.getQuiz);
    this.gameIO.emit('player join', { id: this.props.match.params.playerId, name: this.props.match.params.name });
  }

  getQuiz(url) {
    this.setState({ loading: true });
    console.log(url);
    getPublicCodeQuiz(url)
      .then(data => {
        this.gameIO.emit('player ready', { message: 'player ready', id: this.props.match.params.playerId})
        this.setState({
          testSpec: data.spec.data,
          loading: false,
          boilerplate: data.boilerplate.data,
          instructions: data.instructions.data,
          error: null,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          testSpec: '',
          loading: false,
          boilerplate: 'Error loading data...',
          error: err,
        });
      });
  }

  renderTester() {
    const handleTestResults = (passCount, failCount, runTime) => {
      const { playerId } = this.props.match.params;
      this.gameIO.emit('score update', {
        message: 'score update',
        id: playerId,
        score: calcScore(passCount, failCount),
        failCount,
        passCount
      });
    };

    const handleLintedCode = (lintedCode) => {
      const { playerId: id } = this.props.match.params;
      this.gameIO.emit('player input', {
        randomCode: getRandomLine(lintedCode),
        code: lintedCode,
        id
      });
    };

    const handleAnyCode = (code) => {};
    const { boilerplate, instructions, editMode, testSpec } = this.state;
    return (
      <CodeTester
        initialCode={boilerplate}
        instructions={instructions}
        iFrameUrl="/test-runner.html"
        testHandlerUrl="/get_results.js"
        onAnyCode={handleAnyCode}
        onLintedCode={handleLintedCode}
        onTestResults={handleTestResults}
        showLints={true}
        testSpec={testSpec}
        showConsole={false}
        autoRun
        hideEditorButtons={true}
        markdownOptions={{ sanitize: false }}
        className="full-width"
      />
    );
  }

  render () {
    const { codeQuizUrl } = this.props;
    const { error, loading } = this.state;
    return (
      loading ?
      <div className="text-center">Waiting for opponent...</div> :
      <div className="container-fluid">
        {error ?
          (<div className="row">
            Error loading data from {codeQuizUrl}:
            {error.message}
          </div>) :
          (<div className="row">
            {this.renderTester()}
          </div>)
        }
      </div>
    );
  }
}

PlayerViewContainer.propTypes = {
  codeQuizUrl: PropTypes.string,
};

export default PlayerViewContainer;
