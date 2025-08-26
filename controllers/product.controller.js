const Product = require("../models/product.model");

exports.addProduct = async (req, res) => {
  try {
    const { name, price, category, description, features, b } = req.body;

    console.log("REQ FILE:", req.file);   
    console.log("REQ BODY:", req.body);

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageUrl = req.file.path;

    const newProduct = await Product.create({
      imageUrl,
      name,
      price,
      category,
      description,
      features: features.split(",").map((feature) => {
        const [key, value] = feature.split(":").map((item) => item.trim());
        return { key, value };
      }),
      brand,
    });

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
