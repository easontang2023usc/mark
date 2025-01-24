import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {supabase} from "@/lib/supabaseClient"

export function InputWithButton() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.from("waitlist").insert({ emails: email });

      if (error) {
        setMessage("Something went wrong. Please try again.");
      } else {
        setMessage("Successfully signed up! 🎉");
        setEmail(""); // Clear the input field
      }
    } catch (err) {
      setMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const validateEmail = (email:string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="flex flex-col w-full max-w-sm items-center space-y-4">
      <div className="flex w-full items-center space-x-2">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        <Button
          type="button"
          onClick={handleSignup}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Join Waitlist"}
        </Button>
      </div>
      {message && <p className="text-sm text-center">{message}</p>}
    </div>
  );
}
