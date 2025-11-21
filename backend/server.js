const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/admin", require("./routes/admin"));
app.use("/users", require("./routes/user"));
app.use("/apikey", require("./routes/apikey"));

// Sync DB
sequelize.sync().then(() => {
  console.log("Database connected");
}).catch(err => {
  console.log("DB ERROR:", err);
});

// Run server
app.listen(3000, () => console.log("Server running on port 3000"));
