function openLatestPDF() {
    // Define the generic Downloads path
    var downloadsFolder = getDownloadsFolderPath(); // Using the function to get Downloads path

    // Get the latest PDF file in the Downloads folder
    var latestFile = getLatestFile(downloadsFolder, ".pdf");

    // Check if a PDF file was found
    if (latestFile) {
        // Open the PDF file using Sys.OleObject
        var shell = Sys.OleObject("WScript.Shell");
        shell.Run(latestFile);
        Log.Message("Opened the latest PDF: " + latestFile);
    } else {
        Log.Warning("No PDF files found in the Downloads folder.");
    }
}

function getDownloadsFolderPath() {
    // Get the path to the Downloads folder for the current user
    var shell = Sys.OleObject("WScript.Shell");
    var downloadsPath = shell.ExpandEnvironmentStrings("%USERPROFILE%\\Downloads\\");
    return downloadsPath;
}

function getLatestFile(folderPath, fileExtension) {
    var fso = Sys.OleObject("Scripting.FileSystemObject");
    var folder = fso.GetFolder(folderPath);
    var latestFile = null;

    // Loop through files in the folder
    for (var fileEnum = new Enumerator(folder.Files); !fileEnum.atEnd(); fileEnum.moveNext()) {
        var file = fileEnum.item();
        // Check for the desired file extension
        if (file.Name.toLowerCase().endsWith(fileExtension)) {
            // If no latest file is set or this file is newer, update latestFile
            if (!latestFile || file.DateLastModified > latestFile.DateLastModified) {
                latestFile = file;
            }
        }
    }

    return latestFile ? latestFile.Path : null;
}

// Call the function to open the latest PDF
openLatestPDF();
