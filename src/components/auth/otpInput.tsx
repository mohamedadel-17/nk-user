"use client";
import { useEffect, useRef, useState } from "react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  className?: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  error?: string;
}

export default function OtpInput({
  value,
  onChange,
  length = 6,
  className = "",
  label,
  description,
  disabled = false,
  error,
}: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  // Initialize input refs
  useEffect(() => {
    inputRefs.current = Array(length).fill(null).map(() => null);
  }, [length]);

  // Handle input change
  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Only allow numbers
    if (!/^\d*$/.test(newValue)) return;
    
    // Update the value array
    const valueArray = value.split('');
    valueArray[index] = newValue.slice(-1); // Take only the last character
    const newOtpValue = valueArray.join('');
    
    onChange(newOtpValue);
    
    // Auto-focus next input if current input is filled
    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle key down events
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (!value[index] && index > 0) {
        // If current input is empty, move to previous input
        inputRefs.current[index - 1]?.focus();
        const valueArray = value.split('');
        valueArray[index - 1] = '';
        onChange(valueArray.join(''));
      } else {
        // Clear current input
        const valueArray = value.split('');
        valueArray[index] = '';
        onChange(valueArray.join(''));
      }
    }
    
    // Handle arrow keys
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    
    // Handle paste
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      // Paste will be handled by the onPaste event
    }
  };

  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    // Filter only numbers and limit to length
    const numbersOnly = pastedData.replace(/\D/g, '').slice(0, length);
    
    if (numbersOnly) {
      onChange(numbersOnly);
      
      // Focus the next empty input or the last input if all are filled
      const nextEmptyIndex = numbersOnly.length;
      if (nextEmptyIndex < length) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else {
        inputRefs.current[length - 1]?.focus();
      }
    }
  };

  // Handle focus
  const handleFocus = (index: number) => {
    setFocusedIndex(index);
    // Select all text in the input
    setTimeout(() => {
      inputRefs.current[index]?.select();
    }, 0);
  };

  // Handle blur
  const handleBlur = () => {
    setFocusedIndex(-1);
  };

  return (
    <Field className={`gap-2 ${className}`}>
      {label && (
        <FieldLabel className="text-white text-lg font-medium mb-2">
          {label}
        </FieldLabel>
      )}
      
      <div className="flex gap-2 justify-center">
        {Array.from({ length }, (_, index) => (
          <Input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={value[index] || ''}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            disabled={disabled}
            className={`w-12 h-12 text-center text-lg font-semibold border-2 transition-all ${
              error
                ? 'border-red-500 bg-red-500/10 text-red-400'
                : focusedIndex === index
                ? 'border-cyan-400 bg-cyan-400/10 text-cyan-400'
                : 'border-white/20 bg-white/5 text-white hover:border-white/30'
            } ${
              disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
            autoComplete="off"
          />
        ))}
      </div>
      
      {description && (
        <FieldDescription className="text-gray-400 text-xs mt-2 text-center">
          {description}
        </FieldDescription>
      )}
      
      {error && (
        <FieldDescription className="text-red-400 text-xs mt-2 text-center">
          {error}
        </FieldDescription>
      )}
    </Field>
  );
}
