import React, { useEffect, useState } from "react";
import bgImg from "./assets/high-tech-bg.avif";
import { useRef } from "react";
import { Link } from "react-router";
import Navbar from "./Navbar";
import Footer from "./footrer";
import loader from './assets/loader.gif'


const AllGadgets = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [timerSecs, setTimerSecs] = useState(60);
  const [fetchedData, setFetchedData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false)



  let imgEl = useRef()
  // let wrapperContainer = useRef()

  window.addEventListener('scroll' , () => {
    let offset = window.scrollY * 0.7
    console.log("scrolled")

    

    imgEl.current.style.transform = `translateY(${offset}px)`



  })

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimerSecs((count) => count - 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);



  let intialStartIndex = 0;
  let clickedBtnIndex = sessionStorage.getItem("clickedBtnIndex");
  if (clickedBtnIndex) {
    intialStartIndex = parseInt(clickedBtnIndex) * 10;
  }

  let [startIndex, setStartIndex] = useState(intialStartIndex);



  let endIndex = startIndex + 10;

  if (endIndex === fetchedData.length) {
    endIndex = fetchedData.length - 1;
  }

  let arraysPerPage = fetchedData.slice(startIndex, endIndex);

  let noOfBtns = Math.floor(fetchedData.length / 10 + 1);
  // console.log(noOfBtns)

  const arrayForMapping = (start, end) =>
    Array.from({ length: end - start }, (_, i) => 0 + i);

  const btnsArray = arrayForMapping(1, noOfBtns);
  const [pageNo, setPageNo] = useState(1);
  // console.log(btnsArray)

  const handlePgnBtnClick = (clickedInd) => {
    setStartIndex(10 * clickedInd);
    // setPageNo(clickedInd + 1)
    sessionStorage.setItem("clickedBtnIndex", JSON.stringify(clickedInd));

    console.log(clickedInd);
  };

  const paginationBtns = btnsArray.map((item, index) => {
    return (
      <div key={index} className="mx-2 z-10">
        <button
          className="btn btn-primary w-10 h-10 bg-gradient"
          onClick={() => {
            handlePgnBtnClick(index);
          }}
        >
           
          {index + 1} 
        </button>
      </div>
    );
  });

  useEffect(() => {

    const fetchgadgetData = async () => {
      setLoading(true)

      try {
        const fetchResponse = await fetch(
          "https://ultimategadgeting.onrender.com/allgadgets"
        );
        // const fetchResponse = await fetch("http://localhost:3000/allgadgets");

        const gadgetData = await fetchResponse.json();
        if (fetchResponse.ok) {
          setFetchedData(gadgetData.reverse());
        } else if (!fetchResponse.ok) {
          throw new Error();
        }
      } catch (err) {
        setErrorMessage("Error fetching gadgets");
      } finally {
        setLoading(false)

      }
    };
    fetchgadgetData();
  }, []);

  useEffect(() => {
    const contactModal = document.getElementById("contact-info-modal");

    contactModal.addEventListener("show.bs.modal", (e) => {
      const modalBtn = e.relatedTarget;
      setEmail(modalBtn.getAttribute("data-bs-email"));
      setPhone(modalBtn.getAttribute("data-bs-phone"));
      setSellerName(modalBtn.getAttribute("data-bs-sellername"));
    });

    return () => {
      contactModal.removeEventListener("show.bs.modal", () => {});
    };
  }, []);

  return (
    <div>
      <Navbar />

        <div className=' w-screen h-screen bg-white fixed top-0 left-0 z-1000 justify-center items-center' style={{display: loading ? 'flex' : 'none'}}>

    <div>
    <div className="w-full  flex justify-center">
      <img src={loader}  className='w-52 h-52 ' />
      </div>
           
           
           <div className="text-3xl  text-center w-full text-[#0B779C]">
          
             <div className="text-center z-20">
                
               Please wait for Render's free tier server to start
             </div>
             <div className="text-center mt-4 z-10">
                
               {timerSecs}s
               <div
                 className="flex justify-center mt-6 z-10"
                 onClick={() => {
                   window.location.reload();
                 }}
               >
                 <i className="fa-solid fa-rotate-right text-5xl"></i>
               </div>
             </div>
           </div>
    </div>
    
      
               </div>

      <div className=" bg-slate-500 relative overflow-hidden" >

        <img  src={bgImg} className="absolute top-0 w-full h-full bg-img " ref={imgEl} />

      
          <div
            className="flex justify-center items-center  h-screen w-screen"
          
          >
            <h1 className="text-white text-center z-10">
              Welcome to the Ultimate Gadget Resale spot!
            </h1>
          </div>

          {/* {fetchedData.length == 0 && (
            <div className="text-3xl text-white text-center w-full">
              <div className="text-center z-1000">
                 
                Please wait for Render's free tier server to start
              </div>
              <div className="text-center mt-4 z-1000">
                 
                {timerSecs}s
                <div
                  className="flex justify-center mt-6 z-1000"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  <i className="fa-solid fa-rotate-right text-white text-5xl z-100"></i>
                </div>
              </div>
            </div>
          )} */}

          {fetchedData.length == 0 ? (
            ""
          ) : (
            <div className="relative ">
              <div className="absolute top-0 left-0 w-full custom-bg-image"></div>

              <div className="">
                <Link
                  to="/postnewgadget"
                  className="flex justify-center w-full py-5 text-decoration-none"
                >
                  <div className="btn btn-primary btn-lg bg-gradient">
                    <i className="fa-solid fa-plus mr-1"></i>
                    Post Your Gadget
                  </div>
                </Link>

                <div className="row mx-auto cards-container">
                  <div className="w-full flex justify-end">
                    <p className="text-white">
                      Page: {Math.floor(startIndex / 10) + 1}
                    </p>
                  </div>

                  {arraysPerPage.map((item, index) => {
                    return (
                      <div
                        className="col-sm-12 col-md-9 col-lg-6 mb-4 mx-auto "
                        key={index}
                      >
                        <div className="gadget-cards animate-fade-down animate-duration-1000 animate-delay-[3000ms]  ">
                          <Link to={`/gadgetdetails/${item._id}`} className="">
                            <div className="w-full flex justify-center">
                              <img
                                src={
                                  item.imgUrl.length
                                    ? item.imgUrl[0]
                                    : "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
                                }
                                className="block md:hidden w-52 h-52 mb-5"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </Link>
                          <div className="flex justify-between">
                            <div>
                              <div className="text-xl exo-text">
                                <span> {item.brand} </span>
                                <span> {item.model} </span>
                              </div>

                              <div className="mt-3">
                                Resale Price: 
                                <span className="font-bold">
                                  {item.resalePrice}$
                                </span>
                              </div>

                              <div> Seller: {item.salerName}</div>
                              <div className="mt-5">
                                Purchased on: {item.originalPurchaseDate}
                              </div>

                              <div>
                                Posted on: 
                                <span className="font-bold">
                                  {item.datePosted}
                                </span>
                              </div>
                            </div>

                            <Link to={`/gadgetdetails/${item._id}`}>
                              <img
                                src={
                                  item.imgUrl.length
                                    ? item.imgUrl[0]
                                    : "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
                                }
                                className="hidden md:block w-40 h-40"
                                style={{ objectFit: "contain" }}
                              />
                            </Link>
                          </div>

                          <div className="flex justify-between w-full md:w-4/5 lg:w-3/4 mx-auto mt-5">
                            <button
                              className=" custom-btn btn-green mr-4"
                              data-bs-toggle="modal"
                              data-bs-target="#contact-info-modal"
                              data-bs-email={item.sellerEmail}
                              data-bs-phone={item.sellerPhone}
                              data-bs-sellername={item.salerName}
                            >
                              <i className="fa-solid fa-address-card mr-1"></i>
                              View Seller
                            </button>

                            <Link
                              to={`/gadgetdetails/${item._id}`}
                              className="no-underline text-decoration-none"
                            >
                              <div className="custom-btn btn-pink ">
                                <i className="fa-solid fa-forward mr-1"></i> 
                                More Details
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <div className=" w-full flex justify-center mt-5 pb-5">
            <div className="text-white flex mx-auto">{paginationBtns}</div>
          </div>

          <Footer className="text-white z-100" />
       
      </div>

      <div
        className="modal fade"
        id="contact-info-modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title "
                style={{ color: "#192035" }}
                id="exampleModalLabel"
              >
                {sellerName}'s Contact Info
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mt-1">
                Email: <span className="font-bold">{email}</span>
              </div>
              <div className="mt-3">
                Phone: <span className="font-bold">{phone}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-sm bg-gradient"
                data-bs-dismiss="modal"
                style={{ background: "#192035" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllGadgets;
