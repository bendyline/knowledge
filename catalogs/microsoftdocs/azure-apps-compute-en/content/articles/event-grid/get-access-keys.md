---
title: Get access key for an Event Grid resource
description: This article describes how to get access key for an Event Grid topic or domain
ms.topic: how-to
ms.date: 02/10/2025 
ms.custom: devx-track-azurepowershell, devx-track-azurecli 
ms.devlang: azurecli
---

# Get access keys for Event Grid resources (topics or domains)
Access keys are used to authenticate an application publishing events to Azure Event Grid resources (topics and domains). We recommend regenerating your keys regularly and storing them securely. You're provided with two access keys so that you can maintain connections using one key while regenerating the other.

This article describes how to get access keys for an Event Grid resource (topic or domain) using Azure portal, PowerShell, or CLI. 

## Azure portal
In the Azure portal, switch to **Access keys** tab of the **Event Grid Topic** or **Event Grid Domain** page for your topic or domain.  

Access keys page

## Azure PowerShell
Use the [Get-AzEventGridTopicKey](https://learn.microsoft.com/powershell/module/az.eventgrid/get-azeventgridtopickey) command to get access keys for topics. 

```azurepowershell-interactive
Get-AzEventGridTopicKey -ResourceGroup <RESOURCE GROUP NAME> -Name <TOPIC NAME>
```

Use [Get-AzEventGridDomainKey](https://learn.microsoft.com/powershell/module/az.eventgrid/get-azeventgriddomainkey) command to get access keys for domains. 

```azurepowershell-interactive
Get-AzEventGridDomainKey -ResourceGroup <RESOURCE GROUP NAME> -Name <DOMAIN NAME>
```

## Azure CLI
Use the [`az eventgrid topic key list`](https://learn.microsoft.com/cli/azure/eventgrid/topic/key#az-eventgrid-topic-key-list) to get access keys for topics. 

```azurecli-interactive
az eventgrid topic key list --resource-group <RESOURCE GROUP NAME> --name <TOPIC NAME>
```

Use [`az eventgrid domain key list`](https://learn.microsoft.com/cli/azure/eventgrid/domain/key#az-eventgrid-domain-key-list) to get access keys for domains. 

```azurecli-interactive
az eventgrid domain key list --resource-group <RESOURCE GROUP NAME> --name <DOMAIN NAME>
```

## Next steps
See the following article: [Authenticate publishing clients](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/security-authenticate-publishing-clients.md).
