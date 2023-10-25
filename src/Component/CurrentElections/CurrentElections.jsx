import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import Elections from '../Elections/Elections';

const CurrentElections = () => {
    const [elections, setElections] = useState([]);
    useEffect(() => {
     fetch('/elections.json').then(res => res.json()).then( data => setElections(data))
    }, []);
    console.log(elections);
    return (
        <div className='min-h-screen w-[90%] mx-auto'>
            <h1 className='pt-20 text-5xl font-bold'>Ongoing elections</h1>
            <div className='grid grid-cols-3 gap-10'>
            {elections.map(election => <Elections election={election}></Elections>)}
            </div>
        </div>
    );
};

export default CurrentElections;