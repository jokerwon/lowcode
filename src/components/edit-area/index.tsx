import React from 'react'
import { Component, useComponetsStore } from '../../stores/components'
import { useComponentConfigStore } from '../../stores/component-config'

export default function EditArea() {
  const { components } = useComponetsStore()
  const { componentConfig } = useComponentConfigStore()

  console.log(components);
  

  const renderComponents = (components: Component[]): React.ReactNode =>
    components.map((component) => {
      const config = componentConfig?.[component.name]
      
      if (!config?.component) {
        return null
      }
      
      console.log(component);
      
      return React.createElement(
        config.component,
        {
          key: component.id,
          id: component.id,
          ...config.defaultProps,
          ...component.props,
        },
        renderComponents(component.children || [])
      )
    })

  return (
    <div className="h-[100%]">
      {/* <pre>{JSON.stringify(components, null, 2)}</pre> */}
      {renderComponents(components)}
    </div>
  )
}
