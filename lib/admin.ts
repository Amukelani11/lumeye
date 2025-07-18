import { createClient } from '@supabase/supabase-js'

export interface AdminUser {
  id: string
  email: string
  first_name?: string
  last_name?: string
  is_admin: boolean
}

export async function getAdminUsers(): Promise<AdminUser[]> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    
    if (!supabaseServiceKey) {
      console.error('SUPABASE_SERVICE_ROLE_KEY is not set')
      return []
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    const { data: adminUsers, error } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, is_admin')
      .eq('is_admin', true)
      .eq('is_active', true)

    if (error) {
      console.error('Error fetching admin users:', error)
      return []
    }

    return adminUsers || []
  } catch (error) {
    console.error('Error in getAdminUsers:', error)
    return []
  }
}

export async function getPrimaryAdminEmail(): Promise<string | null> {
  try {
    const adminUsers = await getAdminUsers()
    
    // Return the first admin user's email, or a default admin email
    if (adminUsers.length > 0) {
      return adminUsers[0].email
    }
    
    // Fallback to environment variable if no admin users found
    return process.env.ADMIN_EMAIL || 'admin@lumeye.co.za'
  } catch (error) {
    console.error('Error getting primary admin email:', error)
    return process.env.ADMIN_EMAIL || 'admin@lumeye.co.za'
  }
} 