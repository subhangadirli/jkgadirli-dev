<script lang="ts">
  import { Tooltip } from "bits-ui";
  import { brands } from "./icons/brands";
  import { socials } from "../data/site";
</script>

<Tooltip.Provider>
  <ul class="flex flex-wrap items-center gap-2">
    {#each socials as social (social.href)}
      <li>
        <Tooltip.Root delayDuration={150}>
          <Tooltip.Trigger>
            {#snippet child({ props })}
              <a
                {...props}
                href={social.href}
                target="_blank"
                rel={social.me
                  ? "me noreferrer noopener"
                  : "noreferrer noopener"}
                aria-label={social.label}
                class="border-border-input bg-background-alt shadow-btn ring-dark ring-offset-background hover:bg-muted focus-visible:ring-dark focus-visible:ring-offset-background focus-visible:outline-hidden rounded-input text-foreground-alt hover:text-foreground group inline-flex size-10 items-center justify-center border transition-colors focus-visible:ring-2 focus-visible:ring-offset-2"
              >
                {#if social.icon === "omicron"}
                  <!-- omicron has no monochrome glyph, so its own mark is used,
                       a touch larger and dimmed to sit with the grey glyphs -->
                  <img
                    src="/images/logos/omicron.png"
                    alt=""
                    width="20"
                    height="20"
                    class="size-5 object-contain opacity-75 transition-opacity group-hover:opacity-100"
                  />
                {:else}
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    class="size-[18px]"
                  >
                    <path d={brands[social.icon]} />
                  </svg>
                {/if}
              </a>
            {/snippet}
          </Tooltip.Trigger>
          <Tooltip.Content
            sideOffset={8}
            class="animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--bits-tooltip-content-transform-origin)"
          >
            <div
              class="rounded-input border-dark-10 bg-background shadow-popover outline-hidden z-0 flex items-center justify-center border px-2.5 py-1.5 text-sm font-medium"
            >
              {social.label}
            </div>
          </Tooltip.Content>
        </Tooltip.Root>
      </li>
    {/each}
  </ul>
</Tooltip.Provider>
