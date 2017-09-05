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
} from '../constants';

const initialState = {
    [KESKUSTA_HERVANTA]: {
        routes: [],
        status: null
    },
    [KESKUSTA_KAUPPI]: {
        routes: [],
        status: null
    },
    [KAUPPI_HERVANTA]: {
        routes: [],
        status: null
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

export const routesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ROUTES_FETCH:
            return {
                ...state,
                [action.name]: {
                    ...state[action.name],
                    status: ROUTES_FETCH
                }
            };

        case ROUTES_FETCH_FAIL:
            return {
                ...state,
                [action.name]: {
                    ...state[action.name],
                    status: ROUTES_FETCH_FAIL
                }
            };

        case ROUTES_FETCH_SUCCESS:
            return {
                ...state,
                [action.name]: {
                    ...state[action.name],
                    status: ROUTES_FETCH_SUCCESS,
                    routes: action.routes
                }
            }

        default:
            return state;
    }
}

export default routesReducer;
