<!-- 横幅图片 -->

<p align="center">
  <a href="https://expo.dev/">
    <img alt="Expo 标志" height="128" src="https://raw.githubusercontent.com/expo/expo/main/.github/resources/banner.png">
    <h1 align="center">Expo</h1>
  </a>
</p>

<p align="center">
   <a aria-label="SDK 版本" href="https://www.npmjs.com/package/expo" target="_blank">
    <img alt="Expo SDK 版本" src="https://img.shields.io/npm/v/expo.svg?style=flat-square&label=SDK&labelColor=000000&color=4630EB" />
  </a>
  <a aria-label="与我们聊天或提问" href="https://chat.expo.dev" target="_blank">
    <img alt="与我们聊天或提问" src="https://img.shields.io/discord/695411232856997968.svg?style=flat-square&labelColor=000000&color=4630EB&logo=discord&logoColor=FFFFFF&label=Chat%20with%20us" />
  </a>
  <a aria-label="Expo 可免费使用" href="https://github.com/expo/expo/blob/main/LICENSE" target="_blank">
    <img alt="许可证：MIT" src="https://img.shields.io/badge/License-MIT-success.svg?style=flat-square&color=33CC12" target="_blank" />
  </a>
  <a aria-label="expo 下载量" href="http://www.npmtrends.com/expo" target="_blank">
    <img alt="下载量" src="https://img.shields.io/npm/dm/expo.svg?style=flat-square&labelColor=gray&color=33CC12&label=Downloads" />
  </a>
</p>

<p align="center">
  <a aria-label="使用 Snack 试用 Expo" href="https://snack.expo.dev"><b>在浏览器中试用 Expo</b></a>
&ensp;•&ensp;
  <a aria-label="Expo 文档" href="https://docs.expo.dev">阅读文档</a>
&ensp;•&ensp;
  <a aria-label="Expo 文档" href="https://expo.dev/blog">在我们的博客中了解更多</a>
&ensp;•&ensp;
  <a aria-label="Expo 文档" href="https://expo.canny.io/feature-requests">提交功能建议</a>
</p>

<h6 align="center">关注我们</h6>
<p align="center">
  <a aria-label="在 X 上关注 @expo" href="https://x.com/intent/follow?screen_name=expo" target="_blank">
    <img alt="Expo 在 X" src="https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white" target="_blank" />
  </a>&nbsp;
  <a aria-label="在 GitHub 上关注 @expo" href="https://github.com/expo" target="_blank">
    <img alt="Expo 在 GitHub" src="https://img.shields.io/badge/GitHub-222222?style=for-the-badge&logo=github&logoColor=white" target="_blank" />
  </a>&nbsp;
  <a aria-label="在 Reddit 上关注 @expo" href="https://www.reddit.com/r/expo/" target="_blank">
    <img alt="Expo 在 Reddit" src="https://img.shields.io/badge/Reddit-FF4500?style=for-the-badge&logo=reddit&logoColor=white" target="_blank" />
  </a>&nbsp;
  <a aria-label="在 Bluesky 上关注 @expo" href="https://bsky.app/profile/expo.dev" target="_blank">
    <img alt="Expo 在 Bluesky" src="https://img.shields.io/badge/Bluesky-1DA1F2?style=for-the-badge&logo=bluesky&logoColor=white" target="_blank" />
  </a>&nbsp;
  <a aria-label="在 LinkedIn 上关注 @expo" href="https://www.linkedin.com/company/expo-dev" target="_blank">
    <img alt="Expo 在 LinkedIn" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank" />
  </a>
</p>

## 简介

Expo 是一个开源平台，用于构建可运行在 Android、iOS 和 Web 上的通用原生应用。它包含一套通用运行时和库，让你只需编写 React 和 JavaScript 即可构建原生应用。

