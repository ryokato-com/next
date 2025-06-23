'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({ title: '', name: '', pass: '' });
  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState([]);

  // 初回 or 保存・削除後に一覧取得
  const fetchEntries = async () => {
    const res = await fetch('/api/entries');
    const data = await res.json();
    setEntries(data);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ title: '', name: '', pass: '' });
    await fetchEntries();
  };

  const handleDelete = async (filename) => {
    await fetch(`/api/delete/${filename}`, {
      method: 'DELETE',
    });
    await fetchEntries();
  };

  // リアルタイムフィルタリング
  const filtered = entries.filter(
    (entry) =>
      entry.title.includes(search) || entry.name.includes(search)
  );

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">データ登録</h1>
      <div className="space-y-2 mb-6">
        <input name="title" placeholder="タイトル" className="input" value={form.title} onChange={handleChange} />
        <input name="name" placeholder="名前" className="input" value={form.name} onChange={handleChange} />
        <input name="pass" placeholder="パス" className="input" value={form.pass} onChange={handleChange} />
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">保存</button>
      </div>

      <h2 className="text-xl font-semibold mt-6">検索</h2>
      <input
        placeholder="リアルタイム検索"
        className="input mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul className="space-y-2">
        {filtered.length > 0 ? (
          filtered.map((entry, i) => (
            <li key={entry.filename || i} className="border p-2 rounded flex justify-between items-center">
              <span>
                <strong>{entry.title}</strong> by {entry.name}
              </span>
              {entry.filename && (
                <button
                  onClick={() => handleDelete(entry.filename)}
                  className="text-sm text-red-500 hover:underline"
                >
                  削除
                </button>
              )}
            </li>
          ))
        ) : (
          <li className="text-gray-500">該当するデータがありません</li>
        )}
      </ul>
    </div>
  );
}
