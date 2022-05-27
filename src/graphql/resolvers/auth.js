import { User } from "../../models/user.js";
import { Password } from "../../services/password.js";
import jwt from "jsonwebtoken";

export default {
  createUser: async (args) => {
    try {
      let user = await User.findOne({ email: args.userInput.email });

      if (user) {
        throw new Error(
          "User with email " + args.userInput.email + " already exists"
        );
      }
      const hashedPassword = await Password.toHash(args.userInput.password);

      user = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });
      const result = await user.save();
      return { ...result._doc, password: null, id: result._id };
    } catch (error) {
      throw error;
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("User does not exist!");
    }

    const isEqual = await Password.compare(password, user.password);

    if (!isEqual) {
      throw new Error("Wrong password!");
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_KEY,
      {
        expiresIn: "1h",
      }
    );

    return {
      userId: user.id,
      token: token,
      tokenExpiration: 1,
    };
  },
};
