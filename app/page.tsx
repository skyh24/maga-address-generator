import { AddressGenerator } from "@/components/AddressGenerator";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 to-gray-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-6">
          <div className="flex justify-center gap-4 items-center">
            <Image
              src="https://images.unsplash.com/photo-1508433957232-3107f5fd5995?w=128&h=128&fit=crop"
              alt="American Flag"
              width={64}
              height={64}
              className="rounded-full shadow-lg"
            />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-500 via-white to-blue-500 text-transparent bg-clip-text">
              MAGA Bitcoin Address Generator
            </h1>
            <Image
              src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=128&h=128&fit=crop"
              alt="Eagle"
              width={64}
              height={64}
              className="rounded-full shadow-lg"
            />
          </div>
          <p className="text-xl text-gray-300">Make America Great Again with Your Own MAGA Bitcoin Address</p>
          <div className="flex justify-center gap-2">
            <div className="w-16 h-1 bg-red-500 rounded"></div>
            <div className="w-16 h-1 bg-white rounded"></div>
            <div className="w-16 h-1 bg-blue-500 rounded"></div>
          </div>
        </div>
        <AddressGenerator />
      </div>
    </main>
  );
}