import { Metadata } from "next"

import SessionProviderWrapper from "@/app/(components)/session-provider"
import Navbar from "@/app/(components)/ui/navbar"

export const metadata: Metadata = {
  title: "Privacy Policy - LinkSync",
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
          Privacy Policy for LinkSync - Link Aggregator Service
        </h1>

        <p>
          At "LinkSync," we value your privacy and are committed to protecting
          your personal information. This Privacy Policy outlines how we
          collect, use, disclose, and safeguard your data when you use our link
          aggregator service. By using "LinkSync," you consent to the practices
          described in this policy.
        </p>

        <h3>1. Information Collection and Use</h3>
        <p>
          a. Personal Information: We may collect personally identifiable
          information, such as your name, email address, and other relevant
          details, when you register an account or use certain features of our
          service. This information is necessary for providing you with access
          to our service and ensuring a personalized user experience.
        </p>
        <p>
          b. Non-Personal Information: We may automatically collect non-personal
          information, such as your device's IP address, browser type, operating
          system, and usage patterns, to analyze trends, administer the service,
          and improve our offerings.
        </p>

        <h3>2. Cookies and Tracking Technologies</h3>
        <p>
          a. Cookies: "LinkSync" may use cookies and similar technologies to
          enhance your browsing experience. Cookies are small data files stored
          on your device that help us remember your preferences and optimize our
          service. You can adjust your browser settings to manage or disable
          cookies, but some features of the service may not function correctly
          as a result.
        </p>
        <p>
          b. Tracking Technologies: We may also use web beacons and other
          tracking technologies to gather information about your interactions
          with our service and email communications. This information helps us
          analyze user behavior and improve our service.
        </p>

        <h3>3. Information Sharing and Disclosure</h3>
        <p>
          a. Third-Party Service Providers: "LinkSync" may engage reputable
          third-party service providers to assist us in delivering our services.
          These providers are obligated to keep your information confidential
          and are not permitted to use it for any other purposes.
        </p>
        <p>
          b. Legal Compliance: We may disclose your personal information if
          required to do so by law or if we believe that such action is
          necessary to comply with legal obligations or protect our rights,
          safety, or the rights and safety of others.
        </p>

        <h3>4. Data Security</h3>
        <p>
          We implement industry-standard security measures to protect your
          personal information from unauthorized access, use, or disclosure.
          However, no data transmission over the internet or electronic storage
          method is entirely secure, and we cannot guarantee the absolute
          security of your data.
        </p>

        <h3>5. Children's Privacy</h3>
        <p>
          "LinkSync" is not intended for children under the age of 13. We do not
          knowingly collect personal information from individuals under 13 years
          of age. If we become aware that we have inadvertently gathered data
          from a child under 13, we will promptly delete it.
        </p>

        <h3>6. Changes to this Privacy Policy</h3>
        <p>
          We may update this Privacy Policy from time to time, and any changes
          will be posted on our website. Please review this policy periodically
          to stay informed of how we handle your data.
        </p>

        <h3>7. Contact Us</h3>
        <p>
          If you have any questions, concerns, or requests regarding our Privacy
          Policy or the use of your personal information, please contact us
          using the provided contact information on our website.
        </p>

        <p>
          Thank you for entrusting your link management to "LinkSync." We are
          dedicated to maintaining your privacy and providing you with a secure
          and reliable service.
        </p>
      </div>
    </>
  )
}
