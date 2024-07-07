// src/components/CustomerModal.js
import React, { useState,useEffect } from 'react';
import styles from './EditModal.module.css';
import { validateCustomerData } from './Validation';

const EditModal = ({ isOpen, setIsOpen,InvokeFunction ,FData}) => {
  const [name, setName] = useState(FData.name || "");
  const [email, setEmail] = useState(FData.email ||  "");
  const [phone, setPhone] = useState(FData.phone ||  "");
  const [address, setAddress] = useState(FData.address ||  "");
  const [company, setCompany] = useState( FData.company || "");
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    setName(FData.name);setEmail(FData.email);setPhone(FData.phone)
    setAddress(FData.address);setCompany(FData.company)
  },[FData])

  const handleSubmit = async() => {
    setLoading(true)
    const validationCheck = validateCustomerData(name,email,phone,address,company)
    if (!validationCheck) {return}

    let Newdata = {}
    if (FData.name !== name){Newdata["name"] = name}
    if (FData.email !== email){Newdata["email"] = email}
    if (FData.phone !== phone){Newdata["phone"] = phone}
    if (FData.address !== address){Newdata["address"] = address}
    if (FData.company !== company){Newdata["company"] = company}

    const response = await InvokeFunction(FData._id,Newdata)
    setName(""),setPhone(""),setAddress(""),setCompany(""),setEmail("")
    setIsOpen();
  };

  return (
    <div>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Edit Customer</h2>
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
            <button className={styles.closeButton} onClick={setIsOpen}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditModal;
