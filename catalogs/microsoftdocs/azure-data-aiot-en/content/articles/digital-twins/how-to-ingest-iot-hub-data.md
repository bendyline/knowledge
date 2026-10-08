---
title: Ingest telemetry from IoT Hub
titleSuffix: Azure Digital Twins
description: Learn how to ingest device telemetry messages from Azure IoT Hub to digital twins in an instance of Azure Digital Twins.
author: baanders
ms.author: baanders
ms.date: 03/13/2025
ms.topic: how-to
ms.service: azure-digital-twins
ms.custom: devx-track-azurecli
---

# Ingest IoT Hub telemetry into Azure Digital Twins

This guide walks through the process of writing a function that can ingest device telemetry from IoT Hub and send it to an instance of Azure Digital Twins.

Azure Digital Twins is driven with data from IoT devices and other sources. A common source for device data to use in Azure Digital Twins is [IoT Hub](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/about-iot-hub.md).

The process for ingesting data into Azure Digital Twins is to set up an external compute resource, such as a function that's made by using [Azure Functions](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-overview.md). The function receives the data and uses the [DigitalTwins APIs](https://learn.microsoft.com/rest/api/digital-twins/dataplane/twins) to set properties or fire telemetry events on [digital twins](concepts-twins-graph.md) accordingly. 

This how-to document walks through the process for writing a function that can ingest device telemetry from IoT Hub.

## Prerequisites

Before continuing with this example, you need to set up the following resources as prerequisites:
* An IoT hub. For instructions, see the [Create an IoT Hub section of this IoT Hub quickstart](../iot-hub/quickstart-send-telemetry-cli.md).
* An Azure Digital Twins instance that receives your device telemetry. For instructions, see [Set up an Azure Digital Twins instance and authentication](how-to-set-up-instance-portal.md).

## Example telemetry scenario

This how-to outlines how to send messages from IoT Hub to Azure Digital Twins, using a function in Azure. There are many possible configurations and matching strategies you can use for sending messages, but the example for this article contains the following parts:
* A thermostat device in IoT Hub, with a known device ID
* A digital twin to represent the device, with a matching ID

> **Note:**
> This example uses a straightforward ID match between the device ID and a corresponding digital twin's ID, but it's possible to provide more sophisticated mappings from the device to its twin (such as with a mapping table).

Whenever the thermostat device sends a temperature telemetry event, a function processes the telemetry and the `Temperature` property of the digital twin should update. This scenario is outlined in the following diagram:

Diagram of IoT Hub device sending Temperature telemetry to a function in Azure, which updates a Temperature property on a twin in Azure Digital Twins.

## Add a model and twin

In this section, you set up a [digital twin](concepts-twins-graph.md) in Azure Digital Twins that represents the thermostat device and is updated with information from IoT Hub.

To create a thermostat-type twin, you first need to upload the thermostat [model](concepts-models.md) to your instance, which describes the properties of a thermostat and is used later to create the twin.


The model looks like this:
[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/models/Thermostat.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-ingest-iot-hub-data.md)

