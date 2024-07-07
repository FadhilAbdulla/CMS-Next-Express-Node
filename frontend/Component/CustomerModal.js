// src/components/CustomerModal.js
import React, { useState } from 'react';
import styles from './CustomerModal.module.css';
import { validateCustomerData } from './Validation';

const CustomerModal = ({ isOpen, setIsOpen,InvokeFunction}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [company, setCompany] = useState('');
  const [loading,setLoading] = useState(false)

  const handleSubmit = async() => {
    setLoading(true)
    const validationCheck = validateCustomerData(name,email,phone,address,company)
    if (!validationCheck) {return}
    const newCustomer = { name, email, phone, address, company };
    const response = await InvokeFunction(newCustomer)
    setName("");setEmail("");setPhone("");setAddress("");setCompany("")
    setIsOpen(false);
  };

  return (
    <div>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>New Customer</h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className={styles.input}
            />
            <button className={styles.submitButton} onClick={handleSubmit}>Submit</button>
            <button className={styles.closeButton} onClick={()=> setIsOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerModal;
