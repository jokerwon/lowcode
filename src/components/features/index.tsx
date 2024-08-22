import { Tabs } from 'antd'
import Material from './material'
import Outline from './outline'
import Source from './source'

export default function Features() {
  return (
    <Tabs
      className="h-full"
      tabPosition="left"
      type="card"
      items={[
        {
          key: 'material',
          label: '物料',
          children: <Material />,
        },
        {
          key: 'outline',
          label: '大纲',
          children: <Outline />,
        },
        {
          key: 'source',
          label: '源码',
          children: <Source />,
        },
      ]}
    />
  )
}
