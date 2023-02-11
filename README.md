# Movie Snow

> 웹팩과 바벨을 직접 설정해 CRA를 구현해보는 리액트 프로젝트입니다

<br>

## Learning Point : 프로젝트를 통해 학습한 것들

<br>

### JSX파일을 웹팩을 통해 번들링하기

- 웹팩을 통해 번들링을 하기 위해서는 `babel-loader`와 `babel-core`가 필요하다.
- js파일과 jsx파일에 대한 loader를 설정해준다.
- `babel-preset-env`와 `babel-preset-react`를 설치해준다.
- 사용방법은 아래와 같다.

```js
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, "src"),
        exclude: path.resolve(__dirname, "node_modules"),
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", { targets: "defaults" }],
                "@babel/preset-react",
              ],
            },
          },
        ],
      },
```

- `babel-preset-env`는 최신 문법을 지원하지 않는 브라우저를 위해 사용한다.
- `babel-preset-react`는 jsx를 사용하기 위해 사용한다.
- `babel-loader`는 웹팩과 바벨을 연결해주는 역할을 한다.

<br>

### postcss-loader를 통해 css파일을 번들링하기

- postcss는 linting, formatting, autoprefixing 등의 기능을 제공한다.
- postcss-loader를 사용하는 이유는 아직 호환되지 않는 최신 css를 브라우저가 이해할 수 있는 형태로 변환해주기 위해서도 있다.
- 이것을 사용하기 위해서 아래와 같이 작성할 수 있다.

```js
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env", {}]],
              },
            },
          },
        ],
      },
```
