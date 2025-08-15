import Link from "next/link";

export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-[url('/background-image.jpg')] bg-no-repeat bg-cover  text-white">
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="max-w-2xl relative z-10">
        <h1 className="text-6xl font-semibold">
          If life changes, your secrets stay safe
        </h1>
        <p className="my-4 text-lg text-gray-400">
          Assign trusted friends or family as recovery contacts, so your assets
          are safe no matter what happens.
        </p>
        <div className="inline-block border border-gray-200 rounded-lg p-1 bg-white/10 backdrop-blur-md">
          <Link href={""} className="bg-indigo-600 px-6 py-2 rounded-md block">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
