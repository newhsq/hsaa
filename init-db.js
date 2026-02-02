// init-db.js
// سكريبت Node.js لتهيئة قاعدة بيانات SQLite من ملف SQL
const fs = require('fs');
const Database = require('better-sqlite3');

const dbPath = 'database.sqlite';
const sqlPath = 'migrations/0000_wide_madame_hydra.sql';

if (!fs.existsSync(sqlPath)) {
  console.error('ملف SQL غير موجود:', sqlPath);
  process.exit(1);
}

const sql = fs.readFileSync(sqlPath, 'utf8');
const statements = sql.split('--> statement-breakpoint');

const db = new Database(dbPath);

try {
  db.exec('PRAGMA foreign_keys = ON;');
  for (const stmt of statements) {
    if (stmt.trim()) {
      db.exec(stmt);
    }
  }
  console.log('تم إنشاء جميع الجداول بنجاح في', dbPath);
} catch (err) {
  console.error('خطأ أثناء تنفيذ SQL:', err.message);
  process.exit(1);
}
finally {
  db.close();
}
