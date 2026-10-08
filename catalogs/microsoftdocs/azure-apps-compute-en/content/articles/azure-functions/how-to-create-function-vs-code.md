---
title: Create and deploy function code to Azure using Visual Studio Code
description: Learn how to create a function, then publish the local code project to serverless hosting in Azure Functions using the Azure Functions extension in Visual Studio Code.
ms.topic: quickstart
ms.date: 11/25/2025
ms.update-cycle: 180-days
ms.custom: 
  - mode-api
  - vscode-azure-extension-update-complete
  - devx-track-js
ms.collection: 
  - ce-skilling-ai-copilot
zone_pivot_groups: programming-languages-set-functions-full-no-go
#customer intent: As a developer, I want to learn how to create, test, and deploy Azure Functions using Visual Studio Code so that I can build and publish serverless apps efficiently.
---

# Quickstart: Create and deploy function code to Azure using Visual Studio Code

**Applies to: programming-language-csharp,programming-language-java,programming-language-javascript,programming-language-python,programming-language-powershell,programming-language-typescript**

Use Visual Studio Code to create a function that responds to HTTP requests from a template. Use GitHub Copilot to improve the generated function code, verify code updates locally, and then deploy it to the serverless Flex Consumption hosting plan in Azure Functions.

**Applies to: programming-language-other**

Use Visual Studio Code to create a [custom handler](functions-custom-handlers.md) function that responds to HTTP requests. After verifying the code locally, you deploy it to the serverless Flex Consumption hosting plan in Azure Functions.

Custom handlers can be used to create functions in any language or runtime by running an HTTP server process. This article supports Rust.

> **Tip:**
> **Looking for Go?** Go is now supported as a first-class language on Azure Functions. See the [Go quickstart](how-to-create-function-azure-cli.md?pivots=programming-language-go) to get started.


Completing this quickstart incurs a small cost of a few USD cents or less in your Azure account.

Make sure to select your preferred development language at the top of the article.

## Prerequisites

+ An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

+ [Visual Studio Code](https://code.visualstudio.com/) on one of the [supported platforms](https://code.visualstudio.com/docs/supporting/requirements#_platforms).

+ The [Azure Functions extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions) for Visual Studio Code. 
**Applies to: programming-language-csharp**

+ [.NET 8.0 SDK](https://dotnet.microsoft.com/download)

+ [C# extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp) for Visual Studio Code.  

**Applies to: programming-language-java**

+ The [Java Development Kit](https://learn.microsoft.com/azure/developer/java/fundamentals/java-support-on-azure), version 8, 11, 17, or 21 (Linux-only).

+ [Apache Maven](https://maven.apache.org), version 3.0 or above.

+ The [Java extension pack](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)       

**Applies to: programming-language-javascript,programming-language-typescript**

+ [Node.js 22.x](https://nodejs.org/en/about/previous-releases) or above. Use the `node --version` command to check your version.

**Applies to: programming-language-powershell**

+ [PowerShell 7.6](https://learn.microsoft.com/powershell/scripting/install/installing-powershell)

+ [.NET 10 runtime](https://dotnet.microsoft.com/download/dotnet/10.0)

+ The [PowerShell extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.PowerShell).  

**Applies to: programming-language-python**

+ Python versions that are [supported by Azure Functions](supported-languages.md#languages-by-runtime-version). For more information, see [How to install Python](https://wiki.python.org/moin/BeginnersGuide/Download).

+ The [Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python) for Visual Studio Code.

**Applies to: programming-language-other**

+ Rust toolchain using [rustup](https://www.rust-lang.org/tools/install). Use the `rustc --version` command to check your version.



## Install or update Core Tools

The Azure Functions extension for Visual Studio Code integrates with Azure Functions Core Tools so that you can run and debug your functions locally in Visual Studio Code by using the Azure Functions runtime. Before getting started, install Core Tools locally or update an existing installation to use the latest version.

> **Important:**
> If you previously installed Core Tools on Windows by using the MSI installer, uninstall it from **Add or Remove Programs**. An existing MSI-based Core Tools installation might prevent Visual Studio Code from running and updating the correct version of Core Tools.

In Visual Studio Code, select **F1** to open the command palette, and then search for and run the command **Azure Functions: Install or Update Core Tools**.
    
This command tries to either start a package-based installation of the latest version of Core Tools or update an existing package-based installation. If you don't have npm or Homebrew installed on your local computer, [manually install or update Core Tools](functions-run-local.md#install-the-azure-functions-core-tools).




## <a name="create-an-azure-functions-project"></a>Create your local project

In this section, you use Visual Studio Code to create a local Azure Functions project in your preferred language. Later in the article, you update, run, and then publish your function code to Azure.

1. In Visual Studio Code, press <kbd>F1</kbd> to open the command palette. Search for and run the command `Azure Functions: Create New Project...`.

1. Choose the directory location for your project workspace and choose **Select**. You should either create a new folder or choose an empty folder for the project workspace. Don't choose a project folder that is already part of a workspace.

1. Provide the following information at the prompts:
    **Applies to: programming-language-csharp**


    | Prompt | Selection |
    | --- | --- |
    | **Select a language** | Choose `C#`. |
    | **Select a .NET runtime** | Choose `.NET 8.0 LTS`. |
    | **Select a template for your project's first function** | Choose `HTTP trigger`. |
    | **Provide a function name** | Type `HttpExample`. |
    | **Provide a namespace** | Type `My.Functions`. |
    | **Authorization level** | Choose `Function`, which requires an access key to call your function endpoint. For more information, see [Authorization level](functions-bindings-http-webhook-trigger.md#http-auth). |
    | **Select how you would like to open your project** | Choose `Open in current window`. |


    **Applies to: programming-language-java**


    | Prompt | Selection |
    | --- | --- |
    | **Select a language** | Choose `Java`. |
    | **Select a version of Java** | Choose `Java 8`,  `Java 11`, `Java 17`, `Java 21` or `Java 25`, the Java version on which your functions run in Azure. Choose a Java version that you've verified locally. |
    | **Provide a group ID** | Choose `com.function`. |
    | **Provide an artifact ID** | Choose `myFunction`. |
    | **Provide a version** | Choose `1.0-SNAPSHOT`. |
    | **Provide a package name** | Choose `com.function`. |
    | **Provide an app name** | Choose `myFunction-12345`. |
    | **Select a template for your project's first function** | Choose `HTTP trigger`. |
    | **Select the build tool for Java project** | Choose `Maven`. |
    | **Select how you would like to open your project** | Choose `Open in current window`. |


    **Applies to: programming-language-javascript**


    | Prompt | Selection |
    | --- | --- |
    | **Select a language** | Choose `JavaScript`. |
    | **Select a JavaScript programming model** | Choose `Model V4`. |
    | **Select a template for your project's first function** | Choose `HTTP trigger`. |
    | **Provide a function name** | Type `HttpExample`. |
    | **Authorization level** | Choose `Function`, which requires an access key to call your function endpoint. For more information, see [Authorization level](functions-bindings-http-webhook-trigger.md#http-auth). |
    | **Select how you would like to open your project** | Choose `Open in current window`. |


    **Applies to: programming-language-typescript**


    | Prompt | Selection |
    | --- | --- |
    | **Select a language** | Choose `TypeScript`. |
    | **Select a JavaScript programming model** | Choose `Model V4`. |
    | **Select a template for your project's first function** | Choose `HTTP trigger`. |
    | **Provide a function name** | Type `HttpExample`. |
    | **Authorization level** | Choose `Function`, which requires an access key to call your function endpoint. For more information, see [Authorization level](functions-bindings-http-webhook-trigger.md#http-auth). |
    | **Select how you would like to open your project** | Choose `Open in current window`. |


    **Applies to: programming-language-python**


    | Prompt | Selection |
    | --- | --- |
    | **Select a language** | Choose `Python`. |
    | **Select a Python interpreter to create a virtual environment** | Choose your preferred Python interpreter. If an option isn't shown, type in the full path to your Python binary. |
    | **Select a template for your project's first function** | Choose `HTTP trigger`. |
    | **Name of the function you want to create** | Enter `HttpExample`. |
    | **Authorization level** | Choose `FUNCTION`, which requires an access key to call your function endpoint. For more information, see [Authorization level](functions-bindings-http-webhook-trigger.md#http-auth). |
    | **Select how you would like to open your project** | Choose `Open in current window`. |


    **Applies to: programming-language-powershell**


    | Prompt | Selection |
    | --- | --- |
    | **Select a language for your function project** | Choose `PowerShell`. |
    | **Select a template for your project's first function** | Choose `HTTP trigger`. |
    | **Provide a function name** | Type `HttpExample`. |
    | **Authorization level** | Choose `Function`, which requires an access key to call your function endpoint. For more information, see [Authorization level](functions-bindings-http-webhook-trigger.md#http-auth). |
    | **Select how you would like to open your project** | Choose `Open in current window`. |


    **Applies to: programming-language-other**


    | Prompt | Selection |
    | --- | --- |
    | **Select a language for your function project** | Choose `Custom Handler`. |
    | **Select a template for your project's first function** | Choose `HTTP trigger`. |
    | **Provide a function name** | Type `HttpExample`. |
    | **Authorization level** | Choose `Function`, which requires an access key to call your function endpoint. For more information, see [Authorization level](functions-bindings-http-webhook-trigger.md#http-auth). |
    | **Select how you would like to open your project** | Choose `Open in current window`. |



    Using this information, Visual Studio Code generates a code project for Azure Functions with an HTTP trigger function endpoint. You can view the local project files in the Explorer. To learn more about files that are created, see [Generated project files](functions-develop-vs-code.md?tabs=javascript#generated-project-files).
 
**Applies to: programming-language-python**

4. In the local.settings.json file, update the `AzureWebJobsStorage` setting as in the following example:

    ```json
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    ```
    
    This setting tells the local Functions host to use the storage emulator for the storage connection required by the Python v2 model. When you publish your project to Azure, this setting uses the default storage account instead. If you use an Azure Storage account during local development, set your storage account connection string here.   

## Start the emulator

1. In Visual Studio Code, press <kbd>F1</kbd> to open the command palette. In the command palette, search for and select `Azurite: Start`.

1. Check the bottom bar and verify that Azurite emulation services are running. If so, you can now run your function locally.

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

Visual Studio Code integrates with [Azure Functions Core tools](functions-run-local.md) to let you run this project on your local development computer before you publish to Azure.

1. To start the function locally, press <kbd>F5</kbd> or the **Run and Debug** icon in the left-hand side Activity bar. The **Terminal** panel displays the Output from Core Tools. Your app starts in the **Terminal** panel. You can see the URL endpoint of your HTTP-triggered function running locally.

    Screenshot of the Local function VS Code output.

    If you have trouble running on Windows, make sure that the default terminal for Visual Studio Code isn't set to **WSL Bash**.

1. With Core Tools still running in **Terminal**, choose the Azure icon in the activity bar. In the **Workspace** area, expand **Local Project** > **Functions**. Right-click (Windows) or <kbd>Ctrl -</kbd> click (macOS) the new function and choose **Execute Function Now...**.

    Execute function now from Visual Studio Code

2. In **Enter request body** you see the request message body value of `{ "name": "Azure" }`. Press Enter to send this request message to your function.

3. When the function executes locally and returns a response, a notification is raised in Visual Studio Code. Information about the function execution is shown in **Terminal** panel.

4. With the **Terminal** panel focused, press <kbd>Ctrl + C</kbd> to stop Core Tools and disconnect the debugger.
  
**Applies to: programming-language-csharp,programming-language-java,programming-language-javascript,programming-language-python,programming-language-powershell,programming-language-typescript**

After you verify that the function runs correctly on your local computer, you can optionally use AI tools, such as GitHub Copilot in Visual Studio Code, to update template-generated function code. 

## Use AI to normalize and validate input

This example prompt for Copilot Chat updates the existing function code to retrieve parameters from either the query string or JSON body. It applies formatting or type conversions and returns the parameters as JSON in the response: 

**Applies to: programming-language-csharp**

```copilot-prompt
Modify the function to accept name, email, and age from the JSON body of the
request. If any of these parameters are missing from the query string, read
them from the JSON body. Return all three parameters in the JSON response, 
applying these rules:
Title-case the name
Lowercase the email
Convert age to an integer if possible, otherwise return "not provided"
Use sensible defaults if any parameter is missing
Make sure that any added packages are compatible with the version of the packages already in the project
```

**Applies to: programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python**

```copilot-prompt
Modify the function to accept name, email, and age from the JSON body of the
request. If any of these parameters are missing from the query string, read
them from the JSON body. Return all three parameters in the JSON response, 
applying these rules:
Title-case the name
Lowercase the email
Convert age to an integer if possible, otherwise return "not provided"
Use sensible defaults if any parameter is missing
```

**Applies to: programming-language-java**

```copilot-prompt
Modify the function to accept name, email, and age from the JSON body of the
request. If any of these parameters are missing from the query string, read
them from the JSON body. Return all three parameters in the JSON response, 
applying these rules:
Title-case the name
Lowercase the email
Convert age to an integer if possible, otherwise return "not provided"
Use sensible defaults if any parameter is missing
Update the FunctionTest.java file to test the new logic. 
```

**Applies to: programming-language-csharp,programming-language-java,programming-language-javascript,programming-language-python,programming-language-powershell,programming-language-typescript**

You can customize your prompt to add specifics as needed. Then run the app again locally and verify that it works as expected after the code changes. This time, use a message body like:

```json
{ "name": "devon torres", "email": "torres.devon@contoso.com", "age": "34" }
```

> **Tip:**  
> GitHub Copilot is powered by AI, so surprises and mistakes are possible. If you encounter any errors during execution, paste the error message in the chat window, select **Agent** mode, and ask Copilot to help resolve the error. For more information, see [Copilot FAQs](https://aka.ms/copilot-general-use-faqs).
>
> When running in **Agent** mode, the results of this customization depend on the specific tools available to your agent.
 
When you're satisfied with your app, use Visual Studio Code to publish the project directly to Azure.

**Applies to: programming-language-other**

After you verify that the function runs correctly on your local computer, use Visual Studio Code to publish the project directly to Azure.



## Sign in to Azure

Before you can create Azure resources or publish your app, you must sign in to Azure.

1. If you aren't already signed in, in the **Activity bar**, select the Azure icon. Then under **Resources**, select **Sign in to Azure**.

    Screenshot of the sign in to Azure window in Visual Studio Code.

    If you're already signed in and can see your existing subscriptions, go to the next section. If you don't yet have an Azure account, select **Create an Azure Account**. Students can select **Create an Azure for Students Account**.

1. When you are prompted in the browser, select your Azure account and sign in by using your Azure account credentials. If you create a new account, you can sign in after your account is created.

1. After you successfully sign in, you can close the new browser window. The subscriptions that belong to your Azure account are displayed in the side bar.


## Create the function app in Azure


In this section, you create a function app in the Flex Consumption plan along with related resources in your Azure subscription. Many of the resource creation decisions are made for you based on default behaviors. For more control over the created resources, you must instead [create your function app with advanced options](functions-develop-vs-code.md?tabs=advanced-options#publish-to-azure).

1. In Visual Studio Code, select F1 to open the command palette. At the prompt (`>`), enter and then select **Azure Functions: Create Function App in Azure**.

1. At the prompts, provide the following information:

    | Prompt | Action |
    | --- | --- |
    | **Select subscription** | Select the Azure subscription to use. The prompt doesn't appear when you have only one subscription visible under **Resources**. |
    | **Enter a new function app name** | Enter a globally unique name that's valid in a URL path. The name you enter is validated to make sure that it's unique in Azure Functions. |
    | **Select a location for new resources** | Select an Azure region. For better performance, select a [region](https://azure.microsoft.com/explore/global-infrastructure/geographies/) near you. Only regions supported by Flex Consumption plans are displayed. |
    | **Select a runtime stack** | Select the language version you currently run locally. |
    | **Select resource authentication type** | Select **Managed identity**, which is the most secure option for connecting to the [default host storage account](storage-considerations.md#storage-account-guidance). |

    In the **Azure: Activity Log** panel, the Azure extension shows the status of individual resources as they're created in Azure.

    Screenshot that shows the log of Azure resource creation.

1. When the function app is created, the following related resources are created in your Azure subscription. The resources are named based on the name you entered for your function app.

    
+ A [resource group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/overview.md), which is a logical container for related resources.
+ A function app, which provides the environment for executing your function code. A function app lets you group functions as a logical unit for easier management, deployment, and sharing of resources within the same hosting plan.
+ An Azure App Service plan, which defines the underlying host for your function app.
+ A standard [Azure Storage account](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-create.md), which is used by the Functions host to maintain state and other information about your function app.
+ An Application Insights instance that's connected to the function app, and which tracks the use of your functions in the app.
+ A user-assigned managed identity that's added to the [Storage Blob Data Contributor](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/storage#storage-blob-data-contributor) role in the new default host storage account.



    A notification is displayed after your function app is created and the deployment package is applied.

        
> **Tip:**
> By default, the Azure resources required by your function app are created based on the name you enter for your function app. By default, the resources are created with the function app in the same, new resource group. If you want to customize the names of the associated resources or reuse existing resources, [publish the project with advanced create options](functions-develop-vs-code.md?tabs=advanced-options#publish-to-azure).
    


**Applies to: programming-language-other**

## Compile the custom handler for Azure

In this section, you compile your project for deployment to Azure in a function app running Linux. In most cases, you need to recompile your binary and adjust your configuration to match the target platform before publishing it to Azure.

1. Create a file at *.cargo/config*. Add the following contents and save the file.

    ```
    [target.x86_64-unknown-linux-musl]
    linker = "rust-lld"
    ```

1. In the integrated terminal, compile the handler to Linux/x64. A binary named `handler` is created. Copy it to the function app root.

    ```bash
    rustup target add x86_64-unknown-linux-musl
    cargo build --release --target=x86_64-unknown-linux-musl
    cp target/x86_64-unknown-linux-musl/release/handler .
    ```

1. If you're using Windows, change the `defaultExecutablePath` in *host.json* from `handler.exe` to `handler`. This change instructs the function app to run the Linux binary.

1. Add the following line to the *.funcignore* file:

    ```
    target
    ```

    This line prevents publishing the contents of the *target* folder.



## Deploy the project to Azure


> **Important:**
> Deploying to an existing function app always overwrites the contents of that app in Azure.

1. In the command palette, enter and then select **Azure Functions: Deploy to Function App**.  

1. Select the function app you just created. When prompted about overwriting previous deployments, select **Deploy** to deploy your function code to the new function app resource.

1. When deployment is completed, select **View Output** to view the creation and deployment results, including the Azure resources that you created. If you miss the notification, select the bell icon in the lower-right corner to see it again.

    Screenshot of the View Output window.


## Run the function in Azure

1. Press <kbd>F1</kbd> to display the command palette, then search for and run the command `Azure Functions:Execute Function Now...`. If prompted, select your subscription.

1. Select your new function app resource and `HttpExample` as your function.

1. In **Enter request body** type `{ "name": "Contoso", "email": "me@contoso.com", "age": "34" }`, then press Enter to send this request message to your function.

1. When the function executes in Azure, the response is displayed in the notification area. Expand the notification to review the full response.

## Troubleshooting

Use the following table to resolve the most common issues encountered when using this article.

| Problem | Solution |
| --- | --- |
| Can't create a local function project? | Make sure you have the [Azure Functions extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions) installed. |
| Can't run the function locally? | Make sure you have the latest version of [Azure Functions Core Tools installed](functions-run-local.md?tabs=node). <br/>When running on Windows, make sure that the default terminal shell for Visual Studio Code isn't set to WSL Bash. |
| Can't deploy function to Azure? | Review the Output for error information. The bell icon in the lower right corner is another way to view the output. Did you publish to an existing function app? That action overwrites the content of that app in Azure. |
| Couldn't run the cloud-based Function app? | Remember to use the query string to send in parameters, or use the request body for custom handlers. |


## Clean up resources

When you continue to the [next step](#next-steps) and add an Azure Storage queue binding to your function, you'll need to keep all your resources in place to build on what you've already done.

Otherwise, you can use the following steps to delete the function app and its related resources to avoid incurring any further costs.


1. In Visual Studio Code, select the Azure icon to open the Azure explorer. 
1. In the Resource Groups section, find your resource group.
1. Right-click the resource group and select **Delete**.


To learn more about Functions costs, see [Estimating Consumption plan costs](functions-consumption-costs.md).

## Next steps
**Applies to: programming-language-csharp,programming-language-java,programming-language-javascript,programming-language-python,programming-language-powershell,programming-language-typescript**

You used [Visual Studio Code](functions-develop-vs-code.md) to create a function app with a simple HTTP-triggered function. In the next articles, you expand that function by connecting to either Azure Cosmos DB or Azure Storage. To learn more about connecting to other Azure services, see [Add bindings to an existing function in Azure Functions](add-bindings-existing-function.md). If you want to learn more about security, see [Securing Azure Functions](security-concepts.md).

> 
> [Connect to Azure Cosmos DB](functions-add-output-binding-cosmos-db-vs-code.md)
> 
> [Connect to Azure Queue Storage](functions-add-output-binding-storage-queue-vs-code.md)

**Applies to: programming-language-other**

> 
> [Azure Functions custom handlers](functions-custom-handlers.md)
