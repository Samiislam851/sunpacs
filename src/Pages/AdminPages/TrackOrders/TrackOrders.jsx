import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ManageProducts from '../MannageProducts/ManageProducts';
import AddAProduct from '../AddAProduct/AddAProduct';
import PendingOrders from '../PendingOrders/PendingOrders';
import PaidOrders from '../PaidOrders/PaidOrders';
import RequestedOrders from '../RequestedOrders/RequestedOrders';
import CanceledOrders from '../CanceledOrders/CanceledOrders';
import ProblematicOrders from '../../ProblematicOrders/ProblematicOrders';

const TrackOrders = () => {
    return (
        <div className='bg-white py-10 px-5 rounded-lg'>
            <Tabs defaultIndex={2}>
                <TabList >
                    <Tab >
                        <h2 className='text-gray-600 bg-transparent'>
                            Pending Orders
                        </h2>
                    </Tab>
                    <Tab >
                        <h2 className='text-gray-600 bg-transparent'>
                            Paid
                        </h2>
                    </Tab>
                    <Tab >
                        <h2 className='text-gray-600 bg-transparent'>
                            Requested
                        </h2>
                    </Tab>
                    <Tab >
                        <h2 className='text-gray-600 bg-transparent'>
                            Cancelled
                        </h2>
                    </Tab>
                    <Tab >
                        <h2 className='text-gray-600 bg-transparent'>
                          Submitted With Problem
                        </h2>
                    </Tab>

                </TabList>

                <TabPanel>
                    <PendingOrders />


                </TabPanel>
                <TabPanel>
                    <PaidOrders />
                </TabPanel>
                <TabPanel>
                    <RequestedOrders />
                </TabPanel>
                <TabPanel>
                    <CanceledOrders />
                </TabPanel>
                <TabPanel>
                    <ProblematicOrders/>
                </TabPanel>
            </Tabs>
        </div>
    );
}

export default TrackOrders;
