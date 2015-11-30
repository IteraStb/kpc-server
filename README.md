Server Knowledge checklist
============

Provides API for serve user data and knowledge lists.

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
    `scripts/db`
    `for example: node ./script/db/set_users_collection.js`
    
6. Run `node server.js` from the root to start the server
