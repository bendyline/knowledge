---
title: "Use dynamic configuration using push refresh - Java Spring"
titleSuffix: Azure App Configuration
description: In this tutorial, you learn how to dynamically update the configuration data for a Java Spring app using push refresh
services: azure-app-configuration
author: mrm9084
manager: zhenlan
ms.service: azure-app-configuration
ms.devlang: java
ms.custom: devx-track-extended-java
ms.topic: tutorial
ms.date: 02/10/2026
ms.author: mametcal
#Customer intent: I want to use push refresh to dynamically update my app to use the latest configuration data in App Configuration.
---
# Tutorial: Use dynamic configuration using push refresh in a Java Spring app

The App Configuration Java Spring client library supports updating configuration on demand without causing an application to restart. An application can be configured to detect changes in App Configuration using one or both of the following two approaches.

- Poll Model: The Poll Model is the default behavior that uses polling to detect changes in configuration. Once the cached value of a setting expires, the next call to `AppConfigurationRefresh`'s `refreshConfigurations` sends a request to the server to check if the configuration changed, and pulls the updated configuration if needed.

- Push model: This model uses [App Configuration events](concept-app-configuration-event.md) to detect changes in configuration. Once you set up App Configuration to send key-value change events through Event Grid with a [webhook](../event-grid/handler-event-hubs.md), the application can use these events to optimize the total number of requests needed to keep the configuration updated.

This tutorial shows how you can implement dynamic configuration updates in your code using push refresh. It builds on the app introduced in the quickstarts. Before you continue, finish [Create a Java Spring app with App Configuration](quickstart-java-spring-app.md) first.

You can use any code editor to do the steps in this tutorial. [Visual Studio Code](https://code.visualstudio.com/) is an excellent option that's available on the Windows, macOS, and Linux platforms.

In this tutorial, you learn how to:

> 
> * Set up a subscription to send configuration change events from App Configuration to a webhook
> * Deploy a Spring Boot application to App Service
> * Set up your Java Spring app to update its configuration in response to changes in App Configuration.
> * Consume the latest configuration in your application.

## Prerequisites

- Azure subscription - [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- A supported [Java Development Kit (JDK)](https://learn.microsoft.com/java/azure/jdk) with version 17.
- [Apache Maven](https://maven.apache.org/download.cgi) version 3.0 or above.
- An existing Azure App Configuration store.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-app-configuration/enable-dynamic-configuration-java-spring-push-refresh.md)

## Setup Push Refresh

1. Open *pom.xml* and update the file with the following dependencies.

```xml
<dependency>
    <groupId>com.azure.spring</groupId>
    <artifactId>spring-cloud-azure-appconfiguration-config-web</artifactId>
</dependency>

<!-- Adds the Ability to Push Refresh -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

<dependencyManagement>
    <dependencies>
        <dependency>
        <groupId>com.azure.spring</groupId>
        <artifactId>spring-cloud-azure-dependencies</artifactId>
        <version>7.0.0</version>
        <type>pom</type>
        <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

1. Set up [Maven App Service Deployment](../app-service/quickstart-java.md?tabs=javase) so the application can be deployed to Azure App Service via Maven.

   ```console
   mvn com.microsoft.azure:azure-webapp-maven-plugin:2.5.0:config
   ```

1. Navigate to the `resources` directory of your app and open `application.properties` and configure Azure App Configuration Push Refresh. If the file doesn't exist, create it. Add the following line to the file.

    ### [Microsoft Entra ID (recommended)](#tab/entra-id)
    You use the `DefaultAzureCredential` to authenticate to your App Configuration store. Follow the [instructions](concept-enable-rbac.md#authentication-with-token-credentials) to assign your credential the **App Configuration Data Reader** role. Be sure to allow sufficient time for the permission to propagate before running your application. Create a new file named *AppConfigCredential.java* and add the following lines:

    ```properties
    spring.config.import=azureAppConfiguration
    spring.cloud.azure.appconfiguration.stores[0].endpoint= ${APP_CONFIGURATION_ENDPOINT}
    spring.cloud.azure.appconfiguration.stores[0].monitoring.enabled= true
    spring.cloud.azure.appconfiguration.stores[0].monitoring.refresh-interval= 30d
    spring.cloud.azure.appconfiguration.stores[0].monitoring.triggers[0].key= sentinel
    spring.cloud.azure.appconfiguration.stores[0].monitoring.push-notification.primary-token.name= myToken
    spring.cloud.azure.appconfiguration.stores[0].monitoring.push-notification.primary-token.secret= myTokenSecret
   
    management.endpoints.web.exposure.include= appconfiguration-refresh
    ```

    Additionally, you need to add the following code to your project, unless you want to use Managed Identity:

    ```java
    import org.springframework.stereotype.Component;
    
    import com.azure.data.appconfiguration.ConfigurationClientBuilder;
    import com.azure.identity.DefaultAzureCredentialBuilder;
    import com.azure.spring.cloud.appconfiguration.config.ConfigurationClientCustomizer;
    
    @Component
    public class AppConfigCredential implements ConfigurationClientCustomizer {
    
        @Override
        public void customize(ConfigurationClientBuilder builder, String endpoint) {
            builder.credential(new DefaultAzureCredentialBuilder().build());
        }
    }
    ```

    And add configuration Bootstrap Configuration, by creating `spring.factories` file under `resources/META-INF` directory and add the following lines and updating `com.example.MyApplication` with your application name and package:

    ```factories
    org.springframework.cloud.bootstrap.BootstrapConfiguration=\
    com.example.MyApplication
    ```

    ### [Connection string](#tab/connection-string)
    ```properties
    spring.config.import=azureAppConfiguration
    spring.cloud.azure.appconfiguration.stores[0].endpoint= ${APP_CONFIGURATION_CONNECTION_STRING}
    spring.cloud.azure.appconfiguration.stores[0].monitoring.enabled= true
    spring.cloud.azure.appconfiguration.stores[0].monitoring.refresh-interval= 30d
    spring.cloud.azure.appconfiguration.stores[0].monitoring.triggers[0].key= sentinel
    spring.cloud.azure.appconfiguration.stores[0].monitoring.push-notification.primary-token.name= myToken
    spring.cloud.azure.appconfiguration.stores[0].monitoring.push-notification.primary-token.secret= myTokenSecret
   
    management.endpoints.web.exposure.include= appconfiguration-refresh
    ```
    ---

A random delay is added before the cached value is marked as dirty to reduce potential throttling. The default maximum delay before the cached value is marked as dirty is 30 seconds.

> **Note:**
> The Primary token name should be stored in App Configuration as a key, and then the Primary token secret should be stores as an App Configuration Key Vault Reference for added security.

## Build and run the app in App Service

Event Grid webhooks require validation when you create them. You can validate by following this [guide](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/webhook-event-delivery.md) or by starting your application with Azure App Configuration Spring Web Library already configured, which registers your application for you. To use an event subscription, follow the steps in the next two sections.

1. Set an environment variable.

    ### [Microsoft Entra ID (recommended)](#tab/entra-id)
    Set the environment variable named **APP_CONFIGURATION_ENDPOINT** to the endpoint of your App Configuration store found under the *Overview* of your store in the Azure portal.

    If you use the Windows command prompt, run the following command and restart the command prompt to allow the change to take effect:

    ```cmd
    setx APP_CONFIGURATION_ENDPOINT "endpoint-of-your-app-configuration-store"
    ```

    If you use PowerShell, run the following command:

    ```powershell
    $Env:APP_CONFIGURATION_ENDPOINT = "endpoint-of-your-app-configuration-store"
    ```

    If you use macOS or Linux, run the following command:

    ```bash
    export APP_CONFIGURATION_ENDPOINT='<AppConfigurationEndpoint>'
    ```

    ### [Connection string](#tab/connection-string)
    Set the environment variable named **APP_CONFIGURATION_CONNECTION_STRING** to the read-only connection string of your App Configuration store found under *Access keys* of your store in the Azure portal.

    If you use the Windows command prompt, run the following command and restart the command prompt to allow the change to take effect:

    ```cmd
    setx APP_CONFIGURATION_CONNECTION_STRING "connection-string-of-your-app-configuration-store"
    ```

   If you use PowerShell, run the following command:

    ```powershell
    $Env:APP_CONFIGURATION_CONNECTION_STRING = "connection-string-of-your-app-configuration-store"
    ```

    If you use macOS or Linux, run the following command:

    ```bash
    export APP_CONFIGURATION_CONNECTION_STRING='<AppConfigurationConnectionString>'
    ```
    ---

    Restart the command prompt to allow the change to take effect. Print the value of the environment variable to validate that it's set properly.

    ---

1. Update your `pom.xml` under the `azure-webapp-maven-plugin`'s `configuration` add

   ```xml
   <appSettings>
     <AppConfigurationConnectionString>${AppConfigurationConnectionString}</AppConfigurationConnectionString>
   </appSettings>
   ```

1. Run the following command to build the console app:

   ```shell
    mvn package
   ```

1. After the build successfully completes, run the following command to run the app locally:

    ```shell
    mvn azure-webapp:deploy
    ```

## Set up an event subscription

1. Open the App Configuration resource in the Azure portal, and then select **+ Event Subscription** in the **Events** pane.

    The events pane has an option to create new Subscriptions.

1. Enter a name for the **Event Subscription** and the **System Topic**. By default, **Key-value modified** and **Key-value deleted** are selected under **Event Types**. Use the **Filters** tab to choose the exact reasons that a push event is sent.

    Events require a name, topic, and filters.

1. For **Endpoint Type**, select **Web Hook**, and then select **Select an endpoint**.

    Selecting Endpoint creates a new blade to enter the endpoint URI.

1. The endpoint is the URI of the application + "/actuator/appconfiguration-refresh?{your-token-name}={your-token-secret}". For example, `https://my-azure-webapp.azurewebsites.net/actuator/appconfiguration-refresh?myToken=myTokenSecret`

1. Select **Create** to create the event subscription. When you select **Create**, the portal sends a registration request for the webhook to your application. The Azure App Configuration client library receives the request, verifies it, and returns a valid response.

1. Select **Event Subscriptions** in the **Events** pane to validate that the subscription was created successfully.

    A webhook appears in a table at the bottom of the page.

> **Note:**
> When subscribing for configuration changes, one or more filters can be used to reduce the number of events sent to your application. These can be configured either as [Event Grid subscription filters](../event-grid/event-filtering.md). For example, a subscription filter can be used to only subscribe to events for changes in a key that starts with a specific string.

> **Note:**
> If you have multiple instances of your application running, you can use the `appconfiguration-refresh-bus` endpoint which requires setting up Azure Service Bus, which is used to send a message to all instances of your application to refresh their configuration. This is useful if you have multiple instances of your application running and want to ensure that all instances are updated with the latest configuration. This endpoint isn't available unless you have `spring-cloud-bus` as a dependency with it configured. For more information, see [Azure Service Bus Spring Cloud Bus documentation](https://learn.microsoft.com/azure/developer/java/spring-framework/using-service-bus-in-spring-applications). The service bus connection only needs to be set up and the Azure App Configuration library will handle sending and receiving the messages.

## Verify and test application

1. After your application is running, use *curl* to test your application, for example:

   ```cmd
   curl -X GET https://my-azure-webapp.azurewebsites.net
   ```

1. Open the **Azure portal** and navigate to your App Configuration resource associated with your application. Select **Configuration Explorer** under **Operations** and update the values of the following keys:

    | Key | Value |
    | --- | --- |
    | application/config.message | Hello - Updated |

1. Refresh the browser page to see the new message displayed.

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

In this tutorial, you enabled your Java app to dynamically refresh configuration settings from App Configuration. For further questions, see the [reference documentation](https://go.microsoft.com/fwlink/?linkid=2180917). It has all of the details on how the Spring Cloud Azure App Configuration library works. To learn how to use an Azure managed identity to streamline the access to App Configuration, continue to the next tutorial.

> 
> [Managed identity integration](howto-integrate-azure-managed-service-identity.md)
