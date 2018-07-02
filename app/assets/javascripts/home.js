// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function() {

  let regionSelectionText = document.querySelector('.menuLabelText');
  let regionsText = document.querySelectorAll('.menuOptions');
  regionSelectionText.addEventListener('mouseover', function() {
    regionSelectionText.innerText = "Select";
  })
  regionSelectionText.addEventListener('mouseout', function() {
    regionSelectionText.innerText = "Regions";
  })

  for (let i = 0; regionsText.length; i++) {

    regionsText[i].addEventListener('click', function() {
      document.querySelector('.displaySection').innerText = regionsText[i].textContent

    })
  };

})