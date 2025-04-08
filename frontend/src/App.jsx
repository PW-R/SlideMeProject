import { HashRouter, Routes, Route } from 'react-router-dom'

import './App.css'

function App() {

  return (
   <div className='app'>
    <div className="app-router">
      <HashRouter>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
        </Routes>
      </HashRouter>
    </div>
   </div>
  
  )
}

export default App
