import { NextRequest, NextResponse } from 'next/server';
import { createSquareConnectLink } from '@/lib/square';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clientId, businessName, email, phone } = body;

    if (!clientId || !businessName || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: clientId, businessName, email' },
        { status: 400 }
      );
    }

    console.log('Creating Square Connect onboarding for client:', {
      clientId,
      businessName,
      email
    });

    // Create Square Connect authorization URL
    const authorizationUrl = await createSquareConnectLink(clientId, businessName);

    // Store client onboarding data (you can use your database here)
    const clientData = {
      id: clientId,
      businessName,
      email,
      phone,
      status: 'pending',
      createdAt: new Date().toISOString(),
      onboardingUrl: authorizationUrl
    };

    // In a real implementation, you would save this to your database
    console.log('Client onboarding data:', clientData);

    return NextResponse.json({
      success: true,
      authorizationUrl,
      clientId,
      message: 'Square Connect onboarding initiated successfully'
    });

  } catch (error: any) {
    console.error('Square Connect onboarding error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Failed to create Square Connect onboarding',
        code: 'ONBOARDING_ERROR'
      },
      { status: 500 }
    );
  }
} 