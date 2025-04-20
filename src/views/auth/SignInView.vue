<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabaseClient'

const toast = useToast()
const router = useRouter()

const hash = window.location.hash.substring(1)
const params = new URLSearchParams(hash)
const error = params.get('error')
// const errorCode = params.get('error_code')
const errorDescription = params.get('error_description')
const access_token = params.get('access_token')
const refresh_token = params.get('refresh_token')
// const expiresIn = params.get('expires_in')
// const expiresAt = params.get('expires_at')
// const tokenType = params.get('token_type')
// const type = params.get('type') // signup / magiclink и т.п.

const show = ref(false)
const form = reactive({
  email: '',
  password: '',
})

const test = ref(window.location.hash)

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ name: 'email', message: 'Required' })
  if (!state.password) errors.push({ name: 'password', message: 'Required' })
  return errors
}

async function onSubmit(event: FormSubmitEvent<typeof form>) {
  const { email, password } = event.data
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    toast.add({
      title: 'Sign in error',
      description: error.message,
      color: 'error',
    })
  } else {
    console.log(data)
    router.push({ name: 'Home' })
  }
}

onMounted(async () => {
  if (error) {
    router.push({ name: 'SignUp' })
    toast.add({
      title: error,
      description: errorDescription,
      color: 'error',
    })
  }
  if (access_token && refresh_token) {
    const { error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    })

    if (error) {
      toast.add({
        title: 'Ошибка авторизации:',
        description: error.message,
        color: 'error',
      })
    } else {
      toast.add({
        title: 'Успешно',
        description: 'Вы успешно вошли в систему',
        color: 'success',
      })
      router.push({ name: 'Home' })
    }
  }
  // Убираем данные из URL
  window.history.replaceState(null, '', window.location.pathname)
})
</script>

<template>
  <div>
    <pre>{{ test }}</pre>
    <UCard>
      <template #header>
        <div class="flex flex-col items-center gap-4 text-center">
          <AppLogo />
          <div>
            <h1 class="mb-2 text-2xl font-bold text-neutral-950">Welcome to Note</h1>
            <p class="text-sm text-neutral-600">Please log in to continue</p>
          </div>
        </div>
      </template>
      <div>
        <UForm :validate="validate" :state="form" class="space-y-4" @submit="onSubmit">
          <UFormField label="Email Address" name="email">
            <UInput v-model="form.email" type="email" placeholder="email@example.com" />
          </UFormField>
          <UFormField label="Password" name="password">
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
      </div>
      <template #footer>
        <div class="flex flex-col items-center gap-4 text-center">
          <p class="text-sm text-neutral-600">
            No account yet?
            <RouterLink :to="{ name: 'SignUp' }" class="text-neutral-950">Sign Up</RouterLink>
          </p>
        </div>
      </template>
    </UCard>
  </div>
</template>
