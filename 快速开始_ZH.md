# AI Toolkit 快速开始指南 🚀

欢迎使用 AI Toolkit 中文版！这个指南将帮助您快速上手，开始您的第一个 AI 模型训练。

## 📋 准备工作

### 系统要求
- **操作系统**: Linux (推荐) 或 Windows 10/11
- **Python**: 3.10 或更高版本
- **GPU**: NVIDIA GPU，至少 24GB 显存 (用于 FLUX.1 训练)
- **内存**: 32GB 系统内存 (推荐)
- **存储**: 至少 100GB 可用空间

### 硬件推荐
| GPU 型号 | 显存 | 适用场景 |
|---------|------|----------|
| RTX 3090 | 24GB | FLUX.1 LoRA 训练 ✅ |
| RTX 4090 | 24GB | FLUX.1 LoRA 训练 ✅ |
| RTX A5000 | 24GB | FLUX.1 LoRA 训练 ✅ |
| RTX 3080 | 10GB | SD 1.5/XL 训练 ⚠️ |

## 🛠️ 安装步骤

### 1. 下载代码
```bash
# 克隆仓库
git clone https://github.com/ostris/ai-toolkit.git
cd ai-toolkit

# 或者如果您使用的是中文版
git clone https://github.com/your-repo/ai-toolkit-zh.git
cd ai-toolkit-zh
```

### 2. 创建虚拟环境
```bash
# Linux/Mac
python3 -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate
```

### 3. 安装依赖
```bash
# 安装 PyTorch (CUDA 12.6 版本)
pip3 install torch==2.7.0 torchvision==0.22.0 torchaudio==2.7.0 --index-url https://download.pytorch.org/whl/cu126

# 安装其他依赖
pip3 install -r requirements.txt
```

### 4. 配置 HuggingFace (用于 FLUX.1)
```bash
# 创建环境变量文件
echo "HF_TOKEN=您的HF令牌" > .env

# 或者直接登录
huggingface-cli login
```

> 💡 **获取 HF 令牌**: 访问 [HuggingFace 设置](https://huggingface.co/settings/tokens) 创建访问令牌

## 🎨 第一次训练：FLUX.1 LoRA

### 准备数据集

1. **创建数据集文件夹**
   ```bash
   mkdir -p datasets/my_character
   ```

2. **准备图像和标题**
   ```
   datasets/my_character/
   ├── image1.jpg
   ├── image1.txt
   ├── image2.jpg
   ├── image2.txt
   └── ...
   ```

3. **标题文件示例** (`image1.txt`)
   ```
   一个穿着蓝色衬衫的年轻女性，棕色长发，在咖啡厅里微笑
   ```

### 配置训练参数

1. **复制配置模板**
   ```bash
   cp config/examples/train_lora_flux_24gb_zh.yaml config/my_first_lora.yaml
   ```

2. **编辑配置文件** (`config/my_first_lora.yaml`)
   ```yaml
   config:
     name: "my_character_lora_v1"  # 您的模型名称
     process:
       - type: 'sd_trainer'
         training_folder: "output"
         datasets:
           - folder_path: "datasets/my_character"  # 您的数据集路径
             caption_ext: "txt"
             resolution: [512, 768, 1024]
         train:
           steps: 1500  # 训练步数，根据数据量调整
           batch_size: 1
           lr: 1e-4
         model:
           name_or_path: "black-forest-labs/FLUX.1-dev"
           quantize: true
   ```

### 开始训练

```bash
# 使用中文版脚本
python run_zh.py config/my_first_lora.yaml

# 或使用原版脚本
python run.py config/my_first_lora.yaml
```

## 📊 监控训练过程

### 训练输出
训练过程中，您将看到类似输出：
```
步骤 250/1500 | 损失: 0.145 | 学习率: 1e-4 | 显存: 18.2GB/24GB
保存检查点: output/my_character_lora_v1/checkpoints/checkpoint-250.safetensors
生成样本图像...
```

### 文件结构
```
output/my_character_lora_v1/
├── checkpoints/          # 检查点文件
├── samples/             # 样本图像
├── logs/               # 训练日志
└── my_character_lora_v1.safetensors  # 最终模型
```

## 🎭 使用简易界面

如果您更喜欢图形界面：

```bash
# 启动中文版 Gradio 界面
python flux_train_ui_zh.py

# 访问 http://localhost:7860
```

界面功能：
- ✅ 拖拽上传图像
- ✅ 自动标题生成
- ✅ 可视化编辑标题
- ✅ 一键开始训练

## 🌐 Web 管理界面

启动完整的 Web 管理界面：

```bash
cd ui
npm run build_and_start

# 访问 http://localhost:8675
```

功能特点：
- 📊 训练进度监控
- 📁 数据集管理
- 🖼️ 样本图像查看
- ⚙️ 高级配置选项

## 🎯 训练技巧和建议

### 数据集质量
✅ **好的数据集**
- 15-30张高质量图像
- 主体一致，姿势多样
- 标题详细准确
- 分辨率统一 (推荐 1024x1024)

❌ **避免的问题**
- 图像质量差或模糊
- 主体不一致
- 标题过于简单
- 数量过多 (>100张) 或过少 (<4张)

### 参数调优
| 参数 | 推荐值 | 说明 |
|-----|--------|------|
| `steps` | 1000-3000 | 图像少用少步数，图像多用多步数 |
| `lr` | 1e-4 | 学习率，可尝试 5e-5 到 2e-4 |
| `batch_size` | 1 | 24GB显存限制 |
| `linear` | 16-64 | LoRA维度，影响模型容量 |

### 停止条件
观察到以下情况时应停止训练：
- 样本图像质量不再改善
- 过拟合迹象 (图像过于相似训练数据)
- 损失值不再下降

## 🔧 常见问题解决

### 显存不足
```yaml
model:
  quantize: true      # 启用量化
  low_vram: true     # 低显存模式
train:
  gradient_checkpointing: true  # 梯度检查点
```

### 训练速度慢
- 使用 `bf16` 数据类型
- 启用 `cache_latents_to_disk: true`
- 检查硬盘读写速度

### 生成效果不佳
- 检查标题质量
- 调整学习率
- 增加训练步数
- 检查触发词使用

## 📚 进阶主题

### 多模型训练
```bash
# 同时训练多个配置
python run_zh.py config/model1.yaml config/model2.yaml -r
```

### 层级选择训练
```yaml
network:
  network_kwargs:
    only_if_contains:
      - "transformer.single_transformer_blocks.7"
      - "transformer.single_transformer_blocks.20"
```

### 自定义采样提示
```yaml
sample:
  prompts:
    - "您的自定义提示词1"
    - "您的自定义提示词2"
```

## 🆘 获取帮助

- 📖 **文档**: 查看 `docs/concepts_zh.md` 了解详细概念
- ❓ **FAQ**: 查看 `FAQ_ZH.md` 获取常见问题解答
- 💬 **社区**: 加入 [Discord 服务器](https://discord.gg/VXmU2f5WEU)
- 🐛 **报告问题**: 在 GitHub 上提交 Issue

## 🎉 成功！

恭喜您完成第一次训练！现在您可以：

1. **测试模型**: 在支持 FLUX.1 的生成界面中加载您的 LoRA
2. **调优参数**: 尝试不同的配置以获得更好效果
3. **分享作品**: 与社区分享您的训练成果
4. **探索更多**: 尝试其他模型和训练类型

训练愉快！🚀✨