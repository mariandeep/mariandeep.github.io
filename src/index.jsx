import { onMount } from "solid-js";
import { render } from "solid-js/web";

function App() {
  onMount(()=> {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
    };
  });
  return (
    <h2>
        Hello Oleg
    </h2>
  );
}
render(() => <App />, document.getElementById(`app`));
