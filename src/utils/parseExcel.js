import * as XLSX from "xlsx";

export const parseExcel = (file, callback) => {
  const reader = new FileReader();

  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });

    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    const result = [];

    // از ردیف دوم (index 1) چون اولی header است
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];

      if (!row) continue;

      // کارت اول
      if (row[1] && row[2]) {
        result.push({
          username: row[1],
          password: row[2],
          package: row[3],
        });
      }

      // کارت دوم
      if (row[6] && row[7]) {
        result.push({
          username: row[6],
          password: row[7],
          package: row[8],
        });
      }
    }

    callback(result);
  };

  reader.readAsArrayBuffer(file);
};