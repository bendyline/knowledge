---
title: Set up a professional voice - Speech service
titleSuffix: Foundry Tools
description: Learn how to set up a professional voice by using Microsoft Foundry, Speech Studio, or the custom voice REST API.
author: PatrickFarley
manager: mcleans
ms.service: azure-speech-foundry-tools
ms.topic: how-to
ms.date: 09/04/2026
ms.author: pafarley
zone_pivot_groups: foundry-speech-studio-rest
#Customer intent: As a developer, I want to learn how to set up a professional voice.
ai-usage: ai-assisted
---

# Set up a professional voice

**Applies to: ai-foundry-portal**


Set up your professional voice before you add voice talent consent and training data.

## Prerequisites

- Approved access to professional voice. Review the [limited-access requirements](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/speech-service/text-to-speech/limited-access?tabs=cnv) and [request access](https://aka.ms/customneural) if needed.
- For Foundry (new), an Azure subscription and a Foundry project associated with a Standard (S0) resource. See [Create a Microsoft Foundry project](https://learn.microsoft.com/azure/foundry/how-to/create-projects?tabs=foundry).
- For Foundry (new), permission to use the project and manage Speech data, models, and deployments. Ask your administrator to review [Foundry access permissions](https://learn.microsoft.com/azure/foundry/concepts/rbac-foundry) and [Speech resource permissions](role-based-access-control.md#roles-for-speech-resources).
- A [supported language](language-support.md?tabs=custom-tts#professional-voice) and a resource in a supported training region. In the [Text to speech regions table](regions.md?tabs=tts#regions), check **Custom voice training** and its footnotes.
- Written permission from the voice talent and a recording of their [consent statement](professional-voice-create-consent.md). Share the [disclosure for voice talent](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/speech-service/text-to-speech/disclosure-voice-talent) with them before recording.
- Audio recordings and, when required by your [data type](how-to-custom-voice-training-data.md), matching transcripts. Training eligibility depends on the selected [training method and version](professional-voice-train-voice.md#choose-a-training-method), not a single minimum that applies to every model.

## Start professional voice setup

# [Foundry (new)](#tab/foundry-new)

To start a professional voice customization in the new Microsoft Foundry portal, follow these steps:

> **Tip:**
> To start from **Build**, select **Services** > **Customizations**. This tab lists your draft customizations and trained models. Select **Create**, and then complete **Basic details** in this procedure.

1. 
Sign in to 
[Microsoft Foundry](https://ai.azure.com/?cid=learnDocs)
. Make sure the **New Foundry** toggle is on. These steps refer to **Foundry (new)**.



1. Open the Foundry project associated with the resource you want to use for professional voice.
1. Select **Discover**.
1. On **Overview**, under **Experiment with prebuilt services**, select **Azure Speech**.
1. On the **Services** page, under **Customize**, select **Professional voice** to open the **Customize a model** page.

   Screenshot of Discover Services with the Professional voice card outlined under Customize.

1. On the **Basic details** step, fill in these settings:

   - **Select model**: Select **Azure Speech - Text to Speech** if it isn't already selected.
   - **Type**: Select **Professional voice** if it isn't already selected.
   - **Voice gender**: Select the gender of the voice talent.
   - **Training data language**: Select the language of your training data.
   - **Voice name**: Enter a name for your voice model.
   - **Description**: Optionally enter a description.

1. Select **Next**.

Keep the **Customize a model** page open and continue with [Add voice talent consent](professional-voice-create-consent.md) to register the voice talent.

### Resume an unfinished customization

If you leave the wizard before submitting training, return to your existing draft:

1. Open the same Foundry project.
1. Select **Build** > **Services** > **Customizations**.
1. Select the name of your customization with the **Draft** status to reopen **Customize a model**.

   Screenshot of Build Services with the Customizations tab and a professional voice Draft row outlined.

1. Review the saved settings and continue to the step you need.

# [Foundry (classic)](#tab/foundry-classic)

In the [Microsoft Foundry (classic) portal](https://ai.azure.com/?cid=learnDocs), you can fine-tune some Foundry Tools models. To fine-tune a professional voice model, follow these steps:

1. Go to your Microsoft Foundry project in the [Microsoft Foundry (classic) portal](https://ai.azure.com/?cid=learnDocs). If you need to create a project, see [Create a Microsoft Foundry project](https://learn.microsoft.com/azure/ai-foundry/how-to/create-projects).
1. Select **Fine-tuning** from the left pane.
1. Select **AI Service fine-tuning** > **+ Fine-tune**.

    Screenshot of the page to select fine-tuning of Foundry Tools models.
 
1. In the wizard, select **Custom voice (professional voice fine-tuning)**.
1. Select **Next**.
1. Follow the instructions provided by the wizard to create your fine-tuning workspace. 

---

## Continue professional voice setup

Use the following Azure Speech in Foundry Tools articles to continue setting up your professional voice:
* [Add voice talent consent](professional-voice-create-consent.md)
* [Add training datasets](professional-voice-create-training-set.md)
* [Train your voice model](professional-voice-train-voice.md)
* [Deploy your professional voice model as an endpoint](professional-voice-deploy-endpoint.md)

## View professional voice models

# [Foundry (new)](#tab/foundry-new)

After training finishes, access your custom voice models and deployments from the **Customizations** tab.

1. 
Sign in to 
[Microsoft Foundry](https://ai.azure.com/?cid=learnDocs)
. Make sure the **New Foundry** toggle is on. These steps refer to **Foundry (new)**.



1. Select **Build** from the upper-right menu.
1. Select **Services** in the left pane.
1. Select the **Customizations** tab to view the status of your customization jobs and the models that were created.
1. Select a model name to open the model details page, where you can view training status and manage deployments.

To [test your voice in the playground](professional-voice-deploy-endpoint.md?tabs=foundry-new\&pivots=ai-foundry-portal#test-your-custom-voice), first deploy the model and wait for the deployment status to become **Succeeded**.

# [Foundry (classic)](#tab/foundry-classic)

1. Sign in to the [Microsoft Foundry (classic) portal](https://ai.azure.com/?cid=learnDocs).
1. Select **Fine-tuning** from the left pane.
1. Select **AI Service fine-tuning**. You can view the status of your fine-tuning tasks and the models that were created.
    
    Screenshot of the page to view fine-tuned Foundry Tools models.

---

## Next step

> 
> [Add voice talent consent for professional voice.](professional-voice-create-consent.md)



**Applies to: speech-studio**


Content for [custom voice](https://aka.ms/customvoice) like data, models, tests, and endpoints are organized into projects in Speech Studio. Each project is specific to a country/region and language, and the gender of the voice you want to create. For example, you might create a project for a female voice for your call center's chat bots that use English in the United States.

All it takes to get started are a handful of audio files and the associated transcriptions. See if custom voice supports your [language](language-support.md?tabs=tts) and [region](regions.md#regions).

## Start fine-tuning

To fine-tune a professional voice model, follow these steps:

1. Sign in to the [Speech Studio](https://aka.ms/speechstudio/customvoice).
1. Select the subscription and Speech resource to work with. 

    > **Important:**
    > Custom voice training is currently only available in some regions. After your voice model is trained in a supported region, you can copy it to a Speech resource in another region as needed. See footnotes in the [regions](regions.md#regions) table for more information.

1. Select **Custom voice** > **Create a project**. 
1. Select **Custom neural voice Pro** > **Next**. 
1. Follow the instructions provided by the wizard to create your project. 

Select the new project by name or select **Go to project**. You see these menu items in the left panel: **Set up voice talent**, **Prepare training data**, **Train model**, and **Deploy model**. 

## Next steps

> 
> [Add voice talent consent to the professional voice project.](professional-voice-create-consent.md)




**Applies to: rest-api**


Professional voice projects contain the voice talent consent statement, training datasets, voice models, and endpoints.

Each project is specific to a country/region and language, and the gender of the voice you want to create. For example, you might create a project for a female voice for your call center's chat bots that use English in the United States.

## Create a project

To create a professional voice project, use the [Projects_Create](https://learn.microsoft.com/rest/api/aiservices/speechapi/projects/create) operation of the custom voice API. Construct the request body according to the following instructions:

- Set the required `kind` property to `ProfessionalVoice`. The kind can't be changed later.
- Optionally, set the `locale` property. The locale of this project. The locale code follows BCP-47. You can find the text to speech locale list [here](https://learn.microsoft.com/azure/ai-services/speech-service/language-support?tabs=tts). If you provide the locale, the project is usable in [Speech Studio](https://aka.ms/speechstudio/customvoice).
- Optionally, set the `description` property for the project description. The project description can be changed later.

Make an HTTP PUT request using the URI as shown in the following [Projects_Create](https://learn.microsoft.com/rest/api/aiservices/speechapi/projects/create) example. 
- Replace `YourResourceKey` with your Speech resource key.
- Replace `YourResourceName` with your Speech resource name.
- Replace `ProjectId` with a project ID of your choice. The case sensitive ID must be unique within your Speech resource. The ID will be used in the project's URI and can't be changed later. 

```azurecli-interactive
curl -v -X PUT -H "Ocp-Apim-Subscription-Key: YourResourceKey" -H "Content-Type: application/json" -d '{
  "description": "Project description",
  "kind": "ProfessionalVoice",
  "locale": "en-US"
} '  "https://YourResourceName.cognitiveservices.azure.com/customvoice/projects/ProjectId?api-version=2026-01-01"
```

You should receive a response body in the following format:

```json
{
  "id": "ProjectId",
  "description": "Project description",
  "kind": "ProfessionalVoice",
  "locale": "en-US",
  "createdDateTime": "2023-04-01T05:30:00.000Z"
}
```

You use the project `id` in subsequent API requests to [add voice talent consent](professional-voice-create-consent.md) and [create a training set](professional-voice-create-training-set.md).

## Next steps

> 
> [Add voice talent consent to the professional voice project.](professional-voice-create-consent.md)
