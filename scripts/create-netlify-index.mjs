import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const clientDir = "dist/client";
const assetsDir = join(clientDir, "assets");
const files = await readdir(assetsDir);

const cssFile = files.find((file) => file.startsWith("styles-") && file.endsWith(".css"));
const jsFiles = files.filter((file) => file.endsWith(".js"));

let entryFile = "";
for (const file of jsFiles) {
  const contents = await readFile(join(assetsDir, file), "utf8");
  if (contents.includes("hydrateRoot(document")) {
    entryFile = file;
    break;
  }
}

if (!cssFile || !entryFile) {
  throw new Error("Could not find Netlify static CSS or client entry asset.");
}

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Stacklet lets ops teams ship approval flows, admin panels, and workflow trackers on top of Postgres or Supabase."
    />
    <title>Stacklet — Internal tools without the engineering queue</title>
    <link rel="stylesheet" href="/assets/${cssFile}" />
  </head>
  <body>
    <script type="module" src="/assets/${entryFile}"></script>
  </body>
</html>
`;

await writeFile(join(clientDir, "index.html"), html);
