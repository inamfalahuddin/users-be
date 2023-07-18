import { Request, Response } from "express";
import { response } from "../utils/response";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import Users from "../database/models/users";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";

export const GetUsers = async (req: any, res: Response) => {
  try {
    const user = await Users.findOne({
      attributes: { exclude: ["password"] },
      where: { id: req.id },
    });

    return response(res, 200, {
      status: "Success",
      message: "Berhasil mengambil data",
      data: user,
    });
  } catch (error: any) {
    if (error != null && error instanceof Error) {
      return response(res, 400, {
        status: "Failed",
        message: error.message,
      });
    }

    return res.status(500).send({
      status: 500,
      message: "Internal server error",
      errors: error,
    });
  }
};

export const AddUser = async (req: Request, res: Response) => {
  const { nama, email, password } = req.body;

  try {
    await body("nama")
      .notEmpty()
      .withMessage("Nama tidak boleh kosong")
      .run(req);
    await body("email").isEmail().withMessage("Email tidak valid").run(req);
    await body("password")
      .notEmpty()
      .withMessage("Password tidak boleh kosong")
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return response(res, 400, {
        status: "Failed",
        message: "Validasi gagal",
        errors: errors.array(),
      });
    }

    const userId: string = uuidv4();
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const userExist = await Users.findOne({
      attributes: ["id", "email"],
      where: { email },
    });

    if (userExist) {
      return response(res, 409, {
        status: "Failed",
        message: "Email sudah digunakan",
      });
    }

    await Users.create({
      id: userId,
      nama: nama,
      email: email,
      password: hashPassword,
    });

    return response(res, 201, {
      status: "Success",
      message: "Proses register berhasil",
    });
  } catch (error: any) {
    if (error != null && error instanceof Error) {
      return response(res, 400, {
        status: "Failed",
        message: error.message,
      });
    }

    return res.status(500).send({
      status: 500,
      message: "Internal server error",
      errors: error,
    });
  }
};

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    await body("email").isEmail().withMessage("Email tidak valid").run(req);
    await body("password")
      .notEmpty()
      .withMessage("Password tidak boleh kosong")
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return response(res, 400, {
        status: "Failed",
        message: "Validasi gagal",
        errors: errors.array(),
      });
    }

    const user = await Users.findOne({
      attributes: ["id", "email", "password"],
      where: { email },
    });

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      const { id, email } = user;

      if (match) {
        const accessToken = jwt.sign(
          { id, email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "20s" }
        );

        const refreshToken = jwt.sign(
          { id, email },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );

        try {
          await Users.update({ refreshToken }, { where: { id } });

          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
          });

          return response(res, 200, {
            status: "Success",
            message: "Login berhasil",
            data: {
              token: accessToken,
            },
          });
        } catch (error: any) {
          console.log(error);
        }
      }
      return response(res, 400, {
        status: "Failed",
        message: "Email atau password salah",
      });
    }

    return response(res, 404, {
      status: "Failed",
      message: "Email belum terdaftar",
    });
  } catch (error: any) {
    if (error != null && error instanceof Error) {
      return response(res, 400, {
        status: "Failed",
        message: error.message,
      });
    }

    return res.status(500).send({
      status: 500,
      message: "Internal server error",
      errors: error,
    });
  }
};
