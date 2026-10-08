---
title: Create a function in Azure from the command line
description: Learn how to use command line tools, such as Azure Functions Core Tools, to create a function code project, create Azure resources, and publish function code to run in Azure Functions.
ms.date: 06/02/2026
ms.topic: quickstart
ms.custom: devx-track-csharp, devx-track-azurecli, devx-track-azurepowershell, mode-other, devx-track-dotnet, devx-track-go
zone_pivot_groups: programming-languages-set-functions-full
---

# Quickstart: Create a function in Azure from the command line

In this article, you use local command-line tools to create a function that responds to HTTP requests. After verifying your code locally, you deploy it to a serverless Flex Consumption hosting plan in Azure Functions. 

Completing this quickstart incurs a small cost of a few USD cents or less in your Azure account. 

Make sure to select your preferred development language at the top of the article.

**Applies to: programming-language-go**

> **Important:**
> Go support for Azure Functions is currently in public preview. During preview, Go function apps are supported only on the [Flex Consumption plan](flex-consumption-plan.md).



## Prerequisites

+ An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).


**Applies to: programming-language-csharp**

+ [.NET 8.0 SDK](https://dotnet.microsoft.com/download)

+ [Azurite storage emulator](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-install-azurite.md?tabs=npm#install-azurite) 

**Applies to: programming-language-java**

+ [Java 17 Developer Kit](https://learn.microsoft.com/azure/developer/java/fundamentals/java-support-on-azure)
    + If you use another [supported version of Java](supported-languages.md?pivots=programming-language-java#languages-by-runtime-version), you must update the project's pom.xml file. 
    + The `JAVA_HOME` environment variable must be set to the install location of the correct version of the Java Development Kit (JDK).
+ [Apache Maven 3.8.x](https://maven.apache.org)  

**Applies to: programming-language-javascript,programming-language-typescript**

+ [Node.js 22](https://nodejs.org/)  

**Applies to: programming-language-powershell**

+ [PowerShell 7.6](https://learn.microsoft.com/powershell/scripting/install/installing-powershell)

+ [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)

**Applies to: programming-language-python**

+ [Python 3.11](https://www.python.org/)

+ [Azurite storage emulator](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-use-azurite.md)


**Applies to: programming-language-go**

+ [Go 1.24](https://go.dev/dl/) or later.

+ [Azure Functions Core Tools](functions-run-local.md#install-the-azure-functions-core-tools) version `4.12` or later. Run `func --version` to verify your installed version.

+ [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) version `2.87.0` or later. Run `az version` to verify your installed version.

**Applies to: programming-language-other**

+ Rust toolchain using [rustup](https://www.rust-lang.org/tools/install). Use the `rustc --version` command to check your version.  

**Applies to: programming-language-csharp,programming-language-java,programming-language-javascript,programming-language-powershell,programming-language-python,programming-language-typescript,programming-language-other**

+ [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli)


**Applies to: programming-language-csharp,programming-language-java,programming-language-javascript,programming-language-powershell,programming-language-python,programming-language-typescript,programming-language-other**

+ The [`jq` command line JSON processor](https://jqlang.org/download/), used to parse JSON output, and is also available in Azure Cloud Shell.


**Applies to: programming-language-csharp,programming-language-go,programming-language-java,programming-language-javascript,programming-language-powershell,programming-language-python,programming-language-typescript,programming-language-other**


## Install the Azure Functions Core Tools

The recommended installation method for Core Tools depends on the operating system of your local development computer.

### [Windows](#tab/windows)

Two primary ways to install the latest Core Tools version on Windows are:

| Install method | Best for... | Install location/command |
| --- | --- | --- |
| Windows installer (MSI) | Visual Studio or command-line development without Node.js | • [64-bit](https://go.microsoft.com/fwlink/?linkid=2174087)(recommended)<br/>• [32-bit](https://go.microsoft.com/fwlink/?linkid=2174159) |
| `npm` package | Visual Studio Code development (used by the Azure Functions extension for updates) | • **npm**: `npm i -g azure-functions-core-tools@4 --unsafe-perm true`<br/>• **chocolatey**: `choco install azure-functions-core-tools` |

Considerations for installation:

+ Choose the best method based on your local development environment and stick with that method for updates.
+ The Visual Studio Code extension for Azure Functions installs and maintains Core Tools by using `npm`. 
+ If you previously used an MSI to install Core Tools on Windows, uninstall it from Add Remove Programs before installing by using Visual Studio Code for development, which prefers `npm`. Having both installed causes version conflicts because the MSI takes precedence on PATH. To check which you have, run `where func` in a terminal.
+ To install Core Tools on [Windows Subsystem for Linux (WSL)](https://learn.microsoft.com/windows/wsl/install), follow the instructions on the Linux tab. 

For more information, see the [Core Tools readme](https://github.com/Azure/azure-functions-core-tools/blob/v4.x/README.md#windows).

### [macOS](#tab/macos)

The following steps use Homebrew to install the Core Tools on macOS.

1. Install [Homebrew](https://brew.sh/), if it's not already installed.

1. Install the Core Tools package:

    ```bash
    brew tap azure/functions
    brew install azure-functions-core-tools@4
    # if upgrading on a machine that has 2.x or 3.x installed:
    brew link --overwrite azure-functions-core-tools@4
    ```
### [Linux](#tab/linux)

The following steps use [APT](https://wiki.debian.org/Apt) to install Core Tools on your Ubuntu or Debian Linux distribution. For other Linux distributions, see the [Core Tools readme](https://github.com/Azure/azure-functions-core-tools/blob/v4.x/README.md#linux).

1. Install the Microsoft package repository GPG key to validate package integrity:

    ```bash
    curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
    sudo mv microsoft.gpg /etc/apt/trusted.gpg.d/microsoft.gpg
    ```

1. Set up the APT source list before running an APT update.

    ##### Ubuntu

    ```bash
    sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/microsoft-ubuntu-$(lsb_release -cs 2>/dev/null)-prod $(lsb_release -cs 2>/dev/null) main" > /etc/apt/sources.list.d/dotnetdev.list'
    ```

    ##### Debian

    ```bash
    sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/debian/$(lsb_release -rs 2>/dev/null | cut -d'.' -f 1)/prod $(lsb_release -cs 2>/dev/null) main" > /etc/apt/sources.list.d/dotnetdev.list'
    ```

1. Check the `/etc/apt/sources.list.d/dotnetdev.list` file for one of the appropriate Linux version strings in the following table:

    | Linux distribution | Version |
    | --- | --- |
    | Debian 12 | `bookworm` |
    | Debian 11 | `bullseye` |
    | Debian 10 | `buster` |
    | Debian 9 | `stretch` |
    | Ubuntu 24.04 | `noble` |
    | Ubuntu 22.04 | `jammy` |
    | Ubuntu 20.04 | `focal` |
    | Ubuntu 19.04 | `disco` |
    | Ubuntu 18.10 | `cosmic` |
    | Ubuntu 18.04 | `bionic` |
    | Ubuntu 17.04 | `zesty` |
    | Ubuntu 16.04/Linux Mint 18 | `xenial` |

1. Start the APT source update:

    ```bash
    sudo apt-get update
    ```

1. Install the Core Tools package:

    ```bash
    sudo apt-get install azure-functions-core-tools-4
    ```

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



## Create a local code project and function

In Azure Functions, your code project is an app that contains one or more individual functions that each respond to a specific trigger. All functions in a project share the same configurations and are deployed as a unit to Azure. In this section, you create a code project that contains a single function.
**Applies to: programming-language-go**

1. Run the [`func init`](functions-core-tools-reference.md#func-init) command to create a Go functions project:

    ```console
    func init MyGoFunctionApp --worker-runtime go
    ```

    This command creates a project folder named `MyGoFunctionApp` that includes the following files:

    | File | Description |
    | --- | --- |
    | `host.json` | Host configuration for the function app. |
    | `local.settings.json` | Settings used when running locally. |
    | `main.go` | Entry point with a sample HTTP-triggered function. |
    | `go.mod` | Go module file for dependency management. |
    | `go.sum` | Go module checksum file. |

1. Navigate to the project folder:

    ```console
    cd MyGoFunctionApp
    ```

1. Open `main.go` to review the generated code. It contains a sample HTTP-triggered function:

    ```go
    package main

    import (
        "log"
        "net/http"

        "github.com/azure/azure-functions-golang-worker/sdk"
        "github.com/azure/azure-functions-golang-worker/worker"
    )

    // HTTPTriggerHandler handles standard HTTP requests
    func HTTPTriggerHandler(w http.ResponseWriter, r *http.Request) {
        log.Printf("Processing HTTP Trigger for %s", r.URL.Path)
        w.WriteHeader(http.StatusOK)
        w.Write([]byte("Hello from Go Worker!"))
    }

    func main() {
        app := sdk.FunctionApp()
        app.HTTP("hello", HTTPTriggerHandler,
            sdk.WithMethods("GET", "POST"),
            sdk.WithAuth("anonymous"),
        )
        worker.Start(app)
    }
    ```

    Go functions use the standard `net/http` types (`http.ResponseWriter` and `*http.Request`) for HTTP triggers. Functions are registered in `main()` by using the Go worker SDK and functional options, and no `function.json` files are needed.

**Applies to: programming-language-csharp**

1. In a terminal or command prompt, run this [`func init`](functions-core-tools-reference.md#func-init) command to create a function app project in the current folder:  
 
    ```console
    func init --worker-runtime dotnet-isolated 
    ```


**Applies to: programming-language-javascript**

1. In a terminal or command prompt, run this [`func init`](functions-core-tools-reference.md#func-init) command to create a function app project in the current folder:  
 
    ```console
    func init --worker-runtime node --language javascript 
    ```


**Applies to: programming-language-powershell**

1. In a terminal or command prompt, run this [`func init`](functions-core-tools-reference.md#func-init) command to create a function app project in the current folder:  
 
    ```console
    func init --worker-runtime powershell 
    ```


**Applies to: programming-language-python**

1. In a terminal or command prompt, run this [`func init`](functions-core-tools-reference.md#func-init) command to create a function app project in the current folder:  
 
    ```console
    func init --worker-runtime python 
    ```


**Applies to: programming-language-typescript**

 1. In a terminal or command prompt, run this [`func init`](functions-core-tools-reference.md#func-init) command to create a function app project in the current folder:  
 
    ```console
    func init --worker-runtime node --language typescript 
    ```


**Applies to: programming-language-other**

 1. In a terminal or command prompt, run this [`func init`](functions-core-tools-reference.md#func-init) command to create a function app project in the current folder:  
 
    ```console
    func init --worker-runtime custom 
    ```


**Applies to: programming-language-java**

<!--- The Maven archetype requires it's own create flow...-->  
1. In an empty folder, run this `mvn` command to generate the code project from an Azure Functions [Maven archetype](https://maven.apache.org/guides/introduction/introduction-to-archetypes.html):


    ### [Bash](#tab/bash)
    
    ```bash
    mvn archetype:generate -DarchetypeGroupId=com.microsoft.azure -DarchetypeArtifactId=azure-functions-archetype -DjavaVersion=17
    ```
    
    ### [PowerShell](#tab/powershell)
    
    ```powershell
    mvn archetype:generate "-DarchetypeGroupId=com.microsoft.azure" "-DarchetypeArtifactId=azure-functions-archetype" "-DjavaVersion=17" 
    ```
    
    ### [Cmd](#tab/cmd)
    
    ```cmd
    mvn archetype:generate "-DarchetypeGroupId=com.microsoft.azure" "-DarchetypeArtifactId=azure-functions-archetype" "-DjavaVersion=17"
    ```
    
    ---

    > **Important:**
    > + Use `-DjavaVersion=11` if you want your functions to run on Java 11. To learn more, see [Java versions](functions-reference-java.md#java-versions). 
    > + Set the `JAVA_HOME` environment variable to the install location of the correct version of the JDK to complete this article.

2. Maven asks you for values needed to finish generating the project on deployment.   
    Provide the following values when prompted:

    | Prompt | Value | Description |
    | --- | --- | --- |
    | **groupId** | `com.fabrikam` | A value that uniquely identifies your project across all projects, following the [package naming rules](https://docs.oracle.com/javase/specs/jls/se6/html/packages.html#7.7) for Java. |
    | **artifactId** | `fabrikam-functions` | A value that is the name of the jar, without a version number. |
    | **version** | `1.0-SNAPSHOT` | Choose the default value. |
    | **package** | `com.fabrikam` | A value that is the Java package for the generated function code. Use the default. |

3. Type `Y` or press Enter to confirm.

    Maven creates the project files in a new folder with a name of _artifactId_, which in this example is `fabrikam-functions`. 
 
4. Navigate into the project folder:

    ```console
    cd fabrikam-functions
    ```

    You can review the template-generated code for your new HTTP trigger function in _Function.java_ in the _\src\main\java\com\fabrikam_ project directory.

**Applies to: programming-language-csharp,programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python,programming-language-other**

2. Use this [`func new`](functions-core-tools-reference.md#func-new) command to add a function to your project:

    ```console
    func new --name HttpExample --template "HTTP trigger" --authlevel "function"
    ```

    A new code file is added to your project. In this case, the `--name` argument is the unique name of your function (`HttpExample`) and the `--template` argument specifies an HTTP trigger. 


The project root folder contains various files for the project, including configurations files named [local.settings.json](functions-develop-local.md#local-settings-file) and [host.json](functions-host-json.md). Because _local.settings.json_ can contain secrets downloaded from Azure, the file is excluded from source control by default in the _.gitignore_ file.
**Applies to: programming-language-other**

## Create and build your function

The *function.json* file in the *HttpExample* folder declares an HTTP trigger function. You complete the function by adding a handler and compiling it into an executable.

1. Press <kbd>Ctrl + Shift + `</kbd> or select *New Terminal* from the *Terminal* menu to open a new integrated terminal in VS Code.

1. In the function app root (the same folder as *host.json*), initialize a Rust project named `handler`.

    ```bash
    cargo init --name handler
    ```

1. In *Cargo.toml*, add the following dependencies necessary to complete this quickstart. The example uses the [warp](https://docs.rs/warp/) web server framework.

    ```toml
    [dependencies]
    warp = "0.3"
    tokio = { version = "1", features = ["rt", "macros", "rt-multi-thread"] }
    ```

1. In *src/main.rs*, add the following code and save the file. This is your Rust custom handler.

    ```rust
    use std::collections::HashMap;
    use std::env;
    use std::net::Ipv4Addr;
    use warp::{http::Response, Filter};

    #[tokio::main]
    async fn main() {
        let example1 = warp::get()
            .and(warp::path("api"))
            .and(warp::path("HttpExample"))
            .and(warp::query::<HashMap<String, String>>())
            .map(|p: HashMap<String, String>| match p.get("name") {
                Some(name) => Response::builder().body(format!("Hello, {}. This HTTP triggered function executed successfully.", name)),
                None => Response::builder().body(String::from("This HTTP triggered function executed successfully. Pass a name in the query string for a personalized response.")),
            });

        let port_key = "FUNCTIONS_CUSTOMHANDLER_PORT";
        let port: u16 = match env::var(port_key) {
            Ok(val) => val.parse().expect("Custom Handler port is not a number!"),
            Err(_) => 3000,
        };

        warp::serve(example1).run((Ipv4Addr::LOCALHOST, port)).await
    }
    ```

1. Compile a binary for your custom handler. An executable file named `handler` (`handler.exe` on Windows) is output in the function app root folder.

    ```bash
    cargo build --release
    cp target/release/handler .
    ```

## Configure your function app

The function host needs to be configured to run your custom handler binary when it starts.

1. Open *host.json*.

1. In the `customHandler.description` section, set the value of `defaultExecutablePath` to `handler` (on Windows, set it to `handler.exe`).

1. In the `customHandler` section, add a property named `enableForwardingHttpRequest` and set its value to `true`. For functions consisting of only an HTTP trigger, this setting simplifies programming by allow you to work with a typical HTTP request instead of the custom handler [request payload](functions-custom-handlers.md#request-payload).

1. Confirm the `customHandler` section looks like this example. Save the file.

    ```
    "customHandler": {
      "description": {
        "defaultExecutablePath": "handler",
        "workingDirectory": "",
        "arguments": []
      },
      "enableForwardingHttpRequest": true
    }
    ```

The function app is configured to start your custom handler executable.
  

## Run the function locally

Verify your new function by running the project locally and calling the function endpoint. 

1. Use this command to start the local Azure Functions runtime host in the root of the project folder: 
    **Applies to: programming-language-csharp,programming-language-javascript,programming-language-powershell,programming-language-python,programming-language-go,programming-language-other**

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


    **Applies to: programming-language-csharp,programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python,programming-language-java,programming-language-other**

    Toward the end of the output, the following lines appear:

    <pre>
    ...

    Now listening on: http://0.0.0.0:7071
    Application started. Press Ctrl+C to shut down.

    Http Functions:

            HttpExample: [GET,POST] http://localhost:7071/api/HttpExample
    ...

    </pre>


    **Applies to: programming-language-go**

    Toward the end of the output, the HTTP endpoint for your function is displayed:

    <pre>
    Functions:

            hello: [GET,POST] http://localhost:7071/api/hello
    </pre>



2. Call the function endpoint to verify it works:

    **Applies to: programming-language-csharp,programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python,programming-language-java,programming-language-other**

    Copy the URL of your `HttpExample` function from this output to a browser and browse to the function URL. You should receive a success response with a "hello world" message.

    >**Note:**
    > Because access key authorization isn't enforced when running locally, the function URL returned doesn't include the access key value and you don't need it to call your function. 

    **Applies to: programming-language-go**

    With the function running locally, open a browser and navigate to the following URL:

    ```
    http://localhost:7071/api/hello
    ```

    You should see the following response:

    ```output
    Hello from Go Worker!
    ```


3. When you're done, use **Ctrl**+**C** and choose `y` to stop the functions host.

**Applies to: programming-language-csharp,programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python,programming-language-java,programming-language-other**


## Create supporting Azure resources for your function

Before you can deploy your function code to Azure, you need to create these resources:

- A [resource group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/overview.md), which is a logical container for related resources.
- A default [Storage account](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-create.md), which is used by the Functions host to maintain state and other information about your functions. 
- A [user-assigned managed identity](https://learn.microsoft.com/azure/active-directory/managed-identities-azure-resources/overview), which the Functions host uses to connect to the default storage account.
- A function app, which provides the environment for executing your function code. A function app maps to your local function project and lets you group functions as a logical unit for easier management, deployment, and sharing of resources.

Use the Azure CLI commands in these steps to create the required resources.

1. If you haven't done so already, sign in to Azure:

    <!---Replace the PowerShell examples after we get the Flex support in the Functions cmdlets. 
    ### [Azure CLI](#tab/azure-cli)-->

    ```azurecli
    az login
    ```

    The [`az login`](https://learn.microsoft.com/cli/azure/reference-index#az-login) command signs you into your Azure account. Skip this step when running in Azure Cloud Shell.
    <!---
    ### [Azure PowerShell](#tab/azure-powershell) 
    ```azurepowershell
    Connect-AzAccount
    ```

    The [Connect-AzAccount](/powershell/module/az.accounts/connect-azaccount) cmdlet signs you into your Azure account.

    ---
    -->

1. If you haven't already done so, use this [`az extension add`](https://learn.microsoft.com/cli/azure/extension#az-extension-add) command to install the Application Insights extension:

    ```azurecli
    az extension add --name application-insights
    ```

1. Use this [az group create](https://learn.microsoft.com/cli/azure/group#az-group-create) command to create a resource group named `AzureFunctionsQuickstart-rg` in your chosen region:
    <!---
    ### [Azure CLI](#tab/azure-cli)-->
    
    ```azurecli
    az group create --name "AzureFunctionsQuickstart-rg" --location "<REGION>"
    ```
 
    In this example, replace `<REGION>` with a region near you that supports the Flex Consumption plan. Use the [az functionapp list-flexconsumption-locations](https://learn.microsoft.com/cli/azure/functionapp#az-functionapp-list-flexconsumption-locations) command to view the list of currently supported regions.
    <!---
    ### [Azure PowerShell](#tab/azure-powershell)

    ```azurepowershell
    New-AzResourceGroup -Name AzureFunctionsQuickstart-rg -Location <REGION>
    ```

    The [New-AzResourceGroup](/powershell/module/az.resources/new-azresourcegroup) command creates a resource group. You generally create your resource group and resources in a region near you, using an available region returned from the [Get-AzLocation](/powershell/module/az.resources/get-azlocation) cmdlet.

    ---
    -->

1. Use this [az storage account create](https://learn.microsoft.com/cli/azure/storage/account#az-storage-account-create) command to create a general-purpose storage account in your resource group and region:
    <!---
    ### [Azure CLI](#tab/azure-cli)
    -->
    ```azurecli
    az storage account create --name <STORAGE_NAME> --location "<REGION>" --resource-group "AzureFunctionsQuickstart-rg" \
    --sku "Standard_LRS" --allow-blob-public-access false --allow-shared-key-access false
    ```

     
    <!---
    ### [Azure PowerShell](#tab/azure-powershell)

    ```azurepowershell
    New-AzStorageAccount -ResourceGroupName AzureFunctionsQuickstart-rg -Name <STORAGE_NAME> -SkuName Standard_LRS -Location <REGION> -AllowBlobPublicAccess $false
    ```

    The [New-AzStorageAccount](/powershell/module/az.storage/new-azstorageaccount) cmdlet creates the storage account.

    ---
    -->

    In this example, replace `<STORAGE_NAME>` with a name that is appropriate to you and unique in Azure Storage. Names must contain three to 24 characters numbers and lowercase letters only. `Standard_LRS` specifies a general-purpose account, which is [supported by Functions](storage-considerations.md#storage-account-requirements). This new account can only be accessed by using Microsoft Entra-authenticated identities that have been granted permissions to specific resources. 

1. Use this script to create a user-assigned managed identity, parse the returned JSON properties of the object using `jq`, and grant `Storage Blob Data Owner` permissions in the default storage account: 

    ```azurecli  
    output=$(az identity create --name "func-host-storage-user" --resource-group "AzureFunctionsQuickstart-rg" --location <REGION> \
    --query "{userId:id, principalId: principalId, clientId: clientId}" -o json)

    userId=$(echo $output | jq -r '.userId')
    principalId=$(echo $output | jq -r '.principalId')
    clientId=$(echo $output | jq -r '.clientId')

    storageId=$(az storage account show --resource-group "AzureFunctionsQuickstart-rg" --name <STORAGE_NAME> --query 'id' -o tsv)
    az role assignment create --assignee-object-id $principalId --assignee-principal-type ServicePrincipal \
    --role "Storage Blob Data Owner" --scope $storageId
    ```

    If you don't have the `jq` utility in your local Bash shell, it's available in Azure Cloud Shell. In this example, replace `<STORAGE_NAME>` and `<REGION>` with your default storage account name and region, respectively.

    The [az identity create](https://learn.microsoft.com/cli/azure/identity#az-identity-create) command creates an identity named `func-host-storage-user`. The returned `principalId` is used to assign permissions to this new identity in the default storage account by using the [`az role assignment create`](https://learn.microsoft.com/cli/azure/role/assignment#az-role-assignment-create) command. The [`az storage account show`](https://learn.microsoft.com/cli/azure/storage/account#az-storage-account-show) command is used to obtain the storage account ID. 

1. Use this [az functionapp create](https://learn.microsoft.com/cli/azure/functionapp#az-functionapp-create) command to create the function app in Azure:
    <!---Replace tabs when PowerShell cmdlets support Flex Consumption plans.
    ### [Azure CLI](#tab/azure-cli)
    -->
    **Applies to: programming-language-csharp**

    ```azurecli
    az functionapp create --resource-group "AzureFunctionsQuickstart-rg" --name <APP_NAME> --flexconsumption-location <REGION> \
    --runtime dotnet-isolated --runtime-version <LANGUAGE_VERSION> --storage-account <STORAGE_NAME> \
    --deployment-storage-auth-type UserAssignedIdentity --deployment-storage-auth-value "func-host-storage-user"
    ```

    **Applies to: programming-language-java**

    ```azurecli
    az functionapp create --resource-group "AzureFunctionsQuickstart-rg" --name <APP_NAME> --flexconsumption-location <REGION> \
    --runtime java --runtime-version <LANGUAGE_VERSION> --storage-account <STORAGE_NAME> \
    --deployment-storage-auth-type UserAssignedIdentity --deployment-storage-auth-value "func-host-storage-user"
    ```

    **Applies to: programming-language-javascript,programming-language-typescript**

    ```azurecli
    az functionapp create --resource-group "AzureFunctionsQuickstart-rg" --name <APP_NAME> --flexconsumption-location <REGION> \
    --runtime node --runtime-version <LANGUAGE_VERSION> --storage-account <STORAGE_NAME> \
    --deployment-storage-auth-type UserAssignedIdentity --deployment-storage-auth-value "func-host-storage-user"
    ```

    **Applies to: programming-language-python**

    ```azurecli
    az functionapp create --resource-group "AzureFunctionsQuickstart-rg" --name <APP_NAME> --flexconsumption-location <REGION> \
    --runtime python --runtime-version <LANGUAGE_VERSION> --storage-account <STORAGE_NAME> \
    --deployment-storage-auth-type UserAssignedIdentity --deployment-storage-auth-value "func-host-storage-user"
    ```

    **Applies to: programming-language-powershell**

    ```azurecli
    az functionapp create --resource-group "AzureFunctionsQuickstart-rg" --name <APP_NAME> --flexconsumption-location <REGION> \
    --runtime python --runtime-version <LANGUAGE_VERSION> --storage-account <STORAGE_NAME> \
    --deployment-storage-auth-type UserAssignedIdentity --deployment-storage-auth-value "func-host-storage-user"
    ```

    **Applies to: programming-language-other**

    ```azurecli
    az functionapp create --resource-group "AzureFunctionsQuickstart-rg" --name <APP_NAME> --flexconsumption-location <REGION> \
    --runtime other --storage-account <STORAGE_NAME> \
    --deployment-storage-auth-type UserAssignedIdentity --deployment-storage-auth-value "func-host-storage-user"
    ```

    <!---
    ### [Azure PowerShell](#tab/azure-powershell)

    ```azurepowershell
    New-AzFunctionApp -Name <APP_NAME> -ResourceGroupName AzureFunctionsQuickstart-rg -StorageAccount <STORAGE_NAME> -Runtime dotnet-isolated -FunctionsVersion 4 -Location '<REGION>'
    ```

    The [New-AzFunctionApp](/powershell/module/az.functions/new-azfunctionapp) cmdlet creates the function app in Azure.

    ---
    -->
    In this example, replace these placeholders with the appropriate values:

    + `<APP_NAME>`: a globally unique name appropriate to you. The `<APP_NAME>` is also the default DNS domain for the function app.
    + `<STORAGE_NAME>`: the name of the account you used in the previous step.
    + `<REGION>`: your current region. 
    + `<LANGUAGE_VERSION>`: use the same [supported language stack version](supported-languages.md) you verified locally, when applicable.

    This command creates a function app running in your specified language runtime on Linux in the [Flex Consumption Plan](flex-consumption-plan.md), which is free for the amount of usage you incur here. The command also creates an associated Azure Application Insights instance in the same resource group, with which you can use to monitor your function app executions and view logs. For more information, see [Monitor Azure Functions](functions-monitoring.md). The instance incurs no costs until you activate it.

1. Use this script to add your user-assigned managed identity to the [Monitoring Metrics Publisher](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles/monitor.md#monitoring-metrics-publisher) role in your Application Insights instance:

    ```azurecli
    appInsights=$(az monitor app-insights component show --resource-group "AzureFunctionsQuickstart-rg" \
        --app <APP_NAME> --query "id" --output tsv)
    principalId=$(az identity show --name "func-host-storage-user" --resource-group "AzureFunctionsQuickstart-rg" \
        --query principalId -o tsv)
    az role assignment create --role "Monitoring Metrics Publisher" --assignee $principalId --scope $appInsights
    ```

    In this example, replace `<APP_NAME>` with the name of your function app. The [az role assignment create](https://learn.microsoft.com/cli/azure/role/assignment#az-role-assignment-create) command adds your user to the role. The resource ID of your Application Insights instance and the principal ID of your user are obtained by using the [az monitor app-insights component show](https://learn.microsoft.com/cli/azure/monitor/app-insights/component#az-monitor-app-insights-component-show) and [`az identity show`](https://learn.microsoft.com/cli/azure/identity#az-identity-show) commands, respectively. 


## Update application settings

To enable the Functions host to connect to the default storage account by using shared secrets, replace the `AzureWebJobsStorage` connection string setting with several settings that are prefixed with `AzureWebJobsStorage__`. These settings define a complex setting that your app uses to connect to storage and Application Insights with a user-assigned managed identity.

1. Use this script to get the client ID of the user-assigned managed identity and uses it to define managed identity connections to both storage and Application Insights:
 
    ```azurecli
    clientId=$(az identity show --name func-host-storage-user \
        --resource-group AzureFunctionsQuickstart-rg --query 'clientId' -o tsv)
    az functionapp config appsettings set --name <APP_NAME> --resource-group "AzureFunctionsQuickstart-rg" \
        --settings AzureWebJobsStorage__accountName=<STORAGE_NAME> \
        AzureWebJobsStorage__credential=managedidentity AzureWebJobsStorage__clientId=$clientId \
        APPLICATIONINSIGHTS_AUTHENTICATION_STRING="ClientId=$clientId;Authorization=AAD"
    ```

    In this script, replace `<APP_NAME>` and `<STORAGE_NAME>` with the names of your function app and storage account, respectively.
     

1. Run the [az functionapp config appsettings delete](https://learn.microsoft.com/cli/azure/functionapp/config/appsettings#az-functionapp-config-appsettings-delete) command to remove the existing `AzureWebJobsStorage` connection string setting, which contains a shared secret key:

    ```azurecli
    az functionapp config appsettings delete --name <APP_NAME> --resource-group "AzureFunctionsQuickstart-rg" --setting-names AzureWebJobsStorage
    ```

    In this example, replace `<APP_NAME>` with the names of your function app. 

At this point, the Functions host can connect to the storage account securely by using managed identities instead of shared secrets. You can now deploy your project code to the Azure resources.

**Applies to: programming-language-go**

## Create supporting Azure resources for your function

Before you can deploy your function code to Azure, you need to create a resource group, a storage account, and a function app. Use the Azure CLI commands in these steps to create the required resources.

1. If you haven't done so already, sign in to Azure:

    ```azurecli
    az login
    ```

    The [`az login`](https://learn.microsoft.com/cli/azure/reference-index#az-login) command signs you into your Azure account. Skip this step when running in Azure Cloud Shell.

1. Use the [`az group create`](https://learn.microsoft.com/cli/azure/group#az-group-create) command to create a resource group named `AzureFunctionsQuickstart-rg` in your chosen region:

    ```azurecli
    az group create --name AzureFunctionsQuickstart-rg --location <REGION>
    ```

    In this example, replace `<REGION>` with a region near you that supports the Flex Consumption plan. Use the [`az functionapp list-flexconsumption-locations`](https://learn.microsoft.com/cli/azure/functionapp#az-functionapp-list-flexconsumption-locations) command to view the list of currently supported regions.

1. Use the [`az storage account create`](https://learn.microsoft.com/cli/azure/storage/account#az-storage-account-create) command to create a general-purpose storage account in your resource group and region:

    ```azurecli
    az storage account create --name <STORAGE_NAME> --location <REGION> --resource-group AzureFunctionsQuickstart-rg --sku Standard_LRS
    ```

    In this example, replace `<STORAGE_NAME>` with a globally unique name. Names must contain three to 24 characters and only lowercase letters and numbers.

1. Create the function app in Azure:

    ```azurecli
    az functionapp create --resource-group AzureFunctionsQuickstart-rg --name <APP_NAME> --storage-account <STORAGE_NAME> --flexconsumption-location <REGION> --runtime go --runtime-version 1.0 --functions-version 4
    ```

    Replace `<APP_NAME>` with a globally unique name and `<STORAGE_NAME>` with the account name you used in the previous step. This command also creates an associated Azure Application Insights instance in the same resource group, with which you can monitor your function app and view logs. For more information, see [Monitor Azure Functions](functions-monitoring.md).

1. Disable HTTP/2 on the function app, which is required during the Go public preview:

    ```azurecli
    az resource update --resource-group AzureFunctionsQuickstart-rg --resource-type Microsoft.Web/sites --name <APP_NAME> --set properties.siteConfig.http20Enabled=false
    ```


**Applies to: programming-language-csharp,programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python,programming-language-other**


## Deploy the function project to Azure

After you've successfully created your function app in Azure, you're now ready to deploy your local functions project by using the [`func azure functionapp publish`](functions-run-local.md#project-file-deployment) command.  

1. In your root project folder, run this [`func azure functionapp publish`](functions-core-tools-reference.md#func-azure-functionapp-publish) command:

    ```console
    func azure functionapp publish <APP_NAME>
    ```
    In this example, replace `<APP_NAME>` with the name of your app. A successful deployment shows results similar to the following output (truncated for simplicity):

    <pre>
    ...
    
    Getting site publishing info...
    Creating archive for current directory...
    Performing remote build for functions project.
    
    ...
    
    Deployment successful.
    Remote build succeeded!
    Syncing triggers...
    Functions in msdocs-azurefunctions-qs:
        HttpExample - [httpTrigger]
            Invoke url: https://msdocs-azurefunctions-qs.azurewebsites.net/api/httpexample
    </pre>

1. In your local terminal or command prompt, run this command to get the URL endpoint value, including the access key:

    ```
    func azure functionapp list-functions <APP_NAME> --show-keys
    ```
    
    In this example, again replace `<APP_NAME>` with the name of your app.

1. Copy the returned endpoint URL and key, which you use to invoke the function endpoint. 


**Applies to: programming-language-java**

## Update the pom.xml file

After you successfully create your function app in Azure, update the pom.xml file so that Maven can deploy to your new app. Otherwise, Maven creates a new set of Azure resources during deployment.

1. In Azure Cloud Shell, use this [`az functionapp show`](https://learn.microsoft.com/cli/azure/functionapp#az-functionapp-show) command to get the deployment container URL and ID of the new user-assigned managed identity:

    ```azurecli
    az functionapp show --name <APP_NAME> --resource-group AzureFunctionsQuickstart-rg  \
        --query "{userAssignedIdentityResourceId: properties.functionAppConfig.deployment.storage.authentication.userAssignedIdentityResourceId, \
        containerUrl: properties.functionAppConfig.deployment.storage.value}"
    ```

    In this example, replace `<APP_NAME>` with the names of your function app. 

1. In the project root directory, open the pom.xml file in a text editor, locate the `properties` element, and update these specific property values:

    | Property name | Value |
    | --- | --- |
    | `java.version` | Use the same [supported language stack version](supported-languages.md) you verified locally, such as `17`. |
    | `azure.functions.maven.plugin.version` | `1.37.1` |
    | `azure.functions.java.library.version` | `3.1.0` |
    | `functionAppName` | The name of your function app in Azure. |

1. Find the `configuration` section of the `azure-functions-maven-plugin` and replace it with this XML fragment:

    ```xml
    <configuration>
        <appName>${functionAppName}</appName>
        <resourceGroup>AzureFunctionsQuickstart-rg</resourceGroup>
        <pricingTier>Flex Consumption</pricingTier>
        <region>....</region>
        <runtime>
            <os>linux</os>
            <javaVersion>${java.version}</javaVersion>
        </runtime>
        <deploymentStorageAccount>...</deploymentStorageAccount>
        <deploymentStorageResourceGroup>AzureFunctionsQuickstart-rg</deploymentStorageResourceGroup>
        <deploymentStorageContainer>...</deploymentStorageContainer>
        <storageAuthenticationMethod>UserAssignedIdentity</storageAuthenticationMethod>
        <userAssignedIdentityResourceId>...</userAssignedIdentityResourceId>
        <appSettings>
            <property>
                <name>FUNCTIONS_EXTENSION_VERSION</name>
                <value>~4</value>
            </property>
        </appSettings>
    </configuration>
    ```

1. In the new `configuration` element, make these specific replacements of the ellipses (`...`) values:  

    | Configuration | Value |
    | --- | --- |
    | `region` | The region code of your existing function app, such as `eastus`. |
    | `deploymentStorageAccount` | The name of your storage account. |
    | `deploymentStorageContainer` | The name of the deployment share, which comes after the `\` in the `containerUrl` value you obtained. |
    | `userAssignedIdentityResourceId` | The fully qualified resource ID of your managed identity, which you obtained. |

1. Save your changes to the _pom.xml_ file. 

You can now use Maven to deploy your code project to your existing app.  

## Deploy the function project to Azure

1. From the command prompt, run this command:

    ```console
    mvn clean package azure-functions:deploy
    ```

1. After your deployment succeeds, run this Core Tools command to get the URL endpoint value, including the access key:

    ```
    func azure functionapp list-functions <APP_NAME> --show-keys
    ```
    
    In this example, again replace `<APP_NAME>` with the name of your app.

1. Copy the returned endpoint URL and key, which you use to invoke the function endpoint.    

**Applies to: programming-language-go**

## Deploy the function project to Azure

After you successfully create your function app in Azure, you're ready to deploy your local functions project. Use the [`func azure functionapp publish`](functions-core-tools-reference.md#func-azure-functionapp-publish) command to deploy your project to Azure:

```console
func azure functionapp publish <APP_NAME>
```

Replace `<APP_NAME>` with the name of your function app.


**Applies to: programming-language-csharp,programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python,programming-language-java,programming-language-other**

## Invoke the function on Azure

Because your function uses an HTTP trigger and supports GET requests, you invoke it by making an HTTP request to its URL using the function-level access key. It's easiest to execute a GET request in a browser. 

Paste the URL and access key you copied into a browser address bar. 

The endpoint URL should look something like this example:

`https://contoso-app.azurewebsites.net/api/httpexample?code=aabbccdd...`

In this case, you must also provide an access key in the query string when making a GET request to the endpoint URL. Using an access key is recommended to limit access from random clients. When making a POST request using an HTTP client, you should instead provide the access key in the `x-functions-key` header.

When you navigate to this URL, the browser should display similar output as when you ran the function locally.

**Applies to: programming-language-go**

## Invoke the function on Azure

After deployment completes, open the following URL in a browser to verify that the function runs in Azure:

```
https://<APP_NAME>.azurewebsites.net/api/hello
```

You should see the same `Hello from Go Worker!` response that you saw when you ran the function locally.


**Applies to: programming-language-csharp,programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python,programming-language-java,programming-language-other**


## Clean up resources

If you continue to the [next step](#next-steps) and add an Azure Storage queue output binding, keep all your resources in place as you'll build on what you've already done.

Otherwise, use the following command to delete the resource group and all its contained resources to avoid incurring further costs.

 # [Azure CLI](#tab/azure-cli)

```azurecli
az group delete --name AzureFunctionsQuickstart-rg
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell
Remove-AzResourceGroup -Name AzureFunctionsQuickstart-rg
```

---


**Applies to: programming-language-go**

## Clean up resources

If you continue to the [next step](#next-steps), keep all resources in place as you build on what you already created.

Otherwise, use the following command to delete the resource group and all its contained resources to avoid incurring further costs.

```azurecli
az group delete --name AzureFunctionsQuickstart-rg
```


**Applies to: programming-language-csharp,programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python,programming-language-java,programming-language-other**

## Next steps

> 
> [Connect to Azure Queue Storage](functions-add-output-binding-storage-queue-cli.md)

**Applies to: programming-language-go**

## Next steps

> 
> [Go developer reference guide](functions-reference-go.md)

For more information about developing Go functions, see the following resources:

+ [Azure Functions Go developer reference](functions-reference-go.md)
+ [Azure Functions Go worker samples](https://github.com/Azure/azure-functions-golang-worker/tree/main/samples)
+ [Azure Functions triggers and bindings](functions-triggers-bindings.md)
