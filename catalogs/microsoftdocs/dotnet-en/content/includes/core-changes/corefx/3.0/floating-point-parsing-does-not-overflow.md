### Floating-point parsing operations no longer fail or throw an OverflowException

The floating-point parsing methods no longer throw an [System.OverflowException](https://learn.microsoft.com/search/?terms=System.OverflowException) or return `false` when they parse a string whose numeric value is outside the range of the [System.Single](https://learn.microsoft.com/search/?terms=System.Single) or [System.Double](https://learn.microsoft.com/search/?terms=System.Double) floating-point type.

#### Change description

In .NET Core 2.2 and earlier versions, the [System.Double.Parse%2A](https://learn.microsoft.com/search/?terms=System.Double.Parse%252A) and [System.Single.Parse%2A](https://learn.microsoft.com/search/?terms=System.Single.Parse%252A) methods throw an [System.OverflowException](https://learn.microsoft.com/search/?terms=System.OverflowException) for values that outside the range of their respective type. The [System.Double.TryParse%2A](https://learn.microsoft.com/search/?terms=System.Double.TryParse%252A) and [System.Single.TryParse%2A](https://learn.microsoft.com/search/?terms=System.Single.TryParse%252A) methods return `false` for the string representations of out-of-range numeric values.

Starting with .NET Core 3.0, the [System.Double.Parse%2A](https://learn.microsoft.com/search/?terms=System.Double.Parse%252A), [System.Double.TryParse%2A](https://learn.microsoft.com/search/?terms=System.Double.TryParse%252A), [System.Single.Parse%2A](https://learn.microsoft.com/search/?terms=System.Single.Parse%252A), and [System.Single.TryParse%2A](https://learn.microsoft.com/search/?terms=System.Single.TryParse%252A) methods no longer fail when parsing out-of-range numeric strings. Instead, the [System.Double](https://learn.microsoft.com/search/?terms=System.Double) parsing methods return [System.Double.PositiveInfinity](https://learn.microsoft.com/search/?terms=System.Double.PositiveInfinity) for values that exceed [System.Double.MaxValue](https://learn.microsoft.com/search/?terms=System.Double.MaxValue), and they return [System.Double.NegativeInfinity](https://learn.microsoft.com/search/?terms=System.Double.NegativeInfinity) for values that are less than [System.Double.MinValue](https://learn.microsoft.com/search/?terms=System.Double.MinValue). Similarly, the [System.Single](https://learn.microsoft.com/search/?terms=System.Single) parsing methods return [System.Single.PositiveInfinity](https://learn.microsoft.com/search/?terms=System.Single.PositiveInfinity) for values that exceed [System.Single.MaxValue](https://learn.microsoft.com/search/?terms=System.Single.MaxValue), and they return [System.Single.NegativeInfinity](https://learn.microsoft.com/search/?terms=System.Single.NegativeInfinity) for values that are less than [System.Single.MinValue](https://learn.microsoft.com/search/?terms=System.Single.MinValue).

This change was made for improved IEEE 754:2008 compliance.

#### Version introduced

3.0

#### Recommended action

This change can affect your code in either of two ways:

- Your code depends on the handler for the [System.OverflowException](https://learn.microsoft.com/search/?terms=System.OverflowException) to execute when an overflow occurs. In this case, you should remove the `catch` statement and place any necessary code in an `If` statement that tests whether [System.Double.IsInfinity%2A](https://learn.microsoft.com/search/?terms=System.Double.IsInfinity%252A) or [System.Single.IsInfinity%2A](https://learn.microsoft.com/search/?terms=System.Single.IsInfinity%252A) is `true`.

- Your code assumes that floating-point values are not `Infinity`. In this case, you should add the necessary code to check for floating-point values of `PositiveInfinity` and `NegativeInfinity`.

#### Category

Core .NET libraries

#### Affected APIs

- [System.Double.Parse%2A](https://learn.microsoft.com/search/?terms=System.Double.Parse%252A)
- [System.Double.TryParse%2A](https://learn.microsoft.com/search/?terms=System.Double.TryParse%252A)
- [System.Single.Parse%2A](https://learn.microsoft.com/search/?terms=System.Single.Parse%252A)
- [System.Single.TryParse%2A](https://learn.microsoft.com/search/?terms=System.Single.TryParse%252A)

<!--

#### Affected APIs

- `Overload:System.Double.Parse`
- `Overload:System.Double.TryParse`
- `Overload:System.Single.Parse`
- `Overload:System.Single.TryParse`

-->
