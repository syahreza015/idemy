import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/utils/db';
import { getToken } from 'next-auth/jwt';
import validEnv from '@/lib/utils/env';

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
        enrolled_students: {
          take: 20,
          include: {
            user: true,
          },
          orderBy: {
            enrollment_date: "asc"
          }
        },
      },
    });
    if (!result) {
        return NextResponse.json({
            message: "Class not found"
        },{
            status: 404,
            statusText: "Not found"
        })
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

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const sessionToken = await getToken({
    req: req,
    cookieName: 'idemy.session-token',
    secret: validEnv.NEXTAUTH_SECRET,
  });
  if (!sessionToken) {
    return NextResponse.json(
      {
        message: 'Session is required',
      },
      {
        status: 401,
        statusText: 'Unauthorized',
      }
    );
  }
  if (sessionToken.privilege !== 'STUDENT') {
    return NextResponse.json(
      {
        message: 'Access denied',
      },
      {
        status: 401,
        statusText: 'Unauthorized',
      }
    );
  }
  try {
    await prisma.student.create({
      data: {
        class_id: params.id,
        user_id: sessionToken.userid!,
      },
    });
    return NextResponse.json(
      {
        message: 'User enrolled',
      },
      {
        status: 201,
        statusText: 'Object created',
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

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const sessionToken = await getToken({
    req: req,
    cookieName: 'idemy.session-token',
    secret: validEnv.NEXTAUTH_SECRET,
  });
  if (!sessionToken) {
    return NextResponse.json(
      {
        message: 'Session is required',
      },
      {
        status: 401,
        statusText: 'Unauthorized',
      }
    );
  }
  if (sessionToken.privilege !== 'STUDENT') {
    return NextResponse.json(
      {
        message: 'Access denied',
      },
      {
        status: 401,
        statusText: 'Unauthorized',
      }
    );
  }
  try {
    await prisma.student.delete({
      where: {
        user_id_class_id: {
          class_id: params.id,
          user_id: sessionToken.userid!,
        },
      },
    });
    return NextResponse.json(
      {
        message: 'User unenrolled',
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

