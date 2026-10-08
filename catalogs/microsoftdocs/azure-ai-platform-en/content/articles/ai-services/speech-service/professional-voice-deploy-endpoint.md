---
title: Deploy your professional voice model as an endpoint - Speech service
titleSuffix: Foundry Tools
description: Learn about how to deploy your professional voice model as an endpoint. 
author: PatrickFarley
manager: mcleans
ms.service: azure-speech-foundry-tools
ms.topic: how-to
ms.date: 12/29/2025
ms.author: pafarley
zone_pivot_groups: foundry-speech-studio-rest
#Customer intent: As a developer, I want to learn how to deploy my professional voice model as an endpoint.
---

# Deploy your professional voice model as an endpoint

**Applies to: ai-foundry-portal**


After you successfully [train your professional voice model](professional-voice-train-voice.md), deploy it to a custom voice endpoint.

> **Note:**
> You can create up to 50 endpoints with a standard (S0) Speech resource, each with its own custom voice.

To synthesize speech with your deployed voice, use the Speech SDK or send requests to the custom endpoint through the REST API. Authenticate with the resource that hosts the deployment.

## Add a deployment endpoint

To deploy an endpoint, follow these steps:

# [Foundry (new)](#tab/foundry-new)

1. 
Sign in to 
[Microsoft Foundry](https://ai.azure.com/?cid=learnDocs)
. Make sure the **New Foundry** toggle is on. These steps refer to **Foundry (new)**.



1. Select **Build** from the upper-right menu.
1. Select **Services** in the left pane.
1. Select the **Customizations** tab, and then select the name of the trained model you want to deploy.
1. On the model details page, select **Deploy**. The **Deployments** tab opens with the **Deploy voice model** pane.
1. On the **Deploy voice model** pane, fill in these settings:

   - **Deployment name**: Enter a name for the deployment.
   - **Description**: Optionally, enter a description for the deployment.
   - **Endpoint type**: Select **High performance** or **Fast resume** according to your scenario. If your resource is in a supported region, the default setting is **High performance**. Otherwise, the only available option is **Fast resume**.
     - **High performance**: Optimized for scenarios with real-time and high-volume synthesis requests, such as conversational AI or call-center bots. It takes around 5 minutes to deploy or resume an endpoint. Check the **Custom voice high-performance endpoint** column and footnotes in the [Text to speech regions table](regions.md?tabs=tts#regions).
     - **Fast resume**: Optimized for audio content creation scenarios with less frequent synthesis requests. Easy and quick to deploy or resume an endpoint in under a minute. The fast resume endpoint type is supported in all [regions](regions.md?tabs=tts#regions) where text to speech is available.
   - Select the checkbox to accept the **Terms of use**.
   - Select the checkbox to acknowledge the **Model hosting cost**.

1. Select **Deploy** to create your endpoint.

After your endpoint is deployed, it appears on the **Deployments** tab of the model details page. Select the deployment name to display endpoint details such as the endpoint key, endpoint URL, and sample code. When the status is **Succeeded**, the endpoint is ready for use.

### Edit or delete an endpoint

To change a deployment's name or description:

1. On the model details page, select the **Deployments** tab.
1. Select the deployment, and then select **Edit**.
1. Change the **Deployment name** or **Description**, and then select **Done**.

To permanently delete a deployment:

1. On the model details page, select the **Deployments** tab.
1. Select the deployment, and then select **Delete**.
1. In the **Delete deployment** dialog, select **Delete**.

> **Important:**
> You can't undo the deletion of a deployment.

### Troubleshoot deployment and synthesis

Use these checks before testing the deployed voice:

- If deployment fails, review the reported error and confirm that the selected endpoint type is supported in your [region](regions.md?tabs=tts#regions). If the error persists, [contact support](https://learn.microsoft.com/azure/ai-services/cognitive-services-support-options).
- If the deployment is **Suspended**, [resume it](#resume-endpoint) and wait for **Succeeded** before opening the playground or sending synthesis requests.
- If SDK authentication fails, check that your credential and region belong to the resource hosting the deployment. Use that deployment's `EndpointId` and **Voice name**, as described in [Use your custom voice](#use-your-custom-voice).

# [Foundry (classic)](#tab/foundry-classic)

1. Sign in to the [Microsoft Foundry (classic) portal](https://ai.azure.com/?cid=learnDocs).
1. Select **Fine-tuning** from the left pane and then select **AI Service fine-tuning**.
1. Select the professional voice fine-tuning task (by model name) that you [started as described in the create professional voice article](https://learn.microsoft.com/azure/ai-services/speech-service/professional-voice-create-project).
1. Select **Deploy model** > **Deploy model**. 
1. Select a voice model that you want to associate with this endpoint and then select **Next**.  
1. Enter an **Endpoint name** and **Description** for your custom endpoint.
1. Select **Endpoint type** according to your scenario. If your resource is in a supported region, the default setting for the endpoint type is *High performance*. Otherwise, if the resource is in an unsupported region, the only available option is *Fast resume*.
   - **High performance**: Optimized for scenarios with real-time and high-volume synthesis requests, such as conversational AI, call-center bots. It takes around 5 minutes to deploy or resume an endpoint. For information about regions where the *High performance* endpoint type is supported, see the footnotes in the [regions](regions.md#regions) table. 
   - **Fast-resume**: Optimized for audio content creation scenarios with less frequent synthesis requests. Easy and quick to deploy or resume an endpoint in under a minute. The fast-resume endpoint type is supported in all [regions](regions.md#regions) where text to speech is available.
1. Select **Next**.
1. Select the checkbox to accept the terms of use and then select **Next**.
1. Review the settings and select the box to accept the model hosting costs.
1. Select **Deploy** to create your endpoint.

After your endpoint is deployed, the endpoint name appears as a link. Select the link to display information specific to your endpoint, such as the endpoint key, endpoint URL, and sample code. When the status of the deployment is **Succeeded**, the endpoint is ready for use.

---

## Test your custom voice

Once your custom voice endpoint has been deployed, you can try out your custom voice directly in the portal.

# [Foundry (new)](#tab/foundry-new)

1. Go to the model details page and select the **Deployments** tab.
1. Select a deployment with the **Succeeded** status.
1. Select **Open in Playground** > **Text to Speech**.
1. On the text to speech playground, enter the text that you want the custom voice to speak, and then select **Play**.

# [Foundry (classic)](#tab/foundry-classic)

1. Select **Deploy model** > **Deploy model**. 
1. Select **Test endpoint**. 

Screenshot of a page to test an endpoint.

---

## Use your custom voice

For application integration, use the Speech SDK. Foundry displays the **Voice name** on the model and deployment details pages. Use this exact value for `SpeechSynthesisVoiceName`.

Screenshot of deployment details with the Voice name field outlined.

The `EndpointId` is a separate value that identifies the deployment. You can find both values in the deployment's **Sample code**. Set both `EndpointId` and `SpeechSynthesisVoiceName` in your SDK configuration. Use a credential and region for the resource that hosts the deployment.

For a C# example, start with the [text to speech quickstart](get-started-text-to-speech.md?pivots=programming-language-csharp), and then see [Use a custom endpoint](how-to-speech-synthesis.md?pivots=programming-language-csharp#use-a-custom-endpoint).

For [Speech Synthesis Markup Language (SSML)](speech-synthesis-markup-voice.md#use-voice-elements), use the same **Voice name** as the `name` attribute of the `voice` element. Replace `YourCustomVoiceName` in this example with the **Voice name** shown in Foundry.

```xml
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
    <voice name="YourCustomVoiceName">
        This is the text that is spoken. 
    </voice>
</speak>
```

## Switch to a new voice model in your product

Once you updated your voice model to the latest engine version, or if you want to switch to a new voice in your product, you need to redeploy the new voice model to a new endpoint. Redeploying new voice model on your existing endpoint isn't supported. After deployment, switch the traffic to the newly created endpoint. We recommend that you transfer the traffic to the new endpoint in a test environment first to ensure that the traffic works well, and then transfer to the new endpoint in the production environment. During the transition, you need to keep the old endpoint. If there are some problems with the new endpoint during transition, you can switch back to your old endpoint. If the traffic has been running well on the new endpoint for about 24 hours (recommended value), you can delete your old endpoint. 

> **Note:**
> If your voice name is changed and you're using Speech Synthesis Markup Language (SSML), be sure to use the new voice name in SSML.

## Suspend and resume an endpoint

You can suspend or resume an endpoint to limit spend and conserve resources that aren't in use. You aren't charged while the endpoint is suspended. When you resume an endpoint, you can continue to use the same endpoint URL in your application to synthesize speech. 

> **Note:**
> The Suspend operation completes almost immediately. The Resume operation completes in about the same amount of time as a new deployment. 

This section describes how to suspend or resume a custom voice endpoint in the Microsoft Foundry portal.

### Suspend endpoint

To suspend and deactivate your endpoint:

# [Foundry (new)](#tab/foundry-new)

1. 
Sign in to 
[Microsoft Foundry](https://ai.azure.com/?cid=learnDocs)
. Make sure the **New Foundry** toggle is on. These steps refer to **Foundry (new)**.



1. Select **Build** from the upper-right menu.
1. Select **Services** in the left pane.
1. Select the **Customizations** tab, and then select the name of the trained model.
1. On the model details page, select the **Deployments** tab.
1. Select the endpoint you want to suspend, and then select **Suspend**.
1. In the **Suspend endpoint** dialog, select **Suspend**. The status changes from **Succeeded** to **Queued**, and then to **Suspended**.

# [Foundry (classic)](#tab/foundry-classic)

1. Sign in to the [Microsoft Foundry (classic) portal](https://ai.azure.com/?cid=learnDocs).
1. Select **Fine-tuning** from the left pane and then select **AI Service fine-tuning**.
1. Select the professional voice fine-tuning task (by model name) that you [started as described in the create professional voice article](https://learn.microsoft.com/azure/ai-services/speech-service/professional-voice-create-project).
1. Select **Deploy model**. 
1. Select the endpoint you want to suspend and then select **Suspend**. 

   Screenshot of page to suspend or resume an endpoint.

1. In the dialog box that appears, select **Suspend**. After the endpoint is suspended, the status changes from **Succeeded** to **Suspended**. 

---

### Resume endpoint

# [Foundry (new)](#tab/foundry-new)

1. 
Sign in to 
[Microsoft Foundry](https://ai.azure.com/?cid=learnDocs)
. Make sure the **New Foundry** toggle is on. These steps refer to **Foundry (new)**.



1. Select **Build** from the upper-right menu.
1. Select **Services** in the left pane.
1. Select the **Customizations** tab, and then select the name of the trained model.
1. On the model details page, select the **Deployments** tab.
1. Select the suspended endpoint, and then select **Resume**.
1. In the **Resume endpoint** dialog, select **Resume**. The status changes from **Suspended** to **Running**, and then to **Succeeded**.

# [Foundry (classic)](#tab/foundry-classic)

1. To resume and activate your endpoint, select **Resume** from the **Deploy model** tab in the [Microsoft Foundry (classic) portal](https://ai.azure.com/?cid=learnDocs).
1. In the dialog box that appears, select **Submit**. After you reactivate the endpoint, the status changes from **Suspended** to **Succeeded**.

---

## Next steps

- Learn more about custom voice in the [overview](custom-neural-voice.md).
- Learn more about custom avatar in the [overview](text-to-speech-avatar/what-is-text-to-speech-avatar.md).



**Applies to: speech-studio**


After you've successfully created and [trained](professional-voice-train-voice.md) your voice model, you deploy it to a custom voice endpoint. 

> **Note:**
> You can create up to 50 endpoints with a standard (S0) Speech resource, each with its own custom voice.

To use your custom voice, you must specify the voice model name, use the custom URI directly in an HTTP request, and use the same Speech resource to pass through the authentication of the text to speech service.

## Add a deployment endpoint

To create a custom voice endpoint:

1. Sign in to the [Speech Studio](https://aka.ms/speechstudio/customvoice).
1. Select **Custom voice** > Your project name > **Deploy model** > **Deploy model**. 
1. Select a voice model that you want to associate with this endpoint.  
1. Enter a **Name** and **Description** for your custom endpoint.
1. Select **Endpoint type** according to your scenario. If your resource is in a supported region, the default setting for the endpoint type is *High performance*. Otherwise, if the resource is in an unsupported region, the only available option is *Fast resume*.
   - *High performance*: Optimized for scenarios with real-time and high-volume synthesis requests, such as conversational AI, call-center bots. It takes around 5 minutes to deploy or resume an endpoint. For information about regions where the *High performance* endpoint type is supported, see the footnotes in the [regions](regions.md#regions) table. 
   - *Fast resume*: Optimized for audio content creation scenarios with less frequent synthesis requests. Easy and quick to deploy or resume an endpoint in under a minute. The *Fast resume* endpoint type is supported in all [regions](regions.md#regions) where text to speech is available.
   
1. Select **Deploy** to create your endpoint.

After your endpoint is deployed, the endpoint name appears as a link. Select the link to display information specific to your endpoint, such as the endpoint key, endpoint URL, and sample code. When the status of the deployment is **Succeeded**, the endpoint is ready for use.

## Test your custom voice

Once your custom voice endpoint has been deployed, you can try out your custom voice directly in the portal.

1. Select **Deploy model** > **Deploy model**. 
1. Select **Test endpoint**. 

Screenshot of a page to test an endpoint in Speech Studio.

## Application settings

The application settings that you use as REST API request parameters are available on the **Deploy model** tab in [Speech Studio](https://aka.ms/custom-voice-portal).

Screenshot of custom endpoint app settings in Speech Studio.

* The **Endpoint key** shows the Speech resource key the endpoint is associated with. Use the endpoint key as the value of your `Ocp-Apim-Subscription-Key` request header. 
* The **Endpoint URL** shows your service region. Use the value that precedes `voice.speech.microsoft.com` as your service region request parameter. For example, use `eastus` if the endpoint URL is `https://eastus.voice.speech.microsoft.com/cognitiveservices/v1`.
* The **Endpoint URL** shows your endpoint ID. Use the value appended to the `?deploymentId=` query parameter as the value of your endpoint ID request parameter.

## Use your custom voice

The custom endpoint is functionally identical to the standard endpoint that's used for text to speech requests. 

One difference is that the `EndpointId` must be specified to use the custom voice via the Speech SDK. You can start with the [text to speech quickstart](get-started-text-to-speech.md) and then update the code with the `EndpointId` and `SpeechSynthesisVoiceName`. For more information, see [use a custom endpoint](how-to-speech-synthesis.md#use-a-custom-endpoint).

To use a custom voice via [Speech Synthesis Markup Language (SSML)](speech-synthesis-markup-voice.md#use-voice-elements), specify the model name as the voice name. This example uses the `YourCustomVoiceName` voice. 

```xml
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
    <voice name="YourCustomVoiceName">
        This is the text that is spoken. 
    </voice>
</speak>
```

## Switch to a new voice model in your product

Once you've updated your voice model to the latest engine version, or if you want to switch to a new voice in your product, you need to redeploy the new voice model to a new endpoint. Redeploying new voice model on your existing endpoint is not supported. After deployment, switch the traffic to the newly created endpoint. We recommend that you transfer the traffic to the new endpoint in a test environment first to ensure that the traffic works well, and then transfer to the new endpoint in the production environment. During the transition, you need to keep the old endpoint. If there are some problems with the new endpoint during transition, you can switch back to your old endpoint. If the traffic has been running well on the new endpoint for about 24 hours (recommended value), you can delete your old endpoint. 

> **Note:**
> If your voice name is changed and you are using Speech Synthesis Markup Language (SSML), be sure to use the new voice name in SSML.

## Suspend and resume an endpoint

You can suspend or resume an endpoint, to limit spend and conserve resources that aren't in use. You won't be charged while the endpoint is suspended. When you resume an endpoint, you can continue to use the same endpoint URL in your application to synthesize speech. 

> **Note:**
> The suspend operation completes almost immediately. The resume operation completes in about the same amount of time as a new deployment. 

This section describes how to suspend or resume a custom voice endpoint in the Speech Studio portal.

### Suspend endpoint

1. To suspend and deactivate your endpoint, select **Suspend** from the **Deploy model** tab in [Speech Studio](https://aka.ms/custom-voice-portal).

   Screenshot of the select suspend endpoint option.

1. In the dialog box that appears, select **Submit**. After the endpoint is suspended, Speech Studio will show the **Successfully suspended endpoint** notification.

### Resume endpoint

1. To resume and activate your endpoint, select **Resume** from the **Deploy model** tab in [Speech Studio](https://aka.ms/custom-voice-portal).

   Screenshot of the select resume endpoint option.

1. In the dialog box that appears, select **Submit**. After you successfully reactivate the endpoint, the status will change from **Suspended** to **Succeeded**.

## Next steps

- Learn more about custom voice in the [overview](custom-neural-voice.md).
- Learn more about Speech Studio in the [overview](speech-studio-overview.md).




**Applies to: rest-api**


After you've successfully created and [trained](professional-voice-train-voice.md) your voice model, you deploy it to a custom voice endpoint. 

> **Note:**
> You can create up to 50 endpoints with a standard (S0) Speech resource, each with its own custom voice.

## Add a deployment endpoint

To create an endpoint, use the [Endpoints_Create](https://learn.microsoft.com/rest/api/aiservices/speechapi/endpoints/create) operation of the custom voice API. Construct the request body according to the following instructions:

- Set the required `projectId` property. See [create a project](professional-voice-create-project.md).
- Set the required `modelId` property. See [train a voice model](professional-voice-train-voice.md).
- Set the required `description` property. The description can be changed later.

Make an HTTP PUT request using the URI as shown in the following [Endpoints_Create](https://learn.microsoft.com/rest/api/aiservices/speechapi/endpoints/create) example. 
- Replace `YourResourceKey` with your Speech resource key.
- Replace `YourResourceName` with your Speech resource name.
- Replace `EndpointId` with an endpoint ID of your choice. The ID must be a GUID and must be unique within your Speech resource. The ID will be used in the project's URI and can't be changed later. 

```azurecli-interactive
curl -v -X PUT -H "Ocp-Apim-Subscription-Key: YourResourceKey" -H "Content-Type: application/json" -d '{
  "description": "Endpoint for Jessica voice",
  "projectId": "ProjectId",
  "modelId": "JessicaModelId",
} '  "https://YourResourceName.cognitiveservices.azure.com/customvoice/endpoints/EndpointId?api-version=2026-01-01"
```

You should receive a response body in the following format:

```json
{
  "id": "9f50c644-2121-40e9-9ea7-544e48bfe3cb",
  "description": "Endpoint for Jessica voice",
  "projectId": "ProjectId",
  "modelId": "JessicaModelId",
  "properties": {
    "kind": "HighPerformance"
  },
  "status": "NotStarted",
  "createdDateTime": "2023-04-01T05:30:00.000Z",
  "lastActionDateTime": "2023-04-02T10:15:30.000Z"
}
```

The response header contains the `Operation-Location` property. Use this URI to get details about the [Endpoints_Create](https://learn.microsoft.com/rest/api/aiservices/speechapi/endpoints/create) operation. Here's an example of the response header:

```HTTP 201
Operation-Location: https://YourResourceName.cognitiveservices.azure.com/customvoice/operations/aaaabbbb-0000-cccc-1111-dddd2222eeee?api-version=2026-01-01
Operation-Id: aaaabbbb-0000-cccc-1111-dddd2222eeee
```

You use the endpoint `Operation-Location` in subsequent API requests to [suspend and resume an endpoint](#suspend-and-resume-an-endpoint) and [delete an endpoint](#delete-an-endpoint).

## Use your custom voice

To use your custom voice, you must specify the voice model name, use the custom URI directly in an HTTP request, and use the same Speech resource to pass through the authentication of the text to speech service.

The custom endpoint is functionally identical to the standard endpoint that's used for text to speech requests. 

One difference is that the `EndpointId` must be specified to use the custom voice via the Speech SDK. You can start with the [text to speech quickstart](get-started-text-to-speech.md) and then update the code with the `EndpointId` and `SpeechSynthesisVoiceName`. For more information, see [use a custom endpoint](how-to-speech-synthesis.md#use-a-custom-endpoint).

To use a custom voice via [Speech Synthesis Markup Language (SSML)](speech-synthesis-markup-voice.md#use-voice-elements), specify the model name as the voice name. This example uses the `YourCustomVoiceName` voice. 

```xml
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
    <voice name="YourCustomVoiceName">
        This is the text that is spoken. 
    </voice>
</speak>
```

## Suspend an endpoint

You can suspend or resume an endpoint, to limit spend and conserve resources that aren't in use. You won't be charged while the endpoint is suspended. When you resume an endpoint, you can continue to use the same endpoint URL in your application to synthesize speech. 

To suspend an endpoint, use the [Endpoints_Suspend](https://learn.microsoft.com/rest/api/aiservices/speechapi/endpoints/suspend) operation of the custom voice API. 

Make an HTTP POST request using the URI as shown in the following [Endpoints_Suspend](https://learn.microsoft.com/rest/api/aiservices/speechapi/endpoints/suspend) example. 
- Replace `YourResourceKey` with your Speech resource key.
- Replace `YourResourceName` with your Speech resource name.
- Replace `YourEndpointId` with the endpoint ID that you received when you created the endpoint.

```azurecli-interactive
curl -v -X POST "https://YourResourceName.cognitiveservices.azure.com/customvoice/endpoints/YourEndpointId:suspend?api-version=2026-01-01" -H "Ocp-Apim-Subscription-Key: YourResourceKey" -H "content-type: application/json" -H "content-length: 0"
```

You should receive a response body in the following format:

```json
{
  "id": "9f50c644-2121-40e9-9ea7-544e48bfe3cb",
  "description": "Endpoint for Jessica voice",
  "projectId": "ProjectId",
  "modelId": "JessicaModelId",
  "properties": {
    "kind": "HighPerformance"
  },
  "status": "Disabling",
  "createdDateTime": "2023-04-01T05:30:00.000Z",
  "lastActionDateTime": "2023-04-02T10:15:30.000Z"
}
```

## Resume an endpoint

To resume an endpoint, use the [Endpoints_Resume](https://learn.microsoft.com/rest/api/aiservices/speechapi/endpoints/resume) operation of the custom voice API. 

Make an HTTP POST request using the URI as shown in the following [Endpoints_Resume](https://learn.microsoft.com/rest/api/aiservices/speechapi/endpoints/resume) example. 
- Replace `YourResourceKey` with your Speech resource key.
- Replace `YourResourceName` with your Speech resource name.
- Replace `YourEndpointId` with the endpoint ID that you received when you created the endpoint.

```azurecli-interactive
curl -v -X POST "https://YourResourceName.cognitiveservices.azure.com/customvoice/endpoints/YourEndpointId:resume?api-version=2026-01-01" -H "Ocp-Apim-Subscription-Key: YourResourceKey" -H "content-type: application/json" -H "content-length: 0"
```

You should receive a response body in the following format:

```json
{
  "id": "9f50c644-2121-40e9-9ea7-544e48bfe3cb",
  "description": "Endpoint for Jessica voice",
  "projectId": "ProjectId",
  "modelId": "JessicaModelId",
  "properties": {
    "kind": "HighPerformance"
  },
  "status": "Running",
  "createdDateTime": "2023-04-01T05:30:00.000Z",
  "lastActionDateTime": "2023-04-02T10:15:30.000Z"
}
```

## Delete an endpoint

To delete an endpoint, use the [Endpoints_Delete](https://learn.microsoft.com/rest/api/aiservices/speechapi/endpoints/delete) operation of the custom voice API. 

Make an HTTP DELETE request using the URI as shown in the following [Endpoints_Delete](https://learn.microsoft.com/rest/api/aiservices/speechapi/endpoints/delete) example. 
- Replace `YourResourceKey` with your Speech resource key.
- Replace `YourResourceName` with your Speech resource name.
- Replace `YourEndpointId` with the endpoint ID that you received when you created the endpoint.

```azurecli-interactive
curl -v -X DELETE "https://YourResourceName.cognitiveservices.azure.com/customvoice/endpoints/YourEndpointId?api-version=2026-01-01" -H "Ocp-Apim-Subscription-Key: YourResourceKey"
```

You should receive a response header with status code 204.

## Switch to a new voice model in your product

Once you've updated your voice model to the latest engine version, or if you want to switch to a new voice in your product, you need to redeploy the new voice model to a new endpoint. Redeploying new voice model on your existing endpoint is not supported. After deployment, switch the traffic to the newly created endpoint. We recommend that you transfer the traffic to the new endpoint in a test environment first to ensure that the traffic works well, and then transfer to the new endpoint in the production environment. During the transition, you need to keep the old endpoint. If there are some problems with the new endpoint during transition, you can switch back to your old endpoint. If the traffic has been running well on the new endpoint for about 24 hours (recommended value), you can delete your old endpoint. 

> **Note:**
> If your voice name is changed and you are using Speech Synthesis Markup Language (SSML), be sure to use the new voice name in SSML.

## Next steps

- Learn more about custom voice in the [overview](custom-neural-voice.md).
- Learn more about Speech Studio in the [overview](speech-studio-overview.md).
