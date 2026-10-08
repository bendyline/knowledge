---
# Required metadata
# For more information, see https://review.learn.microsoft.com/en-us/help/platform/learn-editor-add-metadata?branch=main
# For valid values of ms.service, ms.prod, and ms.topic, see https://review.learn.microsoft.com/en-us/help/platform/metadata-taxonomies?branch=main

title: Enable audio only mode in the ACS UI library
description: Enabling audio only calling experiences
author:      ahammer # GitHub alias
ms.author:   adamhammer # Microsoft alias
ms.service: azure-communication-services
ms.topic: how-to
ms.date:     01/08/2024
ms.subservice: calling
zone_pivot_groups: acs-programming-languages-support-kotlin-swift
---

# Enable audio only mode in the ACS UI library


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


The UI Library allows you to modify the Audio Video mode of a Call for a local user. 

In this article, you learn how to enable Audio only mode, which disables local and remote video capabilities.

## Prerequisites

- Application utilizing the ACS Calling UI SDK
**or**
- Completion of the [quickstart for getting started with the ACS UI Library composites](../../quickstarts/ui-library/get-started-composites.md).

## Set up the features

**Applies to: programming-language-kotlin**

```
// Create a Call Composite Local Options
val options = CallCompositeLocalOptions()

// Set the Audio Video Mode to Audio Only
options.setAudioVideoMode(CallCompositeAudioVideoMode.AUDIO_ONLY)
```


**Applies to: programming-language-swift**

```
// Set the Audio Mode when creating the Local Options
let localOptions = LocalOptions(..., audioVideoMode: .audioOnly)
```


## Next steps

- [Learn more about the UI Library](../../concepts/ui-library/ui-library-overview.md)
