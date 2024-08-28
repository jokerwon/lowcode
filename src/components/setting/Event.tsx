import { useState } from 'react'
import { Button, Collapse, CollapseProps } from 'antd'
import { useComponetsStore } from '../../stores/components'
import { useComponentConfigStore } from '../../stores/component-config'
import { ComponentEvent } from '../../inteface'
import { ActionModal } from './ActionModal'
import { GoToLinkConfig } from './actions/GoToLink'
import { ShowMessageConfig } from './actions/ShowMessage'
import { DeleteOutlined } from '@ant-design/icons'

export default function Event() {
  const [actionModalOpen, setActionModalOpen] = useState(false)
  const [curEvent, setCurEvent] = useState<ComponentEvent>()

  const { currentComponent, updateComponentProps } = useComponetsStore()
  const { componentConfig } = useComponentConfigStore()

  if (!currentComponent) return null

  const deleteAction = (event: ComponentEvent, index: number) => {
    if (!currentComponent) {
      return
    }

    const actions = currentComponent.props[event.name]?.actions

    actions.splice(index, 1)

    updateComponentProps(currentComponent.id, {
      [event.name]: {
        actions: actions,
      },
    })
  }

  function handleModalOk(config?: GoToLinkConfig | ShowMessageConfig) {
    if (!config || !curEvent || !currentComponent) {
      return
    }

    updateComponentProps(currentComponent.id, {
      [curEvent.name]: {
        actions: [...(currentComponent.props[curEvent.name]?.actions || []), config],
      },
    })

    setActionModalOpen(false)
  }

  const items: CollapseProps['items'] = (componentConfig[currentComponent.name].events || []).map((event) => {
    return {
      key: event.name,
      label: (
        <div className="flex justify-between leading-[30px]">
          {event.label}
          <Button
            type="primary"
            onClick={(e) => {
              e.stopPropagation()
              setCurEvent(event)
              setActionModalOpen(true)
            }}
          >
            添加动作
          </Button>
        </div>
      ),
      children: (
        <div>
          {(currentComponent.props[event.name]?.actions || []).map((item: GoToLinkConfig | ShowMessageConfig, index: number) => {
            return (
              <div>
                {item.type === 'goToLink' ? (
                  <div className="border border-[#aaa] m-[10px] p-[10px] relative">
                    <div className="text-[blue]">跳转链接</div>
                    <div>{item.url}</div>
                    <div style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }} onClick={() => deleteAction(event, index)}>
                      <DeleteOutlined />
                    </div>
                  </div>
                ) : null}
                {item.type === 'showMessage' ? (
                  <div className="border border-[#aaa] m-[10px] p-[10px] relative">
                    <div className="text-[blue]">消息弹窗</div>
                    <div>{item.config.type}</div>
                    <div>{item.config.text}</div>
                    <div style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }} onClick={() => deleteAction(event, index)}>
                      <DeleteOutlined />
                    </div>
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      ),
    }
  })

  return (
    <div className="mt-1 px-2">
      <Collapse className="mb-[10px]" defaultActiveKey={componentConfig[currentComponent.name].events?.map((item) => item.name)} items={items} />
      <ActionModal visible={actionModalOpen} handleOk={handleModalOk} handleCancel={() => setActionModalOpen(false)} />
    </div>
  )
}
