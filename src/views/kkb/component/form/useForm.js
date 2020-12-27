import React from 'react'

class FormStore {
  constructor() {
    this.store = {}

    this.fieldEntities = []

    this.callbacks = {}
  }

  setCallbacks = (newCallBacks) => {
    this.callbacks = {
      ...this.callbacks,
      ...newCallBacks,
    }
  }

  registerFieldEntity = (entity) => {
    this.fieldEntities.push(entity)

    return () => {
      this.fieldEntities = this.fieldEntities.filter((item) => item !== entity)
      delete this.store[entity.props.name]
    }
  }

  getFieldValue = (name) => {
    return this.store[name]
  }

  getFieldsValue = () => {
    return { ...this.store }
  }

  setFieldsValue = (newStore) => {
    this.store = {
      ...this.store,
      ...newStore,
    }

    this.fieldEntities.forEach((entity) => {
      Object.keys(newStore).forEach((k) => {
        if (k === entity.props.name) {
          entity.onStoreChange()
        }
      })
    })
  }

  validte = () => {
    let err = []

    return err
  }

  submit = () => {
    const { onFinish, onFinishFalied } = this.callbacks
    const err = this.validte()

    if (err.length === 1) {
      onFinish(this.getFieldsValue())
    } else {
      onFinishFalied(err, this.getFieldsValue())
    }
  }

  getForm = () => {
    return {
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldsValue: this.setFieldsValue,
      registerFieldEntity: this.registerFieldEntity,
      setCallbacks: this.setCallbacks,
      submit: this.submit
    }
  }
}

export default function useForm() {
  const formRef = React.useRef()
  if (!formRef.current) {
    const formStore = new FormStore()
    formRef.current = formStore.getForm()
  }

  return [formRef.current]
}
