import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProviders';
import Swal from 'sweetalert2'


const CheckOut = () => {
    const service=useLoaderData();
    const {user}=useContext(AuthContext);
   const {_id, title, price,img }=service;
   const handleBookService=event=>{
    event.preventDefault();
   const form=event.target;
    const name=form.name.value;
    const email=user?.email;
    const date=form.date.value;
    console.log(name, email, date);
    const order={
        customerName:name,
        email,
        date, 
        img,
        service:title,
        service_id:_id,
        price:price
    };
    console.log(order);

    fetch('https://car-doctor-server-lovat.vercel.app/booking',{
        method:"POST",
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(order),
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        if(data.insertedId){
           
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your booking is successful',
              showConfirmButton: false,
              timer: 1500
            })
        }
    })
   }
    return (
        <div>
            <h2 className='text-center text-3xl'>Book Service:{title}</h2>
            <form onSubmit={handleBookService}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name='name' defaultValue={user?.displayName} className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Date</span>
          </label>
          <input type="date" name='date' className="input input-bordered" />
        </div>
            <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="text" name="email" defaultValue={user?.email} className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Due amount</span>
          </label>
          <input type="text" defaultValue={'$'+price} className="input input-bordered" />
        </div>
            </div>
           
        
        <div className="form-control mt-6">
          <input type="submit" className='btn btn-warning btn-block' value="Order Confirm" />
        </div>
        </form>
      </div>
    );
};

export default CheckOut;