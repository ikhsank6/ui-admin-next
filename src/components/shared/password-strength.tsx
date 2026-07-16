"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { cn } from "@/utils/cn";

export type PasswordRule = {
  label: string;
  test: (value: string) => boolean;
};

export const PASSWORD_RULES: PasswordRule[] = [
  { label: "Minimal 12 karakter", test: (v) => v.length >= 12 },
  { label: "Mengandung huruf kecil dan besar", test: (v) => /[a-z]/.test(v) && /[A-Z]/.test(v) },
  { label: "Mengandung angka (0-9)", test: (v) => /[0-9]/.test(v) },
  { label: 'Mengandung simbol (!@#$%^&*(),.?":{}|<>)', test: (v) => /[^A-Za-z0-9]/.test(v) },
];

/** Zod schema derived from PASSWORD_RULES — keeps validation and the checklist UI in sync. */
export function passwordSchema(message = "Password belum memenuhi seluruh ketentuan") {
  return z.string().refine((value) => PASSWORD_RULES.every((rule) => rule.test(value)), {
    message,
  });
}

const iconVariants = {
  unmet: { scale: 1 },
  met: { scale: [1, 1.3, 1] },
};

function PasswordRuleItem({ rule, value }: { rule: PasswordRule; value: string }) {
  const met = rule.test(value);
  const reduceMotion = useReducedMotion();

  return (
    <li className="flex items-center gap-2 text-xs">
      <motion.span
        className="flex shrink-0"
        initial={false}
        animate={met ? "met" : "unmet"}
        variants={reduceMotion ? undefined : iconVariants}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <CheckCircle2
          className={cn(
            "h-3.5 w-3.5 transition-colors duration-300",
            met ? "text-green-500" : "text-muted-foreground/40"
          )}
        />
      </motion.span>
      <span
        className={cn(
          "transition-colors duration-300",
          met ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {rule.label}
      </span>
    </li>
  );
}

type PasswordStrengthProps = {
  value: string;
  className?: string;
};

/** Live checklist showing which password rules the current value satisfies. */
export function PasswordStrength({ value, className }: PasswordStrengthProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <p className="text-xs font-medium">Kata sandi harus memenuhi ketentuan berikut:</p>
      <ul className="flex flex-col gap-1">
        {PASSWORD_RULES.map((rule) => (
          <PasswordRuleItem key={rule.label} rule={rule} value={value} />
        ))}
      </ul>
    </div>
  );
}
