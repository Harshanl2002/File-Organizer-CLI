import { browseFilesAndFolders } from "./utils/BrowseFolders";
import { getAllDiskNames } from "./utils/getDrives";
import ask from "./utils/Inquire";

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
        const userDrive = await  getUserDriveChoice();
        let userSelectedPath = await browseFilesAndFolders(`${userDrive}//`);
        console.log(userSelectedPath);
    }catch(err){
        console.log("Unknown Error");
        return;
    }
}

mainApp();
