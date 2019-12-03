import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Dispatch} from 'redux';
import {ConnectState} from '../../models/connect';
import ModalFrom from '@/components/ModalForm';
import {message} from 'antd';

interface IProps {
  modalVisible : boolean;
  dispatch : Dispatch;
  modalData : {
    [key : string]: any
  };
  onCancel : () => void;
  onOk : (fields : object | undefined) => void;
}

interface IState {
  confirmLoading : boolean;
}

class AddCompany extends Component < IProps,
IState > {
  state = {
    confirmLoading: false
  };

  handleSubmitModal = (fields : object | undefined) => {
    const {onOk, onCancel, dispatch, modalData: {
        id
      }} = this.props;
    // 定义异步回调
    const callback = (res : any) => {
      if (res.code === 1) {
        message.success('操作成功')
        onOk(fields)
      } else {
        message.error(res.msg)
      }
      this.setState({confirmLoading: false});
    };
    if (id) {
      onCancel()
    } else {
      this.setState({confirmLoading: true});
      const type = 'product/saveApp'
      const payload = id
        ? {
          sysUserId: sessionStorage.getItem('sysUserId'),
          selectedUserId: id,
          ...fields
        }
        : {
          sysUserId: sessionStorage.getItem('sysUserId'),
          ...fields
        }
      dispatch({type, payload, callback});
    }

  };

  modalFromColumns() {
    const {
      modalData: {
        id,
        appName,
        model,
        equipmentType,
        tradeNames,
        protocol
      }
    } = this.props;
    return [
      {
        title: '产品名称',
        dataIndex: 'appName',
        componentType: 'Input',
        initialValue: appName,
        requiredMessage: '请输入产品名称',
        required: true,
        placeholder: '请输入产品名称',
        disabled: id
      }, {
        title: '型号',
        dataIndex: 'model',
        componentType: 'Input',
        initialValue: model,
        requiredMessage: '请输入型号',
        required: true,
        placeholder: '请输入型号',
        disabled: id
      }, {
        title: '设备类型',
        dataIndex: 'equipmentType',
        componentType: 'Input',
        initialValue: equipmentType,
        requiredMessage: '请输入设备类型',
        required: true,
        placeholder: '请输入设备类型',
        disabled: id
      }, {
        title: '厂商名称',
        dataIndex: 'tradeNames',
        componentType: 'Input',
        initialValue: tradeNames,
        requiredMessage: '请输入厂商名称',
        required: true,
        placeholder: '请输入厂商名称',
        disabled: id
      }, {
        title: '协议类型',
        dataIndex: 'protocol',
        componentType: 'Radio',
        initialValue: protocol,
        disabled: id,
        dataSource: [
          {
            name: '808',
            value: 1
          }, {
            name: 'MQTT',
            value: 2
          }
        ]
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

export default connect(({} : ConnectState) => ({}))(AddCompany);
