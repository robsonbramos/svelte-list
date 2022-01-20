<script lang="ts">
	import * as icons from '../icons';

	export let name: string;
	export let size: number;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	fill="currentColor"
	viewBox="0 0 16 16"
	{...$$restProps}
>
	{@html icons[name]}
</svg>
