Dev notes

I use Visual Studio code to edit files in this project, which is free to download.
When running just open it in this folder and everything should be laid out nicely.
Most of the contents of this folder are from a template and I've just modified it.

The main file that is loaded by default in web browsers is index.html so that's the first page to look at and see how
everything hangs together. Links will take you out to the other html files.

Images are stored in the img folder (the images folder is used by the template)

Styles (css) are in css/style.css but I have not changed this dramatically from the original template

The website is based on bootstrap to allow it to render nicely on large screens as well as mobile devices.
AngularJS is used for control aspects, e.g. menus, booking system etc and the main code is in scripts/app.js
In app.js you will be able to:

* Change your email address, phone number etc
* Add new pages to link to
* Change booking and contact forms

To get a build running locally in order to test you need to do the following:

1) Get a github account and access to the JaneAdmas4Health project:
https://github.com/JaneAdams4Health/JaneAdams4Health.github.io
2) If on windows install powershell
3) Open Visual Studio code and select Source control in the navigation bar on the left
4) Click on ... and Remote->Add remote and then click on Add remote from github
5) You'll then be asked to sign in to github and enter the git repository which is https://github.com/JaneAdams4Health/JaneAdams4Health.github.io.git
6) You need to clone the master branch which will pull everything on to your computer so you can edit it - choose a location on your harddrive to store this project
7) To make changes just edit any file, you can then test it looks OK (see below) and then stage and push your changes to publish them to the website

Testing:
Use powershell to run a webserver on your local machine.
Open power shell and go to the root folder of the project
In power shell type in:
npm run server
and then hit return - this will start a webserver of your local changes and you access it in a browser with this URL:
http://localhost:3000/
Test the website and if everything is as it should be then you can push your changes to github

Note on email:
Emails as provided for free through Formspree and is linked to this account:
https://formspree.io/moqpalle
Create your own Formspree account if you wish to modify who emails go to or feel free to just keep using this account

Note on domain hosting:
The domain URL is held in the root file CNAME (no file extension) and is set to janeadams4health.co.uk
Github allows one free host site per user login and needs this file to link it to a domain
You need to set up DNS settings with a domain host server, e.g. if with names.co.uk:
https://www.names.co.uk/support/articles/changing-your-domains-dns-settings/
You essentially link janeadams4health.co.uk to https://github.com/JaneAdams4Health/JaneAdams4Health.github.io
