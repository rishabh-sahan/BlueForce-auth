import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../client';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [checkingProfile, setCheckingProfile] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    // Remove dependency on navigate to avoid unnecessary rerenders
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      setCheckingProfile(true);

      // Wait for Supabase session to be available
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setCheckingProfile(false);
        alert('Login failed: No user session found.');
        return;
      }

      // Fetch profile from Supabase
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      setCheckingProfile(false);

      if (profile) {
        navigate('/home', { replace: true });
      } else {
        navigate('/individual-profile', { replace: true });
      }
    } catch (err) {
      setCheckingProfile(false);
      console.error('Login error:', err);
      // Optionally show an error message to the user
    }
  };

  if (checkingProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-12"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden"
        >
          <motion.div 
            initial={{ background: "linear-gradient(to right, #2563eb, #4f46e5)" }}
            animate={{ background: "linear-gradient(to right, #1e40af, #4338ca)" }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            className="py-4 px-6"
          >
            <h2 className="text-2xl font-bold text-white">{t('auth.login')}</h2>
          </motion.div>
          
          <div className="p-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 bg-red-50 text-red-600 p-3 rounded-md text-sm"
              >
                {error}
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  {t('auth.email')}
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-gray-700 font-medium">
                    {t('auth.password')}
                  </label>
                  <Link to="#" className="text-sm text-blue-600 hover:underline">
                    {t('auth.forgotPassword')}
                  </Link>
                </div>
                <div className="relative">
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={`w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md flex items-center justify-center ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                disabled={loading}
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <LogIn className="h-5 w-5 mr-2" />
                )}
                {loading ? 'Logging in...' : t('auth.login')}
              </motion.button>
            </form>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-center"
            >
              <p className="text-gray-600">
                {t('auth.noAccount')}{' '}
                <Link to="/register" className="text-blue-600 hover:underline font-medium">
                  {t('auth.register')}
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;
