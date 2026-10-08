---
title: Get started with Docker for remote development with containers
description: A complete guide to get started with Docker Desktop on Windows or WSL. Including support offered by Microsoft and variety of Azure services.
ms.topic: get-started
keywords: Microsoft, Windows, Docker, WSL, Remote development, Containers, Docker Desktop, Windows vs WSL
ms.date: 04/15/2026
---

# Overview of Docker remote development on Windows

Using containers for remote development and deploying applications with the Docker platform is a very popular solution with many benefits. Learn more about the variety of support offered by Microsoft tools and services, including Windows Subsystem for Linux (WSL), Visual Studio, Visual Studio Code, .NET, and a broad variety of Azure services.

## Docker on Windows 



[Docker Docs Icon](https://docs.docker.com/docker-for-windows/install/)<br>
**[Install Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/install/)**<br>
Find installation steps, system requirements, what's included in the installer, how to uninstall, differences between stable and edge versions, and how to switch between Windows and Linux containers.


[Docker running screenshot](https://docs.docker.com/get-started/)<br>
**[Get started with Docker](https://docs.docker.com/get-started/)**<br>
Docker orientation and setup docs with step-by-step instructions on how to get started, including a video walk-through.


[Microsoft Learn Docker course screenshot](https://learn.microsoft.com/training/modules/intro-to-docker-containers/)<br>
**[MS Learn course: Introduction to Docker containers](https://learn.microsoft.com/training/modules/intro-to-docker-containers/)**<br>
Microsoft Learn offers a free intro course on Docker containers, in addition to a [variety of courses](https://learn.microsoft.com/training/browse/?terms=docker) on get started with Docker and connecting with Azure services.


[Docker Desktop WSL2 menu screenshot](https://learn.microsoft.com/windows/wsl/tutorials/wsl-containers)<br>
**[Get started with Docker remote containers on WSL 2](https://learn.microsoft.com/windows/wsl/tutorials/wsl-containers)**<br>
Learn how to set up Docker Desktop for Windows to use with a Linux command line (Ubuntu, Debian, SUSE, etc) using WSL 2 (Windows Subsystem for Linux, version 2).



## VS Code and Docker



[VS Code remote container graphic](https://code.visualstudio.com/docs/devcontainers/tutorial)<br>
**[Dev Containers tutorial](https://code.visualstudio.com/docs/devcontainers/tutorial)**<br>
Set up a full-featured dev environment inside a container with the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers). Find tutorials to set up a [Node.js container](https://code.visualstudio.com/docs/containers/quickstart-node), a [Python container](https://code.visualstudio.com/docs/containers/quickstart-python), or an [ASP.NET Core container](https://code.visualstudio.com/docs/containers/quickstart-aspnet-core).


[VSCode attach Docker screenshot](https://code.visualstudio.com/docs/devcontainers/attach-container)<br>
**[Attach VS Code to a Docker container](https://code.visualstudio.com/docs/devcontainers/attach-container)**<br>
Learn how to attach Visual Studio Code to a Docker container that is already running or to a [container in a Kubernetes cluster](https://code.visualstudio.com/docs/devcontainers/attach-container#_attach-to-a-container-in-a-kubernetes-cluster).


[VSCode container menu screenshot](https://code.visualstudio.com/docs/devcontainers/containers)<br>
**[Dev Containers documentation](https://code.visualstudio.com/docs/devcontainers/containers)**<br>
The full Dev Containers reference from the VS Code team, covering advanced configuration, environment variables, port forwarding, and more.


[VSCode Docker Desktop with WSL screenshot](dev-containers.md)<br>
**[Set up Dev Containers on Windows](dev-containers.md)**<br>
Windows-specific setup guide covering WSL 2 and Docker Desktop configuration, and the file system placement requirement for good container performance.



## Visual Studio and Docker



[Visual Studio icon](https://learn.microsoft.com/visualstudio/containers/overview#docker-support-in-visual-studio-1)<br>
**[Docker support in Visual Studio](https://learn.microsoft.com/visualstudio/containers/overview#docker-support-in-visual-studio-1)**<br>
Learn about the Docker support available for ASP.NET projects, ASP.NET Core projects, and .NET Core and .NET Framework console projects in Visual Studio, in addition to support for container orchestration.


[Visual Studio Docker menu](https://learn.microsoft.com/visualstudio/containers/container-tools)<br>
**[Quickstart: Docker in Visual Studio](https://learn.microsoft.com/visualstudio/containers/container-tools)**<br>
Learn how to build, debug, and run containerized .NET, ASP.NET, and ASP.NET Core apps and publish them to Azure Container Registry (ACR), Docker Hub, Azure App Service, or your own container registry with Visual Studio.


[VS tutorial screenshot](https://learn.microsoft.com/visualstudio/containers/tutorial-multicontainer)<br>
**[Tutorial: Create a multi-container app with Docker Compose](https://learn.microsoft.com/visualstudio/containers/tutorial-multicontainer)**<br>
Learn how to manage more than one container and communicate between them when using Container Tools in Visual Studio. You can also find links to tutorials like how to [Use Docker with a React Single-page App](https://learn.microsoft.com/visualstudio/containers/container-tools-react).


[VS Container links](https://learn.microsoft.com/visualstudio/containers)<br>
**[Container Tools in Visual Studio](https://learn.microsoft.com/visualstudio/containers)**<br>
Find topics covering how to run build tools in a container, [debugging Docker apps](https://learn.microsoft.com/visualstudio/containers/edit-and-refresh), troubleshoot development tools, deploy Docker containers, and bridge Kubernetes with Visual Studio.



Basic Docker taxonomy infographic for containers, images, and registries

## .NET and Docker



[.NET microservice guide cover](https://learn.microsoft.com/dotnet/architecture/microservices/)<br>
**[.NET Guide: Microservice apps and containers](https://learn.microsoft.com/dotnet/architecture/microservices/)**<br>
Intro guide to microservices-based apps managed with containers.


[Docker Infographic](https://learn.microsoft.com/dotnet/architecture/microservices/container-docker-introduction/docker-defined)<br>
**[What is Docker?](https://learn.microsoft.com/dotnet/architecture/microservices/container-docker-introduction/docker-defined)**<br>
Basic explanation of Docker containers, including [Comparing Docker containers with Virtual machines](https://learn.microsoft.com/dotnet/architecture/microservices/container-docker-introduction/docker-defined#comparing-docker-containers-with-virtual-machines) and a basic [taxonomy of Docker terms and concepts](https://learn.microsoft.com/dotnet/architecture/microservices/container-docker-introduction/docker-containers-images-registries) explaining the difference between containers, images, and registries.


[Docker Taxonomy infographic](https://learn.microsoft.com/dotnet/core/docker/build-container?tabs=windows)<br>
**[Tutorial: Containerize a .NET app](https://learn.microsoft.com/dotnet/core/docker/build-container?tabs=windows)**<br>
Learn how to containerize a .NET application with Docker, including creation of a Dockerfile, essential commands, and cleaning up resources.


[Inner-loop dev workflow with Docker infographic](https://learn.microsoft.com/dotnet/architecture/microservices/docker-application-development-process/docker-app-development-workflow)<br>
**[Development workflow for Docker apps](https://learn.microsoft.com/dotnet/architecture/microservices/docker-application-development-process/docker-app-development-workflow)**<br>
Describes the inner-loop development workflow for Docker container-based applications.



## Azure Container Services



[Azure container instances screenshot](https://learn.microsoft.com/azure/container-instances/)<br>
**[Azure Container Instances](https://learn.microsoft.com/azure/container-instances/)**<br>
Learn how to run Docker containers on-demand in a managed, serverless Azure environment, includes ways to deploy with Docker CLI, ARM, Azure Portal, create multi-container groups, share data between containers, connect to a virtual network, and more.


[Azure Container Registry screenshot](https://learn.microsoft.com/azure/container-registry)<br>
**[Azure Container Registry](https://learn.microsoft.com/azure/container-registry)**<br>
Learn how to build, store, and manage container images and artifacts in a private registry for all types of container deployments. Create Azure container registries for your existing container development and deployment pipelines, set up automation tasks, and learn how to manage your registries, including geo-replication and best practices.


[Azure Service Fabric screenshot](https://learn.microsoft.com/azure/service-fabric)<br>
**[Azure Service Fabric](https://learn.microsoft.com/azure/service-fabric)**<br>
Learn about Azure Service Fabric, a distributed systems platform for packaging, deploying, and managing scalable and reliable microservices and containers.


[Azure App Service screenshot](https://learn.microsoft.com/azure/app-service)<br>
**[Azure App Service](https://learn.microsoft.com/azure/app-service)**<br>
Learn how to build and host web apps, mobile back ends, and RESTful APIs in the programming language of your choice without managing infrastructure. Try the [Azure App Service](https://learn.microsoft.com/training/modules/deploy-run-container-app-service) Learn module to deploy a web app based on a Docker image and configure continuous deployment.



Learn about more [Azure services that support containers](https://azure.microsoft.com/overview/containers/).

## Docker Containers Explainer Video

> [!VIDEO https://www.youtube.com/embed/0oEsMwSxBsk]

## Kubernetes and Container Orchestration Explainer Video

> [!VIDEO https://www.youtube.com/embed/3RTvoI-A7UQ]

## Containers on Windows



[Windows server containers icon](https://learn.microsoft.com/virtualization/windowscontainers)<br>
**[Containers on Windows docs](https://learn.microsoft.com/virtualization/windowscontainers)**<br>
Package apps with their dependencies and leverage operating system-level virtualization for fast, fully isolated environments on a single system. Learn [about Windows containers](https://learn.microsoft.com/virtualization/windowscontainers/about), including quick starts, deployment guides, and samples.


[FAQ icon](https://learn.microsoft.com/virtualization/windowscontainers/about/faq)<br>
**[FAQs about Windows containers](https://learn.microsoft.com/virtualization/windowscontainers/about/faq)**<br>
Find frequently asked questions about containers. Also see this explanation in StackOverflow on "[What's the difference between Docker for Windows and Docker on Windows?](https://stackoverflow.com/questions/38464724/whats-the-difference-between-docker-for-windows-and-docker-on-windows/40320748)"


[windows container icon](https://learn.microsoft.com/virtualization/windowscontainers/quick-start/set-up-environment?tabs=Windows-10-Client)<br>
**[Set up your environment](https://learn.microsoft.com/virtualization/windowscontainers/quick-start/set-up-environment?tabs=Windows-10-Client)**<br>
Learn how to set up Windows 11, Windows 10, or Windows Server to create, run, and deploy containers, including prerequisites, installing Docker, and working with [Windows Container Base Images](https://learn.microsoft.com/virtualization/windowscontainers/manage-containers/container-base-images).


[AKS icon](https://learn.microsoft.com/azure/aks/windows-container-cli)<br>
**[Create a Windows Server container on an Azure Kubernetes Service (AKS)](https://learn.microsoft.com/azure/aks/windows-container-cli)**<br>
Learn how to deploy an ASP.NET sample app in a Windows Server container to an AKS cluster using the Azure CLI.
