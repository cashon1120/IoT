import React, {Component} from 'react';
import {Card, message, Modal, Button} from 'antd';
import {connect} from 'dva';
import 'antd/dist/antd.css';
import StandardTable from '@/components/StandardTable';
import {ConnectProps, ConnectState} from '@/models/connect';
import moment from 'moment';
import AddNew from './AddNew'
const { confirm } = Modal;

interface IProps extends ConnectProps {
  data?: any;
  loading?: boolean
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

class UserInfoList extends Component < IProps,
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
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '设备识别码',
      dataIndex: 'sex',
      key: 'sex',
    },  {
      title: '设备ID',
      dataIndex: 'birth_time',
      key: 'birth_time'
    }, 
    {
      title: '创建时间',
      dataIndex: 'graduation_time',
      key: 'graduation_time'
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
        type: 'userInfo/fetch',
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
    let startTime: string | undefined = undefined
    let endTime: string | undefined = undefined
    if(values.times){
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
    const { selectedRowKeys } = this.state
    if(selectedRowKeys.length === 0){
      message.error('请勾选要导出的数据')
      return
    }
    if (dispatch) {
      dispatch({type: 'userInfo/exportFile', payload: {}});
    }
  }

  hadleCheckOut = (id: string, type: number) => {
    const { dispatch } = this.props
    const callback = (res: any) => {
      if(res.success){
        message.success('操作成功')
      }else{
        message.error(res.data)
      }
    }
    let info = '审核通过后，考生即可扫描二维码考试，是否通过审核'
    if(type === 2){
      info = '确定要拒绝通过吗?'
    }
    confirm({
      title: '审核信息',
      content: info,
      onOk: () => {
        if(dispatch){
        dispatch({
          type: 'userInfo/checkOut',
          payload: {
            deliveryId: id,
            state: type,
          },
          callback,
        });
      }
      },
    });
  }

  render() {
    const {data, loading} = this.props;
    const {selectedRowKeys, modalVisible, modalData} = this.state;
    return (
        <Card>
                 <div className="flex-container">
          <div className="flex-1">
          </div>
          <div>
            <Button type="primary" onClick={this.handleAddNew}>注册</Button>
          </div>
        </div>
          <StandardTable
            // showSelectRow={true}
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
          onOk={this.handleSubmitModal}/>
        </Card>
    );
  }
}

export default connect(({global} : ConnectState) => ({voltageData: global.voltageData, typeData: global.typeData, driverData: global.driverData}))(UserInfoList);
