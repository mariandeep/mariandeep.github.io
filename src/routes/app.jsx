import { onMount } from "solid-js";

export function App() {
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