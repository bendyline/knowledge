---
title: Configure APM Platforms for Tomcat, JBoss, or Java SE Apps
description: Learn how to configure APM platforms, such as Application Insights, New Relic, and AppDynamics, for Tomcat, JBoss, or Java SE app on Azure App Service.
keywords: azure app service, web app, windows, oss, java, tomcat, jboss, spring boot, quarkus
ms.devlang: java
ms.topic: how-to
ms.date: 03/27/2026
zone_pivot_groups: app-service-java-hosting
adobe-target: true
author: cephalin
ms.author: cephalin
ms.service: azure-app-service
ms.custom:
  - devx-track-java
  - devx-track-azurecli
  - devx-track-extended-java
  - linux-related-content
  - sfi-ropc-nochange

# customer intent: As a developer, I want to configure APM platforms for Tomcat, JBoss, or Java SE apps so that I can monitor my apps. 
 
---

# Configure APM platforms for Tomcat, JBoss, or Java SE apps in Azure App Service

This article shows how to connect Java applications deployed on Azure App Service with Azure Monitor Application Insights, New Relic, and AppDynamics application performance monitoring (APM) platforms.


Azure App Service runs Java web applications in three types on a fully managed service:

- Java Standard Edition (SE). Java SE can run an app deployed as a Java archive (JAR) package that contains an embedded server, such as Spring Boot, Quarkus, Dropwizard, or an app with an embedded Tomcat or Jetty server.
- Tomcat. The built-in Tomcat server can run an app deployed as a web application archive (WAR) package.
- JBoss Enterprise Application Platform (EAP): The built-in JBoss EAP server can run an app deployed as a WAR or enterprise archive (EAR) package. This option is supported for Linux apps in a set of pricing tiers that include Free, Premium v3, and Isolated v2.

> **Note:**
> JBoss EAP on App Service now supports Bring Your Own License (BYOL) billing. BYOL enables customers who have existing Red Hat subscriptions to apply those licenses directly to their JBoss EAP deployments on Azure App Service. For more information, see [BYOL Support for JBoss EAP on App Service](https://aka.ms/byol-eap-jboss).


## Configure Application Insights

Azure Monitor Application Insights is a cloud native application monitoring service. It enables you to observe failures, bottlenecks, and usage patterns to improve application performance and reduce mean time to resolution (MTTR). You can enable monitoring for your Node.js or Java apps, autocollecting logs, metrics, and distributed traces. Application Insights eliminates the need for you to include an SDK in your app. For more information about the available app settings for configuring the agent, see the [Application Insights documentation](https://learn.microsoft.com/azure/azure-monitor/app/java-standalone-config).

# [Azure portal](#tab/portal)

To enable Application Insights from the Azure portal, in the left menu, select **Monitoring** > **Application Insights**. Select **Turn on Application Insights**.

By default, a new Application Insights resource of the same name as your web app is used. You can choose to use an existing Application Insights resource, or change the name. Select **Apply** at the bottom.

# [Azure CLI](#tab/cli)

To enable by using the Azure CLI, you need to create an Application Insights resource and set a couple of app settings to connect Application Insights to your web app.

1. Enable the Application Insights extension.

    ```azurecli
    az extension add -n application-insights
    ```

1. Create an Application Insights resource using the following CLI command. Replace the placeholders with your resource name and group.

    ```azurecli
    az monitor app-insights component create --app <resource-name> -g <resource-group> --location westus2  --kind web --application-type web
    ```

    Note the values for `connectionString` and `instrumentationKey`. You need these values in the next step.

    > **Note:**
    > To retrieve a list of other locations, run `az account list-locations`.

1. Set the instrumentation key, connection string, and monitoring agent version as app settings on the web app. Replace `<instrumentationKey>` and `<connectionString>` with the values from the previous step.

    # [Linux](#tab/linux)
    
    ```azurecli
    az webapp config appsettings set -n <webapp-name> -g <resource-group> --settings "APPINSIGHTS_INSTRUMENTATIONKEY=<instrumentationKey>" "APPLICATIONINSIGHTS_CONNECTION_STRING=<connectionString>" "ApplicationInsightsAgent_EXTENSION_VERSION=~3" "XDT_MicrosoftApplicationInsights_Mode=default"
    ```

    # [Windows](#tab/windows)

    ```azurecli
    az webapp config appsettings set -n <webapp-name> -g <resource-group> --settings "APPINSIGHTS_INSTRUMENTATIONKEY=<instrumentationKey>" "APPLICATIONINSIGHTS_CONNECTION_STRING=<connectionString>" "ApplicationInsightsAgent_EXTENSION_VERSION=~3" "XDT_MicrosoftApplicationInsights_Mode=default" "XDT_MicrosoftApplicationInsights_Java=1"
    ```

    ---

---

## Configure New Relic

To configure New Relic: 

# [Linux](#tab/linux)

**Applies to: java-jboss**


> **Note:**
> The latest [New Relic documentation](https://docs.newrelic.com/install/java/?deployment=appServer&framework=jboss) lists JBoss EAP support up to 7.x. JBoss EAP 8.x isn't yet supported.



1. Create a New Relic account at [NewRelic.com](https://newrelic.com/signup).
1. [Download the Java agent from New Relic](https://download.newrelic.com/newrelic/java-agent/newrelic-agent/current/newrelic-java.zip).
1. Copy your license key, you need it to configure the agent later.
1. [SSH into your App Service instance](configure-linux-open-ssh-session.md) and create a new directory */home/site/wwwroot/apm*.
1. Upload the unpacked New Relic Java agent files into a directory under */home/site/wwwroot/apm*. The files for your agent should be in */home/site/wwwroot/apm/newrelic*.
1. Modify the YAML file at */home/site/wwwroot/apm/newrelic/newrelic.yml*. Replace the placeholder license value with your license key.
1. In the Azure portal, browse to your application in App Service and create a new Application Setting.

    **Applies to: java-javase,java-jboss**

    
    Create an environment variable named `JAVA_OPTS` with the value `-javaagent:/home/site/wwwroot/apm/newrelic/newrelic.jar`.



    **Applies to: java-tomcat**


    Create an environment variable named `CATALINA_OPTS` with the value `-javaagent:/home/site/wwwroot/apm/newrelic/newrelic.jar`.



# [Windows](#tab/windows)

1. Create a New Relic account at [NewRelic.com](https://newrelic.com/signup).
1. Download the Java agent from New Relic. It has a file name similar to *newrelic-java-x.x.x.zip*.
1. Copy your license key, you need it to configure the agent later.
1. [SSH into your App Service instance](configure-linux-open-ssh-session.md) and create a new directory */home/site/wwwroot/apm*.
1. Upload the unpacked New Relic Java agent files into a directory under */home/site/wwwroot/apm*. The files for your agent should be in */home/site/wwwroot/apm/newrelic*.
1. Modify the YAML file at */home/site/wwwroot/apm/newrelic/newrelic.yml*. Replace the placeholder license value with your license key.
1. In the Azure portal, browse to your application in App Service and create a new Application Setting.

    **Applies to: java-javase**

    
    Create an environment variable named `JAVA_OPTS` with the value `-javaagent:/home/site/wwwroot/apm/newrelic/newrelic.jar`.



    **Applies to: java-tomcat**


    Create an environment variable named `CATALINA_OPTS` with the value `-javaagent:/home/site/wwwroot/apm/newrelic/newrelic.jar`.



---

**Applies to: java-javase,java-jboss**


> **Note:**
> If you already have an environment variable for `JAVA_OPTS`, append the `-javaagent:/...` option to the end of the current value.



**Applies to: java-tomcat**


> **Note:**
> If you already have an environment variable for `CATALINA_OPTS`, append the `-javaagent:/...` option to the end of the current value.



## Configure AppDynamics

To configure AppDynamics:

# [Linux](#tab/linux)

1. Create an AppDynamics account at [AppDynamics.com](https://www.appdynamics.com/community/register/).
1. Download the Java agent from the AppDynamics website. The file name is similar to *AppServerAgent-x.x.x.xxxxx.zip*.
1. [SSH into your App Service instance](configure-linux-open-ssh-session.md) and create a new directory */home/site/wwwroot/apm*.
1. Upload the Java agent files into a directory under */home/site/wwwroot/apm*. The files for your agent should be in */home/site/wwwroot/apm/appdynamics*.
1. In the Azure portal, browse to your application in App Service and create a new Application Setting.

    **Applies to: java-javase**


    Create an environment variable named `JAVA_OPTS` with the value `-javaagent:/home/site/wwwroot/apm/appdynamics/javaagent.jar -Dappdynamics.agent.applicationName=<app-name>` where `<app-name>` is your App Service name. If you already have an environment variable for `JAVA_OPTS`, append the `-javaagent:/...` option to the end of the current value.



    **Applies to: java-tomcat**


    Create an environment variable named `CATALINA_OPTS` with the value `-javaagent:/home/site/wwwroot/apm/appdynamics/javaagent.jar -Dappdynamics.agent.applicationName=<app-name>` where `<app-name>` is your App Service name. If you already have an environment variable for `CATALINA_OPTS`, append the `-javaagent:/...` option to the end of the current value.



    **Applies to: java-jboss**


    <!-- For **JBoss EAP**, `[TODO]`. -->



# [Windows](#tab/windows)

1. Create an AppDynamics account at [AppDynamics.com](https://www.appdynamics.com/community/register/).
2. Download the Java agent from the AppDynamics website. The file name is similar to *AppServerAgent-x.x.x.xxxxx.zip*.
3. Use the [Kudu console](https://github.com/projectkudu/kudu/wiki/Kudu-console) to create a new directory */home/site/wwwroot/apm*.
4. Upload the Java agent files into a directory under */home/site/wwwroot/apm*. The files for your agent should be in */home/site/wwwroot/apm/appdynamics*.
5. In the Azure portal, browse to your application in App Service and create a new Application Setting.

    **Applies to: java-javase**

    
    Create an environment variable named `JAVA_OPTS` with the value `-javaagent:/home/site/wwwroot/apm/appdynamics/javaagent.jar -Dappdynamics.agent.applicationName=<app-name>` where `<app-name>` is your App Service name. If you already have an environment variable for `JAVA_OPTS`, append the `-javaagent:/...` option to the end of the current value.



    **Applies to: java-tomcat**


    Create an environment variable named `CATALINA_OPTS` with the value `-javaagent:/home/site/wwwroot/apm/appdynamics/javaagent.jar -Dappdynamics.agent.applicationName=<app-name>` where `<app-name>` is your App Service name. If you already have an environment variable for `CATALINA_OPTS`, append the `-javaagent:/...` option to the end of the current value.



---

## Configure Datadog

# [Linux](#tab/linux)
The configuration options are different depending on which Datadog site your organization is using. See the official [Datadog Integration for Azure Documentation](https://docs.datadoghq.com/integrations/azure/)

# [Windows](#tab/windows)
The configuration options are different depending on which Datadog site your organization is using. See the official [Datadog Integration for Azure Documentation](https://docs.datadoghq.com/integrations/azure/)

---

## Configure Dynatrace

# [Linux](#tab/linux)
Dynatrace provides an [Azure Native Dynatrace Service](https://www.dynatrace.com/monitoring/technologies/azure-monitoring/). To monitor Azure App Services using Dynatrace, see the official [Dynatrace for Azure documentation](https://docs.dynatrace.com/docs/ingest-from/microsoft-azure-services).

# [Windows](#tab/windows)
Dynatrace provides an [Azure Native Dynatrace Service](https://www.dynatrace.com/monitoring/technologies/azure-monitoring/). To monitor Azure App Services using Dynatrace, see the official [Dynatrace for Azure documentation](https://docs.dynatrace.com/docs/ingest-from/microsoft-azure-services).

---

## Related content

Visit the [Azure for Java Developers](https://learn.microsoft.com/java/azure/) center to find Azure quickstarts, tutorials, and Java reference documentation.

- [App Service Linux FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/faq-app-service-linux.yml)
- [Environment variables and app settings reference](reference-app-settings.md)
