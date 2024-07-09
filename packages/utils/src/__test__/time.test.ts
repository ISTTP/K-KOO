import { ACT_EXPIRES_IN, RFT_EXPIRES_IN } from '../jwt';

describe('Constants Test', () => {
  test('ACT_EXPIRES_IN should be 1800', () => {
    expect(ACT_EXPIRES_IN).toBe(60 * 30);
    expect(ACT_EXPIRES_IN).toBe(1800);
  });

  test('RFT_EXPIRES_IN should be 1209600', () => {
    expect(RFT_EXPIRES_IN).toBe(60 * 60 * 24 * 14);
    expect(RFT_EXPIRES_IN).toBe(1209600);
  });
});
