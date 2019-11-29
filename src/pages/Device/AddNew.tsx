import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { ConnectState } from '../../models/connect';
import ModalFrom from '@/components/ModalForm';
import { message } from 'antd';

interface IProps {
  modalVisible: boolean;
  dispatch: Dispatch;
  modalData: {
    [key: string]: any
  };
  onCancel: () => void;
  onOk: (fields: object | undefined) => void;
}

interface IState {
  confirmLoading: boolean;
}

class AddCompany extends Component<IProps, IState> {
  state = {
    confirmLoading: false,
  };

  handleSubmitModal = (fields: object | undefined) => {
    const { onOk, dispatch,modalData: {id} } = this.props;
    this.setState({ confirmLoading: true });

    // 定义异步回调
    const callback = (res: any) => {
      if(res.success){
        message.success('操作成功')
      }else{
        message.error(res.data)
      }
      this.setState({ confirmLoading: false });
      onOk(fields)
    };
    const type = id ? 'company/update' : 'company/add'
    const payload = id ? {
      sysUserId: sessionStorage.getItem('sysUserId'),
      selectedUserId: id,
      ...fields,
    } : {
      sysUserId: sessionStorage.getItem('sysUserId'),
      ...fields,
    }
    dispatch({
      type,
      payload,
      callback,
    });
  };

  modalFromColumns() {
    const {
      modalData: { company_name },
    } = this.props;
    return [
      {
        title: '选择产品',
        dataIndex: 'companyName',
        componentType: 'Input',
        initialValue: company_name,
        requiredMessage: '请输入产品名称',
        required: true,
        placeholder: '请输入产品名称',
      },
      {
        title: '设备识别码',
        dataIndex: 'companyName',
        componentType: 'Input',
        initialValue: company_name,
        requiredMessage: '请输入设备识别码',
        required: true,
        placeholder: '请输入设备识别码',
      },
      {
        title: '预置密码',
        dataIndex: 'companyName',
        componentType: 'Input',
        initialValue: company_name,
        requiredMessage: '请输入预置密码',
        required: true,
        placeholder: '请输入预置密码',
      },
      {
        title: '确认密码',
        dataIndex: 'type',
        componentType: 'Input',
        requiredMessage: '请和预置密码保持一致',
        required: true,
        placeholder: '请和预置密码保持一致',
      }
    ];
  }

  render() {
    const { confirmLoading } = this.state;
    const { modalVisible, onCancel, modalData:{id} } = this.props;
    return (
      <Fragment>
        <ModalFrom
          title={id ? '手动创建' : '手动创建'}
          columns={this.modalFromColumns()}
          onOk={this.handleSubmitModal}
          visible={modalVisible}
          confirmLoading={confirmLoading}
          onCancel={onCancel}
        />
      </Fragment>
    );
  }
}

export default connect(({}: ConnectState) => ({}))(AddCompany);
