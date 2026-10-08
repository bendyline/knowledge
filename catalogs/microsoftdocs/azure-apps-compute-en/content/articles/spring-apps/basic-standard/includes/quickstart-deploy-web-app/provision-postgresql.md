---
author: KarlErickson
ms.author: xiada
ms.service: azure-spring-apps
ms.topic: include
ms.date: 08/19/2025
ms.update-cycle: 1095-days
---

<!--
For clarity of structure, a separate markdown file is used to describe how to provision PostgreSQL database.

[!INCLUDE [provision-postgresql-flexible](includes/quickstart-deploy-web-app/provision-postgresql.md)]

-->

Use the following steps to create an Azure Database for PostgreSQL server:

1. In the Azure portal, select **Create a resource**.

1. Select **Databases** > **Azure Database for PostgreSQL Flexible Server**.

   Screenshot of the Azure portal that shows the Create a resource page with Azure Database for PostgreSQL highlighted.

1. Fill out the **Basics** tab with the following information:

   - **Server name**: **my-demo-pgsql**
   - **Region**: **East US**
   - **PostgreSQL version**: **14**
   - **Workload type**: **Development**
   - **Enable high availability**: unselected
   - **Authentication method**: **PostgreSQL authentication only**
   - **Admin username**: **myadmin**
   - **Password** and **Confirm password**: Enter a password.

1. Configure the **Networking** tab using the following information:

   - **Connectivity method**: **Public access (allowed IP addresses)**
   - **Allow public access from any Azure service within Azure to this server**: selected

   Screenshot of the Azure portal that shows the Networking tab.

1. Select **Review + create** to review your selections, then select **Create** to provision the server. This operation might take a few minutes.

1. Go to your PostgreSQL server in the Azure portal.

1. Select **Databases** from the navigation menu to create a database - for example, **Todo**.

   Screenshot of the Azure portal that shows the Databases page with the Create Database pane open.
