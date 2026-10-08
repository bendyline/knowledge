# Source code: docs/csharp/language-reference/compiler-messages/snippets/null-warnings/Program.cs

Complete source file; linked examples may select a region or line range.

```
// <ProvideNullCheck>
void WriteMessageLength(string? message)
{
    if (message is not null)
    {
        Console.WriteLine(message.Length);
    }
    
}
// </ProvideNullCheck>


// <PossibleNullAssignment>
string? TryGetMessage(int id) => "";

string msg = TryGetMessage(42);  // Possible null assignment.
// </PossibleNullAssignment>

// <NullGuard>
string notNullMsg = TryGetMessage(42) ?? "Unknown message id: 42";
// </NullGuard>


```
