import { CSSProperties } from 'react'
import { create } from 'zustand'
import { Component } from '../inteface'

const initialComponents = [
  {
    id: 1,
    name: 'Page',
    props: {},
    desc: '页面',
    children: [
      {
        id: 2,
        name: 'Container',
        props: {},
        desc: '容器',
        parentId: 1,
        children: [
          {
            id: 3,
            name: 'Button',
            desc: '按钮',
            props: {
              type: 'primary',
              text: '按钮',
            },
            parentId: 2,
          },
        ],
      },
    ],
  },
]

interface State {
  currentComponentId: number | null
  currentComponent: Component | null
  components: Component[]
}

interface Action {
  addComponent: (component: Component, parentId?: number) => void
  deleteComponent: (componentId: number) => void
  updateComponentProps: (componentId: number, props: any) => void
  setCurComponentId: (componentId: number | null) => void
  updateComponentStyles: (componentId: number, styles: CSSProperties) => void
}

export const useComponetsStore = create<State & Action>((set, get) => ({
  currentComponentId: null,
  currentComponent: null,
  components: initialComponents,

  addComponent: (component, parentId) =>
    set((state) => {
      if (parentId) {
        const parent = getComponentById(parentId, state.components)
        if (parent) {
          if (parent.children) {
            parent.children.push(component)
          } else {
            parent.children = [component]
          }
        }
        component.parentId = parentId
        return { components: [...state.components] }
      }
      return { components: [...state.components, component] }
    }),
  deleteComponent: (componentId) => {
    if (!componentId) return

    const component = getComponentById(componentId, get().components)
    if (!component) return

    if (component.parentId) {
      const parentComponent = getComponentById(component.parentId, get().components)

      if (parentComponent) {
        parentComponent.children = parentComponent?.children?.filter((item) => item.id !== +componentId)

        set({ components: [...get().components] })
      }
    }
  },
  updateComponentProps: (componentId, props) =>
    set((state) => {
      const component = getComponentById(componentId, state.components)
      if (component) {
        component.props = { ...component.props, ...props }

        return { components: [...state.components] }
      }

      return { components: [...state.components] }
    }),
  setCurComponentId: (componentId) =>
    set((state) => ({
      currentComponentId: componentId,
      currentComponent: getComponentById(componentId, state.components),
    })),
  updateComponentStyles: (componentId, styles) =>
    set((state) => {
      const component = getComponentById(componentId, state.components)
      if (component) {
        component.styles = { ...(component.styles || {}), ...styles }
        return { components: [...state.components] }
      }
      return { components: [...state.components] }
    }),
}))

export function getComponentById(id: number | null, components: Component[]): Component | null {
  if (!id) return null

  for (const component of components) {
    if (component.id == id) return component
    if (component.children && component.children.length > 0) {
      const result = getComponentById(id, component.children)
      if (result !== null) return result
    }
  }
  return null
}
