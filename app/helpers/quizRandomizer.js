const { gameServerHost } = require('../../config/default.json');
const { randomElement } = require('./index.js');

const problems = [
  '/code-quiz-bootcamp/checkpoints/javascript/checkpoint1/v1/',
  '/code-quiz-immersion-prep/capitalizeFirst/',
  '/code-quiz-immersion-prep/countOccurences/',
  '/code-quiz-prep/final/',
];

const getRandomQuiz = () => `http://${gameServerHost}${randomElement(problems)}`;

module.exports = getRandomQuiz;
