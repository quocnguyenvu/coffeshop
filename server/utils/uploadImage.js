const fs = require('fs');
const cloudinary = require('../config/cloudinaryConfig');

module.exports = async (file) => {
  try {
    let orgName = file.originalname || '';
    orgName = orgName.trim().replace(/ /g, '-');
    const fullPathInServ = file.path;
    const newFullPath = `${fullPathInServ}-${orgName}`;
    fs.renameSync(fullPathInServ, newFullPath);
    const result = await cloudinary.uploader.upload(newFullPath);
    fs.unlinkSync(newFullPath);
    return result;
  } catch (error) {
    return console.log(error);
  }
};
