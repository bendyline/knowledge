---
title: Quickstart - Deploy Your First Java Native Image Application to Azure Spring Apps
description: Describes how to deploy a Java Native Image application to Azure Spring Apps.
author: KarlErickson
ms.service: azure-spring-apps
ms.topic: quickstart
ms.date: 08/19/2025
ms.update-cycle: 1095-days
ms.custom: devx-track-java, devx-track-extended-java, devx-track-azurecli, mode-other, engagement-fy23, references_regions
ms.author: karler
ms.reviewer: yili7
---

# Quickstart: Deploy your first Java Native Image application to Azure Spring Apps


> **Note:**
> The **Basic**, **Standard**, and **Enterprise** plans entered a retirement period on March 17, 2025. For more information, see the [Azure Spring Apps retirement announcement](../basic-standard/retirement-announcement.md).


**This article applies to:** ❎ Basic/Standard ✅ Enterprise

This quickstart shows how to deploy a Spring Boot application to Azure Spring Apps as a Native Image.

[Native Image](https://www.graalvm.org/latest/reference-manual/native-image/) capability enables you to compile Java applications to standalone executables, known as Native Images. These executables can provide significant benefits, including faster startup times and lower runtime memory overhead compared to a traditional JVM (Java Virtual Machine).

The sample project is the Spring Petclinic application. The following screenshot shows the application:

Screenshot of a Spring Petclinic application in Azure Spring Apps.

## 1. Prerequisites

- An Azure subscription. If you don't have a subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.
- [Git](https://git-scm.com/downloads).
- [Java Development Kit (JDK)](https://learn.microsoft.com/java/azure/jdk/), version 17.
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) version 2.45.0 or higher. Use the following command to install the Azure Spring Apps extension: `az extension add --name spring`


<!--
For clarity of structure, a separate markdown file is used to describe how to deploy to Azure Spring Apps enterprise plan.

[!INCLUDE [deploy-to-azure-spring-apps-enterprise-plan](includes/quickstart-deploy-java-native-image-app/deploy-enterprise-plan.md)]

-->

## 2. Prepare the Spring Petclinic project

Use the following steps to clone and run the app locally.

1. Use the following command to clone the Spring Petclinic project from GitHub:

   ```bash
   git clone https://github.com/Azure-Samples/spring-petclinic.git
   ```

2. Use the following command to build the Spring Petclinic project:

   ```bash
   cd spring-petclinic
   ./mvnw clean package -DskipTests -Pnative package
   ```

3. Use the following command to run the Spring Petclinic application by using Maven:

   ```bash
   java -jar target/spring-petclinic-3.1.0-SNAPSHOT.jar
   ```

4. Go to `http://localhost:8080` in your browser to access the Spring Petclinic application.

## 3. Prepare the cloud environment

The main resource required to run Spring Petclinic application is an Azure Spring Apps instance. This section provides the steps to create the resource.

### 3.1. Provide names for each resource

Create variables to hold the resource names by using the following commands. Be sure to replace the placeholders with your own values.

```azurecli
export RESOURCE_GROUP=<resource-group-name>
export LOCATION=<location>
export AZURE_SPRING_APPS_NAME=<Azure-Spring-Apps-service-instance-name>
export NATIVE_BUILDER=native-builder
export JAR_APP_NAME=jar-app
export NATIVE_APP_NAME=native-app
export JAR_PATH=target/spring-petclinic-3.1.0-SNAPSHOT.jar
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

### 3.3. Create an Azure Spring Apps instance

Azure Spring Apps is used to host the Spring Petclinic app. Use the following steps to create an Azure Spring Apps instance and two applications inside it:

1. Use the following command to create an Azure Spring Apps service instance. A native image build requires 16 Gi of memory during image build, so configure the build pool size as S7.

   ```azurecli
   az spring create \
       --name ${AZURE_SPRING_APPS_NAME} \
       --sku enterprise \
       --build-pool-size S7
   ```

1. Create a **builder-native.json** file in the current directory and then add the following content:

   ```json
   {
      "stack": {
        "id": "io.buildpacks.stacks.jammy",
        "version": "tiny"
      },
      "buildpackGroups": [
        {
          "name": "default",
          "buildpacks": [
            {
              "id": "tanzu-buildpacks/java-native-image"
            }
          ]
        }
      ]
    }  
   ```

1. Use the following command to create a custom builder to build the Native Image application:

   ```azurecli
   az spring build-service builder create \
       --service ${AZURE_SPRING_APPS_NAME} \
       --name ${NATIVE_BUILDER} \
       --builder-file builder-native.json
   ```

1. Use the following command to create an application in the Azure Spring Apps instance in which to deploy the Spring Petclinic application as a JAR file. Configure the memory limit to 1 Gi.

   ```azurecli
   az spring app create \
       --service ${AZURE_SPRING_APPS_NAME} \
       --name ${JAR_APP_NAME} \
       --cpu 1 \
       --memory 1Gi \
       --assign-endpoint true
   ```

1. Use the following command to create an application in the Azure Spring Apps instance in which to deploy the Spring Petclinic application as a Native Image:

   ```azurecli
   az spring app create \
       --service ${AZURE_SPRING_APPS_NAME} \
       --name ${NATIVE_APP_NAME} \
       --cpu 1 \
       --memory 1Gi \
       --assign-endpoint true
   ```

## 4. Deploy the app to Azure Spring Apps

Now that the cloud environment is prepared, the applications are ready to deploy.

Use the following command to deploy the Spring Petclinic application as a JAR file:

```azurecli
az spring app deploy \
    --service ${AZURE_SPRING_APPS_NAME} \
    --name ${JAR_APP_NAME} \
    --artifact-path ${JAR_PATH} \
    --build-env BP_JVM_VERSION=17
```

Use the following command to deploy the Spring Petclinic application as a Native Image:

```azurecli
az spring app deploy \
    --service ${AZURE_SPRING_APPS_NAME} \
    --name ${NATIVE_APP_NAME} \
    --builder ${NATIVE_BUILDER} \
    --build-cpu 8 \
    --build-memory 16Gi \
    --artifact-path ${JAR_PATH} \
    --build-env BP_JVM_VERSION=17 BP_NATIVE_IMAGE=true
```


## 5. Validate Native Image App

Now you can access the deployed Native Image app to see whether it works. Use the following steps to validate:

1. After the deployment has completed, you can run the following command to get the app URL:

   ```azurecli
   az spring app show \
       --service ${AZURE_SPRING_APPS_NAME} \
       --name ${NATIVE_APP_NAME} \
       --output table
   ```

   You can access the app with the URL shown in the output as `Public Url`. The page should appear as you saw it o localhost.

1. Use the following command to check the app's log to investigate any deployment issue:

   ```azurecli
   az spring app logs \
       --service ${AZURE_SPRING_APPS_NAME} \
       --name ${NATIVE_APP_NAME}
   ```

## 6. Compare performance for JAR and Native Image

The following sections describe how to compare the performance between JAR and Native Image deployment.

### Server startup time

Use the following command to check the app's log `Started PetClinicApplication in XXX seconds` to get the server startup time for a JAR app:

```azurecli
az spring app logs \
    --service ${AZURE_SPRING_APPS_NAME} \
    --name ${JAR_APP_NAME}
```

The server startup time is around 25 s for a JAR app.

Use the following command to check the app's log to get the server startup time for a Native Image app:

```azurecli
az spring app logs \
    --service ${AZURE_SPRING_APPS_NAME} \
    --name ${NATIVE_APP_NAME}
```

The server startup time is less than 0.5 s for a Native Image app.

### Memory usage

Use the following command to scale down the memory size to 512 Mi for a Native Image app:

```azurecli
az spring app scale \
    --service ${AZURE_SPRING_APPS_NAME} \
    --name ${NATIVE_APP_NAME} \
    --memory 512Mi
```

The command output should show that the Native Image app started successfully.

Use the following command to scale down the memory size to 512 Mi for the JAR app:

```azurecli
az spring app scale \
    --service ${AZURE_SPRING_APPS_NAME} \
    --name ${JAR_APP_NAME} \
    --memory 512Mi
```

The command output should show that the JAR app failed to start due to insufficient memory. The output message should be similar to the following example: `Terminating due to java.lang.OutOfMemoryError: Java heap space`.

The following figure shows the optimized memory usage for the Native Image deployment for a constant workload of 400 requests per second into the Petclinic application. The memory usage is about 1/5th of the memory consumed by its equivalent JAR deployment.

Screenshot of the optimized memory usage of a Native Image deployment in Azure Spring Apps.

Native Images offer quicker startup times and reduced runtime memory overhead when compared to the conventional Java Virtual Machine (JVM).

## 7. Clean up resources

If you plan to continue working with subsequent quickstarts and tutorials, you might want to leave these resources in place. When you no longer need the resources, delete them by deleting the resource group. Use the following command to delete the resource group:

```azurecli
az group delete --name ${RESOURCE_GROUP}
```

## 8. Next steps

> 
> [How to deploy Java Native Image apps in the Azure Spring Apps Enterprise plan](how-to-enterprise-deploy-polyglot-apps.md#deploy-java-native-image-applications-preview)

> 
> [Structured application log for Azure Spring Apps](../basic-standard/structured-app-log.md?toc=/azure/spring-apps/enterprise/toc.json&bc=/azure/spring-apps/enterprise/breadcrumb/toc.json)

> 
> [Map an existing custom domain to Azure Spring Apps](../basic-standard/how-to-custom-domain.md?toc=/azure/spring-apps/enterprise/toc.json&bc=/azure/spring-apps/enterprise/breadcrumb/toc.json)

> 
> [Set up Azure Spring Apps CI/CD with GitHub Actions](../basic-standard/how-to-github-actions.md?toc=/azure/spring-apps/enterprise/toc.json&bc=/azure/spring-apps/enterprise/breadcrumb/toc.json)

> 
> [Set up Azure Spring Apps CI/CD with Azure DevOps](../basic-standard/how-to-cicd.md?toc=/azure/spring-apps/enterprise/toc.json&bc=/azure/spring-apps/enterprise/breadcrumb/toc.json)

> 
> [Use managed identities for applications in Azure Spring Apps](../basic-standard/how-to-use-managed-identities.md?toc=/azure/spring-apps/enterprise/toc.json&bc=/azure/spring-apps/enterprise/breadcrumb/toc.json)

> 
> [Create a service connection in Azure Spring Apps with the Azure CLI](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-connector/quickstart-cli-spring-cloud-connection.md)

> 
> [Run the polyglot ACME fitness store apps on Azure Spring Apps](quickstart-sample-app-acme-fitness-store-introduction.md)

> 
> [Monitor your Spring Boot Native Image application](https://aka.ms/AzMonSpringNative)

For more information, see the following articles:

- [Azure Spring Apps Samples](https://github.com/Azure-Samples/azure-spring-apps-samples).
- [Spring on Azure](https://learn.microsoft.com/azure/developer/java/spring/)
- [Spring Cloud Azure](https://learn.microsoft.com/azure/developer/java/spring-framework/)
