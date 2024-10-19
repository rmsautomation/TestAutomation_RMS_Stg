function DeleteBooking(){
  var element = Aliases.browser.pageQms.deleteBookingCheck;
  element.scrollIntoView();
element.style.zIndex = 9999; // Bring it to the front
element.click();

}