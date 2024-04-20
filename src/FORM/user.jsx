import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserItem from './userItem';

class Studentmanager extends Component {

    renderListUser = () => {
        const { listUser, keyword } = this.props;

        
            const usersFilter = listUser.filter((users) => {
                return users.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;//indexOf để tìm kím tương đối,  chuyển user.fullname và keyword cùng về viết thường hoặc viết hoa để so sánh , điều kiện khác -1 vì -1 là keywork và name khác nhau
            });
    
            return usersFilter?.map((user) => { //"?"kiểm tra user (khác null / undefined) thì .map để duyệt mảng
                return (
                    <UserItem
                        key={user.id}
                        user={user} />
                );
            });
        
    }


    render() {
        return (

            <div className="col-8 mx-auto">
                <table className="table">
                    <thead>
                        <tr id="thead">
                            <th>Mã Số</th>
                            <th>Họ Tên</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Tính năng</th>
                        </tr>
                    </thead>
                    <tbody>{this.renderListUser()} </tbody>
                </table>
            </div>


        )
    }
}

const mapStateToProps = (state) => {
    return {
        listUser: state.reducer.listUser,
        keyword: state.reducer.keyword,
    }
}

export default connect(mapStateToProps, null)(Studentmanager)