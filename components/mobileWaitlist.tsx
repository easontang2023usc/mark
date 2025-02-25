'use client'

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface MobileWaitlistProps {
  onSuccess?: () => void;
}

export function MobileWaitlist({ onSuccess }: MobileWaitlistProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Handle body scroll lock when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  
  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full bg-[#FB6839] text-white px-5 py-3 rounded-full text-sm font-satoshi uppercase tracking-wide transition duration-300 hover:bg-[#D4502A]"
      >
        Join Waitlist
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsOpen(false)}>
          <div 
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 transition-transform duration-300 transform translate-y-0"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Join the Waitlist</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100"
                aria-label="Close waitlist form"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              We&apos;re excited to learn more about what you&apos;re reading! Join our waitlist to stay updated.
            </p>
            <MobileWaitlistForm 
              onSuccess={() => {
                setTimeout(() => setIsOpen(false), 2000);
                onSuccess?.();
              }} 
            />
            <div className="w-16 h-1 bg-gray-300 rounded-full mx-auto mt-6"></div>
          </div>
        </div>
      )}
    </>
  );
}

function MobileWaitlistForm({ onSuccess }: MobileWaitlistProps) {
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
        className={`p-5 rounded-xl ${errors.first_name ? "border-red-500" : "border-gray-200"}`}
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
        className={`p-5 rounded-xl ${errors.email ? "border-red-500" : "border-gray-200"}`}
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
        className="p-5 rounded-xl border-gray-200"
      />

      <Button
        type="button"
        onClick={handleSubmit}
        disabled={isLoading}
        className={`w-full p-5 mt-4 text-white rounded-xl transition-colors duration-300 ${
          isFormValid 
            ? "bg-[#FB6839] hover:bg-[#D4502A]" 
            : "bg-gray-400 hover:bg-gray-500"
        }`}
      >
        {isLoading ? "Submitting..." : "Join Waitlist"}
      </Button>

      {message && (
        <p className={`text-sm text-center mt-2 ${message.includes("Successfully") ? "text-green-600" : "text-red-500"}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default MobileWaitlist;