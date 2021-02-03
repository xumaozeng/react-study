import { useContext } from "react";
import RouterContext from "./RouterContext";

function Link({ children, to, ...restProps }) {
  const { history } = useContext(RouterContext);
  const handleClick = e => {
    e.preventDefault(); // 阻止默认点击行为
    // 命令式跳转
    history.push(to);
  };
  return (
    <a href={to} {...restProps} onClick={handleClick}>
      {children}
    </a>
  );
}
export default Link;
