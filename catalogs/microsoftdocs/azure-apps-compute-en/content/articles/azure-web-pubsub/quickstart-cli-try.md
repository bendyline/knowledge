---
title: Quickstart - Connect and play with the Azure Web PubSub instance
description: Quickstart showing how to play with the instance from the Azure CLI
author: vicancy
ms.author: lianwei
ms.service: azure-web-pubsub
ms.topic: quickstart
ms.date: 11/08/2021
ms.custom: mode-api, devx-track-azurecli 
ms.devlang: azurecli
---

# Quickstart: Connect to the Azure Web PubSub instance from CLI

This quickstart shows you how to connect to the Azure Web PubSub instance and publish messages to the connected clients using the [Azure CLI](https://learn.microsoft.com/cli/azure).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-web-pubsub/quickstart-cli-try.md)

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-web-pubsub/quickstart-cli-try.md)

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


## Play with the instance


### Connect to the service


Use the Azure CLI [az webpubsub client](https://learn.microsoft.com/cli/azure/webpubsub/client) command to start a WebSocket client connection to the service created from the previous step, providing the following information:

- Hub name: A string of 1 to 127 characters. It should start with alphabetic characters `(a-z, A-Z)` and only contain alpha-numeric `(0-9, a-z, A-Z)` characters or underscore `(_)`.

**Hub** is a logical set of the connected WebSocket connections. Check [About Hubs, groups and connections](key-concepts.md) for details about the concepts.

  > **Important:**
  > Replace &lt;your-unique-resource-name&gt; with the name of your Web PubSub resource created from the previous steps.

- Hub name: **myHub1**.
- Resource group name: **myResourceGroup**.
- User ID: **user1**

```azurecli-interactive
az webpubsub client start --name "<your-unique-resource-name>" --resource-group "myResourceGroup" --hub-name "myHub1" --user-id "user1"
```

You can see that the command established a WebSocket connection to the Web PubSub service and you received a JSON message indicating that it is now successfully connected, and is assigned with a unique `connectionId`:

```json
{"type":"system","event":"connected","userId":"user1","connectionId":"<your_unique_connection_id>"}
```


Play with it and try joining to groups using `joingroup <group-name>` and send messages to groups using `sendtogroup <group-name>`:

```azurecli
joingroup group1
```

```azurecli
sendtogroup group1 hello
```


### Publish messages and manage the clients

Azure CLI also provides [az webpubsub service](https://learn.microsoft.com/cli/azure/webpubsub/service) commands to manage the client connections.

Open **another** CLI command, and you can broadcast messages to the clients:

- Hub name: **myHub1**.
- Resource group name: **myResourceGroup**.

```azurecli-interactive
az webpubsub service broadcast --name "<your-unique-resource-name>" --resource-group "myResourceGroup" --hub-name "myHub1" --payload "Hello World"
```

Switch back to the previous CLI command and you can see that the client received message:
```JSON
{"type":"message","from":"server","dataType":"text","data":"Hello World"}
```

You can also list all the available commands using `--help` option and play with the listed commands.

```azurecli-interactive
az webpubsub service --help
```



## Next steps

This quickstart provides you a basic idea of how to connect to the Web PubSub service and how to publish messages to the connected clients.

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
