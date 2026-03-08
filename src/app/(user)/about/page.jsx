"use client";
import useAuth from "@/app/hooks/useAuth";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const About = () => {
  const { user, userProfile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && userProfile.role === "admin") {
      router.push("/admin");
    }
  }, [user, userProfile, router]);

  return (
    <div>
      <Navbar />
      <div className="relative mt-20 md:mt-14">
        <Image
          src={"/assets/BG3.jpg"}
          width={1410 / 2}
          height={675 / 2}
          priority
          sizes="(max-width: 768px) 600px, 1410px"
          alt="about page"
          className="relative w-full h-[600px] md:h-screen object-cover object-center mx-auto"
        />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center flex flex-col gap-3">
          <h1 className="text-5xl font-extrabold text-gray-950">About</h1>
        </div>
      </div>
      <div className="p-8 md:p-24 flex flex-col gap-6 text-justify">
        <h2 className="font-bold text-3xl text-center md:text-left">VISI</h2>
        <p>
        Kami adalah perusahaan advertising yang percaya bahwa kreativitas dan teknologi kini tidak dapat dipisahkan. Dengan keahlian kami dalam branding visual yang dikombinasikan dengan pengetahuan luas tentang media luar ruang atau yang disebut OOH media, kami ingin membantu menavigasi untuk mengembangkan potensi brand Anda yang sebenarnya. . Kami telah bekerja dengan klien dari berbagai bidang seperti industri, makanan, mode, dll. Keragaman kami dalam latar belakang dan layanan klien memberi kami perspektif baru ketika menghadapi tantangan baru.
        </p>
        <h2 className="font-bold text-3xl text-center md:text-left">MISI</h2>
        <p>
        PT Tecma Miratama Advertindo memiliki sejumlah misi yang menjadi pilar strategis
          perusahaan.
          <br />
          <br />
          Misi pertama PT Tecma Miratama Advertindo adalah
          <br />
          - Mengedepankan kualitas
          <br />
          - Tenaga ahli dibidangnya
          <br /> 
          - Menyesuaikan permintaan klien
          <br />
          - Komunikatif
          <br />
          - Responsif
          <br />
          - Customer oriented
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default About;
