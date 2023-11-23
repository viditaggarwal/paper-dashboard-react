const initialState = {
    stocksByScore: []
};

export const stocksByScoreReducer = (state = initialState, action) => {
    console.log('highScoreStocksReducer action', action);
    switch (action.type) {
        case 'SET_HIGH_SCORE_STOCKS':
        return {
            ...state,
            stocksByScore: action.payload
        };
        default:
        return state;
    }
};