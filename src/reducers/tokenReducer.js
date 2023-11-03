const initialState = {
    data: null,
};
  
const tokenReducer = (state = initialState, action) => {
switch (action.type) {
    case 'VALIDATE_TOKEN':
    return { ...state, data: action.payload };
    default:
    return state;
}
};

export default tokenReducer;