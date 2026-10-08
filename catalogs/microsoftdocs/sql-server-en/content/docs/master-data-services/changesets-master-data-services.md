---
title: Changesets
description: Changesets (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: concept-article
ms.custom:
  - build-2025
---
# Changesets (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


   Master Data Services 
 now supports the ability to save any pending changes to an entity as changesets. There are two usage scenarios for this feature.  
  
-   **Changes when "Approval Required" is turned on by Entity Administrator**  
  
     If an Entity administrator specifies that the changes to a given entity require approval before they are committed, any changes to the entity have to be saved into a new or an existing changeset before they can be submitted for approval.  For more information, see [Approval Required (Master Data Services)](approval-required-master-data-services.md)  
  
     You would follow this workflow.  
  
    1.  You create a changeset. The changeset is in the Open state. See [Create a Changeset (Master Data Services)](create-a-changeset-master-data-services.md)  
  
    2.  You apply the changeset and add some changes to the changeset. See [Apply and Update a Changeset (Master Data Services)](apply-and-update-a-changeset-master-data-services.md)  
  
    3.  You submit the changeset to the entity administrator for approval. The changeset is in the Pending state. See [Commit or Submit a Changeset (Master Data Services)](commit-or-submit-a-changeset-master-data-services.md)  
  
    4.  The entity administrator gets an email notification that a changeset is waiting for approval. If the entity administrator approves the changeset, the changeset is in the Approved state. See [Approve or Reject a Changeset (Master Data Services)](approve-or-reject-a-changeset-master-data-services.md)  
  
    5.  The approved changeset will be committed automatically. If the change is committed successfully, the changeset is in the committed state.  
  
-   **Local User changes**  
  
     If you merely want to save your local changes so you can use or retrieve them later, you can use changesets to achieve that.  
  
     You would follow this workflow.  
  
    1.  You create a changeset. The changeset is in the Open state. See [Create a Changeset (Master Data Services)](create-a-changeset-master-data-services.md)  
  
    2.  You apply the changeset and add some changes to the changeset. See [Apply and Update a Changeset (Master Data Services)](apply-and-update-a-changeset-master-data-services.md)  
  
    3.  When ready, you commit the changeset. See [Commit or Submit a Changeset (Master Data Services)](commit-or-submit-a-changeset-master-data-services.md)  
  
## Related content

- [Create a Changeset (Master Data Services)](create-a-changeset-master-data-services.md)
- [Apply and Update a Changeset (Master Data Services)](apply-and-update-a-changeset-master-data-services.md)
- [Commit or Submit a Changeset (Master Data Services)](commit-or-submit-a-changeset-master-data-services.md)
- [Approve or Reject a Changeset (Master Data Services)](approve-or-reject-a-changeset-master-data-services.md)
- [Manage Changesets (Master Data Services)](manage-changesets-master-data-services.md)
