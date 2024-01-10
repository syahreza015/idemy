import { NextRequest, NextResponse } from 'next/server';
import validEnv from './lib/utils/env';
import { getToken } from 'next-auth/jwt';

const ProtectedRoutes = ['/home', '/class', '/profile'];

const checkRouteStatus: (pathName: string) => 'PROTECTED' | 'UNPROTECTED' = (
  pathName
) => {
  const status = ProtectedRoutes.some((route) => pathName.startsWith(route));
  if (status) {
    return 'PROTECTED';
  }
  return 'UNPROTECTED';
};

export const middleware = async (req: NextRequest) => {
  const sessionToken = await getToken({
    req: req,
    cookieName: 'idemy.session-token',
    secret: validEnv.NEXTAUTH_SECRET,
  });

  if (req.nextUrl.pathname.startsWith('/api')) {
    if (req.nextUrl.pathname.startsWith('/api/auth')) {
      return NextResponse.next();
    }

    const bearerToken = req.headers.get('Authorization');
    if (!bearerToken) {
      return NextResponse.json(
        {
          message: 'Access token ts required',
        },
        {
          status: 401,
          statusText: 'Unauthorized',
        }
      );
    }
    if (!bearerToken.startsWith('Bearer')) {
      return NextResponse.json(
        {
          message: 'Access token must be Sent as bearer ',
        },
        {
          status: 401,
          statusText: 'Unauthorized',
        }
      );
    }
    const accessToken = bearerToken.split(' ')[1];
    if (!accessToken) {
      return NextResponse.json(
        {
          message: 'Access token is invalid',
        },
        {
          status: 401,
          statusText: 'Unauthorized',
        }
      );
    }
    if (accessToken !== validEnv.ACCESS_TOKEN) {
      return NextResponse.json(
        {
          message: 'Access token is invalid',
        },
        {
          status: 401,
          statusText: 'Unauthorized',
        }
      );
    }
    return NextResponse.next();
  }

  const routeStatus = checkRouteStatus(req.nextUrl.pathname);

  if (routeStatus === 'PROTECTED') {
    if (!sessionToken) {
      return NextResponse.redirect(`${validEnv.BASE_URL}/signin`);
    }
    if (req.nextUrl.pathname === '/profile') {
      return NextResponse.redirect(
        `${validEnv.BASE_URL}/profile/${sessionToken.userid}`
      );
    }
  }

  if (routeStatus === 'UNPROTECTED') {
    if (sessionToken) {
      return NextResponse.redirect(`${validEnv.BASE_URL}/home`);
    }
  }
};

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
