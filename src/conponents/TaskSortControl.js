import React, { Component } from 'react';
import { connect } from  'react-redux';
import * as actions from '../actions/index';

class TaskSortControl extends Component {

	sortData = (sortBy, sortValue) => {
		this.props.onSort({
			by: sortBy,
			value: sortValue
		})
	}

	render() {
		var { sort } = this.props;
		return (
			<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
	            <div className="dropdown">
	                <button 
	                    type="button"   
	                    className="btn btn-primary dropdown-toggle"
	                    id="dropdownMenu1"
	                    data-toggle="dropdown"
	                    aria-haspopup="true"
	                    aria-expanded="true"
	                >Sắp xếp<span className="fa fa-caret-square-o-down ml-5"></span>
	                </button>
	                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
	                    <li onClick={ () => { this.sortData('name', 1) }}>
	                        <a 	
	                        	href="\#" 
	                        	role="button" 
	                        	className={ (sort.by === 'name' && sort.value === 1) ? 'sort_selected' : ''}
	                        >
	                            <span className="fa fa-sort-alpha-asc pr-5">
	                                Tên A-Z
	                            </span>
	                        </a>
	                    </li>
	                    <li onClick={ () => { this.sortData('name', -1) } }>
	                        <a 
	                        	href="\#" 
	                        	role="button" 
	                        	className={ (sort.by === 'name' && sort.value === -1) ? 'sort_selected' : ''}
	                        >
	                            <span className="fa fa-sort-alpha-desc pr-5">
	                                Tên Z-A
	                            </span>
	                        </a>
	                    </li>
	                    <li role="separator" className="divider"></li>
	                    <li onClick={ () => { this.sortData('status', 1) }}>
	                        <a 	
	                        	href="\#" 
	                        	role="button" 
	                        	className={ (sort.by === 'status' && sort.value === 1) ? 'sort_selected' : ''}
	                        >
	                            Trạng thái kích hoạt
	                        </a>
	                    </li>
	                    <li onClick={ () => { this.sortData('status', -1) }}>
	                        <a 
	                        	href="\#" 
	                        	role="button" 
	                        	className={ (sort.by === 'status' && sort.value === -1) ? 'sort_selected' : ''}
	                        >
	                            Trạng thái ẩn
	                        </a>
	                    </li>
	                </ul>
	            </div>
	        </div>
        );
	}
}
const mapStateToProps = state => {
	return {
		sort: state.sort
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		onSort : (sort) => {
			dispatch(actions.sortTask(sort));
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskSortControl);