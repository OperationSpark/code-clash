import React, { Component } from 'react';
import CodeTester from 'code-tester';
import axios from 'axios';
import P from 'bluebird';
import PropTypes from 'prop-types';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { testSpec: '', starterCode: '', loading: true, boilerplate: '', instructions: '', editMode: false };
    this.renderTester = this.renderTester.bind(this);
    this.handleUrlInput = this.handleUrlInput.bind(this);
    this.handleInstructionsChange = this.handleInstructionsChange.bind(this);
    this.handleTestSpecChange = this.handleTestSpecChange.bind(this);
    this.handleBoilerplateChange = this.handleBoilerplateChange.bind(this);
    this.handleEditModeChange = this.handleEditModeChange.bind(this);
    this.handleGithubSubmit = this.handleGithubSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    if (process.env.NODE_ENV === 'development') {
      const fakeSubmitEvent = { preventDefault: () => {}, target: {'code-quiz-url': { value: 'http://localhost:8080/code-quiz-immersion-precourse/exit/' } }};
      this.handleUrlInput(fakeSubmitEvent);
    }
  }

  handleEditModeChange() {
    this.setState(({ editMode }) => {
      return { editMode: !editMode };
    });
  }

  handleUrlInput(event) {
    event.preventDefault();
    const url = event.target['code-quiz-url'].value;
    getPublicCodeQuiz(url)
      .then(data => {
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

  handleInstructionsChange(instructions) {
    this.setState({ instructions });
  }

  handleTestSpecChange(testSpec) {
    this.setState({ testSpec });
  }

  handleBoilerplateChange(boilerplate) {
    this.setState({ boilerplate });
  }

  handleGithubSubmit() {
    console.log('This will commit to GitHub repo in future.');
  }

  handleReset() {
  }

  renderTester() {
    const handleTestResults = (passCount, failCount, runTime) => {
      // console.log(passCount, failCount, runTime);
    };

    const handleLintedCode = (lintedCode) => {};

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
        handleInstructionsChange={this.handleInstructionsChange}
        handleTestSpecChange={this.handleTestSpecChange}
        handleBoilerplateChange={this.handleBoilerplateChange}
        editMode={editMode}
        showConsole={false}
        handleReset={this.handleReset}
      />
    );
  }

  render () {
    const { codeQuizUrl } = this.props;
    const { error } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <form className="form-inline" onSubmit={this.handleUrlInput}>
              <div className="form-group">
                <label htmlFor="inlineFormInput">Enter CodeQuiz Url</label>
                <input className="form-control" name="code-quiz-url" size="50" />
              </div>
              <div className="checkbox">
                <label className="form-check-label">
                  <input className="form-check-input" type="checkbox" onChange={this.handleEditModeChange} /> Edit Mode
                </label>
              </div>
            </form>
          </div>
          <div className="col-md-4">
            <button className="btn btn-success pull-right" onClick={this.handleGithubSubmit}>
              Commit to GitHub
            </button>
          </div>
        </div>
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