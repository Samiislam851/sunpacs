import React, { useEffect, useState } from 'react';
import Spinner from '../Spinner/Spinner';
import axios from 'axios';
import InverterCard from '../InverterCard/InverterCard';

const RmcableAndBatteries = () => {
    const [loading, setLoading] = useState(true)
    const [AccountingMeterData, setAccountingMeterData] = useState();
    const component = true;
    console.log(AccountingMeterData);

    useEffect(() => {

        axios.get("/rmcable-and-batteries/all")
            .then(response => {
                setAccountingMeterData(response.data.slice(0, 4))
                console.log(response.data);
                setLoading(false)
            }).catch(err => {
                console.log(err)
                setLoading(false)
            })


    }, []);
    return (
        <div>



            <>


                <div className="max-w-[1600px] mx-auto px-5  md:px-16 relative  mb-40 ">


                    {loading ? <>
                        <Spinner />
                    </> : <>
                        <div className="">
                            <div className="   pb-10 pt-32 ">
                                <h2 className='md:text-5xl text-4xl text-gray-700 text-center font-semibold pb-8'>Rm Cable and Batteries </h2>
                                <p className=' text-lg text-gray-400 text-center md:w-[70%] w-[95%] mx-auto pb-20'>
                                    Explore our remarkable collection of premium-quality RMCable and batteries, designed to provide reliable power solutions for your home or business. Our top-quality RMCable and batteries are renowned for their efficiency and durability, making them the preferred choice for individuals and organizations seeking dependable energy solutions. Whether it's powering your devices or maintaining electrical connectivity, our products offer excellence you can count on.</p>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-4 gap-2'>
                            {AccountingMeterData?.map((e, i) => {
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

export default RmcableAndBatteries;