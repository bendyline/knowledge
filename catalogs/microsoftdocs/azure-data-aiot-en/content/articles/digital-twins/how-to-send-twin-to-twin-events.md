---
title: Set up twin-to-twin event handling
titleSuffix: Azure Digital Twins
description: Learn how to create a function in Azure for propagating events through the twin graph.
author: baanders
ms.author: baanders
ms.date: 03/10/2025
ms.topic: how-to
ms.service: azure-digital-twins
ms.custom: devx-track-azurecli
ms.devlang: azurecli

# Optional fields. Don't forget to remove # if you need a field.
# ms.custom: can-be-multiple-comma-separated
# manager: MSFT-alias-of-manager-or-PM-counterpart
---

# Set up twin-to-twin event handling

This article shows how to send events from twin to twin, so that when one digital twin in the graph is updated, related twins in the graph affected by this information can also update. This event handling helps you create a fully connected Azure Digital Twins graph, where data that arrives into Azure Digital Twins from external sources like IoT Hub is propagated through the entire graph.

To set up this twin-to-twin event handling, you create an [Azure function](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-overview.md) that watches for twin life-cycle events. The function recognizes which events should affect other twins in the graph, and uses the event data to update the affected twins accordingly.

## Prerequisites

To set up twin-to-twin handling, you need an Azure Digital Twins instance to work with. For instructions on how to create an instance, see [Set up an Azure Digital Twins instance and authentication](how-to-set-up-instance-portal.md). The instance should contain at least two twins that you want to send data between.

Optionally, you might want to set up [automatic telemetry ingestion through IoT Hub](how-to-ingest-iot-hub-data.md) for your twins as well. This process isn't required to send data from twin to twin, but it's an important piece of a complete solution where live device telemetry drives the twin graph.

## Send twin events to an endpoint

To set up twin-to-twin event handling, start by creating an *endpoint* in Azure Digital Twins and a *route* to that endpoint. Twins undergoing an update use the route to send information about their update events to the endpoint (where Event Grid can pick them up later and pass them to an Azure function for processing).


### Create the Event Grid topic

[Event Grid](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/overview.md) is an Azure service that helps route and deliver events from Azure services to other places within Azure. You can create an [Event Grid topic](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/concepts.md) to collect certain events from a source, and then subscribers can listen on the topic to receive the events as they come through.

In the Azure CLI, run the following command to create an Event Grid topic:

```azurecli-interactive
az eventgrid topic create --resource-group <your-resource-group> --name <name-for-your-event-grid-topic> --location <region>
```

The output from this command is information about the Event Grid topic you've created. Save the **name** that you gave to your Event Grid topic, because you'll use it later.

### Create the endpoint

Next, create an Event Grid endpoint in Azure Digital Twins, which will connect your instance to your Event Grid topic. Use the command below, filling in the name of your Event Grid topic from the previous step and the other placeholder fields as needed.

```azurecli-interactive
az dt endpoint create eventgrid --dt-name <Azure-Digital-Twins-instance> --eventgrid-resource-group <your-resource-group> --eventgrid-topic <your-event-grid-topic> --endpoint-name <name-for-your-Azure-Digital-Twins-endpoint>
```

The output from this command is information about the endpoint you've created.

Look for the `provisioningState` field in the output, and check that the value is "Succeeded."

Screenshot of the result of the endpoint query in the Cloud Shell of the Azure portal, showing the endpoint with a provisioningState of Succeeded.

It may also say "Provisioning", meaning that the endpoint is still being created. If so, wait a few seconds and run the following command to check the status of the endpoint. Repeat until the `provisioningState` shows "Succeeded."

```azurecli-interactive
az dt endpoint show --dt-name <your-Azure-Digital-Twins-instance> --endpoint-name <your-Azure-Digital-Twins-endpoint> 
```

Save the **name** of your endpoint, because you'll use it later.

### Create the route

