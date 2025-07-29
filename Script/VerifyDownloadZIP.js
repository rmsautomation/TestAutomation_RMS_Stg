function openLastDownloadedZipFileAndVerifyNameContains(expectedText) {
  var fso = Sys.OleObject("Scripting.FileSystemObject");
  var shell = Sys.OleObject("Shell.Application");
 
  var userProfilePath = aqEnvironment.GetEnvironmentVariable("USERPROFILE");
  var downloadFolder = userProfilePath + "\\Downloads";
 
  if (!fso.FolderExists(downloadFolder)) {
    Log.Error("Downloads folder not found: " + downloadFolder);
    return;
  }
 
  var folder = fso.GetFolder(downloadFolder);
  var files = new Enumerator(folder.Files);
 
  var latestZip = null;
  var latestDate = new Date(0);
 
  for (; !files.atEnd(); files.moveNext()) {
    var file = files.item();
    if (fso.GetExtensionName(file.Name).toLowerCase() == "zip" &&
        file.DateLastModified > latestDate) {
      latestDate = file.DateLastModified;
      latestZip = file;
    }
  }
 
  if (!latestZip) {
    Log.Error("No ZIP file found in Downloads folder.");
    return;
  }
 
  var zipFilePath = downloadFolder + "\\" + latestZip.Name;
  Log.Message("Latest ZIP file found: " + latestZip.Name);
 
  var extractPath = Project.Path + "ExtractedZip\\";
  if (!fso.FolderExists(extractPath))
    fso.CreateFolder(extractPath);
 
  // Clean old files
  var extractedFolder = fso.GetFolder(extractPath);
  var extractedFiles = new Enumerator(extractedFolder.Files);
  for (; !extractedFiles.atEnd(); extractedFiles.moveNext()) {
    extractedFiles.item().Delete(true);
  }
 
  // Extract ZIP
  var zipFolder = shell.NameSpace(zipFilePath);
  var destFolder = shell.NameSpace(extractPath);
 
  if (zipFolder != null && destFolder != null) {
    destFolder.CopyHere(zipFolder.Items(), 16);
    Delay(3000); // Wait for extraction
 
    var found = false;
    var extractedItems = destFolder.Items();
 
    for (var i = 0; i < extractedItems.Count; i++) {
      var item = extractedItems.Item(i);
      if (item.Name.toLowerCase().indexOf(expectedText.toLowerCase()) !== -1) {
        found = true;
        Log.Checkpoint("Found file containing: '" + expectedText + "' -> " + item.Name);
        break;
      }
    }
 
    if (!found) {
      Log.Error("No file in the ZIP contains the text: '" + expectedText + "'");
    }
  } else {
    Log.Error("Error accessing ZIP or destination folder.");
  }
}