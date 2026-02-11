import Image from 'next/image';

export default function SizeGuidePage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-orange-600">Size Guide</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 2 Litre & 4 Litre Containers Card */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4 text-orange-500">2 Litre & 4 Litre Containers</h2>
          <div className="w-full flex justify-center mb-4">
            <Image
              src="/images/updates/container1.jpeg"
              alt="2 Litre & 4 Litre Containers"
              width={300}
              height={200}
              className="rounded-md object-contain"
            />
          </div>
          <p className="text-gray-700 text-center">Our 2 litre and 4 litre containers are perfect for small gatherings, individual meals, or family portions. The 2L container serves 2-3 people, while the 4L container serves 5-7 people.</p>
        </div>
        {/* 4 Litre Tray Card */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4 text-orange-500">4 Litre Tray</h2>
          <div className="w-full flex justify-center mb-4">
            <Image
              src="/images/updates/container2.jpeg"
              alt="4 Litre Tray"
              width={300}
              height={200}
              className="rounded-md object-contain"
            />
          </div>
          <p className="text-gray-700 text-center">Our 4 litre foil tray is ideal for family meals, small parties, or sharing. It serves approximately 5-7 people.</p>
        </div>
        {/* 2 Litre Tray Card */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4 text-orange-500">2 Litre Tray</h2>
          <div className="w-full flex justify-center mb-4">
            <Image
              src="/images/updates/container3.jpeg"
              alt="2 Litre Tray"
              width={300}
              height={200}
              className="rounded-md object-contain"
            />
          </div>
          <p className="text-gray-700 text-center">Our 2 litre foil tray is perfect for smaller gatherings or individual portions. It provides a generous serving for 2-3 people.</p>
        </div>
      </div>
    </div>
  );
} 