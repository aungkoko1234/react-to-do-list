import React, { PureComponent } from 'react';
import { Card, Button, Tooltip, List, Typography, Modal, Input } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { addNewToDo,completeToDo,deleteToDo,updateToDo } from '../../action/toDoListAction';
import 'antd/dist/antd.css';
import './style.css';

class Home extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            to_do: '',
            errorMessage: '',
            isEdit :false,
            editId :null,
            isComplete : false
        }
        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }



    handleComplete(id) {
      this.props.completeToDo(id);
    }
    handleShowModal() {
        this.setState({
            showModal: true
        })
    }
    handleAdd() {
        if (this.state.to_do.length > 0) {
            let payload = {
                id: this.props.toDoListReducer.toDoList.length + 1,
                text: this.state.to_do,
                isComplete: false
            }
            this.props.addNewToDo(payload);
            this.setState({
                showModal: false,
                to_do: '',
                errorMessage :''
            })
        }
        else {
            this.setState({
                errorMessage: "To Do List Text is Required"
            })
        }

    }
    handleUpdate(){
        if (this.state.to_do.length > 0) {
            let payload = {
                id: this.state.editId,
                text: this.state.to_do,
                isComplete: this.state.isComplete
            }
            this.props.updateToDo(payload);
            this.setState({
                showModal: false,
                to_do: '',
                errorMessage :''
            })
        }
        else {
            this.setState({
                errorMessage: "To Do List Text is Required"
            })
        }
    }


    handleEdit(item){
         this.setState({
             to_do : item.text,
             showModal: true,
             isEdit:true,
             editId : item.id,
             isComplete : item.isComplete
         });
    }

    handleCancel() {
        this.setState({
            showModal: false,
            errorMessage :''
        })
    }

    handleInputChange(e) {
        this.setState({
            to_do: e.target.value,
            errorMessage :''
        })
    }
    renderModal() {
        return (

            <Modal
                title={(this.state.isEdit)? "Edit To Do" : "Add New To Do"}
                visible={this.state.showModal}
                onOk={this.handleAdd}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="back" onClick={this.handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={(this.state.isEdit)? this.handleUpdate : this.handleAdd}>
                        {
                            (this.state.isEdit)?
                            "Update":"Submit"
                        }
                    </Button>,
                ]}
            >
                <Input type="text" value={this.state.to_do} name="to_do" onChange={this.handleInputChange} />
                {
                    (this.state.errorMessage.length > 0) ?
                        <div className="error-message">{this.state.errorMessage}</div> :
                        <div></div>
                }


            </Modal>

        );
    }

    render() {
        let { toDoListReducer } = this.props;
        return (
            <div className="container">
                <Card title="To Do List" extra={<Tooltip title="add">
                    <Button type="primary" shape="circle" icon={< PlusCircleOutlined />} onClick={this.handleShowModal} />
                </Tooltip>} style={{ width: '100%' }}>
                    <List
                        header={null}
                        footer={null}
                        bordered
                        dataSource={toDoListReducer.toDoList}
                        renderItem={item => (
                            <List.Item key={item.id} actions={[<Button onClick={()=>this.handleEdit(item)}>Edit</Button>, <Button onClick={()=>this.handleComplete(item.id)}>Complete</Button>, <Button onClick={()=>this.props.deleteToDo(item.id)}>Delete</Button>]}>
                                <Typography className={(item.isComplete) ? "completed" : ""}>{item.text}</Typography>
                            </List.Item>
                        )}
                    />
                </Card>
                {this.state.showModal && this.renderModal()}
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        toDoListReducer: state.toDoListReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNewToDo: (payload) => dispatch(addNewToDo(payload)),
        completeToDo : (payload)=> dispatch(completeToDo(payload)),
        deleteToDo : (payload)=> dispatch(deleteToDo(payload)),
        updateToDo :(payload)=>dispatch(updateToDo(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);