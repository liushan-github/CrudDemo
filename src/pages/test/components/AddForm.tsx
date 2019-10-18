import {Form, Input, Modal, InputNumber} from 'antd';

import {FormComponentProps} from 'antd/es/form';
import React from 'react';

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  visable: boolean;
  submitData: (fieldsValue: { desc: string }) => void;
  handleVisable: (flag: boolean) => void;
  title: string,
  modalData: any,
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const {visable, form, title, submitData, handleVisable, modalData} = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      submitData(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title={title}
      visible={visable}
      onOk={okHandle}
      onCancel={() => handleVisable(false)}
    >
      <FormItem label="id" style={{display: "none"}}>
        {form.getFieldDecorator('key', {
          initialValue: modalData && modalData.key,
        })(<Input placeholder="请输入"/>)}
      </FormItem>
      <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="name">
        {form.getFieldDecorator('name', {
          initialValue: modalData && modalData.name,
          rules: [{required: true, message: '请输入至少三个字符的名字！', min: 3}],
        })(<Input placeholder="请输入"/>)}
      </FormItem>
      <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="age">
        {form.getFieldDecorator('age', {
          initialValue: modalData && modalData.age,
          rules: [{required: true, message: '请输入数字！'}],
        })(<InputNumber placeholder="请输入" min={0} style={{width: '100%'}}/>)}
      </FormItem>
      <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="address">
        {form.getFieldDecorator('address', {
          initialValue: modalData && modalData.address,
          rules: [{required: true, message: '请输入地址！'}],
        })(<Input placeholder="请输入"/>)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
