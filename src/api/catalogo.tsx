// pages/api/productos.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const jsonDirectory = path.join(process.cwd(), 'data');
  const fileContents = await fs.readFile(
    jsonDirectory + '/catalogo.json',
    'utf8'
  );
  const productos = JSON.parse(fileContents);
  res.status(200).json(productos);
}
