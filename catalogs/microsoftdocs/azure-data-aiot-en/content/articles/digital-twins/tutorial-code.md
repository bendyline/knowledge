---
title: 'Tutorial: Code a client app'
titleSuffix: Azure Digital Twins
description: Follow this tutorial to learn how to write the minimal code for an Azure Digital Twins client app, using the .NET (C#) SDK.
author: baanders
ms.author: baanders
ms.date: 2/14/2025
ms.topic: tutorial
ms.service: azure-digital-twins
ms.custom: devx-track-dotnet

# Optional fields. Don't forget to remove # if you need a field.
# ms.custom: can-be-multiple-comma-separated
# manager: MSFT-alias-of-manager-or-PM-counterpart
---

# Tutorial: Coding with the Azure Digital Twins SDK

Developers working with Azure Digital Twins commonly write client applications for interacting with their instance of the Azure Digital Twins service. This developer-focused tutorial provides an introduction to programming against the Azure Digital Twins service, using the [Azure Digital Twins SDK for .NET (C#)](https://learn.microsoft.com/dotnet/api/overview/azure/digitaltwins.core-readme). It walks you through writing a C# console client app step by step, starting from scratch.

> 
> * Set up project
> * Get started with project code   
> * Complete code sample
> * Clean up resources
> * Next steps

## Prerequisites

This Azure Digital Twins tutorial uses the command line for setup and project work. As such, you can use any code editor to walk through the exercises.

What you need to begin:
* Any code editor
* .NET Core 3.1 on your development machine. You can download this version of the .NET Core SDK for multiple platforms from [Download .NET Core 3.1](https://dotnet.microsoft.com/download/dotnet-core/3.1).

### Prepare an Azure Digital Twins instance


To work with Azure Digital Twins in this article, you need an Azure Digital Twins instance and the required permissions for using it. If you already have an Azure Digital Twins instance set up, you can use that instance and skip to the next section. Otherwise, follow the instructions in [Set up an instance and authentication](how-to-set-up-instance-portal.md). The instructions contain information to help you verify that you completed each step successfully.

After you set up your instance, make a note of the instance's host name. You can [find the host name in the Azure portal](how-to-set-up-instance-portal.md#verify-success-and-collect-important-values).



### Set up local Azure credentials

This sample uses [DefaultAzureCredential](https://learn.microsoft.com/dotnet/api/azure.identity.defaultazurecredential?view=azure-dotnet\&preserve-view=true) (part of the `Azure.Identity` library) to authenticate with the Azure Digital Twins instance when you run the sample on your local machine. `DefaultAzureCredential` is one of many authentication options. For more information about the different ways a client app can authenticate with Azure Digital Twins, see [Write app authentication code](how-to-authenticate-client.md).


With `DefaultAzureCredential`, the sample searches for credentials in your local environment, like an Azure sign-in in a local [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) or in Visual Studio or Visual Studio Code. For this reason, you should *sign in to Azure locally* through one of these mechanisms to set up credentials for the sample.

If you're using Visual Studio or Visual Studio Code to run code samples, make sure you're [signed in to that editor](https://learn.microsoft.com/visualstudio/ide/signing-in-to-visual-studio) with the same Azure credentials that you want to use to access your Azure Digital Twins instance. If you're using a local CLI window, run the `az login` command to sign in to your Azure account. Once you're signed in, your code sample authenticates you automatically when it runs. 

## Set up project

Once you're ready to go with your Azure Digital Twins instance, start setting up the client app project. 

Open a console window on your machine, and create an empty project directory where you want to store your work during this tutorial. Name the directory whatever you want (for example, *DigitalTwinsCodeTutorial*).

Navigate into the new directory.

Once in the project directory, create an empty .NET console app project. In the command window, you can run the following command to create a minimal C# project for the console:

```cmd/sh
dotnet new console
```

This command creates several files inside your directory, including one called *Program.cs* where you write most of your code.

Keep the command window open, as you continue to use it throughout the tutorial.

Next, add two dependencies to your project that are needed to work with Azure Digital Twins. The first dependency is the package for the [Azure Digital Twins SDK for .NET](https://learn.microsoft.com/dotnet/api/overview/azure/digitaltwins.core-readme). The second dependency provides tools to help with authentication against Azure.

```cmd/sh
dotnet add package Azure.DigitalTwins.Core
dotnet add package Azure.Identity
```

## Get started with project code

In this section, you begin writing the code for your new app project to work with Azure Digital Twins. The actions covered include:
* Authenticating against the service
* Uploading a model
* Catching errors
* Creating digital twins
* Creating relationships
* Querying digital twins

There's also a section showing the complete code at the end of the tutorial. You can use this section as a reference to check your program as you go.

To begin, open the file *Program.cs* in any code editor. You see a minimal code template that looks something like this:

Screenshot of a snippet of sample code in a code editor.

First, add some `using` lines at the top of the code to pull in necessary dependencies.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/fullClientApp.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/tutorial-code.md)

Next, you add code to this file to fill out some functionality. 

### Authenticate against the service

The first thing your app needs to do is authenticate against the Azure Digital Twins service. Then, you can create a service client class to access the SDK functions.

To authenticate, you need the host name of your Azure Digital Twins instance.

In *Program.cs*, paste the following code below the "Hello, World!" print line in the `Main` method. 
Set the value of `adtInstanceUrl` to your Azure Digital Twins instance host name.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/fullClientApp.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/tutorial-code.md)

Save the file. 

In your command window, run the code with this command: 

```cmd/sh
dotnet run
```

This command restores the dependencies on first run, and then executes the program. 
* If no error occurs, the program prints: "Service client created - ready to go".
* Since there isn't yet any error handling in this project, if there are any issues, you see an exception thrown by the code.


>**Note:**
>There's currently a known issue affecting the `DefaultAzureCredential` wrapper class that might result in an error while authenticating. If you encounter this issue, you can try instantiating `DefaultAzureCredential` with the following optional parameter to resolve it: `new DefaultAzureCredential(new DefaultAzureCredentialOptions { ExcludeSharedTokenCacheCredential = true });`
>
>For more information about this issue, see [Azure Digital Twins known issues](troubleshoot-known-issues.md#issue-with-default-azure-credential-authentication-on-azureidentity-130).


### Upload a model

Azure Digital Twins has no intrinsic domain vocabulary. You use *models* to define the types of elements in your environment that you can represent in Azure Digital Twins. [Models](concepts-models.md) are similar to classes in object-oriented programming languages; they provide user-defined templates for [digital twins](concepts-twins-graph.md) to follow and instantiate later. They're written in a JSON-like language called *Digital Twins Definition Language (DTDL)*.

The first step in creating an Azure Digital Twins solution is defining at least one model in a DTDL file.

In the directory where you created your project, create a new .json file called *SampleModel.json*. Paste in the following file body: 

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/models/SampleModel.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/tutorial-code.md)

> **Tip:**
> If you're using Visual Studio for this tutorial, you might want to select the newly created JSON file and set the **Copy to Output Directory** property in the Property inspector to **Copy if Newer** or **Copy Always**. This property value enables Visual Studio to find the JSON file with the default path when you run the program with F5 during the rest of the tutorial.

> **Tip:** 
> You can check model documents to make sure the DTDL is valid using the [DTDLParser library](https://www.nuget.org/packages/DTDLParser). For more about using this library, see [Parse and validate models](how-to-parse-models.md).

Next, add some more code to *Program.cs* to upload the model you created into your Azure Digital Twins instance.

First, add a few `using` statements to the top of the file:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/fullClientApp.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/tutorial-code.md)

Next, prepare to use the asynchronous methods in the C# service SDK, by changing the `Main` method signature to allow for async execution. 

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/fullClientApp.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/tutorial-code.md)

> **Note:**
> Using `async` isn't strictly required, as the SDK also provides synchronous versions of all calls. This tutorial practices using `async`.

Next comes the first bit of code that interacts with the Azure Digital Twins service. This code loads the DTDL file you created from your disk, and then uploads it to your Azure Digital Twins service instance. 

Paste in the following code under the authorization code you added earlier.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/fullClientApp_excerpt_model.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/tutorial-code.md)

In your command window, run the program with this command: 

```cmd/sh
dotnet run
```
"Upload a model" is printed in the output to indicate that this code was reached. However, there's no output yet to indicate whether the upload was successful.

To add a print statement showing all models that are successfully uploaded to the instance, add the following code right after the previous section:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/fullClientApp.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/tutorial-code.md)

Before you run the program again to test this new code, recall that the last time you ran the program, you uploaded your model already. Azure Digital Twins doesn't let you upload the same model twice, so if you attempt to upload the same model again, the program should throw an exception.

With this information in mind, run the program again with this command in your command window:

```cmd/sh
dotnet run
```

The program should throw an exception. When you attempt to upload a model that is already uploaded, the service returns a "bad request" error via the REST API. As a result, the Azure Digital Twins client SDK throws an exception, for every service return code other than success. 

The next section talks about exceptions like this and how to handle them in your code.

### Catch errors

To keep the program from crashing, you can add exception code around the model upload code. Wrap the existing client call `await client.CreateModelsAsync(typeList)` in a try/catch handler, like this:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/fullClientApp.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/tutorial-code.md)

Run the program again with `dotnet run` in your command window. You see that you get back more details about the model upload issue, including an error code stating that `ModelIdAlreadyExists`.

From this point forward, the tutorial wraps all calls to service methods in try/catch handlers.

### Create digital twins

Now that you uploaded a model to Azure Digital Twins, you can use this model definition to create *digital twins*. [Digital twins](concepts-twins-graph.md) are instances of a model, and represent the entities within your business environment—things like sensors on a farm, rooms in a building, or lights in a car. This section creates a few digital twins based on the model you uploaded earlier.

To create and initialize three digital twins based on this model, add the following code to the end of the `Main` method.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/fullClientApp.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/tutorial-code.md)

