import { useState } from 'react'
import { ConfigProvider, Empty, Segmented } from 'antd'
import { useComponetsStore } from '../../stores/components'
import { SettingType } from '../../inteface'
import Attribute from './Attribute'
import Style from './Style'
import Event from './Event'

export default function Setting() {
  const { currentComponentId } = useComponetsStore()
  const [type, setType] = useState(SettingType.ATTRIBUTE)

  const render = () => {
    if (!currentComponentId) {
      return <Empty className="mt-16" description="请选中一个组件" image={Empty.PRESENTED_IMAGE_SIMPLE} />
    }
    switch (type) {
      case SettingType.ATTRIBUTE:
        return <Attribute />
      case SettingType.STYLE:
        return <Style />
      case SettingType.EVENT:
        return <Event />
      default:
        return null
    }
  }

  return (
    <div className="p-2">
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
        <Segmented
          block
          value={type}
          onChange={setType}
          options={[
            { label: '属性', value: SettingType.ATTRIBUTE },
            { label: '样式', value: SettingType.STYLE },
            { label: '事件', value: SettingType.EVENT },
          ]}
        />
        {render()}
      </ConfigProvider>
    </div>
  )
}
