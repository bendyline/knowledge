---
title: Deploy a Worker Service to Azure
description: Deploy your .NET Worker Service to Azure with ease, learning from a step-by-step process to optimize your workflow, including Docker and Azure Container Registry.
ms.date: 12/13/2023
ms.topic: tutorial
zone_pivot_groups: development-environment-one
ms.custom: sfi-image-nochange
---

# Deploy a Worker Service to Azure

In this article, you'll learn how to deploy a .NET Worker Service to Azure. With your Worker running as an [Azure Container Instance (ACI)](https://learn.microsoft.com/azure/container-instances) from the [Azure Container Registry (ACR)](https://learn.microsoft.com/azure/container-registry), it can act as a microservice in the cloud. There are many use cases for long-running services, and the Worker Service exists for this reason.

In this tutorial, you learn how to:

> 
>
> - Create a worker service.
> - Create container registry resource.
> - Push an image to container registry.
> - Deploy as container instance.
> - Verify worker service functionality.


> **Tip:**
> All of the "Workers in .NET" example source code is available in the **Samples Browser** for download. For more information, see [Browse code samples: Workers in .NET](https://learn.microsoft.com/samples/dotnet/samples/csharp-workers-fundamentals).


## Prerequisites

- The [.NET 5.0 SDK or later](https://dotnet.microsoft.com/download/dotnet).
- Docker Desktop ([Windows](https://docs.docker.com/docker-for-windows/install) or [Mac](https://docs.docker.com/docker-for-mac/install)).
- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Depending on your developer environment of choice:
  - [Visual Studio or Visual Studio Code](https://visualstudio.microsoft.com).
  - [.NET CLI](../tools/index.md)
  - [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli).

<!-- ## Create a new project -->

## Create a new project

**Applies to: visualstudio**


To create a new Worker Service project with Visual Studio, select **File** > **New** > **Project...**. From the **Create a new project** dialog search for "Worker Service", and select Worker Service template. Enter the desired project name, select an appropriate location, and select **Next**. On the **Additional information** page, for the **Target Framework** select `.NET 5.0`, and check the **Enable Docker** option to enable docker support. Select the desired **Docker OS**.


**Applies to: vscode**


To create a new Worker Service project with Visual Studio Code, you can run .NET CLI commands from the integrated terminal. For more information, see [Visual Studio Code: Integrated Terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).

Open the integrated terminal, and run the `dotnet new` command, and replace the `<Project.Name>` with your desired project name.

```dotnetcli
dotnet new worker --name <Project.Name>
```

For more information on the .NET CLI new worker service project command, see [dotnet new worker](../tools/dotnet-new-sdk-templates.md#web-others).


**Applies to: cli**


To create a new Worker Service project with the .NET CLI, open your favorite terminal in a working directory. Run the `dotnet new` command, and replace the `<Project.Name>` with your desired project name.

```dotnetcli
dotnet new worker --name <Project.Name>
```

For more information on the .NET CLI new worker service project command, see [dotnet new worker](../tools/dotnet-new-sdk-templates.md#web-others).




Build the application to ensure it restores the dependent packages, and compiles without error.


**Applies to: visualstudio**


To build the application from Visual Studio, select <kbd>F6</kbd> or select the **Build** > **Build Solution** menu option.


**Applies to: vscode**


To build the application from Visual Studio Code, open the integrated terminal window and run the `dotnet build` command from the working directory.

```dotnetcli
dotnet build
```

For more information on the .NET CLI build command, see [`dotnet build`](../tools/dotnet-build.md).


**Applies to: cli**


To build the application from the .NET CLI, run the `dotnet build` command from the working directory.

```dotnetcli
dotnet build <path/to/project.csproj>
```

Specify your `<path/to/project.csproj>` value, which is the path to the project file to build. For more information on the .NET CLI build command, see [`dotnet build`](../tools/dotnet-build.md).




### Add Docker support

**Applies to: visualstudio**


If you correctly selected the **Enable Docker** checkbox when creating a new Worker project, skip to the [Build the Docker image](#build-the-docker-image) step.

If you didn't select this option, no worries—you can still add it now. In Visual Studio, right-click on the *project node* in the **Solution Explorer**, and select **Add** > **Docker Support**. You'll be prompted to select a **Target OS**; select **OK** with the default OS selection.

Docker File Options


**Applies to: vscode**


In Visual Studio Code, you need the [Docker extension](https://code.visualstudio.com/docs/containers/overview) and the [Azure Account extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azure-account) installed. Open the Command Palette, and select the **Docker: Add Docker files to workspace** option. If prompted to **Select Application Platform**, choose **.NET: Core Console**. If prompted to **Select Project**, choose the Worker Service project you created. When prompted to **Select Operating System**, choose the first listed OS. When prompted whether or not to **Include optional Docker Compose files**, select **No**.



Docker support requires a *Dockerfile*. This file is a set of comprehensive instructions, for building your .NET Worker Service as a Docker image. The *Dockerfile* is a file *without* a file extension. The following code is an example *Dockerfile*, and should exist at the root directory of the project file.

**Applies to: cli**


With the CLI, the *Dockerfile* is **not** created for you. Copy its contents into a new file named *Dockerfile* in the root directory of the project.



[Code reference unavailable in this source snapshot: snippets/workers/cloud-service/Dockerfile](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/core/extensions/cloud-service.md)

**Applies to: cli**


> **Note:**
> You need to update the various lines in the *Dockerfile* that reference *App.CloudService—replace this with the name of your project.

For more information on the official .NET images, see [Docker Hub: .NET Runtime](https://hub.docker.com/_/microsoft-dotnet-runtime) and [Docker Hub: .NET SDK](https://hub.docker.com/_/microsoft-dotnet-sdk).



### Build the Docker image

To build the Docker image, the Docker Engine must be running.

**Applies to: visualstudio**



> **Important:**
> When using Docker Desktop and Visual Studio, to avoid errors related to _volume sharing_, ensure that volume sharing is enabled.
>
> 1. On the **Settings** screen in Docker Desktop, select **Shared Drives**.
> 2. Select the drives containing your project files.
>
> For more information, see [Troubleshoot Visual Studio development with Docker](https://learn.microsoft.com/visualstudio/containers/troubleshooting-docker-errors#volume-sharing-is-not-enabled-enable-volume-sharing-in-the-docker-ce-for-windows-settings--linux-containers-only).


Right-click on the *Dockerfile* in the **Solution Explorer**, and select **Build Docker Image**. The **Output** window displays, reporting the `docker build` command progress.


**Applies to: vscode**


Right-click on the *Dockerfile* in the **Explorer**, and select **Build Image**. When prompted to **Tag image as**, enter `appcloudservice:latest`. The **Docker Task** output terminal displays, reporting the Docker build command progress.

> **Note:**
> If you're _not_ prompted to tag the image, it's possible that Visual Studio Code is relying on an existing *tasks.json*. If the tag used is undesirable, you can change it by updating the `docker-build` configuration item's `dockerBuild/tag` value in the `tasks` array. Consider the following example configuration section:
>
> ```json
> {
>   "type": "docker-build",
>   "label": "docker-build: release",
>   "dependsOn": [
>     "build"
>   ],
>   "dockerBuild": {
>     "tag": "appcloudservice:latest",
>     "dockerfile": "${workspaceFolder}/cloud-service/Dockerfile",
>     "context": "${workspaceFolder}",
>     "pull": true
>   },
>   "netCore": {
>     "appProject": "${workspaceFolder}/cloud-service/App.CloudService.csproj"
>   }
> }
> ```


**Applies to: cli**


Open a terminal window in the root directory of the *Dockerfile*, and run the following docker command:

```console
docker build -t appcloudservice:latest -f Dockerfile .
```



As the `docker build` command runs, it processes each line in the *Dockerfile* as an instruction step. This command builds the image and creates a local repository named **appcloudservice** that points to the image.

> **Tip:**
> The generated _Dockerfile_ differs between development environments. For example, if you [Add Docker support](#add-docker-support) from Visual Studio you may experience issues if you attempt to [Build the Docker image](#build-the-docker-image) from Visual Studio Code&mdash;as the _Dockerfile_ steps vary. It is best to choose a single _development environment_ and use it throughout this tutorial.

## Create container registry

**Applies to: visualstudio,vscode**


An Azure Container Registry (ACR) resource allows you to build, store, and manage container images and artifacts in a private registry. To create a container registry, you need to [create a new resource](https://ms.portal.azure.com/#create/Microsoft.ContainerRegistry) in the Azure portal.

1. Select the **Subscription**, and corresponding **Resource group** (or create a new one).
1. Enter a **Registry name**.
1. Select a **Location**.
1. Select an appropriate **SKU**, for example **Basic**.
1. Select **Review + create**.
1. After seeing **Validation passed**, select **Create**.

> **Important:**
> In order to use this container registry when creating a container instance, you must enable **Admin user**. Select **Access keys**, and enable **Admin user**.


**Applies to: cli**


An Azure Container Registry (ACR) resource allows you to build, store, and manage container images and artifacts in a private registry. Open a terminal window in the root directory of the *Dockerfile*, and run the following Azure CLI command:

> **Important:**
> To interact with Azure resources from the Azure CLI, you must be authenticated for your terminal session. To authenticate, use the [`az login`](https://learn.microsoft.com/cli/azure/authenticate-azure-cli) command:
>
> ```azurecli
> az login
> ```
>
> After you're logged in, use the [`az account set`](https://learn.microsoft.com/cli/azure/account#az_account_set) command to specify your subscription when you have more than one and no default subscription set.
>
> ```azurecli
> az account set --subscription <subscription name or id>
> ```

Once you sign in to the Azure CLI, your session can interact with resources accordingly.

If you don't already have a resource group you'd like to associate your worker service with, create one using the [`az group create`](https://learn.microsoft.com/cli/azure/group#az_group_create) command:

```azurecli
az group create -n <resource group> -l <location>
```

Provide the `<resource group>` name, and the `<location>`. To create a container registry, call the [`az acr create`](https://learn.microsoft.com/cli/azure/acr#az_acr_create) command.

```azurecli
az acr create -n <registry name> -g <resource group> --sku <sku> --admin-enabled true
```

Replace placeholders with your own appropriate values:

- `<registry name>`: the name of the registry.
- `<resource group>`: the resource group name that you used.
- `<sku>`: accepted values, **Basic**, **Classic**, **Premium**, or **Standard**.

The preceding command:

- Creates an Azure Container Registry, given a registry name, in the specified resource group.
- Enabled an Admin user—this is required for Azure Container Instances.



For more information, see [Quickstart: Create an Azure container registry](https://learn.microsoft.com/azure/container-registry/container-registry-get-started-portal).

## Push image to container registry

With the .NET Docker image built, and the container registry resource created, you can now push the image to container registry.

**Applies to: visualstudio**


Right-click on the project in the **Solution Explorer**, and select **Publish**. The **Publish** dialog displays. For the **Target**, select **Azure** and then **Next**.

Visual Studio: Publish dialog - select Azure

For the **Specific Target**, select **Azure Container Registry** and then **Next**.

Visual Studio: Publish dialog - select container registry

Next, for the **Container Registry**, select the **Subscription name** that you used to create the ACR resource. From the **Container registries** selection area, select the container registry that you created, and then select **Finish**.

Visual Studio: Publish dialog - select container registry details

This creates a publish profile, which can be used to publish the image to container registry. Select the **Publish** button to push the image to the container registry, the **Output** window reports the publish progress—and when it completes successfully, you'll see a "Successfully published" message.


**Applies to: vscode**


Select **Docker** from the **Activity Bar** in Visual Studio Code. Expand the **IMAGES** tree view panel, then expand the `appcloudservice` image node and right-click on the `latest` tag.

Visual Studio Code: Docker - push image

The integrated terminal window reports the progress of the `docker push` command to the container registry.


**Applies to: cli**


To push an image to the container registry, you need to sign in to the registry first:

```azurecli
az acr login -n <registry name>
```

The [`az acr login`](https://learn.microsoft.com/cli/azure/acr#az_acr_login) command signs into a container registry through the Docker CLI. To push the image to the container registry, use the [az acr build](https://learn.microsoft.com/cli/azure/acr#az_acr_build) command with your container registry name as the `<registry name>`:

```azurecli
az acr build -r <registry name> -t appcloudservice .
```

The preceding command:

- Packs the source into a *tar* file.
- Uploads it to the container registry.
- The container registry unpacks the *tar* file.
- Runs the `docker build` command in the container registry resource against the *Dockerfile*.
- Adds the image to the container registry.



To verify that the image was successfully pushed to the container registry, navigate to the Azure portal. Open the container registry resource, under **Services**, select **Repositories**. You should see the image.

## Deploy as container instance

**Applies to: vscode**


From Visual Studio Code, select **Docker** from the **Activity Bar**. Expand the **REGISTRIES** node, and select **Connect Registry**. Select **Azure** when prompted, and sign in if necessary.

> **Important:**
> Deploying as a container instance from Visual Studio Code no longer works on Mac. For more information, see [GitHub: About Docker Extension for Visual Studio Code](https://github.com/microsoft/vscode-docker/issues/3655).

Visual Studio Code - Docker: Connect registry

Expand the **REGISTRIES** node, select **Azure**, your subscription > the container registry > the image, and then right-click the tag. Select **Deploy Image to Azure Container Instances**.

Visual Studio Code - Docker: Deploy image to Azure Container Instances


**Applies to: cli**


To create a container instance, first create a container group using the [`az container create`](https://learn.microsoft.com/cli/azure/container#az_container_create) command.

```azurecli
az container create -g <resource group> \
  --name <instance name> \
  --image <registry name>.azurecr.io/<image name>:latest \
  --registry-password <password>
```

Provide the appropriate values:

- `<resource group>`: the resource group name that you've been using in this tutorial.
- `<instance name>`: the name of the container instance.
- `<registry name>`: the name of the container registry.
- `<image name>`: the name of the image.
- `<password>`: the password to the container registry—you can get this from the Azure portal, Container Registry resource > **Access Keys**.


**Applies to: visualstudio**


To create a container instance, you also need to [create a new resource](https://ms.portal.azure.com/#create/Microsoft.ContainerInstances) in the Azure portal.

1. Select the same **Subscription**, and corresponding **Resource group** from the previous section.
1. Enter a **Container name**&mdash;`appcloudservice-container`.
1. Select a **Region** that corresponds to the previous **Location** selection.
1. For **Image source**, select **Azure Container Registry**.
1. Select the **Registry** by the name provided in the previous step.
1. Select the **Image** and **Image tag**.
1. Select **Review + create**.
1. Assuming **Validation passed**, select **Create**.

It may take a moment for the resources to be created, once created select the **Go to resource** button.

For more information, see [Quickstart: Create an Azure container instance](https://learn.microsoft.com/azure/container-instances/container-instances-quickstart-portal).



## Verify service functionality

Immediately after the container instance is created, it starts running.

**Applies to: visualstudio,vscode**




To verify your worker service is functioning correctly, navigate to the Azure portal in the container instance resource, select the **Containers** option.

Azure portal: Container instance running

You'll see the containers and their current **State**. In this case, it is **Running**. Select **Logs** to see the .NET worker service output.

**Applies to: cli**


To verify your worker service is functioning correctly, you can view the logs from your running application. Use the [`az container logs`](https://learn.microsoft.com/cli/azure/container#az_container_logs) command:

```azurecli
az container logs -g <resource group> --name <instance name>
```

Provide the appropriate values:

- `<resource group>`: the resource group name that you've been using in this tutorial.
- `<instance name>`: the name of the container instance.

You'll see the .NET worker service output logs, which means you've successfully deployed your containerized app to ACI.



## See also

- [Worker Services in .NET](workers.md)
- [Use scoped services within a `BackgroundService`](scoped-service.md)
- [Create a Windows Service using `BackgroundService`](windows-service.md)
- [Implement the `IHostedService` interface](timer-service.md)
- [Tutorial: Containerize a .NET Core app](../docker/build-container.md)
