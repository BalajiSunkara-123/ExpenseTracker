const mongoose = require('mongoose');

const database = async () => {
  //   console.log(process.env.DATABASE_URI);

  await mongoose
    .connect(process.env.DATABASE_URI)
    .then(() => {
      console.log('Database Connected Successfully !!');
    })
    .catch((e) => {
      console.log('Unable to connect to Database.' + e);
    });
};

module.exports = database;
