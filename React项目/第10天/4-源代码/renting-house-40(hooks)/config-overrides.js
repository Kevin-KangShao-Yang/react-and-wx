const { override, fixBabelImports } = require('customize-cra')

// const rewiredMap = () => config => {
//   config.devtool =
//     config.mode === 'development' ? 'cheap-module-source-map' : false
//   return config
// }

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css'
    // style: true
  }),
  // 关闭mapSource
  // rewiredMap()
)
