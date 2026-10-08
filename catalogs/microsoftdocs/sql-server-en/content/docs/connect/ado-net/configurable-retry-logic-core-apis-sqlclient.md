---
title: Create a Custom Retry Provider for SqlClient
description: Implement custom Microsoft.Data.SqlClient retry intervals, conditions, and execution behavior with the configurable retry logic APIs.
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, paulmedynski, cmalhotra, randolphwest
ms.date: 08/14/2026
ms.service: sql
ms.subservice: connectivity
ms.topic: how-to
ai-usage: ai-assisted
---
# Create a custom retry provider for SqlClient

 **Applies to**:  .NET Framework  .NET  .NET Standard 




If the built-in retry logic providers don't cover your needs, you can create your own custom providers. You can then assign those providers to a `SqlConnection` or `SqlCommand` object to apply your custom logic.

The built-in providers are designed around three base classes that you can extend to implement a custom provider. Assign a custom provider to a [Microsoft.Data.SqlClient.SqlConnection](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlConnection) or [Microsoft.Data.SqlClient.SqlCommand](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlCommand) in the same way as a built-in provider:

1. [Microsoft.Data.SqlClient.SqlRetryIntervalBaseEnumerator](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlRetryIntervalBaseEnumerator): Generates a sequence of time intervals.
1. [Microsoft.Data.SqlClient.SqlRetryLogicBase](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlRetryLogicBase): Retrieves the next time interval for a given enumerator, if the number of retries hasn't been exceeded and a transient condition is met.
1. [Microsoft.Data.SqlClient.SqlRetryLogicBaseProvider](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlRetryLogicBaseProvider): Applies retry logic to connection and command operations.

> **Caution:**  
> A custom retry provider controls concurrency, cancellation, performance, delay scheduling, exception handling, and event behavior. Prefer a [built-in provider](internal-retry-logic-providers-sqlclient.md) unless you need execution behavior that its options can't express.

## Example

This sample demonstrates the extension points with a minimal synchronous implementation. It isn't production-ready: the asynchronous methods throw [System.NotImplementedException](https://learn.microsoft.com/search/?terms=System.NotImplementedException), and the provider doesn't implement thread safety, cancellation, concurrent use, or the `Retrying` event. For a production implementation, study the built-in retry logic in the [Microsoft.Data.SqlClient GitHub repository](https://github.com/dotnet/SqlClient/).

1. Define custom configurable retry logic classes:

   - **Enumerator**: Define a fixed sequence of time intervals and extend the acceptable range of times from two minutes to four minutes.

   [Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlConfigurableRetryLogic_StepByStep_CustomProvider.cs#6](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/configurable-retry-logic-core-apis-sqlclient.md)

   - **Retry logic**: Implement retry logic on any command that isn't part of an active transaction. Lower the number of retries from 60 to 20.

   [Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlConfigurableRetryLogic_StepByStep_CustomProvider.cs#7](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/configurable-retry-logic-core-apis-sqlclient.md)

   - **Provider**: Implement a provider for synchronous operations without a `Retrying` event. Treat [System.TimeoutException](https://learn.microsoft.com/search/?terms=System.TimeoutException) and configured [Microsoft.Data.SqlClient.SqlException](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlException) error numbers as retryable.

   [Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlConfigurableRetryLogic_StepByStep_CustomProvider.cs#8](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/configurable-retry-logic-core-apis-sqlclient.md)

1. Create a retry provider instance consisting of the defined custom types:

   [Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlConfigurableRetryLogic_StepByStep_CustomProvider.cs#4](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/configurable-retry-logic-core-apis-sqlclient.md)

   - Evaluate an exception against the configured error numbers and [System.TimeoutException](https://learn.microsoft.com/search/?terms=System.TimeoutException) to determine whether to retry it:

   [Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlConfigurableRetryLogic_StepByStep_CustomProvider.cs#5](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/configurable-retry-logic-core-apis-sqlclient.md)

1. Use the customized retry logic:

   - Define the retry logic parameters:

   [Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlConfigurableRetryLogic_StepByStep_CustomProvider.cs#1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/configurable-retry-logic-core-apis-sqlclient.md)

   - Create a custom retry provider:

   [Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlConfigurableRetryLogic_StepByStep_CustomProvider.cs#2](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/configurable-retry-logic-core-apis-sqlclient.md)

   - Assign the retry provider to the [Microsoft.Data.SqlClient.SqlConnection.RetryLogicProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlConnection.RetryLogicProvider%252A) or [Microsoft.Data.SqlClient.SqlCommand.RetryLogicProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlCommand.RetryLogicProvider%252A):

   [Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlConfigurableRetryLogic_StepByStep_CustomProvider.cs#3](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/configurable-retry-logic-core-apis-sqlclient.md)

## Related content

- [Microsoft.Data.SqlClient GitHub repository](https://github.com/dotnet/SqlClient/)
- [Configurable retry logic in SqlClient](configurable-retry-logic.md)
- [Microsoft.Data.SqlClient for SQL Server](microsoft-ado-net-sql-server.md)
