import LifeCycle from "./LifeCycle";
import RouterContext from "./RouterContext";

function Prompt({ message, when = true }) {
  return (
    <RouterContext.Consumer>
      {context => {
        if (!when) return null;
        const method = context.history.block;

        return (
          <LifeCycle
            onMount={self => {
              self.release = method(message);
            }}
            onUnmount={self => {
              self.release();
            }}
          />
        );
      }}
    </RouterContext.Consumer>
  );
}
export default Prompt;
