import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import Components from "@uni-helper/vite-plugin-uni-components";
import { WotResolver } from "@uni-helper/vite-plugin-uni-components/resolvers";
export default defineConfig(async () => {
  // 动态导入 unocss/vite 插件
  const UnoCSS = (await import("unocss/vite")).default;

  return {
    plugins: [
      Components({
        resolvers: [WotResolver()],
      }),
      uni(),
      UnoCSS(), // 添加 UnoCSS 插件
    ],
  };
});
