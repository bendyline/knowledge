### UriBuilder properties no longer prepend leading characters

[System.UriBuilder.Fragment](https://learn.microsoft.com/search/?terms=System.UriBuilder.Fragment) no longer prepends a leading `#` character and [System.UriBuilder.Query](https://learn.microsoft.com/search/?terms=System.UriBuilder.Query) no longer prepends a leading `?` character when one is already present.

#### Change description

In .NET Framework, the [System.UriBuilder.Fragment](https://learn.microsoft.com/search/?terms=System.UriBuilder.Fragment) and [System.UriBuilder.Query](https://learn.microsoft.com/search/?terms=System.UriBuilder.Query) properties always prepend a `#` or `?` character, respectively, to the value being stored. This behavior can result in multiple `#` or `?` characters in the stored value if the string already contains one of these leading characters. For example, the value of [System.UriBuilder.Fragment](https://learn.microsoft.com/search/?terms=System.UriBuilder.Fragment) might become `##main`.

Starting in .NET Core 1.0, these properties no longer prepend the `#` or `?` characters to the stored value if one is already present at the beginning of the string.

#### Version introduced

1.0

#### Recommended action

You no longer need to explicitly remove any of these leading characters when setting the property values. This is especially useful when you're appending values, because you no longer have to remove the leading `#` or `?` each time you append.

For example, the following code snippet shows the behavior difference between .NET Framework and .NET Core.

```csharp
var builder = new UriBuilder();
builder.Query = "one=1";
builder.Query += "&two=2";
builder.Query += "&three=3";
builder.Query += "&four=4";

Console.WriteLine(builder.Query);
```

- In .NET Framework, the output is `????one=1&two=2&three=3&four=4`.
- In .NET Core, the output is `?one=1&two=2&three=3&four=4`.

#### Category

Core .NET libraries

#### Affected APIs

- [System.UriBuilder.Fragment](https://learn.microsoft.com/search/?terms=System.UriBuilder.Fragment)
- [System.UriBuilder.Query](https://learn.microsoft.com/search/?terms=System.UriBuilder.Query)

<!--

#### Affected APIs

- `T:System.UriBuilder.Fragment`
- `T:System.UriBuilder.Query`

-->
