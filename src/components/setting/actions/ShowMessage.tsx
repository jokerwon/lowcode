import { Input, Select } from 'antd'
import { useState } from 'react'

export interface ShowMessageConfig {
  type: 'showMessage'
  config: {
    type: 'success' | 'error'
    text: string
  }
}

export interface ShowMessageProps {
  value?: ShowMessageConfig['config']
  onChange?: (config: ShowMessageConfig) => void
}

export function ShowMessage(props: ShowMessageProps) {
  const { value, onChange } = props
  const [type, setType] = useState<'success' | 'error'>(value?.type || 'success')
  const [text, setText] = useState<string>(value?.text || '')

  function messageTypeChange(newType: 'success' | 'error') {
    setType(newType)
    onChange?.({
      type: 'showMessage',
      config: {
        type: newType,
        text,
      },
    })
  }

  function messageTextChange(newText: string) {
    setText(newText)
    onChange?.({
      type: 'showMessage',
      config: {
        type,
        text: newText,
      },
    })
  }

  return (
    <div className="mt-[30px]">
      <div className="flex items-center gap-[20px]">
        <div>类型</div>
        <div>
          <Select
            style={{ width: 500 }}
            options={[
              { label: '成功', value: 'success' },
              { label: '失败', value: 'error' },
            ]}
            onChange={(value) => messageTypeChange(value)}
            value={type}
          />
        </div>
      </div>
      <div className="flex items-center gap-[20px] mt-4">
        <div>文本</div>
        <div>
          <Input style={{ width: 500 }} onChange={(e) => messageTextChange(e.target.value)} value={text} />
        </div>
      </div>
    </div>
  )
}
