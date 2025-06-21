import { getDiskInfo } from "node-disk-info";
import Drive from "node-disk-info/dist/classes/drive";


export const getAllDiskNames = async (): Promise<string[]> => {
    try {
        const allDiskInfos: Drive[] = await getDiskInfo();
        const drives: string[] = allDiskInfos.map(eachDisks => eachDisks.mounted);
        return drives;
    } catch (error) {
        console.error("Error On Fetching the Drives from the device.");
        throw error;
    }
}

export const getUserDiskInfo = async (): Promise<Drive[]> => {
    try {
        const allDiskInfos: Drive[] = await getDiskInfo();
        return allDiskInfos;
    } catch (error) {
        console.error("Error On Fetching the Drives from the device.");
        throw error;
    }
}