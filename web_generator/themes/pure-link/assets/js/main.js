"use strict";
(function (window, document) {
    var layout = document.getElementById('layout'),
        menu = document.getElementById('sidebar'),
        menuLink = document.getElementById('menuLink'),
        content = document.getElementById('content'),
        copyTo = document.getElementById('wot_copy');

    function collectJsonObj(formData)
    {
        var jsonObj= {};
        // noinspection JSAnnotator
        for (var entry of formData.entries())
        {
            jsonObj[entry[0]] = entry[1];
        }

        return jsonObj;
    }

    // Copy To Clipboard
    function copyToClipboard(input) {
        var copyText = document.getElementById(input);
        copyText.select();
        document.execCommand("Copy");
        copyText.focus();
    }

    if(!!copyTo) {
        copyTo.onclick = function (e) {
            e.preventDefault(e);
            copyToClipboard('wot_result');
        };
    }

    // Mobile Toggle Menu
    function toggleClass(element, className) {
        var classes = element.className.split(/\s+/),
            length = classes.length,
            i = 0;
        for (; i < length; i++) {
            if (classes[i] === className) {
                classes.splice(i, 1);
                break;
            }
        }
        // The className is not found
        if (length === classes.length) {
            classes.push(className);
        }
        element.className = classes.join(' ');
    }

    function toggleAll(e) {
        var active = 'active';
        e.preventDefault();
        toggleClass(layout, active);
        toggleClass(menu, active);
        toggleClass(menuLink, active);
    }

    menuLink.onclick = function (e) {
        toggleAll(e);
    };
    content.onclick = function (e) {
        if (menu.className.indexOf('active') !== -1) {
            toggleAll(e);
        }
    };

    // Request: Post
    if (document.forms[0] && window.FormData) {

        // Base Form
        var form = document.getElementById('wot_form');
        if(!!form) {
            form.addEventListener('submit', function (evt) {
                evt.preventDefault();

                // Set up the AJAX request
                var request = new XMLHttpRequest();
                request.open('POST', form.action, true);
                request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                request.setRequestHeader('Accept', 'application/json');
                request.withCredentials = true;

                // Create a new FormData object passing in the form's key value pairs (that was easy!)
                var formData = new FormData(form);
                var jsonObj = collectJsonObj(formData);

                // Send the formData
                request.send(JSON.stringify(jsonObj));

                // Watch for changes to request.readyState and update the statusMessage accordingly
                request.onreadystatechange = function () {
                    // <4 =  waiting on response from server
                    if (request.readyState < 4) {

                    } else if (request.readyState === 4) {
                        // 4 = Response from server has been completely loaded.
                        // 200 - 299 = successful
                        var InputValue = 'Something wrong!';
                        if (request.status === 200 && request.status < 300) {
                            var response = JSON.parse(request.response);
                            InputValue = (response.status) ? response.result : 'Something really wrong';
                        }

                        document.getElementById('wot_result').value = InputValue;
                    }
                }
            });
        }

        // Custom Form 1: File Read
        var formCustom1 = document.getElementById('wot_form_custom1');
        if(!!formCustom1) {
            // Listen for the form being submitted
            formCustom1.addEventListener('submit', function (evt) {
                evt.preventDefault();

                var xhr = new XMLHttpRequest();

                // Create a new FormData object passing in the form's key value pairs (that was easy!)
                var formData = new FormData(formCustom1);
                var jsonObj = collectJsonObj(formData);

                xhr.onload = function() {
                    var reader = new FileReader();
                    reader.onloadend = function() {
                        document.getElementById('wot_result').value = reader.result;
                        document.getElementById('wot_img_subhead').style.display = 'block';
                        document.getElementById('wot_img').src = reader.result;
                    };
                    reader.readAsDataURL(xhr.response);
                };

                xhr.open('GET', jsonObj['wot_string'], true);
                xhr.responseType = 'blob';
                xhr.send();

                xhr.onreadystatechange = function () {
                    if(xhr.response === null) {
                        document.getElementById('wot_result').value = 'Not allowed this image to show!';
                        document.getElementById('wot_img_subhead').style.display = 'none';
                        document.getElementById('wot_img').src = '';
                    }
                }
            });
        }

        // Custom Form 2
        var formCustom2 = document.getElementById('wot_form_custom2');
        if(!!formCustom2) {
            // Listen for the form being submitted
            formCustom2.addEventListener('submit', function (evt) {
                evt.preventDefault();

                // Create a new FormData object passing in the form's key value pairs (that was easy!)
                var formData = new FormData(formCustom2);
                var jsonObj = collectJsonObj(formData);
                var reader = new FileReader();

                reader.addEventListener("load", function () {
                    document.getElementById('wot_result').value = reader.result;
                    document.getElementById('wot_img_subhead').style.display = 'block';
                    document.getElementById('wot_img').src = reader.result;
                }, false);

                if (jsonObj.wot_string) {
                    reader.readAsDataURL(jsonObj.wot_string);
                } else {
                    document.getElementById('wot_result').value = 'Not allowed this image to show!';
                    document.getElementById('wot_img_subhead').style.display = 'none';
                    document.getElementById('wot_img').src = '';
                }
            });
        }
    }

}(this, this.document));