---
title: 'Tutorial: Connect an end-to-end solution'
titleSuffix: Azure Digital Twins
description: Follow this tutorial to learn how to build out an end-to-end Azure Digital Twins solution that's driven by device data.
author: baanders
ms.author: baanders
ms.date: 02/20/2025
ms.topic: tutorial
ms.service: azure-digital-twins
ms.custom: engagement-fy23, devx-track-azurecli

# CustomerIntent: As a developer, I want to create a data flow from devices through Azure Digital Twins so that I can have a connected digital twin solution.
# Optional fields. Don't forget to remove # if you need a field.
# ms.custom: can-be-multiple-comma-separated
# manager: MSFT-alias-of-manager-or-PM-counterpart
---

# Tutorial: Build out an end-to-end solution

This Azure Digital Twins tutorial describes how to build out an end-to-end solution that demonstrates the functionality of the service. To set up a full end-to-end solution driven by live data from your environment, you can connect your Azure Digital Twins instance to other Azure services for management of devices and data.

In this tutorial, you will...
> 
> * Set up an Azure Digital Twins instance
> * Learn about the sample building scenario and instantiate the pre-written components
> * Use an [Azure Functions](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-overview.md) app to route simulated device data from an [IoT Hub](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/about-iot-hub.md) device into digital twin properties
> * Propagate changes through the twin graph by processing digital twin notifications with Azure Functions, endpoints, and routes


## Prerequisites

