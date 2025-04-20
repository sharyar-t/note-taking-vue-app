<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
import { supabase } from '@/lib/supabaseClient'

const show = ref(false)
const form = reactive({
  email: '',
  password: '',
})
const verificationSent = ref(false)
const verificationEmail = ref(null)

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ name: 'email', message: 'Required' })
  if (!state.password) errors.push({ name: 'password', message: 'Required' })
  return errors
}

async function onSubmit(event: FormSubmitEvent<typeof form>) {
  const { email, password } = event.data
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'http://localhost:5173/auth/sign-in',
    },
  })
  if (data.user.id) {
    verificationSent.value = true
    verificationEmail.value = data.user.email
  }
  console.log(data, error)
}
</script>

<template>
  <div>
    <UCard>
      <template #header>
        <div class="flex flex-col items-center gap-4 text-center">
          <AppLogo />
          <div>
            <h1 class="mb-2 text-2xl font-bold text-neutral-950">Create Your Account</h1>
            <p class="text-sm text-neutral-600">
              Sign up to start organizing your notes and boost your productivity.
            </p>
          </div>
        </div>
      </template>
      <div>
        <UForm
          v-if="!verificationSent"
          :validate="validate"
          :state="form"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormField label="Email Address" name="email">
            <UInput v-model="form.email" type="email" placeholder="email@example.com" />
          </UFormField>
          <UFormField label="Password" name="password">
            <template #help>
              <div class="flex items-center gap-2 text-xs">
                <UIcon name="i-lucide-info" />
                At least 8 characters
              </div>
            </template>

            <UInput
              v-model="form.password"
              :type="show ? 'text' : 'password'"
              :ui="{ trailing: 'pe-1' }"
            >
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  :aria-label="show ? 'Hide password' : 'Show password'"
                  :aria-pressed="show"
                  aria-controls="password"
                  @click="show = !show"
                />
              </template>
            </UInput>
          </UFormField>
          <UButton type="submit">Submit</UButton>
        </UForm>
        <div v-else>
          <p>
            We sent verification link to email:
            <span class="text-primary-500 font-medium">{{ verificationEmail }}</span
            >. Please check.
          </p>
        </div>
      </div>
      <template #footer>
        <div class="flex flex-col items-center gap-4 text-center">
          <p class="text-sm text-neutral-600">
            Already have an account?
            <RouterLink :to="{ name: 'SignIn' }" class="text-neutral-950">Sign In</RouterLink>
          </p>
        </div>
      </template>
    </UCard>
  </div>
</template>
