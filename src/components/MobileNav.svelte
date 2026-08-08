<script lang="ts">
  import Menu from "@lucide/svelte/icons/menu";
  import X from "@lucide/svelte/icons/x";
  import Button from "./ui/Button.svelte";
  import { nav, site } from "../data/site";

  let open = $state(false);

  function close() {
    open = false;
  }

  /**
   * The header carries `backdrop-blur-md`, and a backdrop-filter makes an
   * element the containing block for its fixed descendants. Left in place the
   * overlay would resolve against the 64px header box instead of the viewport,
   * which collapsed the scrim to zero height. Moving both nodes to the body
   * puts them back on the viewport.
   */
  function portal(node: HTMLElement) {
    document.body.appendChild(node);
    return () => node.remove();
  }

  /** the panel is hidden from `sm` up, so it must not stay open across the
   * breakpoint, or the scroll lock below would have no way to be released */
  $effect(() => {
    const wide = window.matchMedia("(min-width: 40rem)");
    const sync = () => wide.matches && close();
    sync();
    wide.addEventListener("change", sync);
    return () => wide.removeEventListener("change", sync);
  });

  /** inline, because the scrollbar lives on <html> here, and an inline style
   * outranks the `overflow-y-scroll` rule in app.css. `scrollbar-gutter:
   * stable` is already set there, so nothing shifts. */
  $effect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  });

  function onkeydown(event: KeyboardEvent) {
    if (event.key === "Escape") close();
  }
</script>

<svelte:window {onkeydown} />

<button
  type="button"
  onclick={() => (open = !open)}
  aria-expanded={open}
  aria-controls="mobile-nav"
  aria-label={open ? "Close menu" : "Open menu"}
  class="text-foreground-alt hover:bg-dark-10 hover:text-foreground rounded-button focus-visible:ring-dark focus-visible:ring-offset-background -mr-2.5 inline-flex size-10 items-center justify-center transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2"
>
  {#if open}
    <X class="size-5" />
  {:else}
    <Menu class="size-5" />
  {/if}
</button>

{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    {@attach portal}
    class="fixed inset-x-0 bottom-0 top-16 z-30 sm:hidden"
    onclick={close}
    aria-hidden="true"
  ></div>

  <nav
    {@attach portal}
    id="mobile-nav"
    aria-label="Sections"
    class="border-dark-10 bg-background shadow-popover fixed inset-x-0 top-16 z-40 flex flex-col gap-1 border-b px-1 pb-4 sm:hidden"
  >
    <!-- the 4px of panel padding plus the 12px on each row puts the labels on
         the same 16px gutter as the wordmark above them -->
    {#each nav as item (item.href)}
      <a
        href={item.href}
        onclick={close}
        class="text-foreground-alt hover:bg-dark-10 hover:text-foreground rounded-button px-3 py-2.5 text-[15px] font-medium transition-colors"
      >
        {item.label}
      </a>
    {/each}

    <Button
      href={`mailto:${site.email}`}
      size="sm"
      variant="outline"
      class="mx-3 mt-3"
      onclick={close}
    >
      Get in touch
    </Button>
  </nav>
{/if}
