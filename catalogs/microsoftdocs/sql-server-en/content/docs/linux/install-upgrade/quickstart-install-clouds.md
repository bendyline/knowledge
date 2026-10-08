---
title: "Get Started with SQL Server (On Linux) in the Cloud"
titleSuffix: SQL Server
description: Learn how to install SQL Server on Red Hat Enterprise Linux (RHEL), SUSE Linux Enterprise Server (SLES), or Ubuntu in the cloud of your choice.
author: rwestMSFT
ms.author: randolphwest
ms.date: 01/02/2026
ms.service: sql
ms.subservice: linux
ms.topic: get-started
ms.custom:
  - intro-get-started
  - linux-related-content
  - build-2025
---
# Quickstart: Run SQL Server in the cloud


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Linux


In this quickstart, you install  SQL Server 
 on Red Hat Enterprise Linux (RHEL), SUSE Linux Enterprise Server (SLES), or Ubuntu in the cloud of your choice. To run  SQL Server 
 on Linux in Azure, see [Provision a Linux virtual machine running SQL Server in the Azure portal](https://learn.microsoft.com/azure/azure-sql/virtual-machines/linux/sql-vm-create-portal-quickstart).

If you choose to run a paid edition of  SQL Server 
, you must bring your own license (BYOL).

> **Note:**  
> Starting in  SQL Server 2025 (17.x) 
, SUSE Linux Enterprise Server (SLES) isn't supported.

## Amazon Web Services

1. Create a Linux AMI with at least 2 GB of memory from the marketplace:

   - [RHEL 9](https://aws.amazon.com/marketplace/pp/prodview-b5psjqk4f5f3k)
   - [SLES v15](https://aws.amazon.com/marketplace/pp/prodview-o5wqlcnuzvyv2)
   - [Ubuntu 22.04](https://aws.amazon.com/marketplace/pp/prodview-f2if34z3a4e3i)

1. Connect to the AMI by using **ssh**.

1. Follow the quickstart for the Linux distribution you chose:

   - [Red Hat Enterprise Linux](quickstart-install-red-hat.md)
   - [SUSE Linux Enterprise Server](quickstart-install-suse.md)
   - [Ubuntu](quickstart-install-ubuntu.md)
   - [Windows Subsystem for Linux (WSL 2)](quickstart-install-windows-subsystem-linux.md)

1. Configure for remote connections:

   1. Open the [Amazon EC2 console](https://console.aws.amazon.com/ec2/).

   1. In the navigation pane, choose **Security Groups**.

   1. Choose **Inbound, Edit, Add Rule**.

   1. Add an inbound rule to allow traffic on the port on which  SQL Server 
 listens (default TCP port 1433).

## DigitalOcean

1. Sign in to the [control panel](https://cloud.digitalocean.com/login) and select **Create a droplet**.

1. Choose an Ubuntu 22.04 droplet with at least 2 GB of memory.

1. Connect to the droplet by using **ssh**.

1. Follow the [Quickstart: Install SQL Server and create a database on Ubuntu](quickstart-install-ubuntu.md).

1. Configure for remote connections:

   1. At the top of the Control Panel, follow the **Networking** link and then select **Firewalls**.

   1. Add an inbound rule to allow traffic on the port on which  SQL Server 
 listens (default TCP port 1433).

## Google Cloud Platform

1. Create a Linux image with at least 2 GB of memory from the Cloud Launcher:

   - [RHEL 9](https://console.cloud.google.com/marketplace/details/rhel-cloud/rhel-9)
   - [SLES v15](https://console.cloud.google.com/marketplace/details/suse-cloud/sles-15)
   - [Ubuntu 22.04](https://console.cloud.google.com/marketplace/details/ubuntu-os-cloud/ubuntu-jammy)

1. Connect to the image by using **ssh**.

1. Follow the quickstart for the Linux distribution you chose:

   - [Red Hat Enterprise Linux](quickstart-install-red-hat.md)
   - [SUSE Linux Enterprise Server](quickstart-install-suse.md)
   - [Ubuntu](quickstart-install-ubuntu.md)
   - [Windows Subsystem for Linux (WSL 2)](quickstart-install-windows-subsystem-linux.md)

1. Configure for remote connections:

   1. Go to the [Firewall Rules](https://console.cloud.google.com/networking/firewalls).

   1. Add an inbound rule to allow traffic on the port on which  SQL Server 
 listens (default TCP port 1433).
