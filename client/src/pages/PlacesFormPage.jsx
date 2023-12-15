import axios from 'axios';
import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import{useState} from "react";
import AccountNav from '../AccountNav';
import { Navigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function PlacesFormPage(){
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);   
    const [description, setDescription] = useState('');
    const [perks, setperks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState('1');
    const [price, setPrice] = useState(100);
    const [redirect,setRedirect] = useState(false);
   useEffect(() =>{
    if(!id) {
    return;
    }
    axios.get('/places/'+id).then(response =>{
       const {data} = response;
       setTitle(data.title);
       setAddress(data.address);
       setAddedPhotos(data.photos);
       setDescription(data.description);
       setperks(data.perks);
       setExtraInfo(data.extraInfo);
       setCheckIn(data.checkIn);
       setCheckOut(data.checkOut);
       setMaxGuests(data.maxGuests);
       setPrice(data.price);
    })
   }, [id]);

    function inputHeader(text) {
    return (
        <h2 className='text-2xl mt-4'>{text}</h2>
    );
}
function inputDescription(text) {
    return (
        <p className='text-gray-500 text-sm'>{text}</p>
    );
}
function preInput(header, description) {
    return (
        <>
            {inputHeader(header)}
            {inputDescription(description)}
        </>
    );
}
async function savePlace(ev){
    ev.preventDefault();
      const placeData = { 
       title,address,addedPhotos,
       description,extraInfo,checkIn,
       checkOut,perks,maxGuests,price,
    };
   if (id) {
    //update
    await axios.put('/places', {
       id, ...placeData
    });
    setRedirect(true);
   }else {
    //new place
    await axios.post('/places', placeData);
    setRedirect(true);
}

}
if(redirect){
    return <Navigate to ={'/account/places'} />
}



    return(
                <div> 
                    <AccountNav />
                    <form onSubmit = {savePlace}>
                        {preInput('Title', 'Title for your place')}
                        <input type="text"
                            value={title} onChange={ev => setTitle(ev.target.value)} placeholder='title' />

                        {preInput('Address', 'Address to your place')}
                        <input type="text"
                            value={address} onChange={ev => setAddress(ev.target.value)} placeholder='Address' />

                        {preInput('Photos', 'Better')}
                        <PhotosUploader addedPhotos = {addedPhotos} onChange = {setAddedPhotos}/>

                        {preInput('Description', 'description of the place')}
                        <textarea value={description} onChange = {ev => setDescription(ev.target.value)} className='w-full border my-1 py-2 px-3 rounded-2xl' />

                        {preInput('Perks', 'Select all the perks of your place')}
                        <div className='grid  mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                            <Perks selected={perks} onChange={setperks} />
                        </div>
                        {preInput('Extra Info', 'Rooms appliences')}
                        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} className='w-full border my-1 py-2 px-3 rounded-2xl' />
                        {preInput('Check in&out times max guest', 'add check in and out times')}
                        <div className='grid gap-2 grid-cols-2 md:grid-cols-4'>
                            <div>
                                <h3 className='mt-2 -mb-1'>Check in time</h3>
                                <input value={checkIn} onChange={ev => setCheckIn(ev.target.value)} type="text" />
                            </div>

                            <div>
                                <h3 className='mt-2 -mb-1'>Check out time</h3>
                                <input value={checkOut} onChange={ev => setCheckOut(ev.target.value)} type="text" />
                            </div>

                            <div>
                                <h3 className='mt-2 -mb-1'>Max guest</h3>
                                <input value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} type="number" />
                            </div>

                            <div>
                                <h3 className='mt-2 -mb-1'>Price per night</h3>
                                <input value={price} onChange={ev => setPrice(ev.target.value)} type="number" />
                            </div>
                    </div>
                     <button className='bg-primary  p-2 w-full text-white rounded-2xl my-4'>Save</button>
                 </form>
         </div>
    );
}
