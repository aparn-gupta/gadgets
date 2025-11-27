import { useEffect } from 'react'
import React, {useState} from 'react'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router'
import Navbar from './Navbar'
import Footer from './footrer'
import loader from './assets/loader.gif'

const GadgetDetails = () => {


  const navigate = useNavigate()



    const gadgetId = useParams()
   

    const [myGadgetData, setMyGadgetData] = useState([])
    
    const [successMessage, setSuccessMessage] = useState('')
    const [loading, setLoading] = useState(false)
    
    
    
    
    useEffect(() => {
      const fetchgadgetData = async () => {
        setLoading(true)
        try {
          const fetchResponse = await fetch("https://ultimategadgeting.onrender.com/allgadgets")
         const gadgetData = await fetchResponse.json()
        if (fetchResponse.ok) {
            const reqdGadget = gadgetData.find(item => item._id == gadgetId.id)
            setMyGadgetData(reqdGadget)

        }
      
        else if (!fetchResponse.ok) {
          throw new Error()
        }
        
        } catch (err) {
          setSuccessMessage("Error fetching gadgets")
        } finally {
          setLoading(false)
        }
      }
      fetchgadgetData()
    }, [])

    const calcPercentage = (myGadgetData.resalePrice ) * 100/myGadgetData.originalPrice
    const markUpPercentage = calcPercentage.toFixed(1)

    let featuresArray = []
    if (myGadgetData.gadgetFeatures) {
      featuresArray = myGadgetData.gadgetFeatures.split(",")
      
    }

    let todaysDate = new Date()
    
    let postDate = new Date(myGadgetData.datePosted)

    let productDate = new Date(myGadgetData.originalPurchaseDate)

    const diffPost = todaysDate - postDate
    const diffAge = todaysDate - productDate

    const diffPosting = (Math.floor(diffPost/(1000 * 60 * 60 * 24)))

    const productAge = Math.floor(diffAge/(1000 * 60 * 60 * 24 * 30))

    const prodAgeYrs = Math.floor(productAge/12)
    const prodAgeMonths = productAge%12

    const itemId = myGadgetData._id


    const handleDelete = async () => {
      setLoading(true)

      try {
        let deleteUrl = `https://ultimategadgeting.onrender.com/allgadgets/${itemId}`
        const response = await fetch(deleteUrl, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error("Error Deleteing gadget")
        } 

        // const result = response.json()

        console.log(response.message + "Item deleted")

        setTimeout(() => {
          navigate('/')
        }, 1000)
        
      }
     
     catch (err) {
      console.log(err)

    } finally {
      setLoading(false)

    }
  }

  const [updateInfo, setUpdateInfo] = useState({})


  const handleInfoUpdate = (e) => {
    setUpdateInfo({[e.target.name]: e.target.value})

  }

  const updateDetails = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const updateUrl = `https://ultimategadgeting.onrender.com/allgadgets/${itemId}`
      const updateResponse = await fetch(updateUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type' : 'application/json'
        },

        body: JSON.stringify(updateInfo)
      })

      console.log(updateResponse)
      console.log(updateInfo)

      const result = await updateResponse.json()
      
      if (!updateResponse.ok) {
        throw new Error("Error Updating Detail")
      }
      console.log(result)
      setTimeout(() => {
        window.location.reload()
      }, 1000)

    } catch (err) {
      console.log(err)
     
    } finally {
      setLoading(true)

    }
  }







    

  return (
    <div className='w-100  '>
      <Navbar />


      <div className=' w-screen h-screen bg-white fixed top-0 left-0 z-1000 justify-center items-center' style={{display: loading ? 'flex' : 'none'}}>
     
      <img src={loader}  className='w-52 h-52 ' />

         </div>


      



<div className=' w-11/12 md:w-5/6 mx-auto py-6 mt-24'>

<h1 className='gadget-name mt-6 mb-20'>{myGadgetData.brand}  -
{myGadgetData.model} </h1>


{ !myGadgetData.imgUrl  || myGadgetData.imgUrl.length == 0 ?
  <div className='w-full flex justify-center'>
  <img className="shadow-2xl object-contain gadget-image" alt="Yoo"   src='https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg' /> 
    </div>   :    <div id="carouselExampleControls"  className="carousel slide" data-ride="carousel">
  <div  className="carousel-inner">
    
    
   { myGadgetData.imgUrl.map((item, index) => {
      return (
        <div key={index} className={`carousel-item  ${item == myGadgetData.imgUrl[0] ? 'active' : ''}`}>
        <img  className="d-block mx-auto gadget-image" src={item} alt="Second slide"  style={{objectFit: 'contain'}} />
      </div>
      )
    }) }
    
    </div>
  <button  className="carousel-control-prev" data-bs-target="#carouselExampleControls" role="button" data-bs-slide="prev">
    <span  className=" text-secondary w-12 h-12 rounded-full flex justify-center items-center " aria-hidden=""><i className="fa-solid fa-angle-left text-4xl"></i></span>
    <span  className="sr-only">Previous</span>
  </button>
  <button  className="carousel-control-next" data-bs-target="#carouselExampleControls" role="button" data-bs-slide="next">
    <span  className=" text-secondary w-12 h-12 rounded-full flex justify-center items-center" aria-hidden="true"><i className="fa-solid fa-angle-right text-4xl"></i></span>
    <span  className="sr-only">Next</span>
  </button>

  </div>
   
}


    {/* {myGadgetData.imgUrl  &&
    
    
    
  
    


} */}






<div className='w-full mt-5'>


 <div className='row'>

 <div className='md:px-4 py-4 mt-2  col-sm-12 col-md-4 text-center shadow-md bg-blue-200 md:bg-blue-100   hover:bg-blue-50 '>
   <span className='  text-blue-600'>Resale Price: </span> <span className='font-bold'>            ${myGadgetData.resalePrice}  <span className='text-secondary font-bold'>{ myGadgetData.originalPrice? `(${markUpPercentage}%)` : ''}</span>
  </span>
<span  data-bs-toggle="modal"
                        data-bs-target="#update-resale-price"  >  <i title='Update Resale Price' className="fa-solid fa-pencil text-primary ml-5"></i> 
</span> 
 </div>
 <div className=' md:flex  col-sm-12 col-md-8 '>
 <div className='px-4 text-center col-sm-12 col-md-4 py-4 mt-2 shadow-md bg-blue-100  hover:bg-blue-50 '> <span className='text-primary'>Original Price: </span> <span className='font-bold'>            ${myGadgetData.originalPrice}  
  </span>

  </div>
  <div className='md:ml-3 text-center px-4 col-sm-12 col-md-8 py-4 mt-2 shadow-md bg-blue-100  hover:bg-blue-50 '> <span className='text-primary'>Originally Purchased On: </span> <span className='font-bold'>            {myGadgetData.originalPurchaseDate}    <span className='text-secondary'> ({prodAgeYrs <= 0 ? '' : `${prodAgeYrs}Yrs`} {prodAgeMonths} Mos )</span>
  </span>

  </div>
 </div>
 </div>

<div className='border-1 border-slate-100 mt-4 shadow-md shadow-blue-200'>
<div className='md:flex md:justify-between '>

<div className='px-4 md:text-center py-4 mt-2  col-sm-12 col-md-4 hover:bg-slate-100 '> Posted by:  <span className='font-bold'>            {myGadgetData.salerName}
 </span>

 </div>

<div className='md:flex col-sm-12 col-md-8'>

<div className='px-4 py-4 mt-2 md:text-center col-sm-12 col-md-6  hover:bg-slate-100 '> Phone:  <span className='font-bold'>            {myGadgetData.sellerPhone}
 </span>
 <span   data-bs-toggle="modal"
                        data-bs-target="#update-phone">  <i title='Update Saler Phone' className="fa-solid fa-pencil text-primary ml-5"></i>
 </span> 
 </div>


 <div className=' px-4 py-4 mt-2 md:text-center col-sm-12 col-md-6  hover:bg-slate-100 '> Email:  <span className='font-bold'>            {myGadgetData.sellerEmail}
 </span>
 <span data-bs-toggle="modal"
                        data-bs-target="#update-email">  <i title='Update Saler Email' className="fa-solid fa-pencil text-primary ml-5"></i>
 </span> 
 </div>
</div>
</div>
 <div className='px-4 pt-4 mt-2 col-sm-12 col-md-12 '> 
  <div className='flex justify-between'>
   <div> Salient Features:</div> 
   <div data-bs-toggle="modal"
                        data-bs-target="#update-salient-features">  <i title='Update Salient Features' className="fa-solid fa-pencil text-primary "></i> </div>
   

     </div>
   <span className='font-bold'> 
  <ul className='mt-3'>
    {featuresArray && featuresArray.map((item, index )=> {
      return (
        <li key={index} className='list-disc w-full mt-1 py-3 pl-4 hover:bg-blue-50 '> {item} </li>
      )
    })}
    </ul>          
 </span>


 </div>

 <div className=' mt-4 px-4 py-4 col-sm-12 col-md-12 hover:bg-slate-50 '> 
 <div className='flex justify-between'>
   <div> Current Condition:</div> 
   <div data-bs-toggle="modal"
                        data-bs-target="#update-current-condition">  <i title='Update Current Condition'  className="fa-solid fa-pencil text-primary "></i> </div>

     </div>
   <span className='font-bold'>          {myGadgetData.currentCondition} 
 </span>
 </div>


</div>



  

  <div className='px-4 py-4 mt-2 col-sm-12 col-md-12 shadow-md shadow-blue-200  hover:bg-slate-100 '> Posted on:  <span className='font-bold'>            {myGadgetData.datePosted}  <span className='text-secondary'>({diffPosting} days ago ) </span>
  </span>
  </div>

  <div className='px-4 py-4 mt-2 col-sm-12 col-md-12 shadow-md shadow-blue-200  hover:bg-slate-100 '> Category: <span className='font-bold'>            {myGadgetData.gadgetName}
       {myGadgetData.gadgetName && myGadgetData.gadgetName[myGadgetData.gadgetName.length - 1] == 's' ?  '' : 's'} 

  </span>
  </div>


 





  <div className='flex justify-end my-5'> 
  {/* <button className='btn-primary btn bg-gradient'> Update</button> */}
  <button className='btn-danger btn btn-sm bg-gradient' onClick={() => {
    confirm("Are you sure you want to delete this gadget?") && handleDelete()
  }}> Delete Post</button>



</div> 
</div>







</div>

<Footer />




<div
        className="modal fade"
        id="update-phone"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        
        <div className="modal-dialog modal-dialog-centered">
      
       
          <div className="modal-content">
          <form onSubmit={updateDetails}>
            <div className="modal-header">
              <h5
                className="modal-title "
                style={{ color: "#192035" }}
                id="exampleModalLabel"
              >
                Update Phone
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            
              <div className="mb-3 ">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Phone:
                            </label>
                            <input
                                type="text"
                                className="form-control "
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                name="sellerPhone"
                                
                                onChange={handleInfoUpdate}
                                minLength="10"
                                maxLength="30"
                               
                                

                                required
                            />
                        </div>
             
              
            </div>
            <div className="modal-footer">
            <button
                type="submit"
                className="btn btn-success btn-sm bg-gradient"
                
                
              >
                Update
              </button>
              <button
                type="button"
                className="btn btn-sm bg-gradient text-white"
                data-bs-dismiss="modal"
                style={{ background: "#192035" }}
              >
                Close
              </button>
            </div>
            </form> 
          </div>
        
        </div>
      
        </div>



        <div
        className="modal fade"
        id="update-email"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        
        <div className="modal-dialog modal-dialog-centered">
      
       
          <div className="modal-content">
          <form onSubmit={updateDetails}>
            <div className="modal-header">
              <h5
                className="modal-title "
                style={{ color: "#192035" }}
                id="exampleModalLabel"
              >
                Update Email
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            
              <div className="mb-3 ">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Email:
                            </label>
                            <input
                                type="email"
                                className="form-control "
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                name="sellerEmail"
                                
                                onChange={handleInfoUpdate}
                                minLength="5"
                                maxLength="100"
                               
                                

                                required
                            />
                        </div>
             
              
            </div>
            <div className="modal-footer">
            <button
                type="submit"
                className="btn btn-success btn-sm bg-gradient"
                
                
              >
                Update
              </button>
              <button
                type="button"
                className="btn btn-sm bg-gradient text-white"
                data-bs-dismiss="modal"
                style={{ background: "#192035" }}
              >
                Close
              </button>
            </div>
            </form> 
          </div>
        
        </div>
      
        </div>

        <div
        className="modal fade"
        id="update-current-condition"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        
        <div className="modal-dialog modal-dialog-centered">
      
       
          <div className="modal-content">
          <form onSubmit={updateDetails}>
            <div className="modal-header">
              <h5
                className="modal-title "
                style={{ color: "#192035" }}
                id="exampleModalLabel"
              >
                Update Current Condition
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            
              <div className="mb-3 ">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Current Condition:
                            </label>
                           
                            <textarea type="text"
                                className="form-control "
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                name="currentCondition"
                               
                                
                                onChange={handleInfoUpdate}
                                minLength="5"
                                maxLength="400"
                               
                                

                                required>
                              {myGadgetData.currentCondition}
                            </textarea>
                        </div>
             
              
            </div>
            <div className="modal-footer">
            <button
                type="submit"
                className="btn btn-success btn-sm bg-gradient"
                
                
              >
                Update
              </button>
              <button
                type="button"
                className="btn btn-sm bg-gradient text-white"
                data-bs-dismiss="modal"
                style={{ background: "#192035" }}
              >
                Close
              </button>
            </div>
            </form> 
          </div>
        
        </div>
      
        </div>


        <div
        className="modal fade"
        id="update-resale-price"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        
        <div className="modal-dialog modal-dialog-centered">
      
       
          <div className="modal-content">
          <form onSubmit={updateDetails}>
            <div className="modal-header">
              <h5
                className="modal-title "
                style={{ color: "#192035" }}
                id="exampleModalLabel"
              >
                Update Resale Price
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            
              <div className="mb-3 ">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Updated Resale Price:
                            </label>
                           
                          

                            <input type="number"
                                className="form-control "
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                name="resalePrice"
                               
                                
                                onChange={handleInfoUpdate}
                                min = "1"
                                placeholder="in $"

                               
                               
                                

                                required />
                        </div>
             
              
            </div>
            <div className="modal-footer">
            <button
                type="submit"
                className="btn btn-success btn-sm bg-gradient"
                
                
              >
                Update
              </button>
              <button
                type="button"
                className="btn btn-sm bg-gradient text-white"
                data-bs-dismiss="modal"
                style={{ background: "#192035" }}
              >
                Close
              </button>
            </div>
            </form> 
          </div>
        
        </div>
      
        </div>


        <div
        className="modal fade"
        id="update-salient-features"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        
        <div className="modal-dialog modal-dialog-centered">
      
       
          <div className="modal-content">
          <form onSubmit={updateDetails}>
            <div className="modal-header">
              <h5
                className="modal-title "
                style={{ color: "#192035" }}
                id="exampleModalLabel"
              >
                Update Features
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            
              <div className="mb-3 ">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Features:
                            </label>
                           
                            <textarea type="text"
                                className="form-control "
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                name="gadgetFeatures"
                                placeholder='Type commas to separate points'
                               
                                
                                onChange={handleInfoUpdate}
                                minLength="5"
                                maxLength="400"
                               
                                

                                required>
                              
                            </textarea>
                        </div>
             
              
            </div>
            <div className="modal-footer">
            <button
                type="submit"
                className="btn btn-success btn-sm bg-gradient"
                
                
              >
                Update
              </button>
              <button
                type="button"
                className="btn btn-sm bg-gradient text-white"
                data-bs-dismiss="modal"
                style={{ background: "#192035" }}
              >
                Close
              </button>
            </div>
            </form> 
          </div>
        
        </div>
      
        </div>



      
    </div>
  )
}

export default GadgetDetails
