import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/v1/login', { email, password });
      onLogin(res.data); // onLogin fonksiyonunu çağırın ve yanıtı aktarın
      alert('Giriş başarılı!');
    } catch (err) {
      alert('Giriş yapılırken bir hata oluştu.');
    }
  };
  
  return (
    <div className="container">
      <div className="form-wrapper">
        <h2>Giriş</h2>
        <form onSubmit={login}>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" />
          <button type="submit">Giriş Yapın</button>
        </form>
      </div>
    </div>
  );
}
  
  export default Login;
  
