import React, {Component} from 'react';
import {Dispatch, AnyAction} from 'redux';
import {connect} from 'dva';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import CreateForm from './components/CreateForm';
import AddForm from './components/AddForm';
import CreateTable from './components/CreateTable';
import {messageModal} from '@/utils/messageModal';
import {Button} from 'antd';
// function mapStateToProps(state:any){
//   const loading = state.loading.effects['table/fetch'];
//   const table = state.table;
//   return { table, loading};
// }
interface TableData {
  data: Array<object>;
}

interface LoginProps {
  dispatch: Dispatch<AnyAction>;
  table: TableData,
  loading: boolean,
}

interface LoginState {
  data: Array<object>,
  visable: boolean,
  title: string,
  modalData: any,
}

@connect(({table, loading}: {
  table: any;
  loading: {
    effects: { [key: string]: boolean };
  }
}) => ({
  table,
  loading: loading.effects['table/fetch'],
}))
class TestTable extends Component<LoginProps, LoginState> {
  state = {
    data: [],
    visable: false,
    title: '',
    modalData: undefined,
  }

  componentDidMount(): void {
    const {dispatch} = this.props;
    dispatch({
      type: 'table/fetch',
    })
  }

  //编辑表
  handleEdit = (val: object) => {
    this.setState({
      title: '编辑',
      modalData: val,
    });
    this.handleVisable(true);
  }
  //删除行数据
  handleDelete = (val: string) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'table/remove',
      payload: {key: val},
      callback: (() => {
        messageModal('success', '删除成功');
      })
    });
  }
  //搜索表数据
  handleSearch = (val: object) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'table/fetch',
      payload: val,
    });
  }
  //新增表数据
  handleAdd = () => {
    this.setState({
      title: '新增',
      modalData: undefined,
    });
    this.handleVisable(true);
  }
  //关闭弹窗
  handleVisable = (flag: boolean) => {
    this.setState({
      visable: flag
    });
  }
  //提交数据
  submitData = (val: object) => {
    console.log(val);
    const {title} = this.state;
    const {dispatch} = this.props;
    if (title == '新增') {
      dispatch({
        type: 'table/add',
        payload: val,
        callback: (() => {
          messageModal('success', '新增成功');
        })
      })
    } else {
      dispatch({
        type: 'table/update',
        payload: val,
        callback: (() => {
          messageModal('success', '编辑成功');
        })
      })
    }
    this.handleVisable(false);
  }

  render() {
    const {loading, table: {data}} = this.props;
    const {visable, title, modalData} = this.state;
    const methodParent = {
      data,
      loading,
      onEdit: this.handleEdit,
      onDelete: this.handleDelete,
    };
    const methodForm = {
      onSearch: this.handleSearch,
    }
    const addForm = {
      visable,
      title,
      handleVisable: this.handleVisable,
      modalData,
      submitData: this.submitData,
    }
    return (
      <PageHeaderWrapper>
        <div style={{background: 'white', padding: '10px 10px'}}>
          <CreateForm {...methodForm}/>
          <Button type="primary" icon="plus" style={{margin: '10px 0px'}} onClick={this.handleAdd}>新增</Button>
          <CreateTable {...methodParent}/>
          <AddForm {...addForm}/>
        </div>
      </PageHeaderWrapper>
    )
  }
}

export default TestTable;
// export default connect(mapStateToProps)(TestTable);

