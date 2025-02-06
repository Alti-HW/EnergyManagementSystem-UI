import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { userActions } from '../../../actions/users';
import { useParams } from 'react-router';

interface UserData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
}

const UserSettings: React.FC = () => {
    const { userid } = useParams<{ userid: string }>();  // Ensure userid is a string
    const [userData, setUserData] = useState<UserData>({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
    });
    const [responseMessage, setResponseMessage] = useState<string>('');

    // Fetch user data from backend (replace with your actual API URL)
    useEffect(() => {
        if (userid) {
            userActions.getUserDetails(userid).then((res) => {
                setUserData(res);
            }).catch((error) => {
                console.error('Error fetching user details:', error);
            });
        }
    }, [userid]);  // Depend on `userid` to refetch when it changes

    // Handle form submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        userActions.updateUser(userData)
            .then((response) => {
                setResponseMessage('User Updation successfully!');
            })
            .catch((error) => {
                setResponseMessage('Error on Updating User!');
            });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate>
            {responseMessage && <Alert severity={responseMessage.includes('Error') ? 'error' : 'success'} onClose={() => { setResponseMessage("") }}>{responseMessage}</Alert>}
            {/* Editable fields: First Name and Last Name */}
            <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userData.firstName}
                onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
            />
            <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userData.lastName}
                onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
            />

            {/* Read-only fields: Username and Email */}
            <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userData.username}
                disabled  // Disabling the username field (read-only)
            />
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userData.email}
                disabled  // Disabling the email field (read-only)
            />

            <Button type="submit" variant="contained" color="primary">
                Save Changes
            </Button>
        </Box>
    );
};

export default UserSettings;
