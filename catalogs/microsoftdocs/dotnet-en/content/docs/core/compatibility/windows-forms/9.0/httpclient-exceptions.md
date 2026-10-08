---
title: "Breaking change: PictureBox raises HttpClient exceptions"
description: Learn about the breaking change in .NET 9 for Windows Forms where `PictureBox` raises HttpClient exceptions for network errors when loading an image from a URL.
ms.date: 07/09/2024
---
# PictureBox raises HttpClient exceptions

When [System.Windows.Forms.PictureBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.PictureBox) loads an image from a URL and a network error occurs, it now raises [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) exceptions, such as [System.Net.Http.HttpRequestException](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestException) and [System.Threading.Tasks.TaskCanceledException](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCanceledException), instead of [System.Net.WebException](https://learn.microsoft.com/search/?terms=System.Net.WebException).

## Version introduced

.NET 9 Preview 6

## Previous behavior

Previously, when [System.Windows.Forms.PictureBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.PictureBox) failed to load an image from a URL due to a network error, a [System.Net.WebException](https://learn.microsoft.com/search/?terms=System.Net.WebException) was thrown.

## New behavior

Starting in .NET 9, when [System.Windows.Forms.PictureBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.PictureBox) fails to load an image from a URL due to a network error, [System.Net.Http.HttpRequestException](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestException) or [System.Threading.Tasks.TaskCanceledException](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCanceledException) is thrown.

## Change category

This change is a [*behavioral change*](../../categories.md#behavioral-change).

## Reason for change

[System.Net.WebClient](https://learn.microsoft.com/search/?terms=System.Net.WebClient) is obsolete.

## Recommended action

Update your code to catch [System.Net.Http.HttpRequestException](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestException) and [System.Threading.Tasks.TaskCanceledException](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCanceledException) instead of [System.Net.WebException](https://learn.microsoft.com/search/?terms=System.Net.WebException).

## Affected APIs

- [System.Windows.Forms.PictureBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.PictureBox) control
