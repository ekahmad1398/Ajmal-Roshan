import * as XLSX from "xlsx";

const HEADER_ALIASES = {
  username: ["username", "user name", "user", "نام کاربری", "یوزرنیم"],
  password: ["password", "pass", "رمز", "پسورد", "کلمه عبور"],
  package: ["package", "plan", "pkg", "بسته", "پکیج"],
};

const LEGACY_GROUPS = [
  { username: 1, password: 2, package: 3 },
  { username: 6, password: 7, package: 8 },
];

const PACKAGE_NAME_PATTERN = /(\d+(?:[.,]\d+)?)\s*(kb|mb|gb|tb)\b/i;

const normalizeCell = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "")
    .replace(/[^\p{L}\p{N}]/gu, "");

const detectField = (value) => {
  const normalizedValue = normalizeCell(value);

  if (!normalizedValue) {
    return null;
  }

  for (const [field, aliases] of Object.entries(HEADER_ALIASES)) {
    const isMatch = aliases.some((alias) => {
      const normalizedAlias = normalizeCell(alias);
      return (
        normalizedValue === normalizedAlias ||
        normalizedValue.startsWith(normalizedAlias) ||
        normalizedValue.endsWith(normalizedAlias)
      );
    });

    if (isMatch) {
      return field;
    }
  }

  return null;
};

const detectGroupsFromHeader = (headerRow = []) => {
  const groups = [];
  let currentGroup = {};

  headerRow.forEach((cell, index) => {
    const field = detectField(cell);

    if (!field) {
      return;
    }

    if (field === "username" && Object.keys(currentGroup).length > 0) {
      groups.push(currentGroup);
      currentGroup = {};
    }

    if (currentGroup[field] !== undefined) {
      groups.push(currentGroup);
      currentGroup = {};
    }

    currentGroup[field] = index;
  });

  if (Object.keys(currentGroup).length > 0) {
    groups.push(currentGroup);
  }

  return groups.filter((group) => group.username !== undefined && group.password !== undefined);
};

const extractPackageFromName = (value) => {
  const normalizedValue = String(value ?? "").trim();

  if (!normalizedValue) {
    return "";
  }

  const match = normalizedValue.match(PACKAGE_NAME_PATTERN);

  if (!match) {
    return "";
  }

  const amount = match[1].replace(",", ".");
  const unit = match[2].toUpperCase();

  return `${amount}${unit}`;
};

export const parseExcel = (file, callback) => {
  const reader = new FileReader();

  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const result = [];
    const fileNameWithoutExtension = String(file?.name ?? "").replace(/\.[^.]+$/, "");

    workbook.SheetNames.forEach((sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const headerRow =
        rows.find((row) => Array.isArray(row) && row.some((cell) => detectField(cell))) ?? [];
      const headerIndex = rows.indexOf(headerRow);
      const detectedGroups = detectGroupsFromHeader(headerRow);
      const activeGroups = detectedGroups.length > 0 ? detectedGroups : LEGACY_GROUPS;
      const startRowIndex = detectedGroups.length > 0 && headerIndex >= 0 ? headerIndex + 1 : 1;
      const packageFromName =
        extractPackageFromName(sheetName) || extractPackageFromName(fileNameWithoutExtension);

      for (let i = startRowIndex; i < rows.length; i += 1) {
        const row = rows[i];

        if (!row) {
          continue;
        }

        activeGroups.forEach((group) => {
          const username = row[group.username];
          const password = row[group.password];
          const packageValue = group.package !== undefined ? row[group.package] : "";

          if (!username || !password) {
            return;
          }

          result.push({
            username,
            password,
            package: packageFromName || packageValue || "",
          });
        });
      }
    });

    callback(result);
  };

  reader.readAsArrayBuffer(file);
};
