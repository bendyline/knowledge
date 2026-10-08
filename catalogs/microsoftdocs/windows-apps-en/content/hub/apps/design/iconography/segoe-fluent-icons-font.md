---
description: This article lists and provides usage guidance for the glyphs that come with the Segoe Fluent Icons font.
title: Segoe Fluent Icons font
label: Segoe Fluent Icons font
ms.date: 02/19/2026
ms.topic: article
keywords: windows 10, windows 11
ms.localizationpriority: medium
---

# Segoe Fluent Icons font

This article provides developer guidelines for using the Segoe Fluent Icons font and lists each icon along with its Unicode value and descriptive name.

**Important APIs**:

* [**FontIcon class**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.fonticon)

## About Segoe Fluent Icons

> **Tip:**
> With the release of Windows 11, the **`Segoe Fluent Icons`** font replaced `Segoe MDL2 Assets` as the recommended symbol icon font. `Segoe MDL2 Assets` is still available, but we recommend updating your app to use the `Segoe Fluent Icons` font.

Most of the icons included in the `Segoe Fluent Icons` font are mapped to the Private Use Area of Unicode (PUA). The PUA range is a non-standardized range of Unicode that allows font developers to define their own characters. This is useful when creating a symbol font, but it creates an interoperability problem when `Segoe Fluent Icons` is not available.

Icons in the `Segoe Fluent Icons` font are not intended for use in-line with text. This means that some older "tricks" like the progressive disclosure arrows no longer apply. Likewise, since all of the new icons are sized and positioned the same, they do not have to be made with zero width; we have made sure they work as a set.

## Layering and mirroring

All glyphs in `Segoe Fluent Icons` have the same fixed width with a consistent height and left origin point, so layering and colorization effects can be achieved by drawing glyphs directly on top of each other. This example show a black outline drawn on top of the zero-width red heart.

Screenshot of using a zero-width glyph.

```xaml
<Grid>
    <FontIcon FontFamily="Segoe Fluent Icons" Glyph="&#xEB52;"
              Foreground="#C72335" />
    <FontIcon FontFamily="Segoe Fluent Icons" Glyph="&#xEB51;" />
</Grid>
```

Many of the icons also have mirrored forms available for use in languages that use right-to-left text directionality such as Arabic, Dari, Persian, and Hebrew.

## Using the icons

If you are developing an app in XAML, you can use specified glyphs from `Segoe Fluent Icons` with a [SymbolIcon](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.symbolicon) and the [Symbol enumeration](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.symbol).

```xaml
<SymbolIcon Symbol="GlobalNavigationButton"/>
```

If you would like to use a glyph from the `Segoe Fluent Icons` font that is not included in the Symbol enum, set it as the [Glyph](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.fonticon.glyph) property of a [**FontIcon**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.fonticon) control.

```xaml
<FontIcon FontFamily="Segoe Fluent Icons" Glyph="&#xE700;"/>
```

You can also use the static resource `SymbolThemeFontFamily` to access `Segoe Fluent Icons`, instead of specifying the font by name:

```xaml
<FontIcon FontFamily="{StaticResource SymbolThemeFontFamily}" Glyph="&#xE700;"/>
```

> **Note:**
> For optimal appearance, use these specific sizes: 16, 20, 24, 32, 40, 48, and 64. Deviating from these font sizes could lead to less crisp or blurry outcomes.

## How do I get this font?

