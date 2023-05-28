import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from "react-redux";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";

const App = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users/');
                const data = await response.json();
                const contacts = data.map(contact => ({
                    id: contact.id,
                    name: contact.name,
                    number: contact.phone,
                    email: contact.email
                }));
                dispatch({ type: 'FETCH_CONTACTS', payload: contacts });
            } catch (error) {
                console.log('Error fetching contacts:', error);
            }
        };

        fetchData();
    }, [dispatch]);

    return (
        <div className="App">
            <ToastContainer />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<AddContact />} />
                <Route path="/edit/:id" element={<EditContact />} />
            </Routes>
        </div>
    );
}

export default App;
