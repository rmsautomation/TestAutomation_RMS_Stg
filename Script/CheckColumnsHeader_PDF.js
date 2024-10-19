function checkColumnHeadersInPDF() {
  // Step 1: Collect all elements with role="columnheader"
  var columnHeaders = Aliases.browser.pageQms.FindElements("//*[@role='columnheader']");
  var headerList = [];

  // Function to clean and normalize the text by removing extra spaces
  function cleanText(text) {
    return text.replace(/\s+/g, ' ').trim(); // Replace multiple spaces with one and trim
  }

  // Loop through the collected elements and store unique cleaned text in headerList
  for (var i = 0; i < columnHeaders.length; i++) {
    var headerText = cleanText(columnHeaders[i].innerText);  // Clean the header text

    // Add to list only if it's not already there and if it's not empty
    if (headerText !== "" && headerList.indexOf(headerText) === -1) {
      headerList.push(headerText);
    }
  }

  // Log the collected unique and cleaned header elements
  Log.Message("Collected unique column headers: " + headerList.join(", "));

  // Step 2: Open the most recent PDF (assuming you have the openLastDownloadedFile function)
  var fso = Sys.OleObject("Scripting.FileSystemObject");
  var shell = Sys.OleObject("WScript.Shell");
  var homeFolder = shell.ExpandEnvironmentStrings("%USERPROFILE%");
  var downloadFolder = homeFolder + "\\Downloads";

  if (!fso.FolderExists(downloadFolder)) {
    Log.Error("Downloads folder not found: " + downloadFolder);
    return;
  }

  var folder = fso.GetFolder(downloadFolder);
  var files = new Enumerator(folder.Files);
  var latestFile = null;
  var latestDate = new Date(0);

  for (; !files.atEnd(); files.moveNext()) {
    var file = files.item();
    if (file.DateLastModified > latestDate) {
      latestDate = file.DateLastModified;
      latestFile = file;
    }
  }

  if (latestFile && aqFileSystem.GetFileExtension(latestFile.Name).toLowerCase() === "pdf") {
    var pdfPath = downloadFolder + "\\" + latestFile.Name;
    Log.Message("Opening PDF: " + pdfPath);

    // Step 3: Convert PDF content to text
    var pdfContent = PDF.ConvertToText(pdfPath);
    var cleanedPdfContent = cleanText(pdfContent);  // Clean the PDF content

    if (cleanedPdfContent !== "") {
      // Step 4: Check if each column header (or parts of it) are in the cleaned PDF content
      for (var j = 0; j < headerList.length; j++) {
        var header = headerList[j];
        var headerFragments = header.split(/\s+/);  // Split the header into words or fragments

        var allFragmentsFound = true;
        var searchStartIndex = 0;

        // Search for each fragment in sequence in the PDF content
        for (var k = 0; k < headerFragments.length; k++) {
          var fragment = headerFragments[k];

          // Search for the fragment starting from the last found index
          var fragmentIndex = cleanedPdfContent.indexOf(fragment, searchStartIndex);

          if (fragmentIndex === -1) {
            allFragmentsFound = false;
            break;
          } else {
            searchStartIndex = fragmentIndex + fragment.length;
          }
        }

        if (allFragmentsFound) {
          Log.Message("The PDF contains the header: " + header);
        } else {
          Log.Error("The PDF does NOT contain the header: " + header);
        }
      }
    } else {
      Log.Error("The PDF content is empty or could not be extracted.");
    }
  } else {
    Log.Error("No valid PDF file found in the Downloads folder.");
  }
}


function OpenLatestPDF() {
  var fso = Sys.OleObject("Scripting.FileSystemObject");
  var shell = Sys.OleObject("WScript.Shell");
  var homeFolder = shell.ExpandEnvironmentStrings("%USERPROFILE%");
  var downloadFolder = homeFolder + "\\Downloads";

  if (!fso.FolderExists(downloadFolder)) {
    Log.Error("Downloads folder not found: " + downloadFolder);
    return;
  }

  var folder = fso.GetFolder(downloadFolder);
  var files = new Enumerator(folder.Files);
  var latestFile = null;
  var latestDate = new Date(0);

  for (; !files.atEnd(); files.moveNext()) {
    var file = files.item();
    if (file.DateLastModified > latestDate) {
      latestDate = file.DateLastModified;
      latestFile = file;
    }
  }

  if (latestFile && aqFileSystem.GetFileExtension(latestFile.Name).toLowerCase() === "pdf") {
   // Construct the path to the PDF file
  var pdfPath = downloadFolder + "\\" + latestFile.Name; // Use forward slashes
  
  // Log the PDF path
  Log.Message("Opening PDF: " + pdfPath);

  // Check if the file exists using aqFile
  if (!aqFile.Exists(pdfPath)) {
    Log.Error("The PDF file does not exist: " + pdfPath);
    return; // Exit the function if the file does not exist
  }

  // Open the browser
  Browsers.Item(btChrome).Run();

  // Navigate to the PDF file
  Aliases.browser.Navigate(pdfPath);

  // Optional: Wait for the page (PDF) to load
  Aliases.browser.WaitPage("*", 30000);   }
}