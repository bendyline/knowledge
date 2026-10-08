# Source code: docs/standard/base-types/snippets/composite-formatting/framework/csharp/Program.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace Formatting
{
    class Program
    {
        static void Main(string[] args)
        {
            Bad();
            Good();
        }

        static void Bad()
        {
            // <bad>
            int value = 6324;
            string output = string.Format("{{{0:D}}}",
                                          value);
            Console.WriteLine(output);

            // The example displays the following output:
            //       {D}
            // </bad>
        }

        static void Good()
        {
            // <good>
            int value = 6324;
            string output = string.Format("{0}{1:D}{2}",
                                         "{", value, "}");
            Console.WriteLine(output);
            
            // The example displays the following output:
            //       {6324}
            // </good>
        }
    }
}

```
