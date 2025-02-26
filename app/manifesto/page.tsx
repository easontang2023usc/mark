'use client';
import Head from 'next/head';
import WaitlistDialog from '@/components/waitlistForm';

export default function Manifesto() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased mt-12">
      <Head>
        <title>Mark | Unlock Your Intellectual Potential</title>
        <meta name="description" content="Mark - The AI-Enhanced Bookmark for print books" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        {/* Logo + Tagline */}
        <div className="text-center mb-20">
          <h1 className="text-4xl font-bold mb-4">Manifesto</h1>
          {/* <p className="text-2xl text-gray-600 font-light">Mark</p> */}
        </div>

        {/* Manifesto Content */}
        <div className="space-y-12">

          {/* Initial Storytelling */}
          <section className="border-b border-gray-100 pb-12">
            <h2 className="text-2xl font-semibold mb-8">The World’s Knowledge at Your Fingertips</h2>
            <p className="text-lg text-gray-700">
              The world holds centuries of brilliance—<strong>Einstein’s physics, Nietzsche’s philosophy, Jobs’ innovation. </strong> 
               Visionaries spend lifetimes refining ideas, making breakthroughs, and distilling their wisdom into books.
            </p>
            <p className="text-lg text-gray-700 mt-6">
              Yet instead of tapping into this gift, most people are <strong>stuck in the endless scroll. </strong> 
              Imagine the innovations that could happen—or worse, the ones that won’t—if we continue prioritizing fleeting content over deep knowledge.
            </p>
          </section>

          {/* Current World of Books */}
          <section className="border-b border-gray-100 pb-12">
            <h2 className="text-2xl font-semibold mb-8">The State of Reading</h2>
            
            <p className="text-lg text-gray-700">
              Big tech has tried to digitize reading—pushing eBooks and Kindles as the future. 
              But screens fragment focus, and digital reading has never replaced the depth of physical books.
            </p>

            <ul className="list-disc ml-6 space-y-5 text-lg text-gray-700 mt-4">
              <li><strong>65% of Americans still prefer print</strong>—the texture, the weight of a book, the immersive experience.</li>
              <li>In <strong>2023, over 757 million print books</strong> were sold in the U.S.—a testament to the enduring power of physical reading.</li>
            </ul>

            <p className="text-lg text-gray-700 mt-4">
              Yet, while print remains king, it lacks what digital tools offer: <strong>engagement, accessibility, and efficiency.</strong>
            </p>
          </section>

          {/* Introducing Mark */}
          <section className="border-b border-gray-100 pb-12 text-center">
            <h2 className="text-2xl font-semibold mb-8">Introducing Mark</h2>
            <p className="text-lg text-gray-700">
              Readers want to get lost in books and absorb knowledge—not just passively consume words.
            </p>
            <p className="text-lg font-semibold text-gray-900 mt-6">
              {/* <strong>Mark is the key to this shift.</strong>  */}
              More than a product, Mark is an ecosystem designed to make reading engaging, seamless, and impactful.
            </p>
          </section>

         {/* How Mark Works & Design */}
<section className="border-b border-gray-100 pb-12">
  <h2 className="text-2xl font-semibold mb-8 text-center">How Mark Works</h2>

  <p className="text-lg text-gray-700 text-center">
    With Mark, you read your physical book as usual.  
    When you are done, simply slip Mark into your book, and it instantly syncs to your devices—unlocking a smarter way to engage with what you read.
  </p>

  <ul className="list-disc ml-6 space-y-5 text-lg text-gray-700 mt-6">
    <li><strong>Intelligent Personalized Summaries</strong>.  
      Instantly generates insights from what you just read, customized to highlight key themes, quotes, and stats.
    </li>
    <li><strong>A Connected Reading Community</strong>.  
      Discuss ideas and stay motivated, just like Strava—but for books.
    </li>
    <li><strong>Personalized Data & Tracking</strong>.  
      Monitor reading pace, progress, and trends.  
      Get <strong>Mark Wrapped</strong>—a yearly recap of everything you’ve learned.
    </li>
  </ul>

  <div className="text-center mt-10">
    {/* <h3 className="text-xl font-semibold">Designed for Thinkers</h3> */}
    <p className="text-lg text-gray-700 mt-4">
      Crafted from <strong>Grade 5 titanium</strong> and inspired by <strong>Bauhaus design</strong>, Mark seamlessly fits into your pages.  
      It’s a <strong>statement of elegance, intelligence, and status.</strong>
    </p>
  </div>
</section>
         

          {/* Our Mission */}
          <section className="border-b border-gray-100 pb-12 text-center">
            <h2 className="text-2xl font-semibold mb-8">Our Mission</h2>
            <p className="text-lg text-gray-700">
              <strong>“To transform the reading experience and revolutionize how people absorb knowledge—making it more engaging, intuitive, and impactful.”</strong>
            </p>
            <p className="text-lg text-gray-700 mt-6">
              By reshaping the way we read, we unlock intellectual potential and empower individuals to create meaningful change in the world.
            </p>
            <p className="text-xl font-semibold mt-6">
              Learning is the key to a brighter tomorrow.
            </p>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <h2 className="text-2xl font-semibold mb-8">Join the Movement</h2>
            <p className="text-lg text-gray-700">
              Let’s build the future of reading together.
            </p>
            <div className="mt-6">
              <WaitlistDialog />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}