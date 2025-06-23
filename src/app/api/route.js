import fs from 'fs';
import path from 'path';

export async function POST(request) {
  const body = await request.json();
  const { title, name, pass } = body;

  const content = `---
title: ${title}
name: ${name}
pass: ${pass}
---`;

  const dir = path.join(process.cwd(), 'markdown');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  const filename = `${Date.now()}.md`;
  fs.writeFileSync(path.join(dir, filename), content, 'utf8');

  return new Response(JSON.stringify({ message: '保存しました' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
