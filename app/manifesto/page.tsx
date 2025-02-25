'use client'
// pages/manifesto.js
import Head from 'next/head';
import WaitlistDialog from '@/components/waitlistForm';

export default function Manifesto() {

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased mt-12">
      <Head>
        <title>Mark | Unlock your Intellectual Potential</title>
        <meta name="description" content="Mark - The AI-Enhanced Bookmark for print books" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        {/* Logo + Tagline */}
        <div className="text-center mb-20">
          <h1 className="text-4xl font-bold mb-4">Mark</h1>
          <p className="text-2xl text-gray-600 font-light">Unlock your Intellectual Potential</p>
        </div>

        {/* Manifesto Content */}
        <div className="space-y-12">
          {/* The Problem */}
          <section className="border-b border-gray-100 pb-12">
            <h2 className="text-2xl font-semibold mb-8">The Problem</h2>
            <ul className="space-y-5">
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>
                  <strong>65%</strong> of U.S. adults still prefer physical books, yet few tools exist to help them retain information.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>
                  Readers forget up to <strong>70%</strong> of new insights in a single day without reinforcement.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>
                  Current digital solutions disrupt focus, forcing manual logs on distracting devices.
                </span>
              </li>
            </ul>
          </section>

          {/* Our Goal */}
          <section className="border-b border-gray-100 pb-12">
            <h2 className="text-2xl font-semibold mb-8">Our Goal</h2>
            <ul className="space-y-5">
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>
                  <strong>Shatter the power law</strong> of innovation by empowering more readers to become active creators.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>
                  Turn <strong>print reading</strong> into a smarter, more connected experience.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>
                  <strong>Elevate knowledge retention</strong> for a future shaped by lifelong learners.
                </span>
              </li>
            </ul>
          </section>

          {/* The Key */}
          <section className="border-b border-gray-100 pb-12">
            <h2 className="text-2xl font-semibold mb-8">The Key</h2>
            <ul className="space-y-5">
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>
                  Reading <strong>sparks curiosity</strong> and <strong>cultivates growth</strong>&mdash;but only if you remember what you&apos;ve learned.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>
                  <strong>Mark</strong> seamlessly unites physical books with AI-driven recall, eliminating friction and forgetfulness.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>
                  A <strong>community-powered</strong> ecosystem inspires accountability, much like &ldquo;Strava for books.&rdquo;
                </span>
              </li>
            </ul>
          </section>

          {/* How We Do It */}
          <section className="border-b border-gray-100 pb-12">
            <h2 className="text-2xl font-semibold mb-8">How We Do It</h2>
            <ul className="space-y-5">
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>
                  <strong>AI-Enhanced Bookmark</strong>: Automatically captures and summarizes key points from every page you read.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>
                  <strong>Spaced Repetition</strong>: Reinforces critical insights to combat the forgetting curve.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>
                  <strong>Beautiful, Aspirational Design</strong>: A sleek statement piece—where tech meets timeless craftsmanship.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>
                  <strong>Data-Driven Community</strong>: Track progress, compare with friends, and stay motivated to finish more books.
                </span>
              </li>
            </ul>
          </section>

          {/* Why It Matters */}
          <section className="border-b border-gray-100 pb-12">
            <h2 className="text-2xl font-semibold mb-8">Why It Matters</h2>
            <ul className="space-y-5">
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>
                  In 2023, <strong>757+ million</strong> print books sold in the U.S.—proof that physical reading endures.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>
                  <strong>AI hardware</strong> is booming, projected to reach <strong>$1,047.1B</strong> by 2033, reflecting demand for smarter daily tools.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>
                  More readers retaining more knowledge means <strong>more ideas</strong>—and more <strong>world-changing innovation</strong>.
                </span>
              </li>
            </ul>
          </section>

          {/* Join Us */}
          <section className="border-b border-gray-100 pb-12">
            <h2 className="text-2xl font-semibold mb-8">Join Us</h2>
            <ul className="space-y-5">
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>
                  <strong>Reclaim</strong> your autonomy in an age of digital distraction.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>
                  <strong>Expand</strong> your mind and <strong>solidify</strong> what you learn.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>
                  <strong>Shape</strong> your future—and ours—by unlocking the true power of reading.
                </span>
              </li>
            </ul>
          </section>

          {/* Final Statement */}
          <section className="py-8">
            <p className="text-xl font-medium">
              <strong>Mark</strong> is here to <strong>redefine</strong> what reading can be: a blend of timeless print, cutting-edge AI, and a community that keeps you turning pages.
            </p>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <WaitlistDialog/>
        </div>
      </main>
    </div>
  );
}