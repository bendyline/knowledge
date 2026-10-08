---
author: ggailey777
ms.service: azure-functions
ms.topic: "include"
ms.date: 05/12/2021
ms.author: glenga
---

## Get the custom location

To be able to create a function app in a custom location, you'll need to get information about the environment.


Get the following information about the custom location from your cluster administrator (see [Create a custom location](https://learn.microsoft.com/azure/app-service/manage-create-arc-environment#create-a-custom-location)).

```azurecli-interactive
customLocationGroup="<resource-group-containing-custom-location>"
customLocationName="<name-of-custom-location>"
```

Get the custom location ID for the next step.

```azurecli-interactive
customLocationId=$(az customlocation show \
    --resource-group $customLocationGroup \
    --name $customLocationName \
    --query id \
    --output tsv)
```
