/**
 * vnode 虚拟DOM
 * node　真实DOM
 */

import { Placement, Update } from "./const";

// 根节点 fiber
let wipRoot = null;
let currentRoot = null;

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
  // console.log("netUnitWork", nextUnitWork);
}

function isStringOrNumber(str) {
  return typeof str === "string" || typeof str === "number";
}

// 根据vnode,生成node
function createNode(workInProgress) {
  let node = document.createElement(workInProgress.type);
  updateNode(node, {}, workInProgress.props);

  return node;
}

// 更新原生标签的属性，如className,href,id,(style,事件等)
function updateNode(node, prevVal, nextVal) {
  Object.keys(prevVal).forEach(k => {
    if (k === "children") {
      // 有可能是文本
      if (isStringOrNumber(prevVal[k])) {
        node.textContent = "";
      }
    } else if (k.slice(0, 2) === "on") {
      const eventName = k.slice(2).toLocaleLowerCase();
      node.removeEventListener(eventName, prevVal[k]);
    } else {
      if (!(k in nextVal)) {
        node[k] = "";
      }
    }
  });

  Object.keys(nextVal)
    // .filter(k => k !== "children")
    .forEach(k => {
      if (k === "children") {
        // 有可能是文本
        if (isStringOrNumber(nextVal[k])) {
          node.textContent = nextVal[k] + "";
        }
      } else if (k.slice(0, 2) === "on") {
        const eventName = k.slice(2).toLocaleLowerCase();
        node.addEventListener(eventName, nextVal[k]);
      } else {
        node[k] = nextVal[k];
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
  // 当前正在工作的fiber以及hook的初始化
  currentlyRenderingFiber = workInProgress;
  currentlyRenderingFiber.memoizedState = null; // 存取Hook
  workInProgressHook = null;

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
  if (isStringOrNumber(children)) {
    return;
  }
  let newChildren = Array.isArray(children) ? children : [children];

  let previousNewFiber = null;
  let oldFiber = workInProgress.alternate && workInProgress.alternate.child;
  for (let i = 0; i < newChildren.length; i++) {
    let child = newChildren[i];

    let same =
      child &&
      oldFiber &&
      // child.key === oldFiber.key &&
      child.type === oldFiber.type;

    let newFiber;
    if (same) {
      // 节点复用
      newFiber = {
        type: child.type, // 类型
        props: { ...child.props }, // 属性
        stateNode: oldFiber.stateNode, // 如果是原生标签代表dom节点，如果是类组件就代表实例
        child: null, // 第一个子节点fiber
        sibling: null, // 下一个兄弟节点 fiber
        return: workInProgress, // 父节点
        alternate: oldFiber, // 上一次fiber
        flags: Update
      };
    }

    if (!same && child) {
      // 构建fiber节点
      newFiber = {
        type: child.type, // 类型
        props: { ...child.props }, // 属性
        stateNode: null, // 如果是原生标签代表dom节点，如果是类组件就代表实例
        child: null, // 第一个子节点fiber
        sibling: null, // 下一个兄弟节点 fiber
        return: workInProgress, // 父节点
        alternate: null, // 上一次fiber
        flags: Placement
      };
    }

    if (!same && oldFiber) {
      // 删除
    }

    if (isStringOrNumber(child)) {
      newFiber.props = child;
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
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
 * alternate 上一次fiber
 */

// workInProgress当前正在进行的中的fiber
function performNextUnitWork(workInProgress) {
  // step1 执行当前任务
  const { type } = workInProgress;
  if (isStringOrNumber(type)) {
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

// 在浏览器的空闲时间段内调用的函数排队
requestIdleCallback(workLoop);

function commitRoot() {
  commitWorker(wipRoot.child);
  currentRoot = wipRoot;
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
  if (workInProgress.flags & Placement && workInProgress.stateNode) {
    parentNode.appendChild(workInProgress.stateNode);
  } else if (workInProgress.flags & Update && workInProgress.stateNode) {
    updateNode(
      workInProgress.stateNode,
      workInProgress.alternate.props,
      workInProgress.props
    );
  }

  // 更新子节点
  commitWorker(workInProgress.child);
  // 更新下一个兄弟节点
  commitWorker(workInProgress.sibling);
}

// 当前正在工作的fiber
let currentlyRenderingFiber = null;

// 当前正在工作的hook
let workInProgressHook = null;

// 一个hook函数
export function useState(initialState) {
  let hook;
  // 判断是否是组件初次渲染
  if (currentlyRenderingFiber.alternate) {
    // 不是初次渲染，是更新阶段
    currentlyRenderingFiber.memoizedState =
      currentlyRenderingFiber.alternate.memoizedState;

    if (workInProgressHook) {
    } else {
      // 是第一个hook
      workInProgressHook = currentlyRenderingFiber.memoizedState;
    }

    hook = workInProgressHook;
  } else {
    // 初次渲染
    hook = {
      memoizedState: initialState, // 状态值
      queue: [], // 批量更新数组存取
      next: null // 下一个hook
    };

    if (workInProgressHook) {
      // 不是第一个hook
      hook = workInProgressHook;
    } else {
      // 是第一个hook，挂到fiber节点上
      currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
    }
  }

  // 模拟批量处理
  hook.queue.forEach(action => (hook.memoizedState = action));

  const dispatch = action => {
    hook.queue.push(action);

    wipRoot = {
      type: currentRoot.type,
      stateNode: currentRoot.stateNode,
      props: currentRoot.props,
      alternate: currentRoot
    };

    nextUnitWork = wipRoot;

    // console.log("action", action);
  };

  // 指向下一个hook
  workInProgressHook = workInProgressHook.next;

  return [hook.memoizedState, dispatch];
}

// eslint-disable-next-line
export default { render };