In your command window, run the program with `dotnet run`. In the output, look for the print messages that sampleTwin-0, sampleTwin-1, and sampleTwin-2 were created. 

Then, run the program again. 

Notice that no error is thrown when the twins are created the second time, even though the twins already exist after the first run. Unlike model creation, twin creation is a *PUT* call with *upsert* semantics at the REST level. Using this kind of REST call means that if a twin already exists, an attempt to create the same twin again just replaces the original twin. No error is thrown.

### Create relationships

Next, you can create *relationships* between the twins you created, to connect them into a *twin graph*. [Twin graphs](concepts-twins-graph.md) are used to represent your entire environment.

Add a new static method to the `Program` class, underneath the `Main` method (the code now has two methods):

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/fullClientApp.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/tutorial-code.md)

Next, add the following code to the end of the `Main` method, to call the `CreateRelationship` method and use the code you just wrote:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/fullClientApp.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/tutorial-code.md)

In your command window, run the program with `dotnet run`. In the output, look for print statements saying that the two relationships were created successfully.

Azure Digital Twins doesn't let you create a relationship if another relationship with the same ID already exists. As a result, you see exceptions on relationship creation if you run the program multiple times. This code catches the exceptions and ignores them. 

### List relationships

The next code you'll add allows you to see the list of relationships you created.

