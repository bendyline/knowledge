# Source code: samples/snippets/csharp/VS_Snippets_CLR/Asynchronous_File_IO_async/cs/example4.cs

Complete source file; linked examples may select a region or line range.

```
// <snippet4>
using System;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.IO;

namespace WpfApplication1
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private async void Button_Click(object sender, RoutedEventArgs e)
        {
            string filename = @"c:\Temp\userinputlog.txt";
            byte[] result;

            using (FileStream SourceStream = File.Open(filename, FileMode.Open))
            {
                result = new byte[SourceStream.Length];
                await SourceStream.ReadAsync(result, 0, (int)SourceStream.Length);
            }

            UserInput.Text = System.Text.Encoding.ASCII.GetString(result);
        }
    }
}
// </snippet4>
```
