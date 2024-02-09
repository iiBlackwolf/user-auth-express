import express from "express";
import bcrypt from "bcrypt";

const app = express();

const port = 3000;

// Dummy database (In-memory)
const users = [];

// Middlewares
app.use(express.json());

// Register a new user
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const user = users.find((user) => user.email === email);
    if (user) {
      return res.status(400).send({ message: "User already exists!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      password: hashedPassword,
    };

    users.push(newUser);
    res.status(201).send({ message: "User created!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists
    const user = users.find((user) => user.email === email);

    if (!user) {
      return res.status(400).send({ message: "Wrong email or password!" });
    }

    // Check if the password is correct
    // ? Compare the hashed password with the password provided by the user as hashed string
    // ! For security reasons, when password is wrong, we should return the same message as if the email or password is wrong
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send({ message: "Wrong email or password!" });
    }

    res.status(200).send({ message: "Logged in!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
