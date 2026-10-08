# Source code: docs/csharp/language-reference/attributes/snippets/MultiUseAttribute.cs

Complete source file; linked examples may select a region or line range.

```
namespace AttributeExamples;

// <SnippetMultiUse>
[AttributeUsage(AttributeTargets.Class, AllowMultiple = true)]
class MultiUse : Attribute { }

[MultiUse]
[MultiUse]
class Class1 { }

[MultiUse, MultiUse]
class Class2 { }
// </SnippetMultiUse>

```
