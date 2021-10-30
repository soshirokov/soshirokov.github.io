const { addition, subtraction, multiplication, division } = require('../index');

describe('Проверка сложения', () => {
    it('должна возвращать 10 при аргументах (5, 5)', () => {
        expect(addition(5, 5)).toBe(10);
    });
    it('должна возвращать null при аргументах ("string", null)', () => {
        expect(addition("string", null)).toBeNull();
    });
    it('должна возвращать null при аргументах (undefined, undefined)', () => {
        expect(addition(undefined, undefined)).toBeNull();
    });
});

describe('Проверка вычитания', () => {
    it('должна возвращать 1 при аргументах (5, 4)', () => {
        expect(subtraction(5, 4)).toBe(1);
    });
    it('должна возвращать null при аргументах ("string", null)', () => {
        expect(subtraction("string", null)).toBeNull();
    });
    it('должна возвращать null при аргументах (undefined, undefined)', () => {
        expect(subtraction(undefined, undefined)).toBeNull();
    });
});

describe('Проверка умножения', () => {
    it('должна возвращать 25 при аргументах (5, 5)', () => {
        expect(multiplication(5, 5)).toBe(25);
    });
    it('должна возвращать null при аргументах ("string", null)', () => {
        expect(multiplication("string", null)).toBeNull();
    });
    it('должна возвращать null при аргументах (undefined, undefined)', () => {
        expect(multiplication(undefined, undefined)).toBeNull();
    });
});

describe('Проверка деления', () => {
    it('должна возвращать 1 при аргументах (5, 5)', () => {
        expect(division(5, 5)).toBe(1);
    });
    it('должна возвращать null при аргументах ("string", null)', () => {
        expect(division("string", null)).toBeNull();
    });
    it('должна возвращать null при аргументах (undefined, undefined)', () => {
        expect(division(undefined, undefined)).toBeNull();
    });
});