const axios = require('axios');
const P = require('bluebird');

const calcScore = (passCount = 0, failCount = 0) => passCount / (passCount + failCount) || 0;

const renderIf = condition => component => condition && component;

const randomElement = array => array[Math.floor(Math.random() * array.length)];

const getRandomLine = (str = '') =>
  randomElement(str.split('\n').map(s => s.trim()).filter(s => s.length));

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

module.exports = {
  calcScore,
  renderIf,
  randomElement,
  getRandomLine,
  getPublicCodeQuiz
};
