"use client";
import NavbarAdmin from "@/components/NavbarAdmin";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import NavbarHeadAdmin from "@/components/NavbarHeadAdmin";

const Admin = () => {
  const { user, userProfile } = useAuth();
  const router = useRouter();

  const [adminName, setAdminName] = useState("");
  useEffect(() => {
    if (user && userProfile.role === "user") {
      router.push("/");
    } else if (user && userProfile.role === "headadmin") {
      // Jika user adalah admin, kita dapat menampilkan alert selamat datang
      // dan menampilkan nama admin dari userProfile
      alert("Selamat datang, " + userProfile.name);
      setAdminName(userProfile.name);
    }
  }, [user, userProfile, router]);
  return (
    <div className="flex justify-center items-center h-screen">
      <NavbarHeadAdmin />
      <div className="flex flex-col items-center">
        <Image
          src={"/assets/pttecma.jpeg"}
          width={1000 / 2}
          height={1125 / 4}
          alt="Logo"
        />
        <h1 className="text-3xl">Welcome To Head Admin Page</h1>
        {adminName && <p>Admin: {adminName}</p>}
      </div>
    </div>
  );
};

export default Admin;
