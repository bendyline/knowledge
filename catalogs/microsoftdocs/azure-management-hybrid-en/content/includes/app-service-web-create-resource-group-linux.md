---
title: "include file"
description: "include file"
services: app-service
author: cephalin
ms.service: azure-app-service
ms.topic: "include"
ms.date: 08/20/2018
ms.author: cephalin
ms.custom: include file, linux-related-content
---

## Create a resource group


[Include unavailable in this source snapshot: resource-group.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/app-service-web-create-resource-group-linux.md)

In the Cloud Shell, create a resource group with the [`az group create`](https://learn.microsoft.com/cli/azure/group#az-group-create) command. The following example creates a resource group named *myResourceGroup* in the *West Europe* location. To see all supported locations for App Service on Linux in **Basic** tier, run the [`az appservice list-locations --sku B1 --linux-workers-enabled`](https://learn.microsoft.com/cli/azure/appservice#az-appservice-list-locations) command.

```azurecli-interactive
az group create --name myResourceGroup --location "West Europe"
```

You generally create your resource group and the resources in a region near you. 

When the command finishes, a JSON output shows you the resource group properties.
