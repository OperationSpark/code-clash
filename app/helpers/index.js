const calcScore = (passCount = 0, failCount = 0) => passCount / (passCount + failCount) || 0;

const renderIf = condition => component => condition && component;

const randomElement = array => array[Math.floor(Math.random() * array.length)];

const getRandomLine = (str = '') =>
  randomElement(str.split('\n').map(s => s.trim()).filter(s => s.length));

module.exports = {
  calcScore,
  renderIf,
  randomElement,
  getRandomLine
};
