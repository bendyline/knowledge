# Source code: docs/csharp/language-reference/compiler-messages/snippets/WarningWaves/WaveEight.cs

Complete source file; linked examples may select a region or line range.

```
namespace WarningWaves;

public class ProgramEight
{
    // <NoAmpersand>
    public static async Task LogValue()
    {
        int x = 1;
        unsafe {
            int* y = &x;
            Console.WriteLine(*y);
        }
        await Task.Delay(1000);
    }
    // </NoAmpersand>
}
```
