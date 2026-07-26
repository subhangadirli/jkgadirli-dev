<script lang="ts">
  import { Button } from "bits-ui";
  import type { Snippet } from "svelte";

  type Props = {
    variant?: "primary" | "outline" | "ghost";
    size?: "md" | "sm";
    class?: string;
    href?: string;
    children?: Snippet;
    [key: string]: unknown;
  };

  let {
    variant = "primary",
    size = "md",
    class: className = "",
    children,
    ...rest
  }: Props = $props();

  // base and variant strings follow the Button styling in the Bits UI docs
  const base =
    "rounded-input inline-flex items-center justify-center gap-2 font-semibold active:scale-[0.98] active:transition-all focus-visible:ring-dark focus-visible:ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50";

  const variants = {
    primary: "bg-dark text-background shadow-mini hover:bg-dark/95",
    outline:
      "border-border-input bg-background-alt shadow-btn hover:bg-muted border",
    ghost: "text-foreground-alt hover:bg-dark-10 hover:text-foreground",
  };

  const sizes = {
    md: "h-12 px-[21px] text-[15px]",
    sm: "h-10 px-4 text-sm",
  };
</script>

<Button.Root
  {...rest}
  class="{base} {variants[variant]} {sizes[size]} {className}"
>
  {@render children?.()}
</Button.Root>
