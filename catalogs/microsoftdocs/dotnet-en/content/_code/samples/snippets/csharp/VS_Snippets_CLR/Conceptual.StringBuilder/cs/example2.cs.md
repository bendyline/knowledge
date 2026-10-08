# Source code: samples/snippets/csharp/VS_Snippets_CLR/Conceptual.StringBuilder/cs/example2.cs

Complete source file; linked examples may select a region or line range.

```
//<snippet9>
using System;
using System.IO;
using System.Text;

public class CharsToStr
{
    public static void Main()
    {
        StringBuilder sb = new StringBuilder("Start with a string and add from ");
        char[] b = { 'c', 'h', 'a', 'r', '.', ' ', 'B', 'u', 't', ' ', 'n', 'o', 't', ' ', 'a', 'l', 'l' };

        using (StringWriter sw = new StringWriter(sb))
        {
            // Write five characters from the array into the StringBuilder.
            sw.Write(b, 0, 5);
            Console.WriteLine(sb);
        }
    }
}
// The example has the following output:
//
// Start with a string and add from char.


//</snippet9>

```
