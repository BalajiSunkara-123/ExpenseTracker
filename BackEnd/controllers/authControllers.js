const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const otpStore = [];

const register = async (req, res) => {
  try {
    const userDetails = req.body;
    console.log(userDetails);
    const dupUser = await user.findOne({ email: userDetails.email });
    if (dupUser || userDetails.password1 != userDetails.password2) {
      return res.status(500).json({
        success: false,
        message: dupUser
          ? 'User Already Exist.'
          : 'Both Passwords donot match.',
      });
    }
    if (userDetails.otp != otpStore[userDetails.email].otp) {
      return res.status(500).json({
        success: false,
        message: 'OTP donot match',
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userDetails.password1, salt);

    const newUser = await user.create({
      name: userDetails.name,
      email: userDetails.email,
      password: hashedPassword,
    });
    res.status(200).json({
      success: true,
      message: 'User Created Successfully !!',
    });
  } catch (e) {
    console.log(e);

    res.status(500).json({
      success: false,
      message: 'Unable to create User',
    });
  }
};

const login = async (req, res) => {
  try {
    userDetails = req.body;

    if (!userDetails) {
      return res.status(500).json({
        success: false,
        message: 'Invalid Credentials',
      });
    }
    const orginalUser = await user.findOne({ email: userDetails.email });
    console.log(orginalUser);
    const isMatch = await bcrypt.compare(
      userDetails.password,
      orginalUser.password,
    );
    if (!isMatch) {
      res.status(500).json({
        success: false,
        message: 'Invalid Credentials',
      });
    }
    const token = jwt.sign(
      {
        name: orginalUser.name,
        email: orginalUser.email,
      },
      process.env.JWT_PRIVATE_KEY,
      {
        expiresIn: '30d',
      },
    );
    res.status(200).json({
      success: true,
      message: 'User Logged In Successfully!!',
      token: token,
      name: orginalUser.name,
      email: orginalUser.email,
    });
  } catch (e) {
    console.log(e);

    res.status(500).json({
      success: false,
      message: 'Invalid Credentials',
    });
  }
};

const otp = async (req, res) => {
  details = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_HOST_USER,
      pass: process.env.EMAIL_HOST_PASSWORD,
    },
  });
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await transporter.sendMail({
      to: details.email,
      from: process.env.EMAIL_HOST_USER,
      subject: 'OTP for the Expense Tracker',
      text: `Dear User,
                OTP for the creating user is ${otp}.
Thank You.

warm regards,
Expense Tracker Team.`,
    });
    otpStore[details.email] = {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000,
    };
    res.status(200).json({
      success: true,
      message: 'OTP sent successfully!!',
    });
  } catch (e) {
    console.log(e);

    res.status(500).json({
      success: false,
      message: 'Unable to send OTP',
    });
  }
};

module.exports = { register, login, otp };
