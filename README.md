## React-demo

发布 react 组件到 npm  文章的 demo

# 发布 react 组件到 npm

我发布了我的第一个 npm 组件，一个[基于 react 的 3d 标签云](https://www.npmjs.com/package/react3dtagcloud)组件。在这途中我也是遇到了很多的坑，花在完善整个发布流程的时间远多于写这个组件本身的时间，所以我记录下我觉得一个正常的 react 组件的发布流程。

在整个发布组件的过程我做了如下几件事儿：

1. 开发组件
2. 编写 Readme
3. 推送到 github，并且把 demo 放到 github page 上
4. 发布组件到 npm 上

## 开发组件
创建项目文件夹并初始化 `npm package` ，确保你创建的组件名称没有在 [npm](https://www.npmjs.com/) 上被使用过， 这里我们用 react-demo 作为示例

```bash
mkdir react-demo
cd react-demo
npm init
```

`npm init` 是生成初始的 **package.json** 的命令，在 `npm init` 的时候，你可以根据你自己的需要进行填写你的组件信息。或者直接使用 `npm init -y` 采用默认的，后面自己再去修改。

首先安装 react 相关的包：

```bash
npm i react react-dom -D
```

采用 **babel** 编译相关的依赖：

```
npm i @babel/cli @babel/core @babel/preset-env @babel/preset-react -D
```

采用 **webpack** 做构建，**webpack-dev-server** 作为本地开发服务器，所以需要安装如下依赖：

```
npm i webpack webpack-cli webpack-dev-server -D
```

我这里为了简单演示，只安装 babel-loader 用来编译 jsx，其他 loader 安装自己的需要自己安装。

```
npm i babel-loader -D
```

另外再安装一个 webpack 插件 html-webpack-plugin ，用来生成 html：

```bash
npm i html-webpack-plugin -D
```

然后再添加上常规的 **start** 和 **build** 脚本，**package.json** 如下：

```json
{
  "name": "react-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --open development",
    "build": "webpack --mode production"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/cli": "^7.2.3",
    "@babel/core": "^7.2.2",
    "@babel/preset-env": "^7.3.1",
    "@babel/preset-react": "^7.0.0",
    "babel-loader": "^8.0.5",
    "html-webpack-plugin": "^3.2.0",
    "react": "^16.7.0",
    "react-dom": "^16.7.0",
    "webpack": "^4.29.0",
    "webpack-cli": "^3.2.1",
    "webpack-dev-server": "^3.1.14"
  },
  "dependencies": {}
}
```

当然，你也可以直接把我这个 package.json 复制过去，然后 `npm install` 进行依赖的安装，也可以一个一个的安装。

> 一个最基本的组件只需要编译 jsx，所以我这里没有安装 css 以及处理其他的 loader，这篇文章的重点不是讲 webpack 的，所以其他的自行解决，有 webpack 问题可以私聊我。

然后我们再创建如下的目录结构：

```bash
├── example // 示例代码，在自己测试的时候可以把测试文件放到 src 里
│   └── src // 示例源代码
│       ├── index.html // 示例 html
│       └── app.js // 添加到 react-dom 的文件
├── package.json 
├── src // 组件源代码
│   └── index.js // 组件源代码文件
├── .babelrc
├── .editorconfig // 不必须的，但是建议有
├── .gitignore // 如果要放到 github 上，这个是需要有的
└── webpack.config.js
```

下面我们再创建一个最简单的组件，来进行演示：

```javascript
/*** src/index.js ***/
import React from 'react';
const ReactDemo = () => (
 <h1>这是我的第一个 react npm 组件</h1>
);
export default ReactDemo;
```

接下来添加一个 demo

```html
<!-- examples/src/index.html -->
<html>
<head>
    <title>My First React Component</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

```javascript
/*** examples/src/app.js ***/
import React from 'react'
import { render } from 'react-dom'
import ReactDemo from '../../src'

const App = () => <ReactDemo />
render(<App />, document.getElementById('root'))

```

> 注意 demo 中的 ReactDemo 是从 ../../src 中导入的

接下来配置非常简单的 webpack, 在项目根路径下创建 webpack.config.js 文件

```javascript
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
	template: path.join(__dirname, "./example/src/index.html"),
	filename: "./index.html"
});

