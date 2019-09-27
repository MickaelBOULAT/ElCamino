/**
 * Check if body array contains method
 */
function hasMethod (arr, name, kind) {
  if (!Array.isArray(arr)) return false
  var list = arr.filter(e => e.key && e.key.name === name && e.kind === kind)
  return !!list.length
}

/**
 * Inject the method in the class
 */
function injectMethodName (t, node, name, constructorname) {
  var statement = t.returnStatement(t.stringLiteral(constructorname))
  var body = t.blockStatement([statement])
  var fct = t.classMethod('get', t.identifier(name), [], body)
  node.body.body.unshift(fct)
}

module.exports = function ({ types: t }) {
  return {
    name: 'babelConstructorname',
    visitor: {
      ClassDeclaration (path, state) {
        var extending = state.opts.extends ? Array.isArray(state.opts.extends) ? state.opts.extends : [state.opts.extends] : false
        var methodname = state.opts.method ? state.opts.method : '_constructorname'
        var node = path.node
        if (node.superClass &&
            (!extending || extending.indexOf(node.superClass.name) !== -1) &&
            !hasMethod(node.body.body, methodname, 'get')) {
          injectMethodName(t, node, methodname, node.id.name)
        }
      }
    }
  }
}
