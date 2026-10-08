---
title: "Quickstart: Image Analysis client library for Java"
description: In this quickstart, get started with the Image Analysis client library for Java.
author: PatrickFarley
manager: mcleans
ms.service: azure-vision-foundry-tools
ms.topic: include
ms.date: 12/30/2024
ms.custom: devx-track-java
ms.author: pafarley
---

<a name="HOLTop"></a>

Use the Image Analysis client library for Java to analyze a remote image for tags, text description, faces, adult content, and more.

> **Tip:**
> You can also analyze a local image. See the [ComputerVision](https://learn.microsoft.com/java/api/com.microsoft.azure.cognitiveservices.vision.computervision.computervision) methods, such as `AnalyzeImage`. Or, see the [sample code on GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/java/ComputerVision/src/main/java/ImageAnalysisQuickstart.java) for scenarios involving local images.

> **Tip:**
> The Analyze Image API can do many different operations other than generate image tags. See the [Image Analysis how-to guide](../../how-to/call-analyze-image.md) for examples that showcase all of the available features.

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

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/includes/quickstarts-sdk/image-analysis-java-sdk.md)

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

   [Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/java/ComputerVision/src/main/java/ImageAnalysisQuickstart-single.java?name=snippet_single](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/includes/quickstarts-sdk/image-analysis-java-sdk.md)


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

* [Azure portal](../../../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../../../multi-service-resource.md?pivots=azcli#clean-up-resources)

## Next step

In this quickstart, you learned how to install the Image Analysis client library and make basic image analysis calls. Next, learn more about the Analyze Image API features.

> 
>[Call the Analyze Image API](../../how-to/call-analyze-image.md)

* [What is Image Analysis?](../../overview-image-analysis.md)
* [Source code for this sample on GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/java/ComputerVision/src/main/java/ImageAnalysisQuickstart.java)
