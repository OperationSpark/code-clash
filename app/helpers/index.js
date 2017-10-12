export const calcScore = (passCount = 0, failCount = 0) => passCount / (passCount + failCount) || 0;
