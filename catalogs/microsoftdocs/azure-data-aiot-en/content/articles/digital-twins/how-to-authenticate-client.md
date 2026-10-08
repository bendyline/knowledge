---
title: Write app authentication code
titleSuffix: Azure Digital Twins
description: Learn how to write authentication code in a client application
author: baanders
ms.author: baanders
ms.date: 02/24/2025
ms.topic: how-to
ms.service: azure-digital-twins
---

# Write client app authentication code

After you [set up an Azure Digital Twins instance and authentication](how-to-set-up-instance-portal.md), you can create a client application to interact with the instance. This article explains how to **write code in that client app to authenticate it** against the Azure Digital Twins instance.

Azure Digital Twins authenticates using [Microsoft Entra Security Tokens based on OAUTH 2.0](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/develop/security-tokens.md#json-web-tokens-and-claims). To authenticate your SDK, get a bearer token with the right permissions to Azure Digital Twins, and pass it along with your API calls.

This article describes how to obtain credentials using the `Azure.Identity` client library. While this article shows code examples in C#, such as what you'd write for the [.NET (C#) SDK](https://learn.microsoft.com/dotnet/api/overview/azure/digitaltwins.core-readme), you can use a version of `Azure.Identity` regardless of what SDK you're using. For more information on the SDKs available for Azure Digital Twins, see [Azure Digital Twins APIs and SDKs](concepts-apis-sdks.md).

## Prerequisites

First, complete the setup steps in [Set up an instance and authentication](how-to-set-up-instance-portal.md). This setup ensures that you have an Azure Digital Twins instance and your user has access permissions. After that setup, you're ready to write client app code.

To continue, you need a client app project in which you write your code. If you don't already have a client app project set up, create a basic project in your language of choice to use with this tutorial.

## Authenticate using Azure.Identity library

`Azure.Identity` is a client library that provides several credential-obtaining methods that you can use to get a bearer token and authenticate with your SDK. Although this article gives examples in C#, you can view `Azure.Identity` for several languages, including...

* [.NET (C#)](https://learn.microsoft.com/dotnet/api/azure.identity?view=azure-dotnet\&preserve-view=true)
* [Java](https://learn.microsoft.com/java/api/overview/azure/identity-readme?view=azure-java-stable\&preserve-view=true)
* [JavaScript](https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest\&preserve-view=true)
* [Python](https://learn.microsoft.com/python/api/overview/azure/identity-readme?view=azure-python\&preserve-view=true)

Three common credential-obtaining methods in `Azure.Identity` are:

* [DefaultAzureCredential](https://learn.microsoft.com/dotnet/api/azure.identity.defaultazurecredential?view=azure-dotnet\&preserve-view=true) provides a default `TokenCredential` authentication flow for applications that are deployed to Azure. This method is **the recommended choice for local development**. It's also capable of trying the other two methods recommended in this article; it wraps `ManagedIdentityCredential` and can access `InteractiveBrowserCredential` with a configuration variable.
* [ManagedIdentityCredential](https://learn.microsoft.com/dotnet/api/azure.identity.managedidentitycredential?view=azure-dotnet\&preserve-view=true) works well in cases where you need [managed identities (MSI)](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/overview.md). This method is a good candidate for working with Azure Functions and deploying to Azure services.
* [InteractiveBrowserCredential](https://learn.microsoft.com/dotnet/api/azure.identity.interactivebrowsercredential?view=azure-dotnet\&preserve-view=true) is intended for interactive applications. This is one method of creating an authenticated SDK client.

The rest of this article shows how to use these methods with the [.NET (C#) SDK](https://learn.microsoft.com/dotnet/api/overview/azure/digitaltwins.core-readme).

### Add Azure.Identity to your .NET project

To set up your .NET project to authenticate with `Azure.Identity`, complete the following steps:

1. Include the SDK package `Azure.DigitalTwins.Core` and the `Azure.Identity` package in your project. Depending on your tools of choice, you can include the packages using the Visual Studio package manager or the `dotnet` command-line tool. 

1. Add the following using statements to your project code:

    [Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/authentication.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-authenticate-client.md)

Next, add code to obtain credentials using one of the methods in `Azure.Identity`. The following sections give more detail about using each method.

### DefaultAzureCredential method

[DefaultAzureCredential](https://learn.microsoft.com/dotnet/api/azure.identity.defaultazurecredential?view=azure-dotnet\&preserve-view=true) provides a default `TokenCredential` authentication flow for applications that are deployed to Azure. This method is **the recommended choice for local development**.

To use the default Azure credentials, you need the Azure Digital Twins instance's URL ([instructions to find](how-to-set-up-instance-portal.md#verify-success-and-collect-important-values)).

Here's a code sample to add a `DefaultAzureCredential` to your project:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/authentication.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-authenticate-client.md)


>**Note:**
>There's currently a known issue affecting the `DefaultAzureCredential` wrapper class that might result in an error while authenticating. If you encounter this issue, you can try instantiating `DefaultAzureCredential` with the following optional parameter to resolve it: `new DefaultAzureCredential(new DefaultAzureCredentialOptions { ExcludeSharedTokenCacheCredential = true });`
>
>For more information about this issue, see [Azure Digital Twins known issues](troubleshoot-known-issues.md#issue-with-default-azure-credential-authentication-on-azureidentity-130).


#### Set up local Azure credentials


With `DefaultAzureCredential`, the sample searches for credentials in your local environment, like an Azure sign-in in a local [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) or in Visual Studio or Visual Studio Code. For this reason, you should *sign in to Azure locally* through one of these mechanisms to set up credentials for the sample.

If you're using Visual Studio or Visual Studio Code to run code samples, make sure you're [signed in to that editor](https://learn.microsoft.com/visualstudio/ide/signing-in-to-visual-studio) with the same Azure credentials that you want to use to access your Azure Digital Twins instance. If you're using a local CLI window, run the `az login` command to sign in to your Azure account. Once you're signed in, your code sample authenticates you automatically when it runs. 

### ManagedIdentityCredential method

The [ManagedIdentityCredential](https://learn.microsoft.com/dotnet/api/azure.identity.managedidentitycredential?view=azure-dotnet\&preserve-view=true) method works well in cases where you need [managed identities (MSI)](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/overview.md)—for example, when [authenticating with Azure Functions](#authenticate-azure-functions).

You can use `ManagedIdentityCredential` in the same project as `DefaultAzureCredential` or `InteractiveBrowserCredential` to authenticate a different part of the project.

To use the default Azure credentials, you need the Azure Digital Twins instance's URL ([instructions to find](how-to-set-up-instance-portal.md#verify-success-and-collect-important-values)). You might also need an [app registration](how-to-create-app-registration.md) and the registration's [Application (client) ID](how-to-create-app-registration.md#collect-client-id-and-tenant-id).

In an Azure function, you can use the managed identity credentials like this:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/authentication.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-authenticate-client.md)

When you create the credential without parameters, as shown in the previous example, it returns the credential for the function app's system-assigned identity, if it has one. To specify a user-assigned identity instead, pass the user-assigned identity's **client ID** into the `id` parameter for the constructor.

### InteractiveBrowserCredential method

The [InteractiveBrowserCredential](https://learn.microsoft.com/dotnet/api/azure.identity.interactivebrowsercredential?view=azure-dotnet\&preserve-view=true) method is intended for interactive applications and brings up a web browser for authentication. Use this method instead of `DefaultAzureCredential` when you require interactive authentication.

To use the interactive browser credentials, you need an **app registration** that has permissions to the Azure Digital Twins APIs. For steps on how to set up this app registration, see [Create an app registration with Azure Digital Twins access](how-to-create-app-registration.md). Once the app registration is set up, you need the following values:
* [the app registration's Application (client) ID](how-to-create-app-registration.md#collect-client-id-and-tenant-id)
* [the app registration's Directory (tenant) ID](how-to-create-app-registration.md#collect-client-id-and-tenant-id)
* [the Azure Digital Twins instance's URL](how-to-set-up-instance-portal.md#verify-success-and-collect-important-values)

Here's an example of the code to create an authenticated SDK client using `InteractiveBrowserCredential`.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/authentication.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-authenticate-client.md)

>**Note:**
> Although the example above places the client ID, tenant ID, and instance URL directly into the code, it's a good idea to get these values from a configuration file or environment variable instead.

## Authenticate Azure Functions

This section contains important configuration choices for authenticating with Azure Functions. First, you read about recommended class-level variables and authentication code that allow the function to access Azure Digital Twins. Then, you read about some final configuration steps to complete for your function after its code is published to Azure.

### Write application code

When writing the Azure function, consider adding these variables and code to your function:

* **Code to read the Azure Digital Twins service URL as an environment variable or configuration setting.** It's a good practice to read the service URL from an [application setting/environment variable](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-how-to-use-azure-function-app-settings.md?tabs=portal), rather than hard-coding it in the function. In an Azure function, that code to read the environment variable might look like this: 

    [Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/adtIngestFunctionSample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-authenticate-client.md)

    Later, after publishing the function, create and set the value of the environment variable for this code to read. For instructions on how to do so, see [Configure application settings](#configure-application-settings).

* **A static variable to hold an HttpClient instance.** HttpClient is relatively expensive to create, so you probably want to create it once with the authentication code to avoid creating it for every function invocation.

    [Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/adtIngestFunctionSample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-authenticate-client.md)

* **Managed identity credential.** Create a managed identity credential that your function uses to access Azure Digital Twins. 

    [Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/adtIngestFunctionSample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-authenticate-client.md)

    When you create the credential without parameters, as shown in the previous example, it returns the credential for the function app's system-assigned identity, if it has one. To specify a user-assigned identity instead, pass the user-assigned identity's **client ID** into the `id` parameter for the constructor.   

    Later, after publishing the function, ensure that the function's identity has permission to access the Azure Digital Twins APIs. For instructions on how to do so, see [Assign an access role](#assign-an-access-role).    

* **A local variable _DigitalTwinsClient_.** Add the variable inside your function to hold your Azure Digital Twins client instance. _Don't_ make this variable static inside your class.
    [Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/adtIngestFunctionSample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-authenticate-client.md)

* **A null check for _adtInstanceUrl_.** To catch any exceptions, add the null check and then wrap your function logic in a try/catch block.

After you add these variables to a function, your function code might look like the following example.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/adtIngestFunctionSample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-authenticate-client.md)

When you're finished with your function code, including adding authentication and the function's logic, [publish the app to Azure](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-develop-vs.md#publish-to-azure).

### Configure published app

Finally, complete the following configuration steps for a published Azure function to make sure it can access your Azure Digital Twins instance.


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

## Authenticate across tenants

Azure Digital Twins is a service that only supports one [Microsoft Entra tenant](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/develop/quickstart-create-new-tenant.md): the main tenant from the subscription where the Azure Digital Twins instance is located.


As a result, requests to the Azure Digital Twins APIs require a user or service principal that is a part of the same tenant where the Azure Digital Twins instance resides. To prevent malicious scanning of Azure Digital Twins endpoints, requests with access tokens from outside the originating tenant return a "404 Sub-Domain not found" error message. This error is returned even if the user or service principal was given an Azure Digital Twins Data Owner or Azure Digital Twins Data Reader [role](concepts-security.md) through [Microsoft Entra B2B](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/external-identities/what-is-b2b.md) collaboration. 


If you need to access your Azure Digital Twins instance using a service principal or user account that belongs to a different tenant from the instance, you can have each federated identity from another tenant request a **token** from the Azure Digital Twins instance's "home" tenant. 


One way to do this is with the following CLI command, where `<home-tenant-ID>` is the ID of the Microsoft Entra tenant that contains the Azure Digital Twins instance:

```azurecli-interactive
az account get-access-token --tenant <home-tenant-ID> --resource https://digitaltwins.azure.net
```

After this request, the identity receives a token issued for the `https://digitaltwins.azure.net` Microsoft Entra resource, which has a matching tenant ID claim to the Azure Digital Twins instance. Using this token in API requests or with your `Azure.Identity` code should allow the federated identity to access the Azure Digital Twins resource.


You can also specify the home tenant in the credential options in your code.


The following example shows how to set a sample tenant ID value for `InteractiveBrowserTenantId` in the `DefaultAzureCredential` options:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/authentication.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-authenticate-client.md)

There are similar options available to set a tenant for authentication with Visual Studio and Visual Studio Code. For more information on the options available, see the [DefaultAzureCredentialOptions documentation](https://learn.microsoft.com/dotnet/api/azure.identity.defaultazurecredentialoptions?view=azure-dotnet\&preserve-view=true).

## Other credential methods

If the highlighted authentication scenarios described in this article don't cover the needs of your app, explore other types of authentication offered in the [Microsoft identity platform](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/develop/v2-overview.md#getting-started). The documentation for this platform covers more authentication scenarios, organized by application type.

## Next steps

To learn more about how security works in Azure Digital Twins, see:
* [Security for Azure Digital Twins solutions](concepts-security.md)

Or, now that authentication is set up, move on to creating and managing models in your instance:
* [Manage DTDL models](how-to-manage-model.md)
