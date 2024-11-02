// src/components/AuthStatus.tsx
// "use client";

import React from 'react';
import useAuthStore from '@services/store/authStore';

const AuthStatus: React.FC = () => {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
};

export default AuthStatus;
