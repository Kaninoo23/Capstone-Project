This project is a Keyboard ecommerce website.  You are able to create a profile which then you can login to the website. At the time of signing up your password will be hashed and then the information will be stored in a mongoDB database. During the process of logging in your email and password will be routed through being compared to what is in the database and what you have typed, then it will then be assigned a token and then authenticated.  Once you are on the home page your Ip is retrieved and used to get your Latitude and Longitude from a API then sent to another API to get your local weather.  You can add products to a cart which is carried through local storage to any page you want to click on.  Once on the Shopping cart page your totals will be added up and the tax and shipping is static for now.  There is a check out button that takes you to a check out page that in the future can have payment processing.  This projects uses node.js so type node server.js in the terminal/console. Then it can be access by typing http://localhost:3000/home to get started. You will be redirected to a login page with a option to signup.  Click signup and fill out the form then once successful click login and enter you email and pasword.  This can be done after you installed all the dependents!!!!! (see below).

The dependents you will need and can downloaded once you have node.js with a command in the terminal/console.  You can find the commands down below next to the depends.  Only two you can't get with a command is Node.js and mongodb compass(Links previded below) 

Node.js.  This can be downloaded at https://nodejs.org/en.  I used Default port:3000.

mongodb.  I used mongodb compass to have a UI and then I used default port mongodb://localhost:27017. This can be download at https://www.mongodb.com/products/tools/compass.

npm install bcrypt

npm install body-parser

npm install bootstrap

npm install cors

npm install dotenv

npm install express

npm install jsonwebtoken

npm install mongodb

npm install mongoose 

(Referenced up above also) To start node server use command node server.js in the terminal/console once all the dependents are installed to get started.

Future features 

Contact form in the contacts page that can be filled out.  Then it will be sent to a ticket sytem or emailed out.

Payment Processing on the Checkout Page.


Enjoy!!!
