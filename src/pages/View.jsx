import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist } from '../redux/slices/wishlistSlice'
import { addToCart } from '../redux/slices/cartSlice'

const View = () => {
  const userCart = useSelector(state => state.cartReducer)
  const dispatch = useDispatch()
  const userWishlist = useSelector(state => state.wishlistReducer)
  const [product, setProduct] = useState({})
  const { id } = useParams()

  useEffect(() => {
    if (sessionStorage.getItem("allProducts")) {
      const allProducts = JSON.parse(sessionStorage.getItem("allProducts"))
      setProduct(allProducts.find(item => item.id == id))
    }
  }, [id])

  const handleWishlist = () => {
    const existingProduct = userWishlist?.some(item => item?.id == id)
    if (existingProduct) {
      alert("Product already in your wishlist!")
    } else {
      alert("Product added to your wishlist")
      dispatch(addToWishlist(product))
    }
  }

  const handleCart = () => {
    const existingProduct = userCart?.some(item => item?.id == id)
    if (existingProduct) {
      alert("Product quantity is incrementing in your cart!")
    } else {
      alert("Product added to your cart")
    }
    dispatch(addToCart(product))
  }

  return (
    <>
      <Header />
      <div className='mx-5'>
        <div className="grid grid-cols-2 items-center h-screen">
          <img width={'350px'} height={'250px'} src={product?.thumbnail} alt="Product Thumbnail" />
          <div>
            <h3 className='font-bold '>PID : {product?.id}</h3>
            <h1 className='text-5xl font-bold'>{product?.title}</h1>
            <h4 className='font-bold text-red-600 text-2xl'>{product?.price}</h4>
            <h4>Brand : {product?.brand}</h4>
            <h4>Category : {product?.category}</h4>
            <p><span className='font-bold'>Description:</span> {product?.description}</p>

            <div className='flex justify-between mt-5'>
              <button onClick={handleWishlist} className='bg-blue-600 rounded text-white p-2'>ADD TO WISHLIST</button>
              <button onClick={handleCart} className='bg-green-600 rounded text-white p-2'>ADD TO CART</button>
            </div>
            <h3 className='font-bold mt-4'>Client Reviews</h3>
            {
              product?.reviews?.length > 0 ?
                product?.reviews?.map(item => (
                  <div key={item.date} className='shadow border rounded p-2 mb-2'>
                    <h5>
                      <span className='font-bold'>{item?.reviewerName}</span> : <span>{item?.comment}</span>
                    </h5>
                    <p>Rating : {item?.rating} <i className='fa-solid fa-star text-yellow-400'></i></p>
                  </div>
                ))
                :
                <div className='font-bold text-red-600'>No reviews yet!!!</div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default View
