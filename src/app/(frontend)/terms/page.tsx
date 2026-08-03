import React from "react";
import { Metadata } from "next";
import { getTermsPage } from "@/lib/sanity";
import { PortableText } from "next-sanity";

export const metadata: Metadata = {
  title: "Terms and Conditions | CGplux Studios",
  description: "Terms and conditions for using CGplux Studios services.",
};

export default async function TermsPage() {
  const pageData = await getTermsPage().catch(() => null);

  return (
    <section className="pt-32 md:pt-48 pb-16 md:pb-32 overflow-hidden bg-[#0a0a0a] min-h-screen">
      <div className="w-full max-w-[900px] mx-auto px-6 lg:px-12 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-brand-accent/5 blur-[120px] rounded-[100%] pointer-events-none" />
        
        <h1 className="font-heading font-bold tracking-tighter text-4xl md:text-5xl text-white mb-8 md:mb-12">
          {pageData?.title || "Terms & Conditions"}
        </h1>
        
        <div className="prose prose-invert prose-brand max-w-none text-white/70 font-light leading-relaxed">
          {pageData?.content ? (
            <PortableText value={pageData.content} />
          ) : (
            <>
              <p className="mb-6">
                Welcome to CGplux Studios. These terms and conditions outline the rules and regulations for the use of our Website and Services.
              </p>
              <p className="mb-6">
                By accessing this website, we assume you accept these terms and conditions. Do not continue to use CGplux Studios if you do not agree to take all of the terms and conditions stated on this page.
              </p>
              <h2 className="font-heading font-semibold text-2xl text-white mt-10 mb-4">1. License</h2>
              <p className="mb-6">
                Unless otherwise stated, CGplux Studios and/or its licensors own the intellectual property rights for all material on CGplux Studios. All intellectual property rights are reserved. You may access this from CGplux Studios for your own personal use subjected to restrictions set in these terms and conditions.
              </p>
              <h2 className="font-heading font-semibold text-2xl text-white mt-10 mb-4">2. Client Work</h2>
              <p className="mb-6">
                Any projects, including 3D renders, VFX, animations, or UI/UX designs completed for clients, remain the intellectual property of the client upon full payment, unless previously agreed otherwise. We retain the right to showcase the finalized work in our portfolio unless a Non-Disclosure Agreement (NDA) is signed.
              </p>
              <h2 className="font-heading font-semibold text-2xl text-white mt-10 mb-4">3. Revisions and Feedback</h2>
              <p className="mb-6">
                Our standard operating procedures include specific rounds of revisions. Additional revisions outside the scope of the original agreement may incur extra charges. We aim for 100% satisfaction and will work diligently to ensure the final product meets your expectations.
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
