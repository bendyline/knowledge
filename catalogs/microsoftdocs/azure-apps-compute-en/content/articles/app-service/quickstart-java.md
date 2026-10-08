---
title: 'Quickstart: Create a Java app on Azure App Service'
description: Deploy a Java app to Azure App Service in minutes by using the Azure Web App Plugin for Maven.
keywords: azure, app service, web app, windows, linux, java, maven, quickstart
ms.assetid: 582bb3c2-164b-42f5-b081-95bfcb7a502a
ms.devlang: java
ms.topic: quickstart
ms.date: 06/13/2025
ms.custom: mvc, mode-other, devdivchpfy22, devx-track-java, devx-track-javaee-jbosseap-appsvc, devx-track-javaee-jbosseap, devx-track-javaee, devx-track-extended-java
zone_pivot_groups: app-service-java-deploy
adobe-target: true
adobe-target-activity: DocsExp–386541–A/B–Enhanced-Readability-Quickstarts–2.19.2021
adobe-target-experience: Experience B
adobe-target-content: ./quickstart-java-uiex
author: cephalin
ms.author: cephalin
ms.service: azure-app-service
---

# Quickstart: Create a Java app on Azure App Service

**Applies to: java-tomcat**



[Azure App Service](https://learn.microsoft.com/azure/app-service/) provides a highly scalable, self-patching web app hosting service. In this quickstart, you use the [Maven Plugin for Azure App Service Web Apps](https://github.com/microsoft/azure-maven-plugins/blob/develop/azure-webapp-maven-plugin/README.md) to deploy a Java web application to a Linux Tomcat server in Azure App Service.

If Maven isn't your preferred development tool, check out similar articles for Java developers:
+ [Gradle](configure-language-java-deploy-run.md#gradle)
+ [IntelliJ IDEA](https://learn.microsoft.com/azure/developer/java/toolkit-for-intellij/create-hello-world-web-app)
+ [Eclipse](https://learn.microsoft.com/azure/developer/java/toolkit-for-eclipse/create-hello-world-web-app)
+ [Visual Studio Code](https://code.visualstudio.com/docs/java/java-webapp)

## Prerequisites

- [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/quickstart-java.md)

- Run the commands in this quickstart by using Azure Cloud Shell, an interactive shell that you can use through your browser to work with Azure services. To use Cloud Shell:

  1. Select the following **Launch Cloud Shell** button or go to https://shell.azure.com to open Cloud Shell in your browser.

     Button to launch the Azure Cloud Shell.

  1. Sign in to Azure if necessary, and make sure you're in the **Bash** environment of Cloud Shell.
  1. Select **Copy** in a code block, paste the code into Cloud Shell, and run it.

## Create a Java app

Run the following Maven command in Cloud Shell to create a new app named `helloworld`:

```bash
mvn archetype:generate "-DgroupId=example.demo" "-DartifactId=helloworld" "-DarchetypeArtifactId=maven-archetype-webapp" "-DarchetypeVersion=1.4" "-Dversion=1.0-SNAPSHOT"
```

Then change your working directory to the project folder by running `cd helloworld`.

## Configure the Maven plugin

The App Service deployment process uses your Azure credentials from Cloud Shell automatically. The Maven plugin authenticates with OAuth or device sign-in. For more information, see [Authentication](https://github.com/microsoft/azure-maven-plugins/wiki/Authentication).

Run the following Maven command to configure the deployment by setting the App Service operating system, Java version, and Tomcat version.

```bash
mvn com.microsoft.azure:azure-webapp-maven-plugin:2.14.1:config
```

1. For **Create new run configuration**, type **Y** and then press **Enter**.
1. For **Define value for OS**, type **2** for Linux, and then press **Enter**.
1. For **Define value for javaVersion**, type **1** for Java 21, and then press **Enter**.
1. For **Define value for webContainer**, type **1** for Tomcat 10.1, and then press **Enter**.
1. For **Define value for pricingTier**, type **3** for P1V2, and then press **Enter**.
1. For **Confirm**, type **Y** and then press **Enter**.

The output should look similar to the following code:

```bash
Please confirm webapp properties
AppName : helloworld-1745408005556
ResourceGroup : helloworld-1745408005556-rg
Region : centralus
PricingTier : P1V2
OS : Linux
Java Version: Java 21
Web server stack: Tomcat 10.1
Deploy to slot : false
Confirm (Y/N) [Y]: 
[INFO] Saving configuration to pom.
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  01:36 min
[INFO] Finished at: 2025-04-23T11:34:44Z
[INFO] ------------------------------------------------------------------------
```

After you confirm your choices, the plugin adds the plugin element and required settings to your project's *pom.xml* file, which configures your web app to run in App Service.

The relevant portion of the *pom.xml* file should look similar to the following example.

```xml
<build>
    <plugins>
        <plugin>
            <groupId>com.microsoft.azure</groupId>
            <artifactId>>azure-webapp-maven-plugin</artifactId>
            <version>x.xx.x</version>
            <configuration>
                <schemaVersion>v2</schemaVersion>
                <resourceGroup>helloworld-1745408005556-rg</resourceGroup>
                <appName>helloworld-1745408005556</appName>
            ...
            </configuration>
        </plugin>
    </plugins>
</build>
```

The values for `<appName>` and `<resourceGroup>`, `helloworld-1745408005556` and `helloworld-1745408005556-rg` for the demo app, are used later.

You can modify the configurations for App Service directly in your *pom.xml* file.

- For the complete list of configurations, see [Common Configurations](https://github.com/microsoft/azure-maven-plugins/wiki/Common-Configuration).
- For configurations specific to App Service, see [Azure Web App: Configuration Details](https://github.com/microsoft/azure-maven-plugins/wiki/Azure-Web-App:-Configuration-Details).

## Deploy the app

With all the configuration ready in the *pom.xml* file, you can deploy your Java app to Azure with the following single command.

```bash
mvn package azure-webapp:deploy
```

Once you select from a list of available subscriptions, Maven deploys to Azure App Service. When deployment completes, your application is ready.

For this demo, the URL is `http://helloworld-1745408005556.azurewebsites.net`. When you open the URL with your local web browser, you should see the following app:

Screenshot of Maven Hello World web app running in Azure App Service.

Congratulations! You deployed a Java app to App Service.

## Clean up resources

You created the resources for this tutorial in an Azure resource group. If you no longer need them, you can delete the resource group and all its resources by running the following Azure CLI command in Cloud Shell.

```azurecli
az group delete --name helloworld-1745408005556-rg --yes
```
The command might take a while to run.





**Applies to: java-javase**



[Azure App Service](https://learn.microsoft.com/azure/app-service/) provides a highly scalable, self-patching web app hosting service. In this quickstart, you use the [Maven Plugin for Azure App Service Web Apps](https://github.com/microsoft/azure-maven-plugins/blob/develop/azure-webapp-maven-plugin/README.md) to deploy a Java web application with an embedded Spring Boot, Quarkus, or Tomcat server to App Service. For more information, see [azure-webapp-maven-plugin](https://github.com/microsoft/azure-maven-plugins/wiki/Azure-Web-App).

If Maven isn't your preferred development tool, check out similar articles for Java developers:
+ [Gradle](configure-language-java-deploy-run.md#gradle)
+ [IntelliJ IDEA](https://learn.microsoft.com/azure/developer/java/toolkit-for-intellij/create-hello-world-web-app)
+ [Eclipse](https://learn.microsoft.com/azure/developer/java/toolkit-for-eclipse/create-hello-world-web-app)
+ [Visual Studio Code](https://code.visualstudio.com/docs/java/java-webapp)

## Prerequisites

- [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/quickstart-java.md)

- Run the commands in this quickstart by using Azure Cloud Shell, an interactive shell that you can use through your browser to work with Azure services. To use Cloud Shell:

  1. Select the following **Launch Cloud Shell** button or go to https://shell.azure.com to open Cloud Shell in your browser.

     Button to launch the Azure Cloud Shell.

  1. Sign in to Azure if necessary, and make sure you're in the **Bash** environment of Cloud Shell.
  1. Select **Copy** in a code block, paste the code into Cloud Shell, and run it.

## Get the sample app

Choose the appropriate tab and follow instructions to get the sample Spring Boot, Quarkus, or Embedded Tomcat web app.

### [Spring Boot](#tab/springboot)

Download and extract the [default Spring Boot web application template](https://github.com/rd-1-2022/rest-service), or clone it by running the following command. Running the [Spring CLI](https://docs.spring.io/spring-cli/reference/getting-started.html) command `spring boot new my-webapp` also clones the web app.

```bash
git clone https://github.com/rd-1-2022/rest-service my-webapp
```

Then change your working directory to the project folder by running `cd my-webapp`.

### [Quarkus](#tab/quarkus)

1. Generate a new Quarkus app named `quarkus-hello-azure` by running the following Maven command:

   ```bash
   mvn io.quarkus.platform:quarkus-maven-plugin:3.21.3:create \
       -DprojectGroupId=org.acme \
       -DprojectArtifactId=quarkus-hello-azure  \
       -Dextensions='resteasy-reactive'
   ```

1. Change your working directory to the project folder by running `cd quarkus-hello-azure`.

### [Embedded Tomcat](#tab/embeddedtomcat)

1. Download and extract the [embeddedTomcatExample](https://github.com/Azure-Samples/java-docs-embedded-tomcat) repository, or clone it locally by running the following `git clone` command.

   ```bash
   git clone https://github.com/Azure-Samples/java-docs-embedded-tomcat
   ```

1. Change your working directory to the project folder by running `cd java-docs-embedded-tomcat`.

1. Run the application by using the standard [Tomcat](https://tomcat.apache.org/tomcat-9.0-doc/api/org/apache/catalina/startup/Tomcat.html) class. See [Main.java](https://github.com/Azure-Samples/java-docs-embedded-tomcat/blob/main/src/main/java/com/microsoft/azure/appservice/examples/embeddedtomcat/Main.java) in the sample. 

---

## Configure the Maven plugin

The App Service deployment process uses your Azure credentials from Cloud Shell automatically. The Maven plugin authenticates with OAuth or device sign-in. For more information, see [Authentication](https://github.com/microsoft/azure-maven-plugins/wiki/Authentication).

Run the following Maven command to configure the deployment by setting the App Service operating system and Java version.

```bash
mvn com.microsoft.azure:azure-webapp-maven-plugin:2.14.1:config
```

1. For **Create new run configuration**, type **Y** and then press **Enter**.
1. For **Define value for OS**, type **2** for Linux, and then press **Enter**.
1. For **Define value for javaVersion**, type **1** for Java 21, and then press **Enter**.
1. For **Define value for pricingTier**, type **3** for P1v2, and then press **Enter**.
1. For **Confirm**, type **Y** and then press **Enter**.

The output should look similar to the following code:

```bash
Please confirm webapp properties
AppName : <generated-app-name>
ResourceGroup : <generated-app-name>-rg
Region : centralus
PricingTier : P1v2
OS : Linux
Java Version: Java 21
Web server stack: Java SE
Deploy to slot : false
Confirm (Y/N) [Y]: 
[INFO] Saving configuration to pom.
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  47.533 s
[INFO] Finished at: 2025-04-23T12:20:08Z
[INFO] ------------------------------------------------------------------------
```

After you confirm your choices, the plugin adds the plugin element and required settings to your project's *pom.xml* file, which configures your web app to run in App Service.

The relevant portion of the *pom.xml* file should look similar to the following example.

```xml
<build>
    <plugins>
        <plugin>
            <groupId>com.microsoft.azure</groupId>
            <artifactId>>azure-webapp-maven-plugin</artifactId>
            <version>x.xx.x</version>
            <configuration>
                <schemaVersion>v2</schemaVersion>
                <resourceGroup>generated-app-name-rg</resourceGroup>
                <appName>generated-app-name</appName>
            ...
            </configuration>
        </plugin>
    </plugins>
</build>
```

The values for `<appName>` and `<resourceGroup>` are used later.

You can modify the configurations for App Service directly in your *pom.xml* file.

- For the complete list of configurations, see [Common Configurations](https://github.com/microsoft/azure-maven-plugins/wiki/Common-Configuration).
- For configurations specific to App Service, see [Azure Web App: Configuration Details](https://github.com/microsoft/azure-maven-plugins/wiki/Azure-Web-App:-Configuration-Details).

## Deploy the app

With all the configuration ready in your [pom.xml](https://github.com/Azure-Samples/java-docs-embedded-tomcat/blob/main/pom.xml) file, you can deploy your Java app to Azure.

### [Spring Boot](#tab/springboot)

1. Build the JAR file using the following command.
   
   ```bash
    mvn clean package
   ```
   
   > **Tip:**
   > Spring Boot produces two JAR files with `mvn package`, but the `azure-webapp-maven-plugin` picks the right JAR file to deploy automatically.
   
1. Deploy the app to Azure by using the following command:
   
   ```bash
   mvn azure-webapp:deploy
   ```
   
   Once you select from a list of available subscriptions, Maven deploys to Azure App Service. When deployment completes, your application is ready, and you see the following output:
   
   ```output
   [INFO] Successfully deployed the artifact to <URL>
   [INFO] ------------------------------------------------------------------------
   [INFO] BUILD SUCCESS
   [INFO] ------------------------------------------------------------------------
   [INFO] Total time:  02:20 min
   [INFO] Finished at: 2023-07-26T12:47:50Z
   [INFO] ------------------------------------------------------------------------
   ```
   
1. Open your app's default domain from the **Overview** page in the Azure portal, and append `/greeting` to the URL. You should see the following app:
   
   Screenshot of Spring Boot Hello World web app running in Azure App Service.

### [Quarkus](#tab/quarkus)
   
1. Build the JAR file using the following command.
   
   ```bash
   echo '%prod.quarkus.http.port=${PORT}' >> src/main/resources/application.properties
   mvn clean package -Dquarkus.package.jar.type=uber-jar
   ```
   
   Set the Quarkus port in the *application.properties* file to the `PORT` environment variable in the Linux Java container. `Dquarkus.package.jar.type=uber-jar` tells Maven to [generate an Uber-Jar](https://quarkus.io/guides/maven-tooling#uber-jar-maven), which includes all dependencies in the JAR file.
   
   > **Tip:**
   > Quarkus produces two JAR files with `mvn package`, but `azure-webapp-maven-plugin` picks the right JAR file to deploy automatically.
   
1. Deploy the app to Azure by using the following command:
   
   ```bash
   mvn azure-webapp:deploy
   ```
   
   Once you select from a list of available subscriptions, Maven deploys to Azure App Service. When deployment completes, your application is ready, and you see the following output:
   
   ```output
   [INFO] Successfully deployed the artifact to <URL>
   [INFO] ------------------------------------------------------------------------
   [INFO] BUILD SUCCESS
   [INFO] ------------------------------------------------------------------------
   [INFO] Total time:  02:20 min
   [INFO] Finished at: 2023-07-26T12:47:50Z
   [INFO] ------------------------------------------------------------------------
   ```
   
1. Open your app's default domain from the **Overview** in the Azure portal, and append `/hello` to the URL. You should see the following app:
   
   Screenshot of Quarkus web app running in Azure App Service.

### [Embedded Tomcat](#tab/embeddedtomcat)
   
1. Build the JAR file using the following command.
   
   ```bash
   mvn clean package
   ```
   
   To make the application deploy using the [azure-webapp-maven-plugin](https://github.com/microsoft/azure-maven-plugins/wiki/Azure-Web-App) and run on Azure App Service, the sample configures the `package` goal as follows:
   
   - Builds a single uber JAR file, which contains everything the application needs to run.
   - Creates an [executable JAR](https://en.wikipedia.org/wiki/JAR_(file_format)#Executable_JAR_files) by specifying the Tomcat class as the startup class.
   - Replaces the original artifact with the `Uber-Jar` to ensure that the deploy step deploys the right file.
   
1. Deploy the app to Azure by using the following command:
   
   ```bash
   mvn azure-webapp:deploy
   ```
   
   Once you select from a list of available subscriptions, Maven deploys to Azure App Service. When deployment completes, your application is ready, and you see the following output:
   
   ```output
   [INFO] Successfully deployed the artifact to <URL>
   [INFO] ------------------------------------------------------------------------
   [INFO] BUILD SUCCESS
   [INFO] ------------------------------------------------------------------------
   [INFO] Total time:  02:20 min
   [INFO] Finished at: 2023-07-26T12:47:50Z
   [INFO] ------------------------------------------------------------------------
   ```
   
1. Open the URL for your app's default domain from the **Overview** in the Azure portal. You should see the following app:
   
   Screenshot of embedded Tomcat web app running in Azure App Service.

---

Congratulations! You deployed a Java app to App Service.

## Clean up resources

You created the resources for this tutorial in an Azure resource group. If you no longer need them, you can delete the resource group and all its resources by running the following Azure CLI command in Cloud Shell.

```azurecli
az group delete --name <resource group name>  --yes
```

For example, run `az group delete --name quarkus-hello-azure-1690375364238-rg --yes`. This command might take a while to run.





**Applies to: java-jboss**



[Azure App Service](https://learn.microsoft.com/azure/app-service/) provides a highly scalable, self-patching web app hosting service. In this quickstart, you use the [Maven Plugin for Azure App Service Web Apps](https://github.com/microsoft/azure-maven-plugins/blob/develop/azure-webapp-maven-plugin/README.md) to deploy a Java web application to a Linux JBoss EAP server in Azure App Service.

> **Note:**
> JBoss EAP on App Service now supports "Bring Your Own License" (BYOL) billing, this allows customers with existing Red Hat subscriptions to apply those licenses directly to their JBoss EAP deployments on Azure App Service. [Learn more](https://aka.ms/byol-eap-jboss).

If Maven isn't your preferred development tool, check out similar articles for Java developers:
+ [Gradle](configure-language-java-deploy-run.md#gradle)
+ [IntelliJ IDEA](https://learn.microsoft.com/azure/developer/java/toolkit-for-intellij/create-hello-world-web-app)
+ [Eclipse](https://learn.microsoft.com/azure/developer/java/toolkit-for-eclipse/create-hello-world-web-app)
+ [Visual Studio Code](https://code.visualstudio.com/docs/java/java-webapp)

## Prerequisites

- [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/quickstart-java.md)

- Run the commands in this quickstart by using Azure Cloud Shell, an interactive shell that you can use through your browser to work with Azure services. To use Cloud Shell:

  1. Select the following **Launch Cloud Shell** button or go to https://shell.azure.com to open Cloud Shell in your browser.
  
     Button to launch the Azure Cloud Shell.

  1. Sign in to Azure if necessary, and make sure you're in the **Bash** environment of Cloud Shell.
  1. Select **Copy** in a code block, paste the code into Cloud Shell, and run it.

## Create a Java app

1. Clone the Pet Store demo application.

   ```bash
   git clone https://github.com/Azure-Samples/app-service-java-quickstart
   ```

1. Change directory to the completed `petstore-ee7` project and build it.

   ```bash
   cd app-service-java-quickstart
   git checkout 20230308
   cd petstore-ee7
   mvn clean install
   ```

   If you see a message about being in detached HEAD state, you can ignore it. You don't make any Git commit in this quickstart, so detached HEAD state is appropriate.
   
   > **Tip:**
   > The `petstore-ee7` sample requires Java 11 or newer. The `booty-duke-app-service` sample project requires Java 17. If your installed version of Java is less than 17, run the build from within the *petstore-ee7* directory instead of at the top level.

## Configure the Maven plugin

The App Service deployment process uses your Azure credentials from Cloud Shell automatically. The Maven plugin authenticates with OAuth or device sign-in. For more information, see [Authentication](https://github.com/microsoft/azure-maven-plugins/wiki/Authentication).

Run the following Maven command to configure the deployment by setting the App Service operating system, Java version, and Jbosseap version.

```bash
mvn com.microsoft.azure:azure-webapp-maven-plugin:2.14.1:config
```

1. For **Create new run configuration**, type **Y** and then press **Enter**.
1. For **Define value for OS**, type **2** for Linux, and then press **Enter**.
1. For **Define value for javaVersion**, type **2** for Java 17, and then press **Enter**. If you select Java 21, you don't see **Jbosseap** as an option later.
1. For **Define value for webContainer**, type **4** for Jbosseap 7, and then press **Enter**.
1. For **Define value for pricingTier**, type **1** for P1v3, and then press **Enter**.
1. For **Confirm**, type **Y** and then press **Enter**.

The output should look similar to the following code:

```bash
Please confirm webapp properties
AppName : petstoreee7-1745409173307
ResourceGroup : petstoreee7-1745409173307-rg
Region : centralus
PricingTier : P1v3
OS : Linux
Java Version: Java 17
Web server stack: Jbosseap 4
Deploy to slot : false
Confirm (Y/N) [Y]: 
[INFO] Saving configuration to pom.
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  01:36 min
[INFO] Finished at: 2025-04-23T11:54:22Z
[INFO] ------------------------------------------------------------------------
```

After you confirm your choices, the plugin adds the plugin element and required settings to your project's *pom.xml* file, which configures your web app to run in App Service.

The relevant portion of the *pom.xml* file should look similar to the following example.

```xml
<build>
    <plugins>
        <plugin>
            <groupId>com.microsoft.azure</groupId>
            <artifactId>>azure-webapp-maven-plugin</artifactId>
            <version>x.xx.x</version>
            <configuration>
                <schemaVersion>v2</schemaVersion>
                <resourceGroup>petstoreee7-1745409173307-rg</resourceGroup>
                <appName>petstoreee7-1745409173307</appName>
            ...
            </configuration>
        </plugin>
    </plugins>
</build>
```

The values for `<appName>` and `<resourceGroup>`, `petstoreee7-1745409173307` and `petstoreee7-1745409173307-rg` in the demo app, are used later.

You can modify the configurations for App Service directly in your *pom.xml* file.

- For the complete list of configurations, see [Common Configurations](https://github.com/microsoft/azure-maven-plugins/wiki/Common-Configuration).
- For configurations specific to App Service, see [Azure Web App: Configuration Details](https://github.com/microsoft/azure-maven-plugins/wiki/Azure-Web-App:-Configuration-Details).

## Deploy the app

With all the configuration ready in your *pom.xml* file, you can deploy your Java app to Azure with the following single command.

```bash
# Disable testing, as it requires Wildfly to be installed locally.
mvn package azure-webapp:deploy -DskipTests
```

Once you select from a list of available subscriptions, Maven deploys to Azure App Service. When deployment completes, your application is ready.

For this demo app, the URL is `http://petstoreee7-1745409173307.azurewebsites.net`. When you open the URL with your local web browser, you should see the following app:

Screenshot of Maven Hello World web app running in Azure App Service.

Congratulations! You deployed a Java app to App Service.

## Clean up resources

You created the resources for this tutorial in an Azure resource group. If you no longer need them, you can delete the resource group and all its resources by running the following Azure CLI command in Cloud Shell.

```azurecli
az group delete --name petstoreee7-1745409173307-rg  --yes
```
The command might take a while to run.




## Related content

- [Tutorial: Build a Tomcat web app with Azure App Service on Linux and MySQL](tutorial-java-tomcat-mysql-app.md)
- [Tutorial: Build a Java Spring Boot web app with Azure App Service on Linux and Azure Cosmos DB](tutorial-java-spring-cosmosdb.md)
- [Configure continuous deployment to Azure App Service](deploy-continuous-deployment.md)
- [Azure App Service on Linux pricing](https://azure.microsoft.com/pricing/details/app-service/linux/)
- [Enable diagnostic logging for apps in Azure App Service](troubleshoot-diagnostic-logs.md)
- [Scale up an app in Azure App Service](manage-scale-up.md)
- [Azure for Java developer documentation](https://learn.microsoft.com/java/azure/)
- [Deploy and configure a Java SE, Tomcat, or JBoss EAP app in Azure App Service](configure-language-java-deploy-run.md)
- [Tutorial: Use a custom domain and a managed certificate to secure your app](tutorial-secure-domain-certificate.md)
