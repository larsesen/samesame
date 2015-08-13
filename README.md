####Same same, but different####

by Lars Nedberg

Original: https://github.com/henloen/sommer-2014, owners Lars Nedberg and Henrik Loennechen.
Project was then forked and modified: https://github.com/arhplanet/sommer-2014, owner Arne-Richard Hofsøy (arhplanet@gmail.com
This version is a fork of the work made by Arne-Richard Hofsøy. Owner of this version: Lars Nedberg (lars.nedberg@gmail.com).


The application mainly consists of two subparts.
Part 1 is a questionnaire where the user answers an image-questionnaire-form.
Answers obtained are saved in a database, and can be viewed in the admin part of the application.
Both the user and the admin part of the application can be accessed from the main menu (the first screen when accessing the application)

Part 2 is presenting statistics from the answers gathered in part 1.


A documentation on the concept, the use of the application, the intended users, the technical solutions chosen and more can be obtained by asking Lars.


#####How to set up and run the application######
1. Clone this repo
2. Download and install [node.js](http://nodejs.org/download/) (version 0.12.7 was used during development).
3. Set up a working [mysql server](http://dev.mysql.com/downloads/windows/installer/5.6.html). Create the two tables (Answers, Participants) needed, using the sql scripts in the sql folder.
4. Configure your own config.local.js file to define the url you will access the mysql server on. The file should follow this example:

    ```javascript
    /*jshint node: true*/
    "use strict";
    var dbOptions = {
      dburl: 'yourDBurl',
      dbuser: 'yourDBuser',
      dbpassword: 'yourDBpassword'
    }
    exports.dbOptions = dbOptions; 
    ```
    and should be located in root/app

    
5. Run *npm start* from the root level of the project. This should install all further dependencies and fire up the application.

6. Access the application at <yourip>:<theportspecified> (e.g. localhost:3000).

For more detailed instructions, please consult the documentation.



