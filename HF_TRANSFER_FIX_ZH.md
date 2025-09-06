# HuggingFace Transfer 下载错误修复方案

## 问题描述

在使用 AI Toolkit 训练 FLUX Kontext 模型时，可能会遇到以下错误：

```
RuntimeError: An error occurred while downloading using `hf_transfer`. Consider disabling HF_HUB_ENABLE_HF_TRANSFER for better error handling.
```

## 错误原因

这个错误是由于启用了 HuggingFace 的快速传输功能 (`hf_transfer`) 导致的。虽然 `hf_transfer` 可以显著加快模型下载速度，但在某些环境中可能存在兼容性问题。

## 解决方案

### 方案一：全局禁用 HF_HUB_ENABLE_HF_TRANSFER（已实施）

已修改以下文件，默认禁用快速传输：
- `run.py` - 主运行脚本
- `run_zh.py` - 中文版运行脚本

**影响**：
- ✅ 提高下载稳定性
- ❌ 下载速度相对较慢

### 方案二：智能错误处理（推荐，已实施）

在 `flux_kontext.py` 中添加了智能错误处理机制：
- 首先尝试使用 `hf_transfer` 快速下载
- 如果失败，自动回退到标准下载方式
- 保证下载过程的稳定性

**优势**：
- ✅ 在兼容环境中享受快速下载
- ✅ 在不兼容环境中自动降级使用稳定方式
- ✅ 用户无需手动干预
- ✅ 提供清晰的状态信息

## 手动控制选项

如果你想手动控制 HF_HUB_ENABLE_HF_TRANSFER 设置：

### 启用快速传输（默认已禁用）
```bash
# Linux/Mac
export HF_HUB_ENABLE_HF_TRANSFER=1
python run_zh.py your_config.yaml

# Windows CMD
set HF_HUB_ENABLE_HF_TRANSFER=1
python run_zh.py your_config.yaml

# Windows PowerShell
$env:HF_HUB_ENABLE_HF_TRANSFER=1
python run_zh.py your_config.yaml
```

### 确保禁用快速传输
```bash
# Linux/Mac
export HF_HUB_ENABLE_HF_TRANSFER=0
python run_zh.py your_config.yaml

# Windows CMD
set HF_HUB_ENABLE_HF_TRANSFER=0
python run_zh.py your_config.yaml

# Windows PowerShell
$env:HF_HUB_ENABLE_HF_TRANSFER=0
python run_zh.py your_config.yaml
```

## 技术细节

### 错误处理流程

1. **尝试快速下载**：使用 `hf_transfer` 进行模型组件下载
2. **检测错误**：捕获包含 "hf_transfer" 的 RuntimeError
3. **自动降级**：临时禁用 `HF_HUB_ENABLE_HF_TRANSFER`
4. **重试下载**：使用标准 huggingface_hub 下载机制
5. **恢复设置**：完成后恢复原始环境变量设置

### 受保护的组件

以下模型组件已添加智能错误处理：
- FluxTransformer2DModel（主要 transformer 模型）
- T5TokenizerFast（T5 分词器）
- T5EncoderModel（T5 文本编码器）
- CLIPTextModel（CLIP 文本编码器）
- CLIPTokenizer（CLIP 分词器）
- AutoencoderKL（VAE 自动编码器）

## 常见问题

### Q: 为什么要禁用 hf_transfer？
A: `hf_transfer` 虽然速度更快，但在某些网络环境、Python 版本或操作系统配置下可能不稳定。禁用它可以确保更高的兼容性。

### Q: 下载会变慢多少？
A: 具体取决于网络环境，通常标准下载比 hf_transfer 慢 20-50%，但仍然可以接受。

### Q: 可以在训练过程中切换吗？
A: 建议在开始训练前确定设置。训练过程中的模型下载通常只在初始化阶段发生。

### Q: 其他模型类型是否受影响？
A: 目前仅为 FLUX Kontext 模型添加了智能错误处理。其他模型如果遇到类似问题，可以参考相同的解决方案。

## 相关文件

- `run.py` - 主运行脚本（已修改）
- `run_zh.py` - 中文版运行脚本（已修改）
- `extensions_built_in/diffusion_models/flux_kontext/flux_kontext.py` - FLUX Kontext 模型实现（已添加错误处理）

## 联系支持

如果修复后仍然遇到问题，请：
1. 检查网络连接
2. 确认 HF_TOKEN 设置正确（如需要）
3. 查看完整的错误日志
4. 在 AI Toolkit Discord 社区寻求帮助
