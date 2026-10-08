---
description: "Learn more about: Integrating Enterprise Services Transactional Components"
title: "Integrating Enterprise Services Transactional Components"
ms.date: "03/30/2017"
ms.assetid: 05dab277-b8b2-48cf-b40c-826be128b175
---
# Integrating Enterprise Services Transactional Components

Windows Communication Foundation (WCF) provides an automatic mechanism for integrating with Enterprise Services (see [Integrating with COM+ Applications](integrating-with-com-plus-applications.md)). However, you may want the flexibility to develop services that internally use transactional components hosted within Enterprise Services. Because the WCF Transactions feature is built on the [System.Transactions](https://learn.microsoft.com/search/?terms=System.Transactions) infrastructure, the process for integrating Enterprise Services with WCF is identical to that for specifying interoperability between [System.Transactions](https://learn.microsoft.com/search/?terms=System.Transactions) and Enterprise Services, as outlined in [Interoperability with Enterprise Services and COM+ Transactions](https://learn.microsoft.com/previous-versions/dotnet/netframework-3.0/ms229974\(v=vs.85\)).

 To provide the desired level of interoperability between the incoming flowed transaction and the COM+ context transaction, the service implementation must create a [System.Transactions.TransactionScope](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionScope) instance and use the appropriate value from the [System.Transactions.EnterpriseServicesInteropOption](https://learn.microsoft.com/search/?terms=System.Transactions.EnterpriseServicesInteropOption) enumeration.

## Integrating Enterprise Services with a Service Operation

 The following code demonstrates an operation, with Allowed transaction flow, that creates a [System.Transactions.TransactionScope](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionScope) with the [System.Transactions.EnterpriseServicesInteropOption.Full](https://learn.microsoft.com/search/?terms=System.Transactions.EnterpriseServicesInteropOption.Full) option. The following conditions apply in this scenario:

- If the client flows a transaction, the operation, including the call to the Enterprise Services component, is executed within the scope of that transaction. Using [System.Transactions.EnterpriseServicesInteropOption.Full](https://learn.microsoft.com/search/?terms=System.Transactions.EnterpriseServicesInteropOption.Full) ensures that the transaction is synchronized with the [System.EnterpriseServices](https://learn.microsoft.com/search/?terms=System.EnterpriseServices) context, which means that the ambient transaction for [System.Transactions](https://learn.microsoft.com/search/?terms=System.Transactions) and the [System.EnterpriseServices](https://learn.microsoft.com/search/?terms=System.EnterpriseServices) is the same.

- If the client does not flow a transaction, setting [System.ServiceModel.OperationBehaviorAttribute.TransactionScopeRequired*](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationBehaviorAttribute.TransactionScopeRequired*) to `true` creates a new transaction scope for the operation. Similarly, using [System.Transactions.EnterpriseServicesInteropOption.Full](https://learn.microsoft.com/search/?terms=System.Transactions.EnterpriseServicesInteropOption.Full) ensures that the operation’s transaction is the same as the transaction used inside the [System.EnterpriseServices](https://learn.microsoft.com/search/?terms=System.EnterpriseServices) component's context.

 Any additional method calls also occur within the scope of the same operation’s transaction.

```csharp
[ServiceContract()]
public interface ICustomerServiceContract
{
   [OperationContract]
   [TransactionFlow(TransactionFlowOption.Allowed)]
   void UpdateCustomerNameOperation(int customerID, string newCustomerName);
}

[ServiceBehavior(TransactionIsolationLevel = System.Transactions.IsolationLevel.Serializable)]
public class CustomerService : ICustomerServiceContract
{
   [OperationBehavior(TransactionScopeRequired = true, TransactionAutoComplete = true)]
   public void UpdateCustomerNameOperation(int customerID, string newCustomerName)
   {
   // Create a transaction scope with full ES interop
      using (TransactionScope ts = new TransactionScope(
                     TransactionScopeOption.Required,
                     new TransactionOptions(),
                     EnterpriseServicesInteropOption.Full))
      {
         // Create an Enterprise Services component
         // Call UpdateCustomer method on an Enterprise Services
         // component

         // Call UpdateOtherCustomerData method on an Enterprise
         // Services component
         ts.Complete();
      }

      // Do UpdateAdditionalData on an non-Enterprise Services
      // component
   }
}
```

 If no synchronization is required between an operation’s current transaction and calls to transactional Enterprise Services components, then use the [System.Transactions.EnterpriseServicesInteropOption.None](https://learn.microsoft.com/search/?terms=System.Transactions.EnterpriseServicesInteropOption.None) option when instantiating the [System.Transactions.TransactionScope](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionScope) instance.

## Integrating Enterprise Services with a Client

 The following code demonstrates client code using a [System.Transactions.TransactionScope](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionScope) instance with the [System.Transactions.EnterpriseServicesInteropOption.Full](https://learn.microsoft.com/search/?terms=System.Transactions.EnterpriseServicesInteropOption.Full) setting. In this scenario, calls to service operations that support transaction flow occur within the scope of the same transaction as the calls to Enterprise Services components.

```csharp
static void Main()
{
    // Create a client
    CalculatorClient client = new CalculatorClient();

    // Create a transaction scope with full ES interop
    using (TransactionScope ts = new TransactionScope(
          TransactionScopeOption.Required,
          new TransactionOptions(),
          EnterpriseServicesInteropOption.Full))
    {
        // Call Add calculator service operation

        // Create an Enterprise Services component

        // Call UpdateCustomer method on an Enterprise Services
        // component

        ts.Complete();
    }

    // Closing the client gracefully closes the connection and
    // cleans up resources
    client.Close();
}
```

## See also

- [Integrating with COM+ Applications](integrating-with-com-plus-applications.md)
- [Integrating with COM Applications](integrating-with-com-applications.md)
