"use strict";
(function (window, document) {
    // Request: Post
    if (document.forms[0] && window.FormData) {
        var form = document.getElementById('wot_form');

        // Listen for the form being submitted
        form.addEventListener('submit', function (evt) {
            evt.preventDefault();

            // Set up the AJAX request
            var request = new XMLHttpRequest();
            request.open('POST', form.action, true);
            request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
            //request.setRequestHeader('Accept', 'application/x-www-form-urlencoded');
            request.withCredentials = true;

            // Create a new FormData object passing in the form's key value pairs (that was easy!)
            var formData = new FormData(form);
            var jsonObj= {};
            // noinspection JSAnnotator
            for (var entry of formData.entries())
            {
                jsonObj[entry[0]] = entry[1];
            }
            // // Send the formData
            // request.send(JSON.stringify(jsonObj));
            formData = Object.keys(jsonObj).map(
                function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(jsonObj[k]) }
            ).join('&');
            request.send(formData);

            // Watch for changes to request.readyState and update the statusMessage accordingly
            request.onreadystatechange = function () {
                // <4 =  waiting on response from server
                if (request.readyState < 4) {

                } else if (request.readyState === 4) {
                    // 4 = Response from server has been completely loaded.
                    // 200 - 299 = successful
                    var ResultValue = 'Something wrong!';
                    if (request.status === 200 && request.status < 300) {
                        var response = JSON.parse(request.response);
                        if(!response.hasOwnProperty('id')) {
                            ResultValue = 'Something really wrong';
                        } else {
                            ResultValue = 'Success'
                        }
                    }

                    document.getElementById('wot_result').innerText = ResultValue;
                }
            }
        });
    }

}(this, this.document));