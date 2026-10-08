---
author: ggailey777
ms.service: azure-functions
ms.topic: include
ms.date: 09/26/2019
ms.author: glenga
---

### Query the Storage queue

You can use the [`az storage queue list`](https://learn.microsoft.com/cli/azure/storage/queue#az-storage-queue-list) command to view the Storage queues in your account, as in the following example:

```azurecli-interactive
az storage queue list --output tsv
```

The output from this command includes a queue named `outqueue`, which is the queue that was created when the function ran.

Next, use the [`az storage message peek`](https://learn.microsoft.com/cli/azure/storage/message#az-storage-message-peek) command to view the messages in this queue, as in this example:

```azurecli-interactive
echo `echo $(az storage message peek --queue-name outqueue -o tsv --query '[].{Message:content}') | base64 --decode`
```

The string returned should be the same as the message you sent to test the function.

> **Note:**  
> The previous example decodes the returned string from base64. This is because the Queue storage bindings write to and read from Azure Storage as [base64 strings](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-storage-queue-trigger.md#encoding).
