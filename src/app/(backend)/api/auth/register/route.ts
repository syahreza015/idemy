import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/utils/db';
import * as bcrypt from 'bcrypt-ts';

const registerSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(8),
  email: z.string().min(1).email(),
  privilege: z.enum(['STUDENT', 'TEACHER']).optional(),
  fullname: z.string().min(1),
});

export const POST = async (req: NextRequest) => {
  const isValidBody = registerSchema.safeParse(await req.json());
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
    const hashedPassword = await bcrypt.hash(validBody.password, 10);
    const result = await prisma.user.create({
      data: {
        email: validBody.email,
        fullname: validBody.fullname,
        username: validBody.username,
        password: hashedPassword,
        privilege: validBody.privilege || 'STUDENT',
      },
    });
    return NextResponse.json(
      {
        message: 'User registered',
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
