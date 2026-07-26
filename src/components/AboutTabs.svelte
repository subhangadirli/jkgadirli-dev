<script lang="ts">
  import { Tabs } from "bits-ui";
  import GraduationCap from "@lucide/svelte/icons/graduation-cap";
  import { education, skills } from "../data/site";
</script>

<Tabs.Root
  value="toolkit"
  class="rounded-card border-muted bg-background-alt shadow-card w-full border p-3"
>
  <Tabs.List
    class="rounded-9px bg-dark-10 shadow-mini-inset dark:bg-background grid w-full grid-cols-2 gap-1 p-1 text-sm font-semibold leading-[0.01em] dark:border dark:border-neutral-600/30"
  >
    <Tabs.Trigger
      value="toolkit"
      class="data-[state=active]:shadow-mini dark:data-[state=active]:bg-muted h-8 rounded-[7px] bg-transparent py-2 data-[state=active]:bg-white"
    >
      Toolkit
    </Tabs.Trigger>
    <Tabs.Trigger
      value="education"
      class="data-[state=active]:shadow-mini dark:data-[state=active]:bg-muted h-8 rounded-[7px] bg-transparent py-2 data-[state=active]:bg-white"
    >
      Education
    </Tabs.Trigger>
  </Tabs.List>

  <Tabs.Content value="toolkit" class="select-none p-4 pt-5">
    <ul class="flex flex-wrap gap-2">
      {#each skills as skill (skill)}
        <li
          class="border-dark-10 bg-background rounded-input border px-2.5 py-1 text-sm font-medium"
        >
          {skill}
        </li>
      {/each}
    </ul>
  </Tabs.Content>

  <Tabs.Content value="education" class="select-none p-4 pt-5">
    <ul class="flex flex-col gap-4">
      {#each education as item (item.title)}
        <li class="flex items-start gap-3">
          <span
            class="border-dark-10 bg-background rounded-input text-muted-foreground mt-0.5 inline-flex size-8 shrink-0 items-center justify-center border"
          >
            <GraduationCap class="size-4" />
          </span>
          <div>
            <p class="text-sm font-semibold">{item.title}</p>
            <p class="text-muted-foreground text-sm">
              {item.org} &middot; {item.period}
            </p>
          </div>
        </li>
      {/each}
    </ul>
  </Tabs.Content>
</Tabs.Root>
