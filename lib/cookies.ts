//@ts-ignore
import cookie from 'cookie';

const MAX_AGE = 7 * 24 * 60 * 60; // 7 days

export const setTokenCookie = (token: string, res: any) => {
  const setCookie = cookie.serialize('token', token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });
  res.setHeader('Set-Cookie', setCookie);
};
