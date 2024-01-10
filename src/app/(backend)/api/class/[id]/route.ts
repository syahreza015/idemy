import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/utils/db';
import { z } from 'zod';
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
      include: {
        creator: true,
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

const updateClassSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  student_count: z.number().optional(),
  teacher_count: z.number().optional(),
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
        message: 'Access Denied',
      },
      {
        status: 401,
        statusText: 'Unauthorized',
      }
    );
  }
  const isValidBody = updateClassSchema.safeParse(await req.json());
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
  try {
    const validBody = isValidBody.data;
    const result = await prisma.class.update({
      where: {
        id: params.id,
      },
      data: {
        name: validBody.name,
        description: validBody.description,
        enrolled_student_count: validBody.student_count,
        teaching_teacher_count: validBody.teacher_count,
      },
      select: {
        id: true,
      },
    });
    return NextResponse.json(
      {
        message: 'Class updated',
      },
      {
        status: 201,
        statusText: 'Object updated',
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
        message: 'Access Unauthorized',
      },
      {
        status: 401,
        statusText: 'Unauthorized',
      }
    );
  }
  try {
    await prisma.$transaction([
      prisma.class.delete({
        where: {
          id: params.id,
        },
      }),
      prisma.student.deleteMany({
        where: {
          class_id: params.id,
        },
      }),
      prisma.teacher.deleteMany({
        where: {
          class_id: params.id,
        },
      }),
    ]);
    return NextResponse.json(
      {
        message: 'class deleted',
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
