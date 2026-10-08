---
title: Quickstart - Deploy Your First Web Application to Azure Spring Apps
description: Describes how to deploy a web application to Azure Spring Apps.
author: KarlErickson
ms.service: azure-spring-apps
ms.topic: quickstart
ms.date: 08/19/2025
ms.update-cycle: 1095-days
ms.custom: devx-track-java, devx-track-extended-java, devx-track-azurecli, mode-other, engagement-fy23, references_regions, devx-track-extended-azdevcli
ms.author: karler
ms.reviewer: xiada
zone_pivot_groups: spring-apps-plan-selection
---

# Quickstart: Deploy your first web application to Azure Spring Apps


> **Note:**
> The **Basic**, **Standard**, and **Enterprise** plans entered a retirement period on March 17, 2025. For more information, see the [Azure Spring Apps retirement announcement](retirement-announcement.md).


This quickstart shows how to deploy a Spring Boot web application to Azure Spring Apps. The sample project is a simple ToDo application to add tasks, mark when they're complete, and then delete them. The following screenshot shows the application:

Screenshot of a sample web application in Azure Spring Apps.

This application is a typical three-layers web application with the following layers:

- A frontend bounded [React](https://reactjs.org/) application.
- A backend Spring web application that uses Spring Data JPA to access a relational database.
- A relational database. For localhost, the application uses [H2 Database Engine](https://www.h2database.com/html/main.html). For Azure Spring Apps, the application uses Azure Database for PostgreSQL. For more information about Azure Database for PostgreSQL, see [Flexible Server documentation](https://learn.microsoft.com/azure/postgresql/flexible-server/overview).

The following diagram shows the architecture of the system:

Diagram that shows the architecture of a Spring web application.

**Applies to: sc-standard**


This article provides the following options for deploying to Azure Spring Apps:

- The **Azure portal** option is the easiest and the fastest way to create resources and deploy applications with a single click. This option is suitable for Spring developers who want to quickly deploy applications to Azure cloud services.
- The **Azure portal + Maven plugin** option provides a more conventional way to create resources and deploy applications step by step. This option is suitable for Spring developers using Azure cloud services for the first time.
- The **Azure Developer CLI** option is a more efficient way to automatically create resources and deploy applications through simple commands. The Azure Developer CLI uses a template to provision the Azure resources needed and to deploy the application code. This option is suitable for Spring developers who are familiar with Azure cloud services.



**Applies to: sc-enterprise**


This article provides the following options for deploying to Azure Spring Apps:

- The **Azure portal** option is the easiest and the fastest way to create resources and deploy applications with a single click. This option is suitable for Spring developers who want to quickly deploy applications to Azure cloud services.
- The **Azure portal + Maven plugin** option provides a more conventional way to create resources and deploy applications step by step. This option is suitable for Spring developers using Azure cloud services for the first time.
- The **Azure CLI** option uses a powerful command line tool to manage Azure resources. This option is suitable for Spring developers who are familiar with Azure cloud services.



## 1. Prerequisites

**Applies to: sc-standard**


### [Azure portal](#tab/Azure-portal)

- An Azure subscription. If you don't have a subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin)

- An Azure subscription. If you don't have a subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.
- [Git](https://git-scm.com/downloads).
- [Java Development Kit (JDK)](https://learn.microsoft.com/java/azure/jdk/), version 17.

### [Azure Developer CLI](#tab/Azure-Developer-CLI)

- An Azure subscription. If you don't have a subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.
- [Git](https://git-scm.com/downloads).
- [Java Development Kit (JDK)](https://learn.microsoft.com/java/azure/jdk/), version 17.
- [Azure Developer CLI (AZD)](https://learn.microsoft.com/azure/developer/azure-developer-cli/install-azd), version 1.2.0 or higher.

---



**Applies to: sc-enterprise**


### [Azure portal](#tab/Azure-portal-ent)

- An Azure subscription. If you don't have a subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin-ent)

- An Azure subscription. If you don't have a subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.
- [Git](https://git-scm.com/downloads).
- [Java Development Kit (JDK)](https://learn.microsoft.com/java/azure/jdk/), version 17.

### [Azure CLI](#tab/Azure-CLI)

- An Azure subscription. If you don't have a subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.
- [Git](https://git-scm.com/downloads).
- [Java Development Kit (JDK)](https://learn.microsoft.com/java/azure/jdk/), version 17.
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) version 2.45.0 or higher. Use the following command to install the Azure Spring Apps extension: `az extension add --name spring`

---



**Applies to: sc-enterprise**



<!--
For clarity of structure, a separate markdown file is used to describe how to deploy to Azure Spring Apps enterprise plan.

[!INCLUDE [deploy-to-azure-spring-apps-enterprise-plan](includes/quickstart-deploy-web-app/deploy-enterprise-plan.md)]

-->

## 2. Prepare the Spring project

### [Azure portal](#tab/Azure-portal-ent)

The **Deploy to Azure** button in the next section launches an Azure portal experience that downloads a JAR package from the [ASA-Samples-Web-Application releases](https://github.com/Azure-Samples/ASA-Samples-Web-Application/releases) page on GitHub. No local preparation steps are needed.

### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin-ent)

Although you use the Azure portal in later steps, you must use the Bash command line to prepare the project locally. Use the following steps to clone and run the app locally:


<!--
For clarity of structure, a separate markdown file is used to describe how to prepare the project.

[!INCLUDE [prepare-project-on-azure-portal](../../includes/quickstart-deploy-web-app/prepare-web-project.md)]

-->

1. Use the following command to clone the sample project from GitHub:

   ```bash
   git clone https://github.com/Azure-Samples/ASA-Samples-Web-Application.git
   ```

1. Use the following command to build the sample project with Maven:

   ```bash
   cd ASA-Samples-Web-Application
   ./mvnw clean package
   ```

1. Use the following command to run the sample application:

   ```bash
   java -jar web/target/simple-todo-web.jar
   ```

1. Go to `http://localhost:8080` in your browser to access the application.



### [Azure CLI](#tab/Azure-CLI)

Use the following steps to clone and run the app locally:


<!--
For clarity of structure, a separate markdown file is used to describe how to prepare the project.

[!INCLUDE [prepare-project-on-azure-portal](../../includes/quickstart-deploy-web-app/prepare-web-project.md)]

-->

1. Use the following command to clone the sample project from GitHub:

   ```bash
   git clone https://github.com/Azure-Samples/ASA-Samples-Web-Application.git
   ```

1. Use the following command to build the sample project with Maven:

   ```bash
   cd ASA-Samples-Web-Application
   ./mvnw clean package
   ```

1. Use the following command to run the sample application:

   ```bash
   java -jar web/target/simple-todo-web.jar
   ```

1. Go to `http://localhost:8080` in your browser to access the application.



---

## 3. Prepare the cloud environment

The main resources required to run this sample are an Azure Spring Apps instance and an Azure Database for PostgreSQL instance. This section provides the steps to create these resources.

### [Azure portal](#tab/Azure-portal-ent)


<!--
For clarity of structure, a separate markdown file is used to describe how to prepare cloud env (enterprise plan) using Azure portal.

[!INCLUDE [prepare-cloud-environment-on-azure-portal](../../includes/quickstart-deploy-web-app/web-prepare-cloud-environment-enterprise-azure-portal.md)]

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
   | **Postgre SQL Admin Password** | N/A | The password for the PostgreSQL Server administrator. |
   | **Postgre SQL User Password** | N/A | The password for the PostgreSQL application user, which is used in the application. |

   Screenshot of the Azure portal that shows the custom deployment.

1. Select **Review and Create** to review your selections. Then, select **Create** to deploy the app to Azure Spring Apps.

1. On the toolbar, select the **Notifications** icon (a bell) to monitor the deployment process. After the deployment finishes, you can select **Pin to dashboard**, which creates a tile for this service on your Azure portal dashboard as a shortcut to the service's **Overview** page. Select **Go to resource** to open the service's **Overview** page.

   Screenshot of the Azure portal that shows the Overview page with the custom deployment notifications pane open.


### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin-ent)

### 3.1. Sign in to the Azure portal

Go to the [Azure portal](https://portal.azure.com/), enter your credentials, and sign in to the portal. The default view is your service dashboard.

### 3.2. Create an Azure Spring Apps instance


<!-- 
To reuse the Spring Apps instance creation steps in other articles, a separate markdown file is used to describe how to provision Spring Apps instance for RESTful API app.

[!INCLUDE [provision-enterprise-azure-spring-apps](provision-enterprise-azure-spring-apps.md)]

-->

Use the following steps to create the service instance:

1. Select **Create a resource** in the corner of the Azure portal.

1. Select **Compute** > **Azure Spring Apps**.

   Screenshot of the Azure portal that shows Azure Spring Apps in the list of compute resources.

1. Fill out the **Basics** form with the following information:

   | Setting | Suggested value | Description |
   | --- | --- | --- |
   | **Subscription** | Your subscription name. | The  Azure subscription that you want to use for your server. If you have multiple subscriptions, choose the subscription in which you'd like to be billed for the resource. |
   | **Resource group** | **myresourcegroup** | A new resource group name or an existing one from your subscription. |
   | **Name** | **myasa** | A unique name that identifies your Azure Spring Apps service. The name must be between 4 and 32 characters long and can contain only lowercase letters, numbers, and hyphens. The first character of the service name must be a letter and the last character must be either a letter or a number. |
   | **Plan** | **Enterprise** | The pricing plan that determines the resource and cost associated with your instance. |
   | **Region** | The region closest to your users. | The location that is closest to your users. |
   | **Zone Redundant** | Unselected | The option to create your Azure Spring Apps service in an Azure availability zone. This feature isn't currently supported in all regions. |
   | **Software IP plan** | Pay-as-You-Go | Pay as you go with Azure Spring Apps. |
   | **Terms** | Selected | The agreement checkbox associated with [Marketplace offering](https://aka.ms/ascmpoffer). You're required to select this checkbox. |
   | **Deploy sample project** | Unselected | The option to use the built-in sample application. |

   Screenshot of the Azure portal that shows the Create Azure Spring Apps page.

1. Select **Review and Create** to review your selections. Then, select **Create** to provision the Azure Spring Apps instance.

1. On the toolbar, select the **Notifications** icon (a bell) to monitor the deployment process. After the deployment finishes, you can select **Pin to dashboard**, which creates a tile for this service on your Azure portal dashboard as a shortcut to the service's **Overview** page.

   Screenshot of the Azure portal that shows the Notifications pane for Azure Spring Apps creation.

1. Select **Go to resource** to go to the **Azure Spring Apps Overview** page.


### 3.3. Prepare the PostgreSQL instance


<!--
For clarity of structure, a separate markdown file is used to describe how to provision PostgreSQL database.

[!INCLUDE [provision-postgresql-flexible](includes/quickstart-deploy-web-app/provision-postgresql.md)]

-->

Use the following steps to create an Azure Database for PostgreSQL server:

1. In the Azure portal, select **Create a resource**.

1. Select **Databases** > **Azure Database for PostgreSQL Flexible Server**.

   Screenshot of the Azure portal that shows the Create a resource page with Azure Database for PostgreSQL highlighted.

1. Fill out the **Basics** tab with the following information:

   - **Server name**: **my-demo-pgsql**
   - **Region**: **East US**
   - **PostgreSQL version**: **14**
   - **Workload type**: **Development**
   - **Enable high availability**: unselected
   - **Authentication method**: **PostgreSQL authentication only**
   - **Admin username**: **myadmin**
   - **Password** and **Confirm password**: Enter a password.

1. Configure the **Networking** tab using the following information:

   - **Connectivity method**: **Public access (allowed IP addresses)**
   - **Allow public access from any Azure service within Azure to this server**: selected

   Screenshot of the Azure portal that shows the Networking tab.

1. Select **Review + create** to review your selections, then select **Create** to provision the server. This operation might take a few minutes.

1. Go to your PostgreSQL server in the Azure portal.

1. Select **Databases** from the navigation menu to create a database - for example, **Todo**.

   Screenshot of the Azure portal that shows the Databases page with the Create Database pane open.


### 3.4. Connect app instance to PostgreSQL instance

Use the following steps to connect your service instances:

1. Go to your Azure Spring Apps instance in the Azure portal.

1. From the navigation pane, open **Apps** and then select **Create App**.

1. On the **Create App** page, for the app name, use **simple-todo-web** and leave all the other fields with their default values.

1. Select **Create** to finish creating the app and then select the app to view the details.

1. Select **Service Connector** from the navigation pane and then select **Create** to create a new service connection.

   Screenshot of the Azure portal that shows the enterprise plan Service Connector page with the Create button highlighted.

1. Fill out the **Basics** tab with the following information:

   - **Service type**: **DB for PostgreSQL flexible server**
   - **Connection name**: Populated with an automatically generated name that you can modify.
   - **Subscription**: Select your subscription.
   - **PostgreSQL flexible server**: **my-demo-pgsql**
   - **PostgreSQL database**: Select the database you created.
   - **Client type**: **SpringBoot**

   Screenshot of the Azure portal that shows the Basics tab of the created connection pane for connecting to PostgreSQL.

1. Configure the **Next: Authentication** tab with the following information:

   
> **Note:**
> Microsoft recommends using the most secure authentication flow available. The authentication flow described in this procedure, such as for databases, caches, messaging, or AI services, requires a very high degree of trust in the application and carries risks not present in other flows. Use this flow only when more secure options, like managed identities for passwordless or keyless connections, are not viable. For local machine operations, prefer user identities for passwordless or keyless connections.


   - **Select the authentication type you'd like to use between your compute service and target service.**: Select **Connection string**.
   - **Continue with...**: Select **Database credentials**
   - **Username**: **myadmin**
   - **Password**: Enter your password.

   Screenshot of the Azure portal that shows the Authentication tab of the created connection pane with the Connection string option highlighted.

1. Select **Next: Networking**. Use the default option **Configure firewall rules to enable access to target service.**.

1. Select **Next: Review and Create** to review your selections and then select **Create** to create the connection.

### [Azure CLI](#tab/Azure-CLI)

### 3.1. Provide names for each resource

Create variables to hold the resource names by using the following commands. Be sure to replace the placeholders with your own values.


> **Note:**
> Microsoft recommends using the most secure authentication flow available. The authentication flow described in this procedure, such as for databases, caches, messaging, or AI services, requires a very high degree of trust in the application and carries risks not present in other flows. Use this flow only when more secure options, like managed identities for passwordless or keyless connections, are not viable. For local machine operations, prefer user identities for passwordless or keyless connections.


```azurecli
export RESOURCE_GROUP=<resource-group-name>
export LOCATION=<location>
export POSTGRESQL_SERVER=<server-name>
export POSTGRESQL_DB=<database-name>
export POSTGRESQL_ADMIN_USERNAME=<admin-username>
export POSTGRESQL_ADMIN_PASSWORD=<admin-password>
export AZURE_SPRING_APPS_NAME=<Azure-Spring-Apps-service-instance-name>
export APP_NAME=<web-app-name>
```

### 3.2. Create a new resource group

Use the following steps to create a new resource group.

1. Use the following command to sign in to the Azure CLI.

   ```azurecli
   az login
   ```

1. Use the following command to set the default location.

   ```azurecli
   az configure --defaults location=${LOCATION}
   ```

1. Use the following command to list all available subscriptions to determine the subscription ID to use.

   ```azurecli
   az account list --output table
   ```

1. Use the following command to set the default subscription:

   ```azurecli
   az account set --subscription <subscription-ID>
   ```

1. Use the following command to create a resource group.

   ```azurecli
   az group create --resource-group ${RESOURCE_GROUP}
   ```

1. Use the following command to set the newly created resource group as the default resource group.

   ```azurecli
   az configure --defaults group=${RESOURCE_GROUP}
   ```

### 3.3. Create an Azure Spring Apps instance

Azure Spring Apps is used to host the Spring web app. Create an Azure Spring Apps instance and an application inside it.

1. Use the following command to create an Azure Spring Apps service instance.

   ```azurecli
   az spring create --name ${AZURE_SPRING_APPS_NAME} --sku enterprise
   ```

1. Use the following command to create an application in the Azure Spring Apps instance.

   ```azurecli
   az spring app create \
       --service ${AZURE_SPRING_APPS_NAME} \
       --name ${APP_NAME} \
       --assign-endpoint true
   ```

### 3.4. Prepare the PostgreSQL instance

The Spring web app uses H2 for the database in localhost, and Azure Database for PostgreSQL for the database in Azure.

Use the following command to create a PostgreSQL instance:


> **Note:**
> Microsoft recommends using the most secure authentication flow available. The authentication flow described in this procedure, such as for databases, caches, messaging, or AI services, requires a very high degree of trust in the application and carries risks not present in other flows. Use this flow only when more secure options, like managed identities for passwordless or keyless connections, are not viable. For local machine operations, prefer user identities for passwordless or keyless connections.


```azurecli
az postgres flexible-server create \
    --name ${POSTGRESQL_SERVER} \
    --database-name ${POSTGRESQL_DB} \
    --admin-user ${POSTGRESQL_ADMIN_USERNAME} \
    --admin-password ${POSTGRESQL_ADMIN_PASSWORD} \
    --public-access 0.0.0.0
```

Specifying `0.0.0.0` enables public access from any resources deployed within Azure to access your server.

### 3.5. Connect app instance to PostgreSQL instance

After the application instance and the PostgreSQL instance are created, the application instance can't access the PostgreSQL instance directly. Use the following steps to enable the app to connect to the PostgreSQL instance.

1. Use the following command to get the PostgreSQL instance's fully qualified domain name:

   ```azurecli
   export PSQL_FQDN=$(az postgres flexible-server show \
       --name ${POSTGRESQL_SERVER} \
       --query fullyQualifiedDomainName \
       --output tsv)
   ```

1. Use the following command to provide the `spring.datasource.` properties to the app through environment variables:

   
> **Note:**
> Microsoft recommends using the most secure authentication flow available. The authentication flow described in this procedure, such as for databases, caches, messaging, or AI services, requires a very high degree of trust in the application and carries risks not present in other flows. Use this flow only when more secure options, like managed identities for passwordless or keyless connections, are not viable. For local machine operations, prefer user identities for passwordless or keyless connections.


   ```azurecli
   az spring app update \
       --service ${AZURE_SPRING_APPS_NAME} \
       --name ${APP_NAME} \
       --env SPRING_DATASOURCE_URL="jdbc:postgresql://${PSQL_FQDN}:5432/${POSTGRESQL_DB}?sslmode=require" \
             SPRING_DATASOURCE_USERNAME="${POSTGRESQL_ADMIN_USERNAME}" \
             SPRING_DATASOURCE_PASSWORD="${POSTGRESQL_ADMIN_PASSWORD}"
   ```

---

## 4. Deploy the app to Azure Spring Apps

### [Azure portal](#tab/Azure-portal-ent)


<!--
For clarity of structure, a separate markdown file is used to describe how to deploy web app using Azure portal.

[!INCLUDE [deploy-web-app-on-azure-portal](../../includes/quickstart-deploy-web-app/deploy-web-app-azure-portal.md)]

-->

The **Deploy to Azure** button in the previous section launches an Azure portal experience that includes application deployment, so nothing else is needed.


### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin-ent)


<!-- 
Use the following line at the end of the heading Prerequisites, with blank lines before and after. App deployments with Spring Apps Maven plugin.

[!INCLUDE [web-spring-apps-maven-plugin](includes/quickstart-deploy-web-app/web-spring-apps-maven-plugin.md)]
-->

Use the following steps to deploy using the [Maven plugin for Azure Spring Apps](https://github.com/microsoft/azure-maven-plugins/wiki/Azure-Spring-Apps):

1. Navigate to the **complete** directory, and then run the following command to configure the app in Azure Spring Apps:

   ```bash
   ./mvnw com.microsoft.azure:azure-spring-apps-maven-plugin:1.19.0:config
   ```

   The following list describes the command interactions:

   - **Select child modules to configure**: Select the module to configure, then enter the number of the **SimpleTodo Web** module.
   - **OAuth2 login**: You need to authorize the sign in to Azure based on the OAuth2 protocol.
   - **Select subscription**: Select the subscription list number of the Azure Spring Apps instance you created, which defaults to the first subscription in the list. If you use the default number, press <kbd>Enter</kbd> directly.
   - **Use existing Azure Spring Apps in Azure**: Press <kbd>y</kbd> to use the existing Azure Spring Apps instance.
   - **Select Azure Spring Apps for deployment**: Select the number of the Azure Spring Apps instance you created. If you use the default number, press <kbd>Enter</kbd> directly.
   - **Expose public access for this app**: Press <kbd>y</kbd>.
   - **Confirm to save all the above configurations**: Press <kbd>y</kbd>. If you press <kbd>n</kbd>, the configuration isn't saved in the POM files.

1. Use the following command to deploy the app:

   ```bash
   ./mvnw azure-spring-apps:deploy
   ```

   The following list describes the command interaction:

   - **OAuth2 login**: You need to authorize the sign in to Azure based on the OAuth2 protocol.

   After the command is executed, you can see from the following log messages that the deployment was successful:


   ```output
   [INFO] Deployment Status: Running
   [INFO]   InstanceName:simple-todo-web-default-15-xxxxxxxxx-xxxxx  Status:Running Reason:null       DiscoverStatus:N/A       
   [INFO] Getting public url of app(simple-todo-web)...
   [INFO] Application url: https://<your-Azure-Spring-Apps-instance-name>-simple-todo-web.azuremicroservices.io
   ```

   The output **Application url** is the endpoint to access the `todo` application.

### [Azure CLI](#tab/Azure-CLI)

Now that the cloud environment is prepared, the application is ready to deploy. Use the following command to deploy the app:

```azurecli
az spring app deploy \
    --service ${AZURE_SPRING_APPS_NAME} \
    --name ${APP_NAME} \
    --artifact-path web/target/simple-todo-web.jar
```

---




**Applies to: sc-standard**



<!--
For clarity of structure, a separate markdown file is used to describe how to deploy to Azure Spring Apps with standard plan.

[!INCLUDE [deploy-to-azure-spring-apps-standard-plan](includes/quickstart-deploy-web-app/deploy-standard-plan.md)]

-->

## 2. Prepare the Spring project

### [Azure portal](#tab/Azure-portal)

The **Deploy to Azure** button in the next section launches an Azure portal experience that downloads a JAR package from the [ASA-Samples-Web-Application releases](https://github.com/Azure-Samples/ASA-Samples-Web-Application/releases) page on GitHub. No local preparation steps are needed.

### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin)

Although you use the Azure portal in later steps, you must use the Bash command line to prepare the project locally. Use the following steps to clone and run the app locally:


<!--
For clarity of structure, a separate markdown file is used to describe how to prepare the project.

[!INCLUDE [prepare-project-on-azure-portal](../../includes/quickstart-deploy-web-app/prepare-web-project.md)]

-->

1. Use the following command to clone the sample project from GitHub:

   ```bash
   git clone https://github.com/Azure-Samples/ASA-Samples-Web-Application.git
   ```

1. Use the following command to build the sample project with Maven:

   ```bash
   cd ASA-Samples-Web-Application
   ./mvnw clean package
   ```

1. Use the following command to run the sample application:

   ```bash
   java -jar web/target/simple-todo-web.jar
   ```

1. Go to `http://localhost:8080` in your browser to access the application.



### [Azure Developer CLI](#tab/Azure-Developer-CLI)

Use the following steps to initialize the web application from the Azure Developer CLI templates:

1. Open a terminal, create an empty folder, and then change directory into it.

1. Use the following command to initialize the project:

   ```bash
   azd init --template https://github.com/Azure-Samples/ASA-Samples-Web-Application
   ```

   The following list describes the command interaction:

   - **Enter a new environment name**: Provide an environment name, which is used as a suffix for the resource group created to hold all the Azure resources. This name should be unique within your Azure subscription.

   The console outputs messages similar to the following example:

   ```output
   Initializing a new project (azd init)
   (✓) Done: Initialized git repository
   (✓) Done: Downloading template code to: <your-local-path>

   Please enter a new environment name: <your-env-name>

   SUCCESS: New project initialized!
   You can view the template code in your directory: <your-local-path>
   Learn more about running 3rd party code on our DevHub: https://aka.ms/azd-third-party-code-notice
   ```

---

## 3. Prepare the cloud environment

The main resources required to run this sample are an Azure Spring Apps instance and an Azure Database for PostgreSQL instance. This section provides the steps to create these resources.

### [Azure portal](#tab/Azure-portal)


<!--
For clarity of structure, a separate markdown file is used to describe how to prepare cloud env (standard plan) using Azure portal.

[!INCLUDE [prepare-cloud-environment-on-azure-portal](../../includes/quickstart-deploy-web-app/web-prepare-cloud-environment-standard-azure-portal.md)]

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
   | **Postgre SQL Admin Password** | N/A | The password for the PostgreSQL Server administrator. |
   | **Postgre SQL User Password** | N/A | The password for the PostgreSQL application user, which is used in the application. |

   Screenshot of the Azure portal that shows the custom deployment.

1. Select **Review and Create** to review your selections. Then select **Create** to deploy the app to Azure Spring Apps.

1. On the toolbar, select the **Notifications** icon (a bell) to monitor the deployment process. After the deployment finishes, you can select **Pin to dashboard**, which creates a tile for this service on your Azure portal dashboard as a shortcut to the service's **Overview** page. Select **Go to resource** to open the service's **Overview** page.

   Screenshot of the Azure portal that shows the Overview page with the custom deployment notifications pane open.



### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin)

Use the following steps to create an Azure Spring Apps instance and an Azure Database for PostgreSQL instance:

### 3.1. Sign in to the Azure portal

Go to the [Azure portal](https://portal.azure.com/) and enter your credentials to sign in to the portal. The default view is your service dashboard.

### 3.2. Create an Azure Spring Apps instance

Use the following steps to create a service instance:

1. Select **Create a resource** in the corner of the portal.

1. Select **Compute** > **Azure Spring Apps**.

   Screenshot of the Azure portal that shows the Create a resource page with Azure Spring Apps highlighted.

1. Fill out the form on the **Basics** tab. Use the following table as a guide for completing the form:

   | Setting | Suggested value | Description |
   | --- | --- | --- |
   | **Subscription** | Your subscription name. | The Azure subscription that you want to use for your server. If you have multiple subscriptions, choose the subscription in which you'd like to be billed for the resource. |
   | **Resource group** | **myresourcegroup** | A new resource group name or an existing one from your subscription. |
   | **Name** | **myasa** | A unique name that identifies your Azure Spring Apps service. The name must be between 4 and 32 characters long and can contain only lowercase letters, numbers, and hyphens. The first character of the service name must be a letter and the last character must be either a letter or a number. |
   | **Plan** | **Basic** | The pricing plan determines the resource and cost associated with your instance. |
   | **Region** | The region closest to your users. | The location that is closest to your users. |
   | **Zone Redundant** | Unselected | Whether to create your Azure Spring Apps service in an Azure availability zone. Currently, this feature is supported only in some regions. |

   Screenshot of the Azure portal that shows the Create Azure Spring Apps page.

1. Select **Review and Create** to review your selections. Then, select **Create** to provision the Azure Spring Apps instance.

1. On the toolbar, select the **Notifications** icon (a bell) to monitor the deployment process. After the deployment finishes, you can select **Pin to dashboard**, which creates a tile for this service on your Azure portal dashboard as a shortcut to the service's **Overview** page. Select **Go to resource** to open the service's **Overview** page.

   Screenshot of the Azure portal that shows the Overview page with the Notifications pane open.

### 3.3. Prepare the PostgreSQL instance


<!--
For clarity of structure, a separate markdown file is used to describe how to provision PostgreSQL database.

[!INCLUDE [provision-postgresql-flexible](includes/quickstart-deploy-web-app/provision-postgresql.md)]

-->

Use the following steps to create an Azure Database for PostgreSQL server:

1. In the Azure portal, select **Create a resource**.

1. Select **Databases** > **Azure Database for PostgreSQL Flexible Server**.

   Screenshot of the Azure portal that shows the Create a resource page with Azure Database for PostgreSQL highlighted.

1. Fill out the **Basics** tab with the following information:

   - **Server name**: **my-demo-pgsql**
   - **Region**: **East US**
   - **PostgreSQL version**: **14**
   - **Workload type**: **Development**
   - **Enable high availability**: unselected
   - **Authentication method**: **PostgreSQL authentication only**
   - **Admin username**: **myadmin**
   - **Password** and **Confirm password**: Enter a password.

1. Configure the **Networking** tab using the following information:

   - **Connectivity method**: **Public access (allowed IP addresses)**
   - **Allow public access from any Azure service within Azure to this server**: selected

   Screenshot of the Azure portal that shows the Networking tab.

1. Select **Review + create** to review your selections, then select **Create** to provision the server. This operation might take a few minutes.

1. Go to your PostgreSQL server in the Azure portal.

1. Select **Databases** from the navigation menu to create a database - for example, **Todo**.

   Screenshot of the Azure portal that shows the Databases page with the Create Database pane open.


### 3.4. Connect app instance to PostgreSQL instance

Use the following steps to connect your service instances:

1. Go to your Azure Spring Apps instance in the Azure portal.

1. From the navigation pane, open the **Apps** pane and select **Create App**.

1. On the **Create App** page, for the app name, use **simple-todo-web** and for the runtime platform, select **Java 17**.

   Screenshot of the Azure portal that shows the Create app pane.

1. Select **Create** to finish the app creation and select the app to view details.

1. Select **Service Connector** from the navigation pane and then select **Create** to create a new service connection.

   Screenshot of the Azure portal that shows the Service Connector page with the Create button highlighted.

1. Fill out the **Basics** tab with the following information:

   - **Service type**: **DB for PostgreSQL flexible server**
   - **Connection name**: Populated with an automatically generated name that you can modify.
   - **Subscription**: Select your subscription.
   - **PostgreSQL flexible server**: **my-demo-pgsql**
   - **PostgreSQL database**: Select the database you created.
   - **Client type**: **SpringBoot**

   Screenshot of the Azure portal that shows the Basics tab of the Created connection pane for connecting to PostgreSQL.

1. Configure the **Next: Authentication** tab with the following information:

   - **Select the authentication type you'd like to use between your compute service and target service.**: Select **Connection string**.
   - **Continue with...**: Select **Database credentials**.
   - **Username**: **myadmin**
   - **Password**: Enter your password.

   Screenshot of the Azure portal that shows the Authentication tab of the Created connection pane with the Connection string option highlighted.

1. Select **Next: Networking**. Use the default option **Configure firewall rules to enable access to target service.**.

1. Select **Next: Review and Create** to review your selections and then select **Create** to create the connection.

### [Azure Developer CLI](#tab/Azure-Developer-CLI)

Use the following steps to create an Azure Spring Apps instance and an Azure Database for PostgreSQL instance:

1. Use the following command to log in Azure with OAuth2. Ignore this step if you've already logged in.

   ```bash
   azd auth login
   ```

   The console outputs messages similar to the following example:

   ```text
   Logged in to Azure.
   ```

1. Use the following command to set the template with the **standard** plan:

   ```bash
   azd env set PLAN standard
   ```

1. Use the following command to provision the template's infrastructure to Azure:

   ```bash
   azd provision
   ```

   The following list describes the command interactions:

   - **Please select an Azure Subscription to use**: Use arrows to move, type to filter, then press <kbd>ENTER</kbd>.
   - **Please select an Azure location to use**: Use arrows to move, type to filter, then press <kbd>ENTER</kbd>.

   The console outputs messages similar to the following example:

   ```output
   SUCCESS: Your application was provisioned in Azure in xx minutes xx seconds.
   You can view the resources created under the resource group rg-<your-environment-name> in Azure portal:
   https://portal.azure.com/#@/resource/subscriptions/<your-subscription-id>/resourceGroups/rg-<your-environment-name>/overview
   ```

   > **Note:**
   > This command may take a while to complete. You see a progress indicator as it provisions Azure resources.

---

## 4. Deploy the app to Azure Spring Apps

### [Azure portal](#tab/Azure-portal)


<!--
For clarity of structure, a separate markdown file is used to describe how to deploy web app using Azure portal.

[!INCLUDE [deploy-web-app-on-azure-portal](../../includes/quickstart-deploy-web-app/deploy-web-app-azure-portal.md)]

-->

The **Deploy to Azure** button in the previous section launches an Azure portal experience that includes application deployment, so nothing else is needed.


### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin)

You can now deploy the app to Azure Spring Apps.

Use the following steps to deploy with the [Maven plugin for Azure Spring Apps](https://github.com/microsoft/azure-maven-plugins/wiki/Azure-Spring-Apps):

1. Navigate to the sample project directory and run the following command to configure the app in Azure Spring Apps:

   ```bash
   ./mvnw com.microsoft.azure:azure-spring-apps-maven-plugin:1.19.0:config
   ```

   The following list describes the command interactions:

   - **Select child modules to configure**: Select the module to configure, then enter the number of the *SimpleTodo Web* module.
   - **OAuth2 login**: Authorize the sign in to Azure based on the OAuth2 protocol.
   - **Select subscription**: Select the subscription list number of the Azure Spring Apps instance you created, which defaults to the first subscription in the list. If you use the default number, press <kbd>ENTER</kbd> directly.
   - **Select Azure Spring Apps**: Select the number of the Azure Spring Apps instance you created. If you use the default number, press <kbd>ENTER</kbd> directly.
   - **Expose public access for this app?**: Press <kbd>y</kbd>.
   - **Confirm to save all the above configurations (Y/n)**: Press <kbd>y</kbd>. If you press <kbd>n</kbd>, the configuration isn't saved in the POM files.

1. Use the following command to deploy the app:

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
   [INFO]   InstanceName:simple-todo-web-default-x-xxxxxxxxxx-xxxxx  Status:Running Reason:null       DiscoverStatus:UNREGISTERED
   [INFO]   InstanceName:simple-todo-web-default-x-xxxxxxxxx-xxxxx  Status:Terminating Reason:null       DiscoverStatus:UNREGISTERED
   [INFO] Getting public url of app(simple-todo-web)...
   [INFO] Application url: https://<your-Azure-Spring-Apps-instance-name>-simple-todo-web.azuremicroservices.io
   ```

   The output **Application url** is the endpoint to access the `todo` application.

### [Azure Developer CLI](#tab/Azure-Developer-CLI)

You can now deploy the app to Azure Spring Apps. Use the following steps to package the app, provision the Azure resources required by the web application, and then deploy to Azure Spring Apps:

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

   (✓) Done: Deploying service simple-todo-web
   - Endpoint: https://<your-Azure-Spring-Apps-instance-name>-simple-todo-web.azuremicroservices.io/

   
   SUCCESS: Your application was deployed to Azure in xx minutes xx seconds.
   You can view the resources created under the resource group rg-<your-environment-name> in Azure portal:
   https://portal.azure.com/#@/resource/subscriptions/<your-subscription-id>/resourceGroups/rg-<your-environment-name>/overview
   ```

   The output **Endpoint** is the endpoint to access the `todo` application.

> **Note:**
> You can also use `azd up` to combine the previous three commands: `azd package` (packages a deployable copy of your application), `azd provision` (provisions Azure resources), and `azd deploy` (deploys application code). For more information, see [Azure-Samples/ASA-Samples-Web-Application](https://github.com/Azure-Samples/ASA-Samples-Web-Application).

---




## 5. Validate the web app

Now you can access the deployed app to see whether it works.

**Applies to: sc-enterprise**


### [Azure portal](#tab/Azure-portal-ent)

Use the following steps to validate:

1. After the deployment finishes, you can find the application URL from the deployment outputs:

   Diagram that shows the enterprise app URL of the ARM deployment outputs.

1. Access the application with the output application URL. The page should appear as you saw in localhost.

1. Check the details for each resource deployment, which are useful for investigating any deployment issues.

### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin-ent)

Access the application with the output application URL. The page should appear as you saw in localhost.

### [Azure CLI](#tab/Azure-CLI)

Use the following steps to validate:

1. After the deployment finishes, you can access the app with this URL: `https://${AZURE_SPRING_APPS_NAME}-${APP_NAME}.azuremicroservices.io/`. The page should appear as you saw in localhost.

1. To check the app's log to investigate any deployment issue, use the following command:

   ```azurecli
   az spring app logs \
       --service ${AZURE_SPRING_APPS_NAME} \
       --name ${APP_NAME}
   ```

---



**Applies to: sc-standard**


### [Azure portal](#tab/Azure-portal)

Use the following steps to validate:

1. After the deployment finishes, find the application URL from the deployment outputs:

   Diagram that shows the standard app URL of the ARM deployment outputs.

1. Access the application URL. The page should appear as you saw in localhost.

1. Check the details for each resource deployment, which are useful for investigating any deployment issues.

### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin)

Access the application with the output application URL. The page should appear as you saw in localhost.

### [Azure Developer CLI](#tab/Azure-Developer-CLI)

Access the application with the output endpoint. The page should appear as you saw in localhost.

---



## 6. Clean up resources

Be sure to delete the resources you created in this article when you no longer need them. You can delete the Azure resource group, which includes all the resources in the resource group.

**Applies to: sc-standard**



<!--
For clarity of structure, a separate markdown file is used to describe how to clean up resources using Azure portal or AZD.

[!INCLUDE [clean-up-resources-portal-or-azd](includes/quickstart-deploy-web-app/clean-up-resources.md)]

-->

### [Azure portal](#tab/Azure-portal)


<!--
For clarity of structure, a separate markdown file is used to describe how to clean up Azure resource via resource group.

[!INCLUDE [clean-up-resources-via-resource-group](../../includes/quickstart-deploy-web-app/clean-up-resources-via-resource-group.md)]

-->

Use the following steps to delete the entire resource group, including the newly created service instance:

1. Locate your resource group in the Azure portal. On the navigation menu, select **Resource groups**, and then select the name of your resource group.

1. On the **Resource group** page, select **Delete**. Enter the name of your resource group in the text box to confirm deletion, then select **Delete**.


### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin)


<!--
For clarity of structure, a separate markdown file is used to describe how to clean up Azure resource via resource group.

[!INCLUDE [clean-up-resources-via-resource-group](../../includes/quickstart-deploy-web-app/clean-up-resources-via-resource-group.md)]

-->

Use the following steps to delete the entire resource group, including the newly created service instance:

1. Locate your resource group in the Azure portal. On the navigation menu, select **Resource groups**, and then select the name of your resource group.

1. On the **Resource group** page, select **Delete**. Enter the name of your resource group in the text box to confirm deletion, then select **Delete**.


### [Azure Developer CLI](#tab/Azure-Developer-CLI)

Use the following command to delete all the Azure resources used in this sample application:

```bash
azd down
```

The following list describes the command interaction:

- **Total resources to delete: \<resources-total>, are you sure you want to continue?**: Press <kbd>y</kbd>.

The console outputs messages similar to the following example:

```output
SUCCESS: Your application was removed from Azure in xx minutes xx seconds.
```

---




**Applies to: sc-enterprise**


### [Azure portal](#tab/Azure-portal-ent)


<!--
For clarity of structure, a separate markdown file is used to describe how to clean up Azure resource via resource group.

[!INCLUDE [clean-up-resources-via-resource-group](../../includes/quickstart-deploy-web-app/clean-up-resources-via-resource-group.md)]

-->

Use the following steps to delete the entire resource group, including the newly created service instance:

1. Locate your resource group in the Azure portal. On the navigation menu, select **Resource groups**, and then select the name of your resource group.

1. On the **Resource group** page, select **Delete**. Enter the name of your resource group in the text box to confirm deletion, then select **Delete**.


### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin-ent)


<!--
For clarity of structure, a separate markdown file is used to describe how to clean up Azure resource via resource group.

[!INCLUDE [clean-up-resources-via-resource-group](../../includes/quickstart-deploy-web-app/clean-up-resources-via-resource-group.md)]

-->

Use the following steps to delete the entire resource group, including the newly created service instance:

1. Locate your resource group in the Azure portal. On the navigation menu, select **Resource groups**, and then select the name of your resource group.

1. On the **Resource group** page, select **Delete**. Enter the name of your resource group in the text box to confirm deletion, then select **Delete**.


### [Azure CLI](#tab/Azure-CLI)

Use the following command to delete the entire resource group, including the newly created service:

```azurecli
az group delete --name ${RESOURCE_GROUP}
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
