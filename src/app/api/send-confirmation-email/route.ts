import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      teamName,
      teamLeadName,
      teamLeadEmail,
      collegeName,
      participantCount,
      registrationId
    } = body;

    console.log('Registration data received:', {
      teamName,
      teamLeadName,
      teamLeadEmail,
      collegeName,
      participantCount,
      registrationId
    });

    // Simply return success - no email needed
    return NextResponse.json({ 
      success: true, 
      message: 'Registration completed successfully',
      registrationId
    });

  } catch (error) {
    console.error('Error in registration API:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process registration',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
