import { browseFilesAndFolders } from "./utils/BrowseFolders";
import { isProtectedSystemFolder } from "./utils/fileFilter";
import { getAllDiskNames } from "./utils/getDrives";
import ask from "./utils/Inquire";
import * as path from 'path';
import organizeFilesByType from "./utils/Organize";

const getPath = async () => {
    try {
        return await ask([{
            type:"input",
            name:"path",
            message:"Please Enter the Path or Press Enter to Browse Files:"
        }])
    } catch (error) {
        throw Error("");
    }
}

const getUserDriveChoice = async () => {
    try {
        const drives: string[] = await getAllDiskNames();
        const { drive } = await ask([{
            type: "list",
            name: "drive",
            message: "Please Select the Drive",
            choices: drives
        }]);
        return drive;
    }
    catch (err) {
        throw err;
    }
}


const mainApp  = async ()=>{
    try{
        let userSelectedPath = "";
        const {path:userPath} = await getPath();
        if(userPath.length==0){
            const userDrive = await  getUserDriveChoice();
            userSelectedPath = await browseFilesAndFolders(`${userDrive}//`);
        }else{
            userSelectedPath = path.resolve(userPath);
        }
        if(isProtectedSystemFolder(userSelectedPath)){
            throw new Error("Can\'t Organize the System Folder/File.");
        }
        await organizeFilesByType(userSelectedPath);
    }catch(err){
       if(!(err instanceof Error && err.name === 'ExitPromptError')){
         console.log(err);
       }
        return;
    }
}
const confirmation = async () => {
    return await ask([{
        type: 'confirm',
        name: 'confirm',
        message: "Do You want to Continue?",
    }]);
};

(async () => {
    while (true) {
        await mainApp();
        const { confirm } = await confirmation();
        if(!confirm){
            break;
        }
    }
    console.log('👋 until next time!')
})();
