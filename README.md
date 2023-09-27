# rename all .js files to .jsx

## Problem

Let's say you have a react project full of .js files.
You want to convert all .js files with .jsx inside to .jsx files.

## Solution
add to your project these dependencies :

```javascript
"@babel/parser": "^7.21.4",
"@babel/traverse": "^7.21.4"
```

then do:

```bash
cd path/to/folder/with/.js/files # usully your src folder
node path/to/renameToJsx.js
```
