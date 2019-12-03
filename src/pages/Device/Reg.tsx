import React, {Component} from 'react';
import {Card, message, Button} from 'antd';
import {connect} from 'dva';
import 'antd/dist/antd.css';
import StandardTable from '@/components/StandardTable';
import {ConnectProps, ConnectState} from '@/models/connect';
import moment from 'moment';
import AddNew from './AddNew'

interface IProps extends ConnectProps {
  data?: any;
  loading?: boolean;
  allApp : any
}

interface IState {
  loading : boolean;
  modalVisible : boolean;
  selectedRowKeys : any[];
  modalData : any,
  searchData : {
    [key : string]: any
  };
  pageInfo : {
    pageSize: number;
    pageNumber: number;
  };
}

class RegDevice extends Component < IProps,
IState > {
  state = {
    loading: false,
    modalVisible: false,
    selectedRowKeys: [],
    modalData: {},
    searchData: {
      name: '',
      status: '',
      startTime: '',
      endTime: ''
    },
    pageInfo: {
      pageSize: 10,
      pageNumber: 1
    }
  };

  columns = [
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status : number) => {
        let text = ''
        switch (status) {
          case 0:
            text = '未激活'
            break;
          case 1:
            text = '在线'
            break;
          case 2:
            text = '离线'
            break;
          default:
            text = '异常'
            break;
        }
        return text
      }
    }, {
      title: '设备识别码',
      dataIndex: 'deviceCode',
      key: 'deviceCode'
    }, {
      title: '设备ID',
      dataIndex: 'deviceId',
      key: 'deviceId'
    }, {
      title: '创建时间',
      dataIndex: 'crtAt',
      key: 'crtAt'
    }
  ];

  componentDidMount() {
    this.initData();
    const {allApp, dispatch} = this.props
    if (allApp.length === 0 && dispatch) {
      dispatch({
        type: 'global/appList',
        payload: {
          pageSize: 100,
          pageNumber: 1
        }
      });
    }
  }

  handleTriggerModal = () => {
    const {modalVisible} = this.state;
    this.setState({
      modalVisible: !modalVisible
    });
  };

  handleSelectRows = (selectedRowKeys : any[]) => {
    this.setState({selectedRowKeys})
  }

  handleAddNew = () => {
    this.setState({modalData: {}})
    this.handleTriggerModal();
  }

  // 加载数据
  initData(params?: any) {
    const {dispatch} = this.props;
    const {pageInfo, searchData} = this.state;
    const searchParams = {}
    // 拼接查询字段
    for (let key in searchData) {
      if (searchData[key]) {
        searchParams[key] = searchData[key]
      }
    }
    // 设置页码
    if (params) {
      this.setState({
        pageInfo: {
          pageNumber: params.pageNumber,
          pageSize: params.pageSize
        }
      });
    }

    if (dispatch) {
      dispatch({
        type: 'device/registerDeviceList',
        payload: {
          sysUserId: sessionStorage.getItem('sysUserId'),
          ...searchParams,
          ...pageInfo,
          ...params
        }
      });
    }
  }

  handleSubmitModal = () => {
    this.initData()
    this.handleTriggerModal();
  };

  // 搜索
  handleSearch = (values : any) => {
    const {searchData} = this.state
    let startTime : string | undefined = undefined
    let endTime : string | undefined = undefined
    if (values.times) {
      startTime = moment(values.times[0]).format('YYYY-MM-DD')
      endTime = moment(values.times[1]).format('YYYY-MM-DD')
    }
    delete values.times
    this.setState({
      searchData: {
        ...searchData,
        ...values,
        startTime,
        endTime
      }
    }, () => {
      this.initData()
    })
  }

  // 重置搜索
  handleFormReset = () => {
    this.setState({
      searchData: {}
    }, () => {
      this.initData()
    })
  }

  // 导出详情
  exportFiel = () => {
    const {dispatch} = this.props;
    const {selectedRowKeys} = this.state
    if (selectedRowKeys.length === 0) {
      message.error('请勾选要导出的数据')
      return
    }
    if (dispatch) {
      dispatch({type: 'userInfo/exportFile', payload: {}});
    }
  }

  render() {
    const {data, loading, allApp} = this.props;
    const {selectedRowKeys, modalVisible, modalData} = this.state;
    return (
      <Card>
        <div className="flex-container">
          <div className="flex-1"></div>
          <div>
            <Button type="primary" onClick={this.handleAddNew}>注册</Button>
          </div>
        </div>
        <StandardTable
          rowKey="id"
          columns={this.columns}
          data={data || []}
          loading={loading}
          onChangeCombine={(params : object) => this.initData(params)}
          onSelectRow={this.handleSelectRows}
          selectedRowKeys={selectedRowKeys}/>
        <AddNew
          modalVisible={modalVisible}
          modalData={modalData}
          onCancel={this.handleTriggerModal}
          allApp={allApp}
          onOk={this.handleSubmitModal}/>
      </Card>
    );
  }
}

export default connect(({device, loading, global} : ConnectState) => ({data: device.registerDevice, loading: loading.models.device, allApp: global.appListData}))(RegDevice);
