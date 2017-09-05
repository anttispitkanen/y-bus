
const initialState = {
    keskustaHervanta: null,
    keskustaKauppi: null,
    status: null
};

export const keskusta = (state = initialState, action) => {
    switch (action.type) {
        case 'ROUTE_FETCH':
            return {
                ...state,
                status: 'ROUTE_FETCH'
            };

        default:
            return state;
    }
}

export default keskusta;
