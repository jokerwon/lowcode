import { Button, Space } from 'antd'
import { useComponetsStore } from '../../stores/components'

export default function Header() {
  const { mode, setMode, setCurComponentId } = useComponetsStore()

  return (
    <header className="h-[60px] px-4 flex items-center justify-between border-b-[1px] border-[#000]">
      <div>Lowcode Editor</div>
      <Space>
        {mode === 'edit' && (
          <Button
            onClick={() => {
              setMode('preview')
              setCurComponentId(null)
            }}
            type="primary"
          >
            预览
          </Button>
        )}
        {mode === 'preview' && (
          <Button
            onClick={() => {
              setMode('edit')
            }}
            type="primary"
          >
            退出预览
          </Button>
        )}
      </Space>
    </header>
  )
}
