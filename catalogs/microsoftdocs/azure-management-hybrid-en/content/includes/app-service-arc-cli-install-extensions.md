---
author: cephalin
ms.service: azure-app-service
ms.custom: devx-track-azurecli
ms.topic: "include"
ms.date: 05/12/2021
ms.author: cephalin
---

## Add Azure CLI extensions

Launch the Bash environment in [Azure Cloud Shell](https://learn.microsoft.com/azure/cloud-shell/get-started).

Button to launch the Azure Cloud Shell.

Because these CLI commands are not yet part of the core CLI set, add them with the following commands:

```azurecli-interactive
az extension add --upgrade --yes --name customlocation
az extension remove --name appservice-kube
az extension add --upgrade --yes --name appservice-kube
```
