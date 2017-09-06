import { all } from 'redux-saga/effects';
import { watchFetchRoute } from './routeSagas';

export function* AppSaga() {
    yield all([
        watchFetchRoute()
    ]);
}
