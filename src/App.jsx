import React, {
  startTransition,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import {
  ArrowUp,
  CheckCircle2,
  FileSpreadsheet,
  Image,
  Palette,
  Phone,
  Printer,
  Rows2,
  UploadCloud,
  UserSquare2,
  WalletCards,
  X,
} from "lucide-react";
import CardList from "./components/CardList";
import { parseExcel } from "./utils/parseExcel";

const defaultCompanyName = "شرکت خدمات انترنتی اجمل روشان";
const defaultLogoSrc = "/logo.png";
const defaultSlogan = "Ajmal Roshan Fastest Forever";

const initialFormState = {
  packageName: "",
  agencyName: "",
  phoneNumber: "",
  companyName: defaultCompanyName,
  logoSrc: defaultLogoSrc,
  logoName: "logo.png",
  leftLogoSrc: defaultLogoSrc,
  leftLogoName: "logo.png",
  showLeftLogo: false,
  slogan: defaultSlogan,
  headerColor: "#062460",
  backgroundColor: "#f97316",
};

function App() {
  const [rows, setRows] = useState([]);
  const [fileName, setFileName] = useState("");
  const [cardMeta, setCardMeta] = useState(initialFormState);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isPrintReady, setIsPrintReady] = useState(false);
  const fileInputRef = useRef(null);
  const logoInputRef = useRef(null);
  const leftLogoInputRef = useRef(null);
  const logoObjectUrlRef = useRef(null);
  const leftLogoObjectUrlRef = useRef(null);
  const dragCounterRef = useRef(0);
  const [isPreparingPrint, startPrintTransition] = useTransition();
  const deferredCardMeta = useDeferredValue(cardMeta);

  const handleFile = (file) => {
    if (!file) {
      return;
    }

    setFileName(file.name);
    parseExcel(file, (result) => {
      startTransition(() => {
        setRows(result);
        setIsPrintReady(false);
      });
    });
  };

  const handleMetaChange = (event) => {
    const { checked, name, type, value } = event.target;
    const nextValue = type === "checkbox" ? checked : value;

    setCardMeta((current) => ({ ...current, [name]: nextValue }));
  };

  const revokeSelectedLogo = useCallback(() => {
    if (logoObjectUrlRef.current) {
      URL.revokeObjectURL(logoObjectUrlRef.current);
      logoObjectUrlRef.current = null;
    }
  }, []);

  const revokeSelectedLeftLogo = useCallback(() => {
    if (leftLogoObjectUrlRef.current) {
      URL.revokeObjectURL(leftLogoObjectUrlRef.current);
      leftLogoObjectUrlRef.current = null;
    }
  }, []);

  const handleLogoFile = (file) => {
    if (!file) {
      return;
    }

    revokeSelectedLogo();

    const logoSrc = URL.createObjectURL(file);
    logoObjectUrlRef.current = logoSrc;

    setCardMeta((current) => ({
      ...current,
      logoSrc,
      logoName: file.name,
    }));
  };

  const handleLeftLogoFile = (file) => {
    if (!file) {
      return;
    }

    revokeSelectedLeftLogo();

    const leftLogoSrc = URL.createObjectURL(file);
    leftLogoObjectUrlRef.current = leftLogoSrc;

    setCardMeta((current) => ({
      ...current,
      leftLogoSrc,
      leftLogoName: file.name,
    }));
  };

  const resetLogo = () => {
    revokeSelectedLogo();
    setCardMeta((current) => ({
      ...current,
      logoSrc: defaultLogoSrc,
      logoName: "logo.png",
    }));

    if (logoInputRef.current) {
      logoInputRef.current.value = "";
    }
  };

  const resetLeftLogo = () => {
    revokeSelectedLeftLogo();
    setCardMeta((current) => ({
      ...current,
      leftLogoSrc: defaultLogoSrc,
      leftLogoName: "logo.png",
    }));

    if (leftLogoInputRef.current) {
      leftLogoInputRef.current.value = "";
    }
  };

  const clearFile = () => {
    revokeSelectedLogo();
    revokeSelectedLeftLogo();
    setRows([]);
    setFileName("");
    setCardMeta(initialFormState);
    setIsDragActive(false);
    setIsPrintReady(false);
    dragCounterRef.current = 0;

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (logoInputRef.current) {
      logoInputRef.current.value = "";
    }

    if (leftLogoInputRef.current) {
      leftLogoInputRef.current.value = "";
    }
  };

  const handlePrint = () => {
    if (rows.length === 0) {
      return;
    }

    if (isPrintReady) {
      window.print();
      return;
    }

    startPrintTransition(() => {
      setIsPrintReady(true);
    });
  };

  useEffect(() => {
    if (!isPrintReady) {
      return undefined;
    }

    let nestedFrameId = 0;
    const frameId = window.requestAnimationFrame(() => {
      nestedFrameId = window.requestAnimationFrame(() => {
        window.print();
      });
    });

    return () => {
      window.cancelAnimationFrame(frameId);

      if (nestedFrameId) {
        window.cancelAnimationFrame(nestedFrameId);
      }
    };
  }, [isPrintReady]);

  useEffect(() => {
    const handleAfterPrint = () => {
      setIsPrintReady(false);
    };

    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []);

  useEffect(() => () => {
    revokeSelectedLogo();
    revokeSelectedLeftLogo();
  }, [revokeSelectedLogo, revokeSelectedLeftLogo]);

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dragCounterRef.current += 1;
    setIsDragActive(true);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "copy";
    setIsDragActive(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dragCounterRef.current = Math.max(dragCounterRef.current - 1, 0);

    if (dragCounterRef.current === 0) {
      setIsDragActive(false);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dragCounterRef.current = 0;
    setIsDragActive(false);

    const file = event.dataTransfer.files?.[0];
    handleFile(file);
  };

  const cards = useMemo(
    () =>
      rows.map((item, index) => ({
        ...item,
        package: deferredCardMeta.packageName.trim() || item.package || "بدون بسته",
        agencyName: deferredCardMeta.agencyName.trim() || "نمایندگی ثبت نشده",
        phoneNumber: deferredCardMeta.phoneNumber.trim() || "شماره تماس ثبت نشده",
        companyName: deferredCardMeta.companyName.trim() || defaultCompanyName,
        logoSrc: deferredCardMeta.logoSrc || defaultLogoSrc,
        leftLogoSrc: deferredCardMeta.leftLogoSrc || defaultLogoSrc,
        showLeftLogo: deferredCardMeta.showLeftLogo,
        slogan: deferredCardMeta.slogan.trim() || defaultSlogan,
        serialNumber: `#${index + 1}`,
      })),
    [
      rows,
      deferredCardMeta.packageName,
      deferredCardMeta.agencyName,
      deferredCardMeta.phoneNumber,
      deferredCardMeta.companyName,
      deferredCardMeta.logoSrc,
      deferredCardMeta.leftLogoSrc,
      deferredCardMeta.showLeftLogo,
      deferredCardMeta.slogan,
    ],
  );

  const pageStyle = useMemo(
    () => ({
      "--theme-accent": deferredCardMeta.backgroundColor,
      "--theme-header": deferredCardMeta.headerColor,
    }),
    [deferredCardMeta.backgroundColor, deferredCardMeta.headerColor],
  );

  return (
    <div className="app-shell min-h-screen font-[Calibri]" style={pageStyle}>
      <div className="screen-only animated-bg pointer-events-none fixed inset-0 overflow-hidden">
        <div className="animated-bg__gradient" />
        <div className="animated-bg__blob animated-bg__blob--one" />
        <div className="animated-bg__blob animated-bg__blob--two" />
        <div className="animated-bg__blob animated-bg__blob--three" />
        <div className="animated-bg__grid" />
      </div>

      <header className="screen-only relative border-b border-white/10 bg-slate-950/30 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(135deg,var(--theme-accent),var(--theme-header))] blur-lg opacity-45" />
              <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-[linear-gradient(135deg,var(--theme-header),var(--theme-accent))] shadow-2xl">
                <img
                  src={cardMeta.logoSrc || defaultLogoSrc}
                  alt={cardMeta.companyName || defaultCompanyName}
                  className="h-8 w-8 object-contain brightness-0 invert"
                />
              </div>
            </div>

            <div dir="rtl">
              <h1 className="text-xl font-black tracking-tight text-white sm:text-2xl">
                {cardMeta.companyName || defaultCompanyName}
              </h1>
              <p className="text-xs tracking-[0.35em] text-orange-100/70">
                AJMAL ROSHAN FASTEST FOREVER
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
            <label className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-3 py-2 text-white backdrop-blur-xl">
              <Palette className="h-4 w-4 text-orange-300" />
              <span dir="rtl" className="text-sm font-medium">
                رنگ بک‌گراند
              </span>
              <input
                name="backgroundColor"
                type="color"
                value={cardMeta.backgroundColor}
                onChange={handleMetaChange}
                className="h-10 w-12 cursor-pointer rounded-lg border border-white/15 bg-transparent"
              />
            </label>

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
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="content-shell rounded-[28px] border border-white/15 bg-slate-950/25 p-4 backdrop-blur-2xl sm:p-6 lg:p-8">
          <div className="screen-only mb-8">
            {!fileName ? (
              <div className="group relative">
                <div className="absolute -inset-1 rounded-[32px] bg-[linear-gradient(120deg,var(--theme-header),var(--theme-accent))] blur-xl opacity-35 transition duration-500 group-hover:opacity-55" />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative cursor-pointer rounded-[28px] border p-8 text-center transition-all duration-300 sm:p-12 ${
                    isDragActive
                      ? "border-orange-300 bg-white/15 shadow-2xl shadow-orange-500/20"
                      : "border-white/20 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      handleFile(file);
                    }}
                    className="hidden"
                  />

                  <div
                    className={`mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border-2 border-dashed transition-all duration-300 ${
                      isDragActive
                        ? "scale-110 border-orange-300 bg-orange-400/20"
                        : "border-orange-400/50 bg-[linear-gradient(135deg,rgba(6,36,96,0.3),rgba(249,115,22,0.2))] group-hover:scale-110 group-hover:border-orange-400"
                    }`}
                  >
                    <UploadCloud className="h-10 w-10 text-orange-200" />
                  </div>

                  <h3 dir="rtl" className="mb-6 text-xl font-bold text-white sm:text-2xl">
                    {isDragActive ? (
                      "فایل را همین‌جا رها کنید"
                    ) : (
                      <>
                        فایل
                        <span dir="ltr" className="mx-1 inline-block">
                          Excel
                        </span>
                        یا
                        <span dir="ltr" className="mx-1 inline-block">
                          CSV
                        </span>
                        را انتخاب یا درگ کنید
                      </>
                    )}
                  </h3>

                  <div className="inline-flex items-center gap-2 rounded-2xl bg-[linear-gradient(120deg,var(--theme-header),var(--theme-accent))] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20">
                    <ArrowUp className="h-4 w-4" />
                    انتخاب فایل
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="group relative">
                  <div className="absolute -inset-1 rounded-[28px] bg-[linear-gradient(120deg,var(--theme-header),var(--theme-accent))] blur-lg opacity-20" />

                  <div className="relative rounded-[26px] border border-white/20 bg-white/10 p-4 backdrop-blur-xl sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-400/30 bg-[linear-gradient(135deg,rgba(6,36,96,0.35),rgba(249,115,22,0.3))]">
                          <FileSpreadsheet className="h-7 w-7 text-orange-300" />
                        </div>

                        <div dir="rtl">
                          <p className="mb-1 break-all text-lg font-bold text-white">{fileName}</p>
                          <p className="flex items-center gap-2 text-sm text-emerald-400">
                            <CheckCircle2 className="h-4 w-4" />
                            <span dir="ltr">{cards.length}</span>
                            ریکورد با موفقیت بارگذاری شد
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={clearFile}
                        className="group/btn self-end rounded-2xl border border-transparent p-3 transition-all duration-200 hover:border-red-500/30 hover:bg-red-500/20 sm:self-auto"
                      >
                        <X className="h-5 w-5 text-slate-300 transition-colors group-hover/btn:text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="rounded-[26px] border border-white/15 bg-slate-950/30 p-4 backdrop-blur-xl sm:p-5">
                  <div dir="rtl" className="mb-4">
                    <h2 className="text-lg font-bold text-white sm:text-xl">اطلاعات کارت</h2>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <label className="flex flex-col gap-2">
                      <span className="flex items-center gap-2 text-sm text-white/80" dir="rtl">
                        <UserSquare2 className="h-4 w-4 text-orange-300" />
                        نام شرکت
                      </span>
                      <input
                        name="companyName"
                        value={cardMeta.companyName}
                        onChange={handleMetaChange}
                        dir="rtl"
                        placeholder={defaultCompanyName}
                        className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-orange-400"
                      />
                    </label>

                    <label className="flex flex-col gap-2">
                      <span className="flex items-center gap-2 text-sm text-white/80" dir="rtl">
                        <Image className="h-4 w-4 text-orange-300" />
                        لوگوی کارت
                      </span>
                      <input
                        ref={logoInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          handleLogoFile(file);
                        }}
                        className="hidden"
                      />
                      <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2">
                        <button
                          type="button"
                          onClick={() => logoInputRef.current?.click()}
                          className="shrink-0 rounded-lg bg-white/15 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-white/25"
                        >
                          انتخاب
                        </button>
                        <span dir="ltr" className="min-w-0 flex-1 truncate text-sm text-white/65">
                          {cardMeta.logoName}
                        </span>
                        {cardMeta.logoSrc !== defaultLogoSrc && (
                          <button
                            type="button"
                            onClick={resetLogo}
                            className="shrink-0 rounded-lg border border-white/10 p-1.5 text-white/70 transition hover:border-red-400/40 hover:bg-red-500/20 hover:text-red-200"
                            aria-label="Reset logo"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </label>

                    <label className="flex flex-col gap-2">
                      <span className="flex items-center gap-2 text-sm text-white/80" dir="rtl">
                        <Palette className="h-4 w-4 text-orange-300" />
                        شعار شرکت
                      </span>
                      <input
                        name="slogan"
                        value={cardMeta.slogan}
                        onChange={handleMetaChange}
                        dir="ltr"
                        placeholder={defaultSlogan}
                        className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-orange-400"
                      />
                    </label>

                    <div className="flex flex-col gap-2 rounded-xl border border-white/15 bg-white/10 p-3">
                      <label className="flex items-center justify-between gap-2">
                        <span className="flex items-center gap-2 text-sm font-medium text-white/80" dir="rtl">
                          <Rows2 className="h-4 w-4 text-orange-300" />
                          لوگوی دوم در سمت چپ
                        </span>
                        <input
                          name="showLeftLogo"
                          type="checkbox"
                          checked={cardMeta.showLeftLogo}
                          onChange={handleMetaChange}
                          className="h-4 w-4 cursor-pointer accent-orange-500"
                        />
                      </label>

                      {cardMeta.showLeftLogo && (
                        <div className="flex items-center gap-2 border-t border-white/10 pt-2">
                          <input
                            ref={leftLogoInputRef}
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                              const file = event.target.files?.[0];
                              handleLeftLogoFile(file);
                            }}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => leftLogoInputRef.current?.click()}
                            className="shrink-0 rounded-lg bg-white/15 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-white/25"
                          >
                            انتخاب
                          </button>
                          <span dir="ltr" className="min-w-0 flex-1 truncate text-sm text-white/65">
                            {cardMeta.leftLogoName}
                          </span>
                          {cardMeta.leftLogoSrc !== defaultLogoSrc && (
                            <button
                              type="button"
                              onClick={resetLeftLogo}
                              className="shrink-0 rounded-lg border border-white/10 p-1.5 text-white/70 transition hover:border-red-400/40 hover:bg-red-500/20 hover:text-red-200"
                              aria-label="Reset left logo"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    <label className="flex flex-col gap-2">
                      <span className="flex items-center gap-2 text-sm text-white/80" dir="rtl">
                        <WalletCards className="h-4 w-4 text-orange-300" />
                        نوعیت بسته
                      </span>
                      <input
                        name="packageName"
                        value={cardMeta.packageName}
                        onChange={handleMetaChange}
                        dir="rtl"
                        placeholder="XXXX"
                        className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-orange-400"
                      />
                    </label>

                    <label className="flex flex-col gap-2">
                      <span className="flex items-center gap-2 text-sm text-white/80" dir="rtl">
                        <UserSquare2 className="h-4 w-4 text-orange-300" />
                        نام نمایندگی
                      </span>
                      <input
                        name="agencyName"
                        value={cardMeta.agencyName}
                        onChange={handleMetaChange}
                        dir="rtl"
                        placeholder="XXXX"
                        className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-orange-400"
                      />
                    </label>

                    <label className="flex flex-col gap-2">
                      <span className="flex items-center gap-2 text-sm text-white/80" dir="rtl">
                        <Phone className="h-4 w-4 text-orange-300" />
                        شماره تماس
                      </span>
                      <input
                        name="phoneNumber"
                        value={cardMeta.phoneNumber}
                        onChange={handleMetaChange}
                        dir="ltr"
                        placeholder="07XXXXXXXX"
                        className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-orange-400"
                      />
                    </label>

                    <label className="flex flex-col gap-2">
                      <span className="flex items-center gap-2 text-sm text-white/80" dir="rtl">
                        <Palette className="h-4 w-4 text-orange-300" />
                        رنگ هیدر کارت
                      </span>
                      <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2">
                        <input
                          name="headerColor"
                          type="color"
                          value={cardMeta.headerColor}
                          onChange={handleMetaChange}
                          className="h-8 w-10 cursor-pointer rounded-lg border border-white/15 bg-transparent"
                        />
                        <input
                          name="headerColor"
                          value={cardMeta.headerColor}
                          onChange={handleMetaChange}
                          dir="ltr"
                          placeholder="#062460"
                          className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {cards.length > 0 && (
            <div className="screen-only mb-8 flex justify-center sm:justify-end">
              <button
                onClick={handlePrint}
                disabled={isPreparingPrint}
                className={`group relative w-full max-w-xs overflow-hidden rounded-2xl bg-[linear-gradient(120deg,var(--theme-header),var(--theme-accent))] px-6 py-4 text-base font-bold text-white shadow-2xl shadow-orange-500/30 transition-all duration-300 sm:w-auto sm:max-w-none sm:px-8 ${
                  isPreparingPrint
                    ? "cursor-wait opacity-85"
                    : "cursor-pointer hover:scale-[1.02] hover:shadow-orange-500/50"
                }`}
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative flex items-center justify-center gap-3">
                  <Printer className="h-5 w-5" />
                  {isPreparingPrint ? (
                    "آماده‌سازی چاپ..."
                  ) : (
                    <>
                      چاپ <span dir="ltr">{cards.length}</span> کارت
                    </>
                  )}
                </span>
              </button>
            </div>
          )}

          {cards.length > 0 && (
            <div className="relative">
              <div className="absolute -inset-1 rounded-[32px] bg-[linear-gradient(120deg,var(--theme-header),var(--theme-accent))] blur-lg opacity-30" />

              <div className="screen-only relative rounded-[28px] border border-white/20 bg-white/5 p-4 backdrop-blur-xl sm:p-6 lg:p-8">
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3" dir="rtl">
                  <div className="h-7 w-1.5 rounded-full bg-[linear-gradient(to_bottom,var(--theme-header),var(--theme-accent))]" />
                  <h2 className="text-lg font-bold text-white sm:text-xl">پیش‌نمایش کارت‌ها</h2>
                  <span className="text-sm text-white/40 sm:mr-auto" dir="ltr">
                    {cards.length} عدد
                  </span>
                </div>

                <CardList data={cards} />
              </div>

              {isPrintReady && (
                <div id="printable-area" className="print-only">
                  <CardList data={cards} paginate />
                </div>
              )}
            </div>
          )}

          {cards.length === 0 && !fileName && (
            <div className="screen-only py-16 text-center">
              <div
                dir="rtl"
                className="inline-flex flex-wrap items-center justify-center gap-x-1 gap-y-1 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white/50 backdrop-blur-xl"
              >
                <UploadCloud className="h-4 w-4" />
                <span>برای دیدن کارت‌ها فایل</span>
                <span dir="ltr" className="font-medium text-white/70">
                  Excel
                </span>
                <span>یا</span>
                <span dir="ltr" className="font-medium text-white/70">
                  CSV
                </span>
                <span>را انتخاب کنید</span>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="screen-only relative mt-auto border-t border-white/10 bg-slate-950/30 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center sm:px-6">
          <p dir="ltr" className="text-xs tracking-wider text-slate-300/70">
            © 2026 Prepared by Ahmad Seyar Rasoli
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
