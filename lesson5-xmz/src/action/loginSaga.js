import {
  call,
  fork,
  put,
  take
  // takeEvery
} from "redux-saga/effects";
import LoginService from "../service/login";
import { LOGIN_FAILURE, LOGIN_SAGA, LOGIN_SUCCESS, REQUEST } from "./const";

/**
 * 做异步请求 call、fork
 * 做状态更新 put 类比 dispatch
 */

// worker saga generator
function* loginHandle(action) {
  yield put({ type: REQUEST });

  // 异步行为
  try {
    const res1 = yield call(LoginService.login, action.payload);
    const res2 = yield call(LoginService.getMoreUserInfo, res1);
    yield put({ type: LOGIN_SUCCESS, payload: res2 });
  } catch (err) {
    yield put({ type: LOGIN_FAILURE, payload: err });
  }
}

// watcher saga generator
function* loginSaga() {
  yield takeEvery(LOGIN_SAGA, loginHandle);
  // call 阻塞
  // fork 非阻塞
  //   while (true) {
  //     // 不使用while只会监听一次
  //     const action = yield take(LOGIN_SAGA);
  //     yield fork(loginHandle, action);
  //     console.log("action---", action);
  //   }
}

export default loginSaga;

// 手写一个takeEvery利用take
const takeEvery = (patten, saga) =>
  fork(function* () {
    while (true) {
      // 不使用while只会监听一次
      const action = yield take(patten);
      yield fork(saga, action);
    }
  });
