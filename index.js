import express from "express";
import bcrypt from "bcrypt";

const app = express();

const port = 3000;
const users = [];

app.use(express.json());

app.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if the user already exists
        const user = users.find(user => user.email === email);
        if (user) {
            return res.status(400).send({ message: "User already exists!" });
        }

        // Hash the password
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
