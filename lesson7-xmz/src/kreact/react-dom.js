/**
 * vnode 虚拟DOM
 * node　真实DOM
 */

// 根节点 fiber
let wipRoot = null;
function render(vnode, container) {
  // console.log("vnode", vnode);
  /*  // vnode->node
  const node = createNode(vnode);
  // node 插入到container中
  container.appendChild(node); */

  wipRoot = {
    type: "div",
    props: { children: { ...vnode } },
    stateNode: container
  };

  nextUnitWork = wipRoot;
  console.log("netUnitWork", nextUnitWork);
}

function isString(str) {
  return typeof str === "string";
}

// 根据vnode,生成node
function createNode(workInProgress) {
  let node = document.createElement(workInProgress.type);
  updateNode(node, workInProgress.props);

  return node;
}

// 更新属性
function updateNode(node, nextVal) {
  Object.keys(nextVal)
    // .filter(k => k !== "children")
    .forEach(k => {
      if (k === "children") {
        if (isString(nextVal.children)) {
          node.textContent = nextVal.children;
        }
      } else {
        if (k === "style") {
          for (let attr in nextVal.style) {
            node.style[attr] = nextVal.style[attr];
          }
        } else {
          node[k] = nextVal[k];
        }
      }
    });
}

// 原生标签
function updateHostComponent(workInProgress) {
  // 修身
  // 构建真实dom节点
  if (!workInProgress.stateNode) {
    workInProgress.stateNode = createNode(workInProgress);
  }

  // 齐家
  // 协调子节点
  reconcileChildren(workInProgress, workInProgress.props.children);
  // console.log("workInProgress", workInProgress);
}

// 文本
function updateTextComponent(workInProgress) {
  if (!workInProgress.stateNode) {
    workInProgress.stateNode = document.createTextNode(workInProgress.props);
  }
}

// 函数组件
function updateFunctionComponent(workInProgress) {
  const { type, props } = workInProgress;
  const children = type(props);
  reconcileChildren(workInProgress, children);
}

// 类组件
function updateClassComponent(workInProgress) {
  const { type, props } = workInProgress;
  // 先实例化
  const instance = new type(props);
  const children = instance.render();
  reconcileChildren(workInProgress, children);
}

// <>Fragment节点
function updateFragmentComponent(workInProgress) {
  reconcileChildren(workInProgress, workInProgress.props.children);
}

// 最假的吧，最简单的也是协调
function reconcileChildren(workInProgress, children) {
  if (isString(children)) {
    return;
  }
  let newChildren = Array.isArray(children) ? children : [children];

  let previousNewFiber = null;
  for (let i = 0; i < newChildren.length; i++) {
    let child = newChildren[i];
    // 构建fiber节点
    let newFiber = {
      type: child.type, // 类型
      props: { ...child.props }, // 属性
      stateNode: null, // 如果是原生标签代表dom节点，如果是类组件就代表实例
      child: null, // 第一个子节点fiber
      sibling: null, // 下一个兄弟节点 fiber
      return: workInProgress // 父节点
    };

    if (isString(child)) {
      newFiber.props = child;
    }

    if (i === 0) {
      // 第一个子fiber
      workInProgress.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }

    previousNewFiber = newFiber;
  }
}

/**
 * fiber数据结构
 * type
 * props
 * key
 * stateNode 如果是原生标签代表dom节点，如果是类组件代表实例
 * child 第一个子节点
 * sibling 下一个兄弟节点
 * return 指向父节点
 */

// workInProgress当前正在进行的中的fiber
function performNextUnitWork(workInProgress) {
  // step1 执行当前任务
  const { type } = workInProgress;
  if (isString(type)) {
    // 原生标签
    updateHostComponent(workInProgress);
  } else if (typeof type === "function") {
    if (type.prototype.isReactComponent) {
      // 类组件
      updateClassComponent(workInProgress);
    } else {
      // 函数组件
      updateFunctionComponent(workInProgress);
    }
  } else if (typeof type === "undefined") {
    // 文本
    updateTextComponent(workInProgress);
  } else {
    // Fragment
    updateFragmentComponent(workInProgress);
  }

  // step2 并且返回下一个任务(深度优先遍历)
  if (workInProgress.child) {
    // 有孩子返回孩子
    return workInProgress.child;
  }

  let nextFiber = workInProgress;
  while (nextFiber) {
    // 有兄弟返回兄弟，没有返回叔叔
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    // 叔叔就是爸爸的兄弟
    nextFiber = nextFiber.return;
  }
}

// 下一个要执行的任务
let nextUnitWork = null; // fiber
function workLoop(IdleDeadline) {
  while (nextUnitWork && IdleDeadline.timeRemaining() > 1) {
    // 执行当前任务，并且返回下一个任务
    nextUnitWork = performNextUnitWork(nextUnitWork);
  }

  // 没有任务就提交
  if (!nextUnitWork && wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

function commitRoot() {
  commitWorker(wipRoot.child);
  wipRoot = null;
}

function commitWorker(workInProgress) {
  if (!workInProgress) {
    return;
  }
  // 更新自己
  let parentNodeFiber = workInProgress.return;

  while (!parentNodeFiber.stateNode) {
    parentNodeFiber = parentNodeFiber.return;
  }

  let parentNode = parentNodeFiber.stateNode;
  if (workInProgress.stateNode) {
    parentNode.appendChild(workInProgress.stateNode);
  }

  // 更新子节点
  commitWorker(workInProgress.child);
  // 更新下一个兄弟节点
  commitWorker(workInProgress.sibling);
}

// 在浏览器的空闲时间段内调用的函数排队
requestIdleCallback(workLoop);

// eslint-disable-next-line
export default { render };
