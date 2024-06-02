import { Link } from 'react-router-dom'
import {MdLocationOn} from "react-icons/md"

export default function ListingItem({listing}) {

  return (

      //transition-shadow matlb ki hover karne pr shadow aa jayege pcchhe (box shadow)

      //hover:shadow-2xl means kitne shadow aap lana chate ho wo aap isse adjust kr skte ho jaise 1xl,2xl,lg,3xletc
//     <div className='bg-white shadow-md hover:shadow-2xl transition-shadow overflow-hidden rounded-lg'>
//        <Link to={`/listing/${listing._id}`}>
//             <img src={listing.imageUrls[0]} alt='listing cover' 
//             // scale-105 scales the element to 105% of its original size. The hover: prefix ensures that this scaling effect only applies when the user hovers over the element.

//             //transition-scale It means that whenever the scale of the element changes (like when it is hovered over), the change will be animated smoothly rather than happening instantly.

//             //duration-300 This duration defines how long the transition animation takes to complete, making the scale change appear smooth over 300ms.
//             className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-110 transition-scale duration-300' />
                                    
//             <div className='p-3 flex flex-col gap-2 w-full'>
//                   {/* truncate matlab agar jayada bada text hai tou ... lg jayega peeche */}
//                   <p className='truncate text-lg font-semibold text-slate-700'>{listing.name}</p>
//                   <div className='flex items-center gap-1'>
//                       <MdLocationOn className='h-4 w-4 text-green-700'/>

//                       <p className='text-sm text-gray-600 truncate w-full'>
//                         {listing.address}
//                       </p>
//                   </div>
//                   <p className='text-sm text-gray-600 line-clamp-2'>{listing.description}</p>
//             </div>
//        </Link>
//     </div>

<div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
<Link to={`/listing/${listing._id}`}>
  <img
    src={
      listing.imageUrls[0] ||
      'https://53.fs1.hubspotusercont ent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
    }
    alt='listing cover'
    className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
  />
  <div className='p-3 flex flex-col gap-2 w-full'>
    <p className='truncate text-lg font-semibold text-slate-700'>
      {listing.name}
    </p>
    <div className='flex items-center gap-1'>
      <MdLocationOn className='h-4 w-4 text-green-700' />
      <p className='text-sm text-gray-600 truncate w-full'>
        {listing.address}
      </p>
    </div>
    <p className='text-sm text-gray-600 line-clamp-2'>
      {listing.description}
    </p>

     <p className='text-slate-500 mt-2 font-semibold flex items-center'>
     {/* The toLocaleString() method in JavaScript is used to convert a number into a string, using locale-specific settings for formatting. When called on a number, it returns a string with a language-sensitive representation of the number. */}
         
         ₹
        {listing.offer? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
        {listing.type==='rent' && ' /month'}
     </p> 
      <div className='text-slate-700 flex gap-4'>
         <div className='font-bold text-xs'>
             {listing.bedrooms>1? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
         </div>
         <div className='font-bold text-xs'>
             {listing.bathrooms>1? `${listing.bathrooms} beds` : `${listing.bedrooms} bed`}
         </div>
      </div>
    </div>
    </Link>
    </div>

  )
}
