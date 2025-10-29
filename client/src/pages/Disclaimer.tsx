import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Disclaimer() {
  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-sans font-bold mb-6">Disclaimer</h1>
        <p className="text-sm text-muted-foreground mb-8">Last Updated: October 2025</p>

        <Alert className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Important:</strong> This website provides general information and educational resources only. 
            It is not intended as legal, financial, or professional advice for your specific situation.
          </AlertDescription>
        </Alert>

        <Card className="p-8 prose prose-lg max-w-none">
          <h2>General Disclaimer</h2>
          <p>
            The information provided on CalculateTimeshare.com is for general informational and educational purposes only. Nothing on this website should be construed as professional advice specific to your individual circumstances.
          </p>

          <h2>Calculator Accuracy</h2>
          <p>
            Our calculators provide <strong>estimates only</strong> based on:
          </p>
          <ul>
            <li>Information you provide</li>
            <li>Industry-standard assumptions</li>
            <li>Historical data and trends</li>
          </ul>
          <p>
            <strong>Actual costs may differ significantly</strong> from calculated estimates due to:
          </p>
          <ul>
            <li>Specific terms of your timeshare contract</li>
            <li>Resort-specific fee structures</li>
            <li>Special assessments and unexpected charges</li>
            <li>Changes in market conditions</li>
            <li>Variations in annual fee increases</li>
          </ul>

          <h2>Not Professional Advice</h2>
          <p>
            The information and tools on this website are <strong>not substitutes for professional advice</strong>. For guidance specific to your situation, we strongly recommend consulting with:
          </p>
          <ul>
            <li><strong>Attorneys:</strong> For legal advice about contracts and exit options</li>
            <li><strong>Financial Advisors:</strong> For financial planning and investment decisions</li>
            <li><strong>Tax Professionals:</strong> For tax implications of timeshare ownership or exit</li>
            <li><strong>Licensed Real Estate Professionals:</strong> For resale market guidance</li>
          </ul>

          <h2>Exit Options Information</h2>
          <p>
            Information about timeshare exit options is provided for educational purposes. We do not:
          </p>
          <ul>
            <li>Guarantee any specific outcome from any exit method</li>
            <li>Endorse specific exit companies or services</li>
            <li>Warrant the success of any particular exit strategy</li>
            <li>Provide legal representation or negotiate on your behalf</li>
          </ul>

          <h2>Third-Party Information</h2>
          <p>
            We may reference or link to third-party services, companies, or resources. These references:
          </p>
          <ul>
            <li>Do not constitute endorsements</li>
            <li>Are provided for informational purposes only</li>
            <li>Should be independently researched and verified</li>
            <li>May change without notice to us</li>
          </ul>

          <h2>No Warranties</h2>
          <p>
            This website and all information provided are offered "as is" without warranties of any kind, either express or implied, including but not limited to:
          </p>
          <ul>
            <li>Accuracy or completeness of information</li>
            <li>Fitness for a particular purpose</li>
            <li>Non-infringement of third-party rights</li>
            <li>Uninterrupted or error-free operation</li>
          </ul>

          <h2>Limitation of Liability</h2>
          <p>
            <strong>In no event</strong> shall CalculateTimeshare.com or its operators be liable for:
          </p>
          <ul>
            <li>Decisions made based on information from this website</li>
            <li>Losses or damages arising from use of our calculators</li>
            <li>Results from following any suggested exit strategies</li>
            <li>Indirect, consequential, or incidental damages</li>
          </ul>

          <h2>User Responsibility</h2>
          <p>
            By using this website, you acknowledge and agree that:
          </p>
          <ul>
            <li>You are responsible for verifying all information</li>
            <li>You will seek professional advice for important decisions</li>
            <li>You understand calculators provide estimates only</li>
            <li>You will not rely solely on information from this website</li>
            <li>You accept full responsibility for your decisions</li>
          </ul>

          <h2>Changes and Updates</h2>
          <p>
            Information on this website may change without notice. We are not obligated to update information and make no commitment to do so.
          </p>

          <h2>Questions</h2>
          <p>
            If you have questions about this disclaimer or any information on our website, please contact us at:
            <br />
            Email: info@calculatetimeshare.com
            <br />
            Phone: (800) 555-1234
          </p>

          <div className="bg-muted/50 p-6 rounded-lg mt-8">
            <p className="text-sm mb-0">
              <strong>Remember:</strong> Always consult with qualified professionals before making important financial or legal decisions regarding your timeshare. Our tools and information are designed to help you ask better questions and understand general concepts, not to replace professional guidance.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
