import { call, put, takeEvery } from 'redux-saga/effects';
import {
    routesFetchFail,
    routesFetchSuccess
} from '../actions/routeActions';
import { ROUTES_FETCH } from '../constants';

// watcher saga
export function* watchFetchRoute() {
    yield takeEvery(ROUTES_FETCH, fetchRoute);
}

export const apiClient = routeName => (
    fetch('/route', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: routeName
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw Error(res.statusText);
        }
    })
    .catch(err => {
        console.error(err);
        throw Error(err);
    })
);

// worker saga
export function* fetchRoute(action) {
    try {
        const routes = yield call(apiClient, action.name);
        yield put(routesFetchSuccess(action.name, routes));
    } catch (e) {
        console.error(e);
        yield put(routesFetchFail(action.name));
    }
}
