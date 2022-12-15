export default function HotelHeading() {
  return (
    <div className="md:flex md:items-center h-32 w-full px-8 md:justify-between">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          New Hotel
        </h2>
        <p className="mt-1 text-gray-600">
          Please fill in the information on the new hotel.
        </p>
      </div>
    </div>
  );
}
