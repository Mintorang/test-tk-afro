import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state'); // This is your clientId
    const error = searchParams.get('error');

    if (error) {
      console.error('Square Connect authorization error:', error);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL || 'https://tkafrokitchen.com'}/admin/square-connect?error=${error}`
      );
    }

    if (!code || !state) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL || 'https://tkafrokitchen.com'}/admin/square-connect?error=missing_parameters`
      );
    }

    console.log('Square Connect callback received:', {
      code,
      clientId: state,
      hasCode: !!code
    });

    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://connect.squareup.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Square-Version': '2024-01-17',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.SQUARE_PLATFORM_APP_ID,
        client_secret: process.env.SQUARE_PLATFORM_CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code'
      })
    });

    const tokenResult = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('Failed to exchange code for token:', tokenResult);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL || 'https://tkafrokitchen.com'}/admin/square-connect?error=token_exchange_failed`
      );
    }

    // Get merchant information
    const merchantResponse = await fetch('https://connect.squareup.com/v2/merchants/me', {
      headers: {
        'Square-Version': '2024-01-17',
        'Authorization': `Bearer ${tokenResult.access_token}`,
      }
    });

    const merchantResult = await merchantResponse.json();

    if (!merchantResponse.ok) {
      console.error('Failed to get merchant info:', merchantResult);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL || 'https://tkafrokitchen.com'}/admin/square-connect?error=merchant_info_failed`
      );
    }

    // Store client account data (you would save this to your database)
    const clientAccount = {
      id: state,
      accessToken: tokenResult.access_token,
      refreshToken: tokenResult.refresh_token,
      merchantId: merchantResult.merchant.id,
      businessName: merchantResult.merchant.business_name,
      country: merchantResult.merchant.country,
      currency: merchantResult.merchant.currency,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    console.log('Client account activated:', {
      clientId: clientAccount.id,
      businessName: clientAccount.businessName,
      merchantId: clientAccount.merchantId
    });

    // In a real implementation, you would:
    // 1. Save clientAccount to your database
    // 2. Update client status to 'active'
    // 3. Send welcome email to client
    // 4. Set up webhooks for this merchant

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'https://tkafrokitchen.com'}/admin/square-connect?success=true&clientId=${state}`
    );

  } catch (error: any) {
    console.error('Square Connect callback error:', error);
    
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'https://tkafrokitchen.com'}/admin/square-connect?error=callback_failed`
    );
  }
} 