---
title: Authenticate .NET apps to Azure using brokered authentication.
description: Learn how to authenticate your app to Azure services when using the Azure SDK for .NET during local development using brokered authentication.
ms.topic: how-to
ms.custom: devx-track-dotnet, engagement-fy23, devx-track-azurecli
ms.date: 08/20/2025
zone_pivot_groups: operating-systems-set-one
---

# Authenticate .NET apps to Azure services during local development using brokered authentication

[Include unavailable in this source snapshot: ~/azure-dev-docs/articles/includes/authentication/broker-introduction.md](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/azure/sdk/authentication/local-development-broker.md)

**Applies to: os-windows**


[Include unavailable in this source snapshot: ~/azure-dev-docs/articles/includes/authentication/broker-windows.md](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/azure/sdk/authentication/local-development-broker.md)



**Applies to: os-macos**


[Include unavailable in this source snapshot: ~/azure-dev-docs/articles/includes/authentication/broker-mac.md](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/azure/sdk/authentication/local-development-broker.md)



**Applies to: os-linux**


[Include unavailable in this source snapshot: ~/azure-dev-docs/articles/includes/authentication/broker-linux.md](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/azure/sdk/authentication/local-development-broker.md)



[Include unavailable in this source snapshot: ~/azure-dev-docs/articles/includes/authentication/broker-configure-application.md](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/azure/sdk/authentication/local-development-broker.md)

[Include unavailable in this source snapshot: ~/azure-dev-docs/articles/includes/authentication/broker-assign-roles.md](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/azure/sdk/authentication/local-development-broker.md)

## Implement the code

**Applies to: os-windows, os-macos**


