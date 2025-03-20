import {BrowserRouter, Route, Routes} from 'react-router-dom'

//Routes
import AllCircuits from './pages/AllCircuits';

import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AllCircuits />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
