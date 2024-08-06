import { Request, Response } from 'express';
import { configDotenv } from 'dotenv';
import { verifyToken } from '../../utils/verifyToken';
import { getUserByEmailService } from '../../services/users/getUserByEmail.service';
import getErrorMessage from '../../utils/getErrorMessage';

configDotenv()

const authStatusController = async (req: Request, res: Response) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({message: 'Not authenticated'});
  }

  try {
    const decoded = verifyToken(token)
    const userEmail = decoded.user_metadata.email;
    const user = await getUserByEmailService(userEmail);
    res.status(200).json({user: user});
  } catch (error) {
    res.status(401)
    .clearCookie('access_token')
    .json({message: getErrorMessage(error)});
  }
};

export {authStatusController};
