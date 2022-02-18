# Traefiker

Traefiker is a web dashboard for [Traefik](https://traefik.io/) that provides a simple, intuitive interface for managing & deploying your services.

![Traefiker's Dashboard](.github/assets/dashboard-view.png "Dashboard")

## Prerequisites

-   [Traefik](https://traefik.io/)
-   [Docker](https://www.docker.com/)
-   [Docker Compose](https://docs.docker.com/compose/) (optional)

You'll need to have setup Traefik before you can begin using Traefiker.

There's lots of tutorials online or you can use the [Traefik documentation](https://doc.traefik.io/traefik/getting-started/quick-start/) to get started.

Additionally, you can use my [Traefik Starter Files](https://github.com/haidousm/traefik-starter).

## Usage

Traefiker is broken down into two applications:

    * API
    * Client

Before deploying either, you'll need to configure your username-password for the dashboard.

To do that, run the following command:

    TBD

To get Traefiker up & running, create a docker-compose.yml file in the root of your project.

```
version: "3"
networks:
    web:
        external: true
services:
    api:
        image: haidousm/traefiker-api:SNAPSHOT
        labels:
            - traefik.http.routers.api.rule=Host(`admin.localhost`) && PathPrefix("/api")
            - traefik.http.middlewares.api-prefix.stripprefix.prefixes=/api
            - traefik.http.routers.api.middlewares=api-prefix
        volumes:
            - /var/run/docker.sock:/var/run/docker.sock
        networks:
            - web
        ports:
            - "8010:8010"
        environment:
            - MONGO_URI=mongodb://192.168.0.171:27017/traefiker
    web:
        image: haidousm/traefiker-web:SNAPSHOT
        labels:
            - traefik.http.routers.web.rule=Host(`admin.localhost`)
        networks:
            - web
        environment:
            - NEXT_PUBLIC_API_URL=http://192.168.0.171:8010
        ports:
            - "8020:8020"
```

Then, run `docker-compose up` to start the services and head over to the dashboard.

## Contributing

To contribute, please open an issue or pull request on [GitHub](https://github.com/haidousm/traefiker).