Next, create an Azure Digital Twins route that sends events to the Event Grid endpoint you created. 

Use the following CLI command, filling in the name of your endpoint from the previous step and the other placeholder fields as needed. This command forwards all events that occur in the twin graph. 

>**Tip:**
>You can limit the events to only specific ones if you want, by using [filters](how-to-create-routes.md?tabs=portal%2Cportal2%2Cportal3#filter-events).

```azurecli-interactive
az dt route create --dt-name <your-Azure-Digital-Twins-instance> --endpoint-name <your-Azure-Digital-Twins-endpoint> --route-name <name-for-your-Azure-Digital-Twins-route>
```

The output from this command is some information about the route you've created.

>**Note:**
>Endpoints (from the previous step) must be finished provisioning before you can set up an event route that uses them. If the route creation fails because the endpoints aren't ready, wait a few minutes and then try again.

## Create Azure function to update twins

Next, create an Azure function that listens on the endpoint and receive twin events that are sent there via the route. The logic of the function should use the information in the events to determine what other twins need to be updated and then perform the updates.

1. First, create a new Azure Functions project. 

    You can do this using **Visual Studio** (for instructions, see [Develop Azure Functions using Visual Studio](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-develop-vs.md#create-an-azure-functions-project)), **Visual Studio Code** (for instructions, see [Create a C# function in Azure using Visual Studio Code](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/how-to-create-function-vs-code.md?pivot=programming-language-csharp?tabs=in-process#create-an-azure-functions-project)), or the **Azure CLI** (for instructions, see [Create a C# function in Azure from the command line](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/how-to-create-function-azure-cli.md?pivots=programming-language-csharp#create-a-local-code-project-and-function)).

1. Add the following packages to your project. Use the Visual Studio NuGet package manager, or the [dotnet add package](https://learn.microsoft.com/dotnet/core/tools/dotnet-add-package) command in a command-line tool.

    * [Azure.DigitalTwins.Core](https://www.nuget.org/packages/Azure.DigitalTwins.Core/)
    * [Azure.Identity](https://www.nuget.org/packages/Azure.Identity/)
    * [Microsoft.Azure.WebJobs.Extensions.EventGrid](https://www.nuget.org/packages/Microsoft.Azure.WebJobs.Extensions.EventGrid)

1. Fill in the logic of your function.

1. Publish the function to Azure, using your preferred method.

    For instructions on how to publish the function using **Visual Studio**, see [Develop Azure Functions using Visual Studio](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-develop-vs.md#publish-to-azure). For instructions on how to publish the function using **Visual Studio Code**, see [Create a C# function in Azure using Visual Studio Code](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/how-to-create-function-vs-code.md?pivot=programming-language-csharp?tabs=in-process#create-the-function-app-in-azure). For instructions on how to publish the function using the **Azure CLI**, see [Create a C# function in Azure from the command line](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/how-to-create-function-azure-cli.md?pivots=programming-language-csharp#deploy-the-function-project-to-azure).

Once the process of publishing the function completes, you can use this Azure CLI command to verify the publish was successful. There are placeholders for your resource group, the name of your function app, and the name of your specific function. The command prints information about your function.

```azurecli-interactive
az functionapp function show --resource-group <your-resource-group> --name <your-function-app> --function-name <your-function>
```

### Configure the function app

Before your function can access Azure Digital Twins, it needs some information about the instance and permission to access it. In this section, you assign an access role for the function and configure the application settings so that it can find and access the instance.


Run the following commands in [Azure Cloud Shell](https://shell.azure.com) or a [local Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli).


>**Note:**
> An Azure user who has permissions to manage user access to Azure resources, including granting and delegating permissions, must complete this section. Common roles that meet this requirement are **Owner**, **Account admin**, or the combination of **User Access Administrator** and **Contributor**. For more information about permission requirements for Azure Digital Twins roles, see [Set up an instance and authentication](how-to-set-up-instance-portal.md#prerequisites-permission-requirements).


#### Assign an access role

The Azure function requires a bearer token to be passed to it. To make sure the bearer token is passed, grant the function app the **Azure Digital Twins Data Owner** role for your Azure Digital Twins instance, which gives the function app permission to perform data plane activities on the instance.

1. Use the following command to create a [system-managed identity](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/overview.md) for your function (if the function already has one, this command prints its details). Take note of the `principalId` field in the output. You'll use this ID to refer to the function so that you can grant it permissions in the next step.

    ```azurecli-interactive	
    az functionapp identity assign --resource-group <your-resource-group> --name <your-function-app-name>	
    ```

1. Use the `principalId` value in the following command to give the function the **Azure Digital Twins Data Owner** role for your Azure Digital Twins instance.

    ```azurecli-interactive	
    az dt role-assignment create --dt-name <your-Azure-Digital-Twins-instance> --assignee "<principal-ID>" --role "Azure Digital Twins Data Owner"
    ```

#### Configure application settings

Next, make the URL of your Azure Digital Twins instance accessible to your function by setting an [environment variable](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-how-to-use-azure-function-app-settings.md?tabs=portal#use-application-settings) for it.

> **Tip:**
> The Azure Digital Twins instance's URL is made by adding *https://* to the beginning of your instance's host name. To see the host name, along with all the properties of your instance, run `az dt show --dt-name <your-Azure-Digital-Twins-instance>`.

The following command sets an environment variable for your instance's URL that your function uses whenever it needs to access the instance.

```azurecli-interactive	
az functionapp config appsettings set --resource-group <your-resource-group> --name <your-function-app-name> --settings "ADT_SERVICE_URL=https://<your-Azure-Digital-Twins-instance-host-name>"
```

## Connect the function to the endpoint

Next, subscribe your Azure function to the Event Grid endpoint you created earlier. Doing so ensures that data can flow from an updated twin through the Event Grid topic to the function, which can use the event information to update other twins as needed.

To subscribe your Azure function, you create an *Event Grid subscription* that sends data from the Event Grid topic that you created earlier to your Azure function.

Use the following CLI command, filling in placeholders for your subscription ID, resource group, function app, and function name.

```azurecli-interactive
az eventgrid event-subscription create --name <name-for-your-event-subscription> --source-resource-id /subscriptions/<subscription-ID>/resourceGroups/<your-resource-group>/providers/Microsoft.EventGrid/topics/<your-event-grid-topic> --endpoint-type azurefunction --endpoint /subscriptions/<subscription-ID>/resourceGroups/<your-resource-group>/providers/Microsoft.Web/sites/<your-function-app-name>/functions/<function-name> 
```

Now, your function can receive events through your Event Grid topic. The data flow setup is complete.

## Test and verify results

The last step is to verify that the flow is working, by updating a twin and checking that related twins are updated according to the logic in your Azure function.

To kick off the process, update the twin that's the source of the event flow. You can use the [Azure CLI](https://learn.microsoft.com/cli/azure/dt/twin#az-dt-twin-update), [Azure Digital Twins SDK](how-to-manage-twin.md#update-a-digital-twin), or [Azure Digital Twins REST APIs](how-to-use-apis.md?tabs=data-plane) to make the update.

Next, query your Azure Digital Twins instance for the related twin. You can use the [Azure CLI](https://learn.microsoft.com/cli/azure/dt/twin#az-dt-twin-query), or the [Azure Digital Twins REST APIs and SDK](how-to-query-graph.md#run-queries-with-the-api). Verify that the twin received the data and updated as expected.

## Next steps

In this article, you set up twin-to-twin event handling in Azure Digital Twins. Next, set up an Azure function to trigger this flow automatically based on incoming telemetry from IoT Hub devices: [Ingest telemetry from IoT Hub](how-to-ingest-iot-hub-data.md).
