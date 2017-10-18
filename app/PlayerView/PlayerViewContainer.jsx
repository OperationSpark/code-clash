import React, { Component } from 'react';
import CodeTester from 'code-tester';
import axios from 'axios';
import P from 'bluebird';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

import quizRandomizer from '../helpers/quizRandomizer.js';
import { calcScore, getRandomLine } from '../helpers';

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
    this.gameIO.emit('player join', { id: this.props.match.params.playerId });
  }

  getQuiz(url) {
    this.setState({ loading: true });
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

function getPublicCodeQuiz(codeQuizUrl, isTestMode = true) {
  return P.join(
    getPublicResource(codeQuizUrl, 'index.js', isTestMode),
    getPublicResource(codeQuizUrl, 'README.md', isTestMode),
    getPublicResource(codeQuizUrl, 'index.spec.js', isTestMode),
    (boilerplate, instructions, spec) => {
      return { boilerplate, instructions, spec };
    }
  );

  function getPublicResource(projectPath, filename, isTestMode) {
    const url = `${projectPath.replace(/\/+$/, '')}/${filename}`;
    return axios.get(url);
  }
}

PlayerViewContainer.propTypes = {
  codeQuizUrl: PropTypes.string,
};

export default PlayerViewContainer;
