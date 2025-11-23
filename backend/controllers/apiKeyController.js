const { ApiKey, User } = require("../models");
const crypto = require("crypto");

module.exports = {
  generateApiKey: async (req, res) => {
    try {
      const newKey = crypto.randomBytes(32).toString("hex");

      const apiKey = await ApiKey.create({
        key: newKey,
        user_id: null,
        status: false,
        out_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        created_at: new Date(),
        updated_at: new Date()
      });

      res.json({ apikey: apiKey.key });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAllApiKeys: async (req, res) => {
  try {
    const keys = await ApiKey.findAll({
      include: [{
        model: User,
        attributes: ["id", "firstname", "lastname", "email"]
      }]
    });

    // FIX → kirim data plain JSON supaya frontend bisa baca
    const jsonKeys = keys.map(k => k.toJSON());
    res.json(jsonKeys);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
},


  deleteApiKey: async (req, res) => {
    try {
      const deleted = await ApiKey.destroy({
        where: { id: req.params.id }
      });

      if (!deleted) {
        return res.status(404).json({ error: "API Key not found" });
      }

      res.json({ message: "API key deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
