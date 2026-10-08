---
title: Migrate Application Configuration Service to Config Server for Spring in Azure Container Apps
description: Describes how to migrate Application Configuration Service and Config Server to Config Server for Spring in Azure Container Apps.
author: KarlErickson
ms.author: karler
ms.reviewer: dixue
ms.service: azure-spring-apps
ms.topic: upgrade-and-migration-article
ms.date: 08/19/2025
ms.update-cycle: 1095-days
ms.custom: devx-track-java, devx-track-extended-java
---

# Migrate Application Configuration Service to Config Server for Spring in Azure Container Apps


> **Note:**
> The **Basic**, **Standard**, and **Enterprise** plans entered a retirement period on March 17, 2025. For more information, see the [Azure Spring Apps retirement announcement](../basic-standard/retirement-announcement.md).


**This article applies to:** ❎ Basic/Standard ✅ Enterprise

This article describes how to migrate Application Configuration Service (ACS) and Config Server to Config Server for Spring in Azure Container Apps. Azure Container Apps manages Config Server for Spring, which has similar functions as ACS or Spring Cloud Config Server in Azure Spring Apps.

## Prerequisites

- An Azure Spring Apps Enterprise plan instance with Application Configuration Service enabled.
- An Azure Container Apps environment for Config Server and an Azure Container Apps instance.

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

Select one Git repository from Application Configuration Service (ACS) as the default repository in Config Server, and other repositories as additional repositories.

The following table provides a mapping between the properties in ACS and the corresponding configurations in Config Server:

| Property name in ACS | `CONFIGURATION_KEY` | `CONFIGURATION_VALUE` |
| --- | --- | --- |
| `name` | You don't need to map this value to Config Server. |  |
| `pattern` | You don't need to map this value to Config Server. |  |
| `uri` | `spring.cloud.config.server.git.uri` <br/> `spring.cloud.config.server.git.repos.{repoName}.uri` | The URI of the remote repository. |
| `search path` | `spring.cloud.config.server.git.search-paths` <br/> `spring.cloud.config.server.git.repos.{repoName}.search-paths` | The search paths to use within the local working copy. By default, searches only the root. |
| `label` | `spring.cloud.config.server.git.default-label` <br/> `spring.cloud.config.server.git.repos.{repoName}.default-label` | The label used for Git. |
| `username` | `spring.cloud.config.server.git.username` <br/> `spring.cloud.config.server.git.repos.{repoName}.username` | The username for authentication with the remote repository if the authentication type is `HTTP Basic`. |
| `password` | `spring.cloud.config.server.git.password` <br/> `spring.cloud.config.server.git.repos.{repoName}.password` | The password for authentication with the remote repository if the authentication type is `HTTP Basic`. |
| `private key` | `spring.cloud.config.server.git.private-key` <br/> `spring.cloud.config.server.git.repos.{repoName}.private-key` | A valid SSH private key if the authentication type is `SSH`. |
| `host key` | `spring.cloud.config.server.git.host-key` <br/> `spring.cloud.config.server.git.repos.{repoName}.host-key` | A valid SSH host key if the authentication type is `SSH`. Must be set if `host-key-algorithm` is also set. |
| `host key algorithm` | `spring.cloud.config.server.git.host-key-algorithm` <br/> `spring.cloud.config.server.git.repos.{repoName}.host-key-algorithm` | One of `ssh-dss`, `ssh-rsa`, `ssh-ed25519`, `ecdsa-sha2-nistp256`, `ecdsa-sha2-nistp384`, or `ecdsa-sha2-nistp521` if the authentication type is `SSH`. Must be set if `host-key` is also set. |

For more Config Server properties, see the [Configuration options](../../container-apps/java-config-server.md#configuration-options) section of [Connect to a managed Config Server for Spring in Azure Container Apps](../../container-apps/java-config-server.md).

For example, suppose you have the following configuration in ACS:

```json
"settings": {
    "gitProperty": {
        "repositories": [
            {
                "name": "r1",
                "patterns": [
                    "application"
                ],
                "label": "master",
                "uri": "https://github.com/Azure-Samples/spring-petclinic-microservices-config"
            },
            {
                "name": "r2",
                "patterns": [
                    "customers-service"
                ],
                "label": "master",
                "uri": "https://github.com/Azure-Samples/spring-petclinic-microservices-config"
            },
            {
                "name": "r3",
                "patterns": [
                    "payment"
                ],
                "label": "main",
                "uri": "https://github.com/Azure-Samples/acme-fitness-store-config"
            }
        ]
    }
}
```

With this ACS configuration, you can migrate to Config Server for Spring with the following configurations:

```properties
spring.cloud.config.server.git.uri=https://github.com/Azure-Samples/spring-petclinic-microservices-config
spring.cloud.config.server.git.default-label=master
spring.cloud.config.server.git.repos.repo1.uri=https://github.com/Azure-Samples/acme-fitness-store-config
spring.cloud.config.server.git.repos.repo1.default-label=main
```

## Change the application configuration

After you provision and configure the Config Server for Spring, use the following steps to adjust your application configuration to use it effectively:

1. Update Spring Boot dependencies. Add the following Spring Cloud Config dependencies to your **pom.xml** for Maven or **build.gradle** for Gradle.

   ### [Maven](#tab/maven)

   ```xml
   <dependency>
       <groupId>org.springframework.cloud</groupId>
       <artifactId>spring-cloud-starter-config</artifactId>
   </dependency>
   ```

   ### [Gradle](#tab/gradle)

   ```gradle
   dependencies {
       implementation 'org.springframework.cloud:spring-cloud-starter-config'
   }
   ```

1. Configure a profile. The profile for ACS is provided as patterns in an Azure Spring Apps deployment, while in Config Server, the profile is configured in the application's source code.

   Ensure your application uses the correct profiles - `dev`, `prod`, and so on - so that the Config Server can serve environment-specific configurations.

   Update the **bootstrap.yml** or **application.yml** file in your application with the correct configuration properties to point to the Config Server, as shown in the following example:

   ```yaml
   spring:
     cloud:
       config:
         profile: dev
   ```

1. Configure a refresh interval. If you set a refresh interval in ACS, you can also specify the corresponding value in the `spring.cloud.config.server.git.refreshRate` configuration of Config Server for Spring. This value determines how frequently Config Server for Spring fetches updated configuration data from the Git backend.

   To load property changes in your application's code, using the following steps:

   1. Register a scheduled task to refresh the context in a given interval.
   1. Enable `autorefresh` and set the appropriate refresh interval in your **application.yml** file.
   1. Add `@RefreshScope` to your code.

   For more information, see [Refresh Config Server](../basic-standard/how-to-config-server.md#refresh-config-server).

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


## Known limitation

Migrating ACS to Config Server for Spring only applies for Java applications. Because ACS manages configuration by using the Kubernetes-native `ConfigMap`. This method enables dynamic configuration updates in Kubernetes environments, making it versatile for different applications with multiple programming languages. While Spring Cloud Config Server is primarily designed for Java applications, using Spring Framework features, and thus only supports configuration management for Java.
