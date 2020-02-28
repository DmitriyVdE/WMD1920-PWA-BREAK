# WMD1920-PWA-BREAK

Figma link: https://www.figma.com/file/NVXP8sWTe3zxCV16ncIiMi/PWA-Odisee?node-id=0%3A1

API Installation:
  - npm install --save-dev nodemon
  - npm install express --save
  - npm install mongoose --save
  - npm install cors --save
  - npm install body-parser --save
  
Run API:
  - npm run start

API Requests:
  - api/users:
    - POST: Empty Body -> Returns new _id;
  - api/groups:
    - POST: BODY:   {
                    	"userId": "5e58fe564577864ad860104e", // _id of the owner see above
                    	"groupName": "First Group Ever",
                    	"password": "SuperSecret"
                    }
            Returns Full group info.

Mongodb Info:   
  - User: dbAPI
  - Pass: *33Cla@CIivn
  - Conn Str: mongodb+srv://dbAPI:*33Cla@CIivn@main-sb6gn.gcp.mongodb.net/test?retryWrites=true&w=majority
  
  Example Code Block:
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://dbAPI:<password>@main-sb6gn.gcp.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
  });
