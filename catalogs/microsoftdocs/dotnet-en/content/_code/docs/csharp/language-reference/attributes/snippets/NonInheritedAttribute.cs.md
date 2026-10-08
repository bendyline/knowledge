# Source code: docs/csharp/language-reference/attributes/snippets/NonInheritedAttribute.cs

Complete source file; linked examples may select a region or line range.

```
namespace attributes;

// <SnippetNonInherited>
[AttributeUsage(AttributeTargets.Class, Inherited = false)]
class NonInheritedAttribute : Attribute { }

[NonInherited]
class BClass { }

class DClass : BClass { }
// </SnippetNonInherited>

```
