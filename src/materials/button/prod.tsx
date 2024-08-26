import { Button as AntdButton } from 'antd'
import { CommonComponentProps } from '../../inteface'

const Button = ({ type, text, styles, ...props }: CommonComponentProps) => {
  return (
    <AntdButton type={type} style={styles} {...(props as any)}>
      {text}
    </AntdButton>
  )
}

export default Button
