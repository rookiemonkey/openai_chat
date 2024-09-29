# REQUIREMENTS
1. docker
2. docker-compose
3. openai key (get yours here [here](https://platform.openai.com/api-keys)) 

# START THE APP
1. make sure `/.env` file is present. rename the `/.env.keep` file and remove '.keep', and then add necesary values to each keys

2. run docker-compose up
```
$ docker-compose up
```

3. use browser and then go to app. ~will compile at first load
```
$ http://localhost:3000/
```

# CHANGED AN ENV VARIABLE?
run ```docker-compose up --build``` to rebuild a new version