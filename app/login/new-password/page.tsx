import SetNewPass from "@/src/components/auth/setNewPassword";
import Image from "next/image";

export default function NewPasswordPage() {
  return (
    <div className="flex py-[50px] px-[60px] min-h-screen">
      {/* left section */}
      <div className="w-full md:w-1/2 flex flex-col justify-start gap-10 px-4 lg:px-[100px] xl:px-[160px]">
        <div className="hidden lg:block h-1/10"></div>
        <div>
          <Image src="/logo.png" alt="Logo" width={200} height={50} />
          <h1 className="text-4xl mt-5">Set a password</h1>
          <p className="text-lg ">
            Your previous password has been reseted. Please set a new password
            for your account.
          </p>
        </div>
        <SetNewPass />
      </div>
      {/* image section */}
      <div className="hidden min-[800px]:block relative min-[800px]:w-1/2 p-6">
        <Image
          src="/new-password.png"
          alt="new password photo"
          fill
          className="object-cover rounded-[12px]"
          priority
        />
      </div>
    </div>
  );
}
