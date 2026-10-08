---
description: This article lists and provides usage guidance for the glyphs that come with the Segoe MDL2 Assets font.
Search.Refinement.TopicID: 184
title: Segoe MDL2 Assets icons
ms.assetid: DFB215C2-8A61-4957-B662-3B1991AC9BE1
label: Segoe MDL2 Assets icons
template: detail.hbs
ms.date: 09/02/2025
ms.topic: article
keywords: windows 10, uwp
ms.localizationpriority: medium
---
# Segoe MDL2 Assets icons

This article provides developer guidelines for using the Segoe MDL2 Assets icons and lists the font glyphs along with their unicode values and descriptive names.

**Important APIs**:

* [**FontIcon class**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.fonticon)

## About Segoe MDL2 Assets

> **Important:**
> With the release of Windows 10, the `Segoe MDL2 Assets` font replaced the Windows 8/8.1 `Segoe UI Symbol` icon font.
>
> With the release of Windows 11, the `Segoe Fluent Icons` font replaced `Segoe MDL2 Assets` as the recommended symbol icon font. `Segoe UI Symbol` and `Segoe MDL2 Assets` are still available, but we recommend updating your app to use the [Segoe Fluent Icons font](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/design/style/segoe-fluent-icons-font.md).

Most of the icons included in the `Segoe MDL2 Assets` font are mapped to the Private Use Area of Unicode (PUA). The PUA allows font developers to assign private Unicode values to glyphs that don't map to existing code points. This is useful when creating a symbol font, but it creates an interoperability problem. If the font is not available, the glyphs won't show up. Use these glyphs only when you can explicitly specify the `Segoe MDL2 Assets` font. If you are working with tiles, you can't use these glyphs because you can't specify the tile font and PUA glyphs are not available via font-fallback.

Unlike with `Segoe UI Symbol`, the icons in the `Segoe MDL2 Assets` font are not intended for use in-line with text. This means that some older "tricks" like the progressive disclosure arrows no longer apply. Likewise, since all of the new icons are sized and positioned the same, they do not have to be made with zero width; we have just made sure they work as a set. Ideally, you can overlay two icons that were designed as a set and they will fall into place. We may do this to allow colorization in the code. For example, U+EA3A and U+EA3B were created for the Start tile Badge status. Because these are already centered the circle fill can be colored for different states.

## Layering and mirroring

All glyphs in `Segoe MDL2 Assets` have the same fixed width with a consistent height and left origin point, so layering and colorization effects can be achieved by drawing glyphs directly on top of each other. This example show a black outline drawn on top of the zero-width red heart.

Screenshot of using a zero-width glyph.

Many of the icons also have mirrored forms available for use in languages that use right-to-left text directionality such as Arabic, Dari, Persian, and Hebrew.

## Using the icons

To use a glyph from the `Segoe MDL2 Assets` font, use a [**FontIcon**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.fonticon).

```xaml
<FontIcon FontFamily="Segoe MDL2 Assets" Glyph="&#xE700;"/>
```

## How do I get this font?

* On Windows: There's nothing you need to do, the font comes with Windows.
* On a Mac, you need to download and install the font: [Get the Segoe UI and MDL2 icon fonts](https://aka.ms/SegoeFonts)

## Icon list

Please keep in mind that the `Segoe MDL2 Assets` font includes many more icons than we can show here. Many of the icons are intended for specialized purposes and are not typically used anywhere else.

> **Note:**
> Glyphs with prefixes ranging from **E0-** to **E5-** (e.g. E001, E5B1) are currently marked as legacy and we recommend that they not be used.

The following tables display all Segoe MDL2 Assets icons and their respective unicode values and descriptive names. Select a range from the following list to view glyphs according to the PUA range they belong to.

* [PUA E700-E900](#pua-e700-e900)
* [PUA EA00-EC00](#pua-ea00-ec00)
* [PUA ED00-EF00](#pua-ed00-ef00)
* [PUA F000-F200](#pua-f000-f200)
* [PUA F300-F500](#pua-f300-f500)
* [PUA F600-F800](#pua-f600-f800)

### PUA E700-E900

The following table of glyphs displays unicode points prefixed from E7-  to E9-.

[Back to top](#icon-list)

| Glyph | Unicode point | Description |
| --- | --- | --- |
| Screenshot of GlobalNavigationButton. | E700 | GlobalNavigationButton |
| Screenshot of Wifi. | E701 | Wifi |
| Screenshot of Bluetooth. | E702 | Bluetooth |
| Screenshot of Connect. | E703 | Connect |
| Screenshot of InternetSharing. | E704 | InternetSharing |
| Screenshot of VPN. | E705 | VPN |
| Screenshot of Brightness. | E706 | Brightness |
| Screenshot of MapPin. | E707 | MapPin |
| Screenshot of QuietHours. | E708 | QuietHours |
| Screenshot of Airplane. | E709 | Airplane |
| Screenshot of Tablet. | E70A | Tablet |
| Screenshot of QuickNote. | E70B | QuickNote |
| Screenshot of RememberedDevice. | E70C | RememberedDevice |
| Screenshot of ChevronDown. | E70D | ChevronDown |
| Screenshot of ChevronUp. | E70E | ChevronUp |
| Screenshot of Edit. | E70F | Edit |
| Screenshot of Add. | E710 | Add |
| Screenshot of Cancel. | E711 | Cancel |
| Screenshot of More. | E712 | More |
| Screenshot of Setting. | E713 | Setting |
| Screenshot of Video. | E714 | Video |
| Screenshot of Mail. | E715 | Mail |
| Screenshot of People. | E716 | People |
| Screenshot of Phone. | E717 | Phone |
| Screenshot of Pin. | E718 | Pin |
| Screenshot of Shop. | E719 | Shop |
| Screenshot of Stop. | E71A | Stop |
| Screenshot of Link. | E71B | Link |
| Screenshot of Filter. | E71C | Filter |
| Screenshot of AllApps. | E71D | AllApps |
| Screenshot of Zoom. | E71E | Zoom |
| Screenshot of ZoomOut. | E71F | ZoomOut |
| Screenshot of Microphone. | E720 | Microphone |
| Screenshot of Search. | E721 | Search |
| Screenshot of Camera. | E722 | Camera |
| Screenshot of Attach. | E723 | Attach |
| Screenshot of Send. | E724 | Send |
| Screenshot of SendFill. | E725 | SendFill |
| Screenshot of WalkSolid. | E726 | WalkSolid |
| Screenshot of InPrivate. | E727 | InPrivate |
| Screenshot of FavoriteList. | E728 | FavoriteList |
| Screenshot of PageSolid. | E729 | PageSolid |
| Screenshot of Forward. | E72A | Forward |
| Screenshot of Back. | E72B | Back |
| Screenshot of Refresh. | E72C | Refresh |
| Screenshot of Share. | E72D | Share |
| Screenshot of Lock. | E72E | Lock |
| Screenshot of ReportHacked. | E730 | ReportHacked |
| Screenshot of EMI. | E731 | EMI |
| Screenshot of FavoriteStar. | E734 | FavoriteStar |
| Screenshot of FavoriteStarFill. | E735 | FavoriteStarFill |
 | Screenshot of ReadingMode. | E736 | ReadingMode |
| Screenshot of Favicon. | E737 | Favicon |
| Screenshot of Remove. | E738 | Remove |
| Screenshot of Checkbox. | E739 | Checkbox |
| Screenshot of CheckboxComposite. | E73A | CheckboxComposite |
| Screenshot of CheckboxFill. | E73B | CheckboxFill |
| Screenshot of CheckboxIndeterminate. | E73C | CheckboxIndeterminate |
| Screenshot of CheckboxCompositeReversed. | E73D | CheckboxCompositeReversed |
| Screenshot of CheckMark. | E73E | CheckMark |
| Screenshot of BackToWindow. | E73F | BackToWindow |
| Screenshot of FullScreen. | E740 | FullScreen |
| Screenshot of ResizeTouchLarger. | E741 | ResizeTouchLarger |
| Screenshot of ResizeTouchSmaller. | E742 | ResizeTouchSmaller |
| Screenshot of ResizeMouseSmall. | E743 | ResizeMouseSmall |
| Screenshot of ResizeMouseMedium. | E744 | ResizeMouseMedium |
| Screenshot of ResizeMouseWide. | E745 | ResizeMouseWide |
| Screenshot of ResizeMouseTall. | E746 | ResizeMouseTall |
| Screenshot of ResizeMouseLarge. | E747 | ResizeMouseLarge |
| Screenshot of SwitchUser. | E748 | SwitchUser |
| Screenshot of Print. | E749 | Print |
| Screenshot of Up. | E74A | Up |
| Screenshot of Down. | E74B | Down |
| Screenshot of OEM. | E74C | OEM |
| Screenshot of Delete. | E74D | Delete |
| Screenshot of Save. | E74E | Save |
| Screenshot of Mute. | E74F | Mute |
| Screenshot of BackSpaceQWERTY. | E750 | BackSpaceQWERTY |
| Screenshot of ReturnKey. | E751 | ReturnKey |
| Screenshot of UpArrowShiftKey. | E752 | UpArrowShiftKey |
| Screenshot of Cloud. | E753 | Cloud |
| Screenshot of Flashlight. | E754 | Flashlight |
| Screenshot of RotationLock. | E755 | RotationLock |
| Screenshot of CommandPrompt. | E756 | CommandPrompt |
| Screenshot of SIPMove. | E759 | SIPMove |
| Screenshot of SIPUndock. | E75A | SIPUndock |
| Screenshot of SIPRedock. | E75B | SIPRedock |
| Screenshot of EraseTool. | E75C | EraseTool |
| Screenshot of UnderscoreSpace. | E75D | UnderscoreSpace |
| Screenshot of GripperTool. | E75E | GripperTool |
| Screenshot of Dialpad. | E75F | Dialpad |
| Screenshot of PageLeft. | E760 | PageLeft |
| Screenshot of PageRight. | E761 | PageRight |
| Screenshot of MultiSelect. | E762 | MultiSelect |
| Screenshot of KeyboardLeftHanded. | E763 | KeyboardLeftHanded |
| Screenshot of KeyboardRightHanded. | E764 | KeyboardRightHanded |
| Screenshot of KeyboardClassic. | E765 | KeyboardClassic |
| Screenshot of KeyboardSplit. | E766 | KeyboardSplit |
| Screenshot of Volume. | E767 | Volume |
| Screenshot of Play. | E768 | Play |
| Screenshot of Pause. | E769 | Pause |
| Screenshot of ChevronLeft. | E76B | ChevronLeft |
| Screenshot of ChevronRight. | E76C | ChevronRight |
| Screenshot of InkingTool. | E76D | InkingTool |
| Screenshot of Emoji2. | E76E | Emoji2 |
| Screenshot of GripperBarHorizontal. | E76F | GripperBarHorizontal |
| Screenshot of System. | E770 | System |
| Screenshot of Personalize. | E771 | Personalize |
| Screenshot of Devices. | E772 | Devices |
| Screenshot of SearchAndApps. | E773 | SearchAndApps |
| Screenshot of Globe. | E774 | Globe |
| Screenshot of TimeLanguage. | E775 | TimeLanguage |
| Screenshot of EaseOfAccess. | E776 | EaseOfAccess |
| Screenshot of UpdateRestore. | E777 | UpdateRestore |
| Screenshot of HangUp. | E778 | HangUp |
| Screenshot of ContactInfo. | E779 | ContactInfo |
| Screenshot of Unpin. | E77A | Unpin |
| Screenshot of Contact. | E77B | Contact |
| Screenshot of Memo. | E77C | Memo |
 | Screenshot of IncomingCall. | E77E | IncomingCall |
| Screenshot of Paste. | E77F | Paste |
| Screenshot of PhoneBook. | E780 | PhoneBook |
| Screenshot of LEDLight. | E781 | LEDLight |
| Screenshot of Error. | E783 | Error |
| Screenshot of GripperBarVertical. | E784 | GripperBarVertical |
| Screenshot of Unlock. | E785 | Unlock |
| Screenshot of Slideshow. | E786 | Slideshow |
| Screenshot of Calendar. | E787 | Calendar |
| Screenshot of GripperResize. | E788 | GripperResize |
| Screenshot of Megaphone. | E789 | Megaphone |
| Screenshot of Trim. | E78A | Trim |
| Screenshot of NewWindow. | E78B | NewWindow |
| Screenshot of SaveLocal. | E78C | SaveLocal |
| Screenshot of Color. | E790 | Color |
| Screenshot of DataSense. | E791 | DataSense |
| Screenshot of SaveAs. | E792 | SaveAs |
| Screenshot of Light. | E793 | Light |
| Screenshot of AspectRatio. | E799 | AspectRatio |
| Screenshot of DataSenseBar. | E7A5 | DataSenseBar |
| Screenshot of Redo. | E7A6 | Redo |
| Screenshot of Undo. | E7A7 | Undo |
| Screenshot of Crop. | E7A8 | Crop |
| Screenshot of OpenWith. | E7AC | OpenWith |
| Screenshot of Rotate. | E7AD | Rotate |
| Screenshot of RedEye. | E7B3 | RedEye |
| Screenshot of SetlockScreen. | E7B5 | SetlockScreen |
| Screenshot of MapPin2. | E7B7 | MapPin2 |
| Screenshot of Package. | E7B8 | Package |
| Screenshot of Warning. | E7BA | Warning |
| Screenshot of ReadingList. | E7BC | ReadingList |
| Screenshot of Education. | E7BE | Education |
| Screenshot of ShoppingCart. | E7BF | ShoppingCart |
| Screenshot of Train. | E7C0 | Train |
| Screenshot of Flag. | E7C1 | Flag |
| Screenshot of Page. | E7C3 | Page |
| Screenshot of TaskView. | E7C4 | TaskView |
| Screenshot of BrowsePhotos. | E7C5 | BrowsePhotos |
| Screenshot of HalfStarLeft. | E7C6 | HalfStarLeft |
| Screenshot of HalfStarRight. | E7C7 | HalfStarRight |
| Screenshot of Record. | E7C8 | Record |
| Screenshot of TouchPointer. | E7C9 | TouchPointer |
| Screenshot of LangJPN. | E7DE | LangJPN |
| Screenshot of Ferry. | E7E3 | Ferry |
| Screenshot of Highlight. | E7E6 | Highlight |
| Screenshot of ActionCenterNotification. | E7E7 | ActionCenterNotification |
| Screenshot of PowerButton. | E7E8 | PowerButton |
| Screenshot of ResizeTouchNarrower. | E7EA | ResizeTouchNarrower |
| Screenshot of ResizeTouchShorter. | E7EB | ResizeTouchShorter |
| Screenshot of DrivingMode. | E7EC | DrivingMode |
| Screenshot of RingerSilent. | E7ED | RingerSilent |
| Screenshot of OtherUser. | E7EE | OtherUser |
| Screenshot of Admin. | E7EF | Admin |
| Screenshot of CC. | E7F0 | CC |
| Screenshot of SDCard. | E7F1 | SDCard |
| Screenshot of CallForwarding. | E7F2 | CallForwarding |
| Screenshot of SettingsDisplaySound. | E7F3 | SettingsDisplaySound |
| Screenshot of TVMonitor. | E7F4 | TVMonitor |
| Screenshot of Speakers. | E7F5 | Speakers |
| Screenshot of Headphone. | E7F6 | Headphone |
| Screenshot of DeviceLaptopPic. | E7F7 | DeviceLaptopPic |
| Screenshot of DeviceLaptopNoPic. | E7F8 | DeviceLaptopNoPic |
| Screenshot of DeviceMonitorRightPic. | E7F9 | DeviceMonitorRightPic |
| Screenshot of DeviceMonitorLeftPic. | E7FA | DeviceMonitorLeftPic |
| Screenshot of DeviceMonitorNoPic. | E7FB | DeviceMonitorNoPic |
| Screenshot of Game. | E7FC | Game |
| Screenshot of HorizontalTabKey. | E7FD | HorizontalTabKey |
| Screenshot of StreetsideSplitMinimize. | E802 | StreetsideSplitMinimize |
| Screenshot of StreetsideSplitExpand. | E803 | StreetsideSplitExpand |
| Screenshot of Car. | E804 | Car |
| Screenshot of Walk. | E805 | Walk |
| Screenshot of Bus. | E806 | Bus |
| Screenshot of TiltUp. | E809 | TiltUp |
| Screenshot of TiltDown. | E80A | TiltDown |
 | Screenshot of CallControl. | E80B | CallControl |
| Screenshot of RotateMapRight. | E80C | RotateMapRight |
| Screenshot of RotateMapLeft. | E80D | RotateMapLeft |
| Screenshot of Home. | E80F | Home |
| Screenshot of ParkingLocation. | E811 | ParkingLocation |
| Screenshot of MapCompassTop. | E812 | MapCompassTop |
| Screenshot of MapCompassBottom. | E813 | MapCompassBottom |
| Screenshot of IncidentTriangle. | E814 | IncidentTriangle |
| Screenshot of Touch. | E815 | Touch |
| Screenshot of MapDirections. | E816 | MapDirections |
| Screenshot of StartPoint. | E819 | StartPoint |
| Screenshot of StopPoint. | E81A | StopPoint |
| Screenshot of EndPoint. | E81B | EndPoint |
| Screenshot of History. | E81C | History |
| Screenshot of Location. | E81D | Location |
| Screenshot of MapLayers. | E81E | MapLayers |
| Screenshot of Accident. | E81F | Accident |
| Screenshot of Work. | E821 | Work |
| Screenshot of Construction. | E822 | Construction |
| Screenshot of Recent. | E823 | Recent |
| Screenshot of Bank. | E825 | Bank |
| Screenshot of DownloadMap. | E826 | DownloadMap |
| Screenshot of InkingToolFill2. | E829 | InkingToolFill2 |
| Screenshot of HighlightFill2. | E82A | HighlightFill2 |
| Screenshot of EraseToolFill. | E82B | EraseToolFill |
| Screenshot of EraseToolFill2. | E82C | EraseToolFill2 |
| Screenshot of Dictionary. | E82D | Dictionary |
| Screenshot of DictionaryAdd. | E82E | DictionaryAdd |
| Screenshot of ToolTip. | E82F | ToolTip |
| Screenshot of ChromeBack. | E830 | ChromeBack |
| Screenshot of ProvisioningPackage. | E835 | ProvisioningPackage |
| Screenshot of AddRemoteDevice. | E836 | AddRemoteDevice |
| Screenshot of FolderOpen. | E838 | FolderOpen |
| Screenshot of Ethernet. | E839 | Ethernet |
| Screenshot of  ShareBroadband. | E83A | &#x20;ShareBroadband |
| Screenshot of DirectAccess. | E83B | DirectAccess |
| Screenshot of  DialUp. | E83C | &#x20;DialUp |
| Screenshot of DefenderApp . | E83D | DefenderApp&#x20; |
| Screenshot of BatteryCharging9. | E83E | BatteryCharging9 |
| Screenshot of Battery10. | E83F | Battery10 |
| Screenshot of Pinned. | E840 | Pinned |
| Screenshot of PinFill. | E841 | PinFill |
| Screenshot of PinnedFill. | E842 | PinnedFill |
| Screenshot of PeriodKey. | E843 | PeriodKey |
| Screenshot of PuncKey. | E844 | PuncKey |
| Screenshot of RevToggleKey. | E845 | RevToggleKey |
| Screenshot of RightArrowKeyTime1. | E846 | RightArrowKeyTime1 |
| Screenshot of RightArrowKeyTime2. | E847 | RightArrowKeyTime2 |
| Screenshot of LeftQuote. | E848 | LeftQuote |
| Screenshot of RightQuote. | E849 | RightQuote |
| Screenshot of DownShiftKey. | E84A | DownShiftKey |
| Screenshot of UpShiftKey. | E84B | UpShiftKey |
| Screenshot of PuncKey0. | E84C | PuncKey0 |
| Screenshot of PuncKeyLeftBottom. | E84D | PuncKeyLeftBottom |
| Screenshot of RightArrowKeyTime3. | E84E | RightArrowKeyTime3 |
| Screenshot of RightArrowKeyTime4. | E84F | RightArrowKeyTime4 |
| Screenshot of Battery0. | E850 | Battery0 |
| Screenshot of Battery1. | E851 | Battery1 |
| Screenshot of Battery2. | E852 | Battery2 |
| Screenshot of Battery3. | E853 | Battery3 |
| Screenshot of Battery4. | E854 | Battery4 |
| Screenshot of Battery5. | E855 | Battery5 |
| Screenshot of Battery6. | E856 | Battery6 |
| Screenshot of Battery7. | E857 | Battery7 |
| Screenshot of Battery8. | E858 | Battery8 |
| Screenshot of Battery9. | E859 | Battery9 |
| Screenshot of BatteryCharging0. | E85A | BatteryCharging0 |
| Screenshot of BatteryCharging1. | E85B | BatteryCharging1 |
| Screenshot of BatteryCharging2. | E85C | BatteryCharging2 |
| Screenshot of BatteryCharging3. | E85D | BatteryCharging3 |
| Screenshot of BatteryCharging4. | E85E | BatteryCharging4 |
| Screenshot of BatteryCharging5. | E85F | BatteryCharging5 |
| Screenshot of BatteryCharging6. | E860 | BatteryCharging6 |
| Screenshot of BatteryCharging7. | E861 | BatteryCharging7 |
| Screenshot of BatteryCharging8. | E862 | BatteryCharging8 |
| Screenshot of BatterySaver0. | E863 | BatterySaver0 |
| Screenshot of BatterySaver1. | E864 | BatterySaver1 |
| Screenshot of BatterySaver2. | E865 | BatterySaver2 |
| Screenshot of BatterySaver3. | E866 | BatterySaver3 |
| Screenshot of BatterySaver4. | E867 | BatterySaver4 |
| Screenshot of BatterySaver5. | E868 | BatterySaver5 |
| Screenshot of BatterySaver6. | E869 | BatterySaver6 |
| Screenshot of BatterySaver7. | E86A | BatterySaver7 |
| Screenshot of BatterySaver8. | E86B | BatterySaver8 |
| Screenshot of SignalBars1. | E86C | SignalBars1 |
| Screenshot of SignalBars2. | E86D | SignalBars2 |
| Screenshot of SignalBars3. | E86E | SignalBars3 |
| Screenshot of SignalBars4. | E86F | SignalBars4 |
| Screenshot of SignalBars5. | E870 | SignalBars5 |
| Screenshot of SignalNotConnected. | E871 | SignalNotConnected |
| Screenshot of Wifi1. | E872 | Wifi1 |
| Screenshot of Wifi2. | E873 | Wifi2 |
| Screenshot of Wifi3. | E874 | Wifi3 |
| Screenshot of MobSIMLock. | E875 | MobSIMLock |
| Screenshot of MobSIMMissing. | E876 | MobSIMMissing |
| Screenshot of Vibrate. | E877 | Vibrate |
| Screenshot of RoamingInternational. | E878 | RoamingInternational |
| Screenshot of RoamingDomestic. | E879 | RoamingDomestic |
| Screenshot of CallForwardInternational. | E87A | CallForwardInternational |
| Screenshot of CallForwardRoaming. | E87B | CallForwardRoaming |
| Screenshot of JpnRomanji. | E87C | JpnRomanji |
| Screenshot of JpnRomanjiLock. | E87D | JpnRomanjiLock |
| Screenshot of JpnRomanjiShift. | E87E | JpnRomanjiShift |
| Screenshot of JpnRomanjiShiftLock. | E87F | JpnRomanjiShiftLock |
| Screenshot of StatusDataTransfer. | E880 | StatusDataTransfer |
| Screenshot of StatusDataTransferVPN. | E881 | StatusDataTransferVPN |
| Screenshot of StatusDualSIM2. | E882 | StatusDualSIM2 |
| Screenshot of StatusDualSIM2VPN. | E883 | StatusDualSIM2VPN |
| Screenshot of StatusDualSIM1. | E884 | StatusDualSIM1 |
| Screenshot of StatusDualSIM1VPN. | E885 | StatusDualSIM1VPN |
| Screenshot of StatusSGLTE. | E886 | StatusSGLTE |
| Screenshot of StatusSGLTECell. | E887 | StatusSGLTECell |
| Screenshot of StatusSGLTEDataVPN. | E888 | StatusSGLTEDataVPN |
| Screenshot of StatusVPN. | E889 | StatusVPN |
| Screenshot of WifiHotspot. | E88A | WifiHotspot |
| Screenshot of LanguageKor. | E88B | LanguageKor |
| Screenshot of LanguageCht. | E88C | LanguageCht |
| Screenshot of LanguageChs. | E88D | LanguageChs |
| Screenshot of USB. | E88E | USB |
| Screenshot of InkingToolFill. | E88F | InkingToolFill |
| Screenshot of View. | E890 | View |
| Screenshot of HighlightFill. | E891 | HighlightFill |
| Screenshot of Previous. | E892 | Previous |
| Screenshot of Next. | E893 | Next |
| Screenshot of Clear. | E894 | Clear |
| Screenshot of Sync. | E895 | Sync |
| Screenshot of Download. | E896 | Download |
| Screenshot of Help. | E897 | Help |
| Screenshot of Upload. | E898 | Upload |
| Screenshot of Emoji. | E899 | Emoji |
| Screenshot of TwoPage. | E89A | TwoPage |
| Screenshot of LeaveChat. | E89B | LeaveChat |
| Screenshot of MailForward. | E89C | MailForward |
| Screenshot of RotateCamera. | E89E | RotateCamera |
| Screenshot of ClosePane. | E89F | ClosePane |
| Screenshot of OpenPane. | E8A0 | OpenPane |
| Screenshot of PreviewLink. | E8A1 | PreviewLink |
| Screenshot of AttachCamera. | E8A2 | AttachCamera |
| Screenshot of ZoomIn. | E8A3 | ZoomIn |
| Screenshot of Bookmarks. | E8A4 | Bookmarks |
| Screenshot of Document. | E8A5 | Document |
| Screenshot of ProtectedDocument. | E8A6 | ProtectedDocument |
| Screenshot of OpenInNewWindow. | E8A7 | OpenInNewWindow |
| Screenshot of MailFill. | E8A8 | MailFill |
| Screenshot of ViewAll. | E8A9 | ViewAll |
| Screenshot of VideoChat. | E8AA | VideoChat |
| Screenshot of Switch. | E8AB | Switch |
| Screenshot of Rename. | E8AC | Rename |
| Screenshot of Go. | E8AD | Go |
| Screenshot of SurfaceHub. | E8AE | SurfaceHub |
| Screenshot of Remote. | E8AF | Remote |
| Screenshot of Click. | E8B0 | Click |
| Screenshot of Shuffle. | E8B1 | Shuffle |
| Screenshot of Movies. | E8B2 | Movies |
| Screenshot of SelectAll. | E8B3 | SelectAll |
| Screenshot of Orientation. | E8B4 | Orientation |
| Screenshot of Import. | E8B5 | Import |
| Screenshot of ImportAll. | E8B6 | ImportAll |
| Screenshot of Folder. | E8B7 | Folder |
| Screenshot of Webcam. | E8B8 | Webcam |
| Screenshot of Picture. | E8B9 | Picture |
| Screenshot of Caption. | E8BA | Caption |
| Screenshot of ChromeClose. | E8BB | ChromeClose |
| Screenshot of ShowResults. | E8BC | ShowResults |
| Screenshot of Message. | E8BD | Message |
| Screenshot of Leaf. | E8BE | Leaf |
| Screenshot of CalendarDay. | E8BF | CalendarDay |
| Screenshot of CalendarWeek. | E8C0 | CalendarWeek |
| Screenshot of Characters. | E8C1 | Characters |
| Screenshot of MailReplyAll. | E8C2 | MailReplyAll |
| Screenshot of Read. | E8C3 | Read |
| Screenshot of ShowBcc. | E8C4 | ShowBcc |
| Screenshot of HideBcc. | E8C5 | HideBcc |
| Screenshot of Cut. | E8C6 | Cut |
| Screenshot of PaymentCard. | E8C7 | PaymentCard |
| Screenshot of Copy. | E8C8 | Copy |
| Screenshot of Important. | E8C9 | Important |
| Screenshot of MailReply. | E8CA | MailReply |
| Screenshot of Sort. | E8CB | Sort |
| Screenshot of MobileTablet. | E8CC | MobileTablet |
| Screenshot of DisconnectDrive. | E8CD | DisconnectDrive |
| Screenshot of MapDrive. | E8CE | MapDrive |
| Screenshot of ContactPresence. | E8CF | ContactPresence |
| Screenshot of Priority. | E8D0 | Priority |
| Screenshot of GotoToday. | E8D1 | GotoToday |
| Screenshot of Font. | E8D2 | Font |
| Screenshot of FontColor. | E8D3 | FontColor |
| Screenshot of Contact2. | E8D4 | Contact2 |
| Screenshot of FolderFill. | E8D5 | FolderFill |
| Screenshot of Audio. | E8D6 | Audio |
| Screenshot of Permissions. | E8D7 | Permissions |
| Screenshot of DisableUpdates. | E8D8 | DisableUpdates |
| Screenshot of Unfavorite. | E8D9 | Unfavorite |
| Screenshot of OpenLocal. | E8DA | OpenLocal |
| Screenshot of Italic. | E8DB | Italic |
| Screenshot of Underline. | E8DC | Underline |
| Screenshot of Bold. | E8DD | Bold |
| Screenshot of MoveToFolder. | E8DE | MoveToFolder |
| Screenshot of LikeDislike. | E8DF | LikeDislike |
| Screenshot of Dislike. | E8E0 | Dislike |
| Screenshot of Like. | E8E1 | Like |
| Screenshot of AlignRight. | E8E2 | AlignRight |
| Screenshot of AlignCenter. | E8E3 | AlignCenter |
| Screenshot of AlignLeft. | E8E4 | AlignLeft |
| Screenshot of OpenFile. | E8E5 | OpenFile |
| Screenshot of ClearSelection. | E8E6 | ClearSelection |
| Screenshot of FontDecrease. | E8E7 | FontDecrease |
| Screenshot of FontIncrease. | E8E8 | FontIncrease |
| Screenshot of FontSize. | E8E9 | FontSize |
| Screenshot of CellPhone. | E8EA | CellPhone |
| Screenshot of Reshare. | E8EB | Reshare |
| Screenshot of Tag. | E8EC | Tag |
| Screenshot of RepeatOne. | E8ED | RepeatOne |
| Screenshot of RepeatAll. | E8EE | RepeatAll |
| Screenshot of Calculator. | E8EF | Calculator |
| Screenshot of Directions. | E8F0 | Directions |
| Screenshot of Library. | E8F1 | Library |
| Screenshot of ChatBubbles. | E8F2 | ChatBubbles |
| Screenshot of PostUpdate. | E8F3 | PostUpdate |
| Screenshot of NewFolder. | E8F4 | NewFolder |
| Screenshot of CalendarReply. | E8F5 | CalendarReply |
| Screenshot of UnsyncFolder. | E8F6 | UnsyncFolder |
| Screenshot of SyncFolder. | E8F7 | SyncFolder |
| Screenshot of BlockContact. | E8F8 | BlockContact |
| Screenshot of SwitchApps. | E8F9 | SwitchApps |
| Screenshot of AddFriend. | E8FA | AddFriend |
| Screenshot of Accept. | E8FB | Accept |
| Screenshot of GoToStart. | E8FC | GoToStart |
| Screenshot of BulletedList. | E8FD | BulletedList |
| Screenshot of Scan. | E8FE | Scan |
| Screenshot of Preview. | E8FF | Preview |
| Screenshot of Group. | E902 | Group |
| Screenshot of ZeroBars. | E904 | ZeroBars |
| Screenshot of OneBar. | E905 | OneBar |
| Screenshot of TwoBars. | E906 | TwoBars |
| Screenshot of ThreeBars. | E907 | ThreeBars |
| Screenshot of FourBars. | E908 | FourBars |
| Screenshot of World. | E909 | World |
| Screenshot of Comment. | E90A | Comment |
| Screenshot of MusicInfo. | E90B | MusicInfo |
| Screenshot of DockLeft. | E90C | DockLeft |
| Screenshot of DockRight. | E90D | DockRight |
| Screenshot of DockBottom. | E90E | DockBottom |
| Screenshot of Repair. | E90F | Repair |
| Screenshot of Accounts. | E910 | Accounts |
| Screenshot of DullSound. | E911 | DullSound |
| Screenshot of Manage. | E912 | Manage |
| Screenshot of Street. | E913 | Street |
| Screenshot of Printer3D. | E914 | Printer3D |
| Screenshot of RadioBullet. | E915 | RadioBullet |
| Screenshot of Stopwatch. | E916 | Stopwatch |
| Screenshot of Photo. | E91B | Photo |
| Screenshot of ActionCenter. | E91C | ActionCenter |
| Screenshot of FullCircleMask. | E91F | FullCircleMask |
| Screenshot of ChromeMinimize. | E921 | ChromeMinimize |
| Screenshot of ChromeMaximize. | E922 | ChromeMaximize |
| Screenshot of ChromeRestore. | E923 | ChromeRestore |
| Screenshot of Annotation. | E924 | Annotation |
| Screenshot of BackSpaceQWERTYSm. | E925 | BackSpaceQWERTYSm |
| Screenshot of BackSpaceQWERTYMd. | E926 | BackSpaceQWERTYMd |
| Screenshot of Swipe. | E927 | Swipe |
| Screenshot of Fingerprint. | E928 | Fingerprint |
| Screenshot of Handwriting. | E929 | Handwriting |
| Screenshot of ChromeBackToWindow. | E92C | ChromeBackToWindow |
| Screenshot of ChromeFullScreen. | E92D | ChromeFullScreen |
| Screenshot of KeyboardStandard. | E92E | KeyboardStandard |
| Screenshot of KeyboardDismiss. | E92F | KeyboardDismiss |
| Screenshot of Completed. | E930 | Completed |
| Screenshot of ChromeAnnotate. | E931 | ChromeAnnotate |
| Screenshot of Label. | E932 | Label |
| Screenshot of IBeam. | E933 | IBeam |
| Screenshot of IBeamOutline. | E934 | IBeamOutline |
| Screenshot of FlickDown. | E935 | FlickDown |
| Screenshot of FlickUp. | E936 | FlickUp |
| Screenshot of FlickLeft. | E937 | FlickLeft |
| Screenshot of FlickRight. | E938 | FlickRight |
| Screenshot of FeedbackApp. | E939 | FeedbackApp |
| Screenshot of MusicAlbum. | E93C | MusicAlbum |
| Screenshot of Streaming. | E93E | Streaming |
| Screenshot of Code. | E943 | Code |
| Screenshot of ReturnToWindow. | E944 | ReturnToWindow |
| Screenshot of LightningBolt. | E945 | LightningBolt |
| Screenshot of Info. | E946 | Info |
| Screenshot of CalculatorMultiply. | E947 | CalculatorMultiply |
| Screenshot of CalculatorAddition. | E948 | CalculatorAddition |
| Screenshot of CalculatorSubtract. | E949 | CalculatorSubtract |
| Screenshot of CalculatorDivide. | E94A | CalculatorDivide |
| Screenshot of CalculatorSquareroot. | E94B | CalculatorSquareroot |
| Screenshot of CalculatorPercentage. | E94C | CalculatorPercentage |
| Screenshot of CalculatorNegate. | E94D | CalculatorNegate |
| Screenshot of CalculatorEqualTo. | E94E | CalculatorEqualTo |
| Screenshot of CalculatorBackspace. | E94F | CalculatorBackspace |
| Screenshot of Component. | E950 | Component |
| Screenshot of DMC. | E951 | DMC |
| Screenshot of Dock. | E952 | Dock |
| Screenshot of MultimediaDMS. | E953 | MultimediaDMS |
| Screenshot of MultimediaDVR. | E954 | MultimediaDVR |
| Screenshot of MultimediaPMP. | E955 | MultimediaPMP |
| Screenshot of PrintfaxPrinterFile. | E956 | PrintfaxPrinterFile |
| Screenshot of Sensor. | E957 | Sensor |
| Screenshot of StorageOptical. | E958 | StorageOptical |
| Screenshot of Communications. | E95A | Communications |
| Screenshot of Headset. | E95B | Headset |
| Screenshot of Projector. | E95D | Projector |
| Screenshot of Health. | E95E | Health |
 | Screenshot of Wire. | E95F | Wire |
| Screenshot of Webcam2. | E960 | Webcam2 |
| Screenshot of Input. | E961 | Input |
| Screenshot of Mouse. | E962 | Mouse |
| Screenshot of Smartcard. | E963 | Smartcard |
| Screenshot of SmartcardVirtual. | E964 | SmartcardVirtual |
| Screenshot of MediaStorageTower. | E965 | MediaStorageTower |
| Screenshot of ReturnKeySm. | E966 | ReturnKeySm |
| Screenshot of GameConsole. | E967 | GameConsole |
| Screenshot of Network. | E968 | Network |
| Screenshot of StorageNetworkWireless. | E969 | StorageNetworkWireless |
| Screenshot of StorageTape. | E96A | StorageTape |
| Screenshot of ChevronUpSmall. | E96D | ChevronUpSmall |
| Screenshot of ChevronDownSmall. | E96E | ChevronDownSmall |
| Screenshot of ChevronLeftSmall. | E96F | ChevronLeftSmall |
| Screenshot of ChevronRightSmall. | E970 | ChevronRightSmall |
| Screenshot of ChevronUpMed. | E971 | ChevronUpMed |
| Screenshot of ChevronDownMed. | E972 | ChevronDownMed |
| Screenshot of ChevronLeftMed. | E973 | ChevronLeftMed |
| Screenshot of ChevronRightMed. | E974 | ChevronRightMed |
| Screenshot of Devices2. | E975 | Devices2 |
| Screenshot of ExpandTile. | E976 | ExpandTile |
| Screenshot of PC1. | E977 | PC1 |
| Screenshot of PresenceChicklet. | E978 | PresenceChicklet |
| Screenshot of PresenceChickletVideo. | E979 | PresenceChickletVideo |
| Screenshot of Reply. | E97A | Reply |
| Screenshot of SetTile. | E97B | SetTile |
| Screenshot of Type. | E97C | Type |
| Screenshot of Korean. | E97D | Korean |
| Screenshot of HalfAlpha. | E97E | HalfAlpha |
| Screenshot of FullAlpha. | E97F | FullAlpha |
| Screenshot of Key12On. | E980 | Key12On |
| Screenshot of ChineseChangjie. | E981 | ChineseChangjie |
| Screenshot of QWERTYOn. | E982 | QWERTYOn |
| Screenshot of QWERTYOff. | E983 | QWERTYOff |
| Screenshot of ChineseQuick. | E984 | ChineseQuick |
| Screenshot of Japanese. | E985 | Japanese |
| Screenshot of FullHiragana. | E986 | FullHiragana |
| Screenshot of FullKatakana. | E987 | FullKatakana |
| Screenshot of HalfKatakana. | E988 | HalfKatakana |
| Screenshot of ChineseBoPoMoFo. | E989 | ChineseBoPoMoFo |
| Screenshot of ChinesePinyin. | E98A | ChinesePinyin |
| Screenshot of ConstructionCone. | E98F | ConstructionCone |
| Screenshot of XboxOneConsole. | E990 | XboxOneConsole |
| Screenshot of Volume0. | E992 | Volume0 |
| Screenshot of Volume1. | E993 | Volume1 |
| Screenshot of Volume2. | E994 | Volume2 |
| Screenshot of Volume3. | E995 | Volume3 |
| Screenshot of BatteryUnknown. | E996 | BatteryUnknown |
| Screenshot of WifiAttentionOverlay. | E998 | WifiAttentionOverlay |
| Screenshot of Robot. | E99A | Robot |
| Screenshot of TapAndSend. | E9A1 | TapAndSend |
| Screenshot of FitPage. | E9A6 | FitPage |
| Screenshot of PasswordKeyShow. | E9A8 | PasswordKeyShow |
| Screenshot of PasswordKeyHide. | E9A9 | PasswordKeyHide |
| Screenshot of BidiLtr. | E9AA | BidiLtr |
| Screenshot of BidiRtl. | E9AB | BidiRtl |
| Screenshot of ForwardSm. | E9AC | ForwardSm |
| Screenshot of CommaKey. | E9AD | CommaKey |
| Screenshot of DashKey. | E9AE | DashKey |
| Screenshot of DullSoundKey. | E9AF | DullSoundKey |
| Screenshot of HalfDullSound. | E9B0 | HalfDullSound |
| Screenshot of RightDoubleQuote. | E9B1 | RightDoubleQuote |
| Screenshot of LeftDoubleQuote. | E9B2 | LeftDoubleQuote |
| Screenshot of PuncKeyRightBottom. | E9B3 | PuncKeyRightBottom |
| Screenshot of PuncKey1. | E9B4 | PuncKey1 |
| Screenshot of PuncKey2. | E9B5 | PuncKey2 |
| Screenshot of PuncKey3. | E9B6 | PuncKey3 |
| Screenshot of PuncKey4. | E9B7 | PuncKey4 |
| Screenshot of PuncKey5. | E9B8 | PuncKey5 |
| Screenshot of PuncKey6. | E9B9 | PuncKey6 |
| Screenshot of PuncKey9. | E9BA | PuncKey9 |
| Screenshot of PuncKey7. | E9BB | PuncKey7 |
| Screenshot of PuncKey8. | E9BC | PuncKey8 |
| Screenshot of Frigid. | E9CA | Frigid |
| Screenshot of Unknown. | E9CE | Unknown |
| Screenshot of AreaChart. | E9D2 | AreaChart |
| Screenshot of CheckList. | E9D5 | CheckList |
| Screenshot of Diagnostic. | E9D9 | Diagnostic |
| Screenshot of Equalizer. | E9E9 | Equalizer |
| Screenshot of Process. | E9F3 | Process |
| Screenshot of Processing. | E9F5 | Processing |
| Screenshot of ReportDocument. | E9F9 | ReportDocument |

### PUA EA00-EC00

The following table of glyphs displays unicode points prefixed from EA-  to EC-.

[Back to top](#icon-list)

| Glyph | Unicode point | Description |
| --- | --- | --- |
| Screenshot of VideoSolid. | EA0C | VideoSolid |
 | Screenshot of MixedMediaBadge. | EA0D | MixedMediaBadge |
| Screenshot of DisconnectDisplay. | EA14 | DisconnectDisplay |
| Screenshot of Shield. | EA18 | Shield |
| Screenshot of Info2. | EA1F | Info2 |
| Screenshot of ActionCenterAsterisk. | EA21 | ActionCenterAsterisk |
| Screenshot of Beta. | EA24 | Beta |
| Screenshot of SaveCopy. | EA35 | SaveCopy |
| Screenshot of List. | EA37 | List |
| Screenshot of Asterisk. | EA38 | Asterisk |
| Screenshot of ErrorBadge. | EA39 | ErrorBadge |
| Screenshot of CircleRing. | EA3A | CircleRing |
| Screenshot of CircleFill. | EA3B | CircleFill |
 | Screenshot of MergeCall. | EA3C | MergeCall |
| Screenshot of PrivateCall. | EA3D | PrivateCall |
| Screenshot of Record2. | EA3F | Record2 |
| Screenshot of AllAppsMirrored. | EA40 | AllAppsMirrored |
| Screenshot of BookmarksMirrored. | EA41 | BookmarksMirrored |
| Screenshot of BulletedListMirrored. | EA42 | BulletedListMirrored |
| Screenshot of CallForwardInternationalMirrored. | EA43 | CallForwardInternationalMirrored |
| Screenshot of CallForwardRoamingMirrored. | EA44 | CallForwardRoamingMirrored |
| Screenshot of ChromeBackMirrored. | EA47 | ChromeBackMirrored |
| Screenshot of ClearSelectionMirrored. | EA48 | ClearSelectionMirrored |
| Screenshot of ClosePaneMirrored. | EA49 | ClosePaneMirrored |
| Screenshot of ContactInfoMirrored. | EA4A | ContactInfoMirrored |
| Screenshot of DockRightMirrored. | EA4B | DockRightMirrored |
| Screenshot of DockLeftMirrored. | EA4C | DockLeftMirrored |
| Screenshot of ExpandTileMirrored. | EA4E | ExpandTileMirrored |
| Screenshot of GoMirrored. | EA4F | GoMirrored |
| Screenshot of GripperResizeMirrored. | EA50 | GripperResizeMirrored |
| Screenshot of HelpMirrored. | EA51 | HelpMirrored |
| Screenshot of ImportMirrored. | EA52 | ImportMirrored |
| Screenshot of ImportAllMirrored. | EA53 | ImportAllMirrored |
| Screenshot of LeaveChatMirrored. | EA54 | LeaveChatMirrored |
| Screenshot of ListMirrored. | EA55 | ListMirrored |
| Screenshot of MailForwardMirrored. | EA56 | MailForwardMirrored |
| Screenshot of MailReplyMirrored. | EA57 | MailReplyMirrored |
| Screenshot of MailReplyAllMirrored. | EA58 | MailReplyAllMirrored |
| Screenshot of OpenPaneMirrored. | EA5B | OpenPaneMirrored |
| Screenshot of OpenWithMirrored. | EA5C | OpenWithMirrored |
| Screenshot of ParkingLocationMirrored. | EA5E | ParkingLocationMirrored |
| Screenshot of ResizeMouseMediumMirrored. | EA5F | ResizeMouseMediumMirrored |
| Screenshot of ResizeMouseSmallMirrored. | EA60 | ResizeMouseSmallMirrored |
| Screenshot of ResizeMouseTallMirrored. | EA61 | ResizeMouseTallMirrored |
| Screenshot of ResizeTouchNarrowerMirrored. | EA62 | ResizeTouchNarrowerMirrored |
| Screenshot of SendMirrored. | EA63 | SendMirrored |
| Screenshot of SendFillMirrored. | EA64 | SendFillMirrored |
| Screenshot of ShowResultsMirrored. | EA65 | ShowResultsMirrored |
| Screenshot of Media. | EA69 | Media |
| Screenshot of SyncError. | EA6A | SyncError |
| Screenshot of Devices3. | EA6C | Devices3 |
| Screenshot of SlowMotionOn. | EA79 | SlowMotionOn |
| Screenshot of Lightbulb. | EA80 | Lightbulb |
| Screenshot of StatusCircle. | EA81 | StatusCircle |
| Screenshot of StatusTriangle. | EA82 | StatusTriangle |
| Screenshot of StatusError. | EA83 | StatusError |
| Screenshot of StatusWarning. | EA84 | StatusWarning |
| Screenshot of Puzzle. | EA86 | Puzzle |
| Screenshot of CalendarSolid. | EA89 | CalendarSolid |
| Screenshot of HomeSolid. | EA8A | HomeSolid |
| Screenshot of ParkingLocationSolid. | EA8B | ParkingLocationSolid |
| Screenshot of ContactSolid. | EA8C | ContactSolid |
| Screenshot of ConstructionSolid. | EA8D | ConstructionSolid |
| Screenshot of AccidentSolid. | EA8E | AccidentSolid |
| Screenshot of Ringer. | EA8F | Ringer |
 | Screenshot of PDF. | EA90 | PDF |
| Screenshot of ThoughtBubble. | EA91 | ThoughtBubble |
| Screenshot of HeartBroken. | EA92 | HeartBroken |
| Screenshot of BatteryCharging10. | EA93 | BatteryCharging10 |
| Screenshot of BatterySaver9. | EA94 | BatterySaver9 |
| Screenshot of BatterySaver10. | EA95 | BatterySaver10 |
| Screenshot of CallForwardingMirrored. | EA97 | CallForwardingMirrored |
| Screenshot of MultiSelectMirrored. | EA98 | MultiSelectMirrored |
| Screenshot of Broom. | EA99 | Broom |
 | Screenshot of ForwardCall. | EAC2 | ForwardCall |
| Screenshot of Trackers. | EADF | Trackers |
 | Screenshot of Market. | EAFC | Market |
| Screenshot of PieSingle. | EB05 | PieSingle |
| Screenshot of StockDown. | EB0F | StockDown |
| Screenshot of StockUp. | EB11 | StockUp |
| Screenshot of Design. | EB3C | Design |
| Screenshot of Website. | EB41 | Website |
| Screenshot of Drop. | EB42 | Drop |
| Screenshot of Radar. | EB44 | Radar |
| Screenshot of BusSolid. | EB47 | BusSolid |
| Screenshot of FerrySolid. | EB48 | FerrySolid |
| Screenshot of StartPointSolid. | EB49 | StartPointSolid |
| Screenshot of StopPointSolid. | EB4A | StopPointSolid |
| Screenshot of EndPointSolid. | EB4B | EndPointSolid |
| Screenshot of AirplaneSolid. | EB4C | AirplaneSolid |
| Screenshot of TrainSolid. | EB4D | TrainSolid |
| Screenshot of WorkSolid. | EB4E | WorkSolid |
| Screenshot of ReminderFill. | EB4F | ReminderFill |
| Screenshot of Reminder. | EB50 | Reminder |
| Screenshot of Heart. | EB51 | Heart |
| Screenshot of HeartFill. | EB52 | HeartFill |
| Screenshot of EthernetError. | EB55 | EthernetError |
| Screenshot of EthernetWarning. | EB56 | EthernetWarning |
| Screenshot of StatusConnecting1. | EB57 | StatusConnecting1 |
| Screenshot of StatusConnecting2. | EB58 | StatusConnecting2 |
| Screenshot of StatusUnsecure. | EB59 | StatusUnsecure |
| Screenshot of WifiError0. | EB5A | WifiError0 |
| Screenshot of WifiError1. | EB5B | WifiError1 |
| Screenshot of WifiError2. | EB5C | WifiError2 |
| Screenshot of WifiError3. | EB5D | WifiError3 |
| Screenshot of WifiError4. | EB5E | WifiError4 |
| Screenshot of WifiWarning0. | EB5F | WifiWarning0 |
| Screenshot of WifiWarning1. | EB60 | WifiWarning1 |
| Screenshot of WifiWarning2. | EB61 | WifiWarning2 |
| Screenshot of WifiWarning3. | EB62 | WifiWarning3 |
| Screenshot of WifiWarning4. | EB63 | WifiWarning4 |
| Screenshot of Devices4. | EB66 | Devices4 |
| Screenshot of NUIIris. | EB67 | NUIIris |
| Screenshot of NUIFace. | EB68 | NUIFace |
| Screenshot of EditMirrored. | EB7E | EditMirrored |
| Screenshot of NUIFPStartSlideHand . | EB82 | NUIFPStartSlideHand&#x20; |
| Screenshot of NUIFPStartSlideAction . | EB83 | NUIFPStartSlideAction&#x20; |
| Screenshot of NUIFPContinueSlideHand . | EB84 | NUIFPContinueSlideHand&#x20; |
| Screenshot of NUIFPContinueSlideAction. | EB85 | NUIFPContinueSlideAction |
| Screenshot of NUIFPRollRightHand . | EB86 | NUIFPRollRightHand&#x20; |
| Screenshot of NUIFPRollRightHandAction. | EB87 | NUIFPRollRightHandAction |
| Screenshot of NUIFPRollLeftHand . | EB88 | NUIFPRollLeftHand&#x20; |
| Screenshot of NUIFPRollLeftAction. | EB89 | NUIFPRollLeftAction |
| Screenshot of NUIFPPressHand . | EB8A | NUIFPPressHand&#x20; |
| Screenshot of NUIFPPressAction. | EB8B | NUIFPPressAction |
| Screenshot of NUIFPPressRepeatHand . | EB8C | NUIFPPressRepeatHand&#x20; |
| Screenshot of NUIFPPressRepeatAction. | EB8D | NUIFPPressRepeatAction |
| Screenshot of StatusErrorFull. | EB90 | StatusErrorFull |
| Screenshot of TaskViewExpanded. | EB91 | TaskViewExpanded |
| Screenshot of Certificate. | EB95 | Certificate |
| Screenshot of BackSpaceQWERTYLg. | EB96 | BackSpaceQWERTYLg |
| Screenshot of ReturnKeyLg. | EB97 | ReturnKeyLg |
| Screenshot of FastForward. | EB9D | FastForward |
| Screenshot of Rewind. | EB9E | Rewind |
| Screenshot of Photo2. | EB9F | Photo2 |
| Screenshot of  MobBattery0. | EBA0 | &#x20;MobBattery0 |
| Screenshot of  MobBattery1. | EBA1 | &#x20;MobBattery1 |
| Screenshot of  MobBattery2. | EBA2 | &#x20;MobBattery2 |
| Screenshot of  MobBattery3. | EBA3 | &#x20;MobBattery3 |
| Screenshot of  MobBattery4. | EBA4 | &#x20;MobBattery4 |
| Screenshot of  MobBattery5. | EBA5 | &#x20;MobBattery5 |
| Screenshot of  MobBattery6. | EBA6 | &#x20;MobBattery6 |
| Screenshot of  MobBattery7. | EBA7 | &#x20;MobBattery7 |
| Screenshot of  MobBattery8. | EBA8 | &#x20;MobBattery8 |
| Screenshot of  MobBattery9. | EBA9 | &#x20;MobBattery9 |
| Screenshot of MobBattery10. | EBAA | MobBattery10 |
| Screenshot of  MobBatteryCharging0. | EBAB | &#x20;MobBatteryCharging0 |
| Screenshot of  MobBatteryCharging1. | EBAC | &#x20;MobBatteryCharging1 |
| Screenshot of  MobBatteryCharging2. | EBAD | &#x20;MobBatteryCharging2 |
| Screenshot of  MobBatteryCharging3. | EBAE | &#x20;MobBatteryCharging3 |
| Screenshot of  MobBatteryCharging4. | EBAF | &#x20;MobBatteryCharging4 |
| Screenshot of  MobBatteryCharging5. | EBB0 | &#x20;MobBatteryCharging5 |
| Screenshot of  MobBatteryCharging6. | EBB1 | &#x20;MobBatteryCharging6 |
| Screenshot of  MobBatteryCharging7. | EBB2 | &#x20;MobBatteryCharging7 |
| Screenshot of  MobBatteryCharging8. | EBB3 | &#x20;MobBatteryCharging8 |
| Screenshot of  MobBatteryCharging9. | EBB4 | &#x20;MobBatteryCharging9 |
| Screenshot of  MobBatteryCharging10. | EBB5 | &#x20;MobBatteryCharging10 |
| Screenshot of  MobBatterySaver0. | EBB6 | &#x20;MobBatterySaver0 |
| Screenshot of  MobBatterySaver1. | EBB7 | &#x20;MobBatterySaver1 |
| Screenshot of  MobBatterySaver2. | EBB8 | &#x20;MobBatterySaver2 |
| Screenshot of  MobBatterySaver3. | EBB9 | &#x20;MobBatterySaver3 |
| Screenshot of  MobBatterySaver4. | EBBA | &#x20;MobBatterySaver4 |
| Screenshot of  MobBatterySaver5. | EBBB | &#x20;MobBatterySaver5 |
| Screenshot of  MobBatterySaver6. | EBBC | &#x20;MobBatterySaver6 |
| Screenshot of  MobBatterySaver7. | EBBD | &#x20;MobBatterySaver7 |
| Screenshot of  MobBatterySaver8. | EBBE | &#x20;MobBatterySaver8 |
| Screenshot of  MobBatterySaver9. | EBBF | &#x20;MobBatterySaver9 |
| Screenshot of  MobBatterySaver10. | EBC0 | &#x20;MobBatterySaver10 |
| Screenshot of DictionaryCloud. | EBC3 | DictionaryCloud |
| Screenshot of ResetDrive. | EBC4 | ResetDrive |
| Screenshot of VolumeBars. | EBC5 | VolumeBars |
| Screenshot of Project. | EBC6 | Project |
| Screenshot of AdjustHologram. | EBD2 | AdjustHologram |
| Screenshot of EBD4 WifiCallBars. | EBD4 | WifiCallBars |
| Screenshot of EBD5 WifiCall0. | EBD5 | WifiCall0 |
| Screenshot of EBD6 WifiCall1. | EBD6 | WifiCall1 |
| Screenshot of EBD7 WifiCall2. | EBD7 | WifiCall2 |
| Screenshot of EBD8 WifiCall3. | EBD8 | WifiCall3 |
| Screenshot of EBD9 WifiCall4. | EBD9 | WifiCall4 |
| Screenshot of Family. | EBDA | Family |
| Screenshot of LockFeedback. | EBDB | LockFeedback |
| Screenshot of DeviceDiscovery. | EBDE | DeviceDiscovery |
| Screenshot of WindDirection. | EBE6 | WindDirection |
| Screenshot of RightArrowKeyTime0. | EBE7 | RightArrowKeyTime0 |
| Screenshot of Bug. | EBE8 | Bug |
| Screenshot of TabletMode. | EBFC | TabletMode |
| Screenshot of StatusCircleLeft. | EBFD | StatusCircleLeft |
| Screenshot of StatusTriangleLeft. | EBFE | StatusTriangleLeft |
| Screenshot of StatusErrorLeft. | EBFF | StatusErrorLeft |
| Screenshot of StatusWarningLeft. | EC00 | StatusWarningLeft |
| Screenshot of MobBatteryUnknown. | EC02 | MobBatteryUnknown |
| Screenshot of NetworkTower. | EC05 | NetworkTower |
| Screenshot of CityNext. | EC06 | CityNext |
| Screenshot of CityNext2. | EC07 | CityNext2 |
| Screenshot of Courthouse. | EC08 | Courthouse |
| Screenshot of Groceries. | EC09 | Groceries |
| Screenshot of Sustainable. | EC0A | Sustainable |
| Screenshot of BuildingEnergy. | EC0B | BuildingEnergy |
| Screenshot of ToggleFilled. | EC11 | ToggleFilled |
| Screenshot of ToggleBorder. | EC12 | ToggleBorder |
| Screenshot of SliderThumb. | EC13 | SliderThumb |
| Screenshot of ToggleThumb. | EC14 | ToggleThumb |
| Screenshot of MiracastLogoSmall. | EC15 | MiracastLogoSmall |
| Screenshot of MiracastLogoLarge. | EC16 | MiracastLogoLarge |
| Screenshot of PLAP. | EC19 | PLAP |
| Screenshot of Badge. | EC1B | Badge |
| Screenshot of SignalRoaming. | EC1E | SignalRoaming |
| Screenshot of MobileLocked. | EC20 | MobileLocked |
| Screenshot of InsiderHubApp. | EC24 | InsiderHubApp |
| Screenshot of PersonalFolder. | EC25 | PersonalFolder |
| Screenshot of HomeGroup. | EC26 | HomeGroup |
| Screenshot of MyNetwork. | EC27 | MyNetwork |
| Screenshot of KeyboardFull. | EC31 | KeyboardFull |
| Screenshot of Cafe. | EC32 | Cafe |
| Screenshot of MobSignal1. | EC37 | MobSignal1 |
| Screenshot of MobSignal2. | EC38 | MobSignal2 |
| Screenshot of MobSignal3. | EC39 | MobSignal3 |
| Screenshot of MobSignal4. | EC3A | MobSignal4 |
| Screenshot of MobSignal5. | EC3B | MobSignal5 |
| Screenshot of MobWifi1. | EC3C | MobWifi1 |
| Screenshot of MobWifi2. | EC3D | MobWifi2 |
| Screenshot of MobWifi3. | EC3E | MobWifi3 |
| Screenshot of MobWifi4. | EC3F | MobWifi4 |
| Screenshot of MobAirplane. | EC40 | MobAirplane |
| Screenshot of MobBluetooth. | EC41 | MobBluetooth |
| Screenshot of MobActionCenter. | EC42 | MobActionCenter |
| Screenshot of MobLocation. | EC43 | MobLocation |
| Screenshot of MobWifiHotspot. | EC44 | MobWifiHotspot |
| Screenshot of LanguageJpn. | EC45 | LanguageJpn |
| Screenshot of MobQuietHours. | EC46 | MobQuietHours |
| Screenshot of MobDrivingMode. | EC47 | MobDrivingMode |
| Screenshot of SpeedOff. | EC48 | SpeedOff |
| Screenshot of SpeedMedium. | EC49 | SpeedMedium |
| Screenshot of SpeedHigh. | EC4A | SpeedHigh |
| Screenshot of ThisPC. | EC4E | ThisPC |
| Screenshot of MusicNote. | EC4F | MusicNote |
| Screenshot of FileExplorer. | EC50 | FileExplorer |
| Screenshot of FileExplorerApp. | EC51 | FileExplorerApp |
| Screenshot of LeftArrowKeyTime0. | EC52 | LeftArrowKeyTime0 |
| Screenshot of MicOff. | EC54 | MicOff |
| Screenshot of MicSleep. | EC55 | MicSleep |
| Screenshot of MicError. | EC56 | MicError |
| Screenshot of PlaybackRate1x. | EC57 | PlaybackRate1x |
| Screenshot of PlaybackRateOther. | EC58 | PlaybackRateOther |
| Screenshot of CashDrawer. | EC59 | CashDrawer |
| Screenshot of BarcodeScanner. | EC5A | BarcodeScanner |
| Screenshot of ReceiptPrinter. | EC5B | ReceiptPrinter |
| Screenshot of MagStripeReader. | EC5C | MagStripeReader |
| Screenshot of CompletedSolid. | EC61 | CompletedSolid |
| Screenshot of CompanionApp. | EC64 | CompanionApp |
 | Screenshot of Favicon2. | EC6C | Favicon2 |
| Screenshot of SwipeRevealArt. | EC6D | SwipeRevealArt |
| Screenshot of MicOn. | EC71 | MicOn |
| Screenshot of MicClipping. | EC72 | MicClipping |
| Screenshot of TabletSelected. | EC74 | TabletSelected |
| Screenshot of MobileSelected. | EC75 | MobileSelected |
| Screenshot of LaptopSelected. | EC76 | LaptopSelected |
| Screenshot of TVMonitorSelected. | EC77 | TVMonitorSelected |
| Screenshot of DeveloperTools. | EC7A | DeveloperTools |
| Screenshot of MobCallForwarding. | EC7E | MobCallForwarding |
| Screenshot of MobCallForwardingMirrored. | EC7F | MobCallForwardingMirrored |
| Screenshot of BodyCam. | EC80 | BodyCam |
| Screenshot of PoliceCar. | EC81 | PoliceCar |
| Screenshot of Draw. | EC87 | Draw |
| Screenshot of DrawSolid. | EC88 | DrawSolid |
| Screenshot of LowerBrightness. | EC8A | LowerBrightness |
| Screenshot of ScrollUpDown. | EC8F | ScrollUpDown |
| Screenshot of DateTime. | EC92 | DateTime |
| Screenshot of Tiles. | ECA5 | Tiles |
| Screenshot of PartyLeader. | ECA7 | PartyLeader |
| Screenshot of AppIconDefault. | ECAA | AppIconDefault |
| Screenshot of Calories. | ECAD | Calories |
| Screenshot of BandBattery0. | ECB9 | BandBattery0 |
| Screenshot of BandBattery1. | ECBA | BandBattery1 |
| Screenshot of BandBattery2. | ECBB | BandBattery2 |
| Screenshot of BandBattery3. | ECBC | BandBattery3 |
| Screenshot of BandBattery4. | ECBD | BandBattery4 |
| Screenshot of BandBattery5. | ECBE | BandBattery5 |
| Screenshot of BandBattery6. | ECBF | BandBattery6 |
| Screenshot of AddSurfaceHub. | ECC4 | AddSurfaceHub |
| Screenshot of DevUpdate. | ECC5 | DevUpdate |
| Screenshot of Unit. | ECC6 | Unit |
| Screenshot of AddTo. | ECC8 | AddTo |
| Screenshot of RemoveFrom. | ECC9 | RemoveFrom |
| Screenshot of RadioBtnOff. | ECCA | RadioBtnOff |
| Screenshot of RadioBtnOn. | ECCB | RadioBtnOn |
| Screenshot of RadioBullet2. | ECCC | RadioBullet2 |
| Screenshot of ExploreContent. | ECCD | ExploreContent |
 | Screenshot of Blocked2. | ECE4 | Blocked2 |
| Screenshot of ScrollMode. | ECE7 | ScrollMode |
| Screenshot of ZoomMode. | ECE8 | ZoomMode |
| Screenshot of PanMode. | ECE9 | PanMode |
| Screenshot of WiredUSB  . | ECF0 | WiredUSB &#x20; |
| Screenshot of WirelessUSB. | ECF1 | WirelessUSB |
| Screenshot of USBSafeConnect. | ECF3 | USBSafeConnect |

### PUA ED00-EF00

The following table of glyphs displays unicode points prefixed from ED-  to EF-.

[Back to top](#icon-list)

| Glyph | Unicode point | Description |
| --- | --- | --- |
| Screenshot of ActionCenterNotificationMirrored. | ED0C | ActionCenterNotificationMirrored |
| Screenshot of ActionCenterMirrored. | ED0D | ActionCenterMirrored |
 | Screenshot of SubscriptionAdd. | ED0E | SubscriptionAdd |
| Screenshot of ResetDevice. | ED10 | ResetDevice |
 | Screenshot of SubscriptionAddMirrored. | ED11 | SubscriptionAddMirrored |
| Screenshot of QRCode. | ED14 | QRCode |
| Screenshot of Feedback. | ED15 | Feedback |
| Screenshot of Subtitles. | ED1E | Subtitles |
| Screenshot of SubtitlesAudio. | ED1F | SubtitlesAudio |
| Screenshot of OpenFolderHorizontal. | ED25 | OpenFolderHorizontal |
| Screenshot of CalendarMirrored. | ED28 | CalendarMirrored |
| Screenshot of MobeSIM. | ED2A | MobeSIM |
| Screenshot of MobeSIMNoProfile. | ED2B | MobeSIMNoProfile |
| Screenshot of MobeSIMLocked. | ED2C | MobeSIMLocked |
| Screenshot of MobeSIMBusy. | ED2D | MobeSIMBusy |
| Screenshot of SignalError. | ED2E | SignalError |
| Screenshot of StreamingEnterprise. | ED2F | StreamingEnterprise |
| Screenshot of Headphone0. | ED30 | Headphone0 |
| Screenshot of Headphone1. | ED31 | Headphone1 |
| Screenshot of Headphone2. | ED32 | Headphone2 |
| Screenshot of Headphone3. | ED33 | Headphone3 |
| Screenshot of Apps. | ED35 | Apps |
| Screenshot of KeyboardBrightness. | ED39 | KeyboardBrightness |
| Screenshot of KeyboardLowerBrightness. | ED3A | KeyboardLowerBrightness |
| Screenshot of SkipBack10. | ED3C | SkipBack10 |
| Screenshot of SkipForward30 . | ED3D | SkipForward30&#x20; |
| Screenshot of TreeFolderFolder. | ED41 | TreeFolderFolder |
| Screenshot of TreeFolderFolderFill. | ED42 | TreeFolderFolderFill |
| Screenshot of TreeFolderFolderOpen. | ED43 | TreeFolderFolderOpen |
| Screenshot of TreeFolderFolderOpenFill. | ED44 | TreeFolderFolderOpenFill |
| Screenshot of MultimediaDMP. | ED47 | MultimediaDMP |
| Screenshot of KeyboardOneHanded. | ED4C | KeyboardOneHanded |
| Screenshot of Narrator. | ED4D | Narrator |
| Screenshot of EmojiTabPeople. | ED53 | EmojiTabPeople |
| Screenshot of EmojiTabSmilesAnimals. | ED54 | EmojiTabSmilesAnimals |
| Screenshot of EmojiTabCelebrationObjects. | ED55 | EmojiTabCelebrationObjects |
| Screenshot of EmojiTabFoodPlants. | ED56 | EmojiTabFoodPlants |
| Screenshot of EmojiTabTransitPlaces. | ED57 | EmojiTabTransitPlaces |
| Screenshot of EmojiTabSymbols. | ED58 | EmojiTabSymbols |
| Screenshot of EmojiTabTextSmiles. | ED59 | EmojiTabTextSmiles |
| Screenshot of EmojiTabFavorites. | ED5A | EmojiTabFavorites |
| Screenshot of EmojiSwatch. | ED5B | EmojiSwatch |
| Screenshot of ConnectApp. | ED5C | ConnectApp |
| Screenshot of CompanionDeviceFramework. | ED5D | CompanionDeviceFramework |
| Screenshot of Ruler. | ED5E | Ruler |
| Screenshot of FingerInking. | ED5F | FingerInking |
| Screenshot of StrokeErase. | ED60 | StrokeErase |
| Screenshot of PointErase. | ED61 | PointErase |
| Screenshot of ClearAllInk. | ED62 | ClearAllInk |
| Screenshot of Pencil. | ED63 | Pencil |
| Screenshot of Marker. | ED64 | Marker |
| Screenshot of InkingCaret. | ED65 | InkingCaret |
| Screenshot of InkingColorOutline. | ED66 | InkingColorOutline |
| Screenshot of InkingColorFill. | ED67 | InkingColorFill |
| Screenshot of HardDrive. | EDA2 | HardDrive |
| Screenshot of NetworkAdapter. | EDA3 | NetworkAdapter |
| Screenshot of Touchscreen. | EDA4 | Touchscreen |
| Screenshot of NetworkPrinter. | EDA5 | NetworkPrinter |
| Screenshot of CloudPrinter. | EDA6 | CloudPrinter |
| Screenshot of KeyboardShortcut. | EDA7 | KeyboardShortcut |
| Screenshot of BrushSize. | EDA8 | BrushSize |
| Screenshot of NarratorForward. | EDA9 | NarratorForward |
| Screenshot of NarratorForwardMirrored. | EDAA | NarratorForwardMirrored |
| Screenshot of SyncBadge12. | EDAB | SyncBadge12 |
| Screenshot of RingerBadge12. | EDAC | RingerBadge12 |
| Screenshot of AsteriskBadge12. | EDAD | AsteriskBadge12 |
| Screenshot of ErrorBadge12. | EDAE | ErrorBadge12 |
| Screenshot of CircleRingBadge12. | EDAF | CircleRingBadge12 |
| Screenshot of CircleFillBadge12. | EDB0 | CircleFillBadge12 |
| Screenshot of ImportantBadge12. | EDB1 | ImportantBadge12 |
| Screenshot of MailBadge12. | EDB3 | MailBadge12 |
| Screenshot of PauseBadge12. | EDB4 | PauseBadge12 |
| Screenshot of PlayBadge12. | EDB5 | PlayBadge12 |
| Screenshot of PenWorkspace. | EDC6 | PenWorkspace |
| Screenshot of CaretRight8. | EDD6 | CaretRight8 |
| Screenshot of CaretLeftSolid8. | EDD9 | CaretLeftSolid8 |
| Screenshot of CaretRightSolid8. | EDDA | CaretRightSolid8 |
| Screenshot of CaretUpSolid8. | EDDB | CaretUpSolid8 |
 | Screenshot of CaretDownSolid8. | EDDC | CaretDownSolid8 |
 | Screenshot of Strikethrough. | EDE0 | Strikethrough |
| Screenshot of Export. | EDE1 | Export |
| Screenshot of ExportMirrored. | EDE2 | ExportMirrored |
| Screenshot of ButtonMenu. | EDE3 | ButtonMenu |
| Screenshot of CloudSearch. | EDE4 | CloudSearch |
| Screenshot of PinyinIMELogo. | EDE5 | PinyinIMELogo |
| Screenshot of CalligraphyPen. | EDFB | CalligraphyPen |
| Screenshot of ReplyMirrored. | EE35 | ReplyMirrored |
| Screenshot of LockscreenDesktop. | EE3F | LockscreenDesktop |
| Screenshot of TaskViewSettings. | EE40 | TaskViewSettings |
 | Screenshot of MiniExpand2Mirrored. | EE47 | MiniExpand2Mirrored |
 | Screenshot of MiniContract2Mirrored. | EE49 | MiniContract2Mirrored |
| Screenshot of Play36. | EE4A | Play36 |
| Screenshot of PenPalette. | EE56 | PenPalette |
| Screenshot of GuestUser. | EE57 | GuestUser |
| Screenshot of SettingsBattery. | EE63 | SettingsBattery |
| Screenshot of TaskbarPhone. | EE64 | TaskbarPhone |
| Screenshot of LockScreenGlance. | EE65 | LockScreenGlance |
 | Screenshot of GenericScan. | EE6F | GenericScan |
| Screenshot of ImageExport . | EE71 | ImageExport&#x20; |
| Screenshot of WifiEthernet. | EE77 | WifiEthernet |
| Screenshot of ActionCenterQuiet. | EE79 | ActionCenterQuiet |
| Screenshot of ActionCenterQuietNotification. | EE7A | ActionCenterQuietNotification |
| Screenshot of TrackersMirrored. | EE92 | TrackersMirrored |
| Screenshot of DateTimeMirrored. | EE93 | DateTimeMirrored |
| Screenshot of Wheel. | EE94 | Wheel |
 | Screenshot of VirtualMachineGroup. | EEA3 | VirtualMachineGroup |
| Screenshot of ButtonView2. | EECA | ButtonView2 |
| Screenshot of PenWorkspaceMirrored. | EF15 | PenWorkspaceMirrored |
| Screenshot of PenPaletteMirrored. | EF16 | PenPaletteMirrored |
| Screenshot of StrokeEraseMirrored. | EF17 | StrokeEraseMirrored |
| Screenshot of PointEraseMirrored. | EF18 | PointEraseMirrored |
| Screenshot of ClearAllInkMirrored. | EF19 | ClearAllInkMirrored |
| Screenshot of BackgroundToggle. | EF1F | BackgroundToggle |
| Screenshot of Marquee. | EF20 | Marquee |
| Screenshot of ChromeCloseContrast. | EF2C | ChromeCloseContrast |
| Screenshot of ChromeMinimizeContrast. | EF2D | ChromeMinimizeContrast |
| Screenshot of ChromeMaximizeContrast. | EF2E | ChromeMaximizeContrast |
| Screenshot of ChromeRestoreContrast. | EF2F | ChromeRestoreContrast |
| Screenshot of TrafficLight. | EF31 | TrafficLight |
| Screenshot of Replay. | EF3B | Replay |
| Screenshot of Eyedropper. | EF3C | Eyedropper |
| Screenshot of LineDisplay. | EF3D | LineDisplay |
| Screenshot of PINPad. | EF3E | PINPad |
| Screenshot of SignatureCapture. | EF3F | SignatureCapture |
| Screenshot of ChipCardCreditCardReader. | EF40 | ChipCardCreditCardReader |
| Screenshot of PlayerSettings. | EF58 | PlayerSettings |
| Screenshot of LandscapeOrientation. | EF6B | LandscapeOrientation |
 | Screenshot of Flow. | EF90 | Flow |
| Screenshot of Touchpad. | EFA5 | Touchpad |
| Screenshot of Speech. | EFA9 | Speech |

### PUA F000-F200

The following table of glyphs displays unicode points prefixed from F0-  to F2-.

[Back to top](#icon-list)

| Glyph | Unicode point | Description |
| --- | --- | --- |
| Screenshot of KnowledgeArticle. | F000 | KnowledgeArticle |
| Screenshot of Relationship. | F003 | Relationship |
| Screenshot of DefaultAPN. | F080 | DefaultAPN |
| Screenshot of UserAPN . | F081 | UserAPN&#x20; |
| Screenshot of DoublePinyin. | F085 | DoublePinyin |
| Screenshot of BlueLight. | F08C | BlueLight |
| Screenshot of ButtonA. | F093 | ButtonA |
| Screenshot of ButtonB. | F094 | ButtonB |
| Screenshot of ButtonY. | F095 | ButtonY |
| Screenshot of ButtonX. | F096 | ButtonX |
| Screenshot of ArrowUp8. | F0AD | ArrowUp8 |
| Screenshot of ArrowDown8. | F0AE | ArrowDown8 |
| Screenshot of ArrowRight8. | F0AF | ArrowRight8 |
| Screenshot of ArrowLeft8. | F0B0 | ArrowLeft8 |
| Screenshot of QuarentinedItems. | F0B2 | QuarentinedItems |
| Screenshot of QuarentinedItemsMirrored. | F0B3 | QuarentinedItemsMirrored |
| Screenshot of Protractor. | F0B4 | Protractor |
| Screenshot of ChecklistMirrored. | F0B5 | ChecklistMirrored |
| Screenshot of StatusCircle7. | F0B6 | StatusCircle7 |
| Screenshot of StatusCheckmark7. | F0B7 | StatusCheckmark7 |
| Screenshot of StatusErrorCircle7. | F0B8 | StatusErrorCircle7 |
| Screenshot of Connected. | F0B9 | Connected |
| Screenshot of PencilFill. | F0C6 | PencilFill |
| Screenshot of CalligraphyFill. | F0C7 | CalligraphyFill |
| Screenshot of QuarterStarLeft. | F0CA | QuarterStarLeft |
| Screenshot of QuarterStarRight. | F0CB | QuarterStarRight |
| Screenshot of ThreeQuarterStarLeft. | F0CC | ThreeQuarterStarLeft |
| Screenshot of ThreeQuarterStarRight. | F0CD | ThreeQuarterStarRight |
| Screenshot of QuietHoursBadge12. | F0CE | QuietHoursBadge12 |
| Screenshot of BackMirrored. | F0D2 | BackMirrored |
| Screenshot of ForwardMirrored. | F0D3 | ForwardMirrored |
| Screenshot of ChromeBackContrast. | F0D5 | ChromeBackContrast |
| Screenshot of ChromeBackContrastMirrored. | F0D6 | ChromeBackContrastMirrored |
| Screenshot of ChromeBackToWindowContrast. | F0D7 | ChromeBackToWindowContrast |
| Screenshot of ChromeFullScreenContrast. | F0D8 | ChromeFullScreenContrast |
| Screenshot of GridView. | F0E2 | GridView |
| Screenshot of ClipboardList. | F0E3 | ClipboardList |
| Screenshot of ClipboardListMirrored. | F0E4 | ClipboardListMirrored |
| Screenshot of OutlineQuarterStarLeft. | F0E5 | OutlineQuarterStarLeft |
| Screenshot of OutlineQuarterStarRight. | F0E6 | OutlineQuarterStarRight |
| Screenshot of OutlineHalfStarLeft. | F0E7 | OutlineHalfStarLeft |
| Screenshot of OutlineHalfStarRight. | F0E8 | OutlineHalfStarRight |
| Screenshot of OutlineThreeQuarterStarLeft. | F0E9 | OutlineThreeQuarterStarLeft |
| Screenshot of OutlineThreeQuarterStarRight. | F0EA | OutlineThreeQuarterStarRight |
| Screenshot of SpatialVolume0. | F0EB | SpatialVolume0 |
| Screenshot of SpatialVolume1. | F0EC | SpatialVolume1 |
| Screenshot of SpatialVolume2. | F0ED | SpatialVolume2 |
| Screenshot of SpatialVolume3. | F0EE | SpatialVolume3 |
 | Screenshot of ApplicationGuard. | F0EF | ApplicationGuard |
| Screenshot of OutlineStarLeftHalf. | F0F7 | OutlineStarLeftHalf |
| Screenshot of OutlineStarRightHalf. | F0F8 | OutlineStarRightHalf |
| Screenshot of ChromeAnnotateContrast. | F0F9 | ChromeAnnotateContrast |
| Screenshot of DefenderBadge12. | F0FB | DefenderBadge12 |
| Screenshot of DetachablePC. | F103 | DetachablePC |
| Screenshot of LeftStick. | F108 | LeftStick |
| Screenshot of RightStick. | F109 | RightStick |
| Screenshot of TriggerLeft. | F10A | TriggerLeft |
| Screenshot of TriggerRight. | F10B | TriggerRight |
| Screenshot of BumperLeft. | F10C | BumperLeft |
| Screenshot of BumperRight. | F10D | BumperRight |
| Screenshot of Dpad. | F10E | Dpad |
| Screenshot of EnglishPunctuation. | F110 | EnglishPunctuation |
| Screenshot of ChinesePunctuation. | F111 | ChinesePunctuation |
| Screenshot of HMD. | F119 | HMD |
| Screenshot of CtrlSpatialRight. | F11B | CtrlSpatialRight |
| Screenshot of PaginationDotOutline10. | F126 | PaginationDotOutline10 |
| Screenshot of PaginationDotSolid10. | F127 | PaginationDotSolid10 |
| Screenshot of StrokeErase2. | F128 | StrokeErase2 |
| Screenshot of SmallErase. | F129 | SmallErase |
| Screenshot of LargeErase. | F12A | LargeErase |
| Screenshot of FolderHorizontal. | F12B | FolderHorizontal |
| Screenshot of MicrophoneListening. | F12E | MicrophoneListening |
| Screenshot of StatusExclamationCircle7 . | F12F | StatusExclamationCircle7&#x20; |
| Screenshot of Video360. | F131 | Video360 |
| Screenshot of GiftboxOpen. | F133 | GiftboxOpen |
| Screenshot of StatusCircleOuter. | F136 | StatusCircleOuter |
| Screenshot of StatusCircleInner. | F137 | StatusCircleInner |
| Screenshot of StatusCircleRing. | F138 | StatusCircleRing |
| Screenshot of StatusTriangleOuter. | F139 | StatusTriangleOuter |
| Screenshot of StatusTriangleInner. | F13A | StatusTriangleInner |
| Screenshot of StatusTriangleExclamation. | F13B | StatusTriangleExclamation |
| Screenshot of StatusCircleExclamation. | F13C | StatusCircleExclamation |
| Screenshot of StatusCircleErrorX. | F13D | StatusCircleErrorX |
| Screenshot of StatusCircleCheckmark. | F13E | StatusCircleCheckmark |
| Screenshot of StatusCircleInfo. | F13F | StatusCircleInfo |
| Screenshot of StatusCircleBlock. | F140 | StatusCircleBlock |
| Screenshot of StatusCircleBlock2. | F141 | StatusCircleBlock2 |
| Screenshot of StatusCircleQuestionMark. | F142 | StatusCircleQuestionMark |
| Screenshot of StatusCircleSync. | F143 | StatusCircleSync |
| Screenshot of Dial1. | F146 | Dial1 |
| Screenshot of Dial2. | F147 | Dial2 |
| Screenshot of Dial3. | F148 | Dial3 |
| Screenshot of Dial4. | F149 | Dial4 |
| Screenshot of Dial5. | F14A | Dial5 |
| Screenshot of Dial6. | F14B | Dial6 |
| Screenshot of Dial7. | F14C | Dial7 |
| Screenshot of Dial8. | F14D | Dial8 |
| Screenshot of Dial9. | F14E | Dial9 |
| Screenshot of Dial10. | F14F | Dial10 |
| Screenshot of Dial11. | F150 | Dial11 |
| Screenshot of Dial12. | F151 | Dial12 |
| Screenshot of Dial13. | F152 | Dial13 |
| Screenshot of Dial14. | F153 | Dial14 |
| Screenshot of Dial15. | F154 | Dial15 |
| Screenshot of Dial16. | F155 | Dial16 |
| Screenshot of DialShape1. | F156 | DialShape1 |
| Screenshot of DialShape2. | F157 | DialShape2 |
| Screenshot of DialShape3. | F158 | DialShape3 |
| Screenshot of DialShape4. | F159 | DialShape4 |
| Screenshot of TollSolid. | F161 | TollSolid |
| Screenshot of TrafficCongestionSolid. | F163 | TrafficCongestionSolid |
| Screenshot of ExploreContentSingle. | F164 | ExploreContentSingle |
| Screenshot of CollapseContent. | F165 | CollapseContent |
| Screenshot of CollapseContentSingle. | F166 | CollapseContentSingle |
| Screenshot of InfoSolid. | F167 | InfoSolid |
| Screenshot of GroupList. | F168 | GroupList |
| Screenshot of CaretBottomRightSolidCenter8. | F169 | CaretBottomRightSolidCenter8 |
| Screenshot of ProgressRingDots. | F16A | ProgressRingDots |
| Screenshot of Checkbox14. | F16B | Checkbox14 |
| Screenshot of CheckboxComposite14. | F16C | CheckboxComposite14 |
| Screenshot of CheckboxIndeterminateCombo14. | F16D | CheckboxIndeterminateCombo14 |
| Screenshot of CheckboxIndeterminateCombo. | F16E | CheckboxIndeterminateCombo |
| Screenshot of StatusPause7. | F175 | StatusPause7 |
| Screenshot of CharacterAppearance. | F17F | CharacterAppearance |
| Screenshot of Lexicon . | F180 | Lexicon&#x20; |
| Screenshot of ScreenTime. | F182 | ScreenTime |
| Screenshot of HeadlessDevice. | F191 | HeadlessDevice |
| Screenshot of NetworkSharing. | F193 | NetworkSharing |
| Screenshot of EyeGaze. | F19D | EyeGaze |
 | Screenshot of ToggleLeft. | F19E | ToggleLeft |
 | Screenshot of ToggleRight. | F19F | ToggleRight |
| Screenshot of WindowsInsider. | F1AD | WindowsInsider |
| Screenshot of ChromeSwitch. | F1CB | ChromeSwitch |
| Screenshot of ChromeSwitchContast. | F1CC | ChromeSwitchContast |
| Screenshot of StatusCheckmark. | F1D8 | StatusCheckmark |
| Screenshot of StatusCheckmarkLeft. | F1D9 | StatusCheckmarkLeft |
| Screenshot of KeyboardLeftAligned. | F20C | KeyboardLeftAligned |
| Screenshot of KeyboardRightAligned. | F20D | KeyboardRightAligned |
| Screenshot of KeyboardSettings. | F210 | KeyboardSettings |
 | Screenshot of NetworkPhysical. | F211 | NetworkPhysical |
| Screenshot of IOT. | F22C | IOT |
| Screenshot of UnknownMirrored. | F22E | UnknownMirrored |
| Screenshot of ViewDashboard. | F246 | ViewDashboard |
| Screenshot of ExploitProtectionSettings. | F259 | ExploitProtectionSettings |
| Screenshot of KeyboardNarrow. | F260 | KeyboardNarrow |
| Screenshot of Keyboard12Key. | F261 | Keyboard12Key |
| Screenshot of KeyboardDock. | F26B | KeyboardDock |
| Screenshot of KeyboardUndock. | F26C | KeyboardUndock |
| Screenshot of KeyboardLeftDock. | F26D | KeyboardLeftDock |
| Screenshot of KeyboardRightDock. | F26E | KeyboardRightDock |
| Screenshot of Ear. | F270 | Ear |
| Screenshot of PointerHand. | F271 | PointerHand |
| Screenshot of Bullseye. | F272 | Bullseye |
 | Screenshot of LocaleLanguage. | F2B7 | LocaleLanguage |

### PUA F300-F500

The following table of glyphs displays unicode points prefixed from F3-  to F5-.

[Back to top](#icon-list)

| Glyph | Unicode point | Description |
| --- | --- | --- |
| Screenshot of PassiveAuthentication. | F32A | PassiveAuthentication |
 | Screenshot of ColorSolid. | F354 | ColorSolid |
| Screenshot of NetworkOffline. | F384 | NetworkOffline |
| Screenshot of NetworkConnected. | F385 | NetworkConnected |
| Screenshot of NetworkConnectedCheckmark. | F386 | NetworkConnectedCheckmark |
 | Screenshot of SignOut. | F3B1 | SignOut |
| Screenshot of StatusInfo. | F3CC | StatusInfo |
| Screenshot of StatusInfoLeft. | F3CD | StatusInfoLeft |
| Screenshot of NearbySharing. | F3E2 | NearbySharing |
| Screenshot of CtrlSpatialLeft. | F3E7 | CtrlSpatialLeft |
| Screenshot of InteractiveDashboard. | F404 | InteractiveDashboard |
| Screenshot of ClippingTool. | F406 | ClippingTool |
| Screenshot of RectangularClipping . | F407 | RectangularClipping&#x20; |
| Screenshot of FreeFormClipping. | F408 | FreeFormClipping |
| Screenshot of CopyTo. | F413 | CopyTo |
| Screenshot of DynamicLock. | F439 | DynamicLock |
| Screenshot of PenTips. | F45E | PenTips |
| Screenshot of PenTipsMirrored. | F45F | PenTipsMirrored |
| Screenshot of HWPJoin. | F460 | HWPJoin |
| Screenshot of HWPInsert. | F461 | HWPInsert |
| Screenshot of HWPStrikeThrough. | F462 | HWPStrikeThrough |
| Screenshot of HWPScratchOut. | F463 | HWPScratchOut |
| Screenshot of HWPSplit. | F464 | HWPSplit |
| Screenshot of HWPNewLine. | F465 | HWPNewLine |
| Screenshot of HWPOverwrite. | F466 | HWPOverwrite |
| Screenshot of MobWifiWarning1. | F473 | MobWifiWarning1 |
| Screenshot of MobWifiWarning2. | F474 | MobWifiWarning2 |
| Screenshot of MobWifiWarning3. | F475 | MobWifiWarning3 |
| Screenshot of MobWifiWarning4. | F476 | MobWifiWarning4 |
 | Screenshot of Globe2. | F49A | Globe2 |
 | Screenshot of SpecialEffectSize. | F4A5 | SpecialEffectSize |
| Screenshot of GIF. | F4A9 | GIF |
| Screenshot of Sticker2. | F4AA | Sticker2 |
| Screenshot of SurfaceHubSelected. | F4BE | SurfaceHubSelected |
| Screenshot of HoloLensSelected. | F4BF | HoloLensSelected |
| Screenshot of Earbud. | F4C0 | Earbud |
| Screenshot of MixVolumes. | F4C3 | MixVolumes |
| Screenshot of Safe. | F540 | Safe |
| Screenshot of LaptopSecure. | F552 | LaptopSecure |
| Screenshot of PrintDefault. | F56D | PrintDefault |
| Screenshot of PageMirrored. | F56E | PageMirrored |
| Screenshot of LandscapeOrientationMirrored. | F56F | LandscapeOrientationMirrored |
| Screenshot of ColorOff. | F570 | ColorOff |
| Screenshot of PrintAllPages. | F571 | PrintAllPages |
| Screenshot of PrintCustomRange. | F572 | PrintCustomRange |
| Screenshot of PageMarginPortraitNarrow. | F573 | PageMarginPortraitNarrow |
| Screenshot of PageMarginPortraitNormal. | F574 | PageMarginPortraitNormal |
| Screenshot of PageMarginPortraitModerate. | F575 | PageMarginPortraitModerate |
| Screenshot of PageMarginPortraitWide. | F576 | PageMarginPortraitWide |
| Screenshot of PageMarginLandscapeNarrow. | F577 | PageMarginLandscapeNarrow |
| Screenshot of PageMarginLandscapeNormal. | F578 | PageMarginLandscapeNormal |
| Screenshot of PageMarginLandscapeModerate. | F579 | PageMarginLandscapeModerate |
| Screenshot of PageMarginLandscapeWide. | F57A | PageMarginLandscapeWide |
| Screenshot of CollateLandscape. | F57B | CollateLandscape |
| Screenshot of CollatePortrait. | F57C | CollatePortrait |
| Screenshot of CollatePortraitSeparated. | F57D | CollatePortraitSeparated |
| Screenshot of DuplexLandscapeOneSided. | F57E | DuplexLandscapeOneSided |
| Screenshot of DuplexLandscapeOneSidedMirrored. | F57F | DuplexLandscapeOneSidedMirrored |
| Screenshot of DuplexLandscapeTwoSidedLongEdge. | F580 | DuplexLandscapeTwoSidedLongEdge |
| Screenshot of DuplexLandscapeTwoSidedLongEdgeMirrored. | F581 | DuplexLandscapeTwoSidedLongEdgeMirrored |
| Screenshot of DuplexLandscapeTwoSidedShortEdge. | F582 | DuplexLandscapeTwoSidedShortEdge |
| Screenshot of DuplexLandscapeTwoSidedShortEdgeMirrored. | F583 | DuplexLandscapeTwoSidedShortEdgeMirrored |
| Screenshot of DuplexPortraitOneSided. | F584 | DuplexPortraitOneSided |
| Screenshot of DuplexPortraitOneSidedMirrored. | F585 | DuplexPortraitOneSidedMirrored |
| Screenshot of DuplexPortraitTwoSidedLongEdge. | F586 | DuplexPortraitTwoSidedLongEdge |
| Screenshot of DuplexPortraitTwoSidedLongEdgeMirrored. | F587 | DuplexPortraitTwoSidedLongEdgeMirrored |
| Screenshot of DuplexPortraitTwoSidedShortEdge. | F588 | DuplexPortraitTwoSidedShortEdge |
| Screenshot of DuplexPortraitTwoSidedShortEdgeMirrored. | F589 | DuplexPortraitTwoSidedShortEdgeMirrored |
| Screenshot of PPSOneLandscape. | F58A | PPSOneLandscape |
| Screenshot of PPSTwoLandscape. | F58B | PPSTwoLandscape |
| Screenshot of PPSTwoPortrait. | F58C | PPSTwoPortrait |
| Screenshot of PPSFourLandscape. | F58D | PPSFourLandscape |
| Screenshot of PPSFourPortrait. | F58E | PPSFourPortrait |
| Screenshot of HolePunchOff. | F58F | HolePunchOff |
| Screenshot of HolePunchPortraitLeft. | F590 | HolePunchPortraitLeft |
| Screenshot of HolePunchPortraitRight. | F591 | HolePunchPortraitRight |
| Screenshot of HolePunchPortraitTop. | F592 | HolePunchPortraitTop |
| Screenshot of HolePunchPortraitBottom. | F593 | HolePunchPortraitBottom |
| Screenshot of HolePunchLandscapeLeft. | F594 | HolePunchLandscapeLeft |
| Screenshot of HolePunchLandscapeRight. | F595 | HolePunchLandscapeRight |
| Screenshot of HolePunchLandscapeTop. | F596 | HolePunchLandscapeTop |
| Screenshot of HolePunchLandscapeBottom. | F597 | HolePunchLandscapeBottom |
| Screenshot of StaplingOff. | F598 | StaplingOff |
| Screenshot of StaplingPortraitTopLeft. | F599 | StaplingPortraitTopLeft |
| Screenshot of StaplingPortraitTopRight. | F59A | StaplingPortraitTopRight |
| Screenshot of StaplingPortraitBottomRight. | F59B | StaplingPortraitBottomRight |
| Screenshot of StaplingPortraitTwoLeft. | F59C | StaplingPortraitTwoLeft |
| Screenshot of StaplingPortraitTwoRight. | F59D | StaplingPortraitTwoRight |
| Screenshot of StaplingPortraitTwoTop. | F59E | StaplingPortraitTwoTop |
| Screenshot of StaplingPortraitTwoBottom. | F59F | StaplingPortraitTwoBottom |
| Screenshot of StaplingPortraitBookBinding. | F5A0 | StaplingPortraitBookBinding |
| Screenshot of StaplingLandscapeTopLeft. | F5A1 | StaplingLandscapeTopLeft |
| Screenshot of StaplingLandscapeTopRight. | F5A2 | StaplingLandscapeTopRight |
| Screenshot of StaplingLandscapeBottomLeft. | F5A3 | StaplingLandscapeBottomLeft |
| Screenshot of StaplingLandscapeBottomRight. | F5A4 | StaplingLandscapeBottomRight |
| Screenshot of StaplingLandscapeTwoLeft. | F5A5 | StaplingLandscapeTwoLeft |
| Screenshot of StaplingLandscapeTwoRight. | F5A6 | StaplingLandscapeTwoRight |
| Screenshot of StaplingLandscapeTwoTop. | F5A7 | StaplingLandscapeTwoTop |
| Screenshot of StaplingLandscapeTwoBottom. | F5A8 | StaplingLandscapeTwoBottom |
| Screenshot of StaplingLandscapeBookBinding. | F5A9 | StaplingLandscapeBookBinding |
 | Screenshot of StatusDataTransferRoaming. | F5AA | StatusDataTransferRoaming |
| Screenshot of MobSIMError. | F5AB | MobSIMError |
| Screenshot of CollateLandscapeSeparated. | F5AC | CollateLandscapeSeparated |
| Screenshot of PPSOnePortrait. | F5AD | PPSOnePortrait |
| Screenshot of StaplingPortraitBottomLeft. | F5AE | StaplingPortraitBottomLeft |
| Screenshot of PlaySolid. | F5B0 | PlaySolid |
 | Screenshot of RepeatOff. | F5E7 | RepeatOff |
| Screenshot of Set. | F5ED | Set |
| Screenshot of SetSolid. | F5EE | SetSolid |
| Screenshot of FuzzyReading. | F5EF | FuzzyReading |
| Screenshot of VerticalBattery0. | F5F2 | VerticalBattery0 |
| Screenshot of VerticalBattery1. | F5F3 | VerticalBattery1 |
| Screenshot of VerticalBattery2. | F5F4 | VerticalBattery2 |
| Screenshot of VerticalBattery3. | F5F5 | VerticalBattery3 |
| Screenshot of VerticalBattery4. | F5F6 | VerticalBattery4 |
| Screenshot of VerticalBattery5. | F5F7 | VerticalBattery5 |
| Screenshot of VerticalBattery6. | F5F8 | VerticalBattery6 |
| Screenshot of VerticalBattery7. | F5F9 | VerticalBattery7 |
| Screenshot of VerticalBattery8. | F5FA | VerticalBattery8 |
| Screenshot of VerticalBattery9. | F5FB | VerticalBattery9 |
| Screenshot of VerticalBattery10. | F5FC | VerticalBattery10 |
| Screenshot of VerticalBatteryCharging0. | F5FD | VerticalBatteryCharging0 |
| Screenshot of VerticalBatteryCharging1. | F5FE | VerticalBatteryCharging1 |
| Screenshot of VerticalBatteryCharging2. | F5FF | VerticalBatteryCharging2 |

### PUA F600-F800

The following table of glyphs displays unicode points prefixed from F6-  to F8-.

[Back to top](#icon-list)

| Glyph | Unicode point | Description |
| --- | --- | --- |
| Screenshot of VerticalBatteryCharging3. | F600 | VerticalBatteryCharging3 |
| Screenshot of VerticalBatteryCharging4. | F601 | VerticalBatteryCharging4 |
| Screenshot of VerticalBatteryCharging5. | F602 | VerticalBatteryCharging5 |
| Screenshot of VerticalBatteryCharging6. | F603 | VerticalBatteryCharging6 |
| Screenshot of VerticalBatteryCharging7. | F604 | VerticalBatteryCharging7 |
| Screenshot of VerticalBatteryCharging8. | F605 | VerticalBatteryCharging8 |
| Screenshot of VerticalBatteryCharging9. | F606 | VerticalBatteryCharging9 |
| Screenshot of VerticalBatteryCharging10. | F607 | VerticalBatteryCharging10 |
| Screenshot of VerticalBatteryUnknown. | F608 | VerticalBatteryUnknown |
 | Screenshot of DoublePortrait. | F614 | DoublePortrait |
| Screenshot of DoubleLandscape. | F615 | DoubleLandscape |
| Screenshot of SinglePortrait. | F616 | SinglePortrait |
| Screenshot of SingleLandscape. | F617 | SingleLandscape |
| Screenshot of SIMError. | F618 | SIMError |
| Screenshot of SIMMissing. | F619 | SIMMissing |
| Screenshot of SIMLock. | F61A | SIMLock |
| Screenshot of eSIM. | F61B | eSIM |
| Screenshot of eSIMNoProfile. | F61C | eSIMNoProfile |
| Screenshot of eSIMLocked. | F61D | eSIMLocked |
| Screenshot of eSIMBusy. | F61E | eSIMBusy |
| Screenshot of NoiseCancelation. | F61F | NoiseCancelation |
| Screenshot of NoiseCancelationOff. | F620 | NoiseCancelationOff |
| Screenshot of MusicSharing. | F623 | MusicSharing |
| Screenshot of MusicSharingOff. | F624 | MusicSharingOff |
| Screenshot of CircleShapeSolid. | F63C | CircleShapeSolid |
| Screenshot of F657 WifiCallBars. | F657 | WifiCallBars |
| Screenshot of F658 WifiCall0. | F658 | WifiCall0 |
| Screenshot of F659 WifiCall1. | F659 | WifiCall1 |
| Screenshot of F65A WifiCall2. | F65A | WifiCall2 |
| Screenshot of F65B WifiCall3. | F65B | WifiCall3 |
| Screenshot of F65C WifiCall4. | F65C | WifiCall4 |
| Screenshot of CHTLanguageBar. | F69E | CHTLanguageBar |
| Screenshot of ComposeMode. | F6A9 | ComposeMode |
| Screenshot of ExpressiveInputEntry. | F6B8 | ExpressiveInputEntry |
| Screenshot of EmojiTabMoreSymbols. | F6BA | EmojiTabMoreSymbols |
| Screenshot of WebSearch. | F6FA | WebSearch |
| Screenshot of Kiosk. | F712 | Kiosk |
| Screenshot of RTTLogo. | F714 | RTTLogo |
| Screenshot of VoiceCall. | F715 | VoiceCall |
| Screenshot of GoToMessage. | F716 | GoToMessage |
| Screenshot of ReturnToCall. | F71A | ReturnToCall |
| Screenshot of StartPresenting. | F71C | StartPresenting |
| Screenshot of StopPresenting. | F71D | StopPresenting |
| Screenshot of ProductivityMode. | F71E | ProductivityMode |
| Screenshot of SetHistoryStatus. | F738 | SetHistoryStatus |
| Screenshot of SetHistoryStatus2. | F739 | SetHistoryStatus2 |
| Screenshot of Keyboardsettings20. | F73D | Keyboardsettings20 |
| Screenshot of OneHandedRight20. | F73E | OneHandedRight20 |
| Screenshot of OneHandedLeft20. | F73F | OneHandedLeft20 |
| Screenshot of Split20. | F740 | Split20 |
| Screenshot of Full20. | F741 | Full20 |
| Screenshot of Handwriting20. | F742 | Handwriting20 |
| Screenshot of CheveronLeft20. | F743 | CheveronLeft20 |
| Screenshot of CheveronLeft32. | F744 | CheveronLeft32 |
| Screenshot of CheveronRight20. | F745 | CheveronRight20 |
| Screenshot of CheveronRight32. | F746 | CheveronRight32 |
| Screenshot of MicOff2. | F781 | MicOff2 |
| Screenshot of DeliveryOptimization. | F785 | DeliveryOptimization |
| Screenshot of CancelMedium. | F78A | CancelMedium |
| Screenshot of SearchMedium. | F78B | SearchMedium |
| Screenshot of AcceptMedium. | F78C | AcceptMedium |
| Screenshot of RevealPasswordMedium. | F78D | RevealPasswordMedium |
| Screenshot of DeleteWord. | F7AD | DeleteWord |
| Screenshot of DeleteWordFill. | F7AE | DeleteWordFill |
| Screenshot of DeleteLines. | F7AF | DeleteLines |
| Screenshot of DeleteLinesFill. | F7B0 | DeleteLinesFill |
| Screenshot of InstertWords. | F7B1 | InstertWords |
| Screenshot of InstertWordsFill. | F7B2 | InstertWordsFill |
| Screenshot of JoinWords. | F7B3 | JoinWords |
| Screenshot of JoinWordsFill. | F7B4 | JoinWordsFill |
| Screenshot of OverwriteWords. | F7B5 | OverwriteWords |
| Screenshot of OverwriteWordsFill. | F7B6 | OverwriteWordsFill |
| Screenshot of AddNewLine. | F7B7 | AddNewLine |
| Screenshot of AddNewLineFill. | F7B8 | AddNewLineFill |
| Screenshot of OverwriteWordsKorean. | F7B9 | OverwriteWordsKorean |
| Screenshot of OverwriteWordsFillKorean. | F7BA | OverwriteWordsFillKorean |
| Screenshot of EducationIcon. | F7BB | EducationIcon |
| Screenshot of WindowSnipping. | F7ED | WindowSnipping |
| Screenshot of VideoCapture. | F7EE | VideoCapture |
| Screenshot of StatusSecured. | F809 | StatusSecured |
| Screenshot of NarratorApp. | F83B | NarratorApp |
| Screenshot of PowerButtonUpdate. | F83D | PowerButtonUpdate |
| Screenshot of RestartUpdate. | F83E | RestartUpdate |
| Screenshot of UpdateStatusDot. | F83F | UpdateStatusDot |
| Screenshot of Eject. | F847 | Eject |
| Screenshot of Spelling. | F87B | Spelling |
| Screenshot of SpellingKorean. | F87C | SpellingKorean |
| Screenshot of SpellingSerbian. | F87D | SpellingSerbian |
| Screenshot of SpellingChinese. | F87E | SpellingChinese |
| Screenshot of FolderSelect. | F89A | FolderSelect |
| Screenshot of SmartScreen. | F8A5 | SmartScreen |
| Screenshot of ExploitProtection. | F8A6 | ExploitProtection |
| Screenshot of AddBold. | F8AA | AddBold |
| Screenshot of SubtractBold. | F8AB | SubtractBold |
| Screenshot of BackSolidBold. | F8AC | BackSolidBold |
| Screenshot of ForwardSolidBold. | F8AD | ForwardSolidBold |
| Screenshot of PauseBold. | F8AE | PauseBold |
| Screenshot of ClickSolid. | F8AF | ClickSolid |
| Screenshot of SettingsSolid. | F8B0 | SettingsSolid |
| Screenshot of MicrophoneSolidBold. | F8B1 | MicrophoneSolidBold |
| Screenshot of SpeechSolidBold. | F8B2 | SpeechSolidBold |
| Screenshot of ClickedOutLoudSolidBold. | F8B3 | ClickedOutLoudSolidBold |

## Related articles

* [Guidelines for icons](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/design/style/icons.md)
* [Symbol enumeration](https://learn.microsoft.com/uwp/api/Windows.UI.Xaml.Controls.Symbol)
* [FontIcon class](https://learn.microsoft.com/uwp/api/windows.ui.xaml.controls.fonticon)
