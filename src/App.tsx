import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Product from './components/product/Product'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<Product/>} />
      </Routes>
    </Router>
  )
}

export default App
