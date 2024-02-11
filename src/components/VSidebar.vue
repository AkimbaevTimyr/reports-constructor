<template>
	<div class="sidebar flex flex-col">
		<sidebar-menu :pdf="pdf"></sidebar-menu>
		<sidebar-button :pdf="pdf"></sidebar-button>
	</div>
</template>

<script>
import SidebarMenu from '@/components/Sidebar/SidebarMenu';
import SidebarButton from '@/components/Sidebar/SidebarButton';

export default {
    props: {
        pdf: {
            required: true
        }
    },
	components: {
		SidebarMenu,
		SidebarButton,
	}
}
</script>

<style scoped>
.sidebar {
	width: 240px;
	min-width: 200px;
}
</style>