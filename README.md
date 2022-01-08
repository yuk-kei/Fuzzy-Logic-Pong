# Fuzzy-Logic-Pong
Let's get Fuzzy 🤪 !!!

Ａ basic  ｍultiplayer (Client/Server) clone of the classic Pong game made with Phaser, Node.js and Socket.io.



## This Pong game has the following features:

- the classic Pong game mechanics

- a server application that allows two human clients to connect

- once one client connects, the server randomly assigns

- 1. an traditional AI bot 
  2. an AI bot using fuzzy logic or 
  3. one of the available human opponents 

- after each game session is finished, the human player is asked if the opponent was an AI bot or a human and the answer as well as the actual setup are saved to a JSON file by the server

- (NOT YET implemented)Allow for teams of two to play one-another, whereby it is possible to have AI/AI, AI/Human and Human/Human teams. (Bonus)



## Installing and running the game

You can separate the client folder from the sever and deploy them wherever you like. For the client,  you will need [npm](https://www.npmjs.com/) to install the Node.js packages required for the server. To run the client and server, you'll need to have Node.js installed.

Clone the repository. Inside the newly created directory, run `npm install` to install the Node.js packages listed in both `package.json` file in the sever side and the client side. Go to the directory where `server.js` in and run `npm run start` to start the server. The server will listen to connections on port `5000`; you can change that behaviour by editing the code. The client application runs defaults on port  `8080` You can access the app by navigating to http://localhost:8080/ once the server and the client starts.



