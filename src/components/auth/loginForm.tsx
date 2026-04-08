"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/src/hooks/api/useAuth";
import { toast } from "@/src/components/ui/toast";

export default function LoginForm() {
  // use state hook
  const [showPassword, setShowPassword] = useState(false);
  const [authMethod, setAuthMethod] = useState<'email' | 'otp'>('email');
  const [otpSent, setOtpSent] = useState(false);
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
    remember: true,
  });
  
  // use router and auth hooks
  const router = useRouter();
  const { 
    login, 
    loginLoading, 
    loginError,
    googleLogin, 
    googleLoginLoading,
    sendOtp,
    sendOtpLoading,
    loginWithOtp,
    loginWithOtpLoading
  } = useAuth();

  //* handleChange function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };
  // handleChange function */

  //* handleSubmit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (authMethod === 'email') {
        // Email/Password login
        if (!formData.email || !formData.password) {
          toast.error('Please fill in all fields');
          return;
        }

        // Step 1: Login with email/password
        const loginResponse = await login({
          email: formData.email,
          password: formData.password,
        });
        
        // Check if verification is required
        if (loginResponse.data?.requiresVerification) {
          // Display server message
          const serverMessage = loginResponse.message || 'يرجى التحقق من بريدك الإلكتروني للحصول على رمز التحقق لإكمال تسجيل الدخول الأول.';
          toast.success(serverMessage);
          
          // Store pending email for OTP verification
          setPendingEmail(formData.email);
          sessionStorage.setItem('pendingEmail', formData.email);
          
          // Redirect to OTP verification page
          router.push('/login/verify-code');
        } else {
          // Direct login successful
          const serverMessage = loginResponse.message || 'Login successful!';
          toast.success(serverMessage);
          
          // Redirect to dashboard
          router.push('/');
        }
      } else if (authMethod === 'otp') {
        if (!otpSent) {
          // Send OTP first
          if (!formData.email) {
            toast.error('Please enter your email address');
            return;
          }

          await sendOtp({ email: formData.email });
          setOtpSent(true);
          toast.success('OTP sent to your email');
        } else {
          // Login with OTP
          if (!formData.otp) {
            toast.error('Please enter the OTP');
            return;
          }

          const otpLoginResponse = await loginWithOtp({
            email: formData.email,
            otp: formData.otp,
          });
          
          const serverMessage = otpLoginResponse.message || 'Login successful!';
          toast.success(serverMessage);
          router.push('/');
        }
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      
      // Print server error response for debugging
      if (error?.response?.data) {
        console.log('Server Error Response:', error.response.data);
      }
      
      // Extract server error details
      const serverError = error?.response?.data ? {
        statusCode: error.response.data.statusCode || error.response.status || 400,
        message: error.response.data.message || 'Login failed',
        error: error.response.data.error || 'Bad Request'
      } : undefined;
      
      const errorMessage = error?.response?.data?.message || error?.message || 'Login failed';
      toast.error(errorMessage, undefined, serverError);
    }
  };

  // Handle Google OAuth login
  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.loading('Redirecting to Google...');
    } catch (error: any) {
      console.error('Google login failed:', error);
      
      // Print server error response for debugging
      if (error?.response?.data) {
        console.log('Server Error Response:', error.response.data);
      }
      
      // Extract server error details
      const serverError = error?.response?.data ? {
        statusCode: error.response.data.statusCode || error.response.status || 400,
        message: error.response.data.message || 'Google login failed',
        error: error.response.data.error || 'Bad Request'
      } : undefined;
      
      const errorMessage = error?.response?.data?.message || error?.message || 'Google login failed';
      toast.error(errorMessage, undefined, serverError);
    }
  };

  // Switch between auth methods
  const switchAuthMethod = (method: 'email' | 'otp') => {
    setAuthMethod(method);
    setOtpSent(false);
    setFormData(prev => ({ ...prev, otp: '' }));
  };
  // end handleSubmit function */

  return (
    <div className="w-full max-w-lg bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
      <form onSubmit={handleSubmit}>
      {/* Auth Method Selector */}
      <div className="flex gap-2 mb-6">
        <Button
          type="button"
          variant={authMethod === 'email' ? 'default' : 'outline'}
          className={`flex-1 h-12 rounded-xl font-medium transition-all ${
            authMethod === 'email' 
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25' 
              : 'bg-white/5 border border-white/20 text-white hover:bg-white/10'
          }`}
          onClick={() => switchAuthMethod('email')}
        >
          Email & Password
        </Button>
        <Button
          type="button"
          variant={authMethod === 'otp' ? 'default' : 'outline'}
          className={`flex-1 h-12 rounded-xl font-medium transition-all ${
            authMethod === 'otp' 
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25' 
              : 'bg-white/5 border border-white/20 text-white hover:bg-white/10'
          }`}
          onClick={() => switchAuthMethod('otp')}
        >
          OTP Login
        </Button>
      </div>

      {/* email */}
      <Field className="gap-1 mb-4">
        <FieldLabel htmlFor="email" className="text-white text-lg font-medium mb-2">
          Email
        </FieldLabel>
        <Input
          className="input"
          id="email"
          type="email"
          placeholder="Enter your email address"
          required
          value={formData.email}
          onChange={handleChange}
          disabled={authMethod === 'otp' && otpSent}
        />
        <FieldDescription className="text-gray-400 text-xs mt-1"></FieldDescription>
      </Field>

      {/* password - only show for email auth */}
      {authMethod === 'email' && (
        <Field className="mb-4 gap-1">
          <FieldLabel htmlFor="password" className="text-white text-lg font-medium mb-2">
            Password
          </FieldLabel>
          <div className="relative w-full">
            <Input
              className="input"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors"
            >
              {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <FieldDescription className="text-gray-400 text-xs mt-1">
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>
      )}

      {/* OTP field - only show for OTP auth after OTP is sent */}
      {authMethod === 'otp' && otpSent && (
        <Field className="mb-4 gap-1">
          <FieldLabel htmlFor="otp" className="text-white text-lg font-medium mb-2">
            Enter OTP
          </FieldLabel>
          <Input
            className="input"
            id="otp"
            type="text"
            placeholder="Enter 6-digit code"
            required
            value={formData.otp}
            onChange={handleChange}
            maxLength={6}
          />
          <FieldDescription className="text-gray-400 text-xs mt-1">
            Enter the 6-digit code sent to your email.
          </FieldDescription>
        </Field>
      )}
      {/* remember me & forget password section - only show for email auth */}
      {authMethod === 'email' && (
        <div className="flex justify-between items-center mb-6">
          {/* remember me */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              name="remember"
              checked={formData.remember}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, remember: !!checked }))
              }
              className="w-4 h-4 border-white/20 bg-white/10"
            />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300 cursor-pointer hover:text-white transition-colors"
            >
              Remember me
            </label>
          </div>
          {/* forgot password button */}
          <Link
            href="/login/forgot-password"
            className="text-sm font-medium text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
          >
            Forgot Password?
          </Link>
        </div>
      )}

      {/* Login Button */}
      <div className="flex justify-center items-center w-full mb-6">
        <Button
          className="submit_button w-full"
          type="submit"
          disabled={loginLoading || sendOtpLoading || loginWithOtpLoading}
        >
          {loginLoading || sendOtpLoading || loginWithOtpLoading
            ? authMethod === 'otp' && !otpSent
              ? 'Sending OTP...'
              : authMethod === 'otp' && otpSent
              ? 'Verifying OTP...'
              : 'Logging in...'
            : authMethod === 'otp' && !otpSent
            ? 'Send OTP'
            : 'Sign In'
          }
        </Button>
      </div>

      {/* Sign up link */}
      <p className="text-center text-sm text-gray-400 mb-6">
        Don't have an account?{" "}
        <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors font-medium">
          Sign up
        </Link>
      </p>

      {/* Divider */}
      <div className="text-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-transparent text-gray-400">Or continue with</span>
          </div>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="flex justify-center items-center">
        <button
          type="button"
          className="flex justify-center items-center p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleGoogleLogin}
          disabled={googleLoginLoading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="#a16054"
          >
            <path d="M21.456 10.154c.123.659.19 1.348.19 2.067c0 5.624-3.764 9.623-9.449 9.623A9.84 9.84 0 0 1 2.353 12a9.84 9.84 0 0 1 9.844-9.844c2.658 0 4.879.978 6.583 2.566l-2.775 2.775V7.49c-1.033-.984-2.344-1.489-3.808-1.489c-3.248 0-5.888 2.744-5.888 5.993s2.64 5.999 5.888 5.999c2.947 0 4.953-1.686 5.365-4h-5.365v-3.839z" />
          </svg>
        </button>
      </div>
      </form>
    </div>
  );
}
