import bcrypt from "bcrypt";

export class Password {
  static async toHash(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  static async compare(suppliedPassword, storedPassword) {
    return await bcrypt.compare(suppliedPassword, storedPassword);
  }
}
