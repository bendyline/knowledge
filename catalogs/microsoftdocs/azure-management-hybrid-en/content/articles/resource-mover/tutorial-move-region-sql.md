---
title: Move Azure SQL resources between regions with Azure Resource Mover
description: Learn how to move Azure SQL resources to another region with Azure Resource Mover.
ms.service: azure-resource-mover
ms.topic: tutorial
author: RochakSingh-blr
ms.author: v-rochak2
ms.date: 07/31/2025
ms.update-cycle: 1095-days
ms.custom: mvc, engagement-fy23
# Customer intent: "As an Azure administrator, I want to move SQL databases and elastic pools to different regions, so that I can optimize performance and manage resources according to regional requirements."
---

# Move Azure SQL Database resources to another region

In this tutorial, you learn how to move Azure SQL databases and elastic pools to a different Azure region, using [Azure Resource Mover](overview.md).

In this tutorial, you learn how to:

> 
> * Move Azure SQL databases and elastic pools to a different Azure region 

> **Note:**
> Tutorials show the quickest path for trying out a scenario, and use default options. 

## Prerequisites

Before you begin:

-  Check if you have *Owner* access on the subscription containing the resources that you want to move.
    - The first time you add a resource for a  specific source and destination pair in an Azure subscription, Resource Mover creates a [system-assigned managed identity](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/overview.md#managed-identity-types) (formerly known as Managed Service Identify (MSI)) that's trusted by the subscription.
    - To create the identity, and to assign it the required role (Contributor or User Access administrator in the source subscription), the account you use to add resources needs *Owner* permissions on the subscription. [Learn more](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/rbac-and-directory-admin-roles.md#azure-roles) about Azure roles.
- Check if the subscription has enough quota to create the resources you're moving in the target region. If it doesn't have quota, [request more limits](../azure-resource-manager/management/azure-subscription-service-limits.md).
- Verify pricing and charges associated with the target region to which you're moving resources. Use the [pricing calculator](https://azure.microsoft.com/pricing/calculator/) to help you.
 
## Sign in to Azure

If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/free-trial/) before you begin. Then sign in to the [Azure portal](https://portal.azure.com).   

## Check SQL requirements

To check the SQL requirements before the move:

1. [Check](support-matrix-move-region-sql.md) which database/elastic pool features are supported for moving to another region.
2. In the target region, create a target server for each source server and ensure proper user access. [Learn more about how to configure logins and users](https://learn.microsoft.com/azure/azure-sql/database/active-geo-replication-security-configure#how-to-configure-logins-and-users).
4. Check if the databases are encrypted with transparent data encryption (TDE). If databases are encrypted with transparent data encryption and you use your own encryption key in Azure Key Vault, [learn how to move key vaults to another region](https://learn.microsoft.com/azure/key-vault/general/move-region).
5. If SQL data sync is enabled, moving the member databases is supported. After the move, you need to set up SQL data sync to the new target database.
6. Remove advanced data security settings before the move. After the move, [configure the settings](https://learn.microsoft.com/azure/azure-sql/database/azure-defender-for-sql) at the SQL Server level in the target region.
7. If auditing is enabled, the policies reset to default after the move. [Set up auditing](https://learn.microsoft.com/azure/azure-sql/database/auditing-overview) again after moving.
7. Back up retention policies for the source database are carried over to the target database. [Learn more](https://learn.microsoft.com/azure/azure-sql/database/long-term-backup-retention-configure) about modifying settings after the move.
8. Remove server-level firewall rules before the move. Database-level firewall rules are copied from the source server to the target server, during the move. [Set up firewall rules](https://learn.microsoft.com/azure/azure-sql/database/firewall-create-server-level-portal-quickstart) for SQL Server in the target region after the move.
9. Remove autotuning settings before the move. Then [set up autotuning ](https://learn.microsoft.com/azure/azure-sql/database/automatic-tuning-enable) again after moving.
10. Remove database alert settings before the move. [Reset it](https://learn.microsoft.com/azure/azure-sql/database/alerts-insights-configure-portal) after moving.
    
## Select resources

You can select any supported resource type in any resource groups in the selected source region. You move resources to a target region in the same subscription as the source region. If you want to change the subscription, you can do that after the resources are moved.

To select the resources you want to move, follow these steps:

1. In the Azure portal, search for *resource mover*. Then, under **Services**, select **Azure Resource Mover**.

    Screenshot displays search results for resource mover in the Azure portal.

2. On the Azure Resource Mover **Overview** pane, select **Move across regions**.

    Screenshot displays button to add resources to move to another region.

3. On **Move resources** > **Source + destination**:
    1. Select the source **Subscription** and **Region**.
    2. Under **Destination**, select the region to which you want to move the resources. Then select **Next**.

    Screenshot displays page to select source and destination region.

6. On **Move resources** > **Resources to move**:
    1. Go to **Select resources**.
    1. On **Select resources** pane, select the resources. You can only add resources that are supported for move. Then select **Done**.

        Screenshot displays page to select SQL resources to move.

    1. In **Resources to move**, select **Next**.

9. In **Review + Add**, check the source and destination settings. Verify that you understand that metadata about the move will be stored in a resource group created for this purpose in the metadata region.

    Screenshot displays page to review settings and proceed with move.

10. Select **Proceed**, to begin adding the resources.
11. After the add process finishes successfully, select **Adding resources for move** in the notification icon.
12. After selecting the notification, review the resources on the **Across regions** page.


> **Note:**
> - The SQL Server is now in a *Manual assignment pending* state.
> - Other added resources are in a *Prepare pending* state.
> - If you want to remove an resource from a move collection, the method for doing that depends on where you are in the move process. [Learn more](remove-move-resources.md).

## Resolve dependencies

To resolve the dependent resources you want to move, follow these steps:


1. Dependencies are auto-validated in the background when you add the resources. If the initial auto validation does not resolve the issue, you will see a **Validate dependencies** option, select it to validate manually. 
1. If dependencies are found, select **Add dependencies**.

    Screenshot displays button to add dependencies.
   
3. In **Add dependencies**, select the dependent resources > **Add dependencies**. You can monitor the progress in the notifications.

4. Dependencies are auto-validated in the background once you add the dependencies. If you see a **Validate dependencies** option, select it to trigger the manual validation. 

5. On the **Across regions** page, verify that the resources are now in a *Prepare pending* state with no issues.

    Screenshot displays page showing resources in prepare pending state.

## Move SQL server

Azure Resource Mover currently doesn't move SQL server across regions. You must first assign a target SQL Server in the target region, and then commit the move.

To assign the destination resources manually, follow these steps:

1. **Assign a target SQL server**- To assign a target SQL server, follow these steps:

    1. In **Across regions**, for the SQL server resource, in the **Destination configuration** column, select **Resource not assigned**.
    2. Select an existing SQL Server resource in the target region. 
        
        Screenshot displays entry showing SQL Server state set to Commit move pending.
        
    > **Note:**
    > The source SQL Server state changes to *Commit move pending*. 

1. **Commit the SQL Server move**- To commit a target SQL server and finish the move process, follow these steps:

    1. In **Across regions**, select the SQL Server, and then select **Commit move**.
    2. In **Commit resources**, select **Commit**.
    
       Screenshot displays page to commit the SQL Server move.
    
    3. Track the move progress in the notifications bar.
    
    > **Note:**
    > After the commit, the SQL Server is now in a *Delete source pending* state.

## Prepare resources to move

With the source SQL Server moved, you can prepare to move the other resources.

## Prepare an elastic pool

To prepare an elastic pool for the move, follow these steps:

1. In **Across regions**, select the source elastic pool (demo-test1-elasticpool in our walkthrough), and select **Prepare**.

    Screenshot displays button to prepare resources.

2. In **Prepare resources**, select **Prepare**.
3. When  notifications show that the prepare process was successful, select **Refresh**.

> **Note:**
> The elastic pool is now in an *Initiate move pending* state.

## Prepare a single database

To prepare a single database for the move, follow these steps:

1. In **Across regions**, select the single database (not in an elastic pool), and then select **Prepare**.

    Screenshot displays button to prepare selected resources.

2. In **Prepare resources**, select **Prepare**.
3. When  notifications show that the prepare process was successful, select **Refresh**.

> **Note:**
> The database is now in an *Initiate move pending* state, and has been created in the target region.

## Move the pool and prepare pool databases

To prepare databases in an elastic pool, the elastic pool must be in a *Commit move pending* state. To move to this state, initiate the move for the pool.

#### Initiate move - elastic pool

To initiate a move for an elastic pool, follow these steps:

1. In **Across regions**, select the source elastic pool (demo-test1-elasticpool in our walkthrough), and then select **Initiate move**.
2. In **Move resources**, select **Initiate move**.

    
    Screenshot displays button to initiate move of elastic pool.

1. Track the move progress in the notifications bar.
1. When the notifications show that the move was successful, select **Refresh**.

> **Note:**
> The elastic pool is now in a *Commit move pending* state.

#### Prepare database

To prepare a database for the move, follow these steps:

1. In **Across regions**, select the database (demo-test2-sqldb in our walkthrough), and then select **Prepare**.
2. In **Prepare resources**, select **Prepare**.

    Screenshot displays button to prepare database in elastic pool.

During the prepare stage, the target database is created in the target region and the data replication starts. After Prepare, the database is in an *Initiate move pending* state. 

Screenshot displays button to prepare the selected database in the elastic pool.

## Move databases

Now that you've prepared the resources prepared, you can initiate the move. 

To move the databases, follow these steps:

1. In **Across regions**, select resources with state **Initiate move pending**. Then select **Initiate move**.
2. In **Move resources**, select **Initiate move**.

    Screenshot displays page to initiate move.

3. Track the move progress in the notifications bar.

> **Note:**
> Databases are now in a *Commit move pending* state.

## Commit or discard the move

After the initial move, you can decide whether you want to commit the move, or to discard it. 

- **Discard**: You might want to discard a move if you're testing, and you don't want to actually move the source resource. Discarding the move returns the resource to a state of *Initiate move pending*.
- **Commit**: Commit completes the move to the target region. After committing, a source resource will be in a state of **Delete source pending** and you can decide if you want to delete it.

### Discard the move 

To discard the move, follow these steps:

1. In **Across regions**, select resources with state **Commit move pending**, and select **Discard move**.
2. In **Discard move**, select **Discard**.
3. Track move progress in the notifications bar.

> **Note:**
> - After discarding resources, they're in an *Initiate move pending* state.
> - If there's only an elastic pool, discard progresses, and the elastic pool created in the target region is deleted.
> - If there's an elastic pool with associated databases in the *Commit move pending* state, you can't discard the elastic pool.
> - If you discard an SQL database, target region resources aren't deleted. 

If you want to start the move again after discarding, select the SQL database, or elastic pool and initiate the move again.

### Commit the move

Finish moving databases and elastic pools by following these steps:

1. Check that the SQL Server is a *Delete source pending* state.
2. Update database connection strings to the target region, before you commit.
3. In **Across regions**, select the SQL resources, and then select **Commit move**.
4. In **Commit resources**, select **Commit**.

    Screenshot displays commit move.

5. Track the commit progress in the notifications bar.

> **Note:**
> Some downtime occurs for SQL databases during the commit process.
> Committed databases and elastic pools are now in a *Delete source pending* state.
> After the commit, update database-related settings, including firewall rules, policies, and alerts, on the target database.

## Delete source resources after commit

After the move, you can optionally delete resources in the source region. 

> **Note:**
> SQL Server servers can't be deleted from the portal and must be deleted from the resource property page.

1. On the **Across regions** pane, select the name of the source resource that you want to delete.
2. Select **Delete source**.

## Next steps

[Learn more](tutorial-move-region-virtual-machines.md) about moving Azure VMs to another region.
