---
author: KarlErickson
ms.author: v-shilichen
ms.service: azure-spring-apps
ms.custom: devx-track-azurecli
ms.topic: include
ms.date: 08/19/2025
ms.update-cycle: 1095-days
---

<!--
For clarity of structure, a separate markdown file is used to describe how to deploy to Azure Spring Apps with Enterprise plan.

[!INCLUDE [deploy-microservice-apps-with-enterprise-plan](includes/quickstart-deploy-microservice-apps/deploy-microservice-apps-with-enterprise-plan.md)]

-->

## 2. Prepare the Spring project

### [Azure portal](#tab/Azure-portal-ent)

The **Deploy to Azure** button in the next section launches an Azure portal experience that deploys source code from the [Spring PetClinic](https://github.com/Azure-Samples/spring-petclinic-microservices) repository. No local preparation steps are needed.

### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin-ent)


<!--
For clarity of structure, a separate markdown file is used to describe how to prepare project for enterprise plan locally.

[!INCLUDE [prepare-spring-project-enterprise-plan](prepare-spring-project-enterprise-plan.md)]

-->

Use the following steps on your local machine when you want to verify the application before deploying it to the cloud:

1. Use the following command to clone the [Pet Clinic application](https://github.com/Azure-Samples/spring-petclinic-microservices.git) from GitHub:

   ```bash
   git clone https://github.com/Azure-Samples/spring-petclinic-microservices.git
   ```

1. Navigate to the project root directory and then use the following command to build the project:

   ```bash
   ./mvnw clean package -DskipTests
   ```

Use the following steps if you want to run the application locally. Otherwise, you can skip these steps.

1. Open a new Bash window and then use the following command to start Config Server:

   ```bash
   ./mvnw spring-boot:run -pl spring-petclinic-config-server
   ```

1. Open a new Bash window and then use the following command to start Discovery Server:

   ```bash
   ./mvnw spring-boot:run -pl spring-petclinic-discovery-server
   ```

1. For the Customers, Vets, Visits, and Spring Cloud Gateway services, open a new Bash window and use the following commands to start the services:

   ```bash
   ./mvnw spring-boot:run -pl spring-petclinic-customers-service
   ./mvnw spring-boot:run -pl spring-petclinic-vets-service
   ./mvnw spring-boot:run -pl spring-petclinic-visits-service
   ./mvnw spring-boot:run -Dspring-boot.run.profiles=default,development \
       -pl spring-petclinic-api-gateway
   ```

1. Open a new Bash window and navigate to the project **spring-petclinic-frontend** directory. Use the following commands to install dependencies and run the frontend application:

   ```bash
   npm install
   npm run start
   ````

1. After the script completes successfully, go to `http://localhost:8080` in your browser to access the PetClinic application.


### [Azure CLI](#tab/Azure-CLI-ent)


<!--
For clarity of structure, a separate markdown file is used to describe how to prepare project for enterprise plan locally.

[!INCLUDE [prepare-spring-project-enterprise-plan](prepare-spring-project-enterprise-plan.md)]

-->

Use the following steps on your local machine when you want to verify the application before deploying it to the cloud:

1. Use the following command to clone the [Pet Clinic application](https://github.com/Azure-Samples/spring-petclinic-microservices.git) from GitHub:

   ```bash
   git clone https://github.com/Azure-Samples/spring-petclinic-microservices.git
   ```

1. Navigate to the project root directory and then use the following command to build the project:

   ```bash
   ./mvnw clean package -DskipTests
   ```

Use the following steps if you want to run the application locally. Otherwise, you can skip these steps.

1. Open a new Bash window and then use the following command to start Config Server:

   ```bash
   ./mvnw spring-boot:run -pl spring-petclinic-config-server
   ```

1. Open a new Bash window and then use the following command to start Discovery Server:

   ```bash
   ./mvnw spring-boot:run -pl spring-petclinic-discovery-server
   ```

1. For the Customers, Vets, Visits, and Spring Cloud Gateway services, open a new Bash window and use the following commands to start the services:

   ```bash
   ./mvnw spring-boot:run -pl spring-petclinic-customers-service
   ./mvnw spring-boot:run -pl spring-petclinic-vets-service
   ./mvnw spring-boot:run -pl spring-petclinic-visits-service
   ./mvnw spring-boot:run -Dspring-boot.run.profiles=default,development \
       -pl spring-petclinic-api-gateway
   ```

1. Open a new Bash window and navigate to the project **spring-petclinic-frontend** directory. Use the following commands to install dependencies and run the frontend application:

   ```bash
   npm install
   npm run start
   ````

1. After the script completes successfully, go to `http://localhost:8080` in your browser to access the PetClinic application.


---

## 3. Prepare the cloud environment

The main resource you need to run this sample is an Azure Spring Apps instance. This section describes how to create this resource.

### [Azure portal](#tab/Azure-portal-ent)

This section uses a **Deploy to Azure** button to launch a deployment experience in the Azure portal. This experience uses an [ARM template](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/templates/overview.md) to create Azure resources.

### 3.1. Sign in to the Azure portal

Go to the [Azure portal](https://portal.azure.com/), enter your credentials, and sign in to the portal. The default view is your service dashboard.

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

   Screenshot of the Azure portal that shows the Custom deployment page.

1. Select **Review and Create** to review your selections. Then, select **Create** to deploy the app to Azure Spring Apps.

1. On the toolbar, select the **Notifications** icon (a bell) to monitor the deployment process. After the deployment finishes, you can select **Pin to dashboard**, which creates a tile for this service on your Azure portal dashboard as a shortcut to the service's **Overview** page. Select **Go to resource** to open the service's **Overview** page.

   Screenshot of the Azure portal that shows the Overview page with the custom deployment notifications pane open.

### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin-ent)


<!--
To reuse the Spring Apps instance creation steps in other articles, a separate markdown file is used to describe how to provision enterprise Spring Apps instance.

[!INCLUDE [provision-enterprise-azure-spring-apps](provision-enterprise-azure-spring-apps.md)]

-->

### 3.1. Sign in to the Azure portal

Go to the [Azure portal](https://portal.azure.com) and enter your credentials to sign in to the portal. The default view is your service dashboard.

### 3.2. Create an Azure Spring Apps instance

Use the following steps to create the service instance:

1. Select **Create a resource** in the corner of the Azure portal.

1. Select **Compute** > **Azure Spring Apps**.

1. Fill out the form on the **Basics** tab. Use the following table as a guide for completing the form:

   | Setting | Suggested value | Description |
   | --- | --- | --- |
   | **Subscription** | Your subscription name. | The Azure subscription that you want to use for your server. If you have multiple subscriptions, choose the subscription in which you'd like to be billed for the resource. |
   | **Resource group** | **myresourcegroup** | A new resource group name or an existing one from your subscription. |
   | **Name** | **myasa** | A unique name that identifies your Azure Spring Apps service. The name must be between 4 and 32 characters long and can contain only lowercase letters, numbers, and hyphens. The first character of the service name must be a letter and the last character must be either a letter or a number. |
   | **Region** | The region closest to your users. | The location that is closest to your users. |
   | **Hosting options and plans** | **Enterprise** | The pricing plan that determines the resource and cost associated with your instance. |
   | **Zone Redundant** | Unselected | The option to create your Azure Spring Apps service in an Azure availability zone. This feature isn't currently supported in all regions. |
   | **Software IP Plan** | **Pay-as-you-go** | The pricing plan that lets you pay as you go with Azure Spring Apps. |
   | **Deploy sample project** | Unselected | The option to use the built-in sample application. |

1. Navigate to the **Diagnostic settings** tab on the **Create Azure Spring Apps** page and then select **Create new** to create a new Log Analytics workspaces instance. On the **Create new Log Analytics workspace** page, update the name of the **Log Analytics workspace** as needed and then select **OK** to confirm the creation.

1. Navigate to the **Application Insights** tab on the **Create Azure Spring Apps** page and then select **Create new** to create a new Application Insights instance. On the **Create new Application Insights resource** page, update the **Application insights name** as needed, select **Workspace-based** for **Resource mode**, and then select **OK** to confirm the creation.

1. Select **Review and Create** to review your selections. Then, select **Create** to provision the Azure Spring Apps instance.

1. Select the **Notifications** icon (a bell) to monitor the deployment process. After the deployment finishes, you can select **Pin to dashboard** to create a shortcut on your Azure portal dashboard to the service's **Overview** page.

   Screenshot of the Azure portal that shows a deployment of a resource and the Notification pane with Go to resource and Pin to dashboard buttons.

1. Select **Go to resource** to go to the **Azure Spring Apps Overview** page.

### 3.3. Configure Azure Spring Apps instance

The following sections show you how to configure the service instance.

#### Create the apps

Use the following steps to create the apps:

1. From the navigation pane, select **Apps** and then select **Create App**.

1. On the **Create App** page, for the **App name**, use **frontend** and leave all the other fields with their default values.

1. Repeat the previous step using each of the following application names:

   - `customers-service`
   - `vets-service`
   - `visits-service`

1. Select **Create** to finish the app creation.

   Screenshot of the Azure portal that shows the Create App page.

#### Configure Service Registry

Use the following steps to configure Service Registry:

1. From the navigation pane, select **Service Registry**.

1. Select **App binding**, select **Bind app**, select `customers-service` from the list, and then select **Apply**.

1. Repeat the previous step to bind the following applications:

   - `vets-service`
   - `visits-service`

   Screenshot of the Azure portal that shows the Service Registry page with the App binding tab selected.

#### Configure Application Configuration Service

Use the following steps to configure Application Configuration Service:

1. From the navigation pane, select **Application Configuration Service** and then select **Settings**.

1. Fill out the repository with the following information, and then select **Validate**:

   - **Name**: **default**
   - **Patterns**: **application,api-gateway,customers-service,vets-service,visits-service**
   - **URI**: **https://github.com/Azure-Samples/spring-petclinic-microservices-config.git**.
   - **Label**: **master**

   Screenshot of the Azure portal that shows the Application Configuration Service Settings tab.

1. After validation, select **Apply** to finish the Application Configuration Service configuration.

1. Select **App binding**, select **Bind app**, select `customers-service` from the list, and then select **Apply**.

1. Repeat the previous step to bind the following applications:

   - `vets-service`
   - `visits-service`

   Screenshot of the Azure portal that shows the Application Configuration Service page with the App binding tab selected.

#### Set the config file patterns for apps

Use the following steps to set the config file patterns:

1. From the navigation pane, select **Apps** and then select the `customers-service` app.

1. On the **App overview** page, select **Configuration**, select **Config file patterns** in the **General settings** tab, and then select **application** and `customers-service`. Select **Save** to set the config file patterns.

1. Repeat the previous step to save the config file patterns for the following applications:

   - `vets-service`: Select **application** and `vets-service`.
   - `visits-service`: Select **application** and `visits-service`.

#### Configure Spring Cloud Gateway

This section shows you how to configure Spring Cloud Gateway.

First, use the following steps to assign an endpoint for the gateway access:

1. From the navigation pane, select **Spring Cloud Gateway**.

1. On the **Overview** tab, select **Yes** to assign an endpoint. Save the endpoint URL to use later.

Next, configure the routing for Spring Cloud Gateway. Because the Azure portal doesn't currently support route configuration for Spring Cloud Gateway, open a Bash window and use the following Azure CLI steps to configure the routing:

1. Use the following command to sign in to the Azure CLI:

   ```azurecli
   az login
   ```

1. Use the following commands to install the Azure Spring Apps extension for the Azure CLI and register the namespace `Microsoft.SaaS`:

   ```azurecli
   az extension add --name spring --upgrade
   az provider register --namespace Microsoft.SaaS
   ```

1. Use the following command to accept the legal terms and privacy statements:

   > **Note:**
   > This step is necessary only if your subscription has never been used to create an Enterprise plan instance of Azure Spring Apps.

   ```azurecli
   az term accept \
       --publisher vmware-inc \
       --product azure-spring-cloud-vmware-tanzu-2 \
       --plan asa-ent-hr-mtr
   ```

1. Create variables to hold the resource names by using the following commands. Be sure to replace the placeholders with your own values.

   ```azurecli
   export SUBSCRIPTION_ID=<subscription-ID>
   export RESOURCE_GROUP=<resource-group-name>
   export SPRING_APPS_NAME=<Azure-Spring-Apps-instance-name>
   export APP_CUSTOMERS_SERVICE=customers-service
   export APP_VETS_SERVICE=vets-service
   export APP_VISITS_SERVICE=visits-service
   export APP_FRONTEND=frontend
   ```

1. Use the following command to set the default subscription:

   ```azurecli
   az account set --subscription ${SUBSCRIPTION_ID}
   ```

1. Use the following command to set the routing for the `customers-service` app:

   ```azurecli
   az spring gateway route-config create \
       --resource-group ${RESOURCE_GROUP} \
       --service ${SPRING_APPS_NAME} \
       --name ${APP_CUSTOMERS_SERVICE} \
       --app-name ${APP_CUSTOMERS_SERVICE} \
       --routes-json \
         '[
           {
             "predicates": [
               "Path=/api/customer/**"
             ],
             "filters": [
               "StripPrefix=2"
             ]
           }
         ]'
   ```

1. Use the following command to set the routing for the `vets-service` app:

   ```azurecli
   az spring gateway route-config create \
       --resource-group ${RESOURCE_GROUP} \
       --service ${SPRING_APPS_NAME} \
       --name ${APP_VETS_SERVICE} \
       --app-name ${APP_VETS_SERVICE} \
       --routes-json \
         '[
            {
              "predicates": [
                "Path=/api/vet/**"
              ],
              "filters": [
                "StripPrefix=2"
              ]
            }
          ]'
   ```

1. Use the following command to set the routing for the `visits-service` app:

   ```azurecli
   az spring gateway route-config create \
       --resource-group ${RESOURCE_GROUP} \
       --service ${SPRING_APPS_NAME} \
       --name ${APP_VISITS_SERVICE} \
       --app-name ${APP_VISITS_SERVICE} \
       --routes-json \
         '[
            {
              "predicates": [
                "Path=/api/visit/**"
              ],
              "filters": [
                "StripPrefix=2"
              ]
            }
          ]'
   ```

1. Use the following command to set the routing for the frontend app:

   ```azurecli
   az spring gateway route-config create \
       --resource-group ${RESOURCE_GROUP} \
       --service ${SPRING_APPS_NAME} \
       --name ${APP_FRONTEND} \
       --app-name ${APP_FRONTEND} \
       --routes-json \
         '[
            {
              "predicates": [
                "Path=/**"
              ],
              "filters": [
                "StripPrefix=0"
              ],
              "order": 1000
            }
          ]'
   ```

#### Configure Developer Tools

Use the following steps to configure the Developer Tools.

1. From the navigation pane, select **Developer Tools**.

1. Select **Assign endpoint** to assign an endpoint for **Developer Tools**.

1. Save the endpoint of **App Live View** to use later.


### [Azure CLI](#tab/Azure-CLI-ent)


<!--
To reuse the Spring Apps instance creation steps in other articles, a separate markdown file is used to describe how to provision enterprise Spring Apps instance with Azure CLI.

[!INCLUDE [provision-enterprise-azure-spring-apps-azure-cli](provision-enterprise-azure-spring-apps-azure-cli.md)]

-->

### 3.1. Provide names for each resource

Create variables to hold the resource names by using the following commands. Be sure to replace the placeholders with your own values.

```azurecli
export LOCATION=<location>
export RESOURCE_GROUP=myresourcegroup
export SPRING_APPS=myasa
export APP_FRONTEND=frontend
export APP_CUSTOMERS_SERVICE=customers-service
export APP_VETS_SERVICE=vets-service
export APP_VISITS_SERVICE=visits-service
export GIT_CONFIG_REPO=default
```

### 3.2. Sign in to the Azure CLI

Use the following steps to sign in:

1. Use the following command to sign in to the Azure CLI:

   ```azurecli
   az login
   ```

1. Use the following command to list all available subscriptions to determine the subscription ID to use:

   ```azurecli
   az account list --output table
   ```

1. Use the following command to set the default subscription:

   ```azurecli
   az account set --subscription <subscription-ID>
   ```

### 3.3. Create a new resource group

Use the following steps to create a new resource group:

1. Use the following command to set the default location:

   ```azurecli
   az configure --defaults location=${LOCATION}
   ```

1. Use the following command to create a resource group:

   ```azurecli
   az group create --resource-group ${RESOURCE_GROUP}
   ```

1. Use the following command to set the newly created resource group as the default resource group:

   ```azurecli
   az configure --defaults group=${RESOURCE_GROUP}
   ```

### 3.4. Install extension and register namespace

Use the following commands to install the Azure Spring Apps extension for the Azure CLI and register the `Microsoft.SaaS` namespace:

```azurecli
az extension add --name spring --upgrade
az provider register --namespace Microsoft.SaaS
```

### 3.5. Create an Azure Spring Apps instance

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

1. Use the following command to create an Azure Spring Apps service instance with the necessary Tanzu components:

   ```azurecli
   az spring create \
       --name ${SPRING_APPS} \
       --sku Enterprise \
       --enable-application-configuration-service \
       --enable-service-registry \
       --enable-gateway \
       --enable-application-live-view
   ```

### 3.6. Configure the Azure Spring Apps instance

Use the following steps to configure the service instance:

1. Use the following command to configure diagnostic settings for the Azure Spring Apps instance:

   ```azurecli
   export SPRING_APPS_RESOURCE_ID=$(az spring show \
       --name ${SPRING_APPS} \
       --query id \
       --output tsv)
   az monitor diagnostic-settings create \
       --resource ${SPRING_APPS_RESOURCE_ID} \
       --name logs-and-metrics \
       --workspace ${SPRING_APPS} \
       --logs '[
         {
           "category": "ApplicationConsole",
           "enabled": true,
           "retentionPolicy": {
             "enabled": false,
             "days": 0
           }
         },
         {
            "category": "SystemLogs",
            "enabled": true,
            "retentionPolicy": {
              "enabled": false,
              "days": 0
            }
         },
         {
            "category": "IngressLogs",
            "enabled": true,
            "retentionPolicy": {
              "enabled": false,
              "days": 0
             }
         }
       ]' \
       --metrics '[
         {
           "category": "AllMetrics",
           "enabled": true,
           "retentionPolicy": {
             "enabled": false,
             "days": 0
           }
         }
       ]'
   ```

1. Use the following commands to create applications for the Azure Spring Apps instance:

   ```azurecli
   az spring app create --service ${SPRING_APPS} --name ${APP_FRONTEND}
   az spring app create --service ${SPRING_APPS} --name ${APP_CUSTOMERS_SERVICE}
   az spring app create --service ${SPRING_APPS} --name ${APP_VETS_SERVICE}
   az spring app create --service ${SPRING_APPS} --name ${APP_VISITS_SERVICE}
   ```

1. Use the following commands to bind applications for the Service Registry:

   ```azurecli
   az spring service-registry bind --service ${SPRING_APPS} --app ${APP_CUSTOMERS_SERVICE}
   az spring service-registry bind --service ${SPRING_APPS} --app ${APP_VETS_SERVICE}
   az spring service-registry bind --service ${SPRING_APPS} --app ${APP_VISITS_SERVICE}
   ```

1. Use the following command to create a configuration repository for the Application Configuration Service:

   ```azurecli
   az spring application-configuration-service git repo add \
       --service ${SPRING_APPS} \
       --name ${GIT_CONFIG_REPO} \
       --patterns application,api-gateway,customers-service,vets-service,visits-service \
       --uri https://github.com/Azure-Samples/spring-petclinic-microservices-config.git \
       --label master
   ```

1. Use the following commands to bind applications to the Application Configuration Service:

   ```azurecli
   az spring application-configuration-service bind \
       --service ${SPRING_APPS} \
       --app ${APP_CUSTOMERS_SERVICE}
   az spring application-configuration-service bind \
       --service ${SPRING_APPS} \
       --app ${APP_VETS_SERVICE}
   az spring application-configuration-service bind \
       --service ${SPRING_APPS} \
       --app ${APP_VISITS_SERVICE}
   ```

1. Use the following command to assign an endpoint to Spring Cloud Gateway:

   ```azurecli
   az spring gateway update --service ${SPRING_APPS} --assign-endpoint
   ```

1. Use the following command to set routing for the `customers-service` application:

   ```azurecli
   az spring gateway route-config create \
       --service ${SPRING_APPS} \
       --name ${APP_CUSTOMERS_SERVICE} \
       --app-name ${APP_CUSTOMERS_SERVICE} \
       --routes-json '[
         {
           "predicates": [
             "Path=/api/customer/**"
           ],
           "filters": [
             "StripPrefix=2"
           ]
         }
      ]'
   ```

1. Use the following command to set routing for the `vets-service` application:

   ```azurecli
   az spring gateway route-config create \
       --service ${SPRING_APPS} \
       --name ${APP_VETS_SERVICE} \
       --app-name ${APP_VETS_SERVICE} \
       --routes-json '[
         {
           "predicates": [
             "Path=/api/vet/**"
           ],
           "filters": [
             "StripPrefix=2"
           ]
         }
       ]'
   ```

1. Use the following command to set routing for the `visits-service` application:

   ```azurecli
   az spring gateway route-config create \
       --service ${SPRING_APPS} \
       --name ${APP_VISITS_SERVICE} \
       --app-name ${APP_VISITS_SERVICE} \
       --routes-json '[
         {
           "predicates": [
             "Path=/api/visit/**"
           ],
           "filters": [
             "StripPrefix=2"
           ]
         }
       ]'
   ```

1. Use the following command to set routing for the `frontend` application:

   ```azurecli
   az spring gateway route-config create \
       --service ${SPRING_APPS} \
       --name ${APP_FRONTEND} \
       --app-name ${APP_FRONTEND} \
       --routes-json '[
         {
           "predicates": [
             "Path=/**"
           ],
           "filters": [
             "StripPrefix=0"
           ],
           "order": 1000
         }
       ]'
   ```

1. Use the following command to assign an endpoint to Application Live View:

   ```azurecli
   az spring dev-tool update --service ${SPRING_APPS} --assign-endpoint
   ```


---

## 4. Deploy the apps to Azure Spring Apps

### [Azure portal](#tab/Azure-portal-ent)

The **Deploy to Azure** button in the previous section launches an Azure portal experience that includes application deployment, so nothing else is needed.

### [Azure portal + Maven plugin](#tab/Azure-portal-maven-plugin-ent)


<!--
Use the following line at the end of the heading Prerequisites, with blank lines before and after. App deployments with Spring Apps Maven plugin.

[!INCLUDE [microservice-spring-apps-maven-plugin](includes/quickstart-deploy-microservice-apps/microservice-spring-apps-maven-plugin.md)]
-->

Use the following steps to deploy using the [Maven plugin for Azure Spring Apps](https://github.com/microsoft/azure-maven-plugins/wiki/Azure-Spring-Apps):

1. Navigate to the project root directory and then run the following command to configure the apps in Azure Spring Apps:

   ```bash
   ./mvnw -P spring-apps-enterprise com.microsoft.azure:azure-spring-apps-maven-plugin:1.19.0:config
   ```

   The following list describes the command interactions:

   - **Select child modules to configure**: Press <kbd>Enter</kbd> to select all.
   - **Select subscription**: Select the subscription list number of the Azure Spring Apps instance you created, which defaults to the first subscription in the list. If you use the default number, press <kbd>Enter</kbd> directly.
   - **Use existing Azure Spring Apps in Azure**: Press <kbd>y</kbd> to use the existing Azure Spring Apps instance.
   - **Select apps to expose public access**: Press <kbd>Enter</kbd> to select none.
   - **Confirm to save all the above configurations**: Press <kbd>y</kbd>. If you press <kbd>n</kbd>, the configuration isn't saved in the POM files.


2. Use the following command to deploy the backend applications:

   ```bash
   ./mvnw azure-spring-apps:deploy
   ```

   After the command runs, you can see from the following log messages that the deployment was successful:

   ```output
   [INFO] Start deploying artifact(customers-service-3.0.1.jar) to deployment(default) of app(customers-service)...
   [INFO] Artifact(customers-service-3.0.1.jar) is successfully deployed to deployment(default) of app(customers-service).
   [INFO] Starting Spring App after deploying artifacts...
   [INFO] Deployment Status: Running

   ...

   [INFO] Start deploying artifact(vets-service-3.0.1.jar) to deployment(default) of app(vets-service)...
   [INFO] Artifact(vets-service-3.0.1.jar) is successfully deployed to deployment(default) of app(vets-service).
   [INFO] Starting Spring App after deploying artifacts...
   [INFO] Deployment Status: Running

   ...

   [INFO] Start deploying artifact(visits-service-3.0.1.jar) to deployment(default) of app(visits-service)...
   [INFO] Artifact(visits-service-3.0.1.jar) is successfully deployed to deployment(default) of app(visits-service).
   [INFO] Starting Spring App after deploying artifacts...
   [INFO] Deployment Status: Running
   ```

1. The Azure portal doesn't support deploying the frontend applications, so use the following Azure CLI command to deploy the frontend application:

   ```azurecli
   az spring app deploy \
       --resource-group ${RESOURCE_GROUP} \
       --service ${SPRING_APPS_NAME} \
       --name ${APP_FRONTEND} \
       --source-path spring-petclinic-frontend \
       --build-env BP_WEB_SERVER=nginx
   ```

   After the command runs, you can see from the following log messages that the deployment was successful:

   ```output
   [5/5] Updating deployment in app "frontend" (this operation can take a while to complete)
   Azure Spring Apps will use rolling upgrade to update your deployment, you have 1 instance, Azure Spring Apps will update the deployment in 1 round.
   The deployment is in round 1, 1 old instance is deleted/deleting and 1 new instance is started/starting
   Your application is successfully deployed.
   ```

### [Azure CLI](#tab/Azure-CLI-ent)


<!--
To reuse the Spring Apps instance deployment steps in other articles, a separate markdown file is used to describe how to deploy app to Spring Apps instance with Azure CLI.

[!INCLUDE [deploy-microservice-apps-azure-cli](deploy-microservice-apps-azure-cli.md)]

-->

Use the following steps to deploy the apps:

1. Enter the project root directory and use the following command to build and deploy the frontend application:

   ```azurecli
   az spring app deploy \
       --service ${SPRING_APPS} \
       --name ${APP_FRONTEND} \
       --build-env BP_WEB_SERVER=nginx \
       --source-path ./spring-petclinic-frontend
   ```

1. Use the following command to build and deploy the `customers-service` application:

   ```azurecli
   az spring app deploy \
       --service ${SPRING_APPS} \
       --name ${APP_CUSTOMERS_SERVICE} \
       --source-path \
       --config-file-pattern application,customers-service \
       --build-env \
           BP_MAVEN_BUILT_MODULE=spring-petclinic-customers-service \
           BP_JVM_VERSION=17
   ```

1. Use the following command to build and deploy the `vets-service` application:

   ```azurecli
   az spring app deploy \
       --service ${SPRING_APPS} \
       --name ${APP_VETS_SERVICE} \
       --source-path \
       --config-file-pattern application,vets-service \
       --build-env \
           BP_MAVEN_BUILT_MODULE=spring-petclinic-vets-service \
           BP_JVM_VERSION=17
   ```

1. Use the following command to build and deploy the `visits-service` application:

   ```azurecli
   az spring app deploy \
       --service ${SPRING_APPS} \
       --name ${APP_VISITS_SERVICE} \
       --source-path \
       --config-file-pattern application,visits-service \
       --build-env \
           BP_MAVEN_BUILT_MODULE=spring-petclinic-visits-service \
           BP_JVM_VERSION=17
   ```


---
