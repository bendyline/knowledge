---
author: baanders
description: include file for Azure Digital Twins tutorials - configuring the sample project
ms.service: azure-digital-twins
ms.topic: include
ms.date: 5/25/2020
ms.author: baanders
---

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

This sample uses [DefaultAzureCredential](https://learn.microsoft.com/dotnet/api/azure.identity.defaultazurecredential?view=azure-dotnet\&preserve-view=true) (part of the `Azure.Identity` library) to authenticate with the Azure Digital Twins instance when you run the sample on your local machine. `DefaultAzureCredential` is one of many authentication options. For more information about the different ways a client app can authenticate with Azure Digital Twins, see [Write app authentication code](../how-to-authenticate-client.md).


With `DefaultAzureCredential`, the sample searches for credentials in your local environment, like an Azure sign-in in a local [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) or in Visual Studio or Visual Studio Code. For this reason, you should *sign in to Azure locally* through one of these mechanisms to set up credentials for the sample.

If you're using Visual Studio or Visual Studio Code to run code samples, make sure you're [signed in to that editor](https://learn.microsoft.com/visualstudio/ide/signing-in-to-visual-studio) with the same Azure credentials that you want to use to access your Azure Digital Twins instance. If you're using a local CLI window, run the `az login` command to sign in to your Azure account. Once you're signed in, your code sample authenticates you automatically when it runs.
