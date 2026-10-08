---
title: Quickstart - Create a Web PubSub instance with the Azure CLI
description: Quickstart showing how to create a Web PubSub instance with the Azure CLI
author: vicancy
ms.author: lianwei
ms.service: azure-web-pubsub
ms.topic: quickstart
ms.date: 11/08/2021
ms.custom: mode-api, devx-track-azurecli 
ms.devlang: azurecli
---

# Quickstart: Create a Web PubSub instance with the Azure CLI

The [Azure CLI](https://learn.microsoft.com/cli/azure) is a set of commands used to create and manage Azure resources. The Azure CLI is available across Azure services and is designed to get you working quickly with Azure, with an emphasis on automation. This quickstart shows you the options to create Azure Web PubSub instance with the Azure CLI.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-web-pubsub/quickstart-cli-create.md)

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-web-pubsub/quickstart-cli-create.md)

- This quickstart requires version 2.22.0 or higher of the Azure CLI. If using Azure Cloud Shell, the latest version is already installed.

## Create a resource group


A resource group is a logical container into which Azure resources are deployed and managed. Use the [az group create](https://learn.microsoft.com/cli/azure/group#az-group-create) command to create a resource group named `myResourceGroup` in the `eastus` location.

```azurecli
az group create --name myResourceGroup --location EastUS
```


## Create a Web PubSub instance


Run [az extension add](https://learn.microsoft.com/cli/azure/extension#az-extension-add) to install or upgrade the *webpubsub* extension to the current version.

```azurecli-interactive
az extension add --upgrade --name webpubsub
```

Use the Azure CLI [az webpubsub create](https://learn.microsoft.com/cli/azure/webpubsub#az-webpubsub-create) command to create a Web PubSub in the resource group you've created. The following command creates a _Free_ Web PubSub resource under resource group _myResourceGroup_ in _EastUS_:

  > **Important:**
  > Each Web PubSub resource must have a unique name. Replace &lt;your-unique-resource-name&gt; with the name of your Web PubSub in the following examples.

```azurecli
az webpubsub create --name "<your-unique-resource-name>" --resource-group "myResourceGroup" --location "EastUS" --sku Free_F1
```

The output of this command shows properties of the newly created resource. Take note of the two properties listed below:

- **Resource Name**: The name you provided to the `--name` parameter above.
- **hostName**: In the example, the host name is `<your-unique-resource-name>.webpubsub.azure.com/`.

At this point, your Azure account is the only one authorized to perform any operations on this new resource.


## Try the newly created instance

> 
> [Try the newly created instance using CLI](quickstart-cli-try.md#play-with-the-instance)

> 
> [Try the newly created instance from the browser](quickstart-live-demo.md#try-the-instance-with-an-online-demo)

## Clean up resources


If you plan to continue on to work with subsequent quickstarts and tutorials, you may wish to leave these resources in place.

When no longer needed, you can use the Azure CLI [az group delete](https://learn.microsoft.com/cli/azure/group) command to remove the resource group and all related resources:

```azurecli-interactive
az group delete --name "myResourceGroup"
```


## Next steps

In real-world applications, you can use SDKs in various languages build your own application. We also provide Function extensions for you to build serverless applications easily.


Use these resources to start building your own application:

> 
> [Tutorial: Publish and subscribe to messages in Azure Web PubSub](tutorial-pub-sub-messages.md)

> 
> [Tutorial: Create a simple chatroom with Azure Web PubSub](tutorial-build-chat.md)

> 
> [Tutorial: Use a service-supported subprotocol for client streaming](tutorial-subprotocol.md)

> 
> [Tutorial: Build serverless chat with Azure Functions and Web PubSub](quickstart-serverless.md)

> 
> [Tutorial: Configure an event listener](howto-develop-event-listener.md)

> 
> [Play with live demos](https://aka.ms/awps/livedemos)

> 
> [Explore more Azure Web PubSub samples](https://aka.ms/awps/samples)
