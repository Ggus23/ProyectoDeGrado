"use client"

import type React from "react"

import  {useAuthContext}  from "../contexts/SessionAuthProvider"
import { useRouter } from "next/router"
import { useEffect } from "react"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return <div>Cargando...</div>
  }

  return user ? <>{children}</> : null
}

