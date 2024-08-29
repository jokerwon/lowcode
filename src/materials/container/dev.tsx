import { CommonComponentProps } from '../../inteface'
import { useMaterailDrop } from '../../hooks/useMaterialDrop'
import { useEffect, useRef } from 'react'
import { useDrag } from 'react-dnd'

const Container = ({ id, children, styles }: CommonComponentProps) => {
  const { canDrop, drop } = useMaterailDrop(['Button', 'Container', 'Modal', 'Table', 'Form'], id)

  const divRef = useRef<HTMLDivElement>(null)

  const [, drag] = useDrag({
    type: 'Container',
    item: {
      type: 'Container',
      dragType: 'move',
      id: id,
    },
  })

  // 这里因为要同时给 div 绑定 drag、drop 的处理，所以用 useRef 拿到 ref 之后再绑定。
  useEffect(() => {
    drop(divRef)
    drag(divRef)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={divRef} data-component-id={id} style={styles} className={`min-h-[100px] p-[20px] ${canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-[#000]'}`}>
      {children}
    </div>
  )
}

export default Container
