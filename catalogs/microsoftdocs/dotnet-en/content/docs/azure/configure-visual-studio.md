---
title: Configure Visual Studio for Azure Development with .NET
description: This article helps you configure Visual Studio for Azure development including getting the right workloads installed and connecting Visual Studio to your Azure account.
ms.topic: concept-article
ms.custom: devx-track-dotnet, engagement-fy23
ms.date: 03/20/2026
---

# Configure Visual Studio for Azure development with .NET

Visual Studio includes tooling to help with the development and deployment of applications on Azure. This guide helps you make sure that Visual Studio is properly configured for Azure development.

## Download Visual Studio

If you already have Visual Studio installed, you can skip this step.

> 
> [Download Visual Studio](https://www.visualstudio.com/downloads/)

## Install Azure workloads

Open Visual Studio Installer and validate that the workloads **Azure development**† and **ASP.NET and web development** are installed. If either of these workloads isn't installed, select them to be installed.

Screenshot of the Visual Studio Installer showing the Azure development and ASP.NET and Web Development Workloads selected

†The **Azure development** workload is currently unavailable in the Windows 11 Arm64 build of Visual Studio 2022.

## Authenticate Visual Studio with Azure


Developers using Visual Studio 2017 or later can authenticate using their developer account through the IDE. Apps using [Azure.Identity.DefaultAzureCredential](https://learn.microsoft.com/search/?terms=Azure.Identity.DefaultAzureCredential) or [Azure.Identity.VisualStudioCredential](https://learn.microsoft.com/search/?terms=Azure.Identity.VisualStudioCredential) can discover and use this account to authenticate app requests when running locally. This account is also used when you publish apps directly from Visual Studio to Azure.

> **Important:**
> You'll need to [install the **Azure development** workload](configure-visual-studio.md#install-azure-workloads) to enable Visual Studio tooling for Azure authentication, development, and deployment.

1. Inside Visual Studio, navigate to **Tools** > **Options** to open the options dialog.
1. In the **Search Options** box at the top, type *Azure* to filter the available options.
1. Under **Azure Service Authentication**, choose **Account Selection**.
1. Select the drop-down menu under **Choose an account** and choose to add a Microsoft account.
1. In the window that opens, enter the credentials for your desired Azure account, and then confirm your inputs.

    A screenshot showing how to sign-in to Azure using Visual Studio.

1. Select **OK** to close the options dialog.


## Next steps

If you also use [Visual Studio Code](https://code.visualstudio.com/) for development in .NET or any other language, you should [configure Visual Studio Code for Azure development](configure-vs-code.md). Otherwise, proceed to [Installing the Azure CLI](install-azure-cli.md).
