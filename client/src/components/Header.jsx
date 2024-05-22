import React, { useState,useEffect } from 'react'
import {FaSearch} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {

  const {currentUser}=useSelector((state)=>state.user)
  const [searchTerm,setSearchTerm]=useState('');
  
  const navigate=useNavigate();

  const handleSubmit=(e)=>{
    //this prevent to submit or refresh the page
    e.preventDefault();
    //this is the in build javascript constructor for appending params in the url
    const urlParams=new URLSearchParams(window.location.search);
    urlParams.set('searchTerm',searchTerm);

    const searchQuery=urlParams.toString();
    navigate(`/search?${searchQuery}`)
  }

  //ye useEffect isliye kyuki agr apn ne direct url me searchTerm me change kiya tou woh directly search baar par likha mil jaye(search bar pr bhi likha hua wo hi mil jaye jo url me change kiya searchTrem ke andar)

  useEffect(()=>{

    // window.location.search specifically refers to the query string part of the URL. The query string is the portion of the URL that comes after the question mark (?) and includes parameters that are typically used to pass data to the server or control the content that is displayed on the page.

    //This property returns the query string part of the current URL, including the question mark (?).(detail explaintion in the d drive react10proects)
    const urlParams=new URLSearchParams(location.search);
    const seacrhTermFromUrl=urlParams.get('searchTerm');
    
    if(seacrhTermFromUrl){
      setSearchTerm(seacrhTermFromUrl);
    }
  },[location.search])
  
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
         <h1 className="font-bold text-sm sm:text-xl flex flex-wrap ">
            <span className="text-slate-500">Sahand</span>
            <span className="text-slate-700">Estate</span>
         </h1>
        </Link>
        <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
            <input 
            type="text"
             placeholder="Search..." 
             className='bg-transparent focus:outline-none w-24 sm:w-64'
             value={searchTerm}
             onChange={(e)=> setSearchTerm(e.target.value)}/>
            <button>
               <FaSearch className='text-slate-600'/>
            </button>
        </form>
        <ul className='flex gap-4'>
            <Link to="/"><li className='hidden sm:inline text-slate-700 hover:underline'>Home</li></Link>
            <Link to="/about"><li className='hidden sm:inline text-slate-700 hover:underline'>About</li></Link>
           <Link to="/profile"> 
              {currentUser? (
                <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile'/>
              ):
               (<li className='text-slate-700 hover:underline'>Sign in</li>)
              }
           </Link>
        </ul>
        </div>
    </header>
  )
}
