import fs, { Dirent } from 'fs';
import { isHiddenOrSystemFile, isProtectedSystemFolder } from './fileFilter';

export const getAllFileNames = async (currentPath: string): Promise<Dirent<string>[]> => {
    try {
        const entries =  fs.readdirSync(currentPath, { withFileTypes: true });
        const filteredEntries = entries.filter(eachEntry => {
            const isHiddenFile = isHiddenOrSystemFile(eachEntry.name);
            const isSystemFolder = isProtectedSystemFolder(`${currentPath}${eachEntry.name}`);
            return !isHiddenFile && !isSystemFolder;
        });
        return filteredEntries.sort((a, b) => {
            if (a.isDirectory() && !b.isDirectory()) return -1;
            if (!a.isDirectory() && b.isDirectory()) return 1;
            return a.name.localeCompare(b.name);
        });
    } catch (error) {
        throw error;
    }
}