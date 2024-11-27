import express, {Request, Response} from "express"
import md5 from "md5"
import {generateRandomString} from "../helper/generate.helper"
import User from "../model/user.model"
// [POST] /api/v1/users/register
export const register = async(req: Request, res: Response) => {
   const exitEmail = await User.findOne({
      email: req.body.email,
      deleted: false
  })
  if(exitEmail){
      res.status(400).json({
          code: 400,
          message: "Email đã tồn tại!"
      })
      return
  }
  const data = {
      fullName: req.body.fullName,
      email: req.body.email,
      password: md5(req.body.password),
      token: generateRandomString(30)
  }
  const user = new User(data)
  await user.save()
  const token = user.token
  res.json({
      token,
      code: 200,
      message: "Đăng kí tài khoản thành công!",
  })
}

// [POST] /api/v1/users/register
export const login = async(req: Request, res: Response) => {
   const email: string = req.body.email
    const password: string = md5(req.body.password)
    const exitEmail = await User.findOne({
        email: email,
        deleted: false
    })
    if(!exitEmail){
        res.status(400).json({
            code: 400,
            message: "Email không tồn tại!"
        })
        return
    }
    if(exitEmail.password !== password){
        res.status(400).json({
            code: 400,
            message: "Sai mật khẩu"
        })
        return
    }
    const token: string = exitEmail.token || ""
    res.json({
        code: 200,
        message: "Đăng nhập thành công!",
        token,
    })
}

// [POST] /api/v1/users/detail
export const detail = async(req: Request, res: Response) => {
   res.json({
       code: 200,
       message: "Thành công!",
       user: res.locals.user
   })
}