---
title: 'Quickstart: Run a Custom Container on App Service'
description: Learn how to run custom containers by using Azure App Service.
author: msangapu-msft
ms.author: msangapu
ms.date: 04/20/2026
ms.topic: quickstart
ms.custom: devx-track-csharp, mode-other, devdivchpfy22, linux-related-content
zone_pivot_groups: app-service-containers-windows-linux-portal-ps-cli
#customer intent: As an app developer who uses Azure App Service, I want to use a container to deploy and manage an app.
ms.service: azure-app-service
---

# Quickstart: Run a custom container in Azure

**Applies to: container-windows-vs**


In this quickstart, you learn how to deploy an ASP.NET app in a Windows image to [Azure Container Registry](https://learn.microsoft.com/azure/container-registry/container-registry-intro) from Visual Studio. You run the app in a custom container in Azure App Service.

[Azure App Service](overview.md) provides predefined application stacks on Windows that run on Internet Information Services (IIS). These preconfigured application stacks [lock down the operating system and prevent low-level access](operating-system-functionality.md).

Custom Windows containers don't have these restrictions. Developers can use custom containers to give containerized applications full access to Windows functionality.

## Prerequisites

- [Install Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/install/).
- [Switch Docker to run Windows containers](https://learn.microsoft.com/virtualization/windowscontainers/quick-start/quick-start-windows-10).
- [Install Visual Studio 2022](https://www.visualstudio.com/downloads/) with the **ASP.NET and web development** and **Azure development** workloads. In **Visual Studio 2022 Community**, ensure that you select the **.NET Framework project and item templates** component with **ASP.NET and web development workload**.

If you already installed Visual Studio 2022:

- Install the latest updates in Visual Studio by selecting **Help** > **Check for Updates**.
- Add the workloads in Visual Studio by selecting **Tools** > **Get Tools and Features**.

## Create an ASP.NET web app

1. Open Visual Studio and then select **Create a new project**.

1. In **Create a new project**, select **ASP.NET Web Application (.NET Framework)** for `C#`, and then select **Next**.

   Screenshot that shows the Create a new project dialog.

1. In **Configure your new project** > **Project name**, name the application `myfirstazurewebapp`. Under **Framework**, select **.NET Framework 4.8**, and then select **Create**.

   Screenshot that shows Configure your web app project.

1. You can deploy any type of ASP.NET web app to Azure. For this quickstart, select the **MVC** template.

1. Under **Authentication**, select **None**. Under **Advanced**, select **Container support** and clear **Configure for HTTPS**. Select **Create**.

   Screenshot that shows the create ASP.NET Web Application dialog.

1. If the Dockerfile doesn't automatically open, open it by selecting **Solution Explorer**.

1. You need a [supported parent image](configure-custom-container.md#supported-parent-images). Change the parent image by replacing the `FROM` line with the following code, and then save the file:

   ```dockerfile
   FROM mcr.microsoft.com/dotnet/framework/aspnet:4.8-windowsservercore-ltsc2019
   ```

1. From the Visual Studio menu, select **Debug** > **Start Without Debugging** to run the web app locally.

   Screenshot that shows the app running locally.

## Publish to Azure Container Registry

1. In **Solution Explorer**, right-click the `myfirstazurewebapp` project, and then select **Publish**.

1. In **Target**, select **Docker Container Registry**, and then select **Next**.

   Screenshot that shows the Select Docker Container Registry screen.

1. In **Specific Target**, select **Azure Container Registry**, and then select **Next**.

   Screenshot that shows the Publish from project overview pane.

1. In **Publish**, select the correct subscription. To create a new container registry, select **Create new** in **Container registries**.

   Screenshot that shows the Create new Azure Container Registry screen.

1. In **Create new**, select the correct subscription. Under **Resource group**, select **New** and type `myResourceGroup` for the name. Then, select **OK**. Under **SKU**, select **Basic**. Under **Registry location**, select a location for the registry, and then select **Create**.

   Screenshot that shows Azure Container Registry details.

1. In **Publish**, under **Container Registry**, select the registry that you created, and then select **Finish**.

   Screenshot that shows the Select existing Azure Container Registry screen.

   Wait for deployment to finish. The **Publish** pane now shows the repository name. Select the **Copy** button to copy the **Repository** name for later.

   Screenshot that highlights the repository name.

## Create a Windows custom container

1. Sign in to the [Azure portal](https://portal.azure.com).

1. Select **Create a resource** in the upper-left corner of the Azure portal.

1. Under **Popular services**, select **Create** under **Web App**.

1. In **Create Web App**, select your subscription and resource group. You can create a new resource group if needed.

1. Provide an app name, such as `win-container-demo`. For **Publish**, select **Container**. For **Operating System**, select **Windows**.

   Screenshot that shows how to create a web app for containers.

1. Select **Next: Database** > **Next: Container**.

1. For **Image Source**, select **Other container registries**. For **Image and tag**, enter the repository name that you previously copied in [Publish to Azure Container Registry](#publish-to-azure-container-registry).

   Screenshot that shows how to configure your web app for containers.

    If you have a custom image for your web app in another location, like in [Azure Container Registry](https://learn.microsoft.com/azure/container-registry/) or any other private repository, you can configure it here. Select **Review + Create**.

1. Verify all the details, and then select **Create**.

   Screenshot that shows how to create your web app for containers.

   Wait for Azure to create the required resources.

## Browse to the custom container

When the operation finishes, the Azure portal displays a notification.

Screenshot that shows deployment succeeded.

1. Select **Go to resource**.

1. In the overview, follow the link next to **Default domain**.

A new browser page opens.

Screenshot that shows a Windows custom container starting.

Wait a few minutes and try again. Keep trying until you get the default ASP.NET home page.

Screenshot that shows a Windows custom container running.

## See container start-up logs

It can take some time for the Windows container to load. To see the progress, go to the following URL by replacing `\<app_name>` with the name of your app.

```http
https://<app_name>.scm.azurewebsites.net/api/logstream
```

The streamed logs look like this:

```output
2018-07-27T12:03:11  Welcome, you are now connected to log-streaming service.
27/07/2018 12:04:10.978 INFO - Site: win-container-demo - Start container succeeded. Container: facbf6cb214de86e58557a6d073396f640bbe2fdec88f8368695c8d1331fc94b
27/07/2018 12:04:16.767 INFO - Site: win-container-demo - Container start complete
27/07/2018 12:05:05.017 INFO - Site: win-container-demo - Container start complete
27/07/2018 12:05:05.020 INFO - Site: win-container-demo - Container started successfully
```

## Update locally and redeploy

1. In Visual Studio, go to **Solution Explorer**. Select **Views** > **Home** > **Index.cshtml**.

1. Find the `<div class="jumbotron">` HTML tag near the top, and replace the entire element with the following code:

   ```html
   <div class="jumbotron">
       <h1>ASP.NET in Azure!</h1>
       <p class="lead">This is a simple app that we've built that demonstrates how to deploy a .NET app to Azure App Service.</p>
   </div>
   ```

1. To redeploy to Azure, right-click the **myfirstazurewebapp** project in **Solution Explorer**, and then select **Publish**.

1. On the publish pane, select **Publish** and wait for publishing to finish.

1. To tell App Service to pull in the new image from Docker Hub, restart the app. In the app pane in the Azure portal, select **Restart** > **Yes**.

   Screenshot that shows App Service Overview with the Restart button highlighted.

1. Browse again [to the custom container](#browse-to-the-custom-container). As you refresh the page, the app should first revert to the *Starting up* page. It should then display the updated page.

   Screenshot that shows the updated web app in Azure.

## Clean up resources


In the preceding steps, you created Azure resources in a resource group. If you don't expect to need these resources in the future, you can delete them by deleting the resource group:

1. From the Azure portal menu or home page, select **Resource groups** > **myResourceGroup**.

1. On the **myResourceGroup** pane, make sure that the listed resources are the ones you want to delete.

1. Select **Delete resource group**. Type **myResourceGroup** in the text box to confirm, and then select **Delete**.


## Related content

- [Configure custom container](configure-custom-container.md)
- [Use managed identities for App Service and Azure Functions](overview-managed-identity.md)
- [Azure Monitor overview](https://learn.microsoft.com/azure/azure-monitor/fundamentals/overview)
- [Monitor Azure App Service](monitor-app-service.md)
- [Secure with a custom domain and certificate](tutorial-secure-domain-certificate.md)
- [Integrate your app with an Azure virtual network](overview-vnet-integration.md)
- [Use private endpoints for App Service apps](overview-private-endpoint.md)
- [Use Azure Container Registry with Azure Private Link](https://learn.microsoft.com/azure/container-registry/container-registry-private-link)
- [Migrate to a Windows container in Azure](tutorial-custom-container.md)
- [Deploy a container with Azure Pipelines](deploy-container-azure-pipelines.md)
- [Deploy a container with GitHub Actions](deploy-container-github-action.md)



**Applies to: container-linux-vscode**


In this quickstart, you learn how to deploy an image from [Azure Container Registry](https://learn.microsoft.com/azure/container-registry/) to Azure App Service.

[App Service](overview.md) on Linux provides predefined application stacks on Linux with support for languages like .NET, Java, Node.js, and PHP. You can also use a custom Docker image to run your web app on an application stack that isn't already defined in Azure.

For more information about containerized applications in a serverless environment, see [Container apps](../container-apps/overview.md).

## Prerequisites

- An [Azure account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Docker](https://www.docker.com/community-edition).
- [Visual Studio Code](https://code.visualstudio.com/).
- The [Azure App Service extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice). You can use this extension to create, manage, and deploy Linux web apps with Azure platform as a service (PaaS).
- The [Docker extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker). You can use this extension to simplify the management of local Docker images and commands and to deploy built app images to Azure.

## Create a container registry

This quickstart uses Azure Container Registry as the registry. You can use other registries, but the steps might differ slightly.

Create a container registry by following the instructions in [Quickstart: Create a private container registry by using the Azure portal](https://learn.microsoft.com/azure/container-registry/container-registry-get-started-portal).

> **Important:**
> Be sure to set the **Admin User** option to **Enable** when you create the container registry. You can also set it from the **Access keys** section of your registry pane in the Azure portal. You need this setting to access App Service. For a managed identity, see [Deploy from Azure Container Registry](tutorial-custom-container.md?pivots=container-linux#configure-the-web-app).

## Sign in

1. Open Visual Studio Code.

1. Select the **Azure** logo on the [activity bar](https://code.visualstudio.com/docs/getstarted/userinterface), and then go to **ACCOUNTS & TENANTS**. Select **Sign in to Azure** and follow the instructions.

   Screenshot that shows how to sign in to Azure in VS Code.

1. In the [status bar](https://code.visualstudio.com/docs/getstarted/userinterface) at the bottom, verify that your Azure account email address is correct. Your subscription should be displayed in the **APP SERVICE** explorer.

1. In the activity bar, select the **Docker** logo. In the **REGISTRIES** explorer, verify that the container registry you created appears.

   Screenshot that shows the Registries value with Azure expanded.

## Check prerequisites

Verify that Docker is installed and running. If Docker is running, the following command displays the Docker version:

```bash
docker --version
```

## Create and build image

1. In VS Code, open an empty folder and add a file called `Dockerfile`. In the file, copy and paste the following content based on your desired language framework:

   # [.NET](#tab/dotnet)

   In this Dockerfile, the parent image is one of the built-in .NET containers of App Service.

   <!-- https://mcr.microsoft.com/v2/appsvc%2Fdotnetcore/tags/list -->
   ```dockerfile
   FROM mcr.microsoft.com/appsvc/dotnetcore:lts

   ENV PORT 8080
   EXPOSE 8080

   ENV ASPNETCORE_URLS "http://*:${PORT}"

   ENTRYPOINT ["dotnet", "/defaulthome/hostingstart/hostingstart.dll"]
   ```

   # [Java](#tab/java)

   In this Dockerfile, the parent image is one of the built-in Java containers of App Service. You can find the source files at [java/tree/dev/java11-alpine](https://github.com/Azure-App-Service/java/tree/dev/java11-alpine). Its [Dockerfile](https://github.com/Azure-App-Service/java/blob/dev/java11-alpine/Dockerfile) copies a simple Java app into `/tmp/appservice`. Your Dockerfile starts that app.

   <!-- https://mcr.microsoft.com/v2/azure-app-service%2Fjava/tags/list -->
   ```dockerfile
   FROM mcr.microsoft.com/azure-app-service/java:11-java11_stable

   ENV PORT 80
   EXPOSE 80

   ENTRYPOINT ["java", "-Dserver.port=80", "-jar", "/tmp/appservice/parkingpage.jar"]
   ```

   # [Node.js](#tab/node)

   In this Dockerfile, the parent image is one of the built-in Node.js containers of App Service.

   <!-- https://mcr.microsoft.com/v2/appsvc%2Fnode/tags/list -->
   ```dockerfile
   FROM mcr.microsoft.com/appsvc/node:10-lts

   ENV HOST 0.0.0.0
   ENV PORT 8080
   EXPOSE 8080

   ENTRYPOINT ["pm2", "start", "--no-daemon", "/opt/startup/default-static-site.js"]
   ```

   # [Python](#tab/python)

   In this Dockerfile, the parent image is one of the built-in Python containers of App Service.

   <!-- https://mcr.microsoft.com/v2/appsvc%2Fpython/tags/list -->
   ```dockerfile
   FROM mcr.microsoft.com/appsvc/python:latest

   ENV PORT 8080
   EXPOSE 8080

   ENTRYPOINT ["gunicorn", "--timeout", "600", "--access-logfile", "'-'", "--error-logfile", "'-'", "--chdir=/opt/defaultsite", "application:app"]
   ```
   ---

1. [Open the command palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette), and then type **Docker Images: Build Image**. Select **Enter** to run the command.

1. In the image tag box, specify the tag you want in the following format: `<acr-name>.azurecr.io/<image-name>:<tag>`, where `<acr-name>` is the name of the container registry you created. Select **Enter**.

1. When the image finishes building, select **Refresh** at the top of the **IMAGES** explorer and verify that the image built successfully.

   Screenshot that shows the built image with tag.

## Deploy to container registry

1. In the activity bar, select the **Docker** icon. In the **IMAGES** explorer, find the image you built.

1. Expand the image, right-click on the tag you want, and select **Push**.

1. Make sure the image tag begins with `<acr-name>.azurecr.io` and select **Enter**.

1. When VS Code finishes pushing the image to your container registry, select **Refresh** at the top of the **REGISTRIES** explorer and verify that the image was pushed successfully.

   Screenshot that shows the image deployed to Azure Container Registry.

## Deploy to App Service

1. In the **REGISTRIES** explorer, expand the image, right-click the tag, and then select **Deploy Image to Azure App Service**.

1. Follow the prompts to select a subscription, a globally unique app name, a resource group, and an App Service plan. Select **B1 Basic** for the pricing tier, and a region near you.

After deployment, your app is available at `http://<app-name>.azurewebsites.net`.

A resource group is a named collection of all your application's resources in Azure. For example, a resource group can contain a reference to a website, a database, and an Azure function.

An App Service plan defines the physical resources to use to host your website. This quickstart uses the Basic hosting plan on Linux infrastructure, which means the site is hosted on a Linux machine alongside other websites. If you start with the Basic plan, you can use the Azure portal to scale up so that a machine runs only your site. For pricing, see [App Service pricing](https://azure.microsoft.com/pricing/details/app-service/linux).

## Browse the website

The **Output** panel shows the status of the deployment operations. When the operation finishes, select **Open Site** in the pop-up notification to open the site in your browser.

The App Service app pulls from the container registry every time it starts. If you rebuild your image, you just need to push it to your container registry, and the app pulls in the updated image when it restarts. To tell your app to pull in the updated image immediately, restart it.

To troubleshoot, go to [I ran into an issue](https://www.research.net/r/PWZWZ52?tutorial=quickstart-docker&step=deploy-app).

## Clean up resources


In the preceding steps, you created Azure resources in a resource group. If you don't expect to need these resources in the future, you can delete them by deleting the resource group:

1. From the Azure portal menu or home page, select **Resource groups** > **myResourceGroup**.

1. On the **myResourceGroup** pane, make sure that the listed resources are the ones you want to delete.

1. Select **Delete resource group**. Type **myResourceGroup** in the text box to confirm, and then select **Delete**.


## Related content

- [Secure with a custom domain and certificate](tutorial-secure-domain-certificate.md)
- [Migrate to a Windows container in Azure](tutorial-custom-container.md)
- [Integrate your app with an Azure virtual network](overview-vnet-integration.md)
- [Use private endpoints for App Service apps](overview-private-endpoint.md)
- [Monitor Azure App Service](monitor-app-service.md)
- [Azure Monitor overview](https://learn.microsoft.com/azure/azure-monitor/fundamentals/overview)
- [How to use managed identities for App Service and Azure Functions](overview-managed-identity.md)
- [Configure custom container](configure-custom-container.md)
- [Sidecar container tutorial](tutorial-custom-container-sidecar.md)

Other Azure extensions:

- [Azure Cosmos DB](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-cosmosdb)
- [Azure Functions](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)
- [Azure CLI Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azurecli)
- [Azure Resource Manager Tools](https://marketplace.visualstudio.com/items?itemName=msazurermtools.azurerm-vscode-tools)
- [Azure Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack) extension pack includes all the extensions in this list.



**Applies to: container-linux-azure-portal**


In this quickstart, you learn how to deploy an image from Azure Container Registry to Azure App Service.

[Azure App Service](overview.md) on Linux provides predefined application stacks on Linux with support for languages such as .NET, Java, Node.js, and PHP. You can also use a custom Docker image to run your web app on an application stack that isn't already defined in Azure.

For more information about containerized applications in a serverless environment, see [Azure Container Apps overview](../container-apps/overview.md).

## Prerequisites

- An [Azure account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- [Azure Container Registry](https://learn.microsoft.com/azure/container-registry/container-registry-get-started-portal)
- The [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli)
- [Docker](https://www.docker.com)

## Clone the sample repository

Clone the [the .NET 6.0 sample app](https://github.com/Azure-Samples/dotnetcore-docs-hello-world) by using the following command:

```bash
git clone https://github.com/Azure-Samples/dotnetcore-docs-hello-world.git
```

## Push the image to Azure Container Registry

Make sure that you're in the cloned repository's root folder, which contains a `Dockerfile.linux` file.

1. Sign in to the Azure CLI.

   ```azurecli
   az login
   ```

1. Sign in to Azure Container Registry.

   ```azurecli
   az acr login -n <your_registry_name>
   ```

1. Build the container image. This example uses the image name `dotnetcore-docs-hello-world-linux`.

   ```docker
   docker build -f Dockerfile.linux -t <your_registry_name>.azurecr.io/dotnetcore-docs-hello-world-linux . 
   ```

1. Push the container image to Azure Container Registry.

   ```docker
   docker push <your_registry_name>.azurecr.io/dotnetcore-docs-hello-world-linux:latest
   ```

   > **Note:**
   > The Dockerfile sets the port number to 80 internally. For more information, go to [Configure custom container](configure-custom-container.md).

## Deploy to Azure

1. Sign in to the [Azure portal](https://portal.azure.com).

1. Type **app services** in the search. Under **Services**, select **App Services**.

   Screenshot that shows how to search for app services in the Azure portal.

1. On the **App Services** pane, select **Create** > **Web App**.

1. On the **Basics** tab, under **Project details**, select the correct subscription. To create a new resource group, select **Create new**. Type **myResourceGroup** for the name.

   Screenshot that shows the project details section where you select the Azure subscription and the resource group for the web app.

1. Under **Instance details**:

   - Enter a globally unique name for your web app.
   - Select **Container**.
   - For **Operating System**, select **Linux**.
   - In **Region**, select the region from which you plan to serve your app.

   Screenshot that shows the instance details section where you provide a name for the virtual machine and select its region, image, and size.

1. Under **App Service Plan**, select **Create new**. Enter **myAppServicePlan** for the name. To change to the Free tier, select **Change size** > **Dev/Test** > **F1** > **Apply**.

   Screenshot that shows plan options.

1. At the top of the pane, select the **Container** tab.

1. On the **Container** tab, for **Image Source**, select **Azure Container Registry**. Under **Azure Container Registry options**, set the following values:

   - **Registry**: Select your container registry.
   - **Image**: Select **dotnetcore-docs-hello-world-linux**.
   - **Tag**: Select **latest**.

   Screenshot that shows Azure Container Registry options.

1. Select **Review + create** at the bottom of the pane.

   Screenshot that shows the button at the bottom of the pane.

1. After validation runs, select **Create**.

1. After deployment finishes, select **Go to resource**.

   Screenshot that shows the button to go to the resource.

## Browse to the app

Browse to the deployed application in your web browser at the URL `http://<app-name>.azurewebsites.net`.

Screenshot that shows the deployed application.

The App Service app pulls from the container registry each time it starts. If you rebuild your image, push it to your container registry. The app pulls in the updated image when it restarts. To tell your app to pull in the updated image immediately, restart it.

## Clean up resources


In the preceding steps, you created Azure resources in a resource group. If you don't expect to need these resources in the future, you can delete them by deleting the resource group:

1. From the Azure portal menu or home page, select **Resource groups** > **myResourceGroup**.

1. On the **myResourceGroup** pane, make sure that the listed resources are the ones you want to delete.

1. Select **Delete resource group**. Type **myResourceGroup** in the text box to confirm, and then select **Delete**.


## Related content

- [Secure with a custom domain and certificate](tutorial-secure-domain-certificate.md)
- [Migrate to a Windows container in Azure](tutorial-custom-container.md)
- [Integrate your app with an Azure virtual network](overview-vnet-integration.md)
- [Use private endpoints for App Service apps](overview-private-endpoint.md)
- [Azure Monitor overview](https://learn.microsoft.com/azure/azure-monitor/fundamentals/overview)
- [Monitor Azure App Service](monitor-app-service.md)
- [How to use managed identities for App Service and Azure Functions](overview-managed-identity.md)
- [Configure custom container](configure-custom-container.md)
- [Sidecar container tutorial](tutorial-custom-container-sidecar.md)



**Applies to: container-windows-azure-portal**


In this quickstart, you learn how to deploy an ASP.NET app in a Windows image from Azure Container Registry to Azure App Service.

[Azure App Service](overview.md) provides predefined application stacks on Windows, like ASP.NET or Node.js, that run on Internet Information Services (IIS). These preconfigured application stacks [lock down the operating system and prevent low-level access](operating-system-functionality.md).

Custom Windows containers don't have these restrictions. Developers can use custom containers to give containerized applications full access to Windows functionality.

## Prerequisites

- An [Azure account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- [Azure Container Registry](https://learn.microsoft.com/azure/container-registry/container-registry-get-started-portal)
- The [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli)
- [Docker for Windows](https://docs.docker.com/docker-for-windows/install/)
- To [Switch Docker to run Windows containers](https://learn.microsoft.com/virtualization/windowscontainers/quick-start/quick-start-windows-10)

## Clone the sample repository

Clone the [the .NET 6.0 sample app](https://github.com/Azure-Samples/dotnetcore-docs-hello-world) by using the following command:

```bash
git clone https://github.com/Azure-Samples/dotnetcore-docs-hello-world.git
```

## Push the image to Azure Container Registry

Make sure you're in the cloned repository's root folder. This repository contains a `Dockerfile.windows` file. This article uses Windows Nano Server Long Term Servicing Channel 2022 as the base operating system, and explicitly calls out the Windows base.

> **Note:**
> Even though this container is a Windows container, the paths still need to use forward slashes. For more information, see [Write a Dockerfile](https://learn.microsoft.com/virtualization/windowscontainers/manage-docker/manage-windows-dockerfile#considerations-for-using-copy-with-windows).

1. Sign in to the Azure CLI.

    ```azurecli
    az login
    ```

1. Sign in to Azure Container Registry.

    ```azurecli
    az acr login -n <your_registry_name>
    ```

1. Build the container image. This example uses the image name `dotnetcore-docs-hello-world-windows`.

    ```docker
    docker build -f Dockerfile.windows -t <your_registry_name>.azurecr.io/dotnetcore-docs-hello-world-windows . 
    ```

1. Push the container image to Azure Container Registry.

    ```docker
    docker push <your_registry_name>.azurecr.io/dotnetcore-docs-hello-world-windows:latest
    ```

    > **Note:**
    > The Dockerfile sets the port number to `80` internally. For more information, see [Configure custom container](configure-custom-container.md).

## Deploy to Azure

1. Sign in to the [Azure portal](https://portal.azure.com).

1. Enter **app services** in the search box. Under **Services**, select **App Services**.

   Screenshot that shows how to search for app services in the Azure portal.

1. In **App Services**, select **Create** > **Web App**.

1. On the **Basics** tab, under **Project details**, select the correct subscription. Select **Create new**. Enter `myResourceGroup` for the name.

   Screenshot that shows the Project details section where you select the Azure subscription and the resource group for the web app.

1. Under **Instance details**:

   - Enter a globally unique name for your web app.
   - Select **Container**.
   - For **Operating System**, select **Windows**.
   - For **Region**, select the region from which you want to serve your app.

   Screenshot that shows the Instance details section where you provide a name for the virtual machine and select its region, image, and size.

1. Under **App Service Plan**, select **Create new**. Enter `myAppServicePlan` for the name. To change the tier, select **Explore pricing plans**, select a plan, and choose **Select** at the bottom of the pane.

    Screenshot that shows App Service plan options.

1. At the top of the pane, select the **Container** tab.

1. On the **Container** tab, for **Image Source**, select **Azure Container Registry**. Under **Azure Container Registry options**, set the following values:

   - **Registry**: Select your container registry.
   - **Image**: Select **dotnetcore-docs-hello-world-windows**.
   - **Tag**: Select **latest**.

   Screenshot that shows Azure Container Registry options.

1. Select **Review + create** at the bottom of the pane.

   Screenshot that shows the Review and create button at the bottom of the pane.

1. After validation runs, select **Create**.

1. After deployment finishes, select **Go to resource**.

   Screenshot that shows how to go to the resource.

## Go to the app

Go to the deployed application in your web browser at the URL `http://<app-name>.azurewebsites.net`.

Screenshot that shows the Windows App Service.

The host operating system appears in the footer, which confirms that the app runs in a Windows container.

The App Service app pulls from the container registry each time it starts. If you rebuild your image, push it to your container registry. The app pulls in the updated image when it restarts. To tell your app to pull in the updated image immediately, restart it.

## Clean up resources


In the preceding steps, you created Azure resources in a resource group. If you don't expect to need these resources in the future, you can delete them by deleting the resource group:

1. From the Azure portal menu or home page, select **Resource groups** > **myResourceGroup**.

1. On the **myResourceGroup** pane, make sure that the listed resources are the ones you want to delete.

1. Select **Delete resource group**. Type **myResourceGroup** in the text box to confirm, and then select **Delete**.


## Related content

- [Configure a custom container](configure-custom-container.md)
- [How to use managed identities for App Service and Azure Functions](overview-managed-identity.md)
- [Monitor Azure App Service](monitor-app-service.md)
- [Azure Monitor overview](https://learn.microsoft.com/azure/azure-monitor/fundamentals/overview)
- [Secure with a custom domain and certificate](tutorial-secure-domain-certificate.md)
- [Integrate your app with an Azure virtual network](overview-vnet-integration.md)
- [Use private endpoints for App Service apps](overview-private-endpoint.md)
- [Use Azure Container Registry with Azure Private Link](https://learn.microsoft.com/azure/container-registry/container-registry-private-link)
- [Migrate to a Windows container in Azure](tutorial-custom-container.md)
- [Deploy a container with Azure Pipelines](deploy-container-azure-pipelines.md)
- [Deploy a container with GitHub Actions](deploy-container-github-action.md)



**Applies to: container-windows-powershell**


In this quickstart, you learn how to deploy an ASP.NET app in a Windows image from [Microsoft Artifact Registry](https://mcr.microsoft.com) to Azure App Service.

[Azure App Service](overview.md) provides predefined application stacks on Windows that run on Internet Information Services (IIS). The preconfigured application stacks [lock down the operating system and prevent low-level access](operating-system-functionality.md). 

Custom Windows containers don't have these restrictions. Developers can use custom containers to give containerized applications full access to Windows functionality.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Azure PowerShell](https://learn.microsoft.com/powershell/azure/install-az-ps).

## Connect to Azure

Sign in to your Azure account by using the [`Connect-AzAccount`](https://learn.microsoft.com/powershell/module/az.accounts/connect-azaccount) command and following the prompt:

```azurepowershell-interactive
Connect-AzAccount
```

## Create a resource group

Create a resource group with the [`New-AzResourceGroup`](https://learn.microsoft.com/powershell/module/az.resources/new-azresourcegroup) command. An Azure resource group is a logical container into which Azure resources are deployed and managed.

The following example creates a resource group named `myResourceGroup` in the `eastus` location. To see all supported locations for App Service, run the [`Get-AzLocation`](https://learn.microsoft.com/powershell/module/az.resources/get-azlocation) command.

```azurepowershell-interactive
New-AzResourceGroup -Name myResourceGroup -Location eastus
```

The command returns `Login Succeeded`.

## Create your App Service plan

Create a new App Service plan by using the [`New-AzAppServicePlan`](https://learn.microsoft.com/powershell/module/az.websites/new-azappserviceplan) command.

The following example creates an App Service plan named `myAppServicePlan` in the **PremiumV3** pricing tier (`-Tier PremiumV3`). The `-HyperV` parameter specifies a Windows container.

```azurepowershell-interactive
New-AzAppServicePlan -Name myAppServicePlan -Location eastus -ResourceGroupName myResourceGroup -Tier PremiumV3 -HyperV
```

## Create your web app

Create a new app by using the [`New-AzWebApp`](https://learn.microsoft.com/powershell/module/az.websites/new-azwebapp) command. Replace `<your-container-app>` with a unique app name (valid characters are `a-z`, `0-9`, and `-`).

```azurepowershell-interactive
New-AzWebApp -Name <your-container-app> -AppServicePlan myAppServicePlan -Location eastus -ResourceGroupName myResourceGroup -ContainerImageName mcr.microsoft.com/azure-app-service/windows/parkingpage:latest
```

- The `Name` parameter specifies the web app name.
- The `AppServicePlan` parameter specifies the name of the App Service plan.
- The `Location` parameter specifies the location.
- The `ResourceGroupName` parameter specifies the name of the resource group.
- The `ContainerImageName` parameter specifies a container image name and optional tag.

The command might take a few minutes to finish.

## Browse to the app

Browse to the deployed application in your web browser at the URL `http://<app-name>.azurewebsites.net`.

Screenshot that shows Windows App Service.

The App Service app pulls from the container registry each time it starts. If you rebuild your image, push it to your container registry. The app pulls in the updated image when it restarts. To tell your app to pull in the updated image immediately, restart it.

## Clean up resources

Remove the resource group by using the [`Remove-AzResourceGroup`](https://learn.microsoft.com/powershell/module/az.resources/remove-azresourcegroup) command:

```azurepowershell-interactive
Remove-AzResourceGroup myResourceGroup
```

## Related content

- [Configure a custom container](configure-custom-container.md)
- [How to use managed identities for App Service and Azure Functions](overview-managed-identity.md)
- [Monitor Azure App Service](monitor-app-service.md)
- [Azure Monitor overview](https://learn.microsoft.com/azure/azure-monitor/fundamentals/overview)
- [Secure with a custom domain and certificate](tutorial-secure-domain-certificate.md)
- [Integrate your app with an Azure virtual network](overview-vnet-integration.md)
- [Use private endpoints for App Service apps](overview-private-endpoint.md)
- [Use Azure Container Registry with Azure Private Link](https://learn.microsoft.com/azure/container-registry/container-registry-private-link)
- [Migrate to a Windows container in Azure](tutorial-custom-container.md)
- [Deploy a container with Azure Pipelines](deploy-container-azure-pipelines.md)
- [Deploy a container with GitHub Actions](deploy-container-github-action.md)



**Applies to: container-windows-cli**


In this quickstart, you learn how to deploy an ASP.NET app in a Windows image from [Microsoft Artifact Registry](https://mcr.microsoft.com) to Azure App Service.

[Azure App Service](overview.md) provides predefined application stacks on Windows that run on Internet Information Services (IIS). These preconfigured application stacks [lock down the operating system and prevent low-level access](operating-system-functionality.md).

Custom Windows containers don't have these restrictions. Developers can use custom containers to give containerized applications full access to Windows functionality.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli).

## Connect to Azure

Sign in to your Azure account. Use the [`az login`](https://learn.microsoft.com/cli/azure/authenticate-azure-cli) command and follow the prompt:

```bash
az login
```

## Create a resource group

Create a resource group by using the [`az group create`](https://learn.microsoft.com/cli/azure/group#az-group-create) command. An Azure resource group is a logical container into which Azure resources are deployed and managed.

The following example creates a resource group named `myResourceGroup` in the `eastus` location. To see all supported locations for App Service, run the [`az appservice list-locations`](https://learn.microsoft.com/cli/azure/appservice#az-appservice-list-locations) command.

```azurecli-interactive
az group create --name myResourceGroup --location eastus
```

## Create your App Service plan

Create an App Service plan in the resource group with the [`az appservice plan create`](https://learn.microsoft.com/cli/azure/appservice/plan#az-appservice-plan-create) command.

The following example creates an App Service plan named `myAppServicePlan` in the **P1V3** pricing tier (`--sku P1V3`).

```azurecli-interactive
az appservice plan create --resource-group myResourceGroup --location eastus --name myAppServicePlan --hyper-v --sku p1v3
```

## Create your web app

Create a custom container [web app](overview.md) in the `myAppServicePlan` App Service plan with the [`az webapp create`](https://learn.microsoft.com/cli/azure/webapp#az-webapp-create) command. Replace `<your-container-app>` with a unique app name (valid characters are `a-z`, `0-9`, and `-`).

```azurecli-interactive
az webapp create --name <your-container-app> --plan myAppServicePlan --resource-group myResourceGroup --deployment-container-image-name mcr.microsoft.com/azure-app-service/windows/parkingpage:latest
```

- The `Name` parameter specifies the web app name.
- The `AppServicePlan` parameter specifies the name of the App Service plan.
- The `Location` parameter specifies the location.
- The `ResourceGroupName` parameter specifies the name of the resource group.
- The `deployment-container-image-name` parameter specifies a container image name and optional tag.

## Browse to the app

Browse to the deployed application in your web browser at the URL `http://<app-name>.azurewebsites.net`.

Screenshot that shows Windows App Service.

The App Service app pulls from the container registry each time it starts. If you rebuild your image, push it to your container registry. The app pulls in the updated image when it restarts. To tell your app to pull in the updated image immediately, restart it.

## Clean up resources

Remove the resource group by using the [`az group delete`](https://learn.microsoft.com/cli/azure/group#az-group-delete) command:

```azurecli-interactive
az group delete --no-wait --name myResourceGroup
```

## Related content

- [Configure a custom container](configure-custom-container.md)
- [How to use managed identities for App Service and Azure Functions](overview-managed-identity.md)
- [Monitor Azure App Service](monitor-app-service.md)
- [Azure Monitor overview](https://learn.microsoft.com/azure/azure-monitor/fundamentals/overview)
- [Secure with a custom domain and certificate](tutorial-secure-domain-certificate.md)
- [Integrate your app with an Azure virtual network](overview-vnet-integration.md)
- [Use private endpoints for App Service apps](overview-private-endpoint.md)
- [Use Azure Container Registry with Azure Private Link](https://learn.microsoft.com/azure/container-registry/container-registry-private-link)
- [Migrate to a Windows container in Azure](tutorial-custom-container.md)
- [Deploy a container with Azure Pipelines](deploy-container-azure-pipelines.md)
- [Deploy a container with GitHub Actions](deploy-container-github-action.md)

<!-- LINKS - internal -->
[az-acr-create]: https://learn.microsoft.com/cli/azure/acr#az_acr_create
[az-acr-login]: https://learn.microsoft.com/cli/azure/acr#az_acr_login
[az-group-create]: https://learn.microsoft.com/cli/azure/group#az_group_create
[az-group-delete]: https://learn.microsoft.com/cli/azure/group#az_group_delete
[azure-cli]: https://learn.microsoft.com/cli/azure/install-azure-cli
[container-registry-tutorial-quick-task]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/includes/quickstart-custom-container/container-registry-tutorial-quick-task.md
[container-registry-skus]: https://learn.microsoft.com/container-registry/container-registry-skus.md
