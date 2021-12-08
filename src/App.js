import './App.css';
import TodoList from './pages/TodoList';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import { user } from './service/localStorage'
import Modal from './component/ModalLoading';

function App() {
  return (
    <Router>
      <Modal />
      <Routes>
        {
          user ?
            <>
              <Route exact path='/todolist' element={<TodoList />} />
              <Route
                path="*"
                element={<Navigate to="/todolist" />}
              />
            </> :
            <>
              <Route exact path='/register' element={<Register />} />
              <Route exact path='/login' element={<Login />} />
              <Route
                path="*"
                element={<Navigate to="/login" />}
              />
            </>
        }
      </Routes>
    </Router>

  )
}

export default App;
