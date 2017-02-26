﻿// app.js
(function ()
{
    var app = angular.module('janeApp', []);

    app.controller('AppController', function ($scope)
    {
        var now = new Date(Date.now());

        this.currentYear = now.getFullYear();
        this.phoneNumber = '07742 649572';
        this.emailAddress = 'janeadams4health@yahoo.co.uk';
        this.facebookUrl = 'https://www.facebook.com/janeadamsNT';
        this.tumblrUrl = 'https://janeadamsnutritionaltherapist.tumblr.com/';

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

            switch (url)
            {
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

        function setService(service)
        {
            switch (service)
            {
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

            if ($('#checkConsultation').attr('checked')) {
                totalCost += 70;
                consultationAdded = true;
            }
            if ($('#checkFollowUp').attr('checked')) {
                totalCost += 45;
            }
            if ($('#checkConsultationAndFollowUp').attr('checked')) {
                totalCost += 100;
                consultationAdded = true;
            }
            if ($('#checkTwoFollowUps').attr('checked')) {
                totalCost += 80;
            }
            if ($('#checkVitaminDtest').attr('checked')) {
                if (consultationAdded)
                    totalCost += 35;
                else
                    totalCost += 45;
            }
            if ($('#checkIntoleranceTest').attr('checked')) {
                if (consultationAdded)
                    totalCost += 40;
                else
                    totalCost += 80;
            }

            return totalCost;
        }

        function getServicesText() {
            var txt = "";

            if ($('#checkConsultation').attr('checked')) {
                txt += "Nutritional Consultation - £70\n"
                consultationAdded = true;
            }
            if ($('#checkFollowUp').attr('checked')) {
                txt += "1 Follow Up - £45\n"
            }
            if ($('#checkConsultationAndFollowUp').attr('checked')) {
                txt += "Nutritional Consultation and a Follow Up - £100\n"
                consultationAdded = true;
            }
            if ($('#checkTwoFollowUps').attr('checked')) {
                txt += "2 Follow Ups - £80\n"
            }
            if ($('#checkVitaminDtest').attr('checked')) {
                txt += "Vitamin D Test - "
                if (consultationAdded)
                    txt += "£35 - discounted as consultation included\n";
                else
                    txt += "£45\n";
            }
            if ($('#checkIntoleranceTest').attr('checked')) {
                txt += "Food Intolerance Test - "
                if (consultationAdded)
                    txt += "£40 - discounted as consultation included\n";
                else
                    txt += "£80\n";
            }

            return txt;
        }

        function refreshTotalCost()
        {
            var costText = "£" + getTotalCost();

            if ($('#checkIntoleranceTest').attr('checked')) {
                costText = "From " + costText;
            }

            $('#spanTotalCost').text(costText);
        }

        this.serviceCheckSelected = function ()
        {
            refreshTotalCost();
        }

        this.selectedPackage1 = function()
        {
            $('#checkConsultation').attr('checked', false);
            $('#checkFollowUp').attr('checked', false);

            refreshTotalCost();
        }

        this.submitContactForm = function ()
        {
            // Disable the button to avoid repeated submits
            $("#btnSubmit").attr("disabled", true);

            var bodyText = "A new booking request has been made:\n";

            bodyText += "Name: " + $('#name').val() + "\n";
            bodyText += "Email: " + $('#email').val() + "\n";
            bodyText += "Message: " + $('#message').val() + "\n";

            
            sendEmail("New Contact Request from " + $('#name').val(), bodyText);
        }

        this.submitBookingForm = function ()
        {
            // Disable the button to avoid repeated submits
            $("#btnSubmit").attr("disabled", true);

            var bodyText = "A new booking request has been made:\n";

            bodyText += "Name: " + $('#name').val() + "\n";
            bodyText += "Email: " + $('#email').val() + "\n";
            bodyText += "Message: " + $('#message').val() + "\n";

            bodyText += "\nServices requested:\n";
            bodyText += getServicesText();
            bodyText += "\nQuoted Total Cost: £" + getTotalCost() + "\n";

            sendEmail("New Booking Request from " + $('#name').val(), bodyText);
        }

        function sendEmail(subject, bodyText)
        {
            $.ajax({
                url: "http://daveltest.azurewebsites.net/api/email",
                type: "POST",
                data: {
                    customerId: "3",
                    applicationName: "JaneAdams4HealthEmailApp",
                    subject: subject,
                    body: bodyText
                },
                cache: false,
                success: function () {
                    // Enable button & show success message
                    $("#btnSubmit").attr("disabled", false);
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
//                    $('#contactForm').trigger("reset");
                },
                error: function () {
                    // Fail message
                    $("#btnSubmit").attr("disabled", false);
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + $('#name').val() + ", it seems that my mail server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
//                    $('#contactForm').trigger("reset");
                },
            })
        }
    });

})();