import React, { useContext, useEffect, useState } from 'react';
import Spinner from '../Spinner/Spinner';
import axios from 'axios';
import InverterCard from '../InverterCard/InverterCard';
import { AuthContext } from '../../Provider/AuthContextProvider';

const SolarPanelComponent = () => {
    const {productsForHome } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [inverterData, setInverterData] = useState();
    const component = true;
    console.log(inverterData);

    useEffect(() => {
     // this is commented because express requires a proper server but vercel is a serverless hosting platform



            // axios.get("/solar-panels/all")
            //     .then(response => {
            //         setInverterData(response.data.slice(0, 4))
            //         console.log(response.data);
            //         setLoading(false)
            //     }).catch(err => console.log(err))
                const inverters = productsForHome?.filter(e=> e.type=='solar panel')
                setInverterData(inverters)
                setLoading(false)
        


    }, [productsForHome]);
    return (
        <div>



            <>


                <div className="max-w-[1600px] mx-auto px-5  md:px-16 relative  mb-40 ">


                    {loading ? <>
                        <Spinner />
                    </> : <>
                        <div className="">
                            <div className="   pb-10 pt-32 ">
                                <h2 className='md:text-5xl text-4xl text-gray-700 text-center font-semibold pb-8'>Our Most Popular Solar Panels </h2>
                                <p className=' text-lg text-gray-400 text-center md:w-[70%] w-[95%] mx-auto pb-20'>Explore our exceptional collection of different standards fulfilled solar panels, designed to harness the sun's energy and transform it into clean, sustainable power for your home or business. Our top-quality solar panels are renowned for their efficiency and durability, making them the preferred choice for eco-conscious individuals and organizations seeking to embrace renewable energy solutions.</p>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-4 gap-2
                    '>
                            {inverterData.map((e, i) => {
                                if (i < 6) return <InverterCard data={e} component={component} />
                            }
                            )}
                        </div>

                    </>}


                </div>

            </>

        </div>
    );
};

export default SolarPanelComponent;