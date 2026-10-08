---
title: "Quickstart: Analyze text content"
titleSuffix: Azure AI services
description: Get started using Azure AI Content Safety to analyze text content for objectionable material.
author: ssalgadodev
manager: mcleans
ms.service: azure-ai-content-safety
ms.custom: build-2023, devx-track-python, devx-track-dotnet, devx-track-extended-java, devx-track-js, dev-focus
ms.topic: quickstart
ms.date: 11/21/2025
ms.author: ssalgado
ai-usage: ai-assisted
zone_pivot_groups: programming-languages-content-safety-2
---

# QuickStart: Analyze text content

In this quickstart, you analyze text content for harmful material using Azure AI Content Safety. The Azure AI Content Safety service provides you with AI algorithms for flagging objectionable content.

For more information on text moderation, see the [Harm categories concept page](concepts/harm-categories.md). For API input limits, see the [Input requirements](overview.md#input-requirements) section of the Overview.

Choose your preferred language below for detailed steps:

> **Caution:**
> 
> The sample data and code may contain offensive content. User discretion is advised.

**Applies to: programming-language-foundry-portal**



## Prerequisites

- An Azure account. If you don't have one, you can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An [Azure AI resource](https://ms.portal.azure.com/#view/Microsoft_Azure_ProjectOxford/CognitiveServicesHub/~/AIServices). 



## Setup

Follow these steps to use the Content Safety **try it out** page: 

1. Go to [Azure AI Foundry](https://ai.azure.com/?cid=learnDocs) and navigate to your project/hub. Then select the **Guardrails + controls** tab on the left nav and select the **Try it out** tab.
1. On the **Try it out** page, you can experiment with various Guardrails & controls features such as text and image content, using adjustable thresholds to filter for inappropriate or harmful content.

Screenshot of the try it out page for Guardrails & controls.

## Analyze text

1. Select the **Moderate text content** panel.
1. Add text to the input field, or select sample text from the panels on the page. 
1. Select **Run test**.
    The service returns all the categories that were detected, with the severity level for each: 0-Safe, 2-Low, 4-Medium, 6-High. It also returns a binary **Accepted**/**Rejected** result, based on the filters you configure. Use the matrix in the **Configure filters** tab to set your allowed/prohibited severity levels for each category. Then you can run the text again to see how the filter works. 

## View and export code 

You can use the **View Code** feature in either the **Analyze text content** or **Analyze image content** pages to view and copy the sample code, which includes configuration for severity filtering, blocklists, and moderation functions. You can then deploy the code on your end.

Screenshot of the View code button.




**Applies to: programming-language-rest**



## Prerequisites

* An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) 
* Once you have your Azure subscription, <a href="https://aka.ms/acs-create"  title="Create a Content Safety resource"  target="_blank">create a Content Safety resource </a> in the Azure portal to get your key and endpoint. Enter a unique name for your resource, select your subscription, and select a resource group, supported region (see [Region availability](https://learn.microsoft.com/azure/ai-services/content-safety/overview#region-availability)), and supported pricing tier. Then select **Create**.
  * The resource takes a few minutes to deploy. After it finishes, Select **go to resource**. In the left pane, under **Resource Management**, select **Subscription Key and Endpoint**. The endpoint and either of the keys are used to call APIs.
* **Cognitive Services User** role or higher on the Content Safety resource
* [cURL](https://curl.haxx.se/) installed

## Analyze text content

The following section walks through a sample request with cURL. Paste the command below into a text editor, and make the following changes.

1. Replace `<endpoint>` with the endpoint URL associated with your resource.
1. Replace `<your_subscription_key>` with one of the keys that come with your resource.
1. Optionally, replace the `"text"` field in the body with your own text you'd like to analyze.
    > **Tip:**
    > Text size and granularity
    >
    > See [Input requirements](overview.md#input-requirements) for maximum text length limitations.

```shell
curl --location --request POST '<endpoint>/contentsafety/text:analyze?api-version=2024-09-01' \
--header 'Ocp-Apim-Subscription-Key: <your_subscription_key>' \
--header 'Content-Type: application/json' \
--data-raw '{
  "text": "I hate you",
  "categories": ["Hate", "Sexual", "SelfHarm", "Violence"],
  "blocklistNames": ["string"],
  "haltOnBlocklistHit": true,
  "outputType": "FourSeverityLevels"
}'
```

The below fields must be included in the url:

| Name | Required | Description | Type |
| :--- | --- | :--- | --- |
| **API Version** | Required | This is the API version to be checked. The current version is: api-version=2024-09-01. Example: `<endpoint>/contentsafety/text:analyze?api-version=2024-09-01` | String |

The parameters in the request body are defined in this table:

| Name | Required | Description | Type |
| :--- | --- | :--- | --- |
| **text** | Required | This is the raw text to be checked. Other non-ascii characters can be included. | String |
| **categories** | Optional | This is assumed to be an array of category names. See the [Harm categories guide](concepts/harm-categories.md) for a list of available category names. If no categories are specified, all four categories are used. We use multiple categories to get scores in a single request. | String |
| **blocklistNames** | Optional | Text blocklist Name. Only support following characters:  `0-9 A-Z a-z - . _ ~`. You could attach multiple list names here. | Array |
| **haltOnBlocklistHit** | Optional | When set to `true`, further analyses of harmful content won't be performed in cases where blocklists are hit. When set to `false`, all analyses of harmful content will be performed, whether or not blocklists are hit. | Boolean |
| **outputType** | Optional | `"FourSeverityLevels"` or `"EightSeverityLevels"`. Output severities in four or eight levels, the value can be `0,2,4,6` or `0,1,2,3,4,5,6,7`. | String |

See the following sample request body:

```json
{
  "text": "I hate you",
  "categories": ["Hate", "Sexual", "SelfHarm", "Violence"],
  "blocklistNames": ["array"],
  "haltOnBlocklistHit": false,
  "outputType": "FourSeverityLevels"
}
```

Open a command prompt window, paste in the edited cURL command, and run it.


## Output

You should see the text moderation results displayed as JSON data in the console output. For example:

```json
{
  "blocklistsMatch": [
    {
      "blocklistName": "string",
      "blocklistItemId": "string",
      "blocklistItemText": "string"
    }
  ],
  "categoriesAnalysis": [
    {
      "category": "Hate",
      "severity": 2
    },
    {
      "category": "SelfHarm",
      "severity": 0
    },
    {
      "category": "Sexual",
      "severity": 0
    },
    {
      "category": "Violence",
      "severity": 0
    }
  ]
}
```

The JSON fields in the output are defined here:

| Name | Description | Type |
| :--- | :--- | --- |
| **categoriesAnalysis** | Each output class that the API predicts. Classification can be multi-labeled. For example, when a text sample is run through the text moderation model, it could be classified as both sexual content and violence. [Harm categories](concepts/harm-categories.md) | String |
| **Severity** | The higher the severity of input content, the larger this value is. | Integer |

**References**: [Content Safety REST API](https://learn.microsoft.com/rest/api/contentsafety/text-operations), [Text Analysis API](https://learn.microsoft.com/rest/api/contentsafety/text-operations/analyze-text)




**Applies to: programming-language-csharp**



[Reference documentation](https://learn.microsoft.com/dotnet/api/overview/azure/ai.contentsafety-readme) | [Library source code](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/contentsafety/Azure.AI.ContentSafety) | [Package (NuGet)](https://www.nuget.org/packages/Azure.AI.ContentSafety) | [Samples](https://github.com/Azure-Samples/AzureAIContentSafety/tree/main/dotnet/1.0.0)

## Prerequisites

* An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) 
* The [Visual Studio IDE](https://visualstudio.microsoft.com/vs/) with workload .NET desktop development enabled. Or if you don't plan on using Visual Studio IDE, you need the current version of [.NET Core](https://dotnet.microsoft.com/download/dotnet-core).
* Once you have your Azure subscription, <a href="https://aka.ms/acs-create"  title="Create a Content Safety resource"  target="_blank">create a Content Safety resource </a> in the Azure portal to get your key and endpoint. Enter a unique name for your resource, select your subscription, and select a resource group, supported region (see [Region availability](https://learn.microsoft.com/azure/ai-services/content-safety/overview#region-availability)), and supported pricing tier. Then select **Create**.
  * The resource takes a few minutes to deploy. After it finishes, Select **go to resource**. In the left pane, under **Resource Management**, select **Subscription Key and Endpoint**. The endpoint and either of the keys are used to call APIs.
* **Cognitive Services User** role or higher on the Content Safety resource

## Set up application

Create a new C# application.

#### [Visual Studio IDE](#tab/visual-studio)

Open Visual Studio, and under **Get started** select **Create a new project**. Set the template filters to _C#/All Platforms/Console_. Select **Console App** (command-line application that can run on .NET on Windows, Linux and macOS) and choose **Next**. Update the project name to _ContentSafetyQuickstart_ and choose **Next**. Select **.NET 6.0** or above, and choose **Create** to create the project.

### Install the client SDK 

Once you've created a new project, install the client SDK by right-clicking on the project solution in the **Solution Explorer** and selecting **Manage NuGet Packages**. In the package manager that opens select **Browse**, and search for `Azure.AI.ContentSafety`. Select **Install**.

#### [CLI](#tab/cli)

In a console window (such as cmd, PowerShell, or Bash), use the `dotnet new` command to create a new console app with the name `content-safety-quickstart`. This command creates a simple "Hello World" C# project with a single source file: *Program.cs*.

```dotnet
dotnet new console -n content-safety-quickstart
```

Change your directory to the newly created app folder. You can build the application with:

```dotnet
dotnet build
```

The build output should contain no warnings or errors. 

```console
...
Build succeeded.
  0 Warning(s)
  0 Error(s)
...
```

### Install the client SDK

Within the application directory, install the Computer Vision client SDK for .NET with the following command:

```dotnet
dotnet add package Azure.AI.ContentSafety
```
    
---


## Create environment variables 

In this example, you'll write your credentials to environment variables on the local machine running the application.

To set the environment variable for your key and endpoint, open a console window and follow the instructions for your operating system and development environment.

- To set the `CONTENT_SAFETY_KEY` environment variable, replace `YOUR_CONTENT_SAFETY_KEY` with one of the keys for your resource.
- To set the `CONTENT_SAFETY_ENDPOINT` environment variable, replace `YOUR_CONTENT_SAFETY_ENDPOINT` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-safety/quickstart-text.md)

#### [Windows](#tab/windows)

```console
setx CONTENT_SAFETY_KEY 'YOUR_CONTENT_SAFETY_KEY'
```

```console
setx CONTENT_SAFETY_ENDPOINT 'YOUR_CONTENT_SAFETY_ENDPOINT'
```

After you add the environment variables, you might need to restart any running programs that will read the environment variables, including the console window.

#### [Linux](#tab/linux)

```bash
export CONTENT_SAFETY_KEY='YOUR_CONTENT_SAFETY_KEY'
```

```bash
export CONTENT_SAFETY_ENDPOINT='YOUR_CONTENT_SAFETY_ENDPOINT'
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

---


## Analyze text content

From the project directory, open the *Program.cs* file that was created previously. Paste in the following code:

```csharp
using System;
using Azure.AI.ContentSafety;

namespace Azure.AI.ContentSafety.Dotnet.Sample
{
  class ContentSafetySampleAnalyzeText
  {
    public static void AnalyzeText()
    {
      // retrieve the endpoint and key from the environment variables created earlier
      string endpoint = Environment.GetEnvironmentVariable("CONTENT_SAFETY_ENDPOINT");
      string key = Environment.GetEnvironmentVariable("CONTENT_SAFETY_KEY");

      ContentSafetyClient client = new ContentSafetyClient(new Uri(endpoint), new AzureKeyCredential(key));

      string text = "Your input text";

      var request = new AnalyzeTextOptions(text);

      Response<AnalyzeTextResult> response;
      try
      {
          response = client.AnalyzeText(request);
      }
      catch (RequestFailedException ex)
      {
          Console.WriteLine("Analyze text failed.\nStatus code: {0}, Error code: {1}, Error message: {2}", ex.Status, ex.ErrorCode, ex.Message);
          throw;
      }

      Console.WriteLine("\nAnalyze text succeeded:");
      Console.WriteLine("Hate severity: {0}", response.Value.CategoriesAnalysis.FirstOrDefault(a => a.Category == TextCategory.Hate)?.Severity ?? 0);
      Console.WriteLine("SelfHarm severity: {0}", response.Value.CategoriesAnalysis.FirstOrDefault(a => a.Category == TextCategory.SelfHarm)?.Severity ?? 0);
      Console.WriteLine("Sexual severity: {0}", response.Value.CategoriesAnalysis.FirstOrDefault(a => a.Category == TextCategory.Sexual)?.Severity ?? 0);
      Console.WriteLine("Violence severity: {0}", response.Value.CategoriesAnalysis.FirstOrDefault(a => a.Category == TextCategory.Violence)?.Severity ?? 0);

    }
    static void Main()
    {
        AnalyzeText();
    }
  }
}
```

Replace `"Your input text"` with the text content you'd like to use.

> **Tip:**
> Text size and granularity
>
> See [Input requirements](overview.md#input-requirements) for maximum text length limitations.

#### [Visual Studio IDE](#tab/visual-studio)

Build and run the application by selecting **Start Debugging** from the **Debug** menu at the top of the IDE window (or press **F5**).

#### [CLI](#tab/cli)

Build and run the application from your application directory with these commands:

```dotnet
dotnet build
dotnet run
```

### Expected output

The application outputs severity scores for each content category:

```console
Analyze text succeeded:
Hate severity: 0
SelfHarm severity: 0
Sexual severity: 0
Violence severity: 0
```

Severity levels range from 0 (safe) to 6 (high risk).

**References**: [ContentSafetyClient](https://learn.microsoft.com/dotnet/api/azure.ai.contentsafety.contentsafetyclient), [AnalyzeTextOptions](https://learn.microsoft.com/dotnet/api/azure.ai.contentsafety.analyzetextoptions), [TextCategory](https://learn.microsoft.com/dotnet/api/azure.ai.contentsafety.textcategory)

---



**Applies to: programming-language-python**



[Reference documentation](https://pypi.org/project/azure-ai-contentsafety/) | [Library source code](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/contentsafety/azure-ai-contentsafety) | [Package (PyPI)](https://pypi.org/project/azure-ai-contentsafety/) | [Samples](https://github.com/Azure-Samples/AzureAIContentSafety/tree/main/python/1.0.0) |

## Prerequisites

* An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) 
* Once you have your Azure subscription, <a href="https://aka.ms/acs-create"  title="Create a Content Safety resource"  target="_blank">create a Content Safety resource </a> in the Azure portal to get your key and endpoint. Enter a unique name for your resource, select your subscription, and select a resource group, supported region (see [Region availability](https://learn.microsoft.com/azure/ai-services/content-safety/overview#region-availability)), and supported pricing tier. Then select **Create**.
  * The resource takes a few minutes to deploy. After it finishes, Select **go to resource**. In the left pane, under **Resource Management**, select **Subscription Key and Endpoint**. The endpoint and either of the keys are used to call APIs.
* **Cognitive Services User** role or higher on the Content Safety resource
* [Python 3.x](https://www.python.org/)
  * Your Python installation should include [pip](https://pip.pypa.io/en/stable/). You can check if you have pip installed by running `pip --version` on the command line. Get pip by installing the latest version of Python.


## Create environment variables 

In this example, you'll write your credentials to environment variables on the local machine running the application.

To set the environment variable for your key and endpoint, open a console window and follow the instructions for your operating system and development environment.

- To set the `CONTENT_SAFETY_KEY` environment variable, replace `YOUR_CONTENT_SAFETY_KEY` with one of the keys for your resource.
- To set the `CONTENT_SAFETY_ENDPOINT` environment variable, replace `YOUR_CONTENT_SAFETY_ENDPOINT` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-safety/quickstart-text.md)

#### [Windows](#tab/windows)

```console
setx CONTENT_SAFETY_KEY 'YOUR_CONTENT_SAFETY_KEY'
```

```console
setx CONTENT_SAFETY_ENDPOINT 'YOUR_CONTENT_SAFETY_ENDPOINT'
```

After you add the environment variables, you might need to restart any running programs that will read the environment variables, including the console window.

#### [Linux](#tab/linux)

```bash
export CONTENT_SAFETY_KEY='YOUR_CONTENT_SAFETY_KEY'
```

```bash
export CONTENT_SAFETY_ENDPOINT='YOUR_CONTENT_SAFETY_ENDPOINT'
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

---



## Analyze text content

The following section walks through a sample request with the Python SDK.

1. Open a command prompt, navigate to your project folder, and create a new file named *quickstart.py*.
1. Run this command to install the Azure AI Content Safety library:

    ```console
    pip install azure-ai-contentsafety
    ```

1. Copy the following code into *quickstart.py*:

    ```python
    import os
    from azure.ai.contentsafety import ContentSafetyClient
    from azure.core.credentials import AzureKeyCredential
    from azure.core.exceptions import HttpResponseError
    from azure.ai.contentsafety.models import AnalyzeTextOptions, TextCategory
    
    def analyze_text():
        # analyze text
        key = os.environ["CONTENT_SAFETY_KEY"]
        endpoint = os.environ["CONTENT_SAFETY_ENDPOINT"]
    
        # Create an Azure AI Content Safety client
        client = ContentSafetyClient(endpoint, AzureKeyCredential(key))
    
        # Contruct request
        request = AnalyzeTextOptions(text="Your input text")
    
        # Analyze text
        try:
            response = client.analyze_text(request)
        except HttpResponseError as e:
            print("Analyze text failed.")
            if e.error:
                print(f"Error code: {e.error.code}")
                print(f"Error message: {e.error.message}")
                raise
            print(e)
            raise

        hate_result = next(item for item in response.categories_analysis if item.category == TextCategory.HATE)
        self_harm_result = next(item for item in response.categories_analysis if item.category == TextCategory.SELF_HARM)
        sexual_result = next(item for item in response.categories_analysis if item.category == TextCategory.SEXUAL)
        violence_result = next(item for item in response.categories_analysis if item.category == TextCategory.VIOLENCE)
    
        if hate_result:
            print(f"Hate severity: {hate_result.severity}")
        if self_harm_result:
            print(f"SelfHarm severity: {self_harm_result.severity}")
        if sexual_result:
            print(f"Sexual severity: {sexual_result.severity}")
        if violence_result:
            print(f"Violence severity: {violence_result.severity}")
    
    if __name__ == "__main__":
        analyze_text()
    ```
1. Replace `"Your input text"` with the text content you'd like to use.
    > **Tip:**
    > Text size and granularity
    >
    > See [Input requirements](overview.md#input-requirements) for maximum text length limitations.
1. Then run the application with the `python` command on your quickstart file.

    ```console
    python quickstart.py
    ```

### Expected output

The script will output severity scores for each content category:

```console
Hate severity: 0
SelfHarm severity: 0
Sexual severity: 0
Violence severity: 0
```

Severity levels range from 0 (safe) to 6 (high risk).

**References**: [ContentSafetyClient](https://learn.microsoft.com/python/api/azure-ai-contentsafety/azure.ai.contentsafety.contentsafetyclient), [AnalyzeTextOptions](https://learn.microsoft.com/python/api/azure-ai-contentsafety/azure.ai.contentsafety.models.analyzetextoptions), [TextCategory](https://learn.microsoft.com/python/api/azure-ai-contentsafety/azure.ai.contentsafety.models.textcategory)




**Applies to: programming-language-java**



[Reference documentation](https://learn.microsoft.com/java/api/overview/azure/ai-contentsafety-readme) | [Library source code](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/contentsafety/azure-ai-contentsafety/src) | [Artifact (Maven)](https://central.sonatype.com/artifact/com.azure/azure-ai-contentsafety) | [Samples](https://github.com/Azure-Samples/AzureAIContentSafety/tree/main/java/1.0.0)


## Prerequisites


* An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) 
* The current version of the [Java Development Kit (JDK)](https://www.microsoft.com/openjdk)
* The [Gradle build tool](https://gradle.org/install/), or another dependency manager.
* Once you have your Azure subscription, <a href="https://aka.ms/acs-create"  title="Create a Content Safety resource"  target="_blank">create a Content Safety resource </a> in the Azure portal to get your key and endpoint. Enter a unique name for your resource, select your subscription, and select a resource group, supported region (see [Region availability](https://learn.microsoft.com/azure/ai-services/content-safety/overview#region-availability)), and supported pricing tier. Then select **Create**.
  * The resource takes a few minutes to deploy. After it finishes, Select **go to resource**. In the left pane, under **Resource Management**, select **Subscription Key and Endpoint**. The endpoint and either of the keys are used to call APIs.
* **Cognitive Services User** role or higher on the Content Safety resource

## Set up application
Create a new Gradle project.

In a console window (such as cmd, PowerShell, or Bash), create a new directory for your app, and navigate to it. 
    
```console
mkdir myapp && cd myapp
```

Run the `gradle init` command from your working directory. This command will create essential build files for Gradle, including *build.gradle.kts*, which is used at runtime to create and configure your application.

```console
gradle init --type basic
```

When prompted to choose a **DSL**, select **Kotlin**.

From your working directory, run the following command to create a project source folder:

```console
mkdir -p src/main/java
```

Navigate to the new folder and create a file called *ContentSafetyQuickstart.java*.


### Install the client SDK 

This quickstart uses the Gradle dependency manager. You can find the client library and information for other dependency managers on the [Maven Central Repository](https://central.sonatype.com/artifact/com.azure/azure-ai-contentsafety).

Locate *build.gradle.kts* and open it with your preferred IDE or text editor. Then copy in the following build configuration. This configuration defines the project as a Java application whose entry point is the class **ContentSafetyQuickstart**. It imports the Azure AI Vision library.

```kotlin
plugins {
    java
    application
}
application { 
    mainClass.set("ContentSafetyQuickstart")
}
repositories {
    mavenCentral()
}
dependencies {
    implementation(group = "com.azure", name = "azure-ai-contentsafety", version = "1.0.0")
}
```


## Create environment variables 

In this example, you'll write your credentials to environment variables on the local machine running the application.

To set the environment variable for your key and endpoint, open a console window and follow the instructions for your operating system and development environment.

- To set the `CONTENT_SAFETY_KEY` environment variable, replace `YOUR_CONTENT_SAFETY_KEY` with one of the keys for your resource.
- To set the `CONTENT_SAFETY_ENDPOINT` environment variable, replace `YOUR_CONTENT_SAFETY_ENDPOINT` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-safety/quickstart-text.md)

#### [Windows](#tab/windows)

```console
setx CONTENT_SAFETY_KEY 'YOUR_CONTENT_SAFETY_KEY'
```

```console
setx CONTENT_SAFETY_ENDPOINT 'YOUR_CONTENT_SAFETY_ENDPOINT'
```

After you add the environment variables, you might need to restart any running programs that will read the environment variables, including the console window.

#### [Linux](#tab/linux)

```bash
export CONTENT_SAFETY_KEY='YOUR_CONTENT_SAFETY_KEY'
```

```bash
export CONTENT_SAFETY_ENDPOINT='YOUR_CONTENT_SAFETY_ENDPOINT'
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

---



## Analyze text content

Open *ContentSafetyQuickstart.java* in your preferred editor or IDE and paste in the following code. Replace `<your text sample>` with the text content you'd like to use.

> **Tip:**
> Text size and granularity
>
> See [Input requirements](overview.md#input-requirements) for maximum text length limitations.

```Java
import com.azure.ai.contentsafety.ContentSafetyClient;
import com.azure.ai.contentsafety.ContentSafetyClientBuilder;
import com.azure.ai.contentsafety.models.AnalyzeTextOptions;
import com.azure.ai.contentsafety.models.AnalyzeTextResult;
import com.azure.ai.contentsafety.models.TextCategoriesAnalysis;
import com.azure.core.credential.KeyCredential;
import com.azure.core.util.Configuration;


public class ContentSafetyQuickstart {
    public static void main(String[] args) {

        // get endpoint and key from environment variables
        String endpoint = System.getenv("CONTENT_SAFETY_ENDPOINT");
        String key = System.getenv("CONTENT_SAFETY_KEY");
        
        ContentSafetyClient contentSafetyClient = new ContentSafetyClientBuilder()
            .credential(new KeyCredential(key))
            .endpoint(endpoint).buildClient();

        AnalyzeTextResult response = contentSafetyClient.analyzeText(new AnalyzeTextOptions("<your text sample>"));

        for (TextCategoriesAnalysis result : response.getCategoriesAnalysis()) {
            System.out.println(result.getCategory() + " severity: " + result.getSeverity());
        }
    }
}
```

Navigate back to the project root folder, and build the app with:

```console
gradle build
```

Then, run it with the `gradle run` command:

```console
gradle run
```

## Output

The application outputs severity scores for each content category:

```console
Hate severity: 0
SelfHarm severity: 0
Sexual severity: 0
Violence severity: 0
```

Severity levels range from 0 (safe) to 6 (high risk). Higher scores indicate more severe content in that category.

**References**: [ContentSafetyClient](https://learn.microsoft.com/java/api/com.azure.ai.contentsafety.contentsafetyclient), [AnalyzeTextOptions](https://learn.microsoft.com/java/api/com.azure.ai.contentsafety.models.analyzetextoptions), [AnalyzeTextResult](https://learn.microsoft.com/java/api/com.azure.ai.contentsafety.models.analyzetextresult)



**Applies to: programming-language-javascript**



[Reference documentation](https://www.npmjs.com/package/@azure-rest/ai-content-safety/v/1.0.0) | [Library source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentsafety/ai-content-safety-rest) | [Package (npm)](https://www.npmjs.com/package/@azure-rest/ai-content-safety) | [Samples](https://github.com/Azure-Samples/AzureAIContentSafety/tree/main/js/1.0.0) |


## Prerequisites

* An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) 
* The current version of [Node.js](https://nodejs.org/)
* Once you have your Azure subscription, <a href="https://aka.ms/acs-create"  title="Create a Content Safety resource"  target="_blank">create a Content Safety resource </a> in the Azure portal to get your key and endpoint. Enter a unique name for your resource, select your subscription, and select a resource group, supported region (see [Region availability](https://learn.microsoft.com/azure/ai-services/content-safety/overview#region-availability)), and supported pricing tier. Then select **Create**.
  * The resource takes a few minutes to deploy. After it finishes, Select **go to resource**. In the left pane, under **Resource Management**, select **Subscription Key and Endpoint**. The endpoint and either of the keys are used to call APIs.
* **Cognitive Services User** role or higher on the Content Safety resource

## Set up application

Create a new Node.js application. In a console window (such as cmd, PowerShell, or Bash), create a new directory for your app, and navigate to it.

```console
mkdir myapp && cd myapp
```

Run the `npm init` command to create a node application with a `package.json` file.

```console
npm init
```

### Install the client SDK 

Install the `@azure-rest/ai-content-safety` npm package:

```console
npm install @azure-rest/ai-content-safety
```

Also install the `dotenv` module to use environment variables:

```console
npm install dotenv
```

Your app's `package.json` file will be updated with the dependencies.


## Create environment variables 

In this example, you'll write your credentials to environment variables on the local machine running the application.

To set the environment variable for your key and endpoint, open a console window and follow the instructions for your operating system and development environment.

- To set the `CONTENT_SAFETY_KEY` environment variable, replace `YOUR_CONTENT_SAFETY_KEY` with one of the keys for your resource.
- To set the `CONTENT_SAFETY_ENDPOINT` environment variable, replace `YOUR_CONTENT_SAFETY_ENDPOINT` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-safety/quickstart-text.md)

#### [Windows](#tab/windows)

```console
setx CONTENT_SAFETY_KEY 'YOUR_CONTENT_SAFETY_KEY'
```

```console
setx CONTENT_SAFETY_ENDPOINT 'YOUR_CONTENT_SAFETY_ENDPOINT'
```

After you add the environment variables, you might need to restart any running programs that will read the environment variables, including the console window.

#### [Linux](#tab/linux)

```bash
export CONTENT_SAFETY_KEY='YOUR_CONTENT_SAFETY_KEY'
```

```bash
export CONTENT_SAFETY_ENDPOINT='YOUR_CONTENT_SAFETY_ENDPOINT'
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

---


## Analyze text content

Create a new file in your directory, *index.js*. Open it in your preferred editor or IDE and paste in the following code. Replace `<your text sample>` with the text content you'd like to use.

> **Tip:**
> Text size and granularity
>
> See [Input requirements](overview.md#input-requirements) for maximum text length limitations.

```JavaScript
const ContentSafetyClient = require("@azure-rest/ai-content-safety").default,
  { isUnexpected } = require("@azure-rest/ai-content-safety");
const { AzureKeyCredential } = require("@azure/core-auth");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
    // get endpoint and key from environment variables
    const endpoint = process.env["CONTENT_SAFETY_ENDPOINT"];
    const key = process.env["CONTENT_SAFETY_KEY"];
    
    const credential = new AzureKeyCredential(key);
    const client = ContentSafetyClient(endpoint, credential);
    
    // replace with your own sample text string 
    const text = "<your sample text>";
    const analyzeTextOption = { text: text };
    const analyzeTextParameters = { body: analyzeTextOption };
    
    const result = await client.path("/text:analyze").post(analyzeTextParameters);
    
    if (isUnexpected(result)) {
        throw result;
    }
    
    for (let i = 0; i < result.body.categoriesAnalysis.length; i++) {
    const textCategoriesAnalysisOutput = result.body.categoriesAnalysis[i];
    console.log(
      textCategoriesAnalysisOutput.category,
      " severity: ",
      textCategoriesAnalysisOutput.severity
    );
  }
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});
```

Run the application with the `node` command on your quickstart file.

```console
node index.js
```

## Output

The application outputs severity scores for each content category:

```console
Hate severity:  0
SelfHarm severity:  0
Sexual severity:  0
Violence severity:  0
```

Severity levels range from 0 (safe) to 6 (high risk).

**References**: [Content Safety REST Client](https://www.npmjs.com/package/@azure-rest/ai-content-safety), [Text Analysis API](https://www.npmjs.com/package/@azure-rest/ai-content-safety)


**Applies to: programming-language-typescript**



[Reference documentation](https://www.npmjs.com/package/@azure-rest/ai-content-safety) | [Library source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentsafety/ai-content-safety-rest) | [Package (npm)](https://www.npmjs.com/package/@azure-rest/ai-content-safety) | [Samples](https://github.com/Azure-Samples/AzureAIContentSafety/tree/main/js/1.0.0) |


## Prerequisites

* An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) 
* [Node.js LTS](https://nodejs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* Once you have your Azure subscription, <a href="https://aka.ms/acs-create"  title="Create a Content Safety resource"  target="_blank">create a Content Safety resource </a> in the Azure portal to get your key and endpoint. Enter a unique name for your resource, select your subscription, and select a resource group, supported region (see [Region availability](https://learn.microsoft.com/azure/ai-services/content-safety/overview#region-availability)), and supported pricing tier. Then select **Create**.
  * The resource takes a few minutes to deploy. After it finishes, Select **go to resource**. In the left pane, under **Resource Management**, select **Subscription Key and Endpoint**. The endpoint and either of the keys are used to call APIs.
* **Cognitive Services User** role or higher on the Content Safety resource

## Set up application

1. Create a new TypeScript application. In a console window (such as cmd, PowerShell, or Bash), create a new directory for your app, and navigate to it.

    ```console
    mkdir content-safety-typescript && cd content-safety-typescript
    code .
    ```
    
1. Initialize a new Node.js project with TypeScript:

    ```console
    npm init -y
    npm pkg set type=module
    ```

1. Install the required packages:

   ```console
   npm install @azure-rest/ai-content-safety @azure/core-auth
   ```

1. Install development dependencies:

   ```console
   npm install typescript @types/node --save-dev
   ```

1. Create a `tsconfig.json` file in your project directory:

   ```json
   {
     "compilerOptions": {
       "target": "es2022",
       "module": "esnext",
       "moduleResolution": "bundler",
       "rootDir": "./src",
       "outDir": "./dist/",
       "esModuleInterop": true,
       "forceConsistentCasingInFileNames": true,
       "strict": true,
       "skipLibCheck": true,
       "declaration": true,
       "sourceMap": true,
       "resolveJsonModule": true,
       "moduleDetection": "force",
       "allowSyntheticDefaultImports": true,
       "verbatimModuleSyntax": false
     },
     "include": [
       "src/**/*.ts"
     ],
     "exclude": [
       "node_modules/**/*",
       "**/*.spec.ts"
     ]
   }
   ```

1. Update `package.json` to include a script for building TypeScript files:

   ```json
   "scripts": {
     "build": "tsc",
     "start": "node dist/index.js"
   }
   ```

1. Create a `src` directory for your TypeScript code.


## Create environment variables 

In this example, you'll write your credentials to environment variables on the local machine running the application.

To set the environment variable for your key and endpoint, open a console window and follow the instructions for your operating system and development environment.

- To set the `CONTENT_SAFETY_KEY` environment variable, replace `YOUR_CONTENT_SAFETY_KEY` with one of the keys for your resource.
- To set the `CONTENT_SAFETY_ENDPOINT` environment variable, replace `YOUR_CONTENT_SAFETY_ENDPOINT` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-safety/quickstart-text.md)

#### [Windows](#tab/windows)

```console
setx CONTENT_SAFETY_KEY 'YOUR_CONTENT_SAFETY_KEY'
```

```console
setx CONTENT_SAFETY_ENDPOINT 'YOUR_CONTENT_SAFETY_ENDPOINT'
```

After you add the environment variables, you might need to restart any running programs that will read the environment variables, including the console window.

#### [Linux](#tab/linux)

```bash
export CONTENT_SAFETY_KEY='YOUR_CONTENT_SAFETY_KEY'
```

```bash
export CONTENT_SAFETY_ENDPOINT='YOUR_CONTENT_SAFETY_ENDPOINT'
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

