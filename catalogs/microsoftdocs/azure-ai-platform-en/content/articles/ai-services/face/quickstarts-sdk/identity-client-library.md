---
title: 'Quickstart: Use the Face service'
titleSuffix: Foundry Tools
description: The Face API offers client libraries that make it easy to detect, find similar, identify, verify, and more.
author: PatrickFarley
manager: mcleans
zone_pivot_groups: programming-languages-set-face
ms.service: azure-vision-foundry-tools
ms.subservice: azure-ai-face
ms.update-cycle: 90-days
ms.topic: quickstart
ms.date: 01/30/2026
ms.author: pafarley
ms.devlang: csharp
# ms.devlang: csharp, golang, javascript, python
ms.custom: devx-track-python, devx-track-csharp, mode-api, devx-track-dotnet, devx-track-extended-java, devx-track-js
keywords: face search by image, facial recognition search, facial recognition, face recognition app
feedback_help_link_url: https://learn.microsoft.com/answers/tags/156/azure-face
---

# Quickstart: Use the Face service


> **Important:**
> If you're using Microsoft products or services to process Biometric Data, you're responsible for: (i) providing notice to data subjects, including with respect to retention periods and destruction; (ii) obtaining consent from data subjects; and (iii) deleting the Biometric Data, all as appropriate and required under applicable Data Protection Requirements. For related information, see [Data and Privacy for Face](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/face/data-privacy-security).


