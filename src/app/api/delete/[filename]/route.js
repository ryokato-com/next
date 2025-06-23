import fs from 'fs';
import path from 'path';

export async function DELETE(req, { params }) {
  const { filename } = params;
  const filePath = path.join(process.cwd(), 'markdown', filename);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return new Response(null, { status: 204 }); // No Content（成功）
  } else {
    return new Response('Not Found', { status: 404 });
  }
}
