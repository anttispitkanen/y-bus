import routesReducer from '../routesReducer';
import {
    ROUTES_FETCH,
    ROUTES_FETCH_FAIL,
    ROUTES_FETCH_SUCCESS,
    KESKUSTA_HERVANTA,
    KESKUSTA_KAUPPI,
    HERVANTA_KESKUSTA,
    HERVANTA_KAUPPI,
    KAUPPI_HERVANTA,
    KAUPPI_KESKUSTA
} from '../../constants';

const initialState = {
    [KESKUSTA_HERVANTA]: {
        routes: [1, 2, 3],
        status: ROUTES_FETCH_SUCCESS
    },
    [KESKUSTA_KAUPPI]: {
        routes: [4, 5, 6],
        status: ROUTES_FETCH_SUCCESS
    },
    [KAUPPI_HERVANTA]: {
        routes: [],
        status: ROUTES_FETCH
    },
    [KAUPPI_KESKUSTA]: {
        routes: [],
        status: null
    },
    [HERVANTA_KESKUSTA]: {
        routes: [],
        status: null
    },
    [HERVANTA_KAUPPI]: {
        routes: [],
        status: null
    }
};

describe('routesReducer', () => {
    describe('initializing fetch', () => {
        it('initializes fetch without altering existing routes', () => {
            const expextedState = {
                [KESKUSTA_HERVANTA]: {
                    routes: [1, 2, 3],
                    status: ROUTES_FETCH
                },
                [KESKUSTA_KAUPPI]: {
                    routes: [4, 5, 6],
                    status: ROUTES_FETCH_SUCCESS
                },
                [KAUPPI_HERVANTA]: {
                    routes: [],
                    status: ROUTES_FETCH
                },
                [KAUPPI_KESKUSTA]: {
                    routes: [],
                    status: null
                },
                [HERVANTA_KESKUSTA]: {
                    routes: [],
                    status: null
                },
                [HERVANTA_KAUPPI]: {
                    routes: [],
                    status: null
                }
            };

            const action = {
                type: ROUTES_FETCH,
                name: KESKUSTA_HERVANTA
            };

            expect(routesReducer(initialState, action))
            .toEqual(expextedState);
        });
    });

    describe('failing', () => {
        it('sets failure state without removing routes', () => {
            const expextedState = {
                [KESKUSTA_HERVANTA]: {
                    routes: [1, 2, 3],
                    status: ROUTES_FETCH_FAIL
                },
                [KESKUSTA_KAUPPI]: {
                    routes: [4, 5, 6],
                    status: ROUTES_FETCH_SUCCESS
                },
                [KAUPPI_HERVANTA]: {
                    routes: [],
                    status: ROUTES_FETCH
                },
                [KAUPPI_KESKUSTA]: {
                    routes: [],
                    status: null
                },
                [HERVANTA_KESKUSTA]: {
                    routes: [],
                    status: null
                },
                [HERVANTA_KAUPPI]: {
                    routes: [],
                    status: null
                }
            };

            const action = {
                type: ROUTES_FETCH_FAIL,
                name: KESKUSTA_HERVANTA
            };

            expect(routesReducer(initialState, action))
            .toEqual(expextedState);
        });
    });

    describe('success', () => {
        it('successful fetch retrieves and sets new routes', () => {
            const expextedState = {
                [KESKUSTA_HERVANTA]: {
                    routes: [1, 2, 3],
                    status: ROUTES_FETCH_SUCCESS
                },
                [KESKUSTA_KAUPPI]: {
                    routes: [4, 5, 6],
                    status: ROUTES_FETCH_SUCCESS
                },
                [KAUPPI_HERVANTA]: {
                    routes: ['route 1', 'route 2', 'route 3'],
                    status: ROUTES_FETCH_SUCCESS
                },
                [KAUPPI_KESKUSTA]: {
                    routes: [],
                    status: null
                },
                [HERVANTA_KESKUSTA]: {
                    routes: [],
                    status: null
                },
                [HERVANTA_KAUPPI]: {
                    routes: [],
                    status: null
                }
            };

            const action = {
                type: ROUTES_FETCH_SUCCESS,
                name: KAUPPI_HERVANTA,
                routes: ['route 1', 'route 2', 'route 3']
            };

            expect(routesReducer(initialState, action))
            .toEqual(expextedState);
        });
    });
});
