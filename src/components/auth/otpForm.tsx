'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Field, FieldLabel, FieldDescription } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/src/hooks/api/useAuth';
import { toast } from '@/src/components/ui/toast';

interface OtpFormProps {
  email: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function OtpForm({ email, onSuccess, onCancel }: OtpFormProps) {
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();
  
  const { 
    loginWithOtp, 
    loginWithOtpLoading,
    verifyOtp,
    verifyOtpLoading,
    resendOtp,
    resendOtpLoading
  } = useAuth();

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    setOtp(value);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    try {
      await loginWithOtp({
        email,
        otp,
      });
      
      toast.success('Login successful!');
      onSuccess?.();
      router.push('/');
    } catch (error: any) {
      console.error('OTP verification failed:', error);
      const errorMessage = error?.response?.data?.message || error?.message || 'OTP verification failed';
      toast.error(errorMessage);
    }
  };

  const handleResendOtp = async () => {
    try {
      await resendOtp({
        email,
        type: 'login',
      });
      
      toast.success('OTP resent to your email');
      setTimeLeft(300); // Reset timer to 5 minutes
      setCanResend(false);
      setOtp(''); // Clear OTP input
    } catch (error: any) {
      console.error('Resend OTP failed:', error);
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to resend OTP';
      toast.error(errorMessage);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Verify Your Email</h2>
        <p className="text-gray-400">
          We've sent a 6-digit code to {email}
        </p>
      </div>

      <form onSubmit={handleVerifyOtp} className="space-y-6">
        {/* OTP Input */}
        <Field className="gap-1">
          <FieldLabel htmlFor="otp" className="text-lg">
            Enter OTP Code
          </FieldLabel>
          <Input
            id="otp"
            type="text"
            placeholder="123456"
            value={otp}
            onChange={handleOtpChange}
            maxLength={6}
            className="text-center text-xl font-mono"
            disabled={loginWithOtpLoading || verifyOtpLoading}
            autoFocus
          />
          <FieldDescription className="text-xs text-center">
            Enter the 6-digit code sent to your email
          </FieldDescription>
        </Field>

        {/* Timer and Resend */}
        <div className="text-center">
          {timeLeft > 0 ? (
            <p className="text-sm text-gray-400">
              Resend code in <span className="font-mono text-cyan-400">{formatTime(timeLeft)}</span>
            </p>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={handleResendOtp}
              disabled={resendOtpLoading}
              className="text-cyan-400 border-cyan-400 hover:bg-cyan-400 hover:text-black"
            >
              {resendOtpLoading ? 'Sending...' : 'Resend Code'}
            </Button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loginWithOtpLoading || verifyOtpLoading}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={otp.length !== 6 || loginWithOtpLoading || verifyOtpLoading}
            className="flex-1"
          >
            {loginWithOtpLoading || verifyOtpLoading ? 'Verifying...' : 'Verify & Login'}
          </Button>
        </div>
      </form>

      {/* Help Text */}
      <div className="mt-6 p-4 bg-gray-800 rounded-lg">
        <p className="text-sm text-gray-400 text-center">
          <strong>Didn't receive the code?</strong> Check your spam folder or 
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={!canResend || resendOtpLoading}
            className="text-cyan-400 hover:underline ml-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {canResend ? 'request a new one' : 'wait for the timer'}
          </button>
        </p>
      </div>
    </div>
  );
}
