# Source code: docs/core/deploying/trimming/snippets/MyLibrary/Class2.cs

Complete source file; linked examples may select a region or line range.

```
using System.Diagnostics.CodeAnalysis;

namespace MyLibrary2;
class Class2
{
    // <snippet_RequiresUnreferencedCode>
    public class MyLibrary
    {
        [RequiresUnreferencedCode("Calls DynamicBehavior.")]
        public static void MyMethod()
        {
            DynamicBehavior();
        }

        [RequiresUnreferencedCode(
            "DynamicBehavior is incompatible with trimming.")]
        static void DynamicBehavior()
        {
        }
    }
    // </snippet_RequiresUnreferencedCode>
}

```
