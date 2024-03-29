﻿// app.js
(function () {
    var app = angular.module('janeApp', []);

    app.controller('AppController', function ($scope, $http) {
        var now = new Date(Date.now());

        this.currentYear = now.getFullYear();
        this.phoneNumber = '07742 649572';
        this.emailAddress = 'janeadams4health@yahoo.co.uk';
        this.facebookUrl = 'https://www.facebook.com/janeadamsNT';
        this.tumblrUrl = 'https://janeadamsnutritionaltherapist.tumblr.com/';
        this.twitterUrl = 'https://twitter.com/jadams4health';
        this.linkedInUrl = 'https://www.linkedin.com/in/jane-adams-b8188910/';
        this.cormorantUrl = 'http://www.cormorantsoftware.co.uk';
        this.instagramUrl = "https://www.instagram.com/janeadams4health/";
        this.costs = {
            initialConsultation: 80,
            followUp: 50,
            consultationAndFollowUp: 120,
            twoFollowUps: 90,
            vitaminD: 50,
            vitaminDWithConsultatiom: 35,
            intolerance: 80,
            intoleranceWithConsultation: 50
        };

        this.costIsFrom = false;

        function getUrlParam(name) {
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            if (results)
                return results[1] || 0;
            else
                return null;
        }

        $scope.initialize = function () {
            var url = window.location.href;
            // Get the name of the page
            url = url.substr(url.lastIndexOf("/") + 1)
            // Get up to the first .
            url = url.substr(0, url.indexOf("."));

            switch (url) {
                case "index": $('#navHome').addClass("active"); break;
                case "about": $('#navAbout').addClass("active"); break;
                case "therapy": $('#navTherapy').addClass("active"); break;
                case "testing_services": $('#navServices').addClass("active"); break;
                case "therapy_services": $('#navServices').addClass("active"); break;
                case "tropic_services": $('#navServices').addClass("active"); break;
                case "booking":
                    $('#navServices').addClass("active");
                    setService(getUrlParam('select'));
                    refreshTotalCost();
                    break;
                case "blog": $('#navBlog').addClass("active"); break;
                case "contact": $('#navContact').addClass("active"); break;
            }
        }

        function setService(service) {
            switch (service) {
                case "consultation":
                    $('#checkConsultation').attr('checked', true);
                    break;
                case "followUp":
                    $('#checkFollowUp').attr('checked', true);
                    break;
                case "consultationAndfollowUp":
                    $('#checkConsultationAndFollowUp').attr('checked', true);
                    break;
                case "twoFollowUps":
                    $('#checkTwoFollowUps').attr('checked', true);
                    break;
                case "vitDtest":
                    $('#checkVitaminDtest').attr('checked', true);
                    break;
                case "vitDtestInConsultation":
                    $('#checkConsultation').attr('checked', true);
                    $('#checkVitaminDtest').attr('checked', true);
                    break;
                case "foodIntolerance":
                    $('#checkIntoleranceTest').attr('checked', true);
                    break;
                case "foodIntoleranceInConsultation":
                    $('#checkConsultation').attr('checked', true);
                    $('#checkIntoleranceTest').attr('checked', true);
                    break;
            }
        }

        function getTotalCost() {
            var totalCost = 0;
            var consultationAdded = false;
            var costs = $scope.appCtrl.costs;

            if ($('#checkConsultation').attr('checked')) {
                totalCost += costs.initialConsultation;
                consultationAdded = true;
            }
            if ($('#checkFollowUp').attr('checked')) {
                if (consultationAdded)
                    totalCost += costs.consultationAndFollowUp - costs.initialConsultation;
                else
                    totalCost += costs.followUp;
            }
            if ($('#checkConsultationAndFollowUp').attr('checked')) {
                totalCost += costs.consultationAndFollowUp;
                consultationAdded = true;
            }
            if ($('#checkTwoFollowUps').attr('checked')) {
                totalCost += costs.twoFollowUps;
            }
            if ($('#checkVitaminDtest').attr('checked')) {
                if (consultationAdded)
                    totalCost += costs.vitaminDWithConsultatiom;
                else
                    totalCost += costs.vitaminD;
            }
            if ($('#checkIntoleranceTest').attr('checked')) {
                if (consultationAdded)
                    totalCost += costs.intoleranceWithConsultation;
                else
                    totalCost += costs.intolerance;
            }

            return totalCost;
        }

        function getServicesText() {
            var txt = "";
            var consultationAdded = false;
            var costs = $scope.appCtrl.costs;

            if ($('#checkConsultation').attr('checked')) {
                txt += "Nutritional Consultation - £" + costs.initialConsultation + "\n"
                consultationAdded = true;
            }
            if ($('#checkFollowUp').attr('checked')) {
                txt += "1 Follow Up - £" + costs.followUp + "\n"
            }
            if ($('#checkConsultationAndFollowUp').attr('checked')) {
                txt += "Nutritional Consultation and a Follow Up - £" + costs.consultationAndFollowUp + "\n"
                consultationAdded = true;
            }
            if ($('#checkTwoFollowUps').attr('checked')) {
                txt += "2 Follow Ups - £" + costs.twoFollowUps + "\n"
            }
            if ($('#checkVitaminDtest').attr('checked')) {
                txt += "Vitamin D Test - "
                if (consultationAdded)
                    txt += "£" + costs.vitaminDWithConsultatiom + " - discounted as consultation included\n";
                else
                    txt += "£" + costs.vitaminD + "\n";
            }
            if ($('#checkIntoleranceTest').attr('checked')) {
                txt += "Food Intolerance Test - "
                if (consultationAdded)
                    txt += "£" + costs.intoleranceWithConsultation + " - discounted as consultation included\n";
                else
                    txt += "£" + costs.intolerance + "\n";
            }

            return txt;
        }

        function refreshTotalCost() {
            var costText = "£" + getTotalCost();

            if ($('#checkIntoleranceTest').attr('checked')) {
                costText = "From " + costText;
            }

            $('#spanTotalCost').text(costText);
        }

        this.serviceCheckSelected = function () {
            if ($('#checkConsultation').attr('checked') ||
                $('#checkFollowUp').attr('checked')) {
                $('#checkConsultationAndFollowUp').attr('checked', false);
            }

            if ($('#checkConsultation').attr('checked') &&
                $('#checkFollowUp').attr('checked')) {
                $('#checkConsultationAndFollowUp').attr('checked', true);
                this.selectedPackage1();
            }

            refreshTotalCost();
        }

        this.selectedPackage1 = function () {
            if ($('#checkConsultationAndFollowUp').attr('checked')) {
                $('#checkConsultation').attr('checked', false);
                $('#checkFollowUp').attr('checked', false);
            }

            refreshTotalCost();
        }

        this.submitContactForm = function () {
            // Disable the button to avoid repeated submits
            $("#btnSubmit").attr("disabled", true);

            var name = $('#name').val();
            var email = $('#email').val();
            var msg = $('#message').val();

            if (name.length == 0 || email.length == 0 || msg.length == 0) {
                $("#alertMsgLabel").text("Please enter your name, email address and message.")
                $("#alertModal").modal('show');
                $("#btnSubmit").attr("disabled", false);

                return;
            }

            var bodyText = "A new contact request has been made:\n";

            bodyText += "Name: " + name + "\n";
            bodyText += "Email: " + email + "\n";
            bodyText += "Message: " + msg + "\n";

            sendEmail("New Contact Request from " + $('#name').val(), bodyText, email);
        }

        this.submitBookingForm = function () {
            // Disable the button to avoid repeated submits
            $("#btnSubmit").attr("disabled", true);

            var name = $('#name').val();
            var email = $('#email').val();

            if (name.length == 0 || email.length == 0) {
                $("#alertMsgLabel").text("Please enter your name and email address.")
                $("#alertModal").modal('show');
                $("#btnSubmit").attr("disabled", false);

                return;
            }

            var totalCost = getTotalCost();

            if (totalCost == 0) {
                $("#alertMsgLabel").text("Please select a service to book!")
                $("#alertModal").modal('show');
                $("#btnSubmit").attr("disabled", false);

                return;
            }

            var bodyText = "A new booking request has been made:\n";

            bodyText += "Name: " + name + "\n";
            bodyText += "Email: " + email + "\n";
            bodyText += "Message: " + $('#message').val() + "\n";

            bodyText += "\nServices requested:\n";
            bodyText += getServicesText();
            bodyText += "\nQuoted Total Cost: £" + totalCost + "\n";

            sendEmail("New Booking Request from " + $('#name').val(), bodyText, email);
        }

        function sendEmail(subject, bodyText, emailAddress) {
            // Block the page out until the email has been successful or failed
            $.blockUI({
                css: {
                    border: 'none',
                    padding: '15px',
                    backgroundColor: '#000',
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius': '10px',
                    opacity: .5,
                    color: '#fff'
                },
                message: 'Please wait. Sending email...'
            });

            var emailApiUrl = "https://formspree.io/moqpalle";
//            var emailApiUrl = "https://formspree.io/moqkgbvv";    // For local testing

            $http.post(emailApiUrl,
                {
                    "_replyto": emailAddress,
                    "_subject": subject,
                    "message": bodyText
                }).then(function successCallback(response) {
                    $.unblockUI();

                    // Enable button & show success message
                    $("#btnSubmit").attr("disabled", false);
                    $("#alertMsgLabel").text("Your email has been sent.")
                    $("#alertModal").modal('show');

                    //clear all fields
                    //                    $('#contactForm').trigger("reset");
                }, function errorCallback(response) {
                    $.unblockUI();

                    // Fail message
                    $("#btnSubmit").attr("disabled", false);
                    $("#alertMsgLabel").text("Email failed to send.")
                    $("#alertMsg").text("I'm sorry, your email has failed to send. Please email " + emailAddress + " directly instead with your request.");
                    $("#alertModal").modal('show');
                });
            }
    });

}) ();
