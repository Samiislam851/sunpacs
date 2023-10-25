import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InverterCard from '../../Component/InverterCard/InverterCard';
import { AiOutlineSearch } from 'react-icons/ai';
import Spinner from '../../Component/Spinner/Spinner';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [searchTrue, setSearchTrue] = useState(false);
    const [searchTextInput, setSearchTextInput] = useState("");
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (loading) {
            axios.get('/products').then(res => {
                setProducts(res.data)

                setLoading(false);
            });
        }

    }, []);

    const [searchText, setSearchText] = useState('');

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearch = (event) => {
        event.preventDefault()

        console.log('Search text:', searchText);

        axios.get(`/search?searchTerm=${searchText}`).then(res => {
            setProducts(res.data);
            setSearchTrue(true);
            setSearchTextInput(searchText);
            event.target.reset();
        }
        )


    };








    return (


        <div className='min-h-[100vh]'>
            {loading? <>
            <Spinner/>
            </>:<>
            
            <div className='mt-16 mx-5'>
          
                {/* Search Bar */}
                <div className="relative mx-auto max-w-md">
                <form onSubmit={handleSearch} title="search products based on name, brand or category">
                        <input
                            type="text"
                            name='searchInput'
                            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                            placeholder="Search..."
                            value={searchText}
                            onChange={handleInputChange}
                        />
                        <button
                            className="absolute right-0 top-0 mt-2 mr-2 "
                            type='submit'
                        >
                            <AiOutlineSearch className='inline text-2xl text-gray-500 hover:text-blue-400 transition-all ease-in-out duration-500' />
                        </button>
                    </form>
                </div>
            </div>

            <div className='text-gray-400 md:w-[70%] px-5 text-center mx-auto py-3'> Explore our collection of top-tier electrical products, including solar panels, inverters, and more. Our premium solar panels capture the sun's energy efficiently, while our advanced inverters ensure optimal power conversion. Whether you're seeking sustainable energy solutions or reliable electrical components, we have you covered. Make the switch to cleaner, greener power </div>
            <div className='max-w-[1500px] mx-auto px-12 my-16'>

                {searchTextInput == "" ? <>

                </>
                    :
                    <>
                        {searchTrue && <div className='text-lg text-gray-500 py-5 md:ps-10'>Showing Search results for
                            <span className='font-semibold'> {searchTextInput}</span> </div>}
                    </>}



                <div className='grid md:grid-cols-4 grid-cols-1 gap-3 '>


                    {
                        products.map(data => <InverterCard data={data}></InverterCard>)
                    }
                </div>
            </div>
            </>}

           
        </div>
    );
}

export default AllProducts;
