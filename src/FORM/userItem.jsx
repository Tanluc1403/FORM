import React, { Component } from 'react'
import { connect } from 'react-redux';

class UserItem extends Component {

  handleEdit = (user) => {
    //gửi user-edit
    this.props.editUser(user);
    //ẩn nút add, hiện nút update
    this.props.hiddenButtonAdd();
    //disable ID-input
    this.props.disableID();
  }

  render() {
    const {user} = this.props;
    console.log(user)
    return (
      <tr> 
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.phone}</td>
      <td>{user.email}</td>
      
      <td>
        <button
          className="btn btn-info mr-2"
          data-toggle="modal"
          data-target="#modelIdUser"
          onClick={()=>{
            this.handleEdit(user)
          }}
        >
          Edit
        </button>
        <button
          className="btn btn-danger"
          onClick={ () => {
          this.props.deleteUser(user.id)
          }}
        >
          Delete
        </button>
      </td>
    </tr>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editUser: (user) => {
      const action = {
        type : "EDIT_USER",
        payload: user,
      };
      dispatch(action)
    },

    deleteUser: (id) => {
      const action = {
        type : "DELETE_USER",
        payload: id,
      };
      dispatch(action)
    },

    hiddenButtonAdd: () => {
      const action = {
        type : "HIDDEN_ADD",
        payload: true,
      };
      dispatch(action)
    },

    disableID : () => {
      const action = {
        type: "DISABLE_ID",
        payload: true,
      }
      dispatch(action)
    },
  }
}

export default connect (null, mapDispatchToProps) (UserItem)