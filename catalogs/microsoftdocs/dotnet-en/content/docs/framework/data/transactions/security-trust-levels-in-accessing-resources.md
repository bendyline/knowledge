---
title: "Security Trust Levels in Accessing Resources"
description: Understand security trust levels in accessing resources in .NET. There are 3 main levels of trust for System.Transactions.
ms.date: "03/30/2017"
ms.assetid: fb5be924-317d-4d69-b33a-3d18ecfb9d6e
---
# Security Trust Levels in Accessing Resources

This topic discusses how access is restricted on the types of resources that [System.Transactions](https://learn.microsoft.com/search/?terms=System.Transactions) exposes.

 There are three main levels of trust for [System.Transactions](https://learn.microsoft.com/search/?terms=System.Transactions). The trust levels are defined based on the types of resources that [System.Transactions](https://learn.microsoft.com/search/?terms=System.Transactions) exposes, and the level of trust that should be required to access those resources. The resources that [System.Transactions](https://learn.microsoft.com/search/?terms=System.Transactions) provides access to are system memory, shared process wide resources, and system wide resources. The levels are:

- **AllowPartiallyTrustedCallers** (APTCA) for applications using transactions within a single application domain.

- **DistributedTransactionPermission** (DTP) for applications using distributed transactions.

- Full trust for durable resources, configuration management applications, and legacy interop applications.

> **Note:**
> You should not call any of the enlistment interfaces with impersonated contexts.

## Trust Levels

### APTCA (Partial Trust)

 The [System.Transactions](https://learn.microsoft.com/search/?terms=System.Transactions) assembly can be called by partially trusted code because it has been marked with the `AllowPartiallyTrustedCallers` attribute (APTCA). This attribute essentially removes the implicit [System.Security.Permissions.SecurityAction.LinkDemand](https://learn.microsoft.com/search/?terms=System.Security.Permissions.SecurityAction.LinkDemand) for the **FullTrust** permission set that is otherwise automatically placed on each publicly accessible method in each type. However, some types and members still require stronger permissions.

 The APTCA attribute enables applications to use transactions in partial trust within a single application domain. This enables non-escalated transactions and volatile enlistments that can be used for error handling. One example of this is a transacted hash table and an application that uses it. Data can be added to and removed from the hash table under a single transaction. If the transaction is later rolled back, all of the changes made to the hash table under that transaction can be undone.

### DistributedTransactionPermission (DTP)

 When a [System.Transactions](https://learn.microsoft.com/search/?terms=System.Transactions) transaction is escalated to be managed by MSDTC, [System.Transactions](https://learn.microsoft.com/search/?terms=System.Transactions) demands the [System.Transactions.DistributedTransactionPermission](https://learn.microsoft.com/search/?terms=System.Transactions.DistributedTransactionPermission) (DTP) to create the distributed transaction. This means that the code that causes the transaction to be escalated (such as through serialization or additional durable enlistments) would need to be granted DTP. The code that originally created the [System.Transactions](https://learn.microsoft.com/search/?terms=System.Transactions) transaction does not necessarily need to possess this permission.

### FullTrust Link Demands

 This permission level is intended to restrict applications that are writing to durable resources. Upon failure, the application needs to be able to recover with the transaction manager to determine the final outcome of the transaction, so that it can update permanent data. This type of application is known as a durable source manager. A classic example of this type of application is SQL.

 To enable recovery, this type of application has the ability to permanently consume system resources. This is because the recoverable transaction manager must remember transactions that have committed until it can confirm that all durable resource managers that are participating in the transaction have received the outcome. Therefore, this type of application requires full trust and should not be run unless that level of trust has been granted.

 For more information on durable enlistments and recovery, see the [Enlisting Resources as Participants in a Transaction](enlisting-resources-as-participants-in-a-transaction.md) and [Performing Recovery](performing-recovery.md) topics.

 Applications that perform legacy interop work with COM+ are also required to have full trust.

 The following is a list of types and members that are not callable by partially trusted code because they are decorated with the **FullTrust** declarative security attribute:

 `PermissionSetAttribute(SecurityAction.LinkDemand, Name := "FullTrust")`

- [System.Transactions.Transaction.EnlistDurable*](https://learn.microsoft.com/search/?terms=System.Transactions.Transaction.EnlistDurable*)

- [System.Transactions.Transaction.EnlistPromotableSinglePhase*](https://learn.microsoft.com/search/?terms=System.Transactions.Transaction.EnlistPromotableSinglePhase*)

- [System.Transactions.TransactionInterop](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionInterop)

- [System.Transactions.TransactionManager.DistributedTransactionStarted](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionManager.DistributedTransactionStarted)

- [System.Transactions.HostCurrentTransactionCallback](https://learn.microsoft.com/search/?terms=System.Transactions.HostCurrentTransactionCallback)

- [System.Transactions.TransactionManager.Reenlist*](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionManager.Reenlist*)

- [System.Transactions.TransactionManager.RecoveryComplete*](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionManager.RecoveryComplete*)

- [System.Transactions.TransactionScope.%23ctor%28System.Transactions.TransactionScopeOption%2CSystem.Transactions.TransactionOptions%2CSystem.Transactions.EnterpriseServicesInteropOption%29](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionScope.%2523ctor%2528System.Transactions.TransactionScopeOption%252CSystem.Transactions.TransactionOptions%252CSystem.Transactions.EnterpriseServicesInteropOption%2529)

 Only the immediate caller is required to possess the **FullTrust** permission set to use the above types or methods.
