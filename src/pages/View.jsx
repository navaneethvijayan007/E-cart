import React, { useEffect,useState } from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist } from '../redux/slices/wishlistSlice'

const View = () => {
  const dispatch = useDispatch()
  const userWishlist = useSelector(state=>state.wishlistReducer)
  const[product,setProduct] = useState({})
  const{id} = useParams()
  // console.log(id);
  // console.log(product);
  
  useEffect(()=>{
    if(sessionStorage.getItem("allProducts")){
      const allproducts = JSON.parse(sessionStorage.getItem("allProducts"))

      setProduct(allproducts.find(item=>item.id==id))
    }
  },[])

  const handleWishlist= ()=>{
    const existingProduct = userWishlist?.find(item=>item?.id==id)
    if(existingProduct){
      alert("product aleready in your wishlist!!!")
    }else{
      alert("product added to your wishlist")
      dispatch(addToWishlist(product))
    }
  }
  return (
    <>
      <Header/>
      <div className='mx-5'>
        <div className="grid grid-cols-2 items-center h-screen">
          <img width={'350px'} height={'250px'} src={product?.thumbnail} alt="" />
          <div>
            <h3 className='font-bold '>PID : {product?.id}</h3>
            <h1 className='text-5xl font-bold'>{product?.title}</h1>
            <h4 className='font-bold text-red-600 text-2x1'>{product?.price}</h4>
            <h4>Brand :{product?.brand}</h4>
            <h4>Category : {product?.category}</h4>
           
            <p> <span className='font-bold'>Discription</span>{product?.description}</p>

              <div className='flex justify-between mt-5'>
                <button onClick={handleWishlist} className='bg-blue-600 rounded text-white p-2'>ADD TO WISHLIST</button>
                <button className='bg-green-600 rounded text-white p-2'>ADD TO CART  </button>
              </div>
              <h3 className='font-bold mt-4'>Client Review</h3>
              {
                product?.reviews?.length>0?
                product?.reviews?.map(item=>(
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