---


## Analyze text content

Create a file in the `src` directory named `index.ts`. Open it in your preferred editor or IDE and paste in the following code. Replace `<your text sample>` with the text content you'd like to analyze.

> **Tip:**
> Text size and granularity
>
> See [Input requirements](overview.md#input-requirements) for maximum text length limitations.

```typescript
import ContentSafetyClient, { 
  isUnexpected, 
  AnalyzeTextParameters,
  AnalyzeText200Response,
  AnalyzeTextDefaultResponse,
  AnalyzeTextOptions,
  TextCategoriesAnalysisOutput 
} from "@azure-rest/ai-content-safety";
import { AzureKeyCredential } from "@azure/core-auth";

// Get endpoint and key from environment variables
const endpoint = process.env.CONTENT_SAFETY_ENDPOINT;
const key = process.env.CONTENT_SAFETY_KEY;

if (!endpoint || !key) {
  throw new Error("Missing required environment variables: CONTENT_SAFETY_ENDPOINT or CONTENT_SAFETY_KEY");
}

try {
  // Create client with Azure Key Credential
  const credential = new AzureKeyCredential(key);
  const client = ContentSafetyClient(endpoint, credential);
  
  // Replace with your own sample text string
  const text = "Replace with your text sample";
  const analyzeTextOption: AnalyzeTextOptions = { text };
  const analyzeTextParameters: AnalyzeTextParameters = { body: analyzeTextOption };
  
  // Call the Content Safety API to analyze the text
  const result: AnalyzeText200Response | AnalyzeTextDefaultResponse = await client.path("/text:analyze").post(analyzeTextParameters);
  
  if (isUnexpected(result)) {
    throw result;
  }
  
  // Process and display the analysis results
  console.log("Text analysis results:");
  
  const categoriesAnalysis = result.body.categoriesAnalysis as TextCategoriesAnalysisOutput[];
  
  for (const analysis of categoriesAnalysis) {
    console.log(`${analysis.category} severity: ${analysis.severity}`);
  }
} catch (error: any) {
  console.error("The sample encountered an error:", error.message);
}
```

## Build and run the application

1. Build the TypeScript code:

```console
npm run build
```

1. Run the application:

```console
npm start
```

## Output

The application outputs severity scores for each content category:

```console
Text analysis results:
Hate severity: 0
SelfHarm severity: 0
Sexual severity: 0
Violence severity: 0
```

Severity levels range from 0 (safe) to 6 (high risk).

**References**: [Content Safety REST Client](https://www.npmjs.com/package/@azure-rest/ai-content-safety), [AzureKeyCredential](https://learn.microsoft.com/javascript/api/@azure/core-auth/azurekeycredential)





## Clean up resources

If you want to clean up and remove an Azure AI services subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it.

- [Azure portal](../multi-service-resource.md?pivots=azportal#clean-up-resources)
- [Azure CLI](../multi-service-resource.md?pivots=azcli#clean-up-resources)


## Related content

* [Harm categories](concepts/harm-categories.md)
* Configure filters for each category and test on datasets using [Content Safety Studio](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-safety/studio-quickstart.md), export the code and deploy.
