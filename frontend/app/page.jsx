'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { isAuthenticated } from '../utils/auth';

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated()) {
      router.replace('/cms');
    } else {
      router.replace('/login');
    }
  }, []);

  return null;
};

export default Home;
