import { create } from 'zustand'
import { ComponentConfig } from '../inteface'
import { Page, PageDev } from '../materials/page'
import { Container, ContainerDev } from '../materials/container'
import { Button, ButtonDev } from '../materials/button'
import { Modal, ModalDev } from '../materials/modal'
import { Table, TableColumn, TableColumnDev, TableDev } from '../materials/table'

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
    events: [
      {
        name: 'onClick',
        label: '点击事件',
      },
      {
        name: 'onDoubleClick',
        label: '双击事件',
      },
    ],
  },
  Modal: {
    name: 'Modal',
    defaultProps: {
      title: '弹窗',
    },
    desc: '弹窗',
    dev: ModalDev,
    prod: Modal,
    setter: {
      attribute: [
        {
          name: 'title',
          label: '标题',
          type: 'input',
        },
      ],
    },
    events: [
      {
        name: 'onOk',
        label: '确认事件',
      },
      {
        name: 'onCancel',
        label: '取消事件',
      },
    ],
    methods: [
      {
        name: 'open',
        label: '打开弹窗',
      },
      {
        name: 'close',
        label: '关闭弹窗',
      },
    ],
  },
  Table: {
    name: 'Table',
    defaultProps: {},
    desc: '表格',
    setter: {
      attribute: [
        {
          name: 'url',
          label: 'url',
          type: 'input',
        },
      ],
    },
    dev: TableDev,
    prod: Table,
  },
  TableColumn: {
    name: 'TableColumn',
    desc: '表格列',
    defaultProps: {
      dataIndex: `col_${new Date().getTime()}`,
      title: '列名',
    },
    setter: {
      attribute: [
        {
          name: 'type',
          label: '类型',
          type: 'select',
          options: [
            {
              label: '文本',
              value: 'text',
            },
            {
              label: '日期',
              value: 'date',
            },
          ],
        },
        {
          name: 'title',
          label: '标题',
          type: 'input',
        },
        {
          name: 'dataIndex',
          label: '字段',
          type: 'input',
        },
      ],
    },
    dev: TableColumnDev,
    prod: TableColumn,
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
