// Real data from Nitin Sarvesh Raajagopal's Resume

export const portfolioData = {
  // Personal Information
  personal: {
    name: "Nitin Sarvesh Raajagopal",
    title: "Cloud DevOps Engineer",
    tagline: "Automating secure multi-cloud platforms with production-first DevOps",
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
      title: "Automated Deployment of Node.js Microservice on AWS ECS",
      description: "Built an end-to-end AWS ECS deployment pipeline for a Node.js API with Terraform IaC and GitHub Actions automation.",
      technologies: ["Node.js", "AWS ECS", "Terraform", "GitHub Actions", "Docker", "Amazon ECR", "ALB", "VPC", "CloudWatch"],
      highlights: [
        "Zero-downtime blue/green deployments behind ALB",
        "Fully automated GitHub Actions release flow",
        "Modular Terraform for repeatable infrastructure",
        "No manual deployment steps in production"
      ],
      github: "https://github.com/nitinsarveshrg/Product-Catalog-for-health-applications-using-API"
    },
    {
      id: 2,
      title: "Scalable AWS Cost Optimization Platform",
      description: "Engineered a cloud-native FastAPI platform to detect spend anomalies and optimize AWS costs at large account scale.",
      technologies: ["FastAPI", "AWS (EC2, RDS, S3)", "Terraform", "CI/CD", "Python", "Asynchronous Processing"],
      highlights: [
        "Designed for 10,000+ AWS accounts",
        "Automated anomaly detection + spend insights",
        "Rightsizing and RI planning recommendations",
        "Asynchronous processing for high-throughput analytics"
      ],
      github: "https://github.com/nitinsarveshrg/Cloud-Cost-Analysis"
    },
    {
      id: 3,
      title: "Multi-Cloud Infrastructure Automation with Azure DevOps",
      description: "Implemented Azure DevOps pipelines to provision and operate AWS infrastructure through reusable Terraform modules.",
      technologies: ["Azure DevOps", "AWS", "Terraform", "CI/CD Pipelines", "YAML", "Infrastructure as Code"],
      highlights: [
        "Hybrid automation across Azure DevOps and AWS",
        "Reusable Terraform modules for core AWS services",
        "Automated provisioning for VPC/EC2/RDS/S3",
        "Consistent cross-platform CI/CD workflows"
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
