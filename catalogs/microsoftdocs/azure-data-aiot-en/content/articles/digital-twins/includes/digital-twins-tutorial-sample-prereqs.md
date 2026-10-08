---
author: baanders
description: Include file that lists prerequisites for Azure Digital Twins tutorials
ms.service: azure-digital-twins
ms.topic: include
ms.date: 2/14/2025
ms.author: baanders
---

## Prerequisites

Before beginning this tutorial, start with these prerequisites:
* If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.
* This tutorial uses .NET. You can download the latest version of the .NET SDK for multiple platforms from [Download .NET](https://dotnet.microsoft.com/download).

Then, continue through the rest of this section to set up the remaining prerequisites.

### Get sample resources

The tutorial is driven by an [Azure Digital Twins end-to-end sample project written in C#](https://learn.microsoft.com/samples/azure-samples/digital-twins-samples/digital-twins-samples). Get the sample project on your machine by navigating to the sample link, and selecting the **Browse code** button underneath the title. 

This action takes you to the GitHub repo for the samples, which you can download as a .zip by selecting the **Code** button followed by **Download ZIP**.

Screenshot of the digital-twins-samples repo on GitHub, highlighting the steps to download it as a zip.

This action downloads a .zip folder to your machine as *digital-twins-samples-main.zip*. Unzip the folder and extract the files.

### Prepare an Azure Digital Twins instance


To work with Azure Digital Twins in this article, you need an Azure Digital Twins instance and the required permissions for using it. If you already have an Azure Digital Twins instance set up, you can use that instance and skip to the next section. Otherwise, follow the instructions in [Set up an instance and authentication](../how-to-set-up-instance-portal.md). The instructions contain information to help you verify that you completed each step successfully.

After you set up your instance, make a note of the instance's host name. You can [find the host name in the Azure portal](../how-to-set-up-instance-portal.md#verify-success-and-collect-important-values).
