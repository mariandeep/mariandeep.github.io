import { onMount } from 'solid-js';
import { MainPage } from '../pages/main-page';

export function App() {
    onMount(() => {
        if ('serviceWorker' in navigator) {
            setTimeout(async () => await navigator.serviceWorker.register('/sw.js?source=index'), 30_000);
        }
    });
    return <MainPage />;
}
