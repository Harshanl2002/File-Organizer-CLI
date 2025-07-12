# 🗂️ FileOrganizer CLI

A simple and fast cross-platform CLI tool that organizes files into categorized folders based on file type — keep your directories clean with a single command!

---

## ✨ Features

- Automatically organizes files into folders like:
  - `Images/`, `Documents/`, `Videos/`, `Audio/`, `Archives/`, `Code/`, and `General/`
- Cross-platform support (Windows, macOS, Linux)
- Lightweight, fast, and written in TypeScript
- No config needed – just run and clean your mess!

---

## 📦 Download & Installation

### 🔹 For Windows Users
- Go to the [Releases](https://github.com/your-username/FileOrganizer-cli/releases) page
- Download the latest `.exe` file
-double-click to launch (you may pass the folder path as an argument)

### 🔸 For macOS & Linux Users (Node.js Required)
- Install Node.js (v14 or newer)
- Download the source code:
- Option 1: Clone the repository
    ```
    git clone https://github.com/Harshanl2002/File-Organizer-CLI.git
    ```
- Option 2: Download from Releases

    - Go to the Releases tab

    - Download "Source code (zip)"

    - Extract the archive and navigate into the folder

- Install dependencies
    ```
    npm install
    ```
- Run the tool
    ```
    npm start
    ```
## 🚀 Example Output
```
downloads/
├── Images/
│   └── photo.jpg
├── Documents/
│   └── resume.pdf
├── Code/
│   └── script.ts
├── General/
│   └── unknownfile.xyz
📁 File Categories
```
| Category   | Extensions                                      |
|------------|-------------------------------------------------|
| Images     | jpg, jpeg, png, gif, bmp, svg, webp             |
| Documents  | pdf, doc, docx, xls, xlsx, ppt, txt, md         |
| Videos     | mp4, avi, mov, mkv, webm                        |
| Audio      | mp3, wav, flac, aac, ogg                        |
| Archives   | zip, rar, 7z, tar, gz                           |
| Code       | js, ts, html, css, py, java, c, cpp             |
| General    | Everything else                                 |

## 🔧 Coming Soon
- Recursive folder support
- Dry-run & undo mode
- Custom file type mapping via config
- Auto watch mode

## 🙌 Contributions & Feedback
- Suggestions and contributions are welcome! Feel free to open an issue or submit a pull request.