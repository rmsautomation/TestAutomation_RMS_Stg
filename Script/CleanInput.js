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