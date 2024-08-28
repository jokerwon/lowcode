import React from 'react'
import { message } from 'antd'
import { useComponentConfigStore } from '../../stores/component-config'
import { useComponetsStore } from '../../stores/components'
import { Component } from '../../inteface'
import { ActionConfig } from '../setting/ActionModal'

export function Preview() {
  const { components } = useComponetsStore()
  const { componentConfig } = useComponentConfigStore()

  const handleEvent = (component: Component) => {
    const props: Record<string, any> = {}

    componentConfig[component.name].events?.forEach((event) => {
      const eventConfig = component.props[event.name]

      if (eventConfig) {
        props[event.name] = () => {
          eventConfig?.actions?.forEach((action: ActionConfig) => {
            if (action.type === 'goToLink') {
              window.location.href = action.url
            } else if (action.type === 'showMessage') {
              if (action.config.type === 'success') {
                message.success(action.config.text)
              } else if (action.config.type === 'error') {
                message.error(action.config.text)
              }
            } else if (action.type === 'customJS') {
              // new Function 可以传入任意个参数，最后一个是函数体，前面都会作为函数参数的名字。
              const func = new Function('context', action.code)
              func({
                name: component.name,
                props: component.props,
                showMessage(content: string) {
                  message.success(content)
                },
              })
            }
          })
        }
      }
    })
    return props
  }

  const renderComponents = (components: Component[]): React.ReactNode => {
    return components.map((component: Component) => {
      const config = componentConfig?.[component.name]

      if (!config?.prod) {
        return null
      }

      return React.createElement(
        config.prod,
        {
          key: component.id,
          id: component.id,
          name: component.name,
          styles: component.styles,
          ...config.defaultProps,
          ...component.props,
          ...handleEvent(component),
        },
        renderComponents(component.children || [])
      )
    })
  }

  return <div>{renderComponents(components)}</div>
}
