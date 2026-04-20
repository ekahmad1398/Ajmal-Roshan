import React, { useRef, useState } from "react";
import {
  ArrowUp,
  FileSpreadsheet,
  Palette,
  Phone,
  Printer,
  UploadCloud,
  UserSquare2,
  WalletCards,
  X,
} from "lucide-react";
import CardList from "./components/CardList";
import { parseExcel } from "./utils/parseExcel";

const initialFormState = {
  packageName: "",
  agencyName: "",
  phoneNumber: "",
  headerColor: "#062460",
};

function App() {
  const [rows, setRows] = useState([]);
  const [fileName, setFileName] = useState("");
  const [cardMeta, setCardMeta] = useState(initialFormState);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    setFileName(file.name);
    parseExcel(file, (result) => {
      setRows(result);
    });
  };

  const handleMetaChange = (event) => {
    const { name, value } = event.target;
    setCardMeta((current) => ({ ...current, [name]: value }));
  };

  const clearFile = () => {
    setRows([]);
    setFileName("");
    setCardMeta(initialFormState);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const cards = rows.map((item, index) => ({
    ...item,
    package: cardMeta.packageName.trim() || item.package || "بدون بسته",
    agencyName: cardMeta.agencyName.trim() || "نمایندگی ثبت نشده",
    phoneNumber: cardMeta.phoneNumber.trim() || "شماره تماس ثبت نشده",
    headerColor: cardMeta.headerColor || "#062460",
    serialNumber: index + 1,
  }));

  return (
    <div
      className="app-shell min-h-screen font-[Calibri]"
      style={{ background: "linear-gradient(135deg, #4b6089, #062460, #c94e12)" }}
    >
      <div className="screen-only fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl animate-pulse delay-1000" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-3xl" />
      </div>

      <header className="screen-only relative border-b border-white/10 bg-black/20 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#4b6089] to-[#c94e12] blur-lg opacity-40" />
              <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-[#4b6089] to-[#c94e12] shadow-2xl">
                <img
                  src="/logo.png"
                  alt="Ajmal Roshan"
                  className="h-8 w-8 object-contain brightness-0 invert"
                />
              </div>
            </div>
            <div dir="rtl">
              <h1 className="text-xl font-black tracking-tight text-white">اجمل روشان</h1>
              <p className="text-xs tracking-widest text-orange-200/80">
                AJMAL ROSHAN FASTEST FORVER
              </p>
            </div>
          </div>

          {cards.length > 0 && (
            <div
              dir="rtl"
              className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-xl"
            >
              <span className="text-sm font-medium text-white/90">
                <span className="ml-1 font-bold text-orange-300" dir="ltr">
                  {cards.length}
                </span>
                کارت آماده
              </span>
            </div>
          )}
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-6 py-10">
        <div className="content-shell rounded-2xl border border-white/20 bg-white/5 p-8 backdrop-blur-xl">
          <div className="screen-only mb-8">
            {!fileName ? (
              <div className="group relative">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#4b6089] to-[#c94e12] blur-xl opacity-30 transition duration-500 group-hover:opacity-50" />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative cursor-pointer rounded-2xl border border-white/20 bg-white/5 p-12 text-center transition-all duration-300 hover:bg-white/10"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFile(file);
                    }}
                    className="hidden"
                  />

                  <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-dashed border-orange-400/50 bg-gradient-to-br from-[#4b6089]/20 to-[#c94e12]/20 transition-all duration-300 group-hover:scale-110 group-hover:border-orange-400">
                    <UploadCloud className="h-10 w-10 text-orange-300" />
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-white">
                    Select an Excel or CSV file to get started
                  </h3>

                  <p dir="rtl" className="mb-4 text-sm text-gray-300">
                    روی این باکس کلیک کنید یا فایل را انتخاب نمایید
                  </p>

                  <div className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#4b6089] to-[#c94e12] px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-orange-500/20">
                    <ArrowUp className="h-4 w-4" />
                    Select Excel / CSV File
                  </div>

                  <p className="mt-4 text-xs text-gray-400">
                    Supported formats: .xlsx, .xls, .csv
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="group relative">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#4b6089] to-[#c94e12] blur-lg opacity-20" />

                  <div className="relative rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-orange-400/30 bg-gradient-to-br from-[#4b6089]/30 to-[#c94e12]/30">
                          <FileSpreadsheet className="h-7 w-7 text-orange-300" />
                        </div>
                        <div dir="rtl">
                          <p className="mb-1 text-lg font-bold text-white">{fileName}</p>
                          <p className="flex items-center gap-1 text-sm text-green-400">
                            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                            <span dir="ltr">{cards.length}</span>
                            رکورد با موفقیت بارگذاری شد
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={clearFile}
                        className="group/btn rounded-xl border border-transparent p-3 transition-all duration-200 hover:border-red-500/30 hover:bg-red-500/20"
                      >
                        <X className="h-5 w-5 text-gray-400 transition-colors group-hover/btn:text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/15 bg-slate-950/20 p-5 backdrop-blur-xl">
                  <div dir="rtl" className="mb-4">
                    <h2 className="text-lg font-bold text-white">مشخصات کارت</h2>
                    <p className="text-sm text-white/65">
                      بعد از آپلود فایل، معلومات دلخواه را وارد کنید تا روی تمام کارت‌ها نمایش داده شود.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <label className="block">
                      <span className="mb-2 flex items-center gap-2 text-sm text-white/80" dir="rtl">
                        <WalletCards className="h-4 w-4 text-orange-300" />
                        نام بسته
                      </span>
                      <input
                        name="packageName"
                        value={cardMeta.packageName}
                        onChange={handleMetaChange}
                        dir="rtl"
                        placeholder="مثلاً 20MB Unlimited"
                        className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-orange-400"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 flex items-center gap-2 text-sm text-white/80" dir="rtl">
                        <UserSquare2 className="h-4 w-4 text-orange-300" />
                        نام نمایندگی
                      </span>
                      <input
                        name="agencyName"
                        value={cardMeta.agencyName}
                        onChange={handleMetaChange}
                        dir="rtl"
                        placeholder="مثلاً نمایندگی دشت برچی"
                        className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-orange-400"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 flex items-center gap-2 text-sm text-white/80" dir="rtl">
                        <Phone className="h-4 w-4 text-orange-300" />
                        شماره تماس
                      </span>
                      <input
                        name="phoneNumber"
                        value={cardMeta.phoneNumber}
                        onChange={handleMetaChange}
                        dir="ltr"
                        placeholder="07XXXXXXXX"
                        className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-orange-400"
                      />
                    </label>

                    <label className="block md:col-span-3">
                      <span className="mb-2 flex items-center gap-2 text-sm text-white/80" dir="rtl">
                        <Palette className="h-4 w-4 text-orange-300" />
                        رنگ هیدر کارت
                      </span>
                      <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-3 py-2">
                        <input
                          name="headerColor"
                          type="color"
                          value={cardMeta.headerColor}
                          onChange={handleMetaChange}
                          className="h-10 w-14 cursor-pointer rounded border border-white/15 bg-transparent"
                        />
                        <input
                          name="headerColor"
                          value={cardMeta.headerColor}
                          onChange={handleMetaChange}
                          dir="ltr"
                          placeholder="#062460"
                          className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {cards.length > 0 && (
            <div className="screen-only mb-8 flex justify-end">
              <button
                onClick={handlePrint}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-r from-[#4b6089] to-[#c94e12] px-8 py-4 text-base font-bold text-white shadow-2xl shadow-orange-500/30 transition-all duration-300 hover:scale-105 hover:shadow-orange-500/50"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative flex items-center gap-3">
                  <Printer className="h-5 w-5" />
                  چاپ <span dir="ltr">{cards.length}</span> کارت
                </span>
              </button>
            </div>
          )}

          {cards.length > 0 && (
            <div className="relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#4b6089]/30 to-[#c94e12]/30 blur-lg" />

              <div className="screen-only relative rounded-2xl border border-white/20 bg-white/5 p-8 backdrop-blur-xl">
                <div className="mb-6 flex items-center gap-3" dir="rtl">
                  <div className="h-7 w-1.5 rounded-full bg-gradient-to-b from-[#4b6089] to-[#c94e12]" />
                  <h2 className="text-lg font-bold text-white">پیش‌نمایش کارت‌ها</h2>
                  <span className="mr-auto text-sm text-white/40" dir="ltr">
                    {cards.length} عدد
                  </span>
                </div>

                <CardList data={cards} />
              </div>

              <div id="printable-area" className="print-only">
                <CardList data={cards} paginate />
              </div>
            </div>
          )}

          {cards.length === 0 && !fileName && (
            <div className="screen-only py-16 text-center">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white/40 backdrop-blur-xl">
                <UploadCloud className="h-4 w-4" />
                To preview cards, please select an Excel or CSV file
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="screen-only relative mt-auto border-t border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-5 text-center">
          <p dir="rtl" className="text-xs tracking-wider text-gray-400">
            © 2026 شرکت خدمات انترنی اجمل روشان · تمامی حقوق محفوظ است
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
