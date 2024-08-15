import { useState } from 'react'
import { useComponetsStore } from '../../stores/components'
import { Segmented } from 'antd'

enum SettingType {
  ATTRIBUTE = 'attribute',
  STYLE = 'style',
  EVENT = 'event',
}

export default function Setting() {
  const { components } = useComponetsStore()
  const [type, setType] = useState(SettingType.ATTRIBUTE)

  // if (!currentComponentId) return null

  return (
    <div>
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
      <pre>{JSON.stringify(components, null, 2)}</pre>
    </div>
  )
}
