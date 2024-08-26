import { Collapse, CollapseProps, Select } from 'antd'
import { useComponetsStore } from '../../stores/components'
import { useComponentConfigStore } from '../../stores/component-config'
import { GoToLink } from './actions/GoToLink'
import { ShowMessage } from './actions/ShowMessage'

export default function Event() {
  const { currentComponentId, currentComponent, updateComponentProps } = useComponetsStore()
  const { componentConfig } = useComponentConfigStore()

  if (!currentComponent) return null

  const selectAction = (eventName: string, value: string) => {
    if (!currentComponentId) return

    updateComponentProps(currentComponentId, { [eventName]: { type: value } })
  }

  const items: CollapseProps['items'] =
    componentConfig[currentComponent.name].events?.map((event) => {
      return {
        key: event.name,
        label: event.label,
        children: (
          <div>
            <div className="flex items-center gap-[10px]">
              <div>动作</div>
              <Select
                className="w-[160px]"
                options={[
                  { label: '显示提示', value: 'showMessage' },
                  { label: '跳转链接', value: 'goToLink' },
                ]}
                value={currentComponent?.props?.[event.name]?.type}
                onChange={(value) => {
                  selectAction(event.name, value)
                }}
              />
            </div>
            {currentComponent?.props?.[event.name]?.type === 'goToLink' && <GoToLink event={event} />}
            {currentComponent?.props?.[event.name]?.type === 'showMessage' && <ShowMessage event={event} />}
          </div>
        ),
      }
    }) || []

  return (
    <div className="mt-1 px-2">
      <Collapse className="mb-[10px]" items={items} />
    </div>
  )
}
