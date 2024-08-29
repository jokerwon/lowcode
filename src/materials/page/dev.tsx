import { useMaterailDrop } from '../../hooks/useMaterialDrop'
import { CommonComponentProps } from '../../inteface'

function Page({ id, children, styles }: CommonComponentProps) {
  const { canDrop, drop } = useMaterailDrop(['Button', 'Container', 'Modal', 'Table'], id)

  return (
    <div data-component-id={id} ref={drop} className="p-[20px] h-[100%] box-border" style={{ ...styles, border: canDrop ? '2px solid blue' : 'none' }}>
      {children}
    </div>
  )
}

export default Page
