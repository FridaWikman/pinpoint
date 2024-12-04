import './App.css'
import NoteBoard from './components/NoteBoard'

function App() {
  return (
    <main
      className="py-5 mx-5 min-vh-100"
      style={{ paddingLeft: '3rem', paddingRight: '3rem' }}
    >
      <NoteBoard></NoteBoard>
    </main>
  )
}

export default App
