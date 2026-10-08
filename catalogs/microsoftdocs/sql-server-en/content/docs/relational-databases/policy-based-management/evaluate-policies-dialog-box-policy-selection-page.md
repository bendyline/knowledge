---
title: "'Policy Selection' page of the 'Evaluate Policies' dialog box"
description: Describes the 'Policy Selection' page of the 'Evaluate Policies' dialog box for Policy-Based Management in SQL Server Management Studio (SSMS).
author: VanMSFT
ms.author: vanto
ms.date: 12/15/2023
ms.service: sql
ms.subservice: security
ms.topic: ui-reference
f1_keywords:
  - "sql13.swb.dmf.runnow.f1"
---
# Evaluate Policies dialog box, Policy Selection page


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Use this dialog box to evaluate Policy-Based Management policies. By selecting the **Evaluation Results** page, you can apply policies to the items in a target set that doesn't comply with the policies.

## Options

**Source**  
Specifies the source of the policies. To change the source, select the Browse (**...**) button to open the **Select Source** dialog box.

**Files**  
Type the path of a file that contains a Policy-Based Management policy, or use the Browse (**...**) button to select the file.

**Server**  
Select to connect to an instance of the  SQL Server Database Engine 
 that contains the policy that you want.

**Policies: Policy**  
Select to open the policy dialog box for the specified policy.

**Policies: Category**  
The category of the policy. This box is read-only.

**Policies: Facet**  
The facet implemented by the policy. This box is read-only.

**Evaluate**  
Runs the policy in evaluation mode. This generates a compliance report for the target set but doesn't reconfigure  SQL Server 
 or enforce future compliance.

## Possible errors

- **No targets found**

     The target set could be empty due to any of the following reasons:

    -   There are no targets on the instance of  SQL Server 
 of the type specified by the policy.

    -   The server restriction might exclude the instance of  SQL Server 
 that contains the target.

    -   If the policy is on an object in a database (for example a table, view, or user) the database might not subscribe to the category of the policy.

    -   The target-set filter might exclude all targets on this instance of  SQL Server 
.

    -   The target server type is different from the server type on which the policy is evaluated. For example, in the  Database Engine 
, if you try to evaluate a policy that has been created for  Analysis Services 
, you'll receive an empty target set.

## Related content

- [Administer Servers by Using Policy-Based Management](administer-servers-by-using-policy-based-management.md)
- [Evaluate Policies dialog box, Evaluation Results page](evaluate-policies-dialog-box-evaluation-results-page.md)
