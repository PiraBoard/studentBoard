'use strict';

angular.module('piraBoardApp')
.factory('Image', function () {
    console.log('image factory');
    // if (input.files && input.files[0]) {
    //   var reader = new FileReader();
    //   reader.onload = function (e) {
    //     $('#image-view').attr('src', e.target.result);
    //   }  
    //   var gg = reader.readAsDataURL(input.files[0]);
    // }
    return {
      log: function (image) {
        // console.log('reader:', reader, 'gg', gg);
      }
    };
});

