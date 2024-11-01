// src/components/AuthStatus.tsx
"use client"; // เพิ่มบรรทัดนี้ที่ด้านบนสุดของไฟล์

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
