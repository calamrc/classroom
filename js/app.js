(function() {
  'use strict';

  angular.module("DavidsFiesta", [])
    .directive("iliganCityDirective", IliganCityDirective)
    .controller("InfoController", InfoController);

  function IliganCityDirective () {
    var ddo = {
      scope: {
        addBarangay: "&"
      },
      link: IliganCityDirectiveLink
    }
    return ddo;
  }

  function IliganCityDirectiveLink (scope, element) {
    var barangays = element.find("a");
    for(var i=0; i< barangays.length; i++) {
      var newBarangay = barangays[i].text;
      scope.addBarangay({barangay: newBarangay});

    }

  }

  InfoController.$inject = ["$element"]
  function InfoController($element) {
    var info = this;

    info.name = "";
    info.address = "";
    info.contactNumber = "";
    info.barangays = [];

    info.addBarangay = function (barangay) {
      info.barangays.push(barangay);
    }

    info.generateQRCode = function () {
      var textInfo = "Name: " + info.name.trim();
      textInfo += "\nAddress: " + info.address.trim();
      textInfo += "\nContact Number: " + info.contactNumber.trim();
      var qrElement = $element.find("#qrcode");
      qrElement.empty();
      var qrcode = new QRCode(qrElement[0], {
          text: textInfo,
          width: 256,
          height: 256,
          colorDark : "#ff69b4",
          colorLight : "#ffffff",
          correctLevel : QRCode.CorrectLevel.H
      });

    };

  }



})();
