# Source code: uwp/threading-async/AsyncSnippets/csharp/App.xaml.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Threading.Tasks;
using Windows.ApplicationModel.Activation;
using Windows.UI.Xaml;

namespace AsyncApp
{
    partial class App
    {
        public App()
        {
            InitializeComponent();
        }

        protected override void OnLaunched(LaunchActivatedEventArgs args)
        {
            Window.Current.Content = new MainPage();
            Window.Current.Activate();
        }
    }
}

```
