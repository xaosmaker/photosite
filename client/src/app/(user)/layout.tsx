import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
// import Navbar2 from "@/components/Navbar2";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      {/* <Navbar2 /> */}
      {children}
      <Footer />
    </>
  );
}
