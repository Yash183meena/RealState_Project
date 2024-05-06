import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React,{useRef, useState} from 'react'
import { app } from '../firebase.js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function CreateListing() {

      const navigate=useNavigate();

      const {currentUser}=useSelector((state)=>state.user);

      const [files,setFiles]=useState([]);
      const[formData,setFormData]=useState({
            imageUrls:[],
            name: '',
            description: '',
            address: '',
            type: 'rent',
            bedrooms: 1,
            bathrooms: 1,
            regularPrice: 50,
            discountPrice: 0,
            offer: false,
            parking: false,
            furnished: false,
      })
      const [imageUploadError,setImageUploadError]=useState(null);
      const[uploading,setUploading]=useState(false);
      const [loading,setLoading]=useState(false);
      const [error,setError]=useState(false);
      console.log(files);
      console.log(formData);

      const handleImageSubmit=(e)=>{
           setUploading(true);
           setImageUploadError(false);

            if (files.length > 0 && files.length + formData.imageUrls.length< 7){
                  const promises=[];

                  for(let i=0;i<files.length;i++){
                        promises.push(storeImage(files[i]));
                  }

                  Promise.all(promises).then((urls)=>{
                        setFormData({
                              ...formData,
                               imageUrls:formData.imageUrls.concat(urls),
                        })
                        setImageUploadError(false);
                        setUploading(false);
                  }).catch((err)=>{
                        setImageUploadError('Image upload failed(less than 2mb'); 
                        setUploading(false);
                  })
            }
            else{
                  setImageUploadError('You can only upload 6 images per listing')
                  setUploading(false);
            }
      }

      


