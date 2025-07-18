import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
    }

    // First, get or create cart for the session
    let { data: cart, error: cartError } = await supabase
      .from('carts')
      .select('id, created_at, updated_at, expires_at')
      .eq('session_id', sessionId)
      .single()

    if (cartError && cartError.code !== 'PGRST116') {
      console.error('Error fetching cart:', cartError)
      return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 })
    }

    // If cart doesn't exist, create it
    if (!cart) {
      const { data: newCart, error: createError } = await supabase
        .from('carts')
        .insert({ session_id: sessionId })
        .select('id, created_at, updated_at, expires_at')
        .single()

      if (createError) {
        console.error('Error creating cart:', createError)
        return NextResponse.json({ error: 'Failed to create cart' }, { status: 500 })
      }
      cart = newCart
    }

    // Get cart items for the cart
    const { data: cartItems, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        products (
          id,
          name,
          slug,
          price,
          images
        )
      `)
      .eq('cart_id', cart!.id)

    if (error) {
      console.error('Error fetching cart items:', error)
      return NextResponse.json({ error: 'Failed to fetch cart items' }, { status: 500 })
    }

    // Calculate totals
    const subtotal = cartItems?.reduce((sum, item) => sum + (Number(item.unit_price) * item.quantity), 0) || 0
    const total = subtotal // Add shipping/tax logic here if needed
    const itemCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0

    return NextResponse.json({
      cart: {
        id: cart!.id,
        session_id: sessionId,
        created_at: cart!.created_at,
        updated_at: cart!.updated_at,
        expires_at: cart!.expires_at,
        items: cartItems || [],
        total_amount: total,
        item_count: itemCount
      }
    })
  } catch (error) {
    console.error('Error in cart GET API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { productId, quantity, sessionId } = await request.json()

    if (!productId || !quantity || !sessionId) {
      return NextResponse.json({ error: 'Product ID, quantity, and session ID required' }, { status: 400 })
    }

    // Get product details
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('id, name, price')
      .eq('id', productId)
      .eq('is_active', true)
      .single()

    if (productError || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Get or create cart for the session
    let { data: cart, error: cartError } = await supabase
      .from('carts')
      .select('id, created_at, updated_at, expires_at')
      .eq('session_id', sessionId)
      .single()

    if (cartError && cartError.code !== 'PGRST116') {
      console.error('Error fetching cart:', cartError)
      return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 })
    }

    // If cart doesn't exist, create it
    if (!cart) {
      const { data: newCart, error: createError } = await supabase
        .from('carts')
        .insert({ session_id: sessionId })
        .select('id, created_at, updated_at, expires_at')
        .single()

      if (createError) {
        console.error('Error creating cart:', createError)
        return NextResponse.json({ error: 'Failed to create cart' }, { status: 500 })
      }
      cart = newCart
    }

    // Check if item already exists in cart
    const { data: existingItem } = await supabase
      .from('cart_items')
      .select('id, quantity')
      .eq('cart_id', cart!.id)
      .eq('product_id', productId)
      .single()

    if (existingItem) {
      // Update existing item
      const { error: updateError } = await supabase
        .from('cart_items')
        .update({ quantity: existingItem.quantity + quantity })
        .eq('id', existingItem.id)

      if (updateError) {
        console.error('Error updating cart item:', updateError)
        return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 })
      }
    } else {
      // Add new item
      const { error: insertError } = await supabase
        .from('cart_items')
        .insert({
          cart_id: cart!.id,
          product_id: productId,
          quantity,
          unit_price: product.price
        })

      if (insertError) {
        console.error('Error creating cart item:', insertError)
        return NextResponse.json({ error: 'Failed to add item to cart' }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in cart POST API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { itemId, quantity } = await request.json()

    if (!itemId || quantity === undefined) {
      return NextResponse.json({ error: 'Item ID and quantity required' }, { status: 400 })
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      const { error: deleteError } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId)

      if (deleteError) {
        console.error('Error removing cart item:', deleteError)
        return NextResponse.json({ error: 'Failed to remove item' }, { status: 500 })
      }
    } else {
      // Update quantity
      const { error: updateError } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', itemId)

      if (updateError) {
        console.error('Error updating cart item:', updateError)
        return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in cart PUT API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const itemId = searchParams.get('itemId')

    if (!itemId) {
      return NextResponse.json({ error: 'Item ID required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId)

    if (error) {
      console.error('Error removing cart item:', error)
      return NextResponse.json({ error: 'Failed to remove item' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in cart DELETE API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 