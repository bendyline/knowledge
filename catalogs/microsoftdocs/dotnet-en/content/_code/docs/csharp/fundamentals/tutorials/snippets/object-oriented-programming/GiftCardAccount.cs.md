# Source code: docs/csharp/fundamentals/tutorials/snippets/object-oriented-programming/GiftCardAccount.cs

Complete source file; linked examples may select a region or line range.

```
namespace OOProgramming;

public class GiftCardAccount : BankAccount
{
    // <GiftCardAccountConstruction>
    private readonly decimal _monthlyDeposit = 0m;

    public GiftCardAccount(string name, decimal initialBalance, decimal monthlyDeposit = 0) : base(name, initialBalance)
        => _monthlyDeposit = monthlyDeposit;
    // </GiftCardAccountConstruction>

    // <AddMonthlyDeposit>
    public override void PerformMonthEndTransactions()
    {
        if (_monthlyDeposit != 0)
        {
            MakeDeposit(_monthlyDeposit, DateTime.Now, "Add monthly deposit");
        }
    }
    // </AddMonthlyDeposit>
}

```
