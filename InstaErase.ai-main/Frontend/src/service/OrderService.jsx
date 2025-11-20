import axios from "axios";

import toast from "react-hot-toast";



export const placeOrder = async ({ planId, getToken, onSuccess, backendUrl }) => {

    try {
        console.log("HI");
        const token = await getToken();
        const response = await axios.post(`${backendUrl}/orders?planId=${planId}`, 
            {}, {headers: {Authorization: `Bearer ${token}`}});
        console.log(response);
       if (response.data?.success) {
    initializePayment({
        order: response.data.data,  // <-- use `data` inside response
        getToken,
        onSuccess,
        backendUrl
    });
}
        console.log("Hello");
    } catch (error) {
        toast.error(error.message);
    }
    
};

const initializePayment = ({order, getToken, onSuccess, backendUrl}) => {

    const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Credit Payment",
        description: "Credit Payment",
        order_id: order.id,
        receipt: order.receipt,
        handler: async (paymentDetails) => {
            try {
                const token = await getToken();
                const response = await axios.post(`${backendUrl}/orders/verify`, paymentDetails, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                if (response.status === 200) {
                    toast.success("Credits added.");
                    onSuccess?.();
                }
            } catch (error) {
                toast.error(error.message);
            }
        },
    };
    console.log("Into payment")
    const rzp = new window.Razorpay(options);
    rzp.open();
    
};