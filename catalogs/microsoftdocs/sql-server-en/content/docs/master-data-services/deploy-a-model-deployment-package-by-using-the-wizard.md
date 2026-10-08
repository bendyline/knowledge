---
title: Deploy a Model Deployment Package (Wizard)
description: Deploy a Model Deployment Package by Using the Wizard
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - intro-deployment
  - build-2025
helpviewer_keywords:
  - "deployment packages [Master Data Services], deploying"
  - "models [Master Data Services], deploying a package"
---
# Deploy a Model Deployment Package by Using the Wizard


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  Use the  Master Data Manager 
 model deployment wizard to deploy packages that contain model objects only. If you need to deploy a package with data, see [Deploy a Model Deployment Package by Using MDSModelDeploy](deploy-a-model-deployment-package-by-using-mdsmodeldeploy.md).  
  
> **Important:**  
>  Packages can be deployed to the edition of  SQL Server 
 they were created in only. This means that packages created in  SQL Server 2012 (11.x) 
 cannot be deployed to  SQL Server 2014 (12.x)
.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **System Administration** functional area in the target  Master Data Services 
 environment.  
  
-   A model deployment package must exist. For more information, see [Create a Model Deployment Package by Using the Wizard](create-a-model-deployment-package-by-using-the-wizard.md).  
  
-   You must be an administrator in the environment where you are deploying the model. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
### To deploy a model deployment package of model objects only  
  
1.  In  Master Data Manager 
, click **System Administration**.  
  
2.  On the **Model View** page, from the menu bar, point to **System** and click **Deployment**.  
  
3.  On the **Model Deployment Wizard**, click **Deploy**.  
  
4.  Click **Browse**.  
  
5.  Find your deployment package (.pkg file) and click **Open**.  
  
6.  Click **Next**.  
  
7.  After the package is loaded, click **Next**.  
  
8.  If the model already exists, you can update it by selecting **Update the existing model**. To create a new model, select **Create a new model** and after you click **Next** you can type a name for the new model.  
  
9. Click **Finish** to exit the wizard.  
  
 **Notes:**  
  
-   If a subscription view in the package has the same name as a subscription view in an existing model, this warning is displayed: **Deployer subscription view renamed**. In addition, the view is created as *modelname.subscriptionviewname*. If this name is already in use, the subscription view is not created.  
  
-   The deployment process has four steps:  
  
    1.  The model objects are created.  
  
    2.  Subscription views are created.  
  
    3.  Business rules are created.  
  
-   When creating a new or cloned model, if the process fails during any step, the model is deleted.  
  
     When updating a model, if the process fails during any of the first three steps, it does not proceed beyond that step; however, changes that are already made are not rolled back.  
  
## Related content

- [Deploying Models (Master Data Services)](deploying-models-master-data-services.md)
- [Assign Model Object Permissions (Master Data Services)](assign-model-object-permissions-master-data-services.md)
