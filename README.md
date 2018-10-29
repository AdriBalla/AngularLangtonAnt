# Dockerized Angular Langton's Ant

Docker and Angular Projet to illustrate the Langton's Ant

You can find more about this project here :  https://en.wikipedia.org/wiki/Langton%27s_ant

This project was generated with Angular CLI version 7.0.2. 

It is composed of two containers : 

*    gol_angular : Angular
*    gol_nginx : Nginx 


## Prerequisites

This project requires npm to init the Angular dependencies.
 
You can find more about the npm installation here : https://www.npmjs.com/get-npm

## Getting Started

Pull the project by using the following command :

```
git pull https://github.com/AdriBalla/AngularLangtonAnt.git
```

## Init Angular

The first step is to build the dependencies of the Angular project

```
make init
```

## Run the Angular Docker

```
make up
```

## Access the Angular container

The angular container is available on localhost:80

The angular folder inside the project is shared into the angular container so the modifications applied to the file are synched into te container.

## Kill the Angular Docker


```
make kill
```

