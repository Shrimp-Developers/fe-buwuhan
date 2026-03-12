import { Link } from "react-router-dom";
import useBuwuhanDashboard from "../hooks/buwuhan/useBuwuhanDashboard";
import CardDashboard from "../components/CardDashboard";
import Card from "../components/Card";

export default function BuwuhanDashboard() {
  const { userProfile, loading, error, dataBuwuhan, categories } =
    useBuwuhanDashboard();

  if (loading) {
    return (
      <div className="text-center py-10 text-xs text-gray-400">
        Memuat data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-xs text-red-500">
        Terjadi kesalahan: {error}
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-2 sm:px-4 md:px-5">
      {/* title for mobile */}
      <h1 className="text-base sm:text-lg font-bold text-[#000000] dark:text-[#ffffff] mb-3 sm:mb-4 md:hidden">
        Ringkasan
      </h1>
      <CardDashboard className="bg-[#C2BFF8]" height="h-auto">
        <div className="text-left m-2.5 sm:mx-4 sm:my-6">
          <h2 className="font-bold text-sm sm:text-base lg:text-base mb-1">
            {userProfile ? `Halo! ${userProfile.fullName}` : "Halo! "}
          </h2>
          <p className="text-xs sm:text-sm lg:text-sm text-gray-800 mb-3">
            Mau edit apa hari ini?
          </p>
          <Link
            to="/dashboard/list"
            className="bg-[#000000] text-white text-[10px] sm:text-xs px-3 py-3 sm:px-4 sm:py-3 rounded-full hover:bg-gray-800 transition"
          >
            Lihat semua data
          </Link>
        </div>

        <div className="flex items-center justify-center mt-2 sm:mt-3 lg:mt-0">
          <img
            src="/icon-book.png"
            alt="deskripsi icon-book"
            className="w-[90px] h-[90px] sm:w-[100px] sm:h-[100px] object-contain"
          />
        </div>
      </CardDashboard>

      {/* Data Section Title */}
      <h4 className="font-bold text-base sm:text-lg m-2 sm:m-2.5 lg:m-3 dark:text-[#ffffff]">
        Data
      </h4>

      {/* Desktop/Tablet Layout - 2 cols on tablet, 3 cols on desktop */}
      {!loading && !error && (
        <>
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-3">
            {/* Total Data Card */}
            <Card
              className="bg-[#C2BFF8] flex flex-col items-center justify-center px-3 py-5 md:py-6"
              height="h-auto"
            >
              <p className="text-sm md:text-base font-semibold mb-1">
                Total Data
              </p>
              <p className="text-2xl md:text-3xl font-bold">
                {dataBuwuhan.totalData}
              </p>
            </Card>

            {/* Category Cards */}
            {categories.map((category, index) => (
              <Card
                key={index}
                className={`${category.bgColor}`}
                height="h-auto"
              >
                <p className="text-sm md:text-base font-semibold text-center mb-2.5 md:mb-3">
                  Total data
                  <br />
                  {category.title}
                </p>
                <div className="flex gap-2.5 md:gap-3 justify-center">
                  <div className="bg-[#ffffff] text-[#000000] dark:text-[#ffffff] dark:bg-[#000000] border border-[#000000] dark:border-[#ffffff] rounded-xl p-2.5 md:p-3 flex-1 text-center">
                    <p className="text-xs md:text-sm mb-1">Lunas</p>
                    <p className="text-lg md:text-xl font-bold">
                      {category.data.paid}
                    </p>
                  </div>
                  <div className="bg-[#ffffff] text-[#000000] dark:text-[#ffffff] dark:bg-[#000000] border border-[#000000] dark:border-[#ffffff] rounded-xl p-2.5 md:p-3 flex-1 text-center">
                    <p className="text-xs md:text-sm mb-1">Belum</p>
                    <p className="text-lg md:text-xl font-bold">
                      {category.data.unpaid}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Mobile Layout (1 column) */}
          <div className="md:hidden space-y-2">
            {/* Total Data Card */}
            <Card
              className="bg-[#C2BFF8] flex flex-col items-center justify-center"
              height="h-40 sm:h-48"
            >
              <p className="text-sm sm:text-base font-bold mb-1">Total data</p>
              <p className="text-2xl sm:text-3xl font-bold">
                {dataBuwuhan.totalData}
              </p>
            </Card>

            {/* Category Cards */}
            {categories.map((category, index) => (
              <Card
                key={index}
                className={`${category.bgColor}`}
                height="h-auto"
              >
                <p className="text-sm sm:text-base font-bold text-center mb-2">
                  Total data
                  <br />
                  {category.title}
                </p>
                <div className="flex gap-2 sm:gap-2.5">
                  <div className="bg-[#ffffff] text-[#000000] dark:text-[#ffffff] dark:bg-[#000000] border border-[#000000] dark:border-[#ffffff] rounded-lg px-2 sm:px-3 py-5 sm:py-6 flex-1 text-center">
                    <p className="text-xs sm:text-sm mb-1">Lunas</p>
                    <p className="text-lg sm:text-xl font-bold">
                      {category.data.paid}
                    </p>
                  </div>
                  <div className="bg-[#ffffff] text-[#000000] dark:text-[#ffffff] dark:bg-[#000000] border border-[#000000] dark:border-[#ffffff] rounded-lg px-2 sm:px-3 py-5 sm:py-6 flex-1 text-center">
                    <p className="text-xs sm:text-sm mb-1">Belum</p>
                    <p className="text-lg sm:text-xl font-bold">
                      {category.data.unpaid}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
