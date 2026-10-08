---
title: Azure CLI script sample - Create custom topic and send event | Microsoft Docs
description: This article provides a sample Azure CLI script that shows how to create a custom topic and send an event to the custom topic using Azure CLI. 
ms.devlang: azurecli
ms.topic: sample
ms.date: 03/29/2022 
ms.custom: devx-track-azurecli
---

# Create custom topic and subscribe to events for an Azure subscription with Azure CLI

This article provides a sample Azure CLI script that shows how to create a custom topic and send an event to the custom topic using Azure CLI.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/scripts/cli-subscribe-custom-topic.md)

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/scripts/cli-subscribe-custom-topic.md)

## Sample script

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/cli-launch-cloud-shell-sign-in.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/scripts/cli-subscribe-custom-topic.md)

### Run the script

[Code reference unavailable in this source snapshot: ~/azure_cli_scripts/event-grid/create-topic-subscribe/event-grid.sh](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/scripts/cli-subscribe-custom-topic.md)

## Clean up resources

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/cli-clean-up-resources.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/scripts/cli-subscribe-custom-topic.md)

```azurecli
az group delete --name $resourceGroup
```

## Sample reference

This script uses the following command to create the event subscription. Each command in the table links to command-specific documentation.

| Command | Notes |
| --- | --- |
| [`az eventgrid event-subscription create`](https://learn.microsoft.com/cli/azure/eventgrid/event-subscription#az-eventgrid-event-subscription-create) | Create an Event Grid subscription. |

## Next steps

* For information about querying subscriptions, see [Query Event Grid subscriptions](../query-event-subscriptions.md).
* For more information on the Azure CLI, see [Azure CLI documentation](https://learn.microsoft.com/cli/azure).
