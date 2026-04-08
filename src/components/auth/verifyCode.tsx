"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/src/hooks/api/useAuth";
import { toast } from "@/src/components/ui/toast";

export default function VerifyCode() {
  // use state hook
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  
  // use router and auth hooks
  const router = useRouter();
  const { verifyOtp, verifyOtpLoading } = useAuth();

  // Get email from sessionStorage on component mount
  useEffect(() => {
    const pendingEmail = sessionStorage.getItem('pendingEmail');
    if (pendingEmail) {
      setEmail(pendingEmail);
    } else {
      // If no email found, redirect back to login
      toast.error('No email found for verification. Please login again.');
      router.push('/login');
    }
  }, [router]);

  //* handleChange function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 6) {
      setCode(e.target.value);
    }
  };

  useEffect(() => {
    if (code.length === 6) {
      handleVerify();
    }
  }, [code]);
  
  //* handleSubmit function
  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!email) {
      toast.error('No email found for verification');
      return;
    }
    
    if (code.length !== 6) {
      toast.error('Please enter a valid 6-digit code');
      return;
    }
    
    setLoading(true);

    try {
      const verifyResponse = await verifyOtp({
        email: email,
        otp: code,
      });
      
      // Display server message
      const serverMessage = verifyResponse.message || 'Verification successful!';
      toast.success(serverMessage);
      
      // Clear pending email from sessionStorage
      sessionStorage.removeItem('pendingEmail');
      
      // Redirect to dashboard
      router.push('/');
    } catch (error: any) {
      console.error("OTP verification failed", error);
      
      // Print server error response for debugging
      if (error?.response?.data) {
        console.log('Server Error Response:', error.response.data);
      }
      
      // Extract server error details
      const serverError = error?.response?.data ? {
        statusCode: error.response.data.statusCode || error.response.status || 400,
        message: error.response.data.message || 'Verification failed',
        error: error.response.data.error || 'Bad Request'
      } : undefined;
      
      const errorMessage = error?.response?.data?.message || error?.message || 'Verification failed';
      toast.error(errorMessage, undefined, serverError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full max-w-lg" onSubmit={handleVerify}>
      {/* Email Display */}
      <Field className="gap-1 mb-4">
        <FieldLabel className="text-lg mb-2 text-white">
          Verification Code
        </FieldLabel>
        <FieldDescription className="text-gray-400 text-sm">
          Enter the 6-digit code sent to: <span className="text-cyan-400 font-medium">{email}</span>
        </FieldDescription>
      </Field>

      {/* Enter Code */}
      <Field className="gap-1 mb-6">
        <FieldLabel htmlFor="verify-code" className="text-white text-lg font-medium mb-2">
          Enter Code
        </FieldLabel>
        <Input
          className="input text-center text-xl font-mono"
          id="verify-code"
          type="text"
          placeholder="000000"
          required
          value={code}
          onChange={handleChange}
          maxLength={6}
          disabled={loading || verifyOtpLoading}
        />
        <FieldDescription className="text-gray-400 text-xs mt-1">
          Enter the 6-digit verification code from your email.
        </FieldDescription>
      </Field>

      {/* Submit Button */}
      <div className="flex justify-center items-center w-full">
        <Button
          className="w-full submit_button cursor-pointer"
          type="submit"
          disabled={loading || verifyOtpLoading || code.length !== 6}
        >
          {loading || verifyOtpLoading ? "Verifying..." : "Verify Code"}
        </Button>
      </div>
    </form>
  );
}
