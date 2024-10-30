
function VerifyElementDoesNotExist() {
  var page = Aliases.browser.pageQms;
  var elementExists = page.FindChild(["contentText"], [Project.Variables.surcharge_versionProject], 1000).Exists;
  Log.Message(elementExists);
  if (elementExists) {
    Log.Checkpoint("The element Exist. Test Pass");
    Log.Error("The EFT exists.Test Fail");
  } else {
    Log.Error("The element does not exist. Test FAILED");
  }
}