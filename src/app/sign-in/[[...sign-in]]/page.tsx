'use client'

import * as Clerk from '@clerk/elements/common';
import * as SignIn from '@clerk/elements/sign-in';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

export default function SignInPage() {
  return (
    <div className="grid w-full flex-grow items-centerpx-4 sm:justify-center">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="w-full space-y-6 rounded-2xl bg-white px-4 py-10  sm:w-96 sm:px-8"
        >
          <header className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="lucide lucide-briefcase mx-auto size-10 text-zinc-950"
            viewBox="0 0 24 24"
          >
            <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            <rect width="20" height="14" x="2" y="6" rx="2"></rect>
          </svg>
            <h1 className="mt-4 text-xl font-medium tracking-tight text-zinc-950">
              Sign in to Invoice App
            </h1>
          </header>
          <Clerk.GlobalError className="block text-sm text-red-400" />
          <div className="space-y-4">
            <Clerk.Field name="identifier" className="space-y-2">
              <Clerk.Label className="text-sm font-medium text-zinc-950">Username</Clerk.Label>
              <Clerk.Input
                type="text"
                required
                className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
              />
              <Clerk.FieldError className="block text-sm text-red-400" />
            </Clerk.Field>
            <Clerk.Field name="password" className="space-y-2">
              <Clerk.Label className="text-sm  font-medium text-zinc-950">Password</Clerk.Label>
              <Clerk.Input
                type="password"
                required
                className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
              />
              <Clerk.FieldError className="block text-sm text-red-400" />
            </Clerk.Field>
          </div>
          <SignIn.Action
            submit
            asChild
          >
            <Button className='w-full font-bold'>
              Sign In
            </Button>
          </SignIn.Action>
          <Clerk.GlobalError className="block text-sm text-red-400" />
          <div className="space-y-2">
            <Clerk.Connection
              name="google"
              asChild
            >
              <Button className='w-full font-bold'>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 16"
                  className="w-4"
                  aria-hidden
                >
                  <path
                    fill="currentColor"
                    d="M8.82 7.28v2.187h5.227c-.16 1.226-.57 2.124-1.192 2.755-.764.765-1.955 1.6-4.035 1.6-3.218 0-5.733-2.595-5.733-5.813 0-3.218 2.515-5.814 5.733-5.814 1.733 0 3.005.685 3.938 1.565l1.538-1.538C12.998.96 11.256 0 8.82 0 4.41 0 .705 3.591.705 8s3.706 8 8.115 8c2.382 0 4.178-.782 5.582-2.24 1.44-1.44 1.893-3.475 1.893-5.111 0-.507-.035-.978-.115-1.369H8.82Z"
                  />
                </svg>
                Login with Google
              </Button>
            </Clerk.Connection>
          </div>
          <p className="text-center text-sm text-zinc-500">
            No account?{' '}
            <Clerk.Link
              navigate="sign-up"
              className="font-medium text-zinc-950 decoration-zinc-950/20 underline-offset-4 outline-none hover:text-zinc-700 hover:underline focus-visible:underline"
            >
              Sign Up
            </Clerk.Link>
          </p>
        </SignIn.Step>
        <SignIn.Step
          name="verifications"
          className="relative isolate w-full space-y-8 rounded-2xl px-4 py-10  sm:w-96 sm:px-8"
        >
          <header className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="lucide lucide-briefcase mx-auto size-10 text-zinc-950"
              viewBox="0 0 24 24"
            >
              <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              <rect width="20" height="14" x="2" y="6" rx="2"></rect>
            </svg>
            <h1 className="mt-4 text-xl font-medium tracking-tight text-zinc-950">
              Verify Authenticator Code
            </h1>
          </header>
          <Clerk.GlobalError className="block text-sm text-rose-400" />
          <SignIn.Strategy name="totp">
            <Clerk.Field name="code" className="group/field relative">
              <Clerk.Label className="sr-only">
                Phone code
              </Clerk.Label>
              <Clerk.Input
                type="otp"
                required
                className="flex justify-center gap-1"
                render={({ value, status }) => (
                  <div
                    data-status={status}
                    className="relative h-9 w-8 mr-3 rounded-md bg-white ring-1 ring-inset ring-zinc-950 data-[status=selected]:bg-sky-400/10 data-[status=selected]:shadow-[0_0_8px_2px_theme(colors.sky.400/30%)] data-[status=selected]:ring-sky-400"
                  >
                    <AnimatePresence>
                      {value && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.75 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.75 }}
                          className="absolute inset-0 flex items-center justify-center text-zinc-950"
                        >
                          {value}
                        </motion.span>
                      )}
                      {value}
                    </AnimatePresence>
                    {status === 'cursor' && (
                      <motion.div
                        layoutId="otp-input-focus"
                        transition={{ ease: [0.2, 0.4, 0, 1], duration: 0.2 }}
                        className="absolute inset-0 z-10 rounded-[inherit] border border-sky-400 bg-sky-400/10 shadow-[0_0_8px_2px_theme(colors.sky.400/30%)]"
                      />
                    )}
                  </div>
                )}
              />
              <Clerk.FieldError className="mt-2 block text-xs text-rose-400" />
            </Clerk.Field>
            <SignIn.Action
              submit
              asChild
            >
              <Button className='w-full font-bold'>
                Continue
              </Button>
            </SignIn.Action>
          </SignIn.Strategy>
          <p className="text-center text-sm text-zinc-950">
            No account?{' '}
            <Clerk.Link
              navigate="sign-up"
              className="text-zinc-950 decoration-white/30 underline-offset-4 outline-none hover:underline focus-visible:underline"
            >
              Sign Up
            </Clerk.Link>
          </p>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  )
}