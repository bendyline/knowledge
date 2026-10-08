---
title: 'Create Package from App Gallery'
description: How to create package from App Gallery
search.appverid: MET150
author: Tinacyt
ms.author: tinachen
manager: rshastri
audience: Software-Vendor
ms.topic: troubleshooting
ms.date: 08/09/2023
ms.service: test-base
ms.localizationpriority: medium
ms.collection: TestBase-M365
ms.custom:
ms.reviewer: Tinacyt
f1.keywords: NOCSH
---

# Create Package from App Gallery 


> **Important:**
> **Test Base for Microsoft 365 will transition to end-of-life (EOL) on May 31, 2024.** We're committed to working closely with each customer to provide support and guidance to make the transition as smooth as possible. If you have any questions, concerns, or need assistance, [submit a support request](https://aka.ms/TestBaseSupport).


This section provides the steps necessary to onboard a package from App Gallery onto Test Base. 
> **Important:**
> If you do not have a Test Base account, you will need to create one before proceeding, as described in Creating a Test Base Account. 

In the [Azure portal](https://portal.azure.com/), go to the **Test
Base** account for which you will be creating and uploading your package
and perform the steps that follow.

In the left-hand menu under **Package catalog**, select the **New
package**. Then click the card '**Create package from App Gallery**'.

> 
> [Screenshot of create package from app gallery](https://github.com/MicrosoftDocs/microsoft-365-docs/blob/eab9d7696cdff87474698b08a1fb328091102a2f/microsoft-365/test-base/Media/create_package_from_gallery_1.png#lightbox)

**Step 1. Define content**

1.  In the **Package source** section, click on 'Select app from App Gallery - Winget' then there will be a slide bar pop-up on the right hand side.

    > 
    > [Screenshot of search from winget app gallery](https://github.com/MicrosoftDocs/microsoft-365-docs/blob/eab9d7696cdff87474698b08a1fb328091102a2f/microsoft-365/test-base/Media/create_package_from_gallery_2.png#lightbox)


2.  Then you can either scroll down or search for the applications which you'd like to test. You can also select the version of specific app in the Version drop down.

3.  Once you select the app by checking the box and clicking on the select button, there's a pop-up notification displaying the app license and disclaimer.

    > 
    > [Screenshot of accept the license](https://github.com/MicrosoftDocs/microsoft-365-docs/blob/eab9d7696cdff87474698b08a1fb328091102a2f/microsoft-365/test-base/Media/create_package_from_gallery_3.png#lightbox)


4.  By clicking on the 'Accept' button, the app will be auto uploaded while the package name and package version will be auto-populated.
    You can also modify the package name and version as needed.

    > 
    > [Screenshot of basic information](https://github.com/MicrosoftDocs/microsoft-365-docs/blob/eab9d7696cdff87474698b08a1fb328091102a2f/microsoft-365/test-base/Media/create_package_from_gallery_4.png#lightbox)

    > **Note:**
    > The combination of package name and version must be unique within your Test Base account.

5.  After all the requested information is specified, you can proceed to the next phase by clicking the **Next: Configure test** button.

    > 
    > [Screenshot of the button of configure test](https://github.com/MicrosoftDocs/microsoft-365-docs/blob/eab9d7696cdff87474698b08a1fb328091102a2f/microsoft-365/test-base/Media/create_package_from_gallery_5.png#lightbox)


**Step 2. Configure test**

1.  For now, only **Out of Box (OOB)** **test** is supported for the Winget package:

    > An **Out of Box (OOB)** **test** performs an install, launch, close,
    > and uninstall of your package. After the install, the launch-close
    > routine is repeated 30 times before a single uninstall is run. The OOB
    > test provides you with standardized telemetry on your package to
    > compare across Windows builds.
    >
    > 
    > [Screenshot of configure test for new package](https://github.com/MicrosoftDocs/microsoft-365-docs/blob/eab9d7696cdff87474698b08a1fb328091102a2f/microsoft-365/test-base/Media/create_package_from_gallery_6.png#lightbox)

2.  Once all required information is filled out, you can proceed to step 3 by
    clicking the Next button at the bottom.

For next steps, please refer to the [Creating and Testing Binary Files on Test Base \| Microsoft Learn](testapplication.md).
