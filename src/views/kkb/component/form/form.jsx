import React from 'react'
import FieldContext from './FieldContext'
import useForm from './useForm'

export default function Form({ children, onFinish, onFinishFalied, form }, ref) {
  const [formInstance] = useForm(form)
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
