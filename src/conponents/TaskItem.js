import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TaskItem extends React.Component {

    toggleUpdate = () => {
       this.props.onToggleStatusTask(this.props.task.id);
    }
  
    deleteObj = () => {
        this.props.onDeleteTask(this.props.task.id);
        this.props.onCloseForm();
    }
   
    updateObj = () => {
        this.props.onOpenForm();
        this.props.onEditTask(this.props.task);
    } 
	render() {
        var { task, index } = this.props;
		return (
			<tr>
                <td className="text-center">{ index + 1 } </td>
                <td className="text-center">{ task.name}</td>
                <td className="text-center">
                    <span 
                        onClick={ this.toggleUpdate }
                        className={ task.status ? 'label label-danger' : 'label label-warning' }>
                        { task.status ? 'Kích hoạt' : 'Ẩn' }
                    </span>
                </td>
                <td className="text-center">
                    <button 
                        type="button" 
                        className="btn btn-warning"
                        onClick={ this.updateObj }
                    >
                        <span className="fa fa-pencil mr-5"></span>
                        Sửa
                   </button>&nbsp;
                   <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick={ this.deleteObj }
                    >
                        <span className="fa fa-trash mr-5"></span>
                        Xóa
                    </button>
                </td>
            </tr>
		);
	}
}

const mapStateToProps = state => {
    return {
            
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleStatusTask : (id) => {
            dispatch(actions.updateStatusTask(id));
        },
        onDeleteTask : (id) => {
            dispatch(actions.deleteTask(id))
        },
        onCloseForm : () => {
            dispatch(actions.closeForm());
        },
        onOpenForm : () => {
            dispatch(actions.openForm());
        },
        onEditTask: (task) => {
            dispatch(actions.editTask(task));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (TaskItem);