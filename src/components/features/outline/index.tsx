import { Tree } from 'antd'
import { useComponetsStore } from '../../../stores/components'

export default function Outline() {
  const { currentComponentId, components, setCurComponentId } = useComponetsStore()

  return (
    <Tree
      showLine
      defaultExpandAll
      selectedKeys={currentComponentId ? [currentComponentId] : []}
      fieldNames={{ title: 'desc', key: 'id' }}
      treeData={components as any}
      onSelect={([key]) => {
        setCurComponentId(key as number)
      }}
    />
  )
}
