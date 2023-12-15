import { useState } from "react";
import {differenceInCalendarDays} from "date-fns";
import  axios  from "axios";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { useEffect } from "react";


export default function Booking({place}){
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [numberOfGuests,setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone,setPhone] = useState('');
    const [redirect,setRedirect] = useState('');
    const{user} =  useContext(UserContext);

    useEffect(()=>{
        if(user){
            setName(user.name);
        }
    }, [user]);


    let numberOfNights = 0;
    if(checkIn && checkOut){
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

   async function bookingThisPlace(){
   const response = await axios.post('/bookings',{
        checkIn,checkOut,numberOfGuests, 
        name, phone,
        place:place._id,
        price: numberOfNights * place.price,
    });
   const bookingId = response.data._id;
   setRedirect(`/account/bookings/${bookingId}`);
   }
   if(redirect){
    return <Navigate to={redirect} />
   }
     
    

    return(
        <div className="bg-white shadow shadow-slate-500 p-4 rounded-2xl">
                        <div className="text-2xl text-center">
                            Price: ${place.price} /per night
                        </div>
                        <div className="border rounded-2xl mt-4">
                            <div className="flex">
                                <div className="py-3 px-4">
                                    <label>Check In:</label>
                                    <input type="date" 
                                    value={checkIn} 
                                    onChange={ev =>setCheckIn(ev.target.value)} />
                                </div>
                                <div className="py-3 px-4 border-l">
                                    <label>Check Out:</label>
                                    <input type="date" 
                                    value={checkOut} 
                                    onChange={ev =>setCheckOut(ev.target.value)} />
                                </div>
                            </div>
                            <div className="py-3 px-4 border-t">
                                    <label>Guestes:</label>
                                    <input type="number" 
                                    value={numberOfGuests} 
                                    onChange={ev =>setNumberOfGuests(ev.target.value)} />
                            </div>
                              {numberOfNights > 0 && (
                                <div className="py-3 px-4 border-t">
                                <label>Your full name:</label>
                                <input type="text" 
                                value={name} 
                                onChange={ev =>setName(ev.target.value)} />

                                <label>Phone Number:</label>
                                <input className="w-full border my-1 py-2 px-3 rounded-2xl" type="tel" 
                                value={phone} 
                                onChange={ev =>setPhone(ev.target.value)} />
                            </div>
                            )} 
                        </div>
                        <button onClick = {bookingThisPlace} className="bg-fuchsia-950 p-2 w-full text-white rounded-2xl mt-4">
                            Book this place
                            {numberOfNights > 0 && (
                                <span> ${numberOfNights * place.price}</span>
                            )}
                        </button>
        </div>
    );
}