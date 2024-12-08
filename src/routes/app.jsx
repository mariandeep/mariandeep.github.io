import { onMount } from "solid-js";
import { MainPage } from "../pages/main-page";

export function App() {
    onMount(async ()=> {
      if ('serviceWorker' in navigator) {
        await navigator.serviceWorker.register('/sw.js?source=index')
      };
    });
    return <MainPage/>;
  }