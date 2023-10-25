import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Spinner from '../../Component/Spinner/Spinner';
import axios from 'axios';
import BlogsCard from '../../Component/BlogsCard/BlogsCard';
// import BlogCard from '../../Component/BlogCard/BlogCard';




const ref = React.createRef();


const BlogPage = ({ setTitle }) => {


  const component = false;
  const [loading, setLoading] = useState(true)
  const [blogData, setBlogData] = useState();
  console.log(blogData);

  useEffect(() => {
    if (loading) {
      axios.get("/blog")
        .then(response => {
          setBlogData(response.data)
          console.log('response', response.data);
          setLoading(false)
        }).catch(err => console.log(err))

    }



  }, []);
  return (
    <>


      <div ref={ref} className="max-w-[1600px] mx-auto px-5  md:px-12 relative  mb-40 ">


        {loading ? <>
          <Spinner />
        </> : <>
          <div className="">
            <div className="   pb-20 pt-32 ">
              <h2 className='md:text-6xl text-4xl text-gray-700 text-center font-semibold pb-8'>Our Featured Blogs </h2>
              <p className='md:text-xl text-lg text-gray-400 text-center md:w-[80%] w-[95%] mx-auto pb-20'>Explore the harmonious world of music through our featured blogs. Dive into the vibrant tapestry of musical genres, techniques, and inspiration that our music school has to offer.</p>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
            {blogData.map(e => <BlogsCard data={e} component={component} />)}
          </div>

        </>}

        {/* <Pdf targetRef={ref} filename="code-example.pdf">
        {({ toPdf }) => 
        
        <div className='flex justify-center items-center'>

<button className='px-6 py-3 rounded-lg bg-green-700 text-white font-semibold' onClick={toPdf}>Generate Pdf</button>
        </div>

       
        
        
        }
      </Pdf> */}
      </div>

    </>


  );
}

export default BlogPage;
