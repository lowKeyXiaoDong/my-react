// * 1、创建createElemet函数

function createElement(type, config, ...children) {
  if (config) {
    delete config.__source
    delete config.__self
  }
  const props = {
    ...config,
    children: children.map(child => typeof child === 'object' ? child : createTextNode(child))
  }

  return {
    type,
    props
  }
}

function createTextNode (text) {
  return {
    type: 'TEXT',
    props: {
      children: [],
      nodeValue: text
    }
  }
}
export default { createElement }