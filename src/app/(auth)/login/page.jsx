"use client"

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaLock } from 'react-icons/fa';
import "../../globals.css"
import { axiosGet,axiosPost } from '@/app/lib/Api';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const TOKEN = Cookies.get("token");
console.log("the token we received is",TOKEN);


const Authpage = () => {
  const router = useRouter();

  const [formData,setFormData] = useState({
    username:"",
    password:"",
  })

  useEffect(()=>{
    try {
      axiosGet.get(`valid_token?user_token=${TOKEN}`)
      .then((response)=>{
        console.log("the response for get status",response);

        if(TOKEN){
          router.push("/");
        }else{
          router.push("/login");
        }
      })
    } catch (error) {
      console.log("the error in getting data");
    }
  },[TOKEN])

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log("the form data for this",formData);

    const jsonStructure = {
      user_name:formData.username,
      show_password:formData.password
    }

    try {
        axiosPost.post("multiple_login",jsonStructure)
        .then((response)=>{
          
          console.log("the response received for the data is ",response);
          console.log("the response token received for the data is ",response.data.access_token);
          console.log("the response token received for the data is ",response.data.user_id);

          if(response.status === 200){
              Cookies.set("token",response.data.access_token,{expires:1});
              Cookies.set("user!id",response.data.user_id,{expires:1})
              router.push("/");
          }
        })
    } catch (error) {
      console.log(error);
    }
  }


  const handleChange = (e)=>{
    const {name,value} = e.target;

    setFormData({
      ...formData,
      [name]:value
    })

    
  }

  
 


  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <form className="p-4 shadow rounded bg-white">
        <h2 className="text-center mb-4">Login</h2>

        <div className="mb-3">
          <label className="form-label" htmlFor="username">
            Username:
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <FaUser />
            </span>
            <input type="text" id="username" name="username" value={formData.username} className="form-control" placeholder="Username" onChange={handleChange}/>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            Password:
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <FaLock />
            </span>
            <input type="password" id="password" name="password" className="form-control" placeholder="Password" onChange={handleChange}/>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit}>Login</button>
      </form>
    </div>
  );
};

export default Authpage;
