---
title: "Considerations for Installing SQL Server Using SysPrep"
description: SQL Server SysPrep allows you to prepare a stand-alone instance of SQL Server on a computer and to complete the configuration later.
author: rwestMSFT
ms.author: randolphwest
ms.date: 06/03/2025
ms.service: sql
ms.subservice: install
ms.topic: install-set-up-deploy
ms.custom:
  - intro-installation
monikerRange: ">=sql-server-2017"
---
# Considerations for installing SQL Server using SysPrep


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows


 SQL Server 
 SysPrep allows you to prepare a stand-alone instance of  SQL Server 
 on a computer and to complete the configuration at a later time. SysPrep involves a two-step process to get to a configured stand-alone instance of  SQL Server 
. The steps include:

- [Prepare image](#prepare-image)

  This step stops the installation process after the product binaries are installed, without configuring the computer, network, or account-specific information for the instance of  SQL Server 
 that is being prepared.

- [Complete Image](#complete-image)

  This step enables you to complete the configuration of a prepared instance of  SQL Server 
. During this step, you can provide the computer, network, and account-specific information.

For more information about how to install  SQL Server 
 using SysPrep, see [Install SQL Server with SysPrep](install-sql-server-using-sysprep.md).

## Common uses for SQL Server SysPrep

You can use the  SQL Server 
 SysPrep capability in any of the following ways:

- By using the Prepare Image step, you can prepare one or more unconfigured instances of  SQL Server 
 on the same computer. You can configure these prepared instances by using the Complete Image step on the same computer.

- You can capture the  SQL Server 
 Setup configuration file of the prepared instance and use it to prepare other unconfigured  SQL Server 
 instances on multiple computers for later configuration.

- In combination with the Windows System Preparation tool (also known as Windows SysPrep); you can create an image of the operating system including the unconfigured prepared instances of  SQL Server 
 on the source computer. You can then deploy the operating system image to multiple computers. After you complete the configuration of the operating system, you can configure the prepared instances by using the Complete Image step of  SQL Server 
 Setup.

  The Windows SysPrep tool is used to prepare Windows operating system images. It's used to capture a customized image of the operating system for deployment throughout an organization. For more information about SysPrep and its uses, see [SysPrep](https://learn.microsoft.com/windows-hardware/manufacture/desktop/sysprep--system-preparation--overview).

## Installation media considerations

If you're using a full version of  SQL Server 
, consider:

- Non-Express editions of  SQL Server 
:

  - The Prepare Image step uses 
 SQL Server Evaluation  edition to install the product binaries. When the instance is completed, the edition of  SQL Server 
 depends on the product ID provided during the complete image step.

  - If you provide a 
 SQL Server Evaluation  edition product ID, the evaluation period is set to expire 180 days after the prepared instance is completed.

-  SQL Server Express 
 editions:

  - To prepare an instance of  SQL Server Express 
 edition, use the Express installation media.

  - You can't specify a Product ID for a prepared instance of  SQL Server Express 
 edition.

## Supported SQL Server installations

SysPrep in  SQL Server 
 supports all features, including tools.

You can prepare multiple instances for side-by-side installations of  SQL Server 
 or earlier versions. The features of these instances must support SysPrep.

The  SQL Server 
 Native Client is automatically installed and completed at the end of the prepare image step.

 SQL Server 
 Browser and  SQL Server 
 Writer are automatically prepared when you prepare an instance of  SQL Server 
. They're completed when you complete the  SQL Server 
 instance by using the Complete Image step.

For a list of features supported by the editions of  SQL Server 
 on Windows, see:

- [Editions and supported features of SQL Server 2025](../../sql-server/editions-and-components-of-sql-server-2025.md)
- [Editions and supported features of SQL Server 2022](../../sql-server/editions-and-components-of-sql-server-2022.md)
- [Editions and supported features of SQL Server 2019](../../sql-server/editions-and-components-of-sql-server-2019.md)
- [Editions and supported features of SQL Server 2017](../../sql-server/editions-and-components-of-sql-server-2017.md)


You can perform an edition upgrade while configuring a prepared instance of  SQL Server 
. This option isn't supported for  SQL Server Express 
 editions.

Beginning in  SQL Server 2014 (12.x)
,  SQL Server 
 SysPrep supports  SQL Server 
 failover cluster installations from the command line.

## SQL Server SysPrep limitations

Repairing a prepared instance isn't supported. If Setup fails during the Prepare Image or Complete Image step, you must run uninstall.

<a id="BKMK_PrepareImage"></a>

## Prepare image

The Prepare Image step installs the  SQL Server 
 product and features but doesn't configure the installation.

The  SQL Server 
 features to be installed and the installation location for  SQL Server 
 product installation files can be specified during this step. You can prepare an instance of  SQL Server 
 either through the **Image Preparation of a stand-alone instance for SysPrep deployment** on the **Advanced** page of the **Installation Center** or from the command prompt.

- You can prepare multiple instances of  SQL Server 
 on the same computer that can be completed later.

- You can add or remove features that are supported for SysPrep installations from the existing prepared instances of  SQL Server 
.

After the instance is prepared, a shortcut on the **Start** menu becomes available to complete the configuration of the prepared instance of  SQL Server 
.

<a id="BKMK_CompleteImage"></a>

## Complete image

You can complete the prepared instances of  SQL Server 
 by using either of the following methods:

- Use the shortcut on the Start menu.

- Access the **Image completion of a prepared stand-alone instance** step on the **Advanced** page of the **Installation Center**.

## Related content

- [Plan a SQL Server installation](../../sql-server/install/planning-a-sql-server-installation.md)