* On Windows 11: There's nothing you need to do, the font comes with Windows.
* On Windows 10: `Segoe Fluent Icons` is not included by default on Windows 10. You can download it from the [Design resources](../downloads/index.md#fonts) page.
* On a Mac or other device: You can download `Segoe Fluent Icons` and other fonts from the [Design resources](../downloads/index.md#fonts) page. You can download the font for use in design and development, but you may not ship it to another platform.

## Examples

> 
> [Open the WinUI 3 Gallery app and see Iconography principles in action](winui3gallery://item/Iconography)

> <table>
<tbody><tr>
<td>WinUI 3 Gallery icon</td>
<td>The <strong>WinUI 3 Gallery</strong> app includes interactive examples of WinUI controls and features. Get the app from the <a href="https://apps.microsoft.com/detail/9P3JFPWWDZRC">Microsoft Store</a> or browse the source code on <a href="https://github.com/microsoft/WinUI-Gallery">GitHub</a>.</td>
</tr>
</tbody>

## Icon list

Please keep in mind that the `Segoe Fluent Icons` font includes many more icons than we can show here. Many of the icons are intended for specialized purposes and are not typically used anywhere else.

> **Note:**
> Glyphs with prefixes ranging from **E0-** to **E5-** (e.g. E001, E5B1) are currently marked as legacy and are therefore deprecated.

The following tables display all `Segoe Fluent Icons` glyphs and their respective unicode values and descriptive names. Select a range from the following list to view glyphs according to the PUA range they belong to.

* [PUA E700-E9F9](#pua-e700-e9f9)
* [PUA EA0C-ECF3](#pua-ea0c-ecf3)
* [PUA ED0C-EFFF](#pua-ed0c-efff)
* [PUA F000-F5FF](#pua-f000-f5ff)
* [PUA F600-F8CC](#pua-f600-f8cc)

### PUA E700-E9F9

The following table of glyphs displays unicode points prefixed from E7- to E9-.

[Back to top](#icon-list)

| Glyph | Unicode point | Description |
| --- | --- | --- |
| Screenshot of GlobalNavButton. | e700 | GlobalNavButton |
| Screenshot of Wifi. | e701 | Wifi |
| Screenshot of Bluetooth. | e702 | Bluetooth |
| Screenshot of Connect. | e703 | Connect |
| Screenshot of InternetSharing. | e704 | InternetSharing |
| Screenshot of VPN. | e705 | VPN |
| Screenshot of Brightness. | e706 | Brightness |
| Screenshot of MapPin. | e707 | MapPin |
| Screenshot of QuietHours. | e708 | QuietHours |
| Screenshot of Airplane. | e709 | Airplane |
| Screenshot of Tablet. | e70a | Tablet |
| Screenshot of QuickNote. | e70b | QuickNote |
| Screenshot of RememberedDevice. | e70c | RememberedDevice |
| Screenshot of ChevronDown. | e70d | ChevronDown |
| Screenshot of ChevronUp. | e70e | ChevronUp |
| Screenshot of Edit. | e70f | Edit |
| Screenshot of Add. | e710 | Add |
| Screenshot of Cancel. | e711 | Cancel |
| Screenshot of More. | e712 | More |
| Screenshot of Settings. | e713 | Settings |
| Screenshot of Video. | e714 | Video |
| Screenshot of Mail. | e715 | Mail |
| Screenshot of People. | e716 | People |
| Screenshot of Phone. | e717 | Phone |
| Screenshot of Pin. | e718 | Pin |
| Screenshot of Shop. | e719 | Shop |
| Screenshot of Stop. | e71a | Stop |
| Screenshot of Link. | e71b | Link |
| Screenshot of Filter. | e71c | Filter |
| Screenshot of AllApps. | e71d | AllApps |
| Screenshot of Zoom. | e71e | Zoom |
| Screenshot of ZoomOut. | e71f | ZoomOut |
| Screenshot of Microphone. | e720 | Microphone |
| Screenshot of Search. | e721 | Search |
| Screenshot of Camera. | e722 | Camera |
| Screenshot of Attach. | e723 | Attach |
| Screenshot of Send. | e724 | Send |
| Screenshot of SendFill. | e725 | SendFill |
| Screenshot of WalkSolid. | e726 | WalkSolid |
| Screenshot of InPrivate. | e727 | InPrivate |
| Screenshot of FavoriteList. | e728 | FavoriteList |
| Screenshot of PageSolid. | e729 | PageSolid |
| Screenshot of Forward. | e72a | Forward |
| Screenshot of Back. | e72b | Back |
| Screenshot of Refresh. | e72c | Refresh |
| Screenshot of Share. | e72d | Share |
| Screenshot of Lock. | e72e | Lock |
| Screenshot of ReportHacked. | e730 | ReportHacked |
| Screenshot of EMI. | e731 | EMI |
| Screenshot of Blocked. | e733 | Blocked |
| Screenshot of FavoriteStar. | e734 | FavoriteStar |
| Screenshot of FavoriteStarFill. | e735 | FavoriteStarFill |
| Screenshot of ReadingMode. | e736 | ReadingMode |
| Screenshot of Favicon. | e737 | Favicon |
| Screenshot of Remove. | e738 | Remove |
| Screenshot of Checkbox. | e739 | Checkbox |
| Screenshot of CheckboxComposite. | e73a | CheckboxComposite |
| Screenshot of CheckboxFill. | e73b | CheckboxFill |
| Screenshot of CheckboxIndeterminate. | e73c | CheckboxIndeterminate |
| Screenshot of CheckboxCompositeReversed. | e73d | CheckboxCompositeReversed |
| Screenshot of CheckMark. | e73e | CheckMark |
| Screenshot of BackToWindow. | e73f | BackToWindow |
| Screenshot of FullScreen. | e740 | FullScreen |
| Screenshot of ResizeTouchLarger. | e741 | ResizeTouchLarger |
| Screenshot of ResizeTouchSmaller. | e742 | ResizeTouchSmaller |
| Screenshot of ResizeMouseSmall. | e743 | ResizeMouseSmall |
| Screenshot of ResizeMouseMedium. | e744 | ResizeMouseMedium |
| Screenshot of ResizeMouseWide. | e745 | ResizeMouseWide |
| Screenshot of ResizeMouseTall. | e746 | ResizeMouseTall |
| Screenshot of ResizeMouseLarge. | e747 | ResizeMouseLarge |
| Screenshot of SwitchUser. | e748 | SwitchUser |
| Screenshot of Print. | e749 | Print |
| Screenshot of Up. | e74a | Up |
| Screenshot of Down. | e74b | Down |
| Screenshot of OEM. | e74c | OEM |
| Screenshot of Delete. | e74d | Delete |
| Screenshot of Save. | e74e | Save |
| Screenshot of Mute. | e74f | Mute |
| Screenshot of BackSpaceQWERTY. | e750 | BackSpaceQWERTY |
| Screenshot of ReturnKey. | e751 | ReturnKey |
| Screenshot of UpArrowShiftKey. | e752 | UpArrowShiftKey |
| Screenshot of Cloud. | e753 | Cloud |
| Screenshot of Flashlight. | e754 | Flashlight |
| Screenshot of RotationLock. | e755 | RotationLock |
| Screenshot of CommandPrompt. | e756 | CommandPrompt |
| Screenshot of SIPMove. | e759 | SIPMove |
| Screenshot of SIPUndock. | e75a | SIPUndock |
| Screenshot of SIPRedock. | e75b | SIPRedock |
| Screenshot of EraseTool. | e75c | EraseTool |
| Screenshot of UnderscoreSpace. | e75d | UnderscoreSpace |
| Screenshot of GripperTool. | e75e | GripperTool |
| Screenshot of Dialpad. | e75f | Dialpad |
| Screenshot of PageLeft. | e760 | PageLeft |
| Screenshot of PageRight. | e761 | PageRight |
| Screenshot of MultiSelect. | e762 | MultiSelect |
| Screenshot of KeyboardLeftHanded. | e763 | KeyboardLeftHanded |
| Screenshot of KeyboardRightHanded. | e764 | KeyboardRightHanded |
| Screenshot of KeyboardClassic. | e765 | KeyboardClassic |
| Screenshot of KeyboardSplit. | e766 | KeyboardSplit |
| Screenshot of Volume. | e767 | Volume |
| Screenshot of Play. | e768 | Play |
| Screenshot of Pause. | e769 | Pause |
| Screenshot of ChevronLeft. | e76b | ChevronLeft |
| Screenshot of ChevronRight. | e76c | ChevronRight |
| Screenshot of InkingTool. | e76d | InkingTool |
| Screenshot of Emoji2. | e76e | Emoji2 |
| Screenshot of GripperBarHorizontal. | e76f | GripperBarHorizontal |
| Screenshot of System. | e770 | System |
| Screenshot of Personalize. | e771 | Personalize |
| Screenshot of Devices. | e772 | Devices |
| Screenshot of SearchAndApps. | e773 | SearchAndApps |
| Screenshot of Globe. | e774 | Globe |
| Screenshot of TimeLanguage. | e775 | TimeLanguage |
| Screenshot of EaseOfAccess. | e776 | EaseOfAccess |
| Screenshot of UpdateRestore. | e777 | UpdateRestore |
| Screenshot of HangUp. | e778 | HangUp |
| Screenshot of ContactInfo. | e779 | ContactInfo |
| Screenshot of Unpin. | e77a | Unpin |
| Screenshot of Contact. | e77b | Contact |
| Screenshot of Memo. | e77c | Memo |
| Screenshot of IncomingCall. | e77e | IncomingCall |
| Screenshot of Paste. | e77f | Paste |
| Screenshot of PhoneBook. | e780 | PhoneBook |
| Screenshot of LEDLight. | e781 | LEDLight |
| Screenshot of Error. | e783 | Error |
| Screenshot of GripperBarVertical. | e784 | GripperBarVertical |
| Screenshot of Unlock. | e785 | Unlock |
| Screenshot of Slideshow. | e786 | Slideshow |
| Screenshot of Calendar. | e787 | Calendar |
| Screenshot of GripperResize. | e788 | GripperResize |
| Screenshot of Megaphone. | e789 | Megaphone |
| Screenshot of Trim. | e78a | Trim |
| Screenshot of NewWindow. | e78b | NewWindow |
| Screenshot of SaveLocal. | e78c | SaveLocal |
| Screenshot of Color. | e790 | Color |
| Screenshot of DataSense. | e791 | DataSense |
| Screenshot of SaveAs. | e792 | SaveAs |
| Screenshot of Light. | e793 | Light |
| Screenshot of Effects. | e794 | Effects |
| Screenshot of AspectRatio. | e799 | AspectRatio |
| Screenshot of Contrast. | e7a1 | Contrast |
| Screenshot of DataSenseBar. | e7a5 | DataSenseBar |
| Screenshot of Redo. | e7a6 | Redo |
| Screenshot of Undo. | e7a7 | Undo |
| Screenshot of Crop. | e7a8 | Crop |
| Screenshot of PhotoCollection. | e7aa | PhotoCollection |
| Screenshot of OpenWith. | e7ac | OpenWith |
| Screenshot of Rotate. | e7ad | Rotate |
| Screenshot of RedEye. | e7b3 | RedEye |
| Screenshot of SetlockScreen. | e7b5 | SetlockScreen |
| Screenshot of MapPin2. | e7b7 | MapPin2 |
| Screenshot of Package. | e7b8 | Package |
| Screenshot of Warning. | e7ba | Warning |
| Screenshot of ReadingList. | e7bc | ReadingList |
| Screenshot of Education. | e7be | Education |
| Screenshot of ShoppingCart. | e7bf | ShoppingCart |
| Screenshot of Train. | e7c0 | Train |
| Screenshot of Flag. | e7c1 | Flag |
| Screenshot of Move. | e7c2 | Move |
| Screenshot of Page. | e7c3 | Page |
| Screenshot of TaskView. | e7c4 | TaskView |
| Screenshot of BrowsePhotos. | e7c5 | BrowsePhotos |
| Screenshot of HalfStarLeft. | e7c6 | HalfStarLeft |
| Screenshot of HalfStarRight. | e7c7 | HalfStarRight |
| Screenshot of Record. | e7c8 | Record |
| Screenshot of TouchPointer. | e7c9 | TouchPointer |
| Screenshot of LangJPN. | e7de | LangJPN |
| Screenshot of Ferry. | e7e3 | Ferry |
| Screenshot of Highlight. | e7e6 | Highlight |
| Screenshot of ActionCenterNotification. | e7e7 | ActionCenterNotification |
| Screenshot of PowerButton. | e7e8 | PowerButton |
| Screenshot of ResizeTouchNarrower. | e7ea | ResizeTouchNarrower |
| Screenshot of ResizeTouchShorter. | e7eb | ResizeTouchShorter |
| Screenshot of DrivingMode. | e7ec | DrivingMode |
| Screenshot of RingerSilent. | e7ed | RingerSilent |
| Screenshot of OtherUser. | e7ee | OtherUser |
| Screenshot of Admin. | e7ef | Admin |
| Screenshot of CC. | e7f0 | CC |
| Screenshot of SDCard. | e7f1 | SDCard |
| Screenshot of CallForwarding. | e7f2 | CallForwarding |
| Screenshot of SettingsDisplaySound. | e7f3 | SettingsDisplaySound |
| Screenshot of TVMonitor. | e7f4 | TVMonitor |
| Screenshot of Speakers. | e7f5 | Speakers |
| Screenshot of Headphone. | e7f6 | Headphone |
| Screenshot of DeviceLaptopPic. | e7f7 | DeviceLaptopPic |
| Screenshot of DeviceLaptopNoPic. | e7f8 | DeviceLaptopNoPic |
| Screenshot of DeviceMonitorRightPic. | e7f9 | DeviceMonitorRightPic |
| Screenshot of DeviceMonitorLeftPic. | e7fa | DeviceMonitorLeftPic |
| Screenshot of DeviceMonitorNoPic. | e7fb | DeviceMonitorNoPic |
| Screenshot of Game. | e7fc | Game |
| Screenshot of HorizontalTabKey. | e7fd | HorizontalTabKey |
| Screenshot of Nav2DMapView. | e800 | Nav2DMapView |
| Screenshot of StreetsideSplitMinimize. | e802 | StreetsideSplitMinimize |
| Screenshot of StreetsideSplitExpand. | e803 | StreetsideSplitExpand |
| Screenshot of Car. | e804 | Car |
| Screenshot of Walk. | e805 | Walk |
| Screenshot of Bus. | e806 | Bus |
| Screenshot of TiltUp. | e809 | TiltUp |
| Screenshot of TiltDown. | e80a | TiltDown |
| Screenshot of CallControl. | e80b | CallControl |
| Screenshot of RotateMapRight. | e80c | RotateMapRight |
| Screenshot of RotateMapLeft. | e80d | RotateMapLeft |
| Screenshot of Home. | e80f | Home |
| Screenshot of ParkingLocation. | e811 | ParkingLocation |
| Screenshot of MapCompassTop. | e812 | MapCompassTop |
| Screenshot of MapCompassBottom. | e813 | MapCompassBottom |
| Screenshot of IncidentTriangle. | e814 | IncidentTriangle |
| Screenshot of Touch. | e815 | Touch |
| Screenshot of MapDirections. | e816 | MapDirections |
| Screenshot of StartPoint. | e819 | StartPoint |
| Screenshot of StopPoint. | e81a | StopPoint |
| Screenshot of EndPoint. | e81b | EndPoint |
| Screenshot of History. | e81c | History |
| Screenshot of Location. | e81d | Location |
| Screenshot of MapLayers. | e81e | MapLayers |
| Screenshot of Accident. | e81f | Accident |
| Screenshot of Work. | e821 | Work |
| Screenshot of Construction. | e822 | Construction |
| Screenshot of Recent. | e823 | Recent |
| Screenshot of Bank. | e825 | Bank |
| Screenshot of DownloadMap. | e826 | DownloadMap |
| Screenshot of InkingToolFill2. | e829 | InkingToolFill2 |
| Screenshot of HighlightFill2. | e82a | HighlightFill2 |
| Screenshot of EraseToolFill. | e82b | EraseToolFill |
| Screenshot of EraseToolFill2. | e82c | EraseToolFill2 |
| Screenshot of Dictionary. | e82d | Dictionary |
| Screenshot of DictionaryAdd. | e82e | DictionaryAdd |
| Screenshot of ToolTip. | e82f | ToolTip |
| Screenshot of ChromeBack. | e830 | ChromeBack |
| Screenshot of ProvisioningPackage. | e835 | ProvisioningPackage |
| Screenshot of AddRemoteDevice. | e836 | AddRemoteDevice |
| Screenshot of FolderOpen. | e838 | FolderOpen |
| Screenshot of Ethernet. | e839 | Ethernet |
| Screenshot of ShareBroadband. | e83a | ShareBroadband |
| Screenshot of DirectAccess. | e83b | DirectAccess |
| Screenshot of DialUp. | e83c | DialUp |
| Screenshot of DefenderApp. | e83d | DefenderApp |
| Screenshot of BatteryCharging9. | e83e | BatteryCharging9 |
| Screenshot of Battery10. | e83f | Battery10 |
| Screenshot of Pinned. | e840 | Pinned |
| Screenshot of PinFill. | e841 | PinFill |
| Screenshot of PinnedFill. | e842 | PinnedFill |
| Screenshot of PeriodKey. | e843 | PeriodKey |
| Screenshot of PuncKey. | e844 | PuncKey |
| Screenshot of RevToggleKey. | e845 | RevToggleKey |
| Screenshot of RightArrowKeyTime1. | e846 | RightArrowKeyTime1 |
| Screenshot of RightArrowKeyTime2. | e847 | RightArrowKeyTime2 |
| Screenshot of LeftQuote. | e848 | LeftQuote |
| Screenshot of RightQuote. | e849 | RightQuote |
| Screenshot of DownShiftKey. | e84a | DownShiftKey |
| Screenshot of UpShiftKey. | e84b | UpShiftKey |
| Screenshot of PuncKey0. | e84c | PuncKey0 |
| Screenshot of PuncKeyLeftBottom. | e84d | PuncKeyLeftBottom |
| Screenshot of RightArrowKeyTime3. | e84e | RightArrowKeyTime3 |
| Screenshot of RightArrowKeyTime4. | e84f | RightArrowKeyTime4 |
| Screenshot of Battery0. | e850 | Battery0 |
| Screenshot of Battery1. | e851 | Battery1 |
| Screenshot of Battery2. | e852 | Battery2 |
| Screenshot of Battery3. | e853 | Battery3 |
| Screenshot of Battery4. | e854 | Battery4 |
| Screenshot of Battery5. | e855 | Battery5 |
| Screenshot of Battery6. | e856 | Battery6 |
| Screenshot of Battery7. | e857 | Battery7 |
| Screenshot of Battery8. | e858 | Battery8 |
| Screenshot of Battery9. | e859 | Battery9 |
| Screenshot of BatteryCharging0. | e85a | BatteryCharging0 |
| Screenshot of BatteryCharging1. | e85b | BatteryCharging1 |
| Screenshot of BatteryCharging2. | e85c | BatteryCharging2 |
| Screenshot of BatteryCharging3. | e85d | BatteryCharging3 |
| Screenshot of BatteryCharging4. | e85e | BatteryCharging4 |
| Screenshot of BatteryCharging5. | e85f | BatteryCharging5 |
| Screenshot of BatteryCharging6. | e860 | BatteryCharging6 |
| Screenshot of BatteryCharging7. | e861 | BatteryCharging7 |
| Screenshot of BatteryCharging8. | e862 | BatteryCharging8 |
| Screenshot of BatterySaver0. | e863 | BatterySaver0 |
| Screenshot of BatterySaver1. | e864 | BatterySaver1 |
| Screenshot of BatterySaver2. | e865 | BatterySaver2 |
| Screenshot of BatterySaver3. | e866 | BatterySaver3 |
| Screenshot of BatterySaver4. | e867 | BatterySaver4 |
| Screenshot of BatterySaver5. | e868 | BatterySaver5 |
| Screenshot of BatterySaver6. | e869 | BatterySaver6 |
| Screenshot of BatterySaver7. | e86a | BatterySaver7 |
| Screenshot of BatterySaver8. | e86b | BatterySaver8 |
| Screenshot of SignalBars1. | e86c | SignalBars1 |
| Screenshot of SignalBars2. | e86d | SignalBars2 |
| Screenshot of SignalBars3. | e86e | SignalBars3 |
| Screenshot of SignalBars4. | e86f | SignalBars4 |
| Screenshot of SignalBars5. | e870 | SignalBars5 |
| Screenshot of SignalNotConnected. | e871 | SignalNotConnected |
| Screenshot of Wifi1. | e872 | Wifi1 |
| Screenshot of Wifi2. | e873 | Wifi2 |
| Screenshot of Wifi3. | e874 | Wifi3 |
| Screenshot of MobSIMLock. | e875 | MobSIMLock |
| Screenshot of MobSIMMissing. | e876 | MobSIMMissing |
| Screenshot of Vibrate. | e877 | Vibrate |
| Screenshot of RoamingInternational. | e878 | RoamingInternational |
| Screenshot of RoamingDomestic. | e879 | RoamingDomestic |
| Screenshot of CallForwardInternational. | e87a | CallForwardInternational |
| Screenshot of CallForwardRoaming. | e87b | CallForwardRoaming |
| Screenshot of JpnRomanji. | e87c | JpnRomanji |
| Screenshot of JpnRomanjiLock. | e87d | JpnRomanjiLock |
| Screenshot of JpnRomanjiShift. | e87e | JpnRomanjiShift |
| Screenshot of JpnRomanjiShiftLock. | e87f | JpnRomanjiShiftLock |
| Screenshot of StatusDataTransfer. | e880 | StatusDataTransfer |
| Screenshot of StatusDataTransferVPN. | e881 | StatusDataTransferVPN |
| Screenshot of StatusDualSIM2. | e882 | StatusDualSIM2 |
| Screenshot of StatusDualSIM2VPN. | e883 | StatusDualSIM2VPN |
| Screenshot of StatusDualSIM1. | e884 | StatusDualSIM1 |
| Screenshot of StatusDualSIM1VPN. | e885 | StatusDualSIM1VPN |
| Screenshot of StatusSGLTE. | e886 | StatusSGLTE |
| Screenshot of StatusSGLTECell. | e887 | StatusSGLTECell |
| Screenshot of StatusSGLTEDataVPN. | e888 | StatusSGLTEDataVPN |
| Screenshot of StatusVPN. | e889 | StatusVPN |
| Screenshot of WifiHotspot. | e88a | WifiHotspot |
| Screenshot of LanguageKor. | e88b | LanguageKor |
| Screenshot of LanguageCht. | e88c | LanguageCht |
| Screenshot of LanguageChs. | e88d | LanguageChs |
| Screenshot of USB. | e88e | USB |
| Screenshot of InkingToolFill. | e88f | InkingToolFill |
| Screenshot of View. | e890 | View |
| Screenshot of HighlightFill. | e891 | HighlightFill |
| Screenshot of Previous. | e892 | Previous |
| Screenshot of Next. | e893 | Next |
| Screenshot of Clear. | e894 | Clear |
| Screenshot of Sync. | e895 | Sync |
| Screenshot of Download. | e896 | Download |
| Screenshot of Help. | e897 | Help |
| Screenshot of Upload. | e898 | Upload |
| Screenshot of Emoji. | e899 | Emoji |
| Screenshot of TwoPage. | e89a | TwoPage |
| Screenshot of LeaveChat. | e89b | LeaveChat |
| Screenshot of MailForward. | e89c | MailForward |
| Screenshot of RotateCamera. | e89e | RotateCamera |
| Screenshot of ClosePane. | e89f | ClosePane |
| Screenshot of OpenPane. | e8a0 | OpenPane |
| Screenshot of PreviewLink. | e8a1 | PreviewLink |
| Screenshot of AttachCamera. | e8a2 | AttachCamera |
| Screenshot of ZoomIn. | e8a3 | ZoomIn |
| Screenshot of Bookmarks. | e8a4 | Bookmarks |
| Screenshot of Document. | e8a5 | Document |
| Screenshot of ProtectedDocument. | e8a6 | ProtectedDocument |
| Screenshot of OpenInNewWindow. | e8a7 | OpenInNewWindow |
| Screenshot of MailFill. | e8a8 | MailFill |
| Screenshot of ViewAll. | e8a9 | ViewAll |
| Screenshot of VideoChat. | e8aa | VideoChat |
| Screenshot of Switch. | e8ab | Switch |
| Screenshot of Rename. | e8ac | Rename |
| Screenshot of Go. | e8ad | Go |
| Screenshot of SurfaceHub. | e8ae | SurfaceHub |
| Screenshot of Remote. | e8af | Remote |
| Screenshot of Click. | e8b0 | Click |
| Screenshot of Shuffle. | e8b1 | Shuffle |
| Screenshot of Movies. | e8b2 | Movies |
| Screenshot of SelectAll. | e8b3 | SelectAll |
| Screenshot of Orientation. | e8b4 | Orientation |
| Screenshot of Import. | e8b5 | Import |
| Screenshot of ImportAll. | e8b6 | ImportAll |
| Screenshot of Folder. | e8b7 | Folder |
| Screenshot of Webcam. | e8b8 | Webcam |
| Screenshot of Picture. | e8b9 | Picture |
| Screenshot of Caption. | e8ba | Caption |
| Screenshot of ChromeClose. | e8bb | ChromeClose |
| Screenshot of ShowResults. | e8bc | ShowResults |
| Screenshot of Message. | e8bd | Message |
| Screenshot of Leaf. | e8be | Leaf |
| Screenshot of CalendarDay. | e8bf | CalendarDay |
| Screenshot of CalendarWeek. | e8c0 | CalendarWeek |
| Screenshot of Characters. | e8c1 | Characters |
| Screenshot of MailReplyAll. | e8c2 | MailReplyAll |
| Screenshot of Read. | e8c3 | Read |
| Screenshot of ShowBcc. | e8c4 | ShowBcc |
| Screenshot of HideBcc. | e8c5 | HideBcc |
| Screenshot of Cut. | e8c6 | Cut |
| Screenshot of PaymentCard. | e8c7 | PaymentCard |
| Screenshot of Copy. | e8c8 | Copy |
| Screenshot of Important. | e8c9 | Important |
| Screenshot of MailReply. | e8ca | MailReply |
| Screenshot of Sort. | e8cb | Sort |
| Screenshot of MobileTablet. | e8cc | MobileTablet |
| Screenshot of DisconnectDrive. | e8cd | DisconnectDrive |
| Screenshot of MapDrive. | e8ce | MapDrive |
| Screenshot of ContactPresence. | e8cf | ContactPresence |
| Screenshot of Priority. | e8d0 | Priority |
| Screenshot of GotoToday. | e8d1 | GotoToday |
| Screenshot of Font. | e8d2 | Font |
| Screenshot of FontColor. | e8d3 | FontColor |
| Screenshot of Contact2. | e8d4 | Contact2 |
| Screenshot of FolderFill. | e8d5 | FolderFill |
| Screenshot of Audio. | e8d6 | Audio |
| Screenshot of Permissions. | e8d7 | Permissions |
| Screenshot of DisableUpdates. | e8d8 | DisableUpdates |
| Screenshot of Unfavorite. | e8d9 | Unfavorite |
| Screenshot of OpenLocal. | e8da | OpenLocal |
| Screenshot of Italic. | e8db | Italic |
| Screenshot of Underline. | e8dc | Underline |
| Screenshot of Bold. | e8dd | Bold |
| Screenshot of MoveToFolder. | e8de | MoveToFolder |
| Screenshot of LikeDislike. | e8df | LikeDislike |
| Screenshot of Dislike. | e8e0 | Dislike |
| Screenshot of Like. | e8e1 | Like |
| Screenshot of AlignRight. | e8e2 | AlignRight |
| Screenshot of AlignCenter. | e8e3 | AlignCenter |
| Screenshot of AlignLeft. | e8e4 | AlignLeft |
| Screenshot of OpenFile. | e8e5 | OpenFile |
| Screenshot of ClearSelection. | e8e6 | ClearSelection |
| Screenshot of FontDecrease. | e8e7 | FontDecrease |
| Screenshot of FontIncrease. | e8e8 | FontIncrease |
| Screenshot of FontSize. | e8e9 | FontSize |
| Screenshot of CellPhone. | e8ea | CellPhone |
| Screenshot of Reshare. | e8eb | Reshare |
| Screenshot of Tag. | e8ec | Tag |
| Screenshot of RepeatOne. | e8ed | RepeatOne |
| Screenshot of RepeatAll. | e8ee | RepeatAll |
| Screenshot of Calculator. | e8ef | Calculator |
| Screenshot of Directions. | e8f0 | Directions |
| Screenshot of Library. | e8f1 | Library |
| Screenshot of ChatBubbles. | e8f2 | ChatBubbles |
| Screenshot of PostUpdate. | e8f3 | PostUpdate |
| Screenshot of NewFolder. | e8f4 | NewFolder |
| Screenshot of CalendarReply. | e8f5 | CalendarReply |
| Screenshot of UnsyncFolder. | e8f6 | UnsyncFolder |
| Screenshot of SyncFolder. | e8f7 | SyncFolder |
| Screenshot of BlockContact. | e8f8 | BlockContact |
| Screenshot of SwitchApps. | e8f9 | SwitchApps |
| Screenshot of AddFriend. | e8fa | AddFriend |
| Screenshot of Accept. | e8fb | Accept |
| Screenshot of GoToStart. | e8fc | GoToStart |
| Screenshot of BulletedList. | e8fd | BulletedList |
| Screenshot of Scan. | e8fe | Scan |
| Screenshot of Preview. | e8ff | Preview |
| Screenshot of Group. | e902 | Group |
| Screenshot of ZeroBars. | e904 | ZeroBars |
| Screenshot of OneBar. | e905 | OneBar |
| Screenshot of TwoBars. | e906 | TwoBars |
| Screenshot of ThreeBars. | e907 | ThreeBars |
| Screenshot of FourBars. | e908 | FourBars |
| Screenshot of World. | e909 | World |
| Screenshot of Comment. | e90a | Comment |
| Screenshot of MusicInfo. | e90b | MusicInfo |
| Screenshot of DockLeft. | e90c | DockLeft |
| Screenshot of DockRight. | e90d | DockRight |
| Screenshot of DockBottom. | e90e | DockBottom |
| Screenshot of Repair. | e90f | Repair |
| Screenshot of Accounts. | e910 | Accounts |
| Screenshot of DullSound. | e911 | DullSound |
| Screenshot of Manage. | e912 | Manage |
| Screenshot of Street. | e913 | Street |
| Screenshot of Printer3D. | e914 | Printer3D |
| Screenshot of RadioBullet. | e915 | RadioBullet |
| Screenshot of Stopwatch. | e916 | Stopwatch |
| Screenshot of Clock. | e917 | Clock |
| Screenshot of Photo. | e91b | Photo |
| Screenshot of ActionCenter. | e91c | ActionCenter |
| Screenshot of FullCircleMask. | e91f | FullCircleMask |
| Screenshot of ChromeMinimize. | e921 | ChromeMinimize |
| Screenshot of ChromeMaximize. | e922 | ChromeMaximize |
| Screenshot of ChromeRestore. | e923 | ChromeRestore |
| Screenshot of Annotation. | e924 | Annotation |
| Screenshot of BackSpaceQWERTYSm. | e925 | BackSpaceQWERTYSm |
| Screenshot of BackSpaceQWERTYMd. | e926 | BackSpaceQWERTYMd |
| Screenshot of Swipe. | e927 | Swipe |
| Screenshot of Fingerprint. | e928 | Fingerprint |
| Screenshot of Handwriting. | e929 | Handwriting |
| Screenshot of ChromeBackToWindow. | e92c | ChromeBackToWindow |
| Screenshot of ChromeFullScreen. | e92d | ChromeFullScreen |
| Screenshot of KeyboardStandard. | e92e | KeyboardStandard |
| Screenshot of KeyboardDismiss. | e92f | KeyboardDismiss |
| Screenshot of Completed. | e930 | Completed |
| Screenshot of ChromeAnnotate. | e931 | ChromeAnnotate |
| Screenshot of Label. | e932 | Label |
| Screenshot of IBeam. | e933 | IBeam |
| Screenshot of IBeamOutline. | e934 | IBeamOutline |
| Screenshot of FlickDown. | e935 | FlickDown |
| Screenshot of FlickUp. | e936 | FlickUp |
| Screenshot of FlickLeft. | e937 | FlickLeft |
| Screenshot of FlickRight. | e938 | FlickRight |
| Screenshot of FeedbackApp. | e939 | FeedbackApp |
| Screenshot of MiniExpand. | e93a | MiniExpand |
| Screenshot of MusicAlbum. | e93c | MusicAlbum |
| Screenshot of Streaming. | e93e | Streaming |
| Screenshot of Code. | e943 | Code |
| Screenshot of ReturnToWindow. | e944 | ReturnToWindow |
| Screenshot of LightningBolt. | e945 | LightningBolt |
| Screenshot of Info. | e946 | Info |
| Screenshot of CalculatorMultiply. | e947 | CalculatorMultiply |
| Screenshot of CalculatorAddition. | e948 | CalculatorAddition |
| Screenshot of CalculatorSubtract. | e949 | CalculatorSubtract |
| Screenshot of CalculatorDivide. | e94a | CalculatorDivide |
| Screenshot of CalculatorSquareroot. | e94b | CalculatorSquareroot |
| Screenshot of CalculatorPercentage. | e94c | CalculatorPercentage |
| Screenshot of CalculatorNegate. | e94d | CalculatorNegate |
| Screenshot of CalculatorEqualTo. | e94e | CalculatorEqualTo |
| Screenshot of CalculatorBackspace. | e94f | CalculatorBackspace |
| Screenshot of Component. | e950 | Component |
| Screenshot of DMC. | e951 | DMC |
| Screenshot of Dock. | e952 | Dock |
| Screenshot of MultimediaDMS. | e953 | MultimediaDMS |
| Screenshot of MultimediaDVR. | e954 | MultimediaDVR |
| Screenshot of MultimediaPMP. | e955 | MultimediaPMP |
| Screenshot of PrintfaxPrinterFile. | e956 | PrintfaxPrinterFile |
| Screenshot of Sensor. | e957 | Sensor |
| Screenshot of StorageOptical. | e958 | StorageOptical |
| Screenshot of Communications. | e95a | Communications |
| Screenshot of Headset. | e95b | Headset |
| Screenshot of Projector. | e95d | Projector |
| Screenshot of Health. | e95e | Health |
| Screenshot of Wire. | e95f | Wire |
| Screenshot of Webcam2. | e960 | Webcam2 |
| Screenshot of Input. | e961 | Input |
| Screenshot of Mouse. | e962 | Mouse |
| Screenshot of Smartcard. | e963 | Smartcard |
| Screenshot of SmartcardVirtual. | e964 | SmartcardVirtual |
| Screenshot of MediaStorageTower. | e965 | MediaStorageTower |
| Screenshot of ReturnKeySm. | e966 | ReturnKeySm |
| Screenshot of GameConsole. | e967 | GameConsole |
| Screenshot of Network. | e968 | Network |
| Screenshot of StorageNetworkWireless. | e969 | StorageNetworkWireless |
| Screenshot of StorageTape. | e96a | StorageTape |
| Screenshot of ChevronUpSmall. | e96d | ChevronUpSmall |
| Screenshot of ChevronDownSmall. | e96e | ChevronDownSmall |
| Screenshot of ChevronLeftSmall. | e96f | ChevronLeftSmall |
| Screenshot of ChevronRightSmall. | e970 | ChevronRightSmall |
| Screenshot of ChevronUpMed. | e971 | ChevronUpMed |
| Screenshot of ChevronDownMed. | e972 | ChevronDownMed |
| Screenshot of ChevronLeftMed. | e973 | ChevronLeftMed |
| Screenshot of ChevronRightMed. | e974 | ChevronRightMed |
| Screenshot of Devices2. | e975 | Devices2 |
| Screenshot of ExpandTile. | e976 | ExpandTile |
| Screenshot of PC1. | e977 | PC1 |
| Screenshot of PresenceChicklet. | e978 | PresenceChicklet |
| Screenshot of PresenceChickletVideo. | e979 | PresenceChickletVideo |
| Screenshot of Reply. | e97a | Reply |
| Screenshot of SetTile. | e97b | SetTile |
| Screenshot of Type. | e97c | Type |
| Screenshot of Korean. | e97d | Korean |
| Screenshot of HalfAlpha. | e97e | HalfAlpha |
| Screenshot of FullAlpha. | e97f | FullAlpha |
| Screenshot of Key12On. | e980 | Key12On |
| Screenshot of ChineseChangjie. | e981 | ChineseChangjie |
| Screenshot of QWERTYOn. | e982 | QWERTYOn |
| Screenshot of QWERTYOff. | e983 | QWERTYOff |
| Screenshot of ChineseQuick. | e984 | ChineseQuick |
| Screenshot of Japanese. | e985 | Japanese |
| Screenshot of FullHiragana. | e986 | FullHiragana |
| Screenshot of FullKatakana. | e987 | FullKatakana |
| Screenshot of HalfKatakana. | e988 | HalfKatakana |
| Screenshot of ChineseBoPoMoFo. | e989 | ChineseBoPoMoFo |
| Screenshot of ChinesePinyin. | e98a | ChinesePinyin |
| Screenshot of ConstructionCone. | e98f | ConstructionCone |
| Screenshot of XboxOneConsole. | e990 | XboxOneConsole |
| Screenshot of Volume0. | e992 | Volume0 |
| Screenshot of Volume1. | e993 | Volume1 |
| Screenshot of Volume2. | e994 | Volume2 |
| Screenshot of Volume3. | e995 | Volume3 |
| Screenshot of BatteryUnknown. | e996 | BatteryUnknown |
| Screenshot of WifiAttentionOverlay. | e998 | WifiAttentionOverlay |
| Screenshot of Robot. | e99a | Robot |
| Screenshot of TapAndSend. | e9a1 | TapAndSend |
| Screenshot of TextBulletListSquareSparkle. | e9a3 | TextBulletListSquareSparkle |
| Screenshot of TextBulletListSquare. | e9a4 | TextBulletListSquare |
| Screenshot of FitPage. | e9a6 | FitPage |
| Screenshot of PasswordKeyShow. | e9a8 | PasswordKeyShow |
| Screenshot of PasswordKeyHide. | e9a9 | PasswordKeyHide |
| Screenshot of BidiLtr. | e9aa | BidiLtr |
| Screenshot of BidiRtl. | e9ab | BidiRtl |
| Screenshot of ForwardSm. | e9ac | ForwardSm |
| Screenshot of CommaKey. | e9ad | CommaKey |
| Screenshot of DashKey. | e9ae | DashKey |
| Screenshot of DullSoundKey. | e9af | DullSoundKey |
| Screenshot of HalfDullSound. | e9b0 | HalfDullSound |
| Screenshot of RightDoubleQuote. | e9b1 | RightDoubleQuote |
| Screenshot of LeftDoubleQuote. | e9b2 | LeftDoubleQuote |
| Screenshot of PuncKeyRightBottom. | e9b3 | PuncKeyRightBottom |
| Screenshot of PuncKey1. | e9b4 | PuncKey1 |
| Screenshot of PuncKey2. | e9b5 | PuncKey2 |
| Screenshot of PuncKey3. | e9b6 | PuncKey3 |
| Screenshot of PuncKey4. | e9b7 | PuncKey4 |
| Screenshot of PuncKey5. | e9b8 | PuncKey5 |
| Screenshot of PuncKey6. | e9b9 | PuncKey6 |
| Screenshot of PuncKey9. | e9ba | PuncKey9 |
| Screenshot of PuncKey7. | e9bb | PuncKey7 |
| Screenshot of PuncKey8. | e9bc | PuncKey8 |
| Screenshot of Frigid. | e9ca | Frigid |
| Screenshot of Unknown. | e9ce | Unknown |
| Screenshot of AreaChart. | e9d2 | AreaChart |
| Screenshot of CheckList. | e9d5 | CheckList |
| Screenshot of Diagnostic. | e9d9 | Diagnostic |
| Screenshot of Equalizer. | e9e9 | Equalizer |
| Screenshot of Process. | e9f3 | Process |
| Screenshot of Processing. | e9f5 | Processing |
| Screenshot of ReportDocument. | e9f9 | ReportDocument |

### PUA EA0C-ECF3

The following table of glyphs displays unicode points prefixed from EA- to EC-.

[Back to top](#icon-list)

| Glyph | Unicode point | Description |
| --- | --- | --- |
| Screenshot of VideoSolid. | ea0c | VideoSolid |
| Screenshot of MixedMediaBadge. | ea0d | MixedMediaBadge |
| Screenshot of DisconnectDisplay. | ea14 | DisconnectDisplay |
| Screenshot of Shield. | ea18 | Shield |
| Screenshot of Info2. | ea1f | Info2 |
| Screenshot of ActionCenterAsterisk. | ea21 | ActionCenterAsterisk |
| Screenshot of Beta. | ea24 | Beta |
| Screenshot of SaveCopy. | ea35 | SaveCopy |
| Screenshot of List. | ea37 | List |
| Screenshot of Asterisk. | ea38 | Asterisk |
| Screenshot of ErrorBadge. | ea39 | ErrorBadge |
| Screenshot of CircleRing. | ea3a | CircleRing |
| Screenshot of CircleFill. | ea3b | CircleFill |
| Screenshot of MergeCall. | ea3c | MergeCall |
| Screenshot of PrivateCall. | ea3d | PrivateCall |
| Screenshot of Record2. | ea3f | Record2 |
| Screenshot of AllAppsMirrored. | ea40 | AllAppsMirrored |
| Screenshot of BookmarksMirrored. | ea41 | BookmarksMirrored |
| Screenshot of BulletedListMirrored. | ea42 | BulletedListMirrored |
| Screenshot of CallForwardInternationalMirrored. | ea43 | CallForwardInternationalMirrored |
| Screenshot of CallForwardRoamingMirrored. | ea44 | CallForwardRoamingMirrored |
| Screenshot of ChromeBackMirrored. | ea47 | ChromeBackMirrored |
| Screenshot of ClearSelectionMirrored. | ea48 | ClearSelectionMirrored |
| Screenshot of ClosePaneMirrored. | ea49 | ClosePaneMirrored |
| Screenshot of ContactInfoMirrored. | ea4a | ContactInfoMirrored |
| Screenshot of DockRightMirrored. | ea4b | DockRightMirrored |
| Screenshot of DockLeftMirrored. | ea4c | DockLeftMirrored |
| Screenshot of ExpandTileMirrored. | ea4e | ExpandTileMirrored |
| Screenshot of GoMirrored. | ea4f | GoMirrored |
| Screenshot of GripperResizeMirrored. | ea50 | GripperResizeMirrored |
| Screenshot of HelpMirrored. | ea51 | HelpMirrored |
| Screenshot of ImportMirrored. | ea52 | ImportMirrored |
| Screenshot of ImportAllMirrored. | ea53 | ImportAllMirrored |
| Screenshot of LeaveChatMirrored. | ea54 | LeaveChatMirrored |
| Screenshot of ListMirrored. | ea55 | ListMirrored |
| Screenshot of MailForwardMirrored. | ea56 | MailForwardMirrored |
| Screenshot of MailReplyMirrored. | ea57 | MailReplyMirrored |
| Screenshot of MailReplyAllMirrored. | ea58 | MailReplyAllMirrored |
| Screenshot of OpenPaneMirrored. | ea5b | OpenPaneMirrored |
| Screenshot of OpenWithMirrored. | ea5c | OpenWithMirrored |
| Screenshot of ParkingLocationMirrored. | ea5e | ParkingLocationMirrored |
| Screenshot of ResizeMouseMediumMirrored. | ea5f | ResizeMouseMediumMirrored |
| Screenshot of ResizeMouseSmallMirrored. | ea60 | ResizeMouseSmallMirrored |
| Screenshot of ResizeMouseTallMirrored. | ea61 | ResizeMouseTallMirrored |
| Screenshot of ResizeTouchNarrowerMirrored. | ea62 | ResizeTouchNarrowerMirrored |
| Screenshot of SendMirrored. | ea63 | SendMirrored |
| Screenshot of SendFillMirrored. | ea64 | SendFillMirrored |
| Screenshot of ShowResultsMirrored. | ea65 | ShowResultsMirrored |
| Screenshot of Media. | ea69 | Media |
| Screenshot of SyncError. | ea6a | SyncError |
| Screenshot of Devices3. | ea6c | Devices3 |
| Screenshot of SlowMotionOn. | ea79 | SlowMotionOn |
| Screenshot of Lightbulb. | ea80 | Lightbulb |
| Screenshot of StatusCircle. | ea81 | StatusCircle |
| Screenshot of StatusTriangle. | ea82 | StatusTriangle |
| Screenshot of StatusError. | ea83 | StatusError |
| Screenshot of StatusWarning. | ea84 | StatusWarning |
| Screenshot of VolumeDisabled. | ea85 | VolumeDisabled |
| Screenshot of Puzzle. | ea86 | Puzzle |
| Screenshot of CalendarSolid. | ea89 | CalendarSolid |
| Screenshot of HomeSolid. | ea8a | HomeSolid |
| Screenshot of ParkingLocationSolid. | ea8b | ParkingLocationSolid |
| Screenshot of ContactSolid. | ea8c | ContactSolid |
| Screenshot of ConstructionSolid. | ea8d | ConstructionSolid |
| Screenshot of AccidentSolid. | ea8e | AccidentSolid |
| Screenshot of Ringer. | ea8f | Ringer |
| Screenshot of PDF. | ea90 | PDF |
| Screenshot of ThoughtBubble. | ea91 | ThoughtBubble |
| Screenshot of HeartBroken. | ea92 | HeartBroken |
| Screenshot of BatteryCharging10. | ea93 | BatteryCharging10 |
| Screenshot of BatterySaver9. | ea94 | BatterySaver9 |
| Screenshot of BatterySaver10. | ea95 | BatterySaver10 |
| Screenshot of CallForwardingMirrored. | ea97 | CallForwardingMirrored |
| Screenshot of MultiSelectMirrored. | ea98 | MultiSelectMirrored |
| Screenshot of Broom. | ea99 | Broom |
| Screenshot of SignalBarsAni1. | eaa1 | SignalBarsAni1 |
| Screenshot of SignalBarsAni2. | eaa2 | SignalBarsAni2 |
| Screenshot of SignalBarsAni3. | eaa3 | SignalBarsAni3 |
| Screenshot of EthernetAni1. | eaa4 | EthernetAni1 |
| Screenshot of WifiAni1. | eaa5 | WifiAni1 |
| Screenshot of WifiAni2. | eaa8 | WifiAni2 |
| Screenshot of EmojiEdit. | eaaa | EmojiEdit |
| Screenshot of SurfaceTypecover. | eaae | SurfaceTypecover |
| Screenshot of ChatSparkle. | eab7 | ChatSparkle |
| Screenshot of CellFlowVertical. | eabb | CellFlowVertical |
| Screenshot of WindowsStudioEffects. | eabc | WindowsStudioEffects |
| Screenshot of PortraitBlur. | eabe | PortraitBlur |
| Screenshot of ForwardCall. | eac2 | ForwardCall |
| Screenshot of DesktopLeafTwo. | eac7 | DesktopLeafTwo |
| Screenshot of Emojiplay. | ead4 | Emojiplay |
| Screenshot of EmojiBrush. | ead5 | EmojiBrush |
| Screenshot of EyeTracking. | ead6 | EyeTracking |
| Screenshot of EyeTrackingText. | ead7 | EyeTrackingText |
| Screenshot of LiveCaptionsSparkle. | ead8 | LiveCaptionsSparkle |
| Screenshot of Trackers. | eadf | Trackers |
| Screenshot of Market. | eafc | Market |
| Screenshot of PieSingle. | eb05 | PieSingle |
| Screenshot of StockUp. | eb0f | StockUp |
| Screenshot of StockDown. | eb11 | StockDown |
| Screenshot of MobBatteryUnknownCharging. | eb17 | MobBatteryUnknownCharging |
| Screenshot of ClicktoDoOff. | eb19 | ClicktoDoOff |
| Screenshot of BatteryUnknownCharging. | eb1a | BatteryUnknownCharging |
| Screenshot of ClicktoDo. | eb1d | ClicktoDo |
| Screenshot of Glasses2. | eb25 | Glasses2 |
| Screenshot of StatusSquareOuter. | eb33 | StatusSquareOuter |
| Screenshot of StatusSquarePause. | eb34 | StatusSquarePause |
| Screenshot of GenericApp. | eb3b | GenericApp |
| Screenshot of Design. | eb3c | Design |
| Screenshot of Website. | eb41 | Website |
| Screenshot of Drop. | eb42 | Drop |
| Screenshot of Radar. | eb44 | Radar |
| Screenshot of BusSolid. | eb47 | BusSolid |
| Screenshot of FerrySolid. | eb48 | FerrySolid |
| Screenshot of StartPointSolid. | eb49 | StartPointSolid |
| Screenshot of StopPointSolid. | eb4a | StopPointSolid |
| Screenshot of EndPointSolid. | eb4b | EndPointSolid |
| Screenshot of AirplaneSolid. | eb4c | AirplaneSolid |
| Screenshot of TrainSolid. | eb4d | TrainSolid |
| Screenshot of WorkSolid. | eb4e | WorkSolid |
| Screenshot of ReminderFill. | eb4f | ReminderFill |
| Screenshot of Reminder. | eb50 | Reminder |
| Screenshot of Heart. | eb51 | Heart |
| Screenshot of HeartFill. | eb52 | HeartFill |
| Screenshot of EthernetError. | eb55 | EthernetError |
| Screenshot of EthernetWarning. | eb56 | EthernetWarning |
| Screenshot of StatusConnecting1. | eb57 | StatusConnecting1 |
| Screenshot of StatusConnecting2. | eb58 | StatusConnecting2 |
| Screenshot of StatusUnsecure. | eb59 | StatusUnsecure |
| Screenshot of WifiError0. | eb5a | WifiError0 |
| Screenshot of WifiError1. | eb5b | WifiError1 |
| Screenshot of WifiError2. | eb5c | WifiError2 |
| Screenshot of WifiError3. | eb5d | WifiError3 |
| Screenshot of WifiError4. | eb5e | WifiError4 |
| Screenshot of WifiWarning0. | eb5f | WifiWarning0 |
| Screenshot of WifiWarning1. | eb60 | WifiWarning1 |
| Screenshot of WifiWarning2. | eb61 | WifiWarning2 |
| Screenshot of WifiWarning3. | eb62 | WifiWarning3 |
| Screenshot of WifiWarning4. | eb63 | WifiWarning4 |
| Screenshot of Devices4. | eb66 | Devices4 |
| Screenshot of NUIIris. | eb67 | NUIIris |
| Screenshot of NUIFace. | eb68 | NUIFace |
| Screenshot of GatewayRouter. | eb77 | GatewayRouter |
| Screenshot of SummarizeSparkle. | eb78 | SummarizeSparkle |
| Screenshot of EditMirrored. | eb7e | EditMirrored |
| Screenshot of NUIFPStartSlideHand. | eb82 | NUIFPStartSlideHand |
| Screenshot of NUIFPStartSlideAction. | eb83 | NUIFPStartSlideAction |
| Screenshot of NUIFPContinueSlideHand. | eb84 | NUIFPContinueSlideHand |
| Screenshot of NUIFPContinueSlideAction. | eb85 | NUIFPContinueSlideAction |
| Screenshot of NUIFPRollRightHand. | eb86 | NUIFPRollRightHand |
| Screenshot of NUIFPRollRightHandAction. | eb87 | NUIFPRollRightHandAction |
| Screenshot of NUIFPRollLeftHand. | eb88 | NUIFPRollLeftHand |
| Screenshot of NUIFPRollLeftAction. | eb89 | NUIFPRollLeftAction |
| Screenshot of NUIFPPressHand. | eb8a | NUIFPPressHand |
| Screenshot of NUIFPPressAction. | eb8b | NUIFPPressAction |
| Screenshot of NUIFPPressRepeatHand. | eb8c | NUIFPPressRepeatHand |
| Screenshot of NUIFPPressRepeatAction. | eb8d | NUIFPPressRepeatAction |
| Screenshot of StatusErrorFull. | eb90 | StatusErrorFull |
| Screenshot of TaskViewExpanded. | eb91 | TaskViewExpanded |
| Screenshot of Certificate. | eb95 | Certificate |
| Screenshot of BackSpaceQWERTYLg. | eb96 | BackSpaceQWERTYLg |
| Screenshot of ReturnKeyLg. | eb97 | ReturnKeyLg |
| Screenshot of FastForward. | eb9d | FastForward |
| Screenshot of Rewind. | eb9e | Rewind |
| Screenshot of Photo2. | eb9f | Photo2 |
| Screenshot of MobBattery0. | eba0 | MobBattery0 |
| Screenshot of MobBattery1. | eba1 | MobBattery1 |
| Screenshot of MobBattery2. | eba2 | MobBattery2 |
| Screenshot of MobBattery3. | eba3 | MobBattery3 |
| Screenshot of MobBattery4. | eba4 | MobBattery4 |
| Screenshot of MobBattery5. | eba5 | MobBattery5 |
| Screenshot of MobBattery6. | eba6 | MobBattery6 |
| Screenshot of MobBattery7. | eba7 | MobBattery7 |
| Screenshot of MobBattery8. | eba8 | MobBattery8 |
| Screenshot of MobBattery9. | eba9 | MobBattery9 |
| Screenshot of MobBattery10. | ebaa | MobBattery10 |
| Screenshot of MobBatteryCharging0. | ebab | MobBatteryCharging0 |
| Screenshot of MobBatteryCharging1. | ebac | MobBatteryCharging1 |
| Screenshot of MobBatteryCharging2. | ebad | MobBatteryCharging2 |
| Screenshot of MobBatteryCharging3. | ebae | MobBatteryCharging3 |
| Screenshot of MobBatteryCharging4. | ebaf | MobBatteryCharging4 |
| Screenshot of MobBatteryCharging5. | ebb0 | MobBatteryCharging5 |
| Screenshot of MobBatteryCharging6. | ebb1 | MobBatteryCharging6 |
| Screenshot of MobBatteryCharging7. | ebb2 | MobBatteryCharging7 |
| Screenshot of MobBatteryCharging8. | ebb3 | MobBatteryCharging8 |
| Screenshot of MobBatteryCharging9. | ebb4 | MobBatteryCharging9 |
| Screenshot of MobBatteryCharging10. | ebb5 | MobBatteryCharging10 |
| Screenshot of MobBatterySaver0. | ebb6 | MobBatterySaver0 |
| Screenshot of MobBatterySaver1. | ebb7 | MobBatterySaver1 |
| Screenshot of MobBatterySaver2. | ebb8 | MobBatterySaver2 |
| Screenshot of MobBatterySaver3. | ebb9 | MobBatterySaver3 |
| Screenshot of MobBatterySaver4. | ebba | MobBatterySaver4 |
| Screenshot of MobBatterySaver5. | ebbb | MobBatterySaver5 |
| Screenshot of MobBatterySaver6. | ebbc | MobBatterySaver6 |
| Screenshot of MobBatterySaver7. | ebbd | MobBatterySaver7 |
| Screenshot of MobBatterySaver8. | ebbe | MobBatterySaver8 |
| Screenshot of MobBatterySaver9. | ebbf | MobBatterySaver9 |
| Screenshot of MobBatterySaver10. | ebc0 | MobBatterySaver10 |
| Screenshot of DictionaryCloud. | ebc3 | DictionaryCloud |
| Screenshot of ResetDrive. | ebc4 | ResetDrive |
| Screenshot of VolumeBars. | ebc5 | VolumeBars |
| Screenshot of Project. | ebc6 | Project |
| Screenshot of SystemInPrivate. | ebc8 | SystemInPrivate |
| Screenshot of SystemInPrivateFilled. | ebc9 | SystemInPrivateFilled |
| Screenshot of AdjustHologram. | ebd2 | AdjustHologram |
| Screenshot of CloudDownload. | ebd3 | CloudDownload |
| Screenshot of MobWifiCallBars. | ebd4 | MobWifiCallBars |
| Screenshot of MobWifiCall0. | ebd5 | MobWifiCall0 |
| Screenshot of MobWifiCall1. | ebd6 | MobWifiCall1 |
| Screenshot of MobWifiCall2. | ebd7 | MobWifiCall2 |
| Screenshot of MobWifiCall3. | ebd8 | MobWifiCall3 |
| Screenshot of MobWifiCall4. | ebd9 | MobWifiCall4 |
| Screenshot of Family. | ebda | Family |
| Screenshot of LockFeedback. | ebdb | LockFeedback |
| Screenshot of DeviceDiscovery. | ebde | DeviceDiscovery |
| Screenshot of WindDirection. | ebe6 | WindDirection |
| Screenshot of RightArrowKeyTime0. | ebe7 | RightArrowKeyTime0 |
| Screenshot of Bug. | ebe8 | Bug |
| Screenshot of TabletMode. | ebfc | TabletMode |
| Screenshot of StatusCircleLeft. | ebfd | StatusCircleLeft |
| Screenshot of StatusTriangleLeft. | ebfe | StatusTriangleLeft |
| Screenshot of StatusErrorLeft. | ebff | StatusErrorLeft |
| Screenshot of StatusWarningLeft. | ec00 | StatusWarningLeft |
| Screenshot of MobBatteryUnknown. | ec02 | MobBatteryUnknown |
| Screenshot of NetworkTower. | ec05 | NetworkTower |
| Screenshot of CityNext. | ec06 | CityNext |
| Screenshot of CityNext2. | ec07 | CityNext2 |
| Screenshot of Courthouse. | ec08 | Courthouse |
| Screenshot of Groceries. | ec09 | Groceries |
| Screenshot of Sustainable. | ec0a | Sustainable |
| Screenshot of BuildingEnergy. | ec0b | BuildingEnergy |
| Screenshot of ToggleFilled. | ec11 | ToggleFilled |
| Screenshot of ToggleBorder. | ec12 | ToggleBorder |
| Screenshot of SliderThumb. | ec13 | SliderThumb |
| Screenshot of ToggleThumb. | ec14 | ToggleThumb |
| Screenshot of MiracastLogoSmall. | ec15 | MiracastLogoSmall |
| Screenshot of MiracastLogoLarge. | ec16 | MiracastLogoLarge |
| Screenshot of PLAP. | ec19 | PLAP |
| Screenshot of Badge. | ec1b | Badge |
| Screenshot of SignalRoaming. | ec1e | SignalRoaming |
| Screenshot of MobileLocked. | ec20 | MobileLocked |
| Screenshot of InsiderHubApp. | ec24 | InsiderHubApp |
| Screenshot of PersonalFolder. | ec25 | PersonalFolder |
| Screenshot of HomeGroup. | ec26 | HomeGroup |
| Screenshot of MyNetwork. | ec27 | MyNetwork |
| Screenshot of KeyboardFull. | ec31 | KeyboardFull |
| Screenshot of Cafe. | ec32 | Cafe |
| Screenshot of FormatText. | ec34 | FormatText |
| Screenshot of MobSignal1. | ec37 | MobSignal1 |
| Screenshot of MobSignal2. | ec38 | MobSignal2 |
| Screenshot of MobSignal3. | ec39 | MobSignal3 |
| Screenshot of MobSignal4. | ec3a | MobSignal4 |
| Screenshot of MobSignal5. | ec3b | MobSignal5 |
| Screenshot of MobWifi1. | ec3c | MobWifi1 |
| Screenshot of MobWifi2. | ec3d | MobWifi2 |
| Screenshot of MobWifi3. | ec3e | MobWifi3 |
| Screenshot of MobWifi4. | ec3f | MobWifi4 |
| Screenshot of MobAirplane. | ec40 | MobAirplane |
| Screenshot of MobBluetooth. | ec41 | MobBluetooth |
| Screenshot of MobActionCenter. | ec42 | MobActionCenter |
| Screenshot of MobLocation. | ec43 | MobLocation |
| Screenshot of MobWifiHotspot. | ec44 | MobWifiHotspot |
| Screenshot of LanguageJpn. | ec45 | LanguageJpn |
| Screenshot of MobQuietHours. | ec46 | MobQuietHours |
| Screenshot of MobDrivingMode. | ec47 | MobDrivingMode |
| Screenshot of SpeedOff. | ec48 | SpeedOff |
| Screenshot of SpeedMedium. | ec49 | SpeedMedium |
| Screenshot of SpeedHigh. | ec4a | SpeedHigh |
| Screenshot of ThisPC. | ec4e | ThisPC |
| Screenshot of MusicNote. | ec4f | MusicNote |
| Screenshot of FileExplorer. | ec50 | FileExplorer |
| Screenshot of FileExplorerApp. | ec51 | FileExplorerApp |
| Screenshot of LeftArrowKeyTime0. | ec52 | LeftArrowKeyTime0 |
| Screenshot of MicOff. | ec54 | MicOff |
| Screenshot of MicSleep. | ec55 | MicSleep |
| Screenshot of MicError. | ec56 | MicError |
| Screenshot of PlaybackRate1x. | ec57 | PlaybackRate1x |
| Screenshot of PlaybackRateOther. | ec58 | PlaybackRateOther |
| Screenshot of CashDrawer. | ec59 | CashDrawer |
| Screenshot of BarcodeScanner. | ec5a | BarcodeScanner |
| Screenshot of ReceiptPrinter. | ec5b | ReceiptPrinter |
| Screenshot of MagStripeReader. | ec5c | MagStripeReader |
| Screenshot of CompletedSolid. | ec61 | CompletedSolid |
| Screenshot of CompanionApp. | ec64 | CompanionApp |
| Screenshot of Favicon2. | ec6c | Favicon2 |
| Screenshot of SwipeRevealArt. | ec6d | SwipeRevealArt |
| Screenshot of MicOn. | ec71 | MicOn |
| Screenshot of MicClipping. | ec72 | MicClipping |
| Screenshot of TabletSelected. | ec74 | TabletSelected |
| Screenshot of MobileSelected. | ec75 | MobileSelected |
| Screenshot of LaptopSelected. | ec76 | LaptopSelected |
| Screenshot of TVMonitorSelected. | ec77 | TVMonitorSelected |
| Screenshot of DeveloperTools. | ec7a | DeveloperTools |
| Screenshot of MobCallForwarding. | ec7e | MobCallForwarding |
| Screenshot of MobCallForwardingMirrored. | ec7f | MobCallForwardingMirrored |
| Screenshot of BodyCam. | ec80 | BodyCam |
| Screenshot of PoliceCar. | ec81 | PoliceCar |
| Screenshot of UpdateStatusDot2. | ec83 | UpdateStatusDot2 |
| Screenshot of Draw. | ec87 | Draw |
| Screenshot of DrawSolid. | ec88 | DrawSolid |
| Screenshot of LowerBrightness. | ec8a | LowerBrightness |
| Screenshot of ScrollUpDown. | ec8f | ScrollUpDown |
| Screenshot of Uninstall. | ec91 | Uninstall |
| Screenshot of DateTime. | ec92 | DateTime |
| Screenshot of HoloLens. | ec94 | HoloLens |
| Screenshot of CloudNotSynced. | ec9c | CloudNotSynced |
| Screenshot of Tiles. | eca5 | Tiles |
| Screenshot of PartyLeader. | eca7 | PartyLeader |
| Screenshot of AppIconDefault. | ecaa | AppIconDefault |
| Screenshot of Calories. | ecad | Calories |
| Screenshot of POI. | ecaf | POI |
| Screenshot of BandBattery0. | ecb9 | BandBattery0 |
| Screenshot of BandBattery1. | ecba | BandBattery1 |
| Screenshot of BandBattery2. | ecbb | BandBattery2 |
| Screenshot of BandBattery3. | ecbc | BandBattery3 |
| Screenshot of BandBattery4. | ecbd | BandBattery4 |
| Screenshot of BandBattery5. | ecbe | BandBattery5 |
| Screenshot of BandBattery6. | ecbf | BandBattery6 |
| Screenshot of AddSurfaceHub. | ecc4 | AddSurfaceHub |
| Screenshot of DevUpdate. | ecc5 | DevUpdate |
| Screenshot of Unit. | ecc6 | Unit |
| Screenshot of AddTo. | ecc8 | AddTo |
| Screenshot of RemoveFrom. | ecc9 | RemoveFrom |
| Screenshot of RadioBtnOff. | ecca | RadioBtnOff |
| Screenshot of RadioBtnOn. | eccb | RadioBtnOn |
| Screenshot of RadioBullet2. | eccc | RadioBullet2 |
| Screenshot of ExploreContent. | eccd | ExploreContent |
| Screenshot of Blocked2. | ece4 | Blocked2 |
| Screenshot of ScrollMode. | ece7 | ScrollMode |
| Screenshot of ZoomMode. | ece8 | ZoomMode |
| Screenshot of PanMode. | ece9 | PanMode |
| Screenshot of WiredUSB. | ecf0 | WiredUSB |
| Screenshot of WirelessUSB. | ecf1 | WirelessUSB |
| Screenshot of USBSafeConnect. | ecf3 | USBSafeConnect |

### PUA ED0C-EFFF

The following table of glyphs displays unicode points prefixed from ED- to EF-.

[Back to top](#icon-list)

| Glyph | Unicode point | Description |
| --- | --- | --- |
| Screenshot of ActionCenterNotificationMirrored. | ed0c | ActionCenterNotificationMirrored |
| Screenshot of ActionCenterMirrored. | ed0d | ActionCenterMirrored |
| Screenshot of SubscriptionAdd. | ed0e | SubscriptionAdd |
| Screenshot of ResetDevice. | ed10 | ResetDevice |
| Screenshot of SubscriptionAddMirrored. | ed11 | SubscriptionAddMirrored |
| Screenshot of QRCode. | ed14 | QRCode |
| Screenshot of Feedback. | ed15 | Feedback |
| Screenshot of Hide. | ed1a | Hide |
| Screenshot of Subtitles. | ed1e | Subtitles |
| Screenshot of SubtitlesAudio. | ed1f | SubtitlesAudio |
| Screenshot of RestartUpdate2. | ed21 | RestartUpdate2 |
| Screenshot of OpenFolderHorizontal. | ed25 | OpenFolderHorizontal |
| Screenshot of CalendarMirrored. | ed28 | CalendarMirrored |
| Screenshot of MobeSIM. | ed2a | MobeSIM |
| Screenshot of MobeSIMNoProfile. | ed2b | MobeSIMNoProfile |
| Screenshot of MobeSIMLocked. | ed2c | MobeSIMLocked |
| Screenshot of MobeSIMBusy. | ed2d | MobeSIMBusy |
| Screenshot of SignalError. | ed2e | SignalError |
| Screenshot of StreamingEnterprise. | ed2f | StreamingEnterprise |
| Screenshot of Headphone0. | ed30 | Headphone0 |
| Screenshot of Headphone1. | ed31 | Headphone1 |
| Screenshot of Headphone2. | ed32 | Headphone2 |
| Screenshot of Headphone3. | ed33 | Headphone3 |
| Screenshot of Apps. | ed35 | Apps |
| Screenshot of SearchSparkle. | ed37 | SearchSparkle |
| Screenshot of KeyboardBrightness. | ed39 | KeyboardBrightness |
| Screenshot of KeyboardLowerBrightness. | ed3a | KeyboardLowerBrightness |
| Screenshot of SkipBack10. | ed3c | SkipBack10 |
| Screenshot of SkipForward30. | ed3d | SkipForward30 |
| Screenshot of TreeFolderFolder. | ed41 | TreeFolderFolder |
| Screenshot of TreeFolderFolderFill. | ed42 | TreeFolderFolderFill |
| Screenshot of TreeFolderFolderOpen. | ed43 | TreeFolderFolderOpen |
| Screenshot of TreeFolderFolderOpenFill. | ed44 | TreeFolderFolderOpenFill |
| Screenshot of MultimediaDMP. | ed47 | MultimediaDMP |
| Screenshot of KeyboardOneHanded. | ed4c | KeyboardOneHanded |
| Screenshot of Narrator. | ed4d | Narrator |
| Screenshot of EmojiTabPeople. | ed53 | EmojiTabPeople |
| Screenshot of EmojiTabSmilesAnimals. | ed54 | EmojiTabSmilesAnimals |
| Screenshot of EmojiTabCelebrationObjects. | ed55 | EmojiTabCelebrationObjects |
| Screenshot of EmojiTabFoodPlants. | ed56 | EmojiTabFoodPlants |
| Screenshot of EmojiTabTransitPlaces. | ed57 | EmojiTabTransitPlaces |
| Screenshot of EmojiTabSymbols. | ed58 | EmojiTabSymbols |
| Screenshot of EmojiTabTextSmiles. | ed59 | EmojiTabTextSmiles |
| Screenshot of EmojiTabFavorites. | ed5a | EmojiTabFavorites |
| Screenshot of EmojiSwatch. | ed5b | EmojiSwatch |
| Screenshot of ConnectApp. | ed5c | ConnectApp |
| Screenshot of CompanionDeviceFramework. | ed5d | CompanionDeviceFramework |
| Screenshot of Ruler. | ed5e | Ruler |
| Screenshot of FingerInking. | ed5f | FingerInking |
| Screenshot of StrokeErase. | ed60 | StrokeErase |
| Screenshot of PointErase. | ed61 | PointErase |
| Screenshot of ClearAllInk. | ed62 | ClearAllInk |
| Screenshot of Pencil. | ed63 | Pencil |
| Screenshot of Marker. | ed64 | Marker |
| Screenshot of InkingCaret. | ed65 | InkingCaret |
| Screenshot of InkingColorOutline. | ed66 | InkingColorOutline |
| Screenshot of InkingColorFill. | ed67 | InkingColorFill |
| Screenshot of HardDrive. | eda2 | HardDrive |
| Screenshot of NetworkAdapter. | eda3 | NetworkAdapter |
| Screenshot of Touchscreen. | eda4 | Touchscreen |
| Screenshot of NetworkPrinter. | eda5 | NetworkPrinter |
| Screenshot of CloudPrinter. | eda6 | CloudPrinter |
| Screenshot of KeyboardShortcut. | eda7 | KeyboardShortcut |
| Screenshot of BrushSize. | eda8 | BrushSize |
| Screenshot of NarratorForward. | eda9 | NarratorForward |
| Screenshot of NarratorForwardMirrored. | edaa | NarratorForwardMirrored |
| Screenshot of SyncBadge12. | edab | SyncBadge12 |
| Screenshot of RingerBadge12. | edac | RingerBadge12 |
| Screenshot of AsteriskBadge12. | edad | AsteriskBadge12 |
| Screenshot of ErrorBadge12. | edae | ErrorBadge12 |
| Screenshot of CircleRingBadge12. | edaf | CircleRingBadge12 |
| Screenshot of CircleFillBadge12. | edb0 | CircleFillBadge12 |
| Screenshot of ImportantBadge12. | edb1 | ImportantBadge12 |
| Screenshot of MailBadge12. | edb3 | MailBadge12 |
| Screenshot of PauseBadge12. | edb4 | PauseBadge12 |
| Screenshot of PlayBadge12. | edb5 | PlayBadge12 |
| Screenshot of PenWorkspace. | edc6 | PenWorkspace |
| Screenshot of CaretLeft8. | edd5 | CaretLeft8 |
| Screenshot of CaretRight8. | edd6 | CaretRight8 |
| Screenshot of CaretUp8. | edd7 | CaretUp8 |
| Screenshot of CaretDown8. | edd8 | CaretDown8 |
| Screenshot of CaretLeftSolid8. | edd9 | CaretLeftSolid8 |
| Screenshot of CaretRightSolid8. | edda | CaretRightSolid8 |
| Screenshot of CaretUpSolid8. | eddb | CaretUpSolid8 |
| Screenshot of CaretDownSolid8. | eddc | CaretDownSolid8 |
| Screenshot of Strikethrough. | ede0 | Strikethrough |
| Screenshot of Export. | ede1 | Export |
| Screenshot of ExportMirrored. | ede2 | ExportMirrored |
| Screenshot of ButtonMenu. | ede3 | ButtonMenu |
| Screenshot of CloudSearch. | ede4 | CloudSearch |
| Screenshot of PinyinIMELogo. | ede5 | PinyinIMELogo |
| Screenshot of CalligraphyPen. | edfb | CalligraphyPen |
| Screenshot of ReplyMirrored. | ee35 | ReplyMirrored |
| Screenshot of LockscreenDesktop. | ee3f | LockscreenDesktop |
| Screenshot of TaskViewSettings. | ee40 | TaskViewSettings |
| Screenshot of FullHiraganaPrivateMode. | ee41 | FullHiraganaPrivateMode |
| Screenshot of FullKatakanaPrivateMode. | ee42 | FullKatakanaPrivateMode |
| Screenshot of HalfAlphaPrivateMode. | ee43 | HalfAlphaPrivateMode |
| Screenshot of HalfKatakanaPrivateMode. | ee44 | HalfKatakanaPrivateMode |
| Screenshot of FullAlphaPrivateMode. | ee45 | FullAlphaPrivateMode |
| Screenshot of MiniExpand2Mirrored. | ee47 | MiniExpand2Mirrored |
| Screenshot of MiniContract2Mirrored. | ee49 | MiniContract2Mirrored |
| Screenshot of Play36. | ee4a | Play36 |
| Screenshot of PenPalette. | ee56 | PenPalette |
| Screenshot of GuestUser. | ee57 | GuestUser |
| Screenshot of SettingsBattery. | ee63 | SettingsBattery |
| Screenshot of TaskbarPhone. | ee64 | TaskbarPhone |
| Screenshot of LockScreenGlance. | ee65 | LockScreenGlance |
| Screenshot of GenericScan. | ee6f | GenericScan |
| Screenshot of ImageExport. | ee71 | ImageExport |
| Screenshot of WifiEthernet. | ee77 | WifiEthernet |
| Screenshot of ActionCenterQuiet. | ee79 | ActionCenterQuiet |
| Screenshot of ActionCenterQuietNotification. | ee7a | ActionCenterQuietNotification |
| Screenshot of FIDOPasskey. | ee7e | FIDOPasskey |
| Screenshot of TrackersMirrored. | ee92 | TrackersMirrored |
| Screenshot of DateTimeMirrored. | ee93 | DateTimeMirrored |
| Screenshot of Wheel. | ee94 | Wheel |
| Screenshot of StopSolid. | ee95 | StopSolid |
| Screenshot of RAM. | eea0 | RAM |
| Screenshot of CPU. | eea1 | CPU |
| Screenshot of VirtualMachineGroup. | eea3 | VirtualMachineGroup |
| Screenshot of ButtonView2. | eeca | ButtonView2 |
| Screenshot of PenWorkspaceMirrored. | ef15 | PenWorkspaceMirrored |
| Screenshot of PenPaletteMirrored. | ef16 | PenPaletteMirrored |
| Screenshot of StrokeEraseMirrored. | ef17 | StrokeEraseMirrored |
| Screenshot of PointEraseMirrored. | ef18 | PointEraseMirrored |
| Screenshot of ClearAllInkMirrored. | ef19 | ClearAllInkMirrored |
| Screenshot of BackgroundToggle. | ef1f | BackgroundToggle |
| Screenshot of Marquee. | ef20 | Marquee |
| Screenshot of ChromeCloseContrast. | ef2c | ChromeCloseContrast |
| Screenshot of ChromeMinimizeContrast. | ef2d | ChromeMinimizeContrast |
| Screenshot of ChromeMaximizeContrast. | ef2e | ChromeMaximizeContrast |
| Screenshot of ChromeRestoreContrast. | ef2f | ChromeRestoreContrast |
| Screenshot of TrafficLight. | ef31 | TrafficLight |
| Screenshot of Replay. | ef3b | Replay |
| Screenshot of Eyedropper. | ef3c | Eyedropper |
| Screenshot of LineDisplay. | ef3d | LineDisplay |
| Screenshot of PINPad. | ef3e | PINPad |
| Screenshot of SignatureCapture. | ef3f | SignatureCapture |
| Screenshot of ChipCardCreditCardReader. | ef40 | ChipCardCreditCardReader |
| Screenshot of MarketDown. | ef42 | MarketDown |
| Screenshot of PlayerSettings. | ef58 | PlayerSettings |
| Screenshot of TextEdit. | ef60 | TextEdit |
| Screenshot of LandscapeOrientation. | ef6b | LandscapeOrientation |
| Screenshot of Flow. | ef90 | Flow |
| Screenshot of PauseDurationVoice. | ef91 | PauseDurationVoice |
| Screenshot of Touchpad. | efa5 | Touchpad |
| Screenshot of Speech. | efa9 | Speech |
| Screenshot of AppIconDefaultAdd. | efda | AppIconDefaultAdd |
| Screenshot of CRMScheduleReports. | efff | CRMScheduleReports |

### PUA F000-F5FF

The following table of glyphs displays unicode points prefixed from F0- to F5-.

[Back to top](#icon-list)

| Glyph | Unicode point | Description |
| --- | --- | --- |
| Screenshot of KnowledgeArticle. | f000 | KnowledgeArticle |
| Screenshot of Relationship. | f003 | Relationship |
| Screenshot of ZipFolder. | f012 | ZipFolder |
| Screenshot of Widget. | f034 | Widget |
| Screenshot of WidgetGear. | f035 | WidgetGear |
| Screenshot of WidgetAdd. | f036 | WidgetAdd |
| Screenshot of PasteSparkle. | f03d | PasteSparkle |
| Screenshot of AdvancedPaste. | f03e | AdvancedPaste |
| Screenshot of PortraitLight. | f06c | PortraitLight |
| Screenshot of DefaultAPN. | f080 | DefaultAPN |
| Screenshot of UserAPN. | f081 | UserAPN |
| Screenshot of DoublePinyin. | f085 | DoublePinyin |
| Screenshot of BlueLight. | f08c | BlueLight |
| Screenshot of CaretSolidLeft. | f08d | CaretSolidLeft |
| Screenshot of CaretSolidDown. | f08e | CaretSolidDown |
| Screenshot of CaretSolidRight. | f08f | CaretSolidRight |
| Screenshot of CaretSolidUp. | f090 | CaretSolidUp |
| Screenshot of ButtonA. | f093 | ButtonA |
| Screenshot of ButtonB. | f094 | ButtonB |
| Screenshot of ButtonY. | f095 | ButtonY |
| Screenshot of ButtonX. | f096 | ButtonX |
| Screenshot of ArrowUp8. | f0ad | ArrowUp8 |
| Screenshot of ArrowDown8. | f0ae | ArrowDown8 |
| Screenshot of ArrowRight8. | f0af | ArrowRight8 |
| Screenshot of ArrowLeft8. | f0b0 | ArrowLeft8 |
| Screenshot of QuarentinedItems. | f0b2 | QuarentinedItems |
| Screenshot of QuarentinedItemsMirrored. | f0b3 | QuarentinedItemsMirrored |
| Screenshot of Protractor. | f0b4 | Protractor |
| Screenshot of ChecklistMirrored. | f0b5 | ChecklistMirrored |
| Screenshot of StatusCircle7. | f0b6 | StatusCircle7 |
| Screenshot of StatusCheckmark7. | f0b7 | StatusCheckmark7 |
| Screenshot of StatusErrorCircle7. | f0b8 | StatusErrorCircle7 |
| Screenshot of Connected. | f0b9 | Connected |
| Screenshot of PencilFill. | f0c6 | PencilFill |
| Screenshot of CalligraphyFill. | f0c7 | CalligraphyFill |
| Screenshot of QuarterStarLeft. | f0ca | QuarterStarLeft |
| Screenshot of QuarterStarRight. | f0cb | QuarterStarRight |
| Screenshot of ThreeQuarterStarLeft. | f0cc | ThreeQuarterStarLeft |
| Screenshot of ThreeQuarterStarRight. | f0cd | ThreeQuarterStarRight |
| Screenshot of QuietHoursBadge12. | f0ce | QuietHoursBadge12 |
| Screenshot of BackMirrored. | f0d2 | BackMirrored |
| Screenshot of ForwardMirrored. | f0d3 | ForwardMirrored |
| Screenshot of ChromeBackContrast. | f0d5 | ChromeBackContrast |
| Screenshot of ChromeBackContrastMirrored. | f0d6 | ChromeBackContrastMirrored |
| Screenshot of ChromeBackToWindowContrast. | f0d7 | ChromeBackToWindowContrast |
| Screenshot of ChromeFullScreenContrast. | f0d8 | ChromeFullScreenContrast |
| Screenshot of GridView. | f0e2 | GridView |
| Screenshot of ClipboardList. | f0e3 | ClipboardList |
| Screenshot of ClipboardListMirrored. | f0e4 | ClipboardListMirrored |
| Screenshot of OutlineQuarterStarLeft. | f0e5 | OutlineQuarterStarLeft |
| Screenshot of OutlineQuarterStarRight. | f0e6 | OutlineQuarterStarRight |
| Screenshot of OutlineHalfStarLeft. | f0e7 | OutlineHalfStarLeft |
| Screenshot of OutlineHalfStarRight. | f0e8 | OutlineHalfStarRight |
| Screenshot of OutlineThreeQuarterStarLeft. | f0e9 | OutlineThreeQuarterStarLeft |
| Screenshot of OutlineThreeQuarterStarRight. | f0ea | OutlineThreeQuarterStarRight |
| Screenshot of SpatialVolume0. | f0eb | SpatialVolume0 |
| Screenshot of SpatialVolume1. | f0ec | SpatialVolume1 |
| Screenshot of SpatialVolume2. | f0ed | SpatialVolume2 |
| Screenshot of SpatialVolume3. | f0ee | SpatialVolume3 |
| Screenshot of ApplicationGuard. | f0ef | ApplicationGuard |
| Screenshot of OutlineStarLeftHalf. | f0f7 | OutlineStarLeftHalf |
| Screenshot of OutlineStarRightHalf. | f0f8 | OutlineStarRightHalf |
| Screenshot of ChromeAnnotateContrast. | f0f9 | ChromeAnnotateContrast |
| Screenshot of DefenderBadge12. | f0fb | DefenderBadge12 |
| Screenshot of DetachablePC. | f103 | DetachablePC |
| Screenshot of LeftStick. | f108 | LeftStick |
| Screenshot of RightStick. | f109 | RightStick |
| Screenshot of TriggerLeft. | f10a | TriggerLeft |
| Screenshot of TriggerRight. | f10b | TriggerRight |
| Screenshot of BumperLeft. | f10c | BumperLeft |
| Screenshot of BumperRight. | f10d | BumperRight |
| Screenshot of Dpad. | f10e | Dpad |
| Screenshot of EnglishPunctuation. | f110 | EnglishPunctuation |
| Screenshot of ChinesePunctuation. | f111 | ChinesePunctuation |
| Screenshot of ReadOutLoud. | f112 | ReadOutLoud |
| Screenshot of ProjectToDevice. | f117 | ProjectToDevice |
| Screenshot of HMD. | f119 | HMD |
| Screenshot of CtrlSpatialRight. | f11b | CtrlSpatialRight |
| Screenshot of TaskManagerApp. | f120 | TaskManagerApp |
| Screenshot of PaginationDotOutline10. | f126 | PaginationDotOutline10 |
| Screenshot of PaginationDotSolid10. | f127 | PaginationDotSolid10 |
| Screenshot of StrokeErase2. | f128 | StrokeErase2 |
| Screenshot of SmallErase. | f129 | SmallErase |
| Screenshot of LargeErase. | f12a | LargeErase |
| Screenshot of FolderHorizontal. | f12b | FolderHorizontal |
| Screenshot of MicrophoneListening. | f12e | MicrophoneListening |
| Screenshot of StatusExclamationCircle7. | f12f | StatusExclamationCircle7 |
| Screenshot of Video360. | f131 | Video360 |
| Screenshot of GiftboxOpen. | f133 | GiftboxOpen |
| Screenshot of StatusCircleOuter. | f136 | StatusCircleOuter |
| Screenshot of StatusCircleInner. | f137 | StatusCircleInner |
| Screenshot of StatusCircleRing. | f138 | StatusCircleRing |
| Screenshot of StatusTriangleOuter. | f139 | StatusTriangleOuter |
| Screenshot of StatusTriangleInner. | f13a | StatusTriangleInner |
| Screenshot of StatusTriangleExclamation. | f13b | StatusTriangleExclamation |
| Screenshot of StatusCircleExclamation. | f13c | StatusCircleExclamation |
| Screenshot of StatusCircleErrorX. | f13d | StatusCircleErrorX |
| Screenshot of StatusCircleCheckmark. | f13e | StatusCircleCheckmark |
| Screenshot of StatusCircleInfo. | f13f | StatusCircleInfo |
| Screenshot of StatusCircleBlock. | f140 | StatusCircleBlock |
| Screenshot of StatusCircleBlock2. | f141 | StatusCircleBlock2 |
| Screenshot of StatusCircleQuestionMark. | f142 | StatusCircleQuestionMark |
| Screenshot of StatusCircleSync. | f143 | StatusCircleSync |
| Screenshot of Dial1. | f146 | Dial1 |
| Screenshot of Dial2. | f147 | Dial2 |
| Screenshot of Dial3. | f148 | Dial3 |
| Screenshot of Dial4. | f149 | Dial4 |
| Screenshot of Dial5. | f14a | Dial5 |
| Screenshot of Dial6. | f14b | Dial6 |
| Screenshot of Dial7. | f14c | Dial7 |
| Screenshot of Dial8. | f14d | Dial8 |
| Screenshot of Dial9. | f14e | Dial9 |
| Screenshot of Dial10. | f14f | Dial10 |
| Screenshot of Dial11. | f150 | Dial11 |
| Screenshot of Dial12. | f151 | Dial12 |
| Screenshot of Dial13. | f152 | Dial13 |
| Screenshot of Dial14. | f153 | Dial14 |
| Screenshot of Dial15. | f154 | Dial15 |
| Screenshot of Dial16. | f155 | Dial16 |
| Screenshot of DialShape1. | f156 | DialShape1 |
| Screenshot of DialShape2. | f157 | DialShape2 |
| Screenshot of DialShape3. | f158 | DialShape3 |
| Screenshot of DialShape4. | f159 | DialShape4 |
| Screenshot of ClosedCaptionsInternational. | f15f | ClosedCaptionsInternational |
| Screenshot of TollSolid. | f161 | TollSolid |
| Screenshot of TrafficCongestionSolid. | f163 | TrafficCongestionSolid |
| Screenshot of ExploreContentSingle. | f164 | ExploreContentSingle |
| Screenshot of CollapseContent. | f165 | CollapseContent |
| Screenshot of CollapseContentSingle. | f166 | CollapseContentSingle |
| Screenshot of InfoSolid. | f167 | InfoSolid |
| Screenshot of GroupList. | f168 | GroupList |
| Screenshot of CaretBottomRightSolidCenter8. | f169 | CaretBottomRightSolidCenter8 |
| Screenshot of ProgressRingDots. | f16a | ProgressRingDots |
| Screenshot of Checkbox14. | f16b | Checkbox14 |
| Screenshot of CheckboxComposite14. | f16c | CheckboxComposite14 |
| Screenshot of CheckboxIndeterminateCombo14. | f16d | CheckboxIndeterminateCombo14 |
| Screenshot of CheckboxIndeterminateCombo. | f16e | CheckboxIndeterminateCombo |
| Screenshot of StatusPause7. | f175 | StatusPause7 |
| Screenshot of StatusDiamondOuter. | f178 | StatusDiamondOuter |
| Screenshot of StatusDiamondInner. | f179 | StatusDiamondInner |
| Screenshot of CharacterAppearance. | f17f | CharacterAppearance |
| Screenshot of Lexicon. | f180 | Lexicon |
| Screenshot of ScreenTime. | f182 | ScreenTime |
| Screenshot of HeadlessDevice. | f191 | HeadlessDevice |
| Screenshot of NetworkSharing. | f193 | NetworkSharing |
| Screenshot of Beaker. | f196 | Beaker |
| Screenshot of EyeGaze. | f19d | EyeGaze |
| Screenshot of ToggleLeft. | f19e | ToggleLeft |
| Screenshot of ToggleRight. | f19f | ToggleRight |
| Screenshot of WindowsInsider. | f1ad | WindowsInsider |
| Screenshot of PowerButtonUpdate2. | f1b1 | PowerButtonUpdate2 |
| Screenshot of LassoSparkle. | f1b9 | LassoSparkle |
| Screenshot of SquareSparkle. | f1ba | SquareSparkle |
| Screenshot of TextCursor2. | f1bb | TextCursor2 |
| Screenshot of Lasso. | f1be | Lasso |
| Screenshot of ChromeSwitch. | f1cb | ChromeSwitch |
| Screenshot of ChromeSwitchContast. | f1cc | ChromeSwitchContast |
| Screenshot of TranslateSparkle. | f1d4 | TranslateSparkle |
| Screenshot of RefineSparkle. | f1d5 | RefineSparkle |
| Screenshot of ReformatSparkle. | f1d6 | ReformatSparkle |
| Screenshot of StatusCheckmark. | f1d8 | StatusCheckmark |
| Screenshot of StatusCheckmarkLeft. | f1d9 | StatusCheckmarkLeft |
| Screenshot of LeafTwo. | f1e8 | LeafTwo |
| Screenshot of GridviewGroup. | f207 | GridviewGroup |
| Screenshot of KeyboardLeftAligned. | f20c | KeyboardLeftAligned |
| Screenshot of KeyboardRightAligned. | f20d | KeyboardRightAligned |
| Screenshot of KeyboardSettings. | f210 | KeyboardSettings |
| Screenshot of NetworkPhysical. | f211 | NetworkPhysical |
| Screenshot of IOT. | f22c | IOT |
| Screenshot of UnknownMirrored. | f22e | UnknownMirrored |
| Screenshot of GridViewSmall. | f232 | GridViewSmall |
| Screenshot of ViewDashboard. | f246 | ViewDashboard |
| Screenshot of ExploitProtectionSettings. | f259 | ExploitProtectionSettings |
| Screenshot of KeyboardNarrow. | f260 | KeyboardNarrow |
| Screenshot of Keyboard12Key. | f261 | Keyboard12Key |
| Screenshot of KeyboardDock. | f26b | KeyboardDock |
| Screenshot of KeyboardUndock. | f26c | KeyboardUndock |
| Screenshot of KeyboardLeftDock. | f26d | KeyboardLeftDock |
| Screenshot of KeyboardRightDock. | f26e | KeyboardRightDock |
| Screenshot of Ear. | f270 | Ear |
| Screenshot of PointerHand. | f271 | PointerHand |
| Screenshot of Bullseye. | f272 | Bullseye |
| Screenshot of ActionFramework. | f277 | ActionFramework |
| Screenshot of Earbudsingle. | f27c | Earbudsingle |
| Screenshot of HearingAid. | f27f | HearingAid |
| Screenshot of MobSnooze. | f285 | MobSnooze |
| Screenshot of DocumentApproval. | f28b | DocumentApproval |
| Screenshot of MobNotificationBell. | f2a3 | MobNotificationBell |
| Screenshot of MobNotificationBellFilled. | f2a5 | MobNotificationBellFilled |
| Screenshot of MobSnoozeFilled. | f2a8 | MobSnoozeFilled |
| Screenshot of LocaleLanguage. | f2b7 | LocaleLanguage |
| Screenshot of BulletedList2. | f2c7 | BulletedList2 |
| Screenshot of BulletedList2Mirrored. | f2c8 | BulletedList2Mirrored |
| Screenshot of CirclePause. | f2d9 | CirclePause |
| Screenshot of Restart3. | f305 | Restart3 |
| Screenshot of PassiveAuthentication. | f32a | PassiveAuthentication |
| Screenshot of Emoji4. | f353 | Emoji4 |
| Screenshot of ColorSolid. | f354 | ColorSolid |
| Screenshot of NetworkOffline. | f384 | NetworkOffline |
| Screenshot of NetworkConnected. | f385 | NetworkConnected |
| Screenshot of NetworkConnectedCheckmark. | f386 | NetworkConnectedCheckmark |
| Screenshot of NFCBadge. | f39b | NFCBadge |
| Screenshot of SignOut. | f3b1 | SignOut |
| Screenshot of LikeSolid. | f3bf | LikeSolid |
| Screenshot of DislikeSolid. | f3c0 | DislikeSolid |
| Screenshot of StatusInfo. | f3cc | StatusInfo |
| Screenshot of StatusInfoLeft. | f3cd | StatusInfoLeft |
| Screenshot of NearbySharing. | f3e2 | NearbySharing |
| Screenshot of CtrlSpatialLeft. | f3e7 | CtrlSpatialLeft |
| Screenshot of InteractiveDashboard. | f404 | InteractiveDashboard |
| Screenshot of DeclineCall. | f405 | DeclineCall |
| Screenshot of ClippingTool. | f406 | ClippingTool |
| Screenshot of RectangularClipping. | f407 | RectangularClipping |
| Screenshot of FreeFormClipping. | f408 | FreeFormClipping |
| Screenshot of CopyTo. | f413 | CopyTo |
| Screenshot of IDBadge. | f427 | IDBadge |
| Screenshot of SpeedHigh2. | f42f | SpeedHigh2 |
| Screenshot of BatterySaver. | f432 | BatterySaver |
| Screenshot of DynamicLock. | f439 | DynamicLock |
| Screenshot of PenTips. | f45e | PenTips |
| Screenshot of PenTipsMirrored. | f45f | PenTipsMirrored |
| Screenshot of HWPJoin. | f460 | HWPJoin |
| Screenshot of HWPInsert. | f461 | HWPInsert |
| Screenshot of HWPStrikeThrough. | f462 | HWPStrikeThrough |
| Screenshot of HWPScratchOut. | f463 | HWPScratchOut |
| Screenshot of HWPSplit. | f464 | HWPSplit |
| Screenshot of HWPNewLine. | f465 | HWPNewLine |
| Screenshot of HWPOverwrite. | f466 | HWPOverwrite |
| Screenshot of PhoneResumeAlert. | f470 | PhoneResumeAlert |
| Screenshot of MobWifiWarning1. | f473 | MobWifiWarning1 |
| Screenshot of MobWifiWarning2. | f474 | MobWifiWarning2 |
| Screenshot of MobWifiWarning3. | f475 | MobWifiWarning3 |
| Screenshot of MobWifiWarning4. | f476 | MobWifiWarning4 |
| Screenshot of MicLocationCombo. | f47f | MicLocationCombo |
| Screenshot of Globe2. | f49a | Globe2 |
| Screenshot of SpecialEffectSize. | f4a5 | SpecialEffectSize |
| Screenshot of GIF. | f4a9 | GIF |
| Screenshot of Sticker2. | f4aa | Sticker2 |
| Screenshot of Snooze. | f4bd | Snooze |
| Screenshot of SurfaceHubSelected. | f4be | SurfaceHubSelected |
| Screenshot of HoloLensSelected. | f4bf | HoloLensSelected |
| Screenshot of Earbud. | f4c0 | Earbud |
| Screenshot of MixVolumes. | f4c3 | MixVolumes |
| Screenshot of Safe. | f540 | Safe |
| Screenshot of LaptopSecure. | f552 | LaptopSecure |
| Screenshot of PrintDefault. | f56d | PrintDefault |
| Screenshot of PageMirrored. | f56e | PageMirrored |
| Screenshot of LandscapeOrientationMirrored. | f56f | LandscapeOrientationMirrored |
| Screenshot of ColorOff. | f570 | ColorOff |
| Screenshot of PrintAllPages. | f571 | PrintAllPages |
| Screenshot of PrintCustomRange. | f572 | PrintCustomRange |
| Screenshot of PageMarginPortraitNarrow. | f573 | PageMarginPortraitNarrow |
| Screenshot of PageMarginPortraitNormal. | f574 | PageMarginPortraitNormal |
| Screenshot of PageMarginPortraitModerate. | f575 | PageMarginPortraitModerate |
| Screenshot of PageMarginPortraitWide. | f576 | PageMarginPortraitWide |
| Screenshot of PageMarginLandscapeNarrow. | f577 | PageMarginLandscapeNarrow |
| Screenshot of PageMarginLandscapeNormal. | f578 | PageMarginLandscapeNormal |
| Screenshot of PageMarginLandscapeModerate. | f579 | PageMarginLandscapeModerate |
| Screenshot of PageMarginLandscapeWide. | f57a | PageMarginLandscapeWide |
| Screenshot of CollateLandscape. | f57b | CollateLandscape |
| Screenshot of CollatePortrait. | f57c | CollatePortrait |
| Screenshot of CollatePortraitSeparated. | f57d | CollatePortraitSeparated |
| Screenshot of DuplexLandscapeOneSided. | f57e | DuplexLandscapeOneSided |
| Screenshot of DuplexLandscapeOneSidedMirrored. | f57f | DuplexLandscapeOneSidedMirrored |
| Screenshot of DuplexLandscapeTwoSidedLongEdge. | f580 | DuplexLandscapeTwoSidedLongEdge |
| Screenshot of DuplexLandscapeTwoSidedLongEdgeMirrored. | f581 | DuplexLandscapeTwoSidedLongEdgeMirrored |
| Screenshot of DuplexLandscapeTwoSidedShortEdge. | f582 | DuplexLandscapeTwoSidedShortEdge |
| Screenshot of DuplexLandscapeTwoSidedShortEdgeMirrored. | f583 | DuplexLandscapeTwoSidedShortEdgeMirrored |
| Screenshot of DuplexPortraitOneSided. | f584 | DuplexPortraitOneSided |
| Screenshot of DuplexPortraitOneSidedMirrored. | f585 | DuplexPortraitOneSidedMirrored |
| Screenshot of DuplexPortraitTwoSidedLongEdge. | f586 | DuplexPortraitTwoSidedLongEdge |
| Screenshot of DuplexPortraitTwoSidedLongEdgeMirrored. | f587 | DuplexPortraitTwoSidedLongEdgeMirrored |
| Screenshot of DuplexPortraitTwoSidedShortEdge. | f588 | DuplexPortraitTwoSidedShortEdge |
| Screenshot of DuplexPortraitTwoSidedShortEdgeMirrored. | f589 | DuplexPortraitTwoSidedShortEdgeMirrored |
| Screenshot of PPSOneLandscape. | f58a | PPSOneLandscape |
| Screenshot of PPSTwoLandscape. | f58b | PPSTwoLandscape |
| Screenshot of PPSTwoPortrait. | f58c | PPSTwoPortrait |
| Screenshot of PPSFourLandscape. | f58d | PPSFourLandscape |
| Screenshot of PPSFourPortrait. | f58e | PPSFourPortrait |
| Screenshot of HolePunchOff. | f58f | HolePunchOff |
| Screenshot of HolePunchPortraitLeft. | f590 | HolePunchPortraitLeft |
| Screenshot of HolePunchPortraitRight. | f591 | HolePunchPortraitRight |
| Screenshot of HolePunchPortraitTop. | f592 | HolePunchPortraitTop |
| Screenshot of HolePunchPortraitBottom. | f593 | HolePunchPortraitBottom |
| Screenshot of HolePunchLandscapeLeft. | f594 | HolePunchLandscapeLeft |
| Screenshot of HolePunchLandscapeRight. | f595 | HolePunchLandscapeRight |
| Screenshot of HolePunchLandscapeTop. | f596 | HolePunchLandscapeTop |
| Screenshot of HolePunchLandscapeBottom. | f597 | HolePunchLandscapeBottom |
| Screenshot of StaplingOff. | f598 | StaplingOff |
| Screenshot of StaplingPortraitTopLeft. | f599 | StaplingPortraitTopLeft |
| Screenshot of StaplingPortraitTopRight. | f59a | StaplingPortraitTopRight |
| Screenshot of StaplingPortraitBottomRight. | f59b | StaplingPortraitBottomRight |
| Screenshot of StaplingPortraitTwoLeft. | f59c | StaplingPortraitTwoLeft |
| Screenshot of StaplingPortraitTwoRight. | f59d | StaplingPortraitTwoRight |
| Screenshot of StaplingPortraitTwoTop. | f59e | StaplingPortraitTwoTop |
| Screenshot of StaplingPortraitTwoBottom. | f59f | StaplingPortraitTwoBottom |
| Screenshot of StaplingPortraitBookBinding. | f5a0 | StaplingPortraitBookBinding |
| Screenshot of StaplingLandscapeTopLeft. | f5a1 | StaplingLandscapeTopLeft |
| Screenshot of StaplingLandscapeTopRight. | f5a2 | StaplingLandscapeTopRight |
| Screenshot of StaplingLandscapeBottomLeft. | f5a3 | StaplingLandscapeBottomLeft |
| Screenshot of StaplingLandscapeBottomRight. | f5a4 | StaplingLandscapeBottomRight |
| Screenshot of StaplingLandscapeTwoLeft. | f5a5 | StaplingLandscapeTwoLeft |
| Screenshot of StaplingLandscapeTwoRight. | f5a6 | StaplingLandscapeTwoRight |
| Screenshot of StaplingLandscapeTwoTop. | f5a7 | StaplingLandscapeTwoTop |
| Screenshot of StaplingLandscapeTwoBottom. | f5a8 | StaplingLandscapeTwoBottom |
| Screenshot of StaplingLandscapeBookBinding. | f5a9 | StaplingLandscapeBookBinding |
| Screenshot of StatusDataTransferRoaming. | f5aa | StatusDataTransferRoaming |
| Screenshot of MobSIMError. | f5ab | MobSIMError |
| Screenshot of CollateLandscapeSeparated. | f5ac | CollateLandscapeSeparated |
| Screenshot of PPSOnePortrait. | f5ad | PPSOnePortrait |
| Screenshot of StaplingPortraitBottomLeft. | f5ae | StaplingPortraitBottomLeft |
| Screenshot of PlaySolid. | f5b0 | PlaySolid |
| Screenshot of ShieldLock. | f5b4 | ShieldLock |
| Screenshot of Chess. | f5b5 | Chess |
| Screenshot of POILocationFound. | f5ca | POILocationFound |
| Screenshot of RepeatOff. | f5e7 | RepeatOff |
| Screenshot of Set. | f5ed | Set |
| Screenshot of SetSolid. | f5ee | SetSolid |
| Screenshot of FuzzyReading. | f5ef | FuzzyReading |
| Screenshot of VerticalBattery0. | f5f2 | VerticalBattery0 |
| Screenshot of VerticalBattery1. | f5f3 | VerticalBattery1 |
| Screenshot of VerticalBattery2. | f5f4 | VerticalBattery2 |
| Screenshot of VerticalBattery3. | f5f5 | VerticalBattery3 |
| Screenshot of VerticalBattery4. | f5f6 | VerticalBattery4 |
| Screenshot of VerticalBattery5. | f5f7 | VerticalBattery5 |
| Screenshot of VerticalBattery6. | f5f8 | VerticalBattery6 |
| Screenshot of VerticalBattery7. | f5f9 | VerticalBattery7 |
| Screenshot of VerticalBattery8. | f5fa | VerticalBattery8 |
| Screenshot of VerticalBattery9. | f5fb | VerticalBattery9 |
| Screenshot of VerticalBattery10. | f5fc | VerticalBattery10 |
| Screenshot of VerticalBatteryCharging0. | f5fd | VerticalBatteryCharging0 |
| Screenshot of VerticalBatteryCharging1. | f5fe | VerticalBatteryCharging1 |
| Screenshot of VerticalBatteryCharging2. | f5ff | VerticalBatteryCharging2 |
  
### PUA F600-F8CC

The following table of glyphs displays unicode points prefixed from F6- to F8-.

[Back to top](#icon-list)

| Glyph | Unicode point | Description |
| --- | --- | --- |
| VerticalBatteryCharging3 | f600 | VerticalBatteryCharging3 |
| VerticalBatteryCharging4 | f601 | VerticalBatteryCharging4 |
| VerticalBatteryCharging5 | f602 | VerticalBatteryCharging5 |
| VerticalBatteryCharging6 | f603 | VerticalBatteryCharging6 |
| VerticalBatteryCharging7 | f604 | VerticalBatteryCharging7 |
| VerticalBatteryCharging8 | f605 | VerticalBatteryCharging8 |
| VerticalBatteryCharging9 | f606 | VerticalBatteryCharging9 |
| VerticalBatteryCharging10 | f607 | VerticalBatteryCharging10 |
| VerticalBatteryUnknown | f608 | VerticalBatteryUnknown |
| SIMError | f618 | SIMError |
| SIMMissing | f619 | SIMMissing |
| SIMLock | f61a | SIMLock |
| eSIM | f61b | eSIM |
| eSIMNoProfile | f61c | eSIMNoProfile |
| eSIMLocked | f61d | eSIMLocked |
| eSIMBusy | f61e | eSIMBusy |
| NoiseCancelation | f61f | NoiseCancelation |
| NoiseCancelationOff | f620 | NoiseCancelationOff |
| MusicSharing | f623 | MusicSharing |
| MusicSharingOff | f624 | MusicSharingOff |
| CircleShapeSolid | f63c | CircleShapeSolid |
| WifiCallBars | f657 | WifiCallBars |
| WifiCall0 | f658 | WifiCall0 |
| WifiCall1 | f659 | WifiCall1 |
| WifiCall2 | f65a | WifiCall2 |
| WifiCall3 | f65b | WifiCall3 |
| WifiCall4 | f65c | WifiCall4 |
| Pen | f67b | Pen |
| TextSelect | f683 | TextSelect |
| TextNavigate | f684 | TextNavigate |
| PinyinIMELogo2 | f698 | PinyinIMELogo2 |
| UserRemove | f69b | UserRemove |
| CHTLanguageBar | f69e | CHTLanguageBar |
| ComposeMode | f6a9 | ComposeMode |
| ExpressiveInputEntry | f6b8 | ExpressiveInputEntry |
| EmojiTabMoreSymbols | f6ba | EmojiTabMoreSymbols |
| PhoneScreen | f6c4 | PhoneScreen |
| AlertUrgent | f6c5 | AlertUrgent |
| PhoneDesktop | f6c6 | PhoneDesktop |
| Screenshot of PenSparkle. | f6c7 | PenSparkle |
| WebSearch | f6fa | WebSearch |
| Kiosk | f712 | Kiosk |
| RTTLogo | f714 | RTTLogo |
| VoiceCall | f715 | VoiceCall |
| GoToMessage | f716 | GoToMessage |
| ReturnToCall | f71a | ReturnToCall |
| StartPresenting | f71c | StartPresenting |
| StopPresenting | f71d | StopPresenting |
| ProductivityMode | f71e | ProductivityMode |
| Screenshot of WarningSolid. | f736 | WarningSolid |
| SetHistoryStatus | f738 | SetHistoryStatus |
| SetHistoryStatus2 | f739 | SetHistoryStatus2 |
| Keyboardsettings20 | f73d | Keyboardsettings20 |
| OneHandedRight20 | f73e | OneHandedRight20 |
| OneHandedLeft20 | f73f | OneHandedLeft20 |
| Split20 | f740 | Split20 |
| Full20 | f741 | Full20 |
| Handwriting20 | f742 | Handwriting20 |
| ChevronLeft20 | f743 | ChevronLeft20 |
| ChevronLeft32 | f744 | ChevronLeft32 |
| ChevronRight20 | f745 | ChevronRight20 |
| ChevronRight32 | f746 | ChevronRight32 |
| Screenshot of ShieldTask. | f760 | ShieldTask |
| Event12 | f763 | Event12 |
| MicOff2 | f781 | MicOff2 |
| DeliveryOptimization | f785 | DeliveryOptimization |
| CancelMedium | f78a | CancelMedium |
| SearchMedium | f78b | SearchMedium |
| AcceptMedium | f78c | AcceptMedium |
| RevealPasswordMedium | f78d | RevealPasswordMedium |
| DeleteWord | f7ad | DeleteWord |
| DeleteWordFill | f7ae | DeleteWordFill |
| DeleteLines | f7af | DeleteLines |
| DeleteLinesFill | f7b0 | DeleteLinesFill |
| InstertWords | f7b1 | InstertWords |
| InstertWordsFill | f7b2 | InstertWordsFill |
| JoinWords | f7b3 | JoinWords |
| JoinWordsFill | f7b4 | JoinWordsFill |
| OverwriteWords | f7b5 | OverwriteWords |
| OverwriteWordsFill | f7b6 | OverwriteWordsFill |
| AddNewLine | f7b7 | AddNewLine |
| AddNewLineFill | f7b8 | AddNewLineFill |
| OverwriteWordsKorean | f7b9 | OverwriteWordsKorean |
| OverwriteWordsFillKorean | f7ba | OverwriteWordsFillKorean |
| EducationIcon | f7bb | EducationIcon |
| Screenshot of LearningTools. | f7db | LearningTools |
| Screenshot of Task. | f7ec | Task |
| WindowSnipping | f7ed | WindowSnipping |
| VideoCapture | f7ee | VideoCapture |
| StatusSecured | f809 | StatusSecured |
| NarratorApp | f83b | NarratorApp |
| PowerButtonUpdate | f83d | PowerButtonUpdate |
| RestartUpdate | f83e | RestartUpdate |
| UpdateStatusDot | f83f | UpdateStatusDot |
| Eject | f847 | Eject |
| Spelling | f87b | Spelling |
| SpellingKorean | f87c | SpellingKorean |
| SpellingSerbian | f87d | SpellingSerbian |
| SpellingChinese | f87e | SpellingChinese |
| FolderSelect | f89a | FolderSelect |
| SmartScreen | f8a5 | SmartScreen |
| ExploitProtection | f8a6 | ExploitProtection |
| AddBold | f8aa | AddBold |
| SubtractBold | f8ab | SubtractBold |
| BackSolidBold | f8ac | BackSolidBold |
| ForwardSolidBold | f8ad | ForwardSolidBold |
| PauseBold | f8ae | PauseBold |
| ClickSolid | f8af | ClickSolid |
| SettingsSolid | f8b0 | SettingsSolid |
| MicrophoneSolidBold | f8b1 | MicrophoneSolidBold |
| SpeechSolidBold | f8b2 | SpeechSolidBold |
| ClickedOutLoudSolidBold | f8b3 | ClickedOutLoudSolidBold |
| Screenshot of CopilotVoice. | f8b4 | CopilotVoice |
| VPNOverlay | f8c0 | VPNOverlay |
| VPNRoamingOverly | f8c1 | VPNRoamingOverly |
| WifiVPN3 | f8c2 | WifiVPN3 |
| WifiVPN4 | f8c3 | WifiVPN4 |
| WifiVPN5 | f8c4 | WifiVPN5 |
| SignalBarsVPN2 | f8c5 | SignalBarsVPN2 |
| SignalBarsVPN3 | f8c6 | SignalBarsVPN3 |
| SignalBarsVPN4 | f8c7 | SignalBarsVPN4 |
| SignalBarsVPN5 | f8c8 | SignalBarsVPN5 |
| SignalBarsVPNRoaming3 | f8c9 | SignalBarsVPNRoaming3 |
| SignalBarsVPNRoaming4 | f8ca | SignalBarsVPNRoaming4 |
| SignalBarsVPNRoaming5 | f8cb | SignalBarsVPNRoaming5 |
| EthernetVPN | f8cc | EthernetVPN |
