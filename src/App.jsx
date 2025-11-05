import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import { routes } from './components/routes.js'
import Footer from './components/Footer.jsx'

const App = () => {

  return (
    <div>
      <Navbar/>

      <Routes>    
        {routes.map((route) => 
          <Route path={route.path} element={<route.element/>}/>
        )}
      </Routes>

      <Footer/> 
    </div>
  )
}
export default App