'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AuthPage() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);

  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Register State
  const [registerData, setRegisterData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Toggle
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setLoginError('');
    setRegisterError('');
    setRegisterSuccess('');
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoginLoading(true);
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    setLoginLoading(false);
    if (res?.error) {
      setLoginError('Invalid email or password');
    } else {
      router.push('/');
    }
  };

  const handleRegisterChange = (e: any) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setRegisterError('');
    setRegisterSuccess('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });

      const data = await res.json();
      if (!res.ok) {
        setRegisterError(data.message || 'Something went wrong');
      } else {
        setRegisterSuccess('Account created! Redirecting...');
        setTimeout(() => setIsLogin(true), 2000);
      }
    } catch (err) {
      setRegisterError('Something went wrong. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f2c] px-4">
      <div className="bg-[#1e293b] w-full max-w-md p-8 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setIsLogin(true)}
            className={`text-sm font-medium px-4 py-2 rounded-full transition ${
              isLogin ? 'bg-blue-600 text-white' : 'text-blue-400'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`text-sm font-medium px-4 py-2 rounded-full transition ${
              !isLogin ? 'bg-blue-600 text-white' : 'text-blue-400'
            }`}
          >
            Register
          </button>
        </div>

        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.form
              key="login"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleLogin}
              className="space-y-4"
            >
              <h2 className="text-2xl text-white text-center mb-4 font-bold">
                Login
              </h2>

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-[#0f172a] text-white rounded-md outline-none"
                required
              />

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 bg-[#0f172a] text-white rounded-md pr-10 outline-none"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-blue-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>

              {loginError && (
                <p className="text-red-400 text-sm text-center">{loginError}</p>
              )}

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
              >
                {loginLoading ? 'Logging in...' : 'Login'}
              </button>
            </motion.form>
          ) : (
            <motion.form
              key="register"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleRegister}
              className="space-y-4"
            >
              <h2 className="text-2xl text-white text-center mb-4 font-bold">
                Register
              </h2>

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={registerData.name}
                onChange={handleRegisterChange}
                className="w-full p-3 bg-[#0f172a] text-white rounded-md outline-none"
                required
              />

              <input
                type="text"
                name="username"
                placeholder="Username"
                value={registerData.username}
                onChange={handleRegisterChange}
                className="w-full p-3 bg-[#0f172a] text-white rounded-md outline-none"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={registerData.email}
                onChange={handleRegisterChange}
                className="w-full p-3 bg-[#0f172a] text-white rounded-md outline-none"
                required
              />

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  className="w-full p-3 bg-[#0f172a] text-white rounded-md pr-10 outline-none"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-blue-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>

              {registerError && (
                <p className="text-red-400 text-sm text-center">{registerError}</p>
              )}
              {registerSuccess && (
                <p className="text-green-400 text-sm text-center">{registerSuccess}</p>
              )}

              <button
                type="submit"
                className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
              >
                Create Account
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
