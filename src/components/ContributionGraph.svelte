<script lang="ts">
  import { onMount, tick } from "svelte";

  type Day = { date: string; count: number; level: number };
  type Data = { total: Record<string, number>; contributions: Day[] };

  let {
    user,
    seed = null,
  }: { user: string; seed?: Data | null } = $props();

  /** the build embeds a snapshot as `seed`, so the graph is present without JS
   *  and stays readable if the API is unreachable when the page is opened */
  let data = $state<Data | null>(seed);
  let failed = $state(false);
  let scroller: HTMLDivElement;

  const endpoint = `https://github-contributions-api.jogruber.de/v4/${user}?y=last`;

  onMount(async () => {
    try {
      const res = await fetch(endpoint, { signal: AbortSignal.timeout(8000) });
      if (!res.ok) throw new Error(String(res.status));
      data = await res.json();
    } catch {
      failed = data === null;
    }
    // the recent weeks are the interesting end, so start scrolled to them.
    // waits for the grid to be in the DOM before measuring it.
    await tick();
    if (scroller) scroller.scrollLeft = scroller.scrollWidth;
  });

  const levels = [
    "bg-dark-04 border-dark-10 border",
    "bg-[#0e4429]",
    "bg-[#006d32]",
    "bg-[#26a641]",
    "bg-[#39d353]",
  ];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const utc = (date: string) => new Date(`${date}T00:00:00Z`);

  /** columns of seven, Sunday first, with the first week padded like GitHub */
  function toWeeks(days: Day[]) {
    const weeks: (Day | null)[][] = [];
    let week: (Day | null)[] = Array(utc(days[0].date).getUTCDay()).fill(null);

    for (const day of days) {
      week.push(day);
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }
    if (week.length) weeks.push([...week, ...Array(7 - week.length).fill(null)]);

    return weeks;
  }

  /** a month is labelled on the first week that carries one of its early days */
  function toMonthLabels(weeks: (Day | null)[][]) {
    const labels: (string | null)[] = [];
    let last = -1;

    for (const week of weeks) {
      const first = week.find((day) => day !== null);
      const date = first ? utc(first.date) : null;

      if (date && date.getUTCMonth() !== last && date.getUTCDate() <= 7) {
        last = date.getUTCMonth();
        labels.push(months[last]);
      } else {
        labels.push(null);
      }
    }

    return labels;
  }

  function describe(day: Day) {
    const date = utc(day.date);
    const when = `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
    return day.count === 1
      ? `1 contribution on ${when}`
      : `${day.count} contributions on ${when}`;
  }

  let weeks = $derived(data ? toWeeks(data.contributions) : []);
  let labels = $derived(toMonthLabels(weeks));
  let total = $derived(data ? Object.values(data.total)[0] : 0);
</script>

<div
  class="rounded-card border-border-card bg-background-alt shadow-card border p-5"
>
  <div class="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
    <p class="text-[15px] font-medium">
      {#if data}
        {total.toLocaleString("en")} contributions in the last year
      {:else if failed}
        Contribution graph unavailable
      {:else}
        Loading contributions
      {/if}
    </p>

    <a
      href={`https://github.com/${user}`}
      target="_blank"
      rel="noreferrer noopener"
      class="text-muted-foreground hover:text-foreground rounded-button text-sm transition-colors"
    >
      @{user}
    </a>
  </div>

  {#if data}
    <div class="overflow-x-auto pb-1" bind:this={scroller}>
      <div
        class="min-w-max"
        role="img"
        aria-label={`GitHub contribution graph: ${total} contributions in the last year`}
      >
        <div class="flex gap-[3px] pl-9">
          {#each labels as label}
            <div
              class="text-muted-foreground relative h-4 w-[11px] text-[10px] leading-4"
            >
              {#if label}
                <span class="absolute left-0 top-0 whitespace-nowrap">
                  {label}
                </span>
              {/if}
            </div>
          {/each}
        </div>

        <div class="flex gap-[3px]">
          <div
            class="text-muted-foreground flex w-9 shrink-0 flex-col gap-[3px] text-[10px]"
          >
            {#each ["", "Mon", "", "Wed", "", "Fri", ""] as day}
              <div class="h-[11px] leading-[11px]">{day}</div>
            {/each}
          </div>

          {#each weeks as week}
            <div class="flex flex-col gap-[3px]">
              {#each week as day}
                {#if day}
                  <div
                    class="size-[11px] rounded-[2px] {levels[day.level]}"
                    title={describe(day)}
                  ></div>
                {:else}
                  <div class="size-[11px]"></div>
                {/if}
              {/each}
            </div>
          {/each}
        </div>
      </div>
    </div>

    <div
      class="text-muted-foreground mt-4 flex items-center justify-end gap-1.5 text-[11px]"
    >
      <span>Less</span>
      {#each levels as level}
        <div class="size-[11px] rounded-[2px] {level}"></div>
      {/each}
      <span>More</span>
    </div>
  {:else}
    <div class="border-dark-10 h-[104px] rounded-[7px] border border-dashed"></div>
  {/if}
</div>
