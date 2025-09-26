import React, { useState } from 'react'
import SubscribeButton from './button/SubscribeButton';

const SubscribeForm = () => {
    const [subscribeMessage, setSubscribeMessage] = useState("");
      const [subscribe, setSubscribe] = useState({ email: "" });
    
      const handleSubscribe = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
      
        if (!subscribe.email) {
          setSubscribeMessage("Email is required for subscription 😒");
          setTimeout(() => setSubscribeMessage(""), 2000); // Clear message after 2s
          return;
        }
    
        setSubscribeMessage("You are subscribed to our newsletter 🎉");
        console.log("Subscribed", subscribe);
        
        setTimeout(() => 
          {
            setSubscribeMessage("")
            setSubscribe({email:""})
          }
    
        , 2000); 
      };
  return (
    <div>
        <form className="flex space-x-3 mt-8" onSubmit={handleSubscribe}>
            <input onChange={(e) => setSubscribe({ email: e.target.value })} value={subscribe.email} name="email" type="emal" placeholder="Enter your email address" className="text-gray-800  bg-white border-2 focus:*:border-gray-200 border-gray-200 rounded-lg px-2"/>
            <SubscribeButton label="Subscribe Now"/>
          </form>
        <p className="py-1 text-blue-500 font-semibold">{subscribeMessage}</p>
    </div>
  )
}

export default SubscribeForm