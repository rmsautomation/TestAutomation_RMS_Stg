function compareMinimumElement() {
 
  var elements = Aliases.browser.pageQms.FindElements("//div[contains(@class, 'align-right') and contains(@class, 'third')]");
  var valuesArray = [];


  for (var i = 0; i < elements.length; i++) {
    var value = parseFloat(elements[i].contentText.trim());
  
    if (!isNaN(value)) {
      valuesArray.push(value);
    }
  }
  //Delete text element in the array
  valuesArray = valuesArray.filter(function(value) {
    return !isNaN(value); 
  });


  if (valuesArray.length === 0) {
    Log.Error("No valid numbers found in the specified elements.");
    return;
  }


  var comparisonElement = Aliases.browser.pageQms.FindElement("//mat-cell[contains(@class, 'cdk-column-transit')]//div[contains(@class, 'mat-mdc-tooltip-trigger')]");
  var comparisonValue = parseFloat(comparisonElement.contentText.trim());

  if (isNaN(comparisonValue)) {
    Log.Error("Comparison element does not contain a valid number.");
    return;
  }

  // Min value array
  var minValue = Math.min.apply(null, valuesArray);
Log.Message(valuesArray);
  if (minValue === comparisonValue) {
    Log.Checkpoint("The minimum value in the list(transitTime) is equal to the Est.Transit column value");
  } else {
    Log.Error("The minimum value in the list is not equal to the comparison element value.");
  }
}
