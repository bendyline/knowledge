# Source code: docs/csharp/advanced-topics/interface-implementation/snippets/staticinterfaces/RepeatSequence.cs

Complete source file; linked examples may select a region or line range.

```
public struct RepeatSequence : IGetNext<RepeatSequence>
{
    private const char Ch = 'A';
    public string Text = new string(Ch, 1);

    public RepeatSequence() {}

    public static RepeatSequence operator ++(RepeatSequence other)
        => other with { Text = other.Text + Ch };

    public override string ToString() => Text;
}

```