module.exports = {
	entry: path.join(__dirname, "./example/src/app.js"),
	output: {
		path: path.join(__dirname, "example/dist"),
		filename: "bundle.js"
	},
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			use: "babel-loader",
			exclude: /node_modules/
		}]
	},
	plugins: [htmlWebpackPlugin],
	resolve: {
		extensions: [".js", ".jsx"]
	},
	devServer: {
		port: 3001
	}
};

```

Webpack 的配置文件主要做了如下事情：

- 使用 example/src/index.js 作为项目入口，处理资源文件的依赖关系
- 通过 babel-loader 来编译处理  js 和 jsx 文件
- 通过 html-webpack-plugin 自动注入编译打包好的脚本文件
- 为 demo 启动端口为 3001 的服务

然后再配置一下 **babel**，咱们的 **babel** 主要做两件事，将 **jsx** 编译成 **es5**，然后再加一个通用的 **env**，所以 **.babelrc** 配置如下：

```
{
    "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

可以看到之前的 **package.json** ，我这里 **babel** 安装的是 **7.x**，那么 **babel-loader** 就应该是 **8.x** 才行，然后 **babel 7.x** 相对于之前的配置是不同的，要用这个配置，版本一定要跟我的相同，不然配置可能会不一样。

然后现在执行 `npm start`，然后再访问 localhost:3001 就可以访问到了。

### 编写 README

编写 README，如果你不知道该如何编写，我给你提几点建议，你可以选择你觉得必要的点来写：

1. logo
2. 官方主页
3. 介绍
4. 安装
5. 快速开始
6. 功能列表
7. 截图
8. todoList
9. 不足之处
10. FAQ
11. Change Log（更新日志）

当你写完 **README** 之后，我们将添加一些来自 [shields.io](https://link.juejin.im/?target=https%3A%2F%2Fshields.io%2F) 的时髦徽章，让人们知道我们又酷又专业。

![image-20190128123552436](/Users/licai/Library/Application Support/typora-user-images/image-20190128123552436.png)

想添加什么样的徽章看自己喜欢吧，种类有很多。

可以[点击这里](https://github.com/crazylxr/3dtagcloudforeact)看我之前写的 3d 标签云的 README。

现在基本上可以发布了，但是要是能提供一个在线的 demo 让别人在用这个组件的时候可以看到效果就更好了。

## 在 GitHub Pages 上发布一个在线 demo

发布在线 demo 可以直接用 Github Pages 来帮助我们托管，通过 webpack 构建生产环境版本，然后发到 Github 上去即可。

首先去 Github 创建一个用来存放你组件代码的仓库。

然后把你的项目初始化成 git 项目：

```bash
git init
```

再添加远程仓库，将本地仓库和远程仓库关联起来。

```bash
git remote add origin git@github.com:crazylxr/react-demo.git
```

接下来我们可以安装 **gh-pages** 来帮助我们发布到 github pages：

```bash
npm i gh-pages -D
```

为了方便记忆，后续能更快的发布，这些命令我们可以写成 npm-scriprt，所以我们增加两个脚本：

```json
{
  "name": "@taoweng/react-demo",
  "version": "1.0.0",
  "description": "react demo",
  "main": "lib/index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --open development",
    "build": "webpack --mode production",
    "deploy": "gh-pages -d examples/dist",
    "publish-demo": "npm run build && npm run deploy"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/cli": "^7.2.3",
    "@babel/core": "^7.2.2",
    "@babel/preset-env": "^7.3.1",
    "@babel/preset-react": "^7.0.0",
    "babel-loader": "^8.0.5",
    "gh-pages": "^2.0.1",
    "html-webpack-plugin": "^3.2.0",
    "react": "^16.7.0",
    "react-dom": "^16.7.0",
    "webpack": "^4.29.0",
    "webpack-cli": "^3.2.1",
    "webpack-dev-server": "^3.1.14"
  },
  "dependencies": {}
}

```

添加了 **deploy** 脚本和 **publish-demo**，以后需要发布 demo 的时候只需要 `npm run publish-demo` 即可。

然后我们就可以 build 项目之后再将 expamples/dist 发布到 gh-pages 分支：

```bash
npm run build
npm run deploy
```

或者直接
```bash
npm run publish-demo
```

> 注意：这里只会将 expample/src 下的文件发布到 ph-pages 分支，master 分支依然没有到 github 上，如果你要把源码放到 github 的 master 或者其他分支上，还是需要自己 push 的。 

这个时候，我们可以通过 **crazylxr.github.io/react-demo** 访问到我们写的 demo。crazylxr 是 github 的 username，react-demo 是仓库名，注意改成你自己的。

## 编译源码

我们现在的源码是 **jsx** 的，所以我们需要通过 **babel** 把 **jsx** 编译为正常浏览器能访问的代码。我们可以通过 **babel-cli** 来编译我们代码，直接编译 **src** 目录，到 **lib** 文件夹。更多命令见 [babel-cli](https://babeljs.io/docs/en/babel-cli/)

```bash
npx babel src --out-dir lib
```

执行完这个命令，就把生成一个 **lib** 文件夹，然后里面的 **index.js** 就是编译过后的文件，是可以直接发布到 **npm** 的文件。

然后将这个编译命令写到 **script** 里，**package.json** 如下：

```json
{
  "name": "@taoweng/react-demo",
  "version": "1.0.0",
  "description": "描述你这个组件是干啥的",
  "repository": ":username/:repository",
  "main": "lib/index.js",
  "scripts": {
    "start": "webpack-dev-server --open development",
    "build": "webpack --mode production",
    "compile": "npx babel src --out-dir lib"
  },
  "keywords": [],
  "author": ":username",
  "license": "MIT",
  "devDependencies": {
    "@babel/cli": "^7.2.3",
    "@babel/core": "^7.2.2",
    "@babel/preset-env": "^7.3.1",
    "@babel/preset-react": "^7.0.0",
    "babel-loader": "^8.0.5",
    "html-webpack-plugin": "^3.2.0",
    "webpack": "^4.29.0",
    "webpack-cli": "^3.2.1",
    "webpack-dev-server": "^3.1.14"
  },
  "dependencies": {
    "@babel/polyfill": "^7.2.5",
    "react": "^16.7.0",
    "react-dom": "^16.7.0"
  }
}

```

那么以后要编译 **src** 下面的代码，只需要执行：

```
npm run compile
```

现在我们已经有编译好的代码了，接下来就可以发布到 npm 供其他人使用了。

## 发布 npm 包

在发布以前我们是需要一些准备：

**注册 npm 账户：**

在这里](https://www.npmjs.com/) 注册一个 npm 账号。

**登录**

在终端输入：

```bash
npm adduser
```

也可以用：

```bash
npm login
```

然后你会得到一个让你输入**username**、**password** 和 **email ** 的提示，把它们填在相应的位置。

**关于 package.json 需要注意的点**

package.json 里面的配置信息非常重要，我解释一下几个重要的配置。

- [name](https://docs.npmjs.com/files/package.json#name): 包名，如果你学习的话建议加一个 scoped，就是我上面的 **@taoweng/react-demo** 而不是 **react-demo**，因为 npm 包特别的多，很容易重复。这样这个包就会是私有的，可以通过 `npm publish --access=public` 将这个包变为共有的包。
- [version](https://docs.npmjs.com/files/package.json#version): 包的版本，每次发布包的版本不能和上次一样。详细规范可见[这里](https://semver.org/lang/zh-CN/)
- [description](https://docs.npmjs.com/files/package.json#description)：包的简介。
- [repository](https://docs.npmjs.com/files/package.json#repository)：适合写 Github 地址，建议写成：**:username/:repository**。

- [license](https://docs.npmjs.com/files/package.json#license)：认证。不知道该用什么的，就写MIT 吧。
- [main](https://docs.npmjs.com/files/package.json#main)：包的入口文件。就是引入这个包的时候去加载的入口文件。
- [keywords](https://docs.npmjs.com/files/package.json#keywords)：添加一些关键词更容易使你的包被搜索到。

更详细的 **package.json** 配置可见[官网](https://docs.npmjs.com/files/package.json)。

最后我们在项目中添加 .npmignore 文件，跟 .gitignore 的作用一样，就是在发布 npm 的时候需要忽略的文件和文件夹：

```
# .npmignore 
src
examples
.babelrc
.gitignore
webpack.config.js
```

这个时候我们就可以发布到 npm 了:

```bash
npm publish
```

如果你是私有包，可以这样发布：

```bash
npm publish --access=public
```

## 结语

以后发布新版本的时候，只需要更改一下 package.json 里面的 version 版本号，然后执行 npm publish 和 npm run publish-demo 就可以同步 npm 和 demo。

不过如果想让你的组件在社区里给更多人用，你需要把 README 写得更好一点，然后添加好自动化测试，不然别人不太敢用。

另外在写组件之前可以先了解下有没有类似的组件了，如果有就直接用吧，咱们就站在巨人的肩膀上，把自己宝贵的时间放在创造价值上。
