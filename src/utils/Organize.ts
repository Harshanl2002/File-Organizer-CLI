import fs from "fs";
import path from "path";
import { isHiddenOrSystemFile, isProtectedSystemFolder } from "./fileFilter";

const FILE_CATEGORIES: Record<string, string[]> = {
  Images: ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"],
  Documents: ["pdf", "docx", "doc", "xlsx", "pptx", "txt", "md"],
  Videos: ["mp4", "avi", "mov", "mkv", "webm"],
  Audio: ["mp3", "wav", "flac", "aac", "ogg"],
  Archives: ["zip", "rar", "7z", "tar", "gz"],
  Code: ["js", "ts", "html", "css", "py", "java", "c", "cpp"],
};

function getFileCategory(ext: string): string {
  ext = ext.toLowerCase().replace(".", "");
  for (const [category, extensions] of Object.entries(FILE_CATEGORIES)) {
    if (extensions.includes(ext)) return category;
  }
  return "General";
}

async function organizeFilesByType(directory: string): Promise<void> {
  const items = await fs.promises.readdir(directory);

  for (const item of items) {
    const fullPath = path.join(directory, item);
    const stat = await fs.promises.stat(fullPath);

    if (stat.isDirectory()) continue;
    if (isHiddenOrSystemFile(item) || isProtectedSystemFolder(fullPath)) continue;

    const ext = path.extname(item);
    const category = getFileCategory(ext);

    const destFolder = path.join(directory, category);
    await fs.promises.mkdir(destFolder, { recursive: true });

    const destPath = path.join(destFolder, item);
    await fs.promises.rename(fullPath, destPath);

    console.log(`Moved: ${item} → ${category}/`);
  }
}

export default organizeFilesByType;