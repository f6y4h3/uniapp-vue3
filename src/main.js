import {
	createSSRApp
} from "vue";
import App from "./App.vue";
// import config from "./config";
import "virtual:uno.css";

export function createApp() {
	const app = createSSRApp(App);
	return {
		app,
	};
}
