### Floating-point formatting and parsing behavior changed

Floating-point parsing and formatting behavior (by the [System.Double](https://learn.microsoft.com/search/?terms=System.Double) and [System.Single](https://learn.microsoft.com/search/?terms=System.Single) types) are now [IEEE-compliant](https://standards.ieee.org/standard/754-2019.html). This ensures that the behavior of floating-point types in .NET matches that of other IEEE-compliant languages. For example, `double.Parse("SomeLiteral")` should always match what C# produces for `double x = SomeLiteral`.

#### Change description

In .NET Core 2.2 and earlier versions, formatting with [System.Double.ToString%2A](https://learn.microsoft.com/search/?terms=System.Double.ToString%252A) and [System.Single.ToString%2A](https://learn.microsoft.com/search/?terms=System.Single.ToString%252A), and parsing with [System.Double.Parse%2A](https://learn.microsoft.com/search/?terms=System.Double.Parse%252A), [System.Double.TryParse%2A](https://learn.microsoft.com/search/?terms=System.Double.TryParse%252A), [System.Single.Parse%2A](https://learn.microsoft.com/search/?terms=System.Single.Parse%252A), and [System.Single.TryParse%2A](https://learn.microsoft.com/search/?terms=System.Single.TryParse%252A) are not IEEE-compliant. As a result, it's impossible to guarantee that a value will roundtrip with any supported standard or custom format string. For some inputs, the attempt to parse a formatted value can fail, and for others, the parsed value doesn't equal the original value.

Starting with .NET Core 3.0, floating-point parsing and formatting operations are IEEE 754-compliant.

The following table shows two code snippets and how the output changes between .NET Core 2.2 and .NET Core 3.1.

| Code snippet | Output on .NET Core 2.2 | Output on .NET Core 3.1 |
| - | - |
| `Console.WriteLine((-0.0).ToString());` | 0 | -0 |
| `var value = -3.123456789123456789;`<br/>`Console.WriteLine(value == double.Parse(value.ToString()));` | `False` | `True` |

For more information, see the [Floating-point parsing and formatting improvements in .NET Core 3.0](https://devblogs.microsoft.com/dotnet/floating-point-parsing-and-formatting-improvements-in-net-core-3-0/) blog post.

#### Version introduced

3.0

#### Recommended action

The [Potential impact to existing code](https://devblogs.microsoft.com/dotnet/floating-point-parsing-and-formatting-improvements-in-net-core-3-0/#potential-impact-to-existing-code) section of the [Floating-point parsing and formatting improvements in .NET Core 3.0](https://devblogs.microsoft.com/dotnet/floating-point-parsing-and-formatting-improvements-in-net-core-3-0/) blog post suggests some changes you can make to your code if you want to maintain the previous behavior.

- For some differences in formatting, you can get behavior equivalent to the previous behavior by specifying a different format string.
- For differences in parsing, there's no mechanism to fall back to the previous behavior.

#### Category

Core .NET libraries

#### Affected APIs

- [System.Double.ToString%2A](https://learn.microsoft.com/search/?terms=System.Double.ToString%252A)
- [System.Single.ToString%2A](https://learn.microsoft.com/search/?terms=System.Single.ToString%252A)
- [System.Double.Parse%2A](https://learn.microsoft.com/search/?terms=System.Double.Parse%252A)
- [System.Double.TryParse%2A](https://learn.microsoft.com/search/?terms=System.Double.TryParse%252A)
- [System.Single.Parse%2A](https://learn.microsoft.com/search/?terms=System.Single.Parse%252A)
- [System.Single.TryParse%2A](https://learn.microsoft.com/search/?terms=System.Single.TryParse%252A)

<!--

#### Affected APIs

- `Overload:System.Double.ToString`
- `Overload:System.Single.ToString`
- `Overload:System.Double.Parse`
- `Overload:System.Double.TryParse`
- `Overload:System.Single.Parse`
- `Overload:System.Single.TryParse`

-->
