---
title: "Tutorial: Configure Microsoft Entra ID authentication manually for SQL Server on containers and Kubernetes"
description: Learn how to enable Microsoft Entra authentication for SQL Server on Linux containers without using Azure Arc.
author: rwestMSFT
ms.author: randolphwest
ms.date: 05/05/2026
ms.service: sql
ms.subservice: linux
ms.topic: tutorial
ms.custom:
  - linux-related-content
helpviewer_keywords:
  - "authentication [SQL Server] on Linux, Microsoft Entra"
  - "authenticate [SQL Server] Linux"
---
# Tutorial: Configure Microsoft Entra ID authentication manually for SQL Server on containers and Kubernetes


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Linux


This tutorial walks you through manually enabling Microsoft Entra ID authentication for  SQL Server 
 running in containers. Because Azure Arc doesn't currently support [container workloads](../../../sql-server/azure-arc/overview.md) for this scenario, you can configure Microsoft Entra ID authentication directly, for standalone containers and Kubernetes deployments.

For all other deployment scenarios, you should configure Microsoft Entra ID authentication through Azure Arc.

## Prerequisites

- Microsoft Entra ID is configured for your tenant.

-  SQL Server 
 can reach Microsoft Entra ID endpoints.

- A Microsoft Entra application is registered.

  Follow the directions in [Tutorial: Set up Microsoft Entra authentication for SQL Server with app registration](../../../relational-databases/security/authentication-access/azure-ad-authentication-sql-server-setup-tutorial.md) to register the application.

- A supported  SQL Server 
 Linux container image.

- Access to Docker or a Kubernetes cluster with `kubectl`.

## Overview of the configuration

Deployment models require:

1. A certificate associated with the Microsoft Entra application

1.  SQL Server 
 configured with:

   - Certificate path
   - Microsoft Entra application (client) ID
   - Microsoft Entra tenant ID

1. At least one Microsoft Entra login created in  SQL Server 
.

The difference between environments is how the certificate and configuration are supplied:

- **Containers**: environment variables or mounted files
- **Kubernetes**: ConfigMaps and Secrets

## Create the certificate

You need a certificate for  SQL Server 
 to authenticate to Microsoft Entra ID. For production environments, use a certificate issued by a trusted Certificate Authority (CA).

In this example, you can create a self-signed certificate using OpenSSL.

1. Create a self-signed certificate with the following command, and follow the prompts on-screen:

   ```bash
   openssl req -x509 -newkey rsa:4096 \
     -keyout mssql-entra-id-key.pem \
     -out mssql-entra-id-cert.pem \
     -days 365 -nodes
   ```

1. Verify the files:

   ```bash
   ls -lrt | grep mssql-entra-id
   ```

    Here's the result set. 


   ```output
   -rw------- 1 user user 3272 Sep 11 19:13 mssql-entra-id-key.pem
   -rw-rw-r-- 1 user user 2139 Sep 11 19:13 mssql-entra-id-cert.pem
   ```

1. Convert the certificate to `.pfx`. Leave the export password empty.

   ```bash
   openssl pkcs12 \
     -inkey mssql-entra-id-key.pem \
     -in mssql-entra-id-cert.pem \
     -nodes -export \
     -out mssql-entra-id.pfx
   ```

   > **Important:**  
   > If you use an export password,  SQL Server 
 fails to start.

1. Verify the files:

   ```bash
   ls -lrt | grep mssql-entra-id
   ```

    Here's the result set. 


   ```output
   -rw------- 1 user user 3272 Sep 11 19:13 mssql-entra-id-key.pem
   -rw-rw-r-- 1 user user 2139 Sep 11 19:13 mssql-entra-id-cert.pem
   -rw-rw-r-- 1 user user 2139 Sep 11 19:14 mssql-entra-id.pfx
   ```

1. Upload the *public certificate* to the registered Microsoft Entra application. If you obtain a trusted certificate from a CA, upload that instead.

   Screenshot of uploaded certificates in the Azure portal.

## Configure SQL Server containers (standalone)

