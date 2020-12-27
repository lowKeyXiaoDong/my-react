import React, { Component, useEffect } from 'react'
import Input from '../component/form/Input'
import Form, { Field } from '../component/form'

const nameRules = { required: true, message: '请输入名称' }
const passWordRules = { required: true, message: '请输入密码' }

const FromIndex = () => {
  const [form] = Form.useForm()

  const onFinish = (val) => {
    console.log('onFinish', val)
  }

  const onFinishFalied = (val) => {
    console.log('onFinishFalied', val)
  }

  useEffect(() => {
    console.log('form', form)
    form.setFieldsValue({ userName: 'default' })
  }, [])

  return (
    <div>
      <Form form={form} onFinish={onFinish} onFinishFalied={onFinishFalied}>
        <Field name='userName' rules={[nameRules]}>
          <Input placeholder='input name' />
        </Field>
        <Field name='passWord' rules={[passWordRules]}>
          <Input placeholder='input password' />
        </Field>
        <button>submit</button>
      </Form>
    </div>
  )
}

export default FromIndex
