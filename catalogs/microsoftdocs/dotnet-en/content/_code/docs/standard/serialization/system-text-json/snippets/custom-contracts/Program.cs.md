# Source code: docs/standard/serialization/system-text-json/snippets/custom-contracts/Program.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Serialization
{
    public class Program
    {
        static void Main(string[] args)
        {
            SerializationCountExample.RunIt();
            Console.WriteLine();
            PrivateFieldsExample.RunIt();
            Console.WriteLine();
            IgnoreTypeExample.RunIt();
            Console.WriteLine();
            AllowIntsAsStringsExample.RunIt();
        }
    }
}

```
