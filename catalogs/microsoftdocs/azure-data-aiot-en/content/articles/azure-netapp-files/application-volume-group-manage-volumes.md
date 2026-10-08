---
title: Manage volumes in Azure NetApp Files application volume group 
description: Describes how to manage a volume from its application volume group, including resizing, deleting, or changing throughput for the volume.
services: azure-netapp-files
author: b-hchen
ms.service: azure-netapp-files
ms.topic: how-to
ms.date: 07/11/2025
ms.author: anfdocs
ms.custom:
  - build-2025
  - sfi-image-nochange
# Customer intent: As a storage administrator, I want to manage volumes within an application volume group, so that I can resize, delete, or adjust throughput effectively to optimize performance and storage usage for my SAP HANA environment.
---
# Manage volumes in an application volume group for SAP HANA

You can manage a volume from its volume group. You can resize, delete, or change throughput for the volume. 

## Steps

1. From your NetApp account, select **Application volume groups**. Select a volume group to display the volumes in the group.  

2. Select the volume you want to resize, delete, or change throughput. The volume overview is displayed. 

    [Screenshot that shows Application Volume Groups overview page.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-netapp-files/media/application-volume-group-manage-volumes/application-volume-group-overview.png#lightbox)  

    * To resize the volume, select **Resize** and specify the quota in GiB.
    
    Screenshot that shows the Update Volume Quota window.

    * To change the throughput for the volume, select **Change throughput** and specify the intended throughput in MiB/s.

    Screenshot that shows the Change Throughput window.

    * To delete the volume in the volume group, select **Delete**. If prompted, enter the volume name to confirm the deletion.  

    > **Important:**
    > Volume deletion is permanent. It can't be undone.
    
    Screenshot that shows the Delete Volume window.

## Next steps  

* [Understand Azure NetApp Files application volume group for SAP HANA](application-volume-group-introduction.md)
* [Requirements and considerations for application volume group for SAP HANA](application-volume-group-considerations.md)
* [Deploy the first SAP HANA host using application volume group for SAP HANA](application-volume-group-deploy-first-host.md)
* [Add hosts to a multiple-host SAP HANA system using application volume group for SAP HANA](application-volume-group-add-hosts.md)
* [Add volumes for an SAP HANA system as a secondary database in HSR](application-volume-group-add-volume-secondary.md)
* [Add volumes for an SAP HANA system as a DR system using cross-region replication](application-volume-group-disaster-recovery.md)
* [Delete an application volume group](application-volume-group-delete.md)
* [Application volume group FAQs](faq-application-volume-group.md)
* [Troubleshoot application volume group errors](troubleshoot-application-volume-groups.md)
