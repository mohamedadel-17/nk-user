"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPassword() {
  // use state hook
  const [email, setEmail] = useState('');
  // const [err, setErr] = useState(""); // Todo: i will use it to check the inputs (use in Todo1)
  const [loading, setLoading] = useState(false);
  // use router hook
  const router = useRouter();

  //* handleChange function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  // handleChange function */

  //* handleSubmit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Todo1: Validate email is filled
      console.log("Sending data:", email);
      // Todo2: api
      //! for test
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push("/login/verify-code");
    } catch (error) {
      console.error("Forget password failed", error);
    } finally {
      setLoading(false);
    }
  };
  // end handleSubmit function */

  return (
    <form className="w-full max-w-lg" onSubmit={handleSubmit}>
      {/* email */}
      <Field className="gap-1">
        <FieldLabel htmlFor="form-email" className="text-lg mb-0">
          Email
        </FieldLabel>
        <Input
          className="input"
          id="email"
          type="email"
          placeholder="dulajr@gmail.com"
          required
          value={email}
          onChange={handleChange}
        />
        <FieldDescription></FieldDescription>
      </Field>

      {/* Submit Button */}
      <div className="flex justify-center items-center w-full mt-6">
        <Button
          className="w-1/2 submit_button cursor-pointer"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Submit"}
        </Button>
      </div>

      {/* Login with google */}
      <div className="text-center my-6">
        <span className="text-gray-400 text-lg font-medium">Or login with</span>
      </div>

      {/* Social Login Buttons */}
      <div className="flex justify-center items-center gap-4">
        <button
          type="button"
          className="flex justify-center items-center p-3 border border-gray-800 rounded-xl hover:bg-slate-800/50 cursor-pointer transition-all"
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
  );
}
