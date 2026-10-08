# Source code: docs/standard/asynchronous-programming-patterns/snippets/component-that-supports-the-event-based-asynchronous-pattern/csharp/Program.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Windows.Forms;

namespace AsyncPattern;

class Program
{
    [STAThread]
    static void Main()
    {
        Application.SetHighDpiMode(HighDpiMode.SystemAware);
        Application.EnableVisualStyles();
        Application.SetCompatibleTextRenderingDefault(false);
        Application.Run(new Form1());
    }
}

```
