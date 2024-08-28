import { Button as AntdButton } from 'antd'
import { CommonComponentProps } from '../../inteface'
import { useDrag } from 'react-dnd'

const Button = ({ id, type, text, styles }: CommonComponentProps) => {
  const [, drag] = useDrag({
    type: 'Button',
    item: {
      type: 'Button',
      dragType: 'move',
      id,
    },
  })

  return (
    <AntdButton ref={drag} data-component-id={id} type={type} style={styles}>
      {text}
    </AntdButton>
  )
}

export default Button
