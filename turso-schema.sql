-- Execute no Turso para criar as tabelas (Turso CLI ou Dashboard).
-- Exemplo: turso db shell <seu-db> < turso-schema.sql

-- Confirmações de presença (nome da tabela: confirmacao)
CREATE TABLE IF NOT EXISTS confirmacao (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  guests TEXT NOT NULL DEFAULT '1',
  attendance TEXT NOT NULL CHECK (attendance IN ('sim', 'nao')),
  dietary TEXT,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Presentes: o que cada convidado vai dar (aviso dos noivos)
CREATE TABLE IF NOT EXISTS presentes (
  id TEXT PRIMARY KEY,
  guest_name TEXT NOT NULL,
  present_description TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
