const cloudinary = require("../middleware/cloudinary");
const Item = require("../models/Item");
const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const items = await Item.find({ user: req.user.id });
      console.log(items)
      res.render("profile.ejs", { items: items, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      // .sort({ createdAt: "desc" }).lean()
      const items = await Item.find({ user: req.user.id, inList: true });
      res.render("feed.ejs", { items: items });
    } catch (err) {
      console.log(err);
    }
  },
  getItem: async (req, res) => {
    try {
      const item = await Item.findById(req.params.id);
      const comments = await Comment.find({ post: req.params.id }).sort({ createdAt: "desc" }).lean().populate('user');
      console.log(comments)
      res.render("item.ejs", { item: item, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
  createItem: async (req, res) => {
    try {
      console.log(req.body)
      const newPrice = req.body.prices
      const newPriceEntry = {price: newPrice, Date}
      console.log("1")
      console.log(newPriceEntry)
      await Item.create({
        item: req.body.item,
        sale: req.body.sale,
        prices: newPriceEntry,
        user: req.user.id,
      });
      console.log("Item has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  addItemPrice: async (req, res) => {
    const newPrice = req.body.itemPrice
    console.log("2")
    console.log(newPrice)
    try {
      await Item.findOneAndUpdate(
        { _id: req.params.id }, 
        { $push: { prices: {price: newPrice, Date} } },
    )
      console.log("Updated price list");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  addItem: async (req, res) => {
    try {
      await Item.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: { inList: true, completed: false },
        }
      );
      console.log("Added item to shopping list");
      res.redirect("/feed");
    } catch (err) {
      console.log(err);
    }
  },
  checkItem: async (req, res) => {
    const item = await Item.findById(req.params.id)
    console.log(item)
    try {
      await Item.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: { completed: !item.completed },
        }
      );
      console.log("Aletered completed status");
      res.redirect("/feed");
    } catch (err) {
      console.log(err);
    }
  },
  deleteItem: async (req, res) => {
    try {
      await Item.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: { inList: false },
        }
      );
      console.log("Removed item from shopping list");
      res.redirect("/feed");
    } catch (err) {
      console.log(err);
    }
  },
};
