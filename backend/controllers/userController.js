const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sgMail = require('@sendgrid/mail');
const shortid = require('shortid');
const User = require('../models/userModel');
const { registerSchema, loginSchema, updateSchema } = require('../middleware/validationMiddleware');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: '30d',
});

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  await registerSchema.validateAsync(req.body);

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201)
      .json({
        _id: user.id,
        name: user.name,
        email: user.email,
      });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  await loginSchema.validateAsync(req.body);

  const user = await User.findOne({ email });
  const token = generateToken(user._id);

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201)
      .json({
        message: 'User has been logged in',
        _id: user.id,
        name: user.name,
        email: user.email,
        token,
      });
  } else {
    res.status(400)
      .json({
        message: 'Invalid credentials',
      });
    throw new Error('Invalid credentials');
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    const token = shortid.generate();

    user.forgotPasswordToken = token;
    user.save();

    const msg = {
      to: 'fabienbrocklesby@icloud.com',
      from: 'fabienbrocklesby@icloud.com',
      subject: 'Sending with SendGrid is Fun',
      templateId: 'd-11fa458d02ff460cae0548f86dd9c9da',
      dynamicTemplateData: {
        domain: token,
      },
    };
    await sgMail
      .send(msg)
      .catch((Error) => {
        res.status(400).json({
          message: Error,
        });
      });

    res.status(200).json({
      message: 'Token has been sent to your email',
    });
  } else {
    res.status(400).json({
      message: 'No user found',
    });
    throw new Error('User does not exist');
  }
};

const updatePassword = async (req, res) => {
  const { password, resetToken } = req.body;

  await updateSchema.validateAsync(req.body);

  const user = await User.findOne({ forgotPasswordToken: resetToken });

  if (!user) {
    res.status(400).json({ message: 'Invalid token' });
  }

  if (user) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.forgotPasswordToken = null;
    user.save();

    res.status(200).json({
      message: 'Password has been updated',
    });
  } else {
    res.status(400);
    throw new Error('Invalid token');
  }
};

const getMe = async (req, res) => {
  const { _id, name, email } = await User.findById(req.user._id);

  res.status(200).json({
    id: _id,
    name,
    email,
  });
};

const getId = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (user) {
    res.status(200).json({
      id: user._id,
      name: user.name,
    });
  } else {
    res.status(400);
    throw new Error('User does not exist');
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  updatePassword,
  getMe,
  getId,
};
