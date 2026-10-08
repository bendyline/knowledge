---
title: Run an ASP.NET Core app in Docker containers
author: wadepickett
description: Learn how to use the published ASP.NET Core Docker images from the Docker Registry. Pull and build your own images.
ms.author: wpickett
ms.custom: linux-related-content
ms.date: 04/22/2025
uid: host-and-deploy/docker/building-net-docker-images
---

# Run an ASP.NET Core app in Docker containers

**Applies to: < aspnetcore-10.0**
> **Note:**
> This isn't the latest version of this article. For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).


**Applies to: \= aspnetcore-7.0 || = aspnetcore-5.0 || = aspnetcore-3.0 || = aspnetcore-3.1 || = aspnetcore-2.0**
> **Warning:**
> This version of ASP.NET Core is no longer supported. For more information, see the [.NET and .NET Core Support Policy](https://dotnet.microsoft.com/platform/support/policy/dotnet-core). For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).



<!-- Exclude until .NET 11 preview is added to the version selector collection
(add triple colon here) moniker range="> aspnetcore-10.0"
> [!IMPORTANT]
> This information relates to a pre-release product that may be substantially modified before it's commercially released. Microsoft makes no warranties, express or implied, with respect to the information provided here.
>
> For the current release, see the [.NET 10 version of this article](?view=aspnetcore-10.0&preserve-view=true).
(add triple colon here) moniker-end
-->

<!--
Include either this file or 'not-latest-version-without-not-supported-content.md' at the top 
of articles.

'not-latest-version.md' (this file): Includes not-supported content.
'not-latest-version-without-not-supported-content.md': Doesn't include not-supported content.

Use this file in articles that target >=7.0. For articles that target >=8.0 prior to 10.0
reaching EOL, 'not-latest-version-without-not-supported-content.md' must be used to avoid
a zone/file moniker range mismatch error.

When a new version is released, it might be necessary to temporarily comment out the current 
version moniker range section until the new moniker is created.

Markdown to include this file:

[!INCLUDE[](~/includes/not-latest-version.md)]
-->


This article shows how to run an ASP.NET Core app in Docker containers.

Windows Home Edition doesn't support Hyper-V, and Hyper-V is needed for Docker.

See [Containerize a .NET app with dotnet publish](https://learn.microsoft.com/dotnet/core/docker/publish-as-container) for information on containerized a .NET app with `dotnet publish`.

**Applies to: \>= aspnetcore-10.0**

## ASP.NET Core Docker images

For this tutorial, you download an ASP.NET Core sample app and run it in Docker containers. The sample works with both Linux and Windows containers.

The sample Dockerfile uses the [Docker multi-stage build feature](https://docs.docker.com/engine/userguide/eng-image/multistage-build/) to build and run in different containers. The build and run containers are created from images that are provided in Docker Hub by Microsoft:

* `dotnet/sdk`

  The sample uses this image for building the app. The image contains the .NET SDK, which includes the Command Line Tools (CLI). The image is optimized for local development, debugging, and unit testing. The tools installed for development and compilation make the image relatively large.

* `dotnet/aspnet`

   The sample uses this image for running the app. The image contains the ASP.NET Core runtime and libraries and is optimized for running apps in production. Designed for speed of deployment and app startup, the image is relatively small, so network performance from Docker Registry to Docker host is optimized. Only the binaries and content needed to run an app are copied to the container. The contents are ready to run, enabling the fastest time from `docker run` to app startup. Dynamic code compilation isn't needed in the Docker model.

## Prerequisites

* [.NET SDK 10.0](https://dotnet.microsoft.com/download)
* Docker client 18.03 or later

  * Linux distributions
    * [Debian](https://docs.docker.com/install/linux/docker-ce/debian/)
    * [Fedora](https://docs.docker.com/install/linux/docker-ce/fedora/)
    * [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
  * [macOS](https://docs.docker.com/desktop/mac/install/)
  * [Windows](https://docs.docker.com/desktop/windows/install/)
 
* [Git](https://git-scm.com/download)

## Download the sample app

* Download the sample by cloning the [.NET Docker repository](https://github.com/dotnet/dotnet-docker):

  ```console
  git clone https://github.com/dotnet/dotnet-docker
  ```

## Run the app locally

* Navigate to the project folder at *dotnet-docker/samples/aspnetapp/aspnetapp*.

* Run the following command to build and run the app locally:

  ```dotnetcli
  dotnet run
  ```

* Go to `http://localhost:<port>` in a browser to test the app.

* Press Ctrl+C at the command prompt to stop the app.

## Run in a Linux container or Windows container

* To run in a Linux container, right-click the System Tray's Docker client icon and select [switch to Linux containers](https://docs.docker.com/desktop/windows/#switch-between-windows-and-linux-containers).
* To run in a Windows container, right-click the System Tray's Docker client icon and select [switch to Windows containers](https://docs.docker.com/desktop/windows/#switch-between-windows-and-linux-containers).

* Navigate to the Dockerfile folder at *dotnet-docker/samples/aspnetapp*.

* Run the following commands to build and run the sample in Docker:

  ```console
  docker build -t aspnetapp .
  docker run -it --rm -p <port>:8080 --name aspnetcore_sample aspnetapp
  ```

  The `build` command arguments:
  * Name the image aspnetapp.
  * Look for the Dockerfile in the current folder (the period at the end).

  The run command arguments:
  * Allocate a pseudo-TTY and keep it open even if not attached. (Same effect as `--interactive --tty`.)
  * Automatically remove the container when it exits.
  * Map `<port>` on the local machine to port 8080 in the container.
  * Name the container aspnetcore_sample.
  * Specify the aspnetapp image.

* Go to `http://localhost:<port>` in a browser to test the app.

## Build and deploy manually

In some scenarios, you might want to deploy an app to a container by copying its assets that are needed at run time. This section shows how to deploy manually.

* Navigate to the project folder at *dotnet-docker/samples/aspnetapp/aspnetapp*.

* Run the [dotnet publish](https://learn.microsoft.com/dotnet/core/tools/dotnet-publish) command:

  ```dotnetcli
  dotnet publish -c Release -o published
  ```

  The command arguments:
  * Build the app in release mode (the default is debug mode).
  * Create the assets in the *published* folder.

* Run the app.

  * Windows:

    ```dotnetcli
    dotnet published\aspnetapp.dll
    ```

  * Linux:

    ```dotnetcli
    dotnet published/aspnetapp.dll
    ```

* Browse to `http://localhost:<port>` to see the home page.

To use the manually published app within a Docker container, create a new *Dockerfile* and use the `docker build .` command to build an image.

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY published/ ./
ENTRYPOINT ["dotnet", "aspnetapp.dll"]
```

To see the new image use the `docker images` command.

### The Dockerfile

Here's the *Dockerfile* used by the `docker build` command you ran earlier. It uses `dotnet publish` the same way you did in this section to build and deploy.

```dockerfile
# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY *.sln .
COPY aspnetapp/*.csproj ./aspnetapp/
RUN dotnet restore

# copy everything else and build app
COPY aspnetapp/. ./aspnetapp/
WORKDIR /source/aspnetapp
RUN dotnet publish -c release -o /app --no-restore

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app ./
ENTRYPOINT ["dotnet", "aspnetapp.dll"]
```

In the preceding *Dockerfile*, the `*.csproj` files are copied and restored as distinct *layers*. When the `docker build` command builds an image, it uses a built-in cache. If the `*.csproj` files did not change since the `docker build` command last ran, the `dotnet restore` command doesn't need to run again. Instead, the built-in cache for the corresponding `dotnet restore` layer is reused. For more information, see [Best practices for writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#leverage-build-cache).

## Additional resources

* [Containerize a .NET app with dotnet publish](https://learn.microsoft.com/dotnet/core/docker/publish-as-container)
* [Docker build command](https://docs.docker.com/engine/reference/commandline/build)
* [Docker run command](https://docs.docker.com/engine/reference/commandline/run)
* [ASP.NET Core Docker sample](https://github.com/dotnet/dotnet-docker) (The one used in this tutorial.)
* [Configure ASP.NET Core to work with proxy servers and load balancers](../proxy-load-balancer.md)
* [Working with Visual Studio Docker Tools](https://learn.microsoft.com/visualstudio/containers/add-container-support)
* [Debugging with Visual Studio Code](https://code.visualstudio.com/docs/nodejs/debugging-recipes#_debug-nodejs-in-docker-containers)
* [GC using Docker and small containers](https://learn.microsoft.com/search/?terms=performance%2Fmemory%23gc-using-docker-and-small-containers)
* [System.IO.IOException: The configured user limit (128) on the number of inotify instances has been reached](https://learn.microsoft.com/search/?terms=host-and-deploy%2Fdocker%2Findex%23d128)
* [Updates to Docker images](https://andrewlock.net/exploring-the-dotnet-8-preview-updates-to-docker-images-in-dotnet-8/)

## Next steps

The Git repository that contains the sample app also includes documentation. For an overview of the resources available in the repository, see [the README file](https://github.com/dotnet/dotnet-docker/blob/main/samples/aspnetapp/README.md). In particular, learn how to implement HTTPS:

> 
> [Developing ASP.NET Core Applications with Docker over HTTPS](https://github.com/dotnet/dotnet-docker/blob/main/samples/run-aspnetcore-https-development.md)



**Applies to: \= aspnetcore-9.0**

## ASP.NET Core Docker images

For this tutorial, you download an ASP.NET Core sample app and run it in Docker containers. The sample works with both Linux and Windows containers.

The sample Dockerfile uses the [Docker multi-stage build feature](https://docs.docker.com/engine/userguide/eng-image/multistage-build/) to build and run in different containers. The build and run containers are created from images that are provided in Docker Hub by Microsoft:

* `dotnet/sdk`

  The sample uses this image for building the app. The image contains the .NET SDK, which includes the Command Line Tools (CLI). The image is optimized for local development, debugging, and unit testing. The tools installed for development and compilation make the image relatively large.

* `dotnet/aspnet`

   The sample uses this image for running the app. The image contains the ASP.NET Core runtime and libraries and is optimized for running apps in production. Designed for speed of deployment and app startup, the image is relatively small, so network performance from Docker Registry to Docker host is optimized. Only the binaries and content needed to run an app are copied to the container. The contents are ready to run, enabling the fastest time from `docker run` to app startup. Dynamic code compilation isn't needed in the Docker model.

## Prerequisites

* [.NET SDK 9.0](https://dotnet.microsoft.com/download)
* Docker client 18.03 or later

  * Linux distributions
    * [Debian](https://docs.docker.com/install/linux/docker-ce/debian/)
    * [Fedora](https://docs.docker.com/install/linux/docker-ce/fedora/)
    * [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
  * [macOS](https://docs.docker.com/desktop/mac/install/)
  * [Windows](https://docs.docker.com/desktop/windows/install/)

* [Git](https://git-scm.com/download)

## Download the sample app

* Download the sample by cloning the [.NET Docker repository](https://github.com/dotnet/dotnet-docker):

  ```console
  git clone https://github.com/dotnet/dotnet-docker
  ```

## Run the app locally

* Navigate to the project folder at *dotnet-docker/samples/aspnetapp/aspnetapp*.

* Run the following command to build and run the app locally:

  ```dotnetcli
  dotnet run
  ```

* Go to `http://localhost:<port>` in a browser to test the app.

* Press Ctrl+C at the command prompt to stop the app.

## Run in a Linux container or Windows container

* To run in a Linux container, right-click the System Tray's Docker client icon and select [switch to Linux containers](https://docs.docker.com/desktop/windows/#switch-between-windows-and-linux-containers).
* To run in a Windows container, right-click the System Tray's Docker client icon and select [switch to Windows containers](https://docs.docker.com/desktop/windows/#switch-between-windows-and-linux-containers).

* Navigate to the Dockerfile folder at *dotnet-docker/samples/aspnetapp*.

* Run the following commands to build and run the sample in Docker:

  ```console
  docker build -t aspnetapp .
  docker run -it --rm -p <port>:8080 --name aspnetcore_sample aspnetapp
  ```

  The `build` command arguments:
  * Name the image aspnetapp.
  * Look for the Dockerfile in the current folder (the period at the end).

  The run command arguments:
  * Allocate a pseudo-TTY and keep it open even if not attached. (Same effect as `--interactive --tty`.)
  * Automatically remove the container when it exits.
  * Map `<port>` on the local machine to port 8080 in the container.
  * Name the container aspnetcore_sample.
  * Specify the aspnetapp image.

* Go to `http://localhost:<port>` in a browser to test the app.

## Build and deploy manually

In some scenarios, you might want to deploy an app to a container by copying its assets that are needed at run time. This section shows how to deploy manually.

* Navigate to the project folder at *dotnet-docker/samples/aspnetapp/aspnetapp*.

* Run the [dotnet publish](https://learn.microsoft.com/dotnet/core/tools/dotnet-publish) command:

  ```dotnetcli
  dotnet publish -c Release -o published
  ```

  The command arguments:
  * Build the app in release mode (the default is debug mode).
  * Create the assets in the *published* folder.

* Run the app.

  * Windows:

    ```dotnetcli
    dotnet published\aspnetapp.dll
    ```

  * Linux:

    ```dotnetcli
    dotnet published/aspnetapp.dll
    ```

* Browse to `http://localhost:<port>` to see the home page.

To use the manually published app within a Docker container, create a new *Dockerfile* and use the `docker build .` command to build an image.

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY published/ ./
ENTRYPOINT ["dotnet", "aspnetapp.dll"]
```

To see the new image use the `docker images` command.

### The Dockerfile

Here's the *Dockerfile* used by the `docker build` command you ran earlier.  It uses `dotnet publish` the same way you did in this section to build and deploy.  

```dockerfile
# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY *.sln .
COPY aspnetapp/*.csproj ./aspnetapp/
RUN dotnet restore

# copy everything else and build app
COPY aspnetapp/. ./aspnetapp/
WORKDIR /source/aspnetapp
RUN dotnet publish -c release -o /app --no-restore

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app ./
ENTRYPOINT ["dotnet", "aspnetapp.dll"]
```

In the preceding *Dockerfile*, the `*.csproj` files are copied and restored as distinct *layers*. When the `docker build` command builds an image, it uses a built-in cache. If the `*.csproj` files haven't changed since the `docker build` command last ran, the `dotnet restore` command doesn't need to run again. Instead, the built-in cache for the corresponding `dotnet restore` layer is reused. For more information, see [Best practices for writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#leverage-build-cache).

## Additional resources

* [Containerize a .NET app with dotnet publish](https://learn.microsoft.com/dotnet/core/docker/publish-as-container)
* [Docker build command](https://docs.docker.com/engine/reference/commandline/build)
* [Docker run command](https://docs.docker.com/engine/reference/commandline/run)
* [ASP.NET Core Docker sample](https://github.com/dotnet/dotnet-docker) (The one used in this tutorial.)
* [Configure ASP.NET Core to work with proxy servers and load balancers](../proxy-load-balancer.md)
* [Working with Visual Studio Docker Tools](https://learn.microsoft.com/visualstudio/containers/add-container-support)
* [Debugging with Visual Studio Code](https://code.visualstudio.com/docs/nodejs/debugging-recipes#_debug-nodejs-in-docker-containers)
* [GC using Docker and small containers](https://learn.microsoft.com/search/?terms=performance%2Fmemory%23gc-using-docker-and-small-containers)
* [System.IO.IOException: The configured user limit (128) on the number of inotify instances has been reached](https://learn.microsoft.com/search/?terms=host-and-deploy%2Fdocker%2Findex%23d128)
* [Updates to Docker images](https://andrewlock.net/exploring-the-dotnet-8-preview-updates-to-docker-images-in-dotnet-8/)

## Next steps

The Git repository that contains the sample app also includes documentation. For an overview of the resources available in the repository, see [the README file](https://github.com/dotnet/dotnet-docker/blob/main/samples/aspnetapp/README.md). In particular, learn how to implement HTTPS:

> 
> [Developing ASP.NET Core Applications with Docker over HTTPS](https://github.com/dotnet/dotnet-docker/blob/main/samples/run-aspnetcore-https-development.md)



**Applies to: \= aspnetcore-8.0**

## ASP.NET Core Docker images

For this tutorial, you download an ASP.NET Core sample app and run it in Docker containers. The sample works with both Linux and Windows containers.

The sample Dockerfile uses the [Docker multi-stage build feature](https://docs.docker.com/engine/userguide/eng-image/multistage-build/) to build and run in different containers. The build and run containers are created from images that are provided in Docker Hub by Microsoft:

* `dotnet/sdk`

  The sample uses this image for building the app. The image contains the .NET SDK, which includes the Command Line Tools (CLI). The image is optimized for local development, debugging, and unit testing. The tools installed for development and compilation make the image relatively large.

* `dotnet/aspnet`

   The sample uses this image for running the app. The image contains the ASP.NET Core runtime and libraries and is optimized for running apps in production. Designed for speed of deployment and app startup, the image is relatively small, so network performance from Docker Registry to Docker host is optimized. Only the binaries and content needed to run an app are copied to the container. The contents are ready to run, enabling the fastest time from `docker run` to app startup. Dynamic code compilation isn't needed in the Docker model.

## Prerequisites

* [.NET SDK 8.0](https://dotnet.microsoft.com/download)
* Docker client 18.03 or later

  * Linux distributions
    * [Debian](https://docs.docker.com/install/linux/docker-ce/debian/)
    * [Fedora](https://docs.docker.com/install/linux/docker-ce/fedora/)
    * [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
  * [macOS](https://docs.docker.com/desktop/mac/install/)
  * [Windows](https://docs.docker.com/desktop/windows/install/)

* [Git](https://git-scm.com/download)

## Download the sample app

* Download the sample by cloning the [.NET Docker repository](https://github.com/dotnet/dotnet-docker):

  ```console
  git clone https://github.com/dotnet/dotnet-docker
  ```

## Run the app locally

* Navigate to the project folder at *dotnet-docker/samples/aspnetapp/aspnetapp*.

* Run the following command to build and run the app locally:

  ```dotnetcli
  dotnet run
  ```

* Go to `http://localhost:<port>` in a browser to test the app.

* Press Ctrl+C at the command prompt to stop the app.

## Run in a Linux container or Windows container

* To run in a Linux container, right-click the System Tray's Docker client icon and select [switch to Linux containers](https://docs.docker.com/desktop/windows/#switch-between-windows-and-linux-containers).
* To run in a Windows container, right-click the System Tray's Docker client icon and select [switch to Windows containers](https://docs.docker.com/desktop/windows/#switch-between-windows-and-linux-containers).

* Navigate to the Dockerfile folder at *dotnet-docker/samples/aspnetapp*.

* Run the following commands to build and run the sample in Docker:

  ```console
  docker build -t aspnetapp .
  docker run -it --rm -p <port>:8080 --name aspnetcore_sample aspnetapp
  ```

  The `build` command arguments:
  * Name the image aspnetapp.
  * Look for the Dockerfile in the current folder (the period at the end).

  The run command arguments:
  * Allocate a pseudo-TTY and keep it open even if not attached. (Same effect as `--interactive --tty`.)
  * Automatically remove the container when it exits.
  * Map `<port>` on the local machine to port 8080 in the container.
  * Name the container aspnetcore_sample.
  * Specify the aspnetapp image.

* Go to `http://localhost:<port>` in a browser to test the app.

## Build and deploy manually

In some scenarios, you might want to deploy an app to a container by copying its assets that are needed at run time. This section shows how to deploy manually.

* Navigate to the project folder at *dotnet-docker/samples/aspnetapp/aspnetapp*.

* Run the [dotnet publish](https://learn.microsoft.com/dotnet/core/tools/dotnet-publish) command:

  ```dotnetcli
  dotnet publish -c Release -o published
  ```

  The command arguments:
  * Build the app in release mode (the default is debug mode).
  * Create the assets in the *published* folder.

* Run the app.

  * Windows:

    ```dotnetcli
    dotnet published\aspnetapp.dll
    ```

  * Linux:

    ```dotnetcli
    dotnet published/aspnetapp.dll
    ```

* Browse to `http://localhost:<port>` to see the home page.

To use the manually published app within a Docker container, create a new *Dockerfile* and use the `docker build .` command to build an image.

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY published/ ./
ENTRYPOINT ["dotnet", "aspnetapp.dll"]
```

To see the new image use the `docker images` command.

### The Dockerfile

Here's the *Dockerfile* used by the `docker build` command you ran earlier.  It uses `dotnet publish` the same way you did in this section to build and deploy.  

```dockerfile
# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY *.sln .
COPY aspnetapp/*.csproj ./aspnetapp/
RUN dotnet restore

# copy everything else and build app
COPY aspnetapp/. ./aspnetapp/
WORKDIR /source/aspnetapp
RUN dotnet publish -c release -o /app --no-restore

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app ./
ENTRYPOINT ["dotnet", "aspnetapp.dll"]
```

In the preceding *Dockerfile*, the `*.csproj` files are copied and restored as distinct *layers*. When the `docker build` command builds an image, it uses a built-in cache. If the `*.csproj` files haven't changed since the `docker build` command last ran, the `dotnet restore` command doesn't need to run again. Instead, the built-in cache for the corresponding `dotnet restore` layer is reused. For more information, see [Best practices for writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#leverage-build-cache).

## Additional resources

* [Containerize a .NET app with dotnet publish](https://learn.microsoft.com/dotnet/core/docker/publish-as-container)
* [Docker build command](https://docs.docker.com/engine/reference/commandline/build)
* [Docker run command](https://docs.docker.com/engine/reference/commandline/run)
* [ASP.NET Core Docker sample](https://github.com/dotnet/dotnet-docker) (The one used in this tutorial.)
* [Configure ASP.NET Core to work with proxy servers and load balancers](../proxy-load-balancer.md)
* [Working with Visual Studio Docker Tools](https://learn.microsoft.com/visualstudio/containers/add-container-support)
* [Debugging with Visual Studio Code](https://code.visualstudio.com/docs/nodejs/debugging-recipes#_debug-nodejs-in-docker-containers)
* [GC using Docker and small containers](https://learn.microsoft.com/search/?terms=performance%2Fmemory%23gc-using-docker-and-small-containers)
* [System.IO.IOException: The configured user limit (128) on the number of inotify instances has been reached](https://learn.microsoft.com/search/?terms=host-and-deploy%2Fdocker%2Findex%23d128)
* [Updates to Docker images](https://andrewlock.net/exploring-the-dotnet-8-preview-updates-to-docker-images-in-dotnet-8/)

## Next steps

The Git repository that contains the sample app also includes documentation. For an overview of the resources available in the repository, see [the README file](https://github.com/dotnet/dotnet-docker/blob/main/samples/aspnetapp/README.md). In particular, learn how to implement HTTPS:

> 
> [Developing ASP.NET Core Applications with Docker over HTTPS](https://github.com/dotnet/dotnet-docker/blob/main/samples/run-aspnetcore-https-development.md)



**Applies to: \= aspnetcore-7.0**

## ASP.NET Core Docker images

For this tutorial, you download an ASP.NET Core sample app and run it in Docker containers. The sample works with both Linux and Windows containers.

The sample Dockerfile uses the [Docker multi-stage build feature](https://docs.docker.com/engine/userguide/eng-image/multistage-build/) to build and run in different containers. The build and run containers are created from images that are provided in Docker Hub by Microsoft:

* `dotnet/sdk`

  The sample uses this image for building the app. The image contains the .NET SDK, which includes the Command Line Tools (CLI). The image is optimized for local development, debugging, and unit testing. The tools installed for development and compilation make the image relatively large.

* `dotnet/aspnet`

   The sample uses this image for running the app. The image contains the ASP.NET Core runtime and libraries and is optimized for running apps in production. Designed for speed of deployment and app startup, the image is relatively small, so network performance from Docker Registry to Docker host is optimized. Only the binaries and content needed to run an app are copied to the container. The contents are ready to run, enabling the fastest time from `docker run` to app startup. Dynamic code compilation isn't needed in the Docker model.

## Prerequisites

* [.NET SDK 7.0](https://dotnet.microsoft.com/download)
* Docker client 18.03 or later

  * Linux distributions
    * [Debian](https://docs.docker.com/install/linux/docker-ce/debian/)
    * [Fedora](https://docs.docker.com/install/linux/docker-ce/fedora/)
    * [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
  * [macOS](https://docs.docker.com/desktop/mac/install/)
  * [Windows](https://docs.docker.com/desktop/windows/install/)

* [Git](https://git-scm.com/download)

## Download the sample app

* Download the sample by cloning the [.NET Docker repository](https://github.com/dotnet/dotnet-docker):

  ```console
  git clone https://github.com/dotnet/dotnet-docker
  ```

## Run the app locally

* Navigate to the project folder at *dotnet-docker/samples/aspnetapp/aspnetapp*.

* Run the following command to build and run the app locally:

  ```dotnetcli
  dotnet run
  ```

* Go to `http://localhost:5000` in a browser to test the app.

* Press Ctrl+C at the command prompt to stop the app.

## Run in a Linux container or Windows container

* To run in a Linux container, right-click the System Tray's Docker client icon and select [switch to Linux containers](https://docs.docker.com/desktop/windows/#switch-between-windows-and-linux-containers).
* To run in a Windows container, right-click the System Tray's Docker client icon and select [switch to Windows containers](https://docs.docker.com/desktop/windows/#switch-between-windows-and-linux-containers).

* Navigate to the Dockerfile folder at *dotnet-docker/samples/aspnetapp*.

* Run the following commands to build and run the sample in Docker:

  ```console
  docker build -t aspnetapp .
  docker run -it --rm -p 5000:80 --name aspnetcore_sample aspnetapp
  ```

  The `build` command arguments:
  * Name the image aspnetapp.
  * Look for the Dockerfile in the current folder (the period at the end).

  The run command arguments:
  * Allocate a pseudo-TTY and keep it open even if not attached. (Same effect as `--interactive --tty`.)
  * Automatically remove the container when it exits.
  * Map port 5000 on the local machine to port 80 in the container.
  * Name the container aspnetcore_sample.
  * Specify the aspnetapp image.

* Go to `http://localhost:5000` in a browser to test the app.

## Build and deploy manually

In some scenarios, you might want to deploy an app to a container by copying its assets that are needed at run time. This section shows how to deploy manually.

* Navigate to the project folder at *dotnet-docker/samples/aspnetapp/aspnetapp*.

* Run the [dotnet publish](https://learn.microsoft.com/dotnet/core/tools/dotnet-publish) command:

  ```dotnetcli
  dotnet publish -c Release -o published
  ```

  The command arguments:
  * Build the app in release mode (the default is debug mode).
  * Create the assets in the *published* folder.

* Run the app.

  * Windows:

    ```dotnetcli
    dotnet published\aspnetapp.dll
    ```

  * Linux:

    ```dotnetcli
    dotnet published/aspnetapp.dll
    ```

* Browse to `http://localhost:5000` to see the home page.

To use the manually published app within a Docker container, create a new *Dockerfile* and use the `docker build .` command to build an image.

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
WORKDIR /app
COPY published/ ./
ENTRYPOINT ["dotnet", "aspnetapp.dll"]
```

To see the new image use the `docker images` command.

### The Dockerfile

Here's the *Dockerfile* used by the `docker build` command you ran earlier.  It uses `dotnet publish` the same way you did in this section to build and deploy.  

```dockerfile
# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY *.sln .
COPY aspnetapp/*.csproj ./aspnetapp/
RUN dotnet restore

# copy everything else and build app
COPY aspnetapp/. ./aspnetapp/
WORKDIR /source/aspnetapp
RUN dotnet publish -c release -o /app --no-restore

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build /app ./
ENTRYPOINT ["dotnet", "aspnetapp.dll"]
```

In the preceding *Dockerfile*, the `*.csproj` files are copied and restored as distinct *layers*. When the `docker build` command builds an image, it uses a built-in cache. If the `*.csproj` files haven't changed since the `docker build` command last ran, the `dotnet restore` command doesn't need to run again. Instead, the built-in cache for the corresponding `dotnet restore` layer is reused. For more information, see [Best practices for writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#leverage-build-cache).

## Additional resources

* [Containerize a .NET app with dotnet publish](https://learn.microsoft.com/dotnet/core/docker/publish-as-container)
* [Docker build command](https://docs.docker.com/engine/reference/commandline/build)
* [Docker run command](https://docs.docker.com/engine/reference/commandline/run)
* [ASP.NET Core Docker sample](https://github.com/dotnet/dotnet-docker) (The one used in this tutorial.)
* [Configure ASP.NET Core to work with proxy servers and load balancers](../proxy-load-balancer.md)
* [Working with Visual Studio Docker Tools](https://learn.microsoft.com/visualstudio/containers/add-container-support)
* [Debugging with Visual Studio Code](https://code.visualstudio.com/docs/nodejs/debugging-recipes#_debug-nodejs-in-docker-containers)
* [GC using Docker and small containers](https://learn.microsoft.com/search/?terms=performance%2Fmemory%23gc-using-docker-and-small-containers)
* [System.IO.IOException: The configured user limit (128) on the number of inotify instances has been reached](https://learn.microsoft.com/search/?terms=host-and-deploy%2Fdocker%2Findex%23d128)
* [Updates to Docker images](https://andrewlock.net/exploring-the-dotnet-8-preview-updates-to-docker-images-in-dotnet-8/)

## Next steps

The Git repository that contains the sample app also includes documentation. For an overview of the resources available in the repository, see [the README file](https://github.com/dotnet/dotnet-docker/blob/main/samples/aspnetapp/README.md). In particular, learn how to implement HTTPS:

> 
> [Developing ASP.NET Core Applications with Docker over HTTPS](https://github.com/dotnet/dotnet-docker/blob/main/samples/run-aspnetcore-https-development.md)



**Applies to: < aspnetcore-7.0**

## ASP.NET Core Docker images

For this tutorial, you download an ASP.NET Core sample app and run it in Docker containers. The sample works with both Linux and Windows containers.

The sample Dockerfile uses the [Docker multi-stage build feature](https://docs.docker.com/engine/userguide/eng-image/multistage-build/) to build and run in different containers. The build and run containers are created from images that are provided in Docker Hub by Microsoft:


**Applies to: \>= aspnetcore-5.0 < aspnetcore-7.0**

* `dotnet/sdk`

  The sample uses this image for building the app. The image contains the .NET SDK, which includes the Command Line Tools (CLI). The image is optimized for local development, debugging, and unit testing. The tools installed for development and compilation make the image relatively large.



**Applies to: < aspnetcore-5.0**

* `dotnet/core/sdk`

  The sample uses this image for building the app. The image contains the .NET Core SDK, which includes the Command Line Tools (CLI). The image is optimized for local development, debugging, and unit testing. The tools installed for development and compilation make the image relatively large.



**Applies to: \>= aspnetcore-5.0 < aspnetcore-7.0**

* `dotnet/aspnet`

   The sample uses this image for running the app. The image contains the ASP.NET Core runtime and libraries and is optimized for running apps in production. Designed for speed of deployment and app startup, the image is relatively small, so network performance from Docker Registry to Docker host is optimized. Only the binaries and content needed to run an app are copied to the container. The contents are ready to run, enabling the fastest time from `docker run` to app startup. Dynamic code compilation isn't needed in the Docker model.
   


**Applies to: < aspnetcore-5.0**

* `dotnet/core/aspnet`

   The sample uses this image for running the app. The image contains the ASP.NET Core runtime and libraries and is optimized for running apps in production. Designed for speed of deployment and app startup, the image is relatively small, so network performance from Docker Registry to Docker host is optimized. Only the binaries and content needed to run an app are copied to the container. The contents are ready to run, enabling the fastest time from `docker run` to app startup. Dynamic code compilation isn't needed in the Docker model.
   


**Applies to: \>= aspnetcore-5.0 < aspnetcore-7.0**

## Prerequisites



**Applies to: \= aspnetcore-6.0**

* [.NET SDK 6.0](https://dotnet.microsoft.com/download)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

* [.NET SDK 5.0](https://dotnet.microsoft.com/download)



**Applies to: \>= aspnetcore-3.0 < aspnetcore-5.0**

* [.NET Core SDK 3.1](https://dotnet.microsoft.com/download)



**Applies to: < aspnetcore-3.0**

* [.NET Core 2.2 SDK](https://dotnet.microsoft.com/download/dotnet-core)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-7.0**

* Docker client 18.03 or later

  * Linux distributions
    * [Debian](https://docs.docker.com/install/linux/docker-ce/debian/)
    * [Fedora](https://docs.docker.com/install/linux/docker-ce/fedora/)
    * [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
  * [macOS](https://docs.docker.com/desktop/mac/install/)
  * [Windows](https://docs.docker.com/desktop/windows/install/)

* [Git](https://git-scm.com/download)

## Download the sample app

* Download the sample by cloning the [.NET Docker repository](https://github.com/dotnet/dotnet-docker): 

  ```console
  git clone https://github.com/dotnet/dotnet-docker
  ```

## Run the app locally

* Navigate to the project folder at *dotnet-docker/samples/aspnetapp/aspnetapp*.

* Run the following command to build and run the app locally:

  ```dotnetcli
  dotnet run
  ```

* Go to `http://localhost:5000` in a browser to test the app.

* Press Ctrl+C at the command prompt to stop the app.

## Run in a Linux container or Windows container

* To run in a Linux container, right-click the System Tray's Docker client icon and select [switch to Linux containers](https://docs.docker.com/desktop/windows/#switch-between-windows-and-linux-containers).
* To run in a Windows container, right-click the System Tray's Docker client icon and select [switch to Windows containers](https://docs.docker.com/desktop/windows/#switch-between-windows-and-linux-containers).

* Navigate to the Dockerfile folder at *dotnet-docker/samples/aspnetapp*.

* Run the following commands to build and run the sample in Docker:

  ```console
  docker build -t aspnetapp .
  docker run -it --rm -p 5000:80 --name aspnetcore_sample aspnetapp
  ```

  The `build` command arguments:
  * Name the image aspnetapp.
  * Look for the Dockerfile in the current folder (the period at the end).

  The run command arguments:
  * Allocate a pseudo-TTY and keep it open even if not attached. (Same effect as `--interactive --tty`.)
  * Automatically remove the container when it exits.
  * Map port 5000 on the local machine to port 80 in the container.
  * Name the container aspnetcore_sample.
  * Specify the aspnetapp image.

* Go to `http://localhost:5000` in a browser to test the app.

## Build and deploy manually

In some scenarios, you might want to deploy an app to a container by copying its assets that are needed at run time. This section shows how to deploy manually.

* Navigate to the project folder at *dotnet-docker/samples/aspnetapp/aspnetapp*.

* Run the [dotnet publish](https://learn.microsoft.com/dotnet/core/tools/dotnet-publish) command:

  ```dotnetcli
  dotnet publish -c Release -o published
  ```

  The command arguments:
  * Build the app in release mode (the default is debug mode).
  * Create the assets in the *published* folder.

* Run the app.

  * Windows:

    ```dotnetcli
    dotnet published\aspnetapp.dll
    ```

  * Linux:

    ```dotnetcli
    dotnet published/aspnetapp.dll
    ```

* Browse to `http://localhost:5000` to see the home page.

To use the manually published app within a Docker container, create a new *Dockerfile* and use the `docker build .` command to build an image.



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app
COPY published/ ./
ENTRYPOINT ["dotnet", "aspnetapp.dll"]
```

To see the new image use the `docker images` command.

### The Dockerfile

Here's the *Dockerfile* used by the `docker build` command you ran earlier.  It uses `dotnet publish` the same way you did in this section to build and deploy.  

```dockerfile
# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY *.sln .
COPY aspnetapp/*.csproj ./aspnetapp/
RUN dotnet restore

# copy everything else and build app
COPY aspnetapp/. ./aspnetapp/
WORKDIR /source/aspnetapp
RUN dotnet publish -c release -o /app --no-restore

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app ./
ENTRYPOINT ["dotnet", "aspnetapp.dll"]
```



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS runtime
WORKDIR /app
COPY published/ ./
ENTRYPOINT ["dotnet", "aspnetapp.dll"]
```

To see the new image use the `docker images` command.

### The Dockerfile

Here's the *Dockerfile* used by the `docker build` command you ran earlier.  It uses `dotnet publish` the same way you did in this section to build and deploy.  

```dockerfile
# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY *.sln .
COPY aspnetapp/*.csproj ./aspnetapp/
RUN dotnet restore

# copy everything else and build app
COPY aspnetapp/. ./aspnetapp/
WORKDIR /source/aspnetapp
RUN dotnet publish -c release -o /app --no-restore

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=build /app ./
ENTRYPOINT ["dotnet", "aspnetapp.dll"]
```



**Applies to: \>= aspnetcore-5.0 < aspnetcore-7.0**

In the preceding *Dockerfile*, the `*.csproj` files are copied and restored as distinct *layers*. When the `docker build` command builds an image, it uses a built-in cache. If the `*.csproj` files haven't changed since the `docker build` command last ran, the `dotnet restore` command doesn't need to run again. Instead, the built-in cache for the corresponding `dotnet restore` layer is reused. For more information, see [Best practices for writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#leverage-build-cache).



**Applies to: \>= aspnetcore-3.0 < aspnetcore-5.0**

```dockerfile
FROM mcr.microsoft.com/dotnet/core/aspnet:3.0 AS runtime
WORKDIR /app
COPY published/ ./
ENTRYPOINT ["dotnet", "aspnetapp.dll"]
```

### The Dockerfile

Here's the *Dockerfile* used by the `docker build` command you ran earlier.  It uses `dotnet publish` the same way you did in this section to build and deploy.  

```dockerfile
FROM mcr.microsoft.com/dotnet/core/sdk:3.0 AS build
WORKDIR /app

# copy csproj and restore as distinct layers
COPY *.sln .
COPY aspnetapp/*.csproj ./aspnetapp/
RUN dotnet restore

# copy everything else and build app
COPY aspnetapp/. ./aspnetapp/
WORKDIR /app/aspnetapp
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet:3.0 AS runtime
WORKDIR /app
COPY --from=build /app/aspnetapp/out ./
ENTRYPOINT ["dotnet", "aspnetapp.dll"]
```

As noted in the preceding Dockerfile, the `*.csproj` files are copied and restored as distinct *layers*. When the `docker build` command builds an image, it uses a built-in cache. If the `*.csproj` files haven't changed since the `docker build` command last ran, the `dotnet restore` command doesn't need to run again. Instead, the built-in cache for the corresponding `dotnet restore` layer is reused. For more information, see [Best practices for writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#leverage-build-cache).



**Applies to: < aspnetcore-3.0**

```dockerfile
FROM mcr.microsoft.com/dotnet/core/aspnet:2.2 AS runtime
WORKDIR /app
COPY published/ ./
ENTRYPOINT ["dotnet", "aspnetapp.dll"]
```

### The Dockerfile

Here's the *Dockerfile* used by the `docker build` command you ran earlier. It uses `dotnet publish` the same way you did in this section to build and deploy.  

```dockerfile
FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build
WORKDIR /app

# copy csproj and restore as distinct layers
COPY *.sln .
COPY aspnetapp/*.csproj ./aspnetapp/
RUN dotnet restore

# copy everything else and build app
COPY aspnetapp/. ./aspnetapp/
WORKDIR /app/aspnetapp
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet:2.2 AS runtime
WORKDIR /app
COPY --from=build /app/aspnetapp/out ./
ENTRYPOINT ["dotnet", "aspnetapp.dll"]
```



**Applies to: \>= aspnetcore-5.0 < aspnetcore-7.0**

In the preceding *Dockerfile*, the `*.csproj` files are copied and restored as distinct *layers*. When the `docker build` command builds an image, it uses a built-in cache. If the `*.csproj` files haven't changed since the `docker build` command last ran, the `dotnet restore` command doesn't need to run again. Instead, the built-in cache for the corresponding `dotnet restore` layer is reused. For more information, see [Best practices for writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#leverage-build-cache).

## Additional resources

* [Containerize a .NET app with dotnet publish](https://learn.microsoft.com/dotnet/core/docker/publish-as-container)
* [Docker build command](https://docs.docker.com/engine/reference/commandline/build)
* [Docker run command](https://docs.docker.com/engine/reference/commandline/run)
* [ASP.NET Core Docker sample](https://github.com/dotnet/dotnet-docker) (The one used in this tutorial.)
* [Configure ASP.NET Core to work with proxy servers and load balancers](../proxy-load-balancer.md)
* [Working with Visual Studio Docker Tools](https://learn.microsoft.com/visualstudio/containers/add-container-support)
* [Debugging with Visual Studio Code](https://code.visualstudio.com/docs/nodejs/debugging-recipes#_debug-nodejs-in-docker-containers)
* [GC using Docker and small containers](https://learn.microsoft.com/search/?terms=performance%2Fmemory%23gc-using-docker-and-small-containers)
* [System.IO.IOException: The configured user limit (128) on the number of inotify instances has been reached](https://learn.microsoft.com/search/?terms=host-and-deploy%2Fdocker%2Findex%23d128)

## Next steps

The Git repository that contains the sample app also includes documentation. For an overview of the resources available in the repository, see [the README file](https://github.com/dotnet/dotnet-docker/blob/main/samples/aspnetapp/README.md). In particular, learn how to implement HTTPS:

> 
> [Developing ASP.NET Core Applications with Docker over HTTPS](https://github.com/dotnet/dotnet-docker/blob/main/samples/run-aspnetcore-https-development.md)
