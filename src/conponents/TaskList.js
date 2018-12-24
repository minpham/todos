import React from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1
        }
    }

    //khi nhập vào ô input hoặc select trong table
    changeData = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;

        this.props.onFilterTask({
            name: name === 'filterName' ? value : this.state.filterName,
            status: name === 'filterStatus' ? value : this.state.filterStatus
        })
        this.setState({
            [name] : value
        })
    }

	render() {
        var { tasks, filterTask, keyword, sort } = this.props;
        
        if(filterTask) {
            if(filterTask.filterName) {
                tasks =  tasks.filter(task => {
                    return task.name.toLowerCase().indexOf(filterTask.filterName.toLowerCase()) !== -1;
                })
            }
            tasks = tasks.filter(task => {
                if(filterTask.filterStatus === -1) {
                    return task;
                } else {
                    return task.status === ( filterTask.filterStatus ? true : false );
                }
            })
        }

        if(keyword) {
            tasks = tasks.filter(task => {
                return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
            })
        }

        if(sort) {
            if(sort.by === 'name') {
                tasks = tasks.sort((a, b) => {
                    if(a.name > b.name) return sort.value;
                    else if(a.name < b.name) return -sort.value;
                    else return 0;
                })
            }
            if(sort.by === 'status') {
                tasks = tasks.sort((a, b) => {
                    if(a.status > b.status) return -sort.value;
                    else if(a.status < b.status) return sort.value;
                    else return 0;
                })
            }
        }

		var elmTask = tasks.map((el, idx) => {
			return  <TaskItem 
                        key={ el.id } 
                        index={ idx } 
                        task={ el } 
                    />
		})
        var { filterName, filterStatus } = this.state;
		return (
			<div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Tên</th>
                                <th className="text-center">Trạng thái</th>
                                <th className="text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <input  type="text"
                                            className="form-control"
                                            name="filterName"
                                            value={ filterName }
                                            onChange={ this.changeData }
                                    />
                                </td>
                                <td>
                                    <select 
                                        className="form-control"
                                        name="filterStatus"
                                        value={ filterStatus }
                                        onChange={ this.changeData }
                                    >
                                        <option value={-1}>Tất cả</option>
                                        <option value={0}>Ẩn</option>
                                        <option value={1}>Kích hoạt</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                            { elmTask }
                        </tbody>
                    </table>
                </div>
            </div>
		);
	}
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks,
        filterTask: state.filterTask,
        keyword: state.keyword,
        sort: state.sort
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterTask : (filter) => {
            dispatch(actions.filterTask(filter));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TaskList);