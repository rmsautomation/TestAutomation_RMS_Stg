﻿
function VerifyRoundUP() {
    
    var totalPrice = Project.Variables.new_totalPrice.replace(" USD", "");

    const round = /^\d{1,3}(,\d{3})*(\.00)$/;
      // Verify is the number is rounded
  return round.test(totalPrice);
}
  



