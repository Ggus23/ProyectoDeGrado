import * as fs from 'fs';
import * as path from 'path';
import ExcelJS from 'exceljs';
import Papa from 'papaparse';
type Unit = {
  titulo: string;
  semana?: number;
  resultadosAprendizaje: string[];
  contenidos: string[];
  estrategias: string[];
};
export async function parseXlsxOrCsv(filePath: string): Promise<{ units: Unit[] }> {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.xlsx') {
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.readFile(filePath);
    const sheet = wb.worksheets[0];
    const units: Unit[] = [];
    sheet.eachRow((row, idx) => {
      if (idx === 1) return;
      const semana = Number(row.getCell(1).value) || undefined;
      const titulo = String(row.getCell(2).value || `Unidad ${idx - 1}`);
      const resultados = String(row.getCell(3).value || '')
        .split(/\n|;/)
        .map((s) => s.trim())
        .filter(Boolean);
      const contenidos = String(row.getCell(4).value || '')
        .split(/\n|;/)
        .map((s) => s.trim())
        .filter(Boolean);
      const estrategias = String(row.getCell(5).value || '')
        .split(/\n|;/)
        .map((s) => s.trim())
        .filter(Boolean);
      units.push({ titulo, semana, resultadosAprendizaje: resultados, contenidos, estrategias });
    });
    return { units };
  } else if (ext === '.csv') {
    const csv = fs.readFileSync(filePath, 'utf-8');
    const parsed = Papa.parse<string[]>(csv, { header: true });
    const units: Unit[] = [];
    for (const row of parsed.data as any[]) {
      const semana = row['semana'] ? Number(row['semana']) : undefined;
      const titulo = row['titulo'] || 'Unidad';
      const resultados = (row['resultados'] || '')
        .split(/\n|;/)
        .map((s: string) => s.trim())
        .filter(Boolean);
      const contenidos = (row['contenidos'] || '')
        .split(/\n|;/)
        .map((s: string) => s.trim())
        .filter(Boolean);
      const estrategias = (row['estrategias'] || '')
        .split(/\n|;/)
        .map((s: string) => s.trim())
        .filter(Boolean);
      units.push({ titulo, semana, resultadosAprendizaje: resultados, contenidos, estrategias });
    }
    return { units };
  } else {
    throw new Error('Formato no soportado');
  }
}
export function parsePdfStub(): never {
  throw new Error('parseo no soportado para pdf');
}
