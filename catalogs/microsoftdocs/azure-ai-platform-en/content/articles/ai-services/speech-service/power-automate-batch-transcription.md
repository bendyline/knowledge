---
title: Power automate batch transcription - Speech service
titleSuffix: Foundry Tools
description: Transcribe audio files from an Azure Storage container using the Power Automate batch transcription connector.
manager: mcleans
author: PatrickFarley
ms.author: pafarley
ms.service: azure-speech-foundry-tools
ms.topic: how-to
ms.date: 03/31/2026
ai-usage: ai-assisted
#Customer intent: As a low-code developer, I want to learn how to use Power Automate to transcribe audio files from an Azure Storage container.
---

# Power automate batch transcription

This article describes how to use [Power Automate](https://learn.microsoft.com/power-automate/getting-started) and the [Foundry Tools for Batch Speech to text connector](https://learn.microsoft.com/connectors/cognitiveservicesspe/) to transcribe audio files from an Azure Storage container. The connector uses the [Batch Transcription REST API](batch-transcription.md), but you don't need to write any code to use it. If the connector doesn't meet your requirements, you can still use the [REST API](rest-speech-to-text.md#batch-transcription) directly.

In addition to [Power Automate](https://learn.microsoft.com/power-automate/getting-started), you can use the [Foundry Tools for Batch Speech to text connector](https://learn.microsoft.com/connectors/cognitiveservicesspe/) with [Power Apps](https://learn.microsoft.com/power-apps) and [Logic Apps](https://learn.microsoft.com/azure/logic-apps/).

> **Tip:**
> Try more Speech features in [Speech Studio](https://aka.ms/speechstudio/speechtotexttool) without signing up or writing any code.

## Prerequisites


> 
> - An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
> - [Create a Foundry resource for Speech](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) in the Azure portal.
> - Get the Speech resource key and region. After your Speech resource is deployed, select **Go to resource** to view and manage keys.


## Create the Azure Blob Storage container

In this example, you transcribe audio files that are located in an [Azure Blob Storage](https://learn.microsoft.com/azure/storage/blobs/storage-blobs-overview) account.

Follow these steps to create a new storage account and container. 

1. Go to the [Azure portal](https://portal.azure.com/) and sign in to your Azure account.
1. <a href="https://portal.azure.com/#create/Microsoft.StorageAccount-ARM"  title="Create a Storage account resource"  target="_blank">Create a Storage account resource</a> in the Azure portal. Use the same subscription and resource group as your Speech resource.
1. Select the Storage account. 
1. In the **Data storage** group in the left pane, select **Containers**.
1. Select **+ Container**.
1. Enter a name for the new container such as "batchtranscription" and select **Create**.
1. Select **Access keys** in the **Security + networking** group in the left pane. View and take note of the **key1** (or **key2**) value. You need the access key later when you [configure the connector](#create-a-power-automate-flow). 

Later you'll [upload files to the container](#upload-files-to-the-container) after the connector is configured, since the events of adding and modifying files kick off the transcription process.

## Create a Power Automate flow

The steps to create your power automate flow are:
1. [Create a new flow](#create-a-new-flow)
1. [Configure the flow trigger](#configure-the-flow-trigger)
1. [Create SAS URI by path](#create-sas-uri-by-path)
1. [Create transcription](#create-transcription)
1. [Test the flow](#test-the-flow)

### Create a new flow

To create a new flow, follow these steps:
1. [Sign in to power automate](https://make.powerautomate.com/)
1. From the collapsible menu on the left, select **Create**. 
1. Select **Automated cloud flow** to start from a blank flow that can be triggered by a designated event.

    A screenshot of the menu for creating an automated cloud flow.

1. In the **Build an automated cloud flow** dialog, enter a name for your flow such as "BatchSTT".
1. Select **Skip** to exit the dialog and continue without choosing a trigger.

### Configure the flow trigger

To configure the flow trigger, follow these steps:
1. Select **Add a trigger** to configure the event that starts the flow.
1. Choose a trigger from the [Azure Blob Storage connector](https://learn.microsoft.com/connectors/azureblob/). For this example, enter "blob" in the search connectors and triggers box to narrow the results. 
1. Under the **Azure Blob Storage** connector, select the **When a blob is added or modified** trigger.

    A screenshot of the search connectors and triggers dialog.

1. Configure the Azure Blob Storage connection. 
    1. From the **Authentication type** drop-down list, select **Access Key**.
    1. Enter the account name and access key of the Azure Storage account that you [created previously](#create-the-azure-blob-storage-container).
    1. Select **Create new** to continue.
1. Configure the **When a blob is added or modified** trigger. 

    A screenshot of the dialog to configure the blob trigger.

    1. From the **Storage account name or blob endpoint** drop-down list, select **Use connection settings**. You should see the storage account name as a component of the connection string.
    1. Under **Container** select the folder icon. Choose the container that you [created previously](#create-the-azure-blob-storage-container).

### Create SAS URI by path

To transcribe an audio file that's in your [Azure Blob Storage container](#create-the-azure-blob-storage-container), you need a [Shared Access Signature (SAS) URI](https://learn.microsoft.com/azure/storage/common/storage-sas-overview) for the file.

The [Azure Blob Storage connector](https://learn.microsoft.com/connectors/azureblob/) supports SAS URIs for individual blobs, but not for entire containers.

To create a SAS URI for a blob, follow these steps:

1. Select **+ New step** to begin adding a new operation for the Azure Blob Storage connector.
1. Enter "blob" in the search connectors and actions box to narrow the results. 
1. Under the **Azure Blob Storage** connector, select the **Create SAS URI by path** trigger.
1. Under the **Storage account name or blob endpoint** drop-down, choose the same connection that you used for the **When a blob is added or modified** trigger.
1. Select `Path` as dynamic content for the **Blob path** field.

By now, you should have a flow that looks like this:

A screenshot of the flow status after create SAS URI.

### Create transcription

To create a transcription, follow these steps:
1. Select **+ New step** to begin adding a new operation for the [batch speech to text connector](https://learn.microsoft.com/connectors/cognitiveservicesspe/). 
1. Enter "batch speech to text" in the search connectors and actions box to narrow the results. 
1. Select the **Foundry Tools for Batch Speech to text** connector.
1. Select the **Create transcription** action.
1. Create a new connection to the Speech resource that you [created previously](#prerequisites). The connection is available throughout the Power Automate environment. For more information, see [Manage connections in Power Automate](https://learn.microsoft.com/power-automate/add-manage-connections). 
    1. Enter a name for the connection such as "speech-resource-key". You can choose any name that you like. 
    1. In the **API Key** field, enter the Speech resource key.
    
    Optionally you can select the connector ellipses (...) to view available connections. If you weren't prompted to create a connection, then you already have a connection that's selected by default.

    A screenshot of the view connections dialog.

1. Configure the **Create transcription** action. 
    1. In the locale field, enter the expected locale of the audio data to transcribe. 
    1. Select `DisplayName` as dynamic content for the **displayName** field. You can choose any name that you would like to refer to later.
    1. Select `Web Url` as dynamic content for the **contentUrls Item - 1** field. This is the SAS URI output from the [Create SAS URI by path](#create-sas-uri-by-path) action. 
    
    > **Tip:**
    > For more information about create transcription parameters, see the [Foundry Tools for Batch Speech to text](https://learn.microsoft.com/connectors/cognitiveservicesspe/#create-transcription) documentation.

1. From the top navigation menu, select **Save**.

### Test the flow

To test the flow, follow these steps:
1. From the top navigation menu, select **Flow checker**. In the side panel that appears, you shouldn't see any errors or warnings. If you do, then you should fix them before continuing.
1. From the top navigation menu, save the flow and select **Test the flow**. In the window that appears, select **Test**.
1. In the side panel that appears, select **Manually** and then select **Test**.

After a few seconds, you should see an indication that the flow is in progress. 

A screenshot of the flow in progress icon.

The flow is waiting for a file to be added or modified in the Azure Blob Storage container. That's the [trigger that you configured](#configure-the-flow-trigger) earlier.

To trigger the test flow, upload an audio file to the Azure Blob Storage container as described next.

## Upload files to the container

Follow these steps to upload [wav, mp3, or ogg](batch-transcription-audio-data.md#supported-input-formats-and-codecs) files from your local directory to the Azure Storage container that you [created previously](#create-the-azure-blob-storage-container). 

1. Go to the [Azure portal](https://portal.azure.com/) and sign in to your Azure account.
1. <a href="https://portal.azure.com/#create/Microsoft.StorageAccount-ARM"  title="Create a Storage account resource"  target="_blank">Create a Storage account resource</a> in the Azure portal. Use the same subscription and resource group as your Speech resource.
1. Select the Storage account.
1. Select the new container.
1. Select **Upload**.
1. Choose the files to upload and select **Upload**.

## View the transcription flow results

After you upload the audio file to the Azure Blob Storage container, the flow should run and complete. Return to your test flow in the Power Automate portal to view the results.

A screenshot of all steps of the flow succeeded.

You can select and expand the **Create transcription** to see detailed input and output results.

## Next steps

- [Batch speech to text connector](https://learn.microsoft.com/connectors/cognitiveservicesspe/)
- [Azure Blob Storage connector](https://learn.microsoft.com/connectors/azureblob/)
- [Power Platform](https://learn.microsoft.com/power-platform/)
