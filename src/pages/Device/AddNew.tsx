import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Dispatch} from 'redux';
import {ConnectState} from '../../models/connect';
import ModalFrom from '@/components/ModalForm';
import {message} from 'antd';

interface IProps {
  modalVisible : boolean;
  allApp : any[];
  dispatch : Dispatch;
  modalData : {
    [key : string]: any
  };
  onCancel : () => void;
  onOk : (fields : object | undefined) => void;
}

interface IState {
  confirmLoading : boolean;
  appId : number
}

class AddRegDevice extends Component < IProps,
IState > {
  state = {
    appId: 0,
    confirmLoading: false
  };

  handleSubmitModal = (fields : any) => {
    const {appId} = this.state
    const {onOk, dispatch} = this.props;
    if(fields && (fields.password !== fields.confirmPassword)){
      message.error('两次密码输入不一致')
      return 
    }
    delete fields.appName
    this.setState({confirmLoading: true});
    // 定义异步回调
    const callback = (res : any) => {
      if (res.code === 1) {
        message.success('操作成功')
      } else {
        message.error(res.msg)
      }
      this.setState({confirmLoading: false});
      onOk(fields)
    };
    const type = 'device/saveDevice'
    const payload = {
        appId,
        ...fields
      }
    dispatch({type, payload, callback});
  };

  handleAppChange = (e : any) => {
    this.setState({appId: e})
  }

  modalFromColumns() {
    const {
      allApp,
      modalData: {
        appName,
        deviceCode,
        password,
        confirmPassword
      }
    } = this.props;
    return [
      {
        title: '选择产品',
        dataIndex: 'appName',
        componentType: 'Select',
        initialValue: appName,
        requiredMessage: '请选择产品',
        required: true,
        placeholder: '请选择产品',
        selectName: 'appName',
        handleChange: this.handleAppChange,
        dataSource: allApp
      }, {
        title: '设备识别码',
        dataIndex: 'deviceCode',
        componentType: 'Input',
        initialValue: deviceCode,
        requiredMessage: '请输入设备识别码',
        required: true,
        placeholder: '请输入设备识别码'
      }, {
        title: '预置密码',
        dataIndex: 'password',
        componentType: 'Input',
        initialValue: password,
        requiredMessage: '请输入预置密码',
        required: true,
        placeholder: '请输入预置密码'
      }, {
        title: '确认密码',
        dataIndex: 'confirmPassword',
        componentType: 'Input',
        initialValue: confirmPassword,
        requiredMessage: '请和预置密码保持一致',
        required: true,
        placeholder: '请和预置密码保持一致'
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
          ? '手动创建'
          : '手动创建'}
          columns={this.modalFromColumns()}
          onOk={this.handleSubmitModal}
          visible={modalVisible}
          confirmLoading={confirmLoading}
          onCancel={onCancel}/>
      </Fragment>
    );
  }
}

export default connect(({} : ConnectState) => ({}))(AddRegDevice);
