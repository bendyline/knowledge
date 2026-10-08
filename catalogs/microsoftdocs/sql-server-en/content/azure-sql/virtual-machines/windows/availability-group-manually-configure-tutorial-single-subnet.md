---
title: "Tutorial: Configure a SQL Server Always on Availability Group"
description: "This tutorial shows how to create a SQL Server Always On availability group on Azure virtual machines."
author: AbdullahMSFT
ms.author: amamun
ms.reviewer: mathoma, randolphwest
ms.date: 09/17/2025
ms.service: azure-vm-sql-server
ms.subservice: hadr
ms.topic: tutorial
ms.custom:
  - sfi-image-nochange
editor: monicar
tags: azure-service-management
---

# Tutorial: Manually configure an availability group - SQL Server on Azure VMs



  **Applies to:**    [SQL Server on Azure VM](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

> **Tip:**
> There are many [methods to deploy an availability group](availability-group-overview.md#deployment-options). Simplify your deployment and eliminate the need for an Azure Load Balancer or distributed network name (DNN) for your Always On availability group by creating your SQL Server virtual machines (VMs) in [multiple subnets](availability-group-manually-configure-prerequisites-tutorial-multi-subnet.md) within the same Azure virtual network. If you've already created your availability group in a single subnet, you can [migrate it to a multi-subnet environment](availability-group-manually-migrate-multi-subnet.md). 

This tutorial shows how to create an Always On availability group for SQL Server on Azure VMs within a single subnet. The complete tutorial creates an availability group with a database replica on two SQL Server instances.

This article manually configures the availability group environment. It's also possible to automate the steps by using the [Azure portal](availability-group-azure-portal-configure.md), [PowerShell or the Azure CLI](availability-group-az-commandline-configure.md), or [Azure Quickstart Templates](availability-group-quickstart-template-configure.md).

**Time estimate**: This tutorial takes about 30 minutes to complete after you meet the [prerequisites](availability-group-manually-configure-prerequisites-tutorial-single-subnet.md).

## Prerequisites

The tutorial assumes that you have a basic understanding of SQL Server Always On availability groups. If you need more information, see [Overview of Always On availability groups (SQL Server)](https://learn.microsoft.com/sql/database-engine/availability-groups/windows/overview-of-always-on-availability-groups-sql-server).

Before you begin the procedures in this tutorial, you need to complete [Prerequisites for creating Always On availability groups in Azure virtual machines](availability-group-manually-configure-prerequisites-tutorial-single-subnet.md). If you completed these prerequisites already, you can jump to [Create the cluster](#create-the-cluster).

The following table summarizes the prerequisites that you need before you can complete this tutorial:

| Requirement | Description |
| --- | --- | --- |
|  **Two SQL Server instances** | - In an Azure availability set<br />- In a single domain<br />- With failover clustering installed |
|  **Windows Server** | File share for a cluster witness |
|  **SQL Server service account** | Domain account |
|  **SQL Server Agent service account** | Domain account |
|  **Firewall ports open** | - SQL Server: **1433** for a default instance<br />- Database mirroring endpoint: **5022** or any available port<br />- Load balancer IP address health probe for an availability group: **59999** or any available port<br />- Load balancer IP address health probe for cluster core: **58888** or any available port |
|  **Failover clustering** | Required for both SQL Server instances |
|  **Installation domain account** | - Local administrator on each SQL Server instance<br />- Member of the **sysadmin** fixed server role for each SQL Server instance |
|  **Network Security Groups (NSGs)** | If the environment is using [Network security groups](https://learn.microsoft.com/azure/virtual-network/network-security-groups-overview), ensure that the current configuration **allows Network traffic** through ports described in [Configure the firewall](availability-group-manually-configure-prerequisites-tutorial-single-subnet.md#endpoint-firewall). |

<a id="create-the-cluster"></a>

## Create the cluster

The first task is to create a Windows Server failover cluster with both SQL Server VMs and a witness server:

1. Use [Bastion](https://learn.microsoft.com/azure/bastion/bastion-connect-vm-rdp-windows) to connect to the first SQL Server VM. Use a domain account that's an administrator on both SQL Server VMs and the witness server.

   > **Tip:**  
   > In the [Prerequisites](availability-group-manually-configure-prerequisites-tutorial-single-subnet.md), you created an account called **CORP\Install**. Use this account.

1. On the **Server Manager** dashboard, select **Tools**, and then select **Failover Cluster Manager**.
1. On the left pane, right-click **Failover Cluster Manager**, and then select **Create Cluster**.

   Screenshot of Failover Cluster Manager and the option for creating a cluster on the shortcut menu.

1. In the **Create Cluster Wizard**, create a one-node cluster by stepping through the pages with the settings in the following table:

   | Page | Setting |
   | --- | --- |
   | **Before You Begin** | Use defaults. |
   | **Select Servers** | Enter the first SQL Server VM name in **Enter server name**, and then select **Add**. |
   | **Validation Warning** | Select **No. I don't require support from Microsoft for this cluster, and therefore don't want to run the validation tests. When I select Next, continue Creating the cluster**. |
   | **Access Point for Administering the Cluster** | In **Cluster Name**, enter a cluster name (for example, **SQLAGCluster1**). |
   | **Confirmation** | Use defaults unless you're using Storage Spaces. |

### Set the Windows Server failover cluster's IP address

> **Note:**  
> On Windows Server 2019, the cluster creates a **Distributed Server Name** value instead of the **Cluster Network Name** value. If you're using Windows Server 2019, skip any steps that refer to the cluster core name in this tutorial. You can create a cluster network name by using [PowerShell](failover-cluster-instance-storage-spaces-direct-manually-configure.md#create-windows-failover-cluster). For more information, review the blog post [Failover Cluster: Cluster Network Object](https://blogs.windows.com/windowsexperience/2018/08/14/announcing-windows-server-2019-insider-preview-build-17733/#W0YAxO8BfwBRbkzG.97).

1. In **Failover Cluster Manager**, scroll down to **Cluster Core Resources**, and expand the cluster details. Both the **Name** and **IP Address** resources should be in the **Failed** state.

   The IP address resource can't be brought online because the cluster is assigned the same IP address as the machine itself. It's a duplicate address.

1. Right-click the failed **IP Address** resource, and then select **Properties**.

   Screenshot of Failover Cluster Manager that shows selections for opening properties for the IP address.

1. Select **Static IP Address**. Specify an available address from the same subnet as your virtual machines.

1. In the **Cluster Core Resources** section, right-click the cluster name, and select **Bring Online**. Wait until both resources are online.

   When the cluster name resource comes online, it updates the domain controller server with a new Active Directory computer account. Use this Active Directory account to run the availability group's clustered service later.

<a id="addNode"></a>

### Add the other SQL Server instance to the cluster

1. In the browser tree, right-click the cluster, and select **Add Node**.

   Screenshot of Failover Cluster Manager that shows selections for adding a node to a cluster.

1. In the **Add Node Wizard**, select **Next**.

1. On the **Select Servers** page, add the second SQL Server VM. Enter the VM name in **Enter server name**, and then select **Add** > **Next**.

1. On the **Validation Warning** page, select **No**. (In a production scenario, you should perform the validation tests.) Then, select **Next**.

1. On the **Confirmation** page, if you're using Storage Spaces, clear the **Add all eligible storage to the cluster** checkbox.

   Screenshot of the page in the Add Node Wizard that confirms the addition of a node to the cluster.

   > **Warning:**  
   > If you don't clear **Add all eligible storage to the cluster**, Windows detaches the virtual disks during the clustering process. As a result, they don't appear in **Disk Manager** or **Object Explorer** until the storage is removed from the cluster and reattached via PowerShell.

1. Select **Next**.

1. Select **Finish**.

   **Failover Cluster Manager** shows that your cluster has a new node and lists it in the **Nodes** container.

1. Sign out of the remote desktop session.

### Add a file share for a cluster quorum

In this example, the Windows cluster uses a file share to create a cluster quorum. This tutorial uses a `NodeAndFileShareMajority` quorum. For more information, see [Configure and manage quorum](https://learn.microsoft.com/windows-server/failover-clustering/manage-cluster-quorum).

1. Connect to the file share witness server VM by using a remote desktop session.

1. In **Server Manager**, select **Tools**. Open **Computer Management**.

1. Select **Shared Folders**.

1. Right-click **Shares**, and then select **New Share**.

   Screenshot that shows selections for creating a new share in Computer Management.

   Use the **Create a Shared Folder Wizard** to create a share.

1. On the **Folder Path** page, select **Browse**. Locate or create a path for the shared folder, and then select **Next**.

1. On the **Name, Description, and Settings** page, verify the share name and path. Select **Next**.

1. On the **Shared Folder Permissions** page, set **Customize permissions**. Select **Custom**.

1. In the **Customize Permissions** dialog, select **Add**.

1. Make sure that the account that's used to create the cluster has full control.

   Screenshot of the dialog for customizing permissions, showing that the Install account has full control of the share.

1. Select **OK**.

1. On the **Shared Folder Permissions** page, select **Finish**. Then select **Finish** again.

1. Sign out of the server.

### Configure the cluster quorum

> **Note:**  
> Depending on the configuration of your availability group, it might be necessary to change the quorum vote of a node that's participating in the Windows Server failover cluster. For more information, see [Configure cluster quorum for SQL Server on Azure VMs](hadr-cluster-quorum-configure-how-to.md).

1. Connect to the first cluster node by using a remote desktop session.

1. In **Failover Cluster Manager**, right-click the cluster, point to **More Actions**, and then select **Configure Cluster Quorum Settings**.

   Screenshot of Failover Cluster Manager that shows selections for configuring cluster quorum settings.

1. In the **Configure Cluster Quorum Wizard**, select **Next**.

1. On the **Select Quorum Configuration Option** page, choose **Select the quorum witness**, and then select **Next**.

1. On the **Select Quorum Witness** page, select **Configure a file share witness**.

   > **Tip:**  
   > Windows Server 2016 and later versions support a cloud witness. If you choose this type of witness, you don't need a file share witness. For more information, see [Deploy a cloud witness for a failover cluster](https://learn.microsoft.com/windows-server/failover-clustering/deploy-cloud-witness). This tutorial uses a file share witness, which previous operating systems support.

1. In **Configure File Share Witness**, enter the path for the share that you created. Then select **Next**.

1. On the **Confirmation** page, verify the settings. Then select **Next**.

1. Select **Finish**.

The cluster core resources are configured with a file share witness.

## Enable availability groups

Next, enable Always On availability groups. Complete these steps on both SQL Server VMs.

1. From the **Start** screen, open **SQL Server Configuration Manager**.
1. In the browser tree, select **SQL Server Services**. Then right-click the **SQL Server (MSSQLSERVER)** service and select **Properties**.
1. Select the **Always On High Availability** tab, and then select **Enable Always On availability groups**.

   Screenshot that shows selections for enabling Always On availability groups.

1. Select **Apply**. Select **OK** in the pop-up dialog.

1. Restart the SQL Server service.

## Enable FILESTREAM feature

If you're not using FILESTREAM for your database in the availability group, skip this step and move to the next step - **Create Database**.

If you plan on adding a database to your availability group that uses [FILESTREAM](https://learn.microsoft.com/sql/database-engine/availability-groups/windows/filestream-and-filetable-with-always-on-availability-groups-sql-server), then FILESTREAM needs to be enabled as the feature is disabled by default. Use the **SQL Server Configuration Manager** to enable the feature on both SQL Server instances.

To [enable the FILESTREAM feature](https://learn.microsoft.com/sql/relational-databases/blob/enable-and-configure-filestream), follow these steps:

1. Connect to the first SQL Server VM (such as **SQL-VM-1**) with a domain account that is a member of sysadmin fixed server role, such as the **CORP\Install** domain account created in the [Prerequisites document](availability-group-manually-configure-prerequisites-tutorial-multi-subnet.md)
1. From the **Start** screen of one of your SQL Server VMs, launch **SQL Server Configuration Manager**.
1. In the browser tree, highlight **SQL Server Services**, right-click the **SQL Server (MSSQLSERVER)** service, and select **Properties**.
1. Select the **FILESTREAM** tab, and then check the box to **Enable FILESTREAM for Transact-SQL access**:
1. Select **Apply**. Select **OK** in the pop-up dialog.
1. In SQL Server Management Studio, select **New Query** to display the Query Editor.
1. In Query Editor, enter the following Transact-SQL code:

   ```sql
   EXEC sp_configure filestream_access_level, 2
   RECONFIGURE
   ```

1. Select **Execute**.
1. Restart the SQL Server service.
1. Repeat these steps for the other SQL Server instance.

<!-----------------

<a id="endpoint-firewall"></a>

## Open a firewall for the database mirroring endpoint

Each instance of SQL Server that participates in an availability group requires a database mirroring endpoint. This endpoint is a TCP port for the instance of SQL Server that's used to synchronize the database replicas in the availability groups on that instance.

On both SQL Server VMs, open the firewall for the TCP port for the database mirroring endpoint:

1. On the **Start** screen for the first SQL Server VM, open **Windows Firewall with Advanced Security**.
1. On the left pane, select **Inbound Rules**. On the right pane, select **New Rule**.
1. For **Rule Type**, select **Port**.
1. For the port, specify **TCP** and choose an unused TCP port number. For example, enter *5022*. Then select **Next**.

   > [!NOTE]  
   > The example in this tutorial uses TCP port 5022. You can use any available port.

1. On the **Action** page, keep **Allow the connection** selected and select **Next**.
1. On the **Profile** page, accept the default settings and select **Next**.
1. On the **Name** page, in the **Name** box, specify a rule name such as **Default Instance Mirroring Endpoint**. Then select **Finish**.

-------------------------->

## Create a database on the first SQL Server instance

1. Connect to the first SQL Server VM with a domain account that's a member of **sysadmin** fixed server role.
1. Open SQL Server Management Studio (SSMS), and connect to the first SQL Server instance.
1. In **Object Explorer**, right-click **Databases** and select **New Database**.
1. In **Database name**, enter **MyDB1**, and then select **OK**.

<a id="backupshare"></a>

### Create a backup share

1. On the first SQL Server VM in **Server Manager**, select **Tools**. Open **Computer Management**.

1. Select **Shared Folders**.

1. Right-click **Shares**, and then select **New Share**.

   Screenshot of selections for starting the process of creating a backup share.

   Use the **Create a Shared Folder Wizard** to create a share.

1. On the **Folder Path** page, select **Browse**. Locate or create a path for the database backup's shared folder, and then select **Next**.

1. On the **Name, Description, and Settings** page, verify the share name and path. Then select **Next**.

1. On the **Shared Folder Permissions** page, set **Customize permissions**. Then select **Custom**.

1. In the **Customize Permissions** dialog, select **Add**.

1. Check **Full Control** to grant full access to shared folder for the SQL Server service account (`Corp\SQLSvc`):

   Screenshot of the Customize Permissions dialog. Make sure that the SQL Server service accounts for both servers have full control.

1. Select **OK**.

1. On the **Shared Folder Permissions** page, select **Finish**. Select **Finish** again.

### Take a full backup of the database

You need to back up the new database to initialize the log chain. If you don't take a backup of the new database, it can't be included in an availability group.

1. In **Object Explorer**, right-click the database, point to **Tasks**, and then select **Back Up**.

1. Select **OK** to take a full backup to the default backup location.

## Create an availability group

You're now ready to create and configure an availability group by doing the following tasks:

- Create a database on the first SQL Server instance.
- Take both a full backup and a transaction log backup of the database.
- Restore the full and log backups to the second SQL Server instance by using the `NO RECOVERY` option.
- Create the availability group (**MyTestAG**) with synchronous commit, automatic failover, and readable secondary replicas.

### Create the availability group

1. Connect to your SQL Server VM by using remote desktop, and open SQL Server Management Studio.
1. In **Object Explorer** in SSMS, right-click **Always On High Availability**, and select **New Availability Group Wizard**.

   Screenshot of Object Explorer in SSMS, with the shortcut command for starting the New Availability Group Wizard.

1. On the **Introduction** page, select **Next**. On the **Specify Availability Group Options** page, enter a name for the availability group in the **Availability group name** box. For example, enter **MyTestAG**. Then select **Next**.

   Screenshot that shows specifying an availability group name in the New Availability Group Wizard in SSMS.

1. On the **Select Databases** page, select your database, and then select **Next**.

   > **Note:**  
   > The database meets the prerequisites for an availability group because you've taken at least one full backup on the intended primary replica.

   Screenshot that shows selecting databases in the New Availability Group Wizard in SSMS.

1. On the **Specify Replicas** page, select **Add Replica**.

   Screenshot of the button for adding a replica in the New Availability Group Wizard in SSMS.

1. In the **Connect to Server** dialog, for **Server name**, enter the name of the second SQL Server instance. Then select **Connect**.

   Back on the **Specify Replicas** page, you should now see the second server listed under **Availability Replicas**. Configure the replicas as follows.

   Screenshot that shows two servers listed as replicas in the New Availability Group Wizard in SSMS.

1. Select **Endpoints** to see the database mirroring endpoint for this availability group. Use the same port that you used when you set the [firewall rule for database mirroring endpoints](availability-group-manually-configure-prerequisites-tutorial-single-subnet.md#endpoint-firewall).

   Screenshot of the Endpoints tab in the New Availability Group Wizard in SSMS.

1. On the **Select Initial Data Synchronization** page, select **Full** and specify a shared network location. For the location, use the [backup share that you created](#backupshare). In the example, it was **\\\\<First SQL Server Instance\>\Backup\\**. Select **Next**.

   > **Note:**  
   > Full synchronization takes a full backup of the database on the first SQL Server instance and restores it to the second instance. For large databases, we don't recommend full synchronization because it might take a long time.
   >
   > You can reduce this time by manually taking a backup of the database and restoring it with `NO RECOVERY`. If the database is already restored with `NO RECOVERY` on the second SQL Server instance before you configure the availability group, select **Join only**. If you want to take the backup after configuring the availability group, select **Skip initial data synchronization**.

   Screenshot of the options for data synchronization in the New Availability Group Wizard in SSMS.

1. On the **Validation** page, select **Next**. This page should look similar to the following image:

   Screenshot of the page that shows the results of validation in the New Availability Group Wizard in SSMS.

   > **Note:**  
   > There's a warning for the listener configuration because you haven't configured an availability group listener. You can ignore this warning because on Azure virtual machines, you create the listener after you create the Azure load balancer.

1. On the **Summary** page, select **Finish**, and then wait while the wizard configures the new availability group. On the **Progress** page, you can select **More details** to view the detailed progress.

   After the wizard finishes the configuration, inspect the **Results** page to verify that the availability group is successfully created.

   Screenshot that shows successful completion of the New Availability Group Wizard in SSMS.

1. Select **Close** to close the wizard.

### Check the availability group

1. In **Object Explorer**, expand **Always On High Availability**, and then expand **Availability Groups**. You should now see the new availability group in this container. Right-click the availability group and select **Show Dashboard**.

   Screenshot of Object Explorer in SSMS that shows selections for opening a dashboard for an availability group.

   Your availability group dashboard should look similar to the following screenshot:

   Screenshot of the availability group dashboard in SSMS.

   The dashboard shows the replicas, the failover mode of each replica, and the synchronization state.

1. In **Failover Cluster Manager**, select your cluster. Select **Roles**.

   The availability group name that you used is a role on the cluster. That availability group doesn't have an IP address for client connections because you didn't configure a listener. You'll configure the listener after you create an Azure load balancer.

   Screenshot of an availability group in Failover Cluster Manager.

   > **Warning:**  
   > Don't try to fail over the availability group from Failover Cluster Manager. All failover operations should be performed on the availability group dashboard in SSMS. [Learn more about restrictions on using Failover Cluster Manager with availability groups](https://learn.microsoft.com/sql/database-engine/availability-groups/windows/failover-clustering-and-always-on-availability-groups-sql-server).
    >

At this point, you have an availability group with two SQL Server replicas. You can move the availability group between instances. You can't connect to the availability group yet because you don't have a listener.

In Azure virtual machines, the listener requires a load balancer. The next step is to create the load balancer in Azure.

<a id="configure-internal-load-balancer"></a>

## Create an Azure load balancer


> **Note:**
> Availability group deployments to [multiple subnets](availability-group-manually-configure-prerequisites-tutorial-multi-subnet.md) don't require a load balancer. In a single-subnet environment, customers who use SQL Server 2019 CU8 and later on Windows 2016 and later can replace the traditional virtual network name (VNN) listener and Azure Load Balancer with a [distributed network name (DNN) listener](availability-group-distributed-network-name-dnn-listener-configure.md). If you want to use a DNN, skip any tutorial steps that configure Azure Load Balancer for your availability group. 


On Azure virtual machines in a single subnet, a SQL Server availability group requires a load balancer. The load balancer holds the IP addresses for the availability group listeners and the Windows Server failover cluster. This section summarizes how to create the load balancer in the Azure portal.

> **Note:**
> The Basic load balancer has been retired. For new deployments, use the Standard load balancer. If you have an existing deployment that uses the Basic load balancer, [upgrade to the Standard load balancer](https://learn.microsoft.com/azure/load-balancer/load-balancer-basic-upgrade-guidance). 


1. In the Azure portal, go to the resource group that contains your SQL Server VMs and select **+ Add**.
1. Search for **load balancer**. Choose the load balancer that Microsoft publishes.

   Screenshot that shows selecting a Microsoft-published load balancer.

1. Select **Create**.
1. On the **Create load balancer** page, configure the following parameters for the load balancer:

   | Setting | Entry or selection |
   | --- | --- |
   | **Subscription** | Use the same subscription as the virtual machine. |
   | **Resource group** | Use the same resource group as the virtual machine. |
   | **Name** | Use a text name for the load balancer, such as **sqlLB**. |
   | **Region** | Use the same region as the virtual machine. |
   | **SKU** | Select **Standard**. |
   | **Type** | Select **Internal**. |

1. Select **Next: Frontend IP configuration**.

1. Select **+ Add a frontend IP configuration**.

   Screenshot of the button for creating a frontend IP configuration in the Azure portal.

1. Set up the frontend IP address by using the following values:

   - **Name**: Enter a name that identifies the frontend IP configuration.
   - **Virtual network**: Select the same network as the virtual machines.
   - **Subnet**: Select the same subnet as the virtual machines.
   - **Assignment**: Select **Static**.
   - **IP address**: Use an available address from the subnet. *Use this address for your availability group listener*. This address is different from your cluster IP address.
   - **Availability zone**: Optionally, choose an availability zone to deploy your IP address to.

   The following image shows the **Add frontend IP configuration** dialog:

   Screenshot of the Azure portal that shows the dialog for frontend IP configuration.

1. Select **Add**.

1. Choose **Review + Create** to validate the configuration. Then select **Create** to create the load balancer and the frontend IP address.

To configure the load balancer, you need to create a backend pool, create a probe, and set the load-balancing rules.

### Add a backend pool for the availability group listener

1. In the Azure portal, go to your resource group. You might need to refresh the view to see the newly created load balancer.

   Screenshot of the Azure portal that shows a load balancer in an availability group.

1. Select the load balancer, select **Backend pools**, and then select **+Add**.

1. For **Name**, provide a name for the backend pool.

1. For **Backend Pool Configuration**, select **NIC**.

1. Select **Add** to associate the backend pool with the availability set that contains the VMs.

1. Under **Virtual machine**, choose the virtual machines that will host availability group replicas. Don't include the file share witness server.

   > **Note:**  
   > If both virtual machines aren't specified, only connections to the primary replica will succeed.

1. Select **Add** to add the virtual machines to the backend pool.

1. Select **Save** to create the backend pool.

### Set the probe

1. In the Azure portal, select the load balancer, select **Health probes**, and then select **+Add**.

1. Set the listener health probe as follows:

   | Setting | Description | Example |
   | --- | --- | --- |
   | **Name** | Text | **SQLAlwaysOnEndPointProbe** |
   | **Protocol** | Choose TCP | **TCP** |
   | **Port** | Any unused port | **59999** |
   | **Interval** | The amount of time between probe attempts, in seconds | **5** |

1. Select **Add**.

### Set the load balancing rules

1. In the Azure portal, select the load balancer, select **Load balancing rules**, and then select **+Add**.

1. Set the listener's load-balancing rules as follows:

   | Setting | Description | Example |
   | --- | --- | --- |
   | **Name** | Text | **SQLAlwaysOnEndPointListener** |
   | **Frontend IP address** | Choose an address | Use the address that you created when you created the load balancer. |
   | **Backend pool** | Choose the backend pool | Select the backend pool that contains the virtual machines targeted for the load balancer. |
   | **Protocol** | Choose TCP | **TCP** |
   | **Port** | Use the port for the availability group listener | **1433** |
   | **Backend Port** | This field isn't used when a floating IP is set for direct server return | **1433** |
   | **Health Probe** | The name that you specified for the probe | **SQLAlwaysOnEndPointProbe** |
   | **Session Persistence** | Dropdown list | **None** |
   | **Idle Timeout** | Minutes to keep a TCP connection open | **4** |
   | **Floating IP (direct server return)** | A flow topology and an IP address mapping scheme | **Enabled** |

   > **Warning:**  
   > Direct server return is set during creation. You can't change it.

1. Select **Save**.

### Add the cluster core IP address for the Windows Server failover cluster

The IP address for the Windows Server failover cluster also needs to be on the load balancer. If you're using Windows Server 2019, skip this process because the cluster creates a **Distributed Server Name** value instead of the **Cluster Network Name** value.

1. In the Azure portal, go to the same Azure load balancer. Select **Frontend IP configuration**, and then select **+Add**. Use the IP address that you configured for the Windows Server failover cluster in the cluster core resources. Set the IP address as **Static**.

1. On the load balancer, select **Health probes**, and then select **+Add**.

1. Set the cluster core IP address health probe for the Windows Server failover cluster as follows:

   | Setting | Description | Example |
   | --- | --- | --- |
   | **Name** | Text | **WSFCEndPointProbe** |
   | **Protocol** | Choose TCP | **TCP** |
   | **Port** | Any unused port | **58888** |
   | **Interval** | The amount of time between probe attempts, in seconds | **5** |

1. Select **Add** to set the health probe.

1. Select **Load balancing rules**, and then select **+Add**.

1. Set the load-balancing rules for the cluster core IP address as follows:

   | Setting | Description | Example |
   | --- | --- | --- |
   | **Name** | Text | **WSFCEndPoint** |
   | **Frontend IP address** | Choose an address | Use the address that you created when you configured the IP address for the Windows Server failover cluster. This is different from the listener IP address. |
   | **Backend pool** | Choose the backend pool | Select the backend pool that contains the virtual machines targeted for the load balancer. |
   | **Protocol** | Choose TCP | **TCP** |
   | **Port** | Use the port for the cluster IP address. This is an available port that isn't used for the listener probe port. | **58888** |
   | **Backend Port** | This field isn't used when a floating IP is set for direct server return | **58888** |
   | **Probe** | The name that you specified for the probe | **WSFCEndPointProbe** |
   | **Session Persistence** | Dropdown list | **None** |
   | **Idle Timeout** | Minutes to keep a TCP connection open | **4** |
   | **Floating IP (direct server return)** | A flow topology and an IP address mapping scheme | **Enabled** |

   > **Warning:**  
   > Direct server return is set during creation. You can't change it.

1. Select **OK**.

<a id="configure-listener"></a>

## Configure the listener

The next thing to do is configure an availability group listener on the failover cluster.

> **Note:**  
> This tutorial shows how to create a single listener, with one IP address for the internal load balancer. To create listeners by using one or more IP addresses, see [Configure one or more Always On availability group listeners](availability-group-listener-powershell-configure.md).

The availability group listener is an IP address and network name that the SQL Server availability group listens on. To create the availability group listener:

1. <a name="getnet"></a>Get the name of the cluster network resource:

   a. Use [Bastion](https://learn.microsoft.com/azure/bastion/bastion-connect-vm-rdp-windows) to connect to the Azure virtual machine that hosts the primary replica.

   b. Open **Failover Cluster Manager**.

   c. Select the **Networks** node, and note the cluster network name. Use this name in the `$ClusterNetworkName` variable in the PowerShell script. In the following image, the cluster network name is **Cluster Network 1**:

   Screenshot that shows a cluster network name in Failover Cluster Manager.

1. <a name="addcap"></a>Add the client access point. The client access point is the network name that applications use to connect to the databases in an availability group.

   a. In **Failover Cluster Manager**, expand the cluster name, and then select **Roles**.

   b. On the **Roles** pane, right-click the availability group name, and then select **Add Resource** > **Client Access Point**.

   Screenshot of Failover Cluster Manager that shows selecting the Client Access Point command on the shortcut menu for the availability group.

   c. In the **Name** box, create a name for this new listener.
  The name for the new listener is the network name that applications use to connect to databases in the SQL Server availability group.

   d. To finish creating the listener, select **Next** twice, and then select **Finish**. Don't bring the listener or resource online at this point.

1. Take the cluster role for the availability group offline. In **Failover Cluster Manager**, under **Roles**, right-click the role, and then select **Stop Role**.

1. <a name="congroup"></a>Configure the IP resource for the availability group:

   a. Select the **Resources** tab, and then expand the client access point that you created. The client access point is offline.

   Screenshot of Failover Cluster Manager that shows an offline status for a client access point.

   b. Right-click the IP resource, and then select **Properties**. Note the name of the IP address, and use it in the `$IPResourceName` variable in the PowerShell script.

   c. Under **IP Address**, select **Static IP Address**. Set the IP address as the same address that you used when you set the load balancer address on the Azure portal.

   Screenshot of Failover Cluster Manager that shows the selection of an IP address.
    
1. <a name = "dependencyGroup"></a>Make the SQL Server availability group dependent on the client access point:

   a. In **Failover Cluster Manager**, select **Roles**, and then select your availability group.

   b. On the **Resources** tab, under **Other Resources**, right-click the availability group resource, and then select **Properties**.

   c. On the **Dependencies** tab, add the name of the client access point (the listener).

   Screenshot of Failover Cluster Manager that shows adding a name on the Dependencies tab.

   d. Select **OK**.

1. <a name="listname"></a>Make the client access point dependent on the IP address:

   a. In **Failover Cluster Manager**, select **Roles**, and then select your availability group.

   b. On the **Resources** tab, right-click the client access point under **Server Name**, and then select **Properties**.

   Screenshot of Failover Cluster Manager that shows the Properties menu option for the listener's name.

   c. Select the **Dependencies** tab. Verify that the IP address is a dependency. If it isn't, set a dependency on the IP address. If multiple resources are listed, verify that the IP addresses have `OR`, not `AND`, dependencies. Then select **OK**.

   Screenshot of the Dependencies tab that shows an IP resource for an availability group.

   > **Tip:**  
   > You can validate that the dependencies are correctly configured. In **Failover Cluster Manager**, go to **Roles**, right-click the availability group, select **More Actions**, and then select **Show Dependency Report**. When the dependencies are correctly configured, the availability group is dependent on the network name, and the network name is dependent on the IP address.


1. <a name="setparam"></a>Set the cluster parameters in PowerShell:

   a. Copy the following PowerShell script to one of your SQL Server instances. Update the variables for your environment.

   - `$ClusterNetworkName` find the name in the **Failover Cluster Manager** by selecting **Networks**, right-click the network and select **Properties**. The **$ClusterNetworkName** is under **Name** on the General tab.

   - `$IPResourceName` is the name given to the IP Address resource in the **Failover Cluster Manager**. This is found in the **Failover Cluster Manager** by selecting **Roles**, select the **SQL Server AG or FCI name**, select the **Resources** tab under **Server Name**, right-click the IP address resource and select **Properties**. The correct value is under **Name** on the General tab.

   - `$ListenerILBIP` is the IP address that you created on the Azure load balancer for the availability group listener. Find the **$ListenerILBIP** in the **Failover Cluster Manager** on the same properties page as the SQL Server AG/FCI Listener Resource Name.

   - `$ListenerProbePort` is the port that you configured on the Azure load balancer for the availability group listener, such as 59999. Any unused TCP port is valid.

   ```powershell
   $ClusterNetworkName = "<MyClusterNetworkName>" # The cluster network name. Use Get-ClusterNetwork on Windows Server 2012 or later to find the name.
   $IPResourceName = "<IPResourceName>" # The IP address resource name.
   $ListenerILBIP = "<n.n.n.n>" # The IP address of the internal load balancer. This is the static IP address for the load balancer that you configured in the Azure portal.
   [int]$ListenerProbePort = <nnnnn>

   Import-Module FailoverClusters

   Get-ClusterResource $IPResourceName | Set-ClusterParameter -Multiple @{"Address"="$ListenerILBIP";"ProbePort"=$ListenerProbePort;"SubnetMask"="255.255.255.255";"Network"="$ClusterNetworkName";"EnableDhcp"=0}
   ```

   b. Set the cluster parameters by running the PowerShell script on one of the cluster nodes.

   > **Note:**  
   > If your SQL Server instances are in separate regions, you need to run the PowerShell script twice. The first time, use the `$ListenerILBIP` and `$ListenerProbePort` values from the first region. The second time, use the `$ListenerILBIP` and `$ListenerProbePort` values from the second region. The cluster network name and the cluster IP resource name are also different for each region.

1. Bring the cluster role for the availability group online. In **Failover Cluster Manager**, under **Roles**, right-click the role, and then select **Start Role**.

If necessary, repeat the preceding steps to set the cluster parameters for the IP address of the Windows Server failover cluster:

1. Get the IP address name of the Windows Server failover cluster. In **Failover Cluster Manager**, under **Cluster Core Resources**, locate **Server Name**.

1. Right-click **IP Address**, and then select **Properties**.

1. Copy the name of the IP address from **Name**. It might be **Cluster IP Address**.

1. <a name="setwsfcparam"></a>Set the cluster parameters in PowerShell:
  
   a. Copy the following PowerShell script to one of your SQL Server instances. Update the variables for your environment.

   - `$ClusterCoreIP` is the IP address that you created on the Azure load balancer for the Windows Server failover cluster's core cluster resource. It's different from the IP address for the availability group listener.

   - `$ClusterProbePort` is the port that you configured on the Azure load balancer for the Windows Server failover cluster's health probe. It's different from the probe for the availability group listener.

   ```powershell
   $ClusterNetworkName = "<MyClusterNetworkName>" # The cluster network name. Use Get-ClusterNetwork on Windows Server 2012 or later to find the name.
   $IPResourceName = "<ClusterIPResourceName>" # The IP address resource name.
   $ClusterCoreIP = "<n.n.n.n>" # The IP address of the cluster IP resource. This is the static IP address for the load balancer that you configured in the Azure portal.
   [int]$ClusterProbePort = <nnnnn> # The probe port from WSFCEndPointprobe in the Azure portal. This port must be different from the probe port for the availability group listener.

   Import-Module FailoverClusters

   Get-ClusterResource $IPResourceName | Set-ClusterParameter -Multiple @{"Address"="$ClusterCoreIP";"ProbePort"=$ClusterProbePort;"SubnetMask"="255.255.255.255";"Network"="$ClusterNetworkName";"EnableDhcp"=0}
   ```

   b. Set the cluster parameters by running the PowerShell script on one of the cluster nodes.

If any SQL resource is configured to use a port between 49,152 and 65,536 (the [default dynamic port range for TCP/IP](https://learn.microsoft.com/windows/client-management/troubleshoot-tcpip-port-exhaust#default-dynamic-port-range-for-tcpip)), add an exclusion for each port. Such resources might include:

- SQL Server database engine
- Always On availability group listener
- Health probe for the failover cluster instance
- Database mirroring endpoint
- Cluster core IP resource

Adding an exclusion will prevent other system processes from being dynamically assigned to the same port. For this scenario, configure the following exclusions on all cluster nodes:

- `netsh int ipv4 add excludedportrange tcp startport=58888 numberofports=1 store=persistent`
- `netsh int ipv4 add excludedportrange tcp startport=59999 numberofports=1 store=persistent`

It's important to configure the port exclusion when the port isn't in use. Otherwise, the command will fail with a message like `The process cannot access the file because it is being used by another process`.
To confirm that the exclusions are configured correctly, use the following command: `netsh int ipv4 show excludedportrange tcp`.

> **Warning:**  
> The port for the availability group listener's health probe has to be different from the port for the cluster core IP address's health probe. In these examples, the listener port is 59999 and the cluster core IP address's health probe port is 58888. Both ports require an "allow inbound" firewall rule.


## Set the listener port

In SQL Server Management Studio, set the listener port:

1. Open SQL Server Management Studio and connect to the primary replica.

1. Go to **Always On High Availability** > **Availability groups** > **Availability group listeners**.

1. Right-click the listener name that you created in Failover Cluster Manager, and then select **Properties**.

1. In the **Port** box, specify the port number for the availability group listener. The default is 1433. Select **OK**.

You now have an availability group for SQL Server on Azure VMs running in Azure Resource Manager mode.

## Test the connection to the listener

To test the connection:

1. Use [Bastion](https://learn.microsoft.com/azure/bastion/bastion-connect-vm-rdp-windows) to connect to a SQL Server VM that's in the same virtual network but doesn't own the replica, such as the other replica.

1. Use the **sqlcmd** utility to test the connection. For example, the following script establishes a **sqlcmd** connection to the primary replica through the listener by using Windows authentication:

   ```cmd
   sqlcmd -S <listenerName> -E
   ```

   If the listener is using a port other than the default port (1433), specify the port in the connection string. For example, the following command connects to a listener at port 1435:

   ```cmd
   sqlcmd -S <listenerName>,1435 -E
   ```

The **sqlcmd** utility automatically connects to whichever SQL Server instance is the current primary replica of the availability group.

> **Tip:**  
> Make sure that the port you specify is open on the firewall of both SQL Server VMs. Both servers require an inbound rule for the TCP port that you use. For more information, see [Add or edit firewall rules](https://learn.microsoft.com/previous-versions/orphan-topics/ws.11/cc753558\(v=ws.11\)).
>

## Related content

- [Add an IP address to a load balancer for a second availability group](availability-group-listener-powershell-configure.md#Add-IP)
- [Configure automatic or manual failover](https://learn.microsoft.com/sql/database-engine/availability-groups/windows/change-the-failover-mode-of-an-availability-replica-sql-server)
- [Windows Server Failover Cluster with SQL Server on Azure VMs](hadr-windows-server-failover-cluster-overview.md)
- [Always On availability group on SQL Server on Azure VMs](availability-group-overview.md)
- [Overview of Always On availability groups](https://learn.microsoft.com/sql/database-engine/availability-groups/windows/overview-of-always-on-availability-groups-sql-server)
- [HADR configuration best practices (SQL Server on Azure VMs)](hadr-cluster-best-practices.md)
