---
title: 'Send Blob storage events to web endpoint - template'
description: Use Azure Event Grid and an Azure Resource Manager template to create Blob storage account, and subscribe its events. Send the events to a Webhook.'
ms.date: 09/28/2021
ms.topic: quickstart
ms.custom: subject-armqs, mode-arm, devx-track-arm-template
---

# Quickstart: Route Blob storage events to web endpoint by using an ARM template

In this article, you use an Azure Resource Manager template (ARM template) to create a Blob storage account, subscribe to events for that blob storage, and trigger an event to view the result. Typically, you send events to an endpoint that processes the event data and takes actions. However, to simplify this article, you send the events to a web app that collects and displays the messages.

> **Note:**
> If you are new to Azure Event Grid, see [What's Azure Event Grid](overview.md) to get an overview of the service before going through this tutorial. 


[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/blob-event-quickstart-template.md)

If your environment meets the prerequisites and you're familiar with using ARM templates, select the **Deploy to Azure** button. The template will open in the Azure portal.

Button to deploy the Resource Manager template to Azure.

## Prerequisites

If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

### Create a message endpoint

Before subscribing to the events for the Blob storage, let's create the endpoint for the event message. Typically, the endpoint takes actions based on the event data. To simplify this quickstart, you deploy a [prebuilt web app](https://github.com/Azure-Samples/azure-event-grid-viewer) that displays the event messages. The deployed solution includes an App Service plan, an App Service web app, and source code from GitHub.

1. Select **Deploy to Azure** to deploy the solution to your subscription. In the Azure portal, provide values for the parameters.

    [Deploy to Azure](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure-Samples%2Fazure-event-grid-viewer%2Fmaster%2Fazuredeploy.json)
1. The deployment can take a few minutes to complete. After the deployment succeeds, view your web app to make sure it's running. In a web browser, navigate to:
`https://<your-site-name>.azurewebsites.net`

1. You see the site but no events are posted to it yet.

   View new site

## Review the template

The template used in this quickstart is from [Azure Quickstart Templates](https://github.com/Azure/azure-quickstart-templates/tree/master/quickstarts/microsoft.eventgrid/event-grid-subscription-and-storage).

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.eventgrid/event-grid-subscription-and-storage/azuredeploy.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/blob-event-quickstart-template.md)

Two Azure resources are defined in the template:

* [**Microsoft.Storage/storageAccounts**](https://learn.microsoft.com/azure/templates/microsoft.storage/storageaccounts): create an Azure Storage account.
* [**Microsoft.EventGrid/systemTopics**](https://learn.microsoft.com/azure/templates/microsoft.eventgrid/systemtopics): create a system topic with the specified name for the storage account.
* [**Microsoft.EventGrid/systemTopics/eventSubscriptions**](https://learn.microsoft.com/azure/templates/microsoft.eventgrid/systemtopics/eventsubscriptions): create an Azure Event Grid subscription for the system topic.

## Deploy the template

1. Select the following link to sign in to Azure and open a template. The template creates a key vault and a secret.

    Button to deploy the Resource Manager template to Azure.

2. Specify the **endpoint**: provide the URL of your web app and add `api/updates` to the home page URL.
3. Select **Purchase** to deploy the template.

  The Azure portal is used here to deploy the template. You can also use the Azure PowerShell, Azure CLI, and REST API. To learn other deployment methods, see [Deploy templates](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/templates/deploy-powershell.md).

> **Note:**
> You can find more Azure Event Grid template samples [here](https://azure.microsoft.com/resources/templates/?resourceType=Microsoft.Eventgrid&pageNumber=1&sort=Popular).

## Validate the deployment

View your web app again, and notice that a subscription validation event has been sent to it. Select the eye icon to expand the event data. Event Grid sends the validation event so the endpoint can verify that it wants to receive event data. The web app includes code to validate the subscription.

View subscription event

Now, let's trigger an event to see how Event Grid distributes the message to your endpoint.

You trigger an event for the Blob storage by uploading a file. The file doesn't need any specific content. The article assumes you have a file named testfile.txt, but you can use any file.

When you upload the file to the Azure Blob storage, Event Grid sends a message to the endpoint you configured when subscribing. The message is in the JSON format and it contains an array with one or more events. In the following example, the JSON message contains an array with one event. View your web app and notice that a blob created event was received.

View results

## Clean up resources

When no longer needed, [delete the resource group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/delete-resource-group.md?tabs=azure-portal#delete-resource-group).

## Next steps

For more information about Azure Resource Manager templates, see the following articles:

* [Azure Resource Manager documentation](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/index.yml)
* [Define resources in Azure Resource Manager templates](https://learn.microsoft.com/azure/templates/)
* [Azure Quickstart Templates](https://azure.microsoft.com/resources/templates/)
* [Azure Event Grid templates](https://azure.microsoft.com/resources/templates/?resourceType=Microsoft.Eventgrid).
