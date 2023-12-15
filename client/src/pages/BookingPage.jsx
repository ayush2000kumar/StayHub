import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";

export default function BookingPage(){
   const {id} = useParams();
   const [booking,setBooking] = useState(null);
   useEffect(()=>{
    if(id){
      axios.get('/bookings').then(response =>{
        const foundBooking = response.data.find(({_id}) => _id ===id);
        if(foundBooking){
            setBooking(foundBooking);
        }
      });
    }
   }, [id]);

   if(!booking){
    return '';
   }
    return(
         <div className="my-8">
            <h1 className="text-2xl mr-36">{booking.place.title}</h1>
            <AddressLink className='my-2 block'>{booking.place.address}</AddressLink>
            <div className="bg-primary p-6 my-4 rounded-2xl flex items-center justify-between shadow shadow-gray-500">
              <div>
                <h1 className="text-2xl mb-2 text-white">Your Booking Informations:</h1>
                <div className="text-white">
                <BookingDates booking = {booking}/>
                </div>
              </div>
              <div className="bg-fuchsia-950 p-4 text-white rounded-2xl shadow shadow-fuchsia-500">
               <div>Total Price:</div> 
               <div className="text-3xl">${booking.price}</div> 
              </div>
            </div>
            <PlaceGallery place = {booking.place} />
         </div>
    );
}