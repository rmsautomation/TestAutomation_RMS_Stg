function verifyAndClickFileStartingWithQuoteId() { 
  let quoteId = Project.Variables.quote_ID.replace("Quote ID: ", "");  
  let listView = NameMapping.Sys.filezilla.wndwxWindowNR.splitterWindow.splitterWindow.splitter.splitterWindow.splitterWindow.panel2.ListView;  

  if (!listView.Exists) {
    Log.Error("Folders in FileZilla not found.");
    return;
  }

  
  for (let i = 0; i < listView.wItemCount; i++) {
    let fileItem = listView.wItem(i);  
  
    if (fileItem.startsWith(quoteId) && fileItem.endsWith(".xml")) {
      Log.Message("XML Found " + fileItem);
      Log.Checkpoint("The XML Exists. Test PASSED");
      return;  
    }
  }

  
  Log.Error("XML not found with " + quoteId);
}
