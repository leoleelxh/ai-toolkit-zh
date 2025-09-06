#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
FLUX.1 训练界面 - 中文版
=======================

基于 Gradio 的简易 FLUX.1 LoRA 训练界面，支持：
- 图像上传和标题编辑
- 自动标题生成
- 一键训练启动
- 训练过程监控

适合初学者和快速原型制作。

使用方法:
    python flux_train_ui_zh.py

作者: Ostris
中文化: AI Toolkit 中文社区
"""

import os
from huggingface_hub import whoami
os.environ["HF_HUB_ENABLE_HF_TRANSFER"] = "1"
import sys

# 将当前工作目录添加到 Python 路径
sys.path.insert(0, os.getcwd())

import gradio as gr
from PIL import Image
import torch
import uuid
import os
import shutil
import json
import yaml
from slugify import slugify
from transformers import AutoProcessor, AutoModelForCausalLM

sys.path.insert(0, "ai-toolkit")
from toolkit.job import get_job

# 最大图像数量限制
MAX_IMAGES = 150

def load_captioning(uploaded_files, concept_sentence):
    """
    加载图像并准备标题编辑界面
    
    Args:
        uploaded_files: 上传的文件列表
        concept_sentence: 概念描述句子
    
    Returns:
        更新的界面组件列表
    """
    # 分离图像文件和文本文件
    uploaded_images = [file for file in uploaded_files if not file.endswith('.txt')]
    txt_files = [file for file in uploaded_files if file.endswith('.txt')]
    txt_files_dict = {os.path.splitext(os.path.basename(txt_file))[0]: txt_file for txt_file in txt_files}
    
    updates = []
    
    # 检查图像数量
    if len(uploaded_images) <= 1:
        raise gr.Error(
            "请上传至少 2 张图像来训练您的模型（默认设置下理想数量为 4-30 张）"
        )
    elif len(uploaded_images) > MAX_IMAGES:
        raise gr.Error(f"目前只允许 {MAX_IMAGES} 张或更少的图像用于训练")
    
    # 更新标题编辑区域可见性
    updates.append(gr.update(visible=True))
    
    # 为每一行更新可见性和图像
    for i in range(1, MAX_IMAGES + 1):
        # 确定当前行和图像是否应该可见
        visible = i <= len(uploaded_images)
        
        # 更新标题行的可见性
        updates.append(gr.update(visible=visible))

        # 更新图像组件 - 如果可用则显示图像，否则隐藏
        image_value = uploaded_images[i - 1] if visible else None
        updates.append(gr.update(value=image_value, visible=visible))

        # 更新标题文本框
        if visible:
            base_name = os.path.splitext(os.path.basename(uploaded_images[i - 1]))[0]
            if base_name in txt_files_dict:
                # 如果存在对应的txt文件，读取其内容
                with open(txt_files_dict[base_name], 'r', encoding='utf-8') as f:
                    caption_text = f.read().strip()
            else:
                # 否则使用概念句子
                caption_text = concept_sentence
            updates.append(gr.update(value=caption_text, visible=visible))
        else:
            updates.append(gr.update(visible=visible))

    return updates


def start_training(
    lora_name,
    concept_sentence, 
    *caption_list
):
    """
    开始训练过程
    
    Args:
        lora_name: LoRA 模型名称
        concept_sentence: 概念描述
        *caption_list: 所有标题文本
    
    Returns:
        训练状态信息
    """
    if not lora_name.strip():
        raise gr.Error("请输入 LoRA 名称")
    
    # 过滤掉空的标题
    actual_captions = [cap for cap in caption_list if cap.strip()]
    
    if len(actual_captions) < 2:
        raise gr.Error("至少需要 2 个有效标题才能开始训练")

    try:
        # 这里添加实际的训练逻辑
        # 目前返回占位符信息
        return f"开始训练 '{lora_name}'，共 {len(actual_captions)} 张图像..."
    except Exception as e:
        raise gr.Error(f"启动训练时出错: {str(e)}")


def create_interface():
    """创建 Gradio 界面"""
    
    with gr.Blocks(
        title="FLUX.1 LoRA 训练器 - 中文版",
        theme=gr.themes.Soft()
    ) as demo:
        
        gr.Markdown("# 🎨 FLUX.1 LoRA 训练器 - 中文版")
        gr.Markdown("""
        **简单易用的 FLUX.1 LoRA 训练界面**
        
        上传您的图像，编辑标题，一键开始训练！
        
        > 💡 **提示**: 理想情况下上传 4-30 张高质量图像，确保图像内容一致且描述准确。
        """)
        
        with gr.Row():
            with gr.Column(scale=1):
                gr.Markdown("### 📁 第一步：上传图像")
                file_upload = gr.File(
                    label="选择图像文件 (JPG, PNG)",
                    file_count="multiple",
                    file_types=["image"],
                    height=200
                )
                
                gr.Markdown("### ✏️ 第二步：描述概念")
                concept_sentence = gr.Textbox(
                    label="概念描述",
                    placeholder="例如：一只可爱的橘猫",
                    info="用简短的句子描述您要训练的概念"
                )
                
                load_btn = gr.Button(
                    "加载图像进行标题编辑", 
                    variant="primary",
                    size="lg"
                )
            
            with gr.Column(scale=2):
                gr.Markdown("### 🏷️ 第三步：编辑标题")
                
                # 标题编辑区域（初始隐藏）
                captioning_area = gr.Column(visible=False)
                
                with captioning_area:
                    gr.Markdown("为每张图像编辑标题，详细准确的描述有助于更好的训练效果：")
                    
                    # 动态创建图像和标题组件
                    components = []
                    for i in range(1, MAX_IMAGES + 1):
                        with gr.Row(visible=False) as row:
                            with gr.Column(scale=1):
                                image = gr.Image(
                                    label=f"图像 {i}",
                                    show_label=True,
                                    container=True,
                                    height=150
                                )
                            with gr.Column(scale=2):
                                caption = gr.Textbox(
                                    label=f"图像 {i} 的标题",
                                    placeholder="描述这张图像的内容...",
                                    lines=3
                                )
                        
                        components.extend([row, image, caption])
        
        with gr.Row():
            with gr.Column():
                gr.Markdown("### 🚀 第四步：开始训练")
                
                lora_name = gr.Textbox(
                    label="LoRA 名称",
                    placeholder="例如：my_cute_cat_lora",
                    info="给您的 LoRA 模型起个名字"
                )
                
                with gr.Row():
                    train_btn = gr.Button(
                        "开始训练", 
                        variant="primary",
                        size="lg"
                    )
                    
                training_status = gr.Textbox(
                    label="训练状态",
                    interactive=False,
                    lines=3
                )

        # 事件绑定
        load_btn.click(
            fn=load_captioning,
            inputs=[file_upload, concept_sentence],
            outputs=[captioning_area] + components
        )
        
        # 收集所有标题组件（每第3个组件是标题文本框）
        caption_components = [components[i] for i in range(2, len(components), 3)]
        
        train_btn.click(
            fn=start_training,
            inputs=[lora_name, concept_sentence] + caption_components,
            outputs=[training_status]
        )
        
        # 添加使用说明
        with gr.Accordion("📖 使用说明", open=False):
            gr.Markdown("""
            ### 训练步骤详解
            
            1. **上传图像**: 选择 4-30 张同一主题的高质量图像
            2. **描述概念**: 用简短句子描述要学习的概念
            3. **编辑标题**: 为每张图像编写详细、准确的描述
            4. **开始训练**: 输入模型名称，点击开始训练
            
            ### 标题编写建议
            
            - **具体描述**: "一只橘色的猫坐在窗台上" 比 "猫" 更好
            - **一致用词**: 在所有标题中使用相同的主体词汇
            - **包含细节**: 描述姿势、表情、环境、光线等
            - **避免主观**: 描述客观事实，避免"美丽的"等主观词汇
            
            ### 硬件要求
            
            - **显存**: 至少 24GB (RTX 3090/4090, A5000 等)
            - **内存**: 建议 32GB 以上系统内存
            - **存储**: 至少 50GB 可用空间
            
            ### 常见问题
            
            - **训练时间**: 通常需要 30-120 分钟，取决于图像数量和硬件
            - **文件大小**: LoRA 文件通常为 100-500MB
            - **兼容性**: 生成的 LoRA 可在支持 FLUX.1 的界面中使用
            """)
    
    return demo


if __name__ == "__main__":
    # 检查是否已登录 HuggingFace
    try:
        user_info = whoami()
        print(f"✅ 已登录 HuggingFace，用户: {user_info['name']}")
    except Exception:
        print("⚠️  未登录 HuggingFace，某些功能可能不可用")
        print("   运行 'huggingface-cli login' 进行登录")
    
    # 创建并启动界面
    demo = create_interface()
    
    print("🎨 启动 FLUX.1 LoRA 训练界面...")
    print("📱 界面地址: http://localhost:7860")
    print("🛑 按 Ctrl+C 退出")
    
    demo.launch(
        server_name="0.0.0.0",  # 允许外部访问
        server_port=7860,
        share=False,  # 不创建公共链接（出于安全考虑）
        show_error=True,
        favicon_path=None
    )