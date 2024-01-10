import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/utils/db';

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const result = await prisma.class.findMany({
      where: {
        enrolled_students: {
          some: {
            user_id: params.id,
          },
        },
      },
    });
    return NextResponse.json(
      {
        message: 'Data retrieved',
        data: result,
      },
      {
        status: 200,
        statusText: 'OK',
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: 'Something went wrong',
        error: error,
      },
      {
        status: 500,
        statusText: 'Server error',
      }
    );
  }
};
