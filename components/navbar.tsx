import Image from "next/image";
import NextLogo from "@/public/next.svg";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";

export function Navbar({ handleOpen }: { handleOpen: () => void }) {
  return (
    <div className="sticky top-0 container py-4 flex flex-row items-center justify-start gap-4 bg-gray-50">
      <Link href="/">
        <Image
          src={NextLogo}
          alt="app logo"
          width={64}
        />
      </Link>

      <Link
        href="/add-place"
        className="ms-auto p-2 bg-yellow-500 rounded-md"
      >
        Add New Place
      </Link>

      <IoSearchOutline onClick={handleOpen} />
    </div>
  );
}
