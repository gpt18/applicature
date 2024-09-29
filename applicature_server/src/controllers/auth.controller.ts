import express from 'express';
import UserModel, { getRegisteredUser } from '../models/user.model';
import { generateCode, hashString, isValidEmail } from '../config/auth';

export const checkUserRegistration = async (req: express.Request, res: any) => {
    const { email, username } = req.query as { email?: string, username?: string };

    if (!email && !username) {
      return res.status(400).json({ success: false, message: "Email or username is required" });
    }

    try {
      const user = await getRegisteredUser({ email, username });

      if (user) {
        return res.status(200).json({ success: true, message: "Already registered", required: "password" });
      }

      if (email) {
        if (!isValidEmail(email)) {
          return res.status(400).json({ success: false, message: "Invalid email" });
        }
        const existingUser = await UserModel.findOne({ email });
        const otp = generateCode(4);
        const hashedOTP = await hashString(otp);

        if (existingUser) {
          if (existingUser?.status === 0) {
            await UserModel.findOneAndUpdate({ email }, { password: otp });
            return res.status(200).json({ success: true, message: "OTP Re-Sent", required: "otp" });
          }
        } else {
          await UserModel.create({ email, password: otp });
          return res.status(200).json({ success: true, message: "OTP Sent", required: "otp" });
        }
      }

      return res.status(200).json({ success: false, message: "User not found", required: "email" });

    } catch (error) {
      console.log("Error: Checking User Registration", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  export const registerNewUser = async (req: express.Request, res: any) => {
    const { email, password, otp, username } = req.body;

    if (!email || !password || !otp || !username) {
      return res.status(400).json({ success: false, message: "Insufficient form data" });
    }


    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    try {

      const existingUser = await UserModel.findOne({ email });

      if (existingUser) {
        if (existingUser?.status === 0) {
          // const isMatch = await verifyHash(otp, existingUser.password);
          const isMatch = otp === existingUser.password;
          if (isMatch) {
            const hashedPassword = await hashString(password);
            await UserModel.findOneAndUpdate({ email }, { password: hashedPassword, username, status: 1 });

            return res.status(200).json({ success: true, message: "User registered successfully" });
          } else {
            return res.status(400).json({ success: false, message: "Invalid OTP", required: "signup" });
          }
        } else if (existingUser?.status === 1) {
          return res.status(400).json({ success: false, message: "User already registered", required: "login" });
        }
      } else {
        return res.status(400).json({ success: false, message: "OTP Expired" });
      }


    } catch (error) {
      console.log("Error: Registering User", error);
      return res.status(500).json({ message: "Internal server error" });
    }


  }