function CleanInput(){
  var textbox = Aliases.browser.pageQms.history_quoteid;  
textbox.SetText("");
}

function CleanInputQuoteCreator(){
  var textbox = Aliases.chrome.pageQms.quoteCreator;  
textbox.SetText("");
}

function CleanInputTitle(){
  var textbox = Aliases.browser.pageQms.titleProfile;  
textbox.SetText("");
textbox.SetText(Project.Variables.now);
}

function CleanInputAlerts(){
 var page = Aliases.browser.pageQms;
    
    // Define the XPaths
    var textPath = "//textarea[contains(@class, 'mat-mdc-input-element')]";
    
    // Wait for the text comment element to be visible
    var text = page.WaitElement(textPath, 5000);
    if (text.Exists) {
       text.Keys("^a[BS]"); 
    } else {
        Log.Error("Text  element not found or not visible.");
        return;
    }
}