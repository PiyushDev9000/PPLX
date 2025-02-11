'use client'
import { supabase } from '../../lib/supabase'

export default function Auth() {
    const handleSignIn = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: 'http://localhost:3000/auth/callback'  // Must match exactly
                }
            })

            if (error) throw error
        } catch (error) {
            console.error('Error signing in:', error)
        }
    }

    return (
        <button
            onClick={handleSignIn}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            Sign in with Google
        </button>
    )
}