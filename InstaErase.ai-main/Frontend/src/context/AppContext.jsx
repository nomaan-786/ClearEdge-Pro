import { useAuth, useClerk, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { createContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [credit, setCredit] = useState(false);
  const { getToken } = useAuth();
  const [image, setImage] = useState(false);
  const [resultImage, setResultImage] = useState(false);
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();

  const removeBg = async (selectedImage) => {
    try {
      if (!isSignedIn) {
        return openSignIn();
      }

      setImage(selectedImage);
      setResultImage(false);
      //navigate to the result image
      navigate('/result');

      const token = await getToken();
      const formData = new FormData();
      selectedImage && formData.append('file', selectedImage);

      const { data: base64Image } = await axios.post(
        `${backendUrl}/images/remove-background`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResultImage(`data:image/png;base64,${base64Image}`);
      setCredit((credit) => credit - 1);
    } catch (error) {
      console.log(error);
      toast.error('Error while removing background image.');
    }
  };

  const loadUserCredit = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(`${backendUrl}/users/credits`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setCredit(response.data.data.credits);
      } else {
        toast.error(response.data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to load user credits');
    }
  };

  const contextValue = {
    backendUrl,
    credit,
    setCredit,
    loadUserCredit,
    image,
    setImage,
    resultImage,
    setResultImage,
    removeBg,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
