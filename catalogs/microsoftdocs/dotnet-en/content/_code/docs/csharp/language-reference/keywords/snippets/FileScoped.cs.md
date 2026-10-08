# Source code: docs/csharp/language-reference/keywords/snippets/FileScoped.cs

Complete source file; linked examples may select a region or line range.

```
namespace keywords;


// <FileScopedType>
// In File1.cs:
file interface IWidget
{
    int ProvideAnswer();
}

file class HiddenWidget
{
    public int Work() => 42;
}

public class Widget : IWidget
{
    public int ProvideAnswer()
    {
        var worker = new HiddenWidget();
        return worker.Work();
    }
}
// </FileScopedType>

```
