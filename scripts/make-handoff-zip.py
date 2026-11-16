# Packs the project into animle-handoff.zip, without installed packages or build output.
# Run from the project root: python scripts/make-handoff-zip.py
import os
import zipfile

SKIP_DIRS = {"node_modules", "dist", "dist-artifact", ".cache", "test-results", "playwright-report", ".git"}
SKIP_EXT = {".zip", ".log"}
out = "animle-handoff.zip"
if os.path.exists(out):
    os.remove(out)
count = 0
with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
    for folder, dirs, files in os.walk("."):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for name in files:
            if os.path.splitext(name)[1] in SKIP_EXT:
                continue
            path = os.path.join(folder, name)
            # Forward slashes, so the archive opens correctly on every system.
            z.write(path, "animle/" + os.path.relpath(path, ".").replace(os.sep, "/"))
            count += 1
print(f"{out}: {count} files, {os.path.getsize(out) / 1e6:.1f} MB")
