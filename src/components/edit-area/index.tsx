import React, { MouseEvent, MouseEventHandler, useState } from 'react'
import { useComponetsStore } from '../../stores/components'
import { useComponentConfigStore } from '../../stores/component-config'
import { Component } from '../../inteface'
import HoverMask from '../hover-mask'
import SelectedMask from '../selected-mask'

const getTargetComponentId = (e: MouseEvent) => {
  const path = e.nativeEvent.composedPath()

  for (let i = 0; i < path.length; i += 1) {
    const ele = path[i] as HTMLElement

    const componentId = ele.dataset?.componentId
    // 第一个有 componentId 的元素则是被 hover 的组件
    if (componentId) {
      return +componentId
    }
  }
}

export default function EditArea() {
  const [hoverComponentId, setHoverComponentId] = useState<number>()

  const { components, setCurComponentId, currentComponentId } = useComponetsStore()
  const { componentConfig } = useComponentConfigStore()

  const handleClick: MouseEventHandler = (e) => {
    const componentId = getTargetComponentId(e)
    if (componentId) {
      setCurComponentId(componentId)
    }
  }

  const handleMouseOver: MouseEventHandler = (e) => {
    const componentId = getTargetComponentId(e)
    if (componentId) {
      setHoverComponentId(componentId)
    }
  }

  const renderComponents = (components: Component[]): React.ReactNode =>
    components.map((component) => {
      const config = componentConfig?.[component.name]

      if (!config?.dev) {
        return null
      }

      return React.createElement(
        config.dev,
        {
          key: component.id,
          id: component.id,
          styles: component.styles,
          ...config.defaultProps,
          ...component.props,
        },
        renderComponents(component.children || [])
      )
    })

  return (
    <div
      className="h-[100%] lc-edit-area"
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={() => {
        setHoverComponentId(undefined)
      }}
    >
      {renderComponents(components)}
      {/* 避免两个遮罩重合 */}
      {hoverComponentId && hoverComponentId !== currentComponentId && <HoverMask portalWrapperClassName="lc-portal-wrapper" containerClassName="lc-edit-area" componentId={hoverComponentId} />}
      {currentComponentId && <SelectedMask portalWrapperClassName="lc-portal-wrapper" containerClassName="lc-edit-area" componentId={currentComponentId} />}
      {/* 用于挂载 Mask 的容器 */}
      <div className="lc-portal-wrapper" />
    </div>
  )
}
