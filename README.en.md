# FURIA TalkSpace Frontend

## Description
**FURIA TalkSpace** is a digital chat platform aimed at fans of FURIA eSports teams. The platform allows fans to communicate with each other about different teams of the organization.

This project was developed as part of the technical test for the **Software Engineering Assistant at FURIA Tech** position.
The selected challenge was **Challenge #1: Conversational Experience**.

## Technologies
- **Angular 19** – Web framework for building the user interface.
- **Bootstrap 5** – Responsive styling and visual components.
- **@ng-bootstrap/ng-bootstrap** – Integration of Bootstrap components with Angular.
- **SockJS** and **@stomp/stompjs** – Real-time communication via WebSocket with fallback.
- **TypeScript** – Language used to develop the frontend with static typing.

## How to install and run the frontend

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Angular CLI](https://angular.io/cli) (install globally using the command below)
- [Backend](https://github.com/PedroH225/FURIA-TalkSpace-Backend#) (running on port 8080)
- Internet access to install dependencies

### Running the project
1. Clone the repository and access the frontend folder
```bash
git clone git@github.com:PedroH225/FURIA-TalkSpace-Frontend.git
cd FURIA-TalkSpace-Frontend/
```

2. Install dependencies
```bash
npm install
```

3. Run the project
```bash
ng serve
```

4. Open the project in your browser
Link: http://localhost:4200

## Features
- Chats – Participate in chats about various games and topics.
- Conversations – Chat in real-time with FURIA fans.
