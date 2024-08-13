import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import LowcodeEditor from './editor'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <LowcodeEditor />
    </DndProvider>
  )
}

export default App
