import React, { useEffect, useState, useContext } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const UserSyncHandler = () => {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const [synced, setSynced] = useState(false);
  const { backendUrl, loadUserCredit } = useContext(AppContext);

  useEffect(() => {
    const saveUser = async () => {
      if (!isLoaded || !isSignedIn || synced) {
        return;
      }

      try {
        const token = await getToken();

        const userData = {
          clerkId: user.id,
          email: user.primaryEmailAddress.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
          photoUrl: user.imageUrl,
        };

        await axios.post(backendUrl + '/users', userData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        //   if (response.status === true) {
        //     toast.success("User Successfully Created");
        //   } else {
        //       toast.error("Failed to Create User Account");
        //   }
        setSynced(true); //prevent re-posting
        await loadUserCredit(); // update user credit after successful sync
      } catch (error) {
        console.log('User sync failed', error);
        toast.error('Unable to Create Account. Please try again');
      }
    };

    saveUser();
  }, [isLoaded, isSignedIn, getToken, user, synced, backendUrl]);

  return null;
};

export default UserSyncHandler;
