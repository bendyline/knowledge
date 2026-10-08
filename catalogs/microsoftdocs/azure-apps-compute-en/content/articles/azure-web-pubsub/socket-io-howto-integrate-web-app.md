---
title: Integrate - Build a real-time collaborative whiteboard using Web PubSub for Socket.IO and deploy it to Azure App Service
description: A how-to guide about how to use Web PubSub for Socket.IO to enable real-time collaboration on a digital whiteboard and deploy as a Web App using Azure App Service
keywords: Socket.IO, Socket.IO on Azure, webapp Socket.IO, Socket.IO integration
author: zackliu
ms.author: chenyl
ms.service: azure-web-pubsub
ms.custom: devx-track-azurecli
ms.topic: tutorial
ms.date: 09/5/2023
---
# How-to: Build a real-time collaborative whiteboard using Web PubSub for Socket.IO and deploy it to Azure App Service

A new class of applications is reimagining what modern work could be. While [Microsoft Word](https://www.microsoft.com/microsoft-365/word) brings editors together, [Figma](https://www.figma.com) gathers up designers on the same creative endeavor. This class of applications builds on a user experience that makes us feel connected with our remote collaborators. From a technical point of view, user's activities need to be synchronized across users' screens at a low latency.


> **Important:**
> Raw connection strings appear in this article for demonstration purposes only.
>
> A connection string includes the authorization information your application needs to access Azure Web PubSub service. The access key in the connection string acts like a root password for your service. In production environments, always protect your access keys. Use Azure Key Vault to manage and rotate your keys securely and [secure your connection with `WebPubSubServiceClient`](howto-use-azure-identity.md).
>
> Avoid distributing access keys to other users, hard-coding them, or saving them anywhere in plain text that is accessible to others. Rotate your keys if you believe they may have been compromised.


## Overview
In this how-to guide, we take a cloud-native approach and use Azure services to build a real-time collaborative whiteboard and we deploy the project as a Web App to Azure App Service. The whiteboard app is accessible in the browser and allows anyone can draw on the same canvas.

Animation of the overview of the finished project.

## Prerequisites
 
In order to follow the step-by-step guide, you need
> 
> * An [Azure](https://portal.azure.com/) account. If you don't have an Azure subscription, create an [Azure free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.
> * [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) (version 2.39.0 or higher) or [Azure Cloud Shell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cloud-shell/quickstart.md) to manage Azure resources.

## Create Azure resources using Azure CLI
### Sign in
1. Sign in to Azure CLI by running the following command.
    ```azurecli-interactive
    az login
    ```

1. Create a resource group on Azure.
    ```azurecli-interactive
    az group create \
      --location "westus" \  
      --name "<resource-group-name>"
    ```

### Create a Web App resource
1. Create a free App Service plan.
    ```azurecli-interactive
    az appservice plan create \ 
      --resource-group "<resource-group-name>" \ 
      --name "<app-service-plan-name>" \ 
      --sku FREE
      --is-linux
    ```

1. Create a Web App resource 
    ```azurecli-interactive
    az webapp create \
      --resource-group "<resource-group-name>" \
      --name "<webapp-name>" \ 
      --plan "<app-service-plan-name>" \
      --runtime "NODE:16-lts"
    ```

### Create a Web PubSub for Socket.IO
1. Create a Web PubSub resource.
    ```azurecli-interactive
    az webpubsub create \
      --name "<socketio-name>" \
      --resource-group "<resource-group-name>" \
      --kind SocketIO
      --sku Premium_P1
    ```

1. Show and store the value of `primaryConnectionString` somewhere for later use.

    
Raw connection strings appear in this article for demonstration purposes only. In production environments, always protect your access keys. Use Azure Key Vault to manage and rotate your keys securely and [secure your connection with `WebPubSubServiceClient`](howto-use-azure-identity.md).


    ```azurecli-interactive
    az webpubsub key show \
      --name "<socketio-name>" \
      --resource-group "<resource-group-name>"
    ```

## Get the application code
Run the following command to get a copy of the application code.
  ```bash
  git clone https://github.com/Azure-Samples/socket.io-webapp-integration
  ```

## Deploy the application to App Service
1. App Service supports many deployment workflows. For this guide, we're going to deploy a ZIP package. Run the following commands to install and build the project.
    ```bash
    npm install
    npm run build

    # bash
    zip -r app.zip *

    # Powershell
    ```

1. Compress into a zip

    Use Bash
    ```bash
    zip -r app.zip *
    ```

    Use PowerShell
    ```PowerShell
    Compress-Archive -Path * -DestinationPath app.zip
    ```

1. Set Azure Web PubSub connection string in the application settings. Use the value of  `primaryConnectionString` you stored from an earlier step.
    ```azurecli-interactive
    az webapp config appsettings set \
    --resource-group "<resource-group-name>" \
    --name "<webapp-name>" \
    --setting Web_PubSub_ConnectionString="<primaryConnectionString>"
    ```
    
1. Use the following command to deploy it to Azure App Service.
    ```azurecli-interactive
    az webapp deployment source config-zip \
    --resource-group "<resource-group-name>" \
    --name "<webapp-name>" \
    --src app.zip
    ```

## View the whiteboard app in a browser
Now head over to your browser and visit your deployed Web App. The url usually is `https://<webapp-name>.azurewebsites.net` . It's recommended to have multiple browser tabs open so that you can experience the real-time collaborative aspect of the app. Or better, share the link with a colleague or friend.

## Next steps
> 
> [Check out more Socket.IO samples](https://aka.ms/awps/sio/sample)
