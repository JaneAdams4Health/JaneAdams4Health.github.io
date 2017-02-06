// app.js

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

        $scope.initialize = function () {
            switch (window.location.href.substr(window.location.href.lastIndexOf("/") + 1))
            {
                case "index.html": $('#navHome').addClass("active"); break;
                case "about.html": $('#navAbout').addClass("active"); break;
                case "therapy.html": $('#navTherapy').addClass("active"); break;
                case "services.html": $('#navServices').addClass("active"); break;
                case "blog.html": $('#navBlog').addClass("active"); break;
                case "contact.html": $('#navContact').addClass("active"); break;
            }
        }

    });

})();
