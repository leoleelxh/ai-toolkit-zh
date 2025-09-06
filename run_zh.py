#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI Toolkit 训练启动器 - 中文版
==========================

这是 AI Toolkit 的主要运行脚本，用于启动各种机器学习任务：
- 模型训练 (LoRA, 全量微调等)
- 图像生成
- 模型提取和合并
- 扩展功能执行

使用方法:
    python run_zh.py config/your_config.yaml

作者: Ostris
中文化: AI Toolkit 中文社区
"""

import os
# 启用 HuggingFace 快速传输
os.environ["HF_HUB_ENABLE_HF_TRANSFER"] = "1"
# 禁止 albumentations 更新检查
os.environ["NO_ALBUMENTATIONS_UPDATE"] = "1"
import sys
from typing import Union, OrderedDict
from dotenv import load_dotenv

# 加载 .env 文件（如果存在）
# 这里通常包含 HF_TOKEN 等重要配置
load_dotenv()

sys.path.insert(0, os.getcwd())
# 必须在任何 torch 或 fastai 导入之前
# import toolkit.cuda_malloc

# 关闭 diffusers 遥测直到我找到如何使其选择加入
os.environ['DISABLE_TELEMETRY'] = 'YES'

# 检查环境变量中是否有 DEBUG_TOOLKIT
if os.environ.get("DEBUG_TOOLKIT", "0") == "1":
    # 将 torch 设置为跟踪模式（用于调试）
    import torch
    torch.autograd.set_detect_anomaly(True)

import argparse
from toolkit.job import get_job
from toolkit.accelerator import get_accelerator
from toolkit.print import print_acc, setup_log_to_file

# 获取加速器实例（用于分布式训练）
accelerator = get_accelerator()


def print_end_message(jobs_completed, jobs_failed):
    """
    打印任务完成情况的最终消息
    
    Args:
        jobs_completed (int): 完成的任务数量
        jobs_failed (int): 失败的任务数量
    """
    if not accelerator.is_main_process:
        return
    
    failure_string = f"{jobs_failed} 个失败" if jobs_failed > 0 else ""
    completed_string = f"{jobs_completed} 个已完成任务"

    print_acc("")
    print_acc("========================================")
    print_acc("执行结果:")
    if len(completed_string) > 0:
        print_acc(f" - {completed_string}")
    if len(failure_string) > 0:
        print_acc(f" - {failure_string}")
    print_acc("========================================")


def main():
    """主函数：解析参数并执行训练任务"""
    parser = argparse.ArgumentParser(description='AI Toolkit 训练脚本 - 中文版')

    # 至少需要一个配置文件
    parser.add_argument(
        'config_file_list',
        nargs='+',
        type=str,
        help='配置文件名 (例如: person_v1 对应 config/person_v1.json/yaml)，'
             '或完整路径（如果不在 config 文件夹中），'
             '您可以传递多个配置文件并按顺序运行'
    )

    # 失败后继续运行的标志
    parser.add_argument(
        '-r', '--recover',
        action='store_true',
        help='即使任务失败也继续运行其他任务'
    )

    # 名称替换标志
    parser.add_argument(
        '-n', '--name',
        type=str,
        default=None,
        help='替换配置文件中 [name] 标签的名称，对共享配置文件很有用'
    )
    
    # 日志文件参数
    parser.add_argument(
        '-l', '--log',
        type=str,
        default=None,
        help='要写入输出的日志文件路径'
    )
    
    args = parser.parse_args()
    
    # 设置日志文件（如果指定）
    if args.log is not None:
        setup_log_to_file(args.log)

    config_file_list = args.config_file_list
    if len(config_file_list) == 0:
        raise Exception("您必须提供至少一个配置文件")

    jobs_completed = 0  # 完成的任务计数
    jobs_failed = 0     # 失败的任务计数

    if accelerator.is_main_process:
        job_word = "个任务" if len(config_file_list) == 1 else "个任务"
        print_acc(f"开始运行 {len(config_file_list)} {job_word}")

    # 遍历每个配置文件并执行
    for config_file in config_file_list:
        try:
            # 获取并运行任务
            job = get_job(config_file, args.name)
            job.run()
            job.cleanup()
            jobs_completed += 1
            
        except Exception as e:
            print_acc(f"运行任务时出错: {e}")
            jobs_failed += 1
            try:
                # 尝试调用错误处理函数
                job.process[0].on_error(e)
            except Exception as e2:
                print_acc(f"运行错误处理时出错: {e2}")
            
            # 如果没有设置恢复标志，则停止执行
            if not args.recover:
                print_end_message(jobs_completed, jobs_failed)
                raise e
                
        except KeyboardInterrupt as e:
            print_acc("用户中断训练...")
            try:
                # 尝试调用错误处理函数
                job.process[0].on_error(e)
            except Exception as e2:
                print_acc(f"运行错误处理时出错: {e2}")
            
            # 如果没有设置恢复标志，则停止执行
            if not args.recover:
                print_end_message(jobs_completed, jobs_failed)
                raise e

    # 打印最终结果
    print_end_message(jobs_completed, jobs_failed)


if __name__ == '__main__':
    main()