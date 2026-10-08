# Source code: docs/csharp/language-reference/attributes/snippets/NewAttribute.cs

Complete source file; linked examples may select a region or line range.

```
namespace AttributeExamples
{
    namespace VersionOne
    {
        // <SnippetUsageFirst>
        [AttributeUsage(AttributeTargets.All,
                           AllowMultiple = false,
                           Inherited = true)]
        class NewAttribute : Attribute { }
        // </SnippetUsageFirst>
    }
    namespace VersionTwo
    {
        // <SnippetUsageSecond>
        [AttributeUsage(AttributeTargets.All)]
        class NewAttribute : Attribute { }
        // </SnippetUsageSecond>
    }
}

```
