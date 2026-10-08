# Source code: docs/csharp/language-reference/compiler-messages/snippets/WarningWaves/WaveTen.cs

Complete source file; linked examples may select a region or line range.

```
namespace WarningWaves;

public class WaveTen
{
    // <RefFieldNeverAssigned>
    ref struct Container
    {
        // CS9265: Field 'value' is never ref-assigned to,
        // and will always have its default value (null reference)
        public ref int value;
    }
    // </RefFieldNeverAssigned>
}

```
