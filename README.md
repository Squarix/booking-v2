**PI Course project**

***by https://github.com/Squarix (Uladzislau Bahdanouski)***

### Project has 2 parts:
* NestJS server
* React frontend application

###### Can be launched with Docker
* File `docker-compose.production.yml`  using 
```bash
docker-compose -f ./docker-compose.production.yml up
```

###### OR using script 
* File `run.sh`
* Make sure you made file executable `sudo chmod +x ./run.sh`
* Run script with simple `./run.sh`

###### Also can be launched in separate mode
* Use `cd ./booking-api & yarn start:debug` with booking-api for development purpose
* Use `cd ./booking-frontend & yarn start` with booking-frontend for development purpose
