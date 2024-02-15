import Image from "next/image";

import Layout from "./Layout";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Layout />
    </main>
  );
}
