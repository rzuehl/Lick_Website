/* CustomerView.js
 * React component rendering screen for customers/employees/managers to login
 * Uses the following external custom comopnents:
 * - General Button
 * - HamburgerButton
 * - ScreenTitle
 * - GeneralInput
*/

import React from 'react';
import { Link } from 'react-router-dom';
import GeneralButton from '../components/GeneralButton';
import GeneralInput from '../components/GeneralInput';
import OptionsDropdown from '../components/OptionsDropdown';
import ScreenTitle from '../components/ScreenTitle';
import WeatherIcon from '../components/WeatherIcon';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { NameContext } from '../contexts/NameContext';
import axios from 'axios';
import api from '../api/posts';

/**
 * Client ID from GitHub OAuth app
 * Redirect URI set to /login
 */
const YOUR_CLIENT_ID = "a22df87cef72062af190";
const YOUR_REDIRECT_URI = "https://project-3-907-03.vercel.app/login";

function LoginView() {
    /**
     * State variables
     * username: GitHub username
     * name: GitHub name
     * accessToken: GitHub access token
     * userType: customer, employee, or manager
     */
    const [username, setUsername] = useState(null);
    const { updateName } = useContext(NameContext);
    const { name } = useContext(NameContext);
    const [accessToken, setAccessToken] = useState(null);
    const [userType, setUserType] = useState(null);

    /**
     * Function to handle GitHub login
     * If the user is not logged in, redirect them to GitHub's OAuth page
     * If the user is logged in, get their data from GitHub
     * If the user is logged in, but the access token is expired, redirect them to GitHub's OAuth page
     */
    const handleGithubLogin = async () => {
        // Get the code from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (!code) {
            // Redirect the user to GitHub's OAuth page
            window.location.href = `https://github.com/login/oauth/authorize?client_id=${YOUR_CLIENT_ID}&redirect_uri=${YOUR_REDIRECT_URI}`;
        } else {
            try {
                // Send the code to your backend
                const response = await axios.post('https://render-backend-xpg6.onrender.com/api/github/oauth', {
                    code: code,
                });

            // Get the access token from the response
            accessToken = response.data.accessToken;
            setAccessToken(accessToken);

            // Use the access token to get the user's data
            const userResponse = await axios.get('https://api.github.com/user', {
                headers: {
                    Authorization: `token ${accessToken}`,
                },
            });

            // Set the username and name in the state
            setUsername(userResponse.data.login);
            updateName(userResponse.data.name);
            } catch (error) {
                console.error(error);
            }
        }
    };

    // When user lands on the page, check if the URL contains a code
    useEffect(() => {
    handleGithubLogin();
    }, []);

    /**
     * Function to handle GitHub logout
     * Clear the username, name, and access token from the state
     * Remove the code from the URL
     * Send the user to the home page
     */
    const handleLogout = () => {
        // Clear the username, name, and access token from the state
        setUsername(null);
        updateName(null);
        setAccessToken(null);
      
        // Remove the code from the URL
        window.history.pushState({}, document.title, "/");

        // Send to home page
        // window.location.href = '/';
    };

    /**
     * Function to handle redirecting the user to the correct page based on their user type
     * @param {*} name 
     * @returns response
     */
    const handleRedirect = async (name) => {
        const response = await api.post('/employeeManagerStatus', [name])
        console.log(response)

        if (response.data && response.data[0] && response.data[0].position === 'm') {
            setUserType('manager');
        } else if (response.data && response.data[0] && response.data[0].position === 'e') {
            setUserType('employee');
        } else {
            setUserType('customer');
        }

        return response;
    }

    handleRedirect(name);

    return (
        <div>
            <div className="login-header">
            <WeatherIcon />
                <GeneralButton content="Login" sidePadding={20} route="/login" />
                <ScreenTitle />
                <GeneralButton content="Order" sidePadding={20} route="/menu" />
                <OptionsDropdown sidePadding={20}/>
            </div>

            <div className="login-main">
                <div className="log-text">
                    <h1>Sign In</h1>
                </div>
                <div className="log-body">
                    <div className="log-body-content">
                        {username ? (
                            <GeneralButton content="Logout" sidePadding={60} onClick={handleLogout}/>
                            ) : (
                            <GeneralButton content="Login with GitHub" sidePadding={60} onClick={handleGithubLogin}/>
                            )}
                            
                        {username && <p style={{ color: 'red', textAlign: 'center' }}>Username: {username}</p>}
                        {name && <p style={{ color: 'red', textAlign: 'center'  }}>Name: {name}</p>}

                        {userType === 'manager' ? (
                            <GeneralButton content="Manager View" sidePadding={60} route='/manager'/>
                        ) : userType === 'employee' ? (
                            <GeneralButton content="Cashier View" sidePadding={60} route='/cashier'/>
                        ) : (
                            <GeneralButton content="Start Order" sidePadding={60} route='/menu'/>
                        )}
                        {userType === 'manager' ? (
                            <GeneralButton content="Cashier View" sidePadding={60} route='/cashier'/>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginView;