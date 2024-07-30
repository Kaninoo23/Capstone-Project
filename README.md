This project is a Keyboard ecommerce website.  You are able to create a profile which then you can login to the website. 
At the time of signing up your password will be hashed and then the information will be stored in a mongoDB database. 
During the process of logging in you your email and password will be routed through being compared to what is in the database and what you have typed, then it will then be assigned a token and then authenticated.  
Once you are on the home page your Ip is retrieved and used to get your Latitude and Longitude from a API then sent to another API to get your local weather.  
You can add products to a cart which is carried through local storage to any page you want to click on.  
There is a check out button that takes you to a check out page that in the future can have payment processing.
This projects uses node.js and can be access by typing http://localhost:3000/home to get started you will be redirected to a login page with a option to signup.

The dependents you will need and can downloaded once you have node.js with a command in the terminal.  You can find the commands down below next to the depends.  Only two you can't get with a command is Node.js and mongodb compass(Links previded below) 

Node.js.  This can be downloaded at https://nodejs.org/en.  I used Default port:3000

mongodb.  I used mongodb compass to havea UI and then i used default port mongodb://localhost:27017.

npm install bcrypt

npm install body-parser

npm install bootstrap

npm install cors

npm install dotenv

npm install express

npm install jsonwebtoken

npm install mongodb

npm install mongoose 

Enjoy!!!
