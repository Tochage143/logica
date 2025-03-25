import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] items-center sm:items-start">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="text-lg">
          Welcome to our application. This is the About page where you can learn more about us.
        </p>
        <Image
          className="dark:invert"
          src="/about-image.svg"
          alt="About image"
          width={180}
          height={38}
          priority
        />
      </main>
    </div>
  );
}
