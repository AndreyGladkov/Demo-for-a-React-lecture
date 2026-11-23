import { expect, test } from 'vitest';

import { formatMoney, formatSalary } from './format';

test.each([
    { amount: 36000, currency: 'KZT', expected: '36 000 ₸' },
    { amount: 1250000, currency: 'RUB', expected: '1 250 000 ₽' },
    { amount: 900, currency: 'RUB', expected: '900 ₽' },
] as const)('formats $amount $currency', ({ amount, currency, expected }) => {
    expect(formatMoney(amount, currency)).toBe(expected);
});

test('salary uses the legacy RUR code as roubles', () => {
    expect(formatSalary(120000, 'RUR')).toBe('от 120 000 ₽');
});
