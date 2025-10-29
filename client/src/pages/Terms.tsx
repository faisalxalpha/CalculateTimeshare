import { Card } from "@/components/ui/card";

export default function Terms() {
  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-sans font-bold mb-6">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">Last Updated: October 2025</p>

        <Card className="p-8 prose prose-lg max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using CalculateTimeshare.com, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
          </p>

          <h2>2. Use of Calculators</h2>
          <p>
            Our calculators are provided for informational purposes only. While we strive for accuracy, calculations are estimates based on the information you provide and standard industry assumptions.
          </p>
          <ul>
            <li>Results should not be considered professional financial or legal advice</li>
            <li>Actual costs may vary based on your specific timeshare contract</li>
            <li>We are not responsible for decisions made based on calculator results</li>
          </ul>

          <h2>3. No Professional Relationship</h2>
          <p>
            Use of this website does not create an attorney-client, financial advisor-client, or any other professional relationship. For specific advice regarding your situation, consult with qualified professionals.
          </p>

          <h2>4. Accuracy of Information</h2>
          <p>
            We make reasonable efforts to ensure information on our website is accurate and up-to-date. However:
          </p>
          <ul>
            <li>Information may become outdated or inaccurate</li>
            <li>We do not guarantee the accuracy of third-party content</li>
            <li>Users are responsible for verifying information independently</li>
          </ul>

          <h2>5. User Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the website for any illegal purpose</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with the proper functioning of the website</li>
            <li>Submit false or misleading information</li>
            <li>Use automated systems to access the website without permission</li>
          </ul>

          <h2>6. Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, and software, is the property of CalculateTimeshare.com or its licensors and is protected by copyright and other intellectual property laws.
          </p>

          <h2>7. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the content, accuracy, or practices of these external sites.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, CalculateTimeshare.com shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the website or reliance on information provided.
          </p>

          <h2>9. Modifications to Service</h2>
          <p>
            We reserve the right to modify, suspend, or discontinue any aspect of our service at any time without notice.
          </p>

          <h2>10. Changes to Terms</h2>
          <p>
            We may update these Terms of Service periodically. Continued use of the website after changes constitutes acceptance of the new terms.
          </p>

          <h2>11. Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles.
          </p>

          <h2>12. Contact Information</h2>
          <p>
            For questions about these Terms of Service, contact us at:
            <br />
            Email: legal@calculatetimeshare.com
            <br />
            Phone: (800) 555-1234
          </p>
        </Card>
      </div>
    </div>
  );
}
