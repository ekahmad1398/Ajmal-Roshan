import {
  Building2,
  Hash,
  Lock,
  Package,
  Phone,
  Router,
  User,
  Wifi,
} from "lucide-react";

const Card = ({ item }) => {
  const headerStyle = {
    background: `linear-gradient(to left, #4b6089, ${item.headerColor || "#062460"}, #c94e12)`,
  };

  return (
    <div
      dir="rtl"
      className="print-ready-card flex h-full w-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white font-[Calibri] shadow-md"
    >
      <div
        className="card-header relative overflow-hidden px-2.5 py-2 text-white"
        style={headerStyle}
      >
        <div className="absolute inset-x-0 top-0 h-full opacity-20">
          <div className="absolute -right-4 top-1 h-6 w-24 rounded-full bg-white/20 blur-md" />
          <div className="absolute left-6 top-3 h-5 w-20 rounded-full bg-white/15 blur-md" />
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3 opacity-10">
          <Router className="h-4 w-4" />
          <Wifi className="h-4 w-4" />
        </div>

        <div className="absolute inset-x-0 bottom-0 overflow-hidden leading-none">
          <svg
            viewBox="0 0 400 32"
            preserveAspectRatio="none"
            className="block h-3 w-full text-white/15"
            aria-hidden="true"
          >
            <path
              d="M0 18 C 35 30, 70 2, 105 14 S 175 30, 210 18 S 280 2, 315 14 S 365 30, 400 18 L400 32 L0 32 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="relative flex items-center gap-2">
          <div className="card-logo-wrap flex h-9 w-9 items-center justify-center rounded-lg border border-white/30 bg-white/90 shadow-sm">
            <img src="/logo.png" alt="logo" className="card-logo-img h-7 w-7 object-contain" />
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="card-title truncate text-[12px] font-extrabold leading-tight">
              شرکت خدمات انترنی اجمل روشان
            </h1>
            <p className="text-[8px] text-white/80">Ajmal Roshan Fastest Forver</p>
          </div>
        </div>
      </div>

      <div className="card-body flex flex-1 flex-col p-2">
        <div className="card-fields flex flex-col gap-0.5">
          <div className="card-row flex items-center gap-1 rounded-md border border-slate-100 bg-slate-50 px-2 py-1.5">
            <div className="flex items-center gap-1 text-slate-500">
              <User className="h-3.5 w-3.5 text-blue-600" />
              <span className="text-[8px] font-semibold">نام کاربری</span>
            </div>
            <span className="flex-1" />
            <span dir="ltr" className="text-[9px] font-bold tracking-wide text-slate-900">
              {item.username}
            </span>
          </div>

          <div className="card-row flex items-center gap-1 rounded-md border border-slate-100 bg-slate-50 px-2 py-1.5">
            <div className="flex items-center gap-1 text-slate-500">
              <Lock className="h-3.5 w-3.5 text-blue-600" />
              <span className="text-[8px] font-semibold">رمز عبور</span>
            </div>
            <span className="flex-1" />
            <span dir="ltr" className="text-[9px] font-bold tracking-wider text-slate-900">
              {item.password}
            </span>
          </div>

          <div className="card-row flex items-center gap-1 rounded-md border border-orange-200 bg-orange-50 px-2 py-1.5">
            <div className="flex items-center gap-1 text-orange-700">
              <Package className="h-3.5 w-3.5" />
              <span className="text-[8px] font-semibold">بسته</span>
            </div>
            <span className="flex-1" />
            <span className="max-w-[58%] truncate text-[9px] font-extrabold text-orange-800">
              {item.package}
            </span>
          </div>

          <div className="card-row flex items-center gap-1 rounded-md border border-slate-100 bg-slate-50 px-2 py-1.5">
            <div className="flex items-center gap-1 text-slate-500">
              <Building2 className="h-3.5 w-3.5 text-blue-600" />
              <span className="text-[8px] font-semibold">نمایندگی</span>
            </div>
            <span className="flex-1" />
            <span className="max-w-[55%] truncate text-[8px] font-bold text-slate-800">
              {item.agencyName}
            </span>
          </div>
        </div>

        <div className="card-footer mt-auto flex flex-col gap-0.5 border-t border-slate-100 pt-0.5">
          <div className="footer-top-row flex items-center gap-1">
            <div className="footer-phone flex min-w-0 flex-1 items-center gap-1 rounded-md bg-slate-50 px-1.5 py-0.5 text-slate-700">
              <Phone className="h-3.5 w-3.5 text-blue-700" />
              <span dir="ltr" className="max-w-[72px] truncate text-[8px] font-bold">
                {item.phoneNumber}
              </span>
            </div>

            <div className="serial-badge rounded-md bg-slate-100 px-1.5 py-0.5 text-slate-700">
              <span className="inline-flex items-center gap-0.5 text-[6px] font-bold">
                <Hash className="h-2.5 w-2.5" />
                مسلسل:
                <span dir="ltr">{item.serialNumber}</span>
              </span>
            </div>
          </div>

          <div className="footer-note rounded-md bg-slate-100 px-1 py-px text-center text-slate-700">
            <span className="text-[7px] font-medium">
              برای معلومات بسته خود 10.11.12.13 را در مرورگر تان جستجو کنید
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
