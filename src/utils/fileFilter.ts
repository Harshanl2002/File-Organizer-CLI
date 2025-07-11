
export function isHiddenOrSystemFile(fileName: string): boolean {
    // Exact system filenames (Windows/macOS/Linux)
    const systemFiles = [
        // Windows
        'pagefile.sys', 'hiberfil.sys', 'swapfile.sys',
        'bootmgr', 'ntldr', 'ntdetect.com',
        'io.sys', 'msdos.sys', 'thumbs.db', 'desktop.ini','Documents and Settings',

        // macOS
        '.ds_store', '.localized',

        // Linux
        'core', 'lost+found',
    ];

    // System-related file extensions (common to all platforms)
    const systemExtensions = [
        '.sys', '.dll', '.log', '.tmp', '.bak', '.old', '.swp', '.lock',
        '.dmp', '.dat', '.core', '.sav', '.cbm'
    ];
    const normalized = fileName.toLowerCase();

    // Check if hidden (starts with . or $)
    if (fileName.startsWith('.') || fileName.startsWith('$')) return true;

    // Exact match with system file names
    if (systemFiles.includes(normalized)) return true;

    // Match known system-related file extensions
    return systemExtensions.some(ext => normalized.endsWith(ext));
}

export function isProtectedSystemFolder(fullPath: string): boolean {
    const platform = process.platform;
    const normalized = fullPath.toLowerCase();
    if (platform === 'win32') {
        const protectedFolders: string[] = [
            'c://windows', 'c://program files', 'c://program files (x86)',
            'c://system volume information', 'c://$recycle.bin',
            'c://recovery', 'c://boot', 'c://users//default',
            'c://users//public', 'c://programdata'
        ];
        if (normalized.endsWith('appdata')) {
            return true;
        }
        return protectedFolders.some(folder => normalized.startsWith(folder));
    }

    if (platform === 'darwin' || platform === 'linux') {
        const protectedFolders: string[] = [
            '/etc', '/bin', '/usr', '/lib', '/sbin', '/var', '/boot', '/proc',
            '/sys', '/dev', '/run'
        ];
        return protectedFolders.some(folder => normalized.startsWith(folder));
    }

    return false;
}