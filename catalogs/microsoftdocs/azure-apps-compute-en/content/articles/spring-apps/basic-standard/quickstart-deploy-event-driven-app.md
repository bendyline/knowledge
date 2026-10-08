---
title: Quickstart - Deploy Event-Driven Application to Azure Spring Apps
description: Learn how to deploy an event-driven application to Azure Spring Apps.
author: KarlErickson
ms.service: azure-spring-apps
ms.topic: quickstart
ms.date: 08/19/2025
ms.update-cycle: 1095-days
ms.author: karler
ms.reviewer: rujche
ms.custom: devx-track-java, devx-track-extended-java, devx-track-azurecli, mode-other, engagement-fy23
zone_pivot_groups: spring-apps-plan-selection
---

# Quickstart: Deploy an event-driven application to Azure Spring Apps


> **Note:**
> The **Basic**, **Standard**, and **Enterprise** plans entered a retirement period on March 17, 2025. For more information, see the [Azure Spring Apps retirement announcement](retirement-announcement.md).


**This article applies to:** ✅ Basic/Standard ✅ Enterprise

This article explains how to deploy a Spring Boot event-driven application to Azure Spring Apps.

The sample project is an event-driven application that subscribes to a [Service Bus queue](../../service-bus-messaging/service-bus-queues-topics-subscriptions.md#queues) named `lower-case`, and then handles the message and sends another message to another queue named `upper-case`. To make the app simple, message processing just converts the message to uppercase. The following diagram depicts this process:

Diagram showing the Azure Spring Apps event-driven app architecture.

This article provides the following options for deploying to Azure Spring Apps:

**Applies to: sc-standard**



<!-- 
Use the following line at the end of the heading Prerequisites, with blank lines before and after. Each quickstart should provide two tools for developers.

[!INCLUDE [quickstart-tool-introduction](includes/quickstart-deploy-event-driven-app/quickstart-tool-introduction.md)]

-->

- The **Azure portal** option is the easiest and the fastest way to create resources and deploy applications with a single click. This option is suitable for Spring developers who want to quickly deploy applications to Azure cloud services.
- The **Azure portal + Maven plugin** option is a more conventional way to create resources and deploy applications step by step. This option is suitable for Spring developers using Azure cloud services for the first time.
- The **Azure Developer CLI** option is a more efficient way to automatically create resources and deploy applications through simple commands. The Azure Developer CLI uses a template to provision the Azure resources needed and to deploy the application code. This option is suitable for Spring developers who are familiar with Azure cloud services.




**Applies to: sc-enterprise**


- The **Azure portal** option is the easiest and fastest way to create resources and deploy applications with a single click. This option is suitable for Spring developers who want to quickly deploy applications to Azure cloud services.
- The **Azure portal + Maven plugin** option is a more conventional way to create resources and deploy applications step by step. This option is suitable for Spring developers using Azure cloud services for the first time.
- The **Azure CLI** option uses a powerful command line tool to manage Azure resources. This option is suitable for Spring developers who are familiar with Azure cloud services.


## 1. Prerequisites

**Applies to: sc-standard**


### [Azure portal](#tab/Azure-portal)

- An Azure subscription. [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/spring-apps/basic-standard/quickstart-deploy-event-driven-app.md)

### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin)

- An Azure subscription. [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/spring-apps/basic-standard/quickstart-deploy-event-driven-app.md)
- [Git](https://git-scm.com/downloads).
- [Java Development Kit (JDK)](https://learn.microsoft.com/java/azure/jdk/), version 17.

### [Azure Developer CLI](#tab/Azure-Developer-CLI)

- An Azure subscription. [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/spring-apps/basic-standard/quickstart-deploy-event-driven-app.md)
- [Git](https://git-scm.com/downloads).
- [Java Development Kit (JDK)](https://learn.microsoft.com/java/azure/jdk/), version 17.
- [Azure Developer CLI (AZD)](https://learn.microsoft.com/azure/developer/azure-developer-cli/install-azd), version 1.2.0 or higher.

---



**Applies to: sc-enterprise**


### [Azure portal](#tab/Azure-portal-ent)

- An Azure subscription. [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/spring-apps/basic-standard/quickstart-deploy-event-driven-app.md)

### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin-ent)

- An Azure subscription. [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/spring-apps/basic-standard/quickstart-deploy-event-driven-app.md)
- [Git](https://git-scm.com/downloads).
- [Java Development Kit (JDK)](https://learn.microsoft.com/java/azure/jdk/), version 17.

### [Azure CLI](#tab/Azure-CLI)

- An Azure subscription. [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/spring-apps/basic-standard/quickstart-deploy-event-driven-app.md)
- [Git](https://git-scm.com/downloads).
- [Java Development Kit (JDK)](https://learn.microsoft.com/java/azure/jdk/), version 17.
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) version 2.45.0 or higher.

---



**Applies to: sc-standard**



<!-- 
For clarity of structure, a separate markdown file is used to describe how to deploy to Azure Spring Apps with Basic/Standard plan.

[!INCLUDE [deploy-event-driven-app-with-basic-standard-plan](includes/quickstart-deploy-event-driven-app/deploy-event-driven-app-basic-standard-plan.md)]

-->

## 2. Prepare the Spring project


<!-- 
For clarity of structure, a separate markdown file is used to describe how to prepare event-driven project.

[!INCLUDE [prepare-spring-project-event-driven](prepare-spring-project-event-driven.md)]

-->

### [Azure portal](#tab/Azure-portal)

The **Deploy to Azure** button in the next section launches an Azure portal experience that downloads a JAR package from the [ASA-Samples-Web-Application releases](https://github.com/Azure-Samples/ASA-Samples-Web-Application/releases) page on GitHub. No local preparation steps are needed.

### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin)

Use the following steps to prepare the sample locally:


<!-- 
For clarity of structure, a separate markdown file is used to describe how to prepare event-driven project with Git.

[!INCLUDE [prepare-spring-project-event-driven](prepare-spring-project-git-event-driven.md)]

-->

1. The sample project is ready on GitHub. Clone the sample project by using the following command:

   ```bash
   git clone https://github.com/Azure-Samples/ASA-Samples-Event-Driven-Application.git
   ```

1. Build the sample project by using the following commands:

   ```bash
   cd ASA-Samples-Event-Driven-Application
   ./mvnw clean package
   ```


### [Azure Developer CLI](#tab/Azure-Developer-CLI)

Use the following steps to prepare the sample locally. These steps use AZD to initialize the event-driven application from the Azure Developer CLI templates.

1. Open a terminal, create a new, empty folder, then navigate to it.
1. Use the following command to initialize the project:

   ```bash
   azd init --template Azure-Samples/ASA-Samples-Event-Driven-Application
   ```

   The following list describes the command interactions:

   - **Enter a new environment name**: Provide an environment name, which is used as a suffix for the resource group that is created to hold all Azure resources. This name should be unique within your Azure subscription.

   The console outputs messages similar to the following example:

   ```output
   Initializing a new project (azd init)
   
   (✓) Done: Initialized git repository
   (✓) Done: Downloading template code to: <your-local-path>

   Enter a new environment name: <your-env-name>

   SUCCESS: New project initialized!
   You can view the template code in your directory: <your-local-path>
   Learn more about running 3rd party code on our DevHub: https://aka.ms/azd-third-party-code-notice
   ```

---


## 3. Prepare the cloud environment


<!-- 
For clarity of structure, a separate markdown file is used to describe how to prepare event-driven project.

[!INCLUDE [provision-event-driven](provision-event-driven.md)]

-->

The main resources you need to run this sample are an Azure Spring Apps instance, an Azure Key Vault instance, and an Azure Service Bus instance. Use the following steps to create these resources.

### [Azure portal](#tab/Azure-portal)


<!--
For clarity of structure, a separate markdown file is used to describe how to prepare cloud env (enterprise plan) using Azure portal.

[!INCLUDE [prepare-cloud-environment-on-azure-portal](event-driven-prepare-cloud-env-standard-azure-portal.md)]

-->

This section uses a **Deploy to Azure** button to launch a deployment experience in the Azure portal. This experience uses an [ARM template](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/templates/overview.md) to create Azure resources.

### 3.1. Sign in to the Azure portal

Go to the [Azure portal](https://portal.azure.com/) and enter your credentials to sign in to the portal. The default view is your service dashboard.

### 3.2. Create Azure resources

Use the following steps to create all the Azure resources that the app depends on:

1. Select the following **Deploy to Azure** button to launch the deployment experience in the Azure portal:

   Button to deploy the Resource Manager template to Azure.

1. Fill out the form on the **Basics** tab. Use the following table as a guide for completing the form:

   | Setting | Suggested value | Description |
   | --- | --- | --- |
   | **Subscription** | Your subscription name. | The Azure subscription that you want to use for your server. If you have multiple subscriptions, choose the subscription in which you'd like to be billed for the resource. |
   | **Resource group** | **myresourcegroup** | A new resource group name or an existing one from your subscription. |
   | **Region** | The region closest to your users. | The region is used to create the resource group. |

1. Select **Review and Create** to review your selections. Then, select **Create** to deploy the app to Azure Spring Apps.

1. On the toolbar, select the **Notifications** icon (a bell) to monitor the deployment process. After the deployment finishes, you can select **Pin to dashboard**, which creates a tile for this service on your Azure portal dashboard as a shortcut to the service's **Overview** page. Select **Go to resource** to open the service's **Overview** page.

   Screenshot of the Azure portal that shows the Overview page with the custom deployment notifications pane open.



### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin)

### 3.1. Sign in to the Azure portal

Open your web browser and go to the [Azure portal](https://portal.azure.com/). Enter your credentials to sign in to the portal. The default view is your service dashboard.

### 3.2. Create a Service Bus instance


<!-- 
To reuse the Service Bus instance creation steps in other articles, a separate markdown file is used to describe how to provision Service Bus instance.

[!INCLUDE [provision-service-bus](provision-service-bus.md)]

-->
Use the following steps to create a Service Bus instance:

1. Select **Create a resource** in the corner of the Azure portal.

1. In the **Search services and marketplace** search box, search for *service bus*.

1. On the **Service Bus** section, select **Create**.

1. Fill out the form on the **Basics** tab. Use the following table as a guide for completing the form:

   | Setting | Suggested value | Description |
   | --- | --- | --- |
   | **Subscription** | Your subscription name. | The Azure subscription that you want to use for your server. If you have multiple subscriptions, choose the subscription in which you'd like to be billed for the resource. |
   | **Resource group** | **myresourcegroup** | A new resource group name or an existing one from your subscription. |
   | **Namespace name** | **my-srvbus** | A unique name that identifies your Service Bus service. |
   | **Location** | The location closest to your users. | The location that is closest to your users. |
   | **Hosting options and plans** | **Basic** | The pricing plan determines the resource and cost associated with your instance. |

1. Select **Review and Create** to review the creation parameters. Then, select **Create** to finish creating the Service Bus instance.

1. On the toolbar, select the **Notifications** icon (a bell) to monitor the deployment process. After the deployment finishes, you can select **Pin to dashboard**, which creates a tile for this service on your Azure portal dashboard as a shortcut to the service's **Overview** page. Select **Go to resource** to open the service's **Overview** page.

   Screenshot of the Azure portal that shows the Notifications pane of the Deployment Overview page.

1. Select **Go to resource** to go to the **Service Bus Namespace** page.


8. Select **Shared access policies** on the navigation menu and then select **RootManageSharedAccessKey**.

1. On the **SAS Policy: RootManageSharedAccessKey** page, copy and save the **Primary Connection String** value, which is used to set up connections from the Spring app.

1. Select **Queues** on the navigation menu and then select **Queue**.

1. On the **Create Queue** page, enter **lower-case** for **Name** and then select **Create**.

1. Create another queue by repeating the previous step using **upper-case** for **Name**.

### 3.3. Create an Azure Spring Apps instance

Use the following steps to create an Azure Spring Apps instance:

1. Select **Create a resource** in the corner of the Azure portal.

1. Select **Compute** > **Azure Spring Apps**.

1. Fill out the **Basics** form with the following information:

   Use the following table as a guide for completing the form. The recommended **Plan** is **Standard**.

   | Setting | Suggested value | Description |
   | --- | --- | --- |
   | **Subscription** | Your subscription name | The  Azure subscription that you want to use for your server. If you have multiple subscriptions, choose the subscription in which you'd like to be billed for the resource. |
   | **Resource group** | **myresourcegroup** | A new resource group name or an existing one from your subscription. |
   | **Name** | **myasa** | A unique name that identifies your Azure Spring Apps service. The name must be between 4 and 32 characters long and can contain only lowercase letters, numbers, and hyphens. The first character of the service name must be a letter and the last character must be either a letter or a number. |
   | **Plan** | **Standard** | The plan determines the resource and cost associated with your instance. |
   | **Region** | The region closest to your users | The location that is closest to your users. |
   | **Zone Redundant** | Unselected | Whether to create your Azure Spring Apps service in an Azure availability zone, it could only be supported in several regions at the moment. |

1. Select **Review and Create** to review your selections. Select **Create** to provision the Azure Spring Apps instance.

1. On the toolbar, select the **Notifications** icon (a bell) to monitor the deployment process. Once the deployment is done, you can select **Pin to dashboard**, which creates a tile for this service on your Azure portal dashboard as a shortcut to the service's **Overview** page. Selecting **Go to resource** opens the service's **Overview** page.

   Screenshot of the Azure portal showing the Notifications pane of the Deployment page.

### 3.4. Connect app instance to Service Bus instance

1. Go to your Azure Spring Apps instance in the Azure portal.

1. Select **Apps** in the navigation menu, then select **Create App**.

1. On the **Create App** page, enter **simple-event-driven-app** for **App name** and select **Java 17** for **Runtime platform**.

   Screenshot of the Azure portal showing the Create App pane with App name and Runtime platform options selected.

1. After the app creation, select the app name you created in the previous step.

1. On the **Configuration** page, select the **Environment variables** tab, enter **SERVICE_BUS_CONNECTION_STRING** for **Key**, paste the Service Bus connection string for **Value**, then select **Save**.

   Screenshot of the Azure portal showing the Environment variables tab of the App Configuration page.

### [Azure Developer CLI](#tab/Azure-Developer-CLI)

1. Use the following command to sign in to Azure with OAuth2. Ignore this step if you already logged in.

   ```bash
   azd auth login
   ```

   The console outputs messages similar to the following example:

   ```text
   Logged in to Azure.
   ```

1. Use the following command to set the template using the **standard** plan:

   ```bash
   azd env set PLAN standard
   ```

1. Use the following command to package a deployable copy of your application, provision the template's infrastructure to Azure, and deploy the application code to those newly provisioned resources:

   ```bash
   azd provision
   ```

   The following list describes the command interactions:

   - **Select an Azure Subscription to use**: Use arrows to move, type to filter, then press Enter.
   - **Select an Azure location to use**: Use arrows to move, type to filter, then press Enter.

   The console outputs messages similar to the following example:

   ```output
   SUCCESS: Your application was provisioned in Azure in xx minutes xx seconds.
   You can view the resources created under the resource group rg-<your-environment-name> in Azure portal:
   https://portal.azure.com/#@/resource/subscriptions/<your-subscription-id>/resourceGroups/rg-<your-environment-name>/overview
   ```

   > **Note:**
   > This command may take a while to complete. You're shown a progress indicator as it provisions Azure resources.

---


## 4. Deploy the app to Azure Spring Apps


<!-- 
For clarity of structure, a separate markdown file is used to describe how to prepare event-driven project.

[!INCLUDE [deployment-event-driven](deployment-event-driven.md)]

-->

### [Azure portal](#tab/Azure-portal)

The **Deploy to Azure** button in the previous section launches an Azure portal experience that includes application deployment, so nothing else is needed.

### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin)


<!-- 
Use the following line at the end of the heading Prerequisites, with blank lines before and after. App deployments with Spring Apps Maven plugin.

[!INCLUDE [event-driven-spring-apps-maven-plugin](includes/quickstart-deploy-event-driven-app/event-driven-spring-apps-maven-plugin.md)]
-->

Use the following steps to deploy using the [Maven plugin for Azure Spring Apps](https://github.com/microsoft/azure-maven-plugins/wiki/Azure-Spring-Apps):

1. Navigate to the **complete** directory, and then run the following command to configure the app in Azure Spring Apps:

   ```bash
   ./mvnw com.microsoft.azure:azure-spring-apps-maven-plugin:1.19.0:config
   ```

   The following list describes the command interactions:

   - **OAuth2 login**: You need to authorize the sign in to Azure based on the OAuth2 protocol.
   - **Select subscription**: Select the subscription list number of the Azure Spring Apps instance you created, which defaults to the first subscription in the list. If you use the default number, press <kbd>Enter</kbd> directly.
   - **Use existing Azure Spring Apps in Azure**: Press <kbd>y</kbd> to use the existing Azure Spring Apps instance.
   - **Select Azure Spring Apps for deployment**: Select the list number of the Azure Spring Apps instance you created. If you use the default number, press <kbd>Enter</kbd> directly.
   - **Use existing app in Azure Spring Apps \<your-instance-name\>**: Press <kbd>y</kbd> to use the app created.
   - **Confirm to save all the above configurations**: Press <kbd>y</kbd>. If you press <kbd>n</kbd>, the configuration isn't saved in the POM files.


2. Use the following command to deploy the app:

   ```bash
   ./mvnw azure-spring-apps:deploy
   ```

   The following list describes the command interaction:

   - **OAuth2 login**: You need to authorize the sign in to Azure based on the OAuth2 protocol.

   After the command is executed, you can see from the following log messages that the deployment was successful:

   ```output 
   [INFO] Deployment(default) is successfully created
   [INFO] Starting Spring App after deploying artifacts...
   [INFO] Deployment Status: Running
   ```

### [Azure Developer CLI](#tab/Azure-Developer-CLI)

Use the following steps to use AZD to package the app, provision the Azure resources required by the web application, and then deploy to Azure Spring Apps.

1. Use the following command to package a deployable copy of your application:

   ```bash
   azd package
   ```

   The console outputs messages similar to the following example:

   ```output
   SUCCESS: Your application was packaged for Azure in xx seconds.
   ```

1. Use the following command to deploy the application code to those newly provisioned resources:

   ```bash
   azd deploy
   ```

   The console outputs messages similar to the following example:

   ```output
   Deploying services (azd deploy)
   
   (✓) Done: Deploying service simple-event-driven-app
   - No endpoints were found
   
   SUCCESS: Your application was deployed to Azure in xx minutes xx seconds.
   You can view the resources created under the resource group rg-<your-environment-name> in Azure portal:
   https://portal.azure.com/#@/resource/subscriptions/<your-subscription-id>/resourceGroups/rg-<your-environment-name>/overview
   ```

> **Note:**
> You can also use `azd up` to combine the previous three commands: `azd provision` (provisions Azure resources), `azd package` (packages a deployable copy of your application), and `azd deploy` (deploys application code). For more information, see [Azure-Samples/ASA-Samples-Event-Driven-Application](https://github.com/Azure-Samples/ASA-Samples-Event-Driven-Application.git).

---





**Applies to: sc-enterprise**



<!-- 
For clarity of structure, a separate markdown file is used to describe how to deploy to Azure Spring Apps with Enterprise plan.

[!INCLUDE [deploy-event-driven-app-with-enterprise-plan](includes/quickstart-deploy-event-driven-app/deploy-event-driven-app-enterprise-plan.md)]

-->

## 2. Prepare the Spring project

### [Azure portal](#tab/Azure-portal-ent)

The **Deploy to Azure** button in the next section launches an Azure portal experience that downloads a JAR package from the [ASA-Samples-Web-Application releases](https://github.com/Azure-Samples/ASA-Samples-Web-Application/releases) page on GitHub. No local preparation steps are needed.

### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin-ent)

Use the following steps to prepare the sample locally:


<!-- 
For clarity of structure, a separate markdown file is used to describe how to prepare event-driven project with Git.

[!INCLUDE [prepare-spring-project-event-driven](prepare-spring-project-git-event-driven.md)]

-->

1. The sample project is ready on GitHub. Clone the sample project by using the following command:

   ```bash
   git clone https://github.com/Azure-Samples/ASA-Samples-Event-Driven-Application.git
   ```

1. Build the sample project by using the following commands:

   ```bash
   cd ASA-Samples-Event-Driven-Application
   ./mvnw clean package
   ```


### [Azure CLI](#tab/Azure-CLI)

Use the following steps to prepare the sample locally:


<!-- 
For clarity of structure, a separate markdown file is used to describe how to prepare event-driven project with Git.

[!INCLUDE [prepare-spring-project-event-driven](prepare-spring-project-git-event-driven.md)]

-->

1. The sample project is ready on GitHub. Clone the sample project by using the following command:

   ```bash
   git clone https://github.com/Azure-Samples/ASA-Samples-Event-Driven-Application.git
   ```

1. Build the sample project by using the following commands:

   ```bash
   cd ASA-Samples-Event-Driven-Application
   ./mvnw clean package
   ```


---

## 3. Prepare the cloud environment

The main resources you need to run this sample are an Azure Spring Apps instance and an Azure Service Bus instance. The following sections describe how to create these resources.

### [Azure portal](#tab/Azure-portal-ent)


<!--
For clarity of structure, a separate markdown file is used to describe how to prepare cloud env (enterprise plan) using Azure portal.

[!INCLUDE [prepare-cloud-environment-on-azure-portal](event-driven-prepare-cloud-env-enterprise-azure-portal.md)]

-->

This section uses a **Deploy to Azure** button to launch a deployment experience in the Azure portal. This experience uses an [ARM template](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/templates/overview.md) to create Azure resources.

### 3.1. Sign in to the Azure portal

Go to the [Azure portal](https://portal.azure.com/) and enter your credentials to sign in to the portal. The default view is your service dashboard.

### 3.2. Create Azure resources

Use the following steps to create all the Azure resources that the app depends on:

1. Select the following **Deploy to Azure** button to launch the deployment experience in the Azure portal:

   Button to deploy the Resource Manager template to Azure.

1. Fill out the form on the **Basics** tab. Use the following table as a guide for completing the form:

   | Setting | Suggested value | Description |
   | --- | --- | --- |
   | **Subscription** | Your subscription name. | The Azure subscription that you want to use for your server. If you have multiple subscriptions, choose the subscription in which you'd like to be billed for the resource. |
   | **Resource group** | **myresourcegroup** | A new resource group name or an existing one from your subscription. |
   | **Region** | The region closest to your users. | The region is used to create the resource group. |

1. Select **Review and Create** to review your selections. Then, select **Create** to deploy the app to Azure Spring Apps.

1. On the toolbar, select the **Notifications** icon (a bell) to monitor the deployment process. After the deployment finishes, you can select **Pin to dashboard**, which creates a tile for this service on your Azure portal dashboard as a shortcut to the service's **Overview** page. Select **Go to resource** to open the service's **Overview** page.

   Screenshot of the Azure portal that shows the Overview page with the custom deployment notifications pane open.



### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin-ent)

### 3.1. Sign in to the Azure portal

Go to the [Azure portal](https://portal.azure.com/) and enter your credentials to sign in to the portal. The default view is your service dashboard.

### 3.2. Create a Service Bus instance


<!-- 
To reuse the Service Bus instance creation steps in other articles, a separate markdown file is used to describe how to provision Service Bus instance.

[!INCLUDE [provision-service-bus](provision-service-bus.md)]

-->
Use the following steps to create a Service Bus instance:

1. Select **Create a resource** in the corner of the Azure portal.

1. In the **Search services and marketplace** search box, search for *service bus*.

1. On the **Service Bus** section, select **Create**.

1. Fill out the form on the **Basics** tab. Use the following table as a guide for completing the form:

   | Setting | Suggested value | Description |
   | --- | --- | --- |
   | **Subscription** | Your subscription name. | The Azure subscription that you want to use for your server. If you have multiple subscriptions, choose the subscription in which you'd like to be billed for the resource. |
   | **Resource group** | **myresourcegroup** | A new resource group name or an existing one from your subscription. |
   | **Namespace name** | **my-srvbus** | A unique name that identifies your Service Bus service. |
   | **Location** | The location closest to your users. | The location that is closest to your users. |
   | **Hosting options and plans** | **Basic** | The pricing plan determines the resource and cost associated with your instance. |

1. Select **Review and Create** to review the creation parameters. Then, select **Create** to finish creating the Service Bus instance.

1. On the toolbar, select the **Notifications** icon (a bell) to monitor the deployment process. After the deployment finishes, you can select **Pin to dashboard**, which creates a tile for this service on your Azure portal dashboard as a shortcut to the service's **Overview** page. Select **Go to resource** to open the service's **Overview** page.

   Screenshot of the Azure portal that shows the Notifications pane of the Deployment Overview page.

1. Select **Go to resource** to go to the **Service Bus Namespace** page.


8. Select **Queues** on the navigation menu, then select **Queue**.

1. On the **Create Queue** page, enter **lower-case** for **Name** and then select **Create**.

1. Create another queue by repeating the previous step using **upper-case** for **Name**.

### 3.3. Create an Azure Spring Apps instance


<!-- 
To reuse the Spring Apps instance creation steps in other articles, a separate markdown file is used to describe how to provision Spring Apps instance for event-driven app.

[!INCLUDE [provision-enterprise-azure-spring-apps](quickstart-deploy-event-driven-app/provision-enterprise-azure-spring-apps.md)]

-->

Use the following steps to create the service instance:

1. Select **Create a resource** in the corner of the Azure portal.

1. Select **Compute** > **Azure Spring Apps**.

1. Fill out the **Basics** form with the following information:

   | Setting | Suggested value | Description |
   | --- | --- | --- |
   | **Subscription** | Your subscription name. | The Azure subscription that you want to use for your server. If you have multiple subscriptions, choose the subscription in which you'd like to be billed for the resource. |
   | **Resource group** | **myresourcegroup** | A new resource group name or an existing one from your subscription. |
   | **Name** | **myasa** | A unique name that identifies your Azure Spring Apps service. The name must be between 4 and 32 characters long and can contain only lowercase letters, numbers, and hyphens. The first character of the service name must be a letter and the last character must be either a letter or a number. |
   | **Region** | The region closest to your users. | The location that is closest to your users. |
   | **Hosting options and plans** | **Enterprise** | The pricing plan that determines the resource and cost associated with your instance. |
   | **Zone Redundant** | Unselected | The option to create your Azure Spring Apps service in an Azure availability zone. This feature isn't currently supported in all regions. |
   | **Software IP Plan** | Pay-as-You-Go | The pricing plan that lets you pay as you go with Azure Spring Apps. |
   | **Deploy sample project** | Unselected | The option to use the built-in sample application. |

1. Select **Review and Create** to review your selections. Then, select **Create** to provision the Azure Spring Apps instance.

1. On the toolbar, select the **Notifications** icon (a bell) to monitor the deployment process. After the deployment finishes, you can select **Pin to dashboard**, which creates a tile for this service on your Azure portal dashboard as a shortcut to the service's **Overview** page.

   Screenshot of the Azure portal that shows the Notifications pane for Azure Spring Apps creation.

1. Select **Go to resource** to go to the **Azure Spring Apps Overview** page.


### 3.4. Connect app instance to Service Bus instance

Use the following steps to connect your service instances:

1. Go to your Azure Spring Apps instance in the Azure portal.

1. From the navigation pane, open the **Apps** pane and then select **Create App**.

1. On the **Create App** page, for the app name, use **simple-event-driven-app** and leave all the other fields with their default values.

1. Select **Create** to finish creating the app and then select the app to view the details.

1. Select **Service Connector** from the navigation pane and then select **Create** to create a new service connection.

1. Fill out the **Basics** tab with the following information:

   - **Service type**: Select **Service Bus**.
   - **Connection name**: Populated with an automatically generated name that you can modify.
   - **Subscription**: Select your subscription.
   - **Namespace**: Select the namespace you created.
   - **Client type**: Select **SpringBoot**.

1. Configure the **Next: Authentication** tab with the following information:

   
> **Note:**
> Microsoft recommends using the most secure authentication flow available. The authentication flow described in this procedure, such as for databases, caches, messaging, or AI services, requires a very high degree of trust in the application and carries risks not present in other flows. Use this flow only when more secure options, like managed identities for passwordless or keyless connections, are not viable. For local machine operations, prefer user identities for passwordless or keyless connections.


   - **Select the authentication type you'd like to use between your compute service and target service.**: Select **Connection string**.

1. Select **Next: Networking**. Use the default option **Configure firewall rules to enable access to target service**.

1. Select **Next: Review and Create** to review your selections, then select **Create** to create the connection.

### [Azure CLI](#tab/Azure-CLI)

### 3.1. Provide names for each resource

Create variables to hold the resource names by using the following commands. Be sure to replace the placeholders with your own values.

```azurecli
export RESOURCE_GROUP=<event-driven-app-resource-group-name>
export LOCATION=<desired-region>
export SERVICE_BUS_NAME_SPACE=<event-driven-app-service-bus-namespace>
export AZURE_SPRING_APPS_INSTANCE=<Azure-Spring-Apps-instance-name>
export APP_NAME=<event-driven-app-name>
```

### 3.2. Create a new resource group

Use the following steps to create a new resource group:

1. Use the following command to sign in to the Azure CLI:

   ```azurecli
   az login
   ```

1. Use the following command to set the default location:

   ```azurecli
   az configure --defaults location=${LOCATION}
   ```

1. Use the following command to list all available subscriptions to determine the subscription ID to use:

   ```azurecli
   az account list --output table
   ```

1. Use the following command to set the default subscription:

   ```azurecli
   az account set --subscription <subscription-ID>
   ```

1. Use the following command to create a resource group:

   ```azurecli
   az group create --resource-group ${RESOURCE_GROUP}
   ```

1. Use the following command to set the newly created resource group as the default resource group:

   ```azurecli
   az configure --defaults group=${RESOURCE_GROUP}
   ```

### 3.3. Install extension and register namespace

Use the following commands to install the Azure Spring Apps extension for the Azure CLI and register the `Microsoft.SaaS` namespace:

```azurecli
az extension add --name spring --upgrade
az provider register --namespace Microsoft.SaaS
```

### 3.4. Create an Azure Spring Apps instance

Use the following command to create your Azure Spring Apps instance:

```azurecli
az spring create \
    --name ${AZURE_SPRING_APPS_INSTANCE} \
    --sku Enterprise
```

Then, use the following command to create an app in the Azure Spring Apps instance:

```azurecli
az spring app create \
    --service ${AZURE_SPRING_APPS_INSTANCE} \
    --name ${APP_NAME}
```

### 3.5. Create a Service Bus instance

Use the following steps to create a Service Bus instance:

1. Use the following command to create a Service Bus namespace:

   ```azurecli
   az servicebus namespace create --name ${SERVICE_BUS_NAME_SPACE}
   ```

1. Use the following commands to create two queues named `lower-case` and `upper-case`:

   ```azurecli
   az servicebus queue create \
       --namespace-name ${SERVICE_BUS_NAME_SPACE} \
       --name lower-case
   az servicebus queue create \
       --namespace-name ${SERVICE_BUS_NAME_SPACE} \
       --name upper-case
   ```

### 3.6. Connect app instance to Service Bus instance

You've now created both the Service Bus and the app in Azure Spring Apps, but the app can't connect to the Service Bus. Use the following steps to enable the app to connect to the Service Bus, and then deploy the app:

1. Get the Service Bus's connection string by using the following command:

   
> **Note:**
> Microsoft recommends using the most secure authentication flow available. The authentication flow described in this procedure, such as for databases, caches, messaging, or AI services, requires a very high degree of trust in the application and carries risks not present in other flows. Use this flow only when more secure options, like managed identities for passwordless or keyless connections, are not viable. For local machine operations, prefer user identities for passwordless or keyless connections.


   ```azurecli
   export SERVICE_BUS_CONNECTION_STRING=$( \
       az servicebus namespace authorization-rule keys list \
           --namespace-name ${SERVICE_BUS_NAME_SPACE} \
           --name RootManageSharedAccessKey \
           --query primaryConnectionString \
           --output tsv)
   ```

1. Use the following command to provide the connection string to the app through an environment variable:

   ```azurecli
   az spring app update \
       --service ${AZURE_SPRING_APPS_INSTANCE} \
       --name ${APP_NAME} \
       --env SPRING_CLOUD_AZURE_SERVICEBUS_CONNECTIONSTRING=${SERVICE_BUS_CONNECTION_STRING} \
             SPRING_CLOUD_AZURE_KEYVAULT_SECRET_PROPERTYSOURCEENABLED=false
   ```

---

## 4. Deploy the app to Azure Spring Apps

### [Azure portal](#tab/Azure-portal-ent)

The **Deploy to Azure** button in the previous section launches an Azure portal experience that includes application deployment, so nothing else is needed.

### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin-ent)


<!-- 
Use the following line at the end of the heading Prerequisites, with blank lines before and after. App deployments with Spring Apps Maven plugin.

[!INCLUDE [event-driven-spring-apps-maven-plugin](includes/quickstart-deploy-event-driven-app/event-driven-spring-apps-maven-plugin.md)]
-->

Use the following steps to deploy using the [Maven plugin for Azure Spring Apps](https://github.com/microsoft/azure-maven-plugins/wiki/Azure-Spring-Apps):

1. Navigate to the **complete** directory, and then run the following command to configure the app in Azure Spring Apps:

   ```bash
   ./mvnw com.microsoft.azure:azure-spring-apps-maven-plugin:1.19.0:config
   ```

   The following list describes the command interactions:

   - **OAuth2 login**: You need to authorize the sign in to Azure based on the OAuth2 protocol.
   - **Select subscription**: Select the subscription list number of the Azure Spring Apps instance you created, which defaults to the first subscription in the list. If you use the default number, press <kbd>Enter</kbd> directly.
   - **Use existing Azure Spring Apps in Azure**: Press <kbd>y</kbd> to use the existing Azure Spring Apps instance.
   - **Select Azure Spring Apps for deployment**: Select the list number of the Azure Spring Apps instance you created. If you use the default number, press <kbd>Enter</kbd> directly.
   - **Use existing app in Azure Spring Apps \<your-instance-name\>**: Press <kbd>y</kbd> to use the app created.
   - **Confirm to save all the above configurations**: Press <kbd>y</kbd>. If you press <kbd>n</kbd>, the configuration isn't saved in the POM files.


2. Use the following command to deploy the app:

   ```bash
   ./mvnw azure-spring-apps:deploy
   ```

   The following list describes the command interaction:

   - **OAuth2 login**: You need to authorize the sign in to Azure based on the OAuth2 protocol.

   After the command is executed, you can see from the following log messages that the deployment was successful:

   ```output
   [INFO] Starting Spring App after deploying artifacts...
   [INFO] Deployment Status: Running
   ```

### [Azure CLI](#tab/Azure-CLI)

The cloud environment is now ready. Deploy the app by using the following command:

```azurecli
az spring app deploy \
    --service ${AZURE_SPRING_APPS_INSTANCE} \
    --name ${APP_NAME} \
    --artifact-path target/simple-event-driven-app-0.0.2-SNAPSHOT.jar
```

---




## 5. Validate the app

Use the following steps to confirm that the event-driven app works correctly. You can validate the app by sending a message to the `lower-case` queue, then confirm that there's a message in the `upper-case` queue.

**Applies to: sc-standard**



<!-- 
For clarity of structure, a separate markdown file is used to describe how to validate the app.

[!INCLUDE [validate-event-driven-app](includes/quickstart-deploy-event-driven-app/validate-event-driven-app.md)]

-->

1. Send a message to the `lower-case` queue with Service Bus Explorer. For more information, see the [Send a message to a queue or topic](../../service-bus-messaging/explorer.md#send-a-message-to-a-queue-or-topic) section of [Use Service Bus Explorer to run data operations on Service Bus](../../service-bus-messaging/explorer.md).

1. Confirm that there's a new message sent to the `upper-case` queue. For more information, see the [Peek a message](../../service-bus-messaging/explorer.md#peek-a-message) section of [Use Service Bus Explorer to run data operations on Service Bus](../../service-bus-messaging/explorer.md).


3. Go to the Azure Spring Apps instance **Overview** page and select **Logs** to check the app's logs.

   Screenshot of the Azure portal that shows the Azure Spring Apps Logs page.



**Applies to: sc-enterprise**


### [Azure portal](#tab/Azure-portal-ent)


<!-- 
For clarity of structure, a separate markdown file is used to describe how to validate the app.

[!INCLUDE [validate-event-driven-app](includes/quickstart-deploy-event-driven-app/validate-event-driven-app.md)]

-->

1. Send a message to the `lower-case` queue with Service Bus Explorer. For more information, see the [Send a message to a queue or topic](../../service-bus-messaging/explorer.md#send-a-message-to-a-queue-or-topic) section of [Use Service Bus Explorer to run data operations on Service Bus](../../service-bus-messaging/explorer.md).

1. Confirm that there's a new message sent to the `upper-case` queue. For more information, see the [Peek a message](../../service-bus-messaging/explorer.md#peek-a-message) section of [Use Service Bus Explorer to run data operations on Service Bus](../../service-bus-messaging/explorer.md).


3. Go to the Azure Spring Apps instance **Overview** page and select **Logs** to check the app's logs.

   Screenshot of the Azure portal that shows the Azure Spring Apps Logs page.

1. Check the details for each resource deployment, which are useful for investigating any deployment issues.

### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin-ent)


<!-- 
For clarity of structure, a separate markdown file is used to describe how to validate the app.

[!INCLUDE [validate-event-driven-app](includes/quickstart-deploy-event-driven-app/validate-event-driven-app.md)]

-->

1. Send a message to the `lower-case` queue with Service Bus Explorer. For more information, see the [Send a message to a queue or topic](../../service-bus-messaging/explorer.md#send-a-message-to-a-queue-or-topic) section of [Use Service Bus Explorer to run data operations on Service Bus](../../service-bus-messaging/explorer.md).

1. Confirm that there's a new message sent to the `upper-case` queue. For more information, see the [Peek a message](../../service-bus-messaging/explorer.md#peek-a-message) section of [Use Service Bus Explorer to run data operations on Service Bus](../../service-bus-messaging/explorer.md).


3. Go to the Azure Spring Apps instance **Overview** page and select **Logs** to check the app's logs.

   Screenshot of the Azure portal that shows the Azure Spring Apps Logs page.

1. Check the details for each resource deployment, which are useful for investigating any deployment issues.

### [Azure CLI](#tab/Azure-CLI)


<!-- 
For clarity of structure, a separate markdown file is used to describe how to validate the app.

[!INCLUDE [validate-event-driven-app](includes/quickstart-deploy-event-driven-app/validate-event-driven-app.md)]

-->

1. Send a message to the `lower-case` queue with Service Bus Explorer. For more information, see the [Send a message to a queue or topic](../../service-bus-messaging/explorer.md#send-a-message-to-a-queue-or-topic) section of [Use Service Bus Explorer to run data operations on Service Bus](../../service-bus-messaging/explorer.md).

1. Confirm that there's a new message sent to the `upper-case` queue. For more information, see the [Peek a message](../../service-bus-messaging/explorer.md#peek-a-message) section of [Use Service Bus Explorer to run data operations on Service Bus](../../service-bus-messaging/explorer.md).


3. Go to the Azure Spring Apps instance **Overview** page and select **Logs** to check the app's logs.

   Screenshot of the Azure portal that shows the Azure Spring Apps Logs page.

1. Use the following command to check the app's log to investigate any deployment issue:

   ```azurecli
   az spring app logs \
       --service ${AZURE_SPRING_APPS_INSTANCE} \
       --name ${APP_NAME}
   ```

---




<!-- 
For clarity of structure, a separate markdown file is used to describe how to clean up resources using Azure portal or AZD.

[!INCLUDE [clean-up-resources-portal-or-azd](includes/quickstart-deploy-event-driven-app/clean-up-resources.md)]

-->

## 6. Clean up resources

Be sure to delete the resources you created in this article when you no longer need them. You can delete the Azure resource group, which includes all the resources in the resource group.

**Applies to: sc-enterprise**


### [Azure portal](#tab/Azure-portal-ent)

Use the following steps to delete the entire resource group, including the newly created service:


<!--
For clarity of structure, a separate markdown file is used to describe how to clean up Azure resource via resource group.

[!INCLUDE [clean-up-resources-via-resource-group](clean-up-resources-via-resource-group.md)]

-->

1. Locate your resource group in the Azure portal. On the navigation menu, select **Resource groups**, and then select the name of your resource group.

1. On the **Resource group** page, select **Delete**. Enter the name of your resource group in the text box to confirm deletion, then select **Delete**.


### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin-ent)

Use the following steps to delete the entire resource group, including the newly created service:


<!--
For clarity of structure, a separate markdown file is used to describe how to clean up Azure resource via resource group.

[!INCLUDE [clean-up-resources-via-resource-group](clean-up-resources-via-resource-group.md)]

-->

1. Locate your resource group in the Azure portal. On the navigation menu, select **Resource groups**, and then select the name of your resource group.

1. On the **Resource group** page, select **Delete**. Enter the name of your resource group in the text box to confirm deletion, then select **Delete**.


### [Azure CLI](#tab/Azure-CLI)

Use the following command to delete the entire resource group, including the newly created service:

```azurecli
az group delete --name ${RESOURCE_GROUP}
```

---



**Applies to: sc-standard**


### [Azure portal](#tab/Azure-portal)

Use the following steps to delete the entire resource group, including the newly created service:


<!--
For clarity of structure, a separate markdown file is used to describe how to clean up Azure resource via resource group.

[!INCLUDE [clean-up-resources-via-resource-group](clean-up-resources-via-resource-group.md)]

-->

1. Locate your resource group in the Azure portal. On the navigation menu, select **Resource groups**, and then select the name of your resource group.

1. On the **Resource group** page, select **Delete**. Enter the name of your resource group in the text box to confirm deletion, then select **Delete**.


### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin)

Use the following steps to delete the entire resource group, including the newly created service:


<!--
For clarity of structure, a separate markdown file is used to describe how to clean up Azure resource via resource group.

[!INCLUDE [clean-up-resources-via-resource-group](clean-up-resources-via-resource-group.md)]

-->

1. Locate your resource group in the Azure portal. On the navigation menu, select **Resource groups**, and then select the name of your resource group.

1. On the **Resource group** page, select **Delete**. Enter the name of your resource group in the text box to confirm deletion, then select **Delete**.


### [Azure Developer CLI](#tab/Azure-Developer-CLI)

Use the following command to delete all the Azure resources used in this sample application:

```bash
azd down
```

The following list describes the command interactions:

- **Total resources to delete: \<your-resources-total>, are you sure you want to continue?**: Press <kbd>y</kbd>.
- **Would you like to permanently delete these resources instead, allowing their names to be reused?**: Press <kbd>y</kbd>. Press <kbd>n</kbd> if you want to reuse the Key Vault.

The console outputs messages similar to the following example:

```output
SUCCESS: Your application was removed from Azure in xx minutes xx seconds.
```

---




## 7. Next steps

> 
> [Structured application log for Azure Spring Apps](structured-app-log.md)

> 
> [Map an existing custom domain to Azure Spring Apps](how-to-custom-domain.md)

> 
> [Set up Azure Spring Apps CI/CD with GitHub Actions](how-to-github-actions.md)

> 
> [Automate application deployments to Azure Spring Apps](how-to-cicd.md)

> 
> [Use managed identities for applications in Azure Spring Apps](how-to-use-managed-identities.md)

> 
> [Create a service connection in Azure Spring Apps with the Azure CLI](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-connector/quickstart-cli-spring-cloud-connection.md)

**Applies to: sc-standard**


> 
> [Run microservice apps (Pet Clinic)](quickstart-sample-app-introduction.md)



**Applies to: sc-enterprise**


> 
> [Introduction to the Fitness Store sample app](../enterprise/quickstart-sample-app-acme-fitness-store-introduction.md)



For more information, see the following articles:

- [Azure Spring Apps Samples](https://github.com/Azure-Samples/azure-spring-apps-samples).
- [Spring on Azure](https://learn.microsoft.com/azure/developer/java/spring/)
- [Spring Cloud Azure](https://learn.microsoft.com/azure/developer/java/spring-framework/)
