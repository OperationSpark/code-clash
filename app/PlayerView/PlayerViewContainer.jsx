import React, { Component } from 'react';
import CodeTester from 'code-tester';
import axios from 'axios';
import P from 'bluebird';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

import { calcScore } from '../helpers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { testSpec: '', starterCode: '', loading: true, boilerplate: '', instructions: '', editMode: false };
    this.renderTester = this.renderTester.bind(this);
    this.handleUrlInput = this.handleUrlInput.bind(this);
  }

  componentDidMount() {
    this.connectToGame();
  }

  connectToGame() {
    const { server } = window.config;
    this.gameIO = io('/game');
    this.gameIO.on('connection', (socket) => {
      socket.join('gameRoom', () => {
        let rooms = Objects.keys(socket.rooms);
        console.log(rooms); // [ <socket.id>, 'room 237' ]
        io.to('gameRoom', 'a new user has joined the room'); // broadcast to everyone in the room
      });
    });

    this.gameIO.on('player join', (data) => console.log('player joined', data));
    const fakeSubmitEvent = { preventDefault: () => { }, target: { 'code-quiz-url': { value: `${server}/code-quiz-immersion-precourse/exit/` } } };
    this.handleUrlInput(fakeSubmitEvent);
    this.gameIO.emit('player join', { id: this.props.match.params.playerId });
  }

  handleUrlInput(event) {
    event.preventDefault();
    const url = event.target['code-quiz-url'].value;
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
      });
    };

    const handleLintedCode = (lintedCode) => {
    };

    const handleAnyCode = (code) => {};
    const { boilerplate, instructions, editMode } = this.state;
    let testSpec = '';
    if (this.state.testSpec.length) testSpec = this.state.testSpec;
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
    const { error } = this.state;
    return (
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

App.propTypes = {
  codeQuizUrl: PropTypes.string,
};

export default App;