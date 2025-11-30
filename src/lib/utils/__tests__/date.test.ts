import { formatDate, formatDateShort } from '../date';

describe('date utilities', () => {
  describe('formatDate', () => {
    it('formats date in Spanish long format', () => {
      const result = formatDate('2024-01-15');
      expect(result).toBe('15 de enero, 2024');
    });

    it('handles different months', () => {
      expect(formatDate('2024-06-20')).toBe('20 de junio, 2024');
      expect(formatDate('2024-12-25')).toBe('25 de diciembre, 2024');
    });

    it('handles single digit days', () => {
      const result = formatDate('2024-03-05');
      expect(result).toBe('5 de marzo, 2024');
    });
  });

  describe('formatDateShort', () => {
    it('formats date in short format', () => {
      const result = formatDateShort('2024-01-15');
      expect(result).toBe('15/01/2024');
    });

    it('pads single digit days and months', () => {
      expect(formatDateShort('2024-03-05')).toBe('05/03/2024');
    });

    it('handles end of year dates', () => {
      expect(formatDateShort('2024-12-31')).toBe('31/12/2024');
    });
  });
});
