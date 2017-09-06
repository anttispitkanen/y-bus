/**
 * Action creators for bu routes.
 */
import {
    ROUTES_FETCH,
    ROUTES_FETCH_FAIL,
    ROUTES_FETCH_SUCCESS
} from '../constants';

/**
 * Pure action creators.
 */
export const routesFetch = name => ({
    type: ROUTES_FETCH,
    name
});

export const routesFetchFail = name => ({
    type: ROUTES_FETCH_FAIL,
    name
});

export const routesFetchSuccess = (name, routes) => ({
    type: ROUTES_FETCH_SUCCESS,
    name,
    routes
});
