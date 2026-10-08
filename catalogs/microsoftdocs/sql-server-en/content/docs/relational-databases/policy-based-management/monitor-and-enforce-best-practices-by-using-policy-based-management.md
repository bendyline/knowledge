---
title: "Monitor & enforce best practices using Policy-Based Management"
description: Policy-based management provides a set of policy files you can import as best practice policies and then  evaluate the policies against a target set that includes instances, objects, databases, or database objects.
author: VanMSFT
ms.author: vanto
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: security
ms.topic: best-practice
helpviewer_keywords:
  - "Best Practices [Database Engine]"
---
# Monitor and Enforce Best Practices by Using Policy-Based Management
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  Policy-Based Management allows you to monitor best practices for the  SQL Server Database Engine 
.  Evaluate policies manually, set policies to evaluate a target set according to a schedule, or set policies to evaluate a target set according to an event. For more information about Policy-Based Management, see [Administer Servers by Using Policy-Based Management](administer-servers-by-using-policy-based-management.md).  A set of [sample policy files](https://github.com/microsoft/sql-server-samples/tree/master/samples/features/epm-framework/sample-policies) is available that you can import as best practice policies, and then evaluate the policies against a target set that includes instances, instance objects, databases, or database objects.
  
## Policy and Rules for Database Engine  
 The following table lists the policies included in the set of [sample policies](https://github.com/microsoft/sql-server-samples/tree/master/samples/features/epm-framework/sample-policies) and information about the best practices rules each policy evaluates. The policies are stored as XML files and must be imported into  SQL Server 
. For more information about how to import policies, see [Import a Policy-Based Management Policy](import-a-policy-based-management-policy.md).  
  
| Policy name | Best practice rule |
| --- | --- |
| Asymmetric Key Encryption Algorithm | [Asymmetric Keys Encryption Strength](asymmetric-keys-encryption-strength.md) |
| Backup and Data File Location | [Backup Files Must Be on Separate Devices from the Database Files](../backup-restore/backup-devices-sql-server.md) |
| Data and Log File Location | [Place Data and Log Files on Separate Drives](place-data-and-log-files-on-separate-drives.md) |
| Database Auto Close | [Set the AUTO_CLOSE Database Option to OFF](set-the-auto-close-database-option-to-off.md) |
| Database Auto Shrink | [Set the AUTO_SHRINK Database Option to OFF](set-the-auto-shrink-database-option-to-off.md) |
| Database Collation | [Set the Collation of User-defined Databases to Match Those of the master and model Databases](https://learn.microsoft.com/previous-versions/sql/sql-server-2016/bb402915\(v=sql.130\)) |
| Database Page Verification | [Set the PAGE_VERIFY Database Option to CHECKSUM](set-the-page-verify-database-option-to-checksum.md) |
| Database Page Status | [Check Integrity of Database with Suspect Pages](check-integrity-of-database-with-suspect-pages.md) |
| Guest Permissions | [Guest Permissions on User Databases](guest-permissions-on-user-databases.md) |
| Last Successful Backup Date | [Outdated Backup](outdated-backup.md) |
| Public Not Granted Server Permissions | [Server public Permissions](server-public-permissions.md) |
| SQL Server 64-bit Affinity Mask Overlap | [Correct Affinity Mask and Affinity Input and Output Mask Overlap](correct-affinity-mask-and-affinity-input-and-output-mask-overlap.md) |
| SQL Server Affinity Mask | [Keep the Affinity Mask Default Value](keep-the-affinity-mask-default-value.md) |
| SQL Server Blocked Process Threshold | [Increase or Disable Blocked Process Threshold](increase-or-disable-blocked-process-threshold.md) |
| SQL Server Default Trace | [Default Trace Log Files Disabled](default-trace-log-files-disabled.md) |
| SQL Server Dynamic Locks | [Keep the Locks Configuration Option Default Value](keep-the-locks-configuration-option-default-value.md) |
| SQL Server Lightweight Pooling | [Disable Lightweight Pooling](disable-lightweight-pooling.md) |
| SQL Server Login Mode | [Choose an Authentication Mode](../security/choose-an-authentication-mode.md) |
| SQL Server Max Degree of Parallelism | [Set the Max Degree of Parallelism Option for Optimal Performance](set-the-max-degree-of-parallelism-option-for-optimal-performance.md) |
| SQL Server Max Worker Threads for 32-bit SQL Server 2000 | [Verify Max Worker Threads Setting](verify-max-worker-threads-setting.md) |
| SQL Server Max Worker Threads for 64-bit SQL Server 2000 | [Verify Max Worker Threads Setting](verify-max-worker-threads-setting.md) |
| SQL Server Max Worker Threads for SQL Server 2005 and above | [Verify Max Worker Threads Setting](verify-max-worker-threads-setting.md) |
| SQL Server Network Packet Size | [Network Packet Size Should Not Exceed 8060 Bytes](network-packet-size-should-not-exceed-8060-bytes.md) |
| SQL Server Password Expiration | [SQL Server Login Password Expiration](sql-server-login-password-expiration.md) |
| SQL Server Password Policy | [SQL Server Login Password Strength](sql-server-login-password-strength.md) |
| Symmetric Key Encryption for User Databases | [Symmetric Keys on User Databases](symmetric-keys-on-user-databases.md) |
| Symmetric Key for master Database | [Symmetric Keys on System Databases](symmetric-keys-on-system-databases.md) |
| Symmetric Key for System Databases | [Symmetric Keys on System Databases](symmetric-keys-on-system-databases.md) |
| Trustworthy Database | [Trustworthy Bit](trustworthy-bit.md) |
| Windows Event Log Cluster Disk Resource Corruption Error | [Detect SCSI Host Adapter Issues](detect-scsi-host-adapter-issues.md) |
| Windows Event Log Device Driver Control Error | [Device Driver Control Error](device-driver-control-error.md) |
| Windows Event Log Device Not Ready Error | [Device Not Ready Error](device-not-ready-error.md) |
| Windows Event Log Failed I_O Request Error | [Detect Failed Input and Output Requests](detect-failed-input-and-output-requests.md) |
| Windows Event Log I_O Delay Warning | [Check Disk Input and Output Subsystem for IO Delay Problems](check-disk-input-and-output-subsystem-for-io-delay-problems.md) |
| Windows Event Log I_O Error During Hard Page Fault Error | [Input and Output Error During Hard Page Fault](input-and-output-error-during-hard-page-fault.md) |
| Windows Event Log Read Retry Error | [Check Disk Input-Output Subsystem for Read Retry Problems](check-disk-input-output-subsystem-for-read-retry-problems.md) |
| Windows Event Log Storage System I_O Timeout Error | [Storage System Input-Output Time-out](storage-system-input-output-time-out.md) |
| Windows Event Log System Failure Error | [Unexpected System Failures](unexpected-system-failures.md) |
  
## Related content

- [Working with Policy-Based Management Facets](working-with-policy-based-management-facets.md)