> **Caution:**
> Face service access is limited based on eligibility and usage criteria in order to support our Responsible AI principles. Face service is only available to Microsoft managed customers and partners. Use the [Face Recognition intake form](https://aka.ms/facerecognition) to apply for access. To complete the steps in this quickstart, request the **[Face API] Facial Identification (1:N or 1:1 matching) with optional facial liveness detection for touchless access control** use case. For more information, see the [Face limited access](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/computer-vision/limited-access-identity) page.

**Applies to: foundry-portal**



Use Microsoft Foundry portal to detect faces in an image.

## Prerequisites

* An Azure account. If you don't have one, you can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* A [Microsoft Foundry resource](https://ms.portal.azure.com/#view/Microsoft_Azure_ProjectOxford/CognitiveServicesHub/%7E/AIServices)

## Setup 

Go to the [Microsoft Foundry portal](https://ai.azure.com/), and sign in with your Azure account that has the Foundry resource.

Select **Microsoft Foundry** in the top-left corner, scroll down and select **Explore Foundry Tools**, and then select **Vision + Document**. On the **Face** tab, select **Detect faces in an image**.

## Detect faces

Select an image from the available set, or upload your own. The service will detect faces in the image and return their bounding box coordinates, face landmark coordinates, and attributes. Select the **JSON** tab to see the full JSON response from the API.



## Next steps

In this quickstart, you did face detection by using the Microsoft Foundry portal. Next, learn about the different face detection models and how to specify the right model for your use case.

> 
> [Specify a face detection model version](../how-to/specify-detection-model.md)

* [What is the Face service?](../overview-identity.md)




**Applies to: programming-language-csharp**



Get started with facial recognition using the Face client library for .NET. The Azure Face service provides you with access to advanced algorithms for detecting and recognizing human faces in images. Follow these steps to install the package and try out the example code for basic face identification using remote images.

[Reference documentation](https://aka.ms/azsdk-csharp-face-ref) | [Library source code](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/face/Azure.AI.Vision.Face) | [Package (NuGet)](https://aka.ms/azsdk-csharp-face-pkg) | [Samples](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/face/Azure.AI.Vision.Face/samples)

## Prerequisites

* Azure subscription. [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* The [Visual Studio IDE](https://visualstudio.microsoft.com/vs/) or current version of [.NET Core](https://dotnet.microsoft.com/download/dotnet-core).
* Once you have your Azure subscription, <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesFace"  title="Create a Face resource"  target="_blank">create a Face resource </a> in the Azure portal to get your key and endpoint. You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.


## Create environment variables


In this example, write your credentials to environment variables on the local machine that runs the application.


Go to the Azure portal. If the resource you created in the **Prerequisites** section deployed successfully, select **Go to resource** under **Next steps**. You can find your key and endpoint under **Resource Management** on the **Keys and Endpoint** page of the Face resource. Your resource key isn't the same as your Azure subscription ID.


To set the environment variable for your key and endpoint, open a console window and complete the instructions that follow for your operating system and development environment.

- To set the `FACE_APIKEY` environment variable, replace `<your_key>` with one of the keys for your resource.
- To set the `FACE_ENDPOINT` environment variable, replace `<your_endpoint>` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/quickstarts-sdk/identity-client-library.md)

#### [Windows](#tab/windows)

```console
setx FACE_APIKEY <your_key>
```

```console
setx FACE_ENDPOINT <your_endpoint>
```

After you add the environment variables, you might need to restart any running programs that will read the environment variables, including the console window.

#### [Linux](#tab/linux)

```bash
export FACE_APIKEY=<your_key>
```

```bash
export FACE_ENDPOINT=<your_endpoint>
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

---


## Identify and verify faces

1. Create a new C# application.

    #### [Visual Studio IDE](#tab/visual-studio)

    Using Visual Studio, create a new .NET Console App. 

    ### Install the client library 

    Once you've created a new project, install the client library by right-clicking the project in  **Solution Explorer** and selecting **Manage NuGet Packages**. In the package manager that opens, select **Browse**, select **Include prerelease**, and search for `Azure.AI.Vision.Face`. Select the latest version, and then select **Install**. 

    #### [CLI](#tab/cli)

    In a console window (such as cmd, PowerShell, or Bash), use the `dotnet new` command to create a new console app with the name `face-quickstart`. This command creates a simple "Hello World" C# project with a single source file: *program.cs*. 

    ```console
    dotnet new console -n face-quickstart
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

    Within the application directory, install the Face client library for .NET with the following command:

    ```console
    dotnet add package Azure.AI.Vision.Face --prerelease
    ```

    ---
1. Add the following code into the *Program.cs* file, replacing the existing code.

    > **Note:**
    > If you haven't received access to the Face service by using the [intake form](https://aka.ms/facerecognition), some of these functions won't work.
    
    [Code reference unavailable in this source snapshot: ../includes/quickstarts-sdk/~/cognitive-services-quickstart-code/dotnet/Face/Quickstart.cs?name=snippet_single](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/quickstarts-sdk/identity-client-library.md)


1. Run the application

    #### [Visual Studio IDE](#tab/visual-studio)

    Run the application by selecting the **Debug** button at the top of the IDE window.

    #### [CLI](#tab/cli)

    Run the application from your application directory with the `dotnet run` command.

    ```dotnet
    dotnet run
    ```

    ---



## Output

```console
========IDENTIFY FACES========

Create a person group (18d1c443-a01b-46a4-9191-121f74a831cd).
Create a person group person 'Family1-Dad'.
Check whether image is of sufficient quality for recognition
Add face to the person group person(Family1-Dad) from image `Family1-Dad1.jpg`
Check whether image is of sufficient quality for recognition
Add face to the person group person(Family1-Dad) from image `Family1-Dad2.jpg`
Create a person group person 'Family1-Mom'.
Check whether image is of sufficient quality for recognition
Add face to the person group person(Family1-Mom) from image `Family1-Mom1.jpg`
Check whether image is of sufficient quality for recognition
Add face to the person group person(Family1-Mom) from image `Family1-Mom2.jpg`
Create a person group person 'Family1-Son'.
Check whether image is of sufficient quality for recognition
Add face to the person group person(Family1-Son) from image `Family1-Son1.jpg`
Check whether image is of sufficient quality for recognition
Add face to the person group person(Family1-Son) from image `Family1-Son2.jpg`

Train person group 18d1c443-a01b-46a4-9191-121f74a831cd.
Training status: succeeded.

Pausing for 60 seconds to avoid triggering rate limit on free account...
4 face(s) with 4 having sufficient quality for recognition detected from image `identification1.jpg`
Person 'Family1-Dad' is identified for the face in: identification1.jpg - ad813534-9141-47b4-bfba-24919223966f, confidence: 0.96807.
Verification result: is a match? True. confidence: 0.96807
Person 'Family1-Mom' is identified for the face in: identification1.jpg - 1a39420e-f517-4cee-a898-5d968dac1a7e, confidence: 0.96902.
Verification result: is a match? True. confidence: 0.96902
No person is identified for the face in: identification1.jpg - 889394b1-e30f-4147-9be1-302beb5573f3,
Person 'Family1-Son' is identified for the face in: identification1.jpg - 0557d87b-356c-48a8-988f-ce0ad2239aa5, confidence: 0.9281.
Verification result: is a match? True. confidence: 0.9281

========DELETE PERSON GROUP========

Deleted the person group 18d1c443-a01b-46a4-9191-121f74a831cd.

End of quickstart.
```



> **Tip:**
> The Face API runs on a set of pre-built models that are static by nature (the model's performance will not regress or improve as the service is run). The results that the model produces might change if Microsoft updates the model's backend without migrating to an entirely new model version. To take advantage of a newer version of a model, you can retrain your **PersonGroup**, specifying the newer model as a parameter with the same enrollment images.

## Clean up resources

If you want to clean up and remove a Foundry Tools subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it.

* [Azure portal](../../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../../multi-service-resource.md?pivots=azcli#clean-up-resources)

## Next steps

In this quickstart, you learned how to use the Face client library for .NET to do basic face identification. Next, learn about the different face detection models and how to specify the right model for your use case.

> 
> [Specify a face detection model version](../how-to/specify-detection-model.md)

* [What is the Face service?](../overview-identity.md)
* More extensive sample code can be found on [GitHub](https://aka.ms/FaceSamples).





**Applies to: programming-language-python**



Get started with facial recognition using the Face client library for Python. Follow these steps to install the package and try out the example code for basic tasks. The Face service provides you with access to advanced algorithms for detecting and recognizing human faces in images. Follow these steps to install the package and try out the example code for basic face identification using remote images.

[Reference documentation](https://aka.ms/azsdk-python-face-ref) | [Library source code](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/face/azure-ai-vision-face) | [Package (PiPy)](https://aka.ms/azsdk-python-face-pkg) | [Samples](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/face/azure-ai-vision-face/samples)

## Prerequisites

* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* [Python 3.x](https://www.python.org/)
  * Your Python installation should include [pip](https://pip.pypa.io/en/stable/). You can check if you have pip installed by running `pip --version` on the command line. Get pip by installing the latest version of Python.
* Once you have your Azure subscription, <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesFace"  title="Create a Face resource"  target="_blank">create a Face resource</a> in the Azure portal to get your key and endpoint. After it deploys, select **Go to resource**.
    * You'll need the key and endpoint from the resource you create to connect your application to the Face API.
    * You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.


## Create environment variables


In this example, write your credentials to environment variables on the local machine that runs the application.


Go to the Azure portal. If the resource you created in the **Prerequisites** section deployed successfully, select **Go to resource** under **Next steps**. You can find your key and endpoint under **Resource Management** on the **Keys and Endpoint** page of the Face resource. Your resource key isn't the same as your Azure subscription ID.


To set the environment variable for your key and endpoint, open a console window and complete the instructions that follow for your operating system and development environment.

- To set the `FACE_APIKEY` environment variable, replace `<your_key>` with one of the keys for your resource.
- To set the `FACE_ENDPOINT` environment variable, replace `<your_endpoint>` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/quickstarts-sdk/identity-client-library.md)

#### [Windows](#tab/windows)

```console
setx FACE_APIKEY <your_key>
```

```console
setx FACE_ENDPOINT <your_endpoint>
```

After you add the environment variables, you might need to restart any running programs that will read the environment variables, including the console window.

#### [Linux](#tab/linux)

```bash
export FACE_APIKEY=<your_key>
```

```bash
export FACE_ENDPOINT=<your_endpoint>
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

---


## Identify and verify faces

1. Install the client library

    After installing Python, you can install the client library with:

    ```console
    pip install --upgrade azure-ai-vision-face
    ```

1. Create a new Python application

    Create a new Python script&mdash;*quickstart-file.py*, for example. Then open it in your preferred editor or IDE and paste in the following code.

    > **Note:**
    > If you haven't received access to the Face service using the [intake form](https://aka.ms/facerecognition), some of these functions won't work.

    [Code reference unavailable in this source snapshot: ../includes/quickstarts-sdk/~/cognitive-services-quickstart-code/python/Face/Quickstart.py?name=snippet_single](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/quickstarts-sdk/identity-client-library.md)


1. Run your face recognition app from the application directory with the `python` command.

    ```console
    python quickstart-file.py
    ```

    > **Tip:**
    > The Face API runs on a set of pre-built models that are static by nature (the model's performance will not regress or improve as the service is run). The results that the model produces might change if Microsoft updates the model's backend without migrating to an entirely new model version. To take advantage of a newer version of a model, you can retrain your **PersonGroup**, specifying the newer model as a parameter with the same enrollment images.



## Output

```console
Person group: ad12b2db-d892-48ec-837a-0e7168c18224
face 335a2cb1-5211-4c29-9c45-776dd014b2af added to person 9ee65510-81a5-47e5-9e50-66727f719465
face df57eb50-4a13-4f93-b804-cd108327ad5a added to person 9ee65510-81a5-47e5-9e50-66727f719465
face d8b7b8b8-3ca6-4309-b76e-eeed84f7738a added to person 00651036-4236-4004-88b9-11466c251548
face dffbb141-f40b-4392-8785-b6c434fa534e added to person 00651036-4236-4004-88b9-11466c251548
face 9cdac36e-5455-447b-a68d-eb1f5e2ec27d added to person 23614724-b132-407a-aaa0-67003987ce93
face d8208412-92b7-4b8d-a2f8-3926c839c87e added to person 23614724-b132-407a-aaa0-67003987ce93
Train the person group ad12b2db-d892-48ec-837a-0e7168c18224
The person group ad12b2db-d892-48ec-837a-0e7168c18224 is trained successfully.
Pausing for 60 seconds to avoid triggering rate limit on free account...
Identifying faces in image
Person is identified for face ID bc52405a-5d83-4500-9218-557468ccdf99 in image, with a confidence of 0.96726.
verification result: True. confidence: 0.96726
Person is identified for face ID dfcc3fc8-6252-4f3a-8205-71466f39d1a7 in image, with a confidence of 0.96925.
verification result: True. confidence: 0.96925
No person identified for face ID 401c581b-a178-45ed-8205-7692f6eede88 in image.
Person is identified for face ID 8809d9c7-e362-4727-8c95-e1e44f5c2e8a in image, with a confidence of 0.92898.
verification result: True. confidence: 0.92898

The person group ad12b2db-d892-48ec-837a-0e7168c18224 is deleted.

End of quickstart.
```



## Clean up resources

If you want to clean up and remove a Foundry Tools subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it.

* [Azure portal](../../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../../multi-service-resource.md?pivots=azcli#clean-up-resources)

## Next steps

In this quickstart, you learned how to use the Face client library for Python to do basic face identification. Next, learn about the different face detection models and how to specify the right model for your use case.

> 
> [Specify a face detection model version](../how-to/specify-detection-model.md)

* [What is the Face service?](../overview-identity.md)
* More extensive sample code can be found on [GitHub](https://aka.ms/FaceSamples).




**Applies to: programming-language-java**



Get started with facial recognition using the Face client library for Java. Follow these steps to install the package and try out the example code for basic tasks. The Face service provides you with access to advanced algorithms for detecting and recognizing human faces in images. Follow these steps to install the package and try out the example code for basic face identification using remote images.

[Reference documentation](https://aka.ms/azsdk-java-face-ref) | [Library source code](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/face/azure-ai-vision-face) | [Package (Maven)](https://central.sonatype.com/artifact/com.azure/azure-ai-vision-face) | [Samples](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/face/azure-ai-vision-face/src/samples)

## Prerequisites

* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* The current version of the [Java Development Kit (JDK)](https://www.microsoft.com/openjdk)
* [Apache Maven](https://maven.apache.org/download.cgi) installed. On Linux, install from the distribution repositories if available.
* Once you have your Azure subscription, <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesFace"  title="Create a Face resource"  target="_blank">create a Face resource</a> in the Azure portal to get your key and endpoint. After it deploys, select **Go to resource**.
    * You'll need the key and endpoint from the resource you create to connect your application to the Face API.
    * You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.


## Create environment variables


In this example, write your credentials to environment variables on the local machine that runs the application.


Go to the Azure portal. If the resource you created in the **Prerequisites** section deployed successfully, select **Go to resource** under **Next steps**. You can find your key and endpoint under **Resource Management** on the **Keys and Endpoint** page of the Face resource. Your resource key isn't the same as your Azure subscription ID.


To set the environment variable for your key and endpoint, open a console window and complete the instructions that follow for your operating system and development environment.

- To set the `FACE_APIKEY` environment variable, replace `<your_key>` with one of the keys for your resource.
- To set the `FACE_ENDPOINT` environment variable, replace `<your_endpoint>` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/quickstarts-sdk/identity-client-library.md)

#### [Windows](#tab/windows)

```console
setx FACE_APIKEY <your_key>
```

```console
setx FACE_ENDPOINT <your_endpoint>
```

After you add the environment variables, you might need to restart any running programs that will read the environment variables, including the console window.

#### [Linux](#tab/linux)

```bash
export FACE_APIKEY=<your_key>
```

```bash
export FACE_ENDPOINT=<your_endpoint>
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

---


## Identify and verify faces

1. Install the client library

    Open a console window and create a new folder for your quickstart application. Copy the following content to a new file. Save the file as `pom.xml` in your project directory:

    <!-- [!INCLUDE][](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-quickstart-code/master/java/Face/pom.xml)] -->
    ```xml
    <project xmlns="http://maven.apache.org/POM/4.0.0"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
      <modelVersion>4.0.0</modelVersion>
      <groupId>com.example</groupId>
      <artifactId>my-application-name</artifactId>
      <version>1.0.0</version>
      <dependencies>
        <!-- https://mvnrepository.com/artifact/com.azure/azure-ai-vision-face -->
        <dependency>
          <groupId>com.azure</groupId>
          <artifactId>azure-ai-vision-face</artifactId>
          <version>1.0.0-beta.2</version>
        </dependency>
      </dependencies>
    </project>
    ```

    Install the SDK and dependencies by running the following in the project directory:

    ```console
    mvn clean dependency:copy-dependencies
    ```

1. Create a new Java application

    Create a file named `Quickstart.java`, open it in a text editor, and paste in the following code:

    > **Note:**
    > If you haven't received access to the Face service using the [intake form](https://aka.ms/facerecognition), some of these functions won't work.

    [Code reference unavailable in this source snapshot: ../includes/quickstarts-sdk/~/cognitive-services-quickstart-code/java/Face/Quickstart.java?name=snippet_single](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/quickstarts-sdk/identity-client-library.md)


1. Run your face recognition app from the application directory with the `javac` and `java` commands.

    #### [Windows](#tab/windows)

    ```console
    javac -cp target\dependency\* Quickstart.java
    java -cp .;target\dependency\* Quickstart
    ```

    #### [Linux](#tab/linux)

    ```console
    javac -cp target/dependency/* Quickstart.java
    java -cp .:target/dependency/* Quickstart
    ```

    ---



## Output

```console
========IDENTIFY FACES========

Create a person group (3761e61a-16b2-4503-ad29-ed34c58ba676).
Create a person group person 'Family1-Dad'.
Check whether image is of sufficient quality for recognition
Add face to the person group person(Family1-Dad) from image `Family1-Dad1.jpg`
Check whether image is of sufficient quality for recognition
Add face to the person group person(Family1-Dad) from image `Family1-Dad2.jpg`
Create a person group person 'Family1-Mom'.
Check whether image is of sufficient quality for recognition
Add face to the person group person(Family1-Mom) from image `Family1-Mom1.jpg`
Check whether image is of sufficient quality for recognition
Add face to the person group person(Family1-Mom) from image `Family1-Mom2.jpg`
Create a person group person 'Family1-Son'.
Check whether image is of sufficient quality for recognition
Add face to the person group person(Family1-Son) from image `Family1-Son1.jpg`
Check whether image is of sufficient quality for recognition
Add face to the person group person(Family1-Son) from image `Family1-Son2.jpg`

Train person group 3761e61a-16b2-4503-ad29-ed34c58ba676.
Training status: succeeded.

Pausing for 60 seconds to avoid triggering rate limit on free account...
4 face(s) with 4 having sufficient quality for recognition.
Person 'Family1-Dad' is identified for the face in: identification1.jpg - d7995b34-1b72-47fe-82b6-e9877ed2578d, confidence: 0.96807.
Verification result: is a match? true. confidence: 0.96807
Person 'Family1-Mom' is identified for the face in: identification1.jpg - 844da0ed-4890-4bbf-a531-e638797f96fc, confidence: 0.96902.
Verification result: is a match? true. confidence: 0.96902
No person is identified for the face in: identification1.jpg - c543159a-57f3-4872-83ce-2d4a733d71c9.
Person 'Family1-Son' is identified for the face in: identification1.jpg - 414fac6c-7381-4dba-9c8b-fd26d52e879b, confidence: 0.9281.
Verification result: is a match? true. confidence: 0.9281

========DELETE PERSON GROUP========

Deleted the person group 3761e61a-16b2-4503-ad29-ed34c58ba676.

End of quickstart.
```



## Clean up resources

If you want to clean up and remove a Foundry Tools subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it.

* [Azure portal](../../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../../multi-service-resource.md?pivots=azcli#clean-up-resources)

## Next steps

In this quickstart, you learned how to use the Face client library for Java to do basic face identification. Next, learn about the different face detection models and how to specify the right model for your use case.

> 
> [Specify a face detection model version](../how-to/specify-detection-model.md)

* [What is the Face service?](../overview-identity.md)
* More extensive sample code can be found on [GitHub](https://aka.ms/FaceSamples).




**Applies to: programming-language-javascript**



Get started with facial recognition using the Face client library for JavaScript. The Face service provides you with access to advanced algorithms for detecting and recognizing human faces in images. Follow these steps to install the package and try out the example code for basic face identification using remote images.

[Reference documentation](https://aka.ms/azsdk-javascript-face-ref) | [Library source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/face/ai-vision-face-rest) | [Package (npm)](https://www.npmjs.com/package/@azure-rest/ai-vision-face) | [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/face/ai-vision-face-rest/samples)

## Prerequisites

* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* The latest version of [Node.js](https://nodejs.org/en/)
* Once you have your Azure subscription, [Create a Face resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesFace).You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.


## Create environment variables


In this example, write your credentials to environment variables on the local machine that runs the application.


Go to the Azure portal. If the resource you created in the **Prerequisites** section deployed successfully, select **Go to resource** under **Next steps**. You can find your key and endpoint under **Resource Management** on the **Keys and Endpoint** page of the Face resource. Your resource key isn't the same as your Azure subscription ID.


To set the environment variable for your key and endpoint, open a console window and complete the instructions that follow for your operating system and development environment.

- To set the `FACE_APIKEY` environment variable, replace `<your_key>` with one of the keys for your resource.
- To set the `FACE_ENDPOINT` environment variable, replace `<your_endpoint>` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/quickstarts-sdk/identity-client-library.md)

#### [Windows](#tab/windows)

```console
setx FACE_APIKEY <your_key>
```

```console
setx FACE_ENDPOINT <your_endpoint>
```

After you add the environment variables, you might need to restart any running programs that will read the environment variables, including the console window.

#### [Linux](#tab/linux)

```bash
export FACE_APIKEY=<your_key>
```

```bash
export FACE_ENDPOINT=<your_endpoint>
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

---



## Identify and verify faces

1. Create a new Node.js application

    In a console window (such as cmd, PowerShell, or Bash), create a new directory for your app, and navigate to it. 

    ```console
    mkdir myapp && cd myapp
    ```

    Run the `npm init` command to create a node application with a `package.json` file. 

    ```console
    npm init
    ```

1. Install the `@azure-rest/ai-vision-face` npm packages:

    ```console
    npm install @azure-rest/ai-vision-face
    ```

    Your app's `package.json` file is updated with the dependencies.

1. Create a file named `index.js`, open it in a text editor, paste in the following code, and save it to the folder that contains the app. 

    > **Note:**
    > If you haven't received access to the Face service using the [intake form](https://aka.ms/facerecognition), some of these functions won't work.

    [Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/javascript/Face/Quickstart.js](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/quickstarts-sdk/identity-client-library.md)

1. Run the application with the `node` command on your quickstart file.

    ```console
    node index.js
    ```



## Output

```console
========IDENTIFY FACES========

Creating a person group with ID: a230ac8b-09b2-4fa0-ae04-d76356d88d9f
Adding faces to person group...
Create a persongroup person: Family1-Dad
Create a persongroup person: Family1-Mom
Create a persongroup person: Family1-Son
Add face to the person group person: (Family1-Dad) from image: (Family1-Dad1.jpg)
Add face to the person group person: (Family1-Mom) from image: (Family1-Mom1.jpg)
Add face to the person group person: (Family1-Son) from image: (Family1-Son1.jpg)
Add face to the person group person: (Family1-Dad) from image: (Family1-Dad2.jpg)
Add face to the person group person: (Family1-Mom) from image: (Family1-Mom2.jpg)
Add face to the person group person: (Family1-Son) from image: (Family1-Son2.jpg)
Done adding faces to person group.

Training person group: a230ac8b-09b2-4fa0-ae04-d76356d88d9f
Training status: succeeded
Pausing for 60 seconds to avoid triggering rate limit on free account...
No persons identified for face with ID 56380623-8bf0-414a-b9d9-c2373386b7be
Person: Family1-Dad is identified for face in: identification1.jpg with ID: c45052eb-a910-4fd3-b1c3-f91ccccc316a. Confidence: 0.96807
Person: Family1-Son is identified for face in: identification1.jpg with ID: 8dce9b50-513f-4fe2-9e19-352acfd622b3. Confidence: 0.9281
Person: Family1-Mom is identified for face in: identification1.jpg with ID: 75868da3-66f6-4b5f-a172-0b619f4d74c1. Confidence: 0.96902
Verification result between face c45052eb-a910-4fd3-b1c3-f91ccccc316a and person 35a58d14-fd58-4146-9669-82ed664da357: true with confidence: 0.96807
Verification result between face 8dce9b50-513f-4fe2-9e19-352acfd622b3 and person 2d4d196c-5349-431c-bf0c-f1d7aaa180ba: true with confidence: 0.9281
Verification result between face 75868da3-66f6-4b5f-a172-0b619f4d74c1 and person 35d5de9e-5f92-4552-8907-0d0aac889c3e: true with confidence: 0.96902

Deleting person group: a230ac8b-09b2-4fa0-ae04-d76356d88d9f

Done.
```


## Clean up resources

If you want to clean up and remove a Foundry Tools subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it.

* [Azure portal](../../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../../multi-service-resource.md?pivots=azcli#clean-up-resources)

## Next steps

In this quickstart, you learned how to use the Face client library for JavaScript to do basic face identification. Next, learn about the different face detection models and how to specify the right model for your use case.

> 
> [Specify a face detection model version](../how-to/specify-detection-model.md)

* [What is the Face service?](../overview-identity.md)
* More extensive sample code can be found on [GitHub](https://aka.ms/FaceSamples).




**Applies to: programming-language-typescript**



Get started with facial recognition using the Face client library for TypeScript. Follow these steps to install the package and try out the example code for basic tasks. The Face service provides you with access to advanced algorithms for detecting and recognizing human faces in images. Follow these steps to install the package and try out the example code for basic face identification using remote images.



[Reference documentation](https://aka.ms/azsdk-javascript-face-ref) | [Library source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/face/ai-vision-face-rest) | [Package (npm)](https://www.npmjs.com/package/@azure-rest/ai-vision-face) | [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/face/ai-vision-face-rest/samples)

## Prerequisites

* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* [Node.js LTS](https://nodejs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* Once you have your Azure subscription, [Create a Face resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesFace) in the Azure portal to get your key and endpoint. After it deploys, select **Go to resource**.
    * You'll need the key and endpoint from the resource you create to connect your application to the Face API.
    * You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.

## Set up local development environment

1. Create a new directory for your project and navigate to it:

   ```console
   mkdir face-identification
   cd face-identification
   code .
   ```

1. Create a new package for ESM modules in your project directory:

   ```console
   npm init -y
   npm pkg set type=module
   ```

1. Install the required packages:

   ```console
   npm install @azure-rest/ai-vision-face
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

1. Create a `resources` folder and add sample images to it.

1. Create a `src` directory for your TypeScript code.


In this example, write your credentials to environment variables on the local machine that runs the application.


Go to the Azure portal. If the resource you created in the **Prerequisites** section deployed successfully, select **Go to resource** under **Next steps**. You can find your key and endpoint under **Resource Management** on the **Keys and Endpoint** page of the Face resource. Your resource key isn't the same as your Azure subscription ID.


To set the environment variable for your key and endpoint, open a console window and complete the instructions that follow for your operating system and development environment.

- To set the `FACE_APIKEY` environment variable, replace `<your_key>` with one of the keys for your resource.
- To set the `FACE_ENDPOINT` environment variable, replace `<your_endpoint>` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/quickstarts-sdk/identity-client-library.md)

#### [Windows](#tab/windows)

```console
setx FACE_APIKEY <your_key>
```

```console
setx FACE_ENDPOINT <your_endpoint>
```

After you add the environment variables, you might need to restart any running programs that will read the environment variables, including the console window.

#### [Linux](#tab/linux)

```bash
export FACE_APIKEY=<your_key>
```

```bash
export FACE_ENDPOINT=<your_endpoint>
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

---


## Identify and verify faces

Create a new file in your `src` directory, `index.ts`, and paste in the following code. Replace the image paths and person group/person names as needed.

> **Note:**
> If you haven't received access to the Face service using the [intake form](https://aka.ms/facerecognition), some of these functions won't work.

```typescript
import { randomUUID } from "crypto";
import { AzureKeyCredential } from "@azure/core-auth";
import createFaceClient, {
  getLongRunningPoller,
  isUnexpected,
} from "@azure-rest/ai-vision-face";
import "dotenv/config";

/**
 * This sample demonstrates how to identify and verify faces using Azure Face API.
 *
 * @summary Face identification and verification.
 */

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const main = async () => {
  const endpoint = process.env["FACE_ENDPOINT"] ?? "<endpoint>";
  const apikey = process.env["FACE_APIKEY"] ?? "<apikey>";
  const credential = new AzureKeyCredential(apikey);
  const client = createFaceClient(endpoint, credential);

  const imageBaseUrl =
    "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/Face/images/";
  const largePersonGroupId = randomUUID();

  console.log("========IDENTIFY FACES========\n");

  // Create a dictionary for all your images, grouping similar ones under the same key.
  const personDictionary: Record<string, string[]> = {
    "Family1-Dad": ["Family1-Dad1.jpg", "Family1-Dad2.jpg"],
    "Family1-Mom": ["Family1-Mom1.jpg", "Family1-Mom2.jpg"],
    "Family1-Son": ["Family1-Son1.jpg", "Family1-Son2.jpg"],
  };

  // A group photo that includes some of the persons you seek to identify from your dictionary.
  const sourceImageFileName = "identification1.jpg";

  // Create a large person group.
  console.log(`Creating a person group with ID: ${largePersonGroupId}`);
  const createGroupResponse = await client
    .path("/largepersongroups/{largePersonGroupId}", largePersonGroupId)
    .put({
      body: {
        name: largePersonGroupId,
        recognitionModel: "recognition_04",
      },
    });
  if (isUnexpected(createGroupResponse)) {
    throw new Error(createGroupResponse.body.error.message);
  }

  // Add faces to person group.
  console.log("Adding faces to person group...");
  await Promise.all(
    Object.keys(personDictionary).map(async (name) => {
      console.log(`Create a persongroup person: ${name}`);
      const createPersonResponse = await client
        .path("/largepersongroups/{largePersonGroupId}/persons", largePersonGroupId)
        .post({
          body: { name },
        });
      if (isUnexpected(createPersonResponse)) {
        throw new Error(createPersonResponse.body.error.message);
      }
      const { personId } = createPersonResponse.body;

      await Promise.all(
        personDictionary[name].map(async (similarImage) => {
          // Check if the image is of sufficient quality for recognition.
          const detectResponse = await client.path("/detect").post({
            contentType: "application/json",
            queryParameters: {
              detectionModel: "detection_03",
              recognitionModel: "recognition_04",
              returnFaceId: false,
              returnFaceAttributes: ["qualityForRecognition"],
            },
            body: { url: `${imageBaseUrl}${similarImage}` },
          });
          if (isUnexpected(detectResponse)) {
            throw new Error(detectResponse.body.error.message);
          }

          const sufficientQuality = detectResponse.body.every(
            (face: any) => face.faceAttributes?.qualityForRecognition === "high"
          );
          if (!sufficientQuality || detectResponse.body.length !== 1) {
            return;
          }

          // Quality is sufficient, add to group.
          console.log(
            `Add face to the person group person: (${name}) from image: (${similarImage})`
          );
          const addFaceResponse = await client
            .path(
              "/largepersongroups/{largePersonGroupId}/persons/{personId}/persistedfaces",
              largePersonGroupId,
              personId
            )
            .post({
              queryParameters: { detectionModel: "detection_03" },
              body: { url: `${imageBaseUrl}${similarImage}` },
            });
          if (isUnexpected(addFaceResponse)) {
            throw new Error(addFaceResponse.body.error.message);
          }
        })
      );
    })
  );
  console.log("Done adding faces to person group.");

  // Train the large person group.
  console.log(`\nTraining person group: ${largePersonGroupId}`);
  const trainResponse = await client
    .path("/largepersongroups/{largePersonGroupId}/train", largePersonGroupId)
    .post();
  if (isUnexpected(trainResponse)) {
    throw new Error(trainResponse.body.error.message);
  }
  const poller = await getLongRunningPoller(client, trainResponse);
  await poller.pollUntilDone();
  console.log(`Training status: ${poller.getOperationState().status}`);
  if (poller.getOperationState().status !== "succeeded") {
    return;
  }

  console.log("Pausing for 60 seconds to avoid triggering rate limit on free account...");
  await sleep(60000);

  // Detect faces from source image url and only take those with sufficient quality for recognition.
  const detectSourceResponse = await client.path("/detect").post({
    contentType: "application/json",
    queryParameters: {
      detectionModel: "detection_03",
      recognitionModel: "recognition_04",
      returnFaceId: true,
      returnFaceAttributes: ["qualityForRecognition"],
    },
    body: { url: `${imageBaseUrl}${sourceImageFileName}` },
  });
  if (isUnexpected(detectSourceResponse)) {
    throw new Error(detectSourceResponse.body.error.message);
  }
  const faceIds = detectSourceResponse.body
    .filter((face: any) => face.faceAttributes?.qualityForRecognition !== "low")
    .map((face: any) => face.faceId);

  // Identify the faces in a large person group.
  const identifyResponse = await client.path("/identify").post({
    body: { faceIds, largePersonGroupId },
  });
  if (isUnexpected(identifyResponse)) {
    throw new Error(identifyResponse.body.error.message);
  }

  await Promise.all(
    identifyResponse.body.map(async (result: any) => {
      try {
        const candidate = result.candidates[0];
        if (!candidate) {
          console.log(`No persons identified for face with ID ${result.faceId}`);
          return;
        }
        const getPersonResponse = await client
          .path(
            "/largepersongroups/{largePersonGroupId}/persons/{personId}",
            largePersonGroupId,
            candidate.personId
          )
          .get();
        if (isUnexpected(getPersonResponse)) {
          throw new Error(getPersonResponse.body.error.message);
        }
        const person = getPersonResponse.body;
        console.log(
          `Person: ${person.name} is identified for face in: ${sourceImageFileName} with ID: ${result.faceId}. Confidence: ${candidate.confidence}`
        );

        // Verification:
        const verifyResponse = await client.path("/verify").post({
          body: {
            faceId: result.faceId,
            largePersonGroupId,
            personId: person.personId,
          },
        });
        if (isUnexpected(verifyResponse)) {
          throw new Error(verifyResponse.body.error.message);
        }
        console.log(
          `Verification result between face ${result.faceId} and person ${person.personId}: ${verifyResponse.body.isIdentical} with confidence: ${verifyResponse.body.confidence}`
        );
      } catch (error: any) {
        console.log(
          `No persons identified for face with ID ${result.faceId}: ${error.message}`
        );
      }
    })
  );
  console.log();

  // Delete large person group.
  console.log(`Deleting person group: ${largePersonGroupId}`);
  const deleteResponse = await client
    .path("/largepersongroups/{largePersonGroupId}", largePersonGroupId)
    .delete();
  if (isUnexpected(deleteResponse)) {
    throw new Error(deleteResponse.body.error.message);
  }
  console.log();

  console.log("Done.");
};

main().catch(console.error);
```

## Build and run the sample

1. Compile the TypeScript code:

   ```console
   npm run build
   ```

1. Run the compiled JavaScript:

   ```console
   npm run start
   ```

## Output

```console
========IDENTIFY FACES========

Creating a person group with ID: a230ac8b-09b2-4fa0-ae04-d76356d88d9f
Adding faces to person group...
Create a persongroup person: Family1-Dad
Create a persongroup person: Family1-Mom
Create a persongroup person: Family1-Son
Add face to the person group person: (Family1-Dad) from image: (Family1-Dad1.jpg)
Add face to the person group person: (Family1-Mom) from image: (Family1-Mom1.jpg)
Add face to the person group person: (Family1-Son) from image: (Family1-Son1.jpg)
Add face to the person group person: (Family1-Dad) from image: (Family1-Dad2.jpg)
Add face to the person group person: (Family1-Mom) from image: (Family1-Mom2.jpg)
Add face to the person group person: (Family1-Son) from image: (Family1-Son2.jpg)
Done adding faces to person group.

Training person group: a230ac8b-09b2-4fa0-ae04-d76356d88d9f
Training status: succeeded
Pausing for 60 seconds to avoid triggering rate limit on free account...
No persons identified for face with ID 56380623-8bf0-414a-b9d9-c2373386b7be
Person: Family1-Dad is identified for face in: identification1.jpg with ID: c45052eb-a910-4fd3-b1c3-f91ccccc316a. Confidence: 0.96807
Person: Family1-Son is identified for face in: identification1.jpg with ID: 8dce9b50-513f-4fe2-9e19-352acfd622b3. Confidence: 0.9281
Person: Family1-Mom is identified for face in: identification1.jpg with ID: 75868da3-66f6-4b5f-a172-0b619f4d74c1. Confidence: 0.96902
Verification result between face c45052eb-a910-4fd3-b1c3-f91ccccc316a and person 35a58d14-fd58-4146-9669-82ed664da357: true with confidence: 0.96807
Verification result between face 8dce9b50-513f-4fe2-9e19-352acfd622b3 and person 2d4d196c-5349-431c-bf0c-f1d7aaa180ba: true with confidence: 0.9281
Verification result between face 75868da3-66f6-4b5f-a172-0b619f4d74c1 and person 35d5de9e-5f92-4552-8907-0d0aac889c3e: true with confidence: 0.96902

Deleting person group: a230ac8b-09b2-4fa0-ae04-d76356d88d9f

Done.
```

## Clean up resources

If you want to clean up and remove a Foundry Tools subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it.

* [Azure portal](../../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../../multi-service-resource.md?pivots=azcli#clean-up-resources)

## Next steps

In this quickstart, you learned how to use the Face client library for TypeScript to do basic face identification. Next, learn about the different face detection models and how to specify the right model for your use case.

> 
> [Specify a face detection model version](../how-to/specify-detection-model.md)



**Applies to: programming-language-rest-api**



Get started with facial recognition using the Face REST API. The Face service provides you with access to advanced algorithms for detecting and recognizing human faces in images.

> **Note:**
> This quickstart uses cURL commands to call the REST API. You can also call the REST API using a programming language. Complex scenarios like face identification are easier to implement using a language SDK. See the GitHub samples for examples in [C#](https://github.com/Azure-Samples/cognitive-services-quickstart-code/tree/master/dotnet/Face/rest), [Python](https://github.com/Azure-Samples/cognitive-services-quickstart-code/tree/master/python/Face/rest), [Java](https://github.com/Azure-Samples/cognitive-services-quickstart-code/tree/master/java/Face/rest), [JavaScript](https://github.com/Azure-Samples/cognitive-services-quickstart-code/tree/master/javascript/Face/rest), and [Go](https://github.com/Azure-Samples/cognitive-services-quickstart-code/tree/master/go/Face/rest).

## Prerequisites

* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* Once you have your Azure subscription, <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesFace"  title="Create a Face resource"  target="_blank">create a Face resource </a> in the Azure portal to get your key and endpoint. After it deploys, select **Go to resource**.
    * You'll need the key and endpoint from the resource you create to connect your application to the Face API. You'll paste your key and endpoint into the code below later in the quickstart.
    * You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.
* [PowerShell version 6.0+](https://learn.microsoft.com/powershell/scripting/install/installing-powershell-core-on-windows), or a similar command-line application.
* [cURL](https://curl.se/) installed.



## Identify and verify faces

> **Note:**
> If you haven't received access to the Face service using the [intake form](https://aka.ms/facerecognition), some of these functions won't work.

1. First, call the Detect API on the source face. This is the face that we'll try to identify from the larger group. Copy the following command to a text editor, insert your own key and endpoint, and then copy it into a shell window and run it.

    #### [Windows](#tab/windows)

    [Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/face/detect.ps1](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/quickstarts-sdk/identity-client-library.md)

    #### [Linux](#tab/linux)

    [Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/face/detect.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/quickstarts-sdk/identity-client-library.md)

    ---

    Save the returned face ID string to a temporary location. You'll use it again at the end.

1. Next you'll need to create a **LargePersonGroup** and give it an arbitrary ID that matches regex pattern `^[a-z0-9-_]+$`. This object will store the aggregated face data of several persons. Run the following command, inserting your own key. Optionally, change the group's name and metadata in the request body.

    #### [Windows](#tab/windows)

    [Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/face/detect.ps1](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/quickstarts-sdk/identity-client-library.md)

    #### [Linux](#tab/linux)

    [Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/face/detect.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/quickstarts-sdk/identity-client-library.md)

    ---

    Save the specified ID of the created group to a temporary location.

1. Next, you'll create **Person** objects that belong to the group. Run the following command, inserting your own key and the ID of the **LargePersonGroup** from the previous step. This command creates a **Person** named "Family1-Dad".

    #### [Windows](#tab/windows)

    [Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/face/detect.ps1](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/quickstarts-sdk/identity-client-library.md)

    #### [Linux](#tab/linux)

    [Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/face/detect.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/quickstarts-sdk/identity-client-library.md)

    ---

    After you run this command, run it again with different input data to create more **Person** objects: "Family1-Mom", "Family1-Son", "Family1-Daughter", "Family2-Lady", and "Family2-Man".

    Save the IDs of each **Person** created; it's important to keep track of which person name has which ID.

1. Next you'll need to detect new faces and associate them with the **Person** objects that exist. The following command detects a face from the image *Family1-Dad1.jpg* and adds it to the corresponding person. You need to specify the `personId` as the ID that was returned when you created the "Family1-Dad" **Person** object. The image name corresponds to the name of the created **Person**. Also enter the **LargePersonGroup** ID and your key in the appropriate fields.

    #### [Windows](#tab/windows)

    [Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/face/detect.ps1](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/quickstarts-sdk/identity-client-library.md)

    #### [Linux](#tab/linux)

    [Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/face/detect.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/quickstarts-sdk/identity-client-library.md)

    ---

    Then, run the above command again with a different source image and target **Person**. The images available are: *Family1-Dad1.jpg*, *Family1-Dad2.jpg* *Family1-Mom1.jpg*, *Family1-Mom2.jpg*, *Family1-Son1.jpg*, *Family1-Son2.jpg*, *Family1-Daughter1.jpg*, *Family1-Daughter2.jpg*, *Family2-Lady1.jpg*, *Family2-Lady2.jpg*, *Family2-Man1.jpg*, and *Family2-Man2.jpg*. Be sure that the **Person** whose ID you specify in the API call matches the name of the image file in the request body.

    At the end of this step, you should have multiple **Person** objects that each have one or more corresponding faces, detected directly from the provided images.

1. Next, train the **LargePersonGroup** with the current face data. The training operation teaches the model how to associate facial features, sometimes aggregated from multiple source images, to each single person. Insert the **LargePersonGroup** ID and your key before running the command.

    #### [Windows](#tab/windows)

    [Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/face/detect.ps1](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/quickstarts-sdk/identity-client-library.md)

    #### [Linux](#tab/linux)

    [Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/face/detect.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/quickstarts-sdk/identity-client-library.md)

    ---
 
1. Check whether the training status is succeeded. If not, wait for a while and query again.

    #### [Windows](#tab/windows)

    [Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/face/detect.ps1](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/quickstarts-sdk/identity-client-library.md)

    #### [Linux](#tab/linux)

    [Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/face/detect.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/quickstarts-sdk/identity-client-library.md)

    ---

1. Now you're ready to call the Identify API, using the source face ID from the first step and the **LargePersonGroup** ID. Insert these values into the appropriate fields in the request body, and insert your key.

    #### [Windows](#tab/windows)

    [Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/face/detect.ps1](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/quickstarts-sdk/identity-client-library.md)

    #### [Linux](#tab/linux)

    [Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/face/detect.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/quickstarts-sdk/identity-client-library.md)

    ---

    The response should give you a **Person** ID indicating the person identified with the source face. It should be the ID that corresponds to the "Family1-Dad" person, because the source face is of that person.

1. To do face verification, you'll use the **Person** ID returned in the previous step, the **LargePersonGroup** ID, and also the source face ID. Insert these values into the fields in the request body, and insert your key.

    #### [Windows](#tab/windows)

    [Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/face/detect.ps1](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/quickstarts-sdk/identity-client-library.md)

    #### [Linux](#tab/linux)

    [Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/face/detect.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/quickstarts-sdk/identity-client-library.md)

    ---

    The response should give you a boolean verification result along with a confidence value.



## Clean up resources

To delete the **LargePersonGroup** you created in this exercise, run the [LargePersonGroup - Delete](https://learn.microsoft.com/rest/api/face/person-group-operations/delete-large-person-group) call.

#### [Windows](#tab/windows)

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/face/detect.ps1](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/quickstarts-sdk/identity-client-library.md)

#### [Linux](#tab/linux)

[Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/curl/face/detect.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/quickstarts-sdk/identity-client-library.md)

---

If you want to clean up and remove a Foundry Tools subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it.

* [Azure portal](../../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../../multi-service-resource.md?pivots=azcli#clean-up-resources)

## Next steps

In this quickstart, you learned how to use the Face REST API to do basic facial recognition tasks. Next, learn about the different face detection models and how to specify the right model for your use case.

> 
> [Specify a face detection model version](../how-to/specify-detection-model.md)

* [What is the Face service?](../overview-identity.md)
