# Source code: samples/snippets/csharp/VS_Snippets_Misc/tpldataflow_writerreaderswinforms/cs/writerreaderswinforms/program.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;

namespace WriterReadersWinForms
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
