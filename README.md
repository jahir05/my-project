# Build

`docker compose build`

To fix maven related error, you might have to run below commands for windows.
`cd backend`
# generate wrapper if missing
`mvn -N io.takari:maven:wrapper`
`./mvnw spring-boot:run`

# Run

`docker compose up -d`

`docker compose down`

`docker compose up -d --no-deps --build backend`

