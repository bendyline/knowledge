---
title: "Lesson 5: Add SSIS package configurations for the Package Deployment Model"
description: "Lesson 5: Add SSIS package configurations for the Package Deployment Model"
ms.date: "01/08/2019"
ms.service: sql
ms.subservice: integration-services
ms.topic: tutorial
---
# Lesson 5: Add SSIS package configurations for the Package Deployment Model


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory



Package configurations let you set run-time properties and variables from outside the development environment. Configurations allow you to develop packages that are flexible and easy to both deploy and distribute.  Microsoft 
  Integration Services 
 offers the following configuration types:  
  
-   XML configuration file  
  
-   Environment variable  
  
-   Registry entry  
  
-   Parent package variable  
  
-    SQL Server 
 table  
  
In this lesson, you modify the example  Integration Services 
 package that you created in [Lesson 4: Add error flow redirection with SSIS](lesson-4-add-error-flow-redirection-with-ssis.md) to use the Package Deployment Model and take advantage of package configurations. You can also copy the completed Lesson 4 package  included with this tutorial. 

Using the Package Configuration Wizard, you create an XML configuration that updates the **Directory** property of the Foreach Loop container. You use a package-level variable mapped to the **Directory** property. After you create the configuration file, you modify the value of the variable from outside the development environment to a new sample data folder path. When you run the package again, the configuration file populates the value of the variable, and the variable in turn updates the **Directory** property. The package then iterates through the files in the new data folder, rather than in the original hard-coded folder.  
  
> **Note:**
> If you haven't already, see the [Lesson 1 prerequisites](lesson-1-create-a-project-and-basic-package-with-ssis.md#prerequisites).
  
## Lesson tasks  
This lesson contains the following tasks:  
  
-   [Step 1: Copy the Lesson 4 package](lesson-5-1-copying-the-lesson-4-package.md)  
  
-   [Step 2: Enable and configure package configurations](lesson-5-2-enabling-and-configuring-package-configurations.md)  
  
-   [Step 3: Modify the directory property configuration value](lesson-5-3-modifying-the-directory-property-configuration-value.md)  
  
-   [Step 4: Test the Lesson 5 package](lesson-5-4-testing-the-lesson-5-tutorial-package.md)  
  
## Start the lesson  
  
-   [Step 1: Copy the Lesson 4 package](lesson-5-1-copying-the-lesson-4-package.md)
