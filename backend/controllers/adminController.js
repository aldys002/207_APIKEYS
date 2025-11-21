const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {

    register: async (req, res) => {
        try {
            const { email, password } = req.body;

            // cek email sudah ada atau belum
            const exist = await Admin.findOne({ where: { email } });
            if (exist) return res.status(400).json({ error: "Email already registered" });

            const hashed = await bcrypt.hash(password, 10);

            const admin = await Admin.create({
                email,
                password: hashed,
                created_at: new Date(),
                updated_at: new Date()
            });

            res.json({ message: "Admin registered successfully", admin });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const admin = await Admin.findOne({ where: { email } });
            if (!admin) return res.status(404).json({ error: "Admin not found" });

            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) return res.status(400).json({ error: "Invalid password" });

            // token buat middleware admin
            const token = jwt.sign(
                { id: admin.id, email: admin.email },
                "STATIC_SECRET_JWT_123456",
                { expiresIn: "1d" }
            );


            res.json({
                message: "Login successful",
                token,
                admin_id: admin.id
            });

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
