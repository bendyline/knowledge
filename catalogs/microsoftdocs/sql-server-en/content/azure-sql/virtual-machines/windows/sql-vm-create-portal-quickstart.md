---
title: Create SQL Server on a Windows Virtual Machine in the Azure Portal
description: This tutorial shows how to create a Windows virtual machine with SQL Server in the Azure portal.
author: MashaMSFT
ms.author: mathoma
ms.reviewer: dpless
ms.date: 03/18/2026
ms.service: azure-vm-sql-server
ms.subservice: deployment
ms.topic: quickstart
ms.custom:
  - mode-ui
  - sfi-image-nochange
tags: azure-resource-manager
---

# Quickstart: Create SQL Server on a Windows virtual machine in the Azure portal



  **Applies to:**    [SQL Server on Azure VM](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

> 
>
> * [Windows](sql-vm-create-portal-quickstart.md)
> * [Linux](../linux/sql-vm-create-portal-quickstart.md)

This quickstart steps through creating a SQL Server virtual machine (VM) in the Azure portal. Follow the article to deploy either a conventional SQL Server on Azure VM or SQL Server deployed to an [Azure confidential VM](sql-vm-create-confidential-vm-how-to.md).

> **Tip:**  
>
> - This quickstart provides a path for quickly provisioning and connecting to a SQL VM. For more information about other SQL VM provisioning choices, see the [Provisioning guide for SQL Server on Windows VMs in the Azure portal](create-sql-vm-portal.md).
> - If you have questions about SQL Server virtual machines, see the [Frequently Asked Questions](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/virtual-machines/windows/frequently-asked-questions-faq.yml).

<a id="subscription"></a>

## Get an Azure subscription

If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

<a id="select"></a>

## Select a SQL Server VM image

To create your SQL Server on Azure VM, follow these steps: 

1. Go to the [Azure SQL hub at aka.ms/azuresqlhub](https://aka.ms/azuresqlhub).
1. Under **SQL Server** select **SQL Server on Azure VMs** to open the **SQL Server on Azure VMs** page.
1. On the **SQL Server on Azure VMs** page, select **+ Create** to open the **SQL Server on Azure Virtual Machines** page.

   Screenshot of the SQL Server on Azure VMs page from the Azure SQL hub page in the Azure portal, showing the +Create button.

1. On the **SQL Server on Azure Virtual Machines** page, select an image offer from the dropdown list, and then use **Create virtual machine** to open the **Create a virtual machine** page. 




<a id="configure"></a>

## Provide basic details

The instructions for basic details vary between deploying a conventional SQL Server on Azure VM and [SQL Server on an Azure confidential VM](sql-vm-create-confidential-vm-how-to.md).

> **Note:**
> Self-installed SQL Server instances fail to start when you place `tempdb` on the local temp disk for Azure VM images with uninitialized ephemeral disks, such as the **FXmdsv2**. Deploy a SQL Server image through Azure Marketplace, use a different VM series, or use the [Azure VM ephemeral NVMe storage script](https://github.com/Azure-Samples/azuresandbox/tree/main/extras/scripts/vm-mssql-win/NVMe) to initialize drives before SQL Server starts. To learn more about the issue and see a list of affected VMs, review [SQL Server failures](https://learn.microsoft.com/troubleshoot/sql/azure-sql/sql-deployment-fails-drive-not-ready).

### [Conventional VM](#tab/conventional-vm)

To deploy a conventional SQL Server on Azure VM, on the **Basics** tab, provide the following information:

1. In the **Project Details** section, select your Azure subscription, and then select **Create new** to create a new resource group. Type *SQLVM-RG* for the name.

   Screenshot showing the Subscription section when creating your SQL VM in the Azure portal.

1. Under **Instance details**:
   1. Type *SQLVM* for the **Virtual machine name**.
   1. Choose a location for your **Region**.
   1. For the purpose of this quickstart, leave **Availability options** set to *No infrastructure redundancy required*. To find out more information about availability options, see [Availability](https://learn.microsoft.com/azure/virtual-machines/availability).
   1. In the **Image** list, select the image with the version of SQL Server and operating system you want. For example, you can use an image with a label that begins with *Free SQL Server License*.
   1. Choose to **See all sizes** for the **Size** of the virtual machine, and select the **A2 Basic** offering. Be sure to clean up your resources once you're done with them to prevent any unexpected charges.

   Screenshot showing the Instance details section when creating your SQL VM in the Azure portal.

1. Under **Administrator account**, provide a username such as *azureuser* and a password. The password must be at least 12 characters long and meet the [defined complexity requirements](https://learn.microsoft.com/azure/virtual-machines/windows/faq#what-are-the-password-requirements-when-creating-a-vm-).

   Screenshot showing the Administrator account section when creating your SQL VM in the Azure portal.

1. Under **Inbound port rules**, choose **Allow selected ports**, and then select **RDP (3389)** from the dropdown list.

   Screenshot showing the Inbound port rules section when creating your SQL VM in the Azure portal.

### [Confidential VM](#tab/confidential-vm)

To deploy your SQL Server to an Azure confidential VM, on the **Basics** tab, provide the following information:

1. In the **Project Details** section, select your Azure subscription, and then select **Create new** to create a new resource group. Type *SQLVM-RG* for the name.

   Screenshot showing the Subscription section when creating your SQL VM in the Azure portal.

1. Under **Instance details**:
   1. Type *SQLVM* for the **Virtual machine name**.
   1. Choose a location for your **Region**. To validate region supportability, look for the `ECadsv6-series` or `DCadsv6-series` in [VM products Available by Azure region](https://azure.microsoft.com/explore/global-infrastructure/products-by-region/?products=virtual-machines).
   1. For **Security type**, choose **Confidential virtual machines** from the dropdown list. If this option is grayed out, it's likely the chosen region doesn't currently support confidential VMs. Choose a different region from the dropdown list.
   1. For the purpose of this quickstart, leave **Availability options** set to *No infrastructure redundancy required*. To find out more information about availability options, see [Availability](https://learn.microsoft.com/azure/virtual-machines/availability).
   1. In the **Image** list, choose the `SQL Server 2022 Enterprise on Windows Server 2022 Database Engine Only` image. To change the SQL Server image, select **See all images**, and then filter by **Security type = Confidential VMs** to identify all SQL Server images that support confidential VMs.
   1. Leave the size at the default of `Standard_EC2ads_v6`. However, to see all available sizes, select **See all sizes** to identify all the VM sizes that support confidential VMs, as well as the sizes that don't.

   Screen shot of the Azure portal showing instance details.

1. Under **Administrator account**, provide a username such as *azureuser* and a password. The password must be at least 12 characters long and meet the [defined complexity requirements](https://learn.microsoft.com/azure/virtual-machines/windows/faq#what-are-the-password-requirements-when-creating-a-vm-).

   Screen shot of the Azure portal, Administrator account

1. Under **Inbound port rules**, choose **Allow selected ports**, and then select **RDP (3389)** from the dropdown list.

   Screen shot of the Azure portal, Inbound port rules.

### Disks

Configure confidential OS disk encryption. This is optional for test VMs but recommended for production environments. For greater details, review the [Quickstart: Deploy a confidential VM](https://learn.microsoft.com/azure/confidential-computing/quick-create-confidential-vm-portal-amd#create-confidential-vm).

1. On the tab **Disks**, configure the following settings:

   1. Under **Disk options**, enable **Confidential compute encryption** if you want to encrypt your VM's OS disk during creation.
   1. For **Confidential compute encryption type**, select the type of encryption to use.
   1. If **Confidential disk encryption with a customer-managed key** is selected, create a **Confidential disk encryption set** before creating your confidential VM.

1. (Optional) If necessary, create a **Confidential disk encryption set** as follows.

   1. [Create an Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/quick-create-portal). For the pricing tier, select **Premium (includes support for HSM backed keys)**, or [create an Azure Key Vault managed Hardware Security Module (HSM)](https://learn.microsoft.com/azure/key-vault/managed-hsm/quick-create-cli).

   1. In the Azure portal, search for and select **Disk Encryption Sets**.

   1. Select **Create**.

   1. For **Subscription**, select which Azure subscription to use.

   1. For **Resource group**, select or create a new resource group to use.

   1. For **Disk encryption set name**, enter a name for the set.

   1. For **Region**, select an available Azure region.

   1. For **Encryption type**, select **Confidential disk encryption with a customer-managed key**.

   1. For **Key Vault**, select the key vault you already created.

   1. Under **Key Vault**, select **Create new** to create a new key.

      > **Note:**  
      > If you selected an Azure managed HSM previously, [use PowerShell or the Azure CLI to create the new key](https://learn.microsoft.com/azure/confidential-computing/quick-create-confidential-vm-arm-amd) instead.

   1. For **Name**, enter a name for the key.

   1. For the key type, select **RSA-HSM**.

   1. Select your key size.

   1. Select **Create** to finish creating the key.

   1. Select **Review + create** to create a new disk encryption set. Wait for the resource creation to complete successfully.

   1. Go to the disk encryption set resource in the Azure portal.

   1. Select the pink banner to grant permissions to Azure Key Vault.

      > **Important:**  
      > You must perform this step to successfully create the confidential VM.

---

## SQL Server settings

On the **SQL Server settings** tab, configure the following options:

1. Under **Security & Networking**, select *Public (Internet)* for **SQL Connectivity**, and change the port to `1401` to avoid using a well-known port number in the public scenario.
1. Under **SQL Authentication**, select **Enable**. The SQL login credentials are set to the same user name and password that you configured for the VM. Use the default setting for [**Azure Key Vault integration**](azure-key-vault-integration-configure.md). **Storage configuration** isn't available for the basic SQL Server VM image, but you can find more information about available options for other images at [storage configuration](storage-configuration.md#new-vms).

   Screenshot showing the SQL Server security settings section when creating your SQL VM in the Azure portal.

1. Change any other settings if needed, and then select **Review + create**.

   Screenshot showing the Review + create section when creating your SQL VM in the Azure portal.

## Create the SQL Server VM

On the **Review + create** tab, review the summary, and select  **Create** to create SQL Server, resource group, and resources specified for this VM.

You can monitor the deployment from the Azure portal. The **Notifications** button at the top of the screen shows basic status of the deployment. Deployment can take several minutes.

## Connect to SQL Server

1. In the portal, find the **Public IP address** of your SQL Server VM in the **Overview** section of your virtual machine's properties.

1. On a different computer connected to the Internet, open [SQL Server Management Studio (SSMS)](https://learn.microsoft.com/ssms/sql-server-management-studio-ssms).

1. In the **Connect to Server** or **Connect to Database Engine** dialog box, edit the **Server name** value. Enter your VM's public IP address. Then add a comma and add the custom port (**1401**) that you specified when you configured the new VM. For example, `11.22.33.444,1401`.

1. In the **Authentication** box, select **SQL Server Authentication**.

1. In the **Login** box, type the name of a valid SQL login.

1. In the **Password** box, type the password of the login.

1. Select **Connect**.

   Screenshot of the Connect to Server window in SSMS.

<a id="remotedesktop"></a>

## Log in to the VM remotely

Use the following steps to connect to the SQL Server virtual machine with Bastion:


1. After the Azure virtual machine is created and running, select **Virtual machine**, and then choose your new VM. 

1. Select **Connect** and then choose **Connect via Bastion** from the dropdown list to go to the **Bastion** page for your VM. 

   Screenshot showing connect to VM in portal.

1. Select **Deploy Bastion** and wait for the process to finish. 

1. After [Bastion](https://learn.microsoft.com/azure/bastion/bastion-connect-vm-rdp-windows) is deployed successfully, choose the authentication type, enter authentication details, and then select **Connect**: 

   Screenshot showing connect with Bastion.

   You may need to disable the pop-up blocker in your browser to open the Bastion session in a new browser tab. 



After you connect to the SQL Server virtual machine, you can launch SQL Server Management Studio and connect with Windows Authentication using your local administrator credentials. If you enabled SQL Server Authentication, you can also connect with SQL Authentication using the SQL login and password you configured during provisioning.

Access to the machine enables you to directly change machine and SQL Server settings based on your requirements. For example, you could configure the firewall settings or change SQL Server configuration settings.

## Clean up resources

If you don't need your SQL VM to run continually, you can avoid unnecessary charges by stopping it when not in use. You can also permanently delete all resources associated with the virtual machine by deleting its associated resource group in the portal. This permanently deletes the virtual machine as well, so use this command with care. For more information, see [Manage Azure resources through portal](https://learn.microsoft.com/azure/azure-resource-manager/management/manage-resource-groups-portal).

## Next step

> 
> [Migration guide: SQL Server to SQL Server on Azure Virtual Machines](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/migration-guides/virtual-machines/sql-server-to-sql-on-azure-vm-individual-databases-guide.md)
