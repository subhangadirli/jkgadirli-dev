<script lang="ts">
  import { Avatar } from "bits-ui";

  let {
    src,
    alt,
    fallback,
  }: { src: string; alt: string; fallback: string } = $props();
</script>

<Avatar.Root
  delayMs={200}
  class="data-[status=loaded]:border-foreground bg-muted text-muted-foreground size-16 rounded-full border text-[18px] font-medium uppercase data-[status=loading]:border-transparent"
>
  <div
    class="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-transparent"
  >
    <Avatar.Image {src} {alt} class="size-full object-cover" />
    <Avatar.Fallback class="border-muted border">{fallback}</Avatar.Fallback>
  </div>
</Avatar.Root>
