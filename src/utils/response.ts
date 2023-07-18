import { Response } from "express";

export const response = (res: Response, ResCode:number, ResData: object) => {
    res.status(ResCode)
        .json({code: ResCode, ...ResData})
}