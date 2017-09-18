/**
 * Tests for server functions.
 */
const { route1, route2 } = require('./mockData');
const {
    parseDepartureTime,
    findDepartureTimeString
} = require('./server.js');

describe('parseDepartureTime', () => {
    it('parses a correct date', () => {
        const dateTimeString = '201709061549';
        // Note month - 1 because of JS date logic
        const expectedDate = new Date('2017', '08', '06', '15', '49');

        expect(parseDepartureTime(dateTimeString))
        .toEqual(expectedDate);
    });
});

describe('findDepartureTimeString', () => {
    it('should find depTime when first leg is walking', () => {
        const expectedDepString = '201709061541';

        expect(findDepartureTimeString(route1))
        .toBe(expectedDepString);
    });

    it('should find depTime when first leg is bus', () => {
        const expectedDepString = '201709061542';

        expect(findDepartureTimeString(route2))
        .toBe(expectedDepString);
    });
});
