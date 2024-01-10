import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/utils/db';

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string; userId: string } }
) => {
  try {
    const result = await prisma.student.findUnique({
      where: {
        user_id_class_id: {
          user_id: params.userId,
          class_id: params.id,
        },
      },
    });
    if (!result) {
      return NextResponse.json(
        {
          message: 'User not found',
        },
        {
          status: 200,
          statusText: 'OK',
        }
      );
    }
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
