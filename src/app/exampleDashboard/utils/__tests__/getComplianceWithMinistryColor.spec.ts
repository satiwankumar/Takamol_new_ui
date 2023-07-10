import { getComplianceWithMinistryColor } from '../getComplianceWithMinistryColor';

describe('getComplianceWithMinistryColor - map the api response color to ui representation', () => {
  it.each([
    ['green', 'success_500'],
    ['yellow', 'warning_500'],
    ['red', 'danger_500'],
  ] as const)('returns the correct color for levelScoreColor: %s', (levelScoreColor, expectedColor) => {
    const result = getComplianceWithMinistryColor(levelScoreColor);
    expect(result).toBe(expectedColor);
  });
});
