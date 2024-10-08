import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { getComponentById, useComponetsStore } from '../../stores/components'
import { Dropdown, Popconfirm, Space } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

interface SelectedMaskProps {
  portalWrapperClassName: string
  containerClassName: string
  componentId: number
}

function SelectedMask({ containerClassName, portalWrapperClassName, componentId }: SelectedMaskProps) {
  const [position, setPosition] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    labelTop: 0,
    labelLeft: 0,
  })

  const { components, currentComponentId, deleteComponent, setCurComponentId } = useComponetsStore()

  useEffect(() => {
    setTimeout(() => {
      updatePosition()
    }, 200)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentId, components])

  function updatePosition() {
    if (!componentId) return

    const container = document.querySelector(`.${containerClassName}`)
    if (!container) return

    const node = document.querySelector(`[data-component-id="${componentId}"]`)
    if (!node) return

    const { top, left, width, height } = node.getBoundingClientRect()
    const { top: containerTop, left: containerLeft } = container.getBoundingClientRect()

    let labelTop = top - containerTop + container.scrollTop
    const labelLeft = left - containerLeft + width

    if (labelTop <= 0) {
      labelTop -= -20
    }

    setPosition({
      top: top - containerTop + container.scrollTop,
      left: left - containerLeft + container.scrollTop,
      width,
      height,
      labelTop,
      labelLeft,
    })
  }

  const el = useMemo(() => {
    return document.querySelector(`.${portalWrapperClassName}`)!
  }, [portalWrapperClassName])

  const curComponent = useMemo(() => {
    return getComponentById(componentId, components)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentId])

  const parentComponents = useMemo(() => {
    const parents = []
    let cur = curComponent

    while (cur?.parentId) {
      cur = getComponentById(cur.parentId, components)!
      parents.push(cur)
    }

    return parents
  }, [curComponent, components])

  function handleDelete() {
    deleteComponent(componentId)
    setCurComponentId(null)
  }

  useEffect(() => {
    const resizeHandler = () => {
      updatePosition()
    }
    window.addEventListener('resize', resizeHandler)
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return createPortal(
    <>
      <div
        style={{
          position: 'absolute',
          left: position.left,
          top: position.top,
          backgroundColor: 'rgba(0, 0, 255, 0.1)',
          border: '1px dashed blue',
          pointerEvents: 'none',
          width: position.width,
          height: position.height,
          zIndex: 12,
          borderRadius: 4,
          boxSizing: 'border-box',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: position.labelLeft,
          top: position.labelTop,
          fontSize: '14px',
          zIndex: 13,
          display: !position.width || position.width < 10 ? 'none' : 'inline',
          transform: 'translate(-100%, -100%)',
        }}
      >
        <Space>
          <Dropdown
            menu={{
              items: parentComponents.map((item) => ({
                key: item.id,
                label: item.name,
              })),
              onClick: ({ key }) => {
                setCurComponentId(+key)
              },
            }}
            disabled={parentComponents.length === 0}
          >
            <div
              style={{
                padding: '0 8px',
                backgroundColor: 'blue',
                borderRadius: 4,
                color: '#fff',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {curComponent?.desc || curComponent?.name}
            </div>
          </Dropdown>
          {/* Page 组件不展示删除按钮 */}
          {currentComponentId !== 1 && (
            <div style={{ padding: '0 8px', backgroundColor: 'blue' }}>
              <Popconfirm title="确认删除？" okText={'确认'} cancelText={'取消'} onConfirm={handleDelete}>
                <DeleteOutlined style={{ color: '#fff' }} />
              </Popconfirm>
            </div>
          )}
        </Space>
      </div>
    </>,
    el
  )
}

export default SelectedMask
