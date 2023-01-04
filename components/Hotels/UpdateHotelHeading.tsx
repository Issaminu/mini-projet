export default function HotelHeading() {
  return (
    <div className="w-full h-24 px-8 mt-8 md:flex md:items-center lg:h-32 md:justify-between">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Update Hotel
        </h2>
        <p className="mt-1 text-gray-600">
          Please fill in the updated information on the hotel.
        </p>
      </div>
    </div>
  );
}
