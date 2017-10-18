const { gameServerHost } = require('../../config/default.json');
const { randomElement } = require('./index.js');
const quizList = require('../../data/quizList.js');


const getRandomQuiz = () => `http://${gameServerHost}${randomElement(quizList)}`;

module.exports = getRandomQuiz;
