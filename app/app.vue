<template>
	<v-app>
		<v-layout full-height>
			<Sidebar />
			<v-main>
				<NuxtPage />
			</v-main>
		</v-layout>
		<Settings />
	</v-app>
</template>

<script lang="ts">
import Sidebar from "~/components/global/Sidebar/Sidebar.vue";
import Settings from "~/components/global/Settings/Settings.vue";

export default {
	components: {
		Sidebar,
		Settings,
	},
	setup() {},
};
</script>

<style lang="scss" scoped></style>
