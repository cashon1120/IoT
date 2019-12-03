import React, {Component} from 'react';
import {Card, Button, message, Modal} from 'antd';
import {connect} from 'dva';
import 'antd/dist/antd.css';
import StandardTable from '@/components/StandardTable';
import TableSearch from '../../components/TableSearch';
import {ConnectProps, ConnectState} from '@/models/connect';
import AddNew from './AddNew'
const {confirm} = Modal;

interface IProps extends ConnectProps {
  data?: any;
  loading?: boolean
}

interface IState {
  loading : boolean;
  modalVisible : boolean;
  modalData : any,
  searchData : {
    [key : string]: any
  };
  pageInfo : {
    pageSize: number;
    pageNumber: number;
  };
}

class Product extends Component < IProps,
IState > {
  state = {
    loading: false,
    modalVisible: false,
    modalData: {},
    searchData: {
      appName: ''
    },
    pageInfo: {
      pageSize: 10,
      pageNumber: 1
    }
  };

  columns = [
    {
      title: '产品名称',
      dataIndex: 'appName',
      key: 'appName'
    },{
      title: '型号',
      dataIndex: 'model',
      key: 'model'
    },{
      title: '设备类型',
      dataIndex: 'equipmentType',
      key: 'equipmentType'
    },{
      title: '厂商名称',
      dataIndex: 'tradeNames',
      key: 'tradeNames'
    },{
      title: '协议类型',
      dataIndex: 'protocol',
      key: 'protocol',
      render: (protocol: number) => protocol === 1 ? '808' : 'MQTT'
    }, {
      title: '创建时间',
      dataIndex: 'crtAt',
      key: 'crtAt'
    }, {
      title: '操作',
      width: 300,
      render: (record : any) => (
        <div className="table-operate">
          <a onClick={() => this.handleEdit(record)}>详情</a>
          <a onClick={() => this.handleDel(record.id)}>删除</a>
        </div>
      )
    }
  ];

  componentDidMount() {
    this.initData();
  }

  handleTriggerModal = () => {
    const {modalVisible} = this.state;
    this.setState({
      modalVisible: !modalVisible
    });
  };

  // 加载数据
  initData(params?: any) {
    const {dispatch} = this.props;
    const {searchData} = this.state;
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
        type: 'product/appList',
        payload: {
          sysUserId: sessionStorage.getItem('sysUserId'),
          ...searchParams,
          ...params
        }
      });
    }
  }

  // 配置搜索条件
  getSerarchColumns = () => {
    const serarchColumns = [
      {
        title: '搜索',
        dataIndex: 'appName',
        componentType: 'Input'
      }
    ];
    return serarchColumns;
  };

  // 搜索
  handleSearch = (values : any) => {
    const {searchData} = this.state

    this.setState({
      searchData: {
        ...searchData,
        ...values
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

  handleDel = (id : string) => {
    const {dispatch} = this.props
    const callback = (res : any) => {
      if (res.code === 1) {
        message.success('操作成功')
        this.initData()
      } else {
        message.error(res.msg)
      }
    }
    confirm({
      title: '系统提示',
      content: '确认要删除该设备吗?',
      onOk: () => {
        if (dispatch) {
          dispatch({
            type: 'product/delApp',
            payload: {
              sysUserId: sessionStorage.getItem('sysUserId'),
              id
            },
            callback
          });
        }
      }
    });
  }

  handleEdit = (record : any) => {
    this.setState({
      modalData: {
        ...record
      }
    })
    this.handleTriggerModal()
  }

  handleAddNew = () => {
    this.setState({modalData: {}})
    this.handleTriggerModal();
  }

  handleSubmitModal = () => {
    this.initData()
    this.handleTriggerModal();
  };

  render() {
    const {data, loading} = this.props;
    const {modalVisible, modalData} = this.state
    return (
      <Card>
        <div className="flex-container">
          <div className="flex-1">
            <TableSearch
              columns={this.getSerarchColumns()}
              handleSearch={this.handleSearch}
              handleFormReset={this.handleFormReset}/>
          </div>
          <div>
            <Button type="primary" onClick={this.handleAddNew}>创建产品模型</Button>
          </div>
        </div>
        <StandardTable
          rowKey="id"
          columns={this.columns}
          data={data || []}
          loading={loading}
          onChangeCombine={(params : object) => this.initData(params)}/>
        <AddNew
          modalVisible={modalVisible}
          modalData={modalData}
          onCancel={this.handleTriggerModal}
          onOk={this.handleSubmitModal}/>
      </Card>
    );
  }
}



export default connect(({product, loading} : ConnectState) => ({data: product.data, loading: loading.models.product}))(Product);
