---
title: Quickstart - Deploy Your First Application to Azure Spring Apps
description: Describes how to deploy an application to Azure Spring Apps.
author: KarlErickson
ms.author: karler
ms.service: azure-spring-apps
ms.topic: quickstart
ms.date: 08/19/2025
ms.update-cycle: 1095-days
ms.custom: devx-track-java, devx-track-extended-java, devx-track-azurecli, mode-other, engagement-fy23, devx-track-extended-azdevcli
zone_pivot_groups: spring-apps-plan-selection
---

# Quickstart: Deploy your first application to Azure Spring Apps


> **Note:**
> The **Basic**, **Standard**, and **Enterprise** plans entered a retirement period on March 17, 2025. For more information, see the [Azure Spring Apps retirement announcement](retirement-announcement.md).


This article explains how to deploy a small application to run on Azure Spring Apps.

The application code used in this tutorial is a simple app. When you complete this example, the application is accessible online, and you can manage it through the Azure portal.


<!-- 
Use the following line at the end of the heading Prerequisites, with blank lines before and after. Each quickstart should provide two tools for developers.

[!INCLUDE [quickstart-tool-introduction](includes/quickstart/quickstart-tool-introduction.md)]
-->

This article provides the following options for deploying to Azure Spring Apps:

**Applies to: sc-standard**


- The **Azure portal** option is the easiest and the fastest way to create resources and deploy applications with a single click. This option is suitable for Spring developers who want to quickly deploy applications to Azure cloud services.
- The **Azure portal + Maven plugin** option is a more conventional way to create resources and deploy applications step by step. This option is suitable for Spring developers using Azure cloud services for the first time.
- The **Azure Developer CLI** option is a more efficient way to automatically create resources and deploy applications through simple commands. The Azure Developer CLI uses a template to provision the Azure resources needed and to deploy the application code. This option is suitable for Spring developers who are familiar with Azure cloud services.



**Applies to: sc-enterprise**


- The **Azure portal** option is the easiest and the fastest way to create resources and deploy applications with a single click. This option is suitable for Spring developers who want to quickly deploy applications to Azure cloud services.
- The **Azure portal + Maven plugin** option is a more conventional way to create resources and deploy applications step by step. This option is suitable for Spring developers using Azure cloud services for the first time.
- The **Azure CLI** option uses a powerful command line tool to manage Azure resources. This option is suitable for Spring developers who are familiar with Azure cloud services.
- The **IntelliJ** option uses a powerful Java IDE to easily manage Azure resources. This option is suitable for Spring developers who are familiar with Azure cloud services and IntelliJ IDEA.
- The **Visual Studio Code** option uses a lightweight but powerful source code editor, which can easily manage Azure resources. This option is suitable for Spring developers who are familiar with Azure cloud services and Visual Studio Code.




## 1. Prerequisites

**Applies to: sc-standard**


### [Azure portal](#tab/Azure-portal)

- An Azure subscription. [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/spring-apps/basic-standard/quickstart.md)

### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin)

- An Azure subscription. [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/spring-apps/basic-standard/quickstart.md)
- [Git](https://git-scm.com/downloads).
- [Java Development Kit (JDK)](https://learn.microsoft.com/java/azure/jdk/), version 17.

### [Azure Developer CLI](#tab/Azure-Developer-CLI)

- An Azure subscription. [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/spring-apps/basic-standard/quickstart.md)
- [Git](https://git-scm.com/downloads).
- [Java Development Kit (JDK)](https://learn.microsoft.com/java/azure/jdk/), version 17.
- [Azure Developer CLI (AZD)](https://learn.microsoft.com/azure/developer/azure-developer-cli/install-azd), version 1.2.0 or higher.

---



**Applies to: sc-enterprise**


### [Azure portal](#tab/Azure-portal-ent)

- An Azure subscription. [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/spring-apps/basic-standard/quickstart.md)

### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin-ent)

- An Azure subscription. [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/spring-apps/basic-standard/quickstart.md)
- [Git](https://git-scm.com/downloads).
- [Java Development Kit (JDK)](https://learn.microsoft.com/java/azure/jdk/), version 17.

### [Azure CLI](#tab/Azure-CLI)

- An Azure subscription. [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/spring-apps/basic-standard/quickstart.md)
- [Git](https://git-scm.com/downloads).
- [Java Development Kit (JDK)](https://learn.microsoft.com/java/azure/jdk/), version 17.
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) version 2.45.0 or higher.

### [IntelliJ](#tab/IntelliJ)

- An Azure subscription. [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/spring-apps/basic-standard/quickstart.md)
- [Java Development Kit (JDK)](https://learn.microsoft.com/java/azure/jdk/), version 17.
- [IntelliJ IDEA](https://www.jetbrains.com/idea/).
- [Azure Toolkit for IntelliJ](https://learn.microsoft.com/azure/developer/java/toolkit-for-intellij/install-toolkit).

### [Visual Studio Code](#tab/visual-studio-code)

- An Azure subscription. [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/spring-apps/basic-standard/quickstart.md)
- [Java Development Kit (JDK)](https://learn.microsoft.com/java/azure/jdk/), version 17.
- [Visual Studio Code](https://code.visualstudio.com/).

---



**Applies to: sc-standard**



<!--
For clarity of structure, a separate markdown file is used to describe how to deploy to Azure Spring Apps with Basic/Standard plan.

[!INCLUDE [deploy-app-with-basic-standard-plan](includes/quickstart/deploy-app-with-basic-standard-plan.md)]

-->

## 2. Prepare the Spring project

### [Azure portal](#tab/Azure-portal)

The **Deploy to Azure** button in the next section launches an Azure portal experience that downloads a JAR package from the [spring-cloud-azure-tools releases](https://github.com/Azure/spring-cloud-azure-tools/releases) page on GitHub. No local preparation steps are needed.

### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin)


<!-- 
For clarity of structure, a separate markdown file is used to describe how to prepare event-driven project.

[!INCLUDE [prepare-spring-project](prepare-spring-project.md)]

-->

Use the following steps to prepare the project:

1. Use the following command to clone the [Spring Boot sample project for Azure](https://github.com/spring-guides/gs-spring-boot-for-azure.git) from GitHub.

   ```azurecli-interactive
   git clone https://github.com/spring-guides/gs-spring-boot-for-azure.git
   ```

1. Use the following command to move to the project folder:

   ```azurecli-interactive
   cd gs-spring-boot-for-azure/complete
   ```

1. Use the following [Maven](https://maven.apache.org/what-is-maven.html) command to build the project:

   ```azurecli-interactive
   ./mvnw clean package
   ```

1. Run the sample project locally by using the following command:

   ```azurecli-interactive
   ./mvnw spring-boot:run
   ```


### [Azure Developer CLI](#tab/Azure-Developer-CLI)

Use the following steps to initialize the application from the Azure Developer CLI templates.

1. Open a terminal, create an empty folder, and then change directory to it.

1. Use the following command to initialize the project:

   ```bash
   azd init --template spring-guides/gs-spring-boot-for-azure
   ```

   The following list describes the command interactions:

   - **OAuth2 login**: You need to authorize the sign in to Azure based on the OAuth2 protocol.
   - **Please enter a new environment name**: Provide an environment name, which is used as a suffix for the resource group created to hold all Azure resources. This name should be unique within your Azure subscription.

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

This section describes how to create an Azure Spring Apps service instance and prepare the Azure cloud environment.

### [Azure portal](#tab/Azure-portal)


<!--
For clarity of structure, a separate markdown file is used to describe how to prepare cloud env (standard plan) using Azure portal.

[!INCLUDE [hello-prepare-cloud-environment-standard-azure-portal](includes/quickstart/hello-prepare-cloud-environment-standard-azure-portal.md)]

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

### 3.2. Create an Azure Spring Apps instance


<!-- 
To reuse the Spring Apps instance creation steps in other articles, a separate markdown file is used to describe how to provision Spring Apps instance.

[!INCLUDE [provision-basic-azure-spring-apps](provision-basic-azure-spring-apps.md)]

-->

Use the following steps to create a service instance:

1. Select **Create a resource** in the corner of the Azure portal.

1. Select **Compute** > **Azure Spring Apps**.

1. Fill out the **Basics** form with the following information:

   | Setting | Suggested Value | Description |
   | --- | --- | --- |
   | Subscription | Your subscription name | The  Azure subscription that you want to use for your server. If you have multiple subscriptions, choose the subscription in which you'd like to be billed for the resource. |
   | Resource group | **myresourcegroup** | A new resource group name or an existing one from your subscription. |
   | Name | **myasa** | A unique name that identifies your Azure Spring Apps service. The name must be between 4 and 32 characters long and can contain only lowercase letters, numbers, and hyphens. The first character of the service name must be a letter and the last character must be either a letter or a number. |
   | Plan | **Standard** | The pricing plan that determines the resource and cost associated with your instance. |
   | Region | The region closest to your users | The location that is closest to your users. |
   | Zone Redundant | Unselected | Indicates whether to create your Azure Spring Apps service in an Azure availability zone. This feature isn't currently supported in all regions. |

1. Select **Review and Create** to review your selections. Select **Create** to provision the Azure Spring Apps instance.

1. On the toolbar, select the **Notifications** icon (a bell) to monitor the deployment process. After the deployment is done, you can select **Pin to dashboard**, which creates a tile for this service on your Azure portal dashboard as a shortcut to the service's **Overview** page.

   Screenshot of the Azure portal that shows the Notifications pane for Azure Spring Apps creation.

1. Select **Go to resource** to go to the **Azure Spring Apps Overview** page.


### [Azure Developer CLI](#tab/Azure-Developer-CLI)

Use the following steps to create the required resources:

1. Use the following command to sign in to Azure with OAuth2. Ignore this step if you already signed in.

   ```bash
   azd auth login
   ```

   The console outputs messages similar to the following example:

   ```text
   Logged in to Azure.
   ```

1. Use the following command to set the template using the Standard plan:

   ```bash
   azd env set PLAN standard
   ```

1. Use the following command to package a deployable copy of your application, provision the template's infrastructure to Azure, and then deploy the application code to those newly provisioned resources:

   ```bash
   azd provision
   ```

   The following list describes the command interactions:

   - **Select an Azure Subscription to use**: Use arrows to move, type to filter, then press <kbd>Enter</kbd>.
   - **Select an Azure location to use**: Use arrows to move, type to filter, then press <kbd>Enter</kbd>.

   The console outputs messages similar to the ones in the following example:

   ```output
   SUCCESS: Your application was provisioned in Azure in xx minutes xx seconds.
   You can view the resources created under the resource group rg-<your-environment-name>-<random-string>> in Azure portal:
   https://portal.azure.com/#@/resource/subscriptions/<your-subscription-id>/resourceGroups/rg-<your-environment-name>/overview
   ```

   > **Note:**
   > This may take a while to complete. You see a progress indicator as it provisions Azure resources.

---

## 4. Deploy the app to Azure Spring Apps

### [Azure portal](#tab/Azure-portal)


<!--
For clarity of structure, a separate markdown file is used to describe how to deploy web app using Azure portal.

[!INCLUDE [deploy-hello-app-azure-portal](deploy-hello-app-azure-portal.md)]

-->

The **Deploy to Azure** button in the previous section launches an Azure portal experience that includes application deployment, so nothing else is needed.


### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin)


<!-- 
Use the following line at the end of the heading Prerequisites, with blank lines before and after. App deployments with Spring Apps Maven plugin.

[!INCLUDE [hello-spring-apps-maven-plugin](includes/quickstart/hello-spring-apps-maven-plugin.md)]
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
   - **Use existing app in Azure Spring Apps \<your-instance-name\>**: Press <kbd>n</kbd> to create a new app.
   - **Input the app name (demo)**: Provide an app name. If you use the default project artifact ID, press <kbd>Enter</kbd> directly.
   - **Expose public access for this app (boot-for-azure)**: Press <kbd>y</kbd>.
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
   [INFO]   InstanceName:demo-default-x-xxxxxxxxxx-xxxxx  Status:Running Reason:null       DiscoverStatus:UNREGISTERED
   [INFO]   InstanceName:demo-default-x-xxxxxxxxx-xxxxx  Status:Terminating Reason:null       DiscoverStatus:UNREGISTERED
   [INFO] Getting public url of app(demo)...
   [INFO] Application url: https://<your-Azure-Spring-Apps-instance-name>-demo.azuremicroservices.io
   ```

### [Azure Developer CLI](#tab/Azure-Developer-CLI)

Use the following steps to package the app, provision the Azure resources required by the web application, and then deploy to Azure Spring Apps:

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

   The console outputs messages similar to the ones in the following example:

   ```output
   Deploying services (azd deploy)

   (✓) Done: Deploying service demo
   - Endpoint: https://<your-Azure-Spring-Apps-instance-name>-demo.azuremicroservices.io/


   SUCCESS: Your application was deployed to Azure in xx minutes xx seconds.
   You can view the resources created under the resource group rg-<your-environment-name> in Azure portal:
   https://portal.azure.com/#@/resource/subscriptions/<your-subscription-id>/resourceGroups/rg-<your-environment-name>/overview
   ```

> **Note:**
> You can also use `azd up` to combine the previous three commands: `azd package` (packages a deployable copy of your application), `azd provision` (provisions Azure resources), and `azd deploy` (deploys application code). For more information, see [spring-guides/gs-spring-boot-for-azure](https://github.com/spring-guides/gs-spring-boot-for-azure).

---




**Applies to: sc-enterprise**



<!--
For clarity of structure, a separate markdown file is used to describe how to deploy to Azure Spring Apps with Enterprise plan.

[!INCLUDE [deploy-event-driven-app-with-enterprise-plan](includes/quickstart/deploy-app-with-enterprise-plan.md)]

-->

## 2. Prepare the Spring project

### [Azure portal](#tab/Azure-portal-ent)

The **Deploy to Azure** button in the next section launches an Azure portal experience that downloads a JAR package from the [spring-cloud-azure-tools releases](https://github.com/Azure/spring-cloud-azure-tools/releases) page on GitHub. No local preparation steps are needed.

### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin-ent)


<!-- 
For clarity of structure, a separate markdown file is used to describe how to prepare event-driven project.

[!INCLUDE [prepare-spring-project](prepare-spring-project.md)]

-->

Use the following steps to prepare the project:

1. Use the following command to clone the [Spring Boot sample project for Azure](https://github.com/spring-guides/gs-spring-boot-for-azure.git) from GitHub.

   ```azurecli-interactive
   git clone https://github.com/spring-guides/gs-spring-boot-for-azure.git
   ```

1. Use the following command to move to the project folder:

   ```azurecli-interactive
   cd gs-spring-boot-for-azure/complete
   ```

1. Use the following [Maven](https://maven.apache.org/what-is-maven.html) command to build the project:

   ```azurecli-interactive
   ./mvnw clean package
   ```

1. Run the sample project locally by using the following command:

   ```azurecli-interactive
   ./mvnw spring-boot:run
   ```


### [Azure CLI](#tab/Azure-CLI)


<!-- 
For clarity of structure, a separate markdown file is used to describe how to prepare event-driven project.

[!INCLUDE [prepare-spring-project](prepare-spring-project.md)]

-->

Use the following steps to prepare the project:

1. Use the following command to clone the [Spring Boot sample project for Azure](https://github.com/spring-guides/gs-spring-boot-for-azure.git) from GitHub.

   ```azurecli-interactive
   git clone https://github.com/spring-guides/gs-spring-boot-for-azure.git
   ```

1. Use the following command to move to the project folder:

   ```azurecli-interactive
   cd gs-spring-boot-for-azure/complete
   ```

1. Use the following [Maven](https://maven.apache.org/what-is-maven.html) command to build the project:

   ```azurecli-interactive
   ./mvnw clean package
   ```

1. Run the sample project locally by using the following command:

   ```azurecli-interactive
   ./mvnw spring-boot:run
   ```


### [IntelliJ](#tab/IntelliJ)


<!--
For clarity of structure, a separate markdown file is used to describe how to prepare event-driven project.

[!INCLUDE [generate-spring-project](generate-spring-project.md)]

-->

Use the following steps to create the project:

1. Use the following command to generate a sample project from `start.spring.io` with the recommended dependencies for Azure Spring Apps:

   ```bash
   curl https://start.spring.io/starter.tgz -d dependencies=web -d baseDir=demo -d bootVersion=3.0.0 -d javaVersion=17 -d type=maven-project -d groupId=com.example -d artifactId=demo -d name=demo -d packageName=com.example.demo -d packaging=jar | tar -xzvf -
   ```

1. Create a web controller for your web application by adding the file **src/main/java/com/example/demo/HelloController.java** with the following contents:

   ```java
   package com.example.demo;

   import org.springframework.web.bind.annotation.RestController;
   import org.springframework.web.bind.annotation.RequestMapping;

   @RestController
   public class HelloController {

       @RequestMapping("/")
       public String index() {
           return "Hello World";
        }
   }
   ```

1. Use the following [Maven](https://maven.apache.org/what-is-maven.html) command to build the project:

   ```azurecli-interactive
   ./mvnw clean package
   ```

1. Run the sample project locally by using the following command:

   ```azurecli-interactive
   ./mvnw spring-boot:run
   ```


### [Visual Studio Code](#tab/visual-studio-code)

To prepare the Spring project, follow the steps in the [Before you begin](https://code.visualstudio.com/docs/java/java-spring-apps#_before-you-begin) section of [Java on Azure Spring Apps](https://code.visualstudio.com/docs/java/java-spring-apps).

---

## 3. Prepare the cloud environment

This section describes how to create an Azure Spring Apps service instance and prepare the Azure cloud environment.

### [Azure portal](#tab/Azure-portal-ent)


<!--
For clarity of structure, a separate markdown file is used to describe how to prepare cloud env (enterprise plan) using Azure portal.

[!INCLUDE [hello-prepare-cloud-environment-enterprise-azure-portal](includes/quickstart/hello-prepare-cloud-environment-enterprise-azure-portal.md)]

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

### 3.2. Create an Azure Spring Apps instance


<!-- 
To reuse the Spring Apps instance creation steps in other articles, a separate markdown file is used to describe how to provision Spring Apps instance.

[!INCLUDE [provision-enterprise-azure-spring-apps](provision-enterprise-azure-spring-apps.md)]

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


### [Azure CLI](#tab/Azure-CLI)

### 3.1. Provide names for each resource

Create variables to hold the resource names by using the following commands. Be sure to replace the placeholders with your own values.

```azurecli
export LOCATION="<region>"
export RESOURCE_GROUP="<resource-group-name>"
export SERVICE_NAME="<Azure-Spring-Apps-instance-name>"
export APP_NAME="demo"
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

Use the following commands to install the Azure Spring Apps extension for the Azure CLI and register the namespace: `Microsoft.SaaS`:

```azurecli
az extension add --name spring --upgrade
az provider register --namespace Microsoft.SaaS
```

### 3.4. Create an Azure Spring Apps instance

Use the following steps to create the service instance:

1. Use the following command to accept the legal terms and privacy statements for the Enterprise plan:

   > **Note:**
   > This step is necessary only if your subscription has never been used to create an Enterprise plan instance of Azure Spring Apps.

   ```azurecli
   az term accept \
       --publisher vmware-inc \
       --product azure-spring-cloud-vmware-tanzu-2 \
       --plan asa-ent-hr-mtr
   ```

1. Use the following command to create an Azure Spring Apps service instance:

   ```azurecli
   az spring create \
       --name ${SERVICE_NAME} \
       --sku Enterprise
   ```

### 3.5. Create an app in your Azure Spring Apps instance

An *App* is an abstraction of one business app. For more information, see [App and deployment in Azure Spring Apps](concept-understand-app-and-deployment.md). Apps run in an Azure Spring Apps service instance, as shown in the following diagram.

Diagram that shows the relationship between apps and an Azure Spring Apps service instance.

Use the following command to create the app on Azure Spring Apps:

```azurecli
az spring app create \
    --service ${SERVICE_NAME} \
    --name ${APP_NAME} \
    --assign-endpoint true
```

### [IntelliJ](#tab/IntelliJ)

### 3.1. Sign in to the Azure portal

Open your web browser and go to the [Azure portal](https://portal.azure.com/), enter your credentials, and sign in to the portal. The default view is your service dashboard.

### 3.2. Create an Azure Spring Apps instance


<!-- 
To reuse the Spring Apps instance creation steps in other articles, a separate markdown file is used to describe how to provision Spring Apps instance.

[!INCLUDE [provision-enterprise-azure-spring-apps](provision-enterprise-azure-spring-apps.md)]

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


### [Visual Studio Code](#tab/visual-studio-code)

To create an Azure Spring Apps instance, follow the steps in the [Create an app on Azure Spring Apps](https://code.visualstudio.com/docs/java/java-spring-apps#_create-an-app-on-azure-spring-apps) section of [Java on Azure Spring Apps](https://code.visualstudio.com/docs/java/java-spring-apps).

---

## 4. Deploy the app to Azure Spring Apps

### [Azure portal](#tab/Azure-portal-ent)


<!--
For clarity of structure, a separate markdown file is used to describe how to deploy web app using Azure portal.

[!INCLUDE [deploy-hello-app-azure-portal](deploy-hello-app-azure-portal.md)]

-->

The **Deploy to Azure** button in the previous section launches an Azure portal experience that includes application deployment, so nothing else is needed.


### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin-ent)


<!-- 
Use the following line at the end of the heading Prerequisites, with blank lines before and after. App deployments with Spring Apps Maven plugin.

[!INCLUDE [hello-spring-apps-maven-plugin](includes/quickstart/hello-spring-apps-maven-plugin.md)]
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
   - **Use existing app in Azure Spring Apps \<your-instance-name\>**: Press <kbd>n</kbd> to create a new app.
   - **Input the app name (demo)**: Provide an app name. If you use the default project artifact ID, press <kbd>Enter</kbd> directly.
   - **Expose public access for this app (boot-for-azure)**: Press <kbd>y</kbd>.
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
   [INFO]   InstanceName:demo-default-x-xxxxxxxxxx-xxxxx  Status:Running Reason:null       DiscoverStatus:N/A
   [INFO] Getting public url of app(demo)...
   [INFO] Application url: https://<your-Azure-Spring-Apps-instance-name>-demo.azuremicroservices.io
   ```

### [Azure CLI](#tab/Azure-CLI)

Use the following command to deploy the **.jar** file for the app:

```azurecli
az spring app deploy \
    --service ${SERVICE_NAME} \
    --name ${APP_NAME} \
    --artifact-path target/demo-0.0.1-SNAPSHOT.jar
```

Deploying the application can take a few minutes.

### [IntelliJ](#tab/IntelliJ)

This section provides the steps to deploy your application to Azure Spring Apps.

### 4.1. Import the project

Use the following steps to import the project:

1. Open IntelliJ IDEA and select **Open**.

1. In the **Open File or Project** dialog box, select the **demo** folder.

   Screenshot of IntelliJ IDEA that shows the Open File or Project dialog box.

### 4.2. Build and deploy your app

Use the following steps to build and deploy your app:

1. If you didn't already install the Azure Toolkit for IntelliJ, follow the steps in [Install the Azure Toolkit for IntelliJ](https://learn.microsoft.com/azure/developer/java/toolkit-for-intellij/install-toolkit).

   > **Note:**
   > Azure Toolkit for IntelliJ provides four ways to log in to Azure, and the deployment can only start after logging in.

1. Right-click your project in the IntelliJ Project window and then select **Azure** -> **Deploy to Azure Spring Apps**.

   Screenshot of the IntelliJ IDEA menu that shows the Deploy to Azure Spring Apps option.

1. Accept the name for the app in the **Name** field. **Name** refers to the configuration, not the app name. You don't usually need to change it.

1. In the **Artifact** textbox, select **Maven:demo(Java 17)**.

1. In the **Subscription** textbox, verify that your subscription is correct.

1. In the **Spring Apps** textbox, select the instance of Azure Spring Apps that you created.

1. In the **App** textbox, select the plus sign (**+**) to create a new app.

   Screenshot of the IntelliJ IDEA that shows the Deploy Azure Spring Apps dialog box.

1. In the **App name:** textbox under **App Basics**, enter **demo**, and then select **More settings**.

1. Select the **Enable** button next to **Public endpoint**. The button changes to **Disable \<to be enabled\>**. Then, select **OK**.

   Screenshot of IntelliJ IDEA Create app dialog box with public endpoint Disable button highlighted.

1. Under **Before launch**, select **Run Maven Goal 'demo:package'**, and then select the pencil icon to edit the command line.

   Screenshot of IntelliJ IDEA Create Azure Spring Apps dialog box with Maven Goal edit button highlighted.

1. In the **Command line** textbox, enter **-DskipTests** after **package**, and then select **OK**.

   Screenshot of IntelliJ IDEA Select Maven Goal dialog box with Command Line value highlighted.

1. To start the deployment, select the **Run** button at the bottom of the **Deploy to Azure** dialog box. The plug-in runs the Maven command `package -DskipTests` on the `demo` app and deploys the **.jar** file generated by the `package` command.

Deploying the application can take a few minutes. You can see the public URL of the application in the output console log.

### [Visual Studio Code](#tab/visual-studio-code)

To deploy the app to Azure Spring Apps, follow the steps in the [Build and deploy the app](https://code.visualstudio.com/docs/java/java-spring-apps#_build-and-deploy-the-app) section of [Java on Azure Spring Apps](https://code.visualstudio.com/docs/java/java-spring-apps).

---




## 5. Validate the app

This section describes how to validate your application.

**Applies to: sc-standard**


### [Azure portal](#tab/Azure-portal)

After the deployment finishes, use the following steps to find the application URL from the deployment outputs:

1. Access the application URL from the **Outputs** page of the **Deployment**. When you open the app, you get the response `Hello World`.

   Screenshot of the Azure portal that shows the Outputs page of the Deployment.

1. Check the details for each resource deployment, which are useful for investigating any deployment issues.

### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin)

After the deployment finishes, use the following steps to check the app's logs to investigate any deployment issue:

1. Access the application URL from the **Outputs** page of the **Deployment**. When you open the app, you get the response `Hello World`.

   Screenshot of the Azure portal that shows the Outputs page of the Deployment.

1. From the navigation pane of the Azure Spring Apps instance overview page, select **Logs** to check the app's logs.

   Screenshot of the Azure portal that shows the Azure Spring Apps Logs page.

### [Azure Developer CLI](#tab/Azure-Developer-CLI)

After the deployment finishes, access the application with the output endpoint. When you open the app, you get the response `Hello World`.

---



**Applies to: sc-enterprise**


### [Azure portal](#tab/Azure-portal-ent)

After the deployment finishes, use the following steps to find the application URL from the deployment outputs:

1. Access the application URL from the **Outputs** page of the **Deployment**. When you open the app, you get the response `Hello World`.

   Screenshot of the Azure portal that shows the Outputs page of the Deployment.

1. Check the details for each resource deployment, which are useful for investigating any deployment issues.

### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin-ent)

After the deployment finishes, use the following steps to validate the app:

1. Access the application URL. When you open the app, you get the response `Hello World`.

1. Check the console logs, which are useful for investigating any deployment issues.

### [Azure CLI](#tab/Azure-CLI)

After the deployment finishes, use the following steps to check the app's logs to investigate any deployment issue:

1. Access the application with the output application URL. When you open the app, you get the response `Hello World`.

1. Use the following command to check the app's log to investigate any deployment issue:

   ```azurecli
   az spring app logs \
       --service ${SERVICE_NAME} \
       --name ${APP_NAME}
   ```

### [IntelliJ](#tab/IntelliJ)

Use the following steps to stream your application logs:

1. Access the application with the output application URL. When you open the app, you get the response `Hello World`.

1. Open the **Azure Explorer** window, expand the node **Azure**, expand the service node **Azure Spring Apps**, expand the Azure Spring Apps instance you created, and then select the **demo** instance of the app you created.

1. Right-click and select **Start Streaming Logs**, then select **OK** to see real-time application logs.

   Screenshot of IntelliJ that shows the Azure Streaming Log.

### [Visual Studio Code](#tab/visual-studio-code)

Use the following steps to stream your application logs:

1. Access the application with the output application URL. When you open the app, you get the response `Hello World`.

1. Follow the steps in the [Stream your application logs](https://code.visualstudio.com/docs/java/java-spring-apps#_stream-your-application-logs) section of [Java on Azure Spring Apps](https://code.visualstudio.com/docs/java/java-spring-apps).

---




<!-- 
For clarity of structure, a separate markdown file is used to describe how to clean up resources using Azure portal or AZD.

[!INCLUDE [clean-up-resources](includes/quickstart/clean-up-resources.md)]

-->

## 6. Clean up resources

If you plan to continue working with subsequent quickstarts and tutorials, you might want to leave these resources in place. When you no longer need the resources, you can clean up unnecessary resources to avoid Azure charges.

**Applies to: sc-enterprise**


### [Azure portal](#tab/Azure-portal-ent)


<!--
For clarity of structure, a separate markdown file is used to describe how to clean up Azure resource via resource group.

[!INCLUDE [clean-up-resources-via-resource-group](clean-up-resources-via-resource-group.md)]

-->

Use the following steps to delete the entire resource group, including the newly created service instance:

1. Locate your resource group in the Azure portal. On the navigation menu, select **Resource groups**, and then select the name of your resource group.



### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin-ent)


<!--
For clarity of structure, a separate markdown file is used to describe how to clean up Azure resource via resource group.

[!INCLUDE [clean-up-resources-via-resource-group](clean-up-resources-via-resource-group.md)]

-->

Use the following steps to delete the entire resource group, including the newly created service instance:

1. Locate your resource group in the Azure portal. On the navigation menu, select **Resource groups**, and then select the name of your resource group.



### [Azure CLI](#tab/Azure-CLI)

Use the following command to delete the resource group by using the Azure CLI:

```azurecli
az group delete --name ${RESOURCE_GROUP}
```

### [IntelliJ](#tab/IntelliJ)

Use the following steps to delete the resource group by using IntelliJ:

1. Go to your IntelliJ IDEA and find the name of your resource group.

1. Right-click the resource group and select **Delete** to delete all related Azure resources.

### [Visual Studio Code](#tab/visual-studio-code)

Use the following steps to delete the resource group by using Visual Studio Code:

1. Go to Visual Studio Code, select **Group By** to enable **Group by Resource Group**, and then find the name of your resource group.

1. Right-click the resource group and select **Delete Resource Group...** to delete all related Azure resources.

---



**Applies to: sc-standard**


### [Azure portal](#tab/Azure-portal)


<!--
For clarity of structure, a separate markdown file is used to describe how to clean up Azure resource via resource group.

[!INCLUDE [clean-up-resources-via-resource-group](clean-up-resources-via-resource-group.md)]

-->

Use the following steps to delete the entire resource group, including the newly created service instance:

1. Locate your resource group in the Azure portal. On the navigation menu, select **Resource groups**, and then select the name of your resource group.



### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin)


<!--
For clarity of structure, a separate markdown file is used to describe how to clean up Azure resource via resource group.

[!INCLUDE [clean-up-resources-via-resource-group](clean-up-resources-via-resource-group.md)]

-->

Use the following steps to delete the entire resource group, including the newly created service instance:

1. Locate your resource group in the Azure portal. On the navigation menu, select **Resource groups**, and then select the name of your resource group.



### [Azure Developer CLI](#tab/Azure-Developer-CLI)

Use the following command to delete all the Azure resources used in this sample application:

```bash
azd down
```

The following list describes the command interaction:

- **Total resources to delete: \<your-resources-total>, are you sure you want to continue?**: Press <kbd>y</kbd>.

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
> [Use Azure Spring Apps CI/CD with GitHub Actions](how-to-github-actions.md)

> 
> [Automate application deployments to Azure Spring Apps](how-to-cicd.md)

> 
> [Use managed identities for applications in Azure Spring Apps](how-to-use-managed-identities.md)

> 
> [Quickstart: Create a service connection in Azure Spring Apps with the Azure CLI](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-connector/quickstart-cli-spring-cloud-connection.md)

**Applies to: sc-standard**


> 
> [Introduction to the sample app](quickstart-sample-app-introduction.md)



**Applies to: sc-enterprise**


> 
> [Introduction to the Fitness Store sample app](../enterprise/quickstart-sample-app-acme-fitness-store-introduction.md)



For more information, see the following articles:

- [Azure Spring Apps Samples](https://github.com/Azure-Samples/azure-spring-apps-samples).
- [Azure for Spring developers](https://learn.microsoft.com/azure/developer/java/spring/)
- [Spring Cloud Azure documentation](https://learn.microsoft.com/azure/developer/java/spring-framework/)
