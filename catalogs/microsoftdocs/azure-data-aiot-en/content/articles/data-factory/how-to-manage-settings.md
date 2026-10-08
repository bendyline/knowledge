---
title: Managing Azure Data Factory settings and preferences
description: Learn how to manage Azure Data Factory settings and preferences.
author: n0elleli
ms.author: noelleli
ms.topic: tutorial
ms.date: 01/05/2024
ms.subservice: authoring
---

# Manage Azure Data Factory settings and preferences

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


You can change the default settings of your Azure Data Factory to meet your own preferences. 
Azure Data Factory settings are available in the Settings menu in the top right section of the global page header as indicated in the screenshot below. 

Screenshot of settings gear in top right corner of page banner.

Clicking the **Settings** gear button will open a flyout. 

Screenshot of settings flyout with three setting options.

Here you can find the settings and preferences that you can set for your data factory. 

## Theme

Choose your theme to change the look of the Azure Data Factory studio.

Screenshot of settings flyout with the Theme section highlighted.

Use the toggle button to select your data factory theme. This setting controls the look of your data factory. 

Screenshot of settings flyout with the Theme switched to Dark theme.

To apply changes, select your **Theme** and make sure to hit the **Ok** button. Your page will reflect the changes made. 

> **Note:**
> The new Dark theme is currently in public preview and is only available in Azure Data Factory.

## Language and Region

Choose your language and the regional format that will influence how data such as dates and currency will appear in your data factory. 

### Language

Use the drop-down list to select from the list of available languages. This setting controls the language you see for text throughout your data factory. There are 18 languages supported in addition to English. 

Screenshot of drop-down list of languages that users can choose from.

To apply changes, select a language and make sure to hit the **Apply** button. Your page will refresh and reflect the changes made. 

Screenshot of Apply button in the bottom left corner to make language changes.

> **Note:**
> Applying language changes will discard any unsaved changes in your data factory. 

### Regional Format

Use the drop-down list to select from the list of available regional formats. This setting controls the way dates, time, numbers, and currency are shown in your data factory. 

The default shown in **Regional format** will automatically change based on the option you selected for **Language**. You can still use the drop-down list to select a different format. 

Screenshot of drop-down list of regional formats that users can choose from.&#x20;

For example, if you select **English** as your language and select **English (United States)** as the regional format, currency will be show in U.S. (United States) dollars. If you select **English** as your language and select **English (Europe)** as the regional format, currency will be show in euros. 

To apply changes, select a **Regional format** and make sure to hit the **Apply** button. Your page will refresh and reflect the changes made. 

Screenshot of Apply button in the bottom left corner to make regional format changes.

> **Note:**
> Applying regional format changes will discard any unsaved changes in your data factory.

## Factory Settings

Additionally, you can set specific settings for your Data Factory. In the **Navigate** tab, you'll find **Factory settings** under **General**. In your Factory settings, you can adjust a few settings.

Screenshot of general Factory settings.

* **Show billing report**

You can select your preferences for your billing report under **Show billing report**. Choose to see your billing **by pipeline** or **by factory**. By default, this setting will be set to **by factory**.

* **Factory environment**

You can set different environment labels for your factory. Choose from **Development**, **Test**, or **Production**. By default, this setting will be set to **None**.

* **Staging**

You can set your **default staging linked service** and **default staging storage folder**. This can be overridden in your factory resource. 

## Related content
- [Manage the ADF preview experience](how-to-manage-studio-preview-exp.md)
- [Introduction to Azure Data Factory](introduction.md)
- [Build a pipeline with a copy activity](quickstart-create-data-factory-powershell.md)
- [Build a pipeline with a data transformation activity](tutorial-transform-data-spark-powershell.md)
