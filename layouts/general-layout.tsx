import { Navbar } from "@/components";

export function GeneralLayout({children}) {
  return (
    <div>
      <Navbar/>
      {children}
    </div>
  )
}