const cloudinary = require("../middleware/cloudinary")
const Resource = require("../models/Resource")

module.exports = {
  getProfile: async (req, res) => {
    try {
      // const resources = await Resource.find({ user: req.user.id });
      const resources = await Resource.find().sort({ createdAt: "desc" }).lean()
      console.log(resources)
      res.render("profile.ejs", { resources: resources, user: req.user })
    } catch (err) {
      console.log(err)
    }
  },
  getFeed: async (req, res) => {
    try {
      const resources = await Resource.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { resources: resources });
    } catch (err) {
      console.log(err)
    }
  },
  getResource: async (req, res) => {
    try {
      const resource = await Resource.findById(req.params.id)
      res.render("resource.ejs", { resource: resource })
    } catch (err) {
      console.log(err)
    }
  },
  createResource: async (req, res) => {
    try {
      console.log(req.body)
      await Resource.create({
        title: req.body.title,
        desc: req.body.desc,
        link: req.body.link,
      });
      console.log("Item has been added!")
      res.redirect("/feed")
    } catch (err) {
      console.log(err)
    }
  },
  updateResource: async (req, res) => {
    const resource = await Resource.findById(req.params.id)
    try {
      await Resource.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: { 
            title: req.body.title,
            desc: req.body.desc,
            link: req.body.link
          },
        }
      );
      console.log("Updated Resource");
      res.redirect("/feed");
    } catch (err) {
      console.log(err);
    }
  },
  deleteResource: async (req, res) => {
    try {
      console.log(req.params.id)
      // Find reosurce by id
      let resource = await Resource.findById({ _id: req.params.id })
      console.log(resource)
      // Delete resource from db
      await Resource.remove({ _id: req.params.id })
      console.log("Deleted Resource")
      res.redirect("/feed")
    } catch (err) {
      res.redirect("/feed")
    }
    
    
    // try {
    //   await Resource.findOneAndUpdate(
    //     { _id: req.params.id },
    //   );
    //   console.log("Removed resource from shopping list");
    //   res.redirect("/feed");
    // } catch (err) {
    //   console.log(err);
    // }
  },
};