To upload this model to your twins instance, run the following Azure CLI command, which uploads the previous model as inline JSON. You can run the command in [Azure Cloud Shell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cloud-shell/overview.md) in your browser (use the Bash environment), or on your machine if you have the [CLI installed locally](https://learn.microsoft.com/cli/azure/install-azure-cli). There's one placeholder for the instance's host name (you can also use the instance's friendly name with a slight decrease in performance).

```azurecli-interactive
az dt model create --dt-name <instance-hostname-or-name> --models '{  "@id": "dtmi:contosocom:DigitalTwins:Thermostat;1",  "@type": "Interface",  "@context": "dtmi:dtdl:context;3",  "contents": [    {      "@type": "Property",      "name": "Temperature",      "schema": "double"    }  ]}' 
```

>**Note:**
>If you're using anything other than Cloud Shell in the Bash environment, you might need to escape certain characters in the inline JSON so that it parses correctly. For more information, see [Use special characters in different shells](concepts-cli.md#use-special-characters-in-different-shells).

You then need to create one twin using this model. Use the following command to create a thermostat twin named thermostat67, and set 0.0 as an initial temperature value. There's one placeholder for the instance's host name (you can also use the instance's friendly name with a slight decrease in performance).

```azurecli-interactive
az dt twin create  --dt-name <instance-hostname-or-name> --dtmi "dtmi:contosocom:DigitalTwins:Thermostat;1" --twin-id thermostat67 --properties '{"Temperature": 0.0}'
```

When the twin is created successfully, the CLI output from the command should look something like this:
```json
{
  "$dtId": "thermostat67",
  "$etag": "W/\"0000000-9735-4f41-98d5-90d68e673e15\"",
  "$metadata": {
    "$model": "dtmi:contosocom:DigitalTwins:Thermostat;1",
    "Temperature": {
      "lastUpdateTime": "2021-09-09T20:32:46.6692326Z"
    }
  },
  "Temperature": 0.0
}
```

## Create the Azure function

In this section, you create an Azure function to access Azure Digital Twins and update twins based on IoT device telemetry events that it receives. Perform the following steps to create and publish the function.

1. First, create a new Azure Functions project of Event Grid trigger type. 

    You can do this using **Visual Studio** (for instructions, see [Develop Azure Functions using Visual Studio](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-develop-vs.md#create-an-azure-functions-project)), **Visual Studio Code** (for instructions, see [Create a C# function in Azure using Visual Studio Code](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/how-to-create-function-vs-code.md?pivot=programming-language-csharp?tabs=in-process#create-an-azure-functions-project)), or the **Azure CLI** (for instructions, see [Create a C# function in Azure from the command line](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/how-to-create-function-azure-cli.md?pivots=programming-language-csharp#create-a-local-code-project-and-function)).

2. Add the following packages to your project (you can use the Visual Studio NuGet package manager, or the [dotnet add package](https://learn.microsoft.com/dotnet/core/tools/dotnet-add-package) command in a command-line tool).
    * [Azure.DigitalTwins.Core](https://www.nuget.org/packages/Azure.DigitalTwins.Core/)
    * [Azure.Identity](https://www.nuget.org/packages/Azure.Identity/)
    * [Microsoft.Azure.WebJobs.Extensions.EventGrid](https://www.nuget.org/packages/Microsoft.Azure.WebJobs.Extensions.EventGrid/)

3. Create a function within the project called *IoTHubtoTwins.cs*. Paste the following code into the function file:

    [Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/IoTHubToTwins.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-ingest-iot-hub-data.md)

    Save your function code.

4. Publish the project with the *IoTHubtoTwins.cs* function to a function app in Azure. 
    
    For instructions on how to publish the function using **Visual Studio**, see [Develop Azure Functions using Visual Studio](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-develop-vs.md#publish-to-azure). For instructions on how to publish the function using **Visual Studio Code**, see [Create a C# function in Azure using Visual Studio Code](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/how-to-create-function-vs-code.md?pivot=programming-language-csharp?tabs=in-process#create-the-function-app-in-azure). For instructions on how to publish the function using the **Azure CLI**, see [Create a C# function in Azure from the command line](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/how-to-create-function-azure-cli.md?pivots=programming-language-csharp#deploy-the-function-project-to-azure).

Once the process of publishing the function completes, you can use this Azure CLI command to verify the publish was successful. There are placeholders for your resource group, and the name of your function app. The command prints information about the *IoTHubToTwins* function.

```azurecli-interactive
az functionapp function show --resource-group <your-resource-group> --name <your-function-app> --function-name IoTHubToTwins
```

### Configure the function app

To access Azure Digital Twins, your function app needs a [system-assigned managed identity](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/overview.md#managed-identity-types) with permissions to access your Azure Digital Twins instance. You set that up in this section, by assigning an access role for the function and configuring the application settings so that it can access your Azure Digital Twins instance.


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

## Connect the function to IoT Hub

In this section, you set up your function as an event destination for the IoT hub device data. Setting up your function in this manner might ensure that the data from the thermostat device in IoT Hub is sent to the Azure function for processing.

Use the following CLI command to create an event subscription that the IoT Hub uses to send event data to the *IoTHubtoTwins* function. There's a placeholder for you to enter a name for the event subscription, and there are also placeholders for you to enter your subscription ID, resource group, IoT hub name, and the name of your function app.

```azurecli-interactive
az eventgrid event-subscription create --name <name-for-hub-event-subscription> --event-delivery-schema eventgridschema --source-resource-id /subscriptions/<your-subscription-ID>/resourceGroups/<your-resource-group>/providers/Microsoft.Devices/IotHubs/<your-IoT-hub> --included-event-types Microsoft.Devices.DeviceTelemetry --endpoint-type azurefunction --endpoint /subscriptions/<your-subscription-ID>/resourceGroups/<your-resource-group>/providers/Microsoft.Web/sites/<your-function-app>/functions/IoTHubtoTwins
```

The output shows information about the newly created event subscription. You can confirm that the operation completed successfully by verifying the `provisioningState` value in the result:

```azurecli
"provisioningState": "Succeeded",
```

## Test with simulated IoT data

You can test your new ingress function by using the device simulator from [Connect an end-to-end solution](tutorial-end-to-end.md). The *DeviceSimulator* project contains a simulated thermostat device that sends sample temperature data. To set up the device simulator, follow these steps:

1. Navigate to the [Azure Digital Twins end-to-end sample project repository](https://learn.microsoft.com/samples/azure-samples/digital-twins-samples/digital-twins-samples). Get the sample project on your machine by selecting the **Browse code** button underneath the title. This button takes you to the GitHub repo for the samples, which you can download as a .zip by selecting the **Code** button followed by **Download ZIP**.

      This selection downloads a .zip folder to your machine as *digital-twins-samples-main.zip*. Unzip the folder and extract the files. After the files are extracted, you use the *DeviceSimulator* project folder.
1. [Register the simulated device with IoT Hub](tutorial-end-to-end.md#register-the-simulated-device-with-iot-hub)
2. [Configure and run the simulation](tutorial-end-to-end.md#configure-and-run-the-simulation)

After completing these steps, you should have a project console window running and sending simulated device telemetry data to your IoT hub.

Screenshot of the output from the device simulator project.

### Validate results

While running the device simulator in a console window as previously shown, the temperature value of your thermostat digital twin changes. In the Azure CLI, run the following command to see the temperature value. There's one placeholder for the instance's host name (you can also use the instance's friendly name with a slight decrease in performance).

```azurecli-interactive
az dt twin query --query-command "SELECT * FROM digitaltwins WHERE \$dtId = 'thermostat67'" --dt-name <instance-hostname-or-name>
```

>**Note:**
>If you're using anything other than Cloud Shell in the Bash environment, you might need to escape the `$` character in the query differently so that it parses correctly. For more information, see [Use special characters in different shells](concepts-cli.md#use-special-characters-in-different-shells).

Your output should show the details of the thermostat67 twin, including a temperature value, like this:

```json
{
  "result": [
    {
      "$dtId": "thermostat67",
      "$etag": "W/\"dbf2fea8-d3f7-42d0-8037-83730dc2afc5\"",
      "$metadata": {
        "$model": "dtmi:contosocom:DigitalTwins:Thermostat;1",
        "Temperature": {
          "lastUpdateTime": "2021-06-03T17:05:52.0062638Z"
        }
      },
      "Temperature": 70.20518558807913
    }
  ]
}
```

To see the `Temperature` value change, repeatedly run the previous query command.

## Next steps

Read about data ingress and egress with Azure Digital Twins:
* [Data ingress and egress](concepts-data-ingress-egress.md)
