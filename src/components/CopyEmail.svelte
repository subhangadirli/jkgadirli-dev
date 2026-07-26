<script lang="ts">
  import Copy from "@lucide/svelte/icons/copy";
  import Check from "@lucide/svelte/icons/check";
  import Button from "./ui/Button.svelte";
  import { site } from "../data/site";

  let { class: className = "" }: { class?: string } = $props();

  let copied = $state(false);
  let timer: ReturnType<typeof setTimeout>;

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      copied = true;
      clearTimeout(timer);
      timer = setTimeout(() => (copied = false), 2000);
    } catch {
      // clipboard blocked, the mailto button next to this one still works
    }
  }
</script>

<Button variant="outline" onclick={copy} class={className}>
  {#if copied}
    <Check class="size-[18px]" />
    Copied
  {:else}
    <Copy class="size-[18px]" />
    Copy address
  {/if}
</Button>
