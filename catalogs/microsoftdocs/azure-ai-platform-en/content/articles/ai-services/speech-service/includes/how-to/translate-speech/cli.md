---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.topic: include
ms.date: 1/21/2024
ms.author: pafarley
---


In this how-to guide, you learn how to recognize human speech and translate it to another language.

See the speech translation [overview](../../../speech-translation.md) for more information about:

* Translating speech to text
* Translating speech to multiple target languages
* Performing direct speech to speech translation


## Prerequisites


> 
> - An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
> - [Create a Foundry resource for Speech](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) in the Azure portal.
> - Get the Speech resource key and region. After your Speech resource is deployed, select **Go to resource** to view and manage keys.


## Download and install


Follow these steps and see the [Speech CLI quickstart](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/~/articles/ai-services/speech-service/spx-basics.md#download-and-install) for other requirements for your platform.

1. Run the following .NET CLI command to install the Speech CLI:

   ```dotnetcli
   dotnet tool install --global Microsoft.CognitiveServices.Speech.CLI
   ```

1. Run the following commands to configure your Speech resource key and region. Replace `SUBSCRIPTION-KEY` with your Speech resource key and replace `REGION` with your Speech resource region.

   # [Terminal](#tab/terminal)

   ```console
   spx config @key --set SUBSCRIPTION-KEY
   spx config @region --set REGION
   ```

   # [PowerShell](#tab/powershell)

   ```powershell
   spx --% config @key --set SUBSCRIPTION-KEY
   spx --% config @region --set REGION
   ```

   ***


## Set source and target languages

This command calls the Speech CLI to translate speech from the microphone from Italian to French:

```shell
spx translate --microphone --source it-IT --target fr
```
