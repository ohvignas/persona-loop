#!/usr/bin/env node
// Validates plugin JSON manifests and the frontmatter of agents, commands and skills. No dependencies.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.argv[2] ?? ".";
const errors = [];

function readJson(rel) {
  try {
    return JSON.parse(readFileSync(join(root, rel), "utf8"));
  } catch (e) {
    errors.push(`${rel}: invalid JSON (${e.message})`);
    return null;
  }
}

function frontmatter(rel) {
  const text = readFileSync(join(root, rel), "utf8");
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) {
    errors.push(`${rel}: missing frontmatter`);
    return {};
  }
  const fields = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([A-Za-z-]+):\s*(.*)$/);
    if (kv) fields[kv[1]] = kv[2];
  }
  return fields;
}

const plugin = readJson(".claude-plugin/plugin.json");
if (plugin && !/^[a-z0-9-]+$/.test(plugin.name ?? "")) errors.push("plugin.json: name must be kebab-case");
const market = readJson(".claude-plugin/marketplace.json");
if (market && plugin && !market.plugins?.some((p) => p.name === plugin.name)) {
  errors.push("marketplace.json: does not list the plugin by its plugin.json name");
}

for (const f of readdirSync(join(root, "agents"))) {
  if (!f.endsWith(".md")) continue;
  const fm = frontmatter(`agents/${f}`);
  if (fm.name !== f.replace(/\.md$/, "")) errors.push(`agents/${f}: name must equal file name`);
  if (!fm.description) errors.push(`agents/${f}: description required`);
}
for (const f of readdirSync(join(root, "commands"))) {
  if (!f.endsWith(".md")) continue;
  if (!frontmatter(`commands/${f}`).description) errors.push(`commands/${f}: description required`);
}
for (const d of readdirSync(join(root, "skills"))) {
  const rel = `skills/${d}/SKILL.md`;
  if (!existsSync(join(root, rel))) {
    errors.push(`${rel}: missing`);
    continue;
  }
  const fm = frontmatter(rel);
  if (fm.name !== d) errors.push(`${rel}: name must equal folder name`);
  if (!fm.description) errors.push(`${rel}: description required`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("persona-loop: structure valid");
