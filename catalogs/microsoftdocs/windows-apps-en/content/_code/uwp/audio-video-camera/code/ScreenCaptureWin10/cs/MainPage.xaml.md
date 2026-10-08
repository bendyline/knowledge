# Source code: uwp/audio-video-camera/code/ScreenCaptureWin10/cs/MainPage.xaml

Complete source file; linked examples may select a region or line range.

```
<Page
    x:Class="ScreenCaptureWin10.MainPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:local="using:ScreenCaptureWin10"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    mc:Ignorable="d">

    <Grid Background="{ThemeResource ApplicationPageBackgroundThemeBrush}">
        <StackPanel>
            <TextBox></TextBox>
            <Button x:Name="Start" Click="Start_Click" Content="START"/>
        </StackPanel>
    </Grid>
</Page>

```
