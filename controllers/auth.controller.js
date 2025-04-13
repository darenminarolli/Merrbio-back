const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  })
}

exports.signup = async (req, res) => {
  try {
    const { name, lastName, email, password, role, location, farmName, phone, adminKey } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ message: "Email already in use" })

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      name,
      lastName,
      email,
      phone,
      password: hashedPassword,
      role,
      location: role === 'farmer' ? location : undefined,
      farmName: role === 'farmer' ? farmName : undefined,
      adminKey: role === 'admin' ? adminKey : undefined
    })

    await user.save()
    res.status(201).json({ message: "User created successfully" })

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: "Invalid credentials" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" })

    const token = createToken(user._id)

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        location: user?.location,
        role: user.role
      }
    })

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
}

exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  })
  res.json({ message: "Logged out successfully" })
}
