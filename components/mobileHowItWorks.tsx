"use client";

export default function MobileHowItWorksPage() {
  // Use first preloaded image or fallback to default
  const staticImage = "/Mark_Assets/mark_spin/033.jpg";

  return (
    <main className=" bg-white">
      <div className="px-8 pt-6 pb-4 ">
        <div className="flex flex-col items-start">
          <h2 className="text-md text-gray-600 font-medium">So easy to use</h2>
          <h1 className="font-semibold tracking-tight text-4xl">Read, Mark, Send</h1>
        </div>
      </div>
      <div className="p-4 flex justify-center">
        <img
          src={staticImage}
          alt="How it works"
          className="w-full max-w-[95%] rounded-2xl object-contain"
          style={{ maxHeight: "70vh" }}
        />
      </div>
    </main>
  );
}