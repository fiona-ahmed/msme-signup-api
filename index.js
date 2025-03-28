const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const filePath = "./emails.json";

app.post("/signup", (req, res) => {
  const { name, email } = req.body;

  if (!email || !email.includes("@") || !name) {
    return res.status(400).json({ message: "Invalid name or email." });
  }

  let data = [];
  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath));
  }

  data.push({ name, email, date: new Date().toISOString() });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return res.json({ message: "You're on the list! 🥂" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
