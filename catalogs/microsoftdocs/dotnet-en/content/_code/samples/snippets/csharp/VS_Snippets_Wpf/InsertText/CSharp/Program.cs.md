# Source code: samples/snippets/csharp/VS_Snippets_Wpf/InsertText/CSharp/Program.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Collections.Generic;
using System.Windows.Forms;

namespace InsertTextW32Target
{
    static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new Target());
        }
    }
}
```
