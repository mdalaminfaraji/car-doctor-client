import React from 'react';
import Swal from 'sweetalert2';

const BookingRow = ({booking, setBooking, bookings, handleDelete, handleConfirm}) => {
    const {img, service, price, date, _id, status}=booking

    // const handleDelete=id=>{
    //     console.log(id);
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!'
    //       }).then((result) => {
    //         fetch(`https://car-doctor-server-lovat.vercel.app/booking/${id}`,{
    //             method:'DELETE'
    //         })
    //         .then(res=>res.json())
    //         .then(data=>{
    //             console.log(data);
    //             if (data. deletedCount>0) {
    //           Swal.fire(
    //             'Deleted!',
    //             'Your file has been deleted.',
    //             'success'
    //           )
    //         }
    //         const remaining=bookings.filter(booking=>booking._id!==id);
    //         setBooking(remaining);
    //         })
            
    //       })
    // }
    return (
        <tr>
        <th>
          <button onClick={()=>handleDelete(_id)} className="btn btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="rounded w-24 h-24">
               {img &&  <img src={img}/>}
              </div>
            </div>
           
          </div>
        </td>
        <td>
         {service}
          
        </td>
        <td>{date}</td>
        <td>${price}</td>
        <th>
            {
                status==='confirm'?<span className='font-bold text-primary'>Confirmed</span>:
                <button onClick={()=>handleConfirm(_id)} className="btn btn-ghost btn-xs">Please Confirm</button>
            }
          
        </th>
      </tr>
    );
};

export default BookingRow;