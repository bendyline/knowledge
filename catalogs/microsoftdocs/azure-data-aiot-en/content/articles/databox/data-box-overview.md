---
title: Microsoft Azure Data Box overview | Microsoft Docs in data 
description: Describes Azure Data Box, a cloud solution that enables you to transfer massive amounts of data into Azure
services: databox
author: stevenmatthew

ms.service: azure-data-box
ms.topic: overview
ms.date: 03/04/2025
ms.author: shaas
zone_pivot_groups: data-box-sku
ms.custom:
  - references_regions
  - sfi-image-nochange
#Customer intent: As an IT admin, I need to understand what Data Box is and how it works so I can use it to import on-premises data into Azure or export data from Azure.
# Customer intent: "As a data administrator, I want to leverage Azure Data Box for transferring large volumes of data into and out of Azure, so that I can efficiently manage data migrations and backups in scenarios with limited network connectivity."
---
# What is Azure Data Box?

**Applies to: dbx-ng**




[2-Minute demonstration video introducing Azure Data Box - click to play!](https://youtu.be/trBZN7hVeOE)


The Microsoft Azure Data Box cloud solution lets you send terabytes of data into and out of Azure in a quick, inexpensive, and reliable way. The secure data transfer is accelerated by shipping you a proprietary Data Box storage device.         


These storage devices come in two variations having a maximum usable storage capacity of 120 TB and 525 TB respectively. These are transported to your data center through a regional carrier. These devices have a rugged casing to protect and secure data during the transit. 


**Applies to: dbx**



> **Note:**
> Azure Data Box Heavy has been retired and is no longer available to order. As we expand the availability of next-generation devices across more regions, the Azure Data Box 80 TB device will be retired in those areas. Post-retirement, new orders for the 80 TB device will no longer be accepted, though existing orders will remain supported. 


The Microsoft Azure Data Box cloud solution lets you send terabytes of data into and out of Azure in a quick, inexpensive, and reliable way. The secure data transfer is accelerated by shipping you a proprietary Data Box storage device. Each storage device has a maximum usable storage capacity of 80 TB and is transported to your datacenter through a regional carrier. The device has a rugged casing to protect and secure data during the transit.


You can order the Data Box device via the Azure portal to import or export data from Azure. Once the device is received, you can quickly set it up using the local web UI. Depending on whether you will import or export data, copy the data from your servers to the device or from the device to your servers, and ship the device back to Azure. If importing data to Azure, in the Azure datacenter, your data is automatically uploaded from the device to Azure. The entire process is tracked end-to-end by the Data Box service in the Azure portal.

## Use cases

Data Box is ideally suited to transfer data sizes larger than 40 TBs in scenarios with no to limited network connectivity. The data movement can be one-time, periodic, or an initial bulk data transfer followed by periodic transfers. 

Data Box is ideally suited for importing data to Azure in several scenarios, including the following:

 - **Onetime migration** - when a large amount of on-premises data is moved to Azure.

     - Moving a media library from offline tapes into Azure to create an online media library.
     - Migrating your VM farm, SQL server, and applications to Azure.
     - Moving historical data to Azure for in-depth analysis and reporting using HDInsight.

 - **Initial bulk transfer** - when an initial bulk transfer is done using Data Box (seed) followed by incremental transfers over the network. 
     - For example, backup solutions partners such as Commvault and Data Box are used to move initial large historical backup to Azure. Once complete, the incremental data is transferred via network to Microsoft Azure Storage.

- **Periodic uploads** - when large amount of data is generated periodically and needs to be moved to Azure. For example in energy exploration, where video content is generated on oil rigs and windmill farms. 

Data Box can be used to export data from Azure in several scenarios, including the following:

- **Disaster recovery** - when a copy of the data from Azure is restored to an on-premises network. In a typical disaster recovery scenario, a large amount of Azure data is exported to a Data Box. Microsoft then ships this Data Box, and the data is restored on your premises in a short time.

- **Security requirements** - when you need to be able to export data out of Azure due to government or security requirements. For example, Azure Storage is available in US Secret and Top Secret clouds, and you can use Data Box to export data out of Azure. 

- **Migrate back to on-premises or to another cloud service provider** - when you want to move all the data back to on-premises, or to another cloud service provider, export data via Data Box to migrate the workloads.

### Ingestion of data from Data Box

Azure providers and non-Azure providers can ingest data from Azure Data Box. The Azure services that provide data ingestion from Azure Data Box include:

- **SharePoint Online** - use Azure Data Box and the SharePoint Migration Tool (SPMT) to migrate your file share content to SharePoint Online. Using Data Box, you remove the dependency on your WAN link to transfer the data. For more information, see [Use the Azure Data Box Heavy to migrate your file share content to SharePoint Online](data-box-heavy-migrate-spo.md).

- **Azure File Sync** -  replicates files from your Data Box to an Azure file share, enabling you to centralize your file services in Azure while maintaining local access to your data. For more information, see [Deploy Azure File Sync](../storage/file-sync/file-sync-deployment-guide.md).

- **HDFS stores** - migrate data from an on-premises Hadoop Distributed File System (HDFS) store of your Hadoop cluster into Azure Storage using Data Box. For more information, see [Migrate from on-premises HDFS store to Azure Storage with Azure Data Box](../storage/blobs/data-lake-storage-migrate-on-premises-HDFS-cluster.md).

- **Azure Backup** - allows you to move large backups of critical enterprise data through offline mechanisms to an Azure Recovery Services Vault. For more information, see [Azure Backup overview](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/backup-overview.md).

You can use your Data Box data with many non-Azure service providers. For instance:

- **[Veeam](https://helpcenter.veeam.com/docs/backup/hyperv/osr_adding_data_box.html)** - Veeam leverages Azure Data Box to help seed backup repository data to Azure Blob. Veeam offers data protection for various on-premises and cloud-based workloads, including Hyper-V VMs, Azure Local, VMware vSphere VMs, Nutanix AHV, Proxmox, agent-based backup for Windows and Linux, cloud-based backup for Azure VMs, and much more.
	
- **[Commvault](https://learn.microsoft.com/azure/storage/solution-integration/validated-partners/backup-archive-disaster-recovery/commvault/commvault-solution-guide)** - Commvault® supports Microsoft Azure Data Box, enabling enterprise customers to accelerate data movement to and from Azure with optimal security, speed, and control. Whether migrating data to Azure for backup or recovering from it during a disaster scenario, Commvault’s tight integration with Azure Data Box delivers unmatched flexibility in bandwidth-constrained or high-volume environments.
	
- **[OpenText](https://www.carbonite.com/resources/datasheet/carbonite-migrate-for-microsoft-azure-data-box)** - By integrating OpenText Migrate and Availability with Azure Data Box, organizations can significantly enhance their data onboarding process to Azure. This enables a hybrid approach of offline data seeding to Azure and then followed by delta synchronization with OpenText solutions for a seamless cutover.


## Benefits

Data Box is designed to move large amounts of data to Azure with little to no impact to network. The solution has the following benefits:

**Applies to: dbx-ng**

- **Speed** - Data Box Next-gen uses up to 100Gbps network interfaces to move data into and out of Azure.


**Applies to: dbx**

- **Speed** - Data Box uses 1-Gbps or 10-Gbps network interfaces to move up to 80 TB of data into and out of Azure.


- **Secure** - Data Box has built-in security protections for the device, data, and the service.
  - The device has a rugged casing secured by tamper-resistant screws and tamper-evident stickers. 
  - The data on the device is secured with AES 256-bit encryption at all times.
  - The device can only be unlocked with a password provided in the Azure portal.
  - The service is protected by the Azure security features.
  - Once the data from your import order is uploaded to Azure, the disks on the device are wiped clean in accordance with NIST 800-88r1 standards. For an export order, the disks are erased once the device reaches the Azure datacenter.
    
    For more information, refer to the [Azure Data Box security and data protection](data-box-security.md) article.

## Features and specifications

The Data Box device has the following features in this release.

**Applies to: dbx-ng**


| Specifications | Description |
| --- | --- |
| Weight | < 46 lbs. |
| Dimensions | Device - Width: 309.0 mm Height: 430.4 mm Depth: 502.0 mm |
| Rack space | 7 U when placed in the rack on its side (cannot be rack-mounted) |
| Cables required | 1 X power cable (included) <br> 2 X 10G-BaseT RJ45 cables(CAT-5e or CAT6) (not included)<br> 2 X 100-GbE QSFP28 passive direct attached cable (not included).  |
| RAID Configuration | RAID 5 |
| Storage capacity | SKU 1 - 120 TB usable (150 TB raw) <br> SKU 2 - 525 TB usable (600 TB raw)  |
| Power rating | The power supply unit is rated for 1300 W. <br> Typically, the unit draws 384 W. |
| Power Cable | IEC C13 standard compliant power cable <br> The device is certified to operate within a 110V to 220V range. |
| Network interfaces | 2 X 10-GbE interface - MGMT, DATA 3. <br> MGMT - for management, not user configurable, used for initial setup <br> DATA3 - for data, user configurable, and is dynamic by default <br> MGMT and DATA 3 can also work as 1 GbE <br> 2 X 100-GbE interface(QSFP28) - DATA 1, DATA 2 <br> Both are for data, can be configured as dynamic (default) or static |
| Data transfer | Both import and export are supported. |
| Data transfer media | RJ45, QSFP28 copper |
| Security | Rugged device casing with tamper-proof custom screws <br> Intrusion detection system in device <br> Secure boot <br>Hardware Root of Trust <br> TPM 2.0  |
| Data transfer rate | Approx. 7 GB/s using SMB Direct on RDMA (100-GbE) for large files. Both data ports can be used, though not required. Performance might differ depending on the source and size of your files.  |
| Management | Local web UI - one-time initial setup and configuration <br> Azure portal - day-to-day device management |
| Cooling capability | Fan cooled internally. <br> Operating temp is (0-35)C normal with full performance and (35-45)C with reduced performance <br> Storage temp is (-40 to 60)C <br> Airflow details are 144 CFM/KW for 120 TB and 122 CFM/KW for 525 TB |


> **Important:**
> - Data Box Next-gen 120 TB and 525 TB devices use QSFP28 cable (for example, Q28-PC01 100G DAC QSFP28 Passive Direct Attach Copper Twinax cable). <br>
> Image highlighting the differences between the SFP+, SFP28, and QSFP28 cables.
>  - To connect SFP+/SFP28 cables to Data Box Next-gen devices, use an appropriate adapter. For example, QSFP to SFP+ adapters include Mellanox MAM1Q00A-QSA or Cisco 100G QSFP28. <br>
>  - To connect a QSFP28 device to an LC fiber backend using the Mellanox MAM1Q00A-QSA adapter or another compatible adapter, you need:
>    - A Mellanox MAM1Q00A-QSA Adapter, which converts the QSFP28 port to an SFP+ or SFP28 slot.
>    - A Compatible optical SFP+ or SFP28 Transceiver that matches your LC fiber backbone (for example, SFP+ SR for multimode fiber or SFP+ LR for single-mode fiber).
>    - An LC Fiber Cable, which connects the transceiver to your fiber backbone.  



## Next generation Data Box performance improvements
The new version offers enhanced performance for data ingestion and upload, making it easier and faster for enterprise customers to migrate large-scale data to Azure without needing extensive on-premises network infrastructure. Key advancements include-
 - NVMe devices offer faster data transfer rates, with copy speeds up to 7GBps via SMB Direct on RDMA (100-GbE) for medium to large files, a 10x improvement in device transfers as compared to previous generation devices.
 - There is significant performance improvement within the data copy service, ranging from 2x for small sized files (64K-512K), to up to 7x for large files (8 MB to 128 MB). The data copy service runs locally on the Data Box, connects to the user’s network-attached storage (NAS) device via the Server Message Block (SMB) protocol, and copies data to Data Box. This eliminates the need for an intermediate host to ingest data.
 -	High-speed transfers to Azure with data upload up to 5x faster for medium to large files, minimizing the lead time for your data to become accessible in the Azure cloud. 
 -	These improvements are achieved through optimized hardware and software stacks, including the use of RDMA for SMB, which collectively reduces CPU usage and enhance overall efficiency.


**Applies to: dbx**


| Specifications | Description |
| --- | --- |
| Weight | < 50 lbs. |
| Dimensions | Device - Width: 309.0 mm Height: 430.4 mm Depth: 502.0 mm |
| Rack space | 7 U when placed in the rack on its side (cannot be rack-mounted) |
| Cables required | 1 X power cable (included) <br> 2 RJ45 cables (not included)<br> 2 X SFP+ Twinax copper cables (not included) |
| Storage capacity | 100-TB device has 80 TB or usable capacity after RAID 5 protection |
| Power rating | The power supply unit is rated for 700 W. <br> Typically, the unit draws 375 W. |
| Network interfaces | 2 X 1-GbE interface - MGMT, DATA 3. <br> MGMT - for management, not user configurable, used for initial setup <br> DATA3 - for data, user configurable, and is dynamic by default <br> MGMT and DATA 3 can also work as 10 GbE <br> 2 X 10-GbE interface - DATA 1, DATA 2 <br> Both are for data, can be configured as dynamic (default) or static |
| Data transfer | Both import and export are supported. |
| Data transfer media | RJ45, SFP+ copper 10 GbE Ethernet |
| Security | Rugged device casing with tamper-proof custom screws <br> Tamper-evident stickers placed at the bottom of the device |
| Data transfer rate | Up to 80 TB in a day over a 10-GbE network interface |
| Management | Local web UI - one-time initial setup and configuration <br> Azure portal - day-to-day device management |



## Data Box components

The Data Box includes the following components:

**Applies to: dbx-ng**


* **Data Box device** - a physical device that provides primary storage, manages communication with cloud storage, and helps to ensure the security and confidentiality of all data stored on the device. The Data Box device has a usable storage capacity of 120 TB/ 525 TB, depending upon the SKU selected.

    Photograph showing the rear views of an Azure Data Box Next-gen device.


**Applies to: dbx**


* **Data Box device** - a physical device that provides primary storage, manages communication with cloud storage, and helps to ensure the security and confidentiality of all data stored on the device. The Data Box device has a usable storage capacity of 80 TB. 

    Photograph of the front and back plane of the Data Box device.



    
* **Data Box service** – an extension of the Azure portal that lets you manage a Data Box device from a web interface that you can access from different geographical locations. Use the Data Box service to perform daily administration of your Data Box device. The service tasks include how to create and manage orders, view and manage alerts, and manage shares.  

    Screenshot of the Data Box service in Azure portal.

    For more information, go to [Use the Data Box service to administer your Data Box device](data-box-portal-ui-admin.md).

* **Local web user interface** – a web-based UI that is used to configure the device so that it can connect to the local network, and then register the device with the Data Box service. Use the local web UI also to shut down and restart the Data Box device, view copy logs, and contact Microsoft Support to file a service request.

    Screenshot of the Data Box local web UI.

    The local web UI on the device currently supports the following languages with their corresponding language codes:

    | Language | Code | Language | Code | Language | Code |
    | --- | --- | --- | --- | --- | --- |
    | English {default} | en | Czech | cs | German | de |
    | Spanish | es | French | fr | Hungarian | hu |
    | Italian | it | Japanese | ja | Korean | ko |
    | Dutch | nl | Polish | pl | Portuguese - Brazil | pt-br |
    | Portuguese - Portugal | pt-pt | Russian | ru | Swedish | sv |
    | Turkish | tr | Chinese - simplified | zh-hans |  |  |

    For information about using the web-based UI, go to [Use the web-based UI to administer your Data Box](data-box-local-web-ui-admin.md).

## The workflow

A typical import flow includes the following steps:

1. **Order** - Create an order in the Azure portal, provide shipping information, and the destination storage account for your data. If the device is available, Azure prepares and ships the device with a shipment tracking ID.

2. **Receive** - Once the device is delivered, cable the device for network and power using the specified cables. (The power cable is included with the device. You'll need to procure the data cables.) Turn on and connect to the device. Configure the device network and mount shares on the host computer from where you want to copy the data.

3. **Copy data** - Copy data to Data Box shares.

4. **Return** - Prepare, turn off, and ship the device back to the Azure datacenter.

5. **Upload** - Data is automatically copied from the device to Azure. The device disks are securely erased as per the National Institute of Standards and Technology (NIST) guidelines.

Throughout this process, you are notified via email on all status changes. For more information about the detailed flow, go to [Deploy Data Box in Azure portal](data-box-deploy-ordered.md).

A typical export flow includes the following steps:

1. **Order** - Create an export order in the Azure portal, provide shipping information, and the source storage account for your data. If the device is available, Azure prepares a device. Data is copied from your storage account to the Data Box. Once the data copy is complete, Microsoft ships the device with a shipment tracking ID.

2. **Receive** - Once the device is delivered, cable the device for network and power using the specified cables. (The power cable is included with the device. You'll need to procure the data cables.) Turn on and connect to the device. Configure the device network and mount shares on the host computer to which you want to copy the data.

3. **Copy data** - Copy data from Data Box shares to the on-premises data servers.

4. **Return** - Prepare, turn off, and ship the device back to the Azure datacenter.

5. **Data erasure** - The device disks are securely erased as per the National Institute of Standards and Technology (NIST) guidelines.

Throughout the export process, you are notified via email on all status changes. For more information about the detailed flow, go to [Deploy Data Box in Azure portal](data-box-deploy-export-ordered.md).

## Region availability

Data Box can transfer data based on the region in which service is deployed, the country/region you ship the device to, and the target storage account where you transfer the data.

### For import

- **Service availability** - When using Data Box for import or export orders, to get information on region availability, go to [Azure products available by region](https://azure.microsoft.com/global-infrastructure/services/?products=databox&regions=all).

    For import orders, Data Box can also be deployed in the Azure Government Cloud. For more information, see [What is Azure Government?](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-government/documentation-government-welcome.md). 

- **Destination storage accounts** - The storage accounts that store the data are available in all Azure regions where the service is available.


## Cross-region data transfer for Data Box devices

### Direct upload from any source to any Azure destination region

Customers can now select a given source to any Azure destination region for a direct upload from the DataBox device. This capability allows you to copy your data from a local source and transfer it to a destination within a different country, region, or boundary. For example, data stored on-premises in a source country like India can be directly uploaded to an Azure region in a different country, such as the United States. This feature provides flexibility and convenience for organizations with distributed data storage needs. It's important to note that the DataBox device isn't shipped across commerce boundaries. Instead, it's transported to an Azure data center within the originating country or region. Data transfer between the source country and the destination region takes place using the Azure network and incurs no additional cost.

### Benefits

This capability is particularly useful for large distributed organizations that have their Azure workloads set up in multiple regions. It allows for seamless data transfer across regions without the need for intermediate steps. Additionally, customers are not charged for the transcontinental transfer, making it a cost-effective solution for global data management.

### Exceptions and limitations

Customers should be aware of the following exceptions and limitations when planning their data transfer strategies:

- Cross-cloud transfers aren't supported. Data can't be transferred between different cloud providers.
- Shipping the Data Box device itself across commerce boundaries isn't supported.
- Some data transfer scenarios take place over large geographic areas. Higher than normal latencies might be encountered during such transfers.
- Export scenarios for cross region transfers aren't supported.


## Data resiliency

The Data Box service is geographical in nature and has a single active deployment in one region within each country or commerce boundary. For data resiliency, a passive instance of the service is maintained in a different region, usually within the same country or commerce boundary. In a few cases, the paired region is outside the country or commerce boundary.

In the extreme event of any Azure region being affected by a disaster, the Data Box service will be made available through the corresponding paired region. Both ongoing and new orders will be tracked and fulfilled through the service via the paired region. Failover is automatic, and is handled by Microsoft.

For regions paired with a region within the same country or commerce boundary, no action is required. Microsoft is responsible for recovery, which could take up to 72 hours.

For regions that don’t have a paired region within the same geographic or commerce boundary, the customer will be notified to create a new Data Box order from a different, available region and copy their data to Azure in the new region. New orders would be required for the Brazil South, Southeast Asia, and East Asia regions.

For more information, see [Business continuity and disaster recovery (BCDR): Azure Paired Regions](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/best-practices-availability-paired-regions.md).

## Next steps

- Review the [Data Box system requirements](data-box-system-requirements.md).
- Understand the [Data Box limits](data-box-limits.md).
- Quickly deploy [Azure Data Box](data-box-quickstart-portal.md) in Azure portal.
