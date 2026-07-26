<script lang="ts">
  import { Avatar } from "bits-ui";

  let {
    src,
    alt,
    fallback,
    class: className = "size-16 text-[18px]",
  }: { src: string; alt: string; fallback: string; class?: string } = $props();
</script>

<Avatar.Root
  delayMs={200}
  class="data-[status=loaded]:border-foreground bg-muted text-muted-foreground shrink-0 rounded-full border font-medium uppercase data-[status=loading]:border-transparent {className}"
>
  <div
    class="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-transparent"
  >
    <Avatar.Image {src} {alt} class="size-full object-cover" />
    <Avatar.Fallback class="border-muted border">{fallback}</Avatar.Fallback>
  </div>
</Avatar.Root>
