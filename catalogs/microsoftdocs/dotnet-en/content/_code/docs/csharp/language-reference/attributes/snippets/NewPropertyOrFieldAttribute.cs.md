# Source code: docs/csharp/language-reference/attributes/snippets/NewPropertyOrFieldAttribute.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace AttributeExamples;

// <SnippetDefinePropertyAttribute>
[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field)]
class NewPropertyOrFieldAttribute : Attribute { }
// </SnippetDefinePropertyAttribute>

// <SnippetUsePropertyAttribute>
class MyClass
{
    // Attribute attached to property:
    [NewPropertyOrField]
    public string Name { get; set; } = string.Empty;

    // Attribute attached to backing field:
    [field: NewPropertyOrField]
    public string Description { get; set; } = string.Empty;
}
// </SnippetUsePropertyAttribute>

```
