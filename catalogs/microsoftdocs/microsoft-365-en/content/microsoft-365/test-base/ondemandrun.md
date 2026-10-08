---
title: 'Run your test on-demand'
description: How to run your test on-demand
search.appverid: MET150
author: Tinacyt
ms.author: tinachen
manager: rshastri
audience: Software-Vendor
ms.topic: troubleshooting
ms.date: 08/10/2022
ms.service: test-base
ms.localizationpriority: medium
ms.collection: TestBase-M365
ms.custom:
ms.reviewer: Tinacyt
f1.keywords: NOCSH
---

# Run your test on-demand


> **Important:**
> **Test Base for Microsoft 365 will transition to end-of-life (EOL) on May 31, 2024.** We're committed to working closely with each customer to provide support and guidance to make the transition as smooth as possible. If you have any questions, concerns, or need assistance, [submit a support request](https://aka.ms/TestBaseSupport).


> **Note:**
> Test Base now provides the option to kickoff a test with an on-demand approach.

## Run as request under Manage packages

For an active package, you can access the run-on-request feature from the Manage packages page.

> 
> [ Manage packages ](https://github.com/MicrosoftDocs/microsoft-365-docs/blob/eab9d7696cdff87474698b08a1fb328091102a2f/microsoft-365/test-base/Media/runondemand01-managepackages.png#lightbox)

By specifying the OS update type and Windows product which are pre-defined with the package, you can kick off the test on demand which immediately gets scheduled for the current monthly churn of Windows updates.


> 
> [ Run on request ](https://github.com/MicrosoftDocs/microsoft-365-docs/blob/eab9d7696cdff87474698b08a1fb328091102a2f/microsoft-365/test-base/Media/runondemand02-runonrequest.png#lightbox)

You don't need the test to be executed with its automatic cadence before you can use the feature. You can now decide which product and when to be tested.

> 
> [ Testsummary ](https://github.com/MicrosoftDocs/microsoft-365-docs/blob/eab9d7696cdff87474698b08a1fb328091102a2f/microsoft-365/test-base/Media/runondemand03-testsummary.png#lightbox)

> **Note:**
> Please be remind that only active packages will have Run on request button enabled. Make sure you Enable the package for future tests if you would like to opt-in the package for this feature.
