import React, {Component} from 'react';
import {Card, message, Modal} from 'antd';
import {connect} from 'dva';
import 'antd/dist/antd.css';
import StandardTable from '@/components/StandardTable';
import TableSearch from '../../components/TableSearch';
import {ConnectProps, ConnectState} from '@/models/connect';
import moment from 'moment';
const { confirm } = Modal;

interface IProps extends ConnectProps {
  data?: any;
  loading?: boolean
}

interface IState {
  loading : boolean;
  modalVisible : boolean;
  selectedRowKeys : any[];
  searchData : {
    [key : string]: any
  };
  pageInfo : {
    pageSize: number;
    pageNumber: number;
  };
}

class Device extends Component < IProps,
IState > {
  state = {
    loading: false,
    modalVisible: false,
    selectedRowKeys: [],
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
      title: '设备名称',
      dataIndex: 'deviceName',
      key: 'deviceName'
    }, {
      title: '设备识别码',
      dataIndex: 'deviceCode',
      key: 'deviceCode'
    },  {
      title: '设备类型',
      dataIndex: 'equipmentType',
      key: 'equipmentType'
    }, 
    {
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
      key: 'crtAt',
    },{
      title: '操作',
      width: 80,
      render: (record: any) => (
        <div className="table-operate">
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
            type: 'device/delDevice',
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

  handleSelectRows = (selectedRowKeys : any[]) => {
    this.setState({selectedRowKeys})
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
        type: 'device/deviceAll',
        payload: {
          sysUserId: sessionStorage.getItem('sysUserId'),
          ...searchParams,
          ...pageInfo,
          ...params
        }
      });
    }
  }

  // 配置搜索条件
  getSerarchColumns = () => {
    const serarchColumns = [
      {
        title: '设备名称',
        dataIndex: 'name',
        componentType: 'Input'
      }, {
        title: '设备id',
        dataIndex: 'education',
        componentType: 'Input',
      },{
        title: '设备识别码',
        dataIndex: 'phone',
        componentType: 'Input'
      }
    ];
    return serarchColumns;
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
    const {selectedRowKeys} = this.state;
    return (
        <Card>
           <div className="flex-container">
          <div className="flex-1" style={{paddingRight: 10}}>
            <Card>
            总数
            <span className="countNumber">0</span>
            </Card>
          </div>
          <div className="flex-1" style={{paddingRight: 10}}>
            <Card>
              在线
            <span className="countNumber">0</span>
            </Card>
          </div>
          <div className="flex-1" style={{paddingRight: 10}}>
            <Card>
              离线
            <span className="countNumber">0</span>
            </Card>
          </div>
          <div className="flex-1" style={{paddingRight: 10}}>
            <Card>
              未激活
            <span className="countNumber">0</span>
            </Card>
          </div>
          <div className="flex-1">
            <Card>
              异常
              <span className="countNumber">0</span>
            </Card>
          </div>
        </div>
          <div className="flex-container">
            <div className="flex-1">
              <TableSearch
                columns={this.getSerarchColumns()}
                handleSearch={this.handleSearch}
                handleFormReset={this.handleFormReset}
                />
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
        </Card>
    );
  }
}


export default connect(({device, loading} : ConnectState) => ({data: device.deviceData, loading: loading.models.device}))(Device);
