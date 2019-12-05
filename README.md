# Project Description

This project is built on Ruby On Rails framework on the backend and React library on the frontend. Project will allow you and your other team members to create team and manage your day to day tasks. It is ment to help teams organise the workload, and utilize their time as best as possible.

### Live Demo

For live demo [Click Here](https://safe-anchorage-49127.herokuapp.com/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* Node.js and npm installed on your development machine.
* The Yarn package manager.
* Ruby on Rails framework.
* PostgreSQL

### Installing

To get a copy of the code, you can use the following code:

```
git clone git@github.com:EmirVatric/Shifts.git
```

then you need to run the following commande to download all dependcies need to run the application properly :

```
yarn install
```
and:

```
bundle install
```
final, you can run the application using :

````
rails server
````

You can find the application running on localhost:3000

## Deployment

This application has been deployed to Heroku.

First step is to create heroku repository:

```
heroku create
```
Then run:

```
git push heroku master
```
Run the migrations:

```
heroku run rails db:migrate
```

## Built With

* [Ruby on Rails](https://rubyonrails.org/) - Backend framework
* [React](https://reactjs.org/) - Frontend library

## Authors

* **Emir Vatric** - [Portfolio](https://www.emirvatric.com/)
