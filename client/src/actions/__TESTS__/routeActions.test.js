/**
 * Tests for route action creators.
 */
import {
    routesFetch,
    routesFetchFail,
    routesFetchSuccess
} from '../routeActions';
import {
    ROUTES_FETCH,
    ROUTES_FETCH_FAIL,
    ROUTES_FETCH_SUCCESS,
    KAUPPI_HERVANTA,
    KESKUSTA_KAUPPI
} from '../../constants';

describe('routeActions', () => {
    describe('pure action creators', () => {
        it('creates routesFetch', () => {
            expect(routesFetch(KAUPPI_HERVANTA))
            .toEqual({
                type: ROUTES_FETCH,
                name: KAUPPI_HERVANTA
            });
        });

        it('creates routesFetchFail', () => {
            expect(routesFetchFail(KAUPPI_HERVANTA))
            .toEqual({
                type: ROUTES_FETCH_FAIL,
                name: KAUPPI_HERVANTA
            });
        });

        it('creates routesFetchSuccess and passes routes', () => {
            const routes = ['route 1', 'route 2', 'route 3'];

            expect(routesFetchSuccess(KESKUSTA_KAUPPI, routes))
            .toEqual({
                type: ROUTES_FETCH_SUCCESS,
                name: KESKUSTA_KAUPPI,
                routes: ['route 1', 'route 2', 'route 3']
            });
        });
    });
});
