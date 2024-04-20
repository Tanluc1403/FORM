import React, { Component } from 'react';
import { connect } from 'react-redux';

class Search extends Component {
  
    handleKeyWord = (event) => { //event: tham số mặc định(1 object và có thuộc tính target, trong target có value(giống DOM bên js))
        const keyword = event.target.value; //mỗi lần gõ vào ô tìm kím sẽ check lại giá trị
        // this.props.getKeyWord(keyword);//truyền keyword ra ngoài
        this.props.search(keyword);
      };
    
  render() {
    return (
      <div>
        <input
        type="text"
        className="form-control mb-3 w-50"
        placeholder='Search By Name ...'
        onChange={this.handleKeyWord}
      />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
    return{
        search: (keyword) => {
            const action = {
                type: "KEYWORD",
                payload: keyword,
            }
            dispatch(action)
        }
    }
}

export default connect (null, mapDispatchToProps) (Search)