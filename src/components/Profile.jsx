
import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/api'; 

const Profile = ({ token }) => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile(token);
        setProfileData(response.data); 
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to fetch profile data');
      }
    };

    fetchProfile();
  }, [token]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!profileData) {
    return <div>Loading...</div>; 
  }

  
  const { username, email, first_name, last_name } = profileData;

  return (
    <div>
      <h2>User Profile</h2>
      <p><strong>Username:</strong> {username}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>First Name:</strong> {first_name}</p>
      <p><strong>Last Name:</strong> {last_name}</p>
    </div>
  );
};

export default Profile;
