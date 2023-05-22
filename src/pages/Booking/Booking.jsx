import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';
import BookingRow from './BookingRow';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
    const {user}=useContext(AuthContext);

    const [bookings, setBooking]=useState([]);
    const navigate=useNavigate();
    const url=`https://car-doctor-server-lovat.vercel.app/booking?email=${user?.email}`;

    useEffect(()=>{
        fetch(url,{
          method:'GET',
          headers:{
            authorization:`Bearer ${localStorage.getItem('car-access-token')}`
          }
        })
        .then(res=>res.json())
        .then(data=>{
          if(!data.error){
             setBooking(data)
          }else{
            //logOut then navigate
           navigate('/');
          }
         })
    }, [url, navigate])

    const handleDelete=id=>{
        console.log(id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            console.log(result.isConfirmed);

            fetch(`https://car-doctor-server-lovat.vercel.app/booking/${id}`,{
                method:'DELETE',
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                if (data. deletedCount>0) {
              Swal.fire(
                'Deleted!',
                'Your file has been in my website deleted.',
                'success'
              )
            }
            const remaining=bookings.filter(booking=>booking._id!==id);
            setBooking(remaining);
            })
            
          })
        }

        const handleConfirm=id=>{
            fetch(`https://car-doctor-server-lovat.vercel.app/booking/${id}`,{
                method:'PATCH',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({status:'confirm'})

            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                if(data.modifiedCount>0){
           
                    Swal.fire({
                      position: 'center',
                      icon: 'info',
                      title: 'Your booking is Update',
                      showConfirmButton: false,
                      timer: 1500
                    })

                    const remaining=bookings.filter(booking=>booking._id !==id);
                    const updated=bookings.find(booking=>booking._id===id);
                    updated.status='confirm';
                    const newBookings=[updated, ...remaining];
                    setBooking(newBookings);
                }


            })
        }



  
    return (
        <div>
            <h2 className='text-5xl text-center'>Your booking: {bookings.length}</h2>

            <div className="overflow-x-auto w-full">
  <table className="table w-full">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Picture</th>
        <th>Service title</th>
        <th>Delivery Date</th>
        <th>price</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
     {
        bookings.map(booking=><BookingRow
        key={booking._id} booking={booking} setBooking={setBooking} bookings={bookings} handleDelete={handleDelete}
        handleConfirm={handleConfirm}
        ></BookingRow>)
     }
      
    
    </tbody>
    
  </table>
</div>
        </div>
    );
};

export default Booking;