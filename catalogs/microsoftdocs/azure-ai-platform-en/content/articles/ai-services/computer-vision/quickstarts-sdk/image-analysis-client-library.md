---
title: "Quickstart: Image Analysis"
titleSuffix: Foundry Tools
description: Learn how to tag images in your application using Image Analysis through a native client library in the language of your choice.
author: PatrickFarley
manager: mcleans
ms.service: azure-vision-foundry-tools
ms.topic: quickstart
ms.date: 09/26/2025
ms.author: pafarley
ms.devlang: csharp
# ms.devlang: csharp, golang, java, javascript, python
ms.custom: devx-track-python, devx-track-js, devx-track-csharp, mode-api, devx-track-dotnet, devx-track-extended-java
zone_pivot_groups: programming-languages-computer-vision
keywords: Azure Vision in Foundry Tools, Azure Vision in Foundry Tools
---

# Quickstart: Image Analysis


> **Caution:**
> The Image Analysis 4.0 service in Azure Vision in Foundry Tools is deprecated and will be retired on September 25, 2028, after which calls made to the service will fail. We recommend you switch to one of the available alternatives outlined in the [Migration guide](../migration-options.md).


This article explains how to set up a basic image tagging script by using the Image Analysis REST API or client libraries. The Analyze Image service provides you with AI algorithms for processing images and returning information about their visual features. Follow these steps to install a package to your application and try out the sample code.

**Applies to: programming-language-csharp**


 
<a name="HOLTop"></a>

Use the Image Analysis client library for C# to analyze an image for content tags. This quickstart defines a method, `AnalyzeImageUrl`, which uses the client object to analyze a remote image and print the results. 

