# Source code: uwp/gaming/code/AppRecordingExample/cpp/AppRecordingExample/Content/ShaderStructures.h

Complete source file; linked examples may select a region or line range.

```
#pragma once

namespace AppRecordingExample
{
	// Constant buffer used to send MVP matrices to the vertex shader.
	struct ModelViewProjectionConstantBuffer
	{
		DirectX::XMFLOAT4X4 model;
		DirectX::XMFLOAT4X4 view;
		DirectX::XMFLOAT4X4 projection;
	};

	// Used to send per-vertex data to the vertex shader.
	struct VertexPositionColor
	{
		DirectX::XMFLOAT3 pos;
		DirectX::XMFLOAT3 color;
	};
}
```
