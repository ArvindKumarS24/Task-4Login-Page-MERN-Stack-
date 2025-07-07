const mongoose = require('mongosh');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://127.0.0.1:27017/loginDB');

const User = mongoose.model('User', new mongoose.Schema({
  email: String,
  password: String
}));

bcrypt.hash('arvind123', 10).then(hashedPassword => {
  User.create({ email: 'arvindkumarin6362@gmail.com', password: hashedPassword })
    .then(() => {
      console.log('✅ User created successfully');
      mongoose.disconnect();
    });
});
