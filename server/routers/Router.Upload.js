const express = require("express");
const cloudinary = require("cloudinary");
const fs = require("fs");
const router = express.Router();

/**
 * @desc
 * upload route
 * in post method provide auth and admin middleware
 */
router.route("/upload").post((req, res) => {
  try {
    /**
     * @desc
     * check if there are files on req object
     */
    if (!req.files || Object.keys(req.files).length === 0) {
      return res
        .status(400)
        .json({ success: false, msg: "No files were uploaded." });
    }

    const file = req.files.file;

    /**
     * @desc
     * take care of file size
     * 1024 * 1024 = 1mb
     * 1024 * 1024 * 5 = 5mb
     */
    if (file.size > 1024 * 1024 * 4) {
      removeTemp(file.tempFilePath);
      return res.status(400).json({ msg: "File size too large." });
    }

    /**
     * @desc
     * check file type
     */
    if (
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpg"
    ) {
      removeTemp(file.tempFilePath);
      return res.status(400).json({ msg: "File format is incorrect." });
    }

    /**
     * @desc
     * upload file to cloudinary
     */
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "ecommerce-2" },
      async (err, result) => {
        if (err) throw err;

        removeTemp(file.tempFilePath);
        return res.status(200).json({
          success: true,
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
});

/**
 * @desc
 * destroy file route
 * in post method provide auth and admin middleware
 */
router.route("/destroy").post((req, res) => {
  const { public_id } = req.body;

  try {
    if (!public_id) return res.status(400).json({ msg: "No images selected." });

    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;

      return res.status(200).json({ success: true, msg: "Image Deleted." });
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

/**
 * @note
 * after every upload, temp folder with temp file we uploaded
 * is created in our project folder. So we will create function for deleting this folder
 */
const removeTemp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = router;
