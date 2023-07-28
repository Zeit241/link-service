import { Metadata } from "next"

import SessionProviderWrapper from "@/app/(components)/session-provider"
import Navbar from "@/app/(components)/ui/navbar"

export const metadata: Metadata = {
  title: "Terms of Service - LinkSync",
}
export default function PrivacyPolicy(): JSX.Element {
  return (
    <>
      <SessionProviderWrapper>
        <Navbar />
      </SessionProviderWrapper>
      <div
        className={
          "flex h-auto w-full flex-col items-center justify-center gap-3 p-4 md:p-8"
        }>
        <h1 className={"text-3xl font-bold"}>
          Terms of Service for LinkSync - Link Aggregator Service
        </h1>

        <h2>1. Acceptance and Agreement to Terms</h2>
        <p>
          By registering and using "LinkSync," you acknowledge that you have
          read and agree to our Terms of Service. If you do not agree to these
          terms, please refrain from using our service.
        </p>

        <h2>2. Service Description</h2>
        <p>
          "LinkSync" provides a link aggregation and management service that
          allows users to create, store, and share links to various resources.
        </p>

        <h2>3. Rights and Limitations</h2>
        <p>
          a. Copyrights: You confirm that you will not upload, publish, or share
          materials that violate third-party copyrights or other intellectual
          property rights. You are solely responsible for the content you post
          on "LinkSync."
        </p>
        <p>
          b. Use of Service: You agree to use "LinkSync" in compliance with
          applicable laws and ethical standards. Prohibited actions include
          distributing malware, spam, illegal advertising, violating anyone's
          rights, and engaging in other unlawful activities.
        </p>
        <p>
          c. Confidentiality: We are committed to protecting your privacy and
          data as per our Privacy Policy.
        </p>
        <p>
          d. Liability: "LinkSync" is not liable for any damages resulting from
          the use of our service. You use the service at your own risk.
        </p>

        <h2>4. Account Registration</h2>
        <p>
          Certain features of "LinkSync" may require account registration. You
          agree to provide accurate and complete information during registration
          and maintain the accuracy of your data.
        </p>

        <h2>5. Termination of Service Usage</h2>
        <p>
          We reserve the right to deny or suspend your access to the service at
          any time without prior notice if you violate these Terms or applicable
          laws.
        </p>

        <h2>6. Changes to the Terms</h2>
        <p>
          "LinkSync" may periodically modify these Terms of Service. Changes
          take effect upon publication on our website. By continuing to use the
          service after changes, you acknowledge your acceptance of the updated
          Terms.
        </p>

        <h2>7. Contact Information</h2>
        <p>
          If you have any questions or suggestions regarding our Terms of
          Service, please contact us using the provided contact details on our
          website.
        </p>

        <p>
          Thank you for using "LinkSync." We hope our service will be useful and
          meet your link management needs.
        </p>
      </div>
    </>
  )
}
