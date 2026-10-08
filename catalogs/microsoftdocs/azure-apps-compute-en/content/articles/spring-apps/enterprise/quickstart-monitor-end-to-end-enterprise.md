---
title: "Quickstart - Monitor Applications End-to-End"
titleSuffix: Azure Spring Apps Enterprise plan
description: Explains how to monitor apps running the Azure Spring Apps Enterprise plan by using Application Insights and Log Analytics.
author: KarlErickson
ms.author: karler
ms.reviewer: asirveda # external contributor: paly@vmware.com
ms.service: azure-spring-apps
ms.topic: quickstart
ms.date: 08/19/2025
ms.update-cycle: 1095-days
ms.custom:
  - devx-track-java
  - devx-track-extended-java
  - devx-track-azurecli
  - sfi-image-nochange
  - sfi-ropc-nochange
---

# Quickstart: Monitor applications end-to-end


> **Note:**
> The **Basic**, **Standard**, and **Enterprise** plans entered a retirement period on March 17, 2025. For more information, see the [Azure Spring Apps retirement announcement](../basic-standard/retirement-announcement.md).


**This article applies to:** ❎ Basic/Standard ✅ Enterprise

This quickstart shows you how monitor apps running the Azure Spring Apps Enterprise plan by using Application Insights and Log Analytics.

> **Note:**
> You can monitor your Spring workloads end-to-end by using any tool and platform of your choice, including App Insights, Log Analytics, New Relic, Dynatrace, AppDynamics, Elastic, or Splunk. For more information, see [Working with other monitoring tools](#working-with-other-monitoring-tools) later in this article.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [The Azure CLI version 2.45.0 or higher](https://learn.microsoft.com/cli/azure/install-azure-cli).
- [Git](https://git-scm.com/).
- 
<!-- 
Use the following line at the end of the Prerequisites section, where relevant. Note that the bullet point is NOT included in the include itself, but should be included on the line you paste in, exactly as shown below. The Prerequisites list should not have any line breaks between bullet points, including this one. These specific instructions are necessary so that the Prerequisites list will build as a single-spaced list, without extra blank spaces.

- [!INCLUDE [install-enterprise-extension](includes/install-enterprise-extension.md)]

-->

The Azure Spring Apps Enterprise plan extension. Use the following command to remove previous versions and install the latest Enterprise plan extension. If you previously installed the `spring-cloud` extension, uninstall it to avoid configuration and version mismatches.

   ```azurecli
   az extension add --upgrade --name spring
   az extension remove --name spring-cloud
   ```

- Resources to monitor, such as the ones created in the following quickstarts:
  - [Build and deploy apps to Azure Spring Apps using the Enterprise plan](quickstart-deploy-apps-enterprise.md)
  - [Integrate with Azure Database for PostgreSQL and Azure Cache for Redis](quickstart-integrate-azure-database-and-redis-enterprise.md)
  - [Load application secrets using Key Vault](quickstart-key-vault-enterprise.md)

## Update applications

You must manually provide the Application Insights connection string to the Order Service (ASP.NET core) and Cart Service (python) applications. The following instructions describe how to provide this connection string and increase the sampling rate to Application Insights.

> **Note:**
> Currently only the buildpacks for Java and Node.js applications support Application Insights instrumentation.

1. Create variables to hold the resource names by using the following commands. Be sure to replace the placeholders with your own values. The name of your Azure Spring Apps service instance must be between 4 and 32 characters long and can contain only lowercase letters, numbers, and hyphens. The first character of the service name must be a letter and the last character must be either a letter or a number.

   ```azurecli
   export RESOURCE_GROUP="<resource-group-name>"
   export APP_INSIGHTS_NAME="<app-insights-name>"
   export KEY_VAULT_NAME="<key-vault-name>"
   export AZURE_SPRING_APPS_SERVICE_INSTANCE_NAME="<Azure-Spring-Apps-service-instance-name>"
   ```

   > **Note:**
   > By default, the APP_INSIGHTS_NAME is same as the AZURE_SPRING_APPS_SERVICE_INSTANCE_NAME.

1. Use the following commands to retrieve the Application Insights connection string and set it in Key Vault:

   ```azurecli
   export CONNECTION_STRING=$(az monitor app-insights component show \
       --resource-group ${RESOURCE_GROUP} \
       --app ${APP_INSIGHTS_NAME} \
       --query "connectionString" \
       --output tsv)

   az keyvault secret set \
       --vault-name ${KEY_VAULT_NAME} \
       --name "ApplicationInsights--ConnectionString" \
       --value ${CONNECTION_STRING}
   ```

1. Use the following command to update the sampling rate for the Application Insights binding to increase the amount of data available:

   ```azurecli
   az spring build-service builder buildpack-binding set \
       --resource-group ${RESOURCE_GROUP} \
       --service ${AZURE_SPRING_APPS_SERVICE_INSTANCE_NAME} \
       --builder-name default \
       --name default \
       --type ApplicationInsights \
       --properties sampling-rate=100 connection_string=${CONNECTION_STRING}
   ```

1. Use the following commands to restart applications to reload configuration:

   ```azurecli
   az spring app restart \
       --resource-group ${RESOURCE_GROUP} \
       --service ${AZURE_SPRING_APPS_SERVICE_INSTANCE_NAME} \
       --name cart-service

   az spring app restart \
       --resource-group ${RESOURCE_GROUP} \
       --service ${AZURE_SPRING_APPS_SERVICE_INSTANCE_NAME} \
       --name order-service

   az spring app restart \
       --resource-group ${RESOURCE_GROUP} \
       --service ${AZURE_SPRING_APPS_SERVICE_INSTANCE_NAME} \
       --name catalog-service

   az spring app restart \
       --resource-group ${RESOURCE_GROUP} \
       --service ${AZURE_SPRING_APPS_SERVICE_INSTANCE_NAME} \
       --name frontend

   az spring app restart \
       --resource-group ${RESOURCE_GROUP} \
       --service ${AZURE_SPRING_APPS_SERVICE_INSTANCE_NAME} \
       --name payment-service
   ```

1. If you've configured [single sign-on](quickstart-configure-single-sign-on-enterprise.md), use the following commands to restart applications to reload identity-service app configuration:

   ```azurecli
   az spring app restart \
       --resource-group ${RESOURCE_GROUP} \
       --service ${AZURE_SPRING_APPS_SERVICE_INSTANCE_NAME} \
       --name identity-service
   ```

   For the Java and Node.js applications, restarting will allow the new sampling rate to take effect. For the non-Java applications, restarting will allow them to access the newly added Instrumentation Key from the Key Vault.

## View logs

There are two ways to see logs on Azure Spring Apps: log streaming of real-time logs per app instance or **Log Analytics** for aggregated logs with advanced query capability

### Use log streaming

Generate traffic in the application by moving through the application, viewing the catalog, and placing orders. Use the following commands to generate traffic continuously, until canceled:

```azurecli
export GATEWAY_URL=$(az spring gateway show \
    --resource-group ${RESOURCE_GROUP} \
    --service ${AZURE_SPRING_APPS_SERVICE_INSTANCE_NAME} \
    --query "properties.url" \
    --output tsv)

export GATEWAY_URL=https://${GATEWAY_URL} 

cd azure-spring-apps-enterprise/load-test/traffic-generator
./gradlew gatlingRun-com.vmware.acme.simulation.GuestSimulation.java
```

Use the following command to get the latest 100 lines of application console logs from the Catalog Service application:

```azurecli
az spring app logs \
    --resource-group ${RESOURCE_GROUP} \
    --name catalog-service \
    --service ${AZURE_SPRING_APPS_SERVICE_INSTANCE_NAME} \
    --lines 100
```

By adding the `--follow` option, you can get real-time log streaming from an app. Use the following command to try log streaming for the Catalog Service application:

```azurecli
az spring app logs \
    --resource-group ${RESOURCE_GROUP} \
    --name catalog-service \
    --service ${AZURE_SPRING_APPS_SERVICE_INSTANCE_NAME} \
    --follow
```

> **Tip:**
> You can use az spring app logs `--help` to explore more parameters and log stream functionalities.

### Use Log Analytics

Navigate to the Azure portal and open the Log Analytics instance that you created. You can find the Log Analytics instance in the same resource group where you created the Azure Spring Apps service instance.

On the Log Analytics page, select the **Logs** pane and run any of the following sample queries for Azure Spring Apps.

Type and run the following Kusto query to see application logs:

```kusto
AppPlatformLogsforSpring
| where TimeGenerated > ago(24h)
| limit 500
| sort by TimeGenerated
| project TimeGenerated, AppName, Log
```

This query produces results similar to the ones shown in the following screenshot:

Screenshot of Azure portal showing example output from all application logs query.

Type and run the following Kusto query to see `catalog-service` application logs:

```kusto
AppPlatformLogsforSpring
| where AppName has "catalog-service"
| limit 500
| sort by TimeGenerated
| project TimeGenerated, AppName, Log
```

This query produces results similar to the ones shown in the following screenshot:

Screenshot of Azure portal showing example output from Catalog Service application logs.

Type and run the following Kusto query to see errors and exceptions thrown by each app:

```kusto
AppPlatformLogsforSpring
| where Log contains "error" or Log contains "exception"
| extend FullAppName = strcat(ServiceName, "/", AppName)
| summarize count_per_app = count() by FullAppName, ServiceName, AppName, _ResourceId
| sort by count_per_app desc
| render piechart
```

This query produces results similar to the ones shown in the following screenshot:

Screenshot of Azure portal showing example output from the Ingress Logs.

Type and run the following Kusto query to see all in the inbound calls into Azure Spring Apps:

```kusto
AppPlatformIngressLogs
| project TimeGenerated, RemoteAddr, Host, Request, Status, BodyBytesSent, RequestTime, ReqId, RequestHeaders
| sort by TimeGenerated
```

Type and run the following Kusto query to see all the logs from the managed Spring Cloud
Config Gateway managed by Azure Spring Apps:

```kusto
AppPlatformSystemLogs
| where LogType contains "SpringCloudGateway"
| project TimeGenerated,Log
```

This query produces results similar to the ones shown in the following screenshot:

Screenshot of Azure portal showing example output from the Spring Cloud Gateway Logs.

Type and run the following Kusto query to see all the logs from the managed Spring Cloud
Service Registry managed by Azure Spring Apps:

```kusto
AppPlatformSystemLogs
| where LogType contains "ServiceRegistry"
| project TimeGenerated, Log
```

This query produces results similar to the ones shown in the following screenshot:

Screenshot of Azure portal showing example output from service registry logs.

## Use tracing

In the Azure portal, open the Application Insights instance created by Azure Spring Apps and start monitoring Spring Boot applications. You can find the Application Insights instance in the same resource group where you created an Azure Spring Apps service instance.

Navigate to the **Application map** pane, which will be similar to the following screenshot:

Screenshot of Azure portal showing the Application Map of Azure Application Insights.

Navigate to the **Performance** pane, which will be similar to the following screenshot:

Screenshot of Azure portal showing the Performance pane of Azure Application Insights.

Navigate to the **Performance/Dependencies** pane. Here you can see the performance number for dependencies, particularly SQL calls, similar to what's shown in the following screenshot:

Screenshot of Azure portal showing the Dependencies section of the Performance pane of Azure Application Insights.

Navigate to the **Performance/Roles** pane. Here you can see the performance metrics for individual instances or roles, similar to what's shown in the following screenshot:

Screenshot of Azure portal showing the Roles section of the Performance pane of Azure Application Insights.

Select a SQL call to see the end-to-end transaction in context, similar to what's shown in the following screenshot:

Screenshot of Azure portal showing the end-to-end transaction of an S Q L call.

Navigate to the **Failures/Exceptions** pane. Here you can see a collection of exceptions, similar to what's shown in the following screenshot:

Screenshot of Azure portal showing application failures graphed.

## View metrics

Navigate to the **Metrics** pane. Here you can see metrics contributed by Spring Boot apps, Spring Cloud modules, and dependencies. The chart in the following screenshot shows **http_server_requests** and **Heap Memory Used**:

Screenshot of Azure portal showing metrics over time graph.

Spring Boot registers a large number of core metrics: JVM, CPU, Tomcat, Logback, and so on.
The Spring Boot auto-configuration enables the instrumentation of requests handled by Spring MVC.
The REST controllers `ProductController` and `PaymentController` have been instrumented by the `@Timed` Micrometer annotation at the class level.

The `acme-catalog` application has the following custom metric enabled: @Timed: `store.products`

The `acem-payment` application has the following custom metric enabled: @Timed: `store.payment`

You can see these custom metrics in the **Metrics** pane, as shown in the following screenshot.

Screenshot showing custom metrics instrumented by Micrometer.

Navigate to the **Live Metrics** pane. Here you can see live metrics on screen with low latencies < 1 second, as shown in the following screenshot:

Screenshot showing the live metrics of all applications.

## Working with other monitoring tools

The Azure Spring Apps Enterprise plan also supports exporting metrics to other tools, including the following tools:

- AppDynamics
- ApacheSkyWalking
- Dynatrace
- ElasticAPM
- NewRelic

You can add more bindings to a builder in Tanzu Build Service by using the following command:

```azurecli
az spring build-service builder buildpack-binding create \
    --resource-group <resource-group-name> \
    --service <Azure-Spring-Apps-service-instance-name> \
    --builder-name <builder-name> \
    --name <binding-name> \
    --type <ApplicationInsights|AppDynamics|ApacheSkyWalking|Dynatrace|ElasticAPM|NewRelic> \
    --properties <connection-properties>
    --secrets <secret-properties>
```

## Clean up resources

If you plan to continue working with subsequent quickstarts and tutorials, you might want to leave these resources in place. When no longer needed, delete the resource group, which deletes the resources in the resource group. To delete the resource group by using Azure CLI, use the following commands:

```azurecli
echo "Enter the Resource Group name:" &&
read resourceGroupName &&
az group delete --name $resourceGroupName &&
echo "Press [ENTER] to continue ..."
```

## Next steps

Continue on to any of the following optional quickstarts:

- [Configure single sign-on](quickstart-configure-single-sign-on-enterprise.md)
- [Integrate Azure Database for PostgreSQL and Azure Cache for Redis](quickstart-integrate-azure-database-and-redis-enterprise.md)
- [Load application secrets using Key Vault](quickstart-key-vault-enterprise.md)
- [Set request rate limits](quickstart-set-request-rate-limits-enterprise.md)
- [Automate deployments](quickstart-automate-deployments-github-actions-enterprise.md)
- [Integrate Azure OpenAI](quickstart-fitness-store-azure-openai.md)
