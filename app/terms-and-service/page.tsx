'use client';

import React from "react";

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 pt-48 space-y-6">
      <h1 className="text-4xl font-bold text-center">Terms of Service</h1>
      <p className="text-gray-600 text-center">Effective Date: January 1, 2025</p>

      <p className="text-gray-800">
        Welcome to <strong>Mark</strong> (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). By accessing or using our website, services, and products (collectively, the &ldquo;Services&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms, please do not use our Services.
      </p>

      <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
      <p className="text-gray-800">
        By using our Services, you affirm that you are at least 18 years old (or the legal age in your jurisdiction) and capable of entering into a binding agreement.
      </p>

      <h2 className="text-2xl font-semibold">2. Changes to Terms</h2>
      <p className="text-gray-800">
        We reserve the right to modify these Terms at any time. We will notify users of any changes by updating the effective date at the top of this page. Continued use of our Services after changes are posted constitutes acceptance of the revised Terms.
      </p>

      <h2 className="text-2xl font-semibold">3. Use of Services</h2>
      <ul className="list-disc list-inside text-gray-800 space-y-2">
        <li>Engage in fraudulent, deceptive, or harmful activities.</li>
        <li>Attempt to gain unauthorized access to our systems.</li>
        <li>Use automated means to access or interact with our Services without prior permission.</li>
        <li>Post or share unlawful, abusive, or defamatory content.</li>
      </ul>

      <h2 className="text-2xl font-semibold">4. User Accounts</h2>
      <p className="text-gray-800">
        To access certain features, you may need to create an account. You agree to provide accurate information and keep your credentials secure. We are not responsible for any unauthorized account access or activity resulting from your failure to secure your login credentials.
      </p>

      <h2 className="text-2xl font-semibold">5. Intellectual Property</h2>
      <p className="text-gray-800">
        All content on our website, including text, graphics, logos, images, and software, is the property of Mark or its licensors and is protected by intellectual property laws. You may not copy, modify, distribute, or exploit our content without prior written consent.
      </p>

      <h2 className="text-2xl font-semibold">6. Third-Party Links & Services</h2>
      <p className="text-gray-800">
        Our Services may contain links to third-party websites. We do not control or endorse these sites and are not responsible for their content or practices.
      </p>

      <h2 className="text-2xl font-semibold">7. Disclaimers & Limitation of Liability</h2>
      <p className="text-gray-800">
        Our Services are provided &ldquo;as is&rdquo; without warranties of any kind. We do not guarantee uninterrupted or error-free operation. To the fullest extent permitted by law, we disclaim liability for any direct, indirect, incidental, or consequential damages arising from the use of our Services.
      </p>

      <h2 className="text-2xl font-semibold">8. Termination</h2>
      <p className="text-gray-800">
        We reserve the right to suspend or terminate your access to our Services at our discretion if you violate these Terms or engage in prohibited activities.
      </p>

      <h2 className="text-2xl font-semibold">9. Governing Law & Dispute Resolution</h2>
      <p className="text-gray-800">
      These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law principles. Any dispute arising out of or in connection with these Terms, including any question regarding its existence, validity, or termination, shall be finally settled under the Rules of Arbitration of the International Chamber of Commerce (ICC). The seat of arbitration shall be California, U.S, and the language of arbitration shall be English. The arbitral award shall be final and binding on the parties.
        </p>

      <h2 className="text-2xl font-semibold">10. Contact Information</h2>
      <p className="text-gray-800">
        For any questions regarding these Terms, please contact us at <strong>[Contact@mark.engineering]</strong>.
      </p>

      <p className="text-gray-600 text-center font-medium">Last Updated: January 1, 2025</p>
    </div>
  );
};

export default TermsOfService;