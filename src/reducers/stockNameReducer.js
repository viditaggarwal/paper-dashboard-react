export const stockNameReducer = (state = 'AAPL', action) => {
    switch (action.type) {
        case 'UPDATE_STOCK_NAME':
            return action.payload;
        default:
            return state;
    }
};