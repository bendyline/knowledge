---
title: Azure Functions Web PubSub bindings
description: Understand how to use Web PubSub bindings with Azure Functions.
ms.topic: reference
ms.custom: devx-track-extended-java, devx-track-js, devx-track-python
ms.date: 01/28/2026
zone_pivot_groups: programming-languages-set-functions-lang-workers
---

# Web PubSub bindings for Azure Functions

This set of articles explains how to authenticate, send real-time messages to clients connected to [Azure Web PubSub](https://azure.microsoft.com/products/web-pubsub/) by using Azure Web PubSub bindings in Azure Functions.

| Action | Type |
| --- | --- |
| Handle client events from Web PubSub | [Trigger binding](functions-bindings-web-pubsub-trigger.md) |
| Handle client events from Web PubSub with HTTP trigger, or return client access URL and token | [Input binding](functions-bindings-web-pubsub-input.md) |
| Invoke service APIs | [Output binding](functions-bindings-web-pubsub-output.md) |

[Samples](https://github.com/Azure/azure-webpubsub/tree/main/samples/functions)

**Applies to: programming-language-csharp**


## Install extension

The extension NuGet package you install depends on the C# mode you're using in your function app:

# [Isolated worker model](#tab/isolated-process)

Functions execute in an isolated C# worker process. To learn more, see [Guide for running C# Azure Functions in an isolated worker process](dotnet-isolated-process-guide.md).

Add the extension to your project by installing this [NuGet package](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.WebPubSub/).

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


> **Note:**
> The Web PubSub extensions for Java is not supported yet.



## Key concepts

Diagram showing the workflow of Azure Web PubSub service working with Function Apps.

(1)-(2) `WebPubSubConnection` input binding with HttpTrigger to generate client connection.

(3)-(4) `WebPubSubTrigger` trigger binding or `WebPubSubContext` input binding with HttpTrigger to handle service request.

(5)-(6) `WebPubSub` output binding to request service do something.

## Connection

You can use [connection string](#connection-string) or [Microsoft Entra identity](#identity-based-connections) to connect to Azure Web PubSub service.

### Connection String

By default, an application setting named `WebPubSubConnectionString` is used to store your Web PubSub connection string. When you choose to use a different setting name for your connection, you must explicitly set that as the key name in your binding definitions. During local development, you must also add this setting to the `Values` collection in the [*local.settings.json* file](functions-develop-local.md#local-settings-file).

> **Important:**
> A connection string includes the authorization information required for your application to access Azure Web PubSub service. The access key inside the connection string is similar to a root password for your service. For optimal security, your function app should use [managed identities](#identity-based-connections) when connecting to the Web PubSub service instead of using a connection string.

For details on how to configure and use Web PubSub and Azure Functions together, refer to [Tutorial: Create a serverless notification app with Azure Functions and Azure Web PubSub service](../azure-web-pubsub/tutorial-serverless-notification.md).

### Identity-based connections

If you're using Azure Web PubSub Functions Extensions v1.10.0 or higher, instead of using a connection string with an access key, you can configure your function app to authenticate to Azure Web PubSub using a Microsoft Entra identity.

This approach removes the need to manage secrets and is recommended for production workloads.

#### Prerequisites

Make sure the Microsoft Entra identity used by your function app has been granted an appropriate Azure RBAC role on the target Web PubSub resource:

- [Azure Web PubSub Owner](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles/web-and-mobile.md#web-pubsub-service-owner)

#### Configuration

Identity-based connections in Azure Functions use a set of settings that share a common prefix. By default, Azure Web PubSub Functions extensions look for settings with the prefix `WebPubSubConnectionString`. You can customize this prefix by setting the `connection` property in your trigger or binding.

For Azure Web PubSub, the service-specific setting you must provide is the service endpoint URI:

| Property | Environment variable template | Description | Required |
| --- | --- | --- | --- |
| Service URI | `WebPubSubConnectionString__serviceUri` | The URI of your Web PubSub service endpoint. | Yes |

When hosted in the Azure Functions service, identity-based connections use a [managed identity](../app-service/overview-managed-identity.md?toc=%2fazure%2fazure-functions%2ftoc.json). The system-assigned identity is used by default, although a user-assigned identity can be specified. For more information on how to customize the identity, [Common properties for identity-based connections](functions-reference.md#common-properties-for-identity-based-connections).

When run in other contexts, such as local development, your developer identity is used instead, although this can be customized. See [Local development with identity-based connections](functions-reference.md#local-development-with-identity-based-connections).

#### Example configuration

The following example shows how to configure identity-based with default settings:

```json
{
  "WebPubSubConnectionString__serviceUri": "https://your-webpubsub.webpubsub.azure.com"
}
```


> **Note:**
> When using `local.settings.json` file at local, [Azure App Configuration](../azure-app-configuration/quickstart-azure-functions-csharp.md), or [Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview) to provide settings for identity-based connections, replace `__` with `:` in the setting name to ensure names are resolved correctly.
>
> For example, `WebPubSubConnectionString:serviceUri`.

## Next steps

- [Handle client events from Web PubSub  (Trigger binding)](functions-bindings-web-pubsub-trigger.md)
- [Handle client events from Web PubSub with HTTP trigger, or return client access URL and token (Input binding)](functions-bindings-web-pubsub-input.md)
- [Invoke service APIs  (Output binding)](functions-bindings-web-pubsub-output.md)

[NuGet package]: https://www.nuget.org/packages/Microsoft.Azure.WebJobs.Extensions.WebPubSub
[core tools]: functions-run-local.md
[extension bundle]: extension-bundles.md
[Update your extensions]: functions-bindings-register.md
[Azure Tools extension]: https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack
