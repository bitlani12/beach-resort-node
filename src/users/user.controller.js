const Joi = require("joi");
require("dotenv").config();
const { v4: uuid } = require("uuid");
const bcrypt = require('bcryptjs')
const { sendEmail } = require("./helper/mailer");
const User = require("./user.model");

//Validate user schema
const userSchema = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string().required().min(4),
  username: Joi.string().required().min(4)
  // confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

exports.Signup = async (req, res) => {
  try {
    const result = userSchema.validate(req.body);
    if (result.error) {
      console.log(result.error.message);
      return res.status(400).json({
        error: true,
        status: 400,
        message: result.error.message,
      });
    }

    //Check if the email has been already registered.
    var user = await User.findOne({
      email: result.value.email,
    });

    if (user) {
      return res.status(500).json({
        error: true,
        message: "Email is already in use",
      });
    }

    const hash = await User.hashPassword(result.value.password);

    const id = uuid(); //Generate unique id for the user.
    result.value.userId = id;

   //remove the confirmPassword field from the result as we dont need to save this in the db.
   delete result.value.confirmPassword;
   result.value.password = hash;

    let code = Math.floor(100000 + Math.random() * 900000);  //Generate random 6 digit code.                             
    let expiry = Date.now() + 60 * 1000 * 15;  //Set expiry 15 mins ahead from now

    // const sendCode = await sendEmail(result.value.email, code);

    // if (sendCode.error) {
    //   return res.status(500).json({
    //     error: true,
    //     message: "Couldn't send verification email.",
    //   });
    // }
    result.value.emailToken = code;
    result.value.emailTokenExpires = new Date(expiry);
    const newUser = new User(result.value);
    await newUser.save();

    return res.status(200).json({
      success: true,
      message: "Registration Success",
    });
  } catch (error) {
    console.error("signup-error", error);
    return res.status(500).json({
      error: true,
      message: "Cannot Register",
    });
  }
};


exports.Login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({
          error: true,
          message: "Cannot authorize user.",
        });
      }
  
      //1. Find if any account with that email exists in DB
      const user = await User.findOne({ email: email });
  
      // NOT FOUND - Throw error
      if (!user) {
          console.log('user not found')
        return res.status(400).json({
          error: true,
          message: "Account not found",
        });
      }
  
      //2. Throw error if account is not activated
    //   if (!user.active) {
    //     return res.status(400).json({
    //       error: true,
    //       message: "You must verify your email to activate your account",
    //     });
    //   }
  
      //3. Verify the password is valid
      const isValid = await bcrypt.compare(password, user.password);
      console.log(user, "this is user")
      if (!isValid) {
        return res.status(400).json({
          error: true,
          message: "Invalid credentials",
        });
      }
      await user.save();
      
      //Success
      return res.send({
        success: true,
        message: "User logged in successfully",
       });
    } catch (err) {
      console.error("Login error", err);
      return res.status(500).json({
        error: true,
        message: "Couldn't login. Please try again later.",
      });
    }
  };