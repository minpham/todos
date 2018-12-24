import * as types from "../constants/ActionTypes";

var s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}
var gerenateID = () => {
    return s4() + s4() + '-' + s4() + s4() + '-' + s4() + s4() + '-' + s4() + s4();
}

var findIndex = (tasks, id) => {
    let index = -1;
    tasks.forEach((task, idx) => {
        if(task.id === id) {
            index = idx
        }
    })
    return index;
}

var data = JSON.parse(localStorage.getItem('tasks'));

var initialState = data ? data : [];

var  myReducer = (state = initialState, action) => {
    let index = -1;
    switch(action.type) {
        case types.LIST_ALL: 
            return state;

        case types.SAVE_TASK:
            var task = {
                id: action.task.id,
                name: action.task.name,
                status: action.task.status
            }
            if(!task.id) {
                if(task.name) {
                    task.id = gerenateID();
                    state.push(task);
                }
            } else {
                index = findIndex(state, task.id)
                state[index] = task;
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];

        case types.UPDATE_STATUS_TASK: 

            index = findIndex(state, action.id)

            //có 2 cách viết, dùng ...rest để trải object ra
            // C1: ngắn gọn
            state[index] = {
                ...state[index],
                status: !state[index].status
            }
            // C2: dài hơn tí
            // let cloneTask = {...state[index]};
            // cloneTask.status = !cloneTask.status;
            // state[index] = cloneTask;
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];

        case types.DELETE_TASK:
            index = findIndex(state, action.id);
            state.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        default: return state;
    }
}
export default myReducer;