import { create } from 'zustand'
import { ComponentConfig } from '../inteface'
import { Page, PageDev } from '../materials/page'
import { Container, ContainerDev } from '../materials/container'
import { Button, ButtonDev } from '../materials/button'

const initialComponentConfig: { [key: string]: ComponentConfig } = {
  Page: {
    name: 'Page',
    defaultProps: {},
    dev: PageDev,
    prod: Page,
    desc: '页面',
  },
  Container: {
    name: 'Container',
    defaultProps: {},
    dev: ContainerDev,
    prod: Container,
    desc: '容器',
  },
  Button: {
    name: 'Button',
    desc: '按钮',
    defaultProps: {
      type: 'primary',
      text: '按钮',
    },
    dev: ButtonDev,
    prod: Button,
    setter: {
      attribute: [
        {
          name: 'type',
          label: '按钮类型',
          type: 'select',
          options: [
            { label: '主按钮', value: 'primary' },
            { label: '次按钮', value: 'default' },
          ],
        },
        {
          name: 'text',
          label: '文本',
          type: 'input',
        },
      ],
      style: [
        {
          name: 'width',
          label: '宽度',
          type: 'inputNumber',
        },
        {
          name: 'height',
          label: '高度',
          type: 'inputNumber',
        },
      ],
    },
  },
}

interface State {
  componentConfig: { [key: string]: ComponentConfig }
}

interface Action {
  registerComponent: (name: string, componentConfig: ComponentConfig) => void
}

export const useComponentConfigStore = create<State & Action>((set) => ({
  componentConfig: initialComponentConfig,
  registerComponent: (name, componentConfig) =>
    set((state) => {
      return {
        ...state,
        componentConfig: {
          ...state.componentConfig,
          [name]: componentConfig,
        },
      }
    }),
}))
