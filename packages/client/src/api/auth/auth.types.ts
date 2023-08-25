export interface SignInData {
  login: FormDataEntryValue | null
  password: FormDataEntryValue | null
}

export interface SignUpData extends SignInData {
  first_name: FormDataEntryValue | null
  second_name: FormDataEntryValue | null
  phone: FormDataEntryValue | null
  email: FormDataEntryValue | null
}