1. Run  SQL Server 
 in a container with Microsoft Entra authentication enabled:

   ```bash
   docker run --name sql2025-entra \
     -e ACCEPT_EULA=Y \
     -e MSSQL_SA_PASSWORD='<password>' \
     -e MSSQL_AAD_CLIENT_ID='<client-id>' \
     -e MSSQL_AAD_PRIMARY_TENANT='<tenant-id>' \
     -e MSSQL_AAD_CERTIFICATE_FILE_PATH='/var/opt/mssql/mssql-entra-id.pfx' \
     -p 1433:1433 \
    -v "$PWD/mssql-entra-id.pfx:/var/opt/mssql/mssql-entra-id.pfx:ro" \
     -d mcr.microsoft.com/mssql/server:2025-latest
   ```

1. Verify inside the container:

   ```bash
   docker exec -it <container-id> bash
   cat /var/opt/mssql/log/errorlog | grep Entra
   ```

    Here's the result set. 


   ```output
   Microsoft Entra ID authentication is enabled. This is an informational message only; no user action is required.
   ```

Continue to [Create Microsoft Entra logins](#create-microsoft-entra-logins).

## Configure SQL Server containers on Kubernetes

The following diagram describes the steps for this deployment.

Diagram showing the flow diagram for Microsoft Entra ID authentication in a Kubernetes deployment.

### Step 1: Create a Secret for the certificate

1. Encode the `.pfx` file:

   ```bash
   base64 -w0 mssql-entra-id.pfx
   ```

1. Create `mssql-entra-cert.yaml`:

   ```yaml
   apiVersion: v1
   kind: Secret
   metadata:
     name: mssql-entra-cert
   type: Opaque
   data:
     mssql-entra-id: <BASE64_ENCODED_CERT>
   ```

1. Apply the Secret:

   ```bash
   kubectl apply -f mssql-entra-cert.yaml
   ```

### Step 2: Create the `sa` password Secret

The following command creates a Secret that stores the `sa` account password that you use to sign in to your  SQL Server 
 deployment. Replace `<password>` with a strong password.

> **Note:**  
> Your password should follow the  SQL Server 
 default [password policy](../../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


```bash
kubectl create secret generic mssql \
  --from-literal=MSSQL_SA_PASSWORD=<password>
```

### Step 3: Create the ConfigMap for `mssql.conf`

In this step, replace `<client-id>` with the client ID, and `<tenant-id>` with the tenant ID of the registered application in Microsoft Entra ID. You can get these details from the Azure portal.

Screenshot showing the keys in the Azure portal.

1. Create a ConfigMap file named `mssql-conf.yaml`:

   ```yaml
   apiVersion: v1
   kind: ConfigMap
   metadata:
     name: mssql-conf
   data:
     mssql.conf: |
       [EULA]
       accepteula = Y
   
       [sqlagent]
       enabled = false
   
       [licensing]
       azurebilling = false
   
       [network]
       aadcertificatefilepath = /var/opt/mssql/mssql-entra-id.pfx
       aadclientid = <client-id>
       aadprimarytenant = <tenant-id>
   ```

1. Apply the ConfigMap:

   ```bash
   kubectl apply -f mssql-conf.yaml
   ```

### Step 4: Deploy SQL Server

In this step, you deploy  SQL Server 2025 (17.x) 
 and enable Microsoft Entra ID authentication. You must mount the ConfigMap and Secrets into the  SQL Server 
 container, and use a supported  SQL Server 
 Linux image (for example, `mcr.microsoft.com/mssql/server:2025-latest`).

Make sure that the certificate file path in `mssql.conf` matches the mounted path, and the container runs with the required filesystem permissions.

1. Create a file called `mssql-deployment.yaml` with the following contents:

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: mssql-2025
     labels:
       app: mssql-2025
   spec:
     replicas: 1
     selector:
       matchLabels:
         app: mssql-2025
     template:
       metadata:
         labels:
           app: mssql-2025
       spec:
         securityContext:
           fsGroup: 10001
         containers:
         - name: mssql
           image: mcr.microsoft.com/mssql/server:2025-latest
           imagePullPolicy: IfNotPresent
           ports:
           - name: tds
             containerPort: 1433
           env:
           - name: ACCEPT_EULA
             value: "Y"
           - name: MSSQL_SA_PASSWORD
             valueFrom:
               secretKeyRef:
                 name: mssql
                 key: MSSQL_SA_PASSWORD
           - name: MSSQL_PID
             value: "Developer"
           volumeMounts:
           - name: mssql-conf
             mountPath: /var/opt/mssql/mssql.conf
             subPath: mssql.conf
             readOnly: true
           - name: mssql-entra-cert
             mountPath: /var/opt/mssql/mssql-entra-id.pfx
             subPath: mssql-entra-id
             readOnly: true
         volumes:
         - name: mssql-conf
           configMap:
             name: mssql-conf
             items:
             - key: mssql.conf
               path: mssql.conf
         - name: mssql-entra-cert
           secret:
             secretName: mssql-entra-cert
             items:
             - key: mssql-entra-id
               path: mssql-entra-id.pfx
   ```

1. Apply the deployment:

   ```bash
   kubectl apply -f mssql-deployment.yaml
   ```

### Step 5: Create a service

In this step, you create a load balancer service to connect to  SQL Server 
.

1. Create the service file named `mssql-service.yaml`.

   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: mssql
     labels:
       app: mssql-2025
   spec:
     type: LoadBalancer
     selector:
       app: mssql-2025
     ports:
       - name: tds
         port: 1433
         targetPort: 1433
   ```

1. Apply the service:

   ```bash
   kubectl apply -f mssql-service.yaml
   ```

Continue to [Create Microsoft Entra logins](#create-microsoft-entra-logins).

## Create Microsoft Entra logins

> **Important:**  
> If IPv6 is enabled on your server or container, make sure IPv6 endpoints are reachable and routable, or authentication to Microsoft Entra ID might fail. For more information, see [IPv6 connectivity with Microsoft Entra authentication](../../sql-server-linux-known-issues.md#ipv6-connectivity-with-microsoft-entra-authentication).

1. Connect to the  SQL Server 
 container using SQL Server Management Studio (SSMS), with the `sa` account and password you configured previously.

1. Create your Microsoft Entra-based login:

   ```sql
   CREATE LOGIN [user@contoso.com]
       FROM EXTERNAL PROVIDER;
   ```

1. Optionally, add the Microsoft Entra account to the **sysadmin** fixed server role, so that you can disable the `sa` account. For more information, see [Disable the `sa` account as a best practice](#disable-the-sa-account-as-a-best-practice).

   ```sql
   EXECUTE sp_addsrvrolemember
       @loginame = 'user@contoso.com',
       @rolename = 'sysadmin';
   ```

You can now authenticate using Microsoft Entra ID with password, integrated authentication, or multifactor authentication (MFA).

### Disable the `sa` account as a best practice

When you connect to your  SQL Server 
 instance using the system administrator (`sa`) account for the first time after installation, it's important for you to follow these steps, and then immediately disable the `sa` account as a security best practice.

1. Create a new login, and make it a member of the **sysadmin** server role.

   - Depending on whether you have a container or non-container deployment, enable Windows authentication, and create a new Windows-based login and add it to the **sysadmin** server role.

     - [Tutorial: Use adutil to configure Active Directory authentication with SQL Server on Linux](adutil-tutorial.md)

     - [Tutorial: Configure Active Directory authentication with SQL Server on Linux containers](../../containers/tutorial-adutil.md)

   - Otherwise, create a login using  SQL Server 
 authentication, and add it to the **sysadmin** server role.

1. Connect to the  SQL Server 
 instance using the new login you created.

1. Disable the `sa` account, as recommended for security best practice.


## Related content

- [Tutorial: Configure Active Directory authentication with SQL Server on Linux containers](../../containers/tutorial-adutil.md)
- [Configure SQL Server settings with environment variables on Linux](../../configure/environment-variables.md)
- [Tutorial: Set up Microsoft Entra authentication for SQL Server with app registration](../../../relational-databases/security/authentication-access/azure-ad-authentication-sql-server-setup-tutorial.md)
