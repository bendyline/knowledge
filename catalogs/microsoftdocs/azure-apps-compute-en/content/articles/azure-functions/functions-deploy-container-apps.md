---
title: Create your first containerized Azure Functions on Azure Container Apps
description: Get started with Azure Functions on Azure Container Apps by deploying your first function app from a Linux image in a container registry.
ms.date: 01/06/2025
ms.topic: quickstart
ms.custom: build-2023, devx-track-azurecli, devx-track-extended-java, devx-track-js, devx-track-python, linux-related-content, build-2024, devx-track-ts
zone_pivot_groups: programming-languages-set-functions-no-go
---

# Create your first containerized functions on Azure Container Apps 

In this article, you create a function app running in a Linux container and deploy it to an Azure Container Apps environment from a container registry. By deploying to Container Apps, you're able to integrate your function apps into cloud-native microservices. For more information, see [Azure Container Apps hosting of Azure Functions](functions-container-apps-hosting.md).

> **Important:**
> You can host Azure Functions directly in Azure Container Apps by using the `Microsoft.App` resource provider. By using this integration, you can use all the features and capabilities of Azure Container Apps and benefit from the Functions programming model and event-driven autoscaling.
>
> Use this approach for most containerized workloads. For more information, see [Azure Functions on Azure Container Apps](../container-apps/functions-overview.md).


This article shows you how to create functions running in a Linux container and deploy the container to a Container Apps environment. 

Completing this quickstart incurs a small cost of a few USD cents or less in your Azure account, which you can minimize by [cleaning-up resources](#clean-up-resources) when you're done.


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
* An Azure Container Apps environment with a Log Analytics workspace.
* A user-assigned managed identity, which enables your function app to securely connect to Azure resources without using shared secrets. Connections to both the Azure Storage account and to the Azure Container Registry instance are instead made using Microsoft Entra authentication with the identity, which is recommended for this scenario.

>**Note:**  
>Docker Hub doesn't support managed identities. 

Use these commands to create your required Azure resources: 

1. If necessary, sign in to Azure:

    The [`az login`](https://learn.microsoft.com/cli/azure/reference-index#az-login) command signs you into your Azure account. Use `az account set` when you have more than one subscription associated with your account.

1. Run the following command to update the Azure CLI to the latest version:
     
    ```azurecli
    az upgrade
    ```
   
    If your version of Azure CLI isn't the latest version, an installation begins. The manner of upgrade depends on your operating system. You can proceed after the upgrade is complete.

1. Run the following commands that upgrade the Azure Container Apps extension and register namespaces required by Container Apps:

    ```azurecli
    az extension add --name containerapp --upgrade -y
    az provider register --namespace Microsoft.Web 
    az provider register --namespace Microsoft.App 
    az provider register --namespace Microsoft.OperationalInsights 
    ```

1. Create a resource group named `AzureFunctionsContainers-rg`.

    
    ```azurecli
    az group create --name AzureFunctionsContainers-rg --location eastus
    ```
 
    This [`az group create`](https://learn.microsoft.com/cli/azure/group#az-group-create) command creates a resource group in the East US region. If you instead want to use a region near you, using an available region code returned from the [az account list-locations](https://learn.microsoft.com/cli/azure/account#az-account-list-locations) command. You must modify subsequent commands to use your custom region instead of `eastus`.

1. Create Azure Container App environment with workload profiles enabled.

    ```azurecli
    az containerapp env create --name MyContainerappEnvironment --enable-workload-profiles --resource-group AzureFunctionsContainers-rg --location eastus
    ```
    This command can take a few minutes to complete.

1. Create a general-purpose storage account in your resource group and region, without shared key access.

    ```azurecli
    az storage account create --name <STORAGE_NAME> --location eastus --resource-group AzureFunctionsContainers-rg --sku Standard_LRS --allow-blob-public-access false --allow-shared-key-access false
    ```

    The [`az storage account create`](https://learn.microsoft.com/cli/azure/storage/account#az-storage-account-create) command creates the storage account that can only be accessed by using Microsoft Entra-authenticated identities that have been granted permissions to specific resources. 

    In the previous example, replace `<STORAGE_NAME>` with a name that is appropriate to you and unique in Azure Storage. Storage names must contain 3 to 24 characters numbers and lowercase letters only. `Standard_LRS` specifies a general-purpose account [supported by Functions](storage-considerations.md#storage-account-requirements).

1. Create a managed identity and use the returned `principalId` to grant it both access to your storage account and pull permissions in your registry instance. 

    ```azurecli
    principalId=$(az identity create --name <USER_IDENTITY_NAME> --resource-group AzureFunctionsContainers-rg --location eastus --query principalId -o tsv) 
    acrId=$(az acr show --name <REGISTRY_NAME> --query id --output tsv)
    az role assignment create --assignee-object-id $principalId --assignee-principal-type ServicePrincipal --role acrpull --scope $acrId
    storageId=$(az storage account show --resource-group AzureFunctionsContainers-rg --name <STORAGE_NAME> --query 'id' -o tsv)
    az role assignment create --assignee-object-id $principalId --assignee-principal-type ServicePrincipal --role "Storage Blob Data Owner" --scope $storageId
    ```

    The [`az identity create`](https://learn.microsoft.com/cli/azure/identity#az-identity-create) command creates a user-assigned managed identity and the [`az role assignment create`](https://learn.microsoft.com/cli/azure/role/assignment#az-role-assignment-create) commands adds your identity to the required roles. Replace `<REGISTRY_NAME>`, `<USER_IDENTITY_NAME>`, and `<STORAGE_NAME>` with the name your existing container registry, the name for your managed identity, and the storage account name, respectively. The managed identity can now be used by an app to access both the storage account and Azure Container Registry without using shared secrets.  
  
## Create and configure a function app on Azure with the image

A function app on Azure manages the execution of your functions in your Azure Container Apps environment. In this section, you use the Azure resources from the previous section to create a function app from an image in a container registry in a Container Apps environment. You also configure the new environment with a connection string to the required Azure Storage account.

Use the [`az functionapp create`](https://learn.microsoft.com/cli/azure/functionapp#az-functionapp-create) command to create a function app in the new managed environment backed by Azure Container Apps. In [`az functionapp create`](https://learn.microsoft.com/cli/azure/functionapp#az-functionapp-create), the `--environment` parameter specifies the Container Apps environment. 

### [Azure Container Registry](#tab/acr)

>**Tip:**  
> To make sure that your function app uses a managed identity-based connection to your registry instance, don't set the `--image` parameter in `az functionapp create`. When you set `--image` to the fully qualified name of your image in the repository, shared secret credentials are obtained from your registry and stored in app settings. 

First you must get the fully qualified ID value of your user-assigned managed identity with pull access to the registry, and then use the [`az functionapp create`](https://learn.microsoft.com/cli/azure/functionapp#az-functionapp-create) command to create a function app using the default image and with this identity assigned to it. 

```azurecli
UAMI_RESOURCE_ID=$(az identity show --name $uami_name --resource-group $group --query id -o tsv)
az functionapp create --name <APP_NAME> --storage-account <STORAGE_NAME> --environment MyContainerappEnvironment --workload-profile-name "Consumption" --resource-group AzureFunctionsContainers-rg --functions-version 4 --assign-identity $UAMI_RESOURCE_ID
```

In [`az functionapp create`](https://learn.microsoft.com/cli/azure/functionapp#az-functionapp-create), the `--assign-identity` assigns your managed identity to the new app. Because you didn't set the `--image` parameter in `az functionapp create`, the application is created using a placeholder image. 

In this example, replace `<APP_NAME>`, `<STORAGE_NAME>`, and `<USER_IDENTITY_NAME>` with a name for your new function app as well as the name of your storage account and the identity. 

Finally, you must update the [`linuxFxVersion`](functions-app-settings.md#linuxfxversion) site setting to the fully qualified name of your image in the repository. You must also update the [`acrUseManagedIdentityCreds`](functions-app-settings.md#acrusemanagedidentitycreds) and  [`acrUserManagedIdentityID`](functions-app-settings.md#acrusermanagedidentityid) site settings so that managed identities are used when obtaining the image from the registry.   

```azurecli
UAMI_RESOURCE_ID=$(az identity show --name <USER_IDENTITY_NAME> --resource-group AzureFunctionsContainers-rg --query id -o tsv)
az resource patch --resource-group AzureFunctionsContainers-rg --name <APP_NAME> --resource-type "Microsoft.Web/sites" --properties "{ \"siteConfig\": { \"linuxFxVersion\": \"DOCKER|<REGISTRY_NAME>.azurecr.io/azurefunctionsimage:v1.0.0\", \"acrUseManagedIdentityCreds\": true, \"acrUserManagedIdentityID\":\"$UAMI_RESOURCE_ID\", \"appSettings\": [{\"name\": \"DOCKER_REGISTRY_SERVER_URL\", \"value\": \"<REGISTRY_NAME>.azurecr.io\"}]}}"
```

In addition to the required site settings, the [`az resource patch`](https://learn.microsoft.com/cli/azure/resource#az-resource-patch) command also updates the [`DOCKER_REGISTRY_SERVER_URL`](functions-app-settings.md#docker_registry_server_url) app setting to the URL of your registry server.

In this example, replace `<APP_NAME>`, `<REGISTRY_NAME>`, and `<USER_IDENTITY_NAME>` with the names of your function app, container registry, and identity, respectively.  

### [Docker Hub](#tab/docker)

First you must get fully qualified ID value of your user-assigned managed identity, and then use the [`az functionapp create`](https://learn.microsoft.com/cli/azure/functionapp#az-functionapp-create) command to create a function app using the default image and with this identity assigned to it.

```azurecli
az functionapp create --name <APP_NAME> --storage-account <STORAGE_NAME> --environment MyContainerappEnvironment --workload-profile-name "Consumption" --resource-group AzureFunctionsContainers-rg --functions-version 4 --assign-identity --image <DOCKER_ID>/azurefunctionsimage:v1.0.0  
```

In the [`az functionapp create`](https://learn.microsoft.com/cli/azure/functionapp#az-functionapp-create) command, the `--environment` parameter specifies the Container Apps environment and the `--image` parameter specifies the image to use for the function app. In this example, replace `<STORAGE_NAME>` with the name you used in the previous section for the storage account. Also, replace `<APP_NAME>` with a globally unique name appropriate to you and `<DOCKER_ID>` with your public Docker Hub account ID. 

If you're using a private registry, you need to include the fully qualified domain name of your registry instead of just the Docker ID for `<DOCKER_ID>`, along with the `--registry-username` and `--registry-password` credential required to access the registry. 

---

Specifying `--workload-profile-name "Consumption"` creates your app in an environment using the default `Consumption` workload profile, which costs the same as running in a Container Apps Consumption plan. When you first create the function app, it pulls the initial image from your registry. 

## Update application settings

To enable the Functions host to connect to the default storage account using shared secrets, you must replace the `AzureWebJobsStorage` connection string setting with an equivalent setting that uses the user-assigned managed identity to connect to the storage account.

1. Remove the existing `AzureWebJobsStorage` connection string setting:

    ```azurecli    
    az functionapp config appsettings delete --name <APP_NAME> --resource-group AzureFunctionsContainers-rg --setting-names AzureWebJobsStorage 
    ```

    The [az functionapp config appsettings delete](https://learn.microsoft.com/cli/azure/functionapp/config/appsettings#az-functionapp-config-appsettings-delete) command removes this setting from your app. Replace `<APP_NAME>` with the name of your function app. 

1. Add equivalent settings, with an `AzureWebJobsStorage__` prefix, that define a user-assigned managed identity connection to the default storage account:
 
    ```azurecli
    clientId=$(az identity show --name <USER_IDENTITY_NAME> --resource-group AzureFunctionsContainers-rg --query 'clientId' -o tsv)
    az functionapp config appsettings set --name <APP_NAME> --resource-group AzureFunctionsContainers-rg --settings AzureWebJobsStorage__accountName=<STORAGE_NAME> AzureWebJobsStorage__credential=managedidentity AzureWebJobsStorage__clientId=$clientId
    ```
  
    In this example, replace `<APP_NAME>`, `<USER_IDENTITY_NAME>`, `<STORAGE_NAME>` with your function app name, the name of your identity, and the storage account name, respectively. 

At this point, your functions are running in a Container Apps environment, with the required application settings already added. When needed, you can add other settings in your functions app in the standard way for Functions. For more information, see [Use application settings](functions-how-to-use-azure-function-app-settings.md#settings).

>**Tip:** 
> When you make subsequent changes to your function code, you need to rebuild the container, republish the image to the registry, and update the function app with the new image version. For more information, see [Update an image in the registry](functions-how-to-custom-container.md#update-an-image-in-the-registry)


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

The request URL should look something like this:

**Applies to: programming-language-java,programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python**

`https://myacafunctionapp.kindtree-796af82b.eastus.azurecontainerapps.io/api/httpexample?name=functions`

**Applies to: programming-language-csharp**

`https://myacafunctionapp.kindtree-796af82b.eastus.azurecontainerapps.io/api/httpexample`



## Clean up resources

If you want to continue working with Azure Function using the resources you created in this article, you can leave all those resources in place. 

When you're done working with this function app deployment, delete the `AzureFunctionsContainers-rg` resource group to clean up all the resources in that group:

```azurecli
az group delete --name AzureFunctionsContainers-rg
```

## Next steps

>   
> [Azure Container Apps hosting of Azure Functions](functions-container-apps-hosting.md)  
>   
> [Native Azure Functions Support in Azure Container Apps](../container-apps/functions-overview.md)  
>   
> [Create your Native Azure Functions on Azure Container Apps](../container-apps/functions-usage.md)  
>   
> [Working with containers and Azure Functions](functions-how-to-custom-container.md)  
>   
> [Help make the experience better](https://microsoft.qualtrics.com/jfe/form/SV_byFGULLJlKPh9Xw)
