import { Component } from '@angular/core';
import { Project } from '@interface/project.interface';
import { Post } from '@interface/post.interface';
import { FaqQuestion } from '@interface/faq-question.interface';
import { WhysSection } from '@interface/whys-section.interface';

@Component({
  selector: 'page-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  projects: Project[] = [
    {
      title: 'Futuristic UI/UX Design',
      type: 'AI-Powered Design System',
      aiModel: 'GPT-4 Vision',
      client: 'Tech Startup',
      date: '2024',
      imageUrl:
        'assets/images/Abstract-Gradient-Art_1Abstract Gradient Art.avif',
      altText: 'Abstract Gradient Art',
      slug: 'futuristic-ui-ux-design'
    },
    {
      title: 'Space Exploration App',
      type: 'Mobile App Development',
      aiModel: 'Claude Sonnet',
      client: 'Space Agency',
      date: '2024',
      imageUrl: 'assets/images/Astronaut-in-Space_1Astronaut in Space.webp',
      altText: 'Astronaut in Space',
      slug: 'space-exploration-app'
    },
    {
      title: 'Creative Portfolio Platform',
      type: 'Web Platform',
      aiModel: 'DALL-E 3',
      client: 'Creative Agency',
      date: '2024',
      imageUrl: 'assets/images/Astronaut-in-Space_1Astronaut in Space.webp',
      altText: 'Futuristic Cabin Landscape',
      slug: 'creative-portfolio-platform'
    }
  ];

  posts: Post[] = [
    {
      title: 'The Future of AI in Design',
      category: 'Design & AI',
      imageUrl:
        'assets/images/Silhouette-with-Neon-Pink-Sunglasses_1Silhouette with Neon Pink Sunglasses.avif',
      altText: 'Silhouette with Neon Pink Sunglasses',
      description:
        'Exploring how artificial intelligence is transforming the design industry and what the future holds for creative professionals.',
      date: '2024-06-01',
      slug: 'the-future-of-ai-in-design'
    },
    {
      title: 'Modern Web Development in 2024',
      category: 'Web Dev Trends',
      imageUrl:
        'assets/images/Abstract-Wave-Artwork_1Abstract Wave Artwork.avif',
      altText: 'Abstract Wave Artwork',
      description:
        'A look at the latest trends, tools, and best practices shaping web development in 2024.',
      date: '2024-05-20',
      slug: 'modern-web-development-in-2024'
    },
    {
      title: 'Building Creative Portfolios',
      category: 'Creative Process',
      imageUrl: 'assets/images/Astronaut-on-Barren-Landscape.jpeg',
      altText: 'Astronaut on Barren Landscape',
      description:
        'Tips and strategies for building a standout creative portfolio that gets noticed.',
      date: '2024-05-10',
      slug: 'building-creative-portfolios'
    }
  ];

  faqQuestions: FaqQuestion[] = [
    {
      question: 'What is LUCH and who is it for?',
      answer:
        "LUCH is a modern Webflow CMS template designed for portfolios and blogs. It's perfect for artists, bloggers, or anyone looking to showcase creative projects, share ideas, or build a stylish online presence with ease."
    },
    {
      question: 'What pages are included in the LUCH template?',
      answer:
        'LUCH comes with Home, About, Blog (CMS), Blog Post (CMS), Projects (CMS), Project Page (CMS), Contact, and Subscribe pages, plus additional resources like Style Guide, Licenses, Instructions, and Changelog.'
    },
    {
      question: 'Do I need a Webflow account to use LUCH?',
      answer:
        "Yes, you'll need a free Webflow account to access and customize LUCH. To fully utilize its CMS features (like blog posts and projects), you'll also need a Webflow CMS plan."
    },
    {
      question: 'Is LUCH responsive and mobile-friendly?',
      answer:
        'Absolutely! LUCH is fully responsive, ensuring your site looks sleek and functions perfectly on all devices—desktops, tablets, and phones.'
    },
    {
      question: 'Can I customize the design of LUCH?',
      answer:
        'Yes, LUCH offers easy color and style customization. With fully customizable sections, REM units for scalability, and an intuitive class naming system, you can tweak it to match your vision.'
    },
    {
      question: 'How does the CMS functionality work in LUCH?',
      answer:
        "LUCH uses Webflow's CMS for dynamic content management. You can easily add, edit, or organize blog posts and project pages directly within Webflow, no coding required."
    },
    {
      question: 'What makes LUCH different from other templates?',
      answer:
        "LUCH stands out with its clean, modern design, quick setup, custom animations, and SEO optimization. It's built for flexibility and style, making your work shine effortlessly."
    },
    {
      question: 'Where can I get support if I have questions about LUCH?',
      answer:
        "For any questions, contact Valdis Zhvaginsh at valdis@protonmail.com. You'll get a response within 2 business days. Custom work is also available if you need extra help!"
    }
  ];

  whysSection: WhysSection = {
    title:
      'The ultimate template blends style and simplicity for creatives globally',
    whyBlocks: [
      {
        text: "LUCH is more than just a template—it's a tool to bring your creative vision to life. Designed with Webflow's powerful CMS, it blends sleek, modern aesthetics with effortless functionality, making it the perfect choice for portfolios and personal blogs. <br><br>Whether you're an artist showcasing your latest projects, a designer sharing your process, or a writer crafting your thoughts, LUCH adapts to your needs with a clean layout and intuitive features."
      },
      {
        text: "Built for simplicity and impact, LUCH offers a seamless way to elevate your online presence. From quick setup to custom animations, every detail is crafted to help you stand out without the complexity. It's for those who value style as much as substance—ready to turn ideas into a stunning digital experience."
      }
    ],
    features: [
      { title: 'Modern Design' },
      { title: 'Dynamic CMS' },
      { title: 'Fully Responsive' },
      { title: 'Instant Launch' },
      { title: 'Custom Animations' },
      { title: 'SEO Optimized' },
      { title: 'REM Units' },
      { title: 'Portfolio Ready' },
      { title: 'Blog Friendly' }
    ]
  };
}
