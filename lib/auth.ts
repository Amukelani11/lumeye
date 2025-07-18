import { supabase } from './database'

export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return null
    }

    // Get additional user data from our users table
    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    return {
      ...user,
      ...userData
    }
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export async function isAdmin() {
  try {
    const user = await getCurrentUser()
    return user?.is_admin || false
  } catch (error) {
    console.error('Error checking admin status:', error)
    return false
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error)
      return false
    }
    return true
  } catch (error) {
    console.error('Error signing out:', error)
    return false
  }
}

export async function updateUserProfile(userId: string, updates: any) {
  try {
    const { error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)

    if (error) {
      console.error('Error updating user profile:', error)
      return false
    }
    return true
  } catch (error) {
    console.error('Error updating user profile:', error)
    return false
  }
} 