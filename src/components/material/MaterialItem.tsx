import { useDrag } from 'react-dnd'

export interface MaterialItemProps {
  name: string
}

export function MaterialItem(props: MaterialItemProps) {
  const { name } = props

  const [, drag] = useDrag({
    type: name,
    item: { type: name }, // 传递的数据
  })

  return (
    <div
      ref={drag}
      className="
        border-dashed
        border-[1px]
        border-[#000]
        py-[8px] px-[10px] 
        m-[10px]
        cursor-move
        inline-block
        bg-white
        hover:bg-[#ccc]
      "
    >
      {name}
    </div>
  )
}
