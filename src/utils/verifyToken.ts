import jwt, { JwtPayload } from 'jsonwebtoken';

interface MyJwtPayload extends JwtPayload {
    user_metadata: {
        email: string;
        email_verified: boolean;
        phone_verified: boolean;
        sub: string;
      }
}

const verifyToken = (token: string): MyJwtPayload => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof decoded !== 'object' || !('sub' in decoded)) {
      throw new Error('Invalid token');
    }
    return decoded as MyJwtPayload;
  } catch (error) {
    throw new Error('Token verification failed');
  }
};

export { verifyToken };