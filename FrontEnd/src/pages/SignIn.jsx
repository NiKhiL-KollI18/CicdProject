import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignIn.css';
import { signup, login } from '../api';

const SignIn = ({ onSignIn }) => {
  const [showConfirmGuest, setShowConfirmGuest] = useState(false);
  const [showPopup, setShowPopup] = useState('signin'); // 'signin' or 'signup'
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // used for login
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  // LOGIN
  const handleSignIn = async () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      const response = await login({ email, password }); // send email, not username
      if (response?.status === 'success') {
        onSignIn({ email }); // you can also send username if needed
        navigate('/dashboard');
      } else {
        alert(response?.message || 'Signin failed!');
      }
    } catch (err) {
      alert('Error logging in: ' + err.message);
    }
  };

  // SIGNUP
  const handleRegistration = async () => {
    if (!username || !email || !password || !confirmPassword) {
      alert('Please fill out all fields.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await signup({ username, email, password });
      if (response?.status === 'success') {
        alert('Registration successful! Please log in.');
        setShowPopup('signin');
      } else {
        alert(response?.message || 'Signup failed!');
      }
    } catch (err) {
      alert('Error signing up: ' + err.message);
    }
  };

  return (
    <div id="Container">
      {showConfirmGuest && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <p>Are you sure you want to continue as a Guest?</p>
            <div className="confirm-buttons">
              <button
                onClick={() => {
                  onSignIn({ username: 'Guest' });
                  navigate('/dashboard');
                }}
              >
                Yes, Continue
              </button>
              <button onClick={() => setShowConfirmGuest(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div id="popup" className="show">
        <div id="popupWindow">
          {/* Header Social Icons */}
          <div id="popupheader">
            <div className="google"><i className="fa-brands fa-google"></i></div>
            <div className="facebook"><i className="fa-brands fa-facebook"></i></div>
            <div className="twitter"><i className="fa-brands fa-twitter"></i></div>
            <div className="linkedin"><i className="fa-brands fa-linkedin"></i></div>
            <div className="apple"><i className="fa-brands fa-apple"></i></div>
          </div>

          {/* Divider */}
          <div id="popupcontainer">
            <div className="popupdivider"></div>
            <div id="popupdivider2">Or</div>
            <div className="popupdivider"></div>
          </div>

          {/* Sign In Form */}
          {showPopup === 'signin' && (
            <div id="signin">
              <label className="emaillable">Email</label>
              <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <label className="passwordlable">Password</label>
              <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button className="signinbutton" onClick={handleSignIn}>Sign In</button>
              <div className="div2">
                Don't have an account? <label onClick={() => setShowPopup('signup')}>Sign Up Now</label>
              </div>
              <div className="div4">
                <button className="guestbutton" onClick={() => setShowConfirmGuest(true)}>
                  <i className="fa-regular fa-user"></i> Guest User
                </button>
              </div>
            </div>
          )}

          {/* Sign Up Form */}
          {showPopup === 'signup' && (
            <div id="signup">
              <label className="usernamelable">User Name</label>
              <input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <label className="emaillable">Email</label>
              <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <label className="passwordlable">Password</label>
              <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <label className="passwordlable">Confirm Password</label>
              <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              <button className="signinbutton" onClick={handleRegistration}>Register</button>
              <div className="div2">
                Already have an account? <label onClick={() => setShowPopup('signin')}>Sign In</label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
