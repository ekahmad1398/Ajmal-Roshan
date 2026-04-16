import React, { useState, useRef } from "react";
import { parseExcel } from "./utils/parseExcel";
import CardList from "./components/CardList";
import { Printer, FileSpreadsheet, X, UploadCloud, ArrowUp } from "lucide-react";

function App() {
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState("");
  const printRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    setFileName(file.name);
    parseExcel(file, (result) => {
      setData(result);
    });
  };

  const clearFile = () => {
    setData([]);
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // دکمه چاپ ساده و تضمینی با window.print
  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="app-shell min-h-screen font-[Calibri]"
      style={{ background: "linear-gradient(135deg, #4b6089, #062460, #c94e12)" }}
    >
      {/* Animated Background Effect */}
      <div className="screen-only fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="screen-only relative border-b border-white/10 bg-black/20 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#4b6089] to-[#c94e12] rounded-2xl blur-lg opacity-40"></div>
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4b6089] to-[#c94e12] flex items-center justify-center shadow-2xl border border-white/20 overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Ajmal Roshan"
                  className="w-8 h-8 object-contain brightness-0 invert"
                />
              </div>
            </div>
            <div>
              <h1 className="text-white font-black text-xl tracking-tight">اجمل روشان</h1>
              <p className="text-orange-200/80 text-xs tracking-widest">AJMAL ROSHAN · INTERNET SERVICES</p>
            </div>
          </div>

          {data.length > 0 && (
            <div className="bg-white/10 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/20">
              <span className="text-white/90 text-sm font-medium">
                <span className="text-orange-300 font-bold ml-1" dir="ltr">{data.length}</span>
                کارت آماده
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-6 py-10">
        <div className="content-shell bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-8 max-h-[70vh] overflow-y-auto">
          {/* Upload Section */}
          <div className="screen-only mb-8">
            {!fileName ? (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#4b6089] to-[#c94e12] rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500"></div>

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-12 text-center cursor-pointer hover:bg-white/10 transition-all duration-300"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFile(file);
                    }}
                    className="hidden"
                  />

                  <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#4b6089]/20 to-[#c94e12]/20 flex items-center justify-center border-2 border-dashed border-orange-400/50 group-hover:border-orange-400 group-hover:scale-110 transition-all duration-300">
                    <UploadCloud className="w-10 h-10 text-orange-300" />
                  </div>

                  <h3 className="text-white font-bold text-xl mb-2">
                    برای شروع فایل Excel را انتخاب کنید
                  </h3>

                  <p className="text-gray-300 text-sm mb-4">
                    روی این باکس کلیک کنید یا فایل را بکشید و رها کنید
                  </p>

                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4b6089] to-[#c94e12] text-white px-5 py-2.5 rounded-xl font-medium text-sm shadow-lg shadow-orange-500/20">
                    <ArrowUp className="w-4 h-4" />
                    انتخاب فایل Excel
                  </div>

                  <p className="text-gray-400 text-xs mt-4">
                    فرمت‌های پشتیبانی شده: .xlsx, .xls
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#4b6089] to-[#c94e12] rounded-2xl blur-lg opacity-20"></div>

                <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#4b6089]/30 to-[#c94e12]/30 flex items-center justify-center border border-orange-400/30">
                        <FileSpreadsheet className="w-7 h-7 text-orange-300" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg mb-1">{fileName}</p>
                        <p className="text-green-400 text-sm flex items-center gap-1">
                          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                          <span dir="ltr">{data.length}</span> رکورد با موفقیت بارگذاری شد
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={clearFile}
                      className="p-3 hover:bg-red-500/20 rounded-xl transition-all duration-200 group/btn border border-transparent hover:border-red-500/30"
                    >
                      <X className="w-5 h-5 text-gray-400 group-hover/btn:text-red-400 transition-colors" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Print Button */}
          {data.length > 0 && (
            <div className="screen-only mb-8 flex justify-end">
              <button
                onClick={handlePrint}
                className="group relative bg-gradient-to-r from-[#4b6089] to-[#c94e12] text-white px-8 py-4 rounded-2xl font-bold text-base shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 overflow-hidden cursor-pointer"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <span className="relative flex items-center gap-3">
                  <Printer className="w-5 h-5" />
                  چاپ <span dir="ltr">{data.length}</span> کارت
                </span>
              </button>
            </div>
          )}

          {/* Cards Preview */}
          {data.length > 0 && (
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#4b6089]/30 to-[#c94e12]/30 rounded-3xl blur-lg"></div>

              <div className="screen-only relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-8">

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-7 bg-gradient-to-b from-[#4b6089] to-[#c94e12] rounded-full"></div>
                  <h2 className="text-white font-bold text-lg">پیش‌نمایش کارت‌ها</h2>
                  <span className="text-white/40 text-sm mr-auto" dir="ltr">{data.length} عدد</span>
                </div>

                {/* فقط برای نمایش */}
                <CardList data={data} />

              </div>

              {/* 👇 اینو بیار بیرون (خیلی مهم) */}
              <div ref={printRef} id="printable-area" className="print-only">
                <CardList data={data} paginate />
              </div>
            </div>
        
          )}

        {/* Empty State */}
        {data.length === 0 && !fileName && (
          <div className="screen-only text-center py-16">
            <div className="inline-flex items-center gap-3 text-white/40 text-sm bg-white/5 px-6 py-3 rounded-full border border-white/10 backdrop-blur-xl">
              <UploadCloud className="w-4 h-4" />
              برای نمایش کارت‌ها، لطفاً یک فایل Excel انتخاب کنید
            </div>
          </div>
        )}
    </div>
      </main >

    {/* Footer */ }
    < footer className = "screen-only relative border-t border-white/10 bg-black/20 backdrop-blur-xl mt-auto" >
      <div className="max-w-7xl mx-auto px-6 py-5 text-center">
        <p className="text-gray-400 text-xs tracking-wider">
          © 2026 شرکت خدمات انترنتی اجمل روشان · تمامی حقوق محفوظ است
        </p>
      </div>
      </footer >
    </div >
  );
}

export default App;
