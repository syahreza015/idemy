import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/utils/db';
import validEnv from '@/lib/utils/env';
import { z } from 'zod';
import { getToken } from 'next-auth/jwt';

export const GET = async (req: NextRequest) => {
  try {
    const result = await prisma.class.findMany({
      orderBy: {
        created_date: 'asc',
      },
      take: 20,
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

const newClassSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

export const POST = async (req: NextRequest) => {
  const sessionToken = await getToken({
    req: req,
    cookieName: 'idemy.session-token',
    secret: validEnv.NEXTAUTH_SECRET,
  });
  if (!sessionToken) {
    return NextResponse.json(
      {
        message: 'Access Denied',
      },
      {
        status: 401,
        statusText: 'Unauthorized',
      }
    );
  }
  if (sessionToken.privilege !== 'TEACHER') {
    return NextResponse.json(
      {
        message: 'Access Denied',
      },
      {
        status: 401,
        statusText: 'Unauthorized',
      }
    );
  }
  const isValidBody = newClassSchema.safeParse(await req.json());
  if (!isValidBody.success) {
    return NextResponse.json(
      {
        message: 'Invalid request',
        error: isValidBody.error.issues,
      },
      {
        status: 400,
        statusText: 'Bad request',
      }
    );
  }
  const validBody = isValidBody.data;
  try {
    const result = await prisma.class.create({
      data: {
        description: validBody.description,
        name: validBody.name,
        teaching_teacher_count: 1,
        creator_id: sessionToken.userid!,
      },
      select: {
        id: true,
      },
    });
    await prisma.teacher.create({
      data: {
        user_id: sessionToken.userid!,
        class_id: result.id,
      },
    });
    return NextResponse.json(
      {
        message: 'New class created',
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
