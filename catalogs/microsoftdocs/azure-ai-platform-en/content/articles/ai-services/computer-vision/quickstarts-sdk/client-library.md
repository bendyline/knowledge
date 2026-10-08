---
title: "Quickstart: Optical character recognition (OCR)"
titleSuffix: Foundry Tools
description: Learn how to use Optical character recognition (OCR) in your application through a native client library in the language of your choice.
author: PatrickFarley
manager: mcleans
ms.service: azure-vision-foundry-tools
ms.topic: quickstart
ms.date: 11/21/2025
ms.author: pafarley
ms.devlang: csharp
# ms.devlang: csharp, golang, java, javascript, python
ms.custom: devx-track-python, devx-track-js, devx-track-csharp, mode-api, devx-track-dotnet, devx-track-extended-java
zone_pivot_groups: programming-languages-ocr
keywords: Azure Vision in Foundry Tools, Azure Vision in Foundry Tools
---

# Quickstart: Azure Vision v3.2 GA Read


## OCR (Read) editions

> **Important:**
> Select the Read edition that best fits your requirements.
>
> | Input | Examples | Read edition | Benefit |
> | --- | --- | --- | --- |
> | **Images**: General, in-the-wild images | labels, street signs, and posters | [OCR for images (version 4.0)](../concept-ocr.md) | Optimized for general, non-document images with a performance-enhanced synchronous API that makes it easier to embed OCR in your user experience scenarios. |
> | **Documents**: Digital and scanned, including images | books, articles, and reports | [Document Intelligence read model](../../document-intelligence/prebuilt/read.md) | Optimized for text-heavy scanned and digital documents with an asynchronous API to help automate intelligent document processing at scale. |
>
> **About Azure Vision v3.2 GA Read**
>
> Looking for the most recent Azure Vision v3.2 GA Read? All future Read OCR enhancements are part of the two services listed previously. There are no further updates to Azure Vision v3.2. For more information, see [Call Azure Vision 3.2 GA Read API](../how-to/call-read-api.md) and [Quickstart: Azure Vision v3.2 GA Read](client-library.md).


Get started with Azure Vision in Foundry Tools Read REST API or client libraries. The Read API provides you with AI algorithms for extracting text from images and returning it as structured strings. Follow these steps to install a package to your application and try out the sample code for basic tasks.

**Applies to: programming-language-csharp**


 
<a name="HOLTop"></a>

