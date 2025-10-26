"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-context"
import { LoginForm } from "@/components/LoginForm" 
import  RegisterForm  from "@/components/RegisterForm" 
export default function HomePage() {
  const [isLogin, setIsLogin] = useState(true)
  const { isAuthenticated } = useAuth()
  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/dashboard"
    }
  }, [isAuthenticated])

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#B6B9F2] via-[#F2B872] to-[#F28907] flex items-center justify-center">
        <div className="text-white text-lg">Redirigiendo al dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#B6B9F2] via-[#F2B872] to-[#F28907] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {isLogin ? (
          <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  )
}