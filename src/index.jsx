import { onMount } from "solid-js";
import { render } from "solid-js/web";

function App() {
  onMount(async ()=> {
    if ('serviceWorker' in navigator) {
      await navigator.serviceWorker.register('/sw.js?source=index')
    };
  });
  return (
    <h1>
        Hello Oleg
    </h1>
  );
}
render(() => <App />, document.getElementById(`app`));
