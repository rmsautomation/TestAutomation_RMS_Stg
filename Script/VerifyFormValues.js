﻿function VerifyFormValues() {
    var values = [
        {name: "form", original: Project.Variables.original_form, new: Project.Variables.new_form},
        {name: "comment", original: Project.Variables.original_comment, new: Project.Variables.new_comment},
        {name: "disclaimer", original: Project.Variables.original_disclaimer, new: Project.Variables.new_disclaimer},
        {name: "carrier", original: Project.Variables.original_carrier, new: Project.Variables.new_carrier}
    ];
    
    for (var i = 0; i < values.length; i++) {
        var name = values[i].name;
        var original = values[i].original;
        var newValue = values[i].new;
        
        if (aqString.Compare(original, newValue, true) === 0) {
            Log.Message(name + " values are equal: " + original);
        } else {
            Log.Error(name + " values are not equal. Original: " + original + ", New: " + newValue);
        }
    }
}