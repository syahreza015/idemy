import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/utils/db';

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const result = await prisma.class.findUnique({
      where: {
        id: params.id,
      },
      select: {
        teaching_teachers: {
          take: 20,
          include: {
            user: true,
          },
          orderBy: {
            enrollment_date: 'asc',
          },
        },
      },
    });
    if (!result) {
      return NextResponse.json(
        {
          message: 'Class not found',
        },
        {
          status: 404,
          statusText: 'Not found',
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