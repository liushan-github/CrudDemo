import React from 'react';
import {Form, Input, Button} from 'antd';
import {FormComponentProps} from 'antd/es/form';

interface FormProps extends FormComponentProps {
  onSearch: (values: object) => void
}

const TestForm: React.FC<FormProps> = props => {

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const {onSearch} = props;
        onSearch(values);
      }
    });
  };
  const {getFieldDecorator, getFieldError, isFieldTouched} = props.form;
  const usernameError = isFieldTouched('name') && getFieldError('name');
  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
        {getFieldDecorator('name', {})(
          <Input
            placeholder="请输入名称"
          />,
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          查询
        </Button>
      </Form.Item>
    </Form>
  )
}
const CreateForm = Form.create({name: 'horizontal_login'})(TestForm);
export default CreateForm;
