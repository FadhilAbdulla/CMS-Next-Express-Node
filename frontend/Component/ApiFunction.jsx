
import { Customers, Login} from "./Api";
import axios from "axios";
import { toast } from 'react-toastify';

const ErrorResponse = { "status": 500, "error": "Something Went Wrong" }


export const FetchCustomerList = async () => {
    try {
        const response = await axios.get(Customers);
        return { "status": 200, "data": response.data }
    } catch (error) {
        toast.error('Something Went Wrong');
        return ErrorResponse
    }
}

export const AddNewCustomer = async (data) => {
    try {
        const response = await axios.post(Customers,data);
        toast.success('Customer Added successfully!');
        return { "status": 200, "data": response.data }
    } catch (error) {
        toast.error('Something Went Wrong');
        return ErrorResponse
    }
}
export const DeleteCustomerData = async (id) => {
    try {
        const response = await axios.delete(`${Customers}/${id}`);
        toast.success('Customer Deleted successfully!');
        return { "status": 200, "data": response.data }
    } catch (error) {
        toast.error('Something Went Wrong');
        return ErrorResponse
    }
}

export const updateCustomer = async (id, updatedData) => {
    try {
      const response = await axios.put(`${Customers}/${id}`, updatedData);
      toast.success('Customer Updated successfully!');
      return { "status": 200, "data": response.data }
    } catch (error) {
      toast.error('Something Went Wrong');
      return ErrorResponse
    }
  };

  export const UserLogin = async (email,password) => {
    const request = {"email" : email ,"password" : password }
    try {
        const response = await axios.post(Login,request);
        localStorage.setItem('authToken', response["token"]);
        return { "status": 200, "data": response.data }
    } catch (error) {
        if (error.response.status == 401){toast.error('Invalid Credentials');}
        if (error.response.status == 422){toast.error('Enter Correct Format');} 
        if (error.response.status == 500){toast.error('Something Went Wrong');}        
        return ErrorResponse
    }
}
