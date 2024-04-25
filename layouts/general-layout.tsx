import { Navbar } from "@/components";

export function GeneralLayout({ children }: Children) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
