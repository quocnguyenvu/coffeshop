module.exports = function (dbs) {
  let newDbs = dbs.map((item) => {
    item._doc.id = item._id;
    return item;
  });

  return newDbs;
};
