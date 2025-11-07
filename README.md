# Build

`docker compose build`

To fix maven related error, you might have to run below commands for windows.
`cd backend`
`mvn -N io.takari:maven:wrapper` generate wrapper if missing
`./mvnw spring-boot:run`

# Run

`docker compose up -d`

`docker compose down`

`docker compose up -d --no-deps --build backend`