Before beginning this tutorial, start with these prerequisites:
* If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.
* This tutorial uses .NET. You can download the latest version of the .NET SDK for multiple platforms from [Download .NET](https://dotnet.microsoft.com/download).

Then, continue through the rest of this section to set up the remaining prerequisites.

### Get sample resources

The tutorial is driven by an [Azure Digital Twins end-to-end sample project written in C#](https://learn.microsoft.com/samples/azure-samples/digital-twins-samples/digital-twins-samples). Get the sample project on your machine by navigating to the sample link, and selecting the **Browse code** button underneath the title. 

This action takes you to the GitHub repo for the samples, which you can download as a .zip by selecting the **Code** button followed by **Download ZIP**.

Screenshot of the digital-twins-samples repo on GitHub, highlighting the steps to download it as a zip.

This action downloads a .zip folder to your machine as *digital-twins-samples-main.zip*. Unzip the folder and extract the files.

### Prepare an Azure Digital Twins instance


To work with Azure Digital Twins in this article, you need an Azure Digital Twins instance and the required permissions for using it. If you already have an Azure Digital Twins instance set up, you can use that instance and skip to the next section. Otherwise, follow the instructions in [Set up an instance and authentication](how-to-set-up-instance-portal.md). The instructions contain information to help you verify that you completed each step successfully.

After you set up your instance, make a note of the instance's host name. You can [find the host name in the Azure portal](how-to-set-up-instance-portal.md#verify-success-and-collect-important-values).



[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-h3.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/tutorial-end-to-end.md)


### Set up CLI session

To start working with Azure Digital Twins in the CLI, the first thing to do is sign in and set the CLI context to your subscription for this session. Run these commands in your CLI window:

```azurecli-interactive
az login
az account set --subscription "<your-Azure-subscription-ID>"
```

> **Tip:**
> You can also use your subscription name instead of the ID in the previous command. 

If you're using this subscription with Azure Digital Twins for the first time, run the following command to register with the Azure Digital Twins namespace. (If you're not sure, it's ok to run it again even if you ran it sometime in the past.)

```azurecli-interactive
az provider register --namespace 'Microsoft.DigitalTwins'
```

Next you add the [Microsoft Azure IoT Extension for Azure CLI](https://learn.microsoft.com/cli/azure/service-page/azure%20iot?view=azure-cli-latest\&preserve-view=true), to enable commands for interacting with Azure Digital Twins and other IoT services. Run this command to make sure you have the latest version of the extension:

```azurecli-interactive
az extension add --upgrade --name azure-iot
```

Now you're ready to work with Azure Digital Twins in the Azure CLI.

You can verify this status by running `az dt --help` at any time to see a list of the top-level Azure Digital Twins commands that are available.


## Configure the sample project

Next, set up a sample client application that will interact with your Azure Digital Twins instance.

Navigate on your machine to the folder you downloaded earlier from [Azure Digital Twins end-to-end samples](https://learn.microsoft.com/samples/azure-samples/digital-twins-samples/digital-twins-samples) (and unzip it if you haven't already).

Once inside the folder, navigate into *digital-twins-samples-main\AdtSampleApp\SampleClientApp* and open the *appsettings.json* file. This JSON file contains a configuration variable that's necessary to run the project.

In the file body, change the `instanceUrl` to your Azure Digital Twins instance host name URL (by adding *https://* in front of the host name, as shown below).

```json
{
  "instanceUrl": "https://<your-Azure-Digital-Twins-instance-host-name>"
}
```

Save and close the file. 


### Set up local Azure credentials

This sample uses [DefaultAzureCredential](https://learn.microsoft.com/dotnet/api/azure.identity.defaultazurecredential?view=azure-dotnet\&preserve-view=true) (part of the `Azure.Identity` library) to authenticate with the Azure Digital Twins instance when you run the sample on your local machine. `DefaultAzureCredential` is one of many authentication options. For more information about the different ways a client app can authenticate with Azure Digital Twins, see [Write app authentication code](how-to-authenticate-client.md).


With `DefaultAzureCredential`, the sample searches for credentials in your local environment, like an Azure sign-in in a local [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) or in Visual Studio or Visual Studio Code. For this reason, you should *sign in to Azure locally* through one of these mechanisms to set up credentials for the sample.

If you're using Visual Studio or Visual Studio Code to run code samples, make sure you're [signed in to that editor](https://learn.microsoft.com/visualstudio/ide/signing-in-to-visual-studio) with the same Azure credentials that you want to use to access your Azure Digital Twins instance. If you're using a local CLI window, run the `az login` command to sign in to your Azure account. Once you're signed in, your code sample authenticates you automatically when it runs. 


## Get started with the building scenario

The sample project used in this tutorial represents a real-world building scenario, containing a floor, a room, and a thermostat device. These components are digitally represented in an Azure Digital Twins instance, which is connected to [IoT Hub](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/about-iot-hub.md), [Event Grid](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/overview.md), and two [Azure functions](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-overview.md) to enable movement of data.

The following diagram represents the full scenario. 

You first create the Azure Digital Twins instance (**section A** in the diagram), then set up the device data flow into the digital twins (**arrow B**), and then set up the data propagation through the twin graph (**arrow C**).

Diagram of the full building scenario, which shows the data flowing from a device into and out of Azure Digital Twins through various Azure services.

To work through the scenario, you interact with components of the prewritten sample app you downloaded previously.

Here are the components implemented by the building scenario AdtSampleApp sample app:
* Device authentication 
* [.NET (C#) SDK](https://learn.microsoft.com/dotnet/api/overview/azure/digitaltwins.core-readme) usage examples (found in *CommandLoop.cs*)
* Console interface to call the Azure Digital Twins API
* SampleClientApp - A sample Azure Digital Twins solution
* SampleFunctionsApp - An Azure Functions app that updates your Azure Digital Twins graph based on device data from IoT Hub and Azure Digital Twins events

### Instantiate the pre-created twin graph

First, you use the AdtSampleApp solution from the sample project to build the Azure Digital Twins piece of the end-to-end scenario (**section A**):

Diagram of an excerpt from the full building scenario diagram highlighting the Azure Digital Twins instance section.

Open a local **console window** and navigate into the *digital-twins-samples-main\AdtSampleApp\SampleClientApp* folder. Run the *SampleClientApp* project with this dotnet command:

```cmd/sh
dotnet run
```

The project starts running, carries out authentication, and waits for a command. In this console, run the next command to instantiate the sample Azure Digital Twins solution.

> **Important:**
> If you already have digital twins and relationships in your Azure Digital Twins instance, running this command deletes them and replaces them with the twins and relationships for the sample scenario.

```cmd/sh
SetupBuildingScenario
```

The output of this command is a series of confirmation messages as three [digital twins](concepts-twins-graph.md) are created and connected in your Azure Digital Twins instance: a floor named floor1, a room named room21, and a temperature sensor named thermostat67. These digital twins represent the entities that would exist in a real-world environment.

They're connected via relationships into the following [twin graph](concepts-twins-graph.md). The twin graph represents the environment as a whole, including how the entities interact with and relate to each other.

Diagram showing that floor1 contains room21, and room21 contains thermostat67.

You can verify the twins that were created by running the following command, which queries the connected Azure Digital Twins instance for all the digital twins it contains:

```cmd/sh
Query
```

You can now stop running the project. Keep the console window open at this location, though, as you use this app again later in the tutorial.

## Set up the sample function app

The next step is setting up an [Azure Functions app](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-overview.md) that will be used throughout this tutorial to process data. The function app, SampleFunctionsApp, contains two functions:
* *ProcessHubToDTEvents*: processes incoming IoT Hub data and updates Azure Digital Twins accordingly
* *ProcessDTRoutedData*: processes data from digital twins, and updates the parent twins in Azure Digital Twins accordingly

In this section, you publish the prewritten function app, and ensure the function app can access Azure Digital Twins by assigning it a Microsoft Entra identity.

The function app is part of the sample project you downloaded, located in the *digital-twins-samples-main\AdtSampleApp\SampleFunctionsApp* folder.

### Publish the app

To publish the function app to Azure, you need to create a storage account, then create the function app in Azure, and finally publish the functions to the Azure function app. This section completes these actions using the Azure CLI. In each command, replace any placeholders in angle brackets with the details for your own resources.

1. Create an Azure storage account by running the following command:

    ```azurecli-interactive
    az storage account create --name <name-for-new-storage-account> --location <location> --resource-group <resource-group> --sku Standard_LRS
    ```

1. Create an Azure function app by running the following command:

    ```azurecli-interactive
    az functionapp create --name <name-for-new-function-app> --storage-account <name-of-storage-account-from-previous-step> --functions-version 4 --consumption-plan-location <location> --runtime dotnet-isolated --resource-group <resource-group>
    ```

1. Next, you zip up the functions and publish them to your new Azure function app.

    1. Open a console window on your machine (if you're using the local Azure CLI, it can be the same window) and navigate into the *digital-twins-samples-main\AdtSampleApp\SampleFunctionsApp* folder inside your downloaded sample project.
    
    1. In the console, run the following command to publish the project locally:

        ```cmd/sh
        dotnet publish -c Release -o publish
        ```

        This command publishes the project to the *digital-twins-samples-main\AdtSampleApp\SampleFunctionsApp\publish* directory.

    1. Using your preferred method, create a zip of the published files that are located **inside** the *digital-twins-samples-main\AdtSampleApp\SampleFunctionsApp\publish* directory. Name the zipped folder *publish.zip*.
        
        >**Important:** 
        >Make sure the zipped folder doesn't include an extra layer for the *publish* folder itself. It should only contain the contents that were inside the *publish* folder.

        Here's an image of how the zip contents might look (it might change depending on your version of .NET).

        Screenshot of File Explorer in Windows showing the contents of the publish zip folder.

    The last step is done in the Azure CLI.

1. In the Azure CLI, run the following command to deploy the published and zipped functions to your Azure function app:

    ```azurecli-interactive
    az functionapp deployment source config-zip --resource-group <resource-group> --name <name-of-your-function-app> --src "<full-path-to-publish.zip>"
    ```

    > **Tip:**
    > If you're using the Azure CLI locally, you can access the ZIP file on your computer directly using its path on your machine.
    > 
    >If you're using the Azure Cloud Shell, upload the ZIP file to Cloud Shell with this button before running the command:
    >
    > Screenshot of the Azure Cloud Shell highlighting how to upload files.
    >
    > In this case, the file is uploaded to the root directory of your Cloud Shell storage, so you can refer to the file directly by its name for the `--src` parameter of the command (as in, `--src publish.zip`).

    A successful deployment responds with status code 202 and output a JSON object containing details of your new function. You can confirm the deployment succeeded by looking for this field in the result:

    ```json
    "provisioningState": "Succeeded",
    ```

The functions should now be published to a function app in Azure. You can use the following CLI commands to verify both functions were published successfully. Each command has placeholders for your resource group and the name of your function app. The commands print information about the *ProcessDTRoutedData* and *ProcessHubToDTEvents* functions that you published.

```azurecli-interactive
az functionapp function show --resource-group <your-resource-group> --name <your-function-app> --function-name ProcessDTRoutedData
az functionapp function show --resource-group <your-resource-group> --name <your-function-app> --function-name ProcessHubToDTEvents
```

Next, your function app needs to have the right permission to access your Azure Digital Twins instance. You configure this access in the next section.

### Configure permissions for the function app

There are two settings that need to be set for the function app to access your Azure Digital Twins instance, both of which can be done using the Azure CLI. 

#### Assign access role

The first setting gives the function app the **Azure Digital Twins Data Owner** role in the Azure Digital Twins instance. This role is required for any user or function that wants to perform many data plane activities on the instance. You can read more about security and role assignments in [Security for Azure Digital Twins solutions](concepts-security.md). 

1. Use the following command to create a [system-assigned identity](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/overview.md#managed-identity-types) for the function. The output displays details of the system-assigned identity. Take note of the **principalId** field in the output to use in the next step.

    ```azurecli-interactive	
    az functionapp identity assign --resource-group <your-resource-group> --name <your-function-app-name>
    ```

1. Use the **principalId** value in the following command to assign the function app's identity to the **Azure Digital Twins Data Owner** role for your Azure Digital Twins instance.

    ```azurecli-interactive	
    az dt role-assignment create --resource-group <your-resource-group> --dt-name <your-Azure-Digital-Twins-instance> --assignee "<principal-ID>" --role "Azure Digital Twins Data Owner"
    ```

The result of this command is outputted information about the role assignment that you created. The function app now has permissions to access data in your Azure Digital Twins instance.

#### Configure application setting

The second setting creates an environment variable for the function with the URL of your Azure Digital Twins instance. The function code uses the value of this variable to refer to your instance. For more information about environment variables, see [Manage your function app](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-how-to-use-azure-function-app-settings.md?tabs=portal). 

Run the following command, filling in the placeholders with the details of your resources.

```azurecli-interactive
az functionapp config appsettings set --resource-group <your-resource-group> --name <your-function-app-name> --settings "ADT_SERVICE_URL=https://<your-Azure-Digital-Twins-instance-host-name>"
```

The output is the list of settings for the Azure Function, which should now contain an entry called `ADT_SERVICE_URL`.

## Process simulated device data from an IoT Hub device

Typically, device data from real devices drives an Azure Digital Twins graph. 

In this step, you connect a simulated thermostat device registered in [IoT Hub](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/about-iot-hub.md) to the digital twin that represents it in Azure Digital Twins. As the simulated device emits data, the data is directed through the *ProcessHubToDTEvents* Azure function that triggers a corresponding update in the digital twin. In this way, the digital twin stays up to date with the real device's data. In Azure Digital Twins, the process of directing events data from one place to another is called [routing events](concepts-route-events.md).

Processing the simulated device data happens in this part of the end-to-end scenario (**arrow B**):

Diagram of an excerpt from the full building scenario diagram highlighting the section that shows elements before Azure Digital Twins.

Here are the actions that you perform to set up this device connection:
1. Create an IoT hub that manages the simulated device
2. Connect the IoT hub to the appropriate Azure function by setting up an event subscription
3. Register the simulated device in IoT hub
4. Run the simulated device and generate device data
5. Query Azure Digital Twins to see the live results

### Create an IoT Hub instance

Azure Digital Twins is designed to work alongside [IoT Hub](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/about-iot-hub.md), an Azure service for managing devices and their data. In this step, you set up an IoT hub that manages the sample device in this tutorial.

In the Azure CLI, use this command to create a new IoT hub:

```azurecli-interactive
az iot hub create --name <name-for-your-IoT-hub> --resource-group <your-resource-group> --sku S1
```

The output of this command is information about the IoT hub that was created.

Save the **name** of your IoT hub to use later.

### Connect the IoT hub to the Azure function

Next, connect your IoT hub to the *ProcessHubToDTEvents* Azure function in the function app you published earlier. This connection lets data flow from the device in IoT Hub through the function, which updates Azure Digital Twins.

To do so, you create an *event subscription* on your IoT Hub, with the Azure function as an endpoint. This "subscribes" the function to events happening in IoT Hub.

Use the following CLI command to create the event subscription. There's a placeholder for you to enter a name for the event subscription, and there are also placeholders for you to enter your subscription ID, resource group, IoT hub name, and the name of your function app.

```azurecli-interactive
az eventgrid event-subscription create --name <name-for-hub-event-subscription> --event-delivery-schema eventgridschema --source-resource-id /subscriptions/<your-subscription-ID>/resourceGroups/<your-resource-group>/providers/Microsoft.Devices/IotHubs/<your-IoT-hub> --included-event-types Microsoft.Devices.DeviceTelemetry --endpoint-type azurefunction --endpoint /subscriptions/<your-subscription-ID>/resourceGroups/<your-resource-group>/providers/Microsoft.Web/sites/<your-function-app>/functions/ProcessHubToDTEvents
```

The output shows information about the event subscription that you created. You can confirm that the operation completed successfully by verifying the `provisioningState` value in the result:

```azurecli
"provisioningState": "Succeeded",
```

>**Tip:**
>If the command returns a resource provider error, add *Microsoft.EventGrid* as a resource provider to your subscription. You can use the Azure portal to add this resource provider to your subscription by following the instructions in [Register resource provider](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/resource-providers-and-types.md#register-resource-provider-1).

### Register the simulated device with IoT Hub 

This section creates a device representation in IoT Hub with the ID thermostat67. The simulated device connects to this representation, which is how device data flows from the device into IoT Hub. The IoT hub is where the subscribed Azure function from the previous step is listening, ready to pick up the events and continue processing.

In the Azure CLI, create a device in IoT Hub with the following command:

```azurecli-interactive
az iot hub device-identity create --device-id thermostat67 --hub-name <your-IoT-hub-name> --resource-group <your-resource-group>
```

The output is information about the device that was created.

### Configure and run the simulation


>**Important:**
>This article includes steps to connect a device using a shared access signature, also called symmetric key authentication. This authentication method is convenient for testing and evaluation, but authenticating a device using X.509 certificates is a more secure approach. To learn more, see [Security best practices for IoT solutions > Connection security](../iot/iot-overview-security.md#connection-security).


Next, configure the device simulator to send data to your IoT Hub instance.

Begin by getting the IoT hub connection string with the following command. The connection string value starts with `HostName=`.

```azurecli-interactive
az iot hub connection-string show --hub-name <your-IoT-hub-name>
```

Then, get the device connection string with this command:

```azurecli-interactive
az iot hub device-identity connection-string show --device-id thermostat67 --hub-name <your-IoT-hub-name>
```

Next, plug these values into the device simulator code in your local project to connect the simulator into this IoT hub and IoT hub device.

Navigate on your local machine to the downloaded sample folder, and into the *digital-twins-samples-main\DeviceSimulator\DeviceSimulator* folder. Open the *AzureIoTHub.cs* file for editing. Change the following connection string values to the values you previously gathered:

```csharp
private const string iotHubConnectionString = "<your-hub-connection-string>";
//...
private const string deviceConnectionString = "<your-device-connection-string>";
```

Save the file.

Now, to see the results of the data simulation that you set up, open a new local console window and navigate to *digital-twins-samples-main\DeviceSimulator\DeviceSimulator*.

>**Note:**
> You should now have two open console windows: one that's open to the *DeviceSimulator\DeviceSimulator* folder, and one from earlier that's still open to the *AdtSampleApp\SampleClientApp* folder.

Use the following dotnet command to run the device simulator project:

```cmd/sh
dotnet run
```

The project starts running and begins displaying simulated temperature device data messages. These messages are being sent to IoT Hub, where they're then picked up and processed by the Azure function.

Screenshot of the console output of the device simulator showing temperature device data being sent.

You don't need to do anything else in this console, but leave it running while you complete the next steps.

### See the results in Azure Digital Twins

The *ProcessHubToDTEvents* function you published earlier listens to the IoT Hub data, and calls an Azure Digital Twins API to update the `Temperature` property on the thermostat67 twin.

To see the data from the Azure Digital Twins side, switch to your other console window that's open to the *AdtSampleApp\SampleClientApp* folder. Run the *SampleClientApp* project with `dotnet run`.

```cmd/sh
dotnet run
```

Once the project is running and accepting commands, run the following command to get the temperatures reported by the digital twin thermostat67:

```cmd/sh
ObserveProperties thermostat67 Temperature
```

You should see the live updated temperatures from your Azure Digital Twins instance being logged to the console every two seconds. They should reflect the values that the data simulator is generating (you can place the console windows side-by-side to verify that the values coordinate).

>**Note:**
> It might take a few seconds for the data from the device to propagate through to the twin. The first few temperature readings might show as 0 before data begins to arrive.

Screenshot of the console output showing log of temperature messages from digital twin thermostat67.

Once you verify that the live temperature logging is working successfully, you can stop running both projects. Keep the console windows open, as you use them again later in the tutorial.

## Propagate Azure Digital Twins events through the graph

So far in this tutorial, you see how Azure Digital Twins can be updated from external device data. Next, you see how changes to one digital twin can propagate through the Azure Digital Twins graph—in other words, how to update twins from service-internal data.

To do so, you use the *ProcessDTRoutedData* Azure function to update a Room twin when the connected Thermostat twin is updated. The update functionality happens in this part of the end-to-end scenario (**arrow C**):

Diagram of an excerpt from the full building scenario diagram highlighting the section that shows the elements after Azure Digital Twins.

Here are the actions you perform to set up this data flow:
1. [Create an Event Grid topic](#create-the-event-grid-topic) to enable movement of data between Azure services
1. [Create an endpoint](#create-the-endpoint) in Azure Digital Twins that connects the instance to the Event Grid topic
1. [Set up a route](#create-the-route) within Azure Digital Twins that sends twin property change events to the endpoint
1. [Set up an Azure function](#connect-the-azure-function) that listens on the Event Grid topic at the endpoint, receives the twin property change events that are sent there, and updates other twins in the graph accordingly


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

### Connect the Azure function

Next, subscribe the *ProcessDTRoutedData* Azure function to the Event Grid topic you previously created. This subscription allows simulated device data to flow from the thermostat67 twin through the Event Grid topic to the function, which goes back into Azure Digital Twins and updates the room21 twin accordingly.

To do so, you create an Event Grid subscription that sends data from the Event Grid topic that you created earlier to your *ProcessDTRoutedData* Azure function.

Use the following CLI command to create the event subscription. There's a placeholder for you to enter a name for this event subscription, and there are also placeholders for you to enter your subscription ID, resource group, the name of your Event Grid topic, and the name of your function app.

```azurecli-interactive
az eventgrid event-subscription create --name <name-for-topic-event-subscription> --event-delivery-schema eventgridschema --source-resource-id /subscriptions/<your-subscription-ID>/resourceGroups/<your-resource-group>/providers/Microsoft.EventGrid/topics/<your-event-grid-topic> --endpoint-type azurefunction --endpoint /subscriptions/<your-subscription-ID>/resourceGroups/<your-resource-group>/providers/Microsoft.Web/sites/<your-function-app>/functions/ProcessDTRoutedData
```

## Run the simulation and see the results

Now, events should have the capability to flow from the simulated device into Azure Digital Twins, and through the Azure Digital Twins graph to update twins as appropriate. In this section, you run the device simulator again to kick off the full event flow you set up, and query Azure Digital Twins to see the live results

Go to your console window that's open to the *DeviceSimulator\DeviceSimulator* folder, and run the device simulator project with `dotnet run`.

Like the first time that you ran the device simulator, the project starts running and displays simulated temperature device data messages. These events are going through the flow you set up earlier to update the thermostat67 twin, and then going through the flow you set up recently to update the room21 twin to match.

Screenshot of the console output of the device simulator showing temperature device data being sent.

You don't need to do anything else in this console, but leave it running while you complete the next steps.

To see the data from the Azure Digital Twins side, go to your other console window that's open to the *AdtSampleApp\SampleClientApp* folder, and run the *SampleClientApp* project with `dotnet run`.

Once the project is running and accepting commands, run the following command to get the temperatures reported by both the digital twin thermostat67 and the digital twin room21.

```cmd
ObserveProperties thermostat67 Temperature room21 Temperature
```

You should see the live updated temperatures from your Azure Digital Twins instance being logged to the console every two seconds. Notice that the temperature for room21 is being updated to match the updates to thermostat67.

Screenshot of the console output showing a log of temperature messages, from a thermostat and a room.

Once you verify that the live temperatures logging from your instance is working successfully, you can stop running both projects. You can also close both console windows, as the tutorial is now complete.

## Review

Here's a review of the scenario that you built in this tutorial.

1. An Azure Digital Twins instance digitally represents a floor, a room, and a thermostat (represented by **section A** in the following diagram)
2. Simulated device data is sent to IoT Hub, where the *ProcessHubToDTEvents* Azure function is listening for device data events. The *ProcessHubToDTEvents* Azure function uses the information in these events to set the `Temperature` property on thermostat67 (**arrow B** in the following diagram).
3. Property change events in Azure Digital Twins are routed to an Event Grid topic, where the *ProcessDTRoutedData* Azure function is listening for events. The *ProcessDTRoutedData* Azure function uses the information in these events to set the `Temperature` property on room21 (**arrow C** in the following diagram).

Diagram from the beginning of the article showing the full building scenario.

## Clean up resources

After completing this tutorial, you can choose which resources you want to remove, depending on what you want to do next.


* If you do not need any of the resources you created in this tutorial, you can delete the Azure Digital Twins instance and all other resources from this article with the [az group delete](https://learn.microsoft.com/cli/azure/group#az-group-delete) CLI command. This deletes all Azure resources in a resource group, as well as the resource group itself.
    
    > **Important:**
    > Deleting a resource group is irreversible. The resource group and all the resources contained in it are permanently deleted. Make sure that you don't accidentally delete the wrong resource group or resources.
    
    Open [Azure Cloud Shell](https://shell.azure.com) or a local CLI window, and run the following command to delete the resource group and everything it contains.
    
    ```azurecli-interactive
    az group delete --name <your-resource-group>
    ```

* If you want to continue using the Azure Digital Twins instance you set up in this article, but clear out some or all of its models, twins, and relationships, you can use the [az dt](https://learn.microsoft.com/cli/azure/dt) CLI commands to delete the elements you want to remove.

    This option doesn't remove any of the other Azure resources created in this tutorial (IoT Hub, Azure Functions app, and so on). You can delete these resources individually using the [dt commands](https://learn.microsoft.com/cli/azure/reference-index) appropriate for each resource type.

You can also delete the project folder from your local machine.

## Next steps

In this tutorial, you created an end-to-end scenario that shows Azure Digital Twins driven by live device data.

Next, start looking at the concept documentation to learn more about elements you worked with in the tutorial:

> 
> [DTDL models](concepts-models.md)
