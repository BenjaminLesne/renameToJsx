const fs = require("fs");
const path = require("path");
const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;

function renameFiles(dirPath) {
  const files = fs.readdirSync(dirPath, { withFileTypes: true });

  files.forEach((file) => {
    const filePath = path.join(dirPath, file.name);

    if (file.isFile() && file.name.endsWith(".js")) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      let hasJSX = false;

      try {
        const ast = parse(fileContent, {
          sourceType: "module",
          plugins: ["jsx"],
        });

        traverse(ast, {
          JSXElement() {
            hasJSX = true;
          },
        });
      } catch (err) {}

      if (hasJSX) {
        const newPath = path.join(dirPath, file.name.replace(/\.js$/, ".jsx"));
        fs.renameSync(filePath, newPath);
      }
    } else if (file.isDirectory()) {
      renameFiles(filePath);
    }
  });
}

renameFiles(process.cwd());
