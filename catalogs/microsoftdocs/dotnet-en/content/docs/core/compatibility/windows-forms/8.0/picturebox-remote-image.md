---
title: "Breaking change: Certificates checked before loading remote images in PictureBox"
description: Learn about the .NET 9 breaking change in Windows Forms where WebClient checks certificates against the revocation list before loading remote images in a PictureBox control.
ms.date: 02/12/2024
---
# Certificates checked before loading remote images in PictureBox

The behavior of how [System.Windows.Forms.PictureBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.PictureBox) loads a remote image changed in .NET 8. Now, before an image is loaded via [System.Net.WebClient](https://learn.microsoft.com/search/?terms=System.Net.WebClient), [System.Net.ServicePointManager.CheckCertificateRevocationList](https://learn.microsoft.com/search/?terms=System.Net.ServicePointManager.CheckCertificateRevocationList) is set to `true`, so `WebClient` checks certificates against the certificate revocation list (CRL) as part of the validation process.

## Previous behavior

Previously, [System.Net.ServicePointManager.CheckCertificateRevocationList](https://learn.microsoft.com/search/?terms=System.Net.ServicePointManager.CheckCertificateRevocationList) was not set to `true`. When `WebClient` loaded the remote image to a [System.Windows.Forms.PictureBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.PictureBox) control, it didn't check certificates against the CRL as part of validation process.

## New behavior

Starting in .NET 8, [System.Net.ServicePointManager.CheckCertificateRevocationList](https://learn.microsoft.com/search/?terms=System.Net.ServicePointManager.CheckCertificateRevocationList) is set to `true`, and `WebClient` checks certificates against the CRL as part of the validation process when loading a remote image in a `PictureBox` control. After the image is loaded, `CheckCertificateRevocationList` will be `true` for rest of the app's lifetime.

## Version introduced

.NET 8

## Type of breaking change

This change is a [behavioral change](../../categories.md#behavioral-change).

## Reason for change

It's considered best practice to set [System.Net.ServicePointManager.CheckCertificateRevocationList](https://learn.microsoft.com/search/?terms=System.Net.ServicePointManager.CheckCertificateRevocationList) to `true` before creating `WebClient` or `WebRequest` objects, so that those objects don't accept revoked certificates as valid.

## Recommended action

The effects of this change are outlined at [Load behavior changes](https://learn.microsoft.com/dotnet/api/system.windows.forms.picturebox.load#load-behavior-changes). If you want to revert to the previous behavior, that article also describes how to do so via a switch.

## Affected APIs

- [System.Windows.Forms.PictureBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.PictureBox)
