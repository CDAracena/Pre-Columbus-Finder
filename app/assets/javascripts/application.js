// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require bulma-start/_javascript/main.js
//= require jquery/dist/jquery
//= require toastr/build/toastr.min.js
//= require axios/dist/axios
//= require_tree .

$(document).ready(function() {

  class Artifact {
    constructor(response) {
      this.name = response.ObjectName;
      this.description = response.Description;
      this.img = response.PrimaryImage.Raw
      this.culture = response.Culture;
      this.timePeriod = response.DateText
    }
  }

  // Random image loader, loads up random images of central america array //
  axios.get('http://api.thewalters.org/v1/collections/2/objects?&apikey=' + window.API_KEY)
    .then(function(response) {
      console.log(response)

      let cardImages = document.querySelectorAll('.cardMainImg');
      let artifacttNames = document.querySelectorAll('.artifactName');
      let descriptions = document.querySelectorAll('.artifactDescription');

      for (let i = 0; i < cardImages.length; i++) {
        let randomArtifact = Math.floor(Math.random() * response.data.Items.length)
        let firstItems = new Artifact(response.data.Items[randomArtifact])
        cardImages[i].src = firstItems.img
        artifacttNames[i].innerText = firstItems.name
        descriptions[i].innerText = "Culture: " + firstItems.culture + ", " + "Date: " + firstItems.timePeriod
      }
    })

  let regionSelectionText = document.querySelector('.menuLabelText');
  let regionsText = document.querySelectorAll('.menuOptions');
  regionSelectionText.addEventListener('mouseover', function() {
    regionSelectionText.innerText = "Select";
  })
  regionSelectionText.addEventListener('mouseout', function() {
    regionSelectionText.innerText = "Regions";
  })

  //Loops for menu options. First one is central america //

  for (let i = 0; i < regionsText.length; i++) {

    regionsText[i].addEventListener('click', function() {
      document.querySelector('.displaySection').innerText = regionsText[i].textContent

      if (regionsText[i].textContent === "Central America") {
        axios.get('http://api.thewalters.org/v1/collections/2/objects?&apikey=' + window.API_KEY)
          .then(function(response) {
            let cardImages = document.querySelectorAll('.cardMainImg');
            let artifacttNames = document.querySelectorAll('.artifactName');
            let descriptions = document.querySelectorAll('.artifactDescription');
            //////////
            let secondArtifactRow = document.querySelector('.secondRow');
            let mainCardDiv = document.createElement("DIV");
            let artifactnameRow = document.createElement("DIV")
            let artifactNameDiv = document.createElement("DIV");
            let artifactImgTag = document.createElement("IMG");
            let descriptionRow = document.createElement("DIV");
            let artifactDescriptionColumn = document.createElement("DIV")

            for (let j = 0; j < cardImages.length; j++) {
              let artifacts = new Artifact(response.data.Items[j])
              if (cardImages.length < 6) {
                secondArtifactRow.appendChild(mainCardDiv);
                mainCardDiv.appendChild(artifactnameRow);
                artifactnameRow.appendChild(artifactNameDiv);
                mainCardDiv.appendChild(artifactImgTag);
                mainCardDiv.appendChild(descriptionRow);
                descriptionRow.appendChild(artifactDescriptionColumn)

                mainCardDiv.classList.add('column', 'is-one-quarter', 'randomArtifactColumn');
                artifactnameRow.classList.add('columns', 'has-text-centered')
                artifactNameDiv.classList.add('column', 'artifactName');
                artifactImgTag.classList.add('cardMainImg');
                descriptionRow.classList.add('columns', 'randomArtifactDescription');
                artifactDescriptionColumn.classList.add('column', 'artifactDescription')
              }

              cardImages[j].src = artifacts.img
              artifacttNames[j].innerText = artifacts.name
              descriptions[j].innerText = "Culture: " + artifacts.culture + ", " + "Date: " + artifacts.timePeriod

            }
          })
      }
    })
  };

  // For the Caribbean
  for (let i = 0; i < regionsText.length; i++) {

    regionsText[i].addEventListener('click', function() {
      document.querySelector('.displaySection').innerText = regionsText[i].textContent
      if (regionsText[i].textContent === "The Caribbean") {
        axios.get('http://api.thewalters.org/v1/geographies/607987/objects?apikey=' + window.API_KEY)
          .then(function(response) {
            let cardImages = document.querySelectorAll('.cardMainImg');
            let artifacttNames = document.querySelectorAll('.artifactName');
            let descriptions = document.querySelectorAll('.artifactDescription');

            for (let j = 0; j < cardImages.length; j++) {
              let artifacts = new Artifact(response.data.Items[j])
              cardImages[j].src = artifacts.img
              artifacttNames[j].innerText = artifacts.name
              descriptions[j].innerText = "Culture: " + artifacts.culture + ", " + "Date: " + artifacts.timePeriod
            }
          })
      }
    })
  }

  // For South America //

  for (let i = 0; i < regionsText.length; i++) {

    regionsText[i].addEventListener('click', function() {
      document.querySelector('.displaySection').innerText = regionsText[i].textContent
      if (regionsText[i].textContent === "South America") {
        axios.get('http://api.thewalters.org/v1/geographies/1415776/objects?apikey=' + window.API_KEY)
          .then(function(response) {
            let cardImages = document.querySelectorAll('.cardMainImg');
            let artifacttNames = document.querySelectorAll('.artifactName');
            let descriptions = document.querySelectorAll('.artifactDescription');
            //////////
            let secondArtifactRow = document.querySelector('.secondRow');
            let mainCardDiv = document.createElement("DIV");
            let artifactnameRow = document.createElement("DIV")
            let artifactNameDiv = document.createElement("DIV");
            let artifactImgTag = document.createElement("IMG");
            let descriptionRow = document.createElement("DIV");
            let artifactDescriptionColumn = document.createElement("DIV")

            for (let j = 0; j < cardImages.length; j++) {
              let artifacts = new Artifact(response.data.Items[j])
              if (cardImages.length < 6) {
                secondArtifactRow.appendChild(mainCardDiv);
                mainCardDiv.appendChild(artifactnameRow);
                artifactnameRow.appendChild(artifactNameDiv);
                mainCardDiv.appendChild(artifactImgTag);
                mainCardDiv.appendChild(descriptionRow);
                descriptionRow.appendChild(artifactDescriptionColumn)

                mainCardDiv.classList.add('column', 'is-one-quarter', 'randomArtifactColumn');
                artifactnameRow.classList.add('columns', 'has-text-centered')
                artifactNameDiv.classList.add('column', 'artifactName');
                artifactImgTag.classList.add('cardMainImg');
                descriptionRow.classList.add('columns', 'randomArtifactDescription');
                artifactDescriptionColumn.classList.add('column', 'artifactDescription')
              }

              cardImages[j].src = artifacts.img
              artifacttNames[j].innerText = artifacts.name
              descriptions[j].innerText = "Culture: " + artifacts.culture + ", " + "Date: " + artifacts.timePeriod
            }
          })
      }
    })
  }

})