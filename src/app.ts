import { getAllDiskNames } from "./utils/getDrives";
import ask from "./utils/Inquire";

const getUserInput = async () => {
    try {
        const drives: string[] = await getAllDiskNames();
        const { drive } = await ask([{
            type: "list",
            name: "drive",
            message: "Please Select the Drive",
            choices: drives
        }]);
        console.log("Selected Drive: ", drive);
    }
    catch (err) {
        console.log(err);
        return;
    }
}

getUserInput();
