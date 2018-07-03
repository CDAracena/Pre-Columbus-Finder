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
            let mainContainer = document.querySelector('.randomArtifactRow');
            mainContainer.innerHTML = '';
            for (let j = 0; j < response.data.Items.length; ++j) {
              let artifactContainerDiv = document.createElement('div');
              artifactContainerDiv.classList.add('column', 'is-one-quarter', 'randomArtifactColumn');
              let artifact = new Artifact(response.data.Items[j])
              artifactContainerDiv.innerHTML = generateArtifactDiv(artifact);
              mainContainer.appendChild(artifactContainerDiv)
            }


          })
      } else if (regionsText[i].textContent === "The Caribbean") {
        axios.get('http://api.thewalters.org/v1/geographies/607987/objects?apikey=' + window.API_KEY)
          .then(function(response) {
            let mainContainer = document.querySelector('.randomArtifactRow');
            mainContainer.innerHTML = '';
            for (let j = 0; j < response.data.Items.length; ++j) {
              let artifactContainerDiv = document.createElement('div');
              artifactContainerDiv.classList.add('column', 'is-one-quarter', 'randomArtifactColumn');
              let artifact = new Artifact(response.data.Items[j])
              artifactContainerDiv.innerHTML = generateArtifactDiv(artifact);
              mainContainer.appendChild(artifactContainerDiv)
            }

          })
      } else if (regionsText[i].textContent === "South America") {
        axios.get('http://api.thewalters.org/v1/geographies/1415776/objects?apikey=' + window.API_KEY)
          .then(function(response) {
            let mainContainer = document.querySelector('.randomArtifactRow');
            mainContainer.innerHTML = '';
            for (let j = 0; j < response.data.Items.length; ++j) {
              let artifactContainerDiv = document.createElement('div');
              artifactContainerDiv.classList.add('column', 'is-one-quarter', 'randomArtifactColumn');
              let artifact = new Artifact(response.data.Items[j])
              artifactContainerDiv.innerHTML = generateArtifactDiv(artifact);
              mainContainer.appendChild(artifactContainerDiv)
            }


          })
      }
    })
  };

  // For the Caribbean

  function generateArtifactDiv(artifact) {
    return `
      <div class="columns is-multiline has-text-centered">
        <div class="column artifactName">
          ${artifact.name}
        </div>
      </div>
      <img src="${artifact.img}" class="cardMainImg">
      <div class="columns randomArtifactDescription">
        <div class="column artifactDescription">
          ${"Culture: " + artifact.culture + ", " + "Date: " + artifact.timePeriod}
        </div>
      </div>
  `
  }



  // For South America //









})