import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { Alert, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { userActions } from '../../../actions/users';

// Define types for form fields
interface IUserForm {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
}

const AddUser: React.FC = () => {
    // State for form data
    const [formData, setFormData] = useState<IUserForm>({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
    });

    // State for error messages
    const [errors, setErrors] = useState<any>({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
    });
    const navigate = useNavigate();

    // State for API response
    const [responseMessage, setResponseMessage] = useState<string>('');

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Validate form fields
    const validateForm = (): boolean => {
        const tempErrors = {
            firstName: formData.firstName ? '' : 'First Name is required',
            lastName: formData.lastName ? '' : 'Last Name is required',
            username: formData.username ? '' : 'Username is required',
            email: formData.email
                ? /\S+@\S+\.\S+/.test(formData.email)
                    ? ''
                    : 'Invalid email address'
                : 'Email is required',
        };

        setErrors(tempErrors);
        return Object.values(tempErrors).every((error) => error === '');
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                let userData = {
                    ...formData,
                    "emailVerified": false,
                    "enabled": true,
                    "totp": false,
                    "disableableCredentialTypes": [],
                    "requiredActions": [],
                    "notBefore": 0
                }
                // Make API call to create user (mocked here using axios)
                const response = await userActions.createUser(userData);
                if (response) {
                    setResponseMessage('User created successfully!');
                    // Clear form data on success
                    setFormData({
                        firstName: '',
                        lastName: '',
                        username: '',
                        email: '',
                    });
                }

            } catch (error) {
                setResponseMessage('Error creating user. Please try again.');
            }
        } else {
            setResponseMessage('Please fill in all required fields correctly.');
        }
    };

    return (
        <Paper sx={{ maxWidth: '500px', margin: 'auto', padding: 2 }}>
            <h2>Create User</h2>

            {/* Display success or error message */}
            {responseMessage && <Alert severity={responseMessage.includes('Error') ? 'error' : 'success'}>{responseMessage}</Alert>}

            <Stack spacing={2}>
                <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    variant="outlined"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                />
                <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    variant="outlined"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                />
                <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    variant="outlined"
                    value={formData.username}
                    onChange={handleChange}
                    error={!!errors.username}
                    helperText={errors.username}
                />
                <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    variant="outlined"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                />

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSubmit}
                >
                    Create User
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={() => navigate(-1)}
                >
                    Cancel
                </Button>
            </Stack>
        </Paper>
    );
};

export default AddUser;
