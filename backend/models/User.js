const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // Ekstra bilgileri buraya ekleyebilirsiniz (Ad, soyad vb.)
});

// Şifreyi hash'leme işlemi
userSchema.pre('save', async function(next) {
  // Yalnızca şifre değiştirildiyse veya yeni bir kullanıcı oluşturulduysa hash'leyelim
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Şifreyi karşılaştırma işlemi
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
