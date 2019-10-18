import React, {Component} from 'react';
import {Table, Popconfirm, Button} from 'antd';

interface TableProps {
  data: Array<object>,
  loading: boolean,
  onDelete: (key: string) => void
  onEdit: (record: object) => void
}

class CreateTable extends Component<TableProps> {
  state = {
    data: [],
  }
  //标签表删除确认
  confirm = (key: string) => {
    const {onDelete} = this.props;
    onDelete(key);
  }
  //取消
  cancel = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  };
  //编辑
  edit = (record: object) => {
    const {onEdit} = this.props;
    onEdit(record);
  }

  render() {
    const {data, loading} = this.props;
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Age',
        dataIndex: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
      },
      {
        title: '操作',
        dataIndex: 'key',
        render: (text: string, record: object) => {
          return (
            <>
              <Popconfirm
                title="确认删除吗?"
                onConfirm={() => {
                  this.confirm(text)
                }}
                onCancel={this.cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button type="danger" icon="minus" style={{marginLeft: 10}} size={'small'}/>
              </Popconfirm>
              <Button type="default" icon="edit" style={{marginLeft: 10}} size={'small'}
                      onClick={() => this.edit(record)}/>
            </>
          )
        }
      }
    ];
    return (
      <Table columns={columns} dataSource={data} size="small" pagination={false} loading={loading}/>
    )
  }
}

export default CreateTable;
