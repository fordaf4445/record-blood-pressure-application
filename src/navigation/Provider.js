import React, { useState, useEffect, useContext } from 'react';
import { AuthProvider } from '../auth/AuthProvider';
import Routes from './Routes';

export default function Provider() {
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    );
}
