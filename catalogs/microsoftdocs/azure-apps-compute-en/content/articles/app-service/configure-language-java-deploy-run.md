---
title: Deploy and Configure Tomcat, JBoss EAP, or Java SE Apps
description: Learn how to deploy Tomcat, JBoss EAP, or Java SE apps to run on Azure App Service. Perform common tasks like setting Java versions and configuring logging.
keywords: azure app service, web app, windows, oss, java, tomcat, jboss, spring boot, quarkus
ms.devlang: java
ms.topic: how-to
ms.date: 09/18/2026
ms.custom:
  - devx-track-java
  - devx-track-azurecli
  - devx-track-extended-java
  - linux-related-content
  - build-2025
zone_pivot_groups: app-service-java-hosting
adobe-target: true
author: cephalin
ms.author: cephalin
ms.service: azure-app-service
---

# Deploy and configure a Java SE, Tomcat, or JBoss EAP app in Azure App Service

This article shows you the most common deployment and runtime configuration for Java apps in Azure App Service. If it's your first time using Azure App Service, you should first read through the [Java quickstart](quickstart-java.md). You can find the answers to general questions about using App Service that aren't specific to Java development in the [App Service FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/faq-configuration-and-management.yml).


Azure App Service runs Java web applications in three types on a fully managed service:

- Java Standard Edition (SE). Java SE can run an app deployed as a Java archive (JAR) package that contains an embedded server, such as Spring Boot, Quarkus, Dropwizard, or an app with an embedded Tomcat or Jetty server.
- Tomcat. The built-in Tomcat server can run an app deployed as a web application archive (WAR) package.
- JBoss Enterprise Application Platform (EAP): The built-in JBoss EAP server can run an app deployed as a WAR or enterprise archive (EAR) package. This option is supported for Linux apps in a set of pricing tiers that include Free, Premium v3, and Isolated v2.

> **Note:**
> JBoss EAP on App Service now supports Bring Your Own License (BYOL) billing. BYOL enables customers who have existing Red Hat subscriptions to apply those licenses directly to their JBoss EAP deployments on Azure App Service. For more information, see [BYOL Support for JBoss EAP on App Service](https://aka.ms/byol-eap-jboss).


## Show the Java version

# [Linux](#tab/linux)

To show the current Java version, run the following command in [Azure Cloud Shell](https://shell.azure.com):

```azurecli-interactive
az webapp config show --resource-group <resource-group-name> --name <app-name> --query linuxFxVersion
```

To show all supported Java versions, run the following command in [Cloud Shell](https://shell.azure.com):

```azurecli-interactive
az webapp list-runtimes --os linux | grep "JAVA\|TOMCAT\|JBOSSEAP"
```

### Get the Java version in the Linux container

For more detailed version information in the Linux container, [open an SSH session with the container](configure-linux-open-ssh-session.md?pivots=container-linux). Here are a few examples of what you can run.

**Applies to: java-javase,java-tomcat,java-jboss**


To view the Java version in the SSH session:

```bash
java -version
```



**Applies to: java-tomcat**


To view the Tomcat server version in the SSH session:

```bash
sh /usr/local/tomcat/bin/version.sh
```

Or, if your Tomcat server is in a custom location, find `version.sh` with:

```bash
find / -name "version.sh"
```



**Applies to: java-jboss**


To view the JBoss EAP server version in the SSH session:
```bash
$JBOSS_HOME/bin/jboss-cli.sh --connect --commands=:product-info
```



# [Windows](#tab/windows)

To show the current Java version, run the following command in [Azure Cloud Shell](https://shell.azure.com):

```azurecli-interactive
az webapp config show --name <app-name> --resource-group <resource-group-name> --query "[javaVersion, javaContainer, javaContainerVersion]"
```

To show all supported Java versions, run the following command in [Cloud Shell](https://shell.azure.com):

```azurecli-interactive
az webapp list-runtimes --os windows | grep java
```

---

For more information on version support, see [App Service language runtime support policy](language-support-policy.md).


## What happens to outdated runtimes in App Service?

Outdated runtimes are deprecated by the maintaining organization or have significant vulnerabilities. Accordingly, they're removed from the create and configure pages in the portal. When an outdated runtime is hidden from the portal, any app that's still using that runtime continues to run. 

If you want to create an app with an outdated runtime version that's no longer shown on the portal, use the Azure CLI, an ARM template, or Bicep. These deployment alternatives let you create deprecated runtimes that are removed from the portal but are still being supported.

If a runtime is fully removed from the App Service platform, your Azure subscription owner receives an email notice before the removal.


## How can I identify apps using Java 8, 11, and 17?

To identify web apps using Java 8, 11, and 17, use the following query with Azure CLI or Azure Cloud Shell to output a list to a file named java-webapps.csv.

```azurecli-interactive
output_file="java-webapps.csv" 
    printf '%s\n' \ 
    'Subscription,SubscriptionId,Name,ResourceGroup,Location,JavaVersion,LinuxFxVersion' \ 
    > "$output_file" 

az account list --query "[].{id:id, name:name}" -o json | 
jq -c '.[]' | 
while read -r sub; do 
    sub_id=$(echo "$sub" | jq -r '.id') 
    sub_name=$(echo "$sub" | jq -r '.name') 
    echo "Scanning subscription: $sub_name" >&2 

    az account set --subscription "$sub_id" 

    az webapp list --query "[].{name:name, rg:resourceGroup, location:location}" -o json | 
    jq -c '.[]' | 
    while read -r app; do 
        name=$(echo "$app" | jq -r '.name') 
        rg=$(echo "$app" | jq -r '.rg') 
        location=$(echo "$app" | jq -r '.location') 

        config=$(az webapp config show -n "$name" -g "$rg" \ 
            --query "{javaVersion:javaVersion,linuxFxVersion:linuxFxVersion}" -o json) 
        jv=$(echo "$config" | jq -r '.javaVersion // ""') 
        lx=$(echo "$config" | jq -r '.linuxFxVersion // ""') 

        if [[ "$jv" =~ ^(1\.8|8|11|17)([._+-].*)?$ ]] || \ 
            [[ "${lx,,}" =~ (java|jre)[^0-9]*(1\.8|8|11|17)([^0-9]|$) ]]; then 
                jq -nr \ 
                    --arg subscription "$sub_name" \ 
                    --arg subscriptionId "$sub_id" \ 
                    --arg name "$name" \ 
                    --arg resourceGroup "$rg" \ 
                    --arg location "$location" \ 
                    --arg javaVersion "$jv" \ 
                    --arg linuxFxVersion "$lx" \ 
                '[ 
                    $subscription, 
                    $subscriptionId, 
                    $name, 
                    $resourceGroup, 
                    $location, 
                    $javaVersion, 
                    $linuxFxVersion 
                ] | @csv' >> "$output_file" 
        fi 
    done 
done 

echo "Results exported to $output_file" >&2
```

## Deploying your app

### Build tools

#### Maven

By using the [Maven Plugin for Azure Web Apps](https://github.com/microsoft/azure-maven-plugins/tree/develop/azure-webapp-maven-plugin), you can easily prepare your project with one command in your project root:

```shell
mvn com.microsoft.azure:azure-webapp-maven-plugin:2.13.0:config
```

This command adds an `azure-webapp-maven-plugin` plugin and the related configuration by prompting you to select an existing Azure Web App or to create a new one. During configuration, it attempts to detect whether your application should be deployed to Java SE, Tomcat, or (Linux only) JBoss EAP. Then you can deploy your Java app to Azure by using the following command:

```shell
mvn package azure-webapp:deploy
```

Here's a sample configuration in `pom.xml`:

```xml
<plugin> 
  <groupId>com.microsoft.azure</groupId>  
  <artifactId>azure-webapp-maven-plugin</artifactId>  
  <version>2.11.0</version>  
  <configuration>
    <subscriptionId>111111-11111-11111-1111111</subscriptionId>
    <resourceGroup>spring-boot-xxxxxxxxxx-rg</resourceGroup>
    <appName>spring-boot-xxxxxxxxxx</appName>
    <pricingTier>B2</pricingTier>
    <region>westus</region>
    <runtime>
      <os>Linux</os>      
      <webContainer>Java SE</webContainer>
      <javaVersion>Java 17</javaVersion>
    </runtime>
    <deployment>
      <resources>
        <resource>
          <type>jar</type>
          <directory>${project.basedir}/target</directory>
          <includes>
            <include>*.jar</include>
          </includes>
        </resource>
      </resources>
    </deployment>
  </configuration>
</plugin> 
```

#### Gradle

1. Set up the [Gradle Plugin for Azure Web Apps](https://github.com/microsoft/azure-gradle-plugins/tree/master/azure-webapp-gradle-plugin) by adding the plugin to `build.gradle`:

    ```groovy
    plugins {
      id "com.microsoft.azure.azurewebapp" version "1.10.0"
    }
    ```

1. Configure your web app details. The corresponding Azure resources are created if they don't exist.
Here's a sample configuration. For details, refer to [this document](https://github.com/microsoft/azure-gradle-plugins/wiki/Webapp-Configuration).

    ```groovy
    azurewebapp {
        subscription = '<your subscription id>'
        resourceGroup = '<your resource group>'
        appName = '<your app name>'
        pricingTier = '<price tier like 'P1v2'>'
        region = '<region like 'westus'>'
        runtime {
          os = 'Linux'
          webContainer = 'Tomcat 10.0' // or 'Java SE' if you want to run an executable jar
          javaVersion = 'Java 17'
        }
        appSettings {
            <key> = <value>
        }
        auth {
            type = 'azure_cli' // support azure_cli, oauth2, device_code and service_principal
        }
    }
    ```

1. Deploy with one command.

    ```shell
    gradle azureWebAppDeploy
    ```

### IDEs

Azure provides seamless Java App Service development experience in popular Java Integrated Development Environments (IDEs), including:

- **VS Code**: [Java Web Apps with Visual Studio Code](https://code.visualstudio.com/docs/java/java-webapp#_deploy-web-apps-to-the-cloud).
- **IntelliJ IDEA**: [Create a Hello World web app for Azure App Service by using IntelliJ](https://learn.microsoft.com/azure/developer/java/toolkit-for-intellij/create-hello-world-web-app).
- **Eclipse IDE**: [Create a Hello World web app for Azure App Service by using Eclipse](https://learn.microsoft.com/azure/developer/java/toolkit-for-eclipse/create-hello-world-web-app).

### Kudu and OneDeploy APIs
Deployment clients such as the [Maven plugin](#maven), GitHub Actions using `azure/webapps-deploy@v3` and newer, or the [az webapp deploy](https://learn.microsoft.com/cli/azure/webapp#az-webapp-deploy) command use OneDeploy, which is invoked by calling the `/api/publish` endpoint of the Kudu site under the hood. For more information on this API, see [this documentation](deploy-zip.md#deploy-warjarear-packages).

**Applies to: java-javase**


When these deployment methods are used, they will automatically rename the provided JAR file to `app.jar` during the deployment process. This will be placed under `/home/site/wwwwroot`. To deploy JAR files to Java SE see [this documentation](deploy-zip.md#deploy-warjarear-packages).

> **Note:**
> If you use alternative methods like FTP or older ZipDeploy APIs, this method of renaming the provided JAR file will not be invoked. Take note of this if using the [Startup File](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/faq-app-service-linux.yml) text box in the **Configuration** section of the portal to explicitly call your JAR file.



**Applies to: java-tomcat**


You can deploy WAR files to your Tomcat application by following [this documentation](deploy-zip.md#deploy-warjarear-packages). When these deployment methods above are used, they will automatically rename the provided War file to `app.war` during the deployment process. This will be placed under `/home/site/wwwwroot` and by default only supports deploying one WAR file under `wwwroot`. This will **not** be placed under the `/home/site/wwwroot/webapps` directory like seen when using deployment APIs such as WarDeploy. To avoid any issues with file structure clashes, it is advised to only use one or the other deployment type.



**Applies to: java-jboss**


To deploy WAR files to JBoss EAP, see [this documentation](deploy-zip.md#deploy-warjarear-packages). When OneDeploy is used, this will automatically rename the WAR file to `app.war` and be placed under `/home/site/wwwroot`. 

To deploy EAR files, [use FTP](deploy-ftp.md). Your EAR application is deployed to the context root defined in your application's configuration. If you want your web app to be served in the root path, ensure that your app sets the context root to the root path: `<context-root>/</context-root>`. For more information, see [Setting the context root of a web application](https://docs.jboss.org/jbossas/guides/webguide/r2/en/html/ch06.html).



Don't deploy your WAR or JAR by using FTP. The FTP tool is designed to upload startup scripts, dependencies, or other runtime files. It's not the optimal choice for deploying web apps.

## Rewrite or redirect a URL

To rewrite or redirect a URL, use one of the available URL rewriters, such as [UrlRewriteFilter](http://tuckey.org/urlrewrite/).

**Applies to: java-tomcat**


Tomcat also provides a [rewrite valve](https://tomcat.apache.org/tomcat-10.1-doc/rewrite.html).



**Applies to: java-jboss**


JBoss EAP also provides a [rewrite valve](https://docs.jboss.org/jbossweb/7.0.x/rewrite.html).



## Logging and debugging apps

Performance reports, traffic visualizations, and health checkups are available for each app through the Azure portal. For more information, see [Azure App Service diagnostics overview](overview-diagnostics.md).

### Stream diagnostic logs

# [Linux](#tab/linux)


You can access the console logs that are generated from inside the container.

To turn on container logging, run the following command:

```azurecli-interactive
az webapp log config --name <app-name> --resource-group <resource-group-name> --docker-container-logging filesystem
```

Replace the `<app-name>` and `<resource-group-name>` values with names that are appropriate for your web app.

After you turn on container logging, run the following command to see the log stream:

```azurecli-interactive
az webapp log tail --name <app-name> --resource-group <resource-group-name>
```

If console logs don't appear immediately, check again in 30 seconds.

To stop log streaming at any time, use the keyboard shortcut Ctrl+C.


# [Windows](#tab/windows)


To access the console logs generated from inside your application code in App Service, turn on diagnostic logging by running the following command in [Cloud Shell](https://shell.azure.com):

```azurecli-interactive
az webapp log config --resource-group <resource-group-name> --name <app-name> --docker-container-logging filesystem --level Verbose
```

Possible values for `--level` are `Error`, `Warning`, `Info`, and `Verbose`. Each subsequent level includes the previous level. For example, `Error` includes only error messages. `Verbose` includes all messages.

After you turn on diagnostic logging, run the following command to see the log stream:

```azurecli-interactive
az webapp log tail --resource-group <resource-group-name> --name <app-name>
```

If console logs don't appear immediately, check again in 30 seconds.

To stop log streaming at any time, select **Ctrl**+**C**.


---

For more information, see [Stream logs in Cloud Shell](troubleshoot-diagnostic-logs.md#in-cloud-shell).

### SSH console access in Linux



If you want to open a direct SSH session with your container, your app should be running.

Use the [az webapp ssh](https://learn.microsoft.com/cli/azure/webapp#az-webapp-ssh) command.

If you're not authenticated, you need to authenticate with your Azure subscription to connect. When you're authenticated, you see an in-browser shell where you can run commands inside your container.

SSH connection


> **Note:**
> Any changes that you make outside the `/home` directory are stored in the container itself and don't persist beyond an app restart.
>

To open a remote SSH session from your local machine, see [Open SSH session from remote shell](configure-linux-open-ssh-session.md#open-ssh-session-with-azure-cli).


### Linux troubleshooting tools

The built-in Java images are based on the [Alpine Linux](https://alpine-linux.readthedocs.io/en/latest/getting_started.html) operating system. Use the `apk` package manager to install any troubleshooting tools or commands.

### Java profiler

All Java runtimes on Azure App Service come with the Java Development Kit (JDK) Flight Recorder for profiling Java workloads. You can use it to record Java Virtual Machine (JVM), system, and application events, and to troubleshoot problems in your applications.

To learn more about the Java profiler, visit the [Azure Application Insights documentation](https://learn.microsoft.com/azure/azure-monitor/app/java-standalone-profiler).

### Java Flight Recorder

All Java runtimes on App Service come with the Java Flight Recorder. You can use it to record JVM, system, and application events and to troubleshoot problems in your Java applications.

# [Linux](#tab/linux)

SSH into App Service and run the `jcmd` command to see a list of all the Java processes running. In addition to `jcmd` itself, you should see your Java application running with a process ID (PID) number.

```shell
078990bbcd11:/home# jcmd
Picked up JAVA_TOOL_OPTIONS: -Djava.net.preferIPv4Stack=true
147 sun.tools.jcmd.JCmd
116 /home/site/wwwroot/app.jar
```

Execute the following command to start a 30-second recording of the JVM. It profiles the JVM and creates a Java Flight Recorder (JFR) file named `jfr_example.jfr` in the home directory. Replace `116` with the PID of your Java app.

```shell
jcmd 116 JFR.start name=MyRecording settings=profile duration=30s filename="/home/jfr_example.jfr"
```

During the 30-second interval, you can validate the recording is taking place by running `jcmd 116 JFR.check`. The command shows all recordings for the given Java process.

#### Continuous recording

You can use Java Flight Recorder to continuously profile your Java application with minimal impact on runtime performance. To do so, run the following Azure CLI command to create an app setting named `JAVA_OPTS` with the necessary configuration. The contents of the `JAVA_OPTS` app setting are passed to the `java` command when your app starts.

```azurecli
az webapp config appsettings set -g <your_resource_group> -n <your_app_name> --settings JAVA_OPTS=-XX:StartFlightRecording=disk=true,name=continuous_recording,dumponexit=true,maxsize=1024m,maxage=1d
```

After the recording starts, you can dump the current recording data at any time by using the `JFR.dump` command.

```shell
jcmd <pid> JFR.dump name=continuous_recording filename="/home/recording1.jfr"
```

# [Windows](#tab/windows)

#### Timed recording

To take a timed recording, you need the process ID (PID) of the Java application. To find the PID, open your service in the Azure portal. Select **Development Tools** > **Advanced Tools**, then select **Go**. In Kudu, select **Process explorer**. This page shows the running processes in your web app. Find the process named "java" in the table and copy the corresponding PID.

Next, open the **Debug Console** in the top toolbar of the SCM site and run the following command. Replace `<pid>` with the PID you copied earlier. This command starts a 30-second profiler recording of your Java application and generates a file named `timed_recording_example.jfr` in the `C:\home` directory.

```
jcmd <pid> JFR.start name=TimedRecording settings=profile duration=30s filename="C:\home\timed_recording_example.JFR"
```

---

#### Analyze JFR files

Use [FTPS](deploy-ftp.md) to download your JFR file to your local machine. To analyze the JFR file, download and install [Java Mission Control (JMC)](https://www.oracle.com/java/technologies/javase/products-jmc8-downloads.html). For instructions on how to use Java Mission Control, see the [JMC documentation](https://docs.oracle.com/en/java/java-components/jdk-mission-control/) and the [installation instructions](https://www.oracle.com/java/technologies/javase/jmc8-install.html).

### App logging

# [Linux](#tab/linux)

To configure App Service to write your application's standard console output and standard console error streams to the local file system or Azure Blob Storage, do the following. Enable [application logging](troubleshoot-diagnostic-logs.md#enable-application-logging-linuxcontainer) through the Azure portal or in the [Azure CLI](https://learn.microsoft.com/cli/azure/webapp/log#az-webapp-log-config). If you need longer retention, configure the application to write output to a Blob Storage container.

**Applies to: java-javase,java-tomcat**


Your Java and Tomcat app logs can be found in the `/home/LogFiles/Application/` directory.



Azure Blob Storage logging for Linux-based apps can be configured only by using [Azure Monitor](troubleshoot-diagnostic-logs.md#send-logs-to-azure-monitor).

# [Windows](#tab/windows)

To configure App Service to write your application's standard console output and standard console error streams to the local file system or Azure Blob Storage, do the following. Enable [application logging](troubleshoot-diagnostic-logs.md#enable-application-logging-windows) through the Azure portal or in the [Azure CLI](https://learn.microsoft.com/cli/azure/webapp/log#az-webapp-log-config). Twelve hours after you enable application logging, logging to the local App Service file system instance is disabled. If you need longer retention, configure the application to write output to a Blob Storage container.

**Applies to: java-javase,java-tomcat**


Your Java and Tomcat app logs can be found in the `/home/LogFiles/Application/` directory.



---

If your application uses [Logback](https://logback.qos.ch/) or [Log4j](https://logging.apache.org/log4j) for tracing, you can forward these traces for review into Azure Application Insights. Use the logging framework configuration instructions in [Explore Java trace logs in Application Insights](https://learn.microsoft.com/previous-versions/azure/azure-monitor/app/deprecated-java-2x#explore-java-trace-logs-in-application-insights).

> **Note:**
> Due to known vulnerability [`CVE-2021-44228`](https://logging.apache.org/log4j/2.x/security.html), be sure to use Log4j version 2.16 or later.

## Customization and tuning

Azure App Service supports out-of-the-box tuning and customization through the Azure portal and the Azure CLI. Review the following articles for non-Java-specific web app configuration:

- [Configure app settings](configure-common.md#configure-app-settings)
- [Set up a custom domain](app-service-web-tutorial-custom-domain.md)
- [Configure TLS/SSL bindings](configure-ssl-bindings.md)
- [Add a CDN](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cdn/cdn-add-to-web-app.md)
- [Configure the Kudu site](https://github.com/projectkudu/kudu/wiki/Configurable-settings#linux-on-app-service-settings)

### Copy app content locally

Set the app setting `JAVA_COPY_ALL` to `true` to copy your app contents to the local worker from the shared file system. This setting helps address file-locking issues. `JAVA_COPY_ALL` is not compatible with the legacy convention of deploying to `/home/site/wwwroot/webapps`.

### Set Java runtime options

To set allocated memory or other JVM runtime options, create an [app setting](configure-common.md#configure-app-settings) named `JAVA_OPTS` with the options. App Service passes this setting as an environment variable to the Java runtime when it starts.

**Applies to: java-javase,java-jboss**


In the Azure portal, under **Application Settings** for the web app, create a new app setting named `JAVA_OPTS` that includes other settings, such as `-Xms512m -Xmx1204m`.



**Applies to: java-tomcat**


In the Azure portal, under **Application Settings** for the web app, create a new app setting named `CATALINA_OPTS` that includes other settings, such as `-Xms512m -Xmx1204m`.



To configure the app setting from the Maven plugin, add setting/value tags in the Azure plugin section. The following example sets a specific minimum and maximum Java heap size:

```xml
<appSettings>
    <property>
        <name>JAVA_OPTS</name>
        <value>-Xms1024m -Xmx1024m</value>
    </property>
</appSettings>
```

**Applies to: java-tomcat**


> **Note:**
> You don't need to create a web.config file when using Tomcat on Windows App Service.



By default, App Service sets the JVM Max Heap size to 70% of the total memory available for the App Service Plan. To disable the default setting, you can use app setting WEBSITE_DISABLE_JAVA_HEAP_CONFIGURATION=”true".

Enhancing your application's performance on the platform may involve adjusting the heap size to better suit your specific needs. When tuning application heap settings, please review your App Service plan details and consider the requirements of multiple applications and deployment slots to find the optimal memory allocation.

### Turn on web sockets

Turn on support for web sockets in the Azure portal in the **Application settings** for the application. You need to restart the application for the setting to take effect.

Turn on web socket support by using the Azure CLI with the following command:

```azurecli-interactive
az webapp config set --name <app-name> --resource-group <resource-group-name> --web-sockets-enabled true
```

Then restart your application:

```azurecli-interactive
az webapp stop --name <app-name> --resource-group <resource-group-name>
az webapp start --name <app-name> --resource-group <resource-group-name>
```

### Set default character encoding

In the Azure portal, under **Application Settings** for the web app, create a new app setting named `JAVA_OPTS` with value `-Dfile.encoding=UTF-8`.

Alternatively, you can configure the app setting by using the App Service Maven plugin. Add the setting name and value tags in the plugin configuration:

```xml
<appSettings>
    <property>
        <name>JAVA_OPTS</name>
        <value>-Dfile.encoding=UTF-8</value>
    </property>
</appSettings>
```

**Applies to: java-tomcat**


### Precompile JSP files

To improve performance of Tomcat applications, you can compile your JSP files before deploying to App Service. You can use the [Maven plugin](https://sling.apache.org/components/jspc-maven-plugin/plugin-info.html) provided by Apache Sling, or use [this Ant build file](https://tomcat.apache.org/tomcat-9.0-doc/jasper-howto.html#Web_Application_Compilation).




## Ignore the robots933456 message in logs

You might see the following message in the container logs:

```
2019-04-08T14:07:56.641002476Z "-" - - [08/Apr/2019:14:07:56 +0000] "GET /robots933456.txt HTTP/1.1" 404 415 "-" "-"
```

You can safely ignore this message. `/robots933456.txt` is a dummy URL path. App Service uses it to check if the container is capable of serving requests. A "404" error response indicates that the path doesn't exist, and it signals to App Service that the container is healthy and ready to respond to requests.


## <a name = "choosing-a-java-runtime-version"></a> Choose a Java runtime version

App Service allows users to choose the major version of the JVM, such as Java 8 or Java 11, and the patch version, like 1.8.0_232 or 11.0.5. You can also choose to have the patch version update automatically as new minor versions become available. In most cases, production apps should use pinned patch JVM versions, which prevent unanticipated outages during a patch version autoupdate. All Java web apps use 64-bit JVMs, and it's not configurable.

**Applies to: java-tomcat**


If you're using Tomcat, you can choose to pin the patch version of Tomcat. On Windows, you can pin the patch versions of the JVM and Tomcat independently. On Linux, you can pin the patch version of Tomcat. The patch version of the JVM is also pinned but isn't separately configurable.



If you choose to pin the minor version, you need to periodically update the JVM minor version on the app. To ensure that your application runs on the newer minor version, create a staging slot and increment the minor version on the staging slot. After you confirm that the application runs correctly on the new minor version, you can swap the staging and production slots.

**Applies to: java-jboss**


## Run the JBoss CLI

In your JBoss EAP app's SSH session, you can run the JBoss CLI with the following command:

```
$JBOSS_HOME/bin/jboss-cli.sh --connect
```

Depending on where JBoss EAP is in the server lifecycle, you might not be able to connect. Wait a few minutes and try again. This approach is useful for quick checks of your current server state (for example, to see if a data source is properly configured).

Also, changes you make to the server with the JBoss CLI in the SSH session don't persist after the app restarts. Each time the app starts, the JBoss EAP server begins with a clean installation. During the [startup lifecycle](#jboss-eap-server-lifecycle), App Service makes the necessary server configurations and deploys the app. To make any persistent changes in the JBoss EAP server, use a [custom startup script or a startup command](#3-server-configuration-phase). For an end-to-end example, see [Configure data sources for a Java SE, Tomcat, or JBoss EAP app in Azure App Service](configure-language-java-data-sources.md?pivots=java-jboss).

Alternatively, you can manually configure App Service to run any file on startup. For example:

```azurecli-interactive
az webapp config set --resource-group <group-name> --name <app-name> --startup-file /home/site/scripts/foo.sh
```

For more information about the CLI commands that you can run, see:

- [Red Hat JBoss EAP documentation](https://docs.redhat.com/en/documentation/red_hat_jboss_enterprise_application_platform/8.0/html-single/getting_started_with_red_hat_jboss_enterprise_application_platform/index#management-cli-overview_assembly-jboss-eap-management)
- [WildFly CLI Recipes](https://docs.jboss.org/author/display/WFLY/CLI%20Recipes.html)

## Clustering

App Service supports clustering for JBoss EAP versions 7.4.1 and greater. To enable clustering, your web app must be [integrated with a virtual network](overview-vnet-integration.md). When the web app is integrated with a virtual network, it restarts, and the JBoss EAP installation automatically starts up with a clustered configuration. When you [run multiple instances with autoscaling](https://learn.microsoft.com/azure/azure-monitor/autoscale/autoscale-get-started), the JBoss EAP instances communicate with each other over the subnet specified in the virtual network integration. You can disable clustering by creating an app setting named `WEBSITE_DISABLE_CLUSTERING` with any value.

A diagram that shows a virtual network-integrated JBoss EAP App Service app, scaled out to three instances.

> **Note:**
> If you're enabling your virtual network integration with an ARM template, you need to manually set the property `vnetPrivatePorts` to a value of `2`. If you enable virtual network integration from the CLI or portal, this property is set for you automatically.  

When clustering is enabled, the JBoss EAP instances use the `FILE_PING` JGroups discovery protocol to discover new instances and persist cluster information (for example: the cluster members, their identifiers, and their IP addresses). On App Service, these files are under `/home/clusterinfo/`. The first EAP instance to start obtains read/write permissions on the cluster membership file. Other instances read the file, find the primary node, and coordinate with that node to be included in the cluster and added to the file.

> **Note:**
> You can avoid JBoss EAP clustering timeouts by [cleaning up obsolete discovery files during your app startup](https://github.com/Azure/app-service-linux-docs/blob/master/HowTo/JBOSS/avoid_timeouts_obsolete_nodes.md).

The Premium V3, Premium V4, and Isolated V2 App Service Plan types can optionally be distributed across Availability Zones to improve resiliency and reliability for your business-critical workloads. This architecture is also known as [zone redundancy](https://learn.microsoft.com/azure/reliability/migrate-app-service). The JBoss EAP clustering feature is compatible with the zone redundancy feature.

### Autoscale rules

When you're configuring autoscale rules for horizontal scaling, it's important to remove instances incrementally (one at a time) to ensure that each removed instance can transfer its activity (such as handling a database transaction) to another member of the cluster. When you're configuring your autoscale rules in the portal to scale down, use the following options:

- **Operation**: "Decrease count by"
- **Cool down**: "5 minutes" or greater
- **Instance count**: 1

You don't need to incrementally add instances (scaling out). You can add multiple instances to the cluster at a time.

## App Service plans

<a id="jboss-eap-hardware-options"></a>

JBoss EAP is available in the following pricing tiers: **F1**,
**P0v3**, **P1mv3**, **P2mv3**, **P3mv3**, **P4mv3**, **P5mv3**, **P0v4**, **P1mv4**, **P2mv4**, **P3mv4**, **P4mv4**, and **P5mv4**.

## JBoss EAP server lifecycle

A JBoss EAP app in App Service goes through five distinct phases before launching the server:

1. [Environment setup phase](#1-environment-setup-phase)
2. [Server launch phase](#2-server-launch-phase)
3. [Server configuration phase](#3-server-configuration-phase)
4. [App deployment phase](#4-app-deployment-phase)
5. [Server reload phase](#5-server-reload-phase)

See the following sections for details and opportunities to customize (such as through [app settings](configure-common.md)).

### 1. Environment setup phase

- The SSH service is started to enable [secure SSH sessions](configure-linux-open-ssh-session.md) with the container.
- The Java runtime keystore is updated with any public and private certificates that are defined in the Azure portal.
    - Public certificates are provided by the platform in the `/var/ssl/certs` directory, and they're loaded to `$JRE_HOME/lib/security/cacerts`.
    - Private certificates are provided by the platform in the `/var/ssl/private` directory, and they're loaded to `$JRE_HOME/lib/security/client.jks`.
- If any certificates are loaded in the Java keystore in this step, the properties `javax.net.ssl.keyStore`, `javax.net.ssl.keyStorePassword`, and `javax.net.ssl.keyStoreType` are added to the `JAVA_OPTS` environment variable.
- Some initial JVM configuration is determined, like logging directories and Java memory heap parameters:
    - If you provide the `–Xms` or `–Xmx` flags for memory in the app setting `JAVA_OPTS`, these values override the ones provided by the platform.
    - If you configure the app setting `WEBSITES_CONTAINER_STOP_TIME_LIMIT`, the value is passed to the runtime property `org.wildfly.sigterm.suspend.timeout`, which controls the maximum shutdown wait time (in seconds) when JBoss EAP is being stopped.
- If the app is integrated with a virtual network, the App Service runtime passes a list of ports to be used for inter-server communication in the environment variable `WEBSITE_PRIVATE_PORTS` and launches JBoss EAP by using the `clustering` configuration. Otherwise, the `standalone` configuration is used.
    - For the `clustering` configuration, the server configuration file `standalone-azure-full-ha.xml` is used.
    - For the `standalone` configuration, the server configuration file `standalone-full.xml` is used.

### 2. Server launch phase

- If JBoss EAP is launched in the `clustering` configuration:
    - Each JBoss EAP instance receives an internal identifier between 0 and the number of instances that the app is scaled out to.
    - If some files are found in the transaction store path for this server instance (by using its internal identifier), it means this server instance is taking the place of an identical service instance. The other service instance previously crashed and left uncommitted transactions behind. The server is configured to resume the work on these transactions.
- Regardless of whether JBoss EAP starts in the `clustering` or `standalone` configuration, if the server version is 7.4 or later and the runtime uses Java 17, then the configuration is updated to enable the Elytron subsystem for security.
- If you configure the app setting `WEBSITE_JBOSS_OPTS`, the value is passed to the JBoss launcher script. This setting can be used to provide paths to property files and more flags that influence the startup of JBoss EAP.

### 3. Server configuration phase

- At the start of this phase, App Service first waits for both the JBoss EAP server and the admin interface to be ready to receive requests before continuing. This process can take a few more seconds if Application Insights is enabled.
- When both JBoss EAP Server and the admin interface are ready, App Service takes the following actions:
    - Adds the JBoss EAP module `azure.appservice`, which provides utility classes for logging and integration with App Service.
    - Updates the console logger to use a colorless mode so that log files aren't full of color-escaping sequences.
    - Sets up the integration with Azure Monitor logs.
    - Updates the binding IP addresses of the Web Services Description Language (WSDL) and management interfaces.
    - Adds the JBoss EAP module `azure.appservice.easyauth` for integration with [App Service authentication](overview-authentication-authorization.md) and Microsoft Entra ID.
    - Updates the logging configuration of access logs and the name and rotation of the main server log file.
- Unless the app setting `WEBSITE_SKIP_AUTOCONFIGURE_DATABASE` is defined, App Service autodetects Java Database Connectivity (JDBC) URLs in the App Service app settings. If valid JDBC URLs exist for PostgreSQL, MySQL, MariaDB, Oracle, SQL Server, or Azure SQL Database, it adds the corresponding drivers to the server, adds a data source for each of the JDBC URLs, and sets the Java Naming and Directory Interface (JNDI) name for each data source to `java:jboss/env/jdbc/<app-setting-name>_DS`, where `<app-setting-name>` is the name of the app setting.
- If the `clustering` configuration is enabled, the console logger to be configured is checked. 
- If there are JAR files deployed to the `/home/site/libs` directory, a new global module is created with all of these JAR files.
- At the end of the phase, App Service runs the custom startup script, if one exists. The search logic for the custom startup script is defined as follows:

  - If you configured a startup command (for example, through the Azure portal or the Azure CLI), run it; otherwise,
  - If the path `/home/site/scripts/startup.sh` exists, use it; otherwise,
  - If the path `/home/startup.sh` exists, use it.

The custom startup command or script runs as the root user (no need for `sudo`), so they can install Linux packages or launch the JBoss CLI to perform more JBoss EAP install/customization commands like creating data sources and installing resource adapters. For information on Ubuntu package management commands, see the [Ubuntu Server documentation](https://documentation.ubuntu.com/server/how-to/software/package-management/). For JBoss CLI commands, see the [JBoss Management CLI Guide](https://docs.redhat.com/en/documentation/red_hat_jboss_enterprise_application_platform/7.4/html-single/management_cli_guide/index#how_to_cli).

### 4. App deployment phase 

The startup script deploys apps to JBoss EAP by looking in the following locations, in order of precedence:

- If you configured the app setting `WEBSITE_JAVA_WAR_FILE_NAME`, deploy the file designated by it.
- If `/home/site/wwwroot/app.war` exists, deploy it.
- If any other EAR and WAR files exist in `/home/site/wwwroot`, deploy them.
- If `/home/site/wwwroot/webapps` exists, deploy the files and directories in it. WAR files are deployed as applications themselves, and directories are deployed as "exploded" (uncompressed) web apps. 
- If any standalone JSP pages exist in `/home/site/wwwroot`, copy them to the web server root and deploy them as one web app.
- If no deployable files are found, deploy the default welcome page (parking page) in the root context.

### 5. Server reload phase 

- After the deployment steps are complete, the JBoss EAP server is reloaded to apply any changes that require a server reload.
- After the server reloads, the applications deployed to the JBoss EAP server should be ready to respond to requests.
- The server runs until the App Service app is stopped or restarted. You can manually stop or restart the App Service app, or you trigger a restart when you deploy files or make configuration changes to the App Service app. 
- If the JBoss EAP server exits abnormally in the `clustering` configuration, a final function called `emit_alert_tx_store_not_empty` is executed. The function checks if the JBoss EAP process left a nonempty transaction store file in disk. If so, an error is logged in the console: `Error: finishing server with non-empty store for node XXXX`. When a new server instance is started, it looks for these nonempty transaction store files to resume the work (see [2. Server launch phase](#2-server-launch-phase)). 



**Applies to: java-tomcat**


## Tomcat baseline configuration

> **Note:**
> This section applies to Linux only.

Java developers can customize the server settings, troubleshoot issues, and deploy applications to Tomcat with confidence if they know about the server.xml file and configuration details of Tomcat. Possible customizations include:

* Customizing Tomcat configuration: When you understand the server.xml file and Tomcat's configuration details, you can fine-tune the server settings to match the needs of their applications.
* Debugging: When an application is deployed on a Tomcat server, developers need to know the server configuration to debug any issues that might arise. This process includes checking the server logs, examining the configuration files, and identifying any errors that might be occurring.
* Troubleshooting Tomcat issues: Inevitably, Java developers encounter issues with their Tomcat server, such as performance problems or configuration errors. When you understand the server.xml file and Tomcat's configuration details, developers can quickly diagnose and troubleshoot these issues, which can save time and effort.
* Deploying applications to Tomcat: To deploy a Java web application to Tomcat, developers need to know how to configure the server.xml file and other Tomcat settings. You need to understand these details to deploy applications successfully and ensure that they run smoothly on the server.

When you create an app with built-in Tomcat to host your Java workload (a WAR file or a JAR file), there are certain settings that you get out of the box for Tomcat configuration. You can refer to the [official Apache Tomcat documentation](https://tomcat.apache.org/) for detailed information, including the default configuration for Tomcat Web Server.

Additionally, there are certain transformations that are applied on top of the server.xml for Tomcat distribution upon start. These transformations include changes to the **Connector**, **Host**, and **Valve** settings.

The latest versions of Tomcat have server.xml (8.5.58 and 9.0.38 onward). Older versions of Tomcat don't use transforms and might have different behavior as a result.

### Connector

```xml 
<Connector port="${port.http}" address="127.0.0.1" maxHttpHeaderSize="16384" compression="on" URIEncoding="UTF-8" connectionTimeout="${site.connectionTimeout}" maxThreads="${catalina.maxThreads}" maxConnections="${catalina.maxConnections}" protocol="HTTP/1.1" redirectPort="8443"/>
 ```
* `maxHttpHeaderSize` is set to `16384`.
* `URIEncoding` is set to `UTF-8`.
* `connectionTimeout` is set to `WEBSITE_TOMCAT_CONNECTION_TIMEOUT`, which defaults to `240000`.
* `maxThreads` is set to `WEBSITE_CATALINA_MAXTHREADS`, which defaults to `200`.
* `maxConnections` is set to `WEBSITE_CATALINA_MAXCONNECTIONS`, which defaults to `10000`.
 
> **Note:**
> The `connectionTimeout`, `maxThreads`, and `maxConnections` settings can be tuned with app settings.

Following are example CLI commands that you might use to alter the values of `connectionTimeout`, `maxThreads`, or `maxConnections`:

```azurecli-interactive
az webapp config appsettings set --resource-group myResourceGroup --name myApp --settings WEBSITE_TOMCAT_CONNECTION_TIMEOUT=120000
```
```azurecli-interactive
az webapp config appsettings set --resource-group myResourceGroup --name myApp --settings WEBSITE_CATALINA_MAXTHREADS=100
```
```azurecli-interactive
az webapp config appsettings set --resource-group myResourceGroup --name myApp --settings WEBSITE_CATALINA_MAXCONNECTIONS=5000
```

Connector uses the address of the container instead of 127.0.0.1.

### Host

```xml
<Host appBase="${site.appbase}" xmlBase="${site.xmlbase}" unpackWARs="${site.unpackwars}" workDir="${site.tempdir}" errorReportValveClass="com.microsoft.azure.appservice.AppServiceErrorReportValve" name="localhost" autoDeploy="true">
```

* `appBase` is set to `AZURE_SITE_APP_BASE`, which defaults to local `WebappsLocalPath`.
* `xmlBase` is set to `AZURE_SITE_HOME`, which defaults to `/site/wwwroot`.
* `unpackWARs` is set to `AZURE_UNPACK_WARS`, which defaults to `true`.
* `workDir` is set to `JAVA_TMP_DIR`, which defaults `TMP`.
* `errorReportValveClass` uses our custom error report valve.
 
### Valve

```xml
<Valve prefix="site_access_log.${catalina.instance.name}" pattern="%h %l %u %t &quot;%r&quot; %s %b %D %{x-arr-log-id}i" directory="${site.logdir}/http/RawLogs" maxDays="${site.logRetentionDays}" className="org.apache.catalina.valves.AccessLogValve" suffix=".txt"/>
 ```
* `directory` is set to `AZURE_LOGGING_DIR`, which defaults to `home\logFiles`.
* `maxDays` is set to `WEBSITE_HTTPLOGGING_RETENTION_DAYS`, which defaults to `7`. This value aligns with the application-logging platform default.
 
On Linux, it has all of the same customization, and it adds some error and reporting pages to the valve:

```xml
<xsl:attribute name="appServiceErrorPage">
    <xsl:value-of select="'${appService.valves.appServiceErrorPage}'"/>
</xsl:attribute>
    
<xsl:attribute name="showReport">
    <xsl:value-of select="'${catalina.valves.showReport}'"/>
</xsl:attribute>
    
<xsl:attribute name="showServerInfo">
    <xsl:value-of select="'${catalina.valves.showServerInfo}'"/>
</xsl:attribute>
```



## Related content

Visit the [Azure for Java Developers](https://learn.microsoft.com/java/azure/) center to find Azure quickstarts, tutorials, and Java reference documentation.

- [App Service Linux FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/faq-app-service-linux.yml)
- [Environment variables and app settings reference](reference-app-settings.md)
