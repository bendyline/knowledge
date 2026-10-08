---
title: "General Page of Integration Services Designers Options"
description: "General Page of Integration Services Designers Options"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: concept-article
f1_keywords:
  - "VS.ToolsOptionsPages.Business_Intelligence_Designers.Data_Transformation_Designers.General"
---
# General Page of Integration Services Designers Options


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  Use the **General** page of the **Integration Services Designers** page in the **Options** dialog box to specify the options for loading, displaying, and upgrading packages.  
  
 To open the **General** page, in  SQL Server Data Tools (SSDT) 
, on the **Tools** menu, click **Options**, expand **Business Intelligence Designers**, and select **Integration Services Designers**.  
  
## Options  
 **Check digital signature when loading a package**  
 Select to have  Integration Services 
 check the digital signature when loading a package.  Integration Services 
 will only check whether the digital signature is present, is valid, and is from a trusted source.  Integration Services 
 will not check whether the package has been changed since the package was signed.  
  
 If you set the **BlockedSignatureStates** registry value, this registry value overrides the **Check digital signature when loading a package** option. For more information, see [Implement a Signing Policy by Setting a Registry Value](security/identify-the-source-of-packages-with-digital-signatures.md).  
  
 For more information about digital certificates and packages, see [Identify the Source of Packages with Digital Signatures](security/identify-the-source-of-packages-with-digital-signatures.md).  
  
 **Show warning if package is unsigned**  
 Select to display a warning when loading a package that is not signed.  
  
 **Show precedence constraint labels**  
 Select which label-Success, Failure, or Completion-to display on precedence constraints when viewing packages in  SQL Server Data Tools (SSDT) 
.  
  
 **Scripting language**  
 Select the default scripting language for new Script tasks and Script components.  
  
 **Update connection strings to use new provider names**  
 When opening or upgrading  SQL Server 2005 Integration Services (SSIS) 
 packages, update connection strings to use the names for the following providers, for the current release of  SQL Server 
  Integration Services 
:  
  
-    Analysis Services 
 OLE DB provider  
  
-    SQL Server 
 Native Client  
  
 The  SSIS 
 Package Upgrade Wizard updates only connection strings that are stored in connection managers. The wizard does not update connection strings that are constructed dynamically by using the  Integration Services 
 expression language, or by using code in a Script task.  
  
 **Create new package ID**  
 When upgrading  SQL Server 2005 Integration Services (SSIS) 
 packages, create new package IDs for the upgraded versions of the packages.  
  
## Related content

- [Security Overview (Integration Services)](security/security-overview-integration-services.md)
- [Extending Packages with Scripting](extending-packages-scripting/extending-packages-with-scripting.md)
