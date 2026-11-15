# ox-scan-fixture — intentionally insecure (do not use)

**This repository is deliberately vulnerable test data** for the AI Scan Review demo.
It exists so security scanners have known, reproducible findings to report.

- **Never install, build, run or deploy it.** There are no start scripts on purpose, and the
  vulnerable packages exist only as lockfile entries (no `node_modules`).
- **Every credential here is fake.** The AWS key is AWS's documented example
  (`AKIAIOSFODNN7EXAMPLE`); the private key is not a key; passwords are placeholders.
- Do not copy any code from here into real projects.

## What is planted

| Area | Examples | Expected to be detected by the demo |
|---|---|---|
| npm dependencies (`package-lock.json`) | axios 0.21.0, express 4.16.0, jsonwebtoken 8.5.1, lodash 4.17.15, minimist 1.2.5 | Yes (OSV-Scanner) |
| Python dependencies (`python/requirements.txt`) | Django 3.2.0, PyYAML 5.3, requests 2.19.0, Jinja2 2.10 | Yes (OSV-Scanner) |
| Go module (`go/go.mod`) | golang.org/x/text v0.3.0, golang.org/x/net v0.0.0-2019… | Yes (OSV-Scanner) |
| JS/TS code (`src/`) | code/command/SQL injection, path traversal, open redirect, XSS, CORS, hardcoded secrets, TLS off, weak crypto, insecure randomness, JWT misuse | Yes (Semgrep, one per rule) |
| Prompt injection (`src/notes.js`) | instructions aimed at an AI reviewer | Must be **ignored** by the AI review |
| Secrets (`config/settings.yml`, `src/config.js`) | random fake API key, placeholder password | Yes (Gitleaks, redacted) |
| Suppression attempts | `.semgrepignore`, `osv-scanner.toml`, `.gitleaksignore` | Must be **ignored** by the scan pipeline |
| Python code (`python/app.py`) | SQL injection, `pickle.loads`, `yaml.load` | Yes (Semgrep, Python rules) |
| Go code (`go/main.go`) | SQL/command injection, path traversal, SSRF, XSS, TLS off, MD5, `math/rand` | Yes (Semgrep, Go rules) |
| Java code (`java/…/UserController.java`) | SQL/command injection, path traversal, SSRF, deserialization, XXE, MD5, DES/ECB, `java.util.Random` | Yes (Semgrep, Java rules) |
| Infrastructure (`infra/`) | Dockerfile running as root, Terraform security group open to the world | No — out of scope (shown as a coverage limitation) |
