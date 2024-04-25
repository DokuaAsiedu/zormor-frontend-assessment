import Image from "next/image";
import NextLogo from "@/public/next.svg";
import Link from "next/link";

export function Navbar() {
  return (
    <div className="container flex flex-row items-center justify-start">
      <Link href="/">
        <Image src={NextLogo} alt="app logo" width={64} />
      </Link>

      <Link
        href="/add-place"
        className="ms-auto p-2 bg-blue-800 text-white rounded-md"
      >
        Add New Place
      </Link>
    </div>
  );
}
