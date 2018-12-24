import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TaskForm extends Component {
    //khai báo state để lưu dữ liệu khi nhập vào
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name : '',
            status: false
        }
    }

    //chạy trước khi render component
    //vì methods này chỉ chạy 1 lần nên khi mình bấm vào thêm công việc sẽ ko sửa dc và ngược lại
    // componentWillMount() {
    //     if(this.props.taskEditing) {
    //         this.setState({
    //             id: this.props.taskEditing.id,
    //             name: this.props.taskEditing.name,
    //             status: this.props.taskEditing.status
    //         })
    //     } else {
    //         this.onClear();
    //     }
    // }

    //sẽ chạy khi có props truyền vào và sẽ render lại component
    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.taskEditing) {
            this.setState({
                id: nextProps.taskEditing.id,
                name: nextProps.taskEditing.name,
                status: nextProps.taskEditing.status
            })
        } else {
            this.onClear();
        }
    }
    //bắt sự kiện click vào nút X để đóng form
    onCloseToDo = () => {
        this.props.onCloseForm();
    }

    //lấy dữ liệu từ form đổ và state, trong setState tên key trùng tên với name trong form
    changeData = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        //vì status khi console.log đang có kiểu string nên cần đưa về boolean
        if(name === 'status') {
            value = value === "true" ? true : false;
        }
        this.setState({
            [name]: value
        })
    }

    //khi submit thì nó sẽ chạy cái này 
    setData = (event) => {
        //ngăn ko load lại trang
        event.preventDefault();
        //đẩy dữ liệu vào store
        this.props.onSaveTask(this.state);
        //xóa trắng dữ liệu đã nhập trên form
        this.onClear();
        //close form bằng hàm đã xây dựng trước đó
        this.onCloseToDo();
    }

    //khi bấm vào nút hủy bỏ sẽ xóa hết dữ liệu trên form 
    onClear = () => {
        //reset về trạng thái ban đầu không có dữ liệu
        this.setState({
            name: '',
            status: false
        })
        this.onCloseToDo();
    }

    render() {
        if(!this.props.isDisplayForm) return null;
        return (
        <div className="panel panel-warning">
            <div className="panel-heading">
                <h3 className="panel-title">{ !this.state.id ? 'Thêm công việc' : 'Cập nhật công việc' } 
                    <span onClick={ this.onCloseToDo } className="fa fa-times-circle text-right">
                    </span>
                </h3>
            </div>
            <div className="panel-body">
                <form onSubmit={ this.setData }>                               
                    <div className="form-group">
                        <label>Tên: </label>
                        <input  
                            type="text"
                            className="form-control" 
                            name="name" 
                            onChange={ this.changeData }
                            value={ this.state.name }
                        />
                    </div>
                    <label>Trạng thái: </label>
                    <select 
                        name="status" 
                        className="form-control"
                        onChange={ this.changeData }
                        value={ this.state.status }
                    >
                        <option value={true}>Kích hoạt</option>
                        <option value={false}>Ẩn</option>
                    </select>
                    <br />
                    <div className="text-center">
                        <button 
                            type="submit" 
                            className="btn btn-warning"
                        >
                            <span className="fa fa-plus mr-5">
                            </span>Lưu lại</button>&nbsp;
                        <button 
                            type="button" 
                            className="btn btn-danger"
                            onClick={ this.onClear }
                        >
                            <span className="fa fa-close mr-5">
                            </span>Hủy bỏ</button>
                    </div>

                </form>
            </div>
        </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isDisplayForm : state.isDisplayForm,
        taskEditing : state.taskEditing
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask : (task) => {
            dispatch(actions.saveTask(task));
        },
        onCloseForm : () => {
            dispatch(actions.closeForm());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
