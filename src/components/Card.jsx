import { createElement, memo } from "react";
import {
  Building2,
  Lock,
  Package,
  Phone,
  Router,
  User,
  Wifi,
} from "lucide-react";

const InfoCell = ({
  icon,
  label,
  value,
  valueDir = "rtl",
  tone = "default",
  labelClassName = "",
  valueClassName = "",
}) => {
  const cellClassName = tone === "accent" ? "card-cell card-cell--accent" : "card-cell";

  return (
    <div className={cellClassName}>
      <div className="card-cell-content">
        <span className="card-cell-meta">
          {createElement(icon, { className: "card-cell-icon" })}
          <span className={`card-cell-label ${labelClassName}`.trim()}>{label}</span>
        </span>

        <span dir={valueDir} className={`card-cell-value ${valueClassName}`.trim()}>
          {value}
        </span>
      </div>
    </div>
  );
};

const headerStyle = {
  background: "linear-gradient(to left, #4b6089, var(--theme-header, #062460), var(--theme-accent, #f97316))",
};

const Card = ({ item }) => {
  return (
    <div
      dir="rtl"
      className="print-ready-card flex h-full w-full flex-col overflow-hidden rounded-[20px] border border-slate-200 bg-white font-[Calibri] shadow-md"
    >
      <div
        className="card-header relative overflow-hidden px-2.5 py-2 text-white"
        style={headerStyle}
      >
        <div className="absolute inset-x-0 top-0 h-full opacity-20">
          <div className="absolute -right-4 top-1 h-6 w-24 rounded-full bg-white/20 blur-md" />
          <div className="absolute left-6 top-3 h-5 w-20 rounded-full bg-white/15 blur-md" />
        </div>

        <div className="pointer-events-none absolute inset-x-3 top-2 z-10 flex items-center justify-between">
          <Router className="h-4.5 w-4.5 text-white/55" />
          <Wifi className="h-4.5 w-4.5 text-white" />
        </div>

        <div className="card-wave card-wave--primary pointer-events-none absolute inset-x-0 bottom-0 z-0 overflow-hidden leading-none opacity-80">
          <svg
            viewBox="0 0 400 32"
            preserveAspectRatio="none"
            className="block h-3.5 w-full text-white/25"
            aria-hidden="true"
          >
            <path
              d="M0 18 C 35 30, 70 2, 105 14 S 175 30, 210 18 S 280 2, 315 14 S 365 30, 400 18 L400 32 L0 32 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="card-wave card-wave--secondary pointer-events-none absolute inset-x-0 bottom-0 z-0 overflow-hidden leading-none opacity-70">
          <svg
            viewBox="0 0 400 42"
            preserveAspectRatio="none"
            className="block h-4.5 w-full text-white/35"
            aria-hidden="true"
          >
            <path
              d="M0 23 C 30 6, 72 37, 112 21 S 188 3, 224 18 S 300 39, 340 23 S 382 10, 400 15 L400 42 L0 42 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="card-wave card-wave--glow pointer-events-none absolute inset-x-0 bottom-0 z-0 overflow-hidden leading-none opacity-45">
          <svg
            viewBox="0 0 400 30"
            preserveAspectRatio="none"
            className="block h-2.5 w-full text-orange-100/50"
            aria-hidden="true"
          >
            <path
              d="M0 20 C 40 8, 78 26, 120 18 S 198 7, 238 16 S 314 28, 356 18 S 388 10, 400 13 L400 30 L0 30 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="card-header-content relative z-10 flex min-h-[44px] items-center justify-center pl-10 pr-16">
          <div className="min-w-0 text-center">
            <h1 className="card-title text-[11px] font-extrabold leading-tight">
              شرکت خدمات انترنتی اجمل روښان
            </h1>
            <p className="card-subtitle text-[8px] text-white/80">
              Ajmal Roshan Fastest Forever
            </p>
          </div>

          <div className="card-logo-wrap absolute right-1 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xl border border-white/30 bg-white/90 shadow-sm">
            <img src="/logo.png" alt="logo" className="card-logo-img h-10 w-10 object-contain" />
          </div>
        </div>
      </div>

      <div className="card-body flex h-full flex-1 flex-col justify-between p-2">
        <div className="card-fields">
          <div className="card-row card-row-split">
            <InfoCell
              icon={User}
              label="نام کاربری"
              value={item.username}
              valueDir="ltr"
              labelClassName="card-cell-label--primary"
              valueClassName="card-cell-value--primary"
            />
            <InfoCell
              icon={Lock}
              label="رمز"
              value={item.password}
              valueDir="ltr"
              labelClassName="card-cell-label--primary"
              valueClassName="card-cell-value--primary"
            />
          </div>

          <div className="card-row card-row-split">
            <InfoCell
              icon={Building2}
              label="نمایندگی"
              value={item.agencyName}
              labelClassName="card-cell-label--primary"
              valueClassName="card-cell-value--primary"
            />
            <InfoCell
              icon={Package}
              label="نوعیت بسته"
              value={item.package}
              valueDir="ltr"
              tone="accent"
              labelClassName="card-cell-label--package"
              valueClassName="card-cell-value--package"
            />
          </div>
        </div>

        <div className="card-footer">
          <div className="footer-top-row">
            <div className="footer-phone">
              <span className="card-cell-meta footer-phone-label">
                <Phone className="card-cell-icon" />
                <span className="card-cell-label">شماره تماس</span>
              </span>

              <span dir="ltr" className="footer-phone-value">
                {item.phoneNumber}
              </span>
            </div>

            <div className="serial-badge">
              <span dir="ltr">{item.serialNumber}</span>
            </div>
          </div>

          <div className="footer-note">
            <span>برای معلومات بسته خود 10.11.12.13 را در مرورگر تان جستجو کنید</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Card);
