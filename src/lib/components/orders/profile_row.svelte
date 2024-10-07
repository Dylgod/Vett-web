<script lang="ts">
	const bg_colors: string[] = [
		'bg-red-50',
		'bg-blue-50',
		'bg-purple-50',
		'bg-green-50',
		'bg-pink-50',
		'bg-yellow-50'
	];
	const text_colors: string[] = [
		'text-red-700',
		'text-blue-700',
		'text-purple-700',
		'text-green-700',
		'text-pink-700',
		'text-yellow-700'
	];
	const ring_colors: string[] = [
		'ring-red-300',
		'ring-blue-300',
		'ring-purple-300',
		'ring-green-400',
		'ring-pink-300',
		'ring-yellow-400'
	];

	let colorIndex = 0;

	export let role: string;
	export let candidates: number;
	export let skills: string[];
	export let status: string;

	function getNextColor(): string[] {
		const bg = bg_colors[colorIndex];
		const text = text_colors[colorIndex];
		const ring = ring_colors[colorIndex];
		colorIndex = (colorIndex + 1) % bg_colors.length;
		return [bg, text, ring];
	}

	function truncateRole(text: string, maxLength: number): string {
		if (text.length <= maxLength) return text;
		return text.slice(0, maxLength) + '...';
	}
</script>

<tr>
    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
        <div class="truncate" title={role}>{truncateRole(role, 30)}</div>
    </td>
    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{candidates}</td>
    <td class="px-3 py-4 text-sm text-gray-500">
        <div class="flex flex-wrap gap-1">
            {#each skills as skill}
                {@const [bg, text, ring] = getNextColor()}
                <span class="inline-flex items-center rounded-md {bg} px-2 py-1 text-xs font-medium {text} ring-1 ring-inset {ring}">{skill}</span>
            {/each}
        </div>
    </td>
    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{status}</td>
    <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
        <a href="/profile" class="text-indigo-600 hover:text-indigo-900">Edit<span class="sr-only">, {role}</span></a>
    </td>
</tr>

<!-- <span class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">Badge</span>
<span class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Badge</span>
<span class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">Badge</span>
<span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Badge</span>
<span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">Badge</span>
<span class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">Badge</span>
<span class="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">Badge</span>
<span class="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">Badge</span> -->
