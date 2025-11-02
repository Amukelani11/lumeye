import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const inquiryId = params.id
    const { status, admin_notes } = await request.json()

    const updateData: any = {}
    if (status) updateData.status = status
    if (admin_notes !== undefined) updateData.admin_notes = admin_notes
    updateData.updated_at = new Date().toISOString()

    const { data, error } = await supabase
      .from('contact_inquiries')
      .update(updateData)
      .eq('id', inquiryId)
      .select()
      .single()

    if (error) {
      console.error('Error updating inquiry:', error)
      return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 })
    }

    return NextResponse.json({ inquiry: data })
  } catch (error) {
    console.error('Error in inquiry update API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

