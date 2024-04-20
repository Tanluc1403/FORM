import React, { Component } from 'react';
import Studentmanager from './user';
import { connect } from 'react-redux';
import Search from './search';
import { error } from 'jquery';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            phone: "",
            email: "",

            errors: {
                id: "",
                name: "",
                phone: "",
                email: "",
            }

        };
    };

    handleOnchange = (event) => {
        console.log(event)
        const { name, value, pattern } = event.target;
        let newErrors = { ...this.state.errors };

        if (!value.trim()) {
            newErrors[name] = `(*) Vui lòng nhập thông tin`;
        } else {
            if (pattern) {
                const regex = new RegExp(pattern);
                const valid = regex.test(value); // đúng format: true, sai format: false
                if (!valid) {
                    newErrors[name] = `(*) ${name} chưa đúng định dạng`;
                } else {
                    newErrors[name] = "";
                }
            } else {
                newErrors[name] = "";
            }
        }

        this.setState({
            [name]: value,
            errors: newErrors,
        });
    };

    handleSubmitAdd = (event) => {
        // ngăn load lại web khi click vào nút submit
        event.preventDefault();

        const { listUser } = this.props;

        // check dữ liệu trung lap
        const idFind = listUser.find((user) => {
            return user.id === this.state.id;
        });
        const phoneFind = listUser.find((user) => {
            return user.phone === this.state.phone;
        });
        const emailFind = listUser.find((user) => {
            return user.email === this.state.email;
        });
        //check input = ""
        let newErrors = { ...this.state.errors };
        let isAdd = true;

        if (this.state.id == "") {
            newErrors.id = "(*) Vui lòng nhập thông tin";
            isAdd = false;
        }

        if (this.state.name == "") {
            newErrors.name = "(*) Vui lòng nhập thông tin";
            isAdd = false;
        }

        if (this.state.phone == "") {
            newErrors.phone = "(*) Vui lòng nhập thông tin";
            isAdd = false;
        }

        if (this.state.email == "") {
            newErrors.email = "(*) Vui lòng nhập thông tin";
            isAdd = false;
        }

        this.setState({
            errors: newErrors,
        });
        let isValid = true;
        // có thể sử dụng vòng lặp for in
        Object.values(this.state.errors).forEach((item) => {
            if (item) {
                isValid = false;
            }
        });
        if (idFind) {
            newErrors.id = "(*) MÃ SỐ đã tồn tại";
            isAdd = false;
        };
        if (phoneFind) {
            newErrors.phone = "(*) SỐ ĐIỆN THOẠI đã tồn tại";
            isAdd = false;
        };
        if (emailFind) {
            newErrors.email = "(*) EMAIL đã tồn tại";
            isAdd = false;
        };


        if (isAdd && isValid) {
            this.props.addUser(this.state);
            this.props.resetUserEdit();
        }
    };

    handleSubmitUpdate = (event) => {
        // ngăn load lại web khi click vào nút submit
        event.preventDefault();

        const { listUser,editUser } = this.props;
        let newErrors = { ...this.state.errors };
        let isAdd = true;
        const listUserUpdate = listUser.filter(item => item != editUser);
 
        // check id trung lap
        const phoneFind = listUserUpdate.find((user) => {
            return user.phone === this.state.phone;
        });
        const emailFind = listUserUpdate.find((user) => {
            return user.email === this.state.email;
        });
        
        if (phoneFind) {
            newErrors.phone = "(*) SỐ ĐIỆN THOẠI đã tồn tại";
            isAdd = false;
        };
        if (emailFind) {
            newErrors.email = "(*) EMAIL đã tồn tại";
            isAdd = false;
        };

        this.setState({
                errors : newErrors
            })

        let isValid = true;
        // có thể sử dụng vòng lặp for in
        Object.values(this.state.errors).forEach((item) => {
            if (item) {
                isValid = false;
            }
        });
        if (isValid && isAdd) {
            // cho phép gửi dữ liệu đi
            this.props.updateUser(this.state);
            this.props.resetUserEdit();
            this.props.hiddenUpdate();
        } else {
            // alert("Vui lòng kiểm tra lại thông tin");
            
        }

    }

    //edit user
    UNSAFE_componentWillReceiveProps(nextProps) {

        const { editUser } = nextProps; //nextProps: hiện tất cả các props được truyền qua, nên cần chọn cái nào thì lấy cái đó ra ngoài, (tham số mặc định)

        if (editUser) {
            this.setState({
                id: editUser.id,
                name: editUser.name,
                phone: editUser.phone,
                email: editUser.email,
            })
        } else {
            this.setState({
                id: "",
                name: "",
                phone: "",
                email: "",
            })
        }
    }

    handleReset = (event) => {
        event.preventDefault();
        this.setState({
            id: "",
            name: "",
            phone: "",
            email: "",
            errors: "",
        })
    };
    
    render() {

        return (
            <div className='container-fluid '>
                <div className="row">
                    <div className="col-6 mx-auto">
                        <h3 className="display-4 text-center mb-5">Thông Tin Sinh Viên </h3>

                        <form id="formQLSV">
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label htmlFor>Mã Số : </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="txtMaSV"
                                        disabled={this.props.hidenButon}
                                        name="id"
                                        onChange={this.handleOnchange}
                                        value={this.state.id}
                                        onBlur={this.handleOnchange}
                                        pattern='^\d+$'
                                    />
                                    {this.state.errors.id && (
                                        <span className="text text-danger">{this.state.errors.id}</span>
                                    )}
                                </div>
                                <div className="col-6 form-group">
                                    <label htmlFor>Họ tên : </label>
                                    <input
                                        // type="text"
                                        className="form-control"
                                        id="txtTenSV"
                                        name="name"
                                        onChange={this.handleOnchange}
                                        value={this.state.name}
                                        onBlur={this.handleOnchange}
                                        pattern="^[a-zA-ZÀ-ỹ\s]+$"
                                    />
                                    {this.state.errors.name && (
                                        <span className="text text-danger">{this.state.errors.name}</span>
                                    )}
                                </div>
                                <div className="col-6 form-group">
                                    <label htmlFor>Số điện thoại: </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="txtPass"
                                        name="phone"
                                        onChange={this.handleOnchange}
                                        value={this.state.phone}
                                        onBlur={this.handleOnchange}
                                        pattern="^(03|05|07|08|09)\d{8}$"

                                    />
                                    {this.state.errors.phone && (
                                        <span className="text text-danger">{this.state.errors.phone}</span>
                                    )}
                                </div>
                                <div className="col-6 form-group">
                                    <label htmlFor>Email : </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="txtEmail"
                                        name="email"
                                        onChange={this.handleOnchange}
                                        value={this.state.email}
                                        onBlur={this.handleOnchange}
                                        pattern="\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b"
                                    />
                                    {this.state.errors.email && (
                                        <span className="text text-danger">{this.state.errors.email}</span>
                                    )}
                                </div>
                            </div>
                            <div className="form-group text-center">
                                {this.props.hidenButon === true ?
                                    <button
                                        type="button"
                                        className="btn btn-info mr-3"
                                        onClick={this.handleSubmitUpdate}
                                    >
                                        UP DATE
                                    </button>
                                    :
                                    <button
                                        type="button"
                                        className="btn btn-success mr-3"
                                        onClick={this.handleSubmitAdd}

                                    >
                                        ADD USER
                                    </button>
                                }
                                {this.props.hidenButon === true ?
                                     ""
                                    :
                                    <button
                                        type="button"
                                        className="btn btn-dark mr-3"
                                        onClick={this.handleReset}
                                    >
                                        Reset Form
                                    </button>
                                }
                            </div>
                        </form>
                        <Search />
                    </div>

                </div>

                <Studentmanager />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUser: (user) => {
            const action = {
                type: "SUBMIT_ADD",
                payload: user,
            };
            dispatch(action);
        },
        resetUserEdit: () => {
            const action = {
                type: "RESET_USER",
                payload: null,
            }
            dispatch(action)
        },
        updateUser: (user) => {
            const action = {
                type: "SUBMIT_UPDATE",
                payload: user,
            };
            dispatch(action);
        },
        hiddenUpdate: () => {
            const action = {
                type: "HIDDEN_UPDATE",
                payload: false,
            }
            dispatch(action)
        },

    };
};

const mapStateToProps = (state) => {
    return {
        listUser: state.reducer.listUser,
        editUser: state.reducer.editUser,
        hidenButon: state.reducer.hidenButon,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Form)