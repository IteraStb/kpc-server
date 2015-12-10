Server Knowledge Checklist
==========================

Provides API for serving user data and knowledge lists.

## Development

To start developing in the project:

1. Clone server part of the project from here:

    `https://github.com/IteraStb/kpc-server.git`
    
2. Download and install mongodb to store all data
    
    `https://www.mongodb.org/downloads#production`
   
3. Configure and initiate local folder for your database

    `C:\mongodb\bin\mongod.exe --dbpath d:\test\mongodb\data`
  
4. Install npm modules:
    `bash`
    `npm install`
        
5. Run scripts to populate db with dummy data from 
    `script/db`
    `for example: node ./script/db/set_users_collection.js`
    
6. Run `node server.js` from the root to start the server

Note!
If you add new users to the database, make sure you cleared browser cookies. Otherwise, this leads to fatal errors.
Mongo regerates ids for all users after new one is added. These ids are used to generate cookies for each user in db. 
So, if cookies are not cleared, new user id will conflict with the existing browser cookie. 
