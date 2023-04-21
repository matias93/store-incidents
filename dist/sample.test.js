"use strict";
function sum(a, b) {
    return a + b;
}
describe('sum function', () => {
    it('should return the sum of two numbers', () => {
        expect(sum(1, 2)).toBe(3);
    });
});
