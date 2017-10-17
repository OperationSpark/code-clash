export const calcScore = (passCount = 0, failCount = 0) => passCount / (passCount + failCount) || 0;

export const renderIf = condition => component => condition && component;
