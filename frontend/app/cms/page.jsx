'use client'

import * as React from 'react';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
// import LinearProgress from '@mui/material/LinearProgress';
import styles from './PageHeader.module.css';
import { FaCog, FaSignOutAlt, FaPlus, FaList } from 'react-icons/fa';
import CustomerTable from '@/Component/CustomerTable'
import { FetchCustomerList, AddNewCustomer, DeleteCustomerData, updateCustomer } from '@/Component/ApiFunction'
import CustomerModal from '@/Component/CustomerModal'
import EditModal from '@/Component/EditModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthenticated } from '@/utils/auth';

function Home() {

  const [PostsData, setPostsData] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [EditData, setEditData] = useState({})

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await FetchCustomerList();
      if (response["status"] == 200) {
        setPostsData(response["data"])
      }
    } catch (error) { }
    setLoading(false)
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/login');
    }
    fetchData();
  }, [])


  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken');

    setIsSettingsOpen(false)
    router.push(`/login`, { scroll: false })
  }

  const handleAddNewBlog = () => {
    setIsSettingsOpen(false)
    setIsOpen(true)
  }

  const AddedNewCustomer = async (requestData) => {
    const response = await AddNewCustomer(requestData);
    if (response["status"] == 200) {fetchData()}
    return
  }

  const DeleteFunction = async (id) => {
    const response = await DeleteCustomerData(id)
    if (response["status"] == 200) {fetchData()}
  }

  const EditFunctionInvoked = (data) => { setEditData(data) }

  const setIsEditCloseModal = () => { setEditData({}) }

  const EditFunction = async (id, UpdateRequestData) => {
    const response = await updateCustomer(id, UpdateRequestData)
    if (response["status"] == 200) {
      fetchData()
    }
  }

  return isAuthenticated() ? (
    <div>

      <div className={styles.header}>
        <h1 className={styles.title}>Customer Management System</h1>
        <div className={styles.actions}>
          {/* <input type="text" className={styles.searchInput} placeholder="Search..." />
          <button className={styles.searchButton}>Search</button> */}
          <div className={styles.settings}>
            <button className={`${styles.settingsButton} ${isSettingsOpen ? styles.open : ''}`} onClick={toggleSettings}>
              <FaCog className={styles.settingsIcon} />
            </button>
            {isSettingsOpen && (
              <div className={styles.settingsOptions}>
                <button className={styles.optionButton} onClick={handleLogout}>
                  <FaSignOutAlt className={styles.optionIcon} /> Logout
                </button>
                <button className={styles.optionButton} onClick={handleAddNewBlog}>
                  <FaPlus className={styles.optionIcon} /> New Customer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.TableContainer}>
        <CustomerTable customers={PostsData} deletefunctionInvoked={DeleteFunction} EditFunction={EditFunctionInvoked} />
      </div>
      <ToastContainer />
      <EditModal isOpen={EditData && EditData._id ? true : false} setIsOpen={setIsEditCloseModal} InvokeFunction={EditFunction} FData={EditData} />
      <CustomerModal isOpen={isOpen} setIsOpen={setIsOpen} InvokeFunction={AddedNewCustomer} />
    </div>
  ) : null;
}

export default Home;
