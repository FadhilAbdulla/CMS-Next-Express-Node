// src/components/CustomerTable.js
import React from 'react';
import './CustomerTable.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

const CustomerTable = ({ customers,deletefunctionInvoked,EditFunction }) =>{

  const handleDelete = async(id) => {
    const response = await deletefunctionInvoked (id)
  };

  const handleEdit =async (data) => {
    const response = await EditFunction (data)
  };
  return (
  <table className="customer-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Address</th>
        <th>Company</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {customers.map((customer,index) => (
        <tr key={customer._id}>
          <td>{index+1}</td>
          <td>{customer.name}</td>
          <td>{customer.email}</td>
          <td>{customer.phone}</td>
          <td>{customer.address}</td>
          <td>{customer.company}</td>
          <td><div className='ActionButtonConatiner'><button className=" actionButton" onClick={()=>handleDelete(customer._id)}>
              <FaTrash />
            </button>
            <button className="actionButton" onClick={()=>handleEdit(customer)}>
              <FaEdit />
            </button></div></td>
        </tr>
      ))}
    </tbody>
  </table>
)};

export default CustomerTable;
