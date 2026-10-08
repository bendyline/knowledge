---
title: Use managed identities to access App Configuration
titleSuffix: Azure App Configuration
description: Authenticate to Azure App Configuration using managed identities
author: maud-lv
ms.author: malev
ms.service: azure-app-configuration
ms.topic: concept-article
ms.date: 02/10/2026
zone_pivot_groups: appconfig-provider
ms.custom:
  - devx-track-csharp
  - fasttrack-edit
  - subject-rbac-steps
  - devdivchpfy22
  - sfi-image-nochange
---
# Use managed identities to access App Configuration

Microsoft Entra [managed identities](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/overview.md) simplify secrets management for your cloud application. With a managed identity, your code can use the service principal created for the Azure service it runs on. You use a managed identity instead of a separate credential stored in Azure Key Vault or a local connection string.

Azure App Configuration and its .NET, .NET Framework, and Java Spring client libraries have managed identity support built into them. Although you aren't required to use it, the managed identity eliminates the need for an access token that contains secrets. Your code can access the App Configuration store using only the service endpoint. You can embed this URL in your code directly without exposing any secret.

**Applies to: framework-dotnet**


This article shows how you can take advantage of the managed identity to access App Configuration. It builds on the web app introduced in the quickstart. Before you continue, [Create an ASP.NET Core app with App Configuration](quickstart-aspnet-core-app.md) first.



**Applies to: framework-spring**


This article shows how you can take advantage of the managed identity to access App Configuration. It builds on the web app introduced in the quickstart. Before you continue, [Create a Java Spring app with Azure App Configuration](quickstart-java-spring-app.md) first.



> **Important:**
> Managed identity can't be used to authenticate locally running applications. Your application must be deployed to an Azure service that supports Managed Identity. This article uses Azure App Service as an example. However, the same concept applies to any other Azure service that supports managed identity. For example, [Azure Kubernetes Service](https://learn.microsoft.com/azure/aks/use-azure-ad-pod-identity), [Azure Virtual Machine](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/qs-configure-portal-windows-vm.md), and [Azure Container Instances](https://learn.microsoft.com/azure/container-instances/container-instances-managed-identity). If your workload is hosted in one of those services, you can also leverage the service's managed identity support.

