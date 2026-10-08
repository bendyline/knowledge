# Source code: docs/azure/sdk/snippets/authentication/brokered/maui-app/AppShell.xaml

Complete source file; linked examples may select a region or line range.

```
<?xml version="1.0" encoding="UTF-8" ?>
<Shell
    x:Class="SecretVaultApp.AppShell"
    xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
    xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
    xmlns:local="clr-namespace:SecretVaultApp"
    Title="SecretVaultApp">

    <ShellContent
        Title="Home"
        ContentTemplate="{DataTemplate local:MainPage}"
        Route="MainPage" />

</Shell>

```
