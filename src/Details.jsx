import React, { useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import fetchPetDetails from './fetchPetDetails';
import { adopt } from './adoptedPetSlice';
import ErorrBoundary from './ErrorBoundary';
import Carousel from './Carousel';
import Modal from './Modal';


const Details = () => {
  const { id } = useParams();
  const result = useQuery(['details', id], fetchPetDetails);
  const navigate =useNavigate();
  const dispatch =useDispatch();
  const [showModal,setShowModal] =useState(false);
  if (result.isLoading) {
    return (
      <div className="loading-panel">
        <h2 className="loader">
          <i className="fa-solid fa-spinner"></i>
        </h2>
      </div>
    );
  }

  const pet = result.data.pets[0];
  console.log("result is =",result);
  // throw new Error("thier is an error");
  return (
      <div className="details">
        <Carousel images={pet.images}/>
        <div>
          <h1>{pet.name}</h1>
          <h2>
            {pet.name} - {pet.breed} - {pet.city} - {pet.state}
          </h2>
          <button onClick={()=>{
          //  dispatch(adopt(pet));
          //   navigate("/")
          setShowModal(true);
          }}>Adopt {pet.name}</button>
          <p>{pet.description}</p>
          {showModal? <Modal>
            <div>
              <h1>Whould You like To adopt{pet.name}?</h1>
              <div className='buttons'>
                <button onClick={()=>{
                  dispatch(adopt(pet));
                   navigate("/");
                }}>Yes</button>
                <button onClick={()=>{
                  setShowModal(false)
                }}>No</button>
              </div>
            </div>
          </Modal>:null}
        </div>
       
      </div>
    
  );
};

// const DetailsErrorBoundary=()=>(
//   <ErorrBoundary>
//     <Details/>
//   </ErorrBoundary>
// )
// export default DetailsErrorBoundary;
export default Details;
