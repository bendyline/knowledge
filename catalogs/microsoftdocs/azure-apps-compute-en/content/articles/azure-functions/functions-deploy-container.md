---
title: Create your first containerized Azure Functions
description: Get started by deploying your first function app from a Linux image in a container registry to Azure Functions.
ms.date: 08/08/2026
ms.topic: quickstart
ms.custom: build-2023, devx-track-azurecli, devx-track-azurepowershell, devx-track-extended-java, devx-track-js, devx-track-python, linux-related-content, devx-track-ts
zone_pivot_groups: programming-languages-set-functions-no-go
---

# Create your first containerized Azure Functions 

In this article, you create a function app running in a Linux container and deploy it to Azure Functions. 

Deploying your function code to Azure Functions in a container requires [Premium plan](functions-premium-plan.md) or [Dedicated (App Service) plan](dedicated-plan.md) hosting. Completing this article incurs costs of a few US dollars in your Azure account, which you can minimize by [cleaning-up resources](#clean-up-resources) when you're done.

> **Tip:**
> For most containerized workloads, host your function apps in Azure Container Apps instead of in a Premium or Dedicated plan. Container Apps provides a fully managed, serverless environment with built-in event-driven scaling, scale-to-zero, and GPU support. To get started, see [Create your first containerized functions on Azure Container Apps](../container-apps/functions-usage.md). 


## Choose your development language

First, you use Azure Functions tools to create your project code as a function app in a Docker container by using a language-specific Linux base image. Make sure to select your language of choice at the top of the article. 

Core Tools automatically generates a Dockerfile for your project that uses the most up-to-date version of the correct base image for your functions language. You should regularly update your container from the latest base image and redeploy from the updated version of your container. For more information, see [Create containerized function apps](functions-how-to-custom-container.md#creating-containerized-function-apps).

## Prerequisites 

Before you begin, you must have the following requirements in place:

**Applies to: programming-language-csharp**

+ Install the [.NET SDK](https://dotnet.microsoft.com/download).

+ Install [Azure Functions Core Tools](functions-run-local.md#install-the-azure-functions-core-tools) version 4.0.5198 or later.

<!---add back programming-language-other-->
**Applies to: programming-language-java,programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python**

+ Install [Azure Functions Core Tools](functions-run-local.md#install-the-azure-functions-core-tools) version 4.x.

**Applies to: programming-language-javascript,programming-language-typescript**

+ Install a version of [Node.js](https://nodejs.org) that's [supported by Azure Functions](functions-reference-node.md#programming-model).


**Applies to: programming-language-python**

+ Install a version of Python that's [supported by Azure Functions](functions-reference-python.md#supported-python-versions). 

**Applies to: programming-language-powershell**

+ Install the [.NET SDK](https://dotnet.microsoft.com/download).

**Applies to: programming-language-java**

+ Install a version of the [Java Developer Kit](https://learn.microsoft.com/azure/developer/java/fundamentals/java-support-on-azure) that's [supported by Azure Functions](functions-reference-java.md#supported-versions).

+ Install [Apache Maven](https://maven.apache.org) version 3.0 or later.

<!---removing the other pivot until we camn get ACA tested with custom handlers
::: zone pivot="programming-language-other"
+ Development tools for the language you're using. This tutorial uses the [R programming language](https://www.r-project.org/) as an example.
::: zone-end
-->
+ Install the [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) version 2.4 or later.

If you don't have an Azure subscription, [create a free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

<!---Requirements specific to Docker -->
To publish the containerized function app image you create to a container registry, you need a Docker ID and [Docker Desktop](https://docs.docker.com/install/) running on your local computer. If you don't have a Docker ID, you can [create a Docker account](https://hub.docker.com/signup).

### [Azure Container Registry](#tab/acr)

You also need to complete the [Create a container registry](https://learn.microsoft.com/azure/container-registry/container-registry-get-started-portal#create-a-container-registry) section of the Container Registry quickstart. Make a note of your fully qualified login server name.

### [Docker Hub](#tab/docker)

You should be all set.

---

**Applies to: programming-language-python**

## <a name="create-venv"></a>Create and activate a virtual environment

In a suitable folder, run the following commands to create and activate a virtual environment named `.venv`. Make sure to use one of the [Python versions](functions-reference-python.md#supported-python-versions) supported by Azure Functions.

# [bash](#tab/bash)

```bash
python -m venv .venv
```

```bash
source .venv/bin/activate
```

If Python didn't install the venv package on your Linux distribution, run the following command:

```bash
sudo apt-get install python3-venv
```

# [PowerShell](#tab/powershell)

```powershell
py -m venv .venv
```

```powershell
.venv\scripts\activate
```

# [Cmd](#tab/cmd)

```cmd
py -m venv .venv
```

```cmd
.venv\scripts\activate
```

---

You run all subsequent commands in this activated virtual environment.



## Create and test the local functions project

**Applies to: programming-language-csharp,programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python**

In a terminal or command prompt, run the following command for your chosen language to create a function app project in the current folder:  

**Applies to: programming-language-csharp**


```console
func init --worker-runtime dotnet-isolated --docker
```

**Applies to: programming-language-javascript**

```console
func init --worker-runtime node --language javascript --docker
```

**Applies to: programming-language-powershell**

```console
func init --worker-runtime powershell --docker
```

**Applies to: programming-language-python**

```console
func init --worker-runtime python --docker
```

**Applies to: programming-language-typescript**

```console
func init --worker-runtime node --language typescript --docker
```

**Applies to: programming-language-java**

In an empty folder, run the following command to generate the Functions project from a [Maven archetype](https://maven.apache.org/guides/introduction/introduction-to-archetypes.html):

### [Bash](#tab/bash)
```bash
mvn archetype:generate -DarchetypeGroupId=com.microsoft.azure -DarchetypeArtifactId=azure-functions-archetype -DjavaVersion=8 -Ddocker
```
### [PowerShell](#tab/powershell)
```powershell
mvn archetype:generate "-DarchetypeGroupId=com.microsoft.azure" "-DarchetypeArtifactId=azure-functions-archetype" "-DjavaVersion=8" "-Ddocker"
```
### [Cmd](#tab/cmd)
```cmd
mvn archetype:generate "-DarchetypeGroupId=com.microsoft.azure" "-DarchetypeArtifactId=azure-functions-archetype" "-DjavaVersion=8" "-Ddocker"
```
---

The `-DjavaVersion` parameter tells the Functions runtime which version of Java to use. Use `-DjavaVersion=11` if you want your functions to run on Java 11. When you don't specify `-DjavaVersion`, Maven defaults to Java 8. For more information, see [Java versions](functions-reference-java.md#java-versions).

> **Important:**
> The `JAVA_HOME` environment variable must be set to the install location of the correct version of the JDK to complete this article.

Maven asks you for values needed to finish generating the project on deployment.
Follow the prompts and provide the following information:

| Prompt | Value | Description |
| --- | --- | --- |
| **groupId** | `com.fabrikam` | A value that uniquely identifies your project across all projects, following the [package naming rules](https://docs.oracle.com/javase/specs/jls/se6/html/packages.html#7.7) for Java. |
| **artifactId** | `fabrikam-functions` | A value that is the name of the jar, without a version number. |
| **version** | `1.0-SNAPSHOT` | Select the default value. |
| **package** | `com.fabrikam.functions` | A value that is the Java package for the generated function code. Use the default. |

Type `Y` or press Enter to confirm.

Maven creates the project files in a new folder named _artifactId_, which in this example is `fabrikam-functions`.

<!---
:: zone pivot="programming-language-other"  
```console
func init --worker-runtime custom --docker
```
::: zone-end
-->
The `--docker` option generates a *Dockerfile* for the project, which defines a suitable container for use with Azure Functions and the selected runtime.

**Applies to: programming-language-java**

Navigate into the project folder:

```console
cd fabrikam-functions
```

**Applies to: programming-language-csharp**

Use the following command to add a function to your project, where the `--name` argument is the unique name of your function and the `--template` argument specifies the function's trigger. `func new` creates a C# code file in your project.

```console
func new --name HttpExample --template "HTTP trigger"
```

<!---add back programming-language-other-->
**Applies to: programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python**

Use the following command to add a function to your project, where the `--name` argument is the unique name of your function and the `--template` argument specifies the function's trigger. `func new` creates a subfolder matching the function name that contains a configuration file named *function.json*.

```console
func new --name HttpExample --template "HTTP trigger"
```

To test the function locally, start the local Azure Functions runtime host in the root of the project folder.
To ensure the function can be called later when hosted in Docker, check that the authorization level is set to `AuthorizationLevel.Anonymous`, or set it if not already configured.
**Applies to: programming-language-csharp**

```console
func start  
```

**Applies to: programming-language-javascript,programming-language-powershell,programming-language-python**

```console
func start  
```

**Applies to: programming-language-typescript**

```console
npm install
npm start
```

**Applies to: programming-language-java**

```console
mvn clean package  
mvn azure-functions:run
```

**Applies to: programming-language-csharp**

After you see the `HttpExample` endpoint written to the output, navigate to that endpoint. You should see a welcome message in the response output.

**Applies to: programming-language-java,programming-language-javascript,programming-language-powershell,programming-language-python**

After you see the `HttpExample` endpoint written to the output, navigate to `http://localhost:7071/api/HttpExample?name=Functions`. The browser must display a "hello" message that echoes back `Functions`, the value supplied to the `name` query parameter.


Press **Ctrl**+**C** (**Command**+**C** on macOS) to stop the host.

## Build the container image and verify locally

(Optional) Examine the _Dockerfile_ in the root of the project folder. The _Dockerfile_ describes the required environment to run the function app on Linux. The complete list of supported base images for Azure Functions can be found in the [Azure Functions base image page](https://hub.docker.com/r/microsoft/azure-functions-base).

In the root project folder, run the [docker build](https://docs.docker.com/reference/cli/docker/image/build/) command, provide a name as `azurefunctionsimage`, and tag as `v1.0.0`. Replace `<DOCKER-ID>` with your Docker Hub account ID. This command builds the Docker image for the container.

```console
docker build --tag <DOCKER-ID>/azurefunctionsimage:v1.0.0 .
```

When the command completes, you can run the new container locally.

To verify the build, run the image in a local container using the [docker run](https://docs.docker.com/reference/cli/docker/container/run/) command, replace `<DOCKER-ID>` again with your Docker Hub account ID, and add the ports argument as `-p 8080:80`:

```console
docker run -p 8080:80 -it <DOCKER-ID>/azurefunctionsimage:v1.0.0
```

**Applies to: programming-language-csharp**

After the image starts in the local container, browse to `http://localhost:8080/api/HttpExample`, which must display the same greeting message as before. Because the HTTP triggered function you created uses anonymous authorization, you can call the function running in the container without having to obtain an access key. For more information, see [authorization keys].

**Applies to: programming-language-java,programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python**

After the image starts in the local container, browse to `http://localhost:8080/api/HttpExample?name=Functions`, which must display the same "hello" message as before. Because the HTTP triggered function you created uses anonymous authorization, you can call the function running in the container without having to obtain an access key. For more information, see [authorization keys].


After verifying the function app in the container, press **Ctrl**+**C** (**Command**+**C** on macOS) to stop execution.

## Publish the container image to a registry 

To make your container image available for deployment to a hosting environment, you must push it to a container registry. As a security best practice, you should use an Azure Container Registry instance and enforce managed identity-based connections. Docker Hub requires you to authenticate using shared secrets, which make your deployments more vulnerable.   

### [Azure Container Registry](#tab/acr)

Azure Container Registry is a private registry service for building, storing, and managing container images and related artifacts. You should use a private registry service for publishing your containers to Azure services.

1. Use this command to sign in to your registry instance using your current Azure credentials. Replace `<REGISTRY-NAME>` with the name of your Container Registry instance.

    ```azurecli
    az acr login --name <REGISTRY-NAME>
    ```

1. Use this command to tag your image with the fully qualified name of your registry login server. Replace `<LOGIN-SERVER>` with the fully qualified name of your registry login server and `<DOCKER-ID>` with your Docker ID.

    ```docker
    docker tag <DOCKER-ID>/azurefunctionsimage:v1.0.0 <LOGIN-SERVER>/azurefunctionsimage:v1.0.0 
    ```

1.  Use this command to push the container to your registry instance:
 
    ```docker
    docker push <LOGIN-SERVER>/azurefunctionsimage:v1.0.0
    ```
 
### [Docker Hub](#tab/docker)

Docker Hub is a container registry that hosts images and provides image and container services. 

1. If you haven't already signed in to Docker, do so with the [`docker login`](https://docs.docker.com/reference/cli/docker/login/) command. This command prompts you for your username and password. A "sign in succeeded" message confirms that you're signed in.

    ```console
    docker login
    ```

1. After you've signed in, push the image to Docker Hub by using the [`docker push`](https://docs.docker.com/reference/cli/docker/image/push/) command, again replace the `<DOCKER-ID>` with your Docker Hub account ID.

    ```console
    docker image push <DOCKER-ID>/azurefunctionsimage:v1.0.0
    ```

    Depending on your network speed, pushing the image for the first time might take a few minutes. Subsequent changes are pushed faster. 

---

[authorization keys]: functions-bindings-http-webhook-trigger.md#authorization-keys


## Create supporting Azure resources for your function

Before you can deploy your container to Azure, you need to create three resources:

* A [resource group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/overview.md), which is a logical container for related resources.
* A [Storage account](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-create.md), which is used to maintain state and other information about your functions.
* A function app, which provides the environment for executing your function code. A function app maps to your local function project and lets you group functions as a logical unit for easier management, deployment, and sharing of resources. 

>**Important:**
>This article currently shows how to connect to both the Azure Storage account and your container registry by using connection strings and other shared secret credentials. For the best security, use only a managed identity-based connection to both your storage account and to Azure Container Registry using Microsoft Entra authentication. For more information, see the [Functions developer guide](manage-connections.md).

Use the following commands to create these items. Both Azure CLI and PowerShell are supported. To create your Azure resources by using Azure PowerShell, you also need the [Az PowerShell module](https://learn.microsoft.com/powershell/azure/install-az-ps), version 5.9.0 or later.

1. If you didn't already, sign in to Azure.

    # [Azure CLI](#tab/azure-cli)
    ```azurecli
    az login
    ```

    The [`az login`](https://learn.microsoft.com/cli/azure/reference-index#az-login) command signs you into your Azure account.

    # [Azure PowerShell](#tab/azure-powershell) 
    ```azurepowershell
    Connect-AzAccount
    ```

    The [Connect-AzAccount](https://learn.microsoft.com/powershell/module/az.accounts/connect-azaccount) cmdlet signs you into your Azure account.

    ---

1. Create a resource group named `AzureFunctionsContainers-rg` in your chosen region.

    # [Azure CLI](#tab/azure-cli)
    
    ```azurecli
    az group create --name AzureFunctionsContainers-rg --location <REGION>
    ```
 
    The [`az group create`](https://learn.microsoft.com/cli/azure/group#az-group-create) command creates a resource group. In the preceding command, replace `<REGION>` with a region near you, using an available region code returned from the [az account list-locations](https://learn.microsoft.com/cli/azure/account#az-account-list-locations) command.

    # [Azure PowerShell](#tab/azure-powershell)

    ```azurepowershell
    New-AzResourceGroup -Name AzureFunctionsContainers-rg -Location <REGION>
    ```

    The [`New-AzResourceGroup`](https://learn.microsoft.com/powershell/module/az.resources/new-azresourcegroup) command creates a resource group. You generally create your resource group and resources in a region near you, using an available region returned from the [`Get-AzLocation`](https://learn.microsoft.com/powershell/module/az.resources/get-azlocation) cmdlet.

    ---

1. Create a general-purpose storage account in your resource group and region.

    # [Azure CLI](#tab/azure-cli)

    ```azurecli
    az storage account create --name <STORAGE_NAME> --location <REGION> --resource-group AzureFunctionsContainers-rg --sku Standard_LRS
    ```

    The [`az storage account create`](https://learn.microsoft.com/cli/azure/storage/account#az-storage-account-create) command creates the storage account. 

    # [Azure PowerShell](#tab/azure-powershell)

    ```azurepowershell
    New-AzStorageAccount -ResourceGroupName AzureFunctionsContainers-rg -Name <STORAGE_NAME> -SkuName Standard_LRS -Location <REGION>
    ```

    The [`New-AzStorageAccount`](https://learn.microsoft.com/powershell/module/az.storage/new-azstorageaccount) cmdlet creates the storage account.

    ---

    In the previous example, replace `<STORAGE_NAME>` with a name that you choose and that's unique in Azure Storage. Storage names can contain 3 to 24 characters, numbers, and lowercase letters only. `Standard_LRS` specifies a general-purpose account [supported by Functions](storage-considerations.md#storage-account-requirements).
    
1. Use the command to create a Premium plan for Azure Functions named `myPremiumPlan` in the **Elastic Premium 1** pricing tier (`--sku EP1`), in your `<REGION>`, and in a Linux container (`--is-linux`).

    # [Azure CLI](#tab/azure-cli)
    ```azurecli
    az functionapp plan create --resource-group AzureFunctionsContainers-rg --name myPremiumPlan --location <REGION> --number-of-workers 1 --sku EP1 --is-linux
    ```
    # [Azure PowerShell](#tab/azure-powershell)
    ```powershell
    New-AzFunctionAppPlan -ResourceGroupName AzureFunctionsContainers-rg -Name MyPremiumPlan -Location <REGION> -Sku EP1 -WorkerType Linux
    ```
    ---
    We use the Premium plan here, which can scale as needed. For more information about hosting, see [Azure Functions hosting plans comparison](functions-scale.md). For more information on how to calculate costs, see the [Functions pricing page](https://azure.microsoft.com/pricing/details/functions/).

    The command also creates an associated Azure Application Insights instance in the same resource group, with which you can monitor your function app and view logs. For more information, see [Monitor Azure Functions](functions-monitoring.md). The instance incurs no costs until you activate it.

## Create and configure a function app on Azure with the image

A function app on Azure manages the execution of your functions in your Azure Functions hosting plan. In this section, you use the Azure resources from the previous section to create a function app from an image in a container registry and configure it with a connection string to Azure Storage.

1. Create a function app by using the following command, depending on your container registry:

    # [Azure Container Registry](#tab/acr/azure-cli)
    ```azurecli
    az functionapp create --name <APP_NAME> --storage-account <STORAGE_NAME> --resource-group AzureFunctionsContainers-rg --plan myPremiumPlan --image <LOGIN_SERVER>/azurefunctionsimage:v1.0.0 --registry-username <USERNAME> --registry-password <SECURE_PASSWORD> 
    ```

    # [Docker Hub](#tab/docker/azure-cli)
    ```azurecli
    az functionapp create --name <APP_NAME> --storage-account <STORAGE_NAME> --resource-group AzureFunctionsContainers-rg --plan myPremiumPlan --image <DOCKER_ID>/azurefunctionsimage:v1.0.0
    ```

    # [Azure Container Registry](#tab/acr/azure-powershell)
    ```azurepowershell
    New-AzFunctionApp -Name <APP_NAME> -ResourceGroupName AzureFunctionsContainers-rg -PlanName myPremiumPlan -StorageAccount <STORAGE_NAME> -DockerImageName <LOGIN_SERVER>/azurefunctionsimage:v1.0.0
    ```

    # [Docker Hub](#tab/docker/azure-powershell)
    ```azurepowershell
    New-AzFunctionApp -Name <APP_NAME> -ResourceGroupName AzureFunctionsContainers-rg -PlanName myPremiumPlan -StorageAccount <STORAGE_NAME> -DockerImageName <DOCKER_ID>/azurefunctionsimage:v1.0.0
    ```
    ---
    
    In this example, replace `<STORAGE_NAME>` with the name you used in the previous section for the storage account. Also, replace `<APP_NAME>` with a globally unique name appropriate to you and `<DOCKER_ID>` or `<LOGIN_SERVER>` with your Docker Hub account ID or Container Registry server, respectively. When you're deploying from a custom container registry, the image name indicates the URL of the registry. 

    When you first create the function app, it pulls the initial image from your Docker Hub. You can also [Enable continuous deployment](functions-how-to-custom-container.md#enable-continuous-deployment-to-azure) to Azure from your container registry.
    
    > **Tip:**  
    > Use the [`DisableColor` setting](functions-host-json.md#console) in the *host.json* file to prevent ANSI control characters from being written to the container logs.

1. Use the following command to get the connection string for the storage account you created:

    # [Azure CLI](#tab/azure-cli)
    ```azurecli
    az storage account show-connection-string --resource-group AzureFunctionsContainers-rg --name <STORAGE_NAME> --query connectionString --output tsv
    ```

    The connection string for the storage account is returned by using the [`az storage account show-connection-string`](https://learn.microsoft.com/cli/azure/storage/account) command.

    # [Azure PowerShell](#tab/azure-powershell)
    ```azurepowershell
    $storage_name = "<STORAGE_NAME>"
    $key = (Get-AzStorageAccountKey -ResourceGroupName AzureFunctionsContainers-rg -Name $storage_name)[0].Value
    $string = "DefaultEndpointsProtocol=https;EndpointSuffix=core.windows.net;AccountName=" + $storage_name + ";AccountKey=" + $key
    Write-Output($string) 
    ```
    The key returned by the [`Get-AzStorageAccountKey`](https://learn.microsoft.com/powershell/module/az.storage/get-azstorageaccountkey) cmdlet is used to construct the connection string for the storage account.

    ---

    >**Important:**
    >This article currently shows how to connect to the default storage account by using a connection string. For the best security, you should instead create a managed identity-based connection to Azure Storage using Microsoft Entra authentication. For more information, see the [Functions developer guide](manage-connections.md).

    Replace `<STORAGE_NAME>` with the name of the storage account you created earlier.

1. Use the following command to add the setting to the function app:
 
    # [Azure CLI](#tab/azure-cli)
    ```azurecli
    az functionapp config appsettings set --name <APP_NAME> --resource-group AzureFunctionsContainers-rg --settings AzureWebJobsStorage=<CONNECTION_STRING>
    ```
    Use the [`az functionapp config appsettings set`](https://learn.microsoft.com/cli/azure/functionapp/config/appsettings#az-functionapp-config-appsettings-set) command to create the setting.

    # [Azure PowerShell](#tab/azure-powershell)
    ```azurepowershell
    Update-AzFunctionAppSetting -Name <APP_NAME> -ResourceGroupName AzureFunctionsContainers-rg -AppSetting @{"AzureWebJobsStorage"="<CONNECTION_STRING>"}
    ```
    Use the [`Update-AzFunctionAppSetting`](https://learn.microsoft.com/powershell/module/az.functions/update-azfunctionappsetting) cmdlet to create the setting.

    ---

    In this command, replace `<APP_NAME>` with the name of your function app and `<CONNECTION_STRING>` with the connection string from the previous step. The connection string is a long encoded string that begins with `DefaultEndpointProtocol=`.
 
1. The function can now use this connection string to access the storage account.


## Verify your functions on Azure

With the image deployed to your function app in Azure, you can now invoke the function through HTTP requests.

1. Run the following [`az functionapp function show`](https://learn.microsoft.com/cli/azure/functionapp/function#az-functionapp-function-show) command to get the URL of your new function:

    ```azurecli
    az functionapp function show --resource-group AzureFunctionsContainers-rg --name <APP_NAME> --function-name HttpExample --query invokeUrlTemplate 
    ```
    
    Replace `<APP_NAME>` with the name of your function app. 
<!---add back programming-language-other-->
**Applies to: programming-language-java,programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python**

2. Use the URL you just obtained to call the `HttpExample` function endpoint, appending the query string `?name=Functions`.  

**Applies to: programming-language-csharp**

2. Use the URL you just obtained to call the `HttpExample` function endpoint.


When you navigate to this URL, the browser must display similar output as when you ran the function locally.

## Clean up resources

If you want to continue working with Azure Functions using the resources you created in this article, you can leave all those resources in place. Because you created a Premium Plan for Azure Functions, you incur ongoing costs of one or two USD per day.

To avoid ongoing costs, delete the `AzureFunctionsContainers-rg` resource group to clean up all the resources in that group.

```azurecli
az group delete --name AzureFunctionsContainers-rg
```



## Next steps

> 
> [Working with custom containers and Azure Functions](functions-how-to-custom-container.md)
