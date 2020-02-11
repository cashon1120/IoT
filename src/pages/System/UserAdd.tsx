import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Dispatch} from 'redux';
import {ConnectState} from '../../models/connect';
import ModalFrom from '@/components/ModalForm';
import {message} from 'antd';
import {SEX_TYPE} from '../../../public/config'

interface IProps {
  modalVisible : boolean;
  roleData : any;
  partmentData : any;
  nationalityData: any;
  dispatch : Dispatch;
  modalData : {
    [key : string]: any;
  };
  onCancel : () => void;
  onOk : (fields : object | undefined) => void;
}

interface IState {
  confirmLoading : boolean;
}

class AddRole extends Component < IProps,
IState > {
  state = {
    confirmLoading: false,
    voltageAlarmValue: 0,
    voltageAutomaticPoweroffValue: 0
  };

  componentDidMount() {
    // const {roleData, partmentData, nationalityData, dispatch} = this.props
    // if (roleData.length <= 0) {
    //   dispatch({
    //     type: 'global/fetchRole',
    //     payload: {
    //       pageNum: 1,
    //       pageSize: 100
    //     }
    //   });
    // }
    // if (partmentData.length <= 0) {
    //   dispatch({
    //     type: 'global/fetchPartment',
    //     payload: {
    //       pageNum: 1,
    //       pageSize: 100
    //     }
    //   });
    // }
    // if (nationalityData.length <= 0) {
    //   dispatch({
    //     type: 'global/fetchNationality',
    //     payload: {
    //       pageNum: 1,
    //       pageSize: 100
    //     }
    //   });
    // }
  }

  handleSubmitModal = (fields : any) => {
    const {onOk, dispatch, modalData: {
        id
      }} = this.props;
    this.setState({confirmLoading: true});

    // 定义异步回调
    const callback = (res : any) => {
      this.setState({confirmLoading: false});
      if (res.code !== 1) {
        message.error(res.msg)
        return
      }
      onOk(fields);
    };
    dispatch({
      type: id
        ? 'system/updateUser'
        : 'system/addUser',
      payload: {
        id,
        ...fields
      },
      callback
    });
  };

  modalFromColumns() {
    const {
      partmentData,
      modalData: {
        id,
        realName,
        userName,
        password,
        sex,
        phone,
        email
      }
    } = this.props;

    const passwordInput = !id ? {
      title: '密码',
      dataIndex: 'password',
      componentType: 'Input',
      initialValue: password,
      requiredMessage: '请设置密码',
      required: true,
      placeholder: '请设置密码'
    } : null
    return [
      {
        title: '用户姓名',
        dataIndex: 'userName',
        componentType: 'Input',
        initialValue: userName,
        requiredMessage: '请输入用户姓名',
        required: true,
        placeholder: '请输入用户姓名'
      },passwordInput, {
        title: '真实姓名',
        dataIndex: 'realName',
        componentType: 'Input',
        initialValue: realName,
        requiredMessage: '请输入真实姓名',
        required: true,
        placeholder: '请输入真实姓名'
      }, {
        title: '性别',
        dataIndex: 'sex',
        componentType: 'Select',
        initialValue: sex,
        requiredMessage: '请选择性别',
        required: true,
        placeholder: '请选择性别',
        dataSource: SEX_TYPE
      }, {
        title: '联系电话',
        dataIndex: 'phone',
        componentType: 'Input',
        initialValue: phone,
        requiredMessage: '请输入联系电话',
        required: true,
        placeholder: '请输入联系电话'
      }, {
        title: '邮箱',
        dataIndex: 'email',
        componentType: 'Input',
        initialValue: email,
        dataSource: partmentData
      }
    ];
  }

  render() {
    const {confirmLoading} = this.state;
    const {modalVisible, onCancel, modalData: {
        id
      }} = this.props;
    return (
      <Fragment>
        <ModalFrom
          title={id
          ? '修改用户'
          : '添加用户'}
          columns={this.modalFromColumns()}
          onOk={this.handleSubmitModal}
          visible={modalVisible}
          confirmLoading={confirmLoading}
          onCancel={onCancel}/>
      </Fragment>
    );
  }
}

export default connect(({global} : ConnectState) => ({roleData: global.roleData,nationalityData: global.nationalityData, partmentData: global.partmentData}))(AddRole);
