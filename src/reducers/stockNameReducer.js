export const stockNameReducer = (state = '', action) => {
    switch (action.type) {
        case 'UPDATE_STOCK_NAME':
            return action.payload;
        default:
            return state;
    }
};