
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registers a new user
 *     description: This API allows a new user to register by providing their phone number, birthday, password, and profile picture.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 description: The user's phone number.
 *                 example: "1234567890"
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: The user's birth date.
 *                 example: "1990-01-01"
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: "password123"
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *                 description: The user's profile picture file.
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Bad request, missing required fields
 *       500:
 *         description: Internal server error
 *     tags:
 *       - User
 */



const pool = require("../db");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  try {
    const {  phone, birthday, password } = req.body;
    const profilePicture = req.file ? req.file.filename : null;

    if ( !phone || !birthday || !password || !profilePicture) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO Account_Info ( Phone_Number, Birthday, Password, Profile_Img)
      VALUES ( ?, ?, ?, ?)
    `;

    await pool.query(sql, [
      phone,
      birthday,
      hashedPassword,
      `/uploads/${profilePicture}`,
    ]);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
