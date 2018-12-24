import { combineReducers } from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import taskEditing from './taskEditing';
import filterTask from './filterTask';
import keyword from './search';
import sort from './sort';

const myReducer = combineReducers({
    tasks,
    isDisplayForm,
    taskEditing,
    filterTask,
    keyword,
    sort
});
export default myReducer;