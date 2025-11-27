"use client";

// External dependencies
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

// Internal dependencies
import Button from "@/app/_ui/Button";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (resolvedTheme === "dark") {
    return (
      <Button onClick={() => setTheme("light")}>
        <SunIcon className="size-5" />
      </Button>
    );
  }

  if (resolvedTheme === "light") {
    return (
      <Button onClick={() => setTheme("dark")}>
        <MoonIcon className="size-5" />
      </Button>
    );
  }
}
