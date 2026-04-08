import ForgotPassword from "@/src/components/auth/forgotPassword";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="flex py-[50px] px-[60px] min-h-screen">
      {/* left section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center gap-10 px-4 lg:px-[100px] xl:px-[160px]">
        <div>
          <Image src="/logo.png" alt="Logo" width={200} height={50} />
          {/* back to login button */}
          <Link href="/login" className="flex items-center mt-2 text-gray-500">
            <ChevronLeft className="w-4 h-4" />
            Back to login
          </Link>
          <h1 className="text-4xl mt-5">Forgot your password?</h1>
          <p className="text-lg">
            Don’t worry, happens to all of us. Enter your email below to recover
            your password
          </p>
        </div>
        <ForgotPassword />
      </div>
      {/* image section */}
      <div className="hidden min-[800px]:block relative min-[800px]:w-1/2 p-6">
        <Image
          src="/forgot-password.png"
          alt="forgot password photo"
          fill
          className="object-cover rounded-[12px]"
          priority
        />
      </div>
    </div>
  );
}
