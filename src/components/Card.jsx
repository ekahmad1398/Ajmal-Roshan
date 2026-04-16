import { Wifi, Phone, User, Lock, Package, Router, Signal, Antenna } from "lucide-react";

const Card = ({ item }) => {
  return (
    <div
      dir="rtl"
      className="print-ready-card w-full h-full rounded-xl overflow-hidden shadow-md border border-gray-200 flex flex-col bg-white font-[Calibri]"
    >
      {/* Header */}
      <div className="card-header relative bg-gradient-to-bl from-[#4b6089] via-[#062460] to-[#c94e12] text-white p-2 overflow-hidden">        {/* Background icons */}
        <div className="absolute inset-0 flex items-center justify-between px-3 opacity-10 pointer-events-none">
          <Router className="w-5 h-5" />
          <Signal className="w-4 h-4" />
          <Antenna className="w-4 h-4" />
          <Wifi className="w-4 h-4" />
        </div>

        <div className="relative flex items-center gap-2">
          {/* Logo */}
          <div className="card-logo-wrap w-11 h-11 rounded-lg bg-white/90 backdrop-blur-md flex items-center justify-center border border-white/30 shrink-0 shadow-sm">
            <img src="/logo.png" alt="logo" className="card-logo-img w-10 h-9 object-contain" />
          </div>

          {/* Title */}
          <div className="flex-1 text-center">
            <h1 className="card-title text-[14px] font-extrabold tracking-wide leading-tight">
              شرکت خدمات انترنتی اجمل روشان
            </h1>
          </div>

          <Wifi className="w-4 h-4 text-white/70 shrink-0" />
        </div>
      </div>

      {/* Body */}
      <div className="card-body flex-1 p-2 flex flex-col justify-between">
        <div className="card-fields space-y-1">

          {/* Username */}
          <div className="card-row bg-gray-50 rounded-md px-2 py-1 flex items-center border border-gray-100 hover:bg-gray-100 transition">
            <div className="flex items-center gap-1 shrink-0">
              <div className="w-5 h-5 rounded-md bg-blue-100 flex items-center justify-center">
                <User className="w-3 h-3 text-blue-600" />
              </div>
              <span className="text-[9px] text-gray-500 font-medium">نام کاربری</span>
            </div>
            <span className="flex-1 text-right" />
            <span dir="ltr" className="text-[10px] font-bold text-gray-900 tracking-wide shrink-0">
              {item.username}
            </span>
          </div>

          {/* Password */}
          <div className="card-row bg-gray-50 rounded-md px-2 py-1 flex items-center border border-gray-100 hover:bg-gray-100 transition">
            <div className="flex items-center gap-1 shrink-0">
              <div className="w-5 h-5 rounded-md bg-blue-100 flex items-center justify-center">
                <Lock className="w-3 h-3 text-blue-600" />
              </div>
              <span className="text-[9px] text-gray-500 font-medium">رمز عبور</span>
            </div>
            <span className="flex-1 text-right" />
            <span dir="ltr" className="text-[10px] font-bold text-gray-900 tracking-widest font-mono shrink-0">
              {item.password}
            </span>
          </div>

          {/* Package */}
          <div className="card-row bg-gradient-to-l from-orange-100 to-amber-50 border border-orange-200 rounded-md px-2 py-1 flex items-center shadow-sm">
            <div className="flex items-center gap-1 shrink-0">
              <div className="w-5 h-5 rounded-md bg-orange-200 flex items-center justify-center">
                <Package className="w-3 h-3 text-orange-700" />
              </div>
              <span className="text-[9px] text-orange-700 font-bold">بسته</span>
            </div>
            <span className="flex-1 text-right" />
            <span className="text-[10px] font-extrabold text-orange-800 shrink-0">
              {item.package}
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="card-footer mt-2 shrink-0">
          <div className="flex justify-between items-center px-1">
            <span className="flex items-center gap-1 font-bold text-gray-800">
              <Phone className="w-3 h-3" />
              <span dir="ltr" className="text-[9px]">0799795799</span>
            </span>
            <span className="text-[7px] font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
              برای معلومات بسته خود 10.11.12.13 را در مرورگرتان جستجو کنید
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
