import User from '@/models/User'
import { User2 } from 'lucide-react'
import React from 'react'

const UserProfiles = () => {

    //click user icon to view profile details

    const handleProfileClick = () => {
        //open div with profile details
        console.log("Profile clicked");
    }

  return (
    <section className="">
        <User2 className='h-6 w-6 text-gray-600' onClick={handleProfileClick}/>
        <div className="">
            <h2 className="text-lg font-semibold">User Profile</h2>
            <p className="text-gray-600">Manage your account settings</p>
            <button className="px-4 py-2 bg-[#F59D55] text-white rounded hover:bg-[#A95F21]">View Profile</button>
        </div>
    </section>
  )
}

export default UserProfiles