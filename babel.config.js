module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-transform-async-to-generator',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-jsx',
    ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
    ['@babel/plugin-transform-react-jsx', {
      'pragma': 'h.h', 'pragmaFrag': "''"
    }],
    ['./babelsplay.js', { 'extends': 'Component' }]]
}
