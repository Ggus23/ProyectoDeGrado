// En route.ts
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'colegios.json'); // O usa el JSON procesado que generamos antes
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const colegiosData = JSON.parse(jsonData);

    // Asume que colegiosData es la estructura GeoJSON original
    // O si ya tienes el JSON procesado, ajústalo
    const features = colegiosData.features || colegiosData; // Ajusta según la estructura de tu JSON final

    const colegiosCochabamba = features
      .filter(
        (feature: any) => feature.properties && feature.properties.DEPARTAMEN === "COCHABAMBA"
      )
      .map((feature: any) => ({
        id: feature.properties.CODIGO_UE, // ¡IMPORTANTE: Usar CODIGO_UE!
        nombre: feature.properties.UNIDAD_EDU,
        distrito: feature.properties.DISTRITO, // Incluir distrito
        zona: feature.properties.ZONA,         // Incluir zona
      }));

    // Opcional: Eliminar duplicados aquí también si el JSON fuente aún los tiene
    const uniqueColegios = Array.from(new Map(colegiosCochabamba.map((item: { id: any; }) => [item.id, item])).values());


    return NextResponse.json(uniqueColegios);
  } catch (error) {
    console.error('Error reading or parsing JSON:', error);
    return NextResponse.json({ error: 'Failed to load colegios' }, { status: 500 });
  }
}