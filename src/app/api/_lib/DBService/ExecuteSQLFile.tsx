import fs from 'fs';

export interface Env {
  DB: D1Database;
}

export async function ExecuteSQLFile(db: D1Database, migrationFile: string) {
  const migrationContent = fs.readFileSync(migrationFile);
  const migrationContentString = migrationContent.toString();
  const statements = migrationContentString.split(';').map(statement => statement.trim());

  const batchStatements = statements.map(statement => db.prepare(statement));

  try {
    await db.batch(batchStatements);
  } catch (error) {
    console.error('Error executing migration:', error);
  }
}
