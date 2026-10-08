# Source code: samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataViewWinForms Sample/CS/Program.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Windows.Forms;

namespace DataViewWinFormsSample
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
            Application.Run(new Form1());
        }
    }
}

```
