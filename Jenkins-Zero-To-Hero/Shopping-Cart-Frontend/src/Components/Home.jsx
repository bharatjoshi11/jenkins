import React, { Fragment, useEffect, useState } from 'react';
import Category from './Products/Category';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid'; // Importing uuid library for generating correlation ID
import { getToCart, logoutUserShopping } from '../redux/Slices/shoppingSlice';
import { logoutUser } from '../redux/Slices/authSlice';
import { logoutUserDetails } from '../redux/Slices/userSlice';

const Home = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [fetchedData1, setFetchedData1] = useState(null);
    const [fetchedData2, setFetchedData2] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeButton, setActiveButton] = useState(null);

    useEffect(() => {
        dispatch(getToCart({ userId: user.userId }));
        if (!(user.userLoaded) && !(auth.userLoaded)) {
            dispatch(logoutUser());
            dispatch(logoutUserDetails());
            dispatch(logoutUserShopping());
            localStorage.clear();
            navigate('/');
        }
    }, [user.userLoaded]);

    const handleButtonClick = async (url, buttonIndex) => {
        setLoading(true);
        setError(null);
        if (activeButton === buttonIndex) {
            // If the same button is clicked again, reset the active button
            setActiveButton(null);
            setLoading(false);
            return;
        }
        setActiveButton(buttonIndex);
        const correlationId = uuidv4();  // Generating correlation ID
        newrelic.setCustomAttribute("correlationId", correlationId); // Setting correlation ID in New Relic
        console.log(`Correlation ID for request: ${correlationId}`);
        
        try {
            const response = await fetch(url, {
                headers: {
                    'x-Correlation-ID': correlationId, // Custom header for correlation ID
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            if (buttonIndex === 1) {
                setFetchedData1(data);
                setFetchedData2(null); // Reset the other fetched data
            } else {
                setFetchedData2(data);
                setFetchedData1(null); // Reset the other fetched data
            }
            console.log('Fetched data:', data); // Log the fetched data
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    };

    return (
        <Fragment>
            <div>
                <div className='flex justify-between items-center bg-[#4f49ff] px-10 py-16 max-sm:block'>
                    <div className='pl-8 text-white'>
                        <h1 className='text-6xl font-semibold my-8 max-sm:text-3xl max-md:text-4xl'>NEW ARRIVALS</h1>
                        <p className='text-4xl my-8 max-sm:text-2xl max-md:text-2xl'>Explore the latest collection now</p>
                        <button
                            className='bg-white text-black px-4 py-2 rounded-md hover:bg-[#000000] hover:text-white'
                            onClick={() => {
                                setActiveButton(null); // Reset active button
                                navigate("/category");
                            }}
                            disabled={activeButton !== null}
                        >
                            Shop Now
                        </button>
                        <button
                            className={`bg-white text-black px-4 py-2 rounded-md hover:bg-[#000000] hover:text-white ml-4 ${activeButton === 1 ? 'active' : ''}`}
                            onClick={() => handleButtonClick('https://fa-asda-poc-dotnet-linux-1.azurewebsites.net/api/Function1', 1)}
                        >
                            Function 
                        </button>
                        <button
                            className={`bg-white text-black px-4 py-2 rounded-md hover:bg-[#000000] hover:text-white ml-4 ${activeButton === 2 ? 'active' : ''}`}
                            onClick={() => handleButtonClick('http://48.217.114.14/FA-asda-poc-dotnet-linux-1/Function1', 2)}
                        >
                            APIM
                        </button>
                    </div>
                    <div>
                        <img src='https://www.freepnglogos.com/uploads/shopping-bag-png/shopping-bag-shopping-bags-transparent-png-svg-vector-8.png' alt='hero' className='object-contain max-sm: h-72 w-72 m-auto' />
                    </div>
                </div>

                {loading && <div>Loading...</div>}
                {error && <div className="error">{error}</div>}
                {activeButton === 1 && fetchedData1 && (
                    <div className="api-data">
                        <h2>Fetched Data 1:</h2>
                        <table>
                            <tbody>
                                <tr>
                                    <td>ID:</td>
                                    <td>{fetchedData1.id}</td>
                                </tr>
                                <tr>
                                    <td>Name:</td>
                                    <td>{fetchedData1.name}</td>
                                </tr>
                                <tr>
                                    <td>Value:</td>
                                    <td>{fetchedData1.value}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                {activeButton === 2 && fetchedData2 && (
                    <div className="api-data">
                        <h2>Fetched Data 2:</h2>
                        <table>
                            <tbody>
                                <tr>
                                    <td>ID:</td>
                                    <td>{fetchedData2.id}</td>
                                </tr>
                                <tr>
                                    <td>Name:</td>
                                    <td>{fetchedData2.name}</td>
                                </tr>
                                <tr>
                                    <td>Value:</td>
                                    <td>{fetchedData2.value}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                <Category />
            </div>
        </Fragment>
    );
}

export default Home;
