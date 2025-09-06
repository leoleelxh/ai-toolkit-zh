# AI Toolkit by Ostris - 中文版

AI Toolkit 是一个全能的扩散模型（Diffusion Models）训练套件。我致力于在消费级硬件上支持所有最新的图像和视频模型。它既可以通过图形界面（GUI）运行，也可以通过命令行界面（CLI）运行。该工具旨在易于使用，同时具备您能想象到的所有功能。

## 赞助我的工作

如果您喜欢我的项目或将其用于商业用途，请考虑赞助我。每一份贡献都很有帮助！💖

[GitHub 赞助](https://github.com/orgs/ostris) | [Patreon 支持](https://www.patreon.com/ostris) | [PayPal 捐赠](https://www.paypal.com/donate/?hosted_button_id=9GEFUKC8T9R9W)

### 当前赞助商

这些人/组织无私地支持着这个项目。谢谢大家！！

_最后更新：2025-08-23 14:55 UTC_

[此处保留原版赞助商展示区域 - 保持原有的HTML格式和图片]

---

## 安装指南

系统要求：
- Python >3.10
- 具备足够显存的 NVIDIA GPU
- Python 虚拟环境（venv）
- Git 版本控制

### Linux 系统：
```bash
git clone https://github.com/ostris/ai-toolkit.git
cd ai-toolkit
python3 -m venv venv
source venv/bin/activate
# 首先安装 PyTorch（深度学习框架）
pip3 install --no-cache-dir torch==2.7.0 torchvision==0.22.0 torchaudio==2.7.0 --index-url https://download.pytorch.org/whl/cu126
pip3 install -r requirements.txt
```

### Windows 系统：

如果在 Windows 上遇到问题，建议使用简易安装脚本：[https://github.com/Tavris1/AI-Toolkit-Easy-Install](https://github.com/Tavris1/AI-Toolkit-Easy-Install)

```bash
git clone https://github.com/ostris/ai-toolkit.git
cd ai-toolkit
python -m venv venv
.\venv\Scripts\activate
pip install --no-cache-dir torch==2.7.0 torchvision==0.22.0 torchaudio==2.7.0 --index-url https://download.pytorch.org/whl/cu126
pip install -r requirements.txt
```

# AI Toolkit 网页界面

<img src="https://ostris.com/wp-content/uploads/2025/02/toolkit-ui.jpg" alt="AI Toolkit UI" width="100%">

AI Toolkit 网页界面是该工具包的 Web 管理界面。它让您可以轻松启动、停止和监控训练任务。您也可以通过几次点击轻松训练模型。它还允许您为界面设置访问令牌以防止未授权访问，因此在暴露的服务器上运行相对安全。

## 运行网页界面

系统要求：
- Node.js > 18

网页界面不需要保持运行状态，训练任务就能继续执行。它仅用于启动/停止/监控任务。以下命令将安装/更新界面及其依赖项并启动界面。

```bash
cd ui
npm run build_and_start
```

现在您可以通过 `http://localhost:8675` 或 `http://<您的服务器IP>:8675` 访问界面（如果在服务器上运行）。

## 保护网页界面安全

如果您在云服务商或任何不安全的网络上托管界面，强烈建议使用认证令牌保护它。
您可以通过设置环境变量 `AI_TOOLKIT_AUTH` 为超级安全密码来实现。访问界面时需要此令牌。您可以像这样启动界面：

```bash
# Linux 系统
AI_TOOLKIT_AUTH=超级安全密码 npm run build_and_start

# Windows 系统
set AI_TOOLKIT_AUTH=超级安全密码 && npm run build_and_start

# Windows PowerShell
$env:AI_TOOLKIT_AUTH="超级安全密码"; npm run build_and_start
```

## FLUX.1 模型训练

### 教程指南

想要快速入门，请查看 [@araminta_k](https://x.com/araminta_k) 的教程：[在 24GB 显存的 3090 上微调 Flux Dev](https://www.youtube.com/watch?v=HzGW_Kyermg)。

### 硬件要求
您目前需要**至少 24GB 显存**的 GPU 来训练 FLUX.1。如果您的 GPU 同时用于显示器输出，您可能需要在配置文件的 `model:` 部分设置 `low_vram: true` 标志。这将在 CPU 上量化模型，应该允许在连接显示器的情况下进行训练。有用户在 Windows WSL 下成功运行，但有报告在 Windows 原生环境下存在问题。
目前我只在 Linux 上测试过。这仍然是极其实验性的，需要很多量化和技巧才能让它在 24GB 上运行。

### FLUX.1-dev 模型

FLUX.1-dev 具有非商业许可证。这意味着您训练的任何内容都将继承非商业许可证。它也是一个门控模型，因此您需要在使用前接受 HuggingFace 上的许可证。否则将会失败。以下是设置许可证的必要步骤：

1. 登录 HF 并在此处接受模型访问权限：[black-forest-labs/FLUX.1-dev](https://huggingface.co/black-forest-labs/FLUX.1-dev)
2. 在此文件夹的根目录创建名为 `.env` 的文件
3. [从 HuggingFace 获取 READ 权限密钥](https://huggingface.co/settings/tokens/new?) 并将其添加到 `.env` 文件中，如：`HF_TOKEN=您的密钥`

### FLUX.1-schnell 模型

FLUX.1-schnell 使用 Apache 2.0 许可证。基于它训练的任何内容都可以按您希望的方式许可，训练时不需要 HF_TOKEN。
但是，它需要特殊的适配器来训练：[ostris/FLUX.1-schnell-training-adapter](https://huggingface.co/ostris/FLUX.1-schnell-training-adapter)。
它也是高度实验性的。为了获得最佳整体质量，建议在 FLUX.1-dev 上训练。

要使用它，您只需在配置文件的 `model` 部分添加助手适配器：

```yaml
      model:
        name_or_path: "black-forest-labs/FLUX.1-schnell"
        assistant_lora_path: "ostris/FLUX.1-schnell-training-adapter"  # 训练助手适配器
        is_flux: true
        quantize: true  # 启用量化以节省显存
```

您还需要调整采样步数，因为 schnell 不需要那么多步数：

```yaml
      sample:
        guidance_scale: 1  # schnell 不使用引导
        sample_steps: 4  # 1-4 步效果很好
```

### 开始训练
1. 将位于 `config/examples/train_lora_flux_24gb.yaml`（schnell 版本使用 `config/examples/train_lora_flux_schnell_24gb.yaml`）的示例配置文件复制到 `config` 文件夹并重命名为 `您想要的名称.yml`
2. 按照文件中的注释编辑文件
3. 像这样运行文件：`python run.py config/您想要的名称.yml`

开始时会创建一个以配置文件中的名称和训练文件夹命名的文件夹。它将包含所有检查点和图像。您可以随时使用 Ctrl+C 停止训练，恢复时它将从最后一个检查点继续。

**重要提示**：如果在保存时按 Ctrl+C，很可能会损坏该检查点。所以请等待保存完成。

### 需要帮助？

除非是代码中的错误，否则请不要提交错误报告。欢迎[加入我的 Discord](https://discord.gg/VXmU2f5WEU) 并在那里寻求帮助。但是，请不要直接私信我一般问题或技术支持。在 Discord 中提问，我会在有时间时回答。

## Gradio 界面

要使用自定义界面在本地开始训练，在完成上述步骤并安装 `ai-toolkit` 后：

```bash
cd ai-toolkit # 确保您在 ai-toolkit 文件夹中
huggingface-cli login # 提供一个 `write` 令牌以便最后发布您的 LoRA
python flux_train_ui.py
```

您将启动一个界面，让您上传图像、添加标题、训练和发布您的 LoRA。
![image](assets/lora_ease_ui.png)

## 在 RunPod 上训练
如果您想使用 RunPod 但尚未注册，请考虑使用[我的 RunPod 推荐链接](https://runpod.io?ref=h0y9jyr2)来帮助支持这个项目。

我在这里维护一个官方的 RunPod Pod 模板，可以[在此处](https://console.runpod.io/deploy?template=0fqzfjy6f3&ref=h0y9jyr2)访问。

我还制作了一个简短的视频，展示如何开始在 RunPod 上使用 AI Toolkit：[点击观看](https://youtu.be/HBNeS-F6Zz8)。

## 在 Modal 上训练

### 1. 设置
#### ai-toolkit：
```
git clone https://github.com/ostris/ai-toolkit.git
cd ai-toolkit
git submodule update --init --recursive
python -m venv venv
source venv/bin/activate
pip install torch
pip install -r requirements.txt
pip install --upgrade accelerate transformers diffusers huggingface_hub # 可选，如果遇到问题请运行
```
#### Modal：
- 运行 `pip install modal` 安装 Modal Python 包。
- 运行 `modal setup` 进行身份验证（如果不起作用，尝试 `python -m modal setup`）。

#### Hugging Face：
- 从[此处](https://huggingface.co/settings/tokens)获取 READ 令牌并从[此处](https://huggingface.co/black-forest-labs/FLUX.1-dev)请求访问 Flux.1-dev 模型。
- 运行 `huggingface-cli login` 并粘贴您的令牌。

### 2. 上传您的数据集
- 将包含 .jpg、.jpeg 或 .png 图像和 .txt 文件的数据集文件夹拖放到 `ai-toolkit` 中。

### 3. 配置文件
- 将位于 ```config/examples/modal``` 的示例配置文件复制到 `config` 文件夹并重命名为 ```您想要的名称.yml```。
- 按照文件中的注释编辑配置，**<ins>请仔细遵循示例 `/root/ai-toolkit` 路径</ins>**。

### 4. 编辑 run_modal.py
- 在 `code_mount = modal.Mount.from_local_dir` 设置您完整的本地 `ai-toolkit` 路径，如：
  
   ```
   code_mount = modal.Mount.from_local_dir("/Users/username/ai-toolkit", remote_path="/root/ai-toolkit")
   ```
- 在 `@app.function` 中选择 `GPU` 和 `Timeout`（_默认是 A100 40GB 和 2 小时超时_）。

### 5. 训练
- 在终端中运行配置文件：`modal run run_modal.py --config-file-list-str=/root/ai-toolkit/config/您想要的名称.yml`。
- 您可以在本地终端或 [modal.com](https://modal.com/) 上监控训练。
- 模型、样本和优化器将存储在 `Storage > flux-lora-models` 中。

### 6. 保存模型
- 运行 `modal volume ls flux-lora-models` 检查卷的内容。
- 运行 `modal volume get flux-lora-models 您的模型名称` 下载内容。
- 示例：`modal volume get flux-lora-models my_first_flux_lora_v1`。

### Modal 训练截图

<img width="1728" alt="Modal 训练截图" src="https://github.com/user-attachments/assets/7497eb38-0090-49d6-8ad9-9c8ea7b5388b">

---

## 数据集准备

数据集通常需要是包含图像和相关文本文件的文件夹。目前，仅支持 jpg、jpeg 和 png 格式。WebP 目前存在问题。文本文件应与图像同名但扩展名为 `.txt`。例如 `image2.jpg` 和 `image2.txt`。文本文件应仅包含标题。
您可以在标题文件中添加 `[trigger]` 单词，如果您在配置中有 `trigger_word`，它将自动替换。

图像永远不会被放大，但会被缩小并放入桶中进行批处理。**您不需要裁剪/调整图像大小**。
加载器将自动调整它们的大小并可以处理不同的宽高比。

## 训练特定层级

要使用 LoRA 训练特定层级，您可以使用 `only_if_contains` 网络参数。例如，如果您只想训练 The Last Ben [在此帖子中提到的](https://x.com/__TheBen/status/1829554120270987740) 2 个层级，您可以像这样调整网络参数：

```yaml
      network:
        type: "lora"  # LoRA 类型
        linear: 128   # 线性层维度
        linear_alpha: 128  # Alpha 参数
        network_kwargs:
          only_if_contains:  # 仅包含以下层级名称
            - "transformer.single_transformer_blocks.7.proj_out"
            - "transformer.single_transformer_blocks.20.proj_out"
```

层级的命名约定采用 diffusers 格式，因此检查模型的状态字典将显示您想要训练的层级名称的后缀。您也可以使用此方法仅训练特定的权重组。
例如，要仅为 FLUX.1 训练 `single_transformer`，您可以使用以下配置：

```yaml
      network:
        type: "lora"
        linear: 128
        linear_alpha: 128
        network_kwargs:
          only_if_contains:
            - "transformer.single_transformer_blocks."
```

您还可以使用 `ignore_if_contains` 网络参数按名称排除层级。因此要排除所有单一变换器块：

```yaml
      network:
        type: "lora"
        linear: 128
        linear_alpha: 128
        network_kwargs:
          ignore_if_contains:  # 忽略包含以下名称的层级
            - "transformer.single_transformer_blocks."
```

`ignore_if_contains` 优先于 `only_if_contains`。因此如果权重被两者覆盖，它将被忽略。

## LoKr 训练

要了解更多关于 LoKr 的信息，请阅读 [KohakuBlueleaf/LyCORIS](https://github.com/KohakuBlueleaf/LyCORIS/blob/main/docs/Guidelines.md)。要训练 LoKr 模型，您可以在配置文件中调整网络类型：

```yaml
      network:
        type: "lokr"  # LoKr 类型（Kronecker 乘积分解）
        lokr_full_rank: true  # 完整秩分解
        lokr_factor: 8  # 分解因子
```

其他所有内容都应该正常工作，包括层级定位。

## 更新日志

这里只列出较大的更新。通常有较小的日常更新会被省略。

### 2025年7月17日
- 方便在界面中为样本添加控制图像

### 2025年7月11日
- 为视频模型在界面中添加了更好的视频配置设置
- 在界面中添加了 Wan I2V 训练

### 2025年6月29日
- 修复了 Kontext 在采样时强制尺寸的问题

### 2025年6月26日
- 添加了对 FLUX.1 Kontext 训练的支持
- 添加了对指令数据集训练的支持

### 2025年6月25日
- 添加了对 OmniGen2 训练的支持

### 2025年6月17日
- 批次准备的性能优化
- 在简单界面中为项目添加了一些弹出文档，解释设置的作用。仍在进行中

### 2025年6月16日
- 在界面中查看数据集时隐藏控制图像
- 均值流损失的进行中工作

### 2025年6月12日
- 修复了导致数据加载器中标题为空的问题

### 2025年6月10日
- 决定在 README 中跟踪更新
- 在界面中添加了对 SDXL 的支持
- 在界面中添加了对 SD 1.5 的支持
- 修复了界面中 Wan 2.1 14b 名称错误
- 在界面中为支持的模型添加了卷积训练支持