The Azure Identity library supports brokered authentication using [Azure.Identity.InteractiveBrowserCredential](https://learn.microsoft.com/search/?terms=Azure.Identity.InteractiveBrowserCredential). For example, to use `InteractiveBrowserCredential` in a MAUI app to authenticate to Azure Key Vault with the [`SecretClient`](https://learn.microsoft.com/dotnet/api/azure.security.keyvault.secrets.secretclient), follow these steps:



**Applies to: os-linux**


The Azure Identity library provide interactive brokered authentication using [Azure.Identity.InteractiveBrowserCredential](https://learn.microsoft.com/search/?terms=Azure.Identity.InteractiveBrowserCredential). For example, to use `InteractiveBrowserCredential` in a console app to authenticate to Azure Key Vault with the [`SecretClient`](https://learn.microsoft.com/dotnet/api/azure.security.keyvault.secrets.secretclient), follow these steps:



**Applies to: os-windows**


1. Install the [Azure.Identity](https://www.nuget.org/packages/Azure.Identity) and [Azure.Identity.Broker](https://www.nuget.org/packages/Azure.Identity.Broker) packages.

    ```dotnetcli
    dotnet add package Azure.Identity
    dotnet add package Azure.Identity.Broker
    ```

1. Get a reference to the parent window on top of which the account picker dialog should appear.
1. Create an instance of [Azure.Identity.InteractiveBrowserCredential](https://learn.microsoft.com/search/?terms=Azure.Identity.InteractiveBrowserCredential) using [Azure.Identity.Broker.InteractiveBrowserCredentialBrokerOptions](https://learn.microsoft.com/search/?terms=Azure.Identity.Broker.InteractiveBrowserCredentialBrokerOptions).

[language="csharp" source="../snippets/authentication/brokered/maui-app/MainPage.xaml.cs" id="snippet_brokered_windows" highlight="6-13"::: (complete source file; reference: ../snippets/authentication/brokered/maui-app/MainPage.xaml.cs)](../../../../_code/docs/azure/sdk/snippets/authentication/brokered/maui-app/MainPage.xaml.cs.md)



**Applies to: os-macos**


1. Install the [Azure.Identity](https://www.nuget.org/packages/Azure.Identity) and [Azure.Identity.Broker](https://www.nuget.org/packages/Azure.Identity.Broker) packages.

    ```dotnetcli
    dotnet add package Azure.Identity
    dotnet add package Azure.Identity.Broker
    ```

    > **Note:**
    > macOS support exists in `Azure.Identity.Broker` versions 1.3.0 and later.

2. Get a reference to the parent window on top of which the account picker dialog should appear.
3. Create an instance of [Azure.Identity.InteractiveBrowserCredential](https://learn.microsoft.com/search/?terms=Azure.Identity.InteractiveBrowserCredential) using [Azure.Identity.Broker.InteractiveBrowserCredentialBrokerOptions](https://learn.microsoft.com/search/?terms=Azure.Identity.Broker.InteractiveBrowserCredentialBrokerOptions).

[language="csharp" source="../snippets/authentication/brokered/maui-app/MainPage.xaml.cs" id="snippet_brokered_macos" highlight="6-13"::: (complete source file; reference: ../snippets/authentication/brokered/maui-app/MainPage.xaml.cs)](../../../../_code/docs/azure/sdk/snippets/authentication/brokered/maui-app/MainPage.xaml.cs.md)



**Applies to: os-linux**


1. Install the [Azure.Identity](https://www.nuget.org/packages/Azure.Identity) and [Azure.Identity.Broker](https://www.nuget.org/packages/Azure.Identity.Broker) packages.

    ```dotnetcli
    dotnet add package Azure.Identity
    dotnet add package Azure.Identity.Broker
    ```

    > **Note:**
    > Linux support exists in `Azure.Identity.Broker` versions 1.3.0 and later.

2. Get a reference to the parent window on top of which the account picker dialog should appear.
3. Create an instance of [Azure.Identity.InteractiveBrowserCredential](https://learn.microsoft.com/search/?terms=Azure.Identity.InteractiveBrowserCredential) using [Azure.Identity.Broker.InteractiveBrowserCredentialBrokerOptions](https://learn.microsoft.com/search/?terms=Azure.Identity.Broker.InteractiveBrowserCredentialBrokerOptions).

    [language="csharp" source="../snippets/authentication/brokered/console-app/Program.cs" id="snippet_brokered_linux" highlight="15-21"::: (complete source file; reference: ../snippets/authentication/brokered/console-app/Program.cs)](../../../../_code/docs/azure/sdk/snippets/authentication/brokered/console-app/Program.cs.md)



> **Tip:**
> View the [complete sample app code](https://github.com/dotnet/docs/tree/main/docs/azure/sdk/snippets/authentication/brokered) in the .NET docs GitHub repository.

In the preceding example, property [Azure.Identity.Broker.InteractiveBrowserCredentialBrokerOptions.UseDefaultBrokerAccount*](https://learn.microsoft.com/search/?terms=Azure.Identity.Broker.InteractiveBrowserCredentialBrokerOptions.UseDefaultBrokerAccount*) is set to `true`, which opts into a silent, brokered authentication flow with the default system account. In this way, the user doesn't have to repeatedly select the same account. If silent, brokered authentication fails, or `UseDefaultBrokerAccount` is set to `false`, `InteractiveBrowserCredential` falls back to interactive, brokered authentication.

**Applies to: os-windows**


The following screenshot shows the alternative interactive, brokered authentication experience:

A screenshot that shows the Windows sign-in experience when using a broker-enabled InteractiveBrowserCredential instance to authenticate a user.



**Applies to: os-macos**


The following screenshot shows the alternative interactive, brokered authentication experience:

A screenshot that shows the macOS sign-in experience when using a broker-enabled InteractiveBrowserCredential instance to authenticate a user.



**Applies to: os-linux**


The following video shows the alternative interactive, brokered authentication experience:

An animated gif that shows the Linux sign-in experience when using a broker-enabled InteractiveBrowserCredential instance to authenticate a user.
