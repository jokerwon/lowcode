import { Input } from 'antd'
import { useEffect, useState } from 'react'

export interface GoToLinkConfig {
  type: 'goToLink'
  url: string
}

export interface GoToLinkProps {
  value?: string
  defaultValue?: string
  onChange?: (config: GoToLinkConfig) => void
}

export function GoToLink(props: GoToLinkProps) {
  const { value: val, defaultValue, onChange } = props
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    setValue(val)
  }, [val])

  function urlChange(value: string) {
    setValue(value)
    onChange?.({
      type: 'goToLink',
      url: value,
    })
  }

  return (
    <div className="mt-[40px]">
      <div className="flex items-center gap-[10px]">
        <div>跳转链接</div>
        <div>
          <Input.TextArea style={{ height: 200, width: 500 }} onChange={(e) => urlChange(e.target.value)} value={value || ''} />
        </div>
      </div>
    </div>
  )
}
