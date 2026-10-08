---
title: Azure Functions SignalR Service bindings
description: Understand how to use SignalR Service bindings with Azure Functions.
ms.topic: reference
ms.custom: devx-track-extended-java, devx-track-js, devx-track-python
ms.date: 12/24/2024
zone_pivot_groups: programming-languages-set-functions-lang-workers
---

# SignalR Service bindings for Azure Functions

This set of articles explains how to authenticate and send real-time messages to clients connected to [Azure SignalR Service](https://azure.microsoft.com/services/signalr-service/) by using SignalR Service bindings in Azure Functions. Azure Functions runtime version 2.x and higher supports input and output bindings for SignalR Service.

| Action | Type |
| --- | --- |
| Handle messages from SignalR Service | [Trigger binding](functions-bindings-signalr-service-trigger.md) |
| Return the service endpoint URL and access token | [Input binding](functions-bindings-signalr-service-input.md) |
| Send SignalR Service messages and manage groups | [Output binding](functions-bindings-signalr-service-output.md) |

**Applies to: programming-language-csharp**


## Install extension

The extension NuGet package you install depends on the C# mode you're using in your function app:

# [Isolated worker model](#tab/isolated-process)

Functions execute in an isolated C# worker process. To learn more, see [Guide for running C# Azure Functions in an isolated worker process](dotnet-isolated-process-guide.md).

Add the extension to your project by installing this [NuGet package](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.SignalRService/).

# [In-process model](#tab/in-process)


> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

Functions execute in the same process as the Functions host. To learn more, see [Develop C# class library functions using Azure Functions](functions-dotnet-class-library.md).

Add the extension to your project by installing this [NuGet package].

---



**Applies to: programming-language-javascript,programming-language-python,programming-language-powershell**


 
## Install bundle

To be able to use this binding extension in your app, make sure that the *host.json* file in the root of your project contains this `extensionBundle` reference:


```json
{
    "version": "2.0",
    "extensionBundle": {
        "id": "Microsoft.Azure.Functions.ExtensionBundle",
        "version": "[4.0.0, 5.0.0)"
    }
}
```

In this example, the `version` value of `[4.0.0, 5.0.0)` instructs the Functions host to use a bundle version that is at least `4.0.0` but less than `5.0.0`, which includes all potential versions of 4.x. This notation effectively maintains your app on the latest available minor version of the v4.x extension bundle. 

When possible, you should use the latest extension bundle major version and allow the runtime to automatically maintain the latest minor version. You can view the contents of the latest bundle on the [extension bundles release page](https://github.com/Azure/azure-functions-extension-bundles/releases/latest). For more information, see [Azure Functions extension bundles](extension-bundles.md).



**Applies to: programming-language-java**


## Add dependency

To use the SignalR Service annotations in Java functions, you need to add a dependency to the *azure-functions-java-library-signalr* artifact (version 1.0 or higher) to your *pom.xml* file.

```xml
<dependency>
    <groupId>com.microsoft.azure.functions</groupId>
    <artifactId>azure-functions-java-library-signalr</artifactId>
    <version>1.0.0</version>
</dependency>
```


## Connections

You can use [connection string](#connection-string) or [Microsoft Entra identity](#identity-based-connections) to connect to Azure SignalR Service.

### Connection string

For instructions on how to retrieve the connection string for your Azure SignalR Service, see [Connection strings in Azure SignalR Service](../azure-signalr/concept-connection-string.md#how-to-get-connection-strings)

This connection string should be stored in an application setting with a name `AzureSignalRConnectionString`. You can customize the application setting name with the `connectionStringSetting` property of the binding configuration.

### Identity-based connections

If you're using version 1.7.0 or higher, instead of using a connection string with a secret, you can have the app use a [Microsoft Entra identity](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/fundamentals/active-directory-whatis.md).

First of all, you should make sure your Microsoft Entra identity has role [SignalR Service Owner](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#signalr-service-owner).

Then you would define settings with a common prefix `AzureSignalRConnectionString`. You can customize prefix name with the `connectionStringSetting` property of the binding configuration.

In this mode, the settings include following items:

| Property   | Environment variable template     | Description     |  Required  | Example value     |
|--------------|----------|-----|----------|
| Service URI | `AzureSignalRConnectionString__serviceUri` | The URI of your service endpoint. When you only configure "Service URI", the extensions would attempt to use [DefaultAzureCredential](https://learn.microsoft.com/dotnet/azure/sdk/authentication/credential-chains?tabs=dac#defaultazurecredential-overview) type to authenticate with the service.  |  Yes |  https://mysignalrsevice.service.signalr.net|
| Token Credential |  `AzureSignalRConnectionString__credential` | Defines how a token should be obtained for the connection. This setting should be set to `managedidentity` if your deployed Azure Function intends to use managed identity authentication. This value is only valid when a managed identity is available in the hosting environment. | No   | managedidentity |
| Client ID | `AzureSignalRConnectionString__clientId` | When `credential` is set to `managedidentity`, this property can be set to specify the user-assigned identity to be used when obtaining a token. The property accepts a client ID corresponding to a user-assigned identity assigned to the application. It's invalid to specify both a Resource ID and a client ID. If not specified, the system-assigned identity is used. This property is used differently in [local development scenarios](manage-connections.md?pivots=functions-auth-identity&tabs=bindings#define-connections), when `credential` shouldn't be set. |   No |  00000000-0000-0000-0000-000000000000  |
| Resource ID | `AzureSignalRConnectionString__managedIdentityResourceId` | When `credential` is set to `managedidentity`, this property can be set to specify the resource Identifier to be used when obtaining a token. The property accepts a resource identifier corresponding to the resource ID of the user-defined managed identity. It's invalid to specify both a resource ID and a client ID. If neither are specified, the system-assigned identity is used. This property is used differently in [local development scenarios](manage-connections.md?pivots=functions-auth-identity&tabs=bindings#define-connections), when `credential` shouldn't be set. |   No |  /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/mygroup/providers/Microsoft.SignalRService/SignalR/mysignalrservice   |


> **Note:**
> When using `local.settings.json` file at local, [Azure App Configuration](../azure-app-configuration/quickstart-azure-functions-csharp.md), or [Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview) to provide settings for identity-based connections, replace `__` with `:` in the setting name to ensure names are resolved correctly.
>
> For example, `AzureSignalRConnectionString:serviceUri`.

#### Multiple endpoints setting

You can also configure multiple endpoints and specify identity settings per endpoint.

In this case, prefix your settings with `Azure__SignalR__Endpoints__{endpointName}`. The `{endpointName}` is an arbitrary name assigned by you to associate a group of settings to a service endpoint. The prefix `Azure__SignalR__Endpoints__{endpointName}` can't be customized by `connectionStringSetting` property.

| Property   | Environment variable template     | Description     |   Required  | Example value     |
|--------------|----------|-----|----------|
| Service URI | `Azure__SignalR__Endpoints__{endpointName}__serviceUri` | The URI your service endpoint. When you only configure "Service URI", the extensions would attempt to use [DefaultAzureCredential](https://learn.microsoft.com/dotnet/azure/sdk/authentication/credential-chains?tabs=dac#defaultazurecredential-overview) type to authenticate with the service. |Yes |  https://mysignalrsevice1.service.signalr.net|
| Endpoint Type | `Azure__SignalR__Endpoints__{endpointName}__type` | Indicates whether the service endpoint is primary or secondary. If not specified, it defaults to `Primary`. Valid values are `Primary` and `Secondary`, case-insensitive. | No | `Secondary` |
| Token Credential |  `Azure__SignalR__Endpoints__{endpointName}__credential` | Defines how a token should be obtained for the connection. This setting should be set to `managedidentity` if your deployed Azure Function intends to use managed identity authentication. This value is only valid when a managed identity is available in the hosting environment. | No   | managedidentity |
| Client ID | `Azure__SignalR__Endpoints__{endpointName}__clientId` | When `credential` is set to `managedidentity`, this property can be set to specify the user-assigned identity to be used when obtaining a token. The property accepts a client ID corresponding to a user-assigned identity assigned to the application. It's invalid to specify both a Resource ID and a client ID. If not specified, the system-assigned identity is used. This property is used differently in [local development scenarios](manage-connections.md?pivots=functions-auth-identity&tabs=bindings#define-connections), when `credential` shouldn't be set. |   No |  00000000-0000-0000-0000-000000000000  |
| Resource ID | `Azure__SignalR__Endpoints__{endpointName}__managedIdentityResourceId` | When `credential` is set to `managedidentity`, this property can be set to specify the resource Identifier to be used when obtaining a token. The property accepts a resource identifier corresponding to the resource ID of the user-defined managed identity. It's invalid to specify both a resource ID and a client ID. If neither are specified, the system-assigned identity is used. This property is used differently in [local development scenarios](manage-connections.md?pivots=functions-auth-identity&tabs=bindings#define-connections), when `credential` shouldn't be set. |   No |  /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myrg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myusermanagedidentity   |

For more information about multiple endpoints, see [Scale SignalR Service with multiple instances](../azure-signalr/signalr-howto-scale-multi-instances.md?pivots=serverless-mode#for-signalr-functions-extensions)

To learn more about bindings connections, see [Manage connection in Azure Functions](manage-connections.md?tab=bindings). 

## Next steps

For details on how to configure and use SignalR Service and Azure Functions together, refer to [Azure Functions development and configuration with Azure SignalR Service](../azure-signalr/signalr-concept-serverless-development-config.md).

- [Handle messages from SignalR Service  (Trigger binding)](functions-bindings-signalr-service-trigger.md)
- [Return the service endpoint URL and access token (Input binding)](functions-bindings-signalr-service-input.md)
- [Send SignalR Service messages  (Output binding)](functions-bindings-signalr-service-output.md)

[NuGet package]: https://www.nuget.org/packages/Microsoft.Azure.WebJobs.Extensions.SignalRService
[core tools]: functions-run-local.md
[extension bundle]: extension-bundles.md
[Update your extensions]: functions-bindings-register.md
[Azure Tools extension]: https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack
