This is a simple full stack application for testing different types of deployments. In browser, it shows an UI to take name and email address. It lists whatever is in current database. It also allows each entry to be edited or deleted.
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

# using Kubernetes

Build images inside Minikube so no registry is needed

`minikube image build -t userdir-frontend:dev .\frontend`

`minikube image build -t userdir-backend:dev  .\backend`

Now start the application in pods.

`kubectl apply -k .\k8s`

`kubectl get pods -n userdir`

Port-forward Vite dev server

`kubectl -n userdir port-forward svc/frontend 5173:5173`

Now open http://localhost:5173 in a browser.

Port-forward Backend if you want to poke it from browser.

`kubectl -n userdir port-forward svc/backend 8080:8080`

Now open http://localhost:8080/api/users in a browser. You should be able to see all the users from database.

Delete postgres pod to test persistence.

`kubectl delete pod -n userdir -l app=postgres`

# using Helm

`helm install userdir ./userdir -n userdir --create-namespace`

Port-forward Vite dev server

`kubectl -n userdir port-forward svc/userdir-frontend 5173:5173`

Now open http://localhost:5173 in a browser.
