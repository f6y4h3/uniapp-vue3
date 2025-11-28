// unocss.config.ts
import { defineConfig, presetUno, presetAttributify, presetIcons } from "unocss";

export default defineConfig({
  // 预设集合
  presets: [
    presetUno(),
    presetAttributify(), // 启用属性化模式
    presetIcons()        // 启用图标预设
  ],

  // 自定义规则
  rules: [
    // 在这里可以添加您的自定义规则，例如：
    // ['m-1', { margin: '0.25rem' }]
  ],

  // 自定义快捷方式
  shortcuts: {
    // 基础布局与标题
    'section-box': 'p-[10px] bg-white rounded-[10px] shadow-[0px_5px_2px_0px_#F5F5F5] mb-[20px]',
    'section-title': 'py-[12px] px-0 flex items-center justify-start',
    'title-h2': 'text-[18px] text-[#333] mx-[6px] my-0',
    'title-line': 'w-[4px] h-[12px] rounded-[10px] bg-[#2979ff]',
    'font-universal-head': 'pt-[20px] pr-0 pb-[30px] pl-[20px] h-[85px] text-[26px] font-["PingFangSC-Semibold,_PingFang_SC"] font-semibold text-[#1c1c1c] leading-[37px] flex items-center',
    
    // 常用组件样式及覆盖
    'universal-background': 'bg-[#f8fafc]!', // ! 表示 !important
    'uni-card-rounded': 'rounded-[10px]!', // 覆盖 uni-card 的圆角
    'uni-section-forms-item': 'mb-[30px]!',
    'table-content': 'mt-[16px]!',
    'uni-repair-table-scroll': 'min-h-[calc(100vh-417px)]! box-border', // 简化复杂的 calc 计算
    
    // 交互与状态
    'u-image-pointer': 'cursor-pointer',
    'opt-button': 'cursor-pointer p-2',
    'enable-scroll': 'overflow-y-auto!',
  }
});
