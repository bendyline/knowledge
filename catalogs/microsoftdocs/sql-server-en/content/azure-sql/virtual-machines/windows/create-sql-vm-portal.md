---
title: "Provision SQL Server on Azure VM (Azure Portal)"
description: This detailed guide explains available configuration options when deploying your SQL Server on Azure VM by using the Azure portal.
author: MashaMSFT
ms.author: mathoma
ms.reviewer: dpless
ms.date: 03/18/2026
ms.service: azure-vm-sql-server
ms.subservice: deployment
ms.topic: how-to
ms.custom:
  - sfi-image-nochange
  - ignite-2025
tags: azure-resource-manager
---
# Provision SQL Server on Azure VM (Azure portal)



  **Applies to:**    [SQL Server on Azure VM](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

This article provides a detailed description of the available configuration options when deploying your SQL Server on Azure Virtual Machines (VMs) by using the Azure portal. For a quick guide, see the [SQL Server VM quickstart](sql-vm-create-portal-quickstart.md) instead.

## Prerequisites

An Azure subscription. Create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) to get started.

<a id="select"></a>

## Choose Marketplace image

Use the Azure Marketplace to choose one of several pre-configured images from the virtual machine gallery.

The Developer edition is used in this article because it's a full-featured, free edition of SQL Server for development testing. You pay only for the cost of running the VM. However, you're free to choose any of the images to use in this walkthrough. For a description of available images, see the [SQL Server Windows Virtual Machines overview](sql-server-on-azure-vm-iaas-what-is-overview.md#sql-vm-images-and-licensing).

> **Note:**  
> SQL Server 2025 introduces separate Enterprise Developer and Standard Developer editions of SQL Server.

Licensing costs for SQL Server are incorporated into the per-second pricing of the VM you create and varies by edition and cores. However, SQL Server Developer edition is free for development and testing but not production. Also, SQL Express is free for lightweight workloads (less than 1 GB of memory, less than 10 GB of storage). You can also allocate your SQL Server license to your SQL Server on Azure VM with the [Azure Hybrid Benefit](sql-server-on-azure-vm-iaas-what-is-overview.md#azure-hybrid-benefit) and pay only for the VM. For more information on these options, see [Pricing guidance for SQL Server Azure VMs](pricing-guidance.md).

To choose an image, follow these steps:

1. Go to the [Azure SQL hub at aka.ms/azuresqlhub](https://aka.ms/azuresqlhub).
1. Under **SQL Server** select **SQL Server on Azure VMs** to open the **SQL Server on Azure VMs** page.
1. On the **SQL Server on Azure VMs** page, select **+ Create** to open the **SQL Server on Azure Virtual Machines** page.

   Screenshot of the SQL Server on Azure VMs page from the Azure SQL hub page in the Azure portal, showing the +Create button.

1. On the **SQL Server on Azure Virtual Machines** page, select an image offer from the dropdown list, and then use **Create virtual machine** to open the **Create a virtual machine** page. 




> **Note:**
> SQL Server 2012 and SQL Server 2014 are out of mainstream support and no longer available from Azure Marketplace.


## Basic settings

> **Note:**
> Self-installed SQL Server instances fail to start when you place `tempdb` on the local temp disk for Azure VM images with uninitialized ephemeral disks, such as the **FXmdsv2**. Deploy a SQL Server image through Azure Marketplace, use a different VM series, or use the [Azure VM ephemeral NVMe storage script](https://github.com/Azure-Samples/azuresandbox/tree/main/extras/scripts/vm-mssql-win/NVMe) to initialize drives before SQL Server starts. To learn more about the issue and see a list of affected VMs, review [SQL Server failures](https://learn.microsoft.com/troubleshoot/sql/azure-sql/sql-deployment-fails-drive-not-ready).

The **Basics** tab allows you to select the subscription, resource group, and instance details.

Using a new resource group is helpful if you're just testing or learning about SQL Server deployments in Azure. After you finish with your test, delete the resource group to automatically delete the VM and all resources associated with that resource group. For more information about resource groups, see [Azure Resource Manager Overview](https://learn.microsoft.com/azure/active-directory-b2c/overview).

On the **Basics** tab, provide the following information:

- Under **Project Details**, make sure the correct subscription is selected.
- In the **Resource group** section, either select an existing resource group from the list or choose **Create new** to create a new resource group. A resource group is a collection of related resources in Azure (virtual machines, storage accounts, virtual networks, etc.).

  Screenshot from the Azure portal of the Create a virtual machine page, starting with the Subscription field.

- Under **Instance details**:

  1. Enter a unique **Virtual machine name**.
  1. Choose a location for your **Region**.
  1. For the purpose of this guide, leave **Availability options** set to *No infrastructure redundancy required*. To find out more information about availability options, see [Availability](https://learn.microsoft.com/azure/virtual-machines/availability).
  1. In the **Image** list, select *Free SQL Server License: SQL Server 2025 Enterprise Developer on Windows Server 2025* if it's not already selected.
  1. Choose **Standard** for **Security type**.
  1. Select **See all sizes** for the **Size** of the virtual machine and search for the **E4ds_v5** offering. This is one of the minimum recommended VM sizes for SQL Server on Azure VMs. If this is for testing purposes, be sure to clean up your resources once you're done with them to prevent any unexpected charges. For production workloads, see the recommended machine sizes and configuration in [Performance best practices for SQL Server in Azure Virtual Machines](performance-guidelines-best-practices-vm-size.md).

  Screenshot from the Azure portal of instance details for a new SQL VM.

> **Important:**  
> The estimated monthly cost displayed on the **Choose a size** window doesn't include SQL Server licensing costs. This estimate is the cost of the VM alone. For the Express and Developer editions of SQL Server, this estimate is the total estimated cost. For other editions, see the [Windows Virtual Machines pricing page](https://azure.microsoft.com/pricing/details/virtual-machines/windows/) and select your target edition of SQL Server. Also see the [Pricing guidance for SQL Server Azure VMs](pricing-guidance.md) and [Sizes for virtual machines](https://learn.microsoft.com/azure/virtual-machines/sizes?toc=%2fazure%2fvirtual-machines%2fwindows%2ftoc.json).

- Under **Administrator account**, provide a username and password. The password must be at least 12 characters long and meet the [defined complexity requirements](https://learn.microsoft.com/azure/virtual-machines/windows/faq#what-are-the-password-requirements-when-creating-a-vm-).

  Screenshot from the Azure portal of the Administrator account fields.

- Under **Inbound port rules**, choose **Allow selected ports**, and then select **RDP (3389)** from the dropdown list.

  Screenshot from the Azure portal of inbound port rules.

You also have the option to enable the [Azure Hybrid Benefit](https://learn.microsoft.com/azure/virtual-machines/windows/hybrid-use-benefit-licensing), which grants you a discount on the allocation of SQL Server licenses to your SQL Server on Azure VM.

## Disks

On the **Disks** tab, configure your disk options.

- Under **OS disk type**, select the type of disk you want for your OS from the dropdown list. Premium is recommended for production systems but isn't available for a Basic VM. To use a Premium SSD, change the virtual machine size.
- Under **Advanced**, select **Yes** under use **Managed Disks**.

Microsoft recommends Managed Disks for SQL Server. Managed Disks handles storage behind the scenes. In addition, when virtual machines with Managed Disks are in the same availability set, Azure distributes the storage resources to provide appropriate redundancy. For more information, see [Azure Managed Disks Overview](https://learn.microsoft.com/azure/virtual-machines/managed-disks-overview). For specifics about managed disks in an availability set, see [Use managed disks for VMs in availability set](https://learn.microsoft.com/azure/virtual-machines/availability).

## Networking

On the **Networking** tab, configure your networking options.

- Create a new **virtual network** or use an existing virtual network for your SQL Server VM. Designate a **Subnet** as well.

- Under **NIC network security group**, select either a basic security group or the advanced security group. Choosing the basic option allows you to select inbound ports for the SQL Server VM, which are the same values configured on the **Basic** tab. Selecting the advanced option allows you to choose an existing network security group or create a new one.

- You can make other changes to network settings or keep the default values.

## Management

On the **Management** tab, configure monitoring and auto-shutdown.

- Azure enables **Boot diagnostics** by default with the same storage account designated for the VM. On this tab, you can change these settings and enable **OS guest diagnostics**.
- You can also enable **System assigned managed identity** and **auto-shutdown** on this tab.

## SQL Server settings

On the **SQL Server settings** tab, configure specific settings and optimizations for SQL Server. You can configure the following settings for SQL Server:

- [Connectivity](#connectivity)
- [Authentication](#authentication)
- [Azure Key Vault integration](#azure-key-vault-integration)
- [Storage configuration](#storage-configuration)
- [SQL instance settings](#sql-instance-settings)
- [Automated patching](#automated-patching)
- [Automated backup](#automated-backup)
- [R Services (Advanced Analytics)](#r-services-advanced-analytics)

### Connectivity

Under **SQL connectivity**, specify the type of access you want for the SQL Server instance on this VM. For the purposes of this walkthrough, select **Public (internet)** to allow connections to SQL Server from machines or services on the internet. With this option selected, Azure automatically configures the firewall and the network security group to allow traffic on the port selected.

> **Tip:**  
> By default, SQL Server listens on a well-known port, **1433**. For increased security, change the port in the previous dialog to listen on a non-default port, such as 1401. If you change the port, you must connect using that port from any client tools, such as SQL Server Management Studio (SSMS).

Screenshot from the Azure portal of SQL VM Security.

To connect to SQL Server via the internet, you also must enable SQL Server Authentication, which is described in the next section.

If you would prefer to not enable connections to the Database Engine via the internet, choose one of the following options:

- **Local (inside VM only)** to allow connections to SQL Server only from within the VM.
- **Private (within Virtual Network)** to allow connections to SQL Server from machines or services in the same virtual network.

In general, improve security by choosing the most restrictive connectivity that your scenario allows. But all the options are securable through network security group (NSG) rules and SQL/Windows Authentication. You can edit the NSG after the VM is created. For more information, see [Security Considerations for SQL Server in Azure Virtual Machines](security-considerations-best-practices.md).

### Authentication

If you require SQL Server Authentication, select **Enable** under **SQL Authentication** on the **SQL Server settings** tab.

Screenshot from the Azure portal of the SQL Server authentication options enabled.

> **Note:**  
> If you plan to access SQL Server over the internet (the Public connectivity option), you must enable SQL Authentication here. Public access to the SQL Server requires SQL Authentication.

If you enable SQL Server Authentication, specify a **Login name** and **Password**. This login name is configured as a SQL Server Authentication login and a member of the **sysadmin** fixed server role. For more information about Authentication Modes, see [Choose an Authentication Mode](https://learn.microsoft.com/sql/relational-databases/security/choose-an-authentication-mode).

If you prefer not to enable SQL Server Authentication, you can use the local Administrator account on the VM to connect to the SQL Server instance.

### Azure Key Vault integration

To store security secrets in Azure for encryption, select **SQL Server settings**, and scroll down to  **Azure key vault integration**. Select **Enable** and fill in the requested information.

Screenshot from the Azure portal of Azure Key Vault integration.

The following table lists the parameters required to configure Azure Key Vault (AKV) Integration.

| Parameter | Description | Example |
| --- | --- | --- |
| **Key Vault URL** | The location of the key vault. | `https://contosokeyvault.vault.azure.net/` |
| **Principal name** | Microsoft Entra service principal name. This name is also referred to as the Client ID. | `fde2b411-33d5-4e11-af04eb07b669ccf2` |
| **Principal secret** | Microsoft Entra service principal secret. This secret is also referred to as the Client Secret. | `9VTJSQwzlFepD8XODnzy8n2V01Jd8dAjwm/azF1XDKM=` |
| **Credential name** | **Credential name**: AKV Integration creates a credential within SQL Server and allows the VM to access the key vault. Choose a name for this credential. | `mycred1` |

For more information, see [Configure Azure Key Vault Integration for SQL Server on Azure VMs](azure-key-vault-integration-configure.md).

### Storage configuration

On the **SQL Server settings** tab, under **Storage configuration**, select **Change configuration** to open the **Configure storage** page and specify storage requirements. You can choose to leave the values at default, or you can manually change the storage topology to suit your IOPS needs. For more information, see [Storage configuration](storage-configuration.md).

Screenshot that highlights where you can change the storage configuration.

Under **Data storage**, choose the location for your data drive, the disk type, and the number of disks. You can also select the checkbox to store your system databases on your data drive instead of the local C:\ drive.

Screenshot that shows where you can configure the data files storage for your SQL VM.

Under **Log storage**, you can use the same drive as the data drive for your transaction log files, or choose a separate drive from the dropdown list. You can also choose the name of the drive, the disk type, and the number of disks.

Screenshot that shows where you can configure the transaction log storage for your SQL VM.

Configure your `tempdb` database settings under **TempDb storage**, such as the location of the database files, as well as the number of files, initial size, and autogrowth size in MB.

- Currently, during deployment, the max number of `tempdb` files is 8. More files can be added after the SQL Server VM is deployed.
- If you configure the SQL Server instance `tempdb` on the D: local SSD volume as recommended, the SQL IaaS Agent extension will manage the folder and permissions needed upon re-provisioning.

Screenshot that shows where you can configure the tempdb storage for your SQL VM.

Select **OK** to save your storage configuration settings.

### SQL instance settings

Select **Change SQL instance settings** to modify SQL Server configuration options, such as the server collation, max degree of parallelism (MAXDOP), SQL Server min and max memory limits, and whether you want to enable the **optimize for ad hoc workloads** option.

Screenshot that shows where you can configure the SQL Server settings for your SQL VM instance.

### SQL Server license

If you're a Software Assurance customer, you can use the [Azure Hybrid Benefit](https://azure.microsoft.com/pricing/hybrid-benefit/) to get a discount on the allocation of SQL Server licenses to your SQL Server on Azure VM. Select **Yes** to enable the Azure Hybrid Benefit, and then confirm that you have Software Assurance by selecting the checkbox.

Screenshot from the Azure portal of the SQL VM License options.

If you chose a free license image, such as the developer edition, the **SQL Server license** option is grayed out.

### Automated patching

**Automated patching** is disabled by default. [Automated Patching](automated-patching.md) allows Azure to automatically apply SQL Server and operating system security updates. If you want Azure to automatically patch SQL Server and the operating system, select **Enable**. Specify a day of the week, time, and duration for a maintenance window. Azure performs patching in this maintenance window. 

Screenshot from the Azure portal of SQL VM automated patching.

For improved patching management, which also includes Cumulative Updates, try the integrated [Azure Update Manager](../azure-update-manager-sql-vm.md) experience after your SQL Server VM finishes deployment. For more information about all supported update methods, see [Updating SQL Server on Azure VMs](servicing-updates-guidelines.md).

### Automated backup

Enable automatic database backups for all databases under **Automated backup**. Automated backup is disabled by default.

When you enable SQL automated backup, you can configure the following settings:

- Retention period for backups (up to 90 days)
- Storage account and storage container, to use for backups
- Encryption option and password for backups
- Backup system databases
- Configure backup schedule

To encrypt the backup, select **Enable**. Then specify the **Password**. Azure creates a certificate to encrypt the backups and uses the specified password to protect that certificate.

Choose **Select Storage Container** to specify the container where you want to store your backups.

By default the schedule is set automatically, but you can create your own schedule by selecting **Manual**. This allows you to configure the backup frequency, backup time window, and the log backup frequency in minutes.

Screenshot from the Azure portal of SQL VM automated backups.

For more information, see [Automated Backup for SQL Server in Azure Virtual Machines](automated-backup-sql-2014.md).

### R Services (Advanced Analytics)

You have the option to enable [SQL Server Machine Learning Services (In-Database)](https://learn.microsoft.com/sql/advanced-analytics/). This option lets you use machine learning with Python and R in SQL Server 2017 and later versions. Select **Enable** on the **SQL Server Settings** window. Enabling this feature from the Azure portal after the SQL Server VM is deployed triggers a restart of the SQL Server service.

## Review + create

On the **Review + create** tab:

1. Review the summary.
1. Select **Create** to create the SQL Server, resource group, and resources specified for this VM.

You can monitor the deployment from the Azure portal. The **Notifications** button at the top of the screen shows basic status of the deployment.

> **Note:**  
> An example of time for Azure to deploy a SQL Server VM: A test SQL Server VM provisioned to the East US region with default settings takes approximately 12 minutes to complete. You might experience faster or slower deployment times based on your region and selected settings.

<a id="remotedesktop"></a>

## Open the VM with Bastion

Use the following steps to connect to the SQL Server virtual machine with [Bastion](https://learn.microsoft.com/azure/bastion/bastion-connect-vm-rdp-windows):


1. After the Azure virtual machine is created and running, select **Virtual machine**, and then choose your new VM. 

1. Select **Connect** and then choose **Connect via Bastion** from the dropdown list to go to the **Bastion** page for your VM. 

   Screenshot showing connect to VM in portal.

1. Select **Deploy Bastion** and wait for the process to finish. 

1. After [Bastion](https://learn.microsoft.com/azure/bastion/bastion-connect-vm-rdp-windows) is deployed successfully, choose the authentication type, enter authentication details, and then select **Connect**: 

   Screenshot showing connect with Bastion.

   You may need to disable the pop-up blocker in your browser to open the Bastion session in a new browser tab. 



After you connect to the SQL Server virtual machine, you can launch SQL Server Management Studio and connect with Windows Authentication using your local administrator credentials. If you enabled SQL Server Authentication, you can also connect with SQL Authentication using the SQL login and password you configured during provisioning.

Access to the machine enables you to directly change machine and SQL Server settings based on your requirements. For example, you could configure the firewall settings or change SQL Server configuration settings.

<a id="connect"></a>

## Connect to SQL Server remotely

In this walkthrough, you selected **Public** access for the virtual machine and **SQL Server Authentication**. These settings automatically configured the virtual machine to allow SQL Server connections from any client over the internet (assuming they have the correct SQL login).

The following sections show how to connect over the internet to your SQL Server VM instance.

### Configure a DNS Label for the public IP address

To connect to the SQL Server Database Engine from the Internet, consider creating a DNS Label for your public IP address. You can connect by IP address, but the DNS Label creates an A Record that is easier to identify and abstracts the underlying public IP address.

> **Note:**
> DNS Labels are not required if you plan to only connect to the SQL Server instance within the same Virtual Network or only locally.

To create a DNS Label, first select **Virtual machines** in the portal. Select your SQL Server VM to bring up its properties.

1. In the virtual machine overview, select your **Public IP address**.

    public ip address

1. In the properties for your Public IP address, expand **Configuration**.

1. Enter a DNS Label name. This name is an A Record that can be used to connect to your SQL Server VM by name instead of by IP Address directly.

1. Select the **Save** button.

    dns label

### Connect to the Database Engine from another computer

1. On a computer connected to the internet, open SQL Server Management Studio (SSMS). If you do not have SQL Server Management Studio, you can [download it](https://learn.microsoft.com/ssms/install/install).

1. In the **Connect to Server** or **Connect to Database Engine** dialog box, edit the **Server name** value. Enter the IP address or full DNS name of the virtual machine (determined in the previous task). You can also add a comma and provide SQL Server's TCP port. For example, `tutorial-sqlvm1.westus2.cloudapp.azure.com,1433`.

1. In the **Authentication** box, select **SQL Server Authentication**.

1. In the **Login** box, type the name of a valid SQL login.

1. In the **Password** box, type the password of the login.

1. Select **Connect**.

    ssms connect

  > **Note:**  
  > This example uses the common port 1433. However, this value will need to be modified if a different port (such as 1401) was specified during the deployment of the SQL Server VM.

## Known Issues

### I'm unable to change the SQL Binary files installation path

SQL Server images from Azure Marketplace install the SQL Server binaries to the C drive. It isn't currently possible to change this during deployment. The only available workaround is to manually uninstall SQL Server from within the VM, then reinstall SQL Server and choose a different location for the binary files during the installation process.

## Related content

- [Updating SQL Server on Azure VMs](servicing-updates-guidelines.md)
- [What is SQL Server on Azure Windows Virtual Machines?](sql-server-on-azure-vm-iaas-what-is-overview.md)
- [Frequently asked questions for SQL Server on Azure VMs](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/virtual-machines/windows/frequently-asked-questions-faq.yml)
- [Checklist: Best practices for SQL Server on Azure VMs](performance-guidelines-best-practices-checklist.md)
