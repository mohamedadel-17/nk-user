"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import OtpInput from "@/src/components/auth/otpInput";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/src/hooks/api/useAuth";
import { toast } from "@/src/components/ui/toast";
import { ChevronLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function VerifyCodePage() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(60); // Resend OTP timer
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const { verifyOtp, sendOtp } = useAuth();

  // Get email from sessionStorage or URL params
  useEffect(() => {
    const storedEmail = sessionStorage.getItem('pendingEmail');
    const emailParam = searchParams.get('email');
    const userEmail = emailParam || storedEmail;
    
    if (userEmail) {
      setEmail(userEmail);
    } else {
      // No email found, redirect back to login
      toast.error('No email found. Please login again.');
      router.push('/login');
    }
  }, [router, searchParams]);

  // Auto-submit when OTP is complete (6 digits)
  useEffect(() => {
    if (otp.length === 6) {
      handleVerify();
    }
  }, [otp]);

  // Timer for resend OTP
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await verifyOtp({ email, otp });
      
      // Clear sessionStorage
      sessionStorage.removeItem('pendingEmail');
      
      toast.success('OTP verified successfully!');
      router.push('/');
    } catch (error: any) {
      console.error('OTP verification failed:', error);
      
      const errorMessage = error?.response?.data?.message || error?.message || 'Invalid OTP';
      setError(errorMessage);
      toast.error(errorMessage);
      
      // Clear OTP on error
      setOtp('');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (timeLeft > 0) return;

    setResending(true);
    setError('');

    try {
      await sendOtp({ email });
      toast.success('OTP resent to your email');
      setTimeLeft(60); // Reset timer
      setOtp(''); // Clear OTP input
    } catch (error: any) {
      console.error('Resend OTP failed:', error);
      
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to resend OTP';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setResending(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%2354F4FC&quot; fill-opacity=&quot;0.03&quot;%3E%3Ccircle cx=&quot;7&quot; cy=&quot;7&quot; r=&quot;7&quot;/%3E%3Ccircle cx=&quot;53&quot; cy=&quot;7&quot; r=&quot;7&quot;/%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;7&quot;/%3E%3Ccircle cx=&quot;7&quot; cy=&quot;53&quot; r=&quot;7&quot;/%3E%3Ccircle cx=&quot;53&quot; cy=&quot;53&quot; r=&quot;7&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left section - OTP Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-12 xl:p-16">
          <div className="w-full max-w-md">
            {/* Back button */}
            <div className="mb-6">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <ChevronLeft size={20} />
                Back to Login
              </Link>
            </div>

            {/* Logo and Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">NK Recovery</h2>
                  <p className="text-cyan-400 text-sm">Email Security Platform</p>
                </div>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-3">
                Verify Your Identity
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                We've sent a 6-digit code to your email
              </p>
              <p className="text-cyan-400 text-sm mt-2">
                {email}
              </p>
            </div>
            
            {/* OTP Form */}
            <div className="w-full max-w-lg bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
              <form onSubmit={(e) => { e.preventDefault(); handleVerify(); }}>
                {/* OTP Input */}
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  length={6}
                  label="Enter Verification Code"
                  description="Enter the 6-digit code sent to your email"
                  disabled={loading}
                  error={error}
                />

                {/* Verify Button */}
                <div className="flex justify-center items-center w-full mt-6">
                  <Button
                    className="submit_button w-full"
                    type="submit"
                    disabled={loading || otp.length !== 6}
                  >
                    {loading ? 'Verifying...' : 'Verify Code'}
                  </Button>
                </div>

                {/* Resend OTP */}
                <div className="flex justify-center items-center w-full mt-4">
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resending || timeLeft > 0}
                    className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RefreshCw size={16} className={resending ? 'animate-spin' : ''} />
                    {resending ? 'Sending...' : timeLeft > 0 ? `Resend in ${formatTime(timeLeft)}` : 'Resend Code'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Right section - Image */}
        <div className="hidden min-[800px]:block relative min-[800px]:w-1/2">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-blue-800/20 backdrop-blur-sm"></div>
          <div className="relative h-full flex items-center justify-center p-8">
            <div className="relative w-full max-w-lg">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-3xl"></div>
              
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src="/verify-code.png"
                  alt="Email Verification"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>
              
              {/* Floating stats cards */}
              <div className="absolute top-8 -right-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">2FA</div>
                  <div className="text-xs text-gray-300">Enhanced Security</div>
                </div>
              </div>
              
              <div className="absolute bottom-8 -left-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">60s</div>
                  <div className="text-xs text-gray-300">Code Validity</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
