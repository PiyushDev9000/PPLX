'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import Auth from '../components/Auth'
import { User } from '@supabase/supabase-js'  // Import the User type

export default function Home() {
  // Tell TypeScript that our state can hold either a User object or null
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          setUser(session?.user ?? null)
        }
    )
    return () => subscription.unsubscribe()
  }, [])

  return (
      <div>
        {!user ? (
            <Auth />
        ) : (
            <div>
              <p>Welcome, {user.email}</p>
              <button
                  onClick={() => supabase.auth.signOut()}
                  className="p-2 bg-red-500 text-white rounded"
              >
                Sign Out
              </button>
            </div>
        )}
      </div>
  )
}