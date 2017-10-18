export const calcScore = (passCount = 0, failCount = 0) => passCount / (passCount + failCount) || 0;

export const renderIf = condition => component => condition && component;

export const randomElement = array => array[Math.floor(Math.random(array.length))];

export const getRandomLine = (str = '') => randomElement(str.split('\n'));
