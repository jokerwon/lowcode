import { ConfigProvider, Form, Input, Select } from 'antd'
import { useComponetsStore } from '../../stores/components'
import { ComponentConfig, ComponentSetter, useComponentConfigStore } from '../../stores/component-config'
import { useEffect } from 'react'

export default function Attribute() {
  const [form] = Form.useForm()

  const { currentComponentId, currentComponent, updateComponentProps } = useComponetsStore()
  const { componentConfig } = useComponentConfigStore()

  useEffect(() => {
    const data = form.getFieldsValue()
    form.setFieldsValue({ ...data, ...currentComponent?.props })
  }, [form, currentComponent])

  if (!currentComponent) return null

  const { id, name, desc } = currentComponent

  const handleValuesChange = (changedValues: ComponentConfig) => {
    if (!currentComponentId) return
    updateComponentProps(currentComponentId, changedValues)
  }

  const renderFormItem = (setter: ComponentSetter) => {
    const { type, placeholder, options } = setter

    switch (type) {
      case 'select':
        return <Select placeholder={placeholder} options={options} />
      case 'input':
        return <Input placeholder={placeholder} />
      default:
        return null
    }
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            itemMarginBottom: 8,
            labelFontSize: 12,
            verticalLabelPadding: '0 0 4px',
          },
        },
      }}
    >
      <Form form={form} layout="vertical" variant="filled" className="mt-1 px-2" onValuesChange={handleValuesChange}>
        <Form.Item label="ID">
          <Input value={id} readOnly />
        </Form.Item>
        <Form.Item label="名称">
          <Input value={name} readOnly />
        </Form.Item>
        <Form.Item label="描述">
          <Input value={desc} readOnly />
        </Form.Item>
        {componentConfig[currentComponent.name]?.setter?.map((setter) => (
          <Form.Item label={setter.label} name={setter.name} key={setter.name}>
            {renderFormItem(setter)}
          </Form.Item>
        ))}
      </Form>
    </ConfigProvider>
  )
}
