---
title: 'Quickstart: Use the Content Moderator client library'
titleSuffix: Azure AI services
description: The Content Moderator API offers client libraries that make it easy to integrate Content Moderator into your applications.
author: PatrickFarley
manager: mcleans
zone_pivot_groups: programming-languages-set-conmod
ms.service: azure-content-moderator
ms.topic: quickstart
ms.date: 06/12/2025
ms.author: pafarley
ms.devlang: csharp
# ms.devlang: csharp, java, python
ms.custom: devx-track-python, devx-track-csharp, mode-api, devx-track-dotnet, devx-track-extended-java
keywords: content moderator, Azure Content Moderator, online moderator, content filtering software
---

# Quickstart: Use the Content Moderator client library



> **Important:**
> Azure Content Moderator is deprecated as of February 2024 and will be retired on March 15, 2027. It is replaced by [Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/overview), which offers advanced AI features and enhanced performance.
>
> Azure AI Content Safety is a comprehensive solution designed to detect harmful user-generated and AI-generated content in applications and services. Azure AI Content Safety is suitable for many scenarios such as online marketplaces, gaming companies, social messaging platforms, enterprise media companies, and K-12 education solution providers. Here's an overview of its features and capabilities:
> 
> - **Text and Image Detection APIs**: Scan text and images for sexual content, violence, hate, and self-harm with multiple severity levels.
> - **Content Safety Studio**: An online tool designed to handle potentially offensive, risky, or undesirable content using our latest content moderation ML models. It provides templates and customized workflows that enable users to build their own content moderation systems.
> - **Language support**: Azure AI Content Safety supports more than 100 languages and is specifically trained on English, German, Japanese, Spanish, French, Italian, Portuguese, and Chinese.
>
> Azure AI Content Safety provides a robust and flexible solution for your content moderation needs. By switching from Content Moderator to Azure AI Content Safety, you can take advantage of the latest tools and technologies to ensure that your content is always moderated to your exact specifications.
>
> [Learn more about Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/overview) and explore how it can elevate your content moderation strategy.

**Applies to: programming-language-csharp**



Get started with the Azure Content Moderator client library for .NET. Follow these steps to install the NuGet package and try out the example code for basic tasks. 

Content Moderator is an AI service that lets you handle content that is potentially offensive, risky, or otherwise undesirable. Use the AI-powered content moderation service to scan text, image, and videos and apply content flags automatically. Build content filtering software into your app to comply with regulations or maintain the intended environment for your users.

Use the Content Moderator client library for .NET to:

* Moderate text
* Moderate images

[Reference documentation](https://learn.microsoft.com/dotnet/api/overview/azure/content-moderator) | [Library source code](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/cognitiveservices) | [Package (NuGet)](https://www.nuget.org/packages/Microsoft.Azure.CognitiveServices.ContentModerator/) | [Samples](samples-dotnet.md)

## Prerequisites

* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* The [Visual Studio IDE](https://visualstudio.microsoft.com/vs/) or current version of [.NET Core](https://dotnet.microsoft.com/download/dotnet-core).
* Once you have your Azure subscription, <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesContentModerator"  title="Create a Content Moderator resource"  target="_blank">create a Content Moderator resource </a> in the Azure portal to get your key and endpoint. Wait for it to deploy and click the **Go to resource** button.
    * You will need the key and endpoint from the resource you create to connect your application to Content Moderator. You'll paste your key and endpoint into the code below later in the quickstart.
    * You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.

## Setting up

### Create a new C# application

#### [Visual Studio IDE](#tab/visual-studio)

Using Visual Studio, create a new .NET Core application. 

### Install the client library 

Once you've created a new project, install the client library by right-clicking on the project solution in the **Solution Explorer** and selecting **Manage NuGet Packages**. In the package manager that opens select **Browse**, check **Include prerelease**, and search for `Microsoft.Azure.CognitiveServices.ContentModerator`. Select version `2.0.0`, and then **Install**. 

#### [CLI](#tab/cli)

In a console window (such as cmd, PowerShell, or Bash), use the `dotnet new` command to create a new console app with the name `content-moderator-quickstart`. This command creates a simple "Hello World" C# project with a single source file: *Program.cs*.

```console
dotnet new console -n content-moderator-quickstart
```

Change your directory to the newly created app folder. You can build the application with:

```console
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

### Install the client library 

Within the application directory, install the Content Moderator client library for .NET with the following command:

```console
dotnet add package Microsoft.Azure.CognitiveServices.ContentModerator --version 2.0.0
```

---

> **Tip:**
> Want to view the whole quickstart code file at once? You can find it on [GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/dotnet/ContentModerator/Program.cs), which contains the code examples in this quickstart.

From the project directory, open the *Program.cs* file in your preferred editor or IDE. Add the following `using` statements:

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/dotnet/ContentModerator/Program.cs?name=snippet_using](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

In the **Program** class, create variables for your resource's key and endpoint.

> **Important:**
> Go to the Azure portal. If the Content Moderator resource you created in the **Prerequisites** section deployed successfully, click the **Go to Resource** button under **Next Steps**. You can find your key and endpoint in the resource's **key and endpoint** page, under **resource management**. 

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/dotnet/ContentModerator/Program.cs?name=snippet_creds](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

> **Important:**
> Remember to remove the key from your code when you're done, and never post it publicly. For production, use a secure way of storing and accessing your credentials like [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview). See the Azure AI services [security](../security-features.md) article for more information.

In the application's `main()` method, add calls for the methods used in this quickstart. You will create these later.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/dotnet/ContentModerator/Program.cs?name=snippet_client](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/dotnet/ContentModerator/Program.cs?name=snippet_textmod_call](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/dotnet/ContentModerator/Program.cs?name=snippet_imagemod_call](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)



## Object model

The following classes handle some of the major features of the Content Moderator .NET client library.

| Name | Description |
| --- | --- |
| [ContentModeratorClient](https://learn.microsoft.com/dotnet/api/microsoft.azure.cognitiveservices.contentmoderator.contentmoderatorclient) | This class is needed for all Content Moderator functionality. You instantiate it with your subscription information, and you use it to produce instances of other classes. |
| [ImageModeration](https://learn.microsoft.com/dotnet/api/microsoft.azure.cognitiveservices.contentmoderator.imagemoderation) | This class provides the functionality for analyzing images for adult content, personal information, or human faces. |
| [TextModeration](https://learn.microsoft.com/dotnet/api/microsoft.azure.cognitiveservices.contentmoderator.textmoderation) | This class provides the functionality for analyzing text for language, profanity, errors, and personal information. |


## Code examples

These code snippets show you how to do the following tasks with the Content Moderator client library for .NET:

* [Authenticate the client](#authenticate-the-client)
* [Moderate text](#moderate-text)
* [Moderate images](#moderate-images)

## Authenticate the client

In a new method, instantiate client objects with your endpoint and key.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/dotnet/ContentModerator/Program.cs?name=snippet_auth](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

## Moderate text

The following code uses a Content Moderator client to analyze a body of text and print the results to the console. In the root of your **Program** class, define input and output files:

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/dotnet/ContentModerator/Program.cs?name=snippet_text_vars](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

Then at the root of your project, add a *TextFile.txt* file. Add your own text to this file, or use the following sample text:

```
Is this a grabage email abcdef@abcd.com, phone: 4255550111, IP: 255.255.255.255, 1234 Main Boulevard, Panapolis WA 96555.
<offensive word> is the profanity here. Is this information PII? phone 4255550111
```


Then define the text moderation method somewhere in your **Program** class:

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/dotnet/ContentModerator/Program.cs?name=snippet_textmod](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

## Moderate images

The following code uses a Content Moderator client, along with an [ImageModeration](https://learn.microsoft.com/dotnet/api/microsoft.azure.cognitiveservices.contentmoderator.imagemoderation) object, to analyze remote images for adult and racy content.

> **Note:**
> You can also analyze the content of a local image. See the [reference documentation](https://learn.microsoft.com/dotnet/api/microsoft.azure.cognitiveservices.contentmoderator.imagemoderation.evaluatefileinputwithhttpmessagesasync#Microsoft_Azure_CognitiveServices_ContentModerator_ImageModeration_EvaluateFileInputWithHttpMessagesAsync_System_IO_Stream_System_Nullable_System_Boolean__System_Collections_Generic_Dictionary_System_String_System_Collections_Generic_List_System_String___System_Threading_CancellationToken_) for methods and operations that work with local images.

### Get sample images

Define your input and output files at the root of your **Program** class:

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/dotnet/ContentModerator/Program.cs?name=snippet_image_vars](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

Then create the input file, *ImageFiles.txt*, at the root of your project. In this file, you add the URLs of images to analyze&mdash;one URL on each line. You can use the following sample images:

```
https://moderatorsampleimages.blob.core.windows.net/samples/sample2.jpg
https://moderatorsampleimages.blob.core.windows.net/samples/sample5.png
```

### Define helper class

Add the following class definition within the **Program** class. This inner class will handle image moderation results.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/dotnet/ContentModerator/Program.cs?name=snippet_dataclass](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

### Define the image moderation method

The following method iterates through the image URLs in a text file, creates an **EvaluationData** instance, and analyzes the image for adult/racy content, text, and human faces. Then it adds the final **EvaluationData** instance to a list and writes the complete list of returned data to the console.

#### Iterate through images

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/dotnet/ContentModerator/Program.cs?name=snippet_imagemod_iterate](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

#### Analyze content

For more information on the image attributes that Content Moderator screens for, see the [Image moderation concepts](image-moderation-api.md) guide.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/dotnet/ContentModerator/Program.cs?name=snippet_imagemod_analyze](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

#### Write moderation results to file

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/dotnet/ContentModerator/Program.cs?name=snippet_imagemod_save](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)


## Run the application

#### [Visual Studio IDE](#tab/visual-studio)

Run the application by clicking the **Debug** button at the top of the IDE window.

#### [CLI](#tab/cli)

Run the application from your application directory with the `dotnet run` command.

```dotnet
dotnet run
```

---

## Clean up resources

If you want to clean up and remove an Azure AI services subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it.

* [Azure portal](../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../multi-service-resource.md?pivots=azcli#clean-up-resources)

## Next steps

In this quickstart, you learned how to use the Content Moderator .NET library to do moderation tasks. Next, learn more about the moderation of images or other media by reading a conceptual guide.

> 
> [Image moderation concepts](image-moderation-api.md)




**Applies to: programming-language-java**



Get started with the Azure Content Moderator client library for Java. Follow these steps to install the Maven package and try out the example code for basic tasks. 

Content Moderator is an AI service that lets you handle content that is potentially offensive, risky, or otherwise undesirable. Use the AI-powered content moderation service to scan text, image, and videos and apply content flags automatically. Build content filtering software into your app to comply with regulations or maintain the intended environment for your users.

Use the Content Moderator client library for Java to:

* Moderate text
* Moderate images

[Reference documentation](https://learn.microsoft.com/java/api/overview/azure/cognitiveservices/client/contentmoderator) | [Library source code](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/cognitiveservices/azure-resourcemanager-cognitiveservices) |[Artifact (Maven)](https://mvnrepository.com/artifact/com.microsoft.azure.cognitiveservices/azure-cognitiveservices-contentmoderator) | [Samples](https://learn.microsoft.com/samples/browse/?products=azure\&term=content-moderator)

## Prerequisites

* An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* The current version of the [Java Development Kit (JDK)](https://www.microsoft.com/openjdk)
* The [Gradle build tool](https://gradle.org/install/), or another dependency manager.
* Once you have your Azure subscription, <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesContentModerator"  title="Create a Content Moderator resource"  target="_blank">create a Content Moderator resource </a> in the Azure portal to get your key and endpoint. Wait for it to deploy and click the **Go to resource** button.
    * You will need the key and endpoint from the resource you create to connect your application to Content Moderator. You'll paste your key and endpoint into the code below later in the quickstart.
    * You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.

## Setting up

### Create a new Gradle project

In a console window (such as cmd, PowerShell, or Bash), create a new directory for your app, and navigate to it. 

```console
mkdir myapp && cd myapp
```

Run the `gradle init` command from your working directory. This command will create essential build files for Gradle, including *build.gradle.kts*, which is used at runtime to create and configure your application.

```console
gradle init --type basic
```

When prompted to choose a **DSL**, select **Kotlin**.

## Install the client library

Find *build.gradle.kts* and open it with your preferred IDE or text editor. Then copy in the following build configuration. This configuration defines the project as a Java application whose entry point is the class **ContentModeratorQuickstart**. It imports the Content Moderator client library and the GSON sdk for JSON serialization.

```kotlin
plugins {
    java
    application
}

application{ 
    mainClassName = "ContentModeratorQuickstart"
}

repositories{
    mavenCentral()
}

dependencies{
    compile(group = "com.microsoft.azure.cognitiveservices", name = "azure-cognitiveservices-contentmoderator", version = "1.0.2-beta")
    compile(group = "com.google.code.gson", name = "gson", version = "2.8.5")
}
```

### Create a Java file


From your working directory, run the following command to create a project source folder:

```console
mkdir -p src/main/java
```

Navigate to the new folder and create a file called *ContentModeratorQuickstart.java*. Open it in your preferred editor or IDE and add the following `import` statements:

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/java/ContentModerator/src/main/java/ContentModeratorQuickstart.java?name=snippet_imports](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

> **Tip:**
> Want to view the whole quickstart code file at once? You can find it on [GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/java/ContentModerator/src/main/java/ContentModeratorQuickstart.java), which contains the code examples in this quickstart.

In the application's **ContentModeratorQuickstart** class, create variables for your resource's key and endpoint.

> **Important:**
> Go to the Azure portal. If the Content Moderator resource you created in the **Prerequisites** section deployed successfully, click the **Go to Resource** button under **Next Steps**. You can find your key and endpoint in the resource's **key and endpoint** page, under **resource management**.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/java/ContentModerator/src/main/java/ContentModeratorQuickstart.java?name=snippet_creds](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

> **Important:**
> Remember to remove the key from your code when you're done, and never post it publicly. For production, use a secure way of storing and accessing your credentials like [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview). See the Azure AI services [security](../security-features.md) article for more information.

In the application's **main** method, add calls for the methods used in this quickstart. You'll define these methods later.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/java/ContentModerator/src/main/java/ContentModeratorQuickstart.java?name=snippet_maincalls](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

## Object model

The following classes handle some of the major features of the Content Moderator Java client library.

| Name | Description |
| --- | --- |
| [ContentModeratorClient](https://learn.microsoft.com/java/api/com.microsoft.azure.cognitiveservices.vision.contentmoderator.contentmoderatorclient) | This class is needed for all Content Moderator functionality. You instantiate it with your subscription information, and you use it to produce instances of other classes. |
| [ImageModeration](https://learn.microsoft.com/java/api/com.microsoft.azure.cognitiveservices.vision.contentmoderator.imagemoderations) | This class provides the functionality for analyzing images for adult content, personal information, or human faces. |
| [TextModerations](https://learn.microsoft.com/java/api/com.microsoft.azure.cognitiveservices.vision.contentmoderator.textmoderations) | This class provides the functionality for analyzing text for language, profanity, errors, and personal information. |


## Code examples

These code snippets show you how to do the following tasks with the Content Moderator client library for Java:

* [Authenticate the client](#authenticate-the-client)
* [Moderate text](#moderate-text)
* [Moderate images](#moderate-images)


## Authenticate the client

In the application's `main` method, create a [ContentModeratorClient](https://learn.microsoft.com/java/api/com.microsoft.azure.cognitiveservices.vision.contentmoderator.contentmoderatorclient) object using your subscription endpoint value and subscription key.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/java/ContentModerator/src/main/java/ContentModeratorQuickstart.java?name=snippet_client](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)



## Moderate text

### Set up sample text

At the top of your **ContentModeratorQuickstart** class, define a reference to a local text file. Add a .txt file to your project directory and enter the text you'd like to analyze.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/java/ContentModerator/src/main/java/ContentModeratorQuickstart.java?name=snippet_textmod_var](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

### Analyze text

Create a new method that reads the .txt file and calls the **screenText** method on each line.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/java/ContentModerator/src/main/java/ContentModeratorQuickstart.java?name=snippet_textmod](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

### Print text moderation results

Add the following code to print the moderation results to a .json file in your project directory.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/java/ContentModerator/src/main/java/ContentModeratorQuickstart.java?name=snippet_textmod_print](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

Close out the `try` and `catch` statement to complete the method.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/java/ContentModerator/src/main/java/ContentModeratorQuickstart.java?name=snippet_textmod_catch](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)


## Moderate images

### Set up sample image

In a new method, construct a **[BodyModelModel](https://learn.microsoft.com/java/api/com.microsoft.azure.cognitiveservices.vision.contentmoderator.models.bodymodelmodel)** object with a given URL string that points to an image.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/java/ContentModerator/src/main/java/ContentModeratorQuickstart.java?name=snippet_imagemod](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)


### Define helper class

Then, in your *ContentModeratorQuickstart.java* file, add the following class definition inside the **ContentModeratorQuickstart** class. This inner class is used in the image moderation process.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/java/ContentModerator/src/main/java/ContentModeratorQuickstart.java?name=snippet_evaluationdata](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)


### Analyze content
This line of code checks the image at the given URL for adult or racy content. See the Image moderation conceptual guide for information on these terms.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/java/ContentModerator/src/main/java/ContentModeratorQuickstart.java?name=snippet_imagemod_ar](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

### Check for text
This line of code checks the image for visible text.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/java/ContentModerator/src/main/java/ContentModeratorQuickstart.java?name=snippet_imagemod_text](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

### Check for faces
This line of code checks the image for human faces.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/java/ContentModerator/src/main/java/ContentModeratorQuickstart.java?name=snippet_imagemod_faces](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

Finally, store the returned information in the `EvaluationData` list.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/java/ContentModerator/src/main/java/ContentModeratorQuickstart.java?name=snippet_imagemod_storedata](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

### Print results

After the `while` loop, add the following code, which prints the results to the console and to an output file, *src/main/resources/ModerationOutput.json*.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/java/ContentModerator/src/main/java/ContentModeratorQuickstart.java?name=snippet_imagemod_printdata](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

Close out the `try` statement and add a `catch` statement to complete the method.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/java/ContentModerator/src/main/java/ContentModeratorQuickstart.java?name=snippet_imagemod_catch](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

## Run the application

You can build the app with:

```console
gradle build
```

Run the application with the `gradle run` command:

```console
gradle run
```

Then navigate to the *src/main/resources/ModerationOutput.json* file and view the results of your content moderation.

## Clean up resources

If you want to clean up and remove an Azure AI services subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it.

* [Azure portal](../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../multi-service-resource.md?pivots=azcli#clean-up-resources)

## Next steps

In this quickstart, you learned how to use the Content Moderator Java library to perform moderation tasks. Next, learn more about the moderation of images or other media by reading a conceptual guide.

> 
> [Image moderation concepts](image-moderation-api.md)




**Applies to: programming-language-python**



Get started with the Azure Content Moderator client library for Python. Follow these steps to install the PiPy package and try out the example code for basic tasks. 

Content Moderator is an AI service that lets you handle content that is potentially offensive, risky, or otherwise undesirable. Use the AI-powered content moderation service to scan text, image, and videos and apply content flags automatically. Build content filtering software into your app to comply with regulations or maintain the intended environment for your users.

Use the Content Moderator client library for Python to:

* Moderate text
* Use a custom terms list
* Moderate images
* Use a custom image list

[Reference documentation](https://learn.microsoft.com/python/api/overview/azure/content-moderator) | [Library source code](https://github.com/Azure/azure-sdk-for-python/tree/master/sdk/cognitiveservices/azure-cognitiveservices-vision-contentmoderator) | [Package (PiPy)](https://pypi.org/project/azure-cognitiveservices-vision-contentmoderator/) | [Samples](https://github.com/Azure-Samples/cognitive-services-python-sdk-samples)

## Prerequisites

* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* [Python 3.x](https://www.python.org/)
  * Your Python installation should include [pip](https://pip.pypa.io/en/stable/). You can check if you have pip installed by running `pip --version` on the command line. Get pip by installing the latest version of Python.
* Once you have your Azure subscription, <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesContentModerator"  title="Create a Content Moderator resource"  target="_blank">create a Content Moderator resource</a> in the Azure portal to get your key and endpoint. Wait for it to deploy and click the **Go to resource** button.
    * You will need the key and endpoint from the resource you create to connect your application to Content Moderator. You'll paste your key and endpoint into the code below later in the quickstart.
    * You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.


## Setting up

### Install the client library

After installing Python, you can install the Content Moderator client library with the following command:

```console
pip install --upgrade azure-cognitiveservices-vision-contentmoderator
```

### Create a new Python application

Create a new Python script and open it in your preferred editor or IDE. Then add the following `import` statements to the top of the file.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/python/ContentModerator/ContentModeratorQuickstart.py?name=snippet_imports](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

> **Tip:**
> Want to view the whole quickstart code file at once? You can find it on [GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/python/ContentModerator/ContentModeratorQuickstart.py), which contains the code examples in this quickstart.

Next, create variables for your resource's endpoint location and key.

> **Important:**
> Go to the Azure portal. If the Content Moderator resource you created in the **Prerequisites** section deployed successfully, click the **Go to Resource** button under **Next Steps**. You can find your key and endpoint in the resource's **key and endpoint** page, under **resource management**. 

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/python/ContentModerator/ContentModeratorQuickstart.py?name=snippet_vars](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

> **Important:**
> Remember to remove the key from your code when you're done, and never post it publicly. For production, use a secure way of storing and accessing your credentials like [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview). See the Azure AI services [security](../security-features.md) article for more information.

## Object model

The following classes handle some of the major features of the Content Moderator Python client library.

| Name | Description |
| --- | --- |
| [ContentModeratorClient](https://learn.microsoft.com/python/api/azure-cognitiveservices-vision-contentmoderator/azure.cognitiveservices.vision.contentmoderator.content_moderator_client.contentmoderatorclient) | This class is needed for all Content Moderator functionality. You instantiate it with your subscription information, and you use it to produce instances of other classes. |
| [ImageModerationOperations](https://learn.microsoft.com/python/api/azure-cognitiveservices-vision-contentmoderator/azure.cognitiveservices.vision.contentmoderator.operations.imagemoderationoperations) | This class provides the functionality for analyzing images for adult content, personal information, or human faces. |
| [TextModerationOperations](https://learn.microsoft.com/python/api/azure-cognitiveservices-vision-contentmoderator/azure.cognitiveservices.vision.contentmoderator.operations.textmoderationoperations) | This class provides the functionality for analyzing text for language, profanity, errors, and personal information. |

## Code examples

These code snippets show you how to do the following tasks with the Content Moderator client library for Python:

* [Authenticate the client](#authenticate-the-client)
* [Moderate text](#moderate-text)
* [Use a custom terms list](#use-a-custom-terms-list)
* [Moderate images](#moderate-images)
* [Use a custom image list](#use-a-custom-image-list)

## Authenticate the client

Instantiate a client with your endpoint and key. Create a CognitiveServicesCredentials](/python/api/msrest/msrest.authentication.cognitiveservicescredentials object with your key, and use it with your endpoint to create an [ContentModeratorClient](https://learn.microsoft.com/python/api/azure-cognitiveservices-vision-contentmoderator/azure.cognitiveservices.vision.contentmoderator.content_moderator_client.contentmoderatorclient) object.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/python/ContentModerator/ContentModeratorQuickstart.py?name=snippet_client](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

## Moderate text

The following code uses a Content Moderator client to analyze a body of text and print the results to the console. First, create a **text_files/** folder at the root of your project and add a *content_moderator_text_moderation.txt* file. Add your own text to this file, or use the following sample text:

```
Is this a grabage email abcdef@abcd.com, phone: 4255550111, IP: 255.255.255.255, 1234 Main Boulevard, Panapolis WA 96555.
<offensive word> is the profanity here. Is this information PII? phone 2065550111
```

Add a reference to the new folder.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/python/ContentModerator/ContentModeratorQuickstart.py?name=snippet_textfolder](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

Then, add the following code to your Python script.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/python/ContentModerator/ContentModeratorQuickstart.py?name=snippet_textmod](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

## Use a custom terms list

The following code shows how to manage a list of custom terms for text moderation. You can use the [ListManagementTermListsOperations](https://learn.microsoft.com/python/api/azure-cognitiveservices-vision-contentmoderator/azure.cognitiveservices.vision.contentmoderator.operations.listmanagementtermlistsoperations) class to create a terms list, manage the individual terms, and screen other bodies of text against it.

### Get sample text

To use this sample, you must create a **text_files/** folder at the root of your project and add a *content_moderator_term_list.txt* file. This file should contain organic text that will be checked against the list of terms. You can use the following sample text:

```
This text contains the terms "term1" and "term2".
```

Add a reference to the folder if you haven't already defined one.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/python/ContentModerator/ContentModeratorQuickstart.py?name=snippet_textfolder](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

### Create a list

Add the following code to your Python script to create a custom terms list and save its ID value.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/python/ContentModerator/ContentModeratorQuickstart.py?name=snippet_termslist_create](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

### Define list details

You can use a list's ID to edit its name and description.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/python/ContentModerator/ContentModeratorQuickstart.py?name=snippet_termslist_details](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

### Add a term to the list

The following code adds the terms `"term1"` and `"term2"` to the list.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/python/ContentModerator/ContentModeratorQuickstart.py?name=snippet_termslist_add](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

### Get all terms in the list

You can use the list ID to return all of the terms in the list.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/python/ContentModerator/ContentModeratorQuickstart.py?name=snippet_termslist_getterms](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

### Refresh the list index

Whenever you add or remove terms from the list, you must refresh the index before you can use the updated list.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/python/ContentModerator/ContentModeratorQuickstart.py?name=snippet_termslist_refresh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

### Screen text against the list

The main functionality of the custom terms list is to compare a body of text against the list and find whether there are any matching terms. 

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/python/ContentModerator/ContentModeratorQuickstart.py?name=snippet_termslist_screen](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

### Remove a term from a list

The following code removes the term `"term1"` from the list.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/python/ContentModerator/ContentModeratorQuickstart.py?name=snippet_termslist_remove](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

### Remove all terms from a list

Use the following code to clear a list of all its terms.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/python/ContentModerator/ContentModeratorQuickstart.py?name=snippet_termslist_removeall](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

### Delete a list

Use the following code to delete a custom terms list.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/python/ContentModerator/ContentModeratorQuickstart.py?name=snippet_termslist_deletelist](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

## Moderate images

The following code uses a Content Moderator client, along with an [ImageModerationOperations](https://learn.microsoft.com/python/api/azure-cognitiveservices-vision-contentmoderator/azure.cognitiveservices.vision.contentmoderator.operations.imagemoderationoperations) object, to analyze images for adult and racy content.

### Get sample images

Define a reference to some images to analyze.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/python/ContentModerator/ContentModeratorQuickstart.py?name=snippet_imagemodvars](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

Then add the following code to iterate through your images. The rest of the code in this section will go inside this loop.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/python/ContentModerator/ContentModeratorQuickstart.py?name=snippet_imagemod_iterate](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

### Check for adult/racy content

The following code checks the image at the given URL for adult or racy content and prints results to the console. See the [Image moderation concepts](image-moderation-api.md) guide for information on what these terms mean.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/python/ContentModerator/ContentModeratorQuickstart.py?name=snippet_imagemod_ar](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

### Check for visible text

The following code checks the image for visible text content and prints results to the console.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/python/ContentModerator/ContentModeratorQuickstart.py?name=snippet_imagemod_text](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

### Check for faces

The following code checks the image for human faces and prints results to the console.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/python/ContentModerator/ContentModeratorQuickstart.py?name=snippet_imagemod_face](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

## Use a custom image list

The following code shows how to manage a custom list of images for image moderation. This feature is useful if your platform frequently receives instances of the same set of images that you want to screen out. By maintaining a list of these specific images, you can improve performance. The [ListManagementImageListsOperations](https://learn.microsoft.com/python/api/azure-cognitiveservices-vision-contentmoderator/azure.cognitiveservices.vision.contentmoderator.operations.listmanagementimagelistsoperations) class allows you to create an image list, manage the individual images on the list, and compare other images against it.

Create the following text variables to store the image URLs that you'll use in this scenario.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/python/ContentModerator/ContentModeratorQuickstart.py?name=snippet_imagelistvars](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

> **Note:**
> This is not the proper list itself, but an informal list of images that will be added in the `add images` section of the code.


### Create an image list

Add the following code to create an image list and save a reference to its ID.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/python/ContentModerator/ContentModeratorQuickstart.py?name=snippet_imagelist_create](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

### Add images to a list

The following code adds all of your images to the list.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/python/ContentModerator/ContentModeratorQuickstart.py?name=snippet_imagelist_add](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

Define the **add_images** helper function elsewhere in your script.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/python/ContentModerator/ContentModeratorQuickstart.py?name=snippet_imagelist_addhelper](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

### Get images in list

The following code prints the names of all the images in your list.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/python/ContentModerator/ContentModeratorQuickstart.py?name=snippet_imagelist_getimages](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

### Update list details

You can use the list ID to update the name and description of the list.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/python/ContentModerator/ContentModeratorQuickstart.py?name=snippet_imagelist_updatedetails](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

### Get list details

Use the following code to print the current details of your list.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/python/ContentModerator/ContentModeratorQuickstart.py?name=snippet_imagelist_getdetails](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

### Refresh the list index

After you add or remove images, you must refresh the list index before you can use it to screen other images.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/python/ContentModerator/ContentModeratorQuickstart.py?name=snippet_imagelist_refresh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

### Match images against the list

The main function of image lists is to compare new images and see if there are any matches.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/python/ContentModerator/ContentModeratorQuickstart.py?name=snippet_imagelist_match](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

### Remove an image from the list

The following code removes an item from the list. In this case, it is an image that does not match the list category.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/python/ContentModerator/ContentModeratorQuickstart.py?name=snippet_imagelist_remove](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

### Remove all images from a list

Use the following code to clear out an image list.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/python/ContentModerator/ContentModeratorQuickstart.py?name=snippet_imagelist_removeall](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

### Delete the image list

Use the following code to delete a given image list.

[Code reference unavailable in this source snapshot: includes/quickstarts/~/cognitive-services-quickstart-code/python/ContentModerator/ContentModeratorQuickstart.py?name=snippet_imagelist_delete](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)


## Run the application

Run the application with the `python` command on your quickstart file.

```console
python quickstart-file.py
```

## Clean up resources

If you want to clean up and remove an Azure AI services subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it.

* [Azure portal](../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../multi-service-resource.md?pivots=azcli#clean-up-resources)

## Next steps

In this quickstart, you learned how to use the Content Moderator Python library to do moderation tasks. Next, learn more about the moderation of images or other media by reading a conceptual guide.

> 
>[Image moderation concepts](image-moderation-api.md)




**Applies to: programming-language-rest-api**



Get started with the Azure Content Moderator REST API. 

Content Moderator is an AI service that lets you handle content that is potentially offensive, risky, or otherwise undesirable. Use the AI-powered content moderation service to scan text, image, and videos and apply content flags automatically. Build content filtering software into your app to comply with regulations or maintain the intended environment for your users.

Use the Content Moderator REST API to:

* Moderate text
* Moderate images

## Prerequisites

* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* Once you have your Azure subscription, <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesContentModerator"  title="Create a Content Moderator resource"  target="_blank">create a Content Moderator resource </a> in the Azure portal to get your key and endpoint. Wait for it to deploy and click the **Go to resource** button.
    * You will need the key and endpoint from the resource you create to connect your application to Content Moderator. You'll paste your key and endpoint into the code below later in the quickstart.
    * You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.
* [PowerShell version 6.0+](https://learn.microsoft.com/powershell/scripting/install/installing-powershell-core-on-windows), or a similar command-line application.


## Moderate text

You'll use a command like the following to call the Content Moderator API to analyze a body of text and print the results to the console.

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/content-moderator/quickstart.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

Copy the command to a text editor and make the following changes:

1. Assign `Ocp-Apim-Subscription-Key` to your valid Face subscription key.
   > **Important:**
   > Remember to remove the key from your code when you're done, and never post it publicly. For production, use a secure way of storing and accessing your credentials like [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview). See the Azure AI services [security](../security-features.md) article for more information.
1. Change the first part of the query URL to match the endpoint that corresponds to your subscription key.
   
> **Note:**
> New resources created after July 1, 2019, will use custom subdomain names. For more information and a complete list of regional endpoints, see [Custom subdomain names for Foundry Tools](https://learn.microsoft.com/azure/cognitive-services/cognitive-services-custom-subdomains).

1. Optionally change the body of the request to whatever string of text you'd like to analyze.

Once you've made your changes, open a command prompt and enter the new command. 

### Examine the results

You should see the text moderation results displayed as JSON data in the console window. For example:

```json
{
  "OriginalText": "Is this a <offensive word> email abcdef@abcd.com, phone: 6657789887, IP: 255.255.255.255,\n1 Microsoft Way, Redmond, WA 98052\n",
  "NormalizedText": "Is this a <offensive word> email abide@ abed. com, phone: 6657789887, IP: 255. 255. 255. 255, \n1 Microsoft Way, Redmond, WA 98052",
  "AutoCorrectedText": "Is this a <offensive word> email abide@ abed. com, phone: 6657789887, IP: 255. 255. 255. 255, \n1 Microsoft Way, Redmond, WA 98052",
  "Misrepresentation": null,
  "PII": {
    "Email": [
      {
        "Detected": "abcdef@abcd.com",
        "SubType": "Regular",
        "Text": "abcdef@abcd.com",
        "Index": 21
      }
    ],
    "IPA": [
      {
        "SubType": "IPV4",
        "Text": "255.255.255.255",
        "Index": 61
      }
    ],
    "Phone": [
      {
        "CountryCode": "US",
        "Text": "6657789887",
        "Index": 45
      }
    ],
    "Address": [
      {
        "Text": "1 Microsoft Way, Redmond, WA 98052",
        "Index": 78
      }
    ]
  },
 "Classification": {
    "Category1": 
    {
      "Score": 0.5
    },
    "Category2": 
    {
      "Score": 0.6
    },
    "Category3": 
    {
      "Score": 0.5
    },
    "ReviewRecommended": true
  },
  "Language": "eng",
  "Terms": [
    {
      "Index": 10,
      "OriginalIndex": 10,
      "ListId": 0,
      "Term": "<offensive word>"
    }
  ],
  "Status": {
    "Code": 3000,
    "Description": "OK",
    "Exception": null
  },
  "TrackingId": "1717c837-cfb5-4fc0-9adc-24859bfd7fac"
}
```

For more information on the text attributes that Content Moderator screens for, see the [Text moderation concepts](text-moderation-api.md) guide.

## Moderate images

You'll use a command like the following to call the Content Moderator API to moderate a remote image and print the results to the console.

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/content-moderator/quickstart.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/client-libraries.md)

Copy the command to a text editor and make the following changes:

1. Assign `Ocp-Apim-Subscription-Key` to your valid Face subscription key.
1. Change the first part of the query URL to match the endpoint that corresponds to your subscription key.
1. Optionally change the `"Value"` URL in the request body to whatever remote image you'd like to moderate.

> **Tip:**
> You can also moderate local images by passing their byte data into the request body. See the [reference documentation](https://learn.microsoft.com/rest/api/cognitiveservices/contentmoderator/image-moderation) to learn how to do this.

Once you've made your changes, open a command prompt and enter the new command. 

### Examine the results

You should see the image moderation results displayed as JSON data in the console window. 

```json
{
  "AdultClassificationScore": x.xxx,
  "IsImageAdultClassified": <Bool>,
  "RacyClassificationScore": x.xxx,
  "IsImageRacyClassified": <Bool>,
  "AdvancedInfo": [],
  "Result": false,
  "Status": {
    "Code": 3000,
    "Description": "OK",
    "Exception": null
  },
  "TrackingId": "<Request Tracking Id>"
}
```

For more information on the image attributes that Content Moderator screens for, see the [Image moderation concepts](image-moderation-api.md) guide.

## Clean up resources

If you want to clean up and remove an Azure AI services subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it.

* [Azure portal](../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../multi-service-resource.md?pivots=azcli#clean-up-resources)

## Next steps

In this quickstart, you learned how to use the Content Moderator REST API to do moderation tasks. Next, learn more about the moderation of images or other media by reading a conceptual guide.

* [Image moderation concepts](image-moderation-api.md)
* [Text moderation concepts](text-moderation-api.md)
