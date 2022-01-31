<script lang="ts">
	import * as icons from '../icons';

	export let name: string;
</script>

<span {...$$restProps}>
	{@html icons[name]}
</span>
