import { toast } from 'react-toastify';

export const validateCustomerData = (name,email,phone,address,company) => {
    let Check = true
    if (!name) {toast.error("Name is required");Check=false}
    if (!email) {toast.error("Email is required");Check=false}
    else if (!/\S+@\S+\.\S+/.test(email)) {toast.error("Email is invalid");Check=false}
    if (!phone) {toast.error("Phone is required");Check=false}
    if (!address) {toast.error("Address is required");Check=false}
    if (!company){ toast.error("Company is required");Check=false}
    return Check;
  };