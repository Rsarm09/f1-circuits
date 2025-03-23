import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './components/Header';

//Routes
import AllCircuits from './pages/AllCircuits';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<AllCircuits />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
