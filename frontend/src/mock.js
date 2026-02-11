// Real data from Nitin Sarvesh Raajagopal's Resume

export const portfolioData = {
  // Personal Information
  personal: {
    name: "Nitin Sarvesh Raajagopal",
    title: "Cloud DevOps Engineer",
    tagline: "Automating secure AWS cloud platforms with production-grade DevOps and Infrastructure as Code",
    email: "nitinsarveshrg@hotmail.com",
    linkedin: "https://www.linkedin.com/in/nitin-sarvesh-raajagopal/",
    github: "https://github.com/nitinsarveshrg/",
    location: "Toronto, Canada",
    phone: "+1 (437) 989-8997"
  },

  // About Section
  about: {
    bio: "Cloud DevOps Engineer with ~5 years of hands-on delivery across AWS, Azure, and GCP. I build IaC stacks with Terraform, Helm, and Ansible, run Kubernetes workloads (CKA), and ship CI/CD with Jenkins, ArgoCD, and GitHub Actions. Core focus: reliability, observability, and secure automation.",
    highlights: [
      "5+ years of Cloud & DevOps Engineering experience",
      "AWS & HashiCorp Terraform Certified Professional",
      "Expert in Kubernetes, IaC, and CI/CD automation",
      "Reduced deployment time by 40% and costs by 20%"
    ],
    hobbies: [
      "Photography",
      "Travel",
      "Hiking",
      "Listening to music",
      "Open-source learning",
      "Formula 1 (Mercedes + Max Verstappen fan)"
    ]
  },

  // Skills organized by category
  skills: {
    cloud: [
      { name: "AWS", level: 95, icon: "cloud" },
      { name: "Azure", level: 85, icon: "cloud" },
      { name: "GCP", level: 80, icon: "cloud" }
    ],
    devops: [
      { name: "Docker", level: 95, icon: "container" },
      { name: "Kubernetes", level: 95, icon: "container" },
      { name: "Helm", level: 90, icon: "package" },
      { name: "Terraform", level: 95, icon: "file-code" },
      { name: "Ansible", level: 90, icon: "settings" },
      { name: "Jenkins", level: 90, icon: "workflow" },
      { name: "GitHub Actions", level: 90, icon: "git-branch" },
      { name: "ArgoCD", level: 85, icon: "git-merge" }
    ],
    programming: [
      { name: "Python", level: 90, icon: "code" },
      { name: "Bash", level: 95, icon: "terminal" },
      { name: "SQL", level: 85, icon: "database" },
      { name: "JavaScript/TypeScript", level: 75, icon: "code" }
    ],
    monitoring: [
      { name: "Prometheus", level: 90, icon: "activity" },
      { name: "Grafana", level: 90, icon: "bar-chart" },
      { name: "ELK Stack", level: 85, icon: "search" },
      { name: "CloudWatch", level: 90, icon: "eye" },
      { name: "Dynatrace", level: 80, icon: "activity" },
      { name: "DataDog", level: 80, icon: "trending-up" }
    ]
  },

  // Work Experience
  experience: [
    {
      id: 1,
      title: "Cloud DevOps Engineer",
      company: "Viva Tech Solutions",
      location: "Toronto, Canada",
      period: "Oct 2022 - Present",
      description: "Leading production cloud operations with automation-first IaC, CI/CD, and observability.",
      achievements: [
        "Improved AWS reliability to 99.99% and reduced latency by 30%",
        "Automated Terraform/CloudFormation environments and cut provisioning time by 85%",
        "Built CI/CD pipelines that reduced deployment errors by 40% and doubled release speed",
        "Implemented observability + security controls and reduced MTTR by 45% and findings by 70%",
        "Optimized cloud architecture and reduced infrastructure cost by 20%"
      ]
    },
    {
      id: 2,
      title: "System Engineer",
      company: "Assistanz Network Pvt Ltd",
      location: "India",
      period: "Aug 2021 - Oct 2022",
      description: "Managed AWS/Azure production workloads with reliability, automation, and incident response ownership.",
      achievements: [
        "Maintained 99.9% uptime across AWS/Azure production workloads",
        "Automated provisioning with Ansible/Terraform and cut manual work by 50%",
        "Improved CI/CD throughput by reducing build/test cycle time by 30-40%",
        "Operated Kubernetes + Helm workloads and reduced incident downtime by 35%"
      ]
    },
    {
      id: 3,
      title: "Junior Cloud Engineer (Intern)",
      company: "Vimana Web Infotech",
      location: "India",
      period: "May 2020 - Jul 2021",
      description: "Supported cloud platform setup, Linux automation, and early CI/CD engineering.",
      achievements: [
        "Automated Linux operations with Python/Bash and reduced manual effort by 55%",
        "Built Jenkins CI/CD pipelines and improved deployment cycle time by 35%",
        "Containerized workloads with Docker and reduced config drift by 80%",
        "Built reusable Terraform modules and improved IaC consistency by 60%"
      ]
    }
  ],

  // Projects
  projects: [
    {
      id: 1,
      title: "Interactive Cloud DevOps Portfolio Runtime",
      description: "Built a production-ready portfolio platform with terminal-style UX, live telemetry modes, theme engines, and responsive section architecture deployed on Vercel.",
      technologies: ["React", "JavaScript", "CSS", "HTML", "Tailwind", "Vercel", "Formspree", "hCaptcha"],
      highlights: [
        "Custom live panels, runtime command animations, and theme switching",
        "Section-driven Linux/F1 design language with smooth navigation",
        "Integrated contact pipeline with AJAX submission and inline CAPTCHA",
        "Continuous delivery through GitHub + Vercel deployment workflow"
      ],
      github: "https://github.com/nitinsarveshrg/Webpage",
      demo: "https://nitinsarvesh.vercel.app"
    },
    {
      id: 2,
      title: "Product Catalog for Health Applications API",
      description: "Implemented a Dockerized Node.js product catalog API with health endpoints and an automated AWS ECS Fargate deployment pipeline using Terraform and GitHub Actions.",
      technologies: ["Node.js", "JavaScript", "TypeScript", "Docker", "Terraform", "AWS ECS Fargate", "ALB", "Amazon ECR", "GitHub Actions", "Shell"],
      highlights: [
        "CRUD product management API plus service health checks",
        "IaC provisioning for network, compute, and load balancing",
        "Container build, push, and deploy fully automated in CI/CD",
        "Cloud-ready deployment with repeatable release process"
      ],
      github: "https://github.com/nitinsarveshrg/Product-Catalog-for-health-applications-using-API"
    },
    {
      id: 3,
      title: "Cloud Cost Analysis and Optimization Platform",
      description: "Developed a Python/FastAPI cloud cost analytics solution for anomaly detection, rightsizing recommendations, and large-scale AWS account optimization workflows.",
      technologies: ["Python", "FastAPI", "AWS Cost Optimization", "Anomaly Detection", "Asynchronous Processing", "Shell", "PowerShell"],
      highlights: [
        "Architecture designed for high account scale analysis",
        "Anomaly detection workflow with optimization recommendations",
        "API-first integration pattern for operational tooling",
        "Execution model aligned for automation and extension"
      ],
      github: "https://github.com/nitinsarveshrg/Cloud-Cost-Analysis"
    },
    {
      id: 4,
      title: "Ecommerce Selenium BDD Automation Framework",
      description: "Built a Java-based Selenium automation framework with BDD, TestNG, Jenkins integration, and Allure reporting for scalable test execution.",
      technologies: ["Java", "Selenium", "BDD", "TestNG", "Maven", "Jenkins", "Allure Reports", "HTML", "CSS", "JavaScript"],
      highlights: [
        "Page Object Model framework structure for maintainability",
        "Data-driven BDD test flows for ecommerce user journeys",
        "Jenkins-driven automation pipeline for regression runs",
        "Detailed reporting pipeline with Allure dashboards"
      ],
      github: "https://github.com/nitinsarveshrg/ecommerce-selenium--bdd"
    },
    {
      id: 5,
      title: "AWS Services Provisioning via Azure DevOps",
      description: "Created infrastructure automation pipelines in Azure DevOps to provision core AWS services through Terraform modules and CI/CD workflows.",
      technologies: ["Azure DevOps", "AWS", "Terraform", "HCL", "YAML", "CI/CD", "Infrastructure as Code"],
      highlights: [
        "Cross-platform delivery flow between Azure DevOps and AWS",
        "Reusable Terraform modules for repeatable environment builds",
        "Automated provisioning of VPC, compute, storage, and databases",
        "Consistent IaC lifecycle from plan to apply"
      ],
      github: "https://github.com/nitinsarveshrg/Creation-of-AWS-services-using-Azure-Devops"
    }
  ],

  // Certifications with links
  certifications: [
    {
      id: 1,
      name: "AWS Certified Solutions Architect - Associate",
      issuer: "Amazon Web Services",
      date: "2024",
      credentialId: "AWS-SAA",
      link: "https://www.credly.com/badges/b37d7130-a1fd-4123-9325-ea53260945cd/linked_in_profile"
    },
    {
      id: 2,
      name: "HashiCorp Certified: Terraform Associate",
      issuer: "HashiCorp",
      date: "2025",
      credentialId: "HC-TF",
      link: "https://www.credly.com/badges/fc7bd115-3657-4551-9746-c5b3357a12bd/linked_in_profile"
    }
  ],

  // Education
  education: [
    {
      id: 1,
      degree: "Post Graduate Diploma in Information Technology Network Security",
      institution: "Conestoga College",
      period: "Jan 2024 - Aug 2024",
      location: "Waterloo, Canada",
      gpa: "3.32/4"
    },
    {
      id: 2,
      degree: "Post Graduate Diploma in Virtualization and Cloud Computing",
      institution: "Conestoga College",
      period: "Jan 2023 - Aug 2023",
      location: "Waterloo, Canada",
      gpa: "3.67/4"
    },
    {
      id: 3,
      degree: "Bachelor of Engineering in Electronics and Communication",
      institution: "Sri Ramakrishna Engineering College",
      period: "Aug 2017 - May 2021",
      location: "Coimbatore, India",
      gpa: "7.52/10"
    }
  ]
};
