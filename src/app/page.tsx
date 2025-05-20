import SignInForm from "@/components/sign-in-form"
import { VaultXLogo } from "@/components/vaultx-logo"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="flex flex-col items-center justify-center space-y-2">
          <VaultXLogo className="h-16 w-16" />
          <h1 className="text-3xl font-bold text-brown-600">VaultX</h1>
          <p className="text-center text-gray-400">Society Management System</p>
        </div>
        <SignInForm />
      </div>
    </div>
  )
}
