import MonacoEditor, { OnMount } from '@monaco-editor/react'
import { useComponetsStore } from '../../../stores/components'

export default function Source() {
  const { components } = useComponetsStore()

  const handleEditorMount: OnMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction('editor.action.formatDocument')?.run()
    })
  }

  return (
    <div className="h-[calc(100vh-60px)]">
      <MonacoEditor
        height="100%"
        path="components.json"
        language="json"
        onMount={handleEditorMount}
        value={JSON.stringify(components, null, 2)}
        options={{
          fontSize: 13,
          scrollBeyondLastLine: false,
          minimap: {
            enabled: false,
          },
          scrollbar: {
            verticalScrollbarSize: 6,
            horizontalScrollbarSize: 6,
          },
        }}
      />
    </div>
  )
}
