<script lang="ts">
  import { Separator } from "bits-ui";

  let {
    orientation = "horizontal",
    class: className = "",
  }: { orientation?: "horizontal" | "vertical"; class?: string } = $props();
</script>

<Separator.Root
  {orientation}
  class="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-[1px] {className}"
/>