Add the following new method to the `Program` class:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/fullClientApp.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/tutorial-code.md)

Then, add the following code to the end of the `Main` method to call the `ListRelationships` code:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/fullClientApp.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/tutorial-code.md)

In your command window, run the program with `dotnet run`. You should see a list of all the relationships you created in an output statement that looks like this:

Screenshot of a console showing the program output, which results in a message that lists the twin relationships.

### Query digital twins

A main feature of Azure Digital Twins is the ability to [query](concepts-query-language.md) your twin graph easily and efficiently to answer questions about your environment.

The last section of code to add in this tutorial runs a query against the Azure Digital Twins instance. The query used in this example returns all the digital twins in the instance.

Add this `using` statement to enable use of the `JsonSerializer` class to help present the digital twin information:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/fullClientApp.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/tutorial-code.md)

Then, add the following code to the end of the `Main` method:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/fullClientApp.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/tutorial-code.md)

In your command window, run the program with `dotnet run`. You should see all the digital twins in this instance in the output.


>**Note:**
>After making a change to the data in your graph, there may be a latency of up to 10 seconds before the changes will be reflected in queries. 
>
>The [DigitalTwins API](concepts-apis-sdks.md#data-plane-overview) reflects changes immediately, so if you need an instant response, use an API request ([DigitalTwins GetById](https://learn.microsoft.com/rest/api/digital-twins/dataplane/twins/digital-twins-get-by-id)) or an SDK call ([GetDigitalTwin](https://learn.microsoft.com/dotnet/api/azure.digitaltwins.core.digitaltwinsclient.getdigitaltwin?view=azure-dotnet\&preserve-view=true)) to get twin data instead of a query.

## Complete code example

At this point in the tutorial, you have a complete client app that can perform basic actions against Azure Digital Twins. For reference, the following example lists the full code of the program in *Program.cs*:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/fullClientApp.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/tutorial-code.md)

## Clean up resources

After completing this tutorial, you can choose which resources you want to remove, depending on what you want to do next.

* If you plan to continue to the next tutorial, the instance used in this tutorial can be reused in the next one. You can keep the Azure Digital Twins resources you set up here and skip the rest of this section.


* If you want to continue using the Azure Digital Twins instance from this article, but clear out **all** of its models, twins, and relationships, run the following [az dt job deletion](https://learn.microsoft.com/cli/azure/dt/job/deletion) CLI command: 

    ```azure-cli
    az dt job deletion create -n <name-of-Azure-Digital-Twins-instance> -y
    ```
    
    If you only want to delete **some** of these elements, you can use the [az dt twin relationship delete](https://learn.microsoft.com/cli/azure/dt/twin/relationship#az-dt-twin-relationship-delete), [az dt twin delete](https://learn.microsoft.com/cli/azure/dt/twin#az-dt-twin-delete), and [az dt model delete](https://learn.microsoft.com/cli/azure/dt/model#az-dt-model-delete) commands to selectively delete only the elements you want to remove.
 

* If you do not need any of the resources you created in this tutorial, you can delete the Azure Digital Twins instance and all other resources from this article with the [az group delete](https://learn.microsoft.com/cli/azure/group#az-group-delete) CLI command. This deletes all Azure resources in a resource group, as well as the resource group itself.
    
    > **Important:**
    > Deleting a resource group is irreversible. The resource group and all the resources contained in it are permanently deleted. Make sure that you don't accidentally delete the wrong resource group or resources.
    
    Open [Azure Cloud Shell](https://shell.azure.com) or a local CLI window, and run the following command to delete the resource group and everything it contains.
    
    ```azurecli-interactive
    az group delete --name <your-resource-group>
    ```

You might also want to delete the project folder from your local machine.

## Next steps

In this tutorial, you created a .NET console client application from scratch. You wrote code for this client app to perform the basic actions on an Azure Digital Twins instance.

Continue to the next tutorial to explore the things you can do with such a sample client app: 

> 
> [Explore the basics with a sample client app](tutorial-command-line-app.md)
