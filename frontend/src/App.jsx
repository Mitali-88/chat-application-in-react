import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SettingsPage
  from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import { axiosInstance } from './lib/axios'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from "react";
import {Loader} from "lucide-react"
import {Toaster} from "react-hot-toast";
import { useThemeStore } from './store/useThemeStore'


function App() {

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  const {theme}=useThemeStore()
  useEffect(
    () => {
      checkAuth()
    }, [checkAuth]
  )

  console.log({ authUser })

  if (isCheckingAuth && !authUser) 
    return (
    <div className='flex items-center justify-content h-screen'>
    <Loader className="size-10 animate-spin" />
    </div>
    )
  


  return (

    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />}></Route>
        <Route path="/signup" element={ !authUser ? <SignUpPage /> : <Navigate to="/" />}></Route>
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />}></Route>
        <Route path="/settings" element={ <SettingsPage />  }></Route>
        <Route path="/profile" element={ authUser ? <ProfilePage /> :<Navigate to="/login" /> }></Route>
      </Routes>
      <Toaster ></Toaster>
    </div>


  )
}

export default App
