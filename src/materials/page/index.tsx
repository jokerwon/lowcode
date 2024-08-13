import { useMaterailDrop } from '../../hooks/useMaterialDrop'
import { CommonComponentProps } from '../../inteface'

function Page({ id, children }: CommonComponentProps) {
  const { canDrop, drop } = useMaterailDrop(['Button', 'Container'], id)

  return (
    <div data-component-id={id} ref={drop} className="p-[20px] h-[100%] box-border" style={{ border: canDrop ? '2px solid blue' : 'none' }}>
      {children}
    </div>
  )
}

export default Page
