/**
 * Unit tests for utility functions.
 */
import React from 'react';
import { route1, route2 } from './mockRouteData';
import {
    parseDeparture,
    parseArrival,
    parseLineNumber,
    parseStop,
    parseDepartureAsDate,
    findDepartureTimeString
} from '.';

describe('parseDeparture', () => {
    it('parses correct departure time when first leg is walking', () => {
        const expectedDepTime = '15.41';

        expect(parseDeparture(route1))
        .toBe(expectedDepTime);
    });

    it('parses correct departure time when first leg is bus', () => {
        const expectedDepTime = '15.42';

        expect(parseDeparture(route2))
        .toBe(expectedDepTime);
    });
});

describe('parseArrival', () => {
    it('parses correct arrival time', () => {
        const expectArrTime1 = '15.52';
        const expectArrTime2 = '15.53';

        expect(parseArrival(route1))
        .toBe(expectArrTime1);

        expect(parseArrival(route2))
        .toBe(expectArrTime2);
    });
});

describe('parseLineNumber', () => {
    it('parses correct line number', () => {
        const expectedNum1 = '1B';
        const expectedNum2 = '29K';

        expect(parseLineNumber(route1))
        .toBe(expectedNum1);

        expect(parseLineNumber(route2))
        .toBe(expectedNum2);
    });
});

describe('parseStop', () => {
    it('parses a correct link', () => {
        const expectedLink1 = (
            <a
                href="http://lissu.tampere.fi/?mobile=1&key=Itsenäisyydenkatu+10&stop=0510"
                target="_blank">
                Itsenäisyydenkatu 10
            </a>
        );

        const expectedLink2 = (
            <a
                href="http://lissu.tampere.fi/?mobile=1&key=Itsenäisyydenkatu+10&stop=0510"
                target="_blank">
                Itsenäisyydenkatu 10
            </a>
        );

        expect(parseStop(route1))
        .toEqual(expectedLink1);

        expect(parseStop(route2))
        .toEqual(expectedLink2);
    });
});

describe('parseDepartureAsDate', () => {
    it('parses departure date correctly', () => {
        // note month - 1 because of JS date logic
        const expectedDate1 = new Date('2017', '08', '06', '15', '41');
        const expectedDate2 = new Date('2017', '08', '06', '15', '42');

        expect(parseDepartureAsDate('201709061541'))
        .toEqual(expectedDate1);

        expect(parseDepartureAsDate('201709061542'))
        .toEqual(expectedDate2);
    });
});

describe('findDepartureTimeString', () => {
    it('returns the correct departure time string', () => {
        const expected1 = '201709061541';
        const expected2 = '201709061542';

        expect(findDepartureTimeString(route1))
        .toBe(expected1);

        expect(findDepartureTimeString(route2))
        .toBe(expected2);
    });
});
