import { SiteNavbar } from "@/components/layout/SiteNavbar";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNavbar />
      <main className="min-h-screen bg-white text-black">{children}</main>
    </>
  )
}