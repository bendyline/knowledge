---
title: Quickstart - Deploy RESTful API Application to Azure Spring Apps
description: Learn how to deploy RESTful API application to Azure Spring Apps.
author: KarlErickson
ms.service: azure-spring-apps
ms.topic: quickstart
ms.date: 08/19/2025
ms.update-cycle: 1095-days
ms.author: karler
ms.reviewer: v-shilichen
ms.custom:
  - devx-track-java
  - devx-track-extended-java
  - mode-other
  - engagement-fy23
  - devx-track-extended-azdevcli
  - devx-track-azurecli
  - sfi-ga-nochange
---

# Quickstart: Deploy RESTful API application to Azure Spring Apps


> **Note:**
> The **Basic**, **Standard**, and **Enterprise** plans entered a retirement period on March 17, 2025. For more information, see the [Azure Spring Apps retirement announcement](../basic-standard/retirement-announcement.md).


This article describes how to deploy a RESTful API application protected by [Microsoft Entra ID](https://learn.microsoft.com/entra/fundamentals/whatis) to Azure Spring Apps. The sample project is a simplified version based on the [Simple Todo](https://github.com/Azure-Samples/ASA-Samples-Web-Application) web application, which only provides the backend service and uses Microsoft Entra ID to protect the RESTful APIs.

These RESTful APIs are protected by applying role-based access control (RBAC). Anonymous users can't access any data and aren't allowed to control access for different users. Anonymous users only have the following three permissions:

- Read: With this permission, a user can read the ToDo data.
- Write: With this permission, a user can add or update the ToDo data.
- Delete: With this permission, a user can delete the ToDo data.

After the deployment is successful, you can view and test the APIs through the Swagger UI.

Screenshot of the Swagger UI that shows the API document.

The following diagram shows the architecture of the system:

Diagram that shows the architecture of a Spring web application.


<!-- 
Use the following line at the end of the heading Prerequisites, with blank lines before and after. Each quickstart should provide two tools for developers.
[!INCLUDE [quickstart-tool-introduction](includes/quickstart-deploy-restful-api-app/quickstart-tool-introduction.md)]
-->

This article describes the following options for creating resources and deploying them to Azure Spring Apps:

- The **Azure portal + Maven plugin** option provides a more conventional way to create resources and deploy applications step by step. This option is suitable for Spring developers using Azure cloud services for the first time.
- The **Azure CLI** option uses a powerful command line tool to manage Azure resources. This option is suitable for Spring developers who are familiar with Azure cloud services.


## 1. Prerequisites

### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin-ent)

- An Azure subscription. If you don't have an Azure subscription, create an [Azure free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.
- One of the following roles:
  - Global Administrator or Privileged Role Administrator, for granting consent for apps requesting any permission, for any API.
  - Cloud Application Administrator or Application Administrator, for granting consent for apps requesting any permission for any API, except Microsoft Graph app roles (application permissions).
  - A custom directory role that includes the [permission to grant permissions to applications](https://learn.microsoft.com/entra/identity/role-based-access-control/custom-consent-permissions), for the permissions required by the application.

  For more information, see [Grant tenant-wide admin consent to an application](https://learn.microsoft.com/entra/identity/enterprise-apps/grant-admin-consent?pivots=portal).
- [Git](https://git-scm.com/downloads).
- [Java Development Kit (JDK)](https://learn.microsoft.com/java/azure/jdk/), version 17.
- A Microsoft Entra tenant. For instructions on creating one, see [Quickstart: Create a new tenant in Microsoft Entra ID](https://learn.microsoft.com/entra/fundamentals/create-new-tenant).

### [Azure CLI](#tab/Azure-CLI)

- An Azure subscription, If you don't have an Azure subscription, create an [Azure free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.
- One of the following roles:
  - Global Administrator or Privileged Role Administrator, for granting consent for apps requesting any permission, for any API.
  - Cloud Application Administrator or Application Administrator, for granting consent for apps requesting any permission for any API, except Microsoft Graph app roles (application permissions).
  - A custom directory role that includes the [permission to grant permissions to applications](https://learn.microsoft.com/entra/identity/role-based-access-control/custom-consent-permissions), for the permissions required by the application.

  For more information, see [Grant tenant-wide admin consent to an application](https://learn.microsoft.com/entra/identity/enterprise-apps/grant-admin-consent?pivots=portal).
- [Git](https://git-scm.com/downloads).
- [Java Development Kit (JDK)](https://learn.microsoft.com/java/azure/jdk/), version 17.
- A Microsoft Entra tenant. For instructions on creating one, see [Quickstart: Create a new tenant in Microsoft Entra ID](https://learn.microsoft.com/entra/fundamentals/create-new-tenant).
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) version 2.53.1 or higher.

---


<!-- 
For clarity of structure, a separate markdown file is used to describe how to deploy to Azure Spring Apps with enterprise plan.

[!INCLUDE [deploy-restful-api-app-with-enterprise-plan](includes/quickstart-deploy-restful-api-app/deploy-restful-api-app-with-enterprise-plan.md)]

-->

## 2. Prepare the Spring project

To deploy the RESTful API app, the first step is to prepare the Spring project to run locally.

Use the following steps to clone and run the app locally:

1. Use the following command to clone the sample project from GitHub:

   ```bash
   git clone https://github.com/Azure-Samples/ASA-Samples-Restful-Application.git
   ```

1. If you want to run the app locally, complete the steps in the [Expose RESTful APIs](#35-expose-restful-apis) and [Update the application configuration](#36-update-the-application-configuration) sections first, and then use the following command to run the sample application with Maven:

   ```bash
   cd ASA-Samples-Restful-Application
   ./mvnw spring-boot:run
   ```

## 3. Prepare the cloud environment

The main resources required to run this sample app are an Azure Spring Apps instance and an Azure Database for PostgreSQL instance. The following sections describe how to create these resources.

### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin-ent)

### 3.1. Sign in to the Azure portal

Go to the [Azure portal](https://portal.azure.com/) and enter your credentials to sign in to the portal. The default view is your service dashboard.

### 3.2. Create an Azure Spring Apps instance


<!-- 
To reuse the Spring Apps instance creation steps in other articles, a separate markdown file is used to describe how to provision Spring Apps instance for RESTful API app.

[!INCLUDE [provision-enterprise-azure-spring-apps](provision-enterprise-azure-spring-apps.md)]

-->

Use the following steps to create an Azure Spring Apps service instance:

1. Select **Create a resource** in the corner of the Azure portal.

1. Select **Compute** > **Azure Spring Apps**.

1. Fill out the **Basics** form with the following information:

   | Setting | Suggested value | Description |
   | --- | --- | --- |
   | **Subscription** | Your subscription name. | The Azure subscription that you want to use for your server. If you have multiple subscriptions, choose the subscription in which you'd like to be billed for the resource. |
   | **Resource group** | **myresourcegroup** | A new resource group name or an existing one from your subscription. |
   | **Name** | **myasa** | A unique name that identifies your Azure Spring Apps service. The name must be between 4 and 32 characters long and can contain only lowercase letters, numbers, and hyphens. The first character of the service name must be a letter and the last character must be either a letter or a number. |
   | **Plan** | **Enterprise** | The pricing plan that determines the resource and cost associated with your instance. |
   | **Region** | The region closest to your users. | The location that is closest to your users. |
   | **Zone Redundant** | Unselected | The option to create your Azure Spring Apps service in an Azure availability zone. This feature isn't currently supported in all regions. |
   | **Software IP plan** | Pay-as-You-Go | The pricing plan that lets you pay as you go with Azure Spring Apps. |
   | **Terms** | Selected | The agreement checkbox associated with [Marketplace offering](https://aka.ms/ascmpoffer). You're required to select this checkbox. |
   | **Deploy sample project** | Unselected | The option to use the built-in sample application. |

1. Select **Review and Create** to review your selections. Then, select **Create** to provision the Azure Spring Apps instance.

1. On the toolbar, select the **Notifications** icon (a bell) to monitor the deployment process. After the deployment finishes, you can select **Pin to dashboard**, which creates a tile for this service on your Azure portal dashboard as a shortcut to the service's **Overview** page.

   Screenshot of the Azure portal that shows the Notifications pane for Azure Spring Apps creation.

1. Select **Go to resource** to go to the **Azure Spring Apps Overview** page.


### 3.3. Prepare the PostgreSQL instance


<!--
For clarity of structure, a separate markdown file is used to describe how to provision PostgreSQL database.

[!INCLUDE [provision-postgresql-flexible](includes/quickstart-deploy-restful-api-app/provision-postgresql.md)]

-->

Use the following steps to create an Azure Database for PostgreSQL server:

1. Go to the Azure portal and select **Create a resource**.

1. Select **Databases** > **Azure Database for PostgreSQL**.

1. Select the **Flexible server** deployment option.

   Screenshot of the Azure portal that shows the Select Azure Database for PostgreSQL deployment option page.

1. Fill out the **Basics** tab with the following information:

   - **Server name**: **my-demo-pgsql**
   - **Region**: **East US**
   - **PostgreSQL version**: **14**
   - **Workload type**: **Development**
   - **Enable high availability**: unselected
   - **Authentication method**: **PostgreSQL authentication only**
   - **Admin username**: **myadmin**
   - **Password** and **Confirm password**: Enter a password.

1. Use the following information to configure the **Networking** tab:

   - **Connectivity method**: **Public access (allowed IP addresses)**
   - **Allow public access from any Azure service within Azure to this server**: selected

1. Select **Review + create** to review your selections, and select **Create** to provision the server. This operation might take a few minutes.

1. Go to your PostgreSQL server in the Azure portal. On the **Overview** page, look for the **Server name** value, and then record it for later use. You need it to configure the environment variables for the app in Azure Spring Apps.

1. Select **Databases** from the navigation menu to create a database - for example, **todo**.

   Screenshot of the Azure portal that shows the Databases page with the Create Database pane open.


### 3.4. Connect app instance to PostgreSQL instance

Use the following steps to connect your service instances:

1. Go to your Azure Spring Apps instance in the Azure portal.

1. From the navigation menu, open **Apps**, and then select **Create App**.

1. On the **Create App** page, fill in the app name **simple-todo-api**, and then select **Java artifacts** as the deployment type.

1. Select **Create** to finish the app creation and then select the app to view the details.

1. Go to the app you created in the Azure portal. On the **Overview** page, select **Assign endpoint** to expose the public endpoint for the app. Save the URL for accessing the app after deployment.

1. Select **Service Connector** from the navigation pane, then select **Create** to create a new service connection.

   Screenshot of the Azure portal that shows the enterprise plan Service Connector page with the Create button highlighted.

1. Fill out the **Basics** tab with the following information:

   - **Service type**: **DB for PostgreSQL flexible server**
   - **Connection name**: An automatically generated name is populated, which can also be modified.
   - **Subscription**: Select your subscription.
   - **PostgreSQL flexible server**: **my-demo-pgsql**
   - **PostgreSQL database**: Select the database you created.
   - **Client type**: **SpringBoot**

   Screenshot of the Azure portal that shows the Basics tab of the Created connection pane for connecting to Service Bus.

1. Configure the **Next: Authentication** tab with the following information:

   
> **Note:**
> Microsoft recommends using the most secure authentication flow available. The authentication flow described in this procedure, such as for databases, caches, messaging, or AI services, requires a very high degree of trust in the application and carries risks not present in other flows. Use this flow only when more secure options, like managed identities for passwordless or keyless connections, are not viable. For local machine operations, prefer user identities for passwordless or keyless connections.


   - **Select the authentication type you'd like to use between your compute service and target service.**: Select **Connection string**.
   - **Continue with...**: Select **Database credentials**
   - **Username**: **myadmin**
   - **Password**: Enter your password.

   Screenshot of the Azure portal that shows the Authentication tab of the Create connection pane with the Connection string option highlighted.

1. Select **Next: Networking**. Use the default option **Configure firewall rules to enable access to target service**.

1. Select **Next: Review and Create** to review your selections, then select **Create** to create the connection.

### 3.5. Expose RESTful APIs


<!-- 
To reuse the Spring Apps instance creation steps in other articles, a separate markdown file is used to describe how to expose RESTful APIs.

[!INCLUDE [expose-restful-apis](expose-restful-apis.md)]

-->

Use the following steps to expose your RESTful APIs in Microsoft Entra ID:

1. Sign in to the [Azure portal](https://portal.azure.com/).

1. If you have access to multiple tenants, use the **Directory + subscription** filter () to select the tenant in which you want to register an application.

1. Search for and select **Microsoft Entra ID**.

1. Under **Manage**, select **App registrations** > **New registration**.

1. Enter a name for your application in the **Name** field - for example, **Todo**. Users of your app might see this name, and you can change it later.

1. For **Supported account types**, select **Accounts in any organizational directory (Any Microsoft Entra directory - Multitenant) and personal Microsoft accounts**.

1. Select **Register** to create the application.

1. On the app **Overview** page, look for the **Application (client) ID** value, and then record it for later use. You need it to configure the YAML configuration file for this project.

1. Under **Manage**, select **Expose an API**, find the **Application ID URI** at the beginning of the page, and then select **Add**.

1. On the **Edit application ID URI** page, accept the proposed Application ID URI (`api://{client ID}`) or use a meaningful name instead of the client ID, such as `api://simple-todo`, and then select **Save**.

1. Under **Manage**, select **Expose an API** > **Add a scope**, and then enter the following information:

   - For **Scope name**, enter **ToDo.Read**.
   - For **Who can consent**, select **Admins only**.
   - For **Admin consent display name**, enter *Read the ToDo data*.
   - For **Admin consent description**, enter *Allows authenticated users to read the ToDo data.*.
   - For **State**, keep it enabled.
   - Select **Add scope**.

1. Repeat the previous steps to add the other two scopes: **ToDo.Write** and **ToDo.Delete**.

   Screenshot of the Azure portal that shows the Expose an API page of a RESTful API application.


### 3.6. Update the application configuration


<!-- 
To reuse the Spring Apps instance creation steps in other articles, a separate markdown file is used to describe how to update your application configuration.

[!INCLUDE [update-application-configuration](update-application-configuration.md)]

-->

Use the following steps to update the YAML file to use your Microsoft Entra registered application information to establish a relationship with the RESTful API application:

1. Locate **src/main/resources/application.yml** file for the `simple-todo-api` app. Update the configuration in the `spring.cloud.azure.active-directory` section to match the following example. Be sure to replace the placeholders with the values you created previously.

   ```yaml
   spring:
     cloud:
       azure:
         active-directory:
           profile:
             tenant-id: <tenant>
           credential:
             client-id: <your-application-ID-of-ToDo>
           app-id-uri: <your-application-ID-URI-of-ToDo>
   ```

   > **Note:**
   > In v1.0 tokens, the configuration requires the client ID of the API, while in v2.0 tokens, you can use the client ID or the application ID URI in the request. You can configure both to properly complete the audience validation.
   > 
   > The values allowed for `tenant-id` are: `common`, `organizations`, `consumers`, or the tenant ID. For more information about these values, see the [Used the wrong endpoint (personal and organization accounts)](https://learn.microsoft.com/troubleshoot/azure/active-directory/error-code-aadsts50020-user-account-identity-provider-does-not-exist#cause-3-used-the-wrong-endpoint-personal-and-organization-accounts) section of [Error AADSTS50020 - User account from identity provider does not exist in tenant](https://learn.microsoft.com/troubleshoot/azure/active-directory/error-code-aadsts50020-user-account-identity-provider-does-not-exist). For information on converting your single-tenant app, see [Convert single-tenant app to multitenant on Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/howto-convert-app-to-be-multi-tenant).

1. Use the following command to rebuild the sample project:

   ```bash
   ./mvnw clean package
   ```


### [Azure CLI](#tab/Azure-CLI)

### 3.1. Provide names for each resource

Create variables to hold the resource names by using the following commands. Be sure to replace the placeholders with your own values.


> **Note:**
> Microsoft recommends using the most secure authentication flow available. The authentication flow described in this procedure, such as for databases, caches, messaging, or AI services, requires a very high degree of trust in the application and carries risks not present in other flows. Use this flow only when more secure options, like managed identities for passwordless or keyless connections, are not viable. For local machine operations, prefer user identities for passwordless or keyless connections.


```azurecli
export RESOURCE_GROUP=myresourcegroup
export LOCATION=<location>
export POSTGRESQL_SERVER=my-demo-pgsql
export POSTGRESQL_DB=Todo
export POSTGRESQL_ADMIN_USERNAME=<admin-username>
export POSTGRESQL_ADMIN_PASSWORD=<admin-password>
export AZURE_SPRING_APPS_NAME=myasa
export APP_NAME=simple-todo-api
export TODO_APP_NAME=Todo
export TODO_APP_URL=api://simple-todo
export TODOWEB_APP_NAME=TodoWeb
export TODOWEB_APP_URL=api://simple-todoweb
export NEW_MEMBER_USERNAME=<new-member-username>
export NEW_MEMBER_PASSWORD=<new-member-password>
export USER_PRINCIPAL_NAME=<user-principal-name>
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

Use the following steps to create a service instance and an application in the instance:

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
   az spring create --name ${AZURE_SPRING_APPS_NAME} --sku enterprise
   ```

1. Use the following command to create an application in the Azure Spring Apps instance:

   ```azurecli
   az spring app create \
       --service ${AZURE_SPRING_APPS_NAME} \
       --name ${APP_NAME} \
       --assign-endpoint true
   ```

### 3.5. Prepare the PostgreSQL instance

The Spring web app uses H2 for the database in localhost and Azure Database for PostgreSQL for the database in Azure.

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

### 3.6. Connect app instance to PostgreSQL instance

After the application instance and the PostgreSQL instance are created, the application instance can't access the PostgreSQL instance directly. Use the following steps to enable the app to connect to the PostgreSQL instance:

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

### 3.7. Expose RESTful APIs

Use the following steps to expose the RESTful APIs:

1. Use the following command to create a Microsoft Entra ID application:

   ```azurecli
   az ad app create \
       --display-name ${TODO_APP_NAME} \
       --sign-in-audience AzureADandPersonalMicrosoftAccount \
       --identifier-uris ${TODO_APP_URL}
   ```

1. Use the following command to create a service principal for the application:

   ```azurecli
   az ad sp create --id ${TODO_APP_URL}
   ```

1. Use the following command to generate permission IDs:

   ```azurecli
   permissionid1=$(uuidgen);permissionid2=$(uuidgen);permissionid3=$(uuidgen)
   ```

1. Add the following scopes as JSON：

   ```azurecli
   api=$(echo '{
    "oauth2PermissionScopes": [
        {
            "adminConsentDescription": "Allows authenticated users to delete the ToDo data",
            "adminConsentDisplayName": "Delete the ToDo data",
            "id": "'$permissionid1'",
            "isEnabled": true,
            "type": "Admin",
            "userConsentDescription": null,
            "userConsentDisplayName": null,
            "value": "ToDo.Delete"
        },

        {
            "adminConsentDescription": "Allows authenticated users to write the ToDo data",
            "adminConsentDisplayName": "Write the ToDo data",
            "id": "'$permissionid2'",
            "isEnabled": true,
            "type": "Admin",
            "userConsentDescription": null,
            "userConsentDisplayName": null,
            "value": "ToDo.Write"
        },
        {
            "adminConsentDescription": "Allows authenticated users to read the ToDo data",
            "adminConsentDisplayName": "Read the ToDo data",
            "id": "'$permissionid3'",
            "isEnabled": true,
            "type": "Admin",
            "userConsentDescription": null,
            "userConsentDisplayName": null,
            "value": "ToDo.Read"
        }
    ]}')
   ```

1. Use the following command to add scopes:

   ```azurecli
   az ad app update \
       --id ${TODO_APP_URL} \
       --set api="$api"
   ```

1. Use the following command to get the tenant ID to use in the next step:

   ```azurecli
   az account show --query "tenantId" --output tsv
   ```

1. Use the following command to get the application ID to use in the next steps:

   ```azurecli
   appid=$(az ad app show \
       --id ${TODO_APP_URL} \
       --query appId \
       --output tsv);
   echo $appid
   ```

### 3.8. Update the application configuration


<!-- 
To reuse the Spring Apps instance creation steps in other articles, a separate markdown file is used to describe how to update your application configuration.

[!INCLUDE [update-application-configuration](update-application-configuration.md)]

-->

Use the following steps to update the YAML file to use your Microsoft Entra registered application information to establish a relationship with the RESTful API application:

1. Locate **src/main/resources/application.yml** file for the `simple-todo-api` app. Update the configuration in the `spring.cloud.azure.active-directory` section to match the following example. Be sure to replace the placeholders with the values you created previously.

   ```yaml
   spring:
     cloud:
       azure:
         active-directory:
           profile:
             tenant-id: <tenant>
           credential:
             client-id: <your-application-ID-of-ToDo>
           app-id-uri: <your-application-ID-URI-of-ToDo>
   ```

   > **Note:**
   > In v1.0 tokens, the configuration requires the client ID of the API, while in v2.0 tokens, you can use the client ID or the application ID URI in the request. You can configure both to properly complete the audience validation.
   > 
   > The values allowed for `tenant-id` are: `common`, `organizations`, `consumers`, or the tenant ID. For more information about these values, see the [Used the wrong endpoint (personal and organization accounts)](https://learn.microsoft.com/troubleshoot/azure/active-directory/error-code-aadsts50020-user-account-identity-provider-does-not-exist#cause-3-used-the-wrong-endpoint-personal-and-organization-accounts) section of [Error AADSTS50020 - User account from identity provider does not exist in tenant](https://learn.microsoft.com/troubleshoot/azure/active-directory/error-code-aadsts50020-user-account-identity-provider-does-not-exist). For information on converting your single-tenant app, see [Convert single-tenant app to multitenant on Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/howto-convert-app-to-be-multi-tenant).

1. Use the following command to rebuild the sample project:

   ```bash
   ./mvnw clean package
   ```


---

## 4. Deploy the app to Azure Spring Apps

### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin-ent)

You can now deploy the app to Azure Spring Apps.


<!-- 
Use the following line at the end of the heading Prerequisites, with blank lines before and after. App deployments with Spring Apps Maven plugin.

[!INCLUDE [restful-api-spring-apps-maven-plugin](includes/quickstart-deploy-restful-api-app/restful-api-spring-apps-maven-plugin.md)]
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
   - **Select Azure Spring Apps for deployment**: Select the number of the Azure Spring Apps instance you created. If you use the default number, press <kbd>Enter</kbd> directly.
   - **Use existing app in Azure Spring Apps \<your-instance-name\>**: Press <kbd>y</kbd> to use the app created.
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
   [INFO]   InstanceName:simple-todo-api-default-15-xxxxxxxxx-xxxxx  Status:Running Reason:null       DiscoverStatus:N/A       
   [INFO] Getting public url of app(simple-todo-api)...
   [INFO] Application url: https://<your-Azure-Spring-Apps-instance-name>-simple-todo-api.azuremicroservices.io
   ```

### [Azure CLI](#tab/Azure-CLI)

Use the following command to deploy the app based on source code:

```azurecli
az spring app deploy \
    --service ${AZURE_SPRING_APPS_NAME} \
    --name ${APP_NAME} \
    --build-env BP_JVM_VERSION=17 \
    --source-path .
```

---

## 5. Validate the app

### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin-ent)


<!-- 
For clarity of structure, a separate markdown file is used to describe how to validate the app using Azure portal.

[!INCLUDE [validate-the-app-portal](includes/quickstart-deploy-restful-api-app/validate-the-app-portal.md)]

-->

You can now access the RESTful API to see if it works.

### 5.1. Request an access token

The RESTful APIs act as a resource server, which is protected by Microsoft Entra ID. Before acquiring an access token, you must register another application in Microsoft Entra ID and grant permissions to the client application, which is named `ToDoWeb`.

#### Register the client application

Use the following steps to register an application in Microsoft Entra ID, which is used to add the permissions for the `ToDo` app:

1. Sign in to the [Azure portal](https://portal.azure.com/).

1. If you have access to multiple tenants, use the **Directory + subscription** filter () to select the tenant in which you want to register an application.

1. Search for and select **Microsoft Entra ID**.

1. Under **Manage**, select **App registrations** > **New registration**.

1. Enter a name for your application in the **Name** field - for example, **ToDoWeb**. Users of your app might see this name, and you can change it later.

1. For **Supported account types**, use the default value **Accounts in this organizational directory only**.

1. Select **Register** to create the application.

1. On the app **Overview** page, look for the **Application (client) ID** value, and then record it for later use. You need it to acquire an access token.

1. Select **API permissions** > **Add a permission** > **My APIs**. Select the `ToDo` application that you registered earlier, and then select the **ToDo.Read**, **ToDo.Write**, and **ToDo.Delete** permissions. Select **Add permissions**.

1. Select **Grant admin consent for \<your-tenant-name>** to grant admin consent for the permissions you added.

   Screenshot of the Azure portal that shows the API permissions of a web application.

#### Add user to access the RESTful APIs

Use the following steps to create a member user in your Microsoft Entra tenant. Then, the user can manage the data of the `ToDo` application through RESTful APIs.

1. Under **Manage**, select **Users** > **New user** > **Create new user**.

1. On the **Create new user** page, enter the following information:

    - **User principal name**: Enter a name for the user.
    - **Display name**: Enter a display name for the user.
    - **Password**: Copy the autogenerated password provided in the **Password** box.

   > **Note:**
   > New users must complete the first sign-in authentication and update their passwords, otherwise, you receive an `AADSTS50055: The password is expired` error when you get the access token.
   >
   > When a new user logs in, they receive an **Action Required** prompt. They can choose **Ask later** to skip the validation.

1. Select **Review + create** to review your selections. Select **Create** to create the user.

#### Update the OAuth2 configuration for Swagger UI authorization

Use the following steps to update the OAuth2 configuration for Swagger UI authorization. Then, you can authorize users to acquire access tokens through the `ToDoWeb` app.

1. Open your **Microsoft Entra ID** tenant in the Azure portal, and go to the registered `ToDoWeb` app.

1. Under **Manage**, select **Authentication**, select **Add a platform**, and then select **Single-page application**.

1. Use the format `<your-app-exposed-application-URL-or-endpoint>/swagger-ui/oauth2-redirect.html` as the OAuth2 redirect URL in the **Redirect URIs** field, and then select **Configure**.

   Screenshot of the Azure portal that shows the Authentication page for Microsoft Entra ID.


### [Azure CLI](#tab/Azure-CLI)

You can now access the RESTful API to see if it works.

### 5.1. Request an access token

The RESTful APIs act as a resource server, which is protected by Microsoft Entra ID. Before acquiring an access token, you're required to register another application in Microsoft Entra ID and grant permissions to the client application, which is named `ToDoWeb`.

#### Register the client application

Use the following steps to register the client application:

1. Use the following command to create a Microsoft Entra ID application,  which is used to add the permissions for the `ToDo` app:

   ```azurecli
   az ad app create \
       --display-name ${TODOWEB_APP_NAME} \
       --sign-in-audience AzureADMyOrg \
       --identifier-uris ${TODOWEB_APP_URL}
   ```

1. Use the following command to add permissions:

   ```azurecli
   az ad app permission add \
       --id api://simple-todowebtest2 \
       --api $appid \
       --api-permissions $permissionid1=Scope $permissionid2=Scope $permissionid3=Scope
   ```

1. Use the following command to grant admin consent for the permissions you added:

   ```azurecli
   az ad app permission admin-consent --id ${TODOWEB_APP_URL}
   ```

1. Use the following command to get the client ID of the `ToDoWeb` app used in the [Obtain the access token](#obtain-the-access-token) step:

   ```azurecli
   az ad app show \
       --id ${TODOWEB_APP_URL} \
       --query appId \
       --output tsv
   ```

#### Add user to access the RESTful APIs

Use the following command to create a member user in your Microsoft Entra tenant. Then, the user can manage the data of the `ToDo` application through RESTful APIs:


> **Note:**
> Microsoft recommends using the most secure authentication flow available. The authentication flow described in this procedure, such as for databases, caches, messaging, or AI services, requires a very high degree of trust in the application and carries risks not present in other flows. Use this flow only when more secure options, like managed identities for passwordless or keyless connections, are not viable. For local machine operations, prefer user identities for passwordless or keyless connections.


```azurecli
az ad user create \
    --display-name ${NEW_MEMBER_USERNAME} \
    --password ${NEW_MEMBER_PASSWORD} \
    --user-principal-name ${USER_PRINCIPAL_NAME}
```

#### Update the OAuth2 configuration for Swagger UI authorization

Use the following steps to update the OAuth2 configuration:

1. Use the following command to get the object ID of the `ToDoWeb` app:

   ```azurecli
   az ad app show --id ${TODOWEB_APP_URL} --query id
   ```

1. Use the following command to get the URL of your `simple-todo-api` app:

   ```azurecli
   az spring app show \
       --name ${APP_NAME} \
       --service ${AZURE_SPRING_APPS_NAME} \
       --query properties.url
   ```

1. Use the following command to update the OAuth2 configuration for Swagger UI authorization, replacing the `<object-id>` and `<URL>` placeholders with the parameter values you got. Then, you can authorize users to acquire access tokens through the `ToDoWeb` app.

   ```azurecli
   az rest \
       --method PATCH \
       --uri "https://graph.microsoft.com/v1.0/applications/<object-id>" \
       --headers 'Content-Type=application/json' \
       --body '{"spa":{"redirectUris":["<URL>/swagger-ui/oauth2-redirect.html"]}}'
   ```

---


#### Obtain the access token

Use the following steps to use [OAuth 2.0 authorization code flow](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow) method to obtain an access token with Microsoft Entra ID, then access the RESTful APIs of the `ToDo` app:

1. Open the URL exposed by the app, then select **Authorize** to prepare the OAuth2 authentication.

1. In the **Available authorizations** window, enter the client ID of the `ToDoWeb` app in the **client_id** field, select all the scopes for **Scopes** field, ignore the **client_secret** field, and then select **Authorize** to redirect to the Microsoft Entra sign-in page.

After completing the sign in with the previous user, you're returned to the **Available authorizations** window.

### 5.2. Access the RESTful APIs

Use the following steps to access the RESTful APIs of the `ToDo` app in the Swagger UI:

1. Select the API **POST /api/simple-todo/lists** and then select **Try it out**. Enter the following request body, and then select **Execute** to create a ToDo list.

   ```json
   {
     "name": "My List"
   }
   ```

   After the execution is complete, you see the following **Response body**:

   ```json
   {
     "id": "<ID-of-the-ToDo-list>",
     "name": "My List",
     "description": null
   }
   ```

1. Select the API **POST /api/simple-todo/lists/{listId}/items** and then select **Try it out**. For **listId**, enter the ToDo list ID you created previously, enter the following request body, and then select **Execute** to create a ToDo item.

   ```json
   {
     "name": "My first ToDo item", 
     "listId": "<ID-of-the-ToDo-list>",
     "state": "todo"
   }
   ```

   This action returns the following ToDo item:

   ```json
   {
     "id": "<ID-of-the-ToDo-item>",
     "listId": "<ID-of-the-ToDo-list>",
     "name": "My first ToDo item",
     "description": null,
     "state": "todo",
     "dueDate": "2023-07-11T13:59:24.9033069+08:00",
     "completedDate": null
   }
   ```

1. Select the API **GET /api/simple-todo/lists** and then select **Execute** to query ToDo lists. This action returns the following ToDo lists:

   ```json
   [
     {
       "id": "<ID-of-the-ToDo-list>",
       "name": "My List",
       "description": null
     }
   ]
   ```

1. Select the API **GET /api/simple-todo/lists/{listId}/items** and then select **Try it out**. For **listId**, enter the ToDo list ID you created previously, and then select **Execute** to query the ToDo items. This action returns the following ToDo item:

   ```json
   [
     {
       "id": "<ID-of-the-ToDo-item>",
       "listId": "<ID-of-the-ToDo-list>",
       "name": "My first ToDo item",
       "description": null,
       "state": "todo",
       "dueDate": "2023-07-11T13:59:24.903307+08:00",
       "completedDate": null
     }
   ]
   ```

1. Select the API **PUT /api/simple-todo/lists/{listId}/items/{itemId}** and then select **Try it out**. For **listId**, enter the ToDo list ID. For **itemId**, enter the ToDo item ID, enter the following request body, and then select **Execute** to update the ToDo item.

   ```json
   {
     "id": "<ID-of-the-ToDo-item>",
     "listId": "<ID-of-the-ToDo-list>",
     "name": "My first ToDo item",
     "description": "Updated description.",
     "dueDate": "2023-07-11T13:59:24.903307+08:00",
     "state": "inprogress"
   }
   ```

   This action returns the following updated ToDo item:

   ```json
   {
     "id": "<ID-of-the-ToDo-item>",
     "listId": "<ID-of-the-ToDo-list>",
     "name": "My first ToDo item",
     "description": "Updated description.",
     "state": "inprogress",
     "dueDate": "2023-07-11T05:59:24.903307Z",
     "completedDate": null
   }
   ```

1. Select the API **DELETE /api/simple-todo/lists/{listId}/items/{itemId}** and then select **Try it out**. For **listId**, enter the ToDo list ID. For **itemId**, enter the ToDo item ID, and then select **Execute** to delete the ToDo item. You should see that the server response code is `204`.


<!-- 
For clarity of structure, a separate markdown file is used to describe how to clean up resources using Azure portal, AZD, or Azure CLI.

[!INCLUDE [clean-up-resources](includes/quickstart-deploy-restful-api-app/clean-up-resources.md)]

-->

## 6. Clean up resources

You can delete the Azure resource group, which includes all the resources in the resource group.

### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin-ent)

Use the following steps to delete the entire resource group, including the newly created service:

1. Locate your resource group in the Azure portal.

1. On the navigation menu, select **Resource groups**. Then, select the name of your resource group - for example, **myresourcegroup**.

1. On your resource group page, select **Delete**. Enter the name of your resource group in the text box to confirm deletion - for example, **myresourcegroup**. Then, select **Delete**.

### [Azure CLI](#tab/Azure-CLI)

Use the following command to delete the entire resource group, including the newly created service:

```azurecli
az group delete --name ${RESOURCE_GROUP}
```

---


## 7. Next steps

> 
> [Quickstart: Deploy an event-driven application to Azure Spring Apps](../basic-standard/quickstart-deploy-event-driven-app.md?toc=/azure/spring-apps/enterprise/toc.json&bc=/azure/spring-apps/enterprise/breadcrumb/toc.json)

> 
> [Quickstart: Deploy microservice applications to Azure Spring Apps](../basic-standard/quickstart-deploy-microservice-apps.md?toc=/azure/spring-apps/enterprise/toc.json&bc=/azure/spring-apps/enterprise/breadcrumb/toc.json)

> 
> [Structured application log for Azure Spring Apps](../basic-standard/structured-app-log.md?toc=/azure/spring-apps/enterprise/toc.json&bc=/azure/spring-apps/enterprise/breadcrumb/toc.json)

> 
> [Map an existing custom domain to Azure Spring Apps](../basic-standard/how-to-custom-domain.md?toc=/azure/spring-apps/enterprise/toc.json&bc=/azure/spring-apps/enterprise/breadcrumb/toc.json)

> 
> [Use Azure Spring Apps CI/CD with GitHub Actions](../basic-standard/how-to-github-actions.md?toc=/azure/spring-apps/enterprise/toc.json&bc=/azure/spring-apps/enterprise/breadcrumb/toc.json)

> 
> [Automate application deployments to Azure Spring Apps](../basic-standard/how-to-cicd.md?toc=/azure/spring-apps/enterprise/toc.json&bc=/azure/spring-apps/enterprise/breadcrumb/toc.json)

For more information, see the following articles:

- [Azure Spring Apps Samples](https://github.com/Azure-Samples/azure-spring-apps-samples).
- [Spring on Azure](https://learn.microsoft.com/azure/developer/java/spring/)
- [Spring Cloud Azure](https://learn.microsoft.com/azure/developer/java/spring-framework/)
