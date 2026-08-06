import React from "react";
import UserNavbar from "../../components/layout/UserNavbar";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#133C55]">
      <UserNavbar />
      <main className="pt-28 px-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-4">User Profile</h1>
        <p className="text-[#386FA4]">Profile Page - Placeholder file.</p>
      </main>
    </div>
  );
}

