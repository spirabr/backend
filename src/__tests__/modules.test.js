import { collectorIsValid } from '../modules/validate';

describe('validate.js', () => {
  describe('collectorIsValid', () => {
    it('should return true if collector is a valid object', () => {
      const collector = { name: 'Thais', hospital: 'Albert Einstein' };
      expect(collectorIsValid(collector)).toBe(true);
    });
    it('should return false if collector is not an object', () => {
      let collector = 'Albert';
      expect(collectorIsValid(collector)).toBe(false);

      collector = 1;
      expect(collectorIsValid(collector)).toBe(false);

      collector = null;
      expect(collectorIsValid(collector)).toBe(false);

      collector = undefined;
      expect(collectorIsValid(collector)).toBe(false);
    });
    it('should return false if collector.name is not a string', () => {
      const collector = { name: 1, hospital: 'Albert Einstein' };
      expect(collectorIsValid(collector)).toBe(false);

      collector.name = null;
      expect(collectorIsValid(collector)).toBe(false);

      collector.name = undefined;
      expect(collectorIsValid(collector)).toBe(false);
    });
    it('should return false if collector.hospital is not a string', () => {
      const collector = { name: 'Thais', hospital: 1 };
      expect(collectorIsValid(collector)).toBe(false);

      collector.hospital = null;
      expect(collectorIsValid(collector)).toBe(false);

      collector.hospital = undefined;
      expect(collectorIsValid(collector)).toBe(false);
    });
    it('should return false if either collector.name or collector.hospital is an empty string', () => {
      const collector1 = { name: '', hospital: 'Albert Einstein' };
      const collector2 = { name: 'Thais', hospital: '' };

      expect(collectorIsValid(collector1)).toBe(false);
      expect(collectorIsValid(collector2)).toBe(false);
    });
  });
});
