import { Card } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-sans font-bold mb-6">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last Updated: October 2025</p>

        <Card className="p-8 prose prose-lg max-w-none">
          <h2>1. Information We Collect</h2>
          <p>
            When you use our calculators or contact forms, we collect information you provide directly including your name, email address, phone number, and details about your timeshare ownership.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide calculation results and exit recommendations</li>
            <li>Respond to your inquiries and requests</li>
            <li>Send you relevant information about timeshare exit options</li>
            <li>Improve our services and user experience</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>3. Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share your information with:
          </p>
          <ul>
            <li>Service providers who assist in our operations</li>
            <li>Professional timeshare exit companies (only with your consent)</li>
            <li>Legal authorities when required by law</li>
          </ul>

          <h2>4. Cookies and Tracking</h2>
          <p>
            We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and understand user behavior. You can control cookie preferences through your browser settings.
          </p>

          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
          </p>

          <h2>6. Your Rights</h2>
          <p>Depending on your location, you may have rights to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
            <li>Object to processing of your data</li>
          </ul>

          <h2>7. Children's Privacy</h2>
          <p>
            Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children.
          </p>

          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of significant changes by posting the new policy on this page.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have questions about this privacy policy, please contact us at:
            <br />
            Email: privacy@calculatetimeshare.com
            <br />
            Phone: (800) 555-1234
          </p>
        </Card>
      </div>
    </div>
  );
}
