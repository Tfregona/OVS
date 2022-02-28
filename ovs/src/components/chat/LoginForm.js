import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const projectID = "05cf186b-8339-4cd8-888e-b85674b2260a";

const Modal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [Cookies, setCookies] = useCookies(["chat", "username"])
  const handleSubmit = async (e) => {
    e.preventDefault();

    const authObject = { 'Project-ID': projectID, 'User-Name': username, 'User-Secret': password };

    try {
      await axios.get('https://api.chatengine.io/chats', { headers: authObject });

      setCookies('username', username);
      setCookies('chat', password);

      window.location.reload();
      setError('');
    } catch (err) {
      setError('Oops, Wrong user name or password.');
    }
  };

  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Chat Application</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder={Cookies.username} defaultValue={Cookies.username} required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
          <div align="center">
            <button type="submit" className="button">
              <span>Start chatting</span>
            </button>
          </div>
        </form>
        <h1>{error}</h1>
      </div>
    </div>

  );
};

export default Modal;