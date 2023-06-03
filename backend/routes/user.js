const express = require('express');
const router = express.Router();

// Örnek GET işlemi
router.get('/', (req, res) => {
  // Kullanıcılara ilişkin bilgileri getirme işlemini gerçekleştirin
  // İşlem tamamlandığında verileri JSON formatında dönün
  res.json({ message: 'User endpoint' });
});

// Örnek POST işlemi
router.post('/', (req, res) => {
  // Yeni kullanıcı oluşturma işlemini gerçekleştirin
  // İşlem tamamlandığında oluşturulan kullanıcının bilgilerini JSON formatında dönün
  res.json({ message: 'User created' });
});

// Örnek PUT işlemi
router.put('/:id', (req, res) => {
  // Belirli bir kullanıcının bilgilerini güncelleme işlemini gerçekleştirin
  // İşlem tamamlandığında güncellenen kullanıcının bilgilerini JSON formatında dönün
  res.json({ message: 'User updated' });
});

// Örnek DELETE işlemi
router.delete('/:id', (req, res) => {
  // Belirli bir kullanıcıyı silme işlemini gerçekleştirin
  // İşlem tamamlandığında silinen kullanıcının bilgilerini JSON formatında dönün
  res.json({ message: 'User deleted' });
});

module.exports = router;
