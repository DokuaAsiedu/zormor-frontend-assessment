import Image from "next/image";
import NextLogo from "@/public/next.svg";

export function Navbar() {
  return (
    <div className="container flex flex-row items-center justify-start">
      <Image src={NextLogo} alt="app logo" width={64} />

      <button className="ms-auto p-2 bg-blue-800 text-white rounded-md">Add New Place</button>
    </div>
  );
}
