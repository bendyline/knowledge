---
author: karlerickson
ms.author: v-shilichen
ms.service: azure-spring-apps
ms.custom: devx-track-azurecli
ms.topic: include
ms.date: 08/19/2025
ms.update-cycle: 1095-days
---

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

An *App* is an abstraction of one business app. For more information, see [App and deployment in Azure Spring Apps](../../concept-understand-app-and-deployment.md). Apps run in an Azure Spring Apps service instance, as shown in the following diagram.

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
