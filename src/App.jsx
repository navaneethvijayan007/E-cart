import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import WishList from './pages/WishList'
import Cart from './pages/Cart'
import Pnf from './pages/Pnf'
import View from './pages/View'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/WishList' element={<WishList />} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='/:id/View' element={<View />} />
        <Route path='/*' element={<Pnf />} />
      </Routes>
      ,<Footer/>
    </>
  )
}

export default App
