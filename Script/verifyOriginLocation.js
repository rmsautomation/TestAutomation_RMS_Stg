function verifyOriginLocation() {
 
  var cells = Aliases.browser.pageQms.FindElements("//mat-cell[contains(@class, 'cdk-column-originLocation-concat_key')]");

  
  for (var i = 0; i < cells.length; i++) {
    var cellText = cells[i].textContent.trim();  

    if (!cellText.includes("Los Angeles") && !cellText.includes("LOS ANGELES")) {
      Log.Error("This cell does not contain'Los Angeles': " + cellText);
      return; 
    }
  }
  
  Log.Message("All cells contain 'Los Angeles'.");
}
