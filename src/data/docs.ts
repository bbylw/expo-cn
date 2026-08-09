export interface DocSection {
  title: string;
  items: DocItem[];
}

export interface DocItem {
  slug: string;
  title: string;
  content: string;
}

export const SDK_VERSION = 'SDK 57';

export const docSections: DocSection[] = [
  {
    title: '快速入门',
    items: [
      {
        slug: 'introduction',
        title: 'Expo 简介',
        content: `
# Expo 简介

Expo 是一个开源的 React Native 应用框架，让你使用 JavaScript 和 React 构建可在 Android、iOS 和 Web 上运行的通用原生应用。

## 什么是 Expo？

Expo 提供了一套完整的工具和库生态系统，帮助你：

- **使用 JavaScript/TypeScript 构建应用**：无需编写原生代码即可创建功能丰富的移动应用
- **跨平台运行**：一套代码同时运行在 iOS、Android 和 Web 端
- **快速开发迭代**：内置热重载（Hot Reload）、快速刷新（Fast Refresh）等开发工具
- **轻松部署**：通过 EAS（Expo Application Services）简化构建和发布流程

## 核心特性

### 通用应用开发
编写一次代码，即可在多个平台上运行。Expo 的通用 API 让你能够充分利用各平台的原生功能，同时保持代码的一致性。

### Expo Router
基于文件系统的路由方案，受 Next.js 启发。将文件放入 \`app/\` 目录即可自动创建路由，支持深度链接和搜索引擎优化。

### 丰富的原生模块
Expo SDK 提供了大量预构建的原生模块，涵盖相机、位置、通知、文件系统等功能，无需手动编写原生代码。

### 开发客户端（Development Build）
当需要使用自定义原生代码时，开发客户端让你保持 Expo 工作流的同时集成任何原生库。

### EAS（Expo Application Services）
一套云端服务，包括：
- **EAS Build**：云端构建 Android 和 iOS 应用
- **EAS Submit**：一键提交到 App Store 和 Google Play
- **EAS Update**：推送 OTA 更新，无需重新提交应用商店

## 适用场景

Expo 适合各种规模的应用开发：

- 快速原型开发和 MVP 构建
- 企业内部应用和工具
- 面向消费者的生产级应用
- 跨平台 Web 应用
- 从现有 React 项目扩展到移动端

## 版本信息

当前最新版本为 **${SDK_VERSION}**，Expo 每年发布三个主要版本。
`
      },
      {
        slug: 'installation',
        title: '安装与环境配置',
        content: `
# 安装与环境配置

本指南将帮助你配置开发环境，准备构建第一个 Expo 应用。

## 前置要求

在开始之前，请确保你的开发环境满足以下条件：

- **Node.js**：需要 LTS 版本（18 或更高）
- **操作系统**：Windows 10/11、macOS 或 Linux
- **Git**：用于版本控制

## 创建新项目

使用 \`create-expo-app\` 命令创建一个新的 Expo 项目：

\`\`\`bash
npx create-expo-app@latest my-app
cd my-app
\`\`\`

这将使用默认模板创建一个新的 Expo 项目。你也可以指定模板：

\`\`\`bash
# 使用空白 TypeScript 模板
npx create-expo-app@latest my-app --template blank-typescript

# 使用带标签导航的模板
npx create-expo-app@latest my-app --template tabs

# 使用空白模板（JavaScript）
npx create-expo-app@latest my-app --template blank
\`\`\`

## 启动开发服务器

项目创建后，启动开发服务器：

\`\`\`bash
cd my-app
npx expo start
\`\`\`

这将启动 Metro 开发服务器，并显示一个二维码。

## 在设备上运行

### 使用 Expo Go（推荐初学者）

1. 在手机上安装 **Expo Go** 应用（iOS App Store / Android Google Play）
2. 打开手机上的 Expo Go 应用
3. 扫描终端中的二维码（Android）或使用相机应用扫描（iOS）
4. 应用将自动加载并运行

### 使用模拟器/仿真器

- **iOS**：在 macOS 上按 \`i\` 键打开 iOS 模拟器
- **Android**：按 \`a\` 键打开 Android 模拟器（需提前配置）
- **Web**：按 \`w\` 键在浏览器中打开

## Android 环境配置

### 使用 Expo Go
从 Google Play 商店安装 Expo Go 应用即可开始开发。

### 本地构建配置

**Windows 用户：**
\`\`\`powershell
# 安装 Chocolatey（如未安装）
# 安装 JDK
choco install microsoft-openjdk17
\`\`\`

**macOS 用户：**
\`\`\`bash
brew install --cask zulu@17
brew install watchman
\`\`\`

安装 Android Studio 并配置：
1. 下载安装 Android Studio
2. 选择 "Android SDK Platform 36" 安装
3. 安装 Android SDK Build-Tools
4. 配置 \`ANDROID_HOME\` 环境变量

## iOS 环境配置

> 注意：iOS 开发仅支持 macOS

1. 从 App Store 安装 **Xcode**
2. 安装命令行工具：
\`\`\`bash
xcode-select --install
\`\`\`
3. 打开 Xcode 并接受许可协议
4. 安装 iOS 模拟器：Xcode → Settings → Platforms → 添加 iOS

## 验证安装

运行以下命令验证环境是否配置正确：

\`\`\`bash
npx expo-doctor
\`\`\`

此工具将检查你的环境并报告任何问题。
`
      },
      {
        slug: 'project-structure',
        title: '项目结构',
        content: `
# 项目结构

了解 Expo 项目的目录结构和各文件的用途。

## 典型项目结构

\`\`\`
my-app/
├── app/                   # Expo Router 页面和布局
│   ├── (tabs)/            # 标签导航组
│   │   ├── _layout.tsx    # 标签导航布局
│   │   ├── index.tsx      # 首页标签
│   │   └── explore.tsx    # 探索标签
│   ├── _layout.tsx        # 根布局
│   └── +not-found.tsx     # 404 页面
├── assets/                # 静态资源（图片、字体等）
├── components/            # 可复用 UI 组件
├── constants/             # 常量定义（颜色等）
├── hooks/                 # 自定义 React Hooks
├── scripts/               # 构建和工具脚本
├── app.json               # 应用配置
├── package.json           # 项目依赖
└── tsconfig.json          # TypeScript 配置
\`\`\`

## 核心文件说明

### \`app.json\` — 应用配置

这是 Expo 的核心配置文件，定义了应用的名称、图标、启动画面等：

\`\`\`json
{
  "expo": {
    "name": "my-app",
    "slug": "my-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/images/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.myapp"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.yourcompany.myapp"
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": ["expo-router"],
    "experiments": {
      "typedRoutes": true
    }
  }
}
\`\`\`

### \`app/\` 目录 — 路由页面

Expo Router 使用基于文件系统的路由。\`app/\` 目录中的每个文件都会自动成为一个路由：

| 文件 | 路由 | 说明 |
|------|------|------|
| \`app/index.tsx\` | \`/\` | 首页 |
| \`app/about.tsx\` | \`/about\` | 关于页面 |
| \`app/(tabs)/_layout.tsx\` | — | 标签导航布局 |
| \`app/[id].tsx\` | \`/:id\` | 动态路由 |
| \`app/+not-found.tsx\` | — | 自定义 404 页面 |

### \`package.json\` — 依赖管理

\`\`\`json
{
  "name": "my-app",
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~57.0.11",
    "expo-router": "~57.0.11",
    "react": "19.2.3",
    "react-native": "0.86.2"
  }
}
\`\`\`

## 特殊文件

### \`_layout.tsx\` — 布局文件

布局文件包裹同一目录下的所有页面，用于创建导航结构：

\`\`\`tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return <Stack />;
}
\`\`\`

### \`+not-found.tsx\` — 404 页面

当用户导航到不存在的路由时显示：

\`\`\`tsx
import { Link, Stack } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: '页面未找到' }} />
      <Link href="/">返回首页</Link>
    </>
  );
}
\`\`\`
`
      }
    ]
  },
  {
    title: '核心概念',
    items: [
      {
        slug: 'expo-router',
        title: 'Expo Router 路由',
        content: `
# Expo Router

Expo Router 是 React Native 和 Expo 应用的文件系统路由框架。它将 Web 的路由理念带入原生应用开发。

## 核心理念

Expo Router 基于文件系统路由——\`app/\` 目录中的文件结构直接映射为应用的导航结构。

### 为什么选择文件系统路由？

- **直观易用**：文件结构即路由结构，无需手动配置
- **深度链接**：每个页面都自动支持深度链接
- **类型安全**：自动生成路由类型定义
- **代码分割**：按需加载页面组件
- **SEO 友好**：支持 Web 端的静态渲染

## 基础路由

### 页面路由

在 \`app/\` 目录中创建文件即可定义路由：

\`\`\`
app/
├── index.tsx      → /
├── about.tsx      → /about
├── settings.tsx   → /settings
└── profile/
    ├── index.tsx  → /profile
    └── edit.tsx   → /profile/edit
\`\`\`

### 动态路由

使用方括号 \`[]\` 定义动态路由段：

\`\`\`tsx
// app/user/[id].tsx
import { useLocalSearchParams } from 'expo-router';

export default function UserScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <Text>用户 ID: {id}</Text>;
}
\`\`\`

### 通配符路由

使用 \`[...rest]\` 匹配任意深度的路径：

\`\`\`tsx
// app/docs/[...rest].tsx
import { useLocalSearchParams } from 'expo-router';

export default function DocsScreen() {
  const { rest } = useLocalSearchParams<{ rest: string[] }>();
  // rest = ["getting-started", "installation"]
  // 匹配 /docs/getting-started/installation
  return <Text>路径: {rest?.join('/')}</Text>;
}
\`\`\`

## 导航

### 声明式导航

使用 \`Link\` 组件进行声明式导航：

\`\`\`tsx
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View>
      <Link href="/about">关于我们</Link>
      <Link href={{ pathname: '/user/[id]', params: { id: '123' } }}>
        用户 123
      </Link>
    </View>
  );
}
\`\`\`

### 编程式导航

使用 \`router\` 对象进行编程式导航：

\`\`\`tsx
import { router } from 'expo-router';

function handlePress() {
  // 导航到新页面（保留历史记录）
  router.push('/settings');

  // 替换当前页面
  router.replace('/login');

  // 返回上一页
  router.back();

  // 导航到指定参数页面
  router.push({
    pathname: '/user/[id]',
    params: { id: '123' },
  });
}
\`\`\`

## 布局

### Stack 布局

堆栈导航，支持页面间的推入/弹出：

\`\`\`tsx
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: '#4630EB' },
      headerTintColor: '#fff',
    }}>
      <Stack.Screen name="index" options={{ title: '首页' }} />
      <Stack.Screen name="about" options={{ title: '关于' }} />
    </Stack>
  );
}
\`\`\`

### Tabs 布局

底部标签导航：

\`\`\`tsx
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: '首页',
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: '探索',
          tabBarIcon: ({ color }) => <ExploreIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
\`\`\`

### Drawer 布局

侧边抽屉导航：

\`\`\`tsx
// app/_layout.tsx
import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  return <Drawer />;
}
\`\`\`

## 路由组

使用括号 \`(groupName)\` 组织路由而不影响 URL 路径：

\`\`\`
app/
├── (auth)/
│   ├── _layout.tsx    # 认证流程布局
│   ├── login.tsx      → /login
│   └── register.tsx   → /register
├── (tabs)/
│   ├── _layout.tsx    # 主应用布局
│   ├── index.tsx      → /
│   └── profile.tsx    → /profile
└── _layout.tsx        # 根布局
\`\`\`
`
      },
      {
        slug: 'styling',
        title: '样式与布局',
        content: `
# 样式与布局

Expo 和 React Native 使用 \`StyleSheet\` 进行样式定义，采用 Flexbox 布局模型。

## StyleSheet

React Native 的样式系统与 CSS 非常相似，但使用 JavaScript 对象定义：

\`\`\`tsx
import { StyleSheet, View, Text } from 'react-native';

export default function MyComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello Expo</Text>
      <Text style={styles.subtitle}>欢迎使用 Expo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4630EB',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
});
\`\`\`

## Flexbox 布局

React Native 完全基于 Flexbox 布局。主要属性包括：

### flex 方向

\`\`\`tsx
// 默认：纵向排列（column）
<View style={{ flexDirection: 'column' }}>
  <View style={{ width: 50, height: 50, backgroundColor: 'red' }} />
  <View style={{ width: 50, height: 50, backgroundColor: 'blue' }} />
</View>

// 横向排列
<View style={{ flexDirection: 'row' }}>
  <View style={{ width: 50, height: 50, backgroundColor: 'red' }} />
  <View style={{ width: 50, height: 50, backgroundColor: 'blue' }} />
</View>
\`\`\`

### 对齐方式

\`\`\`tsx
<View style={{
  flex: 1,
  justifyContent: 'center', // 主轴对齐
  alignItems: 'center',     // 交叉轴对齐
}}>
  <Text>居中内容</Text>
</View>
\`\`\`

### flex 属性

\`\`\`tsx
<View style={{ flexDirection: 'row', height: 200 }}>
  <View style={{ flex: 1, backgroundColor: 'red' }} />    {/* 占 1/3 */}
  <View style={{ flex: 2, backgroundColor: 'blue' }} />   {/* 占 2/3 */}
</View>
\`\`\`

## 安全区域

使用 \`SafeAreaView\` 避免内容被刘海屏、底部手势条等遮挡：

\`\`\`tsx
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text>安全的内容区域</Text>
      </View>
    </SafeAreaView>
  );
}
\`\`\`

## 平台特定样式

使用 \`Platform\` API 针对不同平台应用不同样式：

\`\`\`tsx
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 44 : 0,
    backgroundColor: Platform.select({
      ios: '#f0f0f0',
      android: '#e0e0e0',
      web: '#ffffff',
    }),
  },
});
\`\`\`

## 使用 NativeWind（Tailwind CSS）

Expo 支持通过 NativeWind 使用 Tailwind CSS 风格的样式：

\`\`\`bash
npx expo install nativewind tailwindcss@3.3.2
\`\`\`

\`\`\`tsx
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-bold text-blue-600">
        Hello NativeWind!
      </Text>
    </View>
  );
}
\`\`\`

## 响应式设计

使用 \`Dimensions\` 或 \`useWindowDimensions\` 实现响应式布局：

\`\`\`tsx
import { useWindowDimensions, View, Text } from 'react-native';

export default function ResponsiveComponent() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;

  return (
    <View style={{
      flexDirection: isLargeScreen ? 'row' : 'column',
      padding: isLargeScreen ? 32 : 16,
    }}>
      <Text>{isLargeScreen ? '大屏布局' : '小屏布局'}</Text>
    </View>
  );
}
\`\`\`
`
      },
      {
        slug: 'navigation',
        title: '导航与页面',
        content: `
# 导航与页面

深入了解 Expo Router 的导航机制和页面管理。

## 页面生命周期

Expo Router 中的页面遵循 React 的标准生命周期：

\`\`\`tsx
import { useEffect } from 'react';
import { useFocusEffect } from 'expo-router';

export default function MyPage() {
  // 组件挂载时执行
  useEffect(() => {
    console.log('页面已加载');
    return () => console.log('页面已卸载');
  }, []);

  // 页面获得焦点时执行（每次进入页面）
  useFocusEffect(() => {
    console.log('页面获得焦点');
    return () => console.log('页面失去焦点');
  });

  return <Text>我的页面</Text>;
}
\`\`\`

## 搜索参数

页面可以接收 URL 中的查询参数：

\`\`\`tsx
// 导航：/search?q=expo&type=docs
import { useLocalSearchParams } from 'expo-router';

export default function SearchScreen() {
  const { q, type } = useLocalSearchParams<{
    q: string;
    type: string;
  }>();

  return <Text>搜索: {q} (类型: {type})</Text>;
}
\`\`\`

## 导航事件

监听导航相关事件：

\`\`\`tsx
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';

export default function MyPage() {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // 页面获得焦点
    });
    return unsubscribe;
  }, [navigation]);

  return <View />;
}
\`\`\`

## 模态页面（Modal）

将页面标记为模态展示：

\`\`\`tsx
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
\`\`\`

## 自定义返回按钮

覆盖默认的返回行为：

\`\`\`tsx
import { Stack, router } from 'expo-router';

export default function SettingsScreen() {
  return (
    <Stack.Screen
      options={{
        title: '设置',
        headerLeft: () => (
          <Button
            title="关闭"
            onPress={() => router.dismiss()}
          />
        ),
      }}
    />
  );
}
\`\`\`

## 嵌套路由

创建嵌套的路由结构：

\`\`\`
app/
├── settings/
│   ├── _layout.tsx     → 设置区域布局
│   ├── index.tsx       → /settings
│   ├── account.tsx     → /settings/account
│   └── notifications.tsx → /settings/notifications
└── _layout.tsx         → 根布局
\`\`\`
`
      }
    ]
  },
  {
    title: 'API 参考',
    items: [
      {
        slug: 'api-camera',
        title: 'Camera 相机',
        content: `
# expo-camera

使用设备的摄像头拍照和录像。

## 安装

\`\`\`bash
npx expo install expo-camera
\`\`\`

## 基本使用

\`\`\`tsx
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, View } from 'react-native';

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View>
        <Text>需要相机权限</Text>
        <Button onPress={requestPermission} title="授予权限" />
      </View>
    );
  }

  return (
    <CameraView
      style={{ flex: 1 }}
      facing={facing}
      ref={(ref) => { cameraRef = ref; }}
    >
      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
        <Button
          title="翻转"
          onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}
        />
      </View>
    </CameraView>
  );
}
\`\`\`

## 拍照

\`\`\`tsx
const takePicture = async () => {
  if (cameraRef) {
    const photo = await cameraRef.takePictureAsync({
      quality: 0.8,
      base64: true,
    });
    console.log('照片 URI:', photo.uri);
  }
};
\`\`\`

## 录制视频

\`\`\`tsx
// 开始录制
const startRecording = async () => {
  const video = await cameraRef.recordAsync({
    maxDuration: 30,
  });
  console.log('视频 URI:', video.uri);
};

// 停止录制
cameraRef.stopRecording();
\`\`\`

## API 参考

### CameraView Props

| 属性 | 类型 | 说明 |
|------|------|------|
| \`facing\` | \`'front' \\| 'back'\` | 使用前置或后置摄像头 |
| \`flash\` | \`'on' \\| 'off' \\| 'auto'\` | 闪光灯模式 |
| \`zoom\` | \`number\` | 缩放比例（0 到 1） |
| \`ratio\` | \`string\` | 宽高比（如 \`'4:3'\`） |

### takePictureAsync 选项

| 选项 | 类型 | 说明 |
|------|------|------|
| \`quality\` | \`number\` | JPEG 质量（0-1） |
| \`base64\` | \`boolean\` | 是否返回 base64 编码 |
| \`exif\` | \`boolean\` | 是否包含 EXIF 数据 |
| \`skipProcessing\` | \`boolean\` | 跳过后处理（更快） |
`
      },
      {
        slug: 'api-notifications',
        title: 'Notifications 通知',
        content: `
# expo-notifications

处理本地和推送通知。

## 安装

\`\`\`bash
npx expo install expo-notifications expo-device expo-constants
\`\`\`

## 请求通知权限

\`\`\`tsx
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

async function registerForPushNotifications() {
  if (!Device.isDevice) {
    console.log('推送通知需要真机设备');
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('未获得推送通知权限');
    return;
  }

  // 获取推送令牌
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log('推送令牌:', token);
  return token;
}
\`\`\`

## 发送本地通知

\`\`\`tsx
import * as Notifications from 'expo-notifications';

// 配置通知处理行为
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// 发送本地通知
async function scheduleNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "你好！👋",
      body: "这是一条来自 Expo 的通知",
      data: { screen: 'details' },
    },
    trigger: {
      seconds: 5, // 5 秒后触发
    },
  });
}

// 定时通知（每天上午 9 点）
await Notifications.scheduleNotificationAsync({
  content: {
    title: "每日提醒",
    body: "该检查项目进度了",
  },
  trigger: {
    type: 'daily',
    hour: 9,
    minute: 0,
  },
});
\`\`\`

## 监听通知

\`\`\`tsx
import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';

export default function App() {
  useEffect(() => {
    // 监听通知响应
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data;
        if (data.screen) {
          router.push(data.screen);
        }
      }
    );

    return () => subscription.remove();
  }, []);

  return <View />;
}
\`\`\`

## 配置通知图标（Android）

在 \`app.json\` 中配置 Android 通知图标：

\`\`\`json
{
  "expo": {
    "notification": {
      "icon": "./assets/notification-icon.png",
      "color": "#4630EB"
    }
  }
}
\`\`\`
`
      },
      {
        slug: 'api-image',
        title: 'Image 图片处理',
        content: `
# expo-image

高性能图片组件，支持缓存、占位图和过渡动画。

## 安装

\`\`\`bash
npx expo install expo-image
\`\`\`

## 基本使用

\`\`\`tsx
import { Image } from 'expo-image';

export default function App() {
  return (
    <Image
      source="https://picsum.photos/seed/696/300/200"
      style={{ width: 300, height: 200, borderRadius: 8 }}
      contentFit="cover"
      transition={500}
    />
  );
}
\`\`\`

## 本地图片

\`\`\`tsx
import { Image } from 'expo-image';

// 从项目资源加载
<Image source={require('./assets/my-image.png')} />

// 从 assets 目录加载
<Image source={{ uri: '/assets/images/photo.jpg' }} />
\`\`\`

## contentFit 模式

| 值 | 说明 |
|------|------|
| \`cover\` | 保持比例填满容器（可能裁剪） |
| \`contain\` | 保持比例完整显示 |
| \`fill\` | 拉伸填满容器 |
| \`none\` | 保持原始尺寸 |

## 占位图和过渡

\`\`\`tsx
<Image
  source="https://example.com/large-image.jpg"
  placeholder={{ blurhash: 'LEHV6nWB2yk8pyo0adR*.7kCMdnj' }}
  transition={{ duration: 300, timing: 'ease-in-out' }}
  style={{ width: 300, height: 200 }}
/>
\`\`\`

## 缓存控制

\`\`\`tsx
<Image
  source="https://example.com/image.jpg"
  cachePolicy="memory-disk"
  style={{ width: 200, height: 200 }}
/>
\`\`\`

缓存策略：
- \`memory\`：仅内存缓存
- \`disk\`：仅磁盘缓存
- \`memory-disk\`：内存 + 磁盘（推荐）
- \`none\`：不缓存
`
      },
      {
        slug: 'api-file-system',
        title: 'FileSystem 文件系统',
        content: `
# expo-file-system

提供对设备文件系统的访问，支持读写文件、创建目录等操作。

## 安装

\`\`\`bash
npx expo install expo-file-system
\`\`\`

## 基本操作

### 读取文件

\`\`\`tsx
import * as FileSystem from 'expo-file-system';

async function readFile() {
  const content = await FileSystem.readAsStringAsync(
    FileSystem.documentDirectory + 'myFile.txt'
  );
  console.log('文件内容:', content);
}
\`\`\`

### 写入文件

\`\`\`tsx
async function writeFile() {
  await FileSystem.writeAsStringAsync(
    FileSystem.documentDirectory + 'myFile.txt',
    'Hello Expo! 你好世界！',
    { encoding: FileSystem.EncodingType.UTF8 }
  );
}
\`\`\`

### 创建目录

\`\`\`tsx
async function createDir() {
  await FileSystem.makeDirectoryAsync(
    FileSystem.documentDirectory + 'myFolder',
    { intermediates: true }
  );
}
\`\`\`

### 列出目录

\`\`\`tsx
async function listFiles() {
  const files = await FileSystem.readDirectoryAsync(
    FileSystem.documentDirectory
  );
  console.log('文件列表:', files);
}
\`\`\`

### 下载文件

\`\`\`tsx
async function downloadFile() {
  const result = await FileSystem.downloadAsync(
    'https://example.com/image.jpg',
    FileSystem.documentDirectory + 'downloaded.jpg'
  );
  console.log('下载完成:', result.uri);
}
\`\`\`

### 文件信息

\`\`\`tsx
async function getFileInfo() {
  const info = await FileSystem.getInfoAsync(
    FileSystem.documentDirectory + 'myFile.txt'
  );
  if (info.exists) {
    console.log('大小:', info.size);
    console.log('修改时间:', info.modificationTime);
  }
}
\`\`\`

## 目录常量

| 常量 | 说明 |
|------|------|
| \`documentDirectory\` | 应用文档目录（持久化） |
| \`cacheDirectory\` | 缓存目录（可能被系统清理） |
| \`bundleDirectory\` | 应用包目录（只读） |
`
      }
    ]
  },
  {
    title: '进阶指南',
    items: [
      {
        slug: 'eas-build',
        title: 'EAS Build 云端构建',
        content: `
# EAS Build

EAS Build 是 Expo 提供的云端构建服务，无需本地配置原生开发环境即可构建 Android 和 iOS 应用。

## 安装 EAS CLI

\`\`\`bash
npm install -g eas-cli
\`\`\`

## 登录

\`\`\`bash
eas login
\`\`\`

## 配置构建

初始化 EAS 构建配置：

\`\`\`bash
eas build:configure
\`\`\`

这将在项目根目录创建 \`eas.json\` 文件：

\`\`\`json
{
  "cli": {
    "version": ">= 15.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}
\`\`\`

## 执行构建

### 构建 Android

\`\`\`bash
eas build --platform android --profile production
\`\`\`

### 构建 iOS

\`\`\`bash
eas build --platform ios --profile production
\`\`\`

### 同时构建双平台

\`\`\`bash
eas build --platform all --profile production
\`\`\`

## 开发构建

开发构建允许你使用自定义原生模块，同时保持 Expo 的开发体验：

\`\`\`bash
eas build --profile development --platform android
\`\`\`

安装开发构建到设备后，使用以下命令启动开发服务器：

\`\`\`bash
npx expo start --dev-client
\`\`\`

## 内部发布

配置内部发布（不通过应用商店分发）：

\`\`\`json
{
  "build": {
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    }
  }
}
\`\`\`
`
      },
      {
        slug: 'deployment',
        title: '部署与发布',
        content: `
# 部署与发布

将你的 Expo 应用发布到各大平台。

## Web 部署

### 导出 Web 项目

\`\`\`bash
npx expo export --platform web
\`\`\`

这将在 \`dist/\` 目录生成静态文件，可部署到任何静态托管服务。

### 部署到 Vercel

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### 部署到 Netlify

\`\`\`bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
\`\`\`

### 部署到 GitHub Pages

配置 \`app.json\`：

\`\`\`json
{
  "expo": {
    "web": {
      "bundler": "metro"
    }
  }
}
\`\`\`

使用 GitHub Actions 自动部署。

## 应用商店发布

### 通过 EAS Submit

\`\`\`bash
# 提交到 Apple App Store
eas submit --platform ios

# 提交到 Google Play Store
eas submit --platform android
\`\`\`

### 准备应用商店素材

1. **应用图标**：在 \`app.json\` 中配置 \`icon\` 和 \`adaptiveIcon\`
2. **启动画面**：配置 \`splash\` 属性
3. **截图**：准备各尺寸的截图
4. **应用描述**：撰写清晰的应用描述

## OTA 更新（EAS Update）

推送实时更新，无需重新提交应用商店：

\`\`\`bash
# 配置 EAS Update
eas update:configure

# 发布更新
eas update --branch production --message "修复了通知问题"
\`\`\`

### 更新渠道

\`\`\`json
{
  "build": {
    "production": {
      "channel": "production"
    },
    "preview": {
      "channel": "staging"
    }
  }
}
\`\`\`

## 版本号管理

在 \`app.json\` 中管理版本号：

\`\`\`json
{
  "expo": {
    "version": "1.2.0",
    "ios": {
      "buildNumber": "1"
    },
    "android": {
      "versionCode": 2
    }
  }
}
\`\`\`

- **version**：用户可见的版本号（如 1.2.0）
- **buildNumber / versionCode**：内部构建号，每次提交应用商店需要递增
`
      },
      {
        slug: 'native-modules',
        title: '自定义原生模块',
        content: `
# 自定义原生模块

当 Expo SDK 提供的模块无法满足需求时，你可以创建自定义原生模块。

## Expo Modules API

Expo Modules API 让你使用 Swift（iOS）和 Kotlin（Android）编写原生代码，并通过统一的 JavaScript 接口暴露给 React Native。

## 创建新模块

\`\`\`bash
npx create-expo-module my-module --local
\`\`\`

这将在 \`modules/my-module/\` 目录创建模块骨架。

## 模块结构

\`\`\`
modules/my-module/
├── src/
│   └── MyModule.ts        # TypeScript 接口
├── ios/
│   └── MyModule.swift     # iOS 原生实现
├── android/
│   └── src/main/java/.../
│       └── MyModule.kt    # Android 原生实现
├── expo-module.config.json # 模块配置
└── index.ts               # 入口文件
\`\`\`

## 定义接口

\`\`\`ts
// src/MyModule.ts
import { requireNativeModule } from 'expo-modules-core';

export default requireNativeModule('MyModule');
\`\`\`

\`\`\`ts
// index.ts
import MyModule from './src/MyModule';

export function greet(name: string): string {
  return MyModule.greet(name);
}

export async function fetchData(url: string): Promise<string> {
  return await MyModule.fetchData(url);
}
\`\`\`

## iOS 实现（Swift）

\`\`\`swift
// ios/MyModule.swift
import ExpoModulesCore

public class MyModule: Module {
  public func definition() -> ModuleDefinition {
    Name("MyModule")

    Function("greet") { (name: String) -> String in
      return "你好, \\(name)!"
    }

    AsyncFunction("fetchData") { (url: String) -> String in
      // 异步原生操作
      let data = try await URLSession.shared.data(from: URL(string: url)!)
      return String(data: data.0, encoding: .utf8) ?? ""
    }
  }
}
\`\`\`

## Android 实现（Kotlin）

\`\`\`kotlin
// android/.../MyModule.kt
package expo.modules.mymodule

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class MyModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("MyModule")

    Function("greet") { name: String ->
      "你好, $name!"
    }

    AsyncFunction("fetchData") { url: String ->
      // 异步原生操作
      val result = java.net.URL(url).readText()
      result
    }
  }
}
\`\`\`

## 在应用中使用

\`\`\`tsx
import { greet, fetchData } from './modules/my-module';

export default function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage(greet('Expo'));
    fetchData('https://api.example.com/data').then(setMessage);
  }, []);

  return <Text>{message}</Text>;
}
\`\`\`
`
      }
    ]
  },
  {
    title: '最佳实践',
    items: [
      {
        slug: 'performance',
        title: '性能优化',
        content: `
# 性能优化

优化 Expo 应用性能的最佳实践。

## 图片优化

### 使用 expo-image

\`expo-image\` 比 React Native 内置的 \`Image\` 组件更高效：

\`\`\`tsx
import { Image } from 'expo-image';

// 启用缓存和渐进式加载
<Image
  source="https://example.com/photo.jpg"
  contentFit="cover"
  cachePolicy="memory-disk"
  transition={200}
  style={{ width: 200, height: 200 }}
/>
\`\`\`

### 图片尺寸优化

\`\`\`tsx
// 根据屏幕密度加载不同分辨率的图片
import { PixelRatio } from 'react-native';

function getOptimalImageUrl(baseUrl: string, width: number) {
  const scale = PixelRatio.get();
  return \`\${baseUrl}?w=\${width * scale}&q=80\`;
}
\`\`\`

## 列表优化

### 使用 FlashList 替代 FlatList

\`\`\`bash
npx expo install @shopify/flash-list
\`\`\`

\`\`\`tsx
import { FlashList } from '@shopify/flash-list';

<FlashList
  data={items}
  renderItem={({ item }) => <ItemComponent item={item} />}
  estimatedItemSize={70}
  keyExtractor={(item) => item.id}
/>
\`\`\`

### 避免不必要的重渲染

\`\`\`tsx
import React, { memo } from 'react';

const ItemComponent = memo(({ item }) => {
  return (
    <View style={styles.item}>
      <Text>{item.title}</Text>
    </View>
  );
});
\`\`\`

## 启动优化

### 延迟加载屏幕

\`\`\`tsx
import { lazy } from 'react';

// Expo Router 自动支持代码分割
// 但你可以手动优化重型组件
const HeavyChart = lazy(() => import('./components/HeavyChart'));
\`\`\`

### 减少 JS Bundle 大小

\`\`\`bash
# 分析 bundle 大小
npx expo export --platform web --source-maps

# 使用 bundle 分析工具
npx react-native-bundle-visualizer
\`\`\`

## 内存管理

\`\`\`tsx
import { useEffect, useRef } from 'react';

function OptimizedComponent() {
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      // 定期操作
    }, 1000);

    // 清理定时器
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
}
\`\`\`

## 动画优化

使用 \`react-native-reanimated\` 代替原生动画 API：

\`\`\`tsx
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

function AnimatedBox() {
  const offset = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  return (
    <Animated.View
      style={[{ width: 100, height: 100, backgroundColor: 'blue' }, animatedStyle]}
    />
  );
}
\`\`\`
`
      },
      {
        slug: 'testing',
        title: '测试',
        content: `
# 测试

为你的 Expo 应用编写测试。

## 测试框架

Expo 项目默认配置了 Jest 测试框架。

### 运行测试

\`\`\`bash
npx jest
\`\`\`

### 编写单元测试

\`\`\`tsx
// __tests__/utils.test.ts
import { formatDate, calculateTotal } from '../utils/helpers';

describe('formatDate', () => {
  it('应正确格式化日期', () => {
    const date = new Date('2024-01-15');
    expect(formatDate(date)).toBe('2024年1月15日');
  });
});

describe('calculateTotal', () => {
  it('应正确计算总价', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 },
    ];
    expect(calculateTotal(items)).toBe(35);
  });
});
\`\`\`

## 组件测试

使用 React Native Testing Library：

\`\`\`bash
npx expo install @testing-library/react-native @testing-library/jest-native
\`\`\`

\`\`\`tsx
// __tests__/Button.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import { MyButton } from '../components/MyButton';

describe('MyButton', () => {
  it('应在点击时触发回调', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <MyButton title="点击我" onPress={onPress} />
    );

    fireEvent.press(getByText('点击我'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('应显示正确的文字', () => {
    const { getByText } = render(
      <MyButton title="提交" onPress={() => {}} />
    );
    expect(getByText('提交')).toBeTruthy();
  });
});
\`\`\`

## E2E 测试

使用 Maestro 进行端到端测试：

\`\`\`yaml
# .maestro/login.yaml
appId: com.myapp
---
- launchApp
- tapOn: "登录"
- inputText:
    id: "email"
    text: "test@example.com"
- inputText:
    id: "password"
    text: "password123"
- tapOn: "确认登录"
- assertVisible: "首页"
\`\`\`

## 测试配置

\`\`\`json
{
  "jest": {
    "preset": "jest-expo",
    "transformIgnorePatterns": [
      "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)"
    ]
  }
}
\`\`\`
`
      }
    ]
  }
];

export function getAllDocItems(): DocItem[] {
  return docSections.flatMap((section) => section.items);
}

export function getDocBySlug(slug: string): DocItem | undefined {
  return getAllDocItems().find((item) => item.slug === slug);
}
