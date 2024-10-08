import { Allotment } from 'allotment'
import 'allotment/dist/style.css'
import Header from '../components/header'
import EditArea from '../components/edit-area'
import Features from '../components/features'
import Setting from '../components/setting'
import { useComponetsStore } from '../stores/components'
import { Preview } from '../components/preview'

export default function LowcodeEditor() {
  const { mode } = useComponetsStore()

  return (
    <div className="h-[100vh] flex flex-col">
      <Header />
      {mode === 'edit' ? (
        <Allotment>
          <Allotment.Pane preferredSize={240} maxSize={300} minSize={200}>
            <Features />
          </Allotment.Pane>
          <Allotment.Pane>
            <EditArea />
          </Allotment.Pane>
          <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
            <Setting />
          </Allotment.Pane>
        </Allotment>
      ) : (
        <Preview />
      )}
    </div>
  )
}
