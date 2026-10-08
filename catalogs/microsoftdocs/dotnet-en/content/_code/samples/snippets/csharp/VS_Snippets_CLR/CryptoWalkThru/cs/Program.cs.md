# Source code: samples/snippets/csharp/VS_Snippets_CLR/CryptoWalkThru/cs/Program.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Windows.Forms;

namespace CryptoWalkThru
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
            Application.SetHighDpiMode(HighDpiMode.SystemAware);
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new Form1());
        }
    }
}

```
