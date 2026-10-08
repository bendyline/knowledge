---
description: This article explains how to load and save image files using BitmapDecoder and BitmapEncoder and how to use the SoftwareBitmap object to represent bitmap images.
title: Create, edit, and save bitmap images
ms.date: 05/06/2026
ms.topic: article
keywords: windows, winui, bitmap, imaging, softwarebitmap
ms.localizationpriority: medium
---

# Create, edit, and save bitmap images

This article explains how to load and save image files using [**BitmapDecoder**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Imaging.BitmapDecoder) and [**BitmapEncoder**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Imaging.BitmapEncoder) and how to use the [**SoftwareBitmap**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Imaging.SoftwareBitmap) object to represent bitmap images.

The **SoftwareBitmap** class is a versatile API that can be created from multiple sources including image files, [**WriteableBitmap**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.imaging.writeablebitmap) objects, Direct3D surfaces, and code. **SoftwareBitmap** allows you to easily convert between different pixel formats and alpha modes, and allows low-level access to pixel data. Also, **SoftwareBitmap** is a common interface used by multiple features of Windows, including:

-   [**CapturedFrame**](https://learn.microsoft.com/uwp/api/Windows.Media.Capture.CapturedFrame) allows you to get frames captured by the camera as a **SoftwareBitmap**.

-   [**VideoFrame**](https://learn.microsoft.com/uwp/api/Windows.Media.VideoFrame) allows you to get a **SoftwareBitmap** representation of a **VideoFrame**.

-   [**FaceDetector**](https://learn.microsoft.com/uwp/api/Windows.Media.FaceAnalysis.FaceDetector) allows you to detect faces in a **SoftwareBitmap**.

The sample code in this article uses APIs from the following namespaces.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/imaging-winui/cs/ImagingWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/imaging.md)

## Create a SoftwareBitmap from an image file with BitmapDecoder

To create a [**SoftwareBitmap**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Imaging.SoftwareBitmap) from a file, get an instance of [**StorageFile**](https://learn.microsoft.com/uwp/api/Windows.Storage.StorageFile) containing the image data. This example uses a [**FileOpenPicker**](https://learn.microsoft.com/uwp/api/Windows.Storage.Pickers.FileOpenPicker) to allow the user to select an image file.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/imaging-winui/cs/ImagingWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/imaging.md)

Call the [**OpenAsync**](https://learn.microsoft.com/uwp/api/windows.storage.istoragefile.openasync) method of the **StorageFile** object to get a random access stream containing the image data. Call the static method [**BitmapDecoder.CreateAsync**](https://learn.microsoft.com/uwp/api/windows.graphics.imaging.bitmapdecoder.createasync) to get an instance of the [**BitmapDecoder**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Imaging.BitmapDecoder) class for the specified stream. Call [**GetSoftwareBitmapAsync**](https://learn.microsoft.com/uwp/api/windows.graphics.imaging.bitmapdecoder.getsoftwarebitmapasync) to get a [**SoftwareBitmap**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Imaging.SoftwareBitmap) object containing the image.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/imaging-winui/cs/ImagingWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/imaging.md)

## Save a SoftwareBitmap to a file with BitmapEncoder

To save a **SoftwareBitmap** to a file, get an instance of **StorageFile** to which the image will be saved. This example uses a [**FileSavePicker**](https://learn.microsoft.com/uwp/api/Windows.Storage.Pickers.FileSavePicker) to allow the user to select an output file.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/imaging-winui/cs/ImagingWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/imaging.md)

Call the [**OpenAsync**](https://learn.microsoft.com/uwp/api/windows.storage.istoragefile.openasync) method of the **StorageFile** object to get a random access stream to which the image will be written. Call the static method [**BitmapEncoder.CreateAsync**](https://learn.microsoft.com/uwp/api/windows.graphics.imaging.bitmapencoder.createasync) to get an instance of the [**BitmapEncoder**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Imaging.BitmapEncoder) class for the specified stream. The first parameter to **CreateAsync** is a GUID representing the codec that should be used to encode the image. **BitmapEncoder** class exposes a property containing the ID for each codec supported by the encoder, such as [**JpegEncoderId**](https://learn.microsoft.com/uwp/api/windows.graphics.imaging.bitmapencoder.jpegencoderid).

Use the [**SetSoftwareBitmap**](https://learn.microsoft.com/uwp/api/windows.graphics.imaging.bitmapencoder.setsoftwarebitmap) method to set the image that will be encoded. You can set values of the [**BitmapTransform**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Imaging.BitmapTransform) property to apply basic transforms to the image while it is being encoded. The [**IsThumbnailGenerated**](https://learn.microsoft.com/uwp/api/windows.graphics.imaging.bitmapencoder.isthumbnailgenerated) property determines whether a thumbnail is generated by the encoder. Note that not all file formats support thumbnails, so if you use this feature, you should catch the unsupported operation error that will be thrown if thumbnails are not supported.

Call [**FlushAsync**](https://learn.microsoft.com/uwp/api/windows.graphics.imaging.bitmapencoder.flushasync) to cause the encoder to write the image data to the specified file.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/imaging-winui/cs/ImagingWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/imaging.md)

You can specify additional encoding options when you create the **BitmapEncoder** by creating a new [**BitmapPropertySet**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Imaging.BitmapPropertySet) object and populating it with one or more [**BitmapTypedValue**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Imaging.BitmapTypedValue) objects representing the encoder settings. For a list of supported encoder options, see [BitmapEncoder options reference](https://learn.microsoft.com/windows/uwp/audio-video-camera/bitmapencoder-options-reference).

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/imaging-winui/cs/ImagingWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/imaging.md)

## Use SoftwareBitmap with a XAML Image control

To display an image within a XAML page using the [**Image**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.image) control, first define an **Image** control in your XAML page.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/imaging-winui/cs/ImagingWinUI/MainWindow.xaml](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/imaging.md)

Currently, the **Image** control only supports images that use BGRA8 encoding and pre-multiplied or no alpha channel. Before attempting to display an image, test to make sure it has the correct format, and if not, use the **SoftwareBitmap** static [**Convert**](https://learn.microsoft.com/uwp/api/windows.graphics.imaging.softwarebitmap.convert) method to convert the image to the supported format.

Create a new [**SoftwareBitmapSource**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.imaging.softwarebitmapsource) object. Set the contents of the source object by calling [**SetBitmapAsync**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.imaging.softwarebitmapsource.setbitmapasync), passing in a **SoftwareBitmap**. Then you can set the [**Source**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.image.source) property of the **Image** control to the newly created **SoftwareBitmapSource**.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/imaging-winui/cs/ImagingWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/imaging.md)

You can also use **SoftwareBitmapSource** to set a **SoftwareBitmap** as the [**ImageSource**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.imagebrush.imagesource) for an [**ImageBrush**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.imagebrush).

## Create a SoftwareBitmap from a WriteableBitmap

You can create a **SoftwareBitmap** from an existing **WriteableBitmap** by calling [**SoftwareBitmap.CreateCopyFromBuffer**](https://learn.microsoft.com/uwp/api/windows.graphics.imaging.softwarebitmap.createcopyfrombuffer) and supplying the **PixelBuffer** property of the **WriteableBitmap** to set the pixel data. The second argument lets you specify the pixel format for the newly created **SoftwareBitmap**. You can use the [**PixelWidth**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.imaging.bitmapsource.pixelwidth) and [**PixelHeight**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.imaging.bitmapsource.pixelheight) properties of the **WriteableBitmap** to specify the dimensions of the new image.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/imaging-winui/cs/ImagingWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/imaging.md)

## Create or edit a SoftwareBitmap programmatically

So far this topic has addressed working with image files. You can also create a new **SoftwareBitmap** programmatically in code and use the same technique to access and modify the **SoftwareBitmap**'s pixel data.

Use the [**CopyFromBuffer**](https://learn.microsoft.com/uwp/api/windows.graphics.imaging.softwarebitmap.copyfrombuffer) method to populate a **SoftwareBitmap** from a byte array, and [**CopyToBuffer**](https://learn.microsoft.com/uwp/api/windows.graphics.imaging.softwarebitmap.copytobuffer) to copy pixel data out to a byte array for reading or modification. To use the **AsBuffer** extension method to wrap a byte array as an [**IBuffer**](https://learn.microsoft.com/uwp/api/Windows.Storage.Streams.IBuffer), include the **System.Runtime.InteropServices.WindowsRuntime** namespace (this is included in the `SnippetNamespaces` using statements at the top of this article).

Create a new **SoftwareBitmap** with the pixel format and size you want. Allocate a byte array large enough to hold the pixel data, fill it with the desired values, and then call **CopyFromBuffer** to write the data into the bitmap.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/imaging-winui/cs/ImagingWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/imaging.md)

## Create a SoftwareBitmap from a Direct3D surface

To create a **SoftwareBitmap** object from a Direct3D surface, you must include the [**Windows.Graphics.DirectX.Direct3D11**](https://learn.microsoft.com/uwp/api/Windows.Graphics.DirectX.Direct3D11) namespace in your project.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/imaging-winui/cs/ImagingWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/imaging.md)

Call [**CreateCopyFromSurfaceAsync**](https://learn.microsoft.com/uwp/api/windows.graphics.imaging.softwarebitmap.createcopyfromsurfaceasync) to create a new **SoftwareBitmap** from the surface. As the name indicates, the new **SoftwareBitmap** has a separate copy of the image data. Modifications to the **SoftwareBitmap** will not have any effect on the Direct3D surface.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/imaging-winui/cs/ImagingWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/imaging.md)

## Convert a SoftwareBitmap to a different pixel format

The **SoftwareBitmap** class provides the static method, [**Convert**](https://learn.microsoft.com/uwp/api/windows.graphics.imaging.softwarebitmap.convert), that allows you to easily create a new **SoftwareBitmap** that uses the pixel format and alpha mode you specify from an existing **SoftwareBitmap**. Note that the newly created bitmap has a separate copy of the image data. Modifications to the new bitmap will not affect the source bitmap.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/imaging-winui/cs/ImagingWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/imaging.md)

## Transcode an image file

You can transcode an image file directly from a [**BitmapDecoder**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Imaging.BitmapDecoder) to a [**BitmapEncoder**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Imaging.BitmapEncoder). Create a [**IRandomAccessStream**](https://learn.microsoft.com/uwp/api/Windows.Storage.Streams.IRandomAccessStream) from the file to be transcoded. Create a new **BitmapDecoder** from the input stream. Create a new [**InMemoryRandomAccessStream**](https://learn.microsoft.com/uwp/api/Windows.Storage.Streams.InMemoryRandomAccessStream) for the encoder to write to and call [**BitmapEncoder.CreateForTranscodingAsync**](https://learn.microsoft.com/uwp/api/windows.graphics.imaging.bitmapencoder.createfortranscodingasync), passing in the in-memory stream and the decoder object. Encode options are not supported when transcoding; instead you should use [**CreateAsync**](https://learn.microsoft.com/uwp/api/windows.graphics.imaging.bitmapencoder.createasync). Any properties in the input image file that you do not specifically set on the encoder, will be written to the output file unchanged. Call [**FlushAsync**](https://learn.microsoft.com/uwp/api/windows.graphics.imaging.bitmapencoder.flushasync) to cause the encoder to encode to the in-memory stream. Finally, seek the file stream and the in-memory stream to the beginning and call [**CopyAsync**](https://learn.microsoft.com/uwp/api/windows.storage.streams.randomaccessstream.copyasync) to write the in-memory stream out to the file stream.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/imaging-winui/cs/ImagingWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/imaging.md)

## Related topics

* [BitmapEncoder options reference](https://learn.microsoft.com/windows/uwp/audio-video-camera/bitmapencoder-options-reference)
* [Image Metadata](https://learn.microsoft.com/windows/uwp/audio-video-camera/image-metadata)