Use the optical character recognition (OCR) client library to read printed and handwritten text from an image. The OCR service can read visible text in an image and convert it to a character stream. For more information on text recognition, see the [OCR overview](../overview-ocr.md). The code in this section uses the latest [Azure Vision in Foundry Tools](https://www.nuget.org/packages/Microsoft.Azure.CognitiveServices.Vision.ComputerVision/) package.

> **Tip:**
> You can also extract text from a local image. See the [ComputerVisionClient](https://learn.microsoft.com/azure/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library) methods, such as **ReadInStreamAsync**. Or, see the sample code on [GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/dotnet/ComputerVision/ComputerVisionQuickstart.cs#162) for scenarios involving local images.

[Reference documentation](https://learn.microsoft.com/dotnet/api/overview/azure/computer-vision) | [Library source code](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/cognitiveservices) | [Package (NuGet)](https://www.nuget.org/packages/Microsoft.Azure.CognitiveServices.Vision.ComputerVision/) | [Samples](https://learn.microsoft.com/samples/browse/?products=azure\&terms=computer-vision)

## Prerequisites

- An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The [Visual Studio IDE](https://visualstudio.microsoft.com/vs/) or current version of [.NET Core](https://dotnet.microsoft.com/download/dotnet-core).
- <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesComputerVision" title="create a Vision resource" target="_blank">An Azure Vision resource</a>. You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.
- The key and endpoint from the resource you create to connect your application to Azure Vision.
  1. After your Azure Vision resource deploys, select **Go to resource**.
  1. In the left pane, select **Keys and Endpoint**.
  1. Copy one of the keys and the **Endpoint** for use later in the quickstart.


## Create environment variables 

In this example, write your credentials to environment variables on the local machine that runs the application.


Go to the Azure portal. If the resource you created in the **Prerequisites** section deployed successfully, select **Go to resource** under **Next steps**. You can find your key and endpoint under **Resource Management** on the **Keys and Endpoint** page of the Face resource. Your resource key isn't the same as your Azure subscription ID.


To set the environment variable for your key and endpoint, open a console window and follow the instructions for your operating system and development environment.

- To set the `VISION_KEY` environment variable, replace `<your_key>` with one of the keys for your resource.
- To set the `VISION_ENDPOINT` environment variable, replace `<your_endpoint>` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/quickstarts-sdk/client-library.md)

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


## Read printed and handwritten text

1. Create a new C# application.

    #### [Visual Studio IDE](#tab/visual-studio)

    Using Visual Studio, create a **Console App (.NET Framework)** project for **C#, Windows, Console**.

    After you create a new project, install the client library:

    1. Right-click on the project solution in the **Solution Explorer** and select **Manage NuGet Packages for Solution**.
    1. In the package manager that opens, select **Browse**. Select **Include prerelease**.
    1. Search for and select `Microsoft.Azure.CognitiveServices.Vision.ComputerVision`.
    1. In the details dialog box, select your project and select the latest stable version. Then select **Install**.

    #### [CLI](#tab/cli)

    1. In a console window, use the `dotnet new` command to create a new console app with the name `computer-vision-quickstart`.

       ```console
       dotnet new console -n computer-vision-quickstart
       ```

       This command creates a simple Hello World C# project with a single source file: *Program.cs*.

    1. Change directory to the newly created app folder, and then build the application:

       ```console
       dotnet build
       ```

       The build output should contain no warnings or errors.

       ```output
       ...
       Build succeeded.
        0 Warning(s)
        0 Error(s)
       ...
       ```

    1. In the application directory, install Azure Vision client library for .NET by using the following command:

       ```console
       dotnet add package Microsoft.Azure.CognitiveServices.Vision.ComputerVision --version 7.0.0
       ```

    ---

1. From the project directory, open the *Program.cs* file in your preferred editor or IDE. Replace the contents of *Program.cs* with the following code.

   [Code reference unavailable in this source snapshot: ../includes/quickstarts-sdk/~/cognitive-services-quickstart-code/dotnet/ComputerVision/ComputerVisionQuickstart-single.cs?name=snippet_single](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/quickstarts-sdk/client-library.md)

1. As an optional step, see [Determine how to process the data](../how-to/call-read-api.md#determine-how-to-process-the-data-optional). For example, to explicitly specify the latest GA model, edit the `ReadAsync` call as shown. Skip the parameter or use `"latest"` to use the most recent GA model.

   ```csharp
     // Read text from URL with a specific model version
     var textHeaders = await client.ReadAsync(urlFile,null,null,"2022-04-30");
   ```

1. Run the application.

   #### [Visual Studio IDE](#tab/visual-studio)

   - From the **Debug** menu, select **Start Debugging**.

   #### [CLI](#tab/cli)

   - Use the `dotnet run` command in your project directory.

     ```dotnet
     dotnet run
     ```

   ---

## Output

```output
Azure Vision - .NET quickstart example

----------------------------------------------------------
READ FILE FROM URL

Extracting text from URL file printed_text.jpg...


Nutrition Facts Amount Per Serving
Serving size: 1 bar (40g)
Serving Per Package: 4
Total Fat 13g
Saturated Fat 1.5g
Amount Per Serving
Trans Fat 0g
Calories 190
Cholesterol 0mg
Calories from Fat 110
Sodium 20mg
nt Daily Values are based on Vitamin A 50%
calorie diet.
```

## Clean up resources

If you want to clean up and remove a Foundry Tools subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it.

- [Clean up resources with the Azure portal](../../multi-service-resource.md?pivots=azportal#clean-up-resources)
- [Clean up resources with Azure CLI](../../multi-service-resource.md?pivots=azcli#clean-up-resources)

## Next steps

In this quickstart, you learned how to install the OCR client library and use the Read API. Next, learn more about the Read API features.

> 
>[Call the Read API](../how-to/call-read-api.md)

- [OCR overview](../overview-ocr.md)
- The source code for this sample can be found on [GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/dotnet/ComputerVision/ComputerVisionQuickstart.cs).




**Applies to: programming-language-python**



<a name="HOLTop"></a>

Use the optical character recognition (OCR) client library to read printed and handwritten text from a remote image. The OCR service can read visible text in an image and convert it to a character stream. For more information on text recognition, see the [OCR overview](../overview-ocr.md).

> **Tip:**
> You can also read text from a local image. See the [ComputerVisionClientOperationsMixin](https://learn.microsoft.com/python/api/azure-cognitiveservices-vision-computervision/azure.cognitiveservices.vision.computervision.operations.computervisionclientoperationsmixin) methods, such as **read_in_stream**. Or, see the sample code on [GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/python/ComputerVision/ComputerVisionQuickstart.py) for scenarios involving local images.

[Reference documentation](https://learn.microsoft.com/python/api/azure-cognitiveservices-vision-computervision/azure.cognitiveservices.vision.computervision) | [Library source code](https://github.com/Azure/azure-sdk-for-python/tree/master/sdk/cognitiveservices/azure-cognitiveservices-vision-computervision) | [Package (PiPy)](https://pypi.org/project/azure-cognitiveservices-vision-computervision/) | [Samples](https://learn.microsoft.com/samples/browse/?products=azure\&terms=computer-vision)

## Prerequisites

- An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Python 3.x](https://www.python.org/).
- Your Python installation should include [pip](https://pip.pypa.io/en/stable/). You can check whether you have pip installed, run `pip --version` on the command line. Get pip by installing the latest version of Python.
- <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesComputerVision" title="create a Vision resource" target="_blank">An Azure Vision in Foundry Tools resource</a>. You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.
- The key and endpoint from the resource you create to connect your application to Azure Vision.
  1. After your Azure Vision resource deploys, select **Go to resource**.
  1. In the left pane, select **Keys and Endpoint**.
  1. Copy one of the keys and the **Endpoint** for use later in the quickstart.


## Create environment variables 

In this example, write your credentials to environment variables on the local machine that runs the application.


Go to the Azure portal. If the resource you created in the **Prerequisites** section deployed successfully, select **Go to resource** under **Next steps**. You can find your key and endpoint under **Resource Management** on the **Keys and Endpoint** page of the Face resource. Your resource key isn't the same as your Azure subscription ID.


To set the environment variable for your key and endpoint, open a console window and follow the instructions for your operating system and development environment.

- To set the `VISION_KEY` environment variable, replace `<your_key>` with one of the keys for your resource.
- To set the `VISION_ENDPOINT` environment variable, replace `<your_endpoint>` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/quickstarts-sdk/client-library.md)

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


## Read printed and handwritten text

1. Install the client library.

   In a console window, run the following command:

   ```console
   pip install --upgrade azure-cognitiveservices-vision-computervision
   ```

1. Install the Pillow library.

   ```console
   pip install pillow
   ```

1. Create a new Python application file, *quickstart-file.py*. Then open it in your preferred editor or IDE.

1. Replace the contents of *quickstart-file.py* with the following code.

   [Code reference unavailable in this source snapshot: ../includes/quickstarts-sdk/~/cognitive-services-quickstart-code/python/ComputerVision/ComputerVisionQuickstart-single.py?name=snippet_single](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/quickstarts-sdk/client-library.md)

1. As an optional step, see [Determine how to process the data](../how-to/call-read-api.md#determine-how-to-process-the-data-optional). For example, to explicitly specify the latest GA model, edit the `read` statement as shown. Skipping the parameter or using `"latest"` automatically uses the most recent GA model.

   ```python
      # Call API with URL and raw response (allows you to get the operation location)
      read_response = computervision_client.read(read_image_url,  raw=True, model_version="2022-04-30")
   ```

1. Run the application with the `python` command on your quickstart file.

   ```console
   python quickstart-file.py
   ```

## Output

```output
===== Read File - remote =====
The quick brown fox jumps
[38.0, 650.0, 2572.0, 699.0, 2570.0, 854.0, 37.0, 815.0]
Over
[184.0, 1053.0, 508.0, 1044.0, 510.0, 1123.0, 184.0, 1128.0]
the lazy dog!
[639.0, 1011.0, 1976.0, 1026.0, 1974.0, 1158.0, 637.0, 1141.0]

End of Azure Vision quickstart.
```

## Clean up resources

If you want to clean up and remove a Foundry Tools subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it.

- [Clean up resources with the Azure portal](../../multi-service-resource.md?pivots=azportal#clean-up-resources)
- [Clean up resources with Azure CLI](../../multi-service-resource.md?pivots=azcli#clean-up-resources)

## Next steps

In this quickstart, you learned how to install the OCR client library and use the Read API. Next, learn more about the Read API features.

> 
>[Call the Read API](../how-to/call-read-api.md)

- [OCR overview](../overview-ocr.md)
- The source code for this sample can be found on [GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/python/ComputerVision/ComputerVisionQuickstart.py).




**Applies to: programming-language-javascript**



<a name="HOLTop"></a>

Use the optical character recognition (OCR) client library to read printed and handwritten text with the Read API. The OCR service can read visible text in an image and convert it to a character stream. For more information on text recognition, see the [OCR overview](../overview-ocr.md).

> **Tip:**
> You can also read text from a local image. See the [ComputerVisionClient](https://learn.microsoft.com/javascript/api/@azure/cognitiveservices-computervision/computervisionclient) methods, such as **readInStream**. Or, see the sample code on [GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/javascript/ComputerVision/ComputerVisionQuickstart.js) for scenarios involving local images.

[Reference documentation](https://learn.microsoft.com/javascript/api/@azure/cognitiveservices-computervision/) | [Package (npm)](https://www.npmjs.com/package/@azure/cognitiveservices-computervision) | [Samples](https://learn.microsoft.com/samples/browse/?products=azure\&terms=computer-vision)

## Prerequisites

- An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The current version of [Node.js](https://nodejs.org/).
- <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesComputerVision" title="create a Vision resource" target="_blank">An Azure Vision in Foundry Tools resource</a>. You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.
- The key and endpoint from the resource you create to connect your application to Azure Vision.
  1. After your Azure Vision resource deploys, select **Go to resource**.
  1. In the left pane, select **Keys and Endpoint**.
  1. Copy one of the keys and the **Endpoint** for use later in the quickstart.


## Create environment variables 

In this example, write your credentials to environment variables on the local machine that runs the application.


Go to the Azure portal. If the resource you created in the **Prerequisites** section deployed successfully, select **Go to resource** under **Next steps**. You can find your key and endpoint under **Resource Management** on the **Keys and Endpoint** page of the Face resource. Your resource key isn't the same as your Azure subscription ID.


To set the environment variable for your key and endpoint, open a console window and follow the instructions for your operating system and development environment.

- To set the `VISION_KEY` environment variable, replace `<your_key>` with one of the keys for your resource.
- To set the `VISION_ENDPOINT` environment variable, replace `<your_endpoint>` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/quickstarts-sdk/client-library.md)

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


## Read printed and handwritten text

Create a new Node.js application.

1. In a console window, create a new directory for your app, and navigate to it.

   ```console
   mkdir myapp
   cd myapp
   ```

1. Run the `npm init` command to create a node application with a `package.json` file. Select **Enter** for any prompts.

   ```console
   npm init
   ```

1. To install the client library, install the `ms-rest-azure` and `@azure/cognitiveservices-computervision` npm package:

   ```console
   npm install ms-rest-azure
   npm install @azure/cognitiveservices-computervision
   ```

1. Install the async module:

   ```console
   npm install async
   ```

   Your app's `package.json` file is updated with the dependencies.

1. Create a new file, *index.js*, and open it in a text editor.

1. Paste the following code into your *index.js* file.

   [Code reference unavailable in this source snapshot: ../includes/quickstarts-sdk/~/cognitive-services-quickstart-code/javascript/ComputerVision/ComputerVisionQuickstart-single.js?name=snippet_single](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/quickstarts-sdk/client-library.md)

1. As an optional step, see [Determine how to process the data](../how-to/call-read-api.md#determine-how-to-process-the-data-optional). For example, to explicitly specify the latest GA model, edit the `read` statement as shown. Skipping the parameter or using `"latest"` automatically uses the most recent GA model.

   ```js
     let result = await client.read(url,{modelVersion:"2022-04-30"});
   ```

1. Run the application with the `node` command on your quickstart file.

   ```console
   node index.js
   ```

## Output

```output
-------------------------------------------------
READ PRINTED, HANDWRITTEN TEXT AND PDF

Read printed text from URL... printed_text.jpg
Recognized text:
Nutrition Facts Amount Per Serving
Serving size: 1 bar (40g)
Serving Per Package: 4
Total Fat 13g
Saturated Fat 1.5g
Amount Per Serving
Trans Fat 0g
Calories 190
Cholesterol 0mg
ories from Fat 110
Sodium 20mg
nt Daily Values are based on Vitamin A 50%
calorie diet.

-------------------------------------------------
End of quickstart.
```

## Clean up resources

If you want to clean up and remove a Foundry Tools subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it.

- [Clean up resources with the Azure portal](../../multi-service-resource.md?pivots=azportal#clean-up-resources)
- [Clean up resources with Azure CLI](../../multi-service-resource.md?pivots=azcli#clean-up-resources)

## Next steps

In this quickstart, you learned how to install the OCR client library and use the Read API. Next, learn more about the Read API features.

> 
>[Call the Read API](../how-to/call-read-api.md)

- [OCR overview](../overview-ocr.md)
- The source code for this sample can be found on [GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/javascript/ComputerVision/ComputerVisionQuickstart.js).




**Applies to: programming-language-rest-api**



Use the optical character recognition (OCR) REST API to read printed and handwritten text.

> **Note:**
> This quickstart uses cURL commands to call the REST API. You can also call the REST API using a programming language. See the GitHub samples for examples in [C#](https://github.com/Azure-Samples/cognitive-services-quickstart-code/tree/master/dotnet/ComputerVision/REST), [Python](https://github.com/Azure-Samples/cognitive-services-quickstart-code/tree/master/python/ComputerVision/REST), [Java](https://github.com/Azure-Samples/cognitive-services-quickstart-code/tree/master/java/ComputerVision/REST), and [JavaScript](https://github.com/Azure-Samples/cognitive-services-quickstart-code/tree/master/javascript/ComputerVision/REST).

## Prerequisites

- An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [cURL](https://curl.haxx.se/) installed.
- <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesComputerVision" title="create a Vision resource" target="_blank">An Azure Vision in Foundry Tools resource</a>. You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.
- The key and endpoint from the resource you create to connect your application to Azure Vision.
  1. After your Azure Vision resource deploys, select **Go to resource**.
  1. In the left pane, select **Keys and Endpoint**.
  1. Copy one of the keys and the **Endpoint** for use later in the quickstart.

## Read printed and handwritten text

The optical character recognition (OCR) service can extract visible text in an image or document and convert it to a character stream. For more information on text extraction, see the [OCR overview](../overview-ocr.md).

### Call the Read API

To create and run the sample, do the following steps:

1. Copy the following command into a text editor.
1. Make the following changes in the command where needed:

   1. Replace the value of `<key>` with your key.
   1. Replace the first part of the request URL (`https://westcentralus.api.cognitive.microsoft.com/`) with the text in your own endpoint URL.
        
> **Note:**
> New resources created after July 1, 2019, will use custom subdomain names. For more information and a complete list of regional endpoints, see [Custom subdomain names for Foundry Tools](https://learn.microsoft.com/azure/cognitive-services/cognitive-services-custom-subdomains).

    1. Optionally, change the image URL in the request body (`https://learn.microsoft.com/azure/ai-services/computer-vision/media/quickstarts/presentation.png`) to the URL of a different image to be analyzed.
1. Open a command prompt window.
1. Paste the command from the text editor into the command prompt window, and then run the command.

```bash
curl -v -X POST "https://westcentralus.api.cognitive.microsoft.com/vision/v3.2/read/analyze" -H "Content-Type: application/json" -H "Ocp-Apim-Subscription-Key: <subscription key>" --data-ascii "{'url':'https://learn.microsoft.com/azure/ai-services/computer-vision/media/quickstarts/presentation.png'}"
```

The response includes an `Operation-Location` header, whose value is a unique URL. You use this URL to query the results of the Read operation. The URL expires in 48 hours.

### Optionally, specify the model version

As an optional step, see [Determine how to process the data](../how-to/call-read-api.md#determine-how-to-process-the-data-optional). For example, to explicitly specify the latest GA model, use `model-version=2022-04-30` as the parameter. Skipping the parameter or using `model-version=latest` automatically uses the most recent GA model.

```bash
curl -v -X POST "https://westcentralus.api.cognitive.microsoft.com/vision/v3.2/read/analyze?model-version=2022-04-30" -H "Content-Type: application/json" -H "Ocp-Apim-Subscription-Key: <subscription key>" --data-ascii "{'url':'https://learn.microsoft.com/azure/ai-services/computer-vision/media/quickstarts/presentation.png'}"
```

### Get Read results

1. Copy the following command into your text editor.
1. Replace the URL with the `Operation-Location` value you copied in the previous procedure.
1. Replace the value of `<key>` with your key.
1. Open a console window.
1. Paste the command from the text editor into the console window, and then run the command.

   ```bash
   curl -v -X GET "https://westcentralus.api.cognitive.microsoft.com/vision/v3.2/read/analyzeResults/{operationId}" -H "Ocp-Apim-Subscription-Key: {key}" --data-ascii "{body}" 
   ```

### Examine the response

A successful response is returned in JSON. The sample application parses and displays a successful response in the console window, similar to the following example:

```json
{
  "status": "succeeded",
  "createdDateTime": "2021-04-08T21:56:17.6819115+00:00",
  "lastUpdatedDateTime": "2021-04-08T21:56:18.4161316+00:00",
  "analyzeResult": {
    "version": "3.2",
    "readResults": [
      {
        "page": 1,
        "angle": 0,
        "width": 338,
        "height": 479,
        "unit": "pixel",
        "lines": [
          {
            "boundingBox": [
              25,
              14,
              318,
              14,
              318,
              59,
              25,
              59
            ],
            "text": "NOTHING",
            "appearance": {
              "style": {
                "name": "other",
                "confidence": 0.971
              }
            },
            "words": [
              {
                "boundingBox": [
                  27,
                  15,
                  294,
                  15,
                  294,
                  60,
                  27,
                  60
                ],
                "text": "NOTHING",
                "confidence": 0.994
              }
            ]
          }
        ]
      }
    ]
  }
}

```

## Clean up resources

If you want to clean up and remove a Foundry Tools subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it.

- [Clean up resources with the Azure portal](../../multi-service-resource.md?pivots=azportal#clean-up-resources)
- [Clean up resources with Azure CLI](../../multi-service-resource.md?pivots=azcli#clean-up-resources)

## Next steps

In this quickstart, you learned how to call the Read REST API. Next, learn more about the Read API features.

> 
>[Call the Read API](../how-to/call-read-api.md)

* [OCR overview](../overview-ocr.md)
