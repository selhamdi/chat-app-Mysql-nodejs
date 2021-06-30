import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import emailjs from "emailjs-com";
import '../App.css';

function SendMail() {

  const [message, setMessage] = useState(" ");
  const  {register, handleSubmit, errors, reset} = useForm();

  const onSubmit = async (data) => {

    await emailjs.send('service_6c554nb', 'template_21dbyne', data, 'user_mLvQj8CyovQV1AVCK8iiu')
      .then((result) => {
          console.log("result => " + result.text);
      }, (error) => {
          console.log("error => " + error.text);
      });
    
    reset();
    setMessage("Bien enregistré Accédez à votre email pour valider votre compte et discuter avec des etrangers");
  }

  return (
    <div className="App">

      <div className='flex-container-column'>


        <form className='flex-container-column' onSubmit={handleSubmit((event) => onSubmit(event))}>

            <h1 style={{margin: "1rem", fontSize:"2rem"}}> Veuillez entrer votre e-mail correct pour vérifier votre compte </h1>
            <div className='fields-container'>


              <label className='form-label' htmlFor='email'>E-mail</label>
              <input className='form-field' type='email' placeholder='Your Email' name='email' ref={register({required:true, minLength: 11})}/>
              {errors.email && <span className='warning' >Invalid e-mail</span>}

            </div>

            <input className='form-btn' type='submit' value='Send'/><br/>
            { !errors.email && <span style={{color: "red", margin: "1rem", fontSize: "2rem"}}>{message}</span>}

        </form>

      </div>

    </div>
  );
}

export default SendMail;
