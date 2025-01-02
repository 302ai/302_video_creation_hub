# <p align="center"> 🔍 AI 视频素材创意站 🚀✨</p>

<p align="center">AI视频素材创意站通过用户提供的主题信息，结合AI大语言模型生成高质量的文案和关键词，并根据这些信息将各种视频素材进行组合拼接，还可以附带字幕和背景音乐。</p>

<p align="center"><a href="https://302.ai/tools/video/" target="blank"><img src="https://file.302.ai/gpt/imgs/github/20250102/72a57c4263944b73bf521830878ae39a.png" /></a></p >

<p align="center"><a href="README_zh.md">中文</a> | <a href="README.md">English</a> | <a href="README_ja.md">日本語</a></p>



来自[302.AI](https://302.ai)的[AI音乐制作](https://302.ai/tools/video/)的开源版本。你可以直接登录302.AI，零代码零配置使用在线版本。或者对本项目根据自己的需求进行修改，传入302.AI的API KEY，自行部署。



## 📖 项目介绍

这是一个功能丰富的 Next.js 启动模板，采用了 App Router 架构，集成了302AI鉴权、国际化、主题切换、表单处理等多个实用功能。项目使用 TypeScript 开发，确保了代码的类型安全性和可维护性。

## 📁 项目结构

```
src/
├── actions/      # 服务器操作
├── api/          # API 路由
├── app/          # Next.js 应用路由
├── components/   # React 组件
├── constants/    # 常量定义
├── hooks/        # 自定义 React Hooks
├── i18n/         # 国际化配置
├── lib/          # 工具库
├── services/     # 服务层
├── stores/       # 状态管理
├── styles/       # 样式文件
└── utils/        # 工具函数
```

## 🛠️ 技术栈

- **框架**: Next.js 14
- **语言**: TypeScript
- **样式**: TailwindCSS
- **UI组件**: Radix UI
- **状态管理**: Jotai
- **表单处理**: React Hook Form
- **HTTP客户端**: ky
- **国际化**: next-intl
- **主题**: next-themes
- **代码规范**: ESLint, Prettier
- **提交规范**: Husky, Commitlint

## 🚀 安装与启动

### ⚙️ 环境要求

- Node.js 18.17 或更高版本
- pnpm 8.0 或更高版本

### 📥 安装步骤

1. 克隆项目
```bash
git clone [项目地址]
cd 302-starter
```

2. 安装依赖
```bash
pnpm install
```

3. 环境配置
```bash
cp .env.example .env.local
```
根据需要修改 `.env.local` 中的环境变量。

4. 启动开发服务器
```bash
pnpm dev
```

5. 构建生产版本
```bash
pnpm build
pnpm start
```


## ✨ 302.AI介绍 ✨
[302.AI](https://302.ai)是一个面向企业的AI应用平台，按需付费，开箱即用，开源生态。✨
1. 🧠 集合了最新最全的AI能力和品牌，包括但不限于语言模型、图像模型、声音模型、视频模型。
2. 🚀 在基础模型上进行深度应用开发，我们开发真正的AI产品，而不是简单的对话机器人
3. 💰 零月费，所有功能按需付费，全面开放，做到真正的门槛低，上限高。
4. 🛠 功能强大的管理后台，面向团队和中小企业，一人管理，多人使用。
5. 🔗 所有AI能力均提供API接入，所有工具开源可自行定制（进行中）。
6. 💡 强大的开发团队，每周推出2-3个新应用，产品每日更新。有兴趣加入的开发者也欢迎联系我们
