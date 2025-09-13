<template>
	<div class="login-form">
		<div class="login-form-wrapper">
			<form @submit.prevent="handleLogin">
				<!-- <v-img
				class="mx-auto my-6"
				max-width="228"
				src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
		></v-img> -->

				<v-card
					class="mx-auto pa-12 pb-8"
					elevation="8"
					max-width="448"
					rounded="lg"
				>
					<div class="text-subtitle-1 text-medium-emphasis">Account</div>

					<v-text-field
						v-model="email"
						density="compact"
						placeholder="Email address"
						prepend-inner-icon="mdi-email-outline"
						variant="outlined"
					></v-text-field>

					<!-- <div
						class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
					>
						Password

						<a
							class="text-caption text-decoration-none text-blue"
							href="#"
							rel="noopener noreferrer"
							target="_blank"
						>
							Forgot login password?</a
						>
					</div> -->

					<v-text-field
						v-model="password"
						:append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
						:type="visible ? 'text' : 'password'"
						density="compact"
						placeholder="Enter your password"
						prepend-inner-icon="mdi-lock-outline"
						variant="outlined"
						@click:append-inner="visible = !visible"
					></v-text-field>

					<!-- <v-card class="mb-12" color="surface-variant" variant="tonal">
				<v-card-text class="text-medium-emphasis text-caption">
					Warning: After 3 consecutive failed login attempts, you account will
					be temporarily locked for three hours. If you must login now, you can
					also click "Forgot login password?" below to reset the login password.
				</v-card-text>
			</v-card> -->

					<v-btn
						class="mb-8"
						color="blue"
						size="large"
						variant="tonal"
						block
						@click="handleLogin"
					>
						Log In
					</v-btn>

					<!-- <v-card-text class="text-center">
				<a
					class="text-blue text-decoration-none"
					href="#"
					rel="noopener noreferrer"
					target="_blank"
				>
					Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
				</a>
			</v-card-text> -->
				</v-card>
			</form>
		</div>
	</div>
</template>
<script setup>
const supabase = useSupabaseClient();
const loading = ref(false);
const email = ref("");
const password = ref("");

const handleLogin = async () => {
	try {
		loading.value = true;
		const { error } = await supabase.auth.signInWithPassword({
			email: email.value,
			password: password.value,
		});
		if (error) throw error;
		alert("Check your email for the login link!");
	} catch (error) {
		alert(error.error_description || error.message);
	} finally {
		loading.value = false;
	}
};
</script>

<style lang="scss" scoped>
.login-form {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.login-form-wrapper {
	max-width: 480px;
	width: 100%;
}
</style>
