---
title: Migrate Spring Cloud Config Server from Azure Spring Apps to Azure Container Apps
description: Describes how to migrate Spring Cloud Config Server to Config Server for Spring in Azure Container Apps.
author: KarlErickson
ms.author: karler
ms.reviewer: dixue
ms.service: azure-spring-apps
ms.topic: upgrade-and-migration-article
ms.date: 08/19/2025
ms.update-cycle: 1095-days
ms.custom: devx-track-java, devx-track-extended-java
---

# Migrate Spring Cloud Config Server from Azure Spring Apps to Azure Container Apps


> **Note:**
> The **Basic**, **Standard**, and **Enterprise** plans entered a retirement period on March 17, 2025. For more information, see the [Azure Spring Apps retirement announcement](../basic-standard/retirement-announcement.md).


**This article applies to:** ✅ Basic/Standard ✅ Enterprise

This article describes how to migrate Spring Cloud Config Server to Config Server for Spring in Azure Container Apps. Azure Container Apps manages Config Server for Spring, which has similar functions as Spring Cloud Config Server in Azure Spring Apps.

## Prerequisites

- An Azure Spring Apps instance with Configure Server enabled.
- An Azure Container Apps Environment for Config Server and an Azure Container Apps instance.

## Provision Config Server

### [Azure portal](#tab/Azure-portal)

The following steps show you how to provision a Config Server for Spring in your Azure Container Apps:

1. Navigate to your Azure Container Apps environment in the Azure portal.

1. In the menu, select **Services** > **Services**.

1. Open the **Configure** drop-down list, and then select **Java component**.

1. In the **Configure Java component** panel, enter the following values:

   | Property | Value |
   | --- | --- |
   | **Java component type** | Select **Config Server for Spring**. |
   | **Java component name** | Enter **configserver**. |

1. In the **Git repositories** section, select **Add**, and then migrate the values from Application Configuration Service to here, as shown in the following table. Choose one repository as the default repository of Config Server for Spring.

   | Property | Value |
   | --- | --- |
   | **Type** | Select **DEFAULT**. |
   | **URI** | Enter the value of **URI** of the repository. |
   | **Branch name** | Enter the value of **label** of the repository. |
   | **Search paths** | Enter the value of **search path** of the repository. |
   | **Authentication** | Select the authentication type of the repository and enter the corresponding information. |

   Leave the rest of the fields with the default values and then select **Add**.

1. If you have multiple repositories, select **Add** to migrate other repositories. For **Type**, select **Other**, and then migrate other properties as shown in the previous step and the following table:

   | Property | Value |
   | --- | --- |
   | **Type** | Select **DEFAULT**. |
   | **Pattern** | Enter the **Patterns** value for the repository in the `{application}` or `{application}/{profile}` format. |

1. In the **Binding** section, open the dropdown to select the apps to bind to the Config Server for Spring.

1. Select **Next**.

1. To set up Config Server, on the **Review** tab, select **Configure**, and then follow the instructions in the configuration section.

After successful creation, you can see that the **Provisioning State** of Config Server for Spring is **Succeeded**.

### [Azure CLI](#tab/Azure-CLI)

Use the following command to create and configure the Config Server for Spring Java component:

```azurecli
az containerapp env java-component config-server-for-spring create \
    --resource-group <resource-group-name> \
    --name <config-server-name> \
    --environment <azure-container-app-environment-name> \
    --min-replicas 1 \
    --max-replicas 1 \
    --configuration spring.cloud.config.server.git.uri=<URI> spring.cloud.config.server.git.default-label=<label>
```

All properties are set using the format `--configuration <CONFIGURATION_KEY>=<CONFIGURATION_VALUE>`. To map existing configurations to the key-value pairs of the Config Server, see the configuration section.

---

### Resource allocation

The container resource allocation for the managed Config Server in Azure Container Apps is fixed to the following values:

- **CPU**: 0.5 vCPU
- **Memory**: 1 Gi

To configure the instance count of Config Server for Spring, you need to update the parameters `--min-replicas` and `--max-replicas` with the same value. This configuration ensures that the instance count remains fixed. Currently, the system doesn't support autoscaling configurations for dynamic scaling.


## Configure Config Server

Map the default Git repository and additional repositories configured in the Spring Cloud Config Server within Azure Spring Apps to the default and other repositories in the Config Server for Spring deployed in Azure Container Apps. The following table shows the mapping relationships for properties:

| Property name in Azure Spring Apps | `CONFIGURATION_KEY` | `CONFIGURATION_VALUE` |
| --- | --- | --- |
| `uri` | `spring.cloud.config.server.git.uri` <br/> `spring.cloud.config.server.git.repos.{repoName}.uri` | The `uri` of the remote repository. |
| `search path` | `spring.cloud.config.server.git.search-paths` <br/> `spring.cloud.config.server.git.repos.{repoName}.search-paths` | Search paths to use within the local working copy. By default, searches only the root. |
| `label` | `spring.cloud.config.server.git.default-label`  <br/> `spring.cloud.config.server.git.repos.{repoName}.default-label` | The label used for Git. |
| `name` in additional repositories | `{repoName}` in the following configurations. |  |
| `Patterns` in additional repositories | `spring.cloud.config.server.git.repos.{repoName}.pattern` |  |
| `username` | `spring.cloud.config.server.git.username` <br/> `spring.cloud.config.server.git.repos.{repoName}.username` | Enter the `username` for authentication with remote repository if the authentication type is `HTTP Basic`. |
| `password` | `spring.cloud.config.server.git.password` <br/> `spring.cloud.config.server.git.repos.{repoName}.password` | Enter the `password` for authentication with remote repository if the authentication type is `HTTP Basic`. |
| `private key` | `spring.cloud.config.server.git.private-key` <br/> `spring.cloud.config.server.git.repos.{repoName}.private-key` | Valid SSH private key if the authentication type is `SSH`. |
| `host key` | `spring.cloud.config.server.git.host-key` <br/> `spring.cloud.config.server.git.repos.{repoName}.host-key` | Valid SSH host key if the authentication type is `SSH`. Must be set if `host-key-algorithm` is also set. |
| `host key algorithm` | `spring.cloud.config.server.git.host-key-algorithm`  <br/> `spring.cloud.config.server.git.repos.{repoName}.host-key-algorithm` | One of `ssh-dss`, `ssh-rsa`, `ssh-ed25519`, `ecdsa-sha2-nistp256`, `ecdsa-sha2-nistp384`, or `ecdsa-sha2-nistp521` if the authentication type is `SSH`. Must be set if host-key is also set. |

For more Config Server properties, see the [Configuration options](../../container-apps/java-config-server.md#configuration-options) section of [Connect to a managed Config Server for Spring in Azure Container Apps](../../container-apps/java-config-server.md).

## Deploy the application to Azure Container Apps

After testing the application locally, you can deploy the new image to the Azure Container Apps application.

### [Azure portal](#tab/Azure-portal)

Use the following steps to deploy:

1. Navigate to your Azure Container Apps application in the Azure portal.
1. In the menu, select **Application** > **Containers**.
1. Select **Edit and deploy** to open the **Create and deploy new revision** page.
1. In the **Container image** section, select the image and then select **Edit**.
1. In the **Edit a container** section, on the **Properties** tab, choose the new image of the application.
1. On the **Environment variables** tab, for **Name**, specify **spring.application.name**. Then, for **Source**, choose **Manual entry** and specify the config file name where the application consumes the configuration.
1. Select **Save** to deploy the new revision.

### [Azure CLI](#tab/Azure-CLI)

Use the following command to update the container app that consumes the configuration data:

```azurecli
az containerapp update \
    --resource-group <your-resource-group> \
    --name <container-app-name> \
    --image <new-container-image> \
    --bind <config-server-name> \
    --set-env-vars spring.application.name=<config-file-name>
```

The `--bind <config-server-name>` parameter creates the link between your container app and the configuration component. You should add the environment variable by setting `--set-env-vars spring.application.name=<config-file-name>` to the app container so that the app can consume the configuration from the right config file.   

---

## Troubleshoot

You can view logs for the managed Config Server for Spring in Azure Container Apps using Log Analytics. Use the following steps:

1. Navigate to your Azure Container Apps environment in the Azure portal.
1. Select the **Monitoring** > **Logs** menu.
1. To view logs, enter a query into the query editor for the `ContainerAppSystemLogs_CL` table, as shown in the following example:

   ```kusto
   ContainerAppSystemLogs_CL
   | where ComponentType_s == "SpringCloudConfig"
   | project Time=TimeGenerated, ComponentName=ComponentName_s, Message=Log_s
   | take 100
   ```

For more information about querying logs, see [Observability of managed Java components in Azure Container Apps](../../container-apps/java-component-logs.md).
