import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useNavigation } from 'react-router-dom';

import Slider from '../../Layout/Slider/Slider';
import InverterComponent from '../../Component/InverterComponent/InverterComponent';
import SolarPanelComponent from '../../Component/SolarPanelComponent/SolarPanelComponent';
import AccountingMeter from '../../Component/AccountingMeter/AccountingMeter';
import RmcableAndBatteries from '../../Component/RmcableAndBatteries/RmcableAndBatteries';






const HomePage = ({ setTitle }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (loading) {
      setTitle("Homepage")
      setLoading(false)
    }


  }, []);



  return (


    <>
      <div className=''>
        <Slider />
        {/* <PopularClassesComponent /> */}
        <InverterComponent/>
       
        <SolarPanelComponent/>
       <AccountingMeter/>
       <RmcableAndBatteries/>
   
      </div>
    </>



  );
}

export default HomePage;
