"use client";
import React from "react";
import { usePrivy } from "@privy-io/react-auth";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const { logout } = usePrivy();

  return (
    <button
      onClick={() => logout()} 
      className="inline-flex items-center gap-2 px-4 py-2 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
    >
      <LogOut size={18} />
      <span>Logout</span>
    </button>
  );
}