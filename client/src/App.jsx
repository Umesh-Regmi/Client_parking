import { useState } from 'react'

import './App.css'
import MapWithParking from './components/MapWithParking'

function App() {
  const [count, setCount] = useState(0)

  return (
  <div style={{ height: '100vh', width: '100vw' }}>
      <MapWithParking />
    </div>
  )
}

export default App
