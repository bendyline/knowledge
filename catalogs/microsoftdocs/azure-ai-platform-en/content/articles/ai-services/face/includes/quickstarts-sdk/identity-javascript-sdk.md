---
title: "Face JavaScript client library quickstart"
description: Use the Face client library for JavaScript to detect and identify faces (facial recognition search).
author: PatrickFarley
manager: mcleans
ms.service: azure-vision-foundry-tools
ms.subservice: azure-ai-face
ms.topic: include
ms.date: 05/03/2022
ms.author: pafarley
---

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

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/includes/quickstarts-sdk/identity-javascript-sdk.md)

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

    [Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/javascript/Face/Quickstart.js](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/face/includes/quickstarts-sdk/identity-javascript-sdk.md)

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

* [Azure portal](../../../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../../../multi-service-resource.md?pivots=azcli#clean-up-resources)

## Next steps

In this quickstart, you learned how to use the Face client library for JavaScript to do basic face identification. Next, learn about the different face detection models and how to specify the right model for your use case.

> 
> [Specify a face detection model version](../../how-to/specify-detection-model.md)

* [What is the Face service?](../../overview-identity.md)
* More extensive sample code can be found on [GitHub](https://aka.ms/FaceSamples).
