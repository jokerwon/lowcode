import { create } from 'zustand'
import { ComponentConfig } from '../inteface'
import Page from '../materials/page'
import Container from '../materials/container'
import Button from '../materials/button'

const initialComponentConfig = {
  Page: {
    name: 'Page',
    defaultProps: {},
    component: Page,
    desc: '页面',
  },
  Container: {
    name: 'Container',
    defaultProps: {},
    component: Container,
    desc: '容器',
  },
  Button: {
    name: 'Button',
    desc: '按钮',
    defaultProps: {
      type: 'primary',
      text: '按钮',
    },
    component: Button,
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
