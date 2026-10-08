---
title: "Quickstart: Image Analysis client library for Node.js"
description: Get started with the Image Analysis client library for Node.js with this quickstart
author: PatrickFarley
manager: mcleans
ms.service: azure-vision-foundry-tools
ms.topic: include
ms.date: 09/30/2024
ms.author: pafarley
ms.custom: devx-track-js
---

<a name="HOLTop"></a>

Use the Image Analysis client library for JavaScript to analyze a remote image for content tags.

> **Tip:**
> You can also analyze a local image. See the [ComputerVisionClient](https://learn.microsoft.com/javascript/api/@azure/cognitiveservices-computervision/computervisionclient) methods, such as `describeImageInStream`. Or, see the [sample code on GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/javascript/ComputerVision/ImageAnalysisQuickstart.js) for scenarios involving local images.

> **Tip:**
> The Analyze Image API can do many different operations other than generate image tags. See the [Image Analysis how-to guide](../../how-to/call-analyze-image.md) for examples that showcase all of the available features.

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

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/includes/quickstarts-sdk/image-analysis-node-sdk.md)

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

   [Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/javascript/ComputerVision/ImageAnalysisQuickstart-single.js?name=snippet_single](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/includes/quickstarts-sdk/image-analysis-node-sdk.md)


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

* [Azure portal](../../../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../../../multi-service-resource.md?pivots=azcli#clean-up-resources)

## Next step

In this quickstart, you learned how to install the Image Analysis client library and make basic image analysis calls. Next, learn more about the Analyze Image API features.

> 
>[Call the Analyze Image API](../../how-to/call-analyze-image.md)

* [What is Image Analysis?](../../overview-image-analysis.md)
* [Source code for this sample on GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/javascript/ComputerVision/ImageAnalysisQuickstart.js)
