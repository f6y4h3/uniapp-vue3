import {
	createSSRApp
} from "vue";
import App from "./App.vue";
import config from "./config";
export function createApp() {
	const app = createSSRApp(App);
	return {
		app,
	};
}