[Reference documentation](https://learn.microsoft.com/dotnet/api/overview/azure/computer-vision) | [Library source code](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/cognitiveservices) | [Package (NuGet)](https://www.nuget.org/packages/Microsoft.Azure.CognitiveServices.Vision.ComputerVision/) | [Samples](https://learn.microsoft.com/samples/browse/?products=azure\&terms=computer-vision)

> **Tip:**
> You can also analyze a local image. See the [ComputerVisionClient](https://learn.microsoft.com/azure/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library) methods, such as **AnalyzeImageInStreamAsync**. Or, see the sample code on [GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/dotnet/ComputerVision/ImageAnalysisQuickstart.cs) for scenarios involving local images.

> **Tip:**
> The Analyze Image API can do many different operations other than generate image tags. See the [Image Analysis how-to guide](../how-to/call-analyze-image.md) for examples that showcase all of the available features.

## Prerequisites

* An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* The [Visual Studio IDE](https://visualstudio.microsoft.com/vs/) or current version of [.NET Core](https://dotnet.microsoft.com/en-us/download/dotnet).
* Once you have your Azure subscription, create a [Computer Vision resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesComputerVision) in the Azure portal to get your key and endpoint. After it deploys, select **Go to resource**.
    * You need the key and endpoint from the resource you create to connect your application to Azure Vision in Foundry Tools.
    * You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.


## Create environment variables 

In this example, write your credentials to environment variables on the local machine that runs the application.


Go to the Azure portal. If the resource you created in the **Prerequisites** section deployed successfully, select **Go to resource** under **Next steps**. You can find your key and endpoint under **Resource Management** on the **Keys and Endpoint** page of the Face resource. Your resource key isn't the same as your Azure subscription ID.


To set the environment variable for your key and endpoint, open a console window and follow the instructions for your operating system and development environment.

- To set the `VISION_KEY` environment variable, replace `<your_key>` with one of the keys for your resource.
- To set the `VISION_ENDPOINT` environment variable, replace `<your_endpoint>` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library.md)

#### [Windows](#tab/windows)

```console
setx VISION_KEY <your_key>
```

```console
setx VISION_ENDPOINT <your_endpoint>
```

After you add the environment variables, you might need to restart any running programs that will read the environment variables, including the console window.

#### [Linux](#tab/linux)

```bash
export VISION_KEY=<your_key>
```

```bash
export VISION_ENDPOINT=<your_endpoint>
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

---


## Analyze image

1. Create a new C# application.

    #### [Visual Studio IDE](#tab/visual-studio)

    Using Visual Studio, create a new .NET Core application. 

    ### Install the client library 

    After you create a new project, install the client library by right-clicking on the project solution in the **Solution Explorer** and selecting **Manage NuGet Packages**. In the package manager that opens select **Browse**, check **Include prerelease**, and search for `Microsoft.Azure.CognitiveServices.Vision.ComputerVision`. Select version `7.0.0`, and then **Install**. 

    #### [CLI](#tab/cli)

    In a console window (such as cmd, PowerShell, or Bash), use the `dotnet new` command to create a new console app with the name `computer-vision-quickstart`. This command creates a simple *Hello World* C# project with a single source file: *Program.cs*.

    ```console
    dotnet new console -n computer-vision-quickstart
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

    Within the application directory, install Azure Vision client library for .NET with the following command:

    ```console
    dotnet add package Microsoft.Azure.CognitiveServices.Vision.ComputerVision --version 7.0.0
    ```

    ---

1. From the project directory, open the *Program.cs* file in your preferred editor or IDE. Paste in the following code:

   [Code reference unavailable in this source snapshot: ../includes/quickstarts-sdk/~/cognitive-services-quickstart-code/dotnet/ComputerVision/ImageAnalysisQuickstart-single.cs?name=snippet_single](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library.md)

   [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library.md)

1. Run the application

   #### [Visual Studio IDE](#tab/visual-studio)

   Run the application by clicking the **Debug** button at the top of the IDE window.

   #### [CLI](#tab/cli)

   Run the application from your application directory by using the `dotnet run` command.

   ```dotnet
   dotnet run
   ```

   ---


## Output

The output of your operation should look like the following example.

```console
----------------------------------------------------------
ANALYZE IMAGE - URL

Analyzing the image sample16.png...

Tags:
grass 0.9957543611526489
dog 0.9939157962799072
mammal 0.9928356409072876
animal 0.9918001890182495
dog breed 0.9890419244766235
pet 0.974603533744812
outdoor 0.969241738319397
companion dog 0.906731367111206
small greek domestic dog 0.8965123891830444
golden retriever 0.8877675533294678
labrador retriever 0.8746421337127686
puppy 0.872604250907898
ancient dog breeds 0.8508287668228149
field 0.8017748594284058
retriever 0.6837497353553772
brown 0.6581960916519165
```


## Clean up resources

If you want to clean up and remove a Foundry Tools subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it.

* [Azure portal](../../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../../multi-service-resource.md?pivots=azcli#clean-up-resources)

## Related content

In this quickstart, you learned how to install the Image Analysis client library and make basic image analysis calls. Next, learn more about the Image Analysis API features.

> 
>[Call the Analyze Image API](../how-to/call-analyze-image.md)

* [What is Image Analysis?](../overview-image-analysis.md)
* [Source code for this sample on GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/dotnet/ComputerVision/ImageAnalysisQuickstart.cs)




**Applies to: programming-language-python**



<a name="HOLTop"></a>

Use the Image Analysis client library for Python to analyze a remote image for content tags.

> **Tip:**
> You can also analyze a local image. See the [ComputerVisionClientOperationsMixin](https://learn.microsoft.com/python/api/azure-cognitiveservices-vision-computervision/azure.cognitiveservices.vision.computervision.operations.computervisionclientoperationsmixin) methods, such as `analyze_image_in_stream`. Or, see the [sample code on GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/python/ComputerVision/ImageAnalysisQuickstart.py) for scenarios involving local images.

> **Tip:**
> The Analyze Image API can do many different operations other than generate image tags. See the [Image Analysis how-to guide](../how-to/call-analyze-image.md) for examples that showcase all of the available features.

[Reference documentation](https://learn.microsoft.com/python/api/azure-cognitiveservices-vision-computervision/azure.cognitiveservices.vision.computervision) | [Library source code](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/cognitiveservices/azure-cognitiveservices-vision-computervision) | [Package (PiPy)](https://pypi.org/project/azure-cognitiveservices-vision-computervision/) | [Samples](https://learn.microsoft.com/samples/browse/?products=azure\&terms=computer-vision)

## Prerequisites

* An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* [Python 3.x](https://www.python.org/).
  * Your Python installation should include [pip](https://pip.pypa.io/en/stable/). You can check if you have pip installed by running `pip --version` on the command line. Get pip by installing the latest version of Python.
* Once you have your Azure subscription, create a [Computer Vision resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesComputerVision) in the Azure portal to get your key and endpoint. After it deploys, select **Go to resource**.
    * You need the key and endpoint from the resource you create to connect your application to Azure Vision in Foundry Tools.
    * You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.


## Create environment variables 

In this example, write your credentials to environment variables on the local machine that runs the application.


Go to the Azure portal. If the resource you created in the **Prerequisites** section deployed successfully, select **Go to resource** under **Next steps**. You can find your key and endpoint under **Resource Management** on the **Keys and Endpoint** page of the Face resource. Your resource key isn't the same as your Azure subscription ID.


To set the environment variable for your key and endpoint, open a console window and follow the instructions for your operating system and development environment.

- To set the `VISION_KEY` environment variable, replace `<your_key>` with one of the keys for your resource.
- To set the `VISION_ENDPOINT` environment variable, replace `<your_endpoint>` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library.md)

#### [Windows](#tab/windows)

```console
setx VISION_KEY <your_key>
```

```console
setx VISION_ENDPOINT <your_endpoint>
```

After you add the environment variables, you might need to restart any running programs that will read the environment variables, including the console window.

#### [Linux](#tab/linux)

```bash
export VISION_KEY=<your_key>
```

```bash
export VISION_ENDPOINT=<your_endpoint>
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

---


## Analyze image

1. Install the client library.

    You can install the client library with:

    ```console
    pip install --upgrade azure-cognitiveservices-vision-computervision
    ```

    Also install the Pillow library.

    ```console
    pip install pillow
    ```

1. Create a new Python application.

    Create a new Python file. You can name it *quickstart-file.py*, for example.

1. Open *quickstart-file.py* in a text editor or IDE and paste in the following code.

   [Code reference unavailable in this source snapshot: ../includes/quickstarts-sdk/~/cognitive-services-quickstart-code/python/ComputerVision/ImageAnalysisQuickstart-single.py?name=snippet_single](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library.md)

1. Run the application by using the `python` command on your quickstart file.

   ```console
   python quickstart-file.py
   ```

## Output

The output of the operation should look like the following example.

```console
===== Tag an image - remote =====
Tags in the remote image:
'outdoor' with confidence 99.00%
'building' with confidence 98.81%
'sky' with confidence 98.21%
'stadium' with confidence 98.17%
'ancient rome' with confidence 96.16%
'ruins' with confidence 95.04%
'amphitheatre' with confidence 93.99%
'ancient roman architecture' with confidence 92.65%
'historic site' with confidence 89.55%
'ancient history' with confidence 89.54%
'history' with confidence 86.72%
'archaeological site' with confidence 84.41%
'travel' with confidence 65.85%
'large' with confidence 61.02%
'city' with confidence 56.57%

End of Azure Vision quickstart.
```

## Clean up resources

If you want to clean up and remove a Foundry Tools subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it.

* [Azure portal](../../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../../multi-service-resource.md?pivots=azcli#clean-up-resources)


## Next step

In this quickstart, you learned how to install the Image Analysis client library and make basic image analysis calls. Next, learn more about the Analyze Image API features.

> 
>[Call the Analyze Image API](../how-to/call-analyze-image.md)

* [What is Image Analysis?](../overview-image-analysis.md)
* [Source code for this sample on GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/python/ComputerVision/ImageAnalysisQuickstart.py)




**Applies to: programming-language-java**



<a name="HOLTop"></a>

Use the Image Analysis client library for Java to analyze a remote image for tags, text description, faces, adult content, and more.

> **Tip:**
> You can also analyze a local image. See the [ComputerVision](https://learn.microsoft.com/java/api/com.microsoft.azure.cognitiveservices.vision.computervision.computervision) methods, such as `AnalyzeImage`. Or, see the [sample code on GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/java/ComputerVision/src/main/java/ImageAnalysisQuickstart.java) for scenarios involving local images.

> **Tip:**
> The Analyze Image API can do many different operations other than generate image tags. See the [Image Analysis how-to guide](../how-to/call-analyze-image.md) for examples that showcase all of the available features.

[Reference documentation](https://learn.microsoft.com/java/api/overview/azure/cognitiveservices/client/computervision) | [Library source code](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/cognitiveservices/azure-resourcemanager-cognitiveservices) |[Artifact (Maven)](https://central.sonatype.com/artifact/com.microsoft.azure.cognitiveservices/azure-cognitiveservices-computervision?smo=true) | [Samples](https://learn.microsoft.com/samples/browse/?products=azure\&terms=computer-vision)

## Prerequisites

* An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* The current version of the [Java Development Kit (JDK)](https://www.microsoft.com/openjdk).
* The [Gradle build tool](https://gradle.org/install/), or another dependency manager.
* Once you have your Azure subscription, create a [Computer Vision resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesComputerVision) in the Azure portal to get your key and endpoint. After it deploys, select **Go to resource**.
    * You need the key and endpoint from the resource you create to connect your application to the Azure Vision in Foundry Tools.
    * You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.


## Create environment variables 

In this example, write your credentials to environment variables on the local machine that runs the application.


Go to the Azure portal. If the resource you created in the **Prerequisites** section deployed successfully, select **Go to resource** under **Next steps**. You can find your key and endpoint under **Resource Management** on the **Keys and Endpoint** page of the Face resource. Your resource key isn't the same as your Azure subscription ID.


To set the environment variable for your key and endpoint, open a console window and follow the instructions for your operating system and development environment.

- To set the `VISION_KEY` environment variable, replace `<your_key>` with one of the keys for your resource.
- To set the `VISION_ENDPOINT` environment variable, replace `<your_endpoint>` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library.md)

#### [Windows](#tab/windows)

```console
setx VISION_KEY <your_key>
```

```console
setx VISION_ENDPOINT <your_endpoint>
```

After you add the environment variables, you might need to restart any running programs that will read the environment variables, including the console window.

#### [Linux](#tab/linux)

```bash
export VISION_KEY=<your_key>
```

```bash
export VISION_ENDPOINT=<your_endpoint>
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

---


## Analyze image

1. Create a new Gradle project.

    In a console window (such as cmd, PowerShell, or Bash), create a new directory for your app, and navigate to it. 
    
    ```console
    mkdir myapp && cd myapp
    ```
    
    Run the `gradle init` command from your working directory. This command creates essential build files for Gradle, including *build.gradle.kts*, which is used at runtime to create and configure your application.
    
    ```console
    gradle init --type basic
    ```

    When prompted to choose a **DSL**, select **Kotlin**.

1. Install the client library.

    This quickstart uses the Gradle dependency manager. You can find the client library and information for other dependency managers on the [Maven Central Repository](https://central.sonatype.com/artifact/com.microsoft.azure.cognitiveservices/azure-cognitiveservices-computervision?smo=true).

    Locate *build.gradle.kts* and open it with your preferred IDE or text editor. Then copy and paste the following build configuration into the file. This configuration defines the project as a Java application whose entry point is the class `ImageAnalysisQuickstart`. It imports Azure Vision library.

    ```kotlin
    plugins {
        java
        application
    }
    application { 
        mainClass.set("ImageAnalysisQuickstart")
    }
    repositories {
        mavenCentral()
    }
    dependencies {
        implementation(group = "com.microsoft.azure.cognitiveservices", name = "azure-cognitiveservices-computervision", version = "1.0.9-beta")
    }
    ```

1. Create a Java file.

    From your working directory, run the following command to create a project source folder:

    ```console
    mkdir -p src/main/java
    ```

    Navigate to the new folder and create a file called *ImageAnalysisQuickstart.java*. 


1. Open *ImageAnalysisQuickstart.java* in your preferred editor or IDE and paste in the following code.

   [Code reference unavailable in this source snapshot: ../includes/quickstarts-sdk/~/cognitive-services-quickstart-code/java/ComputerVision/src/main/java/ImageAnalysisQuickstart-single.java?name=snippet_single](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library.md)


1. Navigate back to the project root folder, then build the app with:

   ```console
   gradle build
   ```

   Run it with the following command:

   ```console
   gradle run
   ```

## Output

The output of the operation should look like the following example.

```console
Azure Vision - Java Quickstart Sample

Analyzing an image from a URL ...

Tags:
'person' with confidence 0.998895
'human face' with confidence 0.997437
'smile' with confidence 0.991973
'outdoor' with confidence 0.985962
'happy' with confidence 0.969785
'clothing' with confidence 0.961570
'friendship' with confidence 0.946441
'tree' with confidence 0.917331
'female person' with confidence 0.890976
'girl' with confidence 0.888741
'social group' with confidence 0.872044
'posing' with confidence 0.865493
'adolescent' with confidence 0.857371
'love' with confidence 0.852553
'laugh' with confidence 0.850097
'people' with confidence 0.849922
'lady' with confidence 0.844540
'woman' with confidence 0.818172
'group' with confidence 0.792975
'wedding' with confidence 0.615252
'dress' with confidence 0.517169
```


## Clean up resources

If you want to clean up and remove a Foundry Tools subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it.

* [Azure portal](../../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../../multi-service-resource.md?pivots=azcli#clean-up-resources)

## Next step

In this quickstart, you learned how to install the Image Analysis client library and make basic image analysis calls. Next, learn more about the Analyze Image API features.

> 
>[Call the Analyze Image API](../how-to/call-analyze-image.md)

* [What is Image Analysis?](../overview-image-analysis.md)
* [Source code for this sample on GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/java/ComputerVision/src/main/java/ImageAnalysisQuickstart.java)




**Applies to: programming-language-javascript**



<a name="HOLTop"></a>

Use the Image Analysis client library for JavaScript to analyze a remote image for content tags.

> **Tip:**
> You can also analyze a local image. See the [ComputerVisionClient](https://learn.microsoft.com/javascript/api/@azure/cognitiveservices-computervision/computervisionclient) methods, such as `describeImageInStream`. Or, see the [sample code on GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/javascript/ComputerVision/ImageAnalysisQuickstart.js) for scenarios involving local images.

> **Tip:**
> The Analyze Image API can do many different operations other than generate image tags. See the [Image Analysis how-to guide](../how-to/call-analyze-image.md) for examples that showcase all of the available features.

[Reference documentation](https://learn.microsoft.com/javascript/api/@azure/cognitiveservices-computervision/) | [Package (npm)](https://www.npmjs.com/package/@azure/cognitiveservices-computervision) | [Samples](https://learn.microsoft.com/samples/browse/?products=azure\&terms=computer-vision)

## Prerequisites

* An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* The current version of [Node.js](https://nodejs.org/).
* Once you have your Azure subscription, create a [Computer Vision resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesComputerVision) in the Azure portal to get your key and endpoint. After it deploys, select **Go to resource**.
    * You need the key and endpoint from the resource you create to connect your application to Azure Vision in Foundry Tools.
    * You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.


## Create environment variables 

In this example, write your credentials to environment variables on the local machine that runs the application.


Go to the Azure portal. If the resource you created in the **Prerequisites** section deployed successfully, select **Go to resource** under **Next steps**. You can find your key and endpoint under **Resource Management** on the **Keys and Endpoint** page of the Face resource. Your resource key isn't the same as your Azure subscription ID.


To set the environment variable for your key and endpoint, open a console window and follow the instructions for your operating system and development environment.

- To set the `VISION_KEY` environment variable, replace `<your_key>` with one of the keys for your resource.
- To set the `VISION_ENDPOINT` environment variable, replace `<your_endpoint>` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library.md)

#### [Windows](#tab/windows)

```console
setx VISION_KEY <your_key>
```

```console
setx VISION_ENDPOINT <your_endpoint>
```

After you add the environment variables, you might need to restart any running programs that will read the environment variables, including the console window.

#### [Linux](#tab/linux)

```bash
export VISION_KEY=<your_key>
```

```bash
export VISION_ENDPOINT=<your_endpoint>
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

---


## Analyze image

1. Create a new Node.js application

    In a console window (such as cmd, PowerShell, or Bash), create a new directory for your app, and navigate to it.

    ```console
    mkdir myapp && cd myapp
    ```

    Run the `npm init` command to create a node application with a *package.json* file.

    ```console
    npm init
    ```

    ### Install the client library

    Install the `ms-rest-azure` and `@azure/cognitiveservices-computervision` npm package:

    ```console
    npm install @azure/cognitiveservices-computervision
    ```

    Also install the async module:

    ```console
    npm install async
    ```

    Your app's `package.json` file is updated with the dependencies.

    Create a new file, *index.js*.

1. Open *index.js* in a text editor and paste in the following code.

   [Code reference unavailable in this source snapshot: ../includes/quickstarts-sdk/~/cognitive-services-quickstart-code/javascript/ComputerVision/ImageAnalysisQuickstart-single.js?name=snippet_single](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library.md)


1. Run the application with the `node` command on your quickstart file.

   ```console
   node index.js
   ```

## Output

The output of the operation should look like the following example.

```console
-------------------------------------------------
DETECT TAGS

Analyzing tags in image... sample16.png
Tags: grass (1.00), dog (0.99), mammal (0.99), animal (0.99), dog breed (0.99), pet (0.97), outdoor (0.97), companion dog (0.91), small greek domestic dog (0.90), golden retriever (0.89), labrador retriever (0.87), puppy (0.87), ancient dog breeds (0.85), field (0.80), retriever (0.68), brown (0.66)

-------------------------------------------------
End of quickstart.
```

## Clean up resources

If you want to clean up and remove a Foundry Tools subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it.

* [Azure portal](../../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../../multi-service-resource.md?pivots=azcli#clean-up-resources)

## Next step

In this quickstart, you learned how to install the Image Analysis client library and make basic image analysis calls. Next, learn more about the Analyze Image API features.

> 
>[Call the Analyze Image API](../how-to/call-analyze-image.md)

* [What is Image Analysis?](../overview-image-analysis.md)
* [Source code for this sample on GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/javascript/ComputerVision/ImageAnalysisQuickstart.js)




**Applies to: programming-language-rest-api**



Use the Image Analysis REST API to analyze an image for tags.

> **Tip:**
> The Analyze Image API can do many different operations other than generate image tags. See the [Image Analysis how-to guide](../how-to/call-analyze-image.md) for examples that showcase all of the available features.

> **Note:**
> This quickstart uses cURL commands to call the REST API. You can also call the REST API using a programming language. See the GitHub samples for examples in [C#](https://github.com/Azure-Samples/cognitive-services-quickstart-code/tree/master/dotnet/ComputerVision/REST), [Python](https://github.com/Azure-Samples/cognitive-services-quickstart-code/tree/master/python/ComputerVision/REST), [Java](https://github.com/Azure-Samples/cognitive-services-quickstart-code/tree/master/java/ComputerVision/REST), and [JavaScript](https://github.com/Azure-Samples/cognitive-services-quickstart-code/tree/master/javascript/ComputerVision/REST).

## Prerequisites

* An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* Once you have your Azure subscription, create a [Computer Vision resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesComputerVision) in the Azure portal to get your key and endpoint. After it deploys, select **Go to resource**.
  * You need the key and endpoint from the resource you create to connect your application to Azure Vision in Foundry Tools.
  * You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.
* [cURL](https://curl.se) installed.

## Analyze an image

To analyze an image for various visual features, do the following steps:

1. Copy the following command into a text editor.

    ```bash
    curl.exe -H "Ocp-Apim-Subscription-Key: <yourKey>" -H "Content-Type: application/json" "https://westcentralus.api.cognitive.microsoft.com/vision/v3.2/analyze?visualFeatures=Tags" -d "{'url':'https://learn.microsoft.com/azure/ai-services/computer-vision/media/quickstarts/presentation.png'}"
    ```

1. Make the following changes in the command where needed:
    1. Replace the value of `<yourKey>` with the key from your Computer Vision resource.
    1. Replace the first part of the request URL (`westcentralus.api.cognitive.microsoft.com`) with your own endpoint URL.
        
> **Note:**
> New resources created after July 1, 2019, will use custom subdomain names. For more information and a complete list of regional endpoints, see [Custom subdomain names for Foundry Tools](https://learn.microsoft.com/azure/cognitive-services/cognitive-services-custom-subdomains).

    1. Optionally, change the image URL in the request body (`https://learn.microsoft.com/azure/ai-services/computer-vision/media/quickstarts/presentation.png`) to the URL of a different image to be analyzed.
1. Open a command prompt window.
1. Paste your edited `curl` command from the text editor into the command prompt window, and then run the command.

### Examine the response

A successful response is returned in JSON format. The sample application parses and displays a successful response in the command prompt window, similar to the following example:

```json
{
   "tags":[
      {
         "name":"text",
         "confidence":0.9992657899856567
      },
      {
         "name":"post-it note",
         "confidence":0.9879657626152039
      },
      {
         "name":"handwriting",
         "confidence":0.9730165004730225
      },
      {
         "name":"rectangle",
         "confidence":0.8658561706542969
      },
      {
         "name":"paper product",
         "confidence":0.8561884760856628
      },
      {
         "name":"purple",
         "confidence":0.5961999297142029
      }
   ],
   "requestId":"2788adfc-8cfb-43a5-8fd6-b3a9ced35db2",
   "metadata":{
      "height":945,
      "width":1000,
      "format":"Jpeg"
   },
   "modelVersion":"2021-05-01"
}
```

## Next step

In this quickstart, you learned how to make basic image analysis calls using the REST API. Next, learn more about the Analyze Image API features.

> 
>[Call the Analyze Image API](../how-to/call-analyze-image.md)

* [What is Image Analysis?](../overview-image-analysis.md)
