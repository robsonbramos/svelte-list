<script>
	import * as icons from '../icons';

	export let name;
	export let size;
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
