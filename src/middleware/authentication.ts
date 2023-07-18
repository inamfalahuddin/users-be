import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { response } from "../utils/response";

interface AuthRequest extends Request {
  id: string;
  email: string;
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return response(res, 401, {
      status: "Unauthorized",
      message: "Mohon login terlebih dahulu",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as {
      id: string;
      email: string;
    };

    // Melampirkan data terdekripsi ke objek req
    req.id = decoded.id;
    req.email = decoded.email;

    next();
  } catch (error) {
    return response(res, 403, {
      status: "Forbidden",
      message: "Token expired",
    });
  }
};
