import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/utils/db';
import { getToken } from 'next-auth/jwt';
import validEnv from '@/lib/utils/env';
import { z } from 'zod';

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
      select: {
        fullname: true,
        email: true,
        id: true,
        privilege: true,
        register_date: true,
        username: true,
      },
    });
    if (!result) {
      return NextResponse.json(
        {
          message: 'User not found',
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

const profileUpdateSchema = z.object({
  username: z.string().min(1).optional(),
  fullname: z.string().min(1).optional(),
  email: z.string().min(1).email().optional(),
});

export const PATCH = async (
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
  const isValidData = profileUpdateSchema.safeParse(await req.json());
  if (!isValidData.success) {
    return NextResponse.json(
      {
        message: 'Invalid request',
      },
      {
        status: 400,
        statusText: 'Bad request',
      }
    );
  }
  try {
    const validBody = isValidData.data;
    await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        fullname: validBody.fullname,
        username: validBody.username,
        email: validBody.email,
      },
    });
    return NextResponse.json(
      {
        message: 'Profile updated',
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
