"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function SetNewPass() {
  // use state hook
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
      password: "",
      rePassword: "",
  });
  // const [err, setErr] = useState(""); // Todo: i will use it to check the inputs (use in Todo1)
  const [loading, setLoading] = useState(false);
  // use router hook
//   const router = useRouter();

  //* handleChange function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  // handleChange function */

  //* handleSubmit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Todo1: Validate that all fields are filled
      console.log("Sending data:", formData);
      // Todo2: api
      // for test
      await new Promise((resolve) => setTimeout(resolve, 2000));
    //   router.push("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }

    // login(emailValue, data);
  };
  // end handleSubmit function */

  return (
    <form className="w-full max-w-lg" onSubmit={handleSubmit}>
      {/* new password */}
      <Field className="my-2 gap-1">
        <FieldLabel htmlFor="password" className="text-lg">
          New Password
        </FieldLabel>
        <div className="relative w-full">
          <Input
            className="input"
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
            // className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--brand)] hover:text-white cursor-pointer"
          >
            {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <FieldDescription className="text-xs">
          Must be at least 8 characters long.
        </FieldDescription>
      </Field>
      {/* re-enter password */}
      <Field className="my-2 gap-1">
        <FieldLabel htmlFor="password" className="text-lg">
          Re-enter Password
        </FieldLabel>
        <div className="relative w-full">
          <Input
            className="input"
            id="rePassword"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            required
            value={formData.rePassword}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
            // className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--brand)] hover:text-white cursor-pointer"
          >
            {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <FieldDescription className="text-xs">
          Must be at least 8 characters long.
        </FieldDescription>
      </Field>

      {/* Login Button */}
      <div className="flex justify-center items-center w-full mt-6">
        <Button
          className="w-1/2 submit_button cursor-pointer"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Set Password"}
        </Button>
      </div>
    </form>
  );
}
