---
title: Tailwind CSS !important modifier
date: '2024-02-14'
tags:
  - tailwindcss
  - css
---

## [Tailwind CSS !important modifier](/today-i-learned#tailwind-css-!important-modifier)

<div class="-mt-1 mb-4 flex gap-2">
    <span class="chip">#tailwindcss</span>
    <span class="chip">#css</span>
</div>

Make any utility important by adding a **\`!\`** character to the beginning:

```html::{"copy": true, "footer": true}
<p class="font-bold !font-medium">
  This will be medium even though bold comes later in the CSS.
</p>
```

[Official Docs](https://tailwindcss.com/docs/configuration#important-modifier::blank)