---
title: "Quickstart: Entity linking using the client library and REST API"
titleSuffix: Foundry Tools
description: 'Use this quickstart to perform Entity Linking, using C#, Python, Java, JavaScript, and the REST API.'
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.topic: quickstart
ms.date: 06/30/2026
ms.author: lajanuar
ms.devlang: csharp
# ms.devlang: csharp, java, javascript, python
ms.custom: language-service-entity-linking, mode-api, devx-track-extended-java, devx-track-js, devx-track-python
keywords: text mining, entity linking
zone_pivot_groups: programming-languages-entity-linking
---
# Quickstart: Entity Linking using the client library and REST API

> **Important:**
> Entity Linking is retiring from Azure Language in Foundry Tools effective **September 1, 2028**. After this date, the Entity Linking feature is no longer supported.   During the support window, we recommend that users migrate existing workloads and direct all new projects to Language [**Named Entity Recognition**](../named-entity-recognition/overview.md) or consider other alternative solutions.


**Applies to: programming-language-csharp**


[Reference documentation](https://learn.microsoft.com/dotnet/api/azure.ai.textanalytics?preserve-view=true\&view=azure-dotnet) | [More samples](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/textanalytics/Azure.AI.TextAnalytics/samples) | [Package (NuGet)](https://www.nuget.org/packages/Azure.AI.TextAnalytics/5.2.0) | [Library source code](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/textanalytics/Azure.AI.TextAnalytics)

Use this quickstart to create an entity linking application with the client library for .NET. In the following example, you create a C# application that can identify and disambiguate entities found in text.

> **Tip:**
> You can use [**Microsoft Foundry**](https://ai.azure.com/) to try Azure Language features without needing to write code. 


## Prerequisites

* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* The [Visual Studio IDE](https://visualstudio.microsoft.com/vs/)


## Setting up

### Create an Azure resource

To use the code sample below, you need to deploy an Azure resource. This resource will contain a key and endpoint you use to authenticate the API calls you send to Azure Language.

1. Use the following link to <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesTextAnalytics" target="_blank">create a language resource</a> using the Azure portal. You need to sign in using your Azure subscription.
1. On the **Select additional features** screen that appears, select **Continue to create your resource**.

    A screenshot showing additional feature options in the Azure portal.

1. In the **Create language** screen, provide the following information:

    | Detail | Description |
    | --- | --- |
    | Subscription | The subscription account that your resource will be associated with. Select your Azure subscription from the drop-down menu. |
    | Resource group | A resource group is a container that stores the resources you create. Select **Create new** to create a new resource group. |
    | Region | The location of your Language resource. Different regions may introduce latency depending on your physical location, but have no impact on the runtime availability of your resource. For this quickstart, either select an available region near you, or choose **East US**. |
    | Name | The name for your Language resource. This name will also be used to create an endpoint URL that your applications will use to send API requests. |
    | Pricing tier | The [pricing tier](https://azure.microsoft.com/pricing/details/cognitive-services/language-service/) for your Language resource. You can use the **Free F0** tier to try the service and upgrade later to a paid tier for production. |
     
    A screenshot showing resource creation details in the Azure portal.

1. Make sure the **Responsible AI Notice** checkbox is checked.
1. Select **Review + Create** at the bottom of the page.

1. In the screen that appears, make sure the validation has passed, and that you entered your information correctly. Then select **Create**. 




### Get your key and endpoint

Next you will need the key and endpoint from the resource to connect your application to the API. You'll paste your key and endpoint into the code later in the quickstart.

1. After Azure Language resource deploys successfully, click the **Go to Resource** button under **Next Steps**.

    A screenshot showing the next steps after a resource has deployed.

1. On the screen for your resource, select **Keys and endpoint** on the left pane. You will use one of your keys and your endpoint in the steps below. 

    A screenshot showing the keys and endpoint section for a resource.




### Create environment variables 

Your application must be authenticated to send API requests. For production, use a secure way of storing and accessing your credentials. In this example, you will write your credentials to environment variables on the local machine running the application.

To set the environment variable for your Language resource key, open a console window, and follow the instructions for your operating system and development environment. 

- To set the `LANGUAGE_KEY` environment variable, replace `your-key` with one of the keys for your resource.
- To set the `LANGUAGE_ENDPOINT` environment variable, replace `your-endpoint` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/entity-linking/quickstart.md)

#### [Windows](#tab/windows)

```console
setx LANGUAGE_KEY your-key
```

```console
setx LANGUAGE_ENDPOINT your-endpoint
```

> **Note:**
> If you only need to access the environment variables in the current running console, you can set the environment variable with `set` instead of `setx`.

After you add the environment variables, you might need to restart any running programs that will need to read the environment variables, including the console window. For example, if you're using Visual Studio as your editor, restart Visual Studio before running the example.

#### [Linux](#tab/linux)

```bash
export LANGUAGE_KEY=your-key
```

```bash
export LANGUAGE_ENDPOINT=your-endpoint
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

#### [macOS](#tab/macos)

##### Bash

```bash
export LANGUAGE_KEY=your-key
```

```bash
export LANGUAGE_ENDPOINT=your-endpoint
```

After you add the environment variables, run `source ~/.bash_profile` from your console window to make the changes effective.

##### Xcode

For iOS and macOS development, you set the environment variables in Xcode. For example, follow these steps to set the environment variable in Xcode 13.4.1.

1. Select **Product** > **Scheme** > **Edit scheme**
1. Select **Arguments** on the **Run** (Debug Run) page
1. Under **Environment Variables** select the plus (+) sign to add a new environment variable. 
1. Enter `LANGUAGE_KEY` for the **Name** and enter your Language resource key for the **Value**.
1. Perform these steps for your resource endpoint. Name the new environment variable `LANGUAGE_ENDPOINT`.

For more configuration options, see the [Xcode documentation](https://help.apple.com/xcode/#/dev745c5c974).

---


### Create a new .NET Core application

Using the Visual Studio IDE, create a new .NET Core console app. This step creates a "Hello World" project with a single C# source file: *program.cs*.

Install the client library by right-clicking the solution in the **Solution Explorer** and selecting **Manage NuGet Packages**. In the package manager that opens select **Browse** and search for `Azure.AI.TextAnalytics`. Select version `5.2.0`, and then **Install**. You can also use the [Package Manager Console](https://learn.microsoft.com/nuget/consume-packages/install-use-packages-powershell#find-and-install-a-package).

## Code example

Copy the following code into your *program.cs* file and run the code. 

```csharp
using Azure;
using System;
using System.Globalization;
using Azure.AI.TextAnalytics;

namespace EntityLinkingExample
{
    class Program
    {
        // This example requires environment variables named "LANGUAGE_KEY" and "LANGUAGE_ENDPOINT"
        static string languageKey = Environment.GetEnvironmentVariable("LANGUAGE_KEY");
        static string languageEndpoint = Environment.GetEnvironmentVariable("LANGUAGE_ENDPOINT");

        private static readonly AzureKeyCredential credentials = new AzureKeyCredential(languageKey);
        private static readonly Uri endpoint = new Uri(languageEndpoint);
        
        // Example method for recognizing entities and providing a link to an online data source.
        static void EntityLinkingExample(TextAnalyticsClient client)
        {
            var response = client.RecognizeLinkedEntities(
                "Microsoft was founded by Bill Gates and Paul Allen on April 4, 1975, " +
                "to develop and sell BASIC interpreters for the Altair 8800. " +
                "During his career at Microsoft, Gates held the positions of chairman, " +
                "chief executive officer, president and chief software architect, " +
                "while also being the largest individual shareholder until May 2014.");
            Console.WriteLine("Linked Entities:");
            foreach (var entity in response.Value)
            {
                Console.WriteLine($"\tName: {entity.Name},\tID: {entity.DataSourceEntityId},\tURL: {entity.Url}\tData Source: {entity.DataSource}");
                Console.WriteLine("\tMatches:");
                foreach (var match in entity.Matches)
                {
                    Console.WriteLine($"\t\tText: {match.Text}");
                    Console.WriteLine($"\t\tScore: {match.ConfidenceScore:F2}\n");
                }
            }
        }

        static void Main(string[] args)
        {
            var client = new TextAnalyticsClient(endpoint, credentials);
            EntityLinkingExample(client);

            Console.Write("Press any key to exit.");
            Console.ReadKey();
        }

    }
}

```



### Output

```console
Linked Entities:
    Name: Microsoft,        ID: Microsoft,  URL: https://en.wikipedia.org/wiki/Microsoft    Data Source: Wikipedia
    Matches:
            Text: Microsoft
            Score: 0.55

            Text: Microsoft
            Score: 0.55

    Name: Bill Gates,       ID: Bill Gates, URL: https://en.wikipedia.org/wiki/Bill_Gates   Data Source: Wikipedia
    Matches:
            Text: Bill Gates
            Score: 0.63

            Text: Gates
            Score: 0.63

    Name: Paul Allen,       ID: Paul Allen, URL: https://en.wikipedia.org/wiki/Paul_Allen   Data Source: Wikipedia
    Matches:
            Text: Paul Allen
            Score: 0.60

    Name: April 4,  ID: April 4,    URL: https://en.wikipedia.org/wiki/April_4      Data Source: Wikipedia
    Matches:
            Text: April 4
            Score: 0.32

    Name: BASIC,    ID: BASIC,      URL: https://en.wikipedia.org/wiki/BASIC        Data Source: Wikipedia
    Matches:
            Text: BASIC
            Score: 0.33

    Name: Altair 8800,      ID: Altair 8800,        URL: https://en.wikipedia.org/wiki/Altair_8800  Data Source: Wikipedia
    Matches:
            Text: Altair 8800
            Score: 0.88
```

## Clean up resources

To clean up and remove an Azure AI resource, you can delete either the individual resource or the entire resource group. If you delete the resource group, all resources contained within are also deleted.

* [Azure portal](../../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../../multi-service-resource.md?pivots=azcli#clean-up-resources)


## Next steps

* [Entity linking language support](language-support.md)
* [How to call the entity linking API](how-to/call-api.md)  
* [Reference documentation](https://learn.microsoft.com/dotnet/api/azure.ai.textanalytics?preserve-view=true\&view=azure-dotnet)
* [More samples](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/textanalytics/Azure.AI.TextAnalytics/samples)




**Applies to: programming-language-java**


[Reference documentation](https://learn.microsoft.com/java/api/overview/azure/ai-textanalytics-readme?preserve-view=true\&view=azure-java-stable) | [More samples](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/textanalytics/azure-ai-textanalytics/src/samples) | [Package (Maven)](https://mvnrepository.com/artifact/com.azure/azure-ai-textanalytics/5.2.0) | [Library source code](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/textanalytics/azure-ai-textanalytics)

Use this quickstart to create an entity linking application with the client library for Java. In the following example, you create a Java application that can identify and disambiguate entities found in text.

## Prerequisites

* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* [Java Development Kit (JDK)](https://www.oracle.com/technetwork/java/javase/downloads/index.html) with version 8 or above


## Setting up

### Create an Azure resource

To use the code sample below, you need to deploy an Azure resource. This resource will contain a key and endpoint you use to authenticate the API calls you send to Azure Language.

1. Use the following link to <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesTextAnalytics" target="_blank">create a language resource</a> using the Azure portal. You need to sign in using your Azure subscription.
1. On the **Select additional features** screen that appears, select **Continue to create your resource**.

    A screenshot showing additional feature options in the Azure portal.

1. In the **Create language** screen, provide the following information:

    | Detail | Description |
    | --- | --- |
    | Subscription | The subscription account that your resource will be associated with. Select your Azure subscription from the drop-down menu. |
    | Resource group | A resource group is a container that stores the resources you create. Select **Create new** to create a new resource group. |
    | Region | The location of your Language resource. Different regions may introduce latency depending on your physical location, but have no impact on the runtime availability of your resource. For this quickstart, either select an available region near you, or choose **East US**. |
    | Name | The name for your Language resource. This name will also be used to create an endpoint URL that your applications will use to send API requests. |
    | Pricing tier | The [pricing tier](https://azure.microsoft.com/pricing/details/cognitive-services/language-service/) for your Language resource. You can use the **Free F0** tier to try the service and upgrade later to a paid tier for production. |
     
    A screenshot showing resource creation details in the Azure portal.

1. Make sure the **Responsible AI Notice** checkbox is checked.
1. Select **Review + Create** at the bottom of the page.

1. In the screen that appears, make sure the validation has passed, and that you entered your information correctly. Then select **Create**. 




### Get your key and endpoint

Next you will need the key and endpoint from the resource to connect your application to the API. You'll paste your key and endpoint into the code later in the quickstart.

1. After Azure Language resource deploys successfully, click the **Go to Resource** button under **Next Steps**.

    A screenshot showing the next steps after a resource has deployed.

1. On the screen for your resource, select **Keys and endpoint** on the left pane. You will use one of your keys and your endpoint in the steps below. 

    A screenshot showing the keys and endpoint section for a resource.




### Create environment variables 

Your application must be authenticated to send API requests. For production, use a secure way of storing and accessing your credentials. In this example, you will write your credentials to environment variables on the local machine running the application.

To set the environment variable for your Language resource key, open a console window, and follow the instructions for your operating system and development environment. 

- To set the `LANGUAGE_KEY` environment variable, replace `your-key` with one of the keys for your resource.
- To set the `LANGUAGE_ENDPOINT` environment variable, replace `your-endpoint` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/entity-linking/quickstart.md)

#### [Windows](#tab/windows)

```console
setx LANGUAGE_KEY your-key
```

```console
setx LANGUAGE_ENDPOINT your-endpoint
```

> **Note:**
> If you only need to access the environment variables in the current running console, you can set the environment variable with `set` instead of `setx`.

After you add the environment variables, you might need to restart any running programs that will need to read the environment variables, including the console window. For example, if you're using Visual Studio as your editor, restart Visual Studio before running the example.

#### [Linux](#tab/linux)

```bash
export LANGUAGE_KEY=your-key
```

```bash
export LANGUAGE_ENDPOINT=your-endpoint
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

#### [macOS](#tab/macos)

##### Bash

```bash
export LANGUAGE_KEY=your-key
```

```bash
export LANGUAGE_ENDPOINT=your-endpoint
```

After you add the environment variables, run `source ~/.bash_profile` from your console window to make the changes effective.

##### Xcode

For iOS and macOS development, you set the environment variables in Xcode. For example, follow these steps to set the environment variable in Xcode 13.4.1.

1. Select **Product** > **Scheme** > **Edit scheme**
1. Select **Arguments** on the **Run** (Debug Run) page
1. Under **Environment Variables** select the plus (+) sign to add a new environment variable. 
1. Enter `LANGUAGE_KEY` for the **Name** and enter your Language resource key for the **Value**.
1. Perform these steps for your resource endpoint. Name the new environment variable `LANGUAGE_ENDPOINT`.

For more configuration options, see the [Xcode documentation](https://help.apple.com/xcode/#/dev745c5c974).

---



### Add the client library

Create a Maven project in your preferred IDE or development environment. Then add the following dependency to your project's *pom.xml* file. You can find the implementation syntax [for other build tools](https://mvnrepository.com/artifact/com.azure/azure-ai-textanalytics/5.2.0) online.

```xml
<dependencies>
     <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-ai-textanalytics</artifactId>
        <version>5.2.0</version>
    </dependency>
</dependencies>
```



## Code example

Create a Java file named `Example.java`. Open the file and copy the below code. Then run the code. 

```java
import com.azure.core.credential.AzureKeyCredential;
import com.azure.ai.textanalytics.models.*;
import com.azure.ai.textanalytics.TextAnalyticsClientBuilder;
import com.azure.ai.textanalytics.TextAnalyticsClient;

public class Example {

    // This example requires environment variables named "LANGUAGE_KEY" and "LANGUAGE_ENDPOINT"
    private static String languageKey = System.getenv("LANGUAGE_KEY");
    private static String languageEndpoint = System.getenv("LANGUAGE_ENDPOINT");

    public static void main(String[] args) {
        TextAnalyticsClient client = authenticateClient(languageKey, languageEndpoint);
        recognizeLinkedEntitiesExample(client);
    }
    // Method to authenticate the client object with your key and endpoint
    static TextAnalyticsClient authenticateClient(String key, String endpoint) {
        return new TextAnalyticsClientBuilder()
                .credential(new AzureKeyCredential(key))
                .endpoint(endpoint)
                .buildClient();
    }
    // Example method for recognizing entities and providing a link to an online data source
    static void recognizeLinkedEntitiesExample(TextAnalyticsClient client)
    {
        // The text that need be analyzed.
        String text = "Microsoft was founded by Bill Gates and Paul Allen on April 4, 1975, " +
                "to develop and sell BASIC interpreters for the Altair 8800. " +
                "During his career at Microsoft, Gates held the positions of chairman, " +
                "chief executive officer, president and chief software architect, " +
                "while also being the largest individual shareholder until May 2014.";

        System.out.printf("Linked Entities:%n");
        for (LinkedEntity linkedEntity : client.recognizeLinkedEntities(text)) {
            System.out.printf("Name: %s, ID: %s, URL: %s, Data Source: %s.%n",
                    linkedEntity.getName(),
                    linkedEntity.getDataSourceEntityId(),
                    linkedEntity.getUrl(),
                    linkedEntity.getDataSource());
            System.out.printf("Matches:%n");
            for (LinkedEntityMatch linkedEntityMatch : linkedEntity.getMatches()) {
                System.out.printf("Text: %s, Score: %.2f, Offset: %s, Length: %s%n",
                        linkedEntityMatch.getText(),
                        linkedEntityMatch.getConfidenceScore(),
                        linkedEntityMatch.getOffset(),
                        linkedEntityMatch.getLength());
            }
        }
    }
}

```



### Output

```console
Linked Entities:

Name: Microsoft, ID: Microsoft, URL: https://en.wikipedia.org/wiki/Microsoft, Data Source: Wikipedia.
Matches:
Text: Microsoft, Score: 0.55, Offset: 0, Length: 9
Text: Microsoft, Score: 0.55, Offset: 150, Length: 9
Name: Bill Gates, ID: Bill Gates, URL: https://en.wikipedia.org/wiki/Bill_Gates, Data Source: Wikipedia.
Matches:
Text: Bill Gates, Score: 0.63, Offset: 25, Length: 10
Text: Gates, Score: 0.63, Offset: 161, Length: 5
Name: Paul Allen, ID: Paul Allen, URL: https://en.wikipedia.org/wiki/Paul_Allen, Data Source: Wikipedia.
Matches:
Text: Paul Allen, Score: 0.60, Offset: 40, Length: 10
Name: April 4, ID: April 4, URL: https://en.wikipedia.org/wiki/April_4, Data Source: Wikipedia.
Matches:
Text: April 4, Score: 0.32, Offset: 54, Length: 7
Name: BASIC, ID: BASIC, URL: https://en.wikipedia.org/wiki/BASIC, Data Source: Wikipedia.
Matches:
Text: BASIC, Score: 0.33, Offset: 89, Length: 5
Name: Altair 8800, ID: Altair 8800, URL: https://en.wikipedia.org/wiki/Altair_8800, Data Source: Wikipedia.
Matches:
Text: Altair 8800, Score: 0.88, Offset: 116, Length: 11

```

## Clean up resources

To clean up and remove an Azure AI resource, you can delete either the individual resource or the entire resource group. If you delete the resource group, all resources contained within are also deleted.

* [Azure portal](../../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../../multi-service-resource.md?pivots=azcli#clean-up-resources)




## Next steps

* [Entity linking language support](language-support.md)
* [How to call the entity linking API](how-to/call-api.md)  
* [Reference documentation](https://learn.microsoft.com/java/api/overview/azure/ai-textanalytics-readme?preserve-view=true\&view=azure-java-stable)
*[More samples](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/textanalytics/azure-ai-textanalytics/src/samples)




**Applies to: programming-language-javascript**


[Reference documentation](https://learn.microsoft.com/javascript/api/overview/azure/ai-language-text-readme) | [More samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitivelanguage/ai-language-text/samples/v1) | [Package (npm)](https://www.npmjs.com/package/@azure/ai-language-text) | [Library source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitivelanguage/ai-language-text) 

Use this quickstart to create an entity linking application with the client library for Node.js. In the following example, you create a JavaScript application that can identify and disambiguate entities found in text.


## Prerequisites

* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* [Node.js](https://nodejs.org/) v14 LTS or later


## Setting up

### Create an Azure resource

To use the code sample below, you need to deploy an Azure resource. This resource will contain a key and endpoint you use to authenticate the API calls you send to Azure Language.

1. Use the following link to <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesTextAnalytics" target="_blank">create a language resource</a> using the Azure portal. You need to sign in using your Azure subscription.
1. On the **Select additional features** screen that appears, select **Continue to create your resource**.

    A screenshot showing additional feature options in the Azure portal.

1. In the **Create language** screen, provide the following information:

    | Detail | Description |
    | --- | --- |
    | Subscription | The subscription account that your resource will be associated with. Select your Azure subscription from the drop-down menu. |
    | Resource group | A resource group is a container that stores the resources you create. Select **Create new** to create a new resource group. |
    | Region | The location of your Language resource. Different regions may introduce latency depending on your physical location, but have no impact on the runtime availability of your resource. For this quickstart, either select an available region near you, or choose **East US**. |
    | Name | The name for your Language resource. This name will also be used to create an endpoint URL that your applications will use to send API requests. |
    | Pricing tier | The [pricing tier](https://azure.microsoft.com/pricing/details/cognitive-services/language-service/) for your Language resource. You can use the **Free F0** tier to try the service and upgrade later to a paid tier for production. |
     
    A screenshot showing resource creation details in the Azure portal.

1. Make sure the **Responsible AI Notice** checkbox is checked.
1. Select **Review + Create** at the bottom of the page.

1. In the screen that appears, make sure the validation has passed, and that you entered your information correctly. Then select **Create**. 




### Get your key and endpoint

Next you will need the key and endpoint from the resource to connect your application to the API. You'll paste your key and endpoint into the code later in the quickstart.

1. After Azure Language resource deploys successfully, click the **Go to Resource** button under **Next Steps**.

    A screenshot showing the next steps after a resource has deployed.

1. On the screen for your resource, select **Keys and endpoint** on the left pane. You will use one of your keys and your endpoint in the steps below. 

    A screenshot showing the keys and endpoint section for a resource.




### Create environment variables 

Your application must be authenticated to send API requests. For production, use a secure way of storing and accessing your credentials. In this example, you will write your credentials to environment variables on the local machine running the application.

To set the environment variable for your Language resource key, open a console window, and follow the instructions for your operating system and development environment. 

- To set the `LANGUAGE_KEY` environment variable, replace `your-key` with one of the keys for your resource.
- To set the `LANGUAGE_ENDPOINT` environment variable, replace `your-endpoint` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/entity-linking/quickstart.md)

#### [Windows](#tab/windows)

```console
setx LANGUAGE_KEY your-key
```

```console
setx LANGUAGE_ENDPOINT your-endpoint
```

> **Note:**
> If you only need to access the environment variables in the current running console, you can set the environment variable with `set` instead of `setx`.

After you add the environment variables, you might need to restart any running programs that will need to read the environment variables, including the console window. For example, if you're using Visual Studio as your editor, restart Visual Studio before running the example.

#### [Linux](#tab/linux)

```bash
export LANGUAGE_KEY=your-key
```

```bash
export LANGUAGE_ENDPOINT=your-endpoint
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

#### [macOS](#tab/macos)

##### Bash

```bash
export LANGUAGE_KEY=your-key
```

```bash
export LANGUAGE_ENDPOINT=your-endpoint
```

After you add the environment variables, run `source ~/.bash_profile` from your console window to make the changes effective.

##### Xcode

For iOS and macOS development, you set the environment variables in Xcode. For example, follow these steps to set the environment variable in Xcode 13.4.1.

1. Select **Product** > **Scheme** > **Edit scheme**
1. Select **Arguments** on the **Run** (Debug Run) page
1. Under **Environment Variables** select the plus (+) sign to add a new environment variable. 
1. Enter `LANGUAGE_KEY` for the **Name** and enter your Language resource key for the **Value**.
1. Perform these steps for your resource endpoint. Name the new environment variable `LANGUAGE_ENDPOINT`.

For more configuration options, see the [Xcode documentation](https://help.apple.com/xcode/#/dev745c5c974).

---



### Create a new Node.js application

In a console window (such as cmd, PowerShell, or Bash), create a new directory for your app, and navigate to it. 

```console
mkdir myapp 

cd myapp
```

Run the `npm init` command to create a node application with a `package.json` file. 

```console
npm init
```

### Install the client library

Install the npm package:

```console
npm install @azure/ai-language-text
```



## Code example

Open the file and copy the below code. Then run the code. 

```javascript
"use strict";

const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

// This example requires environment variables named "LANGUAGE_KEY" and "LANGUAGE_ENDPOINT"
const key = process.env.LANGUAGE_KEY;
const endpoint = process.env.LANGUAGE_ENDPOINT;

//example sentence for recognizing entities
const documents = ["Microsoft was founded by Bill Gates and Paul Allen on April 4, 1975."];

//example of how to use the client to perform entity linking on a document
async function main() {
    console.log("== Entity linking sample ==");
  
    const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(key));
  
    const results = await client.analyze("EntityLinking", documents);
  
    for (const result of results) {
      console.log(`- Document ${result.id}`);
      if (!result.error) {
        console.log("\tEntities:");
        for (const entity of result.entities) {
          console.log(
            `\t- Entity ${entity.name}; link ${entity.url}; datasource: ${entity.dataSource}`
          );
          console.log("\t\tMatches:");
          for (const match of entity.matches) {
            console.log(
              `\t\t- Entity appears as "${match.text}" (confidence: ${match.confidenceScore}`
            );
          }
        }
      } else {
        console.error("  Error:", result.error);
      }
    }
  }

//call the main function
main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

```



### Output

```console
== Entity linking sample ==
- Document 0
    Entities:
    - Entity Microsoft; link https://en.wikipedia.org/wiki/Microsoft; datasource: Wikipedia
            Matches:
            - Entity appears as "Microsoft" (confidence: 0.48
    - Entity Bill Gates; link https://en.wikipedia.org/wiki/Bill_Gates; datasource: Wikipedia
            Matches:
            - Entity appears as "Bill Gates" (confidence: 0.52
    - Entity Paul Allen; link https://en.wikipedia.org/wiki/Paul_Allen; datasource: Wikipedia
            Matches:
            - Entity appears as "Paul Allen" (confidence: 0.54
    - Entity April 4; link https://en.wikipedia.org/wiki/April_4; datasource: Wikipedia
            Matches:
            - Entity appears as "April 4" (confidence: 0.38
```

## Clean up resources

To clean up and remove an Azure AI resource, you can delete either the individual resource or the entire resource group. If you delete the resource group, all resources contained within are also deleted.

* [Azure portal](../../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../../multi-service-resource.md?pivots=azcli#clean-up-resources)




## Next steps

* [Entity linking language support](language-support.md)
* [How to call the entity linking API](how-to/call-api.md)  
* [Reference documentation](https://learn.microsoft.com/javascript/api/overview/azure/ai-language-text-readme)
* [Additional samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitivelanguage/ai-language-text/samples/v1)




**Applies to: programming-language-python**


[Reference documentation](https://learn.microsoft.com/python/api/azure-ai-textanalytics/azure.ai.textanalytics?preserve-view=true\&view=azure-python) | [More samples](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/textanalytics/azure-ai-textanalytics/samples) | [Package (PyPi)](https://pypi.org/project/azure-ai-textanalytics/5.2.0/) | [Library source code](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/textanalytics/azure-ai-textanalytics)

Use this quickstart to create an entity linking application with the client library for Python. In the following example, you create a Python application that can identify and disambiguate entities found in text.


## Prerequisites

* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* [Python 3.7 or later](https://www.python.org/)


## Setting up

### Create an Azure resource

To use the code sample below, you need to deploy an Azure resource. This resource will contain a key and endpoint you use to authenticate the API calls you send to Azure Language.

1. Use the following link to <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesTextAnalytics" target="_blank">create a language resource</a> using the Azure portal. You need to sign in using your Azure subscription.
1. On the **Select additional features** screen that appears, select **Continue to create your resource**.

    A screenshot showing additional feature options in the Azure portal.

1. In the **Create language** screen, provide the following information:

    | Detail | Description |
    | --- | --- |
    | Subscription | The subscription account that your resource will be associated with. Select your Azure subscription from the drop-down menu. |
    | Resource group | A resource group is a container that stores the resources you create. Select **Create new** to create a new resource group. |
    | Region | The location of your Language resource. Different regions may introduce latency depending on your physical location, but have no impact on the runtime availability of your resource. For this quickstart, either select an available region near you, or choose **East US**. |
    | Name | The name for your Language resource. This name will also be used to create an endpoint URL that your applications will use to send API requests. |
    | Pricing tier | The [pricing tier](https://azure.microsoft.com/pricing/details/cognitive-services/language-service/) for your Language resource. You can use the **Free F0** tier to try the service and upgrade later to a paid tier for production. |
     
    A screenshot showing resource creation details in the Azure portal.

1. Make sure the **Responsible AI Notice** checkbox is checked.
1. Select **Review + Create** at the bottom of the page.

1. In the screen that appears, make sure the validation has passed, and that you entered your information correctly. Then select **Create**. 




### Get your key and endpoint

Next you will need the key and endpoint from the resource to connect your application to the API. You'll paste your key and endpoint into the code later in the quickstart.

1. After Azure Language resource deploys successfully, click the **Go to Resource** button under **Next Steps**.

    A screenshot showing the next steps after a resource has deployed.

1. On the screen for your resource, select **Keys and endpoint** on the left pane. You will use one of your keys and your endpoint in the steps below. 

    A screenshot showing the keys and endpoint section for a resource.




### Create environment variables 

Your application must be authenticated to send API requests. For production, use a secure way of storing and accessing your credentials. In this example, you will write your credentials to environment variables on the local machine running the application.

To set the environment variable for your Language resource key, open a console window, and follow the instructions for your operating system and development environment. 

- To set the `LANGUAGE_KEY` environment variable, replace `your-key` with one of the keys for your resource.
- To set the `LANGUAGE_ENDPOINT` environment variable, replace `your-endpoint` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/entity-linking/quickstart.md)

#### [Windows](#tab/windows)

```console
setx LANGUAGE_KEY your-key
```

```console
setx LANGUAGE_ENDPOINT your-endpoint
```

> **Note:**
> If you only need to access the environment variables in the current running console, you can set the environment variable with `set` instead of `setx`.

After you add the environment variables, you might need to restart any running programs that will need to read the environment variables, including the console window. For example, if you're using Visual Studio as your editor, restart Visual Studio before running the example.

#### [Linux](#tab/linux)

```bash
export LANGUAGE_KEY=your-key
```

```bash
export LANGUAGE_ENDPOINT=your-endpoint
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

#### [macOS](#tab/macos)

##### Bash

```bash
export LANGUAGE_KEY=your-key
```

```bash
export LANGUAGE_ENDPOINT=your-endpoint
```

After you add the environment variables, run `source ~/.bash_profile` from your console window to make the changes effective.

##### Xcode

For iOS and macOS development, you set the environment variables in Xcode. For example, follow these steps to set the environment variable in Xcode 13.4.1.

1. Select **Product** > **Scheme** > **Edit scheme**
1. Select **Arguments** on the **Run** (Debug Run) page
1. Under **Environment Variables** select the plus (+) sign to add a new environment variable. 
1. Enter `LANGUAGE_KEY` for the **Name** and enter your Language resource key for the **Value**.
1. Perform these steps for your resource endpoint. Name the new environment variable `LANGUAGE_ENDPOINT`.

For more configuration options, see the [Xcode documentation](https://help.apple.com/xcode/#/dev745c5c974).

---



### Install the client library

After installing Python, you can install the client library with:

```console
pip install azure-ai-textanalytics==5.2.0
```



## Code example

Create a new Python file and copy the below code. Then run the code. 

```python
# This example requires environment variables named "LANGUAGE_KEY" and "LANGUAGE_ENDPOINT"
language_key = os.environ.get('LANGUAGE_KEY')
language_endpoint = os.environ.get('LANGUAGE_ENDPOINT')

from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential

# Authenticate the client using your key and endpoint. 
def authenticate_client():
    ta_credential = AzureKeyCredential(language_key)
    text_analytics_client = TextAnalyticsClient(
            endpoint=language_endpoint, 
            credential=ta_credential)
    return text_analytics_client

client = authenticate_client()

# Example function for recognizing entities and providing a link to an online data source.
def entity_linking_example(client):

    try:
        documents = ["""Microsoft was founded by Bill Gates and Paul Allen on April 4, 1975, 
        to develop and sell BASIC interpreters for the Altair 8800. 
        During his career at Microsoft, Gates held the positions of chairman,
        chief executive officer, president and chief software architect, 
        while also being the largest individual shareholder until May 2014."""]
        result = client.recognize_linked_entities(documents = documents)[0]

        print("Linked Entities:\n")
        for entity in result.entities:
            print("\tName: ", entity.name, "\tId: ", entity.data_source_entity_id, "\tUrl: ", entity.url,
            "\n\tData Source: ", entity.data_source)
            print("\tMatches:")
            for match in entity.matches:
                print("\t\tText:", match.text)
                print("\t\tConfidence Score: {0:.2f}".format(match.confidence_score))
                print("\t\tOffset: {}".format(match.offset))
                print("\t\tLength: {}".format(match.length))
            
    except Exception as err:
        print("Encountered exception. {}".format(err))
entity_linking_example(client)
```



### Output

```console
Linked Entities:
    
    Name:  Microsoft        Id:  Microsoft  Url:  https://en.wikipedia.org/wiki/Microsoft
    Data Source:  Wikipedia
    Matches:
            Text: Microsoft
            Confidence Score: 0.55
            Offset: 0
            Length: 9
            Text: Microsoft
            Confidence Score: 0.55
            Offset: 168
            Length: 9
    Name:  Bill Gates       Id:  Bill Gates         Url:  https://en.wikipedia.org/wiki/Bill_Gates
    Data Source:  Wikipedia
    Matches:
            Text: Bill Gates
            Confidence Score: 0.63
            Offset: 25
            Length: 10
            Text: Gates
            Confidence Score: 0.63
            Offset: 179
            Length: 5
    Name:  Paul Allen       Id:  Paul Allen         Url:  https://en.wikipedia.org/wiki/Paul_Allen
    Data Source:  Wikipedia
    Matches:
            Text: Paul Allen
            Confidence Score: 0.60
            Offset: 40
            Length: 10
    Name:  April 4  Id:  April 4    Url:  https://en.wikipedia.org/wiki/April_4
    Data Source:  Wikipedia
    Matches:
            Text: BASIC
            Confidence Score: 0.33
            Offset: 98
            Length: 5
    Name:  Altair 8800      Id:  Altair 8800        Url:  https://en.wikipedia.org/wiki/Altair_8800
    Data Source:  Wikipedia
    Matches:
            Text: Altair 8800
            Confidence Score: 0.88
            Offset: 125
            Length: 11
```

## Clean up resources

To clean up and remove an Azure AI resource, you can delete either the individual resource or the entire resource group. If you delete the resource group, all resources contained within are also deleted.

* [Azure portal](../../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../../multi-service-resource.md?pivots=azcli#clean-up-resources)




## Next steps

* [Entity linking language support](language-support.md)
* [How to call the entity linking API](how-to/call-api.md)  
* [Reference documentation](https://learn.microsoft.com/python/api/azure-ai-textanalytics/azure.ai.textanalytics?preserve-view=true\&view=azure-python)
* [Additional samples](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/textanalytics/azure-ai-textanalytics/samples)




**Applies to: rest-api**


[Reference documentation](https://go.microsoft.com/fwlink/?linkid=2239169)

Use this quickstart to send entity linking requests using the REST API. In the following example, you will use cURL to identify and disambiguate entities found in text.

## Prerequisites

* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)

## Setting up

### Create an Azure resource

To use the code sample below, you need to deploy an Azure resource. This resource will contain a key and endpoint you use to authenticate the API calls you send to Azure Language.

1. Use the following link to <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesTextAnalytics" target="_blank">create a language resource</a> using the Azure portal. You need to sign in using your Azure subscription.
1. On the **Select additional features** screen that appears, select **Continue to create your resource**.

    A screenshot showing additional feature options in the Azure portal.

1. In the **Create language** screen, provide the following information:

    | Detail | Description |
    | --- | --- |
    | Subscription | The subscription account that your resource will be associated with. Select your Azure subscription from the drop-down menu. |
    | Resource group | A resource group is a container that stores the resources you create. Select **Create new** to create a new resource group. |
    | Region | The location of your Language resource. Different regions may introduce latency depending on your physical location, but have no impact on the runtime availability of your resource. For this quickstart, either select an available region near you, or choose **East US**. |
    | Name | The name for your Language resource. This name will also be used to create an endpoint URL that your applications will use to send API requests. |
    | Pricing tier | The [pricing tier](https://azure.microsoft.com/pricing/details/cognitive-services/language-service/) for your Language resource. You can use the **Free F0** tier to try the service and upgrade later to a paid tier for production. |
     
    A screenshot showing resource creation details in the Azure portal.

1. Make sure the **Responsible AI Notice** checkbox is checked.
1. Select **Review + Create** at the bottom of the page.

1. In the screen that appears, make sure the validation has passed, and that you entered your information correctly. Then select **Create**. 




### Get your key and endpoint

Next you will need the key and endpoint from the resource to connect your application to the API. You'll paste your key and endpoint into the code later in the quickstart.

1. After Azure Language resource deploys successfully, click the **Go to Resource** button under **Next Steps**.

    A screenshot showing the next steps after a resource has deployed.

1. On the screen for your resource, select **Keys and endpoint** on the left pane. You will use one of your keys and your endpoint in the steps below. 

    A screenshot showing the keys and endpoint section for a resource.




### Create environment variables 

Your application must be authenticated to send API requests. For production, use a secure way of storing and accessing your credentials. In this example, you will write your credentials to environment variables on the local machine running the application.

To set the environment variable for your Language resource key, open a console window, and follow the instructions for your operating system and development environment. 

- To set the `LANGUAGE_KEY` environment variable, replace `your-key` with one of the keys for your resource.
- To set the `LANGUAGE_ENDPOINT` environment variable, replace `your-endpoint` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/entity-linking/quickstart.md)

#### [Windows](#tab/windows)

```console
setx LANGUAGE_KEY your-key
```

```console
setx LANGUAGE_ENDPOINT your-endpoint
```

> **Note:**
> If you only need to access the environment variables in the current running console, you can set the environment variable with `set` instead of `setx`.

After you add the environment variables, you might need to restart any running programs that will need to read the environment variables, including the console window. For example, if you're using Visual Studio as your editor, restart Visual Studio before running the example.

#### [Linux](#tab/linux)

```bash
export LANGUAGE_KEY=your-key
```

```bash
export LANGUAGE_ENDPOINT=your-endpoint
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

#### [macOS](#tab/macos)

##### Bash

```bash
export LANGUAGE_KEY=your-key
```

```bash
export LANGUAGE_ENDPOINT=your-endpoint
```

After you add the environment variables, run `source ~/.bash_profile` from your console window to make the changes effective.

##### Xcode

For iOS and macOS development, you set the environment variables in Xcode. For example, follow these steps to set the environment variable in Xcode 13.4.1.

1. Select **Product** > **Scheme** > **Edit scheme**
1. Select **Arguments** on the **Run** (Debug Run) page
1. Under **Environment Variables** select the plus (+) sign to add a new environment variable. 
1. Enter `LANGUAGE_KEY` for the **Name** and enter your Language resource key for the **Value**.
1. Perform these steps for your resource endpoint. Name the new environment variable `LANGUAGE_ENDPOINT`.

For more configuration options, see the [Xcode documentation](https://help.apple.com/xcode/#/dev745c5c974).

---



## Create a JSON file with the example request body

In a code editor, create a new file named `test_entitylinking_payload.json` and copy the following JSON example. This example request will be sent to the API in the next step.

```json
{
    "kind": "EntityLinking",
    "parameters": {
        "modelVersion": "latest"
    },
    "analysisInput":{
        "documents":[
            {
                "id":"1",
                "language":"en",
                "text": "Microsoft was founded by Bill Gates and Paul Allen on April 4, 1975."
            }
        ]
    }
}
```

Save `test_entitylinking_payload.json` somewhere on your computer. For example, your desktop.

<a name='send-a-entity-linking-api-request'></a>

## Send an entity linking API request

Use the following commands to send the API request using the program you're using. Copy the command into your terminal, and run it.

| parameter | Description |
| --- | --- |
| `-X POST <endpoint>` | Specifies your endpoint for accessing the API. |
| `-H Content-Type: application/json` | The content type for sending JSON data. |
| `-H "Ocp-Apim-Subscription-Key:<key>` | Specifies the key for accessing the API. |
| `-d <documents>` | The JSON containing the documents you want to send. |

# [Windows](#tab/windows)

 Replace `C:\Users\<myaccount>\Desktop\test_entitylinking_payload.json` with the location of the example JSON request file you created in the previous step.

### Command prompt

```terminal
curl -X POST "%LANGUAGE_ENDPOINT%/language/:analyze-text?api-version=2022-05-01" ^
-H "Content-Type: application/json" ^
-H "Ocp-Apim-Subscription-Key: %LANGUAGE_KEY%" ^
-d "@C:\Users\<myaccount>\Desktop\test_entitylinking_payload.json"
```

### PowerShell

```terminal
curl.exe -X POST $env:LANGUAGE_ENDPOINT/language/:analyze-text?api-version=2022-05-01 `
-H "Content-Type: application/json" `
-H "Ocp-Apim-Subscription-Key: $env:LANGUAGE_KEY" `
-d "@C:\Users\<myaccount>\Desktop\test_entitylinking_payload.json"
```

#### [Linux](#tab/linux)

Use the following commands to send the API request using the program you're using. Replace `/home/mydir/test_entitylinking_payload.json` with the location of the example JSON request file you created in the previous step.

```terminal
curl -X POST $LANGUAGE_ENDPOINT/language/:analyze-text?api-version=2022-05-01 \
-H "Content-Type: application/json" \
-H "Ocp-Apim-Subscription-Key: $LANGUAGE_KEY" \
-d "@/home/mydir/test_entitylinking_payload.json"
```

#### [macOS](#tab/macos)

Use the following commands to send the API request using the program you're using. Replace `/home/mydir/test_sentiment_payload.json` with the location of the example JSON request file you created in the previous step.

```terminal
curl -X POST $LANGUAGE_ENDPOINT/language/:analyze-text?api-version=2022-05-01 \
-H "Content-Type: application/json" \
-H "Ocp-Apim-Subscription-Key: $LANGUAGE_KEY" \
-d "@/home/mydir/test_entitylinking_payload.json"
```

---

### JSON response

```json
{
    "kind": "EntityLinkingResults",
    "results": {
        "documents": [{
            "id": "1",
            "entities": [{
                "bingId": "a093e9b9-90f5-a3d5-c4b8-5855e1b01f85",
                "name": "Microsoft",
                "matches": [{
                    "text": "Microsoft",
                    "offset": 0,
                    "length": 9,
                    "confidenceScore": 0.48
                }],
                "language": "en",
                "id": "Microsoft",
                "url": "https://en.wikipedia.org/wiki/Microsoft",
                "dataSource": "Wikipedia"
            }, {
                "bingId": "0d47c987-0042-5576-15e8-97af601614fa",
                "name": "Bill Gates",
                "matches": [{
                    "text": "Bill Gates",
                    "offset": 25,
                    "length": 10,
                    "confidenceScore": 0.52
                }],
                "language": "en",
                "id": "Bill Gates",
                "url": "https://en.wikipedia.org/wiki/Bill_Gates",
                "dataSource": "Wikipedia"
            }, {
                "bingId": "df2c4376-9923-6a54-893f-2ee5a5badbc7",
                "name": "Paul Allen",
                "matches": [{
                    "text": "Paul Allen",
                    "offset": 40,
                    "length": 10,
                    "confidenceScore": 0.54
                }],
                "language": "en",
                "id": "Paul Allen",
                "url": "https://en.wikipedia.org/wiki/Paul_Allen",
                "dataSource": "Wikipedia"
            }, {
                "bingId": "52535f87-235e-b513-54fe-c03e4233ac6e",
                "name": "April 4",
                "matches": [{
                    "text": "April 4",
                    "offset": 54,
                    "length": 7,
                    "confidenceScore": 0.38
                }],
                "language": "en",
                "id": "April 4",
                "url": "https://en.wikipedia.org/wiki/April_4",
                "dataSource": "Wikipedia"
            }],
            "warnings": []
        }],
        "errors": [],
        "modelVersion": "2021-06-01"
    }
}
```

## Clean up resources

To clean up and remove an Azure AI resource, you can delete either the individual resource or the entire resource group. If you delete the resource group, all resources contained within are also deleted.

* [Azure portal](../../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../../multi-service-resource.md?pivots=azcli#clean-up-resources)



## Next steps

* [Entity linking language support](language-support.md)
* [How to call the entity linking API](how-to/call-api.md)  
* [Reference documentation](https://go.microsoft.com/fwlink/?linkid=2239169)
