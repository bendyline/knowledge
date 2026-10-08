---
title: Transactions in Orleans
description: Learn how to use transactions in .NET Orleans.
ms.date: 05/23/2025
ms.topic: concept-article
---

# Orleans transactions

Orleans supports distributed ACID transactions against persistent grain state. Transactions are implemented using the [Microsoft.Orleans.Transactions](https://www.nuget.org/packages/Microsoft.Orleans.Transactions) NuGet package. The source code for the sample app in this article consists of four projects:

- **Abstractions**: A class library containing the grain interfaces and shared classes.
- **Grains**: A class library containing the grain implementations.
- **Server**: A console app that consumes the abstractions and grains class libraries and acts as the Orleans silo.
- **Client**: A console app that consumes the abstractions class library that represents the Orleans client.

## Setup

Orleans transactions are opt-in. Both the silo and the client must be configured to use transactions. If they aren't configured, any calls to transactional methods on a grain implementation receive an [Orleans.Transactions.OrleansTransactionsDisabledException](https://learn.microsoft.com/search/?terms=Orleans.Transactions.OrleansTransactionsDisabledException). To enable transactions on a silo, call [Orleans.Hosting.SiloBuilderExtensions.UseTransactions*](https://learn.microsoft.com/search/?terms=Orleans.Hosting.SiloBuilderExtensions.UseTransactions*) on the silo host builder:

```csharp
var builder = Host.CreateDefaultBuilder(args)
    .UseOrleans((context, siloBuilder) =>
    {
        siloBuilder.UseTransactions();
    });
```

Likewise, to enable transactions on the client, call [Orleans.Hosting.ClientBuilderExtensions.UseTransactions*](https://learn.microsoft.com/search/?terms=Orleans.Hosting.ClientBuilderExtensions.UseTransactions*) on the client host builder:

```csharp
var builder = Host.CreateDefaultBuilder(args)
    .UseOrleansClient((context, clientBuilder) =>
    {
        clientBuilder.UseTransactions();
    });
```

### Transactional state storage

To use transactions, you need to configure a data store. To support various data stores with transactions, Orleans uses the storage abstraction [Orleans.Transactions.Abstractions.ITransactionalStateStorage`1](https://learn.microsoft.com/search/?terms=Orleans.Transactions.Abstractions.ITransactionalStateStorage%601). This abstraction is specific to the needs of transactions, unlike generic grain storage ([Orleans.Storage.IGrainStorage](https://learn.microsoft.com/search/?terms=Orleans.Storage.IGrainStorage)). To use transaction-specific storage, configure the silo using any implementation of `ITransactionalStateStorage`, such as Azure ([Orleans.Hosting.AzureTableSiloBuilderExtensions.AddAzureTableTransactionalStateStorage*](https://learn.microsoft.com/search/?terms=Orleans.Hosting.AzureTableSiloBuilderExtensions.AddAzureTableTransactionalStateStorage*)).

For example, consider the following host builder configuration:

[source="snippets/transactions/Server/Program.cs"::: (complete source file; reference: snippets/transactions/Server/Program.cs)](../../../_code/docs/orleans/grains/snippets/transactions/Server/Program.cs.md)

For development purposes, if transaction-specific storage isn't available for the datastore you need, you can use an [Orleans.Storage.IGrainStorage](https://learn.microsoft.com/search/?terms=Orleans.Storage.IGrainStorage) implementation instead. For any transactional state without a configured store, transactions attempt to fail over to the grain storage using a bridge. Accessing transactional state via a bridge to grain storage is less efficient and might not be supported in the future. Therefore, we recommend using this approach only for development purposes.

## Grain interfaces

For a grain to support transactions, you must mark transactional methods on its grain interface as part of a transaction using the [Orleans.TransactionAttribute](https://learn.microsoft.com/search/?terms=Orleans.TransactionAttribute). The attribute needs to indicate how the grain call behaves in a transactional environment, as detailed by the following [Orleans.TransactionOption](https://learn.microsoft.com/search/?terms=Orleans.TransactionOption) values:

- [Orleans.TransactionOption.Create](https://learn.microsoft.com/search/?terms=Orleans.TransactionOption.Create): Call is transactional and will always create a new transaction context (it starts a new transaction), even if called within an existing transaction context.
- [Orleans.TransactionOption.Join](https://learn.microsoft.com/search/?terms=Orleans.TransactionOption.Join): Call is transactional but can only be called within the context of an existing transaction.
- [Orleans.TransactionOption.CreateOrJoin](https://learn.microsoft.com/search/?terms=Orleans.TransactionOption.CreateOrJoin): Call is transactional. If called within the context of a transaction, it will use that context, else it will create a new context.
- [Orleans.TransactionOption.Suppress](https://learn.microsoft.com/search/?terms=Orleans.TransactionOption.Suppress): Call is not transactional but can be called from within a transaction. If called within the context of a transaction, the context will not be passed to the call.
- [Orleans.TransactionOption.Supported](https://learn.microsoft.com/search/?terms=Orleans.TransactionOption.Supported): Call is not transactional but supports transactions. If called within the context of a transaction, the context will be passed to the call.
- [Orleans.TransactionOption.NotAllowed](https://learn.microsoft.com/search/?terms=Orleans.TransactionOption.NotAllowed):  Call is not transactional and cannot be called from within a transaction. If called within the context of a transaction, it will throw the [System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException).

You can mark calls as `TransactionOption.Create`, meaning the call always starts its transaction. For example, the `Transfer` operation in the ATM grain below always starts a new transaction involving the two referenced accounts.

[source="snippets/transactions/Abstractions/IAtmGrain.cs"::: (complete source file; reference: snippets/transactions/Abstractions/IAtmGrain.cs)](../../../_code/docs/orleans/grains/snippets/transactions/Abstractions/IAtmGrain.cs.md)

The transactional operations `Withdraw` and `Deposit` on the account grain are marked `TransactionOption.Join`. This indicates they can only be called within the context of an existing transaction, which would be the case if called during `IAtmGrain.Transfer`. The `GetBalance` call is marked `CreateOrJoin`, so you can call it either from within an existing transaction (like via `IAtmGrain.Transfer`) or on its own.

[source="snippets/transactions/Abstractions/IAccountGrain.cs"::: (complete source file; reference: snippets/transactions/Abstractions/IAccountGrain.cs)](../../../_code/docs/orleans/grains/snippets/transactions/Abstractions/IAccountGrain.cs.md)

### Important considerations

You cannot mark [Orleans.Grain.OnActivateAsync*](https://learn.microsoft.com/search/?terms=Orleans.Grain.OnActivateAsync*) as transactional because any such call requires proper setup before the call. It exists only for the grain application API. This means attempting to read transactional state as part of these methods throws an exception in the runtime.

## Grain implementations

A grain implementation needs to use an [Orleans.Transactions.Abstractions.ITransactionalState`1](https://learn.microsoft.com/search/?terms=Orleans.Transactions.Abstractions.ITransactionalState%601) facet to manage grain state via [ACID transactions](../overview.md#distributed-acid-transactions).

```csharp
public interface ITransactionalState<TState>
    where TState : class, new()
{
    Task<TResult> PerformRead<TResult>(
        Func<TState, TResult> readFunction);

    Task<TResult> PerformUpdate<TResult>(
        Func<TState, TResult> updateFunction);
}
```

Perform all read or write access to the persisted state via synchronous functions passed to the transactional state facet. This allows the transaction system to perform or cancel these operations transactionally. To use transactional state within a grain, define a serializable state class to be persisted and declare the transactional state in the grain's constructor using a [Orleans.Transactions.Abstractions.TransactionalStateAttribute](https://learn.microsoft.com/search/?terms=Orleans.Transactions.Abstractions.TransactionalStateAttribute). This attribute declares the state name and, optionally, which transactional state storage to use. For more information, see [Setup](#setup).

```csharp
[AttributeUsage(AttributeTargets.Parameter)]
public class TransactionalStateAttribute : Attribute
{
    public TransactionalStateAttribute(string stateName, string storageName = null)
    {
        // ...
    }
}
```

As an example, the `Balance` state object is defined as follows:

[source="snippets/transactions/Abstractions/Balance.cs"::: (complete source file; reference: snippets/transactions/Abstractions/Balance.cs)](../../../_code/docs/orleans/grains/snippets/transactions/Abstractions/Balance.cs.md)

The preceding state object:

- Is decorated with the [Orleans.CodeGeneration.GenerateSerializerAttribute](https://learn.microsoft.com/search/?terms=Orleans.CodeGeneration.GenerateSerializerAttribute) to instruct the Orleans code generator to generate a serializer.
- Has a `Value` property that's decorated with the [Orleans.IdAttribute](https://learn.microsoft.com/search/?terms=Orleans.IdAttribute) to uniquely identify the member.

The `Balance` state object is then used in the `AccountGrain` implementation as follows:

[source="snippets/transactions/Grains/AccountGrain.cs"::: (complete source file; reference: snippets/transactions/Grains/AccountGrain.cs)](../../../_code/docs/orleans/grains/snippets/transactions/Grains/AccountGrain.cs.md)

> **Important:**
> A transactional grain must be marked with the [Orleans.Concurrency.ReentrantAttribute](https://learn.microsoft.com/search/?terms=Orleans.Concurrency.ReentrantAttribute) to ensure that the transaction context is correctly passed to the grain call.

In the preceding example, the [Orleans.Transactions.Abstractions.TransactionalStateAttribute](https://learn.microsoft.com/search/?terms=Orleans.Transactions.Abstractions.TransactionalStateAttribute) declares that the `balance` constructor parameter should be associated with a transactional state named `"balance"`. With this declaration, Orleans injects an [Orleans.Transactions.Abstractions.ITransactionalState`1](https://learn.microsoft.com/search/?terms=Orleans.Transactions.Abstractions.ITransactionalState%601) instance with state loaded from the transactional state storage named `"TransactionStore"`. You can modify the state via [Orleans.Transactions.Abstractions.ITransactionalState`1.PerformUpdate*](https://learn.microsoft.com/search/?terms=Orleans.Transactions.Abstractions.ITransactionalState%601.PerformUpdate*) or read it via [Orleans.Transactions.Abstractions.ITransactionalState`1.PerformRead*](https://learn.microsoft.com/search/?terms=Orleans.Transactions.Abstractions.ITransactionalState%601.PerformRead*). The transaction infrastructure ensures that any such changes performed as part of a transaction (even among multiple grains distributed across an Orleans cluster) are either all committed or all undone upon completion of the grain call that created the transaction (`IAtmGrain.Transfer` in the preceding example).

## Call transaction methods from a client

The recommended way to call a transactional grain method is to use the `ITransactionClient`. Orleans automatically registers `ITransactionClient` with the dependency injection service provider when you configure the Orleans client. Use `ITransactionClient` to create a transaction context and call transactional grain methods within that context. The following example shows how to use `ITransactionClient` to call transactional grain methods.

[source="snippets/transactions/Client/Program.cs" highlight="11-12,30-31,38-44"::: (complete source file; reference: snippets/transactions/Client/Program.cs)](../../../_code/docs/orleans/grains/snippets/transactions/Client/Program.cs.md)

In the preceding client code:

- The [Microsoft.Extensions.Hosting.IHostApplicationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostApplicationBuilder) is configured with [Microsoft.Extensions.Hosting.OrleansClientGenericHostExtensions.UseOrleansClient*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.OrleansClientGenericHostExtensions.UseOrleansClient*).
  - The [Orleans.Hosting.IClientBuilder](https://learn.microsoft.com/search/?terms=Orleans.Hosting.IClientBuilder) uses localhost clustering and transactions.
- The [Orleans.IClusterClient](https://learn.microsoft.com/search/?terms=Orleans.IClusterClient) and [Orleans.ITransactionClient](https://learn.microsoft.com/search/?terms=Orleans.ITransactionClient) interfaces are retrieved from the service provider.
- The `from` and `to` variables are assigned their `IAccountGrain` references.
- The `ITransactionClient` is used to create a transaction, calling:
  - `Withdraw` on the `from` account grain reference.
  - `Deposit` on the `to` account grain reference.

Transactions are always committed unless an exception is thrown in the `transactionDelegate` or a contradictory `transactionOption` is specified. While using `ITransactionClient` is the recommended way to call transactional grain methods, you can also call them directly from another grain.

## Call transaction methods from another grain

Call transactional methods on a grain interface like any other grain method. As an alternative to using `ITransactionClient`, the `AtmGrain` implementation below calls the `Transfer` method (which is transactional) on the `IAccountGrain` interface.

Consider the `AtmGrain` implementation, which resolves the two referenced account grains and makes the appropriate calls to `Withdraw` and `Deposit`:

[source="snippets/transactions/Grains/AtmGrain.cs"::: (complete source file; reference: snippets/transactions/Grains/AtmGrain.cs)](../../../_code/docs/orleans/grains/snippets/transactions/Grains/AtmGrain.cs.md)

Your client app code can call `AtmGrain.Transfer` transactionally as follows:

```csharp
IAtmGrain atmOne = client.GetGrain<IAtmGrain>(0);

Guid from = Guid.NewGuid();
Guid to = Guid.NewGuid();

await atmOne.Transfer(from, to, 100);

uint fromBalance = await client.GetGrain<IAccountGrain>(from).GetBalance();
uint toBalance = await client.GetGrain<IAccountGrain>(to).GetBalance();
```

In the preceding calls, an `IAtmGrain` is used to transfer 100 units of currency from one account to another. After the transfer is complete, both accounts are queried to get their current balance. The currency transfer, as well as both account queries, are performed as ACID transactions.

As shown in the preceding example, transactions can return values within a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task), like other grain calls. However, upon call failure, they don't throw application exceptions but rather an [Orleans.Transactions.OrleansTransactionException](https://learn.microsoft.com/search/?terms=Orleans.Transactions.OrleansTransactionException) or [System.TimeoutException](https://learn.microsoft.com/search/?terms=System.TimeoutException). If the application throws an exception during the transaction, and that exception causes the transaction to fail (as opposed to failing due to other system failures), the application exception becomes the inner exception of the [Orleans.Transactions.OrleansTransactionException](https://learn.microsoft.com/search/?terms=Orleans.Transactions.OrleansTransactionException).

If a transaction exception of type [Orleans.Transactions.OrleansTransactionAbortedException](https://learn.microsoft.com/search/?terms=Orleans.Transactions.OrleansTransactionAbortedException) is thrown, the transaction failed and can be retried. Any other exception thrown indicates the transaction terminated with an unknown state. Since transactions are distributed operations, a transaction in an unknown state could have succeeded, failed, or still be in progress. For this reason, it's advisable to allow a call timeout period ([Orleans.Configuration.SiloMessagingOptions.SystemResponseTimeout](https://learn.microsoft.com/search/?terms=Orleans.Configuration.SiloMessagingOptions.SystemResponseTimeout)) to pass before verifying the state or retrying the operation to avoid cascading aborts.
