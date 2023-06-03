import React, { useState } from 'react';
import axios from 'axios';

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/v1/register', { email, password });
      onRegister(res.data); // onRegister fonksiyonunu çağırın ve yanıtı aktarın
      alert('Kayıt oldu!');
    } catch (err) {
      alert('Kayıt olurken bir hata oldu.');
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h2>Kayıt</h2>
        <form onSubmit={register}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" />
          <button type="submit">Kaydol</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
