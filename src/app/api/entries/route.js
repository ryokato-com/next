import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET() {
  const dir = path.join(process.cwd(), 'markdown');
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];

  const entries = files.map((file) => {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const { data } = matter(content);
    return {
      ...data,
      filename: file, // ← 削除用にファイル名を含める
    };
  });

  return new Response(JSON.stringify(entries), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
