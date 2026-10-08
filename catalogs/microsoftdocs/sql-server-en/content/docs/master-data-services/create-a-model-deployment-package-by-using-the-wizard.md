---
title: Create a Model Deployment Package with Wizard
description: Create a Model Deployment Package by Using the Wizard
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "deployment packages [Master Data Services], creating"
  - "models [Master Data Services], creating a deployment package"
  - "creating packages [Master Data Services]"
---
# Create a Model Deployment Package by Using the Wizard


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  Use the  Master Data Manager 
 model deployment wizard to create a package of the model objects only. If you need to include data in the package, see [Create a Model Deployment Package by Using MDSModelDeploy](create-a-model-deployment-package-by-using-mdsmodeldeploy.md).  
  
## Prerequisites  
 To perform this procedure:  
  
-   In the  Master Data Manager 
 web application, you must have permission to access the **System Administration** functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
-   A model must exist for you to create a package of. For more information, see [Create a Model (Master Data Services)](create-a-model-master-data-services.md).  
  
### To create a model deployment package  
  
1.  In  Master Data Manager 
, click **System Administration**.  
  
2.  On the **Model View** page, from the menu bar, point to **System** and click **Deployment**.  
  
3.  On the **Model Deployment Wizard**, click **Create**.  
  
4.  On the **Create Package** page, select a model from the **Model** list.  
  
5.  Click **Next**.  
  
6.  Click **Download**.  
  
7.  Save the file.  
  
8.  Click **Close** to close the wizard.  
  
## Related content

- [Deploying Models (Master Data Services)](deploying-models-master-data-services.md)
- [Deploy a Model Deployment Package by Using the Wizard](deploy-a-model-deployment-package-by-using-the-wizard.md)
