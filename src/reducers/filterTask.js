import * as types from './../constants/ActionTypes';

const initialState = {
    filterName: '',
    filterStatus: -1
};

const myReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.FILTER_TASK:
            return {
                filterName: action.filter.name,
                filterStatus: Number(action.filter.status)
            }
        default:
            return state;
    }
}

export default myReducer;