---
title: "Step 3: Test the Lesson 6 package"
description: "Lesson 6-3: Test the Lesson 6 package"
ms.date: "01/11/2019"
ms.service: sql
ms.subservice: integration-services
ms.topic: tutorial
---
# Lesson 6-3: Test the Lesson 6 package


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


At run time, your package gets the value for the **Directory** property from the **VarFolderName** parameter.  
  
To verify that the package updates the **Directory** property, execute the package. Because you copied three sample data files to the new directory, the data flow runs three times.
  
## Check the package layout  
Before you test the package, verify that the control and data flows in the Lesson 6 package are similar to the objects shown in the following diagrams:   
  
**Control Flow**  
  
Control Flow  
  
**Data Flow**  
  
Data Flow  
  
## Test the Lesson 6 package  
  
1.  On the **Debug** menu, select **Start Debugging**.  
  
2.  After the package has completed running, on the **Debug** menu, select **Stop Debugging**.  
  
## Go to next task
[Step 4: Deploy the Lesson 6 package](lesson-6-4-deploying-the-lesson-6-package.md)
