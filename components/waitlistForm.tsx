import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/lib/supabaseClient";

interface WaitlistFormProps {
  onSuccess?: () => void;
}

export function WaitlistDialog() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="bg-[#FB6839] text-white px-5 py-2 rounded-full text-sm font-satoshi uppercase tracking-wide transition duration-300 hover:bg-[#D4502A]">
          Join Waitlist
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-4xl font-bold">Join the Waitlist</DialogTitle>
          <p className="text-gray-600">
            We&apos;re excited to learn more about what you&apos;re reading! Join our waitlist to stay updated.
          </p>
        </DialogHeader>
        <WaitlistForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    book: ""
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    first_name: ""
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      email: !formData.email 
        ? "Email is required" 
        : !validateEmail(formData.email) 
        ? "Please enter a valid email address"
        : "",
      first_name: !formData.first_name 
        ? "First name is required" 
        : ""
    };

    setErrors(newErrors);
    return !newErrors.email && !newErrors.first_name;
  };

  // Add a new useMemo hook to check if form is valid
  const isFormValid = useMemo(() => {
    return formData.first_name.trim() !== "" && 
           formData.email.trim() !== "" && 
           validateEmail(formData.email);
  }, [formData.first_name, formData.email]);

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const { error } = await supabase
        .from("waitlist_more_input")
        .insert({
          first_name: formData.first_name,
          email: formData.email,
          book: formData.book || null
        });

      if (error) {
        setMessage("Something went wrong. Please try again.");
      } else {
        setMessage("Successfully signed up! 🎉");
        setFormData({ email: "", first_name: "", book: "" });
        setTimeout(() => {
          onSuccess?.();
        }, 2000);
      }
    } catch {
      setMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  return (
    <div className="space-y-4">
      <Input
        type="text"
        name="first_name"
        placeholder="First Name*"
        value={formData.first_name}
        onChange={handleChange}
        disabled={isLoading}
        className={`p-6 ${errors.first_name ? "border-red-500" : "border-gray-200"}`}
      />
      {errors.first_name && (
        <p className="text-sm text-red-500 mt-1">{errors.first_name}</p>
      )}

      <Input
        type="email"
        name="email"
        placeholder="Email Address*"
        value={formData.email}
        onChange={handleChange}
        disabled={isLoading}
        className={`p-6 ${errors.email ? "border-red-500" : "border-gray-200"}`}
      />
      {errors.email && (
        <p className="text-sm text-red-500 mt-1">{errors.email}</p>
      )}

      <Input
        type="text"
        name="book"
        placeholder="What book are you currently reading? (Optional)"
        value={formData.book}
        onChange={handleChange}
        disabled={isLoading}
        className="p-6 border-gray-200"
      />

      <Button
        type="button"
        onClick={handleSubmit}
        disabled={isLoading}
        className={`w-full p-6 mt-4 text-white transition-colors duration-300 ${
          isFormValid 
            ? "bg-[#FB6839] hover:bg-[#D4502A]" 
            : "bg-gray-400 hover:bg-gray-500"
        }`}
      >
        {isLoading ? "Submitting..." : "Join Waitlist"}
      </Button>

      {message && (
        <p className="text-sm text-center mt-2">{message}</p>
      )}
    </div>
  );
}

export default WaitlistDialog;