import { NextRequest, NextResponse } from 'next/server';
import { OPENBANKING_CONFIG } from '@/lib/openbanking';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bankId, amount, testMode } = body;

    console.log('Testing Open Banking connection:', {
      bankId,
      amount,
      testMode
    });

    // Test 1: Get TrueLayer access token
    console.log('🔑 Testing TrueLayer authentication...');
    
    const tokenResponse = await fetch('https://auth.truelayer.com/connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: OPENBANKING_CONFIG.clientId,
        client_secret: OPENBANKING_CONFIG.clientSecret,
        scope: 'payments'
      })
    });

    const tokenResult = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('❌ TrueLayer authentication failed:', tokenResult);
      return NextResponse.json({
        success: false,
        error: 'TrueLayer authentication failed',
        details: tokenResult
      });
    }

    console.log('✅ TrueLayer authentication successful');

    // Test 2: Get available banks
    console.log('🏦 Testing bank list retrieval...');
    
    const banksResponse = await fetch('https://api.truelayer.com/data/v1/providers', {
      headers: {
        'Authorization': `Bearer ${tokenResult.access_token}`,
        'Tl-Version': '2021-04-01'
      }
    });

    const banksResult = await banksResponse.json();

    if (!banksResponse.ok) {
      console.error('❌ Bank list retrieval failed:', banksResult);
      return NextResponse.json({
        success: false,
        error: 'Bank list retrieval failed',
        details: banksResult
      });
    }

    console.log('✅ Bank list retrieval successful');

    // Test 3: Create test payment (if not in test mode)
    if (!testMode) {
      console.log('💳 Testing payment creation...');
      
      const paymentRequest = {
        amount: Math.round(amount * 100), // Convert to pence
        currency: 'GBP',
        payment_method: {
          type: 'bank_transfer',
          provider_selection: {
            type: 'preselected',
            provider_id: bankId
          },
          scheme_selection: {
            type: 'preselected',
            scheme_id: 'faster_payments_service'
          }
        },
        user: {
          id: 'test-user',
          name: 'Test User'
        },
        metadata: {
          test: true,
          order_id: `test-${Date.now()}`
        }
      };

      const paymentResponse = await fetch('https://api.truelayer.com/payments', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokenResult.access_token}`,
          'Content-Type': 'application/json',
          'Tl-Version': '2021-04-01'
        },
        body: JSON.stringify(paymentRequest)
      });

      const paymentResult = await paymentResponse.json();

      if (!paymentResponse.ok) {
        console.error('❌ Payment creation failed:', paymentResult);
        return NextResponse.json({
          success: false,
          error: 'Payment creation failed',
          details: paymentResult
        });
      }

      console.log('✅ Payment creation successful:', paymentResult.payment_id);

      return NextResponse.json({
        success: true,
        message: 'Open Banking connection test successful',
        paymentId: paymentResult.payment_id,
        authorizationUrl: paymentResult.authorization_url,
        status: paymentResult.status,
        details: {
          tokenValid: true,
          banksAvailable: banksResult.results?.length > 0,
          paymentCreated: true
        }
      });
    }

    // Test mode - just verify connection
    return NextResponse.json({
      success: true,
      message: 'Open Banking connection test successful',
      details: {
        tokenValid: true,
        banksAvailable: banksResult.results?.length > 0,
        paymentCreated: false
      },
      availableBanks: banksResult.results?.length || 0
    });

  } catch (error: any) {
    console.error('❌ Open Banking test error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Open Banking test failed',
      details: error.message
    });
  }
} 