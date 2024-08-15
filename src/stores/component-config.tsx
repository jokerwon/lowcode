import { create } from 'zustand'
import Container from '../materials/container'
import Button from '../materials/button'
import Page from '../materials/page'

export interface ComponentSetter {
  name: string
  label: string
  placeholder?: string
  type: 'input' | 'select'
  [key: string]: any
}

export interface ComponentConfig {
  name: string
  defaultProps: Record<string, any>
  desc?: string
  setter?: ComponentSetter[]
  component: any
}

interface State {
  componentConfig: { [key: string]: ComponentConfig }
}

interface Action {
  registerComponent: (name: string, componentConfig: ComponentConfig) => void
}

export const useComponentConfigStore = create<State & Action>((set) => ({
  componentConfig: {
    Page: {
      name: 'Page',
      defaultProps: {},
      component: Page,
      desc: '页面'
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
      setter: [
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
