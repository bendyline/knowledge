# Source code: docs/csharp/language-reference/attributes/snippets/InitializeMembers.cs

Complete source file; linked examples may select a region or line range.

```
using System.Diagnostics.CodeAnalysis;

namespace attributes;

class InitializeMembers
{
}

// <MemberNotNullExample>
public class Container
{
    private string _uniqueIdentifier; // must be initialized.
    private string? _optionalMessage;

    public Container()
    {
        Helper();
    }

    public Container(string message)
    {
        Helper();
        _optionalMessage = message;
    }

    [MemberNotNull(nameof(_uniqueIdentifier))]
    private void Helper()
    {
        _uniqueIdentifier = DateTime.Now.Ticks.ToString();
    }
}
// </MemberNotNullExample>

```
