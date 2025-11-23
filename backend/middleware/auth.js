const jwt = require("jsonwebtoken");

const JWT_SECRET = "STATIC_SECRET_JWT_123456";

module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  console.log("REQ HEADER AUTH:", req.headers.authorization);

  // FIX: tambah pengecekan FORMAT agar tidak error kalau "Bearer" nya hilang
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // FIX: tambahkan ini (penting untuk cek role)
    req.admin = decoded;

    // DEBUG: tidak mengubah format
    console.log("AUTH OK → ADMIN:", decoded);

    next();
  } catch (err) {
    console.error("JWT ERROR:", err.message);
    return res.status(401).json({ error: "Invalid token" });
  }
};
