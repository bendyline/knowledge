# Source code: docs/core/deploying/trimming/snippets/MyLibrary/Class3.cs

Complete source file; linked examples may select a region or line range.

```
using System.Diagnostics.CodeAnalysis;

namespace MyLibrary3;
class Class3
{
    // <snippet_1>
    public class MyLibrary
    {
        internal static Type type;

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

    public class MyLibrary6
    {
        // <snippet_UMH2>
        [DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicMethods)]
        static Type type;

        static void UseMethodsHelper()
        {
            MyLibrary.type = typeof(System.Tuple);
        }
        // </snippet_UMH2>
    }
}

```
