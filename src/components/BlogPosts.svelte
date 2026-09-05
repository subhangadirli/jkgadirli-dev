<script lang="ts">
  import { onMount } from "svelte";
  import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
  import { formatDate, parseFeed, type Post } from "../data/blog";

  let {
    feedUrl,
    profileUrl,
    seed = [],
  }: { feedUrl: string; profileUrl: string; seed?: Post[] } = $props();

  /** the build embeds a snapshot as `seed`, so the section is complete
   *  without JS. The island refetches on view, which is what picks up new
   *  posts between deploys, and silently keeps the seed on failure. */
  let posts = $state<Post[]>(seed);

  onMount(async () => {
    try {
      const res = await fetch(feedUrl, { signal: AbortSignal.timeout(8000) });
      if (!res.ok) throw new Error(String(res.status));
      const fresh = parseFeed(await res.text());
      if (fresh.length > 0) posts = fresh;
    } catch {
      /* keep the seed */
    }
  });
</script>

{#if posts.length > 0}
  <ul class="grid gap-4 sm:grid-cols-2">
    {#each posts as post (post.href)}
      <li>
        <a
          href={post.href}
          target="_blank"
          rel="noreferrer noopener"
          class="rounded-card border-border-card bg-background-alt shadow-card hover:border-border-input-hover focus-visible:ring-dark focus-visible:ring-offset-background focus-visible:outline-hidden flex h-full flex-col border p-5 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          <div class="flex items-start justify-between gap-3">
            <h3 class="text-[15px] font-semibold tracking-[-0.01em]">
              {post.title}
            </h3>
            <ArrowUpRight class="text-muted-foreground mt-0.5 size-4 shrink-0" />
          </div>

          <p class="text-muted-foreground mt-1 text-xs">
            {formatDate(post.published)}
          </p>

          <p class="text-muted-foreground mt-3 text-sm leading-relaxed">
            {post.excerpt}
          </p>

          {#if post.tags.length > 0}
            <ul class="mt-4 flex flex-wrap gap-1.5 pt-1">
              {#each post.tags as tag}
                <li
                  class="border-dark-10 text-muted-foreground rounded-button border px-1.5 py-0.5 text-xs font-medium"
                >
                  {tag}
                </li>
              {/each}
            </ul>
          {/if}
        </a>
      </li>
    {/each}
  </ul>
{:else}
  <a
    href={profileUrl}
    target="_blank"
    rel="noreferrer noopener"
    class="rounded-card border-border-card bg-background-alt shadow-card hover:border-border-input-hover text-muted-foreground flex items-center justify-between gap-3 border p-5 text-sm transition-colors"
  >
    Posts are on the blog
    <ArrowUpRight class="size-4 shrink-0" />
  </a>
{/if}
