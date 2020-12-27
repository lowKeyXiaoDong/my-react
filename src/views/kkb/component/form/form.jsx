import React from 'react'
import FieldContext from './FieldContext'
import useForm from './useForm'

export default function Form({ children, onFinish, onFinishFalied, form }) {
  const [formInstance] = useForm()
  formInstance.setCallbacks({
    onFinish,
    onFinishFalied,
  })
  return (
    <FieldContext.Provider value={formInstance}>
      <form
        onSubmit={(e) => {
          // 提交
          e.preventDefault()
          formInstance.submit()
        }}
      >
        {children}
      </form>
    </FieldContext.Provider>
  )
}
