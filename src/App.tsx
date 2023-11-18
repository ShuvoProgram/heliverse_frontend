import './App.css'
import MainLayout from './layouts/MainLayout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <body className='app'>
      <MainLayout/>
      <ToastContainer />
    </body>
  )
}

export default App
