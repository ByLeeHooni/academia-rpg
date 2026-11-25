#!/usr/bin/env python3
"""Gera dist/academia.html (arquivo único) juntando index.html, css/, js/ e assets/."""
import re, base64, pathlib
r = pathlib.Path(__file__).resolve().parent.parent
img = "url(data:image/png;base64," + base64.b64encode((r / "assets/monokuma.png").read_bytes()).decode() + ")"
h = (r / "index.html").read_text(encoding="utf8")
h = re.sub(r'<link rel="stylesheet" href="([^"]+)">\n?', lambda m: "<style>" + (r / m[1]).read_text(encoding="utf8").replace("url(../assets/monokuma.png)", img) + "</style>\n", h)
h = re.sub(r'<script src="([^"]+)"></script>\n?', lambda m: "<script>" + (r / m[1]).read_text(encoding="utf8") + "</script>\n", h)
(r / "dist").mkdir(exist_ok=True)
(r / "dist/academia.html").write_text(h, encoding="utf8")
print("dist/academia.html gerado:", len(h) // 1024, "KB")
