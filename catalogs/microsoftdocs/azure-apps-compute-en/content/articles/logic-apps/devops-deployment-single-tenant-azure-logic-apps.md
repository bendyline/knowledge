---
title: DevOps Deployment for Standard Workflows
description: Learn about DevOps deployment for Standard logic app workflows in single-tenant Azure Logic Apps.
services: azure-logic-apps
ms.suite: integration
ms.reviewers: estfan, azla
ms.topic: concept-article
ms.update-cycle: 365-days
ai-usage: ai-assisted
ms.date: 05/12/2026
# Customer intent: As an automation and integration developer who works with Azure Logic Apps, I want to learn about DevOps deployment support for Standard logic app workflows.
---

# DevOps deployment for Standard logic app workflows in Azure Logic Apps


Applies to: **Azure Logic Apps (Standard)**

As integration workloads grow across development, test, and production environments, manual deployment and updates to Standard logic app workflows become slow, error-prone, and hard to keep consistent. With the trend toward distributed and native cloud apps, teams must manage more distributed components across more environments. Your team needs a way to reliably build, test, and release workflow changes by using the same DevOps practices you apply to application code.

Standard logic app workflows in single-tenant Azure Logic Apps support continuous integration and continuous deployment (CI/CD) with the DevOps tools you already use. Unlike the multitenant model, single-tenant Azure Logic Apps separates app code from infrastructure, so you can version, build, and deploy your workflows independently—locally, in containers, or through automated pipelines.

This article provides an introduction and overview about the current continuous integration and continuous deployment (CI/CD) experience for Standard logic app workflows in single-tenant Azure Logic Apps.

<a name="single-tenant-versus-multi-tenant"></a>

## Single-tenant versus multitenant

In *multitenant* Azure Logic Apps, resource deployment is based on Azure Resource Manager templates (ARM templates). These templates combine and handle resource provisioning for both your Consumption logic app resources and infrastructure. In *single-tenant* Azure Logic Apps, deployment is easier because you can separate resource provisioning between Standard logic app resources and infrastructure.

When you create a Standard logic app resource, workflows are powered by the redesigned single-tenant Azure Logic Apps runtime. This runtime uses the [Azure Functions extensibility model](../azure-functions/functions-bindings-register.md) and is [hosted as an extension on the Azure Functions runtime](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-logic-apps-running-anywhere-%e2%80%93-runtime-deep-dive/1835564). This design provides portability, flexibility, and more performance for Standard logic apps plus other capabilities and benefits inherited from the Azure Functions platform and Azure App Service ecosystem.

For example, you can package the redesigned containerized runtime and workflows together as part of your Standard logic app. You can use generic steps or tasks that build, assemble, and zip your logic app resources into ready-to-deploy artifacts. To deploy Standard logic apps, copy the artifacts to the host environment, and then start your apps to run your workflows. Or, integrate your artifacts into deployment pipelines by using the tools and processes that you already know and use. For example, if your scenario requires containers, you can containerize Standard logic apps and integrate them into your existing pipelines.

To set up and deploy your infrastructure resources, such as virtual networks and connectivity, you can continue using ARM templates and separately provision those resources along with other processes and pipelines that you use for those purposes.

By using standard build and deploy options, you can focus on app development separately from infrastructure deployment. As a result, you get a more generic project model where you can apply many similar or the same deployment options that you use for a generic app. You also benefit from a more consistent experience for building deployment pipelines around your app projects and for running the required tests and validations before publishing to production. No matter which technology stack you use, you can deploy logic apps by using your own chosen tools.

<a name="devops-deployment-features"></a>

## DevOps deployment capabilities

Single-tenant Azure Logic Apps inherits many capabilities and benefits from the Azure Functions platform and Azure App Service ecosystem. These updates include a whole new deployment model and more ways to use DevOps for your logic app workflows.

<a name="local-development-testing"></a>

### Local development and testing

When you use Visual Studio Code with the **Azure Logic Apps (Standard)** extension, you can locally develop, build, and run Standard logic app workflows in your development environment without having to deploy to Azure. If your scenario requires on-premises deployment using infrastructure that you control, see [Create Standard logic app workflows for hybrid deployment on your own infrastructure](create-standard-workflows-hybrid-deployment.md).

This capability is a major improvement and provides a substantial benefit compared to the multitenant model, which requires you to develop against an existing and running resource in Azure.

<a name="separate-concerns"></a>

### Separate concerns

The single-tenant model gives you the capability to separate the concerns between your logic app and the underlying infrastructure. For example, you can develop, build, zip, and deploy your app separately as an immutable artifact to different environments. Logic app workflows typically have "application code" that you update more often than the underlying infrastructure. By separating these layers, you can focus more on building out your logic app's workflow and spend less on your effort to deploy the required resources across multiple environments.

Conceptual diagram showing separate deployment pipelines for apps and infrastructure.

<a name="resource-structure"></a>

### Logic app resource structure


In the multi-tenant Azure Logic Apps model, the Consumption logic app resource structure can include only a single workflow. Due to this one-to-one relationship, both logic app and workflow are often considered and referenced synonymously. However, in the single-tenant Azure Logic Apps model, the Standard logic app resource structure can include multiple workflows. This one-to-many relationship means that in the same logic app, workflows can share and reuse other resources. Workflows in the same logic app and tenant also offer improved performance due to this shared tenancy and proximity to each other. This resource structure looks and works similarly to Azure Functions where a function app can host many functions.

For more information and best practices about organizing workflows, performance, and scaling in your logic app, review the similar [guidance for Azure Functions](../azure-functions/functions-best-practices.md) that you can generally apply to single-tenant Azure Logic Apps.


### Logic app project structure


In Visual Studio Code, your logic app project has either of the following types:

* Extension bundle-based (Node.js), which is the default type
* NuGet package-based (.NET), which you can convert from the default type

Based on these types, your project might include slightly different folders or files. For example, a Nuget package-based project has a **.bin** folder that contains packages and other library files. An extension bundle-based project doesn't include this **.bin** folder.

Some scenarios require a NuGet package-based project for your app to run, for example, when you want to develop and run custom built-in operations. For more information about converting your project to use NuGet, review [Enable built-connector authoring](https://learn.microsoft.com/azure/logic-apps/create-single-tenant-workflows-visual-studio-code#enable-built-in-connector-authoring).

The default extension bundle-based project has a folder and file structure that is similar to the following example:

```text
MyWorkspaceName
| MyBundleBasedLogicAppProjectName
  || .vscode
  || Artifacts
     ||| Maps 
         |||| MapName1
         |||| ...
     ||| Rules
     ||| Schemas
         |||| SchemaName1
         |||| ...
  || lib
     ||| builtinOperationSdks
         |||| JAR
         |||| net472
     ||| custom
  || WorkflowName1
     ||| workflow.json
     ||| ...
  || WorkflowName2
     ||| workflow.json
     ||| ...
  || workflow-designtime
     ||| host.json
     ||| local.settings.json
  || .funcignore
  || connections.json
  || host.json
  || local.settings.json
```

At your project's root level, you can find the following folders and files along with other items:

| Name | Folder or file | Description |
| --- | --- | --- |
| **.vscode** | Folder | Contains Visual Studio Code-related settings files, such as **extensions.json**, **launch.json**, **settings.json**, and **tasks.json** files. |
| **Artifacts** | Folder | Contains integration account artifacts that you define and use in workflows that support business-to-business (B2B) scenarios. <br><br>For example, the sample structure includes the following folders: <br><br>- **Maps**: Contains [maps](https://learn.microsoft.com/azure/logic-apps/logic-apps-enterprise-integration-maps) to use for XML transformation operations. <br><br>- **Schemas**: Contains [schemas](https://learn.microsoft.com/azure/logic-apps/logic-apps-enterprise-integration-schemas) to use for XML validation operations. <br><br>- **Rules**: Artifacts for [business rules in rules-based engine projects](https://learn.microsoft.com/azure/logic-apps/rules-engine/rules-engine-overview). |
| **lib** | Folder | Contains supported assemblies that your logic app can use or reference. You can upload these assemblies to your project in Visual Studio Code, but you must add them to specific folders in your project. <br><br>For example, this folder includes the following folders: <br><br>- **builtinOperationSdks**: Contains the **JAR** and **net472** folders for Java and .NET Framework assemblies, respectively. <br><br>- **custom**: Contains .NET Framework custom assemblies. <br><br>For more information about supported assembly types and where to put them in your project, see [Add assemblies to your project](https://learn.microsoft.com/azure/logic-apps/create-single-tenant-workflows-visual-studio-code#add-assembly). |
| **<*WorkflowName*>** | Folder | For each workflow, the <*WorkflowName*> folder includes a **workflow.json** file, which contains that workflow's underlying JSON definition. |
| **workflow-designtime** | Folder | Contains development environment-related settings files. |
| **.funcignore** | File | Contains information related to your installed [Azure Functions Core Tools](https://learn.microsoft.com/azure/azure-functions/functions-run-local). |
| **connections.json** | File | Contains the metadata, endpoints, and keys for any managed connections and Azure functions that your workflows use. <br><br>**Important**: To use different connections and functions for each environment, make sure that you parameterize this **connections.json** file and update the endpoints. |
| **host.json** | File | Contains runtime-specific configuration settings and values, for example, the default limits for the single-tenant Azure Logic Apps platform, logic apps, workflows, triggers, and actions. At your logic app project's root level, the **host.json** metadata file contains the configuration settings and default values that *all workflows* in the same logic app use while running, whether locally or in Azure. For reference information, see [Edit app settings and host settings](https://learn.microsoft.com/azure/logic-apps/edit-app-settings-host-settings#reference-host-json). <br><br>**Note**: When you create your logic app, Visual Studio Code creates a backup **host.snapshot.*.json** file in your storage container. If you delete your logic app, this backup file isn't deleted. If you create another logic app with the same name, another snapshot file is created. You can have only up to 10 snapshots for the same logic app. If you exceed this limit, you get the following error: <br><br>**`Microsoft.Azure.WebJobs.Script.WebHost: Repository has more than 10 non-decryptable secrets backups (host))`** <br><br>To resolve this error, delete the extra snapshot files from your storage container. |
| **local.settings.json** | File | Contains app settings, connection strings, and other settings that your workflows use while running locally. These settings and values apply *only* when you run your projects in your local development environment. During deployment to Azure, the file and settings are ignored and aren't included with your deployment. <br><br>This file stores settings and values as *local environment variables* that your local development tools use for the **`appSettings`** values. You can call and reference these environment variables both at runtime and deployment time by using *app settings* and *parameters*. <br><br>**Important**: The **local.settings.json** file can contain secrets, so make sure that you also exclude this file from your project source control. This file also contains app settings that your logic app needs to work correctly. For reference information, see [Edit app settings and host settings](https://learn.microsoft.com/azure/logic-apps/edit-app-settings-host-settings#reference-local-settings-json). |


<a name="deployment-containers"></a>

### Container deployment

Single-tenant Azure Logic Apps supports deployment to containers. You can containerize your logic app workflows and run them where containers can run. After you containerize your app, deployment works mostly the same as any other container you deploy and manage.

For examples that include Azure DevOps, see [CI/CD for Containers](https://azure.microsoft.com/solutions/architecture/cicd-for-containers/).

<a name="app-settings-parameters"></a>

### App settings and parameters

In multitenant Azure Logic Apps, ARM templates pose a challenge when you need to maintain environment variables for logic apps across various dev, test, and production environments. You define everything in an ARM template at deployment. If you need to change just a single variable, you must redeploy everything.

In single-tenant Azure Logic Apps, you can call and reference your environment variables at runtime by using app settings and parameters, so you don't have to redeploy as often.

<a name="managed-connectors-built-in-operations"></a>

## Managed connectors and built-in operations

The Azure Logic Apps ecosystem provides [over 1,000 Microsoft-managed and Azure-hosted connectors](https://learn.microsoft.com/connectors/connector-reference/connector-reference-logicapps-connectors) and [built-in operations](https://learn.microsoft.com/azure/logic-apps/connectors/built-in/reference) as part of a constantly growing collection that you can use in single-tenant Azure Logic Apps. The way that Microsoft maintains managed connectors stays mostly the same in single-tenant Azure Logic Apps as in multitenant Azure Logic Apps.

The most significant improvement is that the single-tenant service makes more popular managed connectors available as built-in operations. For example, you can use built-in operations for Azure Service Bus, Azure Event Hubs, SQL, and many others. Meanwhile, the managed connector versions are still available and continue to work.

The connections that you create by using Azure Service-based built-in operations are called built-in connections, or *service provider-based connections*. Built-in operations and their connections run locally in the same process that runs your workflows. Both are hosted on the redesigned Azure Logic Apps runtime. In contrast, managed connections, or API connections, are created and run separately as Azure resources, which you deploy by using ARM templates. As a result, built-in operations and their connections provide better performance due to their proximity to your workflows. This design also works well with deployment pipelines because the service provider connections are packaged into the same build artifact.

In Visual Studio Code, when you use the designer to develop or make changes to your workflows, the single-tenant Azure Logic Apps engine automatically generates any necessary connection metadata in your project's **connections.json** file. The following sections describe the three kinds of connections that you can create in your workflows. Each connection type has a different JSON structure, which is important to understand because endpoints change when you move between environments.

<a name="service-provider-connections"></a>

### Service provider connections

When you use a built-in operation for a service such as Azure Service Bus or Azure Event Hubs in single-tenant Azure Logic Apps, you create a service provider connection that runs in the same process as your workflow. This connection infrastructure is hosted and managed as part of your logic app resource, and your app settings store the connection strings for any service provider-based built-in operation that your workflows use.

> **Important:**
>
> When you have sensitive information, such as connection strings that include usernames and passwords, 
> use the most secure authentication flow available. For example, Microsoft recommends that 
> you authenticate access to Azure resources with a [managed identity](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/overview) 
> when support is available, and assign a role that has the least required privilege.
>
> If this capability isn't available, secure connection strings through other measures, such as 
> [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview), which you can use with [app settings](edit-app-settings-host-settings.md). 
> You can then [directly reference secure strings](../app-service/app-service-key-vault-references.md), such as connection 
> strings and keys. Similar to ARM templates, where you can define environment variables at deployment time, you can define 
> app settings within your [logic app workflow definition](https://learn.microsoft.com/azure/templates/microsoft.logic/workflows). 
> You can then capture dynamically generated infrastructure values, such as connection endpoints, storage strings, and more. 
> For more information, see [Application types for the Microsoft identity platform](https://learn.microsoft.com/entra/identity-platform/v2-app-types).

In your Standard logic app project, each workflow has a **workflow.json** file that contains the workflow's underlying JSON definition. This workflow definition references the necessary connection strings in your project's **connections.json** file.

The following example shows how the service provider connection for an Azure Service Bus built-in operation appears in your project's **connections.json** file:

```json
"serviceProviderConnections": {
   "{service-bus-connection-name}": {
      "parameterValues": {
         "connectionString": "@appsetting('servicebus_connectionString')"
      },
      "serviceProvider": {
         "id": "/serviceProviders/serviceBus"
      },
      "displayName": "{service-bus-connection-name}"
   },
   <...>
}
```

<a name="managed-connections"></a>

### Managed connections

When you use a managed connector for the first time in your workflow, you're prompted to create a managed API connection for the target service or system and authenticate your identity. Azure's shared connectors ecosystem manages these connectors. The API connections exist and run as separate resources in Azure.

In Visual Studio Code, while you continue to create and develop your workflow by using the designer, the single-tenant Azure Logic Apps engine automatically creates the necessary resources in Azure for the managed connectors in your workflow. The engine automatically adds these connection resources to the Azure resource group that you designed to contain your logic app.

The following example shows how an API connection for the Azure Service Bus managed connector appears in your project's **connections.json** file:

```json
"managedApiConnections": {
   "{service-bus-connection-name}": { 
      "api": {
         "id": "/subscriptions/{subscription-ID}/providers/Microsoft.Web/locations/{region}/managedApis/servicebus"
      },
      "connection": { 
         "id": "/subscriptions/{subscription-ID}/resourceGroups/{resource-group-name}/providers/Microsoft.Web/connections/servicebus"
      }, 
      "connectionRuntimeUrl": "{connection-runtime-URL}",
      "authentication": { 
         "type": "Raw",
         "scheme": "Key",
         "parameter": "@appsetting('servicebus_1-connectionKey')"
      },
   },
   <...>
}
```

<a name="azure-functions-connections"></a>

### Azure Functions connections

To call functions created and hosted in Azure Functions, use the Azure Functions built-in operation. Connection metadata for Azure Functions calls is different from other built-in connections. This metadata is stored in your logic app project's **connections.json** file, but looks different:

```json
"functionConnections": {
   "{function-operation-name}": {
      "function": { 
         "id": "/subscriptions/{subscription-ID}/resourceGroups/{resource-group-name}/providers/Microsoft.Web/sites/{function-app-name}/functions/{function-name}"
      },
      "triggerUrl": "{function-url}",
      "authentication": {
        "type": "QueryString",
         "name": "Code",
         "value": "@appsetting('azureFunctionOperation_functionAppKey')"
      }, 
      "displayName": "{functions-connection-display-name}"
   },
   <...>
}
```

## Authentication

In single-tenant Azure Logic Apps, the hosting model for logic app workflows is a single Microsoft Entra tenant where your workloads benefit from more isolation than in the multitenant model. Plus, the single-tenant Azure Logic Apps runtime is portable, which means you can run your workflows in other environments, such as local Visual Studio Code. Still, this design requires a way for logic apps to authenticate their identity so they can access the managed connector ecosystem in Azure. Your apps also need the correct permissions to run operations when using managed connections.

By default, each single-tenant based logic app has an automatically enabled system-assigned managed identity. This identity differs from the authentication credentials or connection string used for creating a connection. At runtime, your logic app uses this identity to authenticate its connections through Azure access policies. If you disable this identity, connections don't work at runtime.

The following sections provide more information about the authentication types that you can use to authenticate managed connections, based on where your logic app runs. For each managed connection, your logic app project's **connections.json** file has an **`authentication`** object that specifies the authentication type that your logic app can use to authenticate that managed connection.

### Managed identity

For a logic app that is hosted and run in Azure, a [managed identity](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/create-managed-service-identity.md) is the default and recommended authentication type to use for authenticating managed connections that are hosted and run in Azure. In your logic app project's **connections.json** file, the managed connection has an **`authentication`** object that specifies **`ManagedServiceIdentity`** as the authentication type:

```json
"authentication": {
   "type": "ManagedServiceIdentity"
}
```

### Raw

For logic apps that run in your local development environment by using Visual Studio Code, raw authentication keys authenticate managed connections that are hosted and run in Azure. Use these keys for development only, not production, because they expire after seven days. In your logic app project's **connections.json** file, the managed connection includes an **`authentication`** object that specifies the following authentication information:

```json
"authentication": {
   "type": "Raw", 
   "scheme": "Key", 
   "parameter": "@appsetting('connectionKey')"
 }
```

## Related content

- [Set up DevOps deployment for single-tenant Azure Logic Apps](set-up-devops-deployment-single-tenant-azure-logic-apps.md)
