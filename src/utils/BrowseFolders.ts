import Choice from "inquirer/lib/objects/choice";
import { getAllFileNames } from "./getSourcePath"
import ask from "./Inquire";

const pathList: string[] = [];

export const browseFilesAndFolders = async (path: string): Promise<string> => {
    try {
        if (pathList.length === 0 || pathList[pathList.length - 1] !== path) {
            pathList.push(path);
        }
        const entries = await getAllFileNames(path);

        const choices: Choice[] = entries.map(entry => ({
            name: entry.name,
            value: `${path}${entry.name}//`,
            disabled: !entry.isDirectory(),
            short: entry.name,
        }));

        const hasDirectory = entries.some(eachEntry => eachEntry.isDirectory());

        // Add "Go Back" option if not at root
        const goBackChoice = pathList.length > 1 ? [{
            name: "Go Back",
            value: "__GO_BACK__",
            disabled: false,
            short: "Go Back"
        }] : [];

        const { path: selectedPath } = await ask([{
            type: "list",
            name: "path",
            message: "Please Select the Folder to be organized:",
            choices: [
                {
                    name: "Organize",
                    value: `${path}Opt`,
                    disabled: false,
                    short: "Organize"
                },
                ...goBackChoice,
                ...choices
            ]
        }]);

        if (selectedPath === "__GO_BACK__") {
            pathList.pop(); // Remove current path
            const previousPath = pathList.pop(); // Get previous path
            if (previousPath) {
                return await browseFilesAndFolders(previousPath);
            } else {
                throw new Error("No previous path to go back to.");
            }
        }

        if (!hasDirectory || selectedPath.endsWith('Opt')) {
            return selectedPath.slice(0, -3);
        }

        return await browseFilesAndFolders(selectedPath);

    } catch (error) {
        throw error;
    }
}