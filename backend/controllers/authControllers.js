import { User } from "../model/user.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateTokenAndCookies } from "../utils/generateTokenAndCookies.js";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  welcomeEmail,
} from "../mailtrap/email.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must 6 characters",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "This user is already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 9000
    ).toString();

    const user = new User({
      email,
      name,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();

    await generateTokenAndCookies(res, user._id);
    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in signup", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationTokenExpiresAt = undefined;
    user.verificationToken = undefined;
    await user.save();

    await welcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "Welcome Email send successfully",
      user: {
        ...user._doc,

        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in verifyEmail", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const passwordCompared = await bcrypt.compare(password, user.password);
    if (!passwordCompared) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    generateTokenAndCookies(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Login Successful",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in login", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({
    success: true,
    message: "Logout Successfully",
  });
};

export const forgtoPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;
    await user.save();

    await sendPasswordResetEmail(
      user.email,
      `http://localhost:5173/reset-password/${resetToken}`
    );

    res.status(200).json({
      success: true,
      message: "Email password reset sent sucessfully",
    });
  } catch (error) {
    console.log("Error in forgtoPassword", error);
    res.status(500).json({
      sucess: false,
      message: "Internal Server Error",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.params;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log();
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      return res.status(400).json({
        success: false,
        message: "User not found",
      });

    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in checkAuth", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    })
  }
};