You can use any code editor to do the steps in this tutorial. [Visual Studio Code](https://code.visualstudio.com/) is an excellent option available on the Windows, macOS, and Linux platforms.

In this article, you learn how to:

> 
> * Grant a managed identity access to App Configuration.
> * Configure your app to use a managed identity when you connect to App Configuration.

## Prerequisites

To complete this tutorial, you must have:

**Applies to: framework-dotnet**


* An Azure account with an active subscription. [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* An Azure App Configuration store. [Create a store](quickstart-azure-app-configuration-create.md).
* [.NET SDK 6.0 or later](https://dotnet.microsoft.com/download).



**Applies to: framework-spring**


* An Azure account with an active subscription. [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* An Azure App Configuration store. [Create a store](quickstart-azure-app-configuration-create.md).
* A supported [Java Development Kit (JDK)](https://learn.microsoft.com/java/azure/jdk) with version 17.
* [Apache Maven](https://maven.apache.org/download.cgi) version 3.0 or above.



[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-app-configuration/howto-integrate-azure-managed-service-identity.md)

## Add a managed identity

To set up a managed identity in the portal, you first create an application and then enable the feature.

1. Access your App Services resource in the [Azure portal](https://portal.azure.com). If you don't have an existing App Services resource to use, create one.

1. Scroll down to the **Settings** group in the left pane, and select **Identity**.

1. On the **System assigned** tab, switch **Status** to **On** and select **Save**.

1. When prompted, answer **Yes** to turn on the system-assigned managed identity.

    Screenshot of how to add a managed identity in App Service.

## Grant access to App Configuration

The following steps describe how to assign the App Configuration Data Reader role to App Service. For detailed steps, see [Assign Azure roles using the Azure portal](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal).

1. In the [Azure portal](https://portal.azure.com), select your App Configuration store.

1. Select **Access control (IAM)**.

1. Select **Add** > **Add role assignment**.

    Screenshot that shows the Access control (IAM) page with Add role assignment menu open.

   If you don't have permission to assign roles, then the **Add role assignment** option will be disabled. For more information, see [Azure built-in roles](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md).

1. On the **Role** tab, select the **App Configuration Data Reader** role and then select **Next**.

    Screenshot that shows the Add role assignment page with Role tab selected.

1. On the **Members** tab, select **Managed identity** and then select **Select members**.

    Screenshot that shows the Add role assignment page with Members tab selected.

1. Select your Azure subscription, for Managed identity select **App Service**, then select your App Service name.

    Screenshot that shows the select managed identities page.

1. On the **Review + assign** tab, select **Review + assign** to assign the role.

## Use a managed identity

**Applies to: framework-dotnet**


1. Add a reference to the `Azure.Identity` package:

    ```bash
    dotnet add package Azure.Identity
    ```

1. Find the endpoint to your App Configuration store. This URL is listed on the **Access keys** tab for the store in the Azure portal.

1. Open the *appsettings.json* file and add the following script. Replace _`<AppConfigurationEndpoint>`_, including the brackets, with the URL to your App Configuration store.

    ```json
    "AppConfig": {
        "Endpoint": "<AppConfigurationEndpoint>"
    }
    ```

1. Open the *Program.cs* file and add a reference to the `Azure.Identity` namespace:

    ```csharp-interactive
    using Azure.Identity;
    ```

1. To access values stored in App Configuration, update the `Builder` configuration to use the `AddAzureAppConfiguration()` method.

    ```csharp
    var builder = WebApplication.CreateBuilder(args);

    builder.Configuration.AddAzureAppConfiguration(options =>
        options.Connect(
            new Uri(builder.Configuration["AppConfig:Endpoint"]),
            new ManagedIdentityCredential()));
    ```

    > **Note:**
    > If you want to use a **user-assigned managed identity**, be sure to specify the `clientId` when creating the [ManagedIdentityCredential](https://learn.microsoft.com/dotnet/api/azure.identity.managedidentitycredential).
    >```csharp
    >new ManagedIdentityCredential("<ClientId>")
    >```
    >As explained in the [Managed Identities for Azure resources FAQs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/known-issues.md), there is a default way to resolve which managed identity is used. In this case, the Azure Identity library enforces you to specify the desired identity to avoid possible runtime issues in the future. For instance, if a new user-assigned managed identity is added or if the system-assigned managed identity is enabled. So, you will need to specify the `clientId` even if only one user-assigned managed identity is defined, and there is no system-assigned managed identity.



**Applies to: framework-spring**


1. Find the endpoint to your App Configuration store. This URL is listed on the **Overview** tab for the store in the Azure portal.

1. Open `application.properties`, remove the connection-string property and replace it with endpoint for System Assigned Identity:

```properties
spring.cloud.azure.appconfiguration.stores[0].endpoint=<AppConfigurationEndpoint>
```

For User Assigned Identity:

```properties
spring.cloud.azure.appconfiguration.stores[0].endpoint=<AppConfigurationEndpoint>
spring.cloud.azure.credential.managed-identity-enabled= true
spring.cloud.azure.credential.client-id= <ClientId>
```

> **Note:**
> For more information see [Spring Cloud Azure authentication](https://learn.microsoft.com/azure/developer/java/spring-framework/authentication).



## Deploy your application

**Applies to: framework-dotnet**


You must deploy your app to an Azure service when you use managed identities. Managed identities can't be used for authentication of locally running apps. To deploy the .NET Core app that you created in the [Create an ASP.NET Core app with App Configuration](quickstart-aspnet-core-app.md) quickstart and modified to use managed identities, follow the guidance in [Publish your web app](../app-service/quickstart-dotnetcore.md?pivots=development-environment-vs&tabs=netcore31#publish-your-web-app).



**Applies to: framework-spring**


Using managed identities requires you to deploy your app to an Azure service. Managed identities can't be used for authentication of locally running apps. To deploy the Spring app that you created in the [Create a Java Spring app with Azure App Configuration](quickstart-java-spring-app.md) quickstart and modified to use managed identities, follow the guidance in [Publish your web app](../app-service/quickstart-java.md?tabs=javase&pivots=platform-linux).



In addition to App Service, many other Azure services support managed identities. For more information, see [Services that support managed identities for Azure resources](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/services-support-managed-identities.md).

## Clean up resources


If you don't want to continue using the resources created in this article, delete the resource group you created here to avoid charges.

> **Important:**
> Deleting a resource group is irreversible. The resource group and all the resources in it are permanently deleted. Ensure that you don't accidentally delete the wrong resource group or resources. If you created the resources for this article inside a resource group that contains other resources you want to keep, delete each resource individually from its respective pane instead of deleting the resource group.

1. Sign in to the [Azure portal](https://portal.azure.com), and select **Resource groups**.
1. In the **Filter by name** box, enter the name of your resource group.
1. In the result list, select the resource group name to see an overview.
1. Select **Delete resource group**.
1. You're asked to confirm the deletion of the resource group. Enter the name of your resource group to confirm, and select **Delete**.

After a few moments, the resource group and all its resources are deleted.


## Next steps

In this tutorial, you added an Azure managed identity to streamline access to App Configuration and improve credential management for your app. To learn more about how to use App Configuration, continue to the Azure CLI samples.

> 
> [CLI samples](cli-samples.md)