本仓库包含 Expo SDK、Modules API、Go 应用、CLI、Router、文档以及其它各种辅助工具。[Expo Application Services（EAS）](https://expo.dev/eas) 是一个托管服务平台，与 Expo 开源工具深度集成，可帮助个人或团队构建、发布并持续迭代你的应用。

在参与本仓库之前，请先阅读 [Expo 社区准则](https://expo.dev/guidelines)。感谢你帮助维护 Expo 社区的开放与友好！

## 目录

- [📚 文档](#-文档)
- [🗺 项目结构](#-项目结构)
- [🏅 徽章](#-徽章)
- [👏 贡献](#-贡献)
- [❓ 常见问题](#-常见问题)
- [💙 团队成员](#-团队成员)
- [许可证](#许可证)

## 📚 文档

<p>了解如何构建和部署通用应用，<a aria-label="Expo 文档" href="https://docs.expo.dev">请查阅我们的官方文档！</a></p>

- [快速开始](https://docs.expo.dev/)
- [API 参考](https://docs.expo.dev/versions/latest/)
- [使用自定义原生模块](https://docs.expo.dev/workflow/customizing/)

## 🗺 项目结构

- [`packages`](https://github.com/expo/expo/tree/main/packages) Expo 模块的全部源代码，如果你想修改某个库或了解其工作原理，就在这里找。
- [`apps`](https://github.com/expo/expo/tree/main/apps) 这里可以找到与开发模块关联的 Expo 项目，你的大部分测试都会在这里进行。
- [`apps/expo-go`](https://github.com/expo/expo/tree/main/apps/expo-go) 这里可以找到 Expo Go 的源代码。
- [`apps/expo-go/ios/Exponent.xcworkspace`](https://github.com/expo/expo/tree/main/apps/expo-go/ios) 是 Xcode workspace。开发 iOS 时，请始终打开它，而不是 `Exponent.xcodeproj`，因为 workspace 还会加载 CocoaPods 依赖。
- [`docs`](https://github.com/expo/expo/tree/main/docs) **https://docs.expo.dev** 的源代码
- [`templates`](https://github.com/expo/expo/tree/main/templates) 运行 `npx create-expo-app` 时获取到的模板项目
- [`react-native-lab`](https://github.com/expo/expo/tree/main/react-native-lab) 我们用于构建 Expo Go 的 `react-native` 分支
- [`guides`](https://github.com/expo/expo/tree/main/guides) 关于贡献客户端等高级主题的深入教程
- [`tools`](https://github.com/expo/expo/tree/main/tools) 包含构建和配置工具
- [`template-files`](https://github.com/expo/expo/tree/main/template-files) 包含需要私钥的文件的模板，使用 `template-files/keys.json` 中的密钥填充。
- [`template-files/ios/dependencies.json`](https://github.com/expo/expo/blob/main/template-files/ios/dependencies.json) 指定了应用的 CocoaPods 依赖。

## 🏅 徽章

让所有人知道你的应用可以在 _Expo Go_ 应用中即时运行！
<br/>

[![runs with Expo Go](https://img.shields.io/badge/Runs%20with%20Expo%20Go-000.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.dev/client)

[![runs with Expo Go](https://img.shields.io/badge/Runs%20with%20Expo%20Go-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.dev/client)

```md
[![runs with Expo Go](https://img.shields.io/badge/Runs%20with%20Expo%20Go-000.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.dev/client)

[![runs with Expo Go](https://img.shields.io/badge/Runs%20with%20Expo%20Go-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.dev/client)
```

## 👏 贡献

如果你喜欢 Expo 并希望让它变得更好，请查看我们的[贡献指南](https://github.com/expo/expo/blob/main/CONTRIBUTING.md)！想参与 Expo CLI 的开发，可以查看 [CLI 包](https://github.com/expo/expo/tree/main/packages/%40expo/cli)。

## ❓ 常见问题

如果你对 Expo 有疑问并想找到答案，请查看我们的[常见问题解答](https://docs.expo.dev/faq/)！

如果仍有疑问，可以在我们的 [Discord 和论坛](https://chat.expo.dev) 或 X [@expo](https://x.com/expo) 上提问。

## 💙 团队成员

好奇是谁在打造 Expo？这里是我们的[团队成员](https://expo.dev/about)！

## 许可证

Expo 的源代码基于 [MIT 许可证](https://github.com/expo/expo/blob/main/LICENSE) 提供。部分依赖的许可证有所不同，例如 BSD 许可证。

<img alt="在 GitHub 上给 Expo 仓库点 Star 以支持该项目" src="https://user-images.githubusercontent.com/9664363/185428788-d762fd5d-97b3-4f59-8db7-f72405be9677.gif" width="50%">
