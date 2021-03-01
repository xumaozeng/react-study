/**
 * vnode 虚拟DOM
 * node　真实DOM
 */

function render(vnode, container) {
  console.log("vnode", vnode);

  // vnode->node
  const node = createNode(vnode);

  // node 插入到container中
  container.appendChild(node);
}

function isString(str) {
  return typeof str === "string";
}

// 根据vnode,生成node
function createNode(vnode) {
  let node;
  const { type } = vnode;

  // todo 生成node
  // 原生标签 div a span
  if (isString(type)) {
    node = updateHostComponent(vnode);
  } else if (typeof type === "function") {
    node = type.prototype.isReactComponent
      ? updateClassComponent(vnode)
      : updateFunctionComponent(vnode);
  } else if (type === undefined) {
    // 文本
    node = updateTextComponent(vnode);
  } else {
    // <>空节点Fragment节点
    node = updateFragmentComponent(vnode);
  }

  return node;
}

// 更新属性
function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => (node[k] = nextVal[k]));
}

// 原生标签
function updateHostComponent(vnode) {
  const { type, props } = vnode;
  const node = document.createElement(type);
  // 更新属性
  updateNode(node, props);
  // 遍历子节点,插入到node上
  reconcileChildren(node, props.children);
  return node;
}

// 文本
function updateTextComponent(vnode) {
  const node = document.createTextNode(vnode);
  return node;
}

// 函数组件
function updateFunctionComponent(vnode) {
  const { type, props } = vnode;
  const vvnode = type(props);
  const node = createNode(vvnode);
  return node;
}

// 类组件
function updateClassComponent(vnode) {
  const { type, props } = vnode;
  // 先实例化
  const instance = new type(props);
  const vvnode = instance.render();
  const node = createNode(vvnode);
  return node;
}

// <>Fragment节点
function updateFragmentComponent(vnode) {
  const { props } = vnode;
  // 创建Fragment节点
  const node = document.createDocumentFragment();
  // 遍历子节点,插入到node上
  reconcileChildren(node, props.children);
  return node;
}

// 最假的吧，最简单的也是协调
function reconcileChildren(parentNode, children) {
  let newChildren = Array.isArray(children) ? children : [children];

  for (let i = 0; i < newChildren.length; i++) {
    let child = newChildren[i];
    // child是vnode
    // child->node, 插入到parentNode
    render(child, parentNode);
  }
}

// eslint-disable-next-line
export default { render };