// 1) It imports necessary functions from Firebase SDK.
// 2) Generates a unique filename based on the current timestamp and the original filename.
// 3) Creates a reference to the storage location with the generated filename.
// 4) Initiates an upload task for the file to the storage reference.
// 5)Listens for state changes in the upload task, particularly to track the progress.
// 6) If there's an error during the upload, it rejects the promise with the error.
// 7) Once the upload is completed successfully, it resolves the promise with the download URL of the uploaded file.
      const storeImage=async(file)=>{

            return new Promise((resolve,reject)=>{
                  const storage=getStorage(app);
                  //because always store unique file in the firebase storage
                  const fileName=new Date().getTime() + file.name;
                  //giving the reference to the storage in which file is stored
                  const storageRef=ref(storage,fileName);

                  const uploadTask=uploadBytesResumable(storageRef,file);

                  uploadTask.on('state_changed',
                  (snapshot)=>{
      const progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
                        console.log(`Upload is ${progress}% done`);
                  },
                  (error)=>{
                        reject(error);
                  },
                  ()=>{
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                              resolve(downloadURL);
                        })
                  }
                  )
            })
      }

      const handleRemoveImage=(index)=>{
            setFormData({
                  ...formData,
                  imageUrls:formData.imageUrls.filter((_,i)=> i!==index),
            })
      }

      const handleChange=(e)=>{
            if(e.target.id === 'sale' || e.target.id === 'rent'){
                  setFormData({
                        ...formData,
                         type:e.target.id
                  })
            }

            if ( e.target.id === 'parking' || e.target.id === 'furnished' ||
                  e.target.id === 'offer') {
                  setFormData({
                    ...formData,
                    [e.target.id]: e.target.checked,
                  });
                }
            
                if (e.target.type === 'number' ||e.target.type === 'text' ||
                  e.target.type === 'textarea') {
                  setFormData({
                    ...formData,
                    [e.target.id]: e.target.value,
                  });
            }    
      }

      const handleSubmit = async (e) => {
            e.preventDefault();
            try {
              if (formData.imageUrls.length < 1)
                return setError('You must upload at least one image');
              if (+formData.regularPrice < +formData.discountPrice)
                return setError('Discount price must be lower than regular price');
              setLoading(true);
              setError(false);
              const res = await fetch('/api/listing/create', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  ...formData,
                  userRef: currentUser._id,
                  //useRef is giving because to check which user is to crate the listing and submit the llisting page without  giving reference to the user the form is not submitted
                }),
              });
              
              //In this data by default mongodb id comes in that data
              const data = await res.json();
              console.log(data);
              setLoading(false);
              if (data.success === false) {
                setError(data.message);
              }
              
              navigate(`/listing/${data._id}`);
            } catch (error) {
              setError(error.message);
              setLoading(false);
            }
          };

  return (
      
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className="text-3xl font-semibold text-center my-7">Create a Listing</h1>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4" >
            <div className="flex flex-col gap-4 flex-1">
                  <input type="text" placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='10'
                  required onChange={handleChange} value={formData.name}/>
                  <textarea type='text' placeholder='Description' className='border p-3 rounded-lg' id='description' required onChange={handleChange} value={formData.description}/>
                  <input type='text' placeholder='Address' className='border p-3 rounded-lg' id='address' required
                  onChange={handleChange} value={formData.address}/>
            
                  <div className="flex gap-6 flex-wrap">
                  <div className="flex gap-2">
                        <input type='checkbox' id='sale' className='w-5'
                        onChange={handleChange} checked={formData.type==='sale'}/>
                        <span>Sell</span>
                  </div>
                  <div className="flex gap-2">
                        <input type='checkbox' id='rent' className='w-5'
                        onChange={handleChange} checked={formData.type==='rent'}/>
                        <span>Rent</span>
                  </div>
                  <div className="flex gap-2">
                        <input type='checkbox' id='parking' className='w-5'
                        onChange={handleChange} checked={formData.parking}/>
                        <span>Parking Spot</span>
                  </div>
                  <div className="flex gap-2">
                        <input type='checkbox' id='furnished' className='w-5'onChange={handleChange} checked={formData.furnished}/>
                        <span>Furnished</span>
                  </div>
                  <div className="flex gap-2">
                        <input type='checkbox' id='offer' className='w-5'
                        onChange={handleChange} checked={formData.offer}/>
                        <span>Offer</span>
                  </div>
            </div>
            <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                        <input type='number' id='bedrooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formData.bedrooms}/>
                        <p>Beds</p>
                  </div>
                  <div className="flex items-center gap-2">
                        <input type='number' id='bathrooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formData.bathrooms}/>
                        <p>Baths</p>
                  </div>
                  <div className="flex items-center gap-2">
                        <input type='number' id='regularPrice' min='1' max='10000000' required className='p-3 border border-gray-300 rounded-lg'onChange={handleChange} value={formData.regularPrice}/>
                        <div className='flex flex-col items-center'>
                           <p>Regular Price</p>
                           {formData.type === 'rent' && (
                          <span className='text-xs'>($ / month)</span>
                          )}
                        </div>
                  </div>
                  {formData.offer && (
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='discountPrice'
                  min='0'
                  max='10000000'
                  required
                  className='p-3 border border-gray-300 rounded-lg'
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className='flex flex-col items-center'>
                  <p>Discounted price</p>

                  {formData.type === 'rent' && (
                    <span className='text-xs'>($ / month)</span>
                  )}
                </div>
              </div>
            )}
               </div>
            </div>

           <div className='flex flex-col gap-4 flex-1'>
                <p className='font-semibold'>Images:
                  <span className='font-normal text-gray-700 ml-2'>The first image will be cover (max 6)</span>
                </p>

                <div className="flex gap-4">
                  <input onChange={(e)=>setFiles(e.target.files)} className='p-3 border border-gray-300 rounded w-full' type='file' id='images' accept='image/*' multiple/>
                  {/* give type of upload button to button because we do not submit the form only upload images if we don't give button it default takes it submit */}
                  <button type='button'
                  className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80' onClick={handleImageSubmit}>
                        {uploading? "Uploading...":"Upload"}
                  </button>
                </div>
                <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>


                {
                  formData.imageUrls.length && formData.imageUrls.map((urls,index)=>(
                     <div key={urls} className="flex justify-between p-3 border items-center border-gray-300">
                        <img src={urls} alt='listing-profile' className='w-20 h-20 object-contain rounded-lg'/>
                        <button type='button' onClick={()=>handleRemoveImage(index)} className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75">Delete</button>
                     </div>
                  ))
                }
                <button disabled={loading || uploading} className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                {loading ? 'Creating...' : 'Create listing'}
                </button>
                {error && <p className='text-red-700 text-sm'>{error}</p>}
            </div>            
        </form>
    </main>
  )
}
