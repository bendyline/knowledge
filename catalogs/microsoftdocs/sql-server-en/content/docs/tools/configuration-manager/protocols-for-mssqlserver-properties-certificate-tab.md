---
title: "Protocols for MSSQLSERVER Properties (Certificate Tab)"
description: Select a certificate for SQL Server, or view certificate properties by using the Certificate tab on the Protocols for MSSQLSERVER Properties dialog box.
author: rwestMSFT
ms.author: randolphwest
ms.date: 12/15/2025
ms.service: sql
ms.subservice: tools-other
ms.topic: ui-reference
ms.collection:
  - data-tools
f1_keywords:
  - "sql13.swb.computermgr.cert.general.f1"
helpviewer_keywords:
  - "MSSQLSERVER property protocols"
monikerRange: ">=sql-server-2017"
---
# Protocols for MSSQLSERVER Properties (Certificate tab)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows


Use the **Certificate** tab on the **Protocols for MSSQLSERVER Properties** dialog box to select a certificate for  SQL Server 
, or to view the properties of a certificate. All fields are blank until a certificate is selected.

Certificates are stored locally for the users on the computer. To load a certificate for use by  SQL Server 
, you must be running  SQL Server 
 Configuration Manager under the same user account as the  SQL Server 
 service.

## Page Header

#### View

Provides access to additional details on the certificate. Not available until a certificate is selected in the **Certificate** box. For additional information on certificate details, see your Windows documentation.

#### Clear

Removes the selection from the **Certificate** box.

#### Certificate

Name of certificate as determined by security provider. Select a certificate to see the details in the properties grid.

## Options

#### Expiration Date

The final date for the period in which the certificate is valid.

#### Friendly Name

A friendly or common name for the individual or certification authority to whom the certificate is issued.

#### Issued By

Information regarding the certification authority that issued the certificate.

#### Issued To

Information regarding the recipient of the certificate.
