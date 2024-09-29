# REQUIREMENTS
1. docker
2. docker-compose
3. openai key and org. id (get your key [here](https://platform.openai.com/api-keys)) 

# START THE APP
1. make sure `/.env` file is present. rename the `/.env.keep` file and remove '.keep', and then add necesary values to each keys namely:
```
OPENAI_ACCESS_TOKEN
OPENAI_ORGANIZATION_ID
```

2. run docker-compose up
```
$ docker-compose up
```

3. use browser and then go to app. ~will compile at first load
```
$ http://localhost:3000/
```

# SOME POINTS

#### CHANGED AN ENV VARIABLE?
run ```docker-compose up --build``` to rebuild a new version. A much faster approach is to directly modify the file on docker then restart the container/service

#### NO DATA PERSISTENCE?
open browser console and run ```localStorage.clear()```. This is because of fake user mechanism on useAuth.js