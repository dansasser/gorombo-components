import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { dirname } from 'path';

const src = 'src/theme.css';
const dest = 'dist/theme.css';

// Ensure dist directory exists
const destDir = dirname(dest);
if (!existsSync(destDir)) {
  mkdirSync(destDir, { recursive: true });
}

copyFileSync(src, dest);
console.log('Copied theme.css to dist/');
