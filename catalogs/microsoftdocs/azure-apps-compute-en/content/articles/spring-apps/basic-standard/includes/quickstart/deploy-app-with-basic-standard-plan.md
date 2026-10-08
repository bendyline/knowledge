---
author: karlerickson
ms.author: v-shilichen
ms.service: azure-spring-apps
ms.topic: include
ms.date: 08/19/2025
ms.update-cycle: 1095-days
---

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
