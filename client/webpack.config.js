module.exports = {
  module: {
    rules: [
      {
        test: /\.(js)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
};
