import React from "react";
import { Metadata } from "next";
import { getPrivacyPolicyPage } from "@/lib/sanity";
import { PortableText } from "next-sanity";

export const metadata: Metadata = {
  title: "Privacy Policy | CGplux Studios",
  description: "Privacy policy for CGplux Studios.",
};

export default async function PrivacyPolicyPage() {
  const pageData = await getPrivacyPolicyPage().catch(() => null);

  return (
    <section className="pt-32 md:pt-48 pb-16 md:pb-32 overflow-hidden bg-[#0a0a0a] min-h-screen">
      <div className="w-full max-w-[900px] mx-auto px-6 lg:px-12 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-brand-accent/5 blur-[120px] rounded-[100%] pointer-events-none" />
        
        <h1 className="font-heading font-bold tracking-tighter text-4xl md:text-5xl text-white mb-8 md:mb-12">
          {pageData?.title || "Privacy Policy"}
        </h1>
        
        <div className="prose prose-invert prose-brand max-w-none text-white/70 font-light leading-relaxed">
          {pageData?.content ? (
            <PortableText value={pageData.content} />
          ) : (
            <>
              <p className="mb-6">
                At CGplux Studios, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by CGplux Studios and how we use it.
              </p>
              <p className="mb-6">
                If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
              </p>
              
              <h2 className="font-heading font-semibold text-2xl text-white mt-10 mb-4">Information we collect</h2>
              <p className="mb-6">
                The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
              </p>
              <p className="mb-6">
                If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
              </p>

              <h2 className="font-heading font-semibold text-2xl text-white mt-10 mb-4">How we use your information</h2>
              <p className="mb-4">We use the information we collect in various ways, including to:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Provide, operate, and maintain our website</li>
                <li>Improve, personalize, and expand our website</li>
                <li>Understand and analyze how you use our website</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you, either directly or through one of our partners, including for customer service.</li>
              </ul>

              <h2 className="font-heading font-semibold text-2xl text-white mt-10 mb-4">Third-Party Privacy Policies</h2>
              <p className="mb-6">
                CGplux Studios's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information.
              </p>

              <p className="mt-12 text-sm text-white/40">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
