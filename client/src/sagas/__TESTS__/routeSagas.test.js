/**
 * Tests for routeSagas.
 */
import { put, call } from 'redux-saga/effects';
import { fetchRoute, apiClient } from '../routeSagas';
import {
    routesFetchSuccess,
    routesFetchFail
} from '../../actions/routeActions';
import sagaHelper from 'redux-saga-testing';

describe('routeSagas', () => {
    describe('fetchRoute succeeding', () => {
        const it = sagaHelper(fetchRoute({
            type: 'ROUTES_FETCH',
            name: 'KeskustaHervanta'
        }));

        const mockRoutes = [1, 2, 3];

        it('calls the API', result => {
            expect(result)
            .toEqual(call(apiClient, 'KeskustaHervanta'));

            return mockRoutes;
        });

        it('puts routesFetchSuccess with the result', result => {
            expect(result)
            .toEqual(put(routesFetchSuccess('KeskustaHervanta', mockRoutes)));
        });

        it('should be done now', result => {
            expect(result)
            .toBeUndefined();
        });
    });

    describe('fetchRoute failing and throwing', () => {
        const it = sagaHelper(fetchRoute({
            type: 'ROUTES_FETCH',
            name: 'KeskustaHervanta'
        }));

        const mockRoutes = [1, 2, 3];

        it('calls the API, which throws an error', result => {
            expect(result)
            .toEqual(call(apiClient, 'KeskustaHervanta'));

            // Here we pretend that the API threw an exception.
            // We don't "throw" here but we return an error, which will be considered by the
            // redux-saga-testing helper to be an exception to throw on the generator.
            return new Error('something went wrong');
        });

        it('triggers error action', result => {
            expect(result)
            .toEqual(put(routesFetchFail('KeskustaHervanta')));
        });

        it('should be done now', result => {
            expect(result)
            .toBeUndefined();
        });
    });
});
