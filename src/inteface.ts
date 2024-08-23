import { CSSProperties, PropsWithChildren } from 'react'

export enum SettingType {
  ATTRIBUTE = 'attribute',
  STYLE = 'style',
  EVENT = 'event',
}

export interface Component {
  id: number
  name: string
  props: any
  styles?: CSSProperties
  children?: Component[]
  parentId?: number
  desc?: string
}

export interface CommonComponentProps extends PropsWithChildren {
  id: number
  name: string
  styles: CSSProperties
  [key: string]: any
}

export interface ComponentSetter {
  name: string
  label: string
  placeholder?: string
  type: string
  [key: string]: any
}

export interface ComponentConfig {
  name: string
  defaultProps: Record<string, any>
  desc?: string
  setter?: { [type in SettingType]?: ComponentSetter[] }
  dev: any
  prod: any
}
