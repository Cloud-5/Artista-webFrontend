import { Component } from '@angular/core';

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.component.html',
  styleUrl: './help-center.component.css'
})
export class HelpCenterComponent {




  categories = [
    {
      name: 'General', questions: [
        { question: "What is Artista?", answer: "Artista is an online digital art marketplace that connects artists and art enthusiasts." },
        { question: "How do I create an account?", answer: "To create an account, click on the 'Sign Up' button on the homepage and follow the instructions." },
        { question: "Is Artista free to use?", answer: "Yes, creating an account on Artista is free. However, there are fees for certain premium features and transactions." },
        { question: "What types of art can I find on Artista?", answer: "You can find digital paintings, 3D models, animations, generative art, AR/VR artworks, and more." },
        { question: "How do I search for artwork?", answer: "Use the search bar at the top of the page and enter keywords related to the art you are looking for." },
        { question: "Can I follow my favorite artists?", answer: "Yes, you can follow your favorite artists by visiting their profile and clicking the 'Follow' button." },
        { question: "How do I contact customer support?", answer: "You can contact customer support by clicking on the 'Help' section and submitting a support ticket." },
        { question: "What are the community guidelines?", answer: "Community guidelines include rules on respectful interaction, appropriate content, and constructive feedback." },
        { question: "How do I report inappropriate content?", answer: "To report inappropriate content, click on the 'Report' button associated with the artwork or user profile and provide a reason for the report." },
        { question: "How do I block or unblock a user?", answer: "You can block or unblock a user by visiting their profile and selecting the 'Block/Unblock' option from the menu." }
      ]
    },
    {
      name: 'Account Management', questions: [
        { question: "How do I reset my password?", answer: "To reset your password, go to the 'Forgot Password' page and follow the instructions." },
        { question: "How do I update my profile information?", answer: "Update your profile information by going to 'Account Settings' and editing your details." },
        { question: "Can I delete my account?", answer: "Yes, you can delete your account by going to 'Account Settings' and selecting the 'Delete Account' option." },
        { question: "How do I change my email address?", answer: "Change your email address by going to 'Account Settings' and updating your email information." },
        { question: "What should I do if I forgot my username?", answer: "If you forgot your username, use the 'Forgot Username' feature on the login page." },
        { question: "How do I manage my notification settings?", answer: "Manage your notification settings by going to 'Account Settings' and selecting 'Notifications'." },
        { question: "Can I link my social media accounts?", answer: "Yes, you can link your social media accounts by going to 'Account Settings' and adding your social media profiles." },
        { question: "How do I verify my account?", answer: "Verify your account by following the instructions sent to your email upon registration." },
        { question: "Why was my account suspended?", answer: "Accounts may be suspended for violating community guidelines or terms of service. Contact customer support for more information." },
        { question: "How do I recover a hacked account?", answer: "If your account is hacked, contact customer support immediately to secure your account." }
      ]
    },
    {
      name: 'Buying and Selling', questions: [
        { question: "How do I buy artwork?", answer: "To buy artwork, browse the marketplace, select the piece you like, and follow the purchase instructions." },
        { question: "What payment methods are accepted?", answer: "We accept various payment methods including credit cards, PayPal, and other digital payment options." },
        { question: "How do I sell my artwork?", answer: "To sell your artwork, create an account, upload your artwork, set a price, and list it on the marketplace." },
        { question: "What are the seller fees?", answer: "Seller fees include a commission on sales and any applicable transaction fees." },
        { question: "How do I set prices for my artwork?", answer: "Set prices for your artwork based on your costs, market demand, and artistic value." },
        { question: "Can I negotiate prices with buyers?", answer: "Yes, you can negotiate prices with buyers through the messaging system." },
        { question: "How do I handle shipping?", answer: "For physical artworks, arrange shipping with the buyer. Digital artworks are delivered electronically." },
        { question: "What is the refund policy?", answer: "Refund policies vary. Please review the seller's refund policy before making a purchase." },
        { question: "How do I leave a review for a purchase?", answer: "Leave a review for a purchase by visiting the transaction history and selecting the 'Leave Review' option." },
        { question: "Can I sell prints of my digital artwork?", answer: "Yes, you can sell prints of your digital artwork by listing them in the appropriate category." }
      ]
    },
    {
      name: 'Art Display', questions: [
        { question: "How do I upload artwork?", answer: "Upload artwork by clicking on the 'Upload' button and following the instructions." },
        { question: "What file formats are supported?", answer: "Supported file formats include JPG, PNG, GIF, MP4, and various 3D file types." },
        { question: "How do I organize my artwork?", answer: "Organize your artwork by creating albums and categorizing your pieces." },
        { question: "Can I edit my uploaded artwork?", answer: "Yes, you can edit your uploaded artwork by going to your profile and selecting the 'Edit' option." },
        { question: "How do I enable 3D viewing features?", answer: "Enable 3D viewing by uploading artwork in a supported 3D format and enabling 3D viewing in your profile settings." },
        { question: "How do I create a portfolio?", answer: "Create a portfolio by uploading your best works and organizing them into a cohesive collection." },
        { question: "Can I add watermarks to my artwork?", answer: "Yes, you can add watermarks to your artwork to protect it from unauthorized use." },
        { question: "How do I feature my artwork?", answer: "Feature your artwork by selecting the 'Feature' option on your profile or during the upload process." },
        { question: "What is the best way to photograph my art?", answer: "Photograph your art in good lighting with a high-resolution camera to ensure the best quality images." },
        { question: "How do I delete my artwork?", answer: "Delete your artwork by going to your profile, selecting the piece, and clicking 'Delete'." }
      ]
    },
    {
      name: 'Community and Interaction', questions: [
        { question: "How do I join community groups?", answer: "Join community groups by navigating to the 'Community' section and selecting the groups you want to join." },
        { question: "How do I participate in forums?", answer: "Participate in forums by registering an account, browsing topics, and posting your contributions." },
        { question: "How do I follow other artists?", answer: "Follow other artists by visiting their profiles and clicking the 'Follow' button." },
        { question: "Can I message other users?", answer: "Yes, you can message other users by visiting their profile and selecting the 'Message' option." },
        { question: "How do I leave feedback for artists?", answer: "Leave feedback for artists by commenting on their artwork or sending them a direct message." },
        { question: "What are the community guidelines?", answer: "Community guidelines include rules on respectful interaction, appropriate content, and constructive feedback." },
        { question: "How do I report inappropriate content?", answer: "To report inappropriate content, click on the 'Report' button associated with the artwork or user profile and provide a reason for the report." },
        { question: "How do I block or unblock a user?", answer: "You can block or unblock a user by visiting their profile and selecting the 'Block/Unblock' option from the menu." },
        { question: "How can I get feedback on my artwork?", answer: "You can receive feedback by participating in community forums, groups, and events, as well as by enabling comments on your artwork uploads." },
        { question: "How do I join community events?", answer: "Join community events by visiting the 'Events' section and registering for the events that interest you." }
      ]
    },
    {
      name: 'Technical Issues', questions: [
        { question: "What should I do if I encounter a bug?", answer: "If you encounter a bug, report it through the 'Help' section or contact customer support with details of the issue." },
        { question: "How do I clear my browser cache?", answer: "Clearing your browser cache varies by browser. Generally, you can find this option in the settings or history section of your browser menu." },
        { question: "Why is my artwork not displaying correctly?", answer: "Artwork display issues may be due to file format, size, or browser compatibility. Ensure your file meets the platform's requirements." },
        { question: "How do I troubleshoot login issues?", answer: "Troubleshoot login issues by checking your internet connection, clearing your cache, and ensuring your credentials are correct." },
        { question: "What should I do if I experience a payment error?", answer: "If you experience a payment error, verify your payment details and contact customer support if the issue persists." },
        { question: "How do I report a technical issue?", answer: "Report a technical issue by navigating to the 'Help' section and submitting a detailed report of the problem." },
        { question: "Why can't I upload my artwork?", answer: "If you can't upload your artwork, check the file format and size, and ensure you have a stable internet connection." },
        { question: "How do I update my app?", answer: "Update your app by visiting the App Store or Google Play Store and checking for updates." },
        { question: "Why is the website loading slowly?", answer: "Slow loading times may be due to high traffic, your internet connection, or browser issues. Try refreshing the page or clearing your cache." },
        { question: "How do I enable JavaScript in my browser?", answer: "Enable JavaScript through your browser's settings, typically found in the security or privacy sections." }
      ]
    },
    {
      name: 'Security', questions: [
        { question: "How do I keep my account secure?", answer: "Keep your account secure by using a strong, unique password and enabling two-factor authentication." },
        { question: "What should I do if I suspect fraudulent activity?", answer: "If you suspect fraudulent activity, report it immediately to customer support and change your password." },
        { question: "How do I enable two-factor authentication?", answer: "Enable two-factor authentication by going to 'Account Settings' and selecting 'Security' to set up 2FA." },
        { question: "What are common security threats?", answer: "Common security threats include phishing, malware, and social engineering attacks. Always be cautious and verify sources." },
        { question: "How do I verify the authenticity of an artwork?", answer: "Verify the authenticity of an artwork by checking the artist's profile, reviews, and any provided certificates of authenticity." },
        { question: "How do I protect my artwork from theft?", answer: "Protect your artwork from theft by adding watermarks and ensuring your files are not easily downloadable." },
        { question: "What data does Artista collect?", answer: "Artista collects data such as user information, artwork details, and transaction history to improve the platform and services." },
        { question: "How is my data used?", answer: "Your data is used to personalize your experience, improve services, and ensure the platform's security." },
        { question: "Can I control my privacy settings?", answer: "Yes, control your privacy settings by going to 'Account Settings' and selecting 'Privacy' to adjust your preferences." },
        { question: "What should I do if I find a security vulnerability?", answer: "If you find a security vulnerability, report it immediately to customer support to ensure it is addressed promptly." }
      ]
    },
    {
      name: 'Payments and Transactions', questions: [
        { question: "How do I add a payment method?", answer: "Add a payment method by going to 'Account Settings' and selecting 'Payment Methods' to add your preferred option." },
        { question: "How do I withdraw my earnings?", answer: "Withdraw your earnings by going to 'Account Settings' and selecting 'Withdraw' to transfer funds to your bank account." },
        { question: "What are the transaction fees?", answer: "Transaction fees vary based on the payment method and the amount. Check the 'Fees' section for detailed information." },
        { question: "How do I view my transaction history?", answer: "View your transaction history by going to 'Account Settings' and selecting 'Transaction History'." },
        { question: "What currencies are supported?", answer: "Artista supports multiple currencies, including USD, EUR, GBP, and others. Check the 'Payments' section for a full list." },
        { question: "How do I request a refund?", answer: "Request a refund by contacting the seller and following the platform's refund policy guidelines." },
        { question: "How do I update my billing information?", answer: "Update your billing information by going to 'Account Settings' and selecting 'Billing' to update your details." },
        { question: "Why was my payment declined?", answer: "Payments may be declined due to insufficient funds, incorrect details, or bank restrictions. Contact your bank for more information." },
        { question: "How do I set up recurring payments?", answer: "Set up recurring payments by selecting the subscription option during checkout and providing the necessary details." },
        { question: "What is the process for chargebacks?", answer: "The chargeback process involves contacting your bank to dispute a transaction. Provide necessary evidence to support your claim." }
      ]
    },
    {
      name: 'Legal and Policies', questions: [
        { question: "What are the terms of service?", answer: "The terms of service outline the rules and guidelines for using Artista. You can find them in the 'Legal' section of the website." },
        { question: "How does Artista handle copyright issues?", answer: "Artista respects intellectual property rights and has procedures in place for reporting and addressing copyright infringements." },
        { question: "What is the privacy policy?", answer: "The privacy policy explains how Artista collects, uses, and protects user data. It is available in the 'Legal' section of the website." },
        { question: "How do I report a legal issue?", answer: "Report legal issues by contacting customer support and providing details of the issue for further assistance." },
        { question: "What are the user guidelines?", answer: "User guidelines include rules on respectful interaction, appropriate content, and compliance with legal standards." },
        { question: "How do I handle disputes with other users?", answer: "Handle disputes with other users through the platform's dispute resolution process or by contacting customer support." },
        { question: "What are the rules for content moderation?", answer: "Content moderation rules include guidelines on appropriate content, respect for intellectual property, and community standards." },
        { question: "What is the process for account suspension?", answer: "Account suspension occurs for violations of terms or policies. Users can appeal suspensions through customer support." },
        { question: "How do I get a copy of my data?", answer: "Get a copy of your data by requesting it through 'Account Settings' under the 'Data Management' section." },
        { question: "How does Artista comply with GDPR?", answer: "Artista complies with GDPR by ensuring data protection and privacy for users in the EU, including rights to access, correct, and delete personal data." }
      ]
    },
    {
      name: 'Miscellaneous', questions: [
        { question: "Can I use Artista for commercial purposes?", answer: "Yes, Artista can be used for commercial purposes, including selling art and collaborating on projects. Ensure compliance with platform rules and local laws." },
        { question: "How do I participate in contests?", answer: "Participate in contests by visiting the 'Contests' section and following the instructions for entry." },
        { question: "Can I gift art to someone?", answer: "Yes, you can gift art by purchasing it and selecting the 'Gift' option during checkout to send it to the recipient." },
        { question: "How do I promote my art on social media?", answer: "Promote your art on social media by sharing links to your Artista profile and using relevant hashtags and communities." },
        { question: "What are the benefits of a premium account?", answer: "Premium accounts offer benefits like lower transaction fees, enhanced profile customization, and priority support." },
        { question: "How do I become a featured artist?", answer: "Become a featured artist by consistently creating high-quality work, engaging with the community, and applying through the 'Featured Artist' program." },
        { question: "What is the Artista affiliate program?", answer: "The Artista affiliate program allows you to earn commissions by referring new users to the platform. Sign up through the 'Affiliates' section." },
        { question: "How do I access tutorials and resources?", answer: "Access tutorials and resources by visiting the 'Learning' section, which offers guides, videos, and articles on various topics." },
        { question: "Can I collaborate with other artists?", answer: "Yes, you can collaborate with other artists by connecting through the platform's messaging system and community groups." },
        { question: "What should I do if I disagree with a policy?", answer: "If you disagree with a policy, provide feedback to Artista through the 'Help' section or contact support for clarification and potential resolution." }
      ]
    }
  ];

  selectedCategory: any = null;
  selectedQuestion: any = null;

  selectCategory(category: any) {
    this.selectedCategory = category;
    this.selectedQuestion = null;
  }

  selectQuestion(question: any) {
    this.selectedQuestion = question;
  }
}



