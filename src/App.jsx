import React, { useRef, useState } from 'react'
import { OPENAI_API_KEY } from '../config.js'

const App = () => {

  const [image_url, setImage_url] = useState('/');
  let inputRef = useRef(null);

  const imageGenerator = async () => {
    if(inputRef.current.value===''){
      alert('Please enter a description')
      return;
    }
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        prompt: `${inputRef.current.value}`,
        n: 1,
        size: '1024x1024',
        model: "dall-e-3" 
      })
    });
    const data = await response.json();
    console.log(data);
    setImage_url(data.data[0].url)
  }

  return (
    <div  className=''>
        <div className='flex overflow-hidden box-border flex-col w-full min-h-screen justify-center bg-gradient-to-b from-black to-purple-900 '>
        <h1 className='text-5xl mx-auto text-white'>AI Image <span className='text-fuchsia-500'>generator</span></h1>
        
        <div className="aspect-square rounded w-1/3 top-1/4 mx-auto m-10 bg-white">
          <img src={image_url==='/'?'':image_url} alt="" className='object-cover' />
        </div>
        
        <div className="relative w-3/5 h-16 mt-15 bg-white mx-auto rounded-full flex flex-between  pl-10">
          <input type="text" ref={inputRef} className='w-full bg-transparent outline-none border-none' placeholder='Enter your description' />
          <button onClick={()=>{imageGenerator()}} className='bg-fuchsia-500 rounded-full text-white w-32 h-full absolute right-0'>Generate</button>.
        </div>
        </div>
    </div>
  )
}

export default App
