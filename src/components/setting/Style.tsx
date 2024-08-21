import { CSSProperties, useEffect, useState } from 'react'
import { Form, Input, InputNumber, Select } from 'antd'
import { camelCase, debounce, kebabCase } from 'lodash-es'
import StyleToObject from 'style-to-object'
import { useComponentConfigStore } from '../../stores/component-config'
import { useComponetsStore } from '../../stores/components'
import { ComponentSetter } from '../../inteface'
import CSSEditor from './CSSEditor'

function toCSSStr(css: Record<string, any>) {
  let str = `.comp {\n`
  for (const key in css) {
    let value = css[key]
    if (value !== 0 && !value) {
      continue
    }
    if (['width', 'height'].includes(key) && !value.toString().endsWith('px')) {
      value += 'px'
    }

    str += `\t${kebabCase(key)}: ${value};\n`
  }
  str += `}`
  return str
}

export default function Style() {
  const [form] = Form.useForm()
  const [css, setCss] = useState<string>(`.comp{\n\n}`)

  const { currentComponentId, currentComponent, updateComponentStyles } = useComponetsStore()
  const { componentConfig } = useComponentConfigStore()

  useEffect(() => {
    form.resetFields()
    const data = form.getFieldsValue()
    form.setFieldsValue({ ...data, ...currentComponent?.styles })
    setCss(toCSSStr(currentComponent?.styles || {}))
  }, [form, currentComponent])

  if (!currentComponentId || !currentComponent) return null

  function renderFormElememt(setting: ComponentSetter) {
    const { type, placeholder, options } = setting

    switch (type) {
      case 'select':
        return <Select placeholder={placeholder} options={options} />
      case 'input':
        return <Input placeholder={placeholder} />
      case 'inputNumber':
        return <InputNumber style={{ width: '100%' }} placeholder={placeholder} />
      default:
        return null
    }
  }

  function valueChange(changeValues: CSSProperties) {
    if (currentComponentId) {
      updateComponentStyles(currentComponentId, changeValues)
    }
  }

  const handleEditorChange = debounce((value) => {
    setCss(value)

    const css: Record<string, any> = {}
    try {
      const cssStr = value
        .replace(/\/\*.*\*\//, '') // 去掉注释 /** */
        .replace(/(\.?[^{]+{)/, '') // 去掉 .comp {
        .replace('}', '') // 去掉 }

      StyleToObject(cssStr, (name, value) => {
        // 转驼峰
        css[camelCase(name)] = value
      })

      updateComponentStyles(currentComponentId, { ...form.getFieldsValue(), ...css }, true)
    } catch (e) {
      //
    }
  }, 500)

  return (
    <Form form={form} onValuesChange={valueChange} layout="vertical" variant="filled" className="mt-1 px-2">
      {componentConfig[currentComponent.name]?.setter?.style?.map((setter) => (
        <Form.Item key={setter.name} name={setter.name} label={setter.label}>
          {renderFormElememt(setter)}
        </Form.Item>
      ))}
      <div className="h-[200px] border-[1px] border-[#ccc]">
        <CSSEditor value={css} onChange={handleEditorChange} />
      </div>
    </Form>
  )
}
