import {BrowserRouter, Route, Routes} from 'react-router-dom';

//Routes
import AllCircuits from './pages/AllCircuits';
import SignUp from './pages/SignUp';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AllCircuits />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
