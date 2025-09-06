# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About AI Toolkit

AI Toolkit is a comprehensive training suite for diffusion models, supporting image and video models on consumer-grade hardware. It provides both GUI and CLI interfaces for training LoRA models, fine-tuning, and other AI tasks, with a focus on FLUX.1, Stable Diffusion, and various other model architectures.

## Development Commands

### Main Training Commands
- `python run.py config/your_config.yaml` - Run training with a configuration file
- `python run.py config/file1.yaml config/file2.yaml -r` - Run multiple configs sequentially with recovery flag
- `python run.py config/your_config.yaml -n "experiment_name"` - Run with custom name replacement
- `python run.py config/your_config.yaml -l logfile.txt` - Run with logging to file

### UI Development
**Web UI (Next.js):**
- `cd ui && npm run build_and_start` - Install dependencies, build, and start the web UI on port 8675
- `cd ui && npm run dev` - Start development server with hot reload
- `cd ui && npm run build` - Build for production
- `cd ui && npm run update_db` - Update database schema

**Gradio UI:**
- `python flux_train_ui.py` - Start the simple Gradio training interface

### Installation and Setup
**Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
pip3 install --no-cache-dir torch==2.7.0 torchvision==0.22.0 torchaudio==2.7.0 --index-url https://download.pytorch.org/whl/cu126
pip3 install -r requirements.txt
```

**Windows:**
```bash
python -m venv venv
.\venv\Scripts\activate
pip install --no-cache-dir torch==2.7.0 torchvision==0.22.0 torchaudio==2.7.0 --index-url https://download.pytorch.org/whl/cu126
pip install -r requirements.txt
```

## Architecture Overview

### Core Components

**Job System (`jobs/`):**
- `BaseJob` - Abstract base class for all job types
- `TrainJob` - Handles training workflows
- `ExtractJob` - LoRA extraction operations  
- `GenerateJob` - Image generation tasks
- `ModJob` - Model modification operations
- `MergeJob` - Model merging workflows
- `ExtensionJob` - Custom extension execution

**Process System (`jobs/process/`):**
- `BaseProcess` - Foundation for all training processes
- `BaseSDTrainProcess` - Stable Diffusion training base
- `TrainSliderProcess` - Concept slider training
- Various specialized training processes for different model types

**Toolkit Core (`toolkit/`):**
- `job.py` - Job factory and configuration management
- `config.py` - Configuration parsing and validation
- `data_loader.py` - Dataset loading and preprocessing
- `stable_diffusion_model.py` - Model handling and utilities
- `train_tools.py` - Training utilities and helpers
- Model-specific modules (`models/`) for FLUX, LoRA, adapters, etc.

**Built-in Extensions (`extensions_built_in/`):**
- `sd_trainer` - Standard Stable Diffusion training
- `dataset_tools` - Data preprocessing and management
- `advanced_generator` - Enhanced generation capabilities
- `diffusion_models` - Support for various model architectures (FLUX, Chroma, HiDream, etc.)

### Configuration System

**Config Structure:**
- `job` - Job type (extension, train, generate, etc.)
- `config.name` - Project identifier 
- `config.process[]` - Array of processing steps with type-specific parameters
- `meta` - Optional metadata

**Training Config Example:**
- `model` - Model path and settings (quantization, LoRA adapters, etc.)
- `datasets` - Image folders with caption files
- `train` - Batch size, steps, learning rate, optimizer settings
- `network` - LoRA/LoKr configuration (rank, alpha, layer targeting)
- `save` - Checkpoint frequency and format
- `sample` - Validation image generation settings

### Model Support

**Primary Models:**
- **FLUX.1-dev** - Requires HuggingFace token and license acceptance
- **FLUX.1-schnell** - Apache 2.0, requires training adapter
- **Stable Diffusion** - XL, 1.5, 3.5 variants
- **Video Models** - Wan21, Wan22, various I2V architectures

**Training Types:**
- **LoRA** - Low-rank adaptation with configurable ranks and alpha values
- **LoKr** - Kronecker product decomposition (LyCORIS)
- **Full Fine-tuning** - Complete model parameter training
- **Slider Training** - Concept manipulation training

### Data Pipeline

**Dataset Requirements:**
- Images: JPG, JPEG, PNG formats
- Captions: Matching .txt files with same basename
- Automatic bucketing by resolution and aspect ratio
- Support for trigger words and caption dropout

**Processing Features:**
- Dynamic batching with multiple resolutions
- Latent caching for performance
- Caption preprocessing and token shuffling
- Automatic resizing (no manual cropping needed)

### Development Environment

**Requirements:**
- Python >3.10
- NVIDIA GPU with sufficient VRAM (24GB+ for FLUX)
- CUDA 12.6 compatible PyTorch installation

**Key Dependencies:**
- `torch==2.7.0` with CUDA 12.6
- `diffusers` (custom fork with latest features)
- `transformers==4.52.4`
- `accelerate` for distributed training
- `lycoris-lora` for advanced LoRA variants

**Environment Variables:**
- `HF_TOKEN` - Hugging Face access token for gated models
- `AI_TOOLKIT_AUTH` - Web UI authentication password
- `DEBUG_TOOLKIT=1` - Enable PyTorch anomaly detection

## Important Notes

- FLUX training requires 24GB+ VRAM; use `low_vram: true` if GPU drives displays
- Always wait for checkpoint saves to complete before interrupting training
- Web UI runs on port 8675 and supports remote access with authentication
- Configuration examples are in `config/examples/` for different model types and use cases
- The toolkit supports extensibility through the extensions system for custom workflows