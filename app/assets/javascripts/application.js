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
//= require bulma-toast/dist/bulma-toast.min.js
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
      this.objectId = response.ObjectID

    }
  }
  // Random image loader, loads up random images of central america array //
  axios.get('http://api.thewalters.org/v1/collections/2/objects?&apikey=' + window.API_KEY)
    .then(function(response) {

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
              let modalOpeners = document.querySelectorAll('.cardMainImg');
              modalOpeners[j].addEventListener('click', function() {
                document.querySelector('.modal').style.display = "block"
                document.querySelector('.modalImg').src = artifact.img
              })
              let starDefault = document.querySelectorAll('.stardefault');
              let starStatus = "default"
              if (starDefault.length > 0) {
                starDefault[j].addEventListener('click', function() {
                  if (starStatus === "default") {
                    starStatus = "favorite"
                    starDefault[j].src = 'starLiked.png';
                    axios.post('/user_favorites', {
                      artifact: {
                        object_id: artifact.objectId,
                        name: artifact.name,
                        description: artifact.description,
                        image: artifact.img,
                        culture: artifact.culture,
                        timePeriod: artifact.timePeriod
                      }
                    })
                    bulmaToast.toast({
                      message: 'Artifact has been added to your favorites!',
                      type: 'is-success',
                      duration: 2000,
                      dismissible: true
                    })
                  } else {
                    starDefault[j].src = 'unfavorite.png';
                    starStatus = "default"
                    axios.delete(`/user_favorites/${artifact.objectId}`)
                    bulmaToast.toast({
                      message: 'Artifact has been removed from your favorites',
                      type: 'is-danger',
                      duration: 2000,
                      dismissible: true
                    })
                  }
                })
              }
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
              let modalOpeners = document.querySelectorAll('.cardMainImg');
              modalOpeners[j].addEventListener('click', function() {
                document.querySelector('.modal').style.display = "block"
                document.querySelector('.modalImg').src = artifact.img
              })
              let starDefault = document.querySelectorAll('.stardefault');
              let starStatus = "default"
              if (starDefault.length > 0) {
                starDefault[j].addEventListener('click', function() {
                  if (starStatus === "default") {
                    starStatus = "favorited"
                    starDefault[j].src = 'starLiked.png';
                    axios.post('/user_favorites', {
                      artifact: {
                        object_id: artifact.objectId,
                        name: artifact.name,
                        description: artifact.description,
                        image: artifact.img
                      }
                    })
                    bulmaToast.toast({
                      message: 'Artifact has been added to your favorites!',
                      type: 'is-success',
                      duration: 2000,
                      dismissible: true
                    })
                  } else {
                    starDefault[j].src = 'unfavorite.png';
                    starStatus = "default"
                    axios.delete(`/user_favorites/${artifact.objectId}`)
                    bulmaToast.toast({
                      message: 'Artifact has been removed from your favorites',
                      type: 'is-danger',
                      duration: 2000,
                      dismissible: true
                    })
                  }
                })
              }
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
              let modalOpeners = document.querySelectorAll('.cardMainImg');
              modalOpeners[j].addEventListener('click', function() {
                document.querySelector('.modal').style.display = "block"
                document.querySelector('.modalImg').src = artifact.img
              })
              let starDefault = document.querySelectorAll('.stardefault');
              let starStatus = "default"
              if (starDefault.length > 0) {
                starDefault[j].addEventListener('click', function() {
                  if (starStatus === "default") {
                    starStatus = "favorite"
                    starDefault[j].src = 'starLiked.png';
                    axios.post('/user_favorites', {
                      artifact: {
                        object_id: artifact.objectId,
                        name: artifact.name,
                        description: artifact.description,
                        image: artifact.img
                      }
                    })
                    bulmaToast.toast({
                      message: 'Artifact has been added to your favorites!',
                      type: 'is-success',
                      duration: 2000,
                      dismissible: true
                    })
                  } else {
                    starDefault[j].src = 'unfavorite.png';
                    starStatus = "default"
                    axios.delete(`/user_favorites/${artifact.objectId}`)
                    bulmaToast.toast({
                      message: 'Artifact has been removed from your favorites',
                      type: 'is-danger',
                      duration: 2000,
                      dismissible: true
                    })
                  }
                })
              }
            }
          })
      }
    })
  };

  // For the Caribbean

  function generateArtifactDiv(artifact) {
    let divString = `
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
      </div>`
    if (window.userLoggedIn) {
      divString += `      <div class="columns starSystemRow">
                <div class="column is-one-quarter has-text-left">
                <figure class="image is-32x32">
                  <img src="unfavorite.png" class="stardefault">
                  </figure>
                </div>
              </div>`
    }

    return divString

  }

  let countries = [{
    name: 'Mexico',
    geoId: 609486,

  }, {
    name: 'Guatemala',
    geoId: 608307,
  }, {
    name: 'Nicaragua',
    geoId: 611842,
  }, {
    name: 'Costa Rica',
    geoId: 609720,
  }, {
    name: 'Belize',
    geoId: 607731,
  }, {
    name: 'Panama',
    geoId: 1413064,
  }, {
    name: 'Honduras',
    geoId: 608506,
  }, {
    name: 'Colombia',
    geoId: 1414585,

  }, {
    name: 'Peru',
    geoId: 630620,
  }, {
    name: 'Puerto Rico',
    geoId: 606033,
  }, {
    name: 'Dominican Republic',
    geoId: 607987,
  }, {
    name: 'Hispaniola',
    geoId: 606663,
  }, {
    name: 'Ecuador',
    geoId: 1415238,
  }];


  let searchBar = document.querySelector('.searchBarField');
  let searchBarButton = document.querySelector('.searchButton')
  searchBarButton.addEventListener('click', function() {
    for (let i = 0; i < countries.length; i++) {
      countries[i].name = countries[i].name.toLowerCase();
      if (countries[i].name === searchBar.value.toLowerCase()) {
        axios.get('http://api.thewalters.org/v1/geographies/' + countries[i].geoId + '/objects?apikey=' + window.API_KEY)
          .then(function(response) {
            let mainContainer = document.querySelector('.randomArtifactRow');
            mainContainer.innerHTML = '';
            for (let j = 0; j < response.data.Items.length; ++j) {
              let artifactContainerDiv = document.createElement('div');
              artifactContainerDiv.classList.add('column', 'is-one-quarter', 'randomArtifactColumn');
              let artifact = new Artifact(response.data.Items[j])
              artifactContainerDiv.innerHTML = generateArtifactDiv(artifact);
              mainContainer.appendChild(artifactContainerDiv)
              let modalOpeners = document.querySelectorAll('.cardMainImg');
              modalOpeners[j].addEventListener('click', function() {
                document.querySelector('.modal').style.display = "block"
                document.querySelector('.modalImg').src = artifact.img
              })
              let starDefault = document.querySelectorAll('.stardefault');
              let starStatus = "default"
              if (starDefault.length > 0) {
                starDefault[j].addEventListener('click', function() {
                  if (starStatus === 'default') {
                    starStatus = "favorited"
                    starDefault[j].src = 'starLiked.png';
                    axios.post('/user_favorites', {
                      artifact: {
                        object_id: artifact.objectId,
                        name: artifact.name,
                        description: artifact.description,
                        image: artifact.img
                      }
                    })
                    bulmaToast.toast({
                      message: 'Artifact has been added to your favorites!',
                      type: 'is-success',
                      duration: 2000,
                      dismissible: true
                    })
                  } else {
                    starDefault[j].src = 'unfavorite.png'
                    starStatus = "default"
                    axios.delete(`/user_favorites/${artifact.objectId}`)
                    bulmaToast.toast({
                      message: 'Artifact has been removed from your favorites',
                      type: 'is-danger',
                      duration: 2000,
                      dismissible: true
                    })
                  }
                })
              }
            }
          })
        document.querySelector('.displaySection').innerText = "We found the following for " + searchBar.value + ':'
      }
    }
  })

  let modalCloser = document.querySelector('.modal-close');
  modalCloser.addEventListener('click', function() {
    document.querySelector('.modal').style.display = "none";
  })

})