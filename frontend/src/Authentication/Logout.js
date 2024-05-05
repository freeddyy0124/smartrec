import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../Contexts/authContextHelper';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const {logout } = useContext(AuthContext); // Extract signup function from context
    const navigate = useNavigate();
    const onSubmit = async () => {
        try {
            // Display a toast for the pending signup process
            await toast.promise(
                logout(), // Directly pass the signup promise to toast.promise
                {
                    pending: 'Signing out...',
                    success: 'Signed out! Redirecting...',
                    error: 'Error signing out'
                }
            );

            // Navigate after the toast for success is shown
            setTimeout(() => { navigate("/"); navigate(0); }, 1500); // Consider increasing timeout to let user read the message
        } catch (error) {
            // Handle errors not caught by toast.promise
            console.error("Signout error:", error);
            toast.error("An unexpected error occurred during signup.");
        }
    };

    useEffect(() => {
        onSubmit();
    }, []);
  return (
    null
  )
}

export default Logout