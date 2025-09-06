/**
 * 新加坡中文本地化文件
 * Singapore Chinese Localization
 */

export const zhSG = {
  // 通用词汇
  common: {
    save: "保存",
    cancel: "取消", 
    confirm: "确认",
    delete: "删除",
    edit: "编辑",
    create: "创建",
    update: "更新",
    upload: "上传",
    download: "下载",
    start: "开始",
    stop: "停止",
    pause: "暂停",
    resume: "继续",
    yes: "是",
    no: "否",
    loading: "载入中...",
    success: "成功",
    error: "错误",
    warning: "警告",
    info: "信息",
    back: "返回",
    next: "下一步",
    previous: "上一步",
    finish: "完成",
    close: "关闭",
    required: "必填",
    optional: "可选",
    search: "搜索",
    filter: "筛选",
    settings: "设置",
    help: "帮助",
    documentation: "文档说明",
    showSimple: "显示简易模式",
    showAdvanced: "显示高级模式"
  },

  // 导航和布局
  navigation: {
    dashboard: "控制台",
    jobs: "训练任务",
    datasets: "数据集",
    settings: "系统设置",
    newJob: "新建训练",
    jobList: "任务列表"
  },

  // 训练任务相关
  jobs: {
    title: "AI 模型训练任务",
    newTrainingJob: "新建训练任务",
    editTrainingJob: "编辑训练任务",
    trainingName: "训练名称", 
    trainingNamePlaceholder: "请输入训练名称",
    trainingNameDescription: "训练任务的名称，将用于识别任务并作为最终模型的文件名。名称必须唯一，只能包含字母、数字、下划线和连字符，不允许空格或特殊字符。",
    
    // 任务状态
    status: {
      idle: "待机",
      preparing: "准备中",
      running: "运行中", 
      completed: "已完成",
      failed: "失败",
      cancelled: "已取消",
      saving: "保存中..."
    },

    // GPU 相关
    gpu: {
      title: "GPU 配置",
      gpuId: "GPU 编号",
      gpuIdDescription: "用于训练的 GPU。目前通过界面一次只能使用一个 GPU。但您可以同时启动多个任务，每个使用不同的 GPU。",
      noGpuAvailable: "没有可用的 GPU",
      gpuMemory: "显存",
      gpuUtilization: "GPU 使用率"
    },

    // 模型配置
    model: {
      title: "模型配置",
      architecture: "模型架构",
      modelPath: "模型路径",
      modelPathPlaceholder: "请输入模型路径或 HuggingFace 模型名称",
      triggerWord: "触发词",
      triggerWordPlaceholder: "例如：my_style",
      triggerWordDescription: "可选：这将是用于触发您的概念或角色的词语或标记。当使用触发词时，如果您的标题不包含触发词，它将自动添加到标题的开头。如果您没有标题，标题将变成仅仅是触发词。",
      
      // FLUX 模型
      flux: {
        title: "FLUX.1 模型",
        dev: "FLUX.1-dev (专业版)",
        schnell: "FLUX.1-schnell (快速版)",
        kontext: "FLUX.1-Kontext-dev (指令编辑版)"
      }
    },

    // 数据集配置
    datasets: {
      title: "数据集",
      selectDataset: "选择数据集",
      noDatasetAvailable: "没有可用的数据集",
      createDataset: "创建新数据集",
      uploadImages: "上传图像",
      imageCount: "图像数量",
      controlPath: "控制图像路径",
      controlPathDescription: "用于 Kontext 训练的配对数据集输入图像。这些是您想要更改的源图像。控制图像需要与文件夹路径中的文件名匹配，但在不同的文件夹中。",
      resolution: "训练分辨率",
      resolutionDescription: "图像将自动调整大小并分桶到指定的分辨率。",
      captionExtension: "标题文件扩展名",
      captionDropoutRate: "标题丢弃率",
      shuffleTokens: "打乱标记顺序",
      cacheLatents: "缓存潜在向量到磁盘"
    },

    // 训练配置
    training: {
      title: "训练参数",
      batchSize: "批量大小",
      steps: "训练步数",
      stepsDescription: "总训练步数。对于 LoRA 训练，500-4000 是一个好的范围。",
      learningRate: "学习率", 
      learningRateShort: "学习率",
      gradientAccumulation: "梯度累积步数",
      gradientCheckpointing: "梯度检查点",
      gradientCheckpointingDescription: "除非您有大量显存，否则需要启用此选项。",
      optimizer: "优化器",
      noiseScheduler: "噪声调度器",
      timestepType: "时间步类型",
      dtype: "数据类型",
      trainUnet: "训练 UNet",
      trainTextEncoder: "训练文本编码器",
      disableSampling: "禁用采样",
      skipFirstSample: "跳过首次采样"
    },

    // 网络配置 (LoRA)
    network: {
      title: "网络配置",
      networkType: "网络类型",
      loraRank: "LoRA 维度",
      loraAlpha: "LoRA Alpha",
      loraDescription: "LoRA (Low-Rank Adaptation) 是一种高效的微调方法，通过低维矩阵分解来减少训练参数。",
      convRank: "卷积层维度",
      convAlpha: "卷积层 Alpha"
    },

    // 保存配置
    save: {
      title: "保存设置",
      saveEvery: "保存间隔",
      saveEveryDescription: "每多少步保存一次模型检查点。",
      maxSaves: "最大保存数量",
      maxSavesDescription: "保留多少个中间保存文件。",
      outputFormat: "输出格式",
      pushToHub: "推送到 HuggingFace",
      hubRepoId: "HuggingFace 仓库 ID",
      hubPrivate: "私有仓库"
    },

    // 采样配置
    sampling: {
      title: "采样设置",
      sampleEvery: "采样间隔",
      sampleSteps: "采样步数",
      width: "宽度",
      height: "高度", 
      prompts: "测试提示词",
      promptsPlaceholder: "请输入测试提示词，每行一个",
      guidanceScale: "引导强度",
      seed: "随机种子",
      walkSeed: "步进种子"
    },

    // 量化配置
    quantization: {
      title: "量化设置",
      quantize: "启用量化",
      quantizeDescription: "运行 8 位混合精度以节省显存。",
      quantizeTextEncoder: "量化文本编码器",
      lowVram: "低显存模式",
      lowVramDescription: "如果 GPU 连接到显示器，请取消注释。它将使用更少的显存进行量化，但速度较慢。"
    }
  },

  // 数据集管理
  datasets: {
    title: "数据集管理",
    createNewDataset: "创建新数据集",
    datasetName: "数据集名称",
    datasetNamePlaceholder: "请输入数据集名称",
    uploadImages: "上传图像",
    selectImages: "选择图像文件",
    supportedFormats: "支持的格式：JPG, PNG, JPEG",
    imageCount: "图像数量",
    totalSize: "总大小",
    lastModified: "最后修改",
    deleteDataset: "删除数据集",
    confirmDelete: "确认删除",
    deleteConfirmMessage: "您确定要删除这个数据集吗？此操作无法撤销。",
    
    // 图像操作
    images: {
      addImage: "添加图像",
      removeImage: "移除图像",
      editCaption: "编辑标题",
      caption: "图像标题",
      captionPlaceholder: "请描述这张图像...",
      originalImage: "原始图像",
      controlImage: "控制图像",
      flipHorizontal: "水平翻转",
      flipVertical: "垂直翻转"
    }
  },

  // 系统设置
  settings: {
    title: "系统设置",
    general: "常规设置",
    paths: "路径配置",
    authentication: "身份验证",
    
    datasetsFolder: "数据集文件夹",
    outputFolder: "输出文件夹", 
    modelsFolder: "模型文件夹",
    
    authToken: "访问令牌",
    authTokenDescription: "用于访问受保护模型的 HuggingFace 令牌。",
    
    language: "界面语言",
    theme: "主题",
    autoSave: "自动保存",
    
    // 主题选项
    themes: {
      light: "浅色",
      dark: "深色", 
      auto: "跟随系统"
    },
    
    // 语言选项
    languages: {
      "en-US": "English (US)",
      "zh-SG": "中文（新加坡）",
      "zh-CN": "中文（简体）",
      "zh-TW": "中文（繁體）"
    }
  },

  // 错误和提示信息
  messages: {
    errors: {
      generic: "发生了未知错误",
      networkError: "网络连接错误",
      invalidInput: "输入无效",
      fileUploadFailed: "文件上传失败",
      insufficientMemory: "显存不足",
      modelLoadFailed: "模型加载失败",
      trainingFailed: "训练失败",
      saveFailed: "保存失败"
    },
    
    success: {
      saved: "保存成功",
      uploaded: "上传成功",
      trainingStarted: "训练已开始",
      trainingCompleted: "训练完成",
      modelSaved: "模型保存成功"
    },
    
    warnings: {
      unsavedChanges: "有未保存的更改",
      lowMemory: "显存不足，建议降低批量大小",
      longTraining: "训练时间可能较长，请耐心等待"
    },

    info: {
      preparing: "正在准备训练环境...",
      loading: "载入中，请稍候...",
      processing: "处理中...",
      initializing: "初始化中..."
    }
  },

  // 模型架构特定术语
  architectures: {
    flux: {
      name: "FLUX.1",
      description: "Black Forest Labs 开发的先进文本到图像生成模型",
      features: {
        dev: "专业版：最高质量，非商业许可",
        schnell: "快速版：Apache 2.0 许可，适合商业使用",
        kontext: "指令编辑版：支持自然语言图像编辑指令"
      }
    },
    
    sdxl: {
      name: "Stable Diffusion XL",
      description: "Stability AI 的高分辨率图像生成模型"
    },
    
    sd15: {
      name: "Stable Diffusion 1.5", 
      description: "经典的文本到图像生成模型"
    }
  },

  // 帮助和文档
  help: {
    gettingStarted: "入门指南",
    tutorials: "教程",
    faq: "常见问题",
    troubleshooting: "故障排除",
    contactSupport: "联系支持",
    
    quickStart: {
      title: "快速开始",
      step1: "1. 准备您的图像数据集",
      step2: "2. 创建新的训练任务",
      step3: "3. 配置训练参数",
      step4: "4. 开始训练并监控进度"
    }
  },

  // 时间和日期格式（新加坡习惯）
  time: {
    justNow: "刚刚",
    minutesAgo: "分钟前",
    hoursAgo: "小时前",
    daysAgo: "天前",
    format: "yyyy年MM月dd日 HH:mm" // 新加坡常用格式
  }
};

export type LocaleKeys = typeof zhSG;
export default zhSG;
