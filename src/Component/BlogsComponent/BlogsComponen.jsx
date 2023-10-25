import React, { useEffect, useState } from 'react';
import Spinner from '../Spinner/Spinner';
import axios from 'axios';
import BlogsCard from '../BlogsCard/BlogsCard';
import { Link } from 'react-router-dom';
const ref = React.createRef();
const component = true;
const BlogsComponen = () => {
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
        <div>



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
                            {blogData.map((e, i) => {
                                if (i < 3) return <BlogsCard data={e} component={component} />
                            }
                            )}
                        </div>
                        <div className='text-center mt-16'>
                        <Link to='/blogs' className='text-lg md:text-xl transition-all duration-300 ease-in-out border-[3px] border-[#59c6Bc] text-[#59C6BC] hover:bg-[#59C6BC] hover:text-white px-7 mx-auto w-fit py-2 rounded-lg'>View All</Link>
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

        </div>
    );
};

export default BlogsComponen;