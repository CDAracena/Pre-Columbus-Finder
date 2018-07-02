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
      this.description = response.Dynasty;
      this.img = response.PrimaryImage.Raw
    }
  }

  axios.get('http://api.thewalters.org/v1/objects?apikey=' + window.API_KEY)
    .then(function(response) {

      for (let i = 0; i < 3; i++) {
        let firstItems = new Artifact(response.data.Items[i])
        document.querySelectorAll('.cardMainImg')[i].src = firstItems.img
      }
    })

})