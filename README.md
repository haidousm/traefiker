# Traefiker

Traefiker is a web dashboard for [Traefik](https://traefik.io/) that provides a simple, intuitive interface for managing & deploying your services.

![Traefiker's Dashboard](.github/assets/dashboard-view.png "Dashboard")

## Usage

Traefiker is broken down into two applications:

    * API
    * Client

Before deploying either, you'll need to configure your username-password for the dashboard.

To do that, run the following command:

    TBD

To deploy the API, you can either:

-   Build the docker image yourself:
    ```
    $ docker build -t traefiker-api api
    $ docker run -d
        -e MONGO_URI=mongodb://localhost:27017
        -e PORT=8010
        -p 8010:8010
        traefiker-api
    ```
-   Or pull the latest image from the Docker Hub:
    ```
    $ docker pull haidousm/traefiker-api
    $ docker run -d
        -e MONGO_URI=mongodb://localhost:27017
        -e PORT=8010
        -p 8010:8010
        haidousm/traefiker-api
    ```

To deploy the client, you can either:

-   Build the docker image yourself:
    ```
    $ docker build -t traefiker-web client
    $ docker run -d
        -e NEXT_PUBLIC_API_URL=http://localhost:8010
        -e PORT=8020
        -p 8020:8020
        traefiker-web
    ```
-   Or pull the latest image from the Docker Hub:
    ```
    $ docker pull haidousm/traefiker-web
    $ docker run -d
        -e NEXT_PUBLIC_API_URL=http://localhost:8010
        -e PORT=8020
        -p 8020:8020
        haidousm/traefiker-web
    ```

## Contributing

To contribute, please open an issue or pull request on [GitHub](https://github.com/haidousm/traefiker).
