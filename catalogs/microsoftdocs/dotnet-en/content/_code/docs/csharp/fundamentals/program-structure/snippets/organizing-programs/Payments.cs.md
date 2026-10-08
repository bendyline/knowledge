# Source code: docs/csharp/fundamentals/program-structure/snippets/organizing-programs/Payments.cs

Complete source file; linked examples may select a region or line range.

```
// <FeatureOrganization>
// Good: group by feature
namespace MyApp.Payments;

public interface IPaymentProcessor
{
    bool ProcessPayment(decimal amount);
}

public class CreditCardProcessor : IPaymentProcessor
{
    public bool ProcessPayment(decimal amount)
    {
        Console.WriteLine($"Processing credit card payment of {amount:C}");
        return true;
    }
}

public record PaymentResult(bool Success, string? TransactionId);
// </FeatureOrganization>

```
