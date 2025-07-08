const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dzge7jtiy',        // replace with your Cloudinary cloud name
  api_key: '741649976517277',              // replace with your Cloudinary API key
  api_secret: 'p7tCQZ4E6-FohUdnuMTmkiytgDU',        // replace with your Cloudinary API secret
});

module.exports = cloudinary